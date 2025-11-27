import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../Button';
import { chatWithAi } from '../../services/geminiService';
import { Send, User, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AiChatTool: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'I am the AI of the Void. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const response = await chatWithAi(history, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px] md:h-[600px] border border-gray-800 rounded-xl overflow-hidden bg-gray-900/30">
      <div className="flex-grow overflow-y-auto p-3 md:p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2 md:gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blood-900/50 flex items-center justify-center border border-blood-700 flex-shrink-0">
                <Bot size={14} className="md:w-4 md:h-4 text-blood-400" />
              </div>
            )}
            <div className={`max-w-[85%] rounded-lg p-2.5 md:p-3 text-xs md:text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-blood-700 text-white rounded-tr-none' 
                : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
            }`}>
              {msg.text}
            </div>
            {msg.role === 'user' && (
               <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600 flex-shrink-0">
                 <User size={14} className="md:w-4 md:h-4 text-gray-300" />
               </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 md:gap-3">
             <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blood-900/50 flex items-center justify-center border border-blood-700">
                <Bot size={14} className="md:w-4 md:h-4 text-blood-400" />
              </div>
              <div className="bg-gray-800 rounded-lg p-3 rounded-tl-none border border-gray-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-blood-500 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-blood-500 rounded-full animate-bounce delay-75"></span>
                <span className="w-1.5 h-1.5 bg-blood-500 rounded-full animate-bounce delay-150"></span>
              </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 md:p-4 bg-black/40 border-t border-gray-800 flex gap-2">
        <input
          type="text"
          className="flex-grow bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white focus:border-blood-500 outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        <Button onClick={handleSend} disabled={!input.trim() || loading} className="px-3 md:px-4 h-auto">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};