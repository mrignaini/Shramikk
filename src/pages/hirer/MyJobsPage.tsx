import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  PlusCircle,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  Phone,
  Star,
  Play,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import type { Job } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useJobs } from '../../context/JobContext';
import { useAuth } from '../../context/AuthContext';
import { HirerBottomNav } from '../../components/navigation/HirerBottomNav';
import { RatingModal } from '../../components/lifecycle/RatingModal';
import { CompletionConfirmModal } from '../../components/lifecycle/CompletionConfirmModal';
import { StartWorkModal } from '../../components/lifecycle/StartWorkModal';
import { PaymentRecordModal } from '../../components/lifecycle/PaymentRecordModal';
import type { PaymentRecordItem } from '../../context/JobContext';

export const MyJobsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { jobs, applications, hires, hireWorkerForJob, rejectApplication, startWork, completeWork, paymentRecords, hasRated, getRatingForJobAndUser, confirmPaymentByHirer } = useJobs();
  const { auth } = useAuth();

  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'hires'>('active');
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState<Job | null>(null);
  const [jobToClose, setJobToClose] = useState<Job | null>(null);
  const [jobToStart, setJobToStart] = useState<Job | null>(null);
  const [jobToComplete, setJobToComplete] = useState<Job | null>(null);
  const [ratingJob, setRatingJob] = useState<Job | null>(null);
  const [viewingPayment, setViewingPayment] = useState<PaymentRecordItem | null>(null);

  const activeJobs = jobs.filter((j) => j.status === 'open' || j.status === 'in_progress');
  const completedJobs = jobs.filter((j) => j.status === 'completed');

  return (
    <div className="min-h-screen pb-24 md:pb-12 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Header */}
        <div className="rounded-[28px] bg-[#0B132B] text-white p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-2 inline-block">
              Hirer Management Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-sans">
              Job & Shift Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Active shifts, completed milestones, and workforce assignments
            </p>
          </div>

          <Link
            to="/hirer/post-job"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Post New Job</span>
          </Link>
        </div>

        {/* 3-Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-1.5 rounded-2xl">
          {[
            { key: 'active', label: `Active (${activeJobs.length})`, icon: Clock },
            { key: 'completed', label: `Completed (${completedJobs.length})`, icon: CheckCircle2 },
            { key: 'hires', label: `Hires (${hires.length})`, icon: Users },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 ${
                activeTab === key
                  ? 'bg-white text-[#0B132B] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* === TAB: ACTIVE JOBS === */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {activeJobs.length > 0 ? (
              activeJobs.map((job) => {
                const isInProgress = job.status === 'in_progress';
                const jobApplicants = applications.filter((a) => a.jobId === job.id);

                return (
                  <div
                    key={job.id}
                    className={`p-5 sm:p-6 rounded-[26px] bg-white border transition-all space-y-4 shadow-card ${
                      isInProgress ? 'border-emerald-300 ring-1 ring-emerald-400/20' : 'border-slate-200/90'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">
                          {job.category}
                        </span>
                        {isInProgress ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            🟢 In Progress
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            {t('statusOpenHiring')}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400">पोस्ट किया: {job.createdAt}</span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0B132B] leading-snug">
                        {language === 'hi' ? job.titleHi : job.title}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {job.location.locality}, {job.location.city} • शुरुआत: {job.startDate}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-slate-800">
                          {isInProgress ? 'कार्य प्रगति: Day 2 of 3' : `नियुक्ति: ${job.filledWorkersCount}/${job.requiredWorkersCount} कामगार`}
                        </div>
                        <div className="w-44 h-2 rounded-full bg-slate-200 mt-1 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all"
                            style={{
                              width: isInProgress ? '66%' : `${Math.min(100, (job.filledWorkersCount / job.requiredWorkersCount) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 block">वेतन दर:</span>
                        <div className="text-base font-black text-slate-900 font-sans">
                          ₹{job.wagePerDay}<span className="text-[10px] text-slate-500 font-normal">/दिन</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedJobForApplicants(job)}
                          className="px-4 py-2 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-amber-400 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>आवेदन ({jobApplicants.length})</span>
                        </button>

                        {!isInProgress ? (
                          <button
                            type="button"
                            onClick={() => setJobToStart(job)}
                            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>काम शुरू करें</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setJobToComplete(job)}
                            className="px-3.5 py-2 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-amber-400 text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{t('btnMarkCompleted')}</span>
                          </button>
                        )}
                        <Link
                          to="/payments"
                          className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1 transition-colors"
                          title="Secure payment in escrow"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                          <span>सुरक्षित भुगतान (Escrow)</span>
                        </Link>
                      </div>

                      {!isInProgress && (
                        <button
                          type="button"
                          onClick={() => setJobToClose(job)}
                          className="text-xs text-red-600 font-bold hover:underline py-1"
                        >
                          काम बंद करें
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 px-4 rounded-[28px] bg-white border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">{t('noJobsPostedTitle')}</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">{t('noJobsPostedSub')}</p>
                <Link to="/hirer/post-job" className="inline-block px-5 py-2.5 rounded-xl bg-[#EAA228] text-slate-950 text-xs font-bold shadow-sm mt-2">
                  + नया काम पोस्ट करें
                </Link>
              </div>
            )}
          </div>
        )}

        {/* === TAB: COMPLETED JOBS === */}
        {activeTab === 'completed' && (
          <div className="space-y-4">
            {completedJobs.length > 0 ? (
              completedJobs.map((job) => {
                const totalPaid = job.wagePerDay * (job.durationDays || 1);
                const hirerId = auth.userId || 'h-201';
                const rated = hasRated(job.id, hirerId);
                const existingRating = getRatingForJobAndUser(job.id, hirerId);
                const matchingPayment = paymentRecords.find((p) => p.jobId === job.id);

                // Get the hired worker for this job
                const hiredWorkerForJob = hires.find((h) => h.jobId === job.id);

                return (
                  <div
                    key={job.id}
                    className="p-5 sm:p-6 rounded-[26px] bg-white border border-slate-200/90 shadow-card space-y-4"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black">{job.category}</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ✓ Completed
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">{job.startDate}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {language === 'hi' ? job.titleHi : job.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">📍 {job.location.locality}, {job.location.city}</p>
                    </div>

                    {/* Payment Summary & Two-Sided Verification */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-emerald-900 font-bold block">कुल भुगतान (Total Paid)</span>
                          {matchingPayment?.status === 'verified' ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-950 text-[10px] font-black">
                              ✓ Payment Verified
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                              ⏳ Awaiting Confirmation
                            </span>
                          )}
                        </div>
                        <div className="text-xl font-black text-slate-900 font-sans mt-0.5">
                          ₹{totalPaid.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {matchingPayment && !matchingPayment.hirerConfirmed && (
                          <button
                            type="button"
                            onClick={() => confirmPaymentByHirer(matchingPayment.id)}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-colors"
                          >
                            भुगतान पुष्टि करें (Confirm)
                          </button>
                        )}
                        {matchingPayment ? (
                          <button
                            type="button"
                            onClick={() => setViewingPayment(matchingPayment)}
                            className="px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-xs font-black hover:bg-emerald-100 flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            पर्ची देखें
                          </button>
                        ) : (
                          <span className="text-xs text-emerald-700 font-bold px-3 py-2 rounded-xl bg-white border border-emerald-300">
                            ₹{job.wagePerDay}/दिन × {job.durationDays}d
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rate Worker Row */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div className="text-xs text-slate-500">
                        {rated ? (
                          <span className="inline-flex items-center gap-1 font-bold text-amber-700">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                            आपकी रेटिंग: {existingRating?.score || 5}.0 ★ ({t('alreadyRatedBadge')})
                          </span>
                        ) : (
                          <span>कामगार के काम को रेट करें</span>
                        )}
                      </div>

                      {!rated && hiredWorkerForJob && (
                        <button
                          type="button"
                          onClick={() => setRatingJob(job)}
                          className="px-4 py-2 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-amber-400 font-black text-xs shadow-2xs flex items-center gap-1"
                        >
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{t('rateWorkerTitle')}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs bg-white rounded-[28px] border border-slate-200 p-8">
                आपके पूर्ण किए गए काम यहाँ दिखेंगे।
              </div>
            )}
          </div>
        )}

        {/* === TAB: MY HIRES === */}
        {activeTab === 'hires' && (
          <div className="space-y-4">
            {hires.length > 0 ? (
              hires.map((hire) => (
                <div
                  key={hire.id}
                  className="p-5 sm:p-6 rounded-[24px] bg-white border border-slate-200/90 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-13 h-13 rounded-2xl bg-amber-200 flex items-center justify-center text-2xl shrink-0 font-bold">
                      👷🏽‍♂️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-extrabold text-slate-900">{hire.workerName}</h4>
                        <span className="flex items-center gap-0.5 text-xs font-bold text-slate-800">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                          {hire.workerRating}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        🧱 {hire.workerSkill} • काम: <strong>{hire.jobTitleHi || hire.jobTitle}</strong>
                      </p>
                      <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>
                          {hire.status === 'completed' ? '✓ काम पूर्ण' : '🟢 काम जारी'} • ₹{hire.wagePerDay}/दिन
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 sm:pt-0">
                    <a
                      href="tel:9876543210"
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>कॉल करें</span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 px-4 rounded-[28px] bg-white border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">{t('noHiresYetTitle')}</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">{t('noHiresYetSub')}</p>
                <Link to="/hire-workers" className="inline-block px-5 py-2.5 rounded-xl bg-[#EAA228] text-slate-950 text-xs font-bold shadow-sm mt-2">
                  कामगार खोजें →
                </Link>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ======== APPLICANTS REVIEW MODAL ======== */}
      {selectedJobForApplicants && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-[32px] border border-slate-200 p-6 shadow-2xl space-y-5 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase">प्राप्त आवेदन</span>
                <h3 className="text-base font-black text-[#0B132B]">
                  {selectedJobForApplicants.titleHi || selectedJobForApplicants.title}
                </h3>
              </div>
              <button onClick={() => setSelectedJobForApplicants(null)} className="p-1.5 rounded-full bg-slate-100 text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 flex-1">
              {applications.filter((a) => a.jobId === selectedJobForApplicants.id).length > 0 ? (
                applications.filter((a) => a.jobId === selectedJobForApplicants.id).map((app) => (
                  <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-amber-200 flex items-center justify-center text-xl">👷🏽‍♂️</div>
                        <div>
                          <div className="font-extrabold text-slate-900 text-sm">{app.workerName}</div>
                          <div className="text-xs text-slate-500">{app.workerSkill} • {app.workerRating} ★</div>
                        </div>
                      </div>
                      {app.status === 'accepted' ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">✓ Hired</span>
                      ) : app.status === 'rejected' ? (
                        <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold">Rejected</span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">Pending</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <a
                        href={`/worker/${app.workerId || 'w-101'}/identity`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 hover:underline"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>कार्य पहचान देखें (View Work Identity) →</span>
                      </a>
                    </div>

                    {app.status === 'applied' && (
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => {
                            hireWorkerForJob(selectedJobForApplicants.id, {
                              id: app.workerId,
                              name: app.workerName,
                              primarySkill: app.workerSkill,
                              rating: app.workerRating,
                            });
                          }}
                          className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>हायर करें (Hire)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => rejectApplication(app.id)}
                          className="py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors"
                        >
                          अस्वीकार करें
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">अभी तक कोई आवेदन नहीं।</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======== CLOSE JOB CONFIRMATION ======== */}
      {jobToClose && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-[28px] p-6 space-y-4 shadow-2xl text-center">
            <AlertCircle className="w-12 h-12 text-amber-600 mx-auto" />
            <div>
              <h3 className="text-lg font-black text-slate-900">काम बंद करें?</h3>
              <p className="text-xs text-slate-500 mt-1">क्या आप वाकई इस जॉब को बंद करना चाहते हैं?</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button onClick={() => setJobToClose(null)} className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">रद्द करें</button>
              <button
                onClick={() => { rejectApplication(''); setJobToClose(null); }}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                काम बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Phase 6 lifecycle modals */}
      {jobToStart && (
        <StartWorkModal
          job={jobToStart}
          onClose={() => setJobToStart(null)}
          onConfirmStart={() => { startWork(jobToStart.id); setJobToStart(null); }}
        />
      )}

      {jobToComplete && (
        <CompletionConfirmModal
          job={jobToComplete}
          onClose={() => setJobToComplete(null)}
          onConfirmComplete={() => { completeWork(jobToComplete.id); setJobToComplete(null); setActiveTab('completed'); }}
        />
      )}

      {ratingJob && (
        <RatingModal
          jobId={ratingJob.id}
          targetUserName={hires.find((h) => h.jobId === ratingJob.id)?.workerName || 'कामगार'}
          targetUserId={hires.find((h) => h.jobId === ratingJob.id)?.workerId || 'w-101'}
          isWorkerRatingHirer={false}
          onClose={() => setRatingJob(null)}
          onSuccess={() => {}}
        />
      )}

      {viewingPayment && (
        <PaymentRecordModal
          record={viewingPayment}
          onClose={() => setViewingPayment(null)}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <HirerBottomNav />
    </div>
  );
};
