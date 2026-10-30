import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../types';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; subLabel: string }[] = [
    { code: 'hi', label: 'हिंदी', subLabel: 'Hindi' },
    { code: 'en', label: 'English', subLabel: 'अंग्रेज़ी' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left shrink-0" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/90 bg-white hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 hover:border-slate-300 focus:outline-none transition-all shadow-2xs shrink-0 cursor-pointer"
        aria-expanded={isOpen}
        aria-label="Language selector"
      >
        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600 shrink-0" />
        <span className="font-bold text-slate-800">{language === 'hi' ? 'हिंदी' : 'EN'}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-48 rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/10 z-50 py-2 border border-slate-100 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            भाषा चुनें / Select Language
          </div>
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => {
                setLanguage(item.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                language === item.code
                  ? 'bg-amber-50 text-amber-950 font-bold'
                  : 'text-slate-700 hover:bg-slate-50 font-medium'
              }`}
            >
              <div>
                <span className="font-bold">{item.label}</span>
                <span className="text-xs text-slate-400 ml-1.5 font-normal">({item.subLabel})</span>
              </div>
              {language === item.code && <Check className="w-4 h-4 text-amber-600 stroke-[2.5]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
