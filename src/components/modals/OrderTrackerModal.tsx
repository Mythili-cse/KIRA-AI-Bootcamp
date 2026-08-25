import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCravioStore } from '../../store/useCravioStore';
import { X, CheckCircle, Clock, MapPin, ChefHat, Bike, ShieldCheck } from 'lucide-react';

export const OrderTrackerModal: React.FC = () => {
  const activeOrderTracker = useCravioStore(s => s.activeOrderTracker);
  const closeOrderTracker = useCravioStore(s => s.closeOrderTracker);

  if (!activeOrderTracker) return null;

  const order = activeOrderTracker;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeOrderTracker}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Tracker Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-cravio-darkBg text-white rounded-3xl overflow-hidden border border-cravio-borderDark shadow-2xl z-10 my-8 p-6 sm:p-8 space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={closeOrderTracker}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-cravio-mutedLight hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Live Order Tracker</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-white pt-2">
              Your craving is on its way.
            </h3>
            <p className="text-xs text-cravio-mutedLight">
              Order <span className="text-amber-200 font-mono font-bold">{order.id}</span> from{' '}
              <span className="text-white font-semibold">{order.restaurantName}</span>
            </p>
          </div>

          {/* Estimated Time Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cravio-accent/20 via-amber-500/10 to-transparent border border-cravio-accent/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cravio-accent flex items-center justify-center text-white">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-amber-200 uppercase tracking-wider block">Estimated Delivery</span>
                <span className="font-serif text-xl font-bold text-white">{order.estimatedDeliveryMinutes} Minutes</span>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white">
              Status: {order.status}
            </span>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-4 pt-2">
            <h4 className="font-serif text-sm font-semibold text-amber-100 uppercase tracking-wider">
              Preparation Timeline
            </h4>
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {order.trackingTimeline.map((step, idx) => (
                <div key={step.title} className="relative flex items-center justify-between text-xs">
                  <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.completed ? 'bg-cravio-accent text-white ring-4 ring-cravio-accent/20' : 'bg-cravio-darkCard border border-white/20 text-cravio-mutedLight'
                  }`}>
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <div>
                    <span className={`font-semibold ${step.completed ? 'text-white' : 'text-cravio-mutedLight'}`}>
                      {step.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-cravio-mutedLight">{step.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Items */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h5 className="text-xs font-semibold text-cravio-mutedLight uppercase tracking-wider">
              Ordered Dishes
            </h5>
            {order.items.map(item => (
              <div key={item.dishId} className="flex justify-between items-center text-xs">
                <span className="text-amber-100 font-medium">
                  {item.quantity}x {item.dishName}
                </span>
                <span className="font-serif text-cravio-accent font-bold">₹{item.unitPrice * item.quantity}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm font-bold text-white">
              <span>Total Amount Paid</span>
              <span className="font-serif text-cravio-accent text-lg">₹{order.total}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={closeOrderTracker}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
            >
              Close Live Tracker
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
