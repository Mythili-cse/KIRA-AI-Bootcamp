import React, { useState } from 'react';
import { useCravioStore } from '../store/useCravioStore';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Utensils } from 'lucide-react';

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const cart = useCravioStore(s => s.cart);
  const removeFromCart = useCravioStore(s => s.removeFromCart);
  const updateCartItemQuantity = useCravioStore(s => s.updateCartItemQuantity);

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const deliveryFee = subtotal > 600 ? 0 : 40;
  const tax = Math.round(subtotal * 0.08);
  const total = Math.max(0, subtotal + tax + deliveryFee - appliedDiscount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CRAVIO100') {
      setAppliedDiscount(100);
      setPromoError('');
    } else if (promoCode.trim().toUpperCase() === 'FIRSTCRAVE') {
      setAppliedDiscount(Math.round(subtotal * 0.2));
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try CRAVIO100 or FIRSTCRAVE');
    }
  };

  return (
    <div className="pt-28 pb-24 bg-cravio-bg text-cravio-charcoal min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cravio-accent/10 text-cravio-accent text-xs font-semibold uppercase tracking-widest border border-cravio-accent/20">
            <ShoppingBag className="w-4 h-4" />
            <span>Shopping Cart</span>
          </div>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-cravio-charcoal">
            Review Your Craving Basket
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-cravio-card rounded-3xl border border-cravio-border shadow-cravio max-w-lg mx-auto p-8">
            <Utensils className="w-12 h-12 text-cravio-muted mx-auto" />
            <h3 className="font-serif text-2xl font-bold">Your basket is empty</h3>
            <p className="text-xs text-cravio-muted leading-relaxed font-light">
              Add dishes from our curated restaurant menus to start your order.
            </p>
            <button
              onClick={() => onNavigate('/discover')}
              className="px-6 py-3 rounded-full bg-cravio-accent text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
            >
              Explore Food Discovery
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="p-5 rounded-3xl bg-cravio-card border border-cravio-border shadow-cravio flex gap-4 items-center">
                  <img src={item.dish.image} alt={item.dish.name} className="w-24 h-24 rounded-2xl object-cover" />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif font-bold text-lg text-cravio-charcoal truncate">{item.dish.name}</h4>
                        <span className="text-xs text-cravio-muted font-medium">{item.dish.restaurantName}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-cravio-muted hover:text-red-500 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="font-serif text-xl font-bold text-cravio-accent">₹{item.itemTotal}</span>

                      <div className="flex items-center gap-3 bg-cravio-cream border border-cravio-border rounded-xl px-3 py-1 text-sm font-bold">
                        <button onClick={() => updateCartItemQuantity(item.id, -1)} className="hover:text-cravio-accent">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartItemQuantity(item.id, 1)} className="hover:text-cravio-accent">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-cravio-darkBg text-white border border-cravio-borderDark shadow-2xl space-y-5">
                <h3 className="font-serif text-xl font-bold text-amber-100 pb-3 border-b border-cravio-borderDark">
                  Order Breakdown
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo code (e.g. CRAVIO100)"
                      className="flex-1 bg-white/5 border border-cravio-borderDark rounded-xl px-3 py-2 text-xs text-white placeholder-cravio-mutedLight focus:outline-none"
                    />
                    <button type="submit" className="px-4 py-2 bg-cravio-accent rounded-xl text-xs font-bold uppercase text-white hover:bg-cravio-accentHover">
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[11px] text-red-400">{promoError}</p>}
                  {appliedDiscount > 0 && <p className="text-[11px] text-emerald-400 font-semibold">Promo Applied! Savings: ₹{appliedDiscount}</p>}
                </form>

                <div className="space-y-2 text-xs text-cravio-mutedLight pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (8%)</span>
                    <span className="text-white font-medium">₹{tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-white font-medium">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Promo Discount</span>
                      <span>-₹{appliedDiscount}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-cravio-borderDark flex justify-between text-base font-bold text-white">
                    <span>Total Amount</span>
                    <span className="font-serif text-2xl text-cravio-accent">₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('/checkout')}
                  className="w-full py-4 rounded-2xl bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cravio-accent/30 transition-transform active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
