import React from 'react';
import { Target, ShieldCheck, Award, Users, HardHat, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const AboutMissionSection: React.FC = () => {
  const { language } = useLanguage();

  const pillars = [
    {
      icon: <Target className="w-6 h-6 text-amber-700" />,
      bg: 'bg-amber-100/90',
      border: 'border-amber-200',
      titleHi: 'बिचौलिया-मुक्त काम व 100% मजदूरी',
      titleEn: 'Zero Middleman & Direct Wages',
      descHi: 'बिना किसी कमीशन या ठेकेदार शोषण के श्रमिकों को उचित दैनिक पारिश्रमिक सीधे उनके हाथ या बैंक खाते में मिलता है।',
      descEn: 'Workers receive 100% of their earned wages without unfair contractor cuts or predatory commissions.',
      highlightHi: '0% कमीशन',
      highlightEn: '0% Middleman Cuts',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-700" />,
      bg: 'bg-emerald-100/90',
      border: 'border-emerald-200',
      titleHi: 'डिजिटल पहचान व बैंक क्रेडिट',
      titleEn: 'Digital Work Identity & Credit',
      descHi: 'बैंकों द्वारा मान्य दैनिक वेतन पर्ची और डिजिटल कार्य इतिहास, ताकि कामगारों को आसान माइक्रोक्रेडिट और वित्तीय सुविधाएं मिल सकें।',
      descEn: 'Verifiable proof of daily wages and skill level unlocks micro-loans, insurance, and formal banking.',
      highlightHi: 'बैंक मान्य पर्ची',
      highlightEn: 'Bank-Ready Slips',
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-700" />,
      bg: 'bg-yellow-100/90',
      border: 'border-yellow-200',
      titleHi: 'सरकारी योजनाओं का सीधा लाभ',
      titleEn: 'Direct Social Welfare Access',
      descHi: 'BOCW कल्याण बोर्ड, ई-श्रम, प्रधानमंत्री सुरक्षा बीमा (₹2 लाख) और मातृत्व व छात्रवृत्ति सहायता का बिना भागदौड़ के सीधा फायदा।',
      descEn: 'Seamless assistance for BOCW claims, ₹2L accident coverage, pension schemes, and children’s scholarships.',
      highlightHi: 'BOCW & ई-श्रम',
      highlightEn: 'BOCW & e-Shram',
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Mission Banner */}
      <div className="rounded-[32px] bg-gradient-to-br from-[#0B132B] via-[#111C40] to-[#1E293B] text-white p-8 sm:p-12 lg:p-14 mb-10 shadow-2xl relative overflow-hidden">
        {/* Background Decorative Rings */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              {language === 'hi' ? 'हमारा मिशन • About SHRAMIKK' : 'Our Mission • About SHRAMIKK'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
            {language === 'hi'
              ? 'असंगठित निर्माण क्षेत्र में पारदर्शिता, सुरक्षा और सम्मान'
              : 'Dignity, Security & Transparency for Unorganized Workers'}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal mb-8">
            {language === 'hi'
              ? 'SHRAMIKK का संकल्प भारत के 5 करोड़ से अधिक दैनिक वेतनभोगी निर्माण श्रमिकों को उनकी मेहनत का डिजिटल प्रमाण, सीधे काम के अवसर और सामाजिक सुरक्षा प्रदान करना है। लेबर चौक की अनिश्चितता को तकनीक के जरिए स्थायी सम्मान में बदलना ही हमारा उद्देश्य है।'
              : 'SHRAMIKK empowers over 50 million daily wage construction workers across India by replacing informal, uncertain labour chowks with verified digital work records, direct employer matching, and accessible social security.'}
          </p>

          {/* Impact Stats Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-2xl font-black text-amber-400">50M+</span>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {language === 'hi' ? 'असंगठित निर्माण कामगार' : 'Unorganized Workers'}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-2xl font-black text-emerald-400">100%</span>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {language === 'hi' ? 'एस्क्रो सुरक्षित मजदूरी' : 'Escrow Wage Security'}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs col-span-2 sm:col-span-1">
              <span className="text-2xl font-black text-amber-400">BOCW</span>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {language === 'hi' ? 'कल्याण बोर्ड व ई-श्रम एकीकृत' : 'Welfare & e-Shram Synced'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="rounded-[26px] bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${pillar.bg} border ${pillar.border} flex items-center justify-center shadow-xs`}>
                  {pillar.icon}
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[10.5px] font-extrabold border border-slate-200">
                  {language === 'hi' ? pillar.highlightHi : pillar.highlightEn}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#0B132B] mb-2 leading-snug">
                {language === 'hi' ? pillar.titleHi : pillar.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi' ? pillar.descHi : pillar.descEn}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-amber-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'श्रमिक सशक्तिकरण मानक' : 'Worker Empowerment Standard'}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
