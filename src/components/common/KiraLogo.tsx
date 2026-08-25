import React from 'react';

interface KiraLogoProps {
  variant?: 'light' | 'dark' | 'full-gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const KiraLogo: React.FC<KiraLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', studio: 'text-[9px]', tagline: 'text-[7px]' },
    md: { icon: 'w-10 h-10', text: 'text-2xl', studio: 'text-[11px]', tagline: 'text-[9px]' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl', studio: 'text-[13px]', tagline: 'text-[11px]' },
    xl: { icon: 'w-20 h-20', text: 'text-5xl', studio: 'text-[16px]', tagline: 'text-[13px]' },
  }[size];

  const textColor = variant === 'light' ? 'text-white' : variant === 'full-gold' ? 'gold-text' : 'text-slate-900';
  const studioColor = variant === 'light' ? 'text-amber-400' : 'text-amber-600';
  const taglineColor = variant === 'light' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Gold Backlit Emblem Icon matching reference image 2 */}
      <div className={`relative flex items-center justify-center ${sizeClasses.icon} shrink-0 group`}>
        {/* Soft Warm Gold Backlight Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/60 via-yellow-400/80 to-amber-300/40 rounded-xl blur-md group-hover:blur-lg transition-all duration-300 transform group-hover:scale-110" />
        
        {/* Dark Metallic Icon Container */}
        <div className="relative w-full h-full bg-slate-950 rounded-xl border border-amber-400/40 flex items-center justify-center shadow-lg overflow-hidden">
          {/* Subtle Metallic Gradient Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black" />
          
          {/* Custom SVG Monogram Emblem representing KIRA STUDIO (KR mark) */}
          <svg className="relative w-3/4 h-3/4 text-amber-400 drop-shadow-[0_2px_8px_rgba(212,175,55,0.8)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left curved wing of K */}
            <path 
              d="M 28 20 C 45 20 48 38 32 50 C 48 62 45 80 28 20 C 40 70 38 56 30 50 C 38 44 40 30 28 20 Z" 
              fill="url(#goldGrad)" 
            />
            {/* Right R stem and leg */}
            <path 
              d="M 52 20 H 76 C 88 20 88 44 74 44 H 52 V 20 Z M 52 50 H 68 L 84 80 H 68 L 54 54 H 52 V 50 Z" 
              fill="url(#goldGrad)" 
            />
            {/* Gold SVG Gradients */}
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE8A3" />
                <stop offset="45%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#996515" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-display font-extrabold tracking-widest ${sizeClasses.text} ${textColor}`}>
            KIRA
          </span>
          <div className="flex flex-col justify-center">
            <span className={`font-brand font-semibold tracking-[0.25em] uppercase ${sizeClasses.studio} ${studioColor} border-y border-amber-500/30 px-1.5 py-0.5`}>
              STUDIO
            </span>
          </div>
        </div>
        {showTagline && (
          <span className={`font-sans font-semibold tracking-[0.2em] uppercase ${sizeClasses.tagline} ${taglineColor} mt-0.5`}>
            LEARN • BUILD • EARN • GROW
          </span>
        )}
      </div>
    </div>
  );
};
