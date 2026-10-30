import React from 'react';
import { Sparkles, Bot, ArrowRight, ShieldCheck, HelpCircle, HeartHandshake, FileCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

export const AiSaathiHighlightSection: React.FC = () => {
  const { language } = useLanguage();

  const samplePrompts = [
    {
      hi: 'BOCW कार्ड के तहत ₹2 लाख दुर्घटना बीमा कैसे क्लेम करें?',
      en: 'How to claim ₹2 Lakh BOCW accident insurance?',
    },
    {
      hi: '60 वर्ष की आयु के बाद ₹3,000 मासिक पेंशन कैसे मिलेगी?',
      en: 'How to enroll in the ₹3,000/month PM Shram Yogi pension?',
    },
    {
      hi: 'बच्चों की स्कूल-कॉलेज पढ़ाई के लिए छात्रवृत्ति के नियम?',
      en: 'What are the scholarship rules for construction workers\' children?',
    },
    {
      hi: 'टूल किट खरीदने के लिए ₹50,000 की सहायता कैसे पाएं?',
      en: 'How to claim up to ₹50,000 tool kit financial aid?',
    },
  ];

  return (
    <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-[32px] bg-gradient-to-r from-amber-500 via-amber-500 to-amber-600 text-slate-950 p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/10 rounded-l-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/15 text-slate-950 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>{language === 'hi' ? 'ग्रोक एआई पावर्ड • 24x7 सहायता' : 'Groq AI Powered • 24/7 Welfare Saathi'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-950 leading-tight">
              {language === 'hi'
                ? 'श्रमिक एआई साथी (AI Saathi) — आपका डिजिटल सरकारी योजना गाइड'
                : 'SHRAMIKK AI Saathi — Instant Welfare & Scheme Guidance'}
            </h2>

            <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed max-w-xl">
              {language === 'hi'
                ? 'बीमा दावा, बच्चों की छात्रवृत्ति, ई-श्रम पंजीकरण और 60 वर्ष बाद पेंशन से जुड़े हर सवाल का जवाब अपनी सरल भाषा में तुरंत पाएं।'
                : 'Ask any question about BOCW benefits, accident insurance claims, tools allowance, and pensions in simple Hindi or English.'}
            </p>

            {/* Quick Benefits Bullet List */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs sm:text-sm font-bold text-slate-950">
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-slate-950" />
                {language === 'hi' ? 'सरल भाषा में गाइडेंस' : 'Vernacular Explanations'}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                {language === 'hi' ? 'सटीक सरकारी नियम' : 'Official Guidelines'}
              </span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-slate-950" />
                {language === 'hi' ? 'निःशुल्क सेवा' : '100% Free Access'}
              </span>
            </div>

            <div className="pt-2">
              <Link
                to="/ai-saathi"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0B132B] hover:bg-slate-800 text-amber-400 hover:text-amber-300 font-extrabold text-sm shadow-lg transition-all hover:scale-105 active:scale-100"
              >
                <Bot className="w-5 h-5" />
                <span>{language === 'hi' ? 'एआई साथी से अभी पूछें' : 'Chat with AI Saathi Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column - Sample Questions Bubble Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-900 block pl-1">
              {language === 'hi' ? 'श्रमिक अक्सर यह पूछते हैं:' : 'Popular Inquiries:'}
            </span>
            {samplePrompts.map((p, idx) => (
              <Link
                key={idx}
                to="/ai-saathi"
                className="block p-3.5 rounded-2xl bg-white/90 hover:bg-white text-slate-900 shadow-sm border border-slate-900/10 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      Q
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-amber-900 transition-colors">
                      {language === 'hi' ? p.hi : p.en}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
