import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HardHat,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Paintbrush,
  Wrench,
  Hammer,
  Layers,
  Zap,
  Building,
  Home,
  Briefcase,
  UserCheck,
  Check,
  AlertCircle,
  Loader2,
  Mail,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import type { Language, SkillCategory } from '../../types';
import type { WorkerProfileData, HirerProfileData } from '../../context/AuthContext';

type AuthStep =
  | 'email'
  | 'otp'
  | 'language'
  | 'role'
  | 'worker_basic'
  | 'worker_skills'
  | 'worker_exp_avail'
  | 'worker_location'
  | 'worker_review'
  | 'worker_success'
  | 'hirer_basic'
  | 'hirer_type'
  | 'hirer_location'
  | 'hirer_review'
  | 'hirer_success';

export const AuthFlow: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const {
    loginWithEmail,
    loginWithMobile,
    verifyOtp,
    setAuthLanguage,
    setAuthRole,
    saveWorkerOnboarding,
    saveHirerOnboarding,
  } = useAuth();
  const navigate = useNavigate();

  // State
  const [currentStep, setCurrentStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('ramesh.kumar@shramikk.in');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otpDigits, setOtpDigits] = useState(['1', '2', '3', '4', '5', '6']);
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Worker Form State
  const [workerName, setWorkerName] = useState('रमेश कुमार');
  const [workerAvatar, setWorkerAvatar] = useState('👷🏽‍♂️');
  const [selectedSkills, setSelectedSkills] = useState<SkillCategory[]>([
    'Mason / राजमिस्त्री',
  ]);
  const [experience, setExperience] = useState('5 – 10 वर्ष');
  const [availability, setAvailability] = useState<'now' | 'date' | 'working'>('now');
  const [availableDate, setAvailableDate] = useState('');
  const [workerCity, setWorkerCity] = useState('New Delhi');
  const [workerArea, setWorkerArea] = useState('Lajpat Nagar / Labour Chowk');
  const [workerPincode, setWorkerPincode] = useState('110024');

  // Hirer Form State
  const [hirerName, setHirerName] = useState('राजेश शर्मा');
  const [hirerType, setHirerType] = useState('सिविल ठेकेदार (Civil Contractor)');
  const [hirerCity, setHirerCity] = useState('New Delhi');
  const [hirerArea, setHirerArea] = useState('Rohini Sector 18');

  // Validation errors
  const [formError, setFormError] = useState('');

  // OTP Handlers
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    setOtpError('');

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Submit Email
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setFormError(t('errValidEmail'));
      return;
    }
    setFormError('');
    loginWithEmail(trimmed);
    setCurrentStep('otp');
    setResendTimer(30);
  };

  // Submit OTP
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join('');
    if (enteredOtp.length < 6) {
      setOtpError(t('otpErrorInvalid'));
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ok = verifyOtp(enteredOtp);
      if (ok) {
        setOtpError('');
        setCurrentStep('language');
      } else {
        setOtpError(t('otpErrorInvalid'));
      }
    }, 400);
  };

  // Choose Language
  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setAuthLanguage(lang);
    setCurrentStep('role');
  };

  // Choose Role
  const handleSelectRole = (role: 'worker' | 'hirer') => {
    setAuthRole(role);
    if (role === 'worker') {
      setCurrentStep('worker_basic');
    } else {
      setCurrentStep('hirer_basic');
    }
  };

  // Toggle Skills
  const toggleSkill = (skill: SkillCategory) => {
    if (selectedSkills.includes(skill)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
      }
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Complete Worker Profile
  const handleFinishWorkerOnboarding = () => {
    setIsSubmitting(true);
    const profile: WorkerProfileData = {
      fullName: workerName,
      phone: `+91 ${mobileNumber}`,
      email: email,
      avatar: workerAvatar,
      skills: selectedSkills,
      experience,
      availability,
      availableDate: availability === 'date' ? availableDate : undefined,
      city: workerCity,
      locality: workerArea,
      pincode: workerPincode,
      grade: 'A',
      dailyWageRate: selectedSkills.includes('Mason / राजमिस्त्री') ? 850 : 750,
    };

    setTimeout(() => {
      saveWorkerOnboarding(profile);
      setIsSubmitting(false);
      setCurrentStep('worker_success');
    }, 600);
  };

  // Complete Hirer Profile
  const handleFinishHirerOnboarding = () => {
    setIsSubmitting(true);
    const profile: HirerProfileData = {
      fullName: hirerName,
      phone: `+91 ${mobileNumber}`,
      email: email,
      hirerType,
      city: hirerCity,
      locality: hirerArea,
    };

    setTimeout(() => {
      saveHirerOnboarding(profile);
      setIsSubmitting(false);
      setCurrentStep('hirer_success');
    }, 600);
  };

  const skillOptions: { name: SkillCategory; icon: React.ReactNode; label: string }[] = [
    {
      name: 'Mason / राजमिस्त्री',
      icon: <HardHat className="w-5 h-5" />,
      label: t('skillMason'),
    },
    {
      name: 'Helper / हेल्पर',
      icon: <Users className="w-5 h-5" />,
      label: t('skillHelper'),
    },
    {
      name: 'Painter / पेंटर',
      icon: <Paintbrush className="w-5 h-5" />,
      label: t('skillPainter'),
    },
    {
      name: 'Plumber / प्लंबर',
      icon: <Wrench className="w-5 h-5" />,
      label: t('skillPlumber'),
    },
    {
      name: 'Carpenter / बढ़ई',
      icon: <Hammer className="w-5 h-5" />,
      label: t('skillCarpenter'),
    },
    {
      name: 'Tile Worker / टाइल मिस्त्री',
      icon: <Layers className="w-5 h-5" />,
      label: t('skillTile'),
    },
    {
      name: 'Electrician / इलेक्ट्रीशियन',
      icon: <Zap className="w-5 h-5" />,
      label: t('skillElectrician'),
    },
  ];

  const avatarChoices = ['👷🏽‍♂️', '👷🏾', '👷🏻‍♂️', '👨🏽‍🔧', '🧑🏽‍🏭', '🧔🏽'];

  // Helper for progress bar
  const getWorkerProgressStep = () => {
    switch (currentStep) {
      case 'worker_basic':
        return 1;
      case 'worker_skills':
        return 2;
      case 'worker_exp_avail':
        return 3;
      case 'worker_location':
        return 4;
      case 'worker_review':
        return 5;
      default:
        return 1;
    }
  };

  const getHirerProgressStep = () => {
    switch (currentStep) {
      case 'hirer_basic':
        return 1;
      case 'hirer_type':
        return 2;
      case 'hirer_location':
        return 3;
      case 'hirer_review':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-[32px] border border-slate-200/90 shadow-card p-6 sm:p-10 relative overflow-hidden transition-all duration-300">
        
        {/* Top App Header with Logo & Back Navigation */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B132B] text-amber-400 flex items-center justify-center shadow-md">
              <HardHat className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-[#0B132B] font-sans">
                SHRAMIKK
              </span>
              <span className="text-[10px] text-amber-600 font-bold block -mt-1">
                {language === 'hi' ? 'लेबर चौक से डिजिटल पहचान' : 'From Labour Chowk to Digital Identity'}
              </span>
            </div>
          </div>

          {/* Back button if past first step */}
          {currentStep !== 'email' && !currentStep.includes('success') && (
            <button
              onClick={() => {
                if (currentStep === 'otp') setCurrentStep('email');
                else if (currentStep === 'language') setCurrentStep('otp');
                else if (currentStep === 'role') setCurrentStep('language');
                else if (currentStep === 'worker_basic') setCurrentStep('role');
                else if (currentStep === 'worker_skills') setCurrentStep('worker_basic');
                else if (currentStep === 'worker_exp_avail') setCurrentStep('worker_skills');
                else if (currentStep === 'worker_location') setCurrentStep('worker_exp_avail');
                else if (currentStep === 'worker_review') setCurrentStep('worker_location');
                else if (currentStep === 'hirer_basic') setCurrentStep('role');
                else if (currentStep === 'hirer_type') setCurrentStep('hirer_basic');
                else if (currentStep === 'hirer_location') setCurrentStep('hirer_type');
                else if (currentStep === 'hirer_review') setCurrentStep('hirer_location');
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('btnBack')}</span>
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: EMAIL ADDRESS INPUT */}
        {/* ========================================================================= */}
        {currentStep === 'email' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold tracking-wide uppercase">
                {language === 'hi' ? 'सुरक्षित ईमेल लॉगिन / रजिस्टर' : 'Secure Email Login / Register'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] mt-2 tracking-tight">
                {t('authWelcomeTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {t('authWelcomeSub')}
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('authEmailLabel')}
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 flex items-center gap-1.5 text-slate-400 pointer-events-none">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFormError('');
                    }}
                    placeholder={t('authEmailPlaceholder')}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm sm:text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                    required
                    autoFocus
                  />
                </div>
                {formError && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{formError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#EAA228] hover:bg-[#DE9419] text-slate-950 font-extrabold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t('authContinueBtn')}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-normal">
                  {t('authTermsNote')}
                </p>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: OTP VERIFICATION */}
        {/* ========================================================================= */}
        {currentStep === 'otp' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#0B132B]">
                {t('otpTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {t('otpSub')} <strong className="text-slate-900">{email}</strong>
                <button
                  type="button"
                  onClick={() => setCurrentStep('email')}
                  className="ml-2 text-xs font-bold text-amber-700 hover:underline cursor-pointer"
                >
                  ({t('otpChangeEmail')})
                </button>
              </p>
            </div>

            {/* Demo Hint Banner */}
            <div className="p-3 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-900 font-semibold">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t('otpDemoHint')} <strong>123456</strong></span>
              </div>
              <button
                type="button"
                onClick={() => setOtpDigits(['1', '2', '3', '4', '5', '6'])}
                className="px-2.5 py-1 rounded-lg bg-amber-200/70 hover:bg-amber-300 text-slate-900 text-[11px] font-bold"
              >
                Auto-fill
              </button>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-5">
              {/* 6 Digit Inputs */}
              <div>
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                    />
                  ))}
                </div>
                {otpError && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{otpError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#0B132B] hover:bg-slate-800 text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                ) : (
                  <>
                    <span>{t('otpVerifyBtn')}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    alert('नया OTP भेजा गया (123456)');
                    setOtpDigits(['1', '2', '3', '4', '5', '6']);
                  }}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {t('otpResendBtn')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: LANGUAGE SELECTION */}
        {/* ========================================================================= */}
        {currentStep === 'language' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold tracking-wide uppercase">
                ✓ मोबाइल सत्यापित / Verified
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] mt-2">
                {t('langTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('langSub')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Hindi Card */}
              <button
                type="button"
                onClick={() => handleSelectLanguage('hi')}
                className={`p-6 rounded-[24px] border-2 text-left transition-all duration-200 flex flex-col justify-between h-36 ${
                  language === 'hi'
                    ? 'border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-400/30'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-900">हिंदी</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      language === 'hi' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-900 block">हिंदी में जारी रखें</span>
                  <span className="text-[11px] text-slate-500">सरल और स्पष्ट हिंदी इंटरफेस</span>
                </div>
              </button>

              {/* English Card */}
              <button
                type="button"
                onClick={() => handleSelectLanguage('en')}
                className={`p-6 rounded-[24px] border-2 text-left transition-all duration-200 flex flex-col justify-between h-36 ${
                  language === 'en'
                    ? 'border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-400/30'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-900">English</span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      language === 'en' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-900 block">Continue in English</span>
                  <span className="text-[11px] text-slate-500">Bilingual navigation</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: ROLE SELECTION */}
        {/* ========================================================================= */}
        {currentStep === 'role' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold tracking-wide uppercase">
                {language === 'hi' ? 'भूमिका चयन' : 'Role Selection'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] mt-2">
                {t('roleTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('roleSub')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Worker Card */}
              <button
                type="button"
                onClick={() => handleSelectRole('worker')}
                className="group p-6 rounded-[26px] bg-gradient-to-b from-amber-50/50 to-amber-100/30 border-2 border-amber-300/80 hover:border-amber-500 text-left transition-all duration-200 shadow-sm hover:shadow-card flex flex-col justify-between h-52"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EAA228] text-slate-950 flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
                    <HardHat className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B132B] font-sans">
                    {t('roleWorkerTitle')}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">
                    {t('roleWorkerSub')}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <span>{t('authContinueBtn')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Hirer Card */}
              <button
                type="button"
                onClick={() => handleSelectRole('hirer')}
                className="group p-6 rounded-[26px] bg-slate-50 border-2 border-slate-200 hover:border-slate-800 text-left transition-all duration-200 shadow-sm hover:shadow-card flex flex-col justify-between h-52"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0B132B] text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0B132B] font-sans">
                    {t('roleHirerTitle')}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">
                    {t('roleHirerSub')}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <span>{t('authContinueBtn')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* WORKER ONBOARDING STEPS */}
        {/* ========================================================================= */}
        {currentStep.startsWith('worker_') && currentStep !== 'worker_success' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Multi-step progress bar */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span>{t('workerOnboardTitle')}</span>
                <span className="text-amber-700">चरण {getWorkerProgressStep()} / 5</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${(getWorkerProgressStep() / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Step A1: Basic Info */}
            {currentStep === 'worker_basic' && (
              <div className="space-y-5">
                <h3 className="text-xl font-extrabold text-[#0B132B]">
                  {t('stepBasicInfo')}
                </h3>

                {/* Avatar Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {t('avatarChooseLabel')}
                  </label>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                    {avatarChoices.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => setWorkerAvatar(av)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                          workerAvatar === av
                            ? 'bg-amber-200 border-2 border-amber-500 shadow-sm scale-105'
                            : 'bg-slate-100 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('fullNameLabel')}
                  </label>
                  <input
                    type="text"
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    placeholder={t('fullNamePlaceholder')}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('verifiedEmailLabel')}
                  </label>
                  <div className="px-4 py-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-sm font-bold text-emerald-950">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-700" />
                      <span>{email}</span>
                    </span>
                    <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      सत्यापित
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!workerName.trim()) {
                      alert('कृपया अपना नाम दर्ज करें');
                      return;
                    }
                    setCurrentStep('worker_skills');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#0B132B] text-amber-400 hover:bg-slate-800 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('btnNext')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step A2: Skills Selection */}
            {currentStep === 'worker_skills' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-extrabold text-[#0B132B]">
                    {t('skillsQuestionTitle')}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('skillsQuestionSub')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {skillOptions.map((opt) => {
                    const isSelected = selectedSkills.includes(opt.name);
                    return (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => toggleSkill(opt.name)}
                        className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-100/70 border-amber-500 shadow-2xs font-bold text-slate-950'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-xl ${
                              isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {opt.icon}
                          </div>
                          <span className="text-xs sm:text-sm font-semibold">{opt.label}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-amber-800 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (selectedSkills.length === 0) {
                      alert(t('errSelectSkill'));
                      return;
                    }
                    setCurrentStep('worker_exp_avail');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#0B132B] text-amber-400 hover:bg-slate-800 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('btnNext')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step A3: Experience & Availability */}
            {currentStep === 'worker_exp_avail' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-extrabold text-[#0B132B] mb-2">
                    {t('expQuestionTitle')}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      t('expLess1'),
                      t('exp1to3'),
                      t('exp3to5'),
                      t('exp5to10'),
                      t('exp10plus'),
                    ].map((exp) => (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => setExperience(exp)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                          experience === exp
                            ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-sm font-extrabold text-[#0B132B] mb-2">
                    {t('availQuestionTitle')}
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setAvailability('now')}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between ${
                        availability === 'now'
                          ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-400'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{t('availNow')}</div>
                        <div className="text-[11px] text-slate-500">{t('availNowSub')}</div>
                      </div>
                      {availability === 'now' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAvailability('date')}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between ${
                        availability === 'date'
                          ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-400'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{t('availLater')}</div>
                        <div className="text-[11px] text-slate-500">{t('availLaterSub')}</div>
                      </div>
                      {availability === 'date' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAvailability('working')}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between ${
                        availability === 'working'
                          ? 'bg-slate-100 border-slate-500 ring-1 ring-slate-400'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{t('availWorking')}</div>
                        <div className="text-[11px] text-slate-500">{t('availWorkingSub')}</div>
                      </div>
                      {availability === 'working' && <CheckCircle2 className="w-4 h-4 text-slate-600" />}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep('worker_location')}
                  className="w-full py-3.5 rounded-2xl bg-[#0B132B] text-amber-400 hover:bg-slate-800 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('btnNext')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step A4: Location */}
            {currentStep === 'worker_location' && (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-[#0B132B]">
                  {t('stepLocation')}
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('locationCityLabel')}
                  </label>
                  <input
                    type="text"
                    value={workerCity}
                    onChange={(e) => setWorkerCity(e.target.value)}
                    placeholder={t('locationCityPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('locationAreaLabel')}
                  </label>
                  <input
                    type="text"
                    value={workerArea}
                    onChange={(e) => setWorkerArea(e.target.value)}
                    placeholder={t('locationAreaPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('locationPincodeLabel')}
                  </label>
                  <input
                    type="text"
                    value={workerPincode}
                    onChange={(e) => setWorkerPincode(e.target.value)}
                    placeholder={t('locationPincodePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!workerCity.trim() || !workerArea.trim()) {
                      alert('कृपया शहर और इलाका भरें');
                      return;
                    }
                    setCurrentStep('worker_review');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#0B132B] text-amber-400 hover:bg-slate-800 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('btnNext')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step A5: Review & Submit */}
            {currentStep === 'worker_review' && (
              <div className="space-y-5">
                <h3 className="text-xl font-extrabold text-[#0B132B]">
                  {t('summaryTitle')}
                </h3>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                    <div className="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center text-2xl">
                      {workerAvatar}
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-slate-900">{workerName}</div>
                      <div className="text-slate-500 flex items-center gap-1 text-xs mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-400 text-[11px] block">मुख्य कार्य कौशल / Skills</span>
                      <span className="font-bold text-slate-900">{selectedSkills.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">अनुभव / Experience</span>
                      <span className="font-bold text-slate-900">{experience}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">कार्य क्षेत्र / Location</span>
                      <span className="font-bold text-slate-900">{workerArea}, {workerCity}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px] block">उपलब्धता / Status</span>
                      <span className="font-bold text-emerald-700">✓ {t('availNow')}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinishWorkerOnboarding}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#EAA228] hover:bg-[#DE9419] text-slate-950 font-black text-base shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>{t('btnCreateProfile')}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* WORKER SUCCESS STATE */}
        {/* ========================================================================= */}
        {currentStep === 'worker_success' && (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                ✓ डिजिटल पहचान आईडी एक्टिव
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B132B] mt-2">
                {t('successWorkerTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                {t('successWorkerSub')}
              </p>
            </div>

            <button
              onClick={() => navigate('/worker/dashboard')}
              className="w-full py-4 rounded-2xl bg-[#0B132B] hover:bg-slate-800 text-amber-400 font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>{t('btnGoWorkerHome')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* HIRER ONBOARDING STEPS */}
        {/* ========================================================================= */}
        {currentStep.startsWith('hirer_') && currentStep !== 'hirer_success' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span>{t('hirerOnboardTitle')}</span>
                <span className="text-amber-700">चरण {getHirerProgressStep()} / 4</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${(getHirerProgressStep() / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Step B1: Basic Info */}
            {currentStep === 'hirer_basic' && (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-[#0B132B]">
                  {t('stepBasicInfo')}
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('fullNameLabel')}
                  </label>
                  <input
                    type="text"
                    value={hirerName}
                    onChange={(e) => setHirerName(e.target.value)}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 font-bold text-slate-900 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('verifiedEmailLabel')}
                  </label>
                  <div className="px-4 py-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between text-sm font-bold text-emerald-950">
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-700" />
                      <span>{email}</span>
                    </span>
                    <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      सत्यापित
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!hirerName.trim()) {
                      alert('कृपया अपना नाम दर्ज करें');
                      return;
                    }
                    setCurrentStep('hirer_type');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#0B132B] text-amber-400 hover:bg-slate-800 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('btnNext')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step B2: Hirer Type */}
            {currentStep === 'hirer_type' && (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-[#0B132B]">
                  {t('hirerTypeLabel')}
                </h3>

                <div className="space-y-2.5">
                  {[
                    { label: t('typeContractor'), icon: <HardHat className="w-4 h-4" /> },
                    { label: t('typeHomeowner'), icon: <Home className="w-4 h-4" /> },
                    { label: t('typeBuilder'), icon: <Building className="w-4 h-4" /> },
                    { label: t('typeSmallBiz'), icon: <Briefcase className="w-4 h-4" /> },
                    { label: t('typeLandlord'), icon: <Building className="w-4 h-4" /> },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setHirerType(item.label)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between ${
                        hirerType === item.label
                          ? 'bg-amber-100/70 border-amber-500 font-bold text-slate-950 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-100 text-slate-700">{item.icon}</div>
                        <span className="text-xs sm:text-sm">{item.label}</span>
                      </div>
                      {hirerType === item.label && <Check className="w-4 h-4 text-amber-800 stroke-[3]" />}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep('hirer_location')}
                  className="w-full py-3.5 rounded-2xl bg-[#0B132B] text-amber-400 hover:bg-slate-800 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('btnNext')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step B3: Hirer Location */}
            {currentStep === 'hirer_location' && (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-[#0B132B]">
                  {t('stepLocation')}
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('locationCityLabel')}
                  </label>
                  <input
                    type="text"
                    value={hirerCity}
                    onChange={(e) => setHirerCity(e.target.value)}
                    placeholder="e.g. Delhi, Noida"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('locationAreaLabel')}
                  </label>
                  <input
                    type="text"
                    value={hirerArea}
                    onChange={(e) => setHirerArea(e.target.value)}
                    placeholder="e.g. Rohini Sector 18"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold"
                    required
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!hirerCity.trim() || !hirerArea.trim()) {
                      alert('कृपया शहर व इलाका भरें');
                      return;
                    }
                    setCurrentStep('hirer_review');
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#0B132B] text-amber-400 hover:bg-slate-800 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('btnNext')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Step B4: Review & Create */}
            {currentStep === 'hirer_review' && (
              <div className="space-y-5">
                <h3 className="text-xl font-extrabold text-[#0B132B]">
                  {t('summaryTitle')}
                </h3>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400 text-[11px] block">नाम / Name</span>
                    <span className="font-bold text-slate-900">{hirerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">नियोक्ता श्रेणी / Category</span>
                    <span className="font-bold text-slate-900">{hirerType}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">स्थान / Location</span>
                    <span className="font-bold text-slate-900">{hirerArea}, {hirerCity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">{t('verifiedEmailLabel')}</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{email}</span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinishHirerOnboarding}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#0B132B] text-amber-400 hover:bg-slate-800 font-black text-base shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>{t('btnCreateHirerProfile')}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* HIRER SUCCESS STATE */}
        {/* ========================================================================= */}
        {currentStep === 'hirer_success' && (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                ✓ ठेकेदार प्रोफाइल एक्टिव
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B132B] mt-2">
                {t('successHirerTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                {t('successHirerSub')}
              </p>
            </div>

            <button
              onClick={() => navigate('/hirer/dashboard')}
              className="w-full py-4 rounded-2xl bg-[#0B132B] hover:bg-slate-800 text-amber-400 font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>{t('btnGoHirerHome')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
