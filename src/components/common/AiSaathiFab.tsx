import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Bot } from 'lucide-react';

export const AiSaathiFab: React.FC = () => {
  const location = useLocation();

  // Hide floating button when already on the AI chat pages
  if (location.pathname === '/ai-saathi' || location.pathname === '/worker/ai-saathi') {
    return null;
  }

  return (
    <aside aria-label="AI Assistant" className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40">
      <Link
        to="/ai-saathi"
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0B132B] to-[#1E293B] text-amber-400 font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-amber-400/60 transition-all duration-200 select-none"
        title="AI Saathi - Welfare Schemes & Worker Support"
      >
        <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black shrink-0">
          <Bot className="w-4 h-4 stroke-[2.2]" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B132B] animate-pulse" />
        </span>
        
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[12px] sm:text-[13px] font-extrabold text-white flex items-center gap-1">
            <span>AI Saathi</span>
            <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
          </span>
          <span className="text-[9.5px] text-amber-300/90 font-medium hidden sm:inline">
            Smart Assistant
          </span>
        </div>
      </Link>
    </aside>
  );
};

export default AiSaathiFab;
