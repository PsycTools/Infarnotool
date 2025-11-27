
import React from 'react';
import { ArrowLeft, ScrollText, AlertTriangle, Gavel } from 'lucide-react';

interface TermsProps {
  onBack: () => void;
}

export const Terms: React.FC<TermsProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-10">
      <button 
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-demon-neon transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Arsenal
      </button>

      <div className="glass-card rounded-2xl p-6 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <h2 className="text-3xl md:text-4xl font-bold font-brand text-white mb-8 uppercase tracking-wider border-b border-gray-800 pb-4">
          Terms & <span className="text-demon-neon">Conditions</span>
        </h2>
        
        <div className="space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
          <section>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <ScrollText className="text-demon-blood w-5 h-5" />
              1. Agreement to Terms
            </h3>
            <p>
              By accessing Infrano Tools, you agree to be bound by these Terms of Service. If you do not agree to abide by the terms of this agreement, you are not authorized to use or access the website.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="text-demon-blood w-5 h-5" />
              2. Usage Restrictions
            </h3>
            <p>
              You agree not to use the website for any unlawful purpose. This includes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400">
              <li>Generating content that is illegal, harmful, or promotes hate speech.</li>
              <li>Attempting to bypass API limits or reverse engineer the tools.</li>
              <li>Using automated bots to scrape results.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Gavel className="text-demon-blood w-5 h-5" />
              3. Disclaimer
            </h3>
            <p>
              The materials on Infrano Tools are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
            <p className="mt-2">
              AI-generated content may be inaccurate. Verify all code, facts, and advice before use.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">4. Limitations</h3>
            <p>
              In no event shall Infrano Tools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
