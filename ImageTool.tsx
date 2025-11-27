
import React, { useRef, useState } from 'react';
import { Button } from '../Button';
import { Download, ImagePlus } from 'lucide-react';
import { ToolId } from '../../types';

interface ImageToolProps {
  type: ToolId;
}

export const ImageTool: React.FC<ImageToolProps> = ({ type }) => {
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<string>('');
  const [newSize, setNewSize] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processImage = (file: File) => {
    setIsProcessing(true);
    setOriginalSize(formatSize(file.size));
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        let mimeType = 'image/png';
        let quality = 0.92;

        if (type === ToolId.IMG_TO_JPG) mimeType = 'image/jpeg';
        if (type === ToolId.IMG_TO_WEBP) mimeType = 'image/webp';
        if (type === ToolId.IMG_COMPRESS) {
           mimeType = 'image/jpeg'; // Compress usually implies lossy jpg
           quality = 0.6;
        }

        const dataUrl = canvas.toDataURL(mimeType, quality);
        setProcessedImage(dataUrl);
        
        // Calculate approx new size
        const head = 'data:' + mimeType + ';base64,';
        const size = Math.round((dataUrl.length - head.length) * 3 / 4);
        setNewSize(formatSize(size));
        setIsProcessing(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
       <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full max-w-lg h-20 md:h-28 border-2 border-dashed border-gray-700 hover:border-blood-500 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-gray-900/30 transition-all hover:bg-gray-900/50"
      >
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
        <ImagePlus className="w-5 h-5 md:w-6 md:h-6 text-gray-500 mb-1.5" />
        <p className="text-gray-400 font-medium text-xs md:text-sm">Click to Upload Image</p>
      </div>

      {isProcessing && <p className="text-blood-400 animate-pulse text-xs">Processing Image...</p>}

      {processedImage && !isProcessing && (
        <div className="w-full max-w-lg bg-black/60 border border-gray-800 rounded-xl p-3 flex flex-col items-center animate-fade-in-up">
           <img src={processedImage} alt="Processed" className="max-h-[200px] md:max-h-[250px] w-auto object-contain mb-3 rounded-lg border border-gray-800" />
           
           <div className="grid grid-cols-2 gap-4 w-full mb-3 border-t border-b border-gray-800 py-2">
             <div className="text-center">
               <p className="text-[9px] md:text-[10px] text-gray-500 uppercase">Original Size</p>
               <p className="text-sm md:text-base font-bold text-gray-300">{originalSize}</p>
             </div>
             <div className="text-center">
               <p className="text-[9px] md:text-[10px] text-gray-500 uppercase">New Size</p>
               <p className="text-sm md:text-base font-bold text-blood-500">{newSize}</p>
             </div>
           </div>

           <a href={processedImage} download={`processed-image`} className="w-full">
             <Button className="w-full h-9 text-sm">
               <Download size={16} className="mr-2" /> Download Image
             </Button>
           </a>
        </div>
      )}
    </div>
  );
};
