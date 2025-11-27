
import React, { ReactNode, useEffect, useRef } from 'react';
import { Flame, Ghost, Menu, X } from 'lucide-react';
import { AdUnit } from './components/AdUnit';

interface LayoutProps {
  children: ReactNode;
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateFAQ: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onNavigateHome,
  onNavigateAbout,
  onNavigateFAQ 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const socialBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject Social Bar Script
    if (socialBarRef.current) {
        // Prevent double injection
        if (socialBarRef.current.querySelector('script')) return;

        const script = document.createElement('script');
        script.src = '//pl28139525.effectivegatecpm.com/0b3044d0173541ca3d85e0a22dd3a171/invoke.js';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        socialBarRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col font-sans text-gray-200 selection:bg-demon-neon selection:text-white pb-20">
      
      {/* --- DEMONIC ATMOSPHERE --- */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-demon-black">
        {/* Blood Nebulas */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-demon-blood/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-demon-neon/5 rounded-full blur-[150px] animate-pulse-slow"></div>
        
        {/* Fog & Noise */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 glass-card border-b-0 border-b-demon-blood/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onNavigateHome}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-demon-neon blur-md opacity-20 group-hover:opacity-60 transition-opacity duration-300"></div>
              <Flame className="w-8 h-8 text-demon-neon relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,0,51,0.5)]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-widest font-brand text-white group-hover:text-demon-neon transition-colors">
                INFRANO
              </h1>
              <p className="text-[9px] text-gray-500 uppercase tracking-[0.4em] font-bold">Tools of the Void</p>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
             <button onClick={onNavigateHome} className="text-sm font-medium hover:text-demon-neon transition-colors">Arsenal</button>
             <button onClick={onNavigateAbout} className="text-sm font-medium hover:text-demon-neon transition-colors">Grimoire</button>
             <div className="h-4 w-[1px] bg-gray-700"></div>
             <button className="px-4 py-1.5 rounded-full border border-demon-neon/50 text-demon-neon text-xs font-bold uppercase tracking-wide hover:bg-demon-neon hover:text-white transition-all shadow-[0_0_15px_rgba(255,0,51,0.2)]">
                Get Premium
             </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-gray-300" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* --- TOP AD BANNER (728x90) --- */}
      <div className="w-full bg-black/40 border-b border-white/5 py-2 flex justify-center overflow-hidden">
         <AdUnit type="banner" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 gap-8 relative z-10">
        
        {/* Left Sidebar Ad (Desktop Only) */}
        <aside className="hidden lg:block w-[160px] xl:w-[300px] flex-shrink-0 sticky top-24 h-fit space-y-4">
           <div className="text-[10px] text-gray-600 uppercase tracking-widest text-center mb-2">Sponsors</div>
           <AdUnit type="sidebar" />
        </aside>

        {/* Center App Area */}
        <main className="flex-grow w-full min-w-0">
          {children}
        </main>
      </div>

      {/* --- FOOTER --- */}
      <footer className="border-t border-demon-blood/20 bg-black/80 backdrop-blur-md mt-12 py-10 pb-32 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 mb-4 animate-demon-flicker">
            <Ghost className="w-5 h-5 text-demon-blood" />
            <span className="font-brand text-xl text-demon-red tracking-wider">INFRANO TOOLS</span>
          </div>
          <p className="text-gray-600 text-xs max-w-md">
            Forged in the depths of code. Built for creators who break limits.
            <br/>Ads support this project. Disable AdBlocker to keep the flame alive.
          </p>
          <div className="mt-6 flex gap-4 text-xs text-gray-500">
             <button onClick={onNavigateAbout} className="hover:text-demon-neon transition-colors">About Us</button>
             <span>•</span>
             <button onClick={onNavigateFAQ} className="hover:text-demon-neon transition-colors">FAQ</button>
             <span>•</span>
             <a href="#" className="hover:text-demon-neon transition-colors">Terms</a>
             <span>•</span>
             <a href="#" className="hover:text-demon-neon transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* --- STICKY BOTTOM AD (320x50) --- */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-black/90 backdrop-blur-lg border-t border-demon-neon/20 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] flex justify-center items-center py-1 px-2">
         <AdUnit type="sticky" />
      </div>

      {/* --- ADSTERRA SOCIAL BAR CONTAINER --- */}
      <div ref={socialBarRef}>
         <div id="container-0b3044d0173541ca3d85e0a22dd3a171"></div>
      </div>

    </div>
  );
};
