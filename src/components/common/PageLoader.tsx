import React from 'react';
import { HardHat } from 'lucide-react';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0B132B] shadow-lg animate-pulse">
        <HardHat className="w-7 h-7 text-amber-400 stroke-[2.2]" />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <span className="text-sm font-bold text-[#0B132B] tracking-wide uppercase">
          SHRAMIKK
        </span>
        <span className="text-xs text-slate-500 font-medium">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default PageLoader;
