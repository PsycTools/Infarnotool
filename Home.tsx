import React, { useState, useMemo } from 'react';
import { CATEGORIES, TOOLS } from '../constants';
import { Category, ToolId } from '../types';
import { ToolCard } from '../components/ToolCard';
import { AdUnit } from '../components/AdUnit';
import { Search, Sparkles } from 'lucide-react';

interface HomeProps {
  onNavigateTool: (id: ToolId) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigateTool }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory = activeCategory === Category.ALL || tool.category === activeCategory;
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Helper to inject ads into the grid
  const renderToolsWithAds = () => {
    const nodes: React.ReactNode[] = [];
    filteredTools.forEach((tool, index) => {
      nodes.push(
        <ToolCard 
          key={tool.id} 
          tool={tool} 
          onClick={() => onNavigateTool(tool.id)} 
        />
      );
      
      // Inject Native Ad after every 6 tools
      if ((index + 1) % 6 === 0 && index !== filteredTools.length - 1) {
        nodes.push(
          <div key={`ad-${index}`} className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 py-4 flex justify-center bg-black/20 rounded-xl border border-white/5 relative overflow-hidden group">
             {/* Decorative Ad BG */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <div className="w-full max-w-lg relative z-10">
                <div className="text-[9px] text-gray-600 text-center uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
                    <span className="w-8 h-[1px] bg-gray-800"></span> Sponsored <span className="w-8 h-[1px] bg-gray-800"></span>
                </div>
                {/* Use the 'native' type for grid ads */}
                <AdUnit type="native" />
             </div>
          </div>
        );
      }
    });
    return nodes;
  };

  return (
    <div className="space-y-8 md:space-y-12 pb-10">
      {/* Hero Section */}
      <section className="text-center space-y-3 md:space-y-6 py-6 md:py-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-demon-neon/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-demon-neon uppercase tracking-widest animate-fade-in-up mb-2">
            <Sparkles size={12} />
            <span>AI Powered • Limitless • Free</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold brand-font tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] relative z-10">
          Unleash Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-demon-neon to-demon-blood animate-pulse-slow">Power</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto px-4 leading-relaxed font-light">
          A curated arsenal of elite utilities from the void. <br className="hidden md:block"/>
          Forged for developers, creators, and the digital legion.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8 md:mt-10 relative group px-4 z-20">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-demon-blood to-demon-neon rounded-full blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-black/80 backdrop-blur-xl border border-gray-700/50 rounded-full px-5 py-3 md:py-4 focus-within:border-demon-neon/50 focus-within:shadow-[0_0_30px_rgba(255,0,51,0.15)] transition-all transform focus-within:-translate-y-1">
            <Search className="w-5 h-5 text-gray-500 mr-3 group-focus-within:text-demon-neon transition-colors" />
            <input 
              type="text" 
              placeholder="Search the void (e.g., 'image', 'code', 'youtube')..." 
              className="bg-transparent border-none outline-none text-white w-full placeholder-gray-500 text-sm md:text-base font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="flex flex-wrap justify-center gap-2 md:gap-3 px-2 sticky top-20 z-40 py-2 backdrop-blur-sm mask-gradient">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category as Category)}
            className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border backdrop-blur-md ${
              activeCategory === category 
                ? 'bg-demon-blood/20 border-demon-neon text-white shadow-[0_0_20px_rgba(255,0,51,0.2)]' 
                : 'bg-black/40 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300 hover:bg-white/5'
            }`}
          >
            {category}
          </button>
        ))}
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-1">
        {renderToolsWithAds()}
      </section>

      {filteredTools.length === 0 && (
        <div className="text-center py-20 text-gray-600 animate-pulse">
          <p>The void stares back... No tools found.</p>
        </div>
      )}
    </div>
  );
};