'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Message {
  role: 'bot' | 'user';
  text: string;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Welcome to Avora. Ask about our pipeline, engagements, or how to start a project.' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isTyping) {
      const t = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(t);
    }
  }, [isOpen, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.stopPropagation();
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const query = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: query }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, { role: 'bot', text: data.answer }]);
      } else {
        setMessages((prev) => [...prev, { role: 'bot', text: `Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Connection timeout. Please try again.' },
      ]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-soft',
          isOpen
            ? 'bg-white border border-[var(--border-strong)] text-[var(--foreground)] rotate-90'
            : 'bg-[var(--accent)] text-white border border-[var(--accent)] hover:shadow-gold'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Sparkles className="w-6 h-6" />
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[360px] sm:w-[400px] h-[500px] glass-panel-strong rounded-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-4 bg-[var(--accent-tint)] border-b border-[var(--border)] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--accent)]" />
            <h3 className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-[0.14em] uppercase">
              Avora Assistant
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  'flex flex-col max-w-[85%]',
                  msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                )}
              >
                <div
                  className={cn(
                    'p-3.5 rounded-2xl text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-[var(--accent)] text-white rounded-br-none'
                      : 'bg-white border border-[var(--border)] text-[var(--foreground)] rounded-bl-none'
                  )}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={cn(i > 0 && 'mt-1')}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col mr-auto max-w-[85%]">
                <div className="p-3.5 bg-white border border-[var(--border)] rounded-2xl rounded-bl-none">
                  <div className="flex gap-1.5 items-center py-1">
                    <div
                      className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <div
                      className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <div
                      className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="p-4 bg-white/60 border-t border-[var(--border)] flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask about the pipeline…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 px-4 py-2.5 bg-white border border-[var(--border-strong)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 rounded-xl text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)]/70 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 bg-[var(--accent)] hover:bg-[var(--accent)]/90 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
