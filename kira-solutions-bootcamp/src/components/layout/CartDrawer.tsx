import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCravioStore } from '../../store/useCravioStore';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Utensils } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const isCartOpen = useCravioStore(s => s.isCartOpen);
  const toggleCartDrawer = useCravioStore(s => s.toggleCartDrawer);
  const cart = useCravioStore(s => s.cart);
  const removeFromCart = useCravioStore(s => s.removeFromCart);
  const updateCartItemQuantity = useCravioStore(s => s.updateCartItemQuantity);

  const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const deliveryFee = subtotal > 600 ? 0 : 40;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax + deliveryFee;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleCartDrawer(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-cravio-darkBg text-white border-l border-cravio-borderDark shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-cravio-borderDark flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cravio-accent/20 border border-cravio-accent/40 flex items-center justify-center text-cravio-accent">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold tracking-wide">Your Craving Basket</h3>
                  <p className="text-xs text-cravio-mutedLight">
                    {cart.length === 0 ? 'Empty basket' : `${cart.length} dish items selected`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleCartDrawer(false)}
                className="p-2 rounded-full hover:bg-white/10 text-cravio-mutedLight hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cravio-muted">
                    <Utensils className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-semibold">Your basket is empty</h4>
                  <p className="text-xs text-cravio-mutedLight max-w-xs leading-relaxed">
                    Browse our curated restaurants and signature dishes to satisfy your cravings.
                  </p>
                  <button
                    onClick={() => {
                      toggleCartDrawer(false);
                      onNavigate('/discover');
                    }}
                    className="px-5 py-2.5 rounded-full bg-cravio-accent hover:bg-cravio-accentHover text-white text-xs font-semibold tracking-wide transition-all shadow-md"
                  >
                    Explore Food Discovery
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/5 border border-cravio-borderDark/60 flex gap-3.5 relative group"
                  >
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-sm text-amber-100 truncate pr-2">
                            {item.dish.name}
                          </h5>
                          <span className="text-[11px] text-cravio-mutedLight block">
                            {item.dish.restaurantName}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-cravio-mutedLight hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Badges */}
                      {Object.keys(item.selectedCustomizations).length > 0 && (
                        <div className="flex flex-wrap gap-1 my-1.5">
                          {Object.entries(item.selectedCustomizations).map(([key, val]) => (
                            <span key={key} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-amber-300">
                              {val}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <span className="font-serif font-bold text-sm text-cravio-accent">
                          ₹{item.itemTotal}
                        </span>

                        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1 border border-white/10 text-xs">
                          <button
                            onClick={() => updateCartItemQuantity(item.id, -1)}
                            className="p-0.5 hover:text-cravio-accent"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartItemQuantity(item.id, 1)}
                            className="p-0.5 hover:text-cravio-accent"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-cravio-borderDark bg-cravio-darkCard/90 space-y-3">
                <div className="space-y-1.5 text-xs text-cravio-mutedLight">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated GST & Taxes</span>
                    <span className="text-white font-medium">₹{tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-white font-medium">
                      {deliveryFee === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-cravio-borderDark flex justify-between text-sm font-bold text-white">
                    <span>Total</span>
                    <span className="font-serif text-lg text-cravio-accent">₹{total}</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      toggleCartDrawer(false);
                      onNavigate('/cart');
                    }}
                    className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                  >
                    View Basket
                  </button>
                  <button
                    onClick={() => {
                      toggleCartDrawer(false);
                      onNavigate('/checkout');
                    }}
                    className="flex-[2] py-3 rounded-xl bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-cravio-accent/30 transition-transform active:scale-98"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
