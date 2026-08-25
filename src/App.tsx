import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { CurriculumSection } from './components/home/CurriculumSection';
import { BenefitsSection } from './components/home/BenefitsSection';
import { JourneyRoadmap } from './components/home/JourneyRoadmap';
import { ProjectsShowcase } from './components/home/ProjectsShowcase';
import { CertificatePreview } from './components/home/CertificatePreview';
import { ContactSection } from './components/home/ContactSection';
import { BrochureView } from './components/home/BrochureView';
import { EnrollmentModal } from './components/modals/EnrollmentModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isBrochureMode, setIsBrochureMode] = useState<boolean>(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState<boolean>(false);

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    if (isBrochureMode) {
      setIsBrochureMode(false);
    }
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleBrochureMode = () => {
    setIsBrochureMode(!isBrochureMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 relative">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenEnrollment={() => setIsEnrollmentOpen(true)}
        isBrochureMode={isBrochureMode}
        onToggleBrochureMode={handleToggleBrochureMode}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isBrochureMode ? (
          <BrochureView
            onOpenEnrollment={() => setIsEnrollmentOpen(true)}
            onToggleBrochureMode={handleToggleBrochureMode}
          />
        ) : (
          <div className="space-y-0">
            {/* Overview / Hero Page */}
            <div id="overview">
              <HeroSection
                onOpenEnrollment={() => setIsEnrollmentOpen(true)}
                onSelectTab={handleSelectTab}
                onToggleBrochureMode={handleToggleBrochureMode}
              />
            </div>

            {/* Curriculum Breakdown */}
            <div id="curriculum">
              <CurriculumSection onOpenEnrollment={() => setIsEnrollmentOpen(true)} />
            </div>

            {/* Key Benefits */}
            <div id="benefits">
              <BenefitsSection onOpenEnrollment={() => setIsEnrollmentOpen(true)} />
            </div>

            {/* Learning Journey Roadmap */}
            <div id="journey">
              <JourneyRoadmap onOpenEnrollment={() => setIsEnrollmentOpen(true)} />
            </div>

            {/* Capstone Projects Showcase */}
            <div id="projects">
              <ProjectsShowcase onOpenEnrollment={() => setIsEnrollmentOpen(true)} />
            </div>

            {/* Certificate Preview */}
            <div id="certificate">
              <CertificatePreview onOpenEnrollment={() => setIsEnrollmentOpen(true)} />
            </div>

            {/* Pricing anchor */}
            <div id="pricing">
              <div className="py-12 bg-slate-950 border-t border-b border-amber-500/20 text-center">
                <div className="max-w-4xl mx-auto px-4 space-y-4">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-slate-900 border border-amber-500/30 px-3 py-1 rounded-full">
                    SPECIAL FEE OFFER
                  </span>
                  <h2 className="text-3xl font-display font-extrabold text-white">
                    Unlock All 6 Modules & 4 Projects for <span className="gold-text">₹309</span>
                  </h2>
                  <p className="text-slate-300 text-sm">
                    One-time payment • Lifetime access • Verified Certificate • Discord Community
                  </p>
                  <button
                    onClick={() => setIsEnrollmentOpen(true)}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/25 hover:scale-105 transition-transform"
                  >
                    RESERVE YOUR SEAT NOW FOR ₹309
                  </button>
                </div>
              </div>
            </div>

            {/* Contact & FAQs */}
            <div id="contact">
              <ContactSection onOpenEnrollment={() => setIsEnrollmentOpen(true)} />
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenEnrollment={() => setIsEnrollmentOpen(true)}
      />

      {/* Enrollment Checkout Modal */}
      <EnrollmentModal
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
      />
    </div>
  );
};

export default App;
