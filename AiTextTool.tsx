import React, { useState, useEffect, useRef } from 'react';
import { generateText } from '../../services/geminiService';
import { Copy, RefreshCw, Sparkles, Send, Eraser } from 'lucide-react';

interface AiTextToolProps {
  mode: string;
  title: string;
}

interface ToolConfig {
  promptTemplate: (input: string) => string;
  examples: string[];
  placeholder: string;
}

const TOOL_CONFIGS: Record<string, ToolConfig> = {
  'text-gen': { promptTemplate: (i) => i, examples: ["Cyberpunk city story", "Workout plan", "Email to boss"], placeholder: "What should I write?" },
  'rewriter': { promptTemplate: (i) => `Rewrite this text to be more engaging, clear, and professional:\n\n${i}`, examples: ["Fix grammar", "Make it professional", "Simplify text"], placeholder: "Paste text to rewrite..." },
  'code-explain': { promptTemplate: (i) => `Explain this code step-by-step:\n\n${i}`, examples: ["React useEffect", "Python Sort", "SQL Query"], placeholder: "Paste code..." },
  'ideas': { promptTemplate: (i) => `Generate 10 viral ideas for: ${i}`, examples: ["YouTube Tech", "Instagram Fashion", "Blog Cooking"], placeholder: "Topic..." },
  'yt-desc': { promptTemplate: (i) => `Write a viral YouTube description & title for: ${i}`, examples: ["iPhone Review", "React Tutorial"], placeholder: "Video topic..." },
  'hashtag': { promptTemplate: (i) => `Generate 30 trending hashtags for: ${i}`, examples: ["Gym Motivation", "Digital Art"], placeholder: "Topic..." },
  'social-caption': { promptTemplate: (i) => `Write 3 social media captions for: ${i}`, examples: ["New Car", "Travel Vlog"], placeholder: "Post context..." },
  'yt-summarize': { promptTemplate: (i) => `Summarize this: ${i}`, examples: ["Long transcript"], placeholder: "Paste text..." },
  'yt-title': { promptTemplate: (i) => `10 Clickbait titles for: ${i}`, examples: ["Vlog", "Tutorial"], placeholder: "Topic..." },
  'meta-tag': { promptTemplate: (i) => `SEO Meta tags for: ${i}`, examples: ["E-commerce", "Portfolio"], placeholder: "Page topic..." },
  'seo-boost': { promptTemplate: (i) => `SEO Analysis for: ${i}`, examples: ["Blog post"], placeholder: "Content..." },
  'write-genius': { promptTemplate: (i) => `Creative writing on: ${i}`, examples: ["Sci-fi story"], placeholder: "Prompt..." },
  'script-pilot': { promptTemplate: (i) => `YouTube Script for: ${i}`, examples: ["How-to video"], placeholder: "Topic..." },
  'content-crafter': { promptTemplate: (i) => `Blog post about: ${i}`, examples: ["Health tips"], placeholder: "Topic..." },
  'json-fmt': { promptTemplate: (i) => `Format JSON: ${i}`, examples: ["{'a':1}"], placeholder: "JSON..." },
  'clean-text': { promptTemplate: (i) => `Clean text: ${i}`, examples: ["Bad formatting"], placeholder: "Text..." },
  'smart-text': { promptTemplate: (i) => `Structure text: ${i}`, examples: ["Notes"], placeholder: "Text..." },
  'note-fixer': { promptTemplate: (i) => `Organize notes: ${i}`, examples: ["Meeting notes"], placeholder: "Notes..." }
};

export const AiTextTool: React.FC<AiTextToolProps> = ({ mode, title }) => {
  const [input, setInput] = useState('');
  const [displayedOutput, setDisplayedOutput] = useState('');
  const [fullOutput, setFullOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const config = TOOL_CONFIGS[mode] || TOOL_CONFIGS['text-gen'];
  const outputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInput('');
    setFullOutput('');
    setDisplayedOutput('');
    setLoading(false);
    setIsTyping(false);
  }, [mode]);

  // Typewriter Effect Logic
  useEffect(() => {
    if (fullOutput && fullOutput !== displayedOutput) {
      setIsTyping(true);
      const timeoutId = setTimeout(() => {
        setDisplayedOutput(fullOutput.slice(0, displayedOutput.length + 3)); // Type 3 chars at a time for speed
        
        // Auto scroll to bottom while typing
        if (outputContainerRef.current) {
            outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
        }
      }, 5); // Speed in ms
      return () => clearTimeout(timeoutId);
    } else if (fullOutput && fullOutput === displayedOutput) {
      setIsTyping(false);
    }
  }, [fullOutput, displayedOutput]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setDisplayedOutput('');
    setFullOutput('');
    
    try {
        const finalPrompt = config.promptTemplate(input);
        const result = await generateText(finalPrompt, 'gemini-2.5-flash');
        setFullOutput(result);
    } catch (e) {
        setFullOutput("Error: The connection to the void was interrupted.");
    } finally {
        setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullOutput);
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] bg-black/20 rounded-xl overflow-hidden relative border border-white/5 transition-all focus-within:border-gray-600">
      
      {/* --- OUTPUT AREA (Top / Main) --- */}
      <div 
        ref={outputContainerRef}
        className="flex-grow overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent relative scroll-smooth"
      >
        {(displayedOutput || loading) ? (
          <div className="animate-fade-in-up min-h-full pb-10">
            <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-2 sticky top-0 bg-black/80 backdrop-blur-md z-10 pt-1">
              <div className="flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${isTyping || loading ? 'bg-demon-neon animate-pulse' : 'bg-gray-600'}`}></span>
                 <span className="text-[10px] text-demon-neon font-bold uppercase tracking-widest">
                    {loading ? 'Processing...' : isTyping ? 'Streaming Data...' : 'Result Complete'}
                 </span>
              </div>
              <button onClick={copyToClipboard} className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded">
                <Copy size={12} /> Copy
              </button>
            </div>
            
            <div className={`text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap font-mono ${isTyping ? 'cursor-blink' : ''}`}>
              {displayedOutput}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50 space-y-4">
            <div className="relative">
                <div className="absolute inset-0 bg-demon-neon blur-[30px] opacity-20"></div>
                <Sparkles className="w-12 h-12 text-gray-700 relative z-10" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] font-medium">System Ready. Awaiting Input.</p>
          </div>
        )}
        
        {loading && !displayedOutput && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-20">
             <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-2 border-demon-neon border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="text-xs text-demon-neon animate-pulse tracking-widest">DECRYPTING...</span>
             </div>
          </div>
        )}
      </div>

      {/* --- INPUT AREA (Bottom / Compact) --- */}
      <div className="flex-shrink-0 p-3 bg-gray-900/80 border-t border-white/5 backdrop-blur-md z-30">
        
        {/* Chips Row */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-1 scrollbar-none">
          {config.examples.map((ex, i) => (
            <button 
              key={i}
              onClick={() => setInput(ex)}
              className="whitespace-nowrap text-[9px] md:text-[10px] px-2 py-1 rounded border border-gray-700 bg-black/40 text-gray-400 hover:text-white hover:border-demon-neon/50 hover:bg-demon-neon/5 transition-all"
            >
              {ex}
            </button>
          ))}
          {displayedOutput && (
             <button onClick={() => {setFullOutput(''); setDisplayedOutput(''); setInput('');}} className="whitespace-nowrap text-[9px] md:text-[10px] px-2 py-1 rounded border border-red-900/50 bg-red-900/10 text-red-400 hover:bg-red-900/30 flex items-center gap-1 transition-colors">
               <Eraser size={10} /> Reset
             </button>
          )}
        </div>

        {/* Compact Input Bar */}
        <div className="relative flex items-end gap-2 bg-black/60 border border-gray-700 rounded-xl p-1.5 focus-within:border-demon-neon/50 focus-within:shadow-[0_0_20px_rgba(255,0,51,0.15)] transition-all duration-300">
          <textarea
            className="flex-grow bg-transparent border-none outline-none text-white text-sm px-2 py-1.5 min-h-[40px] max-h-[120px] resize-none placeholder-gray-600 scrollbar-thin"
            placeholder={config.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleGenerate();
              }
            }}
          />
          <button 
            onClick={handleGenerate} 
            disabled={!input.trim() || loading}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-demon-blood to-red-700 hover:from-red-600 hover:to-red-500 text-white disabled:opacity-50 disabled:grayscale transition-all shadow-lg hover:shadow-demon-neon/30"
          >
            {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4 ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};