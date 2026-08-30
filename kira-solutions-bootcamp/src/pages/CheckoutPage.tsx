import React, { useState } from 'react';
import { useCravioStore } from '../store/useCravioStore';
import { MapPin, CreditCard, Smartphone, Banknote, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const cart = useCravioStore(s => s.cart);
  const user = useCravioStore(s => s.user);
  const placeOrder = useCravioStore(s => s.placeOrder);

  const [selectedAddressId, setSelectedAddressId] = useState(user.addresses[0]?.id || 'addr-1');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const deliveryFee = subtotal > 600 ? 0 : 40;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax + deliveryFee;

  const selectedAddress = user.addresses.find(a => a.id === selectedAddressId) || user.addresses[0];

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const addressString = `${selectedAddress.street}, ${selectedAddress.city}`;
    const paymentLabel = paymentMethod === 'upi' ? 'UPI / GPay' : paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery';
    
    placeOrder(addressString, paymentLabel);
    onNavigate('/profile');
  };

  return (
    <div className="pt-28 pb-24 bg-cravio-bg text-cravio-charcoal min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cravio-accent/10 text-cravio-accent text-xs font-semibold uppercase tracking-widest border border-cravio-accent/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure Checkout</span>
          </div>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-cravio-charcoal">
            Complete Your Craving Order
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Body */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Delivery Address */}
            <div className="p-6 rounded-3xl bg-cravio-card border border-cravio-border shadow-cravio space-y-4">
              <div className="flex items-center gap-2 font-serif text-xl font-bold text-cravio-charcoal">
                <MapPin className="w-5 h-5 text-cravio-accent" />
                <h3>1. Delivery Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {user.addresses.map(addr => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedAddressId === addr.id
                        ? 'bg-cravio-accent/10 border-cravio-accent shadow-sm'
                        : 'bg-cravio-bg border-cravio-border hover:bg-cravio-cream'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs uppercase tracking-wider text-cravio-accent">{addr.label}</span>
                      {selectedAddressId === addr.id && <CheckCircle2 className="w-4 h-4 text-cravio-accent" />}
                    </div>
                    <p className="text-xs text-cravio-charcoal font-medium">{addr.street}</p>
                    <p className="text-[11px] text-cravio-muted">{addr.city}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="p-6 rounded-3xl bg-cravio-card border border-cravio-border shadow-cravio space-y-4">
              <div className="flex items-center gap-2 font-serif text-xl font-bold text-cravio-charcoal">
                <CreditCard className="w-5 h-5 text-cravio-accent" />
                <h3>2. Payment Method</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-left text-xs font-semibold flex flex-col gap-2 transition-all ${
                    paymentMethod === 'upi' ? 'bg-cravio-accent/10 border-cravio-accent text-cravio-accent' : 'bg-cravio-bg border-cravio-border text-cravio-muted'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span>UPI / Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left text-xs font-semibold flex flex-col gap-2 transition-all ${
                    paymentMethod === 'card' ? 'bg-cravio-accent/10 border-cravio-accent text-cravio-accent' : 'bg-cravio-bg border-cravio-border text-cravio-muted'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border text-left text-xs font-semibold flex flex-col gap-2 transition-all ${
                    paymentMethod === 'cod' ? 'bg-cravio-accent/10 border-cravio-accent text-cravio-accent' : 'bg-cravio-bg border-cravio-border text-cravio-muted'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span>Cash on Delivery</span>
                </button>
              </div>
            </div>

            {/* Step 3: Special Delivery Instructions */}
            <div className="p-6 rounded-3xl bg-cravio-card border border-cravio-border shadow-cravio space-y-3">
              <h4 className="font-serif text-lg font-bold text-cravio-charcoal">Delivery Instructions</h4>
              <input
                type="text"
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                placeholder="e.g., Leave with security gate, ring bell twice..."
                className="w-full bg-cravio-bg border border-cravio-border rounded-xl px-4 py-3 text-xs text-cravio-charcoal placeholder-cravio-muted focus:outline-none focus:border-cravio-accent"
              />
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-cravio-darkBg text-white border border-cravio-borderDark shadow-2xl space-y-5">
              <h3 className="font-serif text-xl font-bold text-amber-100 pb-3 border-b border-cravio-borderDark">
                Final Order Summary
              </h3>

              <div className="space-y-2 text-xs text-cravio-mutedLight">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Taxes</span>
                  <span className="text-white font-medium">₹{tax}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-white font-medium">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="pt-3 border-t border-cravio-borderDark flex justify-between text-base font-bold text-white">
                  <span>Total Payable</span>
                  <span className="font-serif text-2xl text-cravio-accent">₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cravio-accent/30 transition-transform active:scale-98"
              >
                <span>Place Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
