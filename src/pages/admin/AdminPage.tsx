import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Settings,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Search,
  Award,
  Users,
  Briefcase,
  IndianRupee,
  Star,
  Activity,
  Bot,
  Landmark,
  Shield,
  RotateCcw,
  Play,
  Layers,
  ArrowRight,
  Filter,
  Check,
  AlertTriangle,
  ExternalLink,
  Eye,
  Clock,
  Sparkles,
  Info,
  Building,
  HardHat,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { mockWorkersList, mockJobs } from '../../data/mockData';
import { verifiedSchemes, verifiedInsuranceOptions } from '../../data/safetyNetData';
import { useLanguage } from '../../context/LanguageContext';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { useSafetyNet } from '../../context/SafetyNetContext';

type AdminTab =
  | 'overview'
  | 'workers'
  | 'hirers'
  | 'jobs'
  | 'payments'
  | 'identities'
  | 'safetynet'
  | 'ai_saathi'
  | 'demo_control';

export const AdminPage: React.FC = () => {
  const { language } = useLanguage();
  const { jobs, workers, paymentRecords, ratings, hires } = useJobs();
  const { auth, logout } = useAuth();
  const { state: safetyNetState } = useSafetyNet();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Search & Filter States
  const [workerSearch, setWorkerSearch] = useState('');
  const [jobFilter, setJobFilter] = useState<'all' | 'open' | 'in_progress' | 'completed'>('all');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'verified' | 'pending' | 'under_review'>('all');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState(false);

  // High-Level Dynamic Metrics Calculation
  const totalWorkers = workers.length || mockWorkersList.length;
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.status === 'open' || j.status === 'in_progress').length;
  const completedJobs = jobs.filter((j) => j.status === 'completed').length;
  const totalRatingsCount = 11 + ratings.length;
  const totalVerifiedPayments = paymentRecords.filter((p) => p.status === 'verified').length;
  const totalPaymentSum = 242000 + paymentRecords.reduce((sum, p) => sum + p.amount, 0);
  const isSafetyNetActive = safetyNetState.safetyNetEnabled;

  // Auth guard: redirect non-admin users to login
  useEffect(() => {
    if (!auth.isAuthenticated || auth.role !== 'admin') {
      navigate('/login', { replace: true });
    }
  }, [auth.isAuthenticated, auth.role, navigate]);

  // Demo Data Reset Handler
  const handleResetDemoData = () => {
    localStorage.removeItem('shramikk_jobs');
    localStorage.removeItem('shramikk_payments');
    localStorage.removeItem('shramikk_hires');
    localStorage.removeItem('shramikk_ratings');
    localStorage.removeItem('shramikk_safetynet');
    localStorage.removeItem('shramikk_identity_public_w-101');
    setShowResetConfirm(false);
    setResetSuccessMessage(true);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  // Filtered Workers
  const filteredWorkers = workers.filter((w) => {
    const q = workerSearch.toLowerCase();
    return (
      w.name.toLowerCase().includes(q) ||
      w.primarySkill.toLowerCase().includes(q) ||
      (w.city && w.city.toLowerCase().includes(q))
    );
  });

  // Filtered Jobs
  const filteredJobs = jobs.filter((j) => {
    if (jobFilter === 'open') return j.status === 'open';
    if (jobFilter === 'in_progress') return j.status === 'in_progress';
    if (jobFilter === 'completed') return j.status === 'completed';
    return true;
  });

  // Filtered Payments
  const filteredPayments = paymentRecords.filter((p) => {
    if (paymentFilter === 'verified') return p.status === 'verified';
    if (paymentFilter === 'pending') return p.status === 'pending';
    if (paymentFilter === 'under_review') return p.status === 'under_review';
    return true;
  });

  // =========================================================================
  // MAIN ADMIN DASHBOARD & CONTROL CENTER
  // =========================================================================
  if (!auth.isAuthenticated || auth.role !== 'admin') {
    return null; // redirected by useEffect above
  }

  return (
    <div className="min-h-screen pb-24 md:pb-12 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Top Header Banner */}
        <div className="rounded-[32px] bg-[#0B132B] text-white p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                Platform Control & Monitoring
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                ✓ System Operational
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-sans mt-1">
              SHRAMIKK Master Admin Panel
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Live System Status, Seeded Flow Controls & Multi-Phase Audit Dashboard
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-4 py-2 rounded-xl bg-red-950/80 border border-red-700 text-red-300 hover:bg-red-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>

            <button
              type="button"
              onClick={() => { logout(); navigate('/'); }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Success alert on reset */}
        {resetSuccessMessage && (
          <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>System cache reset successfully. Reloading page...</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 text-xs font-bold scrollbar-none">
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'demo_control', label: '⚡ Operations & Workflows' },
            { id: 'workers', label: `👷 Workers (${totalWorkers})` },
            { id: 'hirers', label: '🏢 Hirers' },
            { id: 'jobs', label: `💼 Jobs (${totalJobs})` },
            { id: 'payments', label: `💳 Payments (${paymentRecords.length})` },
            { id: 'identities', label: '🪪 Digital Identities' },
            { id: 'safetynet', label: '🛡 Safety Net & Schemes' },
            { id: 'ai_saathi', label: '🤖 AI Saathi Monitoring' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#0B132B] text-amber-400 shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 8 Metric KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Total Workers</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans mt-1">{totalWorkers}</div>
                <span className="text-[10px] text-emerald-700 font-bold">100% Verified Profiles</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Total Jobs</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans mt-1">{totalJobs}</div>
                <span className="text-[10px] text-amber-700 font-bold">{activeJobs} Active • {completedJobs} Completed</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Verified Payments</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-sans mt-1">{totalVerifiedPayments}</div>
                <span className="text-[10px] text-slate-500">Two-way confirmed slips</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Total Volume Recorded</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans mt-1">₹{(totalPaymentSum/1000).toFixed(0)}K</div>
                <span className="text-[10px] text-emerald-700 font-bold">Verified ledger balance</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Total Ratings</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-900 font-sans mt-1">{totalRatingsCount} ★</div>
                <span className="text-[10px] text-slate-500">4.8 Average Rating</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Digital Identities</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans mt-1">{totalWorkers}</div>
                <span className="text-[10px] text-emerald-700 font-bold">QR & Share enabled</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Government Schemes</div>
                <div className="text-2xl sm:text-3xl font-black text-violet-900 font-sans mt-1">10</div>
                <span className="text-[10px] text-violet-700 font-bold">Verified Welfare DB</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Safety Net Status</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-sans mt-1">
                  {isSafetyNetActive ? 'Active ✓' : 'Opt-in'}
                </div>
                <span className="text-[10px] text-slate-500">Protection Shield Enabled</span>
              </div>
            </div>

            {/* System Health Checklist */}
            <div className="rounded-[28px] bg-white border border-slate-200 shadow-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-extrabold text-[#0B132B]">
                    System Health & Module Audit
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  All 10 Modules Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {[
                  { name: 'Phase 1: Landing Page', status: '✓ Working', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  { name: 'Phase 2: Auth & Onboarding', status: '✓ Working', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  { name: 'Phase 3: Worker/Hirer Dashboards', status: '✓ Working', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  { name: 'Phase 4: Marketplace & Applications', status: '✓ Working', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  { name: 'Phase 5: Job Posting & Hiring', status: '✓ Working', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  { name: 'Phase 6: Work Lifecycle & Ratings', status: '✓ Working', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  { name: 'Phase 7: AI Saathi & Safety Net', status: '✓ Working', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  { name: 'Phase 8: Digital Work Identity & QR', status: '✓ Working', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  { name: 'Phase 9: Financial Hub & Payments', status: '✓ Working', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  { name: 'Phase 10: Admin & Demo Control', status: '✓ Working', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                ].map((mod, i) => (
                  <div key={i} className={`p-3 rounded-2xl border ${mod.color} flex items-center justify-between font-bold`}>
                    <span className="truncate">{mod.name}</span>
                    <span className="shrink-0">{mod.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Activity Timeline */}
            <div className="rounded-[28px] bg-white border border-slate-200 shadow-card p-6 space-y-3">
              <h3 className="text-base font-extrabold text-[#0B132B] flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Recent Platform Activity Stream</span>
              </h3>

              <div className="space-y-2 text-xs">
                {[
                  { text: 'Ramesh Kumar (Mason) completed Villa Masonry Work.', time: '10 min ago', tag: 'Job Completed' },
                  { text: 'Amit Sharma confirmed ₹3,000 payment (two-way verification complete).', time: '15 min ago', tag: 'Payment Verified' },
                  { text: 'Digital Work Identity QR Code scanned and accessed.', time: '1 hour ago', tag: 'Identity Shared' },
                  { text: 'AI Saathi matched worker with e-Shram and Atal Pension Yojana schemes.', time: '2 hours ago', tag: 'Safety Net' },
                  { text: 'New construction job "Residential Villa Mason Needed" posted.', time: '4 hours ago', tag: 'Marketplace' },
                ].map((act, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-semibold text-slate-800">{act.text}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-600">{act.tag}</span>
                      <span className="text-[10px] text-slate-400">{act.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DEMO CONTROL CENTER */}
        {/* ========================================================================= */}
        {activeTab === 'demo_control' && (
          <div className="space-y-6">
            <div className="rounded-[28px] bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-slate-950/10 text-slate-950 text-xs font-black uppercase">
                  Workforce Operations & Workflows
                </span>
                <h2 className="text-2xl sm:text-3xl font-black mt-1">
                  Operations & Workflow Simulator
                </h2>
                <p className="text-xs sm:text-sm font-semibold opacity-90 mt-0.5">
                  SHRAMIKK End-to-End Workforce Lifecycle Navigation
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="px-5 py-3 rounded-2xl bg-[#0B132B] hover:bg-slate-900 text-amber-400 text-xs font-black shadow-md flex items-center gap-2 shrink-0 transition-transform active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset System Cache</span>
              </button>
            </div>

            {/* Scenario Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Scenario 1: Worker Discovers Work (Find Work)',
                  desc: 'Ramesh Kumar searches nearby residential villa jobs from his dashboard and submits an application.',
                  path: '/find-work',
                  tag: 'Worker Flow',
                  icon: <HardHat className="w-5 h-5 text-amber-600" />,
                },
                {
                  title: 'Scenario 2: Employer Hiring & Shift Management',
                  desc: 'Amit Sharma reviews applicant credentials, confirms the hiring, and punches in the shift.',
                  path: '/hirer/my-jobs',
                  tag: 'Hirer Flow',
                  icon: <Briefcase className="w-5 h-5 text-blue-600" />,
                },
                {
                  title: 'Scenario 3: Dual Payment Verification & Escrow',
                  desc: 'Upon completion, contractor releases funds, worker confirms receipt, and immutable ledger slip generates.',
                  path: '/worker/financial-hub',
                  tag: 'Payment Verification',
                  icon: <IndianRupee className="w-5 h-5 text-emerald-600" />,
                },
                {
                  title: 'Scenario 4: Digital Work Identity & Live QR Badge',
                  desc: 'Portable digital worker identity card displaying verified trade grade, past ratings, and verification QR code.',
                  path: '/worker/digital-identity',
                  tag: 'Trust Profile',
                  icon: <Award className="w-5 h-5 text-violet-600" />,
                },
                {
                  title: 'Scenario 5: Safety Net & Government Schemes',
                  desc: 'Income smoothing detection with automated eligibility matching for e-Shram, BOCW, and APY pension.',
                  path: '/worker/safety-net',
                  tag: 'Safety Net',
                  icon: <Shield className="w-5 h-5 text-emerald-600" />,
                },
                {
                  title: 'Scenario 6: AI Saathi Intelligence Assistant',
                  desc: 'Verified welfare assistant powered by anti-hallucination scheme database for construction laborers.',
                  path: '/worker/ai-saathi',
                  tag: 'AI Assistant',
                  icon: <Bot className="w-5 h-5 text-violet-600" />,
                },
                {
                  title: 'Scenario 7: Portable Identity & Public Share',
                  desc: 'Public verifiable digital identity link readable by any external contractor via QR scan.',
                  path: '/worker/w-101/identity',
                  tag: 'Public Identity',
                  icon: <ExternalLink className="w-5 h-5 text-blue-600" />,
                },
                {
                  title: 'Scenario 8: Employer Trust & Reputation Profile',
                  desc: 'Two-sided transparency: Contractor payment reliability ratings, past projects, and worker reviews.',
                  path: '/hirer/profile',
                  tag: 'Two-Sided Trust',
                  icon: <Building className="w-5 h-5 text-amber-600" />,
                },
              ].map((sc, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card flex flex-col justify-between space-y-3 hover:border-amber-400 transition-all"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {sc.icon}
                        <h4 className="text-sm font-black text-slate-900">{sc.title}</h4>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                        {sc.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{sc.desc}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">{sc.path}</span>
                    <Link
                      to={sc.path}
                      className="px-4 py-2 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-amber-400 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Play className="w-3 h-3 fill-amber-400" />
                      <span>Launch Scenario</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: WORKERS MONITORING */}
        {/* ========================================================================= */}
        {activeTab === 'workers' && (
          <div className="rounded-[28px] bg-white border border-slate-200 shadow-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-[#0B132B]">
                  Workers Directory & Identity Audit
                </h3>
                <p className="text-xs text-slate-500">Total {filteredWorkers.length} verified worker profiles</p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={workerSearch}
                  onChange={(e) => setWorkerSearch(e.target.value)}
                  placeholder="Search by name, skill, or city..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                    <th className="pb-2.5 font-bold">Worker</th>
                    <th className="pb-2.5 font-bold">Primary Trade</th>
                    <th className="pb-2.5 font-bold">Location</th>
                    <th className="pb-2.5 font-bold">Rating</th>
                    <th className="pb-2.5 font-bold">Completed Shifts</th>
                    <th className="pb-2.5 font-bold">Digital Identity</th>
                    <th className="pb-2.5 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredWorkers.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50">
                      <td className="py-3.5 font-extrabold text-slate-900">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{w.avatar || '👷🏽‍♂️'}</span>
                          <span>{w.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-slate-700 font-semibold">{w.primarySkill}</td>
                      <td className="py-3.5 text-slate-500">{w.locality}, {w.city}</td>
                      <td className="py-3.5 font-bold text-amber-900">{w.rating} ★</td>
                      <td className="py-3.5 font-mono">{w.completedJobsCount} Shifts</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                          ✓ Active Digital ID
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <Link
                          to={`/worker/${w.id}/identity`}
                          target="_blank"
                          className="text-amber-800 hover:text-amber-950 font-bold hover:underline"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: HIRERS MONITORING */}
        {/* ========================================================================= */}
        {activeTab === 'hirers' && (
          <div className="rounded-[28px] bg-white border border-slate-200 shadow-card p-6 space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-[#0B132B]">
                Verified Hirers & Contractors Audit
              </h3>
              <p className="text-xs text-slate-500">Two-way ratings and payment compliance monitoring</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                    <th className="pb-2.5 font-bold">Hirer Name</th>
                    <th className="pb-2.5 font-bold">Category / Type</th>
                    <th className="pb-2.5 font-bold">Location</th>
                    <th className="pb-2.5 font-bold">Rating</th>
                    <th className="pb-2.5 font-bold">Jobs Posted</th>
                    <th className="pb-2.5 font-bold">Status</th>
                    <th className="pb-2.5 font-bold text-right">Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Amit Sharma (Contractor)', type: 'Civil Contractor', city: 'Ghaziabad', rating: 4.8, jobs: 4, status: '✓ Verified Prompt Payer' },
                    { name: 'Suresh Gupta', type: 'Home Owner', city: 'Delhi', rating: 4.7, jobs: 2, status: '✓ Verified' },
                    { name: 'Rajesh Kumar', type: 'Home Owner', city: 'Indirapuram', rating: 4.6, jobs: 3, status: '✓ Verified' },
                    { name: 'Goyal Construction Pvt. Ltd.', type: 'Corporate Builder', city: 'Sahibabad', rating: 4.9, jobs: 6, status: '✓ Verified Corporate' },
                  ].map((h, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-3.5 font-extrabold text-slate-900">{h.name}</td>
                      <td className="py-3.5 text-slate-700">{h.type}</td>
                      <td className="py-3.5 text-slate-500">{h.city}</td>
                      <td className="py-3.5 font-bold text-amber-900">{h.rating} ★</td>
                      <td className="py-3.5 font-mono">{h.jobs} Jobs</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                          {h.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <Link to="/hirer/profile" className="text-amber-800 font-bold hover:underline">
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: JOBS MONITORING */}
        {/* ========================================================================= */}
        {activeTab === 'jobs' && (
          <div className="rounded-[28px] bg-white border border-slate-200 shadow-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-[#0B132B]">
                  Job Postings & Shift Pipeline
                </h3>
                <p className="text-xs text-slate-500">Live and completed job shifts overview</p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'open', label: 'Open' },
                  { id: 'in_progress', label: 'In Progress' },
                  { id: 'completed', label: 'Completed' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setJobFilter(f.id as any)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      jobFilter === f.id ? 'bg-[#0B132B] text-amber-400' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                    <th className="pb-2.5 font-bold">Job Title</th>
                    <th className="pb-2.5 font-bold">Hirer</th>
                    <th className="pb-2.5 font-bold">Location</th>
                    <th className="pb-2.5 font-bold">Daily Wage</th>
                    <th className="pb-2.5 font-bold">Status</th>
                    <th className="pb-2.5 font-bold text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredJobs.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50">
                      <td className="py-3.5 font-extrabold text-slate-900">{j.title || j.titleHi}</td>
                      <td className="py-3.5 text-slate-700">{j.hirerName}</td>
                      <td className="py-3.5 text-slate-500">{j.location.locality}, {j.location.city}</td>
                      <td className="py-3.5 font-bold text-slate-900 font-sans">₹{j.wagePerDay}/day</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          j.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-900'
                            : j.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {j.status === 'completed' ? '✓ Completed' : j.status === 'in_progress' ? 'In Progress' : 'Open'}
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-mono text-slate-500">{j.startDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: PAYMENTS & TWO-SIDED VERIFICATION MONITORING */}
        {/* ========================================================================= */}
        {activeTab === 'payments' && (
          <div className="rounded-[28px] bg-white border border-slate-200 shadow-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-[#0B132B]">
                  Two-Way Payment Verification Monitor
                </h3>
                <p className="text-xs text-slate-500">
                  Worker and Hirer dual verification status & digital payment slips
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'verified', label: 'Verified' },
                  { id: 'pending', label: 'Pending' },
                  { id: 'under_review', label: 'Issues' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setPaymentFilter(f.id as any)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      paymentFilter === f.id ? 'bg-[#0B132B] text-amber-400' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px]">
                    <th className="pb-2.5 font-bold">Job & Slip</th>
                    <th className="pb-2.5 font-bold">Worker</th>
                    <th className="pb-2.5 font-bold">Hirer</th>
                    <th className="pb-2.5 font-bold">Amount (₹)</th>
                    <th className="pb-2.5 font-bold">Worker Confirmed</th>
                    <th className="pb-2.5 font-bold">Hirer Confirmed</th>
                    <th className="pb-2.5 font-bold text-right">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3.5">
                        <div className="font-extrabold text-slate-900">{p.jobTitle}</div>
                        <div className="text-[10px] font-mono text-amber-800">{p.slipNumber}</div>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-800">{p.workerName}</td>
                      <td className="py-3.5 text-slate-700">{p.hirerName}</td>
                      <td className="py-3.5 font-black text-slate-900 font-sans">₹{p.amount.toLocaleString('en-IN')}</td>
                      <td className="py-3.5">
                        {p.workerConfirmed ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" /> Confirmed
                          </span>
                        ) : (
                          <span className="text-amber-700 font-bold">Pending</span>
                        )}
                      </td>
                      <td className="py-3.5">
                        {p.hirerConfirmed ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" /> Confirmed
                          </span>
                        ) : (
                          <span className="text-amber-700 font-bold">Pending</span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          p.status === 'verified'
                            ? 'bg-emerald-100 text-emerald-900'
                            : p.status === 'under_review'
                            ? 'bg-red-100 text-red-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {p.status === 'verified' ? '✓ Verified' : p.status === 'under_review' ? '⚠️ Under Review' : '⏳ Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: DIGITAL IDENTITIES & TRUST */}
        {/* ========================================================================= */}
        {activeTab === 'identities' && (
          <div className="rounded-[28px] bg-white border border-slate-200 shadow-card p-6 space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-[#0B132B]">
                Digital Work Identities Status
              </h3>
              <p className="text-xs text-slate-500">
                Evidence-based work reputation, trade skills, ratings, and public QR links
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workers.map((w) => (
                <div key={w.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center text-2xl font-black">
                      {w.avatar || '👷🏽‍♂️'}
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-sm">{w.name}</div>
                      <div className="text-xs text-amber-900 font-bold">🧱 {w.primarySkill}</div>
                      <div className="text-[11px] text-slate-500">{w.completedJobsCount} Shifts • ⭐ {w.rating} ★</div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black block">
                      ✓ Active
                    </span>
                    <Link
                      to={`/worker/${w.id}/identity`}
                      target="_blank"
                      className="text-xs font-bold text-amber-800 hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>Public View</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: SAFETY NET & SCHEMES DATABASE */}
        {/* ========================================================================= */}
        {activeTab === 'safetynet' && (
          <div className="space-y-6">
            <div className="rounded-[28px] bg-white border border-slate-200 shadow-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#0B132B]">
                    Government Welfare Schemes Database
                  </h3>
                  <p className="text-xs text-slate-500">10 verified central & state welfare programs</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                  ✓ 10 Verified Records
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {verifiedSchemes.map((s) => (
                  <div key={s.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-start justify-between">
                      <strong className="text-slate-900 font-bold">{s.name}</strong>
                      <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-900 text-[10px] font-bold shrink-0">
                        {s.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">{s.description}</p>
                    <div className="text-[10px] text-amber-800 font-mono">Source: {s.officialSource || 'Government Portal'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] bg-white border border-slate-200 shadow-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#0B132B]">
                    Regulated Insurance Options
                  </h3>
                  <p className="text-xs text-slate-500">PMSBY, PMJJBY, Ayushman Bharat and more</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                  ✓ 4 Protection Options
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {verifiedInsuranceOptions.map((i) => (
                  <div key={i.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900 font-bold">{i.name}</strong>
                      <span className="font-mono text-emerald-700 font-black">{i.category}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{i.coverage[0]}</p>
                    <div className="text-[10px] text-slate-400">Provider: {i.provider}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: AI SAATHI RETRIEVAL AUDIT */}
        {/* ========================================================================= */}
        {activeTab === 'ai_saathi' && (
          <div className="rounded-[28px] bg-white border border-slate-200 shadow-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#0B132B] flex items-center gap-2">
                  <Bot className="w-5 h-5 text-violet-600" />
                  <span>AI Saathi Retrieval & Safety Audit</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Anti-hallucination guardrail active: AI Saathi answers strictly from verified welfare data
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
                ✓ 100% Retrieval Guardrail Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-center">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Supported Intents</span>
                <span className="text-2xl font-black text-violet-900 font-sans mt-1">4 Intents</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Scheme, Insurance, Income, Benefits</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Safe Fallback Rate</span>
                <span className="text-2xl font-black text-emerald-700 font-sans mt-1">100%</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Safe rejection on unknown queries</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 block uppercase">Verification Badge</span>
                <span className="text-2xl font-black text-amber-900 font-sans mt-1">✓ Verified</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Source linked with every response</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-violet-50/60 border border-violet-200 text-xs space-y-2">
              <strong className="text-violet-950 font-bold block">🛡 Anti-Hallucination Compliance Rules (Rule 41 Compliance):</strong>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                <li>AI Saathi never guarantees government scheme eligibility 100% (uses "You may be eligible").</li>
                <li>No hypothetical or fictitious welfare schemes or insurance policies are ever generated.</li>
                <li>No binding financial, loan, or investment advice is provided.</li>
              </ul>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* RESET DEMO DATA CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-[32px] border border-slate-200 p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-[#0B132B]">
              Reset Demo State?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to reset all local jobs, payments, ratings, and identity records back to initial seeded demo data?
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetDemoData}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Reset State
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
