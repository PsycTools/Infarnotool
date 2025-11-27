
import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '../components/Button';

interface ContactProps {
  onBack: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSent(true);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up pb-10">
      <button 
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-demon-neon transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Arsenal
      </button>

      <div className="glass-card rounded-2xl p-6 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <h2 className="text-3xl md:text-4xl font-bold font-brand text-white mb-2 uppercase tracking-wider">
          Contact <span className="text-demon-neon">The Void</span>
        </h2>
        <p className="text-gray-400 mb-8">
          Report bugs, suggest tools, or simply scream into the abyss. We are listening.
        </p>

        {sent ? (
          <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-8 text-center animate-fade-in-up">
             <div className="w-16 h-16 bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="text-green-500 w-8 h-8" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">Message Transmitted</h3>
             <p className="text-gray-400">Your signal has reached our servers. We will respond if the ritual succeeds.</p>
             <button onClick={() => setSent(false)} className="mt-6 text-sm text-demon-neon hover:text-white underline">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Your Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-white focus:border-demon-neon outline-none transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-white focus:border-demon-neon outline-none transition-colors"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message</label>
               <textarea 
                  required
                  className="w-full bg-black/40 border border-gray-700 rounded-lg p-3 text-white focus:border-demon-neon outline-none transition-colors min-h-[150px]"
                  placeholder="Describe your issue or suggestion..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
               />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              <MessageSquare className="mr-2 w-4 h-4" /> Send Transmission
            </Button>
          </form>
        )}

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row gap-6 md:items-center justify-between text-sm text-gray-500">
           <div className="flex items-center gap-3">
              <Mail className="w-4 h-4" />
              <span>support@infrano-tools.com</span>
           </div>
           <div>
              <p>Response time: 24-48 hours (Earth time)</p>
           </div>
        </div>
      </div>
    </div>
  );
};
