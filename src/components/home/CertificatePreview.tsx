import React, { useState } from 'react';
import { Award, CheckCircle, Download, Sparkles, ShieldCheck, Share2 } from 'lucide-react';
import { KiraLogo } from '../common/KiraLogo';

interface CertificatePreviewProps {
  onOpenEnrollment: () => void;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({ onOpenEnrollment }) => {
  const [studentName, setStudentName] = useState('Alex Morgan');
  const [certificateId] = useState('KIRA-AI-2026-88492');

  return (
    <section id="certificate" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            <span>CERTIFICATE OF COMPLETION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Earn Your Verified <br />
            <span className="gold-text">KIRA STUDIO AI Builder Certificate</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Boost your LinkedIn profile, resume, and portfolio with a digitally verifiable credential recognized across tech teams.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Customizer Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/30 shadow-xl space-y-4">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Test Live Certificate Generator:</span>
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Type Your Full Name:
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your name..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-amber-500/40 text-white font-semibold text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Unique Verifiable Credential ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>LinkedIn One-Click Credential Add</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Gold Foil Embossed Digital Seal</span>
                </div>
              </div>

              <button
                onClick={onOpenEnrollment}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform"
              >
                EARN THIS CERTIFICATE FOR ₹399
              </button>
            </div>
          </div>

          {/* Right Live Interactive Certificate Render Card */}
          <div className="lg:col-span-8">
            <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl shadow-amber-500/20 text-slate-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100/10 via-slate-950 to-black overflow-hidden">
              
              {/* Luxury Certificate Inner Border Container */}
              <div className="p-8 border-2 border-amber-400/40 rounded-2xl bg-white text-slate-950 shadow-2xl relative space-y-6 text-center">
                
                {/* Certificate Top Header */}
                <div className="flex flex-col items-center justify-center space-y-2 border-b border-amber-200 pb-6">
                  <KiraLogo variant="dark" size="lg" />
                  <div className="text-[11px] font-mono font-bold tracking-widest text-amber-700 uppercase mt-2">
                    OFFICIAL CERTIFICATE OF ACCOMPLISHMENT
                  </div>
                </div>

                {/* Certificate Main Text */}
                <div className="space-y-4 py-4">
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-500">
                    THIS CERTIFIES THAT
                  </p>

                  <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 border-b-2 border-amber-400/60 pb-2 inline-block px-8 min-w-[280px]">
                    {studentName.trim() || 'Your Name Here'}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto">
                    has successfully completed the intensive <strong>KIRA STUDIO AI BUILDER BOOTCAMP</strong> mastering AI Fundamentals, Model Training & Fine-Tuning, Generative AI, RAG Systems, and Full-Stack Cloud App Deployment.
                  </p>
                </div>

                {/* Certificate Bottom Signatures & Seal */}
                <div className="pt-6 border-t border-amber-200 grid grid-cols-3 items-end text-left text-xs">
                  <div>
                    <div className="font-brand font-bold text-slate-900 text-sm italic">
                      KIRA STUDIO Academic Director
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                      Authorized Signature
                    </div>
                  </div>

                  {/* Gold Ribbon Seal Emblem */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-lg shadow-amber-500/30 flex items-center justify-center">
                      <div className="w-full h-full rounded-full border-2 border-dashed border-amber-950 flex flex-col items-center justify-center text-amber-950 font-bold text-[9px] uppercase tracking-tighter">
                        <Award className="w-6 h-6 text-slate-950" />
                        <span>KIRA SEAL</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-xs text-amber-800">
                      ID: {certificateId}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">
                      Verified Credential
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
