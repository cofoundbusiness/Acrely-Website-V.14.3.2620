
import React, { useState, useRef, useEffect, memo } from 'react';
import { Bot, X, Send, ChevronDown, Globe, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage, Property, Agent } from '../types';
import { generateRealEstateAdvice } from '../services/geminiService';

interface AcrelyAIChatProps {
  properties: Property[];
  agents: Agent[];
}

export const AcrelyAIChat = memo(({ properties, agents }: AcrelyAIChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Hello. I'm your Acrely Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const systemInstruction = `
      You are Acrely Assistant. Format your responses exactly like short, clean WhatsApp messages.

      INPUT INTERPRETATION (Gen-Z Slang):
      - You must intelligently decode slang and short forms.
      - Examples: "u" (you), "r" (are), "ts" (this), "rn" (right now), "fr" (actually/verified), "gimme" (show me/give me), "wdym" (explain), "ngl" (honestly).
      - RULE: Understand the slang, but NEVER use it in your response.
      - Translate the user's intent into professional real estate queries before answering.

      FORMATTING RULES:
      1. NO paragraphs. Use single lines or very short bullets.
      2. NO emojis.
      3. NO bold text or markdown headers. Keep it plain.
      4. Keep it dense. Avoid extra newlines.

      PROPERTY LISTING FORMAT (Strictly 3 lines max per item):
      [Property Name]
      [Location]
      [Price] | [Beds] Bed | [Status]

      LIMITS:
      - Show maximum 6 properties at a time.
      - If there are more than 6 matches, end with: "Show more properties?"

      TONE:
      - Direct, human-like, and professional.
      - No marketing jargon.
      - Clean English only.

      CONTEXT DATA:
      Properties: ${JSON.stringify(properties.map(p => ({ 
        title: p.title, 
        location: p.location, 
        price: p.priceDisplay, 
        beds: p.beds,
        status: p.status 
      })))}
      Agents: ${JSON.stringify(agents.map(a => ({ name: a.name, role: a.role })))}
    `;

    const result = await generateRealEstateAdvice(userMessage, systemInstruction);
    
    setMessages(prev => [...prev, { role: 'assistant', text: result.text, sources: result.sources as any }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[100] group flex items-center justify-center transition-all duration-300 ${isOpen ? 'rotate-90 scale-90' : 'hover:-translate-y-1'}`}
      >
        <div className={`relative flex items-center justify-center w-14 h-14 rounded-2xl shadow-xl shadow-amber-500/20 transition-all ${isOpen ? 'bg-slate-900 dark:bg-slate-100' : 'bg-gradient-to-tr from-slate-900 to-slate-800 dark:from-slate-700 dark:to-slate-600'}`}>
           {isOpen ? (
             <X className="w-6 h-6 text-white dark:text-slate-900" />
           ) : (
             <>
               <Bot className="w-7 h-7 text-amber-500" />
               <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                </span>
             </>
           )}
        </div>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 w-[calc(100%-2rem)] md:w-[420px] h-[600px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-[100] flex flex-col overflow-hidden animate-slide-up border border-slate-100 dark:border-slate-800 font-sans">
          
          {/* Header */}
          <div className="bg-slate-900 dark:bg-slate-950 p-5 flex items-center justify-between border-b border-slate-800 dark:border-slate-900">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                 <Sparkles className="w-5 h-5 text-slate-900 fill-slate-900" />
               </div>
               <div>
                 <h3 className="text-white font-bold text-base">Acrely Assistant</h3>
                 <p className="text-slate-400 text-xs flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                 </p>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50 dark:bg-slate-900">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-snug shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-br-none' 
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 max-w-[85%]">
                    {msg.sources.slice(0, 2).map((source, sIdx) => (
                      <a 
                        key={sIdx} 
                        href={source.web?.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-full text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Globe className="w-3 h-3" />
                        {source.web?.title?.slice(0, 20)}...
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <form onSubmit={handleSend} className="relative flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Message..." 
                className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-300 dark:focus:border-slate-600 transition-all text-sm font-medium text-slate-800 dark:text-white placeholder-slate-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white/90 disabled:opacity-50 disabled:hover:bg-slate-900 dark:disabled:hover:bg-slate-100 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
});
