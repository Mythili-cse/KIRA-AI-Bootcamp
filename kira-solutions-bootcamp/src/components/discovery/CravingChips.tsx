import React from 'react';
import { CRAVING_CATEGORIES } from '../../data/mockData';
import { motion } from 'framer-motion';

interface CravingChipsProps {
  activeCraving: string | null;
  onSelectCraving: (cravingId: string | null) => void;
}

export const CravingChips: React.FC<CravingChipsProps> = ({ activeCraving, onSelectCraving }) => {
  return (
    <div className="w-full flex items-center justify-center gap-2 sm:gap-3 flex-wrap pt-2">
      <button
        onClick={() => onSelectCraving(null)}
        className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm ${
          activeCraving === null
            ? 'bg-cravio-accent text-white shadow-glow'
            : 'bg-white/10 hover:bg-white/20 text-cravio-cream/90 border border-white/15'
        }`}
      >
        ✨ All Cravings
      </button>

      {CRAVING_CATEGORIES.map(cat => {
        const isSelected = activeCraving === cat.id;

        return (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCraving(isSelected ? null : cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all shadow-sm ${
              isSelected
                ? 'bg-cravio-accent text-white shadow-glow border border-amber-400/40'
                : 'bg-white/10 hover:bg-white/20 text-cravio-cream/90 border border-white/15 backdrop-blur-sm'
            }`}
          >
            <span className="text-base">{cat.emoji}</span>
            <span>{cat.name.split(' ')[0]}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
