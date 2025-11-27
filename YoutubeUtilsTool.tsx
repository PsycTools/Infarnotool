
import React, { useState } from 'react';
import { Button } from '../Button';
import { generateText } from '../../services/geminiService';
import { Search, Image, Type } from 'lucide-react';

interface YoutubeUtilsToolProps {
  toolId: string;
  title: string;
}

export const YoutubeUtilsTool: React.FC<YoutubeUtilsToolProps> = ({ toolId, title }) => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    
    // Simulate processing
    await new Promise(r => setTimeout(r, 1000));

    if (toolId.includes('thumbnail')) {
       // Mock extracting ID
       const videoId = url.includes('v=') ? url.split('v=')[1].split('&')[0] : 'dQw4w9WgXcQ';
       setResult({
           type: 'thumbnail',
           images: [
               { q: 'HD', u: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
               { q: 'SD', u: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }
           ]
       });
    } else {
       const prompt = toolId.includes('tags') ? `Tags for: ${url}` : `Analyze title: ${url}`;
       const text = await generateText(prompt);
       setResult({ type: 'text', text });
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] border border-gray-800 rounded-xl overflow-hidden bg-gray-900/20">
       <div className="flex-grow p-4 overflow-y-auto bg-black/30">
           {result ? (
               <div className="animate-fade-in-up space-y-4">
                   {result.type === 'thumbnail' ? (
                       <div className="grid gap-4">
                           {result.images.map((img: any, i: number) => (
                               <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-800">
                                   <img src={img.u} className="w-full" />
                                   <a href={img.u} download className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-bold text-sm tracking-widest">
                                       DOWNLOAD {img.q}
                                   </a>
                               </div>
                           ))}
                       </div>
                   ) : (
                       <div className="text-gray-300 font-mono text-sm whitespace-pre-wrap">{result.text}</div>
                   )}
               </div>
           ) : (
               <div className="h-full flex flex-col items-center justify-center text-gray-700">
                   {toolId.includes('thumbnail') ? <Image size={40} /> : <Type size={40} />}
                   <p className="mt-2 text-xs uppercase tracking-widest">Waiting for URL</p>
               </div>
           )}
       </div>
       
       <div className="p-3 bg-gray-900 border-t border-gray-800 flex gap-2">
           <div className="flex-grow flex items-center bg-black/60 border border-gray-700 rounded-xl px-3 h-10 focus-within:border-demon-neon">
               <input 
                 className="bg-transparent w-full text-white text-sm outline-none placeholder-gray-600"
                 placeholder={toolId.includes('thumbnail') ? "Paste YouTube Link..." : "Enter Topic/Title..."}
                 value={url}
                 onChange={e => setUrl(e.target.value)}
               />
           </div>
           <Button onClick={handleProcess} isLoading={loading} className="h-10 w-12 p-0 flex items-center justify-center rounded-xl">
               <Search size={18} />
           </Button>
       </div>
    </div>
  );
};
