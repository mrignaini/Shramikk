import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HardHat,
  Briefcase,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  User,
  Sparkles,
  Settings,
  CheckCircle2,
  AlertCircle,
  Phone,
  MapPin,
  Building,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import type { UserRole, SkillCategory } from '../types';

export interface LoginPageProps {
  initialMode?: 'signin' | 'register';
}

export const LoginPage: React.FC<LoginPageProps> = ({ initialMode }) => {
  const { loginDirectly, registerUser } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active mode (signin vs register)
  const defaultMode =
    initialMode ||
    (location.pathname === '/register' || location.search.includes('mode=register')
      ? 'register'
      : 'signin');

  const [authMode, setAuthMode] = useState<'signin' | 'register'>(defaultMode);

  // Sync mode if location pathname changes
  useEffect(() => {
    if (location.pathname === '/register') {
      setAuthMode('register');
    } else if (location.pathname === '/login') {
      setAuthMode('signin');
    }
  }, [location.pathname]);

  // Sign In States
  const [loginTab, setLoginTab] = useState<'user' | 'admin'>('user');
  const [loginEmail, setLoginEmail] = useState('ramesh@shramikk.in');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Register States
  const [regRole, setRegRole] = useState<UserRole>('worker');
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regSkillOrCompany, setRegSkillOrCompany] = useState('Mason / राजमिस्त्री');
  const [regCity, setRegCity] = useState('Ghaziabad');
  const [regPassword, setRegPassword] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const skillsList: SkillCategory[] = [
    'Mason / राजमिस्त्री',
    'Painter / पेंटर',
    'Plumber / प्लंबर',
    'Carpenter / बढ़ई',
    'Electrician / इलेक्ट्रीशियन',
    'Tile Worker / टाइल मिस्त्री',
    'Helper / हेल्पर',
  ];

  // 1-Click Showcase Demo Login
  const handleQuickLogin = (role: 'worker' | 'hirer' | 'admin') => {
    if (role === 'worker') {
      loginDirectly('worker', 'ramesh@shramikk.in', 'Ramesh Kumar (Mason)');
      navigate('/worker/dashboard', { replace: true });
    } else if (role === 'hirer') {
      loginDirectly('hirer', 'amit@shramikk.in', 'Amit Sharma (Contractor)');
      navigate('/hirer/dashboard', { replace: true });
    } else if (role === 'admin') {
      loginDirectly('admin', 'admin@shramikk.in');
      navigate('/admin', { replace: true });
    }
  };

  // Manual Sign In Submit
  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const lower = loginEmail.trim().toLowerCase();

      if (lower.includes('admin') || loginTab === 'admin') {
        if (loginPassword === 'admin123' || loginPassword.length >= 6) {
          loginDirectly('admin', lower || 'admin@shramikk.in');
          navigate('/admin', { replace: true });
          return;
        }
      } else if (lower.includes('amit') || lower.includes('contractor') || lower.includes('hirer')) {
        loginDirectly('hirer', lower || 'amit@shramikk.in', 'Amit Sharma (Contractor)');
        navigate('/hirer/dashboard', { replace: true });
        return;
      } else {
        // Default to Worker
        loginDirectly('worker', lower || 'ramesh@shramikk.in', 'Ramesh Kumar (Mason)');
        navigate('/worker/dashboard', { replace: true });
        return;
      }

      setErrorMsg('Invalid credentials. Please use demo hints below.');
    }, 400);
  };

  // Registration Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName || !regEmail) return;

    setRegLoading(true);
    setTimeout(() => {
      registerUser({
        fullName: regFullName,
        email: regEmail,
        phone: regPhone,
        role: regRole,
        skillOrCompany: regSkillOrCompany,
        city: regCity,
      });

      setRegLoading(false);
      if (regRole === 'hirer') {
        navigate('/hirer/dashboard', { replace: true });
      } else {
        navigate('/worker/dashboard', { replace: true });
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8 sm:py-12 bg-[#FAF9F6]">
      <div className="w-full max-w-lg space-y-5">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0B132B] text-amber-400 shadow-md">
            <HardHat className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0B132B] font-sans">
            {t('authPageHeaderTitle', 'Welcome to SHRAMIKK')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md mx-auto">
            {t('authPageHeaderSub', 'From Labour Chowk to Digital Identity — Choose your account')}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 1-CLICK SHOWCASE DEMO LOGIN BAR */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100/70 border border-amber-300/80 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-black text-amber-950 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-400" />
              <span>{t('authShowcaseBadge', 'Project Showcase • 1-Click Fast Login')}</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900">
              {t('authShowcaseDemo', 'Demo Credentials')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-0.5">
            {/* Worker Quick Card */}
            <button
              type="button"
              onClick={() => handleQuickLogin('worker')}
              className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-amber-200 hover:border-amber-400 shadow-2xs transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">👷🏽‍♂️</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                  {t('authWorkerBadge', 'Worker')}
                </span>
              </div>
              <div className="text-xs font-black text-slate-900 group-hover:text-amber-800 truncate">
                Ramesh Kumar
              </div>
              <div className="text-[10px] text-slate-500 font-mono truncate">
                ramesh@shramikk.in
              </div>
              <div className="mt-2 text-[10px] font-bold text-amber-700 flex items-center gap-0.5">
                <span>{t('authFastLoginBtn', 'Sign In →')}</span>
              </div>
            </button>

            {/* Contractor Quick Card */}
            <button
              type="button"
              onClick={() => handleQuickLogin('hirer')}
              className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-amber-200 hover:border-amber-400 shadow-2xs transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">🏢</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                  {t('authHirerBadge', 'Contractor')}
                </span>
              </div>
              <div className="text-xs font-black text-slate-900 group-hover:text-blue-800 truncate">
                Amit Sharma
              </div>
              <div className="text-[10px] text-slate-500 font-mono truncate">
                amit@shramikk.in
              </div>
              <div className="mt-2 text-[10px] font-bold text-blue-700 flex items-center gap-0.5">
                <span>{t('authFastLoginBtn', 'Sign In →')}</span>
              </div>
            </button>

            {/* Master Admin Quick Card */}
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="p-3 rounded-2xl bg-[#0B132B] hover:bg-slate-900 text-white shadow-2xs transition-all text-left group cursor-pointer border border-slate-700"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">⚙️</span>
                <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                  {t('authAdminBadge', 'Admin')}
                </span>
              </div>
              <div className="text-xs font-black text-amber-400 truncate">
                Master Admin
              </div>
              <div className="text-[10px] text-slate-300 font-mono truncate">
                admin@shramikk.in
              </div>
              <div className="mt-2 text-[10px] font-bold text-amber-300 flex items-center gap-0.5">
                <span>{t('authFastAdminBtn', 'Open Portal →')}</span>
              </div>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN UNIFIED AUTH CARD: SIGN IN / CREATE ACCOUNT */}
        {/* ========================================================================= */}
        <div className="rounded-[28px] bg-white border border-slate-200/90 p-5 sm:p-7 shadow-card space-y-5">
          
          {/* Main Mode Switcher: Sign In vs Create Account */}
          <div className="flex rounded-2xl bg-slate-100 p-1 text-xs sm:text-sm font-bold border border-slate-200/60">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMsg('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer text-center ${
                authMode === 'signin'
                  ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t('authTabSignIn', 'Sign In')}
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-2.5 rounded-xl transition-all cursor-pointer text-center ${
                authMode === 'register'
                  ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {t('authTabRegister', 'Create Account')}
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ======================================================================= */}
          {/* SUB-VIEW A: SIGN IN FORM */}
          {/* ======================================================================= */}
          {authMode === 'signin' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* User vs Admin Tab */}
              <div className="flex rounded-xl bg-slate-50 p-1 text-xs font-semibold border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => {
                    setLoginTab('user');
                    setLoginEmail('ramesh@shramikk.in');
                    setLoginPassword('password123');
                  }}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                    loginTab === 'user' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                  }`}
                >
                  {t('authUserLoginTab', 'User Login (Worker / Contractor)')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginTab('admin');
                    setLoginEmail('admin@shramikk.in');
                    setLoginPassword('admin123');
                  }}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                    loginTab === 'admin' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                  }`}
                >
                  {t('authAdminTab', 'Admin Portal')}
                </button>
              </div>

              <form onSubmit={handleManualLogin} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700">
                    {loginTab === 'admin'
                      ? t('authAdminEmailLabel', 'Admin Email Address')
                      : t('authEmailOrMobileLabel', 'Email Address or Mobile Number')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder={loginTab === 'admin' ? 'admin@shramikk.in' : 'ramesh@shramikk.in / amit@shramikk.in'}
                      required
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-slate-700">
                      {t('authPasswordLabel', 'Password')}
                    </label>
                    <span className="text-[11px] text-slate-400">
                      Demo: <code className="text-amber-800 font-bold">{loginTab === 'admin' ? 'admin123' : 'password123'}</code>
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 rounded-xl bg-[#0B132B] hover:bg-slate-900 text-amber-400 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>{t('authAuthenticating', 'Authenticating...')}</span>
                  ) : (
                    <>
                      <span>{t('authSignInBtn', 'Sign In')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Switch to Register link */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-600">
                  {t('authNeedAccountPrompt', 'Need a new account?')}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setErrorMsg('');
                    }}
                    className="font-black text-amber-800 hover:text-amber-950 underline underline-offset-2 cursor-pointer"
                  >
                    {t('authCreateAccountLink', 'Create an account here →')}
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* SUB-VIEW B: REGISTER / CREATE ACCOUNT FORM */}
          {/* ======================================================================= */}
          {authMode === 'register' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Role Picker */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  {t('authSelectRoleLabel', 'Select Your Role')}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setRegRole('worker');
                      setRegSkillOrCompany('Mason / राजमिस्त्री');
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      regRole === 'worker'
                        ? 'border-amber-500 bg-amber-50/70 text-slate-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-200 flex items-center justify-center text-lg shrink-0">
                      👷🏽‍♂️
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-black">{t('authWorkerBadge', 'Worker')}</div>
                      <div className="text-[10px] text-slate-500 truncate">{t('authWorkerRoleDesc', 'Mason, Painter, etc.')}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRegRole('hirer');
                      setRegSkillOrCompany('Civil Contractor');
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      regRole === 'hirer'
                        ? 'border-blue-600 bg-blue-50/70 text-slate-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-lg shrink-0">
                      🏢
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-black">{t('authHirerBadge', 'Employer / Hirer')}</div>
                      <div className="text-[10px] text-slate-500 truncate">{t('authHirerRoleDesc', 'Contractor or Homeowner')}</div>
                    </div>
                  </button>
                </div>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700">
                    {t('authFullNameLabel', 'Full Name *')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={regFullName}
                      onChange={(e) => setRegFullName(e.target.value)}
                      placeholder={regRole === 'worker' ? 'e.g. Ramesh Kumar' : 'e.g. Amit Sharma'}
                      required
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 sm:top-3.5" />
                  </div>
                </div>

                {/* Email & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700">
                      {t('authEmailLabel', 'Email Address *')}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="name@shramikk.in"
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700">
                      {t('authMobileLabel', 'Mobile Number')}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                {/* Dynamic Field: Worker Skill vs Contractor Type */}
                {regRole === 'worker' ? (
                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700">
                      {t('authTradeSkillLabel', 'Primary Trade Skill *')}
                    </label>
                    <select
                      value={regSkillOrCompany}
                      onChange={(e) => setRegSkillOrCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50 cursor-pointer"
                    >
                      <option value="Mason / राजमिस्त्री">Mason (राजमिस्त्री)</option>
                      <option value="Painter / पेंटर">Painter (पेंटर)</option>
                      <option value="Plumber / प्लंबर">Plumber (प्लंबर)</option>
                      <option value="Carpenter / बढ़ई">Carpenter (बढ़ई)</option>
                      <option value="Electrician / इलेक्ट्रीशियन">Electrician (इलेक्ट्रीशियन)</option>
                      <option value="Tile Worker / टाइल मिस्त्री">Tile Worker (टाइल मिस्त्री)</option>
                      <option value="Helper / हेल्पर">Helper / General Construction (हेल्पर)</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700">
                      {t('authBusinessCompanyLabel', 'Business / Contractor Type *')}
                    </label>
                    <input
                      type="text"
                      value={regSkillOrCompany}
                      onChange={(e) => setRegSkillOrCompany(e.target.value)}
                      placeholder="e.g. Civil Contractor, Builder, or Homeowner"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                    />
                  </div>
                )}

                {/* City & Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700">
                      {t('authCityLabel', 'City / District *')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        placeholder="e.g. Ghaziabad, Noida"
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-extrabold text-slate-700">
                      {t('authCreatePasswordLabel', 'Password *')}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="min 6 chars"
                        required
                        minLength={6}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full py-3.5 rounded-xl bg-[#0B132B] hover:bg-slate-900 text-amber-400 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-60"
                >
                  {regLoading ? (
                    <span>{t('authCreatingAccount', 'Creating Account...')}</span>
                  ) : (
                    <>
                      <span>{t('authRegisterSubmitBtn', 'Complete Registration')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Switch to Sign In link */}
              <div className="pt-3 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-600">
                  {t('authAlreadyHaveAccountPrompt', 'Already have an account?')}{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signin');
                      setErrorMsg('');
                    }}
                    className="font-black text-amber-800 hover:text-amber-950 underline underline-offset-2 cursor-pointer"
                  >
                    {t('authSignInLink', 'Sign In here →')}
                  </button>
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default LoginPage;
