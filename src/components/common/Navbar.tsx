import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HardHat,
  User,
  Settings,
  Menu,
  X,
  CreditCard,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  UserPlus,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export const Navbar: React.FC = () => {
  const { auth, logout } = useAuth();
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const paymentPath = '/payments';

  // Core navigation links with translation
  const navLinks = [
    { name: t('navFindWork', 'Find Work'), path: '/find-work' },
    { name: t('navHireWorkers', 'Hire Workers'), path: '/hire-workers' },
    { name: t('navHowItWorks', 'How It Works'), path: '/#how-it-works' },
  ];

  const handleNavClick = (path: string, e?: React.MouseEvent) => {
    if (path.startsWith('/#')) {
      const targetId = path.substring(2);
      if (location.pathname === '/') {
        if (e) e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    return location.pathname.startsWith(path);
  };

  const getDashboardPath = () => {
    if (auth.role === 'hirer') return '/hirer/dashboard';
    if (auth.role === 'admin') return '/admin';
    return '/worker/dashboard';
  };

  const getDashboardLabel = () => {
    if (auth.role === 'hirer') return t('hirerDashboardNav', 'Hirer Hub');
    if (auth.role === 'admin') return t('adminDashboardNav', 'Admin Hub');
    return t('workerDashboardNav', 'Dashboard');
  };

  // Production Logout Action
  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    setMobileMenuOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#FAF9F6]/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0">
              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0B132B] to-[#1E293B] shadow-md border border-slate-700/50 group-hover:scale-105 transition-transform duration-200 shrink-0">
                <div className="relative flex items-center justify-center">
                  <HardHat className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 stroke-[2.2]" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-emerald-500 border-2 border-[#0B132B] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0B132B] font-sans">
                    SHRAMIKK
                  </span>
                  {language === 'hi' && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[10px] font-black">
                      श्रमिक
                    </span>
                  )}
                </div>
                <span className="hidden sm:block text-[10px] lg:text-[11px] text-slate-500 font-semibold tracking-tight -mt-0.5 truncate">
                  {language === 'hi' ? 'लेबर चौक से डिजिटल पहचान तक' : 'From Labour Chowk to Digital Identity'}
                </span>
              </div>
            </Link>

            {/* Center Navigation Links (Clean & Spacious) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-8 shrink-0">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={(e) => handleNavClick(link.path, e)}
                    className={`relative px-2 py-1.5 text-sm font-semibold transition-colors duration-150 whitespace-nowrap ${
                      active
                        ? 'text-amber-600 font-bold'
                        : 'text-slate-700 hover:text-slate-950'
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-amber-500 rounded-full animate-in fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Items */}
            <div className="hidden lg:flex items-center gap-2.5 sm:gap-3 shrink-0">
              
              {/* Language Selector */}
              <LanguageSelector />

              {/* Escrow Wage Guarantee Pill */}
              <Link
                to={paymentPath}
                className={`inline-flex items-center gap-1.5 h-9.5 px-3 rounded-full text-xs font-bold border transition-all duration-200 select-none shrink-0 ${
                  location.pathname.includes('/payments')
                    ? 'bg-amber-100 text-amber-950 border-amber-400 ring-2 ring-amber-400/20'
                    : 'bg-amber-50/80 hover:bg-amber-100/90 text-amber-950 border-amber-300 hover:border-amber-400'
                }`}
                title="Escrow Wage Protection - 100% Guaranteed"
              >
                <CreditCard className="w-3.5 h-3.5 text-amber-800 shrink-0 stroke-[2.2]" />
                <span className="font-extrabold text-amber-950">{t('escrowPillLabel', 'Escrow')}</span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-amber-200/90 text-amber-950 text-[9px] font-black uppercase tracking-wider">
                  <ShieldCheck className="w-2.5 h-2.5 text-amber-800" />
                  <span>100%</span>
                </span>
              </Link>

              {/* Auth Buttons: Authenticated vs Unauthenticated */}
              {auth.isAuthenticated ? (
                <div className="flex items-center gap-2 shrink-0">
                  {/* Admin link shortcut */}
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 h-9.5 px-3 rounded-full text-xs font-medium text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all shrink-0"
                    title="Admin Portal"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-500" />
                    <span className="hidden xl:inline">{t('adminPortalLabel', 'Admin')}</span>
                  </Link>

                  {/* Dashboard Button */}
                  <Link
                    to={getDashboardPath()}
                    className="inline-flex items-center gap-1.5 h-9.5 px-4 rounded-full bg-[#0B132B] text-amber-400 text-xs font-bold hover:bg-slate-800 shadow-xs transition-all whitespace-nowrap"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>{getDashboardLabel()}</span>
                  </Link>

                  {/* Production Logout Button (Triggers Safe Confirmation) */}
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="p-2 rounded-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title={t('navLogout', 'Logout')}
                    aria-label="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  {/* Single Unified Sign In Button */}
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 h-9.5 px-4.5 rounded-full bg-[#0B132B] text-amber-400 text-xs font-extrabold hover:bg-slate-800 shadow-xs transition-all duration-150"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{t('navSignIn', 'Sign In')}</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="flex items-center gap-2 lg:hidden shrink-0">
              <LanguageSelector />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none border border-slate-200 shrink-0 transition-colors"
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    active
                      ? 'bg-amber-50 text-amber-800 font-extrabold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* Secondary Mobile Links */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/#about"
                onClick={(e) => handleNavClick('/#about', e)}
                className="px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
              >
                {t('navAboutUs', 'About Us & Mission')}
              </Link>

              <Link
                to={paymentPath}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2.5 text-sm font-bold text-amber-950 bg-amber-50/60 rounded-xl border border-amber-200"
              >
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-800" />
                  <span>{t('escrowPillLabel', 'Escrow')} Wage Protection</span>
                </div>
                <ShieldCheck className="w-4 h-4 text-amber-600" />
              </Link>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3.5 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg font-medium"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>{t('adminPortalLabel', 'Admin Portal')}</span>
                </div>
                <span className="text-xs text-slate-400 font-semibold uppercase">Portal</span>
              </Link>

              {auth.isAuthenticated ? (
                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B132B] text-amber-400 text-sm font-bold shadow-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{getDashboardLabel()}</span>
                  </Link>
                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-rose-600 bg-rose-50 text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t('navLogout', 'Logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B132B] text-amber-400 text-sm font-extrabold shadow-sm"
                  >
                    <User className="w-4 h-4" />
                    <span>{t('navSignIn', 'Sign In')}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* PRODUCTION LOGOUT CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-white rounded-[32px] border border-slate-200 p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100 shadow-2xs">
              <LogOut className="w-6 h-6 stroke-[2.2]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-black text-[#0B132B]">
                {t('logoutModalTitle', 'Sign out of SHRAMIKK?')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('logoutModalDesc', 'Your active session will be securely ended. You can sign back in anytime to continue.')}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                {t('logoutCancelBtn', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                {t('logoutConfirmBtn', 'Sign Out')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
