import React from 'react';
import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, reviewsCount, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 space-x-1',
    md: 'text-xs px-2.5 py-1 space-x-1.5',
    lg: 'text-sm px-3 py-1.5 space-x-2',
  }[size];

  return (
    <div className={`inline-flex items-center font-medium bg-cravio-darkBg text-amber-300 rounded-full border border-amber-500/20 shadow-sm ${sizeClasses}`}>
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <span className="font-semibold text-white">{rating.toFixed(1)}</span>
      {reviewsCount !== undefined && (
        <span className="text-cravio-mutedLight text-[11px] font-normal">({reviewsCount})</span>
      )}
    </div>
  );
};
