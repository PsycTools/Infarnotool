
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Download, Link as LinkIcon, Video, Music, AlertCircle, Image as ImageIcon, ExternalLink, Shield } from 'lucide-react';
import { ToolId } from '../../types';
import { fetchMedia, DownloaderResponse, DownloadLink } from '../../services/downloaderService';

interface DownloaderToolProps {
  toolId: ToolId;
  title: string;
}

export const DownloaderTool: React.FC<DownloaderToolProps> = ({ toolId, title }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DownloaderResponse | null>(null);
  
  useEffect(() => {
    setResult(null);
    setUrl('');
  }, [toolId]);

  const getPlaceholder = () => {
    if (toolId.includes('youtube')) return "Paste YouTube link...";
    if (toolId.includes('insta')) return "Paste Instagram link...";
    if (toolId.includes('tiktok')) return "Paste TikTok link...";
    return "Paste link here...";
  }

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleProcess = async () => {
    if (!url) return;
    
    if (!isValidUrl(url)) {
      setResult({
        status: 'error',
        message: "Invalid URL format."
      });
      return;
    }

    setLoading(true);
    setResult(null);
    
    // Simulate a demonic delay for effect if response is too fast
    const minTime = new Promise(resolve => setTimeout(resolve, 800));
    
    const [data] = await Promise.all([
        fetchMedia(url),
        minTime
    ]);
    
    setResult(data);
    setLoading(false);
  };

  const handleDownload = (link: string, ext: string) => {
      window.open(link, '_blank');
  };

  return (
    <div className="flex flex-col gap-2 max-w-3xl mx-auto">
      
      {/* Input Section */}
      <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-2.5 md:p-3 flex flex-col gap-1.5 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-blood-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

        <div className="flex justify-between items-end">
           <label className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
             <LinkIcon size={12} /> Source URL
           </label>
           <div className="flex items-center gap-1 md:gap-2 text-[9px] text-gray-500 border border-gray-800 px-1.5 py-0.5 rounded bg-black/40">
              <Shield size={8} className="text-blood-500" />
              <span>Proxy Secured</span>
           </div>
        </div>
        
        <div className="flex gap-2 flex-col md:flex-row">
          <input 
            type="text" 
            className="flex-grow bg-black/50 border border-gray-700 rounded-lg py-1.5 px-3 text-sm text-white focus:border-blood-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.2)] outline-none transition-all placeholder-gray-600 font-medium"
            placeholder={getPlaceholder()}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleProcess()}
          />
          <Button onClick={handleProcess} isLoading={loading} disabled={!url} className="md:w-28 shrink-0 h-8 md:h-auto text-xs md:text-sm">
             Extricate
          </Button>
        </div>
      </div>

      {/* Error State */}
      {result?.status === 'error' && (
          <div className="bg-red-900/10 border border-red-900/40 text-red-400 p-2 rounded-lg flex items-center gap-2 animate-fade-in-up text-xs md:text-sm">
            <AlertCircle size={14} />
            <span>{result.message}</span>
          </div>
      )}

      {/* Success State */}
      {result?.status === 'success' && result.downloadLinks && (
        <div className="animate-fade-in-up space-y-2">
          
          <div className="bg-black/60 border border-blood-900/50 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Thumbnail */}
            <div className="w-full md:w-2/5 relative h-28 md:h-auto md:min-h-[120px] bg-black shrink-0">
                {result.thumbnail ? (
                    <img src={result.thumbnail} alt="Preview" className="w-full h-full object-cover absolute inset-0 opacity-80" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <Video className="text-gray-700 w-10 h-10" />
                    </div>
                )}
                {/* Platform Badge */}
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-gray-700 uppercase">
                    {result.platform}
                </div>
            </div>

            {/* Content Info */}
            <div className="p-3 flex-grow flex flex-col justify-between gap-2">
               <div>
                  <h3 className="text-sm md:text-base font-bold text-white brand-font tracking-wide line-clamp-2 leading-tight">
                    {result.title || "Unknown Artifact"}
                  </h3>
               </div>

               <div className="space-y-1">
                   {result.downloadLinks.map((link, idx) => (
                       <div key={idx} className="flex items-center justify-between bg-gray-900/40 border border-gray-800 p-1 rounded-lg hover:border-blood-500/50 transition-colors">
                           <div className="flex items-center gap-2">
                               <div className="bg-gray-800 p-1 rounded">
                                   {link.format === 'video' ? <Video size={10} className="text-gray-300"/> : <Music size={10} className="text-gray-300"/>}
                               </div>
                               <div>
                                   <div className="text-xs font-bold text-gray-200">{link.quality}</div>
                                   <div className="text-[9px] text-gray-500 uppercase">{link.ext} • {link.format}</div>
                               </div>
                           </div>
                           
                           <Button 
                             variant="outline" 
                             className="text-[10px] px-2 py-0.5 h-6"
                             onClick={() => handleDownload(link.url, link.ext)}
                           >
                             <Download size={10} className="mr-1" /> Download
                           </Button>
                       </div>
                   ))}
               </div>
            </div>
          </div>
          
          <div className="text-center text-[9px] text-gray-600 px-4">
             <p>If download opens in a new tab, right click the video and select "Save Video As".</p>
          </div>

        </div>
      )}
    </div>
  );
};
