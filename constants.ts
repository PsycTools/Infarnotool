
import { Category, ToolDef, ToolId } from './types';

export const TOOLS: ToolDef[] = [
  // --- HIGH VALUE AI TOOLS ---
  {
    id: ToolId.IMG_REMOVE_BG,
    title: 'Background Slayer',
    description: 'Remove image backgrounds instantly using AI.',
    category: Category.IMAGE,
    icon: 'Scissors',
    isHot: true,
    isNew: true
  },
  {
    id: ToolId.IMG_ANIME_GEN,
    title: 'Anime Soul Gen',
    description: 'Generate stunning anime art from text prompts.',
    category: Category.IMAGE,
    icon: 'Zap',
    isHot: true,
    isNew: true
  },
  {
    id: ToolId.AI_CHAT,
    title: 'Demon Chat AI',
    description: 'Uncensored-style assistance from the void.',
    category: Category.AI,
    icon: 'MessageSquareMore',
    isHot: true
  },
  {
    id: ToolId.AI_TEXT_GEN,
    title: 'Neural Text Gen',
    description: 'Generate high-quality creative text & stories.',
    category: Category.AI,
    icon: 'Sparkles'
  },
  {
    id: ToolId.AI_CAPTION,
    title: 'Vision Caption',
    description: 'AI analyzes your image and describes it.',
    category: Category.AI,
    icon: 'ScanEye',
    isHot: true
  },
  
  // --- AI CONTENT ---
  {
    id: ToolId.AI_YT_DESC,
    title: 'YouTube Script/Desc',
    description: 'Generate viral video descriptions and scripts.',
    category: Category.AI,
    icon: 'Youtube'
  },
  {
    id: ToolId.AI_HASHTAG,
    title: 'Hashtag Generator',
    description: 'Generate trending tags for social growth.',
    category: Category.AI,
    icon: 'Hash'
  },
  {
    id: ToolId.AI_SOCIAL_CAPTION,
    title: 'Social Caption AI',
    description: 'Perfect captions for Insta, TikTok, Twitter.',
    category: Category.AI,
    icon: 'PenTool'
  },

  // --- DOWNLOADERS (High Traffic) ---
  {
    id: ToolId.DL_YOUTUBE,
    title: 'YouTube Extractor',
    description: 'Download high-quality streams.',
    category: Category.DOWNLOADER,
    icon: 'Youtube'
  },
  {
    id: ToolId.DL_INSTA_REEL,
    title: 'Insta Reel Saver',
    description: 'Extract Reels directly from Instagram.',
    category: Category.DOWNLOADER,
    icon: 'Instagram'
  },
  {
    id: ToolId.DL_TIKTOK,
    title: 'TikTok Unlocked',
    description: 'Download without watermark.',
    category: Category.DOWNLOADER,
    icon: 'Video',
    isHot: true
  },
  
  // --- YOUTUBE UTILS ---
  {
    id: ToolId.YT_THUMBNAIL,
    title: 'Thumbnail Grabber',
    description: 'Download HD thumbnails from any video.',
    category: Category.YOUTUBE,
    icon: 'Image'
  },
  {
    id: ToolId.YT_TAGS,
    title: 'Tag Extractor',
    description: 'Steal SEO tags from competitors.',
    category: Category.YOUTUBE,
    icon: 'Tag'
  },
  {
    id: ToolId.YT_TITLE_ANALYZE,
    title: 'Title Analyzer',
    description: 'Check score and clickability of titles.',
    category: Category.YOUTUBE,
    icon: 'BarChart'
  },
  {
    id: ToolId.AI_YT_SUMMARIZE,
    title: 'Video Summarizer',
    description: 'Turn long videos into short notes.',
    category: Category.AI,
    icon: 'FileText'
  },

  // --- IMAGE TOOLS ---
  {
    id: ToolId.IMG_COMPRESS,
    title: 'Image Compressor',
    description: 'Reduce size without quality loss.',
    category: Category.IMAGE,
    icon: 'Minimize2'
  },
  {
    id: ToolId.IMG_TO_PNG,
    title: 'Convert to PNG',
    description: 'Modern format conversion.',
    category: Category.IMAGE,
    icon: 'Image'
  },
  {
    id: ToolId.IMG_RESIZE,
    title: 'Image Resizer',
    description: 'Resize dimensions quickly.',
    category: Category.IMAGE,
    icon: 'Maximize'
  },
  {
    id: ToolId.IMG_OBJ_REMOVE,
    title: 'Magic Eraser',
    description: 'Remove unwanted objects from photos.',
    category: Category.IMAGE,
    icon: 'Eraser'
  },
  {
    id: ToolId.IMG_BG_REPLACE,
    title: 'Background Swap',
    description: 'Replace BG with AI generated scenes.',
    category: Category.IMAGE,
    icon: 'RefreshCw'
  },

  // --- UTILITIES ---
  {
    id: ToolId.QR_GEN,
    title: 'QR Matrix Gen',
    description: 'Generate custom QR codes.',
    category: Category.DEV,
    icon: 'QrCode'
  },
  {
    id: ToolId.PASS_GEN,
    title: 'Secure Key Gen',
    description: 'Create unbreakable passwords.',
    category: Category.DEV,
    icon: 'KeyRound'
  },
  {
    id: ToolId.AI_REWRITER,
    title: 'Content Refiner',
    description: 'Rewrite text for clarity and tone.',
    category: Category.AI,
    icon: 'Wand2'
  },
  {
    id: ToolId.AI_CODE_EXPLAIN,
    title: 'Code Decryptor',
    description: 'Get step-by-step code explanations.',
    category: Category.AI,
    icon: 'Terminal'
  },
  {
    id: ToolId.AI_IDEAS,
    title: 'Viral Architect',
    description: 'Get viral ideas for content.',
    category: Category.AI,
    icon: 'Lightbulb'
  },
  
  // --- DEV TOOLS ---
  {
    id: ToolId.DEV_JSON_FMT,
    title: 'JSON Beautifier',
    description: 'Format and validate JSON data.',
    category: Category.DEV,
    icon: 'Braces'
  },
  {
    id: ToolId.TEXT_PARA_FORMAT,
    title: 'Text Formatter',
    description: 'Clean and format paragraph text.',
    category: Category.DEV,
    icon: 'AlignLeft'
  },
  {
    id: ToolId.TEXT_DEDUP,
    title: 'Word Dedup',
    description: 'Remove duplicate words from lists.',
    category: Category.DEV,
    icon: 'Filter'
  },
  {
    id: ToolId.DEV_BASE64,
    title: 'Base64 Tool',
    description: 'Encode and decode Base64 strings.',
    category: Category.DEV,
    icon: 'Code2'
  },

  // --- PREVIOUSLY "COMING SOON" TEXT TOOLS ---
  {
    id: ToolId.CS_TEXT_CRAFT,
    title: 'Text Craft Studio',
    description: 'Advanced text manipulation and styling suite.',
    category: Category.DEV,
    icon: 'Edit3'
  },
  {
    id: ToolId.CS_ULTRA_TEXT,
    title: 'Ultra Text Utils',
    description: 'All-in-one text operations utility.',
    category: Category.DEV,
    icon: 'Type'
  },
  {
    id: ToolId.CS_WORD_MAGIC,
    title: 'WordMagic Tools',
    description: 'Semantic analysis and word clouds.',
    category: Category.DEV,
    icon: 'Wand2'
  },
  {
    id: ToolId.CS_SMART_FMT,
    title: 'Smart Formatter Hub',
    description: 'Auto-format HTML, CSS, JS and more.',
    category: Category.DEV,
    icon: 'AlignJustify'
  },
  {
    id: ToolId.CS_CLEAN_TEXT,
    title: 'CleanText Pro',
    description: 'Strip HTML, remove lines, clean data.',
    category: Category.DEV,
    icon: 'Eraser'
  },

  // --- PREVIOUSLY "COMING SOON" IMAGE TOOLS ---
  {
    id: ToolId.CS_PIXEL_COMPRESS,
    title: 'PixelCompressor',
    description: 'Aggressive compression without quality loss.',
    category: Category.IMAGE,
    icon: 'Minimize2'
  },
  {
    id: ToolId.CS_QUICK_RESIZE,
    title: 'QuickImage Resizer',
    description: 'Bulk resize images for social media.',
    category: Category.IMAGE,
    icon: 'Maximize'
  },
  {
    id: ToolId.CS_CLEAR_BG,
    title: 'ClearBG Pro',
    description: 'HD Background removal with edge refinement.',
    category: Category.IMAGE,
    icon: 'Layers'
  },
  {
    id: ToolId.CS_ERASE_MASTER,
    title: 'EraseMaster AI',
    description: 'Remove unwanted objects and watermarks.',
    category: Category.IMAGE,
    icon: 'Scissors'
  },
  {
    id: ToolId.CS_IMG_CLEANER,
    title: 'ImageCleaner Studio',
    description: 'Denoise and upscale old photos.',
    category: Category.IMAGE,
    icon: 'Sparkles'
  },

  // --- PREVIOUSLY "COMING SOON" AI WRITING TOOLS ---
  {
    id: ToolId.CS_WRITE_GENIUS,
    title: 'WriteGenius AI',
    description: 'Advanced creative writing assistant.',
    category: Category.AI,
    icon: 'Brain'
  },
  {
    id: ToolId.CS_REPHRASE_MAX,
    title: 'RephraseMax',
    description: 'Intelligent multi-tone rephrasing.',
    category: Category.AI,
    icon: 'RefreshCw'
  },
  {
    id: ToolId.CS_SCRIPT_PILOT,
    title: 'ScriptPilot AI',
    description: 'Professional YouTube script generator.',
    category: Category.YOUTUBE,
    icon: 'Youtube'
  },
  {
    id: ToolId.CS_CONTENT_CRAFTER,
    title: 'ContentCrafter Pro',
    description: 'SEO optimized blog and article creator.',
    category: Category.AI,
    icon: 'PenTool'
  },
  {
    id: ToolId.CS_ARTICLE_FLOW,
    title: 'ArticleFlow AI',
    description: 'Full-length article generation workflow.',
    category: Category.AI,
    icon: 'FileText'
  },

  // --- BATCH 2: TEXT TOOLS ---
  {
    id: ToolId.CS_SMART_TEXT,
    title: 'SmartText Engine',
    description: 'Intelligent text parsing and restructuring.',
    category: Category.DEV,
    icon: 'Cpu'
  },
  {
    id: ToolId.CS_ULTRA_FMT,
    title: 'UltraFormatter Lab',
    description: 'Universal code and text formatter.',
    category: Category.DEV,
    icon: 'AlignLeft'
  },
  {
    id: ToolId.CS_NOTE_FIXER,
    title: 'NoteFixer Pro',
    description: 'Organize messy notes into clear structures.',
    category: Category.DEV,
    icon: 'ClipboardList'
  },
  {
    id: ToolId.CS_CLEAN_WRITE,
    title: 'CleanWrite Studio',
    description: 'Distraction-free writing environment.',
    category: Category.DEV,
    icon: 'Edit'
  },
  {
    id: ToolId.CS_META_TAG,
    title: 'MetaTag Extractor',
    description: 'Extract and analyze SEO meta tags from URLs.',
    category: Category.DEV,
    icon: 'Search'
  },

  // --- BATCH 2: IMAGE TOOLS ---
  {
    id: ToolId.CS_PHOTO_LITE,
    title: 'PhotoLite Editor',
    description: 'Quick online photo editing suite.',
    category: Category.IMAGE,
    icon: 'Sliders'
  },
  {
    id: ToolId.CS_SHARP_COMPRESS,
    title: 'SharpCompress',
    description: 'Smart compression that retains detail.',
    category: Category.IMAGE,
    icon: 'Minimize'
  },
  {
    id: ToolId.CS_MAGIC_BG,
    title: 'MagicBG Cleaner',
    description: 'Automated solid background removal.',
    category: Category.IMAGE,
    icon: 'Wand2'
  },
  {
    id: ToolId.CS_PIXEL_FIX,
    title: 'PixelFix Studio',
    description: 'Repair dead pixels and artifacts.',
    category: Category.IMAGE,
    icon: 'Grid'
  },
  {
    id: ToolId.CS_AI_OBJ_ERASER,
    title: 'AI-ObjectEraser',
    description: 'Select and erase objects seamlessly.',
    category: Category.IMAGE,
    icon: 'Eraser'
  },

  // --- BATCH 2: SEO & YOUTUBE ---
  {
    id: ToolId.CS_YT_TOOLKIT,
    title: 'YTToolkit Pro',
    description: 'Complete channel management suite.',
    category: Category.YOUTUBE,
    icon: 'Tool'
  },
  {
    id: ToolId.CS_SEO_BOOST,
    title: 'SEOBoost Analyzer',
    description: 'Deep dive page performance analysis.',
    category: Category.AI,
    icon: 'TrendingUp'
  },
  {
    id: ToolId.CS_CAPTION_CRAFT,
    title: 'CaptionCraft AI',
    description: 'Generate engaging captions for any media.',
    category: Category.AI,
    icon: 'MessageSquare'
  },
  {
    id: ToolId.CS_HASHTAG_WIZ,
    title: 'HashtagWizard',
    description: 'Find high-reach, low-competition tags.',
    category: Category.AI,
    icon: 'Hash'
  },
  {
    id: ToolId.CS_TREND_SCRIPT,
    title: 'TrendScript Maker',
    description: 'Script videos based on current trends.',
    category: Category.YOUTUBE,
    icon: 'FileVideo'
  },
];

export const CATEGORIES = Object.values(Category);
