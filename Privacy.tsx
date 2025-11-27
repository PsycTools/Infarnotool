
import React from 'react';
import { ArrowLeft, Shield, Eye, Database } from 'lucide-react';

interface PrivacyProps {
  onBack: () => void;
}

export const Privacy: React.FC<PrivacyProps> = ({ onBack }) => {
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
          Privacy <span className="text-demon-neon">Policy</span>
        </h2>
        
        <div className="space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
          <section>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Database className="text-demon-blood w-5 h-5" />
              1. Data Collection
            </h3>
            <p>
              Infrano Tools operates on a "Void Principle". We do not create user accounts, we do not require logins, and we do not store your personal data on our servers.
              Most tools process data client-side (in your browser). For tools requiring AI processing (Gemini), data is sent securely to the API and discarded immediately after processing.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Eye className="text-demon-blood w-5 h-5" />
              2. Cookies & Analytics
            </h3>
            <p>
              We use third-party services like Google Analytics to track aggregate usage statistics (page views, tool popularity). These services may place cookies on your browser. 
              We also use Adsterra to serve advertisements. Ad partners may use cookies to personalize content.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Shield className="text-demon-blood w-5 h-5" />
              3. Security
            </h3>
            <p>
              While we strive to use commercially acceptable means to protect your interactions, remember that no method of transmission over the internet is 100% secure. 
              However, since we do not store sensitive user data like passwords or emails, your risk is minimal.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-white mb-3">4. Third-Party Links</h3>
            <p>
              Our website may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us.
            </p>
          </section>

          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-xs text-gray-500 mt-8">
            Last Updated: March 2025. This policy may change as the void expands.
          </div>
        </div>
      </div>
    </div>
  );
};
