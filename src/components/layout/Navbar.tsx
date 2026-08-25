import React, { useState, useEffect } from 'react';
import { KiraLogo } from '../common/KiraLogo';
import { 
  Sparkles, 
  BookOpen, 
  Compass, 
  Briefcase, 
  Award, 
  Tag, 
  Phone, 
  Menu, 
  X, 
  FileText,
  ChevronRight,
  Zap
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenEnrollment: () => void;
  isBrochureMode: boolean;
  onToggleBrochureMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenEnrollment,
  isBrochureMode,
  onToggleBrochureMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'curriculum', label: 'What You’ll Learn', icon: BookOpen },
    { id: 'journey', label: 'Learning Journey', icon: Compass },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'certificate', label: 'Certificate', icon: Award },
    { id: 'pricing', label: 'Fee (₹309)', icon: Tag },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20 shadow-xl py-3' 
        : 'bg-slate-950 border-b border-amber-500/15 py-4'
    }`}>
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-inner">
        <Zap className="w-3.5 h-3.5 fill-slate-950 animate-bounce" />
        <span>SPECIAL AI BOOTCAMP OFFER: ENROLL TODAY FOR ONLY <span className="underline font-extrabold text-slate-950">₹309 ONE-TIME PAYMENT</span>!</span>
        <span className="hidden md:inline-block bg-slate-950 text-amber-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ml-1">Limited Seats</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between mt-1">
        {/* Brand Logo */}
        <div 
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleNavClick('overview')}
        >
          <KiraLogo variant="light" size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-amber-500/20 backdrop-blur-md">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !isBrochureMode;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400/80'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Brochure View Switcher Button */}
          <button
            onClick={onToggleBrochureMode}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isBrochureMode 
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/30'
                : 'bg-slate-900 text-amber-300 border-amber-500/30 hover:border-amber-400 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{isBrochureMode ? 'Web App View' : 'Brochure View'}</span>
          </button>

          {/* Main CTA Button: Enroll Now */}
          <button
            onClick={onOpenEnrollment}
            className="group relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>ENROLL NOW</span>
              <span className="bg-slate-950 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-extrabold">₹309</span>
            </span>
            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenEnrollment}
            className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs shadow"
          >
            ₹309 ENROLL
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[88px] bg-slate-950/95 backdrop-blur-xl border-b border-amber-500/30 shadow-2xl p-6 transition-all">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id && !isBrochureMode;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-200 bg-slate-900/60 border border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  onToggleBrochureMode();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-semibold text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>{isBrochureMode ? 'Switch to Interactive Web View' : 'Switch to Printable Brochure View'}</span>
              </button>

              <button
                onClick={() => {
                  onOpenEnrollment();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/30"
              >
                <span>ENROLL NOW FOR ₹309</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
