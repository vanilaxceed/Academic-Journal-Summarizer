import React from 'react';
import { BookOpen, Sparkles, Cpu } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-base shadow-sm shadow-indigo-200">
          A
        </div>
        <div>
          <h1 className="font-bold text-slate-800 tracking-tight text-sm sm:text-base">
            ScholarBrief <span className="text-indigo-600">AI</span>
          </h1>
          <p className="hidden md:block text-[11px] text-slate-400 -mt-0.5 font-medium">
            Academic Journal Synthesizer • Cloudflare Edge SSR
          </p>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex gap-2 items-center px-2.5 py-1 bg-slate-100 rounded-full border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
            Cloudflare Worker Online
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Powered by Google AI Studio</span>
        </div>
      </div>
    </nav>
  );
};

