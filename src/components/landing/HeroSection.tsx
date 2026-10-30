import React from 'react';
import { HardHat, Users, ArrowRight, ShieldCheck, CheckCircle, Lock, Bell, Sparkles, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CTAButton } from '../common/CTAButton';

export const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Main Copy & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-1.5 py-1 rounded-full bg-amber-100/70 border border-amber-300/60 shadow-xs">
              <span className="px-3 py-1 rounded-full bg-[#EAA228] text-slate-950 text-xs font-bold tracking-tight shadow-xs">
                {t('heroBadge')}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-800 pr-3">
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 inline" />
                <span>{t('heroBadgeArrow')}</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0B132B] tracking-tight leading-[1.15]">
              {t('heroHeadingPart1', 'From Labour Chowk to')} <br />
              <span className="relative text-[#EAA228] inline-block mt-1">
                {t('heroHeadingPart2', 'Digital Identity')}
                <span className="absolute -bottom-1 left-0 w-full h-[5px] bg-[#EAA228] rounded-full" />
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {t('heroDescription')}
            </p>

            {/* Dual CTAs (Find Work & Hire Worker) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl pt-2">
              {/* Primary Amber Card Button: काम खोजें */}
              <CTAButton
                to="/find-work"
                variant="primary-amber"
                icon={<HardHat className="w-6 h-6 text-slate-900" />}
                title={t('findWorkCta')}
                subtext={t('findWorkSubtext')}
                className="w-full"
              />

              {/* Secondary White Card Button: कामगार को काम पर रखें */}
              <CTAButton
                to="/hire-workers"
                variant="secondary-white"
                icon={<Users className="w-6 h-6 text-slate-800" />}
                title={t('hireWorkerCta')}
                subtext={t('hireWorkerSubtext')}
                className="w-full"
              />
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 pt-4 text-xs sm:text-sm font-medium text-slate-700">
              <div className="inline-flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 stroke-[2.2]" />
                <span>{t('trustedPlatform')}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 stroke-[2.2]" />
                <span>{t('verifiedProfiles')}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Lock className="w-5 h-5 text-slate-700 stroke-[2.2]" />
                <span>{t('secureSafe')}</span>
              </div>
            </div>

          </div>

          {/* Right Column - Visual Mockup Composition */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Outer Container */}
            <div className="relative rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FAF8F5] to-[#F1EFEA] p-3.5 sm:p-4.5 border border-slate-200/90 shadow-2xl shadow-slate-900/10 overflow-hidden">
              
              {/* Visual Composition Canvas */}
              <div className="relative min-h-[420px] sm:min-h-[450px] rounded-2xl sm:rounded-[26px] overflow-hidden bg-slate-900 flex items-end p-2 sm:p-3 shadow-md">
                
                {/* Background Photorealistic Construction Workers Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="/hero_workers.jpg"
                    alt="Indian construction workers on site"
                    className="w-full h-full object-cover object-[78%_center] sm:object-[75%_center] transform scale-100"
                  />
                  {/* Soft ambient gradient overlay on the left to make phone card pop */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
                </div>

                {/* Top-Left Verified Profiles Badge Floating on Image */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 text-[11px] font-bold text-slate-800 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Verified Profiles • 100% Verifiable</span>
                  </div>
                </div>

                {/* Smartphone Mockup on Left Overlay (Cleanly Side-Aligned) */}
                <div className="relative z-10 w-[54%] sm:w-[50%] max-w-[250px] rounded-[24px] bg-[#10141E] p-1.5 sm:p-2 border-2 border-slate-700/80 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300 ml-1 mb-1">
                  
                  {/* Phone Screen Container */}
                  <div className="bg-white rounded-[18px] p-2 sm:p-2.5 space-y-1.5 text-slate-900 shadow-inner">
                    
                    {/* Top Speaker / Dynamic Island Notch */}
                    <div className="w-10 h-1.5 bg-slate-800 rounded-full mx-auto -mt-0.5 mb-1 opacity-80" />

                    {/* Phone Header: Namaste, Ramesh! */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                      <div>
                        <div className="text-[10.5px] font-extrabold text-slate-900 leading-tight">
                          Namaste, Ramesh!
                        </div>
                        <div className="text-[8.5px] text-slate-400 font-medium">Good morning</div>
                      </div>
                      <div className="relative p-1 rounded-full bg-slate-50 text-slate-500">
                        <Bell className="w-2.5 h-2.5" />
                        <span className="absolute top-0.5 right-0.5 w-1 h-1 bg-amber-500 rounded-full" />
                      </div>
                    </div>

                    {/* Digital Income Identity Banner Card */}
                    <div className="p-1.5 rounded-lg bg-gradient-to-r from-amber-50/95 to-amber-100/60 border border-amber-200/90 flex items-center justify-between shadow-2xs">
                      <div>
                        <div className="text-[9.5px] font-extrabold text-slate-900">
                          Digital Income Identity
                        </div>
                        <div className="text-[7.5px] text-slate-600 leading-tight">
                          Build your identity. Grow future.
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0 ml-1">
                        <ShieldCheck className="w-3 h-3 stroke-[2.5]" />
                      </div>
                    </div>

                    {/* Quick Actions Grid (4 mini apps) */}
                    <div>
                      <div className="text-[7.5px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        Quick Actions
                      </div>
                      <div className="grid grid-cols-4 gap-1 text-center">
                        <div className="p-0.5 rounded bg-amber-50/90 border border-amber-100/80 flex flex-col items-center">
                          <HardHat className="w-2.5 h-2.5 text-amber-700" />
                          <span className="text-[6.5px] font-bold text-slate-700 mt-0.5">Find Work</span>
                        </div>
                        <div className="p-0.5 rounded bg-orange-50/90 border border-orange-100/80 flex flex-col items-center">
                          <span className="text-[8px]">💼</span>
                          <span className="text-[6.5px] font-bold text-slate-700 mt-0.5">My Jobs</span>
                        </div>
                        <div className="p-0.5 rounded bg-emerald-50/90 border border-emerald-100/80 flex flex-col items-center">
                          <span className="text-[8px]">💵</span>
                          <span className="text-[6.5px] font-bold text-slate-700 mt-0.5">Income</span>
                        </div>
                        <div className="p-0.5 rounded bg-yellow-50/90 border border-yellow-100/80 flex flex-col items-center">
                          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                          <span className="text-[6.5px] font-bold text-slate-700 mt-0.5">AI Saathi</span>
                        </div>
                      </div>
                    </div>

                    {/* Overview Card in Phone with Glowing Graph */}
                    <div className="p-1.5 rounded-lg bg-[#0B132B] text-white shadow-sm space-y-0.5">
                      <div className="flex items-center justify-between text-[7.5px] text-slate-400">
                        <span className="font-semibold">Overview</span>
                        <span className="px-1 py-0.2 rounded bg-white/15 text-[6.5px] text-slate-200 font-bold">
                          This Month
                        </span>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-xs font-black text-white font-sans">₹18,500</div>
                          <div className="text-[6.5px] text-slate-300">Total Income</div>
                          <div className="text-[6.5px] text-emerald-400 font-bold flex items-center gap-0.5 mt-0.5">
                            <TrendingUp className="w-1.5 h-1.5" />
                            <span>+8.4% vs last month</span>
                          </div>
                        </div>
                        {/* Glowing Green Growth Line */}
                        <div className="w-12 h-5">
                          <svg className="w-full h-full" viewBox="0 0 50 20" fill="none">
                            <path
                              d="M2 16 Q 15 14, 25 8 T 48 3"
                              stroke="#10B981"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                            <circle cx="48" cy="3" r="2" fill="#10B981" />
                          </svg>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* Bottom Dark Navy Banner Overlay */}
              <div className="relative mt-2.5 rounded-2xl bg-[#0B132B] text-white p-3.5 sm:p-4 overflow-hidden border border-slate-800 shadow-xl">
                
                <div className="relative z-10 flex items-center justify-between pr-8">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
                      <HardHat className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-black tracking-wide uppercase text-white font-sans">
                        FROM LABOUR CHOWK → TO DIGITAL IDENTITY
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-amber-400 font-bold">
                        to Digital Identity
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-2.5 flex items-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 text-[11px] font-bold border border-emerald-800/80 shadow-xs">
                    <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>सुरक्षित एवं भरोसेमंद</span>
                  </span>
                </div>

                {/* Diagonal Yellow/Black Hazard Stripes in Bottom Right Corner matching screenshot */}
                <div className="absolute right-0 bottom-0 w-24 sm:w-28 h-8 hazard-stripe-pattern transform rotate-12 translate-x-3 translate-y-2 opacity-95 rounded-sm" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
