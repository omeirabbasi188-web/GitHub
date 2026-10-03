import React from 'react';
import { useSeo, NavigationTab } from '../../context/SeoContext';
import { PublicNavbar } from './PublicNavbar';
import { PublicFooter } from './PublicFooter';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';

export const PublicWebsiteView: React.FC = () => {
  const { activeTab, setActiveTab } = useSeo();

  const renderCurrentPublicPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={setActiveTab} />;
      case 'features':
        return <FeaturesPage onNavigate={setActiveTab} />;
      case 'how-it-works':
        return <HowItWorksPage onNavigate={setActiveTab} />;
      case 'pricing':
        return <PricingPage onNavigate={setActiveTab} />;
      case 'about':
        return <AboutPage onNavigate={setActiveTab} />;
      case 'contact':
        return <ContactPage onNavigate={setActiveTab} />;
      case 'login':
        return <LoginPage onNavigate={setActiveTab} />;
      case 'signup':
        return <SignUpPage onNavigate={setActiveTab} />;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* 3-Zone Top Bar Navbar */}
      <PublicNavbar currentPage={activeTab} onNavigate={setActiveTab} />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPublicPage()}
      </main>

      {/* Footer */}
      <PublicFooter onNavigate={setActiveTab} />
    </div>
  );
};
