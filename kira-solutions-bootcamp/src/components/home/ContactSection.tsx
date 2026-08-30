import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Send, CheckCircle2, ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';

interface ContactSectionProps {
  onOpenEnrollment: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenEnrollment }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  const faqs = [
    {
      q: 'What is the total fee for the AI Builder Bootcamp?',
      a: 'The total fee is a one-time payment of ₹399. There are zero hidden charges or recurring subscriptions. You get full access to all 6 modules, 4 capstone projects, starter code, and verified certificate.'
    },
    {
      q: 'Do I need prior coding or AI experience?',
      a: 'No prior experience is required! The bootcamp starts from absolute zero fundamentals, guiding you step-by-step through Python setup, tools, and modern GenAI building blocks.'
    },
    {
      q: 'How do I receive my Certificate of Completion?',
      a: 'Upon completing the 4 capstone project deliverables, your verified KIRA SOLUTIONS AI Builder Certificate will be digitally issued with a unique verification serial number.'
    },
    {
      q: 'What tools and software will I use?',
      a: 'You will work with Python, PyTorch, TensorFlow, Scikit-Learn, OpenAI API, LangChain, Pinecone vector database, Streamlit, and Vercel cloud hosting.'
    },
    {
      q: 'How can I reach support if I have questions?',
      a: 'You can directly contact us via Phone/WhatsApp at 7695924618, Email at officialkirastudio@gmail.com, or Instagram @kiraofficialsolutions.'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>CONNECT WITH US</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
            Have Questions? <br />
            <span className="gold-text">Get In Touch With KIRA SOLUTIONS</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            We are here to support your AI learning journey every step of the way.
          </p>
        </div>

        {/* Contact Cards Row matching exact details from reference poster image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Phone Card */}
          <a
            href="tel:7695924618"
            className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-400 transition-all duration-300 shadow-xl flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                PHONE SUPPORT
              </span>
              <span className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                7695924618
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Call or WhatsApp anytime</span>
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:officialkirastudio@gmail.com"
            className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-400 transition-all duration-300 shadow-xl flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Mail className="w-7 h-7" />
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                OFFICIAL EMAIL
              </span>
              <span className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors truncate block">
                officialkirastudio@gmail.com
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">24/7 Desk Reply</span>
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href="https://instagram.com/kiraofficialsolutions"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-400 transition-all duration-300 shadow-xl flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
              <InstagramIcon className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                INSTAGRAM
              </span>
              <span className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                kiraofficialsolutions
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Follow for AI tutorials</span>
            </div>
          </a>

        </div>

        {/* Inquiry Form & FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Inquiry Form Column */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-2xl space-y-6">
              <div>
                <h3 className="text-2xl font-display font-extrabold text-white">
                  Send Us a Direct Message
                </h3>
                <p className="text-slate-300 text-xs mt-1">
                  Have a specific question about syllabus or enrollment? Fill out the form below.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-center space-y-2 animate-fadeIn">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-extrabold text-lg">Thank You! Message Received</h4>
                  <p className="text-xs text-slate-300">
                    Our team will get back to you via Phone/WhatsApp shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Your Full Name:</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase">Phone Number:</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 7695924618"
                        className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-400 uppercase">Email Address:</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@gmail.com"
                        className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase">Your Query / Message:</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ask any question about the ₹399 AI Builder Bootcamp..."
                      className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right FAQ Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all ${
                      isOpen ? 'bg-slate-900 border-amber-400 shadow-lg' : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-bold text-sm text-white flex items-center justify-between gap-4"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
