import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserRole, Language, SkillCategory, WorkerGrade } from '../types';

export interface WorkerProfileData {
  fullName: string;
  phone?: string;
  email?: string;
  avatar: string;
  skills: SkillCategory[];
  experience: string;
  availability: 'now' | 'date' | 'working';
  availableDate?: string;
  city: string;
  locality: string;
  pincode?: string;
  dailyWageRate?: number;
  grade?: WorkerGrade;
}

export interface HirerProfileData {
  fullName: string;
  phone?: string;
  email?: string;
  hirerType: string;
  city: string;
  locality: string;
  companyName?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  email: string | null;
  mobile: string | null;
  role: UserRole | null;
  language: Language;
  workerProfile: WorkerProfileData | null;
  hirerProfile: HirerProfileData | null;
}

interface AuthContextType {
  auth: AuthState;
  loginWithEmail: (email: string) => void;
  loginWithMobile: (mobile: string) => void;
  verifyOtp: (otp: string) => boolean;
  setAuthLanguage: (lang: Language) => void;
  setAuthRole: (role: UserRole) => void;
  saveWorkerOnboarding: (data: WorkerProfileData) => void;
  saveHirerOnboarding: (data: HirerProfileData) => void;
  loginDirectly: (role: UserRole, email: string, name?: string) => void;
  registerUser: (data: {
    fullName: string;
    email: string;
    phone?: string;
    role: UserRole;
    skillOrCompany?: string;
    city?: string;
  }) => void;
  logout: () => void;
}

const DEMO_OTP = '123456';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('shramikk_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore fallback
      }
    }
    return {
      isAuthenticated: false,
      userId: null,
      email: null,
      mobile: null,
      role: null,
      language: 'en',
      workerProfile: null,
      hirerProfile: null,
    };
  });

  useEffect(() => {
    localStorage.setItem('shramikk_auth', JSON.stringify(auth));
  }, [auth]);

  const loginWithEmail = (email: string) => {
    setAuth((prev) => ({
      ...prev,
      email,
    }));
  };

  const loginWithMobile = (mobile: string) => {
    setAuth((prev) => ({
      ...prev,
      mobile,
    }));
  };

  const verifyOtp = (otp: string): boolean => {
    if (otp === DEMO_OTP || (otp.length === 6 && /^\d+$/.test(otp))) {
      const generatedId = `USR-${Date.now().toString().slice(-6)}`;
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: true,
        userId: prev.userId || generatedId,
      }));
      return true;
    }
    return false;
  };

  const setAuthLanguage = (lang: Language) => {
    setAuth((prev) => ({
      ...prev,
      language: lang,
    }));
  };

  const setAuthRole = (role: UserRole) => {
    setAuth((prev) => ({
      ...prev,
      role,
    }));
  };

  const saveWorkerOnboarding = (data: WorkerProfileData) => {
    setAuth((prev) => ({
      ...prev,
      role: 'worker',
      workerProfile: data,
    }));
  };

  const saveHirerOnboarding = (data: HirerProfileData) => {
    setAuth((prev) => ({
      ...prev,
      role: 'hirer',
      hirerProfile: data,
    }));
  };

  const loginDirectly = (role: UserRole, email: string, name?: string) => {
    if (role === 'worker') {
      const workerData: WorkerProfileData = {
        fullName: name || 'रमेश कुमार (Ramesh Kumar)',
        phone: '+91 98765 43210',
        email,
        avatar: '👷🏽‍♂️',
        skills: ['Mason / राजमिस्त्री', 'Tile Worker / टाइल मिस्त्री'],
        experience: '7 Years',
        availability: 'now',
        city: 'Ghaziabad',
        locality: 'Raj Nagar / Chowk',
        pincode: '201002',
        dailyWageRate: 1000,
        grade: 'A',
      };
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: true,
        userId: 'w-101',
        email,
        mobile: '9876543210',
        role: 'worker',
        workerProfile: workerData,
      }));
    } else if (role === 'hirer') {
      const hirerData: HirerProfileData = {
        fullName: name || 'अमित शर्मा (Amit Sharma)',
        phone: '+91 99333 11223',
        email,
        hirerType: 'सिविल ठेकेदार (Civil Contractor)',
        companyName: 'Sharma Civil Contractors',
        city: 'Ghaziabad',
        locality: 'Raj Nagar Extension',
      };
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: true,
        userId: 'h-201',
        email,
        mobile: '9933311223',
        role: 'hirer',
        hirerProfile: hirerData,
      }));
    } else if (role === 'admin') {
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: true,
        userId: 'adm-001',
        email,
        mobile: '9999000000',
        role: 'admin',
      }));
      localStorage.setItem('shramikk_admin_logged_in', 'true');
    }
  };

  const registerUser = (data: {
    fullName: string;
    email: string;
    phone?: string;
    role: UserRole;
    skillOrCompany?: string;
    city?: string;
  }) => {
    const generatedId = `USR-${Date.now().toString().slice(-6)}`;
    if (data.role === 'worker') {
      const newWorker: WorkerProfileData = {
        fullName: data.fullName,
        phone: data.phone || '+91 98765 00000',
        email: data.email,
        avatar: '👷🏽‍♂️',
        skills: [(data.skillOrCompany as SkillCategory) || 'Mason / राजमिस्त्री'],
        experience: '3–5 Years',
        availability: 'now',
        city: data.city || 'Delhi NCR',
        locality: 'Central Chowk',
        dailyWageRate: 900,
        grade: 'A',
      };
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: true,
        userId: generatedId,
        email: data.email,
        mobile: data.phone || null,
        role: 'worker',
        workerProfile: newWorker,
      }));
    } else if (data.role === 'hirer') {
      const newHirer: HirerProfileData = {
        fullName: data.fullName,
        phone: data.phone || '+91 98111 00000',
        email: data.email,
        hirerType: data.skillOrCompany || 'सिविल ठेकेदार (Civil Contractor)',
        companyName: data.skillOrCompany || 'Independent Contractor',
        city: data.city || 'Delhi NCR',
        locality: 'Main Sector',
      };
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: true,
        userId: generatedId,
        email: data.email,
        mobile: data.phone || null,
        role: 'hirer',
        hirerProfile: newHirer,
      }));
    } else {
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: true,
        userId: generatedId,
        email: data.email,
        mobile: data.phone || null,
        role: 'admin',
      }));
      localStorage.setItem('shramikk_admin_logged_in', 'true');
    }
  };

  const logout = () => {
    setAuth((prev) => ({
      isAuthenticated: false,
      userId: null,
      email: null,
      mobile: null,
      role: null,
      language: prev.language || 'en',
      workerProfile: null,
      hirerProfile: null,
    }));
    try {
      localStorage.removeItem('shramikk_auth');
      localStorage.removeItem('shramikk_token');
      localStorage.removeItem('shramikk_admin_logged_in');
      localStorage.removeItem('shramikk_user_session');
      sessionStorage.clear();
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        loginWithEmail,
        loginWithMobile,
        verifyOtp,
        setAuthLanguage,
        setAuthRole,
        saveWorkerOnboarding,
        saveHirerOnboarding,
        loginDirectly,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
