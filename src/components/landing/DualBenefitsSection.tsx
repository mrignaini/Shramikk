import React from 'react';
import { HardHat, Building2, CheckCircle2, ShieldCheck, ArrowRight, Zap, Award, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

export const DualBenefitsSection: React.FC = () => {
  const { language } = useLanguage();

  const workerBenefits = [
    {
      titleHi: '100% सुरक्षित दैनिक मजदूरी',
      titleEn: '100% Escrow-Secured Daily Wage',
      descHi: 'काम शुरू होने से पहले ही नियोक्ता का पैसा एस्क्रो में सुरक्षित जमा होता है। काम के बाद मजदूरी कटने या रुकने का डर नहीं।',
      descEn: 'Client funds are locked safely in escrow before work begins. No delayed payouts or unfair cuts.',
    },
    {
      titleHi: 'शून्य बिचौलिया कमीशन',
      titleEn: 'Zero Middleman Commission',
      descHi: 'लेबर चौक के ठेकेदार 20-30% कमीशन काट लेते हैं, लेकिन SHRAMIKK पर आपकी पूरी कमाई आपकी जेब में जाती है।',
      descEn: 'Traditional labour chowk middlemen deduct 20-30%. On SHRAMIKK, keep 100% of your earnings.',
    },
    {
      titleHi: 'डिजिटल कार्य इतिहास व पासपोर्ट',
      titleEn: 'Digital Work History & Slip',
      descHi: 'हर शिफ्ट पूरी होने पर सुपरवाइजर द्वारा रेटेड डिजिटल पर्ची मिलती है, जिससे बैंक लोन और सरकारी स्कीम मिलना आसान होता है।',
      descEn: 'Build a verifiable digital resume with supervisor reviews, unlocking formal credit and benefits.',
    },
    {
      titleHi: 'बीमा व सामाजिक सुरक्षा की सुविधा',
      titleEn: 'Insurance & Safety Net Coverage',
      descHi: 'दुर्घटना बीमा (₹2 लाख), स्वास्थ्य कवर, टूल किट सब्सिडी और पेंशन योजनाओं के लिए सीधी सहायता।',
      descEn: 'Direct integration with BOCW welfare funds, ₹2 Lakh accidental cover, and pension schemes.',
    },
  ];

  const hirerBenefits = [
    {
      titleHi: 'सत्यापित व कुशल कारीगर',
      titleEn: 'Vetted & Rated Tradesmen',
      descHi: 'राजमिस्त्री, कारपेंटर, प्लंबर, इलेक्ट्रीशियन व पेंटर्स की पूर्व रेटिंग और अनुभव जांचकर तुरंत हायर करें।',
      descEn: 'Instantly access pre-vetted masons, carpenters, plumbers, electricians, and certified helpers.',
    },
    {
      titleHi: 'क्यूआर आधारित डिजिटल हाजिरी',
      titleEn: 'QR & Geo-Verified Attendance',
      descHi: 'साइट पर फर्जी हाजिरी की समस्या समाप्त। कामगार द्वारा क्यूआर स्कैन करते ही सटीक शिफ्ट लॉग बनता है।',
      descEn: 'Eliminate ghost workers and attendance fraud with tamper-proof QR check-in on project sites.',
    },
    {
      titleHi: 'विवाद-मुक्त एस्क्रो पेमेंट्स',
      titleEn: 'Dispute-Free Milestone Payments',
      descHi: 'काम का निरीक्षण करने और संतोष होने के बाद ही एक क्लिक में श्रमिकों को भुगतान जारी करें।',
      descEn: 'Funds are disbursed only after daily site verification, protecting project budgets and timelines.',
    },
    {
      titleHi: 'ऑडिट-तैयार कानूनी अनुपालन',
      titleEn: 'Audit-Ready Labour Compliance',
      descHi: 'जीएसटी इनवॉइस, दैनिक वेतन पर्ची और लेबर सेस का स्वचालित डिजिटल रिकॉर्ड एक ही डैशबोर्ड पर।',
      descEn: 'Automated wage slips, tax compliance, and transparent labor cost tracking for contractors.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-extrabold uppercase tracking-wider">
          {language === 'hi' ? 'दोहरा लाभ • दोनों पक्षों के लिए' : 'Mutual Benefits • For Both Sides'}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0B132B] tracking-tight mt-3 mb-4">
          {language === 'hi'
            ? 'कामगार और नियोक्ता दोनों के लिए पूर्ण समाधान'
            : 'A Win-Win Ecosystem for Workers & Hirers'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {language === 'hi'
            ? 'SHRAMIKK केवल काम खोजने का जरिया नहीं, बल्कि निर्माण क्षेत्र के भरोसे की नई नींव है।'
            : 'Transforming informal construction relationships into formalized, secure, and dignified contracts.'}
        </p>
      </div>

      {/* 2-Column Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Worker Column */}
        <div className="rounded-[30px] bg-white border border-amber-300 shadow-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-bl-full pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <HardHat className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                  {language === 'hi' ? 'कारीगरों के लिए' : 'For Construction Workers'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0B132B]">
                  {language === 'hi' ? 'श्रमिकों को क्या मिलता है?' : 'What Workers Gain'}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {workerBenefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0B132B]">
                      {language === 'hi' ? b.titleHi : b.titleEn}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {language === 'hi' ? b.descHi : b.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              to="/find-work"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-sm transition-all"
            >
              <span>{language === 'hi' ? 'आज ही काम खोजें (Browse Shifts)' : 'Find Shifts Nearby'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hirer Column */}
        <div className="rounded-[30px] bg-[#0B132B] text-white border border-slate-800 shadow-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full pointer-events-none" />

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                  {language === 'hi' ? 'नियोक्ताओं / ठेकेदारों के लिए' : 'For Hirers & Contractors'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {language === 'hi' ? 'ठेकेदारों को क्या लाभ है?' : 'What Employers Gain'}
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              {hirerBenefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {language === 'hi' ? b.titleHi : b.titleEn}
                    </h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {language === 'hi' ? b.descHi : b.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <Link
              to="/hire-workers"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0B132B] font-bold text-sm shadow-sm transition-all"
            >
              <span>{language === 'hi' ? 'कुशल कारीगर ढूंढें (Hire Workers)' : 'Hire Skilled Workers'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
