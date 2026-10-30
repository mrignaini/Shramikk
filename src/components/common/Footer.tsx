import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, PhoneCall, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  return (
    <footer className="bg-[#0B132B] text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500 text-[#0B132B] shadow-md font-bold">
                <HardHat className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white font-sans">
                  SHRAMIKK
                </span>
                <span className="text-[11px] text-amber-400 font-medium tracking-tight">
                  {language === 'hi' ? 'लेबर चौक से डिजिटल पहचान तक' : 'From Labour Chowk to Digital Identity'}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {language === 'hi'
                ? 'श्रमिक (SHRAMIKK) भारत के निर्माण कामगारों को सत्यापन, एस्क्रो मजदूरी सुरक्षा, डिजिटल कार्य पहचान और सरकारी कल्याणकारी योजनाओं से जोड़ता है।'
                : "India's unified platform empowering daily wage construction workers with portable digital work credentials, transparent escrow wages, and direct welfare scheme access."}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs border border-emerald-700/50">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Verifiable Identity
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 text-xs border border-amber-700/40">
                e-Shram & BOCW Integrated
              </span>
            </div>
          </div>

          {/* Quick Links - Worker */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              {language === 'hi' ? 'कामगार सेवाएं' : 'Worker Services'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/find-work" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>{language === 'hi' ? 'काम खोजें' : 'Find Work'}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/worker/my-work" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'सक्रिय कार्य (Live Shifts)' : 'Live Shifts'}
                </Link>
              </li>
              <li>
                <Link to="/worker/financial-hub" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'आय बहीखाता व पर्चियां' : 'Wage Ledger & Slips'}
                </Link>
              </li>
              <li>
                <Link to="/worker/digital-identity" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'डिजिटल कामगार कार्ड' : 'Digital Worker Card'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Hirers & Contractors */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              {language === 'hi' ? 'नियोक्ता व ठेकेदार' : 'Employers & Hirers'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/hire-workers" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>{language === 'hi' ? 'कामगार ढूंढें' : 'Hire Workers'}</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/hirer/post-job" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'काम पोस्ट करें' : 'Post a Job'}
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'यह कैसे काम करता है' : 'How It Works'}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'एडमिन पोर्टल' : 'Admin Portal'}
                </Link>
              </li>
            </ul>
          </div>

          {/* AI Saathi & Support */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">
              {language === 'hi' ? 'सहायता एवं एआई साथी' : 'Support & AI'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/ai-saathi" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>{language === 'hi' ? 'एआई साथी (BOCW)' : 'AI Saathi (BOCW)'}</span>
                </Link>
              </li>
              <li>
                <Link to="/#about" className="hover:text-amber-400 transition-colors">
                  {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
                </Link>
              </li>
              <li className="pt-2">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'कामगार हेल्पलाइन' : 'Worker Helpline'}</span>
                  </div>
                  <p className="text-slate-400 font-mono">1800-SHRAMIK-HELP</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {language === 'hi' ? 'टोल-फ्री • 24x7 सहायता' : 'Toll-free • 24x7 Assistance'}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 SHRAMIKK Technologies India. {language === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>{language === 'hi' ? 'समर्पित' : 'Made with'}</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{language === 'hi' ? 'भारत के निर्माण कामगारों के लिए' : "for India's Construction Workforce"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
