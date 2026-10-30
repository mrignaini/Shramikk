/**
 * WorkerPaymentsPage — /worker/payments
 *
 * Shows the worker's payment history (read-only).
 * Workers can view status, transaction IDs, and the payment timeline.
 * They CANNOT release payments — that is the hirer's responsibility.
 */
import React, { useEffect, useState, useCallback } from 'react';
import {
  Wallet,
  Lock,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Loader2,
  ChevronRight,
  Shield,
  Sparkles,
} from 'lucide-react';
import { WorkerBottomNav } from '../../components/navigation/WorkerBottomNav';
import { fetchMyPayments, type Payment, type PaymentStatus } from '../../services/paymentService';
import { useLanguage } from '../../context/LanguageContext';

// ─── Shared helpers (duplicated for isolation) ────────────────────────────────

const STATUS_LABELS_EN: Record<PaymentStatus, string> = {
  CREATED: 'Payment Pending',
  PAYMENT_PENDING: 'Processing…',
  PAID: 'Paid',
  FUNDS_LOCKED: '🔒 Payment Secured',
  WORK_COMPLETED: 'Work Completed',
  RELEASE_PENDING: 'Awaiting Confirmation',
  RELEASED: '✓ Payment Released',
  FAILED: '✕ Payment Failed',
  REFUNDED: 'Refunded',
};

const STATUS_LABELS_HI: Record<PaymentStatus, string> = {
  CREATED: 'भुगतान लंबित',
  PAYMENT_PENDING: 'प्रक्रिया जारी…',
  PAID: 'भुगतान प्राप्त',
  FUNDS_LOCKED: '🔒 भुगतान सुरक्षित (एस्क्रो)',
  WORK_COMPLETED: 'कार्य पूर्ण',
  RELEASE_PENDING: 'पुष्टि प्रतीक्षित',
  RELEASED: '✓ भुगतान आपके खाते में जमा',
  FAILED: '✕ भुगतान विफल',
  REFUNDED: 'रिफंड किया गया',
};

const STATUS_COLORS: Record<PaymentStatus, string> = {
  CREATED: 'bg-amber-50 text-amber-700 border-amber-200',
  PAYMENT_PENDING: 'bg-blue-50 text-blue-700 border-blue-200',
  PAID: 'bg-green-50 text-green-700 border-green-200',
  FUNDS_LOCKED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  WORK_COMPLETED: 'bg-teal-50 text-teal-700 border-teal-200',
  RELEASE_PENDING: 'bg-purple-50 text-purple-700 border-purple-200',
  RELEASED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  FAILED: 'bg-red-50 text-red-700 border-red-200',
  REFUNDED: 'bg-slate-50 text-slate-600 border-slate-200',
};

const TIMELINE_STEPS: { status: PaymentStatus; labelEn: string; labelHi: string }[] = [
  { status: 'CREATED', labelEn: 'Payment Created', labelHi: 'भुगतान निर्मित' },
  { status: 'FUNDS_LOCKED', labelEn: 'Payment Secured', labelHi: 'भुगतान सुरक्षित' },
  { status: 'WORK_COMPLETED', labelEn: 'Work Completed', labelHi: 'कार्य पूरा हुआ' },
  { status: 'RELEASE_PENDING', labelEn: 'Hirer Confirmed', labelHi: 'नियोक्ता पुष्टि' },
  { status: 'RELEASED', labelEn: 'Released to You', labelHi: 'मजदूरी जारी' },
];

const STATUS_ORDER: PaymentStatus[] = [
  'CREATED', 'PAYMENT_PENDING', 'PAID', 'FUNDS_LOCKED',
  'WORK_COMPLETED', 'RELEASE_PENDING', 'RELEASED',
];

function getStatusIndex(s: PaymentStatus) { return STATUS_ORDER.indexOf(s); }

// ─── Timeline ─────────────────────────────────────────────────────────────────

const PaymentTimeline: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const { language } = useLanguage();
  const currentIdx = getStatusIndex(status);
  if (status === 'FAILED' || status === 'REFUNDED') {
    return (
      <div className="flex items-center gap-2 mt-3">
        <AlertCircle className="w-4 h-4 text-red-500" />
        <span className="text-xs text-red-600 font-medium">
          {language === 'hi' ? 'भुगतान प्रक्रिया पूरी नहीं हुई' : 'Payment did not complete'}
        </span>
      </div>
    );
  }
  return (
    <ol className="flex items-center gap-1 mt-3 flex-wrap">
      {TIMELINE_STEPS.map((step, i) => {
        const stepIdx = getStatusIndex(step.status);
        const done = stepIdx <= currentIdx;
        const active = stepIdx === currentIdx;
        return (
          <li key={step.status} className="flex items-center gap-1">
            <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold border
              ${done ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-300 text-slate-400'}
              ${active ? 'ring-2 ring-emerald-300' : ''}
            `}>
              {done ? '✓' : i + 1}
            </span>
            <span className={`text-[10px] ${done ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
              {language === 'hi' ? step.labelHi : step.labelEn}
            </span>
            {i < TIMELINE_STEPS.length - 1 && (
              <ChevronRight className={`w-3 h-3 ${done ? 'text-emerald-500' : 'text-slate-300'}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
};

// ─── Payment Card ─────────────────────────────────────────────────────────────

const WorkerPaymentCard: React.FC<{ payment: Payment }> = ({ payment }) => {
  const { language } = useLanguage();
  const s = payment.status;
  const statusLabels = language === 'hi' ? STATUS_LABELS_HI : STATUS_LABELS_EN;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* Status bar */}
      <div className={`px-4 py-2 border-b flex items-center justify-between ${STATUS_COLORS[s]}`}>
        <span className="text-xs font-semibold">{statusLabels[s] || s}</span>
        {s === 'FUNDS_LOCKED' && <Lock className="w-3.5 h-3.5" />}
        {s === 'RELEASED' && <CheckCircle className="w-3.5 h-3.5" />}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-2xl font-extrabold text-[#0B132B]">
              ₹{payment.amount.toLocaleString('en-IN')}
            </p>
            <p className="text-slate-600 text-sm font-medium mt-0.5">
              {payment.workRecord?.job.title ?? (language === 'hi' ? 'दैनिक मजदूरी' : 'Work Payment')}
            </p>
            <p className="text-slate-400 text-xs">
              {language === 'hi' ? 'नियोक्ता:' : 'From:'} {payment.hirer?.name ?? '—'}
            </p>
          </div>
          {payment.demoPaymentId && (
            <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded-lg">
              {payment.demoPaymentId}
            </span>
          )}
        </div>

        <PaymentTimeline status={s} />

        {/* Context messages */}
        {s === 'FUNDS_LOCKED' && (
          <div className="mt-3 bg-indigo-50 rounded-xl px-3 py-2 flex gap-2">
            <Lock className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
            <p className="text-indigo-700 text-xs">
              {language === 'hi'
                ? 'मजदूरी एस्क्रो में सुरक्षित है। राशि प्राप्त करने के लिए कार्य पूरा करें।'
                : 'Payment is secured. Complete the work to unlock funds.'}
            </p>
          </div>
        )}
        {s === 'WORK_COMPLETED' && (
          <div className="mt-3 bg-teal-50 rounded-xl px-3 py-2 flex gap-2">
            <Clock className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <p className="text-teal-700 text-xs">
              {language === 'hi'
                ? 'कार्य पूर्ण चिन्हित। नियोक्ता की अंतिम पुष्टि की प्रतीक्षा है।'
                : 'Work marked complete. Waiting for hirer confirmation.'}
            </p>
          </div>
        )}
        {s === 'RELEASED' && (
          <div className="mt-3 bg-emerald-50 rounded-xl px-3 py-2 flex gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <p className="text-emerald-700 text-xs font-medium">
              {language === 'hi'
                ? `₹${payment.amount.toLocaleString('en-IN')} आपके खाते में जारी कर दी गई है।`
                : `₹${payment.amount.toLocaleString('en-IN')} released to you.`}
            </p>
          </div>
        )}

        {/* Timestamps */}
        <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] text-slate-400">
          {payment.paidAt && (
            <span>
              {language === 'hi' ? 'भुगतान:' : 'Paid:'} {new Date(payment.paidAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
            </span>
          )}
          {payment.releasedAt && (
            <span>
              {language === 'hi' ? 'जारी:' : 'Released:'} {new Date(payment.releasedAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export const WorkerPaymentsPage: React.FC = () => {
  const { language } = useLanguage();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyPayments();
      setPayments(data);
    } catch (e: any) {
      setError(e.message ?? (language === 'hi' ? 'भुगतान लोड करने में विफल' : 'Failed to load payments'));
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => { load(); }, [load]);

  // Stats
  const totalEarned = payments
    .filter((p) => p.status === 'RELEASED')
    .reduce((s, p) => s + p.amount, 0);

  const secured = payments.filter((p) => p.status === 'FUNDS_LOCKED').length;

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0B132B] to-[#1C3A6E] px-5 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 bg-amber-400/20 rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-amber-300" />
          </div>
          <h1 className="text-white text-xl font-extrabold tracking-tight">
            {language === 'hi' ? 'मेरा भुगतान' : 'My Payments'}
          </h1>
        </div>
        <p className="text-slate-400 text-sm ml-12">
          {language === 'hi' ? 'आपका सुरक्षित भुगतान एवं एस्क्रो इतिहास' : 'Your secure payment history'}
        </p>

        {/* Quick stats */}
        {!loading && payments.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-xl px-4 py-3">
              <p className="text-amber-300 text-xs font-medium">
                {language === 'hi' ? 'कुल कमाई' : 'Total Earned'}
              </p>
              <p className="text-white text-xl font-extrabold">₹{totalEarned.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-white/10 rounded-xl px-4 py-3">
              <p className="text-amber-300 text-xs font-medium">
                {language === 'hi' ? 'सुरक्षित भुगतान' : 'Secured Payments'}
              </p>
              <p className="text-white text-xl font-extrabold">{secured}</p>
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-amber-300 text-[11px] font-medium">
            {language === 'hi' ? 'SHRAMIKK सुरक्षित भुगतान · 100% गारंटी' : 'SHRAMIKK Secure Payment · Demo Mode'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-5 space-y-4">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && payments.length === 0 && (
          <div className="text-center py-12 px-4 rounded-[28px] bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <Wallet className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              {language === 'hi' ? 'अभी कोई सक्रिय भुगतान नहीं है' : 'No active backend payments yet'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {language === 'hi'
                ? 'जब कोई नियोक्ता आपके काम के लिए भुगतान सुरक्षित करेगा, तो वह यहाँ प्रदर्शित होगा। आप अभी इंटरैक्टिव एस्क्रो का अनुभव कर सकते हैं।'
                : 'Payments will appear here once a hirer secures payment for your work. You can explore the full Escrow Showcase now.'}
            </p>
            <a
              href="/payments"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B132B] hover:bg-slate-800 text-amber-400 text-xs font-black shadow-md mt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {language === 'hi' ? 'इंटरैक्टिव एस्क्रो डेमो देखें →' : 'Launch Interactive Escrow Showcase →'}
              </span>
            </a>
          </div>
        )}

        {!loading && payments.map((p) => (
          <WorkerPaymentCard key={p.id} payment={p} />
        ))}

        {!loading && payments.length > 0 && (
          <button
            onClick={load}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-slate-400 text-sm hover:text-slate-600 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> {language === 'hi' ? 'रिफ्रेश करें' : 'Refresh'}
          </button>
        )}
      </div>

      <WorkerBottomNav />
    </div>
  );
};
