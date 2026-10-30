import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types';

interface Translations {
  [key: string]: {
    hi: string;
    en: string;
  };
}

export const translations: Translations = {
  // Brand & Tagline
  brandName: {
    hi: 'श्रमिक',
    en: 'SHRAMIKK',
  },
  heroBadge: {
    hi: 'लेबर चौक से',
    en: 'From Labour Chowk',
  },
  heroBadgeArrow: {
    hi: 'डिजिटल पहचान तक',
    en: 'To Digital Identity',
  },
  heroHeadingPart1: {
    hi: 'लेबर चौक से',
    en: 'From Labour Chowk to',
  },
  heroHeadingPart2: {
    hi: 'डिजिटल पहचान तक',
    en: 'Digital Identity',
  },
  heroDescription: {
    hi: 'श्रमिक (SHRAMIKK) भारत के दैनिक वेतनभोगी निर्माण श्रमिकों को उन लोगों से जोड़ता है जिन्हें उनके कौशल की आवश्यकता है — साथ ही हर पूरे हुए काम को काम और आय के डिजिटल रिकॉर्ड में बदलता है।',
    en: 'SHRAMIKK connects India\'s daily-wage construction workers with employers who need their skills — transforming every completed shift into a verified digital record of work and income.',
  },

  // Hero CTAs
  findWorkCta: {
    hi: 'काम खोजें',
    en: 'Find Work',
  },
  findWorkSubtext: {
    hi: 'अपने पास दैनिक काम पाएं',
    en: 'Find daily shifts nearby',
  },
  hireWorkerCta: {
    hi: 'कामगार को काम पर रखें',
    en: 'Hire Workers',
  },
  hireWorkerSubtext: {
    hi: 'कुशल कामगार खोजें',
    en: 'Find skilled workers',
  },

  // Trust Badges
  trustedPlatform: {
    hi: 'विश्वसनीय मंच',
    en: 'Trusted Platform',
  },
  verifiedProfiles: {
    hi: 'सत्यापित प्रोफाइल',
    en: 'Verified Profiles',
  },
  secureSafe: {
    hi: 'सुरक्षित एवं भरोसेमंद',
    en: 'Safe & Secure',
  },

  // Top Nav
  navHome: {
    hi: 'होम',
    en: 'Home',
  },
  navFindWork: {
    hi: 'काम खोजें',
    en: 'Find Work',
  },
  navHireWorkers: {
    hi: 'कामगार ढूंढें',
    en: 'Hire Workers',
  },
  navHowItWorks: {
    hi: 'यह कैसे काम करता है',
    en: 'How It Works',
  },
  navAboutUs: {
    hi: 'हमारे बारे में',
    en: 'About Us',
  },
  navAiSaathi: {
    hi: 'एआई साथी',
    en: 'AI Saathi',
  },
  navAdmin: {
    hi: 'Admin',
    en: 'Admin',
  },
  navLoginRegister: {
    hi: 'लॉगिन / रजिस्टर',
    en: 'Login / Register',
  },

  // Statistics Strip
  statsWorkers: {
    hi: '10K+',
    en: '10K+',
  },
  statsWorkersTitle: {
    hi: 'पंजीकृत कामगार',
    en: 'Registered Workers',
  },
  statsWorkersSub: {
    hi: 'भारत भर में कुशल और सत्यापित श्रमिक',
    en: 'Skilled & verified workers across India',
  },
  statsJobs: {
    hi: '5K+',
    en: '5K+',
  },
  statsJobsTitle: {
    hi: 'काम पूरे हुए',
    en: 'Jobs Completed',
  },
  statsJobsSub: {
    hi: 'प्रतिदिन सफल और सुरक्षित कार्य कनेक्शन',
    en: 'Successful daily shifts connected safely',
  },
  statsRating: {
    hi: '4.7/5',
    en: '4.7/5',
  },
  statsRatingTitle: {
    hi: 'औसत रेटिंग',
    en: 'Average Rating',
  },
  statsRatingSub: {
    hi: 'हजारों उपयोगकर्ताओं द्वारा भरोसेमंद',
    en: 'Trusted by thousands of users',
  },
  statsVerified: {
    hi: '100%',
    en: '100%',
  },
  statsVerifiedTitle: {
    hi: 'सत्यापित प्रोफाइल',
    en: 'Verified Profiles',
  },
  statsVerifiedSub: {
    hi: 'सुरक्षित, भरोसेमंद एवं पारदर्शी मंच',
    en: 'Secure, reliable and transparent platform',
  },

  // Worker Greeting Bar
  workerGreetingName: {
    hi: 'नमस्ते, रमेश!',
    en: 'Namaste, Ramesh!',
  },
  workerVerifiedBadge: {
    hi: 'सत्यापित कामगार आईडी',
    en: 'Verified Worker ID',
  },
  workerStatusSubtitle: {
    hi: 'शुभ प्रभात • राजमिस्त्री एवं सिविल कार्य • ग्रेड ए',
    en: 'Good Morning • Masonry & Civil Works • Grade A',
  },
  workerServicesBadge: {
    hi: 'श्रमिक सेवाएं और त्वरित विकल्प',
    en: 'Worker Services & Quick Actions',
  },
  workerServicesSubtext: {
    hi: 'दैनिक काम, सक्रिय कार्य, प्रमाणित आय बहीखाता और एआई सहायता के लिए स्वतंत्र सुविधाएं',
    en: 'Direct access to daily jobs, active shifts, wage ledger & AI assistance',
  },

  // 4 Feature Cards
  card1Title: {
    hi: 'काम खोजें',
    en: 'Find Work',
  },
  card1Badge: {
    hi: 'Chowk Direct',
    en: 'Chowk Direct',
  },
  card1Desc: {
    hi: 'अपने नज़दीकी राजमिस्त्री, हेल्पर, पेंटर, प्लंबर और इलेक्ट्रीशियन के काम देखें',
    en: 'Explore nearby shifts for masons, helpers, painters, plumbers, and electricians',
  },
  card1Cta: {
    hi: 'Explore काम खोजें',
    en: 'Explore Find Work',
  },

  card2Title: {
    hi: 'मेरे काम',
    en: 'My Jobs',
  },
  card2Badge: {
    hi: 'Live Shifts',
    en: 'Live Shifts',
  },
  card2Desc: {
    hi: 'वर्तमान कार्यस्थल, समय, ठेकेदार संपर्क और दैनिक उपस्थिति का प्रबंधन करें',
    en: 'Manage current worksite, shift timing, contractor contacts, and daily attendance',
  },
  card2Cta: {
    hi: 'Explore मेरे काम',
    en: 'Explore My Jobs',
  },

  card3Title: {
    hi: 'आय बहीखाता',
    en: 'Wage Ledger',
  },
  card3Badge: {
    hi: 'Wage Slip',
    en: 'Wage Slip',
  },
  card3Desc: {
    hi: 'दैनिक वेतन का हिसाब रखें, बैंक लोन के लिए प्रमाणित डिजिटल पर्ची पाएं',
    en: 'Track daily wage records and get certified digital slips for bank loans',
  },
  card3Cta: {
    hi: 'Explore आय बहीखाता',
    en: 'Explore Wage Ledger',
  },

  card4Title: {
    hi: 'एआई साथी',
    en: 'AI Saathi',
  },
  card4Badge: {
    hi: 'BOCW Welfare',
    en: 'BOCW Welfare',
  },
  card4Desc: {
    hi: 'भवन निर्माण कल्याण बोर्ड (BOCW), ई-श्रम और सरकारी योजनाओं की सीधी जानकारी',
    en: 'Direct guidance for BOCW Welfare Board, e-Shram and government schemes',
  },
  card4Cta: {
    hi: 'Explore एआई साथी',
    en: 'Explore AI Saathi',
  },

  // Digital Income Identity Card
  digitalIdBadge: {
    hi: 'OFFICIAL WORKER ID',
    en: 'OFFICIAL WORKER ID',
  },
  digitalIdTitle: {
    hi: 'डिजिटल आय पहचान',
    en: 'Digital Income Identity',
  },
  digitalIdSub: {
    hi: 'अपनी पहचान बनाएं। भविष्य संवारें।',
    en: 'Build your identity. Secure your future.',
  },
  check1: {
    hi: 'Govt. e-Shram & Aadhaar Linkable',
    en: 'Govt. e-Shram & Aadhaar Linkable',
  },
  check2: {
    hi: 'Bank-Verifiable Daily Wage Slips',
    en: 'Bank-Verifiable Daily Wage Slips',
  },
  check3: {
    hi: 'Permanent Skill & Attendance Record',
    en: 'Permanent Skill & Attendance Record',
  },
  openDigitalProfile: {
    hi: 'Open Digital Card Profile →',
    en: 'Open Digital Card Profile →',
  },

  // Verified Earnings Card
  earningsBadge: {
    hi: 'मासिक कुल विवरण',
    en: 'Monthly Summary',
  },
  earningsTitle: {
    hi: 'Verified Monthly Earnings & Work History',
    en: 'Verified Monthly Earnings & Work History',
  },
  earningsFilterMonth: {
    hi: 'इस महीने',
    en: 'This Month',
  },
  totalIncomeLabel: {
    hi: 'कुल आय',
    en: 'Total Income',
  },
  growthIndicator: {
    hi: '↑ 8.4% पिछले माह से',
    en: '↑ 8.4% vs last month',
  },
  statJobsDone: {
    hi: 'काम पूरे किए',
    en: 'Jobs Completed',
  },
  statWorkDays: {
    hi: 'कार्य दिवस',
    en: 'Work Days',
  },
  statRatingLabel: {
    hi: 'रेटिंग',
    en: 'Rating',
  },

  // Bottom Navigation
  navTabHome: {
    hi: 'होम',
    en: 'Home',
  },
  navTabFindWork: {
    hi: 'काम खोजें',
    en: 'Find Work',
  },
  navTabFindWorkers: {
    hi: 'कामगार खोजें',
    en: 'Find Workers',
  },
  navTabMyWork: {
    hi: 'मेरा काम',
    en: 'My Work',
  },
  navTabMyJobs: {
    hi: 'मेरे काम',
    en: 'My Jobs',
  },
  navTabIdentity: {
    hi: 'पहचान',
    en: 'Identity',
  },
  navTabHires: {
    hi: 'हायरिंग',
    en: 'Hires',
  },
  navTabProfile: {
    hi: 'प्रोफ़ाइल',
    en: 'Profile',
  },

  // ============================================================
  // PHASE 6: WORK LIFECYCLE + COMPLETION + RATINGS + RECORDS
  // ============================================================
  myWorkTitle: {
    hi: 'मेरा कार्य प्रबंधन (My Work)',
    en: 'My Work Management',
  },
  myWorkSub: {
    hi: 'वर्तमान सक्रिय कार्य, पूर्ण किए गए काम और प्रमाणित कार्य बहीखाता',
    en: 'Manage active shifts, completed jobs, and verified work history',
  },
  tabActiveWork: {
    hi: 'सक्रिय कार्य (Current Shift)',
    en: 'Current Shift',
  },
  tabCompletedWork: {
    hi: 'पूर्ण कार्य (Completed Work)',
    en: 'Completed Work',
  },
  btnStartWork: {
    hi: 'काम शुरू करें (Start Work)',
    en: 'Start Work',
  },
  btnMarkCompleted: {
    hi: 'काम पूरा घोषित करें (Mark Completed)',
    en: 'Mark Work Completed',
  },
  workStartedSuccess: {
    hi: 'कार्य सफलतापूर्वक शुरू हुआ! ✓',
    en: 'Work Started Successfully! ✓',
  },
  workCompletedSuccess: {
    hi: 'कार्य सफलतापूर्वक पूर्ण हुआ! ✓',
    en: 'Work Completed Successfully! ✓',
  },
  paymentRecordedTitle: {
    hi: 'प्रमाणित पारिश्रमिक रसीद (Payment Record)',
    en: 'Payment Record',
  },
  btnViewPaymentRecord: {
    hi: 'वेतन पर्ची देखें (Payment Record) →',
    en: 'View Payment Record →',
  },
  rateHirerTitle: {
    hi: 'ठेकेदार / नियोक्ता को रेट करें (Rate Hirer)',
    en: 'Rate Your Hirer',
  },
  rateWorkerTitle: {
    hi: 'कामगार को रेट करें (Rate Worker)',
    en: 'Rate Your Worker',
  },
  ratingSuccessMsg: {
    hi: 'रेटिंग सफलतापूर्वक दर्ज की गई! ✓',
    en: 'Rating Submitted Successfully! ✓',
  },
  alreadyRatedBadge: {
    hi: '✓ रेट किया गया (Rated)',
    en: '✓ Rated',
  },
  financialHubTitle: {
    hi: 'आय बहीखाता एवं वेतन पर्चियां (Wage Ledger)',
    en: 'Wage Ledger & Income History',
  },
  financialHubSub: {
    hi: 'हर पूरे हुए कार्य का बैंक-प्रमाणित डिजिटल पारिश्रमिक रिकॉर्ड',
    en: 'Bank-verifiable digital wage records for every completed job',
  },
  totalRecordedIncome: {
    hi: 'कुल प्रमाणित दर्ज आय (Total Recorded Income)',
    en: 'Total Recorded Income',
  },
  thisMonthEarnings: {
    hi: 'इस महीने की आय',
    en: 'This Month Earnings',
  },
  completedShiftsCount: {
    hi: 'कुल पूरे कार्य दिवस',
    en: 'Total Work Days',
  },
  certifiedWageSlipBadge: {
    hi: '✓ बैंक-प्रमाणित डिजिटल पर्ची',
    en: '✓ Bank-Verifiable Digital Slip',
  },
  filterAll: {
    hi: 'सभी (All)',
    en: 'All',
  },
  matchScoreLabel: {
    hi: 'मैच',
    en: 'Match',
  },
  statusAvailable: {
    hi: 'उपलब्ध (Available)',
    en: 'Available',
  },
  filterChangeLocation: {
    hi: 'स्थान बदलें',
    en: 'Change Location',
  },
  findWorkersTitle: {
    hi: 'कुशल कामगार खोजें (Find Workers)',
    en: 'Find Workers',
  },
  findWorkersSub: {
    hi: 'सत्यापित, रेटिंग-प्रमाणित और तुरंत उपलब्ध निर्माण कारीगर',
    en: 'Verified, rated and immediately available construction craftsmen',
  },
  searchWorkersPlaceholder: {
    hi: 'कौशल या नाम से कामगार खोजें...',
    en: 'Search workers by skill or name...',
  },
  recommendedWorkersHeading: {
    hi: 'अनुशंसित कामगार (Recommended Workers)',
    en: 'Recommended Workers',
  },
  btnViewWorkerProfile: {
    hi: 'प्रोफ़ाइल देखें →',
    en: 'View Profile →',
  },
  btnHireThisWorker: {
    hi: 'इस कामगार को काम पर रखें (Hire Worker)',
    en: 'Hire This Worker',
  },
  confirmHireTitle: {
    hi: 'कामगार नियुक्ति की पुष्टि करें (Confirm Hiring)',
    en: 'Confirm Hiring',
  },
  confirmHireBtn: {
    hi: 'नियुक्ति की पुष्टि करें (Confirm Hire)',
    en: 'Confirm Hire',
  },
  hireSuccessTitle: {
    hi: 'कामगार सफलतापूर्वक काम पर रखा गया! ✓',
    en: 'Worker Hired Successfully! ✓',
  },
  statusFullyStaffed: {
    hi: 'आवश्यकता पूर्ण (Fully Staffed)',
    en: 'Fully Staffed',
  },
  statusOpenHiring: {
    hi: 'भर्ती जारी (Hiring Open)',
    en: 'Hiring Open',
  },
  statusJobClosed: {
    hi: 'काम बंद हो चुका है (Job Closed)',
    en: 'Job Closed',
  },
  myHiresTitle: {
    hi: 'मेरी नियुक्तियां (My Hires)',
    en: 'My Hires',
  },
  myHiresSub: {
    hi: 'आपके द्वारा हायर किए गए सक्रिय और पूर्व कामगार',
    en: 'Manage hired workers and active sites',
  },
  noHiresYetTitle: {
    hi: 'आपने अभी तक किसी को हायर नहीं किया है',
    en: 'You haven\'t hired anyone yet.',
  },
  noHiresYetSub: {
    hi: 'अपने काम के लिए कुशल कारीगर खोजें और सीधे काम पर रखें।',
    en: 'Find skilled workers for your next job.',
  },
  postJobTitle: {
    hi: 'नया काम पोस्ट करें (Post a Job)',
    en: 'Post a Job',
  },
  postJobSub: {
    hi: '1 मिनट में काम पोस्ट करें और पास के कुशल कामगारों से सीधे जुड़ें।',
    en: 'Post a job in 1 minute and connect with skilled workers nearby.',
  },
  hirerMyJobsHeading: {
    hi: 'मेरे पोस्ट किए गए काम (My Jobs)',
    en: 'My Jobs',
  },
  noJobsPostedTitle: {
    hi: 'आपने अभी तक कोई काम पोस्ट नहीं किया है',
    en: 'You haven\'t posted a job yet.',
  },
  noJobsPostedSub: {
    hi: 'अपना पहला काम पोस्ट करें और कुशल कामगारों से जुड़ें।',
    en: 'Post your first job and find skilled workers.',
  },

  // Phase 8: Digital Work Identity & Trust Profile
  digitalWorkIdentity: {
    hi: 'डिजिटल कार्य पहचान (Digital Work Identity)',
    en: 'Digital Work Identity',
  },
  viewMyWorkIdentity: {
    hi: 'मेरी कार्य पहचान देखें',
    en: 'View My Work Identity',
  },
  trustProfileTitle: {
    hi: 'भरोसा प्रोफ़ाइल (Trust Profile)',
    en: 'Trust Profile',
  },
  trustProfileSub: {
    hi: 'पूर्ण कार्यों और प्राप्त रेटिंग्स पर आधारित पारदर्शी कार्य पहचान',
    en: 'Transparent work reputation based on verified shifts and ratings',
  },
  workReputationBadge: {
    hi: 'सत्यापित कार्य प्रतिष्ठा (Work Reputation Profile)',
    en: 'Verified Work Reputation Profile',
  },
  profileStrengthLabel: {
    hi: 'प्रोफ़ाइल पूर्णता (Profile Strength)',
    en: 'Profile Strength',
  },
  publicIdentityLabel: {
    hi: 'सार्वजनिक कार्य पहचान (Public Work Identity)',
    en: 'Public Work Identity',
  },
  makeIdentityPublic: {
    hi: 'कार्य पहचान सार्वजनिक करें',
    en: 'Make Work Identity Public',
  },
  identityPrivateNotice: {
    hi: 'यह कार्य पहचान वर्तमान में निजी (Private) है।',
    en: 'This worker\'s work identity is currently private.',
  },
  shareWorkIdentity: {
    hi: 'कार्य पहचान साझा करें',
    en: 'Share Work Identity',
  },
  scanToViewIdentity: {
    hi: 'पहचान देखने के लिए स्कैन करें',
    en: 'Scan to View Work Identity',
  },
  howProfileIsBuilt: {
    hi: 'यह प्रोफ़ाइल कैसे बनती है?',
    en: 'How is this profile built?',
  },
  howProfileIsBuiltDesc: {
    hi: 'आपकी SHRAMIKK कार्य पहचान आपके प्रोफाइल, पूरे किए गए काम, प्राप्त रेटिंग, कौशल और दर्ज कार्य इतिहास से स्वचालित व पारदर्शी रूप से बनती है।',
    en: 'Your SHRAMIKK work identity is built from your profile, completed work, ratings, skills, and recorded work history.',
  },
  hirerReputationTitle: {
    hi: 'नियोक्ता प्रतिष्ठा (Hirer Reputation)',
    en: 'Hirer Reputation',
  },
  workerReviewsForHirer: {
    hi: 'कामगारों द्वारा दी गई समीक्षाएं',
    en: 'Worker Reviews for Hirer',
  },
  poweredByShramikk: {
    hi: 'Powered by SHRAMIKK',
    en: 'Powered by SHRAMIKK',
  },
  shramikkEvidenceDisclaimer: {
    hi: 'यह कार्य पहचान SHRAMIKK पर उपलब्ध पूर्ण कार्यों व समीक्षाओं के आधार पर है।',
    en: 'Work identity based on records available on SHRAMIKK.',
  },

  // Phase 9: Ecosystem & Financial Connectivity
  quickIncomeTitle: {
    hi: 'वित्तीय केंद्र (Financial Hub)',
    en: 'Financial Hub',
  },
  quickIncomeSub: {
    hi: 'कार्य-लिंक्ड वित्तीय रिकॉर्ड और कनेक्टेड सेवाएं',
    en: 'Manage work-linked financial records & discover services',
  },
  paymentRecordsTitle: {
    hi: 'भुगतान रिकॉर्ड (Payment Records)',
    en: 'Payment Records',
  },
  financialIdentityTitle: {
    hi: 'वित्तीय पहचान (Financial Identity)',
    en: 'Financial Identity',
  },
  paymentVerifiedBadge: {
    hi: 'सत्यापित भुगतान (✓ Verified)',
    en: '✓ Payment Verified',
  },
  paymentPendingBadge: {
    hi: 'पुष्टि लंबित (⏳ Awaiting Confirmation)',
    en: '⏳ Awaiting Confirmation',
  },
  paymentIssueBadge: {
    hi: 'सत्यापन लंबित (⚠️ Verification Pending)',
    en: '⚠️ Verification Pending',
  },
  exportWorkIdentity: {
    hi: 'मेरी कार्य पहचान एक्सपोर्ट करें',
    en: 'Export My Work Identity',
  },
  noPaymentRecords: {
    hi: 'कोई भुगतान रिकॉर्ड नहीं मिला।',
    en: 'No payment records found.',
  },

  // Auth Flow – Mobile Step
  authWelcomeTitle: {
    hi: 'स्वागत है',
    en: 'Welcome',
  },
  authWelcomeSub: {
    hi: 'अपना ईमेल पता दर्ज करें',
    en: 'Enter your email address to get started',
  },
  authEmailLabel: {
    hi: 'ईमेल पता',
    en: 'Email Address',
  },
  authEmailPlaceholder: {
    hi: 'worker@shramikk.in',
    en: 'name@example.com',
  },
  errValidEmail: {
    hi: 'कृपया एक मान्य ईमेल पता दर्ज करें (उदा. ramesh@shramikk.in)',
    en: 'Please enter a valid email address (e.g. name@example.com)',
  },
  authMobileLabel: {
    hi: 'मोबाइल नंबर',
    en: 'Mobile Number',
  },
  authMobilePlaceholder: {
    hi: '9876543210',
    en: '9876543210',
  },
  authContinueBtn: {
    hi: 'जारी रखें',
    en: 'Continue',
  },
  authTermsNote: {
    hi: 'जारी रखकर, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत हैं।',
    en: 'By continuing, you agree to our Terms of Service and Privacy Policy.',
  },

  // Auth Flow – OTP Step
  otpTitle: {
    hi: 'ईमेल सत्यापन कोड',
    en: 'Email Verification Code',
  },
  otpSub: {
    hi: 'आपके ईमेल पर भेजा गया 6-अंकीय कोड दर्ज करें:',
    en: 'Enter the 6-digit verification code sent to your email:',
  },
  otpVerifyBtn: {
    hi: 'सत्यापित करें',
    en: 'Verify & Proceed',
  },
  otpResendBtn: {
    hi: 'कोड दोबारा भेजें',
    en: 'Resend Code',
  },
  otpChangeNumber: {
    hi: 'ईमेल बदलें',
    en: 'Change Email',
  },
  otpChangeEmail: {
    hi: 'ईमेल बदलें',
    en: 'Change Email',
  },
  otpDemoHint: {
    hi: 'डेमो वेरिफिकेशन कोड: 123456',
    en: 'Demo Verification Code: 123456',
  },
  otpErrorInvalid: {
    hi: 'अमान्य कोड। कृपया 123456 दर्ज करें।',
    en: 'Invalid verification code. Please enter 123456.',
  },

  // Auth Flow – Language Selection
  langTitle: {
    hi: 'भाषा चुनें',
    en: 'Choose Language',
  },
  langSub: {
    hi: 'अपनी पसंदीदा भाषा चुनें',
    en: 'Select your preferred language',
  },

  // Auth Flow – Role Selection
  roleTitle: {
    hi: 'आप कौन हैं?',
    en: 'Who are you?',
  },
  roleSub: {
    hi: 'अपनी भूमिका चुनें',
    en: 'Choose your role',
  },
  roleWorkerTitle: {
    hi: 'कामगार',
    en: 'Worker',
  },
  roleWorkerSub: {
    hi: 'मैं काम ढूंढ रहा हूँ',
    en: 'I am looking for work',
  },
  roleHirerTitle: {
    hi: 'नियोक्ता',
    en: 'Hirer',
  },
  roleHirerSub: {
    hi: 'मुझे कामगार चाहिए',
    en: 'I need workers',
  },

  // Auth Flow – Worker Onboarding
  workerOnboardTitle: {
    hi: 'कामगार प्रोफ़ाइल बनाएं',
    en: 'Create Worker Profile',
  },
  fullNameLabel: {
    hi: 'पूरा नाम',
    en: 'Full Name',
  },
  fullNamePlaceholder: {
    hi: 'अपना पूरा नाम दर्ज करें',
    en: 'Enter your full name',
  },
  avatarChooseLabel: {
    hi: 'अपना अवतार चुनें',
    en: 'Choose your avatar',
  },

  // Auth Flow – Skills
  skillsQuestionTitle: {
    hi: 'आपके कौशल क्या हैं?',
    en: 'What are your skills?',
  },
  skillsQuestionSub: {
    hi: 'अपने कौशल चुनें',
    en: 'Select your skills',
  },
  skillMason: {
    hi: 'राजमिस्त्री',
    en: 'Mason',
  },
  skillCarpenter: {
    hi: 'बढ़ई',
    en: 'Carpenter',
  },
  skillPainter: {
    hi: 'पेंटर',
    en: 'Painter',
  },
  skillElectrician: {
    hi: 'इलेक्ट्रीशियन',
    en: 'Electrician',
  },
  skillPlumber: {
    hi: 'प्लंबर',
    en: 'Plumber',
  },
  skillHelper: {
    hi: 'हेल्पर',
    en: 'Helper',
  },
  skillTile: {
    hi: 'टाइल मिस्त्री',
    en: 'Tile Fitter',
  },
  errSelectSkill: {
    hi: 'कम से कम एक कौशल चुनें',
    en: 'Please select at least one skill',
  },

  // Auth Flow – Experience & Availability
  expQuestionTitle: {
    hi: 'आपका अनुभव कितना है?',
    en: 'How much experience do you have?',
  },
  expLess1: {
    hi: '1 साल से कम',
    en: 'Less than 1 year',
  },
  exp1to3: {
    hi: '1-3 साल',
    en: '1-3 years',
  },
  exp3to5: {
    hi: '3-5 साल',
    en: '3-5 years',
  },
  exp5to10: {
    hi: '5-10 साल',
    en: '5-10 years',
  },
  exp10plus: {
    hi: '10+ साल',
    en: '10+ years',
  },
  availQuestionTitle: {
    hi: 'आपकी उपलब्धता क्या है?',
    en: 'What is your availability?',
  },
  availNow: {
    hi: 'अभी उपलब्ध',
    en: 'Available Now',
  },
  availNowSub: {
    hi: 'मैं तुरंत शुरू कर सकता हूँ',
    en: 'I can start immediately',
  },
  availLater: {
    hi: 'बाद में उपलब्ध',
    en: 'Available Later',
  },
  availLaterSub: {
    hi: 'मैं बाद में शुरू करूंगा',
    en: 'I will start later',
  },
  availWorking: {
    hi: 'अभी कार्यरत',
    en: 'Currently Working',
  },
  availWorkingSub: {
    hi: 'मैं इस समय काम कर रहा हूँ',
    en: 'I am currently employed',
  },

  // Auth Flow – Location
  locationCityLabel: {
    hi: 'शहर',
    en: 'City',
  },
  locationCityPlaceholder: {
    hi: 'अपना शहर दर्ज करें',
    en: 'Enter your city',
  },
  locationAreaLabel: {
    hi: 'क्षेत्र / इलाका',
    en: 'Area / Locality',
  },
  locationAreaPlaceholder: {
    hi: 'अपना इलाका दर्ज करें',
    en: 'Enter your area',
  },
  locationPincodeLabel: {
    hi: 'पिनकोड',
    en: 'Pincode',
  },
  locationPincodePlaceholder: {
    hi: 'पिनकोड दर्ज करें',
    en: 'Enter pincode',
  },

  // Auth Flow – Review & Submit
  summaryTitle: {
    hi: 'प्रोफ़ाइल सारांश',
    en: 'Profile Summary',
  },
  verifiedPhoneLabel: {
    hi: 'सत्यापित फ़ोन',
    en: 'Verified Phone',
  },
  verifiedEmailLabel: {
    hi: 'सत्यापित ईमेल',
    en: 'Verified Email',
  },
  stepBasicInfo: {
    hi: 'बुनियादी जानकारी',
    en: 'Basic Info',
  },
  stepLocation: {
    hi: 'स्थान',
    en: 'Location',
  },
  btnBack: {
    hi: 'वापस',
    en: 'Back',
  },
  btnNext: {
    hi: 'आगे',
    en: 'Next',
  },
  btnCreateProfile: {
    hi: 'प्रोफ़ाइल बनाएं',
    en: 'Create Profile',
  },
  btnGoWorkerHome: {
    hi: 'कामगार डैशबोर्ड पर जाएं',
    en: 'Go to Worker Dashboard',
  },
  errValidMobile: {
    hi: 'कृपया सही 10-अंकीय मोबाइल नंबर दर्ज करें',
    en: 'Please enter a valid 10-digit mobile number',
  },

  // Auth Flow – Worker Success
  successWorkerTitle: {
    hi: 'प्रोफ़ाइल बन गई!',
    en: 'Profile Created!',
  },
  successWorkerSub: {
    hi: 'आपकी कामगार प्रोफ़ाइल सफलतापूर्वक बनाई गई है।',
    en: 'Your worker profile has been created successfully.',
  },

  // Auth Flow – Hirer Onboarding
  hirerOnboardTitle: {
    hi: 'नियोक्ता प्रोफ़ाइल बनाएं',
    en: 'Create Hirer Profile',
  },
  hirerTypeLabel: {
    hi: 'आप किस प्रकार के नियोक्ता हैं?',
    en: 'What type of hirer are you?',
  },
  typeContractor: {
    hi: 'ठेकेदार',
    en: 'Contractor',
  },
  typeBuilder: {
    hi: 'बिल्डर',
    en: 'Builder',
  },
  typeHomeowner: {
    hi: 'घर मालिक',
    en: 'Homeowner',
  },
  typeLandlord: {
    hi: 'जमींदार',
    en: 'Landlord',
  },
  typeSmallBiz: {
    hi: 'छोटा व्यवसाय',
    en: 'Small Business',
  },
  btnCreateHirerProfile: {
    hi: 'नियोक्ता प्रोफ़ाइल बनाएं',
    en: 'Create Hirer Profile',
  },
  btnGoHirerHome: {
    hi: 'नियोक्ता डैशबोर्ड पर जाएं',
    en: 'Go to Hirer Dashboard',
  },
  successHirerTitle: {
    hi: 'प्रोफ़ाइल बन गई!',
    en: 'Profile Created!',
  },
  successHirerSub: {
    hi: 'आपकी नियोक्ता प्रोफ़ाइल सफलतापूर्वक बनाई गई है।',
    en: 'Your hirer profile has been created successfully.',
  },

  // Navbar & Global Actions
  navSignIn: {
    hi: 'साइन इन',
    en: 'Sign In',
  },
  navRegister: {
    hi: 'रजिस्टर करें',
    en: 'Register',
  },
  navLogout: {
    hi: 'लॉग आउट',
    en: 'Logout',
  },
  escrowPillLabel: {
    hi: 'एस्क्रो सुरक्षित',
    en: 'Escrow',
  },
  escrowGuaranteed: {
    hi: '100% सुरक्षित वेतन',
    en: '100% Guaranteed',
  },
  adminPortalLabel: {
    hi: 'एडमिन पोर्टल',
    en: 'Admin Portal',
  },
  workerDashboardNav: {
    hi: 'कामगार हब',
    en: 'Worker Hub',
  },
  hirerDashboardNav: {
    hi: 'नियोक्ता हब',
    en: 'Hirer Hub',
  },
  adminDashboardNav: {
    hi: 'एडमिन हब',
    en: 'Admin Hub',
  },

  // Production Logout Modal
  logoutModalTitle: {
    hi: 'क्या आप लॉग आउट करना चाहते हैं?',
    en: 'Sign out of SHRAMIKK?',
  },
  logoutModalDesc: {
    hi: 'आपका सत्र सुरक्षित रूप से समाप्त हो जाएगा। कार्य जारी रखने के लिए आप कभी भी पुनः साइन इन कर सकते हैं।',
    en: 'Your active session will be securely ended. You can sign back in anytime to continue.',
  },
  logoutCancelBtn: {
    hi: 'रद्द करें (Cancel)',
    en: 'Cancel',
  },
  logoutConfirmBtn: {
    hi: 'सुरक्षित लॉग आउट (Sign Out)',
    en: 'Sign Out',
  },

  // Unified Single Sign-In / Register Page
  authPageHeaderTitle: {
    hi: 'SHRAMIKK में आपका स्वागत है',
    en: 'Welcome to SHRAMIKK',
  },
  authPageHeaderSub: {
    hi: 'लेबर चौक से डिजिटल पहचान तक — भारत का विश्वसनीय कामगार नेटवर्क',
    en: 'From Labour Chowk to Digital Identity — India\'s trusted blue-collar work network',
  },
  authTabSignIn: {
    hi: 'साइन इन (Sign In)',
    en: 'Sign In',
  },
  authTabRegister: {
    hi: 'नया खाता बनाएं (Create Account)',
    en: 'Create Account',
  },
  authShowcaseBadge: {
    hi: 'प्रोजेक्ट शोकेस • 1-क्लिक त्वरित लॉगिन',
    en: 'Project Showcase • 1-Click Fast Login',
  },
  authShowcaseDemo: {
    hi: 'डेमो क्रेडेंशियल्स',
    en: 'Demo Credentials',
  },
  authWorkerBadge: {
    hi: 'कामगार',
    en: 'Worker',
  },
  authHirerBadge: {
    hi: 'ठेकेदार',
    en: 'Contractor',
  },
  authAdminBadge: {
    hi: 'एडमिन',
    en: 'Admin',
  },
  authFastLoginBtn: {
    hi: 'लॉगिन करें →',
    en: 'Sign In →',
  },
  authFastAdminBtn: {
    hi: 'पोर्टल खोलें →',
    en: 'Open Portal →',
  },
  authUserLoginTab: {
    hi: 'यूज़र लॉगिन (कामगार / ठेकेदार)',
    en: 'User Login (Worker / Contractor)',
  },
  authAdminTab: {
    hi: 'एडमिन पोर्टल (Admin Portal)',
    en: 'Admin Portal',
  },
  authEmailOrMobileLabel: {
    hi: 'ईमेल पता या मोबाइल नंबर',
    en: 'Email Address or Mobile Number',
  },
  authAdminEmailLabel: {
    hi: 'एडमिन ईमेल पता',
    en: 'Admin Email Address',
  },
  authPasswordLabel: {
    hi: 'पासवर्ड',
    en: 'Password',
  },
  authSignInBtn: {
    hi: 'साइन इन करें',
    en: 'Sign In',
  },
  authAuthenticating: {
    hi: 'सत्यापन हो रहा है...',
    en: 'Authenticating...',
  },
  authNeedAccountPrompt: {
    hi: 'नया खाता बनाना चाहते हैं?',
    en: 'Need a new account?',
  },
  authCreateAccountLink: {
    hi: 'यहाँ नया खाता बनाएं →',
    en: 'Create an account here →',
  },
  authAlreadyHaveAccountPrompt: {
    hi: 'पहले से पंजीकृत खाता है?',
    en: 'Already have an account?',
  },
  authSignInLink: {
    hi: 'यहाँ साइन इन करें →',
    en: 'Sign In here →',
  },
  authSelectRoleLabel: {
    hi: 'अपनी भूमिका चुनें',
    en: 'Select Your Role',
  },
  authWorkerRoleDesc: {
    hi: 'राजमिस्त्री, पेंटर, हेल्पर आदि',
    en: 'Mason, Painter, Helper, etc.',
  },
  authHirerRoleDesc: {
    hi: 'ठेकेदार, बिल्डर या मकान मालिक',
    en: 'Contractor, Builder or Homeowner',
  },
  authFullNameLabel: {
    hi: 'पूरा नाम *',
    en: 'Full Name *',
  },
  authTradeSkillLabel: {
    hi: 'मुख्य ट्रेड कौशल *',
    en: 'Primary Trade Skill *',
  },
  authBusinessCompanyLabel: {
    hi: 'व्यवसाय / कंपनी श्रेणी *',
    en: 'Business / Contractor Type *',
  },
  authCityLabel: {
    hi: 'शहर / जिला *',
    en: 'City / District *',
  },
  authCreatePasswordLabel: {
    hi: 'पासवर्ड बनाएं (कम से कम 6 अक्षर) *',
    en: 'Password (min 6 characters) *',
  },
  authRegisterSubmitBtn: {
    hi: 'पंजीकरण पूरा करें',
    en: 'Complete Registration',
  },
  authCreatingAccount: {
    hi: 'खाता बनाया जा रहा है...',
    en: 'Creating Account...',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('shramikk_lang') as Language;
      if (saved === 'hi' || saved === 'en') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'en';
  });

  useEffect(() => {
    try {
      document.documentElement.lang = language;
      localStorage.setItem('shramikk_lang', language);
      document.cookie = `shramikk_lang=${language}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore
    }
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem('shramikk_lang', lang);
      document.cookie = `shramikk_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = lang;
    } catch {
      // ignore
    }
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[key]) {
      const val = translations[key][language];
      if (val) return val;
      const enVal = translations[key]['en'];
      if (enVal) return enVal;
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
