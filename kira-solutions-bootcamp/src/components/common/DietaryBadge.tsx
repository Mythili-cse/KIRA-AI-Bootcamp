import React from 'react';

interface DietaryBadgeProps {
  isVegetarian: boolean;
  isVegan?: boolean;
}

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({ isVegetarian, isVegan }) => {
  if (isVegan) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
        VEGAN
      </span>
    );
  }

  if (isVegetarian) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-2 h-2 rounded-full border border-emerald-600 flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-emerald-600"></span>
        </span>
        VEG
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300">
      <span className="w-2 h-2 rounded-full border border-red-600 flex items-center justify-center">
        <span className="w-1 h-1 rounded-full bg-red-600"></span>
      </span>
      NON-VEG
    </span>
  );
};
