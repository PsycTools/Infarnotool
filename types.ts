
export enum Category {
  ALL = 'All',
  AI = 'AI Tools',
  IMAGE = 'Image Tools',
  DOWNLOADER = 'Downloader',
  DEV = 'Dev Tools',
  PDF = 'PDF Tools',
  OFFLINE = 'Offline',
  YOUTUBE = 'YouTube Tools', // New Category
}

export enum ToolId {
  // AI Text
  AI_TEXT_GEN = 'ai-text-gen',
  AI_REWRITER = 'ai-rewriter',
  AI_CODE_EXPLAIN = 'ai-code-explain',
  AI_CHAT = 'ai-chat',
  AI_CAPTION = 'ai-caption',
  AI_IDEAS = 'ai-ideas',
  
  // AI Social/Content (Coming Soon)
  AI_YT_DESC = 'ai-yt-desc',
  AI_HASHTAG = 'ai-hashtag',
  AI_SOCIAL_CAPTION = 'ai-social-caption',
  AI_YT_SUMMARIZE = 'ai-yt-summarize',
  AI_YT_TITLE = 'ai-yt-title',

  // New AI/Image
  IMG_REMOVE_BG = 'img-remove-bg',
  IMG_ANIME_GEN = 'img-anime-gen',
  
  // Image Coming Soon
  IMG_RESIZE = 'img-resize',
  IMG_OBJ_REMOVE = 'img-obj-remove',
  IMG_BG_REPLACE = 'img-bg-replace',
  IMG_CLEANUP = 'img-cleanup',

  // Downloader Tools
  DL_YOUTUBE = 'dl-youtube',
  DL_INSTA_REEL = 'dl-insta-reel',
  DL_TIKTOK = 'dl-tiktok',
  DL_FACEBOOK = 'dl-facebook',
  DL_TWITTER = 'dl-twitter',
  DL_GENERIC = 'dl-generic',

  // Image Utils
  IMG_TO_PNG = 'img-to-png',
  IMG_TO_JPG = 'img-to-jpg',
  IMG_TO_WEBP = 'img-to-webp',
  IMG_COMPRESS = 'img-compress',
  
  // Text/Dev
  PASS_GEN = 'pass-gen',
  QR_GEN = 'qr-gen',
  WORD_COUNTER = 'word-counter',
  CASE_CONVERT = 'case-convert',
  
  // New Text/Dev (Coming Soon)
  TEXT_PARA_FORMAT = 'text-para-format',
  TEXT_DEDUP = 'text-dedup',
  DEV_JSON_FMT = 'dev-json-fmt',
  DEV_BASE64 = 'dev-base64',
  DEV_URL_ENC = 'dev-url-enc',
  DEV_RANDOM_STR = 'dev-random-str',

  // YouTube Utils (Coming Soon)
  YT_THUMBNAIL = 'yt-thumbnail',
  YT_TITLE_ANALYZE = 'yt-title-analyze',
  YT_TAGS = 'yt-tags',
  YT_CALC = 'yt-calc',
  
  // PDF
  PDF_TEXT = 'pdf-text',

  // --- PREVIOUS COMING SOON ---
  CS_TEXT_CRAFT = 'cs-text-craft',
  CS_ULTRA_TEXT = 'cs-ultra-text',
  CS_WORD_MAGIC = 'cs-word-magic',
  CS_SMART_FMT = 'cs-smart-fmt',
  CS_CLEAN_TEXT = 'cs-clean-text',
  CS_PIXEL_COMPRESS = 'cs-pixel-compress',
  CS_QUICK_RESIZE = 'cs-quick-resize',
  CS_CLEAR_BG = 'cs-clear-bg',
  CS_ERASE_MASTER = 'cs-erase-master',
  CS_IMG_CLEANER = 'cs-img-cleaner',
  CS_WRITE_GENIUS = 'cs-write-genius',
  CS_REPHRASE_MAX = 'cs-rephrase-max',
  CS_SCRIPT_PILOT = 'cs-script-pilot',
  CS_CONTENT_CRAFTER = 'cs-content-crafter',
  CS_ARTICLE_FLOW = 'cs-article-flow',

  // --- NEW COMING SOON BATCH 2 ---
  
  // Text Tools
  CS_SMART_TEXT = 'cs-smart-text',
  CS_ULTRA_FMT = 'cs-ultra-fmt',
  CS_NOTE_FIXER = 'cs-note-fixer',
  CS_CLEAN_WRITE = 'cs-clean-write',
  CS_META_TAG = 'cs-meta-tag',

  // Image Tools
  CS_PHOTO_LITE = 'cs-photo-lite',
  CS_SHARP_COMPRESS = 'cs-sharp-compress',
  CS_MAGIC_BG = 'cs-magic-bg',
  CS_PIXEL_FIX = 'cs-pixel-fix',
  CS_AI_OBJ_ERASER = 'cs-ai-obj-eraser',

  // SEO & YouTube
  CS_YT_TOOLKIT = 'cs-yt-toolkit',
  CS_SEO_BOOST = 'cs-seo-boost',
  CS_CAPTION_CRAFT = 'cs-caption-craft',
  CS_HASHTAG_WIZ = 'cs-hashtag-wiz',
  CS_TREND_SCRIPT = 'cs-trend-script',
}

export interface ToolDef {
  id: ToolId;
  title: string;
  description: string;
  category: Category;
  icon: string;
  isNew?: boolean; 
  isHot?: boolean;
  isComingSoon?: boolean; // New Flag
}
