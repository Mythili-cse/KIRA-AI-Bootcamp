import React from 'react';
import { KiraLogo } from '../common/KiraLogo';
import { Phone, Mail, ArrowUp, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenEnrollment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenEnrollment }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-amber-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background AI Ambient Light Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <KiraLogo variant="light" size="lg" />
            <p className="text-slate-400 text-sm leading-relaxed mt-4">
              Empowering future creators to build, innovate, and grow with artificial intelligence. From curiosity to creation — build real-world AI applications that make an impact.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                AI Builder Cohort 2026
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-white font-bold text-base tracking-wider uppercase border-l-2 border-amber-400 pl-3">
              Bootcamp Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'overview', label: 'Bootcamp Overview' },
                { id: 'curriculum', label: 'What You’ll Learn' },
                { id: 'journey', label: 'Learning Journey Roadmap' },
                { id: 'projects', label: 'Capstone Projects' },
                { id: 'certificate', label: 'Earn Certificate' },
                { id: 'pricing', label: 'Enrollment Fee (₹399)' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onSelectTab(link.id)}
                    className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-2"
                  >
                    <span className="text-amber-500/60 text-xs">›</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Key Highlights */}
          <div className="space-y-4">
            <h3 className="font-display text-white font-bold text-base tracking-wider uppercase border-l-2 border-amber-400 pl-3">
              Why Join Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Beginner Friendly & Hands-On Learning</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Verified Certificate of Completion</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">Build 4 Real-World GenAI & ML Apps</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenEnrollment}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
              >
                RESERVE YOUR SEAT — ONLY ₹399
              </button>
            </div>
          </div>

          {/* Column 4: Contact & Social Info */}
          <div className="space-y-4">
            <h3 className="font-display text-white font-bold text-base tracking-wider uppercase border-l-2 border-amber-400 pl-3">
              Connect With Us
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href="tel:7695924618"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Phone Support</div>
                  <div className="font-bold text-sm">7695924618</div>
                </div>
              </a>

              <a
                href="mailto:officialkirastudio@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Official Email</div>
                  <div className="font-bold text-xs truncate max-w-[180px]">officialkirastudio@gmail.com</div>
                </div>
              </a>

              <a
                href="https://instagram.com/kiraofficialstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Instagram</div>
                  <div className="font-bold text-sm">kiraofficialstudio</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <span className="text-amber-400 font-bold">KIRA STUDIO</span>. All rights reserved. Learn • Build • Earn • Grow.
          </div>

          <div className="flex items-center gap-6">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
