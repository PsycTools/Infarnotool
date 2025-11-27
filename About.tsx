
import React from 'react';
import { ArrowLeft, Target, Shield, Zap, Code, Users, Globe } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up pb-10">
      <button 
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-demon-neon transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Arsenal
      </button>

      <div className="glass-card rounded-2xl p-6 md:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-800">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold font-brand text-white mb-4 uppercase tracking-wider">
            We Are <span className="text-demon-neon">Infrano</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Forging the ultimate arsenal for digital creators. We break the limits of what's possible on the web.
          </p>
        </div>

        {/* --- MISSION STATEMENT --- */}
        <div className="mb-20">
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start border-b border-gray-800 pb-2">
                <Target className="text-demon-blood w-6 h-6" />
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Our Mission</h3>
            </div>
            <div className="bg-black/30 border border-gray-800 p-6 md:p-8 rounded-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-demon-blood/10 blur-[50px] rounded-full group-hover:bg-demon-blood/20 transition-all"></div>
                <p className="text-gray-300 text-base md:text-lg leading-loose relative z-10 text-justify">
                    In an era where powerful AI is locked behind paywalls and complex interfaces, Infrano's mission is to 
                    <span className="text-white font-bold"> democratize access to the bleeding edge</span>. 
                    We believe that every developer, artist, and creator deserves a suite of professional-grade utilities that are 
                    fast, free, and unrestricted. We exist to empower the digital legion to build, create, and conquer without boundaries.
                </p>
            </div>
        </div>

        {/* --- CORE VALUES --- */}
        <div className="mb-20">
            <div className="flex items-center gap-3 mb-8 justify-center md:justify-start border-b border-gray-800 pb-2">
                <Shield className="text-demon-blood w-6 h-6" />
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest">Core Values</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl hover:border-demon-blood/50 transition-colors group">
                    <div className="w-12 h-12 bg-black border border-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:border-demon-neon/50">
                        <Zap className="text-demon-neon w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Unrelenting Speed</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        We optimize for milliseconds. Our tools are built on lightweight architecture to ensure instant execution, no matter the device.
                    </p>
                </div>

                <div className="p-6 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl hover:border-demon-blood/50 transition-colors group">
                    <div className="w-12 h-12 bg-black border border-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:border-demon-neon/50">
                        <Code className="text-demon-neon w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">The Void Principle</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Privacy is paramount. We operate on a stateless basis—what you process in Infrano stays on your device or in the temporary void.
                    </p>
                </div>

                <div className="p-6 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-xl hover:border-demon-blood/50 transition-colors group">
                    <div className="w-12 h-12 bg-black border border-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:border-demon-neon/50">
                        <Globe className="text-demon-neon w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Universal Access</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Tools should be accessible to all. We fight against gatekeeping by providing high-tier utility for free, supported only by the community.
                    </p>
                </div>
            </div>
        </div>

        {/* --- TEAM SECTION --- */}
        <div>
            <div className="flex items-center gap-3 mb-8 justify-center md:justify-start border-b border-gray-800 pb-2">
                <Users className="text-demon-blood w-6 h-6" />
                <h3 className="text-2xl font-bold text-white uppercase tracking-widest">The Architects</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Team Member 1 */}
                <div className="glass-card p-4 rounded-xl text-center group hover:bg-white/5 transition-all">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-800 border-2 border-gray-700 mb-4 overflow-hidden relative">
                        <div className="absolute inset-0 bg-demon-blood/20"></div>
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=Zero&backgroundColor=1a1a1a`} alt="Avatar" className="w-full h-full p-2" />
                    </div>
                    <h4 className="text-white font-bold font-brand tracking-wide text-lg">ZERO</h4>
                    <p className="text-demon-neon text-xs font-bold uppercase mb-2">Lead Architect</p>
                    <p className="text-gray-500 text-xs">Master of the backend void and AI integration protocols.</p>
                </div>

                {/* Team Member 2 */}
                <div className="glass-card p-4 rounded-xl text-center group hover:bg-white/5 transition-all">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-800 border-2 border-gray-700 mb-4 overflow-hidden relative">
                        <div className="absolute inset-0 bg-blue-900/20"></div>
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=Cipher&backgroundColor=1a1a1a`} alt="Avatar" className="w-full h-full p-2" />
                    </div>
                    <h4 className="text-white font-bold font-brand tracking-wide text-lg">CIPHER</h4>
                    <p className="text-blue-400 text-xs font-bold uppercase mb-2">Security Ops</p>
                    <p className="text-gray-500 text-xs">Guardian of data privacy and infrastructure integrity.</p>
                </div>

                {/* Team Member 3 */}
                <div className="glass-card p-4 rounded-xl text-center group hover:bg-white/5 transition-all">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-800 border-2 border-gray-700 mb-4 overflow-hidden relative">
                        <div className="absolute inset-0 bg-purple-900/20"></div>
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=Neon&backgroundColor=1a1a1a`} alt="Avatar" className="w-full h-full p-2" />
                    </div>
                    <h4 className="text-white font-bold font-brand tracking-wide text-lg">NEON</h4>
                    <p className="text-purple-400 text-xs font-bold uppercase mb-2">Visual Director</p>
                    <p className="text-gray-500 text-xs">Weaving the demonic aesthetic and user experience.</p>
                </div>

                {/* Team Member 4 */}
                <div className="glass-card p-4 rounded-xl text-center group hover:bg-white/5 transition-all">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-800 border-2 border-gray-700 mb-4 overflow-hidden relative">
                        <div className="absolute inset-0 bg-green-900/20"></div>
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=Flux&backgroundColor=1a1a1a`} alt="Avatar" className="w-full h-full p-2" />
                    </div>
                    <h4 className="text-white font-bold font-brand tracking-wide text-lg">FLUX</h4>
                    <p className="text-green-400 text-xs font-bold uppercase mb-2">Community Lead</p>
                    <p className="text-gray-500 text-xs">The bridge between the users and the development core.</p>
                </div>
            </div>
        </div>

        <div className="text-center border-t border-white/10 mt-16 pt-8">
            <p className="text-gray-500 italic text-sm">"We do not fear the unknown. We code it."</p>
        </div>
      </div>
    </div>
  );
};
