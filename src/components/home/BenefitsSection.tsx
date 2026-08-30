import React from 'react';
import { 
  Award, 
  Target, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  CheckCircle, 
  Sparkles,
  Zap,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface BenefitsSectionProps {
  onOpenEnrollment: () => void;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ onOpenEnrollment }) => {
  const benefits = [
    {
      icon: Target,
      title: 'HANDS-ON LEARNING',
      subtitle: 'Practical projects & real datasets',
      description: 'Gain real engineering experience by building working AI scripts, fine-tuning neural networks, and handling noisy real-world data.',
      highlight: '100% Practical Code',
      iconBg: 'bg-amber-500/10 text-amber-500 border-amber-500/30'
    },
    {
      icon: Award,
      title: 'CERTIFICATE OF COMPLETION',
      subtitle: 'Earn a certificate to boost your profile',
      description: 'Receive a digitally verified KIRA STUDIO AI Builder Certificate to share on LinkedIn, your portfolio, and resume for recruiters.',
      highlight: 'Shareable & Verified',
      iconBg: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30'
    },
    {
      icon: Users,
      title: 'BEGINNER FRIENDLY',
      subtitle: 'No prior AI experience? We’ve got you!',
      description: 'Designed from zero assumptions. We guide you step-by-step through math, Python setup, and prompt engineering without confusing jargon.',
      highlight: 'Zero Coding Required to Start',
      iconBg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
    },
    {
      icon: Lightbulb,
      title: 'REAL-WORLD PROJECTS',
      subtitle: 'Build projects that make an impact',
      description: 'Create 4 flagship portfolio projects — from RAG customer bots to GenAI studio apps — that solve real business and consumer problems.',
      highlight: '4 Full-Stack Capstones',
      iconBg: 'bg-purple-500/10 text-purple-500 border-purple-500/30'
    },
    {
      icon: TrendingUp,
      title: 'BUILD • INNOVATE • GROW',
      subtitle: 'Transform your ideas into intelligent solutions',
      description: 'Unlock the confidence to launch your own AI products, automate workflows, or advance your tech career in the booming AI economy.',
      highlight: 'Career & Business Growth',
      iconBg: 'bg-blue-500/10 text-blue-500 border-blue-500/30'
    },
    {
      icon: Clock,
      title: 'LIFETIME ACCESS',
      subtitle: 'Learn at your pace with full resources',
      description: 'Get lifetime access to video walkthroughs, starter repositories, cheat sheets, prompt template packs, and future curriculum updates.',
      highlight: 'Continuous Updates',
      iconBg: 'bg-pink-500/10 text-pink-500 border-pink-500/30'
    }
  ];

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>BOOTCAMP HIGHLIGHTS & BENEFITS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Why Choose KIRA STUDIO <br />
            <span className="gold-text">AI Builder Masterclass?</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            We focus on practical execution over boring theory. Learn by building real AI applications from scratch.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 hover:bg-slate-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${item.iconBg} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-amber-300">
                      {item.highlight}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-extrabold text-xl text-white group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400/90 mt-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-800 flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Included in ₹399 Bootcamp Pass</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-indigo-500/20 border-2 border-amber-400/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest">
              <Zap className="w-4 h-4" />
              <span>PRACTICAL • HANDS-ON • PROJECT BASED</span>
            </div>
            <h3 className="text-2xl font-display font-extrabold text-white">
              Enroll Now & Start Building The Future!
            </h3>
            <p className="text-slate-300 text-sm">
              Join thousands of creators turning ideas into intelligent solutions.
            </p>
          </div>

          <button
            onClick={onOpenEnrollment}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:scale-105 transition-transform"
          >
            CLAIM YOUR ₹399 SEAT NOW
          </button>
        </div>

      </div>
    </section>
  );
};
