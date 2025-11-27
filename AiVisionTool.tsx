
import React, { useState, useRef } from 'react';
import { Button } from '../Button';
import { generateImageCaption } from '../../services/geminiService';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface AiVisionToolProps {
  mode: 'caption' | 'ocr';
}

export const AiVisionTool: React.FC<AiVisionToolProps> = ({ mode }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];
        
        setSelectedImage(base64Data);
        setMimeType(file.type);
        setResult(''); // Clear previous result
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!selectedImage) return;
    setLoading(true);
    const caption = await generateImageCaption(selectedImage, mimeType);
    setResult(caption);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-3 md:gap-4">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full max-w-md h-20 md:h-32 border-2 border-dashed border-gray-700 hover:border-blood-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gray-900/30 hover:bg-gray-900/50 transition-all group relative overflow-hidden"
      >
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
        
        {selectedImage ? (
           <img 
             src={`data:${mimeType};base64,${selectedImage}`} 
             alt="Preview" 
             className="absolute inset-0 w-full h-full object-contain p-2" 
           />
        ) : (
          <>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Upload className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-blood-500" />
            </div>
            <p className="text-gray-400 group-hover:text-gray-300 text-xs md:text-sm">Click to upload Image</p>
            <p className="text-[9px] md:text-[10px] text-gray-600 mt-0.5">JPG, PNG, WEBP supported</p>
          </>
        )}
      </div>

      <Button onClick={handleProcess} disabled={!selectedImage} isLoading={loading} className="w-full max-w-md h-9 md:h-10 text-sm">
        {mode === 'caption' ? 'Generate Caption' : 'Extract Text'}
      </Button>

      {result && (
        <div className="w-full max-w-2xl bg-black/60 border border-gray-800 p-3 rounded-xl animate-fade-in-up">
           <h3 className="text-blood-500 font-bold mb-1.5 flex items-center gap-2 text-xs md:text-sm">
             <ImageIcon size={14} /> Analysis Result
           </h3>
           <p className="text-gray-200 leading-relaxed text-xs md:text-sm">{result}</p>
        </div>
      )}
    </div>
  );
};
