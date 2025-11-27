import React, { useState } from 'react';
import { ToolDef } from '../types';
import * as Icons from 'lucide-react';

interface ToolCardProps {
  tool: ToolDef;
  onClick: (id: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  
  // Dynamically resolve icon
  const IconComponent = (Icons as any)[tool.icon] || Icons.Wrench;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsActive(true);
    setTimeout(() => {
      onClick(tool.id);
      setTimeout(() => setIsActive(false), 200);
    }, 400);
  };

  return (
    <div 
      onClick={handleClick}
      className={`spotlight-hover group relative glass-card rounded-xl p-5 cursor-pointer overflow-hidden transition-all duration-500
        ${isActive 
          ? 'border-demon-neon shadow-[0_0_50px_rgba(255,0,51,0.6)] scale-95 ring-1 ring-demon-neon' 
          : 'hover:border-demon-blood/40 hover:shadow-[0_10px_40px_-10px_rgba(139,0,0,0.3)] hover:-translate-y-1'
        }
      `}
    >
      {/* Dynamic Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-demon-blood/5 via-transparent to-demon-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>

      {/* Badges */}
      <div className="absolute top-3 right-3 flex gap-2 z-20">
        {tool.isHot && (
          <span className="bg-demon-neon/10 border border-demon-neon/40 text-demon-neon text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(255,0,51,0.2)] flex items-center gap-1">
             <span className="w-1 h-1 bg-demon-neon rounded-full animate-pulse"></span> HOT
          </span>
        )}
        {tool.isNew && (
          <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            NEW
          </span>
        )}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon Container */}
        <div className={`mb-4 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 border relative overflow-hidden
          ${isActive 
            ? 'bg-demon-neon border-demon-neon text-white rotate-12 scale-110 shadow-lg' 
            : 'bg-black/60 border-white/5 text-gray-400 group-hover:text-white group-hover:border-demon-blood/50 group-hover:bg-gradient-to-br group-hover:from-gray-900 group-hover:to-black'
          }`}>
          
          {/* Icon Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer"></div>
          
          <IconComponent className="w-6 h-6 relative z-10" />
        </div>
        
        <h3 className={`text-lg font-bold font-brand uppercase tracking-wider mb-2 transition-colors duration-300
           ${isActive ? 'text-demon-neon' : 'text-gray-100 group-hover:text-white'}
        `}>
          {tool.title}
        </h3>
        
        <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors line-clamp-2">
          {tool.description}
        </p>

        {/* Action Arrow */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
           <span className="text-[10px] uppercase tracking-widest text-demon-neon font-bold">Launch Tool</span>
           <Icons.ArrowRight className="w-4 h-4 text-demon-neon group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};