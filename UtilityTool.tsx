
import React, { useState } from 'react';
import { Button } from '../Button';
import { ToolId } from '../../types';
import QRCode from 'react-qr-code'; 
import { Copy, RefreshCw, ChevronRight } from 'lucide-react';

interface UtilityToolProps {
  type: ToolId;
}

export const UtilityTool: React.FC<UtilityToolProps> = ({ type }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [passLength, setPassLength] = useState(16);

  const handleAction = () => {
    switch(type) {
      case ToolId.PASS_GEN:
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let pass = "";
        for(let i=0; i<passLength; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
        setResult(pass);
        break;
      case ToolId.WORD_COUNTER:
        const words = input.trim().split(/\s+/).filter(w => w.length > 0).length;
        setResult(`Words: ${words} | Characters: ${input.length}`);
        break;
      case ToolId.CASE_CONVERT:
        setResult(input === input.toUpperCase() ? input.toLowerCase() : input.toUpperCase());
        break;
       case ToolId.QR_GEN:
         setResult(input);
         break;
       case ToolId.PDF_TEXT:
         setResult("PDF Simulation: Text extracted successfully.");
         break;
    }
  };

  return (
    <div className="flex flex-col h-[500px] border border-gray-800 rounded-xl bg-gray-900/20 overflow-hidden">
        
        {/* Result Area (Top) */}
        <div className="flex-grow flex items-center justify-center p-4 bg-black/40 relative">
             {result || type === ToolId.PASS_GEN ? (
                 <div className="text-center w-full max-w-lg animate-fade-in-up">
                    {type === ToolId.QR_GEN ? (
                        <div className="bg-white p-3 rounded-xl inline-block shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(result)}`} alt="QR" className="w-40 h-40" />
                        </div>
                    ) : (
                        <div className="relative group">
                            <div className="text-xl md:text-2xl font-mono text-demon-neon break-all bg-black/60 p-6 rounded-xl border border-gray-800">
                                {result}
                            </div>
                            <button onClick={() => navigator.clipboard.writeText(result)} className="absolute top-2 right-2 text-gray-600 hover:text-white">
                                <Copy size={14} />
                            </button>
                        </div>
                    )}
                 </div>
             ) : (
                 <div className="text-gray-700 uppercase tracking-widest text-sm font-bold">Waiting for Input</div>
             )}
        </div>

        {/* Input Area (Bottom) */}
        <div className="flex-shrink-0 bg-gray-900 p-4 border-t border-gray-800">
             {type !== ToolId.PASS_GEN && type !== ToolId.PDF_TEXT && (
                <div className="flex gap-2">
                    <input 
                      className="flex-grow bg-black/60 border border-gray-700 rounded-xl px-4 h-10 text-sm text-white focus:border-demon-neon outline-none"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder={type === ToolId.QR_GEN ? "URL for QR..." : "Type text here..."}
                    />
                    <Button onClick={handleAction} className="h-10 w-10 p-0 flex items-center justify-center rounded-xl">
                        <ChevronRight size={20} />
                    </Button>
                </div>
             )}

             {type === ToolId.PASS_GEN && (
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-16">Len: {passLength}</span>
                    <input type="range" min="8" max="64" value={passLength} onChange={(e) => setPassLength(parseInt(e.target.value))} className="flex-grow accent-demon-neon h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer" />
                    <Button onClick={handleAction} className="h-9 px-4 text-xs">Regenerate</Button>
                </div>
             )}
             
             {type === ToolId.PDF_TEXT && (
                 <Button onClick={handleAction} className="w-full h-10 text-sm">Upload & Extract PDF</Button>
             )}
        </div>
    </div>
  );
};
