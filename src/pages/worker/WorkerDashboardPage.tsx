import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HardHat,
  Search,
  Briefcase,
  Award,
  Wallet,
  Star,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Shield,
  ToggleLeft,
  ToggleRight,
  Check,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { WorkerBottomNav } from '../../components/navigation/WorkerBottomNav';

export const WorkerDashboardPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Auth guard: redirect to login if unauthenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  // Local availability toggle state
  const [isAvailable, setIsAvailable] = useState(true);

  // Dynamic user data
  const worker = auth.workerProfile;
  const rawName = worker?.fullName || 'Ramesh Kumar';
  const firstName = rawName.split(' ')[0];
  const avatar = worker?.avatar || '👷🏽‍♂️';
  const skillsDisplay = worker?.skills?.length
    ? worker.skills.join(', ')
    : 'Mason';
  const experienceDisplay = worker?.experience || '7 Years Experience';
  const locationDisplay = worker?.city
    ? `${worker.locality}, ${worker.city}`
    : 'Lajpat Nagar, Delhi NCR';

  return (
    <div className="min-h-screen pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* 1. WORKER HEADER & PROFILE SUMMARY */}
        {/* ========================================================================= */}
        <div className="rounded-[28px] bg-white border border-slate-200/90 shadow-card p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Avatar & User Details */}
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-sm">
                  {avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-[#0B132B] font-sans tracking-tight">
                    Welcome back, {firstName}! 👋
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Worker
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-0.5">
                  {skillsDisplay} • {experienceDisplay}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{locationDisplay}</span>
                </p>
              </div>
            </div>

            {/* Subtitle helper */}
            <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
              <span className="text-xs text-slate-400 block">{t('workerSubHeading')}</span>
              <Link
                to="/worker/profile"
                className="text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
              >
                View / Edit Profile →
              </Link>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. AVAILABILITY STATUS CARD (INTERACTIVE TOGGLE) */}
        {/* ========================================================================= */}
        <div
          className={`rounded-[24px] border p-4 sm:p-5 transition-all duration-200 flex items-center justify-between gap-4 ${
            isAvailable
              ? 'bg-gradient-to-r from-emerald-50/90 to-emerald-100/40 border-emerald-300/80 shadow-2xs'
              : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-3.5 h-3.5 rounded-full shrink-0 ${
                isAvailable ? 'bg-emerald-500 animate-pulse ring-4 ring-emerald-200' : 'bg-slate-400'
              }`}
            />
            <div>
              <div className="text-sm font-extrabold text-[#0B132B] flex items-center gap-2">
                <span>{isAvailable ? t('statusAvailable') : t('statusNotAvailable')}</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                {isAvailable ? t('statusAvailableSub') : t('statusNotAvailableSub')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 shadow-2xs ${
              isAvailable
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            {isAvailable ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Available (ON)</span>
              </>
            ) : (
              <span>Offline (OFF)</span>
            )}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 3. PRIMARY WORKER ACTION: FIND WORK */}
        {/* ========================================================================= */}
        <Link
          to="/find-work"
          className="group block rounded-[28px] bg-gradient-to-r from-[#EAA228] to-[#DE9419] p-6 text-slate-950 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 border border-amber-400"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-950/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Search className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider bg-slate-950/10 px-2.5 py-0.5 rounded-full">
                  Chowk Direct
                </span>
                <h2 className="text-2xl font-black tracking-tight mt-0.5 font-sans">
                  {t('primaryFindWorkTitle')}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-slate-900 mt-0.5">
                  {t('primaryFindWorkSub')}
                </p>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-sm group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </Link>

        {/* ========================================================================= */}
        {/* 4. WORKER QUICK ACTIONS GRID */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
            Quick Services & Shortcuts
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {/* 1. Find Work */}
            <Link
              to="/find-work"
              className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-2xs hover:shadow-card hover:border-amber-400 transition-all flex flex-col justify-between h-32 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#0B132B]">{t('quickFindWorkTitle')}</div>
                <div className="text-[11px] text-slate-500">{t('quickFindWorkSub')}</div>
              </div>
            </Link>

            {/* 2. My Work */}
            <Link
              to="/worker/my-work"
              className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-2xs hover:shadow-card hover:border-orange-400 transition-all flex flex-col justify-between h-32 group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#0B132B]">{t('quickMyWorkTitle')}</div>
                <div className="text-[11px] text-slate-500">{t('quickMyWorkSub')}</div>
              </div>
            </Link>

            {/* 3. Digital Identity */}
            <Link
              to="/worker/digital-identity"
              className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-2xs hover:shadow-card hover:border-amber-400 transition-all flex flex-col justify-between h-32 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#0B132B]">{t('quickDigitalIdTitle')}</div>
                <div className="text-[11px] text-slate-500">{t('quickDigitalIdSub')}</div>
              </div>
            </Link>

            {/* 4. Income */}
            <Link
              to="/worker/financial-hub"
              className="p-4 rounded-[22px] bg-white border border-slate-200/90 shadow-2xs hover:shadow-card hover:border-emerald-400 transition-all flex flex-col justify-between h-32 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#0B132B]">{t('quickIncomeTitle')}</div>
                <div className="text-[11px] text-slate-500">{t('quickIncomeSub')}</div>
              </div>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. WORKER DIGITAL IDENTITY PREVIEW & RECORDED INCOME (2-COL) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Digital Identity Preview Card */}
          <div className="rounded-[28px] bg-gradient-to-b from-[#FFFDF8] to-[#FAF6EE] border border-amber-200/90 shadow-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                  Digital Work Identity
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-[#0B132B] mb-1">
                {t('digitalIdPreviewHeading')}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {t('digitalIdPreviewMsg')}
              </p>

              {/* 4-Stat Metric Grid */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white border border-amber-100 mb-4">
                <div className="p-2">
                  <div className="flex items-center gap-1 text-base font-black text-slate-900">
                    <span>4.8</span>
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Verified Rating</span>
                </div>
                <div className="p-2 border-l border-slate-100">
                  <div className="text-base font-black text-slate-900">12 Shifts</div>
                  <span className="text-[10px] text-slate-400 font-medium">Completed Jobs</span>
                </div>
                <div className="p-2 border-t border-slate-100">
                  <div className="text-base font-black text-slate-900">7 Years</div>
                  <span className="text-[10px] text-slate-400 font-medium">Certified Exp</span>
                </div>
                <div className="p-2 border-t border-l border-slate-100">
                  <div className="text-base font-black text-slate-900">5 Trades</div>
                  <span className="text-[10px] text-slate-400 font-medium">Skill Portfolio</span>
                </div>
              </div>
            </div>

            <Link
              to="/worker/digital-identity"
              className="text-xs font-bold text-amber-900 hover:text-amber-700 flex items-center gap-1 pt-1"
            >
              <span>{t('viewDigitalIdLink')}</span>
            </Link>
          </div>

          {/* Recorded Income Card */}
          <div className="rounded-[28px] bg-[#0B132B] text-white p-6 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {t('recordedIncomeTitle')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                  {t('thisMonthLabel')}
                </span>
              </div>

              <div className="mt-2">
                <div className="text-3xl sm:text-4xl font-black font-sans text-white">
                  ₹18,500
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t('fromCompletedWork')} • <strong className="text-emerald-400">+8.4% vs last month</strong>
                </p>
              </div>

              {/* Sparkline Glow */}
              <div className="mt-4 mb-4 h-16 w-full">
                <svg className="w-full h-full" viewBox="0 0 300 60" fill="none">
                  <path
                    d="M 5,45 Q 60,40 120,28 T 220,18 T 290,8"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="290" cy="8" r="4" fill="#10B981" />
                </svg>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Recorded Income: <strong className="text-white">₹2,42,000</strong></span>
              <Link
                to="/worker/financial-hub"
                className="font-bold text-amber-400 hover:text-amber-300"
              >
                View Ledger Slips →
              </Link>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 6. CURRENT WORK SECTION */}
        {/* ========================================================================= */}
        <div className="rounded-[28px] bg-white border border-slate-200/90 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-extrabold text-[#0B132B]">
              {t('currentWorkHeading')}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-900 text-xs font-bold border border-orange-200">
              {t('activeJobStatusBadge')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-base font-extrabold text-slate-900">
                Residential House Painting & Texture Coat
              </div>
              <div className="text-xs text-slate-600 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Raj Nagar Extension, Ghaziabad</span>
                <span>• 2 days duration</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0">
              <div className="text-right">
                <div className="text-lg font-black text-slate-900 font-sans">₹900/day</div>
                <div className="text-[10px] text-emerald-600 font-bold">Escrow Verified</div>
              </div>
              <Link
                to="/worker/my-work"
                className="px-4 py-2 rounded-xl bg-[#0B132B] text-white text-xs font-bold hover:bg-slate-800"
              >
                View Shift Details
              </Link>
            </div>
          </div>
        </div>

        {/* 7. RECENT ACTIVITY TIMELINE */}
        <div className="rounded-[28px] bg-white border border-slate-200/90 shadow-card p-6">
          <h3 className="text-lg font-extrabold text-[#0B132B] mb-4">
            {t('recentActivityHeading')}
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span>{t('actProfileCreated')}</span>
              <span className="text-[10px] text-slate-400 ml-auto">Today</span>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>{t('actIdentityStarted')}</span>
              <span className="text-[10px] text-slate-400 ml-auto">Active</span>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>{t('actPreviousJob')}</span>
              <span className="text-[10px] text-slate-400 ml-auto">Yesterday</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7.5. STAY PROTECTED — FINANCIAL SAFETY NET ENTRY (PHASE 7) */}
        {/* ========================================================================= */}
        <Link
          to="/worker/safety-net"
          className="group block rounded-[28px] bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 border border-emerald-500"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Shield className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider bg-white/15 px-2.5 py-0.5 rounded-full">
                  Stay Protected
                </span>
                <h2 className="text-xl font-black tracking-tight mt-0.5 font-sans">
                  {language === 'hi' ? 'सुरक्षित रहें (Safety Net)' : 'Stay Protected'}
                </h2>
                <p className="text-xs font-medium text-emerald-100 mt-0.5">
                  {language === 'hi' ? 'योजनाएं, बीमा एवं सहायता खोजें' : 'Discover welfare, schemes & support'}
                </p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </Link>

        {/* ========================================================================= */}
        {/* 8. AI SAATHI ENTRY CARD */}
        {/* ========================================================================= */}
        <div className="rounded-[28px] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#0B132B] text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-base font-black">{t('aiSaathiCardTitle')}</h4>
              <p className="text-xs text-slate-950/80 font-medium">
                {t('aiSaathiCardSub')}
              </p>
            </div>
          </div>

          <Link
            to="/worker/ai-saathi"
            className="px-5 py-2.5 rounded-2xl bg-[#0B132B] hover:bg-slate-900 text-amber-400 font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            {t('aiSaathiCardBtn')}
          </Link>
        </div>

      </div>

      {/* Mobile Bottom Navigation Bar */}
      <WorkerBottomNav />
    </div>
  );
};
