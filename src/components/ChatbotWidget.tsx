'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Terminal } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Welcome to the Avora Ventures Cognitive Network. Query firm-wide intelligence securely.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Refocus input box automatically when chat is opened or when typing is completed
  useEffect(() => {
    if (isOpen && !isTyping) {
      const t = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(t);
    }
  }, [isOpen, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Stop propagation of spacebar and arrow keys to prevent scrolling the parent page
    if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.stopPropagation();
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const query = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'bot', text: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: `Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Connection timeout. Failed to reach the intelligence node.' }]);
    } finally {
      setIsTyping(false);
      // Ensure we immediately refocus the input box after sending is finished
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Trigger Button: Styled with 3D isometric shift and gold-layered depth shadow on hover */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-white border transition-all duration-300 transform hover:-translate-y-1 hover:rotate-2 active:scale-95",
          isOpen 
            ? "bg-slate-800 border-slate-750 rotate-90 shadow-lg" 
            : "bg-slate-950/90 border-[#D4AF37]/45 shadow-[0_4px_15px_rgba(212,175,55,0.15)] hover:bg-[#D4AF37]/15 hover:shadow-[0_12px_28px_rgba(212,175,55,0.3),_inset_0_-4px_8px_rgba(0,0,0,0.4)] hover:border-[#D4AF37]/70"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 3D Extrusion Side Shadow */}
            <rect x="14" y="24" width="72" height="56" rx="20" fill="#a07d35" />
            {/* Main Robot Face Shield */}
            <rect x="14" y="22" width="72" height="56" rx="20" fill="#dfb257" />
            {/* Robot Ear/Side Accents */}
            <rect x="6" y="38" width="8" height="24" rx="4" fill="#dfb257" />
            <rect x="86" y="38" width="8" height="24" rx="4" fill="#dfb257" />
            {/* Top Antenna Node */}
            <rect x="47" y="10" width="6" height="12" rx="2" fill="#dfb257" />
            <circle cx="50" cy="8" r="4" fill="#dfb257" />
            {/* Visor Display */}
            <rect x="22" y="30" width="56" height="40" rx="14" fill="#0f172a" />
            {/* Circular AI Eyes */}
            <circle cx="38" cy="50" r="7" fill="#dfb257" />
            <circle cx="62" cy="50" r="7" fill="#dfb257" />
            <circle cx="38" cy="50" r="2" fill="#0f172a" />
            <circle cx="62" cy="50" r="2" fill="#0f172a" />
            {/* Friendly Indicator Arc */}
            <path d="M 44,58 Q 50,63 56,58" fill="none" stroke="#dfb257" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Main Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[360px] sm:w-[400px] h-[500px] bg-slate-950/95 border border-slate-850 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-850 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#D4AF37]" />
              <div>
                <h3 className="text-xs font-mono font-bold text-white tracking-wide">AVORA COGNITIVE ENGINE</h3>
                <p className="text-[9px] text-slate-500 font-mono">v1.2.0-secure_node</p>
              </div>
            </div>
          </div>

          {/* Messages viewport */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div key={index} className={cn("flex flex-col max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
                <div
                  className={cn(
                    "p-3.5 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user'
                      ? "bg-slate-800 text-white rounded-br-none border border-slate-700/50"
                      : "bg-[#D4AF37]/10 text-slate-800 dark:text-slate-100 border border-[#D4AF37]/20 rounded-bl-none"
                  )}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={cn(i > 0 && "mt-1")}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col mr-auto max-w-[85%]">
                <div className="p-3.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1.5 items-center py-1">
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input form */}
          <form onSubmit={handleSend} className="p-4 bg-slate-900/50 border-t border-slate-850 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Query cognitive network..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/30 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 bg-[#D4AF37] hover:bg-[#B8962D] disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
