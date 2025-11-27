
export interface DownloadLink {
  quality: string;
  url: string;
  format: string; // 'video' | 'audio'
  ext: string;
  isAudioOnly?: boolean;
}

export interface DownloaderResponse {
  status: 'success' | 'error';
  platform?: string;
  title?: string;
  thumbnail?: string;
  downloadLinks?: DownloadLink[];
  message?: string;
}

// --- ROTATING PROXY SYSTEM ---

const PROXY_PROVIDERS = [
  // Priority 1: CodeTabs (Often best for Instagram/Socials)
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  // Priority 2: ThingProxy
  (url: string) => `https://thingproxy.freeboard.io/fetch/${url}`,
  // Priority 3: AllOrigins (Good backup)
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
];

/**
 * Fetches content using a rotating list of CORS proxies.
 * Tries each proxy in order until one succeeds.
 */
const fetchWithRotation = async (targetUrl: string): Promise<string> => {
  let lastError: any;

  for (const createProxyUrl of PROXY_PROVIDERS) {
    const proxyUrl = createProxyUrl(targetUrl);
    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }
      const text = await response.text();
      
      // Basic validation to ensure we didn't get a proxy error page
      if (text.includes('Proxy Error') || text.includes('Could not request')) {
          throw new Error("Proxy returned internal error");
      }
      
      return text;
    } catch (e) {
      console.warn(`Proxy failed: ${proxyUrl}`, e);
      lastError = e;
      // Continue to next proxy
    }
  }

  throw new Error(`All proxies failed. Last error: ${lastError?.message || 'Unknown'}`);
};

// --- PLATFORM HANDLERS ---

const handleYoutube = async (url: string): Promise<DownloaderResponse> => {
  try {
    // REQUIREMENT: Use specific backend API for YouTube
    const apiUrl = `https://ytdl-six.vercel.app/api?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("YouTube Backend API failed");
    
    const data = await response.json();
    
    // Map the API response to our format
    // Assuming standard ytdl-like JSON response structure
    const links: DownloadLink[] = [];

    // Check for formats in the response (structure varies based on specific vercel deployment, 
    // assuming standard fields based on prompt requirement to use this URL)
    
    // If the API returns a direct 'url' in the root or 'formats' array
    if (data.formats && Array.isArray(data.formats)) {
        data.formats.forEach((fmt: any) => {
            links.push({
                quality: fmt.qualityLabel || fmt.quality || 'Unknown',
                url: fmt.url,
                format: 'video', // Simplification, usually checks mimeType
                ext: fmt.ext || 'mp4',
                isAudioOnly: false
            });
        });
    } else if (data.url) {
        // Single link fallback
        links.push({
            quality: 'Best',
            url: data.url,
            format: 'video',
            ext: 'mp4'
        });
    }

    if (links.length === 0) throw new Error("No download links returned from API");

    return {
      status: 'success',
      platform: 'youtube',
      title: data.title || "YouTube Video",
      thumbnail: data.thumbnail || data.thumbnails?.[0]?.url || "",
      downloadLinks: links
    };

  } catch (e) {
    console.error(e);
    return { status: 'error', message: "YouTube extraction failed. The API may be rate limited." };
  }
};

const handleInstagram = async (url: string): Promise<DownloaderResponse> => {
  try {
    // Clean URL to get ID
    // Support /p/, /reel/, /tv/
    const match = url.match(/\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/);
    if (!match) throw new Error("Invalid Instagram URL");
    
    const postId = match[1];
    const cleanUrl = `https://www.instagram.com/p/${postId}`;
    
    // REQUIREMENT: Use ?__a=1&__d=dis via Proxy
    const apiUrl = `${cleanUrl}/?__a=1&__d=dis`;
    
    // We prioritize fetchWithRotation to handle IG's strictness
    const jsonStr = await fetchWithRotation(apiUrl);
    
    let json;
    try {
        json = JSON.parse(jsonStr);
    } catch (e) {
        throw new Error("Failed to parse Instagram JSON. Login wall hit.");
    }

    if (!json.graphql?.shortcode_media) {
        throw new Error("Instagram structure changed or private post.");
    }

    const media = json.graphql.shortcode_media;
    const downloadUrl = media.video_url || media.display_url;
    const isVideo = !!media.video_url;

    return {
        status: 'success',
        platform: 'instagram',
        title: media.title || "Instagram Media",
        thumbnail: media.display_url,
        downloadLinks: [{
            quality: 'Original',
            url: downloadUrl,
            format: isVideo ? 'video' : 'image',
            ext: isVideo ? 'mp4' : 'jpg'
        }]
    };

  } catch (e) {
      return { status: 'error', message: "Instagram Private/Login error. Try a public link." };
  }
};

const handleTiktok = async (url: string): Promise<DownloaderResponse> => {
  try {
      // REQUIREMENT: Use oEmbed for metadata via Proxy
      const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
      const oembedJsonStr = await fetchWithRotation(oembedUrl);
      const oembed = JSON.parse(oembedJsonStr);

      // REQUIREMENT: Request TikTok page HTML and extract playAddr
      const html = await fetchWithRotation(url);
      
      let videoUrl = "";
      
      // Regex 1: playAddr
      const match1 = html.match(/"playAddr":"(.*?)"/);
      // Regex 2: downloadAddr
      const match2 = html.match(/"downloadAddr":"(.*?)"/);
      // Regex 3: contentUrl (structured data)
      const match3 = html.match(/"contentUrl":"(.*?)"/);

      if (match1) videoUrl = match1[1];
      else if (match2) videoUrl = match2[1];
      else if (match3) videoUrl = match3[1];

      // Fix unicode slashes
      videoUrl = videoUrl.replace(/\\u002F/g, '/');

      if (!videoUrl) throw new Error("Could not extract TikTok video URL");

      return {
          status: 'success',
          platform: 'tiktok',
          title: oembed.title || "TikTok Video",
          thumbnail: oembed.thumbnail_url || "",
          downloadLinks: [{
              quality: 'HD (No Watermark)',
              url: videoUrl,
              format: 'video',
              ext: 'mp4'
          }]
      };

  } catch (e) {
      return { status: 'error', message: "TikTok extraction failed. Link might be invalid." };
  }
};

const handleFacebook = async (url: string): Promise<DownloaderResponse> => {
    try {
        // Force mobile version for easier HTML parsing
        const target = url.replace('www.facebook.com', 'm.facebook.com');
        
        // REQUIREMENT: Fetch full page HTML (proxied)
        const html = await fetchWithRotation(target);
        
        // REQUIREMENT: Extract "playable_url" and "playable_url_quality_hd"
        const hdMatch = html.match(/"playable_url_quality_hd":"([^"]+)"/);
        const sdMatch = html.match(/"playable_url":"([^"]+)"/);
        
        let videoUrl = "";
        let quality = "SD";

        if (hdMatch && hdMatch[1] && hdMatch[1] !== "null") {
            videoUrl = hdMatch[1];
            quality = "HD";
        } else if (sdMatch && sdMatch[1] && sdMatch[1] !== "null") {
            videoUrl = sdMatch[1];
            quality = "SD";
        }

        // Clean up URL (unicode unescape)
        videoUrl = videoUrl.replace(/\\/g, '');

        if (!videoUrl) throw new Error("No Facebook video found in page source.");

        return {
            status: 'success',
            platform: 'facebook',
            title: 'Facebook Video',
            thumbnail: '', // FB doesn't always make thumb easy to parse in mobile view
            downloadLinks: [{
                quality: quality,
                url: videoUrl,
                format: 'video',
                ext: 'mp4'
            }]
        };

    } catch (e) {
        return { status: 'error', message: "Facebook extraction failed. Video might be private." };
    }
}

const handleTwitter = async (url: string): Promise<DownloaderResponse> => {
    try {
        // REQUIREMENT: Use proxied request to fetch tweet HTML
        const html = await fetchWithRotation(url);
        
        // REQUIREMENT: Extract “contentUrl”: “VIDEO_LINK” or og:video
        let videoUrl = "";
        
        const contentMatch = html.match(/"contentUrl":"([^"]+)"/);
        const metaMatch = html.match(/<meta property="og:video" content="([^"]+)"/);
        
        if (contentMatch) videoUrl = contentMatch[1];
        else if (metaMatch) videoUrl = metaMatch[1];

        if (!videoUrl) throw new Error("Twitter/X video not found.");

        return {
            status: 'success',
            platform: 'twitter',
            title: 'X / Twitter Media',
            thumbnail: '',
            downloadLinks: [{
                quality: 'Best',
                url: videoUrl,
                format: 'video',
                ext: 'mp4'
            }]
        };
    } catch (e) {
        return { status: 'error', message: "Twitter/X extraction failed." };
    }
}


// --- MAIN ENTRY POINT ---

export const fetchMedia = async (url: string): Promise<DownloaderResponse> => {
  if (!url) return { status: 'error', message: 'URL is required' };
  
  try {
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
          return await handleYoutube(url);
      }
      if (url.includes('instagram.com')) return await handleInstagram(url);
      if (url.includes('tiktok.com')) return await handleTiktok(url);
      if (url.includes('facebook.com') || url.includes('fb.watch')) return await handleFacebook(url);
      if (url.includes('twitter.com') || url.includes('x.com')) return await handleTwitter(url);

      throw new Error("Platform not detected. Supported: YouTube, Instagram, TikTok, Facebook, Twitter.");
  } catch (e) {
      return { status: 'error', message: (e as Error).message };
  }
};
