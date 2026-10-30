import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from '../components/landing/HeroSection';
import { StatisticsSection } from '../components/landing/StatisticsSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { WorkerDashboardPreview } from '../components/worker/WorkerDashboardPreview';
import { DualBenefitsSection } from '../components/landing/DualBenefitsSection';
import { AiSaathiHighlightSection } from '../components/landing/AiSaathiHighlightSection';
import { AboutMissionSection } from '../components/landing/AboutMissionSection';
import { FaqSection } from '../components/landing/FaqSection';
import { FinalCtaBanner } from '../components/landing/FinalCtaBanner';

export const HomePage: React.FC = () => {
  const location = useLocation();

  // Smooth scroll support when navigating via anchor hash (e.g. /#how-it-works or /#about)
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        // Small delay to ensure all DOM elements are mounted and laid out
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* 1. Hero Section with Dual CTAs */}
      <HeroSection />

      {/* 2. Key Metrics Statistics Strip */}
      <StatisticsSection />

      {/* 3. How It Works (Moved to Home Page with Dual Worker/Hirer Modes) */}
      <HowItWorksSection />

      {/* 4. Worker Dashboard Live Interactive Preview */}
      <WorkerDashboardPreview />

      {/* 5. Dual Benefits for Workers & Contractors */}
      <DualBenefitsSection />

      {/* 6. AI Saathi Feature Spotlight (Groq Powered) */}
      <AiSaathiHighlightSection />

      {/* 7. About Us & Core Mission (Moved to Home Page) */}
      <AboutMissionSection />

      {/* 8. Frequently Asked Questions (FAQ) */}
      <FaqSection />

      {/* 9. Final Call to Action */}
      <FinalCtaBanner />
    </div>
  );
};

export default HomePage;
