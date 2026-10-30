import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobContext';
import { SafetyNetProvider } from './context/SafetyNetContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { PageLoader } from './components/common/PageLoader';
import { AiSaathiFab } from './components/common/AiSaathiFab';

// Lazy-loaded pages for optimized production chunking
const HomePage = lazy(() => import('./pages/HomePage'));
const FindWorkPage = lazy(() => import('./pages/FindWorkPage').then(m => ({ default: m.FindWorkPage })));
const HireWorkersPage = lazy(() => import('./pages/HireWorkersPage').then(m => ({ default: m.HireWorkersPage })));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const AiSaathiPage = lazy(() => import('./pages/AiSaathiPage').then(m => ({ default: m.AiSaathiPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(m => ({ default: m.RegisterPage })));

// Worker Routes
const WorkerDashboardPage = lazy(() => import('./pages/worker/WorkerDashboardPage').then(m => ({ default: m.WorkerDashboardPage })));
const DigitalIdentityPage = lazy(() => import('./pages/worker/DigitalIdentityPage').then(m => ({ default: m.DigitalIdentityPage })));
const FinancialHubPage = lazy(() => import('./pages/worker/FinancialHubPage').then(m => ({ default: m.FinancialHubPage })));
const MyWorkPage = lazy(() => import('./pages/worker/MyWorkPage').then(m => ({ default: m.MyWorkPage })));
const WorkerProfilePage = lazy(() => import('./pages/worker/WorkerProfilePage').then(m => ({ default: m.WorkerProfilePage })));
const WorkerApplicationsPage = lazy(() => import('./pages/worker/WorkerApplicationsPage').then(m => ({ default: m.WorkerApplicationsPage })));
const WorkHistoryPage = lazy(() => import('./pages/worker/WorkHistoryPage').then(m => ({ default: m.WorkHistoryPage })));

// Phase 7 — Safety Net
const SafetyNetHomePage = lazy(() => import('./pages/worker/SafetyNetHomePage').then(m => ({ default: m.SafetyNetHomePage })));
const AiSaathiChatPage = lazy(() => import('./pages/worker/AiSaathiChatPage').then(m => ({ default: m.AiSaathiChatPage })));
const SchemesPage = lazy(() => import('./pages/worker/SchemesPage').then(m => ({ default: m.SchemesPage })));
const InsurancePage = lazy(() => import('./pages/worker/InsurancePage').then(m => ({ default: m.InsurancePage })));
const IncomeProtectionPage = lazy(() => import('./pages/worker/IncomeProtectionPage').then(m => ({ default: m.IncomeProtectionPage })));
const MySupportPage = lazy(() => import('./pages/worker/MySupportPage').then(m => ({ default: m.MySupportPage })));
const WorkerPaymentsPage = lazy(() => import('./pages/worker/WorkerPaymentsPage').then(m => ({ default: m.WorkerPaymentsPage })));

// Phase 8 — Digital Work Identity & Public Sharing
const PublicWorkIdentityPage = lazy(() => import('./pages/worker/PublicWorkIdentityPage').then(m => ({ default: m.PublicWorkIdentityPage })));
const HirerProfilePage = lazy(() => import('./pages/hirer/HirerProfilePage').then(m => ({ default: m.HirerProfilePage })));

// Hirer Routes
const HirerDashboardPage = lazy(() => import('./pages/hirer/HirerDashboardPage').then(m => ({ default: m.HirerDashboardPage })));
const PostJobPage = lazy(() => import('./pages/hirer/PostJobPage').then(m => ({ default: m.PostJobPage })));
const MyJobsPage = lazy(() => import('./pages/hirer/MyJobsPage').then(m => ({ default: m.MyJobsPage })));
const HirerPaymentsPage = lazy(() => import('./pages/hirer/HirerPaymentsPage').then(m => ({ default: m.HirerPaymentsPage })));

// Payments & Escrow Hub
const PaymentGatewayPage = lazy(() => import('./pages/payment/PaymentGatewayPage').then(m => ({ default: m.PaymentGatewayPage })));

// Admin
const AdminPage = lazy(() => import('./pages/admin/AdminPage').then(m => ({ default: m.AdminPage })));

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <JobProvider>
          <SafetyNetProvider>
            <Router>
              <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900 w-full max-w-full overflow-x-hidden">
                {/* Main Top Navigation */}
                <Navbar />

                {/* Page Content with Suspense boundary */}
                <main className="flex-1 w-full max-w-full">
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      {/* Landing & Public Routes */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/find-work" element={<FindWorkPage />} />
                      <Route path="/hire-workers" element={<HireWorkersPage />} />
                      <Route path="/how-it-works" element={<HowItWorksPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/ai-saathi" element={<AiSaathiPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />

                      {/* Top-Level Payments & Escrow Hub */}
                      <Route path="/payments" element={<PaymentGatewayPage />} />
                      <Route path="/payment" element={<PaymentGatewayPage />} />

                      {/* Public Digital Work Identity Routes */}
                      <Route path="/worker/:workerId/identity" element={<PublicWorkIdentityPage />} />
                      <Route path="/identity/:workerId" element={<PublicWorkIdentityPage />} />

                      {/* Worker Sub-Routes */}
                      <Route path="/worker/dashboard" element={<WorkerDashboardPage />} />
                      <Route path="/worker/profile" element={<WorkerProfilePage />} />
                      <Route path="/worker/digital-identity" element={<DigitalIdentityPage />} />
                      <Route path="/worker/financial-hub" element={<FinancialHubPage />} />
                      <Route path="/worker/my-work" element={<MyWorkPage />} />
                      <Route path="/worker/applications" element={<WorkerApplicationsPage />} />
                      <Route path="/worker/work-history" element={<WorkHistoryPage />} />
                      <Route path="/worker/safety-net" element={<SafetyNetHomePage />} />
                      <Route path="/worker/ai-saathi" element={<AiSaathiChatPage />} />
                      <Route path="/worker/schemes" element={<SchemesPage />} />
                      <Route path="/worker/insurance" element={<InsurancePage />} />
                      <Route path="/worker/income-protection" element={<IncomeProtectionPage />} />
                      <Route path="/worker/my-support" element={<MySupportPage />} />
                      <Route path="/worker/payments" element={<WorkerPaymentsPage />} />

                      {/* Hirer Sub-Routes */}
                      <Route path="/hirer/dashboard" element={<HirerDashboardPage />} />
                      <Route path="/hirer/profile" element={<HirerProfilePage />} />
                      <Route path="/hirer/post-job" element={<PostJobPage />} />
                      <Route path="/hirer/my-jobs" element={<MyJobsPage />} />
                      <Route path="/hirer/payments" element={<HirerPaymentsPage />} />

                      {/* Admin Portal */}
                      <Route path="/admin" element={<AdminPage />} />
                    </Routes>
                  </Suspense>
                </main>

                {/* Floating AI Saathi Assistant FAB */}
                <AiSaathiFab />

                {/* Global Footer */}
                <Footer />
              </div>
            </Router>
          </SafetyNetProvider>
        </JobProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;