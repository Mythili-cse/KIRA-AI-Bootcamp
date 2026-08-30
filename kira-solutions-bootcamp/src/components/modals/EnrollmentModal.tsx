import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Smartphone, 
  Lock, 
  Sparkles, 
  ArrowRight,
  Download,
  Copy,
  Zap
} from 'lucide-react';
import { KiraLogo } from '../common/KiraLogo';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: 'Beginner (No prior coding)'
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'qr' | 'card'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [enrollmentId, setEnrollmentId] = useState('');

  if (!isOpen) return null;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setStep('payment');
  };

  const handleSimulatePayment = () => {
    const randomId = 'KIRA-' + Math.floor(100000 + Math.random() * 900000);
    setEnrollmentId(randomId);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-950 border-2 border-amber-400/80 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-amber-400 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-amber-500/20 via-slate-950 to-indigo-500/20 border-b border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>KIRA SOLUTIONS AI BUILDER BOOTCAMP</span>
          </div>
          <h2 className="text-2xl font-display font-extrabold text-white">
            {step === 'details' && 'Student Seat Reservation'}
            {step === 'payment' && 'Complete ₹399 Payment'}
            {step === 'success' && 'Enrollment Confirmed!'}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300">One-Time Fee:</span>
            <span className="text-lg font-black text-amber-400">₹399</span>
            <span className="text-[10px] text-slate-400 line-through">₹999</span>
            <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.5 rounded">SAVE 69%</span>
          </div>
        </div>

        {/* Step 1: Student Details */}
        {step === 'details' && (
          <form onSubmit={handleNextToPayment} className="p-6 space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 uppercase">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Mythili L"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-semibold focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-300 uppercase">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. 7695924618"
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-semibold focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 uppercase">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-semibold focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 uppercase">Experience Level</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-semibold focus:outline-none focus:border-amber-400 text-sm"
              >
                <option>Beginner (No prior coding experience)</option>
                <option>Intermediate (Basic Python / Web knowledge)</option>
                <option>Advanced (Developer looking for GenAI skills)</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-amber-500/20 text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>What's included in ₹399:</span>
              </div>
              <p className="text-[11px] text-slate-400">
                All 6 Curriculum Modules, 4 Capstone Code Projects, Verified Certificate of Completion & Lifetime Access.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
            >
              <span>PROCEED TO PAYMENT (₹399)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: Payment Simulator */}
        {step === 'payment' && (
          <div className="p-6 space-y-5 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[11px]">Enrolling Student:</span>
                <div className="font-bold text-white text-sm">{formData.name} ({formData.phone})</div>
              </div>
              <button
                onClick={() => setStep('details')}
                className="text-amber-400 underline font-semibold text-[11px]"
              >
                Edit Details
              </button>
            </div>

            {/* Payment Method Switcher */}
            <div>
              <label className="font-bold text-slate-300 uppercase block mb-2">Select Payment Method:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="font-bold text-[11px]">Instant UPI</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'qr'
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span className="font-bold text-[11px]">Scan QR Code</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-bold text-[11px]">Credit / Debit</span>
                </button>
              </div>
            </div>

            {/* UPI Option */}
            {paymentMethod === 'upi' && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="font-bold text-slate-300">Choose your UPI App:</div>
                <div className="flex gap-3">
                  {['gpay', 'phonepe', 'paytm'].map((app) => (
                    <button
                      key={app}
                      onClick={() => setUpiApp(app as any)}
                      className={`flex-1 py-2 px-3 rounded-xl border font-bold uppercase text-[11px] ${
                        upiApp === app
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {app}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-400">
                  Click Pay to simulate instant UPI transfer of <strong>₹399</strong> to KIRA SOLUTIONS Official UPI Merchant.
                </div>
              </div>
            )}

            {/* QR Option */}
            {paymentMethod === 'qr' && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
                <div className="max-w-[260px] sm:max-w-[280px] mx-auto bg-white p-2 rounded-2xl border-2 border-amber-400/80 shadow-lg flex items-center justify-center">
                  <img
                    src="/payment-qr.jpg"
                    alt="Scan QR code to pay ₹399"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
                <div className="text-xs text-amber-300 font-bold">
                  Scan the QR code to complete your payment
                </div>
              </div>
            )}

            <button
              onClick={handleSimulatePayment}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
            >
              <Lock className="w-4 h-4" />
              <span>PAY ₹399 & CONFIRM ENROLLMENT</span>
            </button>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-display font-extrabold text-white">
                Congratulations, {formData.name}!
              </h3>
              <p className="text-xs text-slate-300">
                Your seat in the <strong className="text-amber-400">KIRA SOLUTIONS AI Builder Bootcamp</strong> is successfully reserved!
              </p>
            </div>

            {/* Confirmation Ticket Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/40 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <KiraLogo variant="light" size="sm" showTagline={false} />
                <span className="font-mono text-amber-400 font-bold">{enrollmentId}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div>
                  <span className="text-slate-400 text-[10px] block">Student Name:</span>
                  <strong className="text-white">{formData.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Phone / WhatsApp:</span>
                  <strong className="text-white">{formData.phone}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Amount Paid:</span>
                  <strong className="text-emerald-400 font-bold">₹399 (Confirmed)</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Access Status:</span>
                  <strong className="text-amber-300">Instant Pass Active</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-bold text-xs hover:border-amber-400"
              >
                Done
              </button>

              <button
                onClick={() => window.print()}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Save Receipt</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
