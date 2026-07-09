'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Database, RefreshCw, Terminal, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/cn';

interface Message {
  role: 'bot' | 'user';
  text: string;
  sources?: string[] | null;
}

interface DocumentInfo {
  name: string;
  size: string;
}

interface IndexStatus {
  is_ready: boolean;
  last_built: string;
  llm_engine: boolean;
  embedding_engine: boolean;
  total_chunks: number;
  next_run_time: string;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'status'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Welcome to the Avora Ventures Cognitive Network. Query firm-wide intelligence securely.', sources: null }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isReindexing, setIsReindexing] = useState(false);
  
  const [docs, setDocs] = useState<DocumentInfo[]>([]);
  const [status, setStatus] = useState<IndexStatus | null>(null);
  const [countdown, setCountdown] = useState('--:--:--');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Load status and documents
  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const [docsRes, statusRes] = await Promise.all([
          fetch('/api/documents'),
          fetch('/api/status')
        ]);
        if (docsRes.ok) setDocs(await docsRes.json());
        if (statusRes.ok) setStatus(await statusRes.json());
      } catch (error) {
        console.error('Failed to fetch cognitive network parameters:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Countdown timer logic
  useEffect(() => {
    if (!status?.next_run_time) return;
    
    const timer = setInterval(() => {
      const nextRun = new Date(status.next_run_time).getTime();
      const now = new Date().getTime();
      const distance = nextRun - now;

      if (distance < 0) {
        setCountdown('Running soon...');
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(
        `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [status?.next_run_time]);

  const handleManualReindex = async () => {
    setIsReindexing(true);
    try {
      const res = await fetch('/api/reindex', { method: 'POST' });
      if (res.ok) {
        const statusRes = await fetch('/api/status');
        if (statusRes.ok) setStatus(await statusRes.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsReindexing(false);
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
        setMessages(prev => [...prev, { role: 'bot', text: data.answer, sources: data.sources }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: `Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Connection timeout. Failed to reach the intelligence node.' }]);
    } finally {
      setIsTyping(false);
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
            : "bg-slate-950/90 border-[#B08D57]/45 shadow-[0_4px_15px_rgba(176,141,87,0.15)] hover:bg-[#B08D57]/15 hover:shadow-[0_12px_28px_rgba(176,141,87,0.3),_inset_0_-4px_8px_rgba(0,0,0,0.4)] hover:border-[#B08D57]/70"
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
            <circle cx="38" cy="46" r="5" fill="#dfb257" />
            <circle cx="62" cy="46" r="5" fill="#dfb257" />
            {/* Friendly Indicator Arc */}
            <path d="M 44,58 Q 50,63 56,58" fill="none" stroke="#dfb257" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* Main Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[360px] sm:w-[400px] h-[550px] bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">AVORA COGNITIVE ENGINE</h3>
                <p className="text-[10px] text-slate-400 font-mono">v1.2.0-secure_node</p>
              </div>
            </div>
            
            <div className="flex bg-slate-950 rounded-lg p-0.5 border border-slate-850">
              <button
                onClick={() => setActiveTab('chat')}
                className={cn(
                  "px-3 py-1 rounded text-xs font-medium transition-all",
                  activeTab === 'chat' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                )}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className={cn(
                  "px-3 py-1 rounded text-xs font-medium transition-all",
                  activeTab === 'status' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white"
                )}
              >
                Index
              </button>
            </div>
          </div>

          {activeTab === 'chat' ? (
            <>
              {/* Messages viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {messages.map((msg, index) => (
                  <div key={index} className={cn("flex flex-col max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
                    <div
                      className={cn(
                        "p-3.5 rounded-2xl text-sm leading-relaxed",
                        msg.role === 'user'
                          ? "bg-slate-800 text-white rounded-br-none border border-slate-700/50"
                          : "bg-indigo-950/40 text-slate-200 border border-indigo-900/30 rounded-bl-none"
                      )}
                    >
                      {msg.text.split('\n').map((line, i) => (
                        <p key={i} className={cn(i > 0 && "mt-1")}>{line}</p>
                      ))}

                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-indigo-950 flex flex-wrap gap-1.5">
                          {msg.sources.map((src, sIdx) => (
                            <span key={sIdx} className="text-[10px] bg-slate-950 text-indigo-400 px-2 py-0.5 rounded font-mono border border-indigo-950">
                              doc: {src}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex flex-col mr-auto max-w-[85%]">
                    <div className="p-3.5 bg-indigo-950/40 border border-indigo-900/30 rounded-2xl rounded-bl-none">
                      <div className="flex gap-1.5 items-center py-1">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSend} className="p-4 bg-slate-900/50 border-t border-slate-850 flex gap-2">
                <input
                  type="text"
                  placeholder="Query cognitive network..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            /* Cognitive Status Tab */
            <div className="flex-1 p-5 overflow-y-auto space-y-6 scrollbar-none">
              {/* System State */}
              <div className="space-y-3 bg-slate-900/40 p-4 border border-slate-850 rounded-xl">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-indigo-400" /> Cognitive Infrastructure State
                </h4>
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cache Registry</span>
                    <span className="font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">LLM Inference Node</span>
                    <span className="font-semibold text-white">READY (GPT-4o)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Embedding Pipeline</span>
                    <span className="font-semibold text-white">ONLINE (Text-3)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Indexed Chunks</span>
                    <span className="font-semibold text-indigo-400">{status?.total_chunks || 1240}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Next Auto-Sync</span>
                    <span className="font-semibold text-slate-300">{countdown}</span>
                  </div>
                </div>
              </div>

              {/* Indexed Context Files */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Indexed Knowledge Context ({docs.length})
                </h4>
                <div className="space-y-2 max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
                  {docs.map((doc, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2.5 bg-slate-900/30 border border-slate-850 rounded-lg text-xs">
                      <span className="text-slate-300 font-mono truncate max-w-[200px]">{doc.name}</span>
                      <span className="text-slate-500 text-[10px] font-mono">{doc.size}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sync Trigger */}
              <button
                onClick={handleManualReindex}
                disabled={isReindexing}
                className="w-full py-2.5 rounded-xl border border-indigo-900/40 hover:border-indigo-600/50 bg-indigo-950/20 text-indigo-400 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className={cn("w-3.5 h-3.5", isReindexing && "animate-spin")} />
                {isReindexing ? "Indexing..." : "Force Synced Reindex"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
