import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Users,
  Search,
  Briefcase,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  IndianRupee,
  Phone,
  ArrowRight,
  CheckCircle2,
  FileText,
  Building,
  CreditCard,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { HirerBottomNav } from '../../components/navigation/HirerBottomNav';

export const HirerDashboardPage: React.FC = () => {
  const { auth } = useAuth();
  const { jobs, hires, applications } = useJobs();
  const navigate = useNavigate();

  // Auth guard: redirect to login if unauthenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [auth.isAuthenticated, navigate]);

  const hirer = auth.hirerProfile;
  const rawName = hirer?.fullName || 'Amit Sharma (Contractor)';
  const firstName = rawName.split(' ')[0];
  const hirerType = hirer?.hirerType || 'Civil Contractor';
  const locationDisplay = hirer?.city
    ? `${hirer.locality || ''}, ${hirer.city}`
    : 'Ghaziabad, NCR';

  // Dynamic Metrics
  const activeJobs = jobs.filter((j) => j.status === 'open' || j.status === 'in_progress');
  const activeHires = hires.filter((h) => h.status === 'active');
  const totalEscrowCommitted = activeJobs.reduce((acc, j) => acc + (j.wagePerDay * (j.durationDays || 1) * (j.requiredWorkersCount || 1)), 0);

  return (
    <div className="min-h-screen pb-24 md:pb-12 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* 1. HIRER HEADER & PROFILE SUMMARY */}
        <div className="rounded-[28px] bg-white border border-slate-200/90 shadow-card p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-[#0B132B] text-amber-400 border-2 border-slate-700 flex items-center justify-center text-2xl shadow-sm font-black">
                  {firstName.slice(0, 2)}
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
                    Verified Employer
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-0.5">
                  {hirerType}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{locationDisplay}</span>
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 flex flex-col sm:items-end gap-1">
              <span className="text-xs text-slate-400 block">Employer Rating & Trust Score</span>
              <Link
                to="/hirer/profile"
                className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-xl transition-colors mt-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>View Company Profile →</span>
              </Link>
            </div>

          </div>
        </div>

        {/* 2. REAL-TIME CONTRACTOR STATS BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-bold text-slate-400">Active Jobs</span>
            <div className="text-2xl font-black text-[#0B132B] mt-1 font-sans">{activeJobs.length}</div>
            <span className="text-[10px] text-emerald-600 font-bold">Live on platform</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-bold text-slate-400">Total Hires</span>
            <div className="text-2xl font-black text-amber-700 mt-1 font-sans">{hires.length}</div>
            <span className="text-[10px] text-slate-500 font-medium">{activeHires.length} shifts in progress</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-bold text-slate-400">Applications</span>
            <div className="text-2xl font-black text-blue-900 mt-1 font-sans">{applications.length}</div>
            <span className="text-[10px] text-slate-500 font-medium">Verified workers</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-xs font-bold text-slate-400">Escrow Committed</span>
            <div className="text-2xl font-black text-slate-900 mt-1 font-sans">
              ₹{(totalEscrowCommitted / 1000).toFixed(1)}K
            </div>
            <span className="text-[10px] text-amber-700 font-bold">100% Protected</span>
          </div>
        </div>

        {/* 3. DUAL HIRER ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Primary CTA: POST A JOB */}
          <Link
            to="/hirer/post-job"
            className="group p-6 rounded-[28px] bg-[#EAA228] hover:bg-[#DE9419] text-slate-950 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 border border-amber-400 flex flex-col justify-between h-44"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-950/15 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <PlusCircle className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h2 className="text-xl font-black tracking-tight font-sans">
                Post a New Job
              </h2>
              <p className="text-xs text-slate-900 mt-0.5 font-medium">
                Connect with skilled masons, painters, plumbers, and carpenters
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between font-extrabold text-xs">
              <span>Create Shift Listing</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Secondary CTA: FIND WORKERS */}
          <Link
            to="/hire-workers"
            className="group p-6 rounded-[28px] bg-white border-2 border-slate-200 hover:border-slate-800 text-slate-900 shadow-sm hover:shadow-card transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between h-44"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h2 className="text-xl font-black tracking-tight text-[#0B132B] font-sans">
                Browse Verified Workers
              </h2>
              <p className="text-xs text-slate-600 mt-0.5 font-normal">
                Check credentials, work history, ratings, and hire directly
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between font-extrabold text-xs text-slate-800">
              <span>Explore Worker Directory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* 4. HIRER ACTIVE JOBS SECTION */}
        <div className="rounded-[28px] bg-white border border-slate-200/90 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-[#0B132B]">
                Active Jobs & Shifts
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                {activeJobs.length}
              </span>
            </div>
            <Link to="/hirer/post-job" className="text-xs font-bold text-amber-700 hover:underline">
              + Post New Job
            </Link>
          </div>

          <div className="space-y-3">
            {activeJobs.length > 0 ? (
              activeJobs.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-50/80 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">
                        {job.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        job.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {job.status === 'in_progress' ? 'In Progress' : 'Open'}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 truncate">
                      {job.title}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{typeof job.location === 'string' ? job.location : `${job.location.locality}, ${job.location.city}`}</span>
                      <span>• {job.requiredWorkersCount} workers needed</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 shrink-0">
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-black text-slate-900 font-sans">
                        ₹{job.wagePerDay.toLocaleString('en-IN')} / day
                      </div>
                      <div className="text-[10px] text-slate-500">{job.durationDays} days duration</div>
                    </div>
                    <Link
                      to="/hirer/my-jobs"
                      className="px-3.5 py-2 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-amber-400 text-xs font-bold transition-colors"
                    >
                      Manage Job →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 px-4 rounded-2xl border-2 border-dashed border-slate-200">
                <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No active job listings right now</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Post a construction or repair job to connect with verified nearby tradespeople immediately.
                </p>
                <Link
                  to="/hirer/post-job"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Post Your First Job</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* 5. RECENT HIRES SECTION */}
        <div className="rounded-[28px] bg-white border border-slate-200/90 shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-[#0B132B]">
                Recent Hires
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                {hires.length}
              </span>
            </div>
            <Link to="/hirer/my-jobs" className="text-xs font-bold text-amber-700 hover:underline">
              View All Hires →
            </Link>
          </div>

          {hires.length > 0 ? (
            <div className="space-y-3">
              {hires.slice(0, 3).map((hire) => (
                <div
                  key={hire.id}
                  className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/50 to-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-200 flex items-center justify-center text-2xl shrink-0">
                      👷🏽‍♂️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-slate-900">{hire.workerName}</span>
                        <span className="flex items-center gap-0.5 text-xs font-bold text-slate-800">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                          {hire.workerRating || 4.8}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">🛠 {hire.workerSkill} • ₹{hire.wagePerDay}/day</p>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        {hire.status === 'active' ? 'Shift Active' : 'Completed'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 sm:pt-0">
                    <Link
                      to={`/worker/${hire.workerId}/identity`}
                      className="px-3.5 py-2 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-bold"
                    >
                      Digital Work ID
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 px-4 rounded-2xl border-2 border-dashed border-slate-200">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No active hires yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Browse our directory of verified masons, painters, electricians, and plumbers to hire directly.
              </p>
              <Link
                to="/hire-workers"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-white font-bold text-xs shadow-sm"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Search Worker Directory</span>
              </Link>
            </div>
          )}
        </div>

        {/* 6. HIRER TRUST & CONFIDENCE SECTION */}
        <div className="rounded-[28px] bg-[#0B132B] text-white p-6 sm:p-8 shadow-xl">
          <h3 className="text-lg font-extrabold text-white mb-2">
            Why Contractors Trust SHRAMIKK
          </h3>
          <p className="text-xs text-slate-300 mb-5">
            SHRAMIKK connects you directly with verified blue-collar tradespeople with milestone escrow protection and zero paperwork hassle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Aadhaar & e-Shram Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Transparent Daily Attendance & QR Punch-in</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <Star className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Verified Past Project Ratings & Supervisor Reviews</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
              <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Automated Daily Wage Receipts & Escrow Protection</span>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Bottom Navigation Bar */}
      <HirerBottomNav />
    </div>
  );
};

export default HirerDashboardPage;
