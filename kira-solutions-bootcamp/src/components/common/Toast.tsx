import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCravioStore } from '../../store/useCravioStore';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const toastMessage = useCravioStore(s => s.toastMessage);

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex items-center gap-3 bg-cravio-darkBg text-white px-5 py-3.5 rounded-2xl border border-cravio-borderDark shadow-cravio-dark text-sm font-medium"
        >
          <div className="w-7 h-7 rounded-xl bg-cravio-accent/20 flex items-center justify-center text-cravio-accent">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
