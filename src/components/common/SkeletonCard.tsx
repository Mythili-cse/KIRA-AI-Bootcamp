import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-cravio-darkCard rounded-3xl overflow-hidden border border-cravio-borderDark/60 shadow-xl animate-pulse flex flex-col">
      <div className="h-60 bg-white/5 w-full" />
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-3 bg-white/10 rounded w-1/4" />
          <div className="h-6 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-white/5 rounded w-1/2" />
          <div className="h-3 bg-white/5 rounded w-full" />
        </div>
        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="h-6 bg-white/10 rounded w-1/3" />
          <div className="h-8 bg-white/10 rounded-xl w-1/4" />
        </div>
      </div>
    </div>
  );
};
