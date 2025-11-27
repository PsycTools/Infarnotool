
import React from 'react';
import { ToolId } from '../types';
import { TOOLS } from '../constants';
import { ArrowLeft } from 'lucide-react';
import { AdUnit } from '../components/AdUnit';

// Tool Components
import { AiTextTool } from '../components/tools/AiTextTool';
import { AiVisionTool } from '../components/tools/AiVisionTool';
import { AiChatTool } from '../components/tools/AiChatTool';
import { ImageTool } from '../components/tools/ImageTool';
import { UtilityTool } from '../components/tools/UtilityTool';
import { DownloaderTool } from '../components/tools/DownloaderTool';
import { AiImageTool } from '../components/tools/AiImageTool';
import { YoutubeUtilsTool } from '../components/tools/YoutubeUtilsTool';

interface ToolPageProps {
  toolId: ToolId;
  onBack: () => void;
}

export const ToolPage: React.FC<ToolPageProps> = ({ toolId, onBack }) => {
  const toolDef = TOOLS.find(t => t.id === toolId);

  if (!toolDef) {
    return <div className="text-demon-neon text-center mt-20">Tool lost in the void.</div>;
  }

  const renderToolContent = () => {
    // Downloaders
    if (toolId.startsWith('dl-')) {
       return <DownloaderTool toolId={toolId} title={toolDef.title} />;
    }

    // New functional components routing
    if (toolId.startsWith('ai-') || toolId.startsWith('cs-') || toolId.startsWith('text-') || toolId.startsWith('dev-')) {
        // Exceptions for specific AI tools
        if (toolId === ToolId.AI_CHAT) return <AiChatTool />;
        if (toolId === ToolId.AI_CAPTION) return <AiVisionTool mode="caption" />;
        if (toolId === ToolId.DEV_BASE64 || toolId === ToolId.TEXT_DEDUP || toolId === ToolId.TEXT_PARA_FORMAT || toolId === ToolId.DEV_JSON_FMT) {
             const mode = toolId.replace('dev-', '').replace('text-', '');
             return <AiTextTool mode={mode} title={toolDef.title} />;
        }
        
        // Image CS tools (Actually these are Image category, handled below)
        if (!toolDef.category.includes('Image')) {
             const mode = toolId.replace('ai-', '').replace('cs-', '');
             return <AiTextTool mode={mode} title={toolDef.title} />;
        }
    }

    if (toolId.startsWith('img-') || toolId.startsWith('cs-') && toolDef.category === 'Image Tools') {
        if (toolId === ToolId.IMG_ANIME_GEN) return <AiImageTool mode="anime-gen" />;
        if (toolId === ToolId.IMG_REMOVE_BG) return <AiImageTool mode="remove-bg" />;
        
        // Map other image CS tools to existing generic tools or AI Image Tool
        if (toolId === ToolId.CS_CLEAR_BG || toolId === ToolId.CS_MAGIC_BG || toolId === ToolId.IMG_BG_REPLACE) {
             return <AiImageTool mode="remove-bg" />; // Functional equivalent
        }
        
        // Simple Utils
        return <ImageTool type={toolId} />;
    }

    if (toolId.startsWith('yt-')) {
        return <YoutubeUtilsTool toolId={toolId} title={toolDef.title} />;
    }

    // Fallbacks
    switch (toolId) {
      case ToolId.PASS_GEN:
      case ToolId.QR_GEN:
      case ToolId.WORD_COUNTER:
      case ToolId.CASE_CONVERT:
      case ToolId.PDF_TEXT:
        return <UtilityTool type={toolId} />; 
      default:
        // Try mapping remaining CS tools to text tool if they missed the checks
        const mode = toolId.replace('cs-', '');
        return <AiTextTool mode={mode} title={toolDef.title} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-4">
      <button 
        onClick={onBack}
        className="flex items-center text-xs md:text-sm text-gray-500 hover:text-demon-neon transition-colors mb-2 group"
      >
        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Arsenal
      </button>

      {/* Tool Container */}
      <div className="glass-card rounded-xl p-3 md:p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        {/* Animated Header Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-demon-neon to-transparent opacity-80 animate-pulse"></div>

        <div className="mb-2 border-b border-white/5 pb-2 flex flex-col md:flex-row justify-between items-center gap-1 text-center md:text-left">
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-white font-brand uppercase tracking-wider drop-shadow-lg leading-none">{toolDef.title}</h2>
            <p className="text-[10px] md:text-xs text-gray-400 max-w-lg leading-tight mt-1">{toolDef.description}</p>
          </div>
          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[9px] font-mono bg-green-900/20 border-green-500/20 text-green-400">
            <span className="w-1 h-1 rounded-full animate-pulse bg-green-500"></span>
            ONLINE
          </div>
        </div>

        {/* --- INLINE AD BEFORE TOOL --- */}
        <div className="mb-2 w-full flex justify-center">
            {/* Native Ad Placement */}
            <AdUnit type="native" className="w-full" />
        </div>

        <div className="min-h-[100px]">
          {renderToolContent()}
        </div>

        {/* --- INLINE AD AFTER TOOL --- */}
        <div className="mt-3 pt-3 border-t border-white/5 w-full flex flex-col items-center">
             <p className="text-center text-[9px] text-gray-600 mb-1 uppercase tracking-widest">Sponsored Content</p>
             <AdUnit type="native" className="w-full" />
        </div>
      </div>
    </div>
  );
};
