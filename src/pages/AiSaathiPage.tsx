import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';

const QUICK_QUESTIONS_HI = [
  'BOCW कार्ड के क्या फायदे हैं?',
  'दुर्घटना बीमा का दावा कैसे करें?',
  'बच्चों की पढ़ाई के लिए छात्रवृत्ति?',
  '60 वर्ष बाद श्रमिक पेंशन योजना?',
];

const QUICK_QUESTIONS_EN = [
  'What are BOCW card benefits?',
  'How to claim accident insurance?',
  'Scholarships for children\'s education?',
  'Pension scheme after 60 years?',
];

export const AiSaathiPage: React.FC = () => {
  const { language } = useLanguage();

  const getWelcomeMessage = () =>
    language === 'hi'
      ? 'नमस्ते! मैं आपका श्रमिक AI साथी हूँ। आप BOCW भवन निर्माण कल्याण कार्ड, दुर्घटना बीमा (₹2 लाख), बच्चों की छात्रवृत्ति या पेंशन योजना के बारे में कुछ भी पूछ सकते हैं।'
      : 'Hello! I am your SHRAMIKK AI Saathi. Ask me anything about BOCW Welfare benefits, accident insurance (₹2 lakh), children scholarships, or pension schemes.';

  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: getWelcomeMessage() },
  ]);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = language === 'hi' ? QUICK_QUESTIONS_HI : QUICK_QUESTIONS_EN;

  const handleSend = async (overrideText?: string) => {
    const userMsg = (overrideText ?? inputVal).trim();
    if (!userMsg || isLoading) return;

    setInputVal('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setIsLoading(true);

    const updatedHistory: ConversationMessage[] = [
      ...conversationHistory,
      { role: 'user', content: userMsg },
    ];

    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedHistory, language }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message ?? 'Failed to get response');
      }

      const aiReply: string = json.data.reply;

      setConversationHistory([
        ...updatedHistory,
        { role: 'assistant', content: aiReply },
      ]);

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    } catch (err) {
      const errText =
        language === 'hi'
          ? 'क्षमा करें, अभी कनेक्शन में समस्या है। कृपया थोड़ी देर बाद फिर कोशिश करें।'
          : 'Sorry, there was a connection error. Please try again in a moment.';
      setMessages((prev) => [...prev, { sender: 'ai', text: errText }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="rounded-[28px] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-6 sm:p-8 mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#0B132B] text-amber-400 flex items-center justify-center shrink-0 shadow-lg">
            <Sparkles className="w-8 h-8 stroke-[2.2]" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-slate-950/15 text-slate-950 text-xs font-black uppercase tracking-wider">
              BOCW Welfare • ई-श्रम एआई गाइड
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
              {language === 'hi' ? 'श्रमिक एआई साथी (AI Saathi)' : 'SHRAMIKK AI Welfare Assistant'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-900 font-medium">
              {language === 'hi'
                ? 'सरकारी कल्याणकारी योजनाओं और श्रमिक अधिकारों की सरल व सीधी जानकारी अपनी भाषा में।'
                : 'Direct, simplified government scheme and worker rights guidance in your language.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="rounded-[28px] bg-white border border-slate-200/90 shadow-card flex flex-col h-[520px] overflow-hidden">

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs font-bold text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-[#0B132B] text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-tl-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-2xs flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                <span className="text-xs text-slate-500">
                  {language === 'hi' ? 'जवाब तैयार हो रहा है...' : 'Thinking...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2 overflow-x-auto">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold whitespace-nowrap transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            placeholder={
              language === 'hi'
                ? 'सरकारी योजना या लाभ के बारे में पूछें...'
                : 'Ask anything about welfare schemes, insurance or claims...'
            }
            className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium disabled:opacity-60"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputVal.trim()}
            className="p-3 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-amber-400 flex items-center justify-center shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
