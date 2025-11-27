
import React, { useState, useRef } from 'react';
import { Button } from '../Button';
import { removeBackground } from '../../services/imageService';
import { generateImage } from '../../services/geminiService';
import { Download, Upload, Zap, Image as ImageIcon, AlertTriangle, Sparkles, Send } from 'lucide-react';

interface AiImageToolProps {
  mode: 'remove-bg' | 'anime-gen';
}

const DEMO_PROMPTS = [
    "Cyberpunk samurai",
    "Neon city rain",
    "Fantasy dragon",
    "Space station",
    "Cute robot"
];

export const AiImageTool: React.FC<AiImageToolProps> = ({ mode }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultUrl(null);
      setError(null);
    }
  };

  const handleProcess = async () => {
    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      if (mode === 'remove-bg') {
        if (!selectedImage) throw new Error("No image selected");
        const blob = await removeBackground(selectedImage);
        const url = URL.createObjectURL(blob);
        setResultUrl(url);
      } else {
        if (!prompt) throw new Error("Prompt is empty");
        const base64Url = await generateImage(prompt + ", high quality, detailed");
        if (!base64Url) throw new Error("Generation failed.");
        setResultUrl(base64Url);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] bg-black/20 rounded-xl overflow-hidden relative border border-gray-800">
      
      {/* --- CANVAS / RESULT AREA (Top) --- */}
      <div className="flex-grow relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-gray-900/30 flex items-center justify-center p-4 overflow-hidden">
        
        {/* Placeholder / Upload Trigger */}
        {!resultUrl && !previewUrl && (
             <div className="text-center opacity-40">
                {mode === 'anime-gen' ? (
                     <>
                        <ImageIcon className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-sm uppercase tracking-widest">Canvas Empty</p>
                     </>
                ) : (
                    <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer hover:scale-105 transition-transform p-10 border-2 border-dashed border-gray-600 rounded-xl">
                         <Upload className="w-10 h-10 mx-auto mb-2" />
                         <p className="text-xs uppercase tracking-widest">Upload Image</p>
                    </div>
                )}
             </div>
        )}

        {/* Content */}
        {(resultUrl || previewUrl) && (
            <img 
              src={resultUrl || previewUrl || ''} 
              alt="Content" 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-lg animate-fade-in-up" 
            />
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
             <div className="bg-black/80 p-4 rounded-xl border border-demon-neon/30 flex flex-col items-center shadow-[0_0_30px_rgba(255,0,51,0.2)]">
                <div className="w-8 h-8 border-2 border-demon-neon border-t-transparent rounded-full animate-spin mb-3"></div>
                <span className="text-xs text-demon-neon font-bold tracking-widest animate-pulse">
                    {mode === 'remove-bg' ? 'EXORCISING BACKGROUND...' : 'SUMMONING PIXELS...'}
                </span>
             </div>
          </div>
        )}

        {/* Download Action (Floating) */}
        {resultUrl && (
            <a 
              href={resultUrl} 
              download={`infrano-${Date.now()}.png`} 
              className="absolute top-4 right-4 z-10"
            >
                <Button className="h-8 text-xs shadow-lg opacity-90 hover:opacity-100">
                    <Download size={14} className="mr-2" /> Download
                </Button>
            </a>
        )}
        
        {/* Error Toast */}
        {error && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-900/90 text-white text-xs px-4 py-2 rounded-lg border border-red-500 flex items-center gap-2">
                <AlertTriangle size={12} /> {error}
            </div>
        )}
      </div>

      {/* --- CONTROLS AREA (Bottom) --- */}
      <div className="flex-shrink-0 p-3 bg-gray-900/90 border-t border-white/5 backdrop-blur-md z-30">
        
        {/* Helper Chips */}
        {mode === 'anime-gen' && (
            <div className="flex gap-2 overflow-x-auto pb-2 mb-1 scrollbar-none">
                {DEMO_PROMPTS.map((p, i) => (
                    <button key={i} onClick={() => setPrompt(p)} className="whitespace-nowrap text-[9px] px-2 py-1 rounded border border-gray-700 bg-black/40 text-gray-400 hover:text-white hover:border-demon-neon transition-colors">
                        {p}
                    </button>
                ))}
            </div>
        )}

        {/* Input Bar */}
        <div className="flex gap-2 items-center">
            {mode === 'remove-bg' && (
                 <>
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                    <button onClick={() => fileInputRef.current?.click()} className="flex-grow bg-black/60 border border-gray-700 text-gray-300 rounded-xl h-10 px-4 text-xs hover:border-demon-neon hover:text-white transition-all flex items-center justify-center gap-2">
                        <Upload size={14} /> {selectedImage ? selectedImage.name : "Select Image File..."}
                    </button>
                 </>
            )}

            {mode === 'anime-gen' && (
                <div className="flex-grow relative">
                    <input 
                      type="text" 
                      className="w-full h-10 bg-black/60 border border-gray-700 rounded-xl px-4 text-sm text-white focus:border-demon-neon focus:shadow-[0_0_15px_rgba(255,0,51,0.1)] outline-none transition-all"
                      placeholder="Describe your vision..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleProcess()}
                    />
                </div>
            )}

            <button 
                onClick={handleProcess} 
                disabled={loading || (mode === 'anime-gen' && !prompt) || (mode === 'remove-bg' && !selectedImage)}
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-demon-blood hover:bg-red-700 text-white transition-all shadow-lg disabled:opacity-50 disabled:grayscale"
            >
                <Zap size={18} fill="currentColor" />
            </button>
        </div>
      </div>

    </div>
  );
};
