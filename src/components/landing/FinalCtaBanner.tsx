import React from 'react';
import { HardHat, Users, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

export const FinalCtaBanner: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-[32px] bg-[#0B132B] text-white p-8 sm:p-14 lg:p-16 text-center shadow-2xl relative overflow-hidden border border-slate-800">
        {/* Glow Circles */}
        <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{language === 'hi' ? 'आज ही शुरुआत करें • 100% निशुल्क' : 'Start Today • 100% Free'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            {language === 'hi'
              ? 'लेबर चौक की भीड़ छोड़ें, डिजिटल भारत के साथ आगे बढ़ें'
              : 'Move Beyond Labour Chowks. Step into the Digital Future.'}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            {language === 'hi'
              ? 'हजारों प्रमाणित राजमिस्त्री, पेंटर, प्लंबर और इलेक्ट्रीशियन के साथ जुड़ें। अपनी मेहनत का पक्का डिजिटल रिकॉर्ड और सुरक्षित दैनिक वेतन पाएं।'
              : 'Join thousands of verified artisans building real digital work histories with guaranteed escrow protection and social welfare safety.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/find-work"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm sm:text-base shadow-lg transition-all duration-200 hover:scale-105"
            >
              <HardHat className="w-5 h-5 stroke-[2.2]" />
              <span>{language === 'hi' ? 'काम खोजें (Find Work)' : 'Find Work (Workers)'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/hire-workers"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-xs transition-all duration-200"
            >
              <Users className="w-5 h-5 text-amber-400" />
              <span>{language === 'hi' ? 'कारीगर हायर करें (Hire Workers)' : 'Hire Workers (Contractors)'}</span>
            </Link>
          </div>

          {/* Trust Footnote */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {language === 'hi' ? '100% सत्यापित प्रोफाइल' : '100% Verified Profiles'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              {language === 'hi' ? 'एस्क्रो सुरक्षित मजदूरी' : 'Escrow Secured Payments'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              {language === 'hi' ? 'BOCW व ई-श्रम सपोर्ट' : 'BOCW & e-Shram Supported'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
