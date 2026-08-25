import React from 'react';
import { KiraLogo } from '../common/KiraLogo';
import { 
  Brain, 
  Code, 
  Layers, 
  Sparkles, 
  Smartphone, 
  Rocket, 
  Target, 
  Award, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  Phone, 
  Mail, 
  Printer,
  Zap,
  Bot
} from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';

interface BrochureViewProps {
  onOpenEnrollment: () => void;
  onToggleBrochureMode: () => void;
}

export const BrochureView: React.FC<BrochureViewProps> = ({ onOpenEnrollment, onToggleBrochureMode }) => {
  return (
    <div className="bg-slate-950 text-white min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Floating Control Bar */}
      <div className="max-w-4xl mx-auto mb-6 no-print flex items-center justify-between bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>KIRA STUDIO Official Printable Digital Brochure</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={onToggleBrochureMode}
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow"
          >
            Back to Interactive App
          </button>
        </div>
      </div>

      {/* Brochure Sheet Outer Card matching exact reference poster layout */}
      <div className="max-w-4xl mx-auto bg-white text-slate-950 rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-amber-400 space-y-8 print:p-4 print:shadow-none print:border-2">
        
        {/* Top Header Banner matching poster */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-slate-900 pb-6">
          <KiraLogo variant="dark" size="lg" />

          <div className="text-center sm:text-right space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-amber-400 text-[11px] font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BUILD INTELLIGENCE. SOLVE REAL-WORLD PROBLEMS. CREATE THE FUTURE.</span>
            </div>
          </div>
        </div>

        {/* Hero Title & Price Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-2xl border-2 border-slate-200">
          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-950 tracking-tight leading-none">
                AI BUILDER <br />
                <span className="text-amber-600 uppercase">BOOTCAMP</span>
              </h1>
              <p className="text-lg font-bold text-indigo-900">
                From Curiosity to Creation — Build AI that Makes an Impact.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-amber-300 space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-slate-950 font-extrabold text-xs uppercase tracking-wider">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Learn. Experiment. Build.</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Unlock the power of AI tools, models, and frameworks to build intelligent applications & real-world solutions.
              </p>
            </div>
          </div>

          {/* Price Badge matching ₹309 fee */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-2 border-amber-400 shadow-xl text-center space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-400">
              SPECIAL FEE PASS
            </span>
            <div className="text-xs uppercase font-bold text-slate-300">ONLY</div>
            <div className="text-4xl font-black text-amber-400">₹309</div>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider">ONE-TIME PAYMENT</span>
            
            <button
              onClick={onOpenEnrollment}
              className="w-full mt-2 py-2 px-3 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs shadow hover:bg-amber-300 no-print"
            >
              ENROLL NOW
            </button>
          </div>
        </div>

        {/* WHAT YOU'LL LEARN Section matching reference poster grid */}
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-display font-extrabold text-slate-950 tracking-wider uppercase flex items-center justify-center gap-2">
              <span className="w-8 h-0.5 bg-amber-400" />
              <span>WHAT YOU’LL LEARN</span>
              <span className="w-8 h-0.5 bg-amber-400" />
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: Brain, title: 'AI FUNDAMENTALS', desc: 'Understand core concepts and how AI works.' },
              { icon: Code, title: 'TOOLS & FRAMEWORKS', desc: 'Work with Python, TensorFlow, PyTorch & more.' },
              { icon: Layers, title: 'MODEL BUILDING', desc: 'Train, fine-tune and evaluate machine learning models.' },
              { icon: Sparkles, title: 'LLMS & GENERATIVE AI', desc: 'Explore Large Language Models & prompt engineering.' },
              { icon: Smartphone, title: 'BUILD AI APPLICATIONS', desc: 'Create intelligent apps that solve real-world problems.' },
              { icon: Rocket, title: 'DEPLOY & SHOWCASE', desc: 'Deploy your models and showcase your AI projects.' },
            ].map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-indigo-900 text-amber-400 flex items-center justify-center shadow">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-xs text-slate-950">{m.title}</h3>
                  <p className="text-[11px] text-slate-600 leading-tight">{m.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* KEY HIGHLIGHTS / BENEFITS Section matching reference poster */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center border-t border-b border-slate-200 py-6">
          {[
            { icon: Target, title: 'HANDS-ON LEARNING', subtitle: 'Practical projects & real datasets.' },
            { icon: Award, title: 'CERTIFICATE OF COMPLETION', subtitle: 'Earn a certificate to boost your profile.' },
            { icon: Users, title: 'BEGINNER FRIENDLY', subtitle: 'No prior AI experience? We’ve got you!' },
            { icon: Lightbulb, title: 'REAL-WORLD PROJECTS', subtitle: 'Build projects that make an impact.' },
            { icon: TrendingUp, title: 'BUILD • INNOVATE • GROW', subtitle: 'Transform your ideas into intelligent solutions.' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-2 space-y-1 flex flex-col items-center">
                <Icon className="w-6 h-6 text-amber-600" />
                <h4 className="font-extrabold text-[11px] text-slate-950">{item.title}</h4>
                <p className="text-[10px] text-slate-600">{item.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CALL TO ACTION & CONTACT DETAILS matching reference poster */}
        <div className="bg-slate-950 text-white rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-display font-extrabold text-xl text-amber-400 uppercase">
                ENROLL NOW & START BUILDING THE FUTURE!
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                PRACTICAL • HANDS-ON • PROJECT BASED — Learn by building real AI applications from scratch.
              </p>
            </div>

            <button
              onClick={onOpenEnrollment}
              className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow-lg hover:bg-amber-300 no-print shrink-0"
            >
              ENROLL FOR ₹309
            </button>
          </div>

          {/* Contact Details Bar matching exact phone, email, instagram */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-3 text-center sm:text-left">
              CONNECT WITH US
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <a href="tel:7695924618" className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">PHONE</span>
                  <span className="font-extrabold">7695924618</span>
                </div>
              </a>

              <a href="mailto:officialkirastudio@gmail.com" className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="overflow-hidden">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">EMAIL</span>
                  <span className="font-extrabold truncate block">officialkirastudio@gmail.com</span>
                </div>
              </a>

              <a href="https://instagram.com/kiraofficialstudio" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                <InstagramIcon className="w-4 h-4 text-pink-400 shrink-0" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block">INSTAGRAM</span>
                  <span className="font-extrabold">kiraofficialstudio</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Ribbon */}
        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>KIRA STUDIO — LEARN • BUILD • EARN • GROW</span>
          <span>FEES: ₹309 ONE-TIME</span>
        </div>

      </div>
    </div>
  );
};
