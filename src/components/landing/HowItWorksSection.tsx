import React, { useState } from 'react';
import { UserCheck, Search, CreditCard, Award, ArrowRight, ShieldCheck, HardHat, Building2, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

export const HowItWorksSection: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'worker' | 'hirer'>('worker');

  const workerSteps = [
    {
      step: '01',
      titleHi: 'डिजिटल प्रोफाइल बनाएं',
      titleEn: 'Create Digital Profile',
      descHi: 'आधार या ई-श्रम से सत्यापन करें और अपना मुख्य हुनर (राजमिस्त्री, पेंटर, प्लंबर, इलेक्ट्रीशियन) चुनें।',
      descEn: 'Link Aadhaar/e-Shram and select your primary craft trade for instant verification.',
      badgeHi: '2 मिनट में सत्यापन',
      badgeEn: '2-min Verification',
      icon: <UserCheck className="w-6 h-6 text-amber-600" />,
    },
    {
      step: '02',
      titleHi: 'नजदीकी काम खोजें',
      titleEn: 'Find Shifts Nearby',
      descHi: 'लेबर चौक पर घंटों खड़े होने के बजाय अपने फोन पर सीधे दैनिक व प्रोजेक्ट आधारित काम चुनें।',
      descEn: 'Skip waiting at labour chowks. Connect directly with verified contractors in your area.',
      badgeHi: 'सीधे ठेकेदार से संपर्क',
      badgeEn: 'Direct Employer Match',
      icon: <Search className="w-6 h-6 text-amber-600" />,
    },
    {
      step: '03',
      titleHi: 'डिजिटल हाजिरी व एस्क्रो गारंटी',
      titleEn: 'Digital Attendance & Escrow',
      descHi: 'सुपरवाइज़र द्वारा क्यूआर कोड आधारित हाजिरी प्रमाणित हो और आपका वेतन सुरक्षित एस्क्रो में जमा रहे।',
      descEn: 'QR-based daily punch-in with contractor funds locked safely in escrow before work begins.',
      badgeHi: 'सुरक्षित दैनिक वेतन',
      badgeEn: '100% Wage Guarantee',
      icon: <CreditCard className="w-6 h-6 text-amber-600" />,
    },
    {
      step: '04',
      titleHi: 'वेतन पर्ची, लोन व कल्याण लाभ',
      titleEn: 'Wage Slips, Loans & Welfare',
      descHi: 'प्रमाणित डिजिटल रिकॉर्ड के आधार पर बैंक लोन, टूल किट सहायता व BOCW की सरकारी योजनाओं का लाभ लें।',
      descEn: 'Build creditworthiness with verified payslips to access micro-loans and BOCW pension/benefits.',
      badgeHi: 'स्थायी करियर रिकॉर्ड',
      badgeEn: 'Financial Inclusion',
      icon: <Award className="w-6 h-6 text-amber-600" />,
    },
  ];

  const hirerSteps = [
    {
      step: '01',
      titleHi: 'आवश्यकता अनुसार काम पोस्ट करें',
      titleEn: 'Post Job Requirements',
      descHi: 'कार्य का स्थान, आवश्यक हुनर, दैनिक दिहाड़ी और काम की अवधि 1 मिनट में दर्ज करें।',
      descEn: 'Specify site location, required trade, daily wage rate, and timeline in 1 minute.',
      badgeHi: 'त्वरित पोस्टिंग',
      badgeEn: 'Quick 1-Min Post',
      icon: <Building2 className="w-6 h-6 text-amber-600" />,
    },
    {
      step: '02',
      titleHi: 'सत्यापित कामगार चुनें',
      titleEn: 'Select Verified Workers',
      descHi: 'पूर्व अनुभव, स्टार रेटिंग और कार्य इतिहास देखकर कुशल व भरोसेमंद कारीगरों को हायर करें।',
      descEn: 'Review work history, ratings, and verified skills to hire the best craftspeople.',
      badgeHi: 'प्रमाणित कारीगर',
      badgeEn: 'Vetted Tradesmen',
      icon: <UserCheck className="w-6 h-6 text-amber-600" />,
    },
    {
      step: '03',
      titleHi: 'सुरक्षित एस्क्रो में भुगतान लॉक करें',
      titleEn: 'Secure Escrow Funding',
      descHi: 'काम शुरू होने से पहले वेतन एस्क्रो में जमा करें — काम संतोषजनक पूर्ण होने पर ही रिलीज होगा।',
      descEn: 'Deposit funds into SHRAMIKK Escrow. Payout happens only upon satisfactory daily signoff.',
      badgeHi: 'विवाद-मुक्त भुगतान',
      badgeEn: 'Zero Payment Disputes',
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
    },
    {
      step: '04',
      titleHi: 'डिजिटल हाजिरी व जीएसटी बिलिंग',
      titleEn: 'Site Attendance & Invoicing',
      descHi: 'साइट पर उपस्थिति की लाइव ट्रैकिंग, स्वचालित दैनिक वर्क स्लिप और ऑडिट-तैयार रिकॉर्ड पाएं।',
      descEn: 'Track on-site attendance via QR codes with automated compliance and wage reports.',
      badgeHi: 'पारदर्शी रिपोर्टिंग',
      badgeEn: 'Audit-Ready Reports',
      icon: <Award className="w-6 h-6 text-amber-600" />,
    },
  ];

  const currentSteps = activeTab === 'worker' ? workerSteps : hirerSteps;

  return (
    <section id="how-it-works" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold uppercase tracking-wider mb-3">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span>{language === 'hi' ? 'कार्यप्रणाली • कैसे काम करता है' : 'How It Works • Simple 4-Step Process'}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0B132B] tracking-tight mb-4">
          {language === 'hi'
            ? 'लेबर चौक से डिजिटल सशक्तिकरण का सफर'
            : 'From Labour Chowk to Digital Empowerment'}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {language === 'hi'
            ? 'श्रमिकों और ठेकेदारों के बीच सीधा, पारदर्शी और सुरक्षित डिजिटल कार्य संबंध।'
            : 'A transparent, direct workflow bridging skilled workers and project employers with guaranteed safety.'}
        </p>

        {/* Audience Toggle (Workers vs Hirers) */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mt-6 shadow-inner">
          <button
            onClick={() => setActiveTab('worker')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === 'worker'
                ? 'bg-[#0B132B] text-amber-400 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HardHat className="w-4 h-4" />
            <span>{language === 'hi' ? 'कामगारों के लिए (For Workers)' : 'For Workers'}</span>
          </button>
          <button
            onClick={() => setActiveTab('hirer')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
              activeTab === 'hirer'
                ? 'bg-[#0B132B] text-amber-400 shadow-md scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{language === 'hi' ? 'ठेकेदारों के लिए (For Hirers)' : 'For Employers & Contractors'}</span>
          </button>
        </div>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {currentSteps.map((s, idx) => (
          <div
            key={idx}
            className="group rounded-[26px] bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover p-6 flex flex-col justify-between relative hover:border-amber-400 transition-all duration-200 hover:-translate-y-1"
          >
            <div>
              {/* Step Header & Icon */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-black text-amber-500 font-sans tracking-tight">
                  {s.step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center group-hover:bg-amber-100 group-hover:scale-105 transition-all">
                  {s.icon}
                </div>
              </div>

              {/* Tag Pill */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 text-[11px] font-bold border border-amber-200/60">
                  <CheckCircle2 className="w-3 h-3 text-amber-600" />
                  {language === 'hi' ? s.badgeHi : s.badgeEn}
                </span>
              </div>

              {/* Step Title & Description */}
              <h3 className="text-lg font-bold text-[#0B132B] mb-2 leading-snug">
                {language === 'hi' ? s.titleHi : s.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'hi' ? s.descHi : s.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Micro Banner */}
      <div className="rounded-[24px] bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-xs">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-[#0B132B]">
              {language === 'hi'
                ? '100% सुरक्षित भुगतान और सरकारी मान्यता प्राप्त प्रमाण पत्र'
                : '100% Escrow-Backed Wages & Verified Work Experience'}
            </h4>
            <p className="text-xs text-slate-600">
              {language === 'hi'
                ? 'हर शिफ्ट के बाद तुरंत डिजिटल वेतन पर्ची आपके खाते में दर्ज हो जाती है।'
                : 'Every completed shift adds an immutable, verifiable badge to the worker ledger.'}
            </p>
          </div>
        </div>
        <Link
          to={activeTab === 'worker' ? '/find-work' : '/hire-workers'}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B132B] text-amber-400 hover:text-white hover:bg-slate-800 text-xs sm:text-sm font-bold shadow-sm transition-all"
        >
          <span>{activeTab === 'worker' ? (language === 'hi' ? 'काम खोजें' : 'Browse Open Shifts') : (language === 'hi' ? 'कामगार ढूंढें' : 'Hire Workers Now')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
