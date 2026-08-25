import React, { useState } from 'react';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { CravingChips } from '../discovery/CravingChips';

interface CinematicHeroProps {
  onNavigate: (path: string) => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onNavigate }) => {
  const [prompt, setPrompt] = useState('');
  const [activeCravingChip, setActiveCravingChip] = useState<string | null>(null);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      onNavigate('/discover');
      return;
    }
    onNavigate(`/discover?q=${encodeURIComponent(prompt)}`);
  };

  const handleSelectChip = (cravingId: string | null) => {
    setActiveCravingChip(cravingId);
    if (cravingId) {
      onNavigate(`/discover?craving=${cravingId}`);
    } else {
      onNavigate('/discover');
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-cravio-darkBg pt-24 pb-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
          poster="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="/videos/cravio-food-hero.mp4" type="video/mp4" />
        </video>

        {/* Sophisticated Editorial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cravio-darkBg via-cravio-darkBg/60 to-black/70" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 my-auto">
        
        {/* Brand Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-200 text-xs font-semibold uppercase tracking-widest"
        >
          <Sparkles className="w-3.5 h-3.5 text-cravio-accent animate-pulse" />
          <span>Discover food by craving, mood & moment</span>
        </motion.div>

        {/* Headlines */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none">
            What are you <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-cravio-cream to-cravio-accent">craving?</span>
          </h1>

          <p className="text-base sm:text-xl text-cravio-mutedLight font-light max-w-xl mx-auto leading-relaxed">
            Tell CRAVIO what you're in the mood for. We'll find the food that fits.
          </p>
        </div>

        {/* AI Craving Input Bar */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center bg-cravio-darkCard/90 backdrop-blur-xl border border-white/25 rounded-full p-2 shadow-2xl focus-within:border-cravio-accent focus-within:ring-2 focus-within:ring-cravio-accent/30 transition-all">
              <div className="flex items-center gap-1.5 px-4 text-xs font-bold text-amber-300 uppercase tracking-widest shrink-0 border-r border-white/15">
                <Sparkles className="w-4 h-4 text-cravio-accent" />
                <span>✦ CRAVIO AI</span>
              </div>

              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="“Something spicy and crispy…”"
                className="w-full bg-transparent px-4 py-3 text-sm sm:text-base text-white placeholder-cravio-mutedLight focus:outline-none"
              />

              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0"
              >
                <span>Discover</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Craving Chips Below Input */}
          <div className="mt-6">
            <CravingChips activeCraving={activeCravingChip} onSelectCraving={handleSelectChip} />
          </div>
        </div>

      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 text-center">
        <button
          onClick={() => onNavigate('/discover')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cravio-mutedLight hover:text-white transition-colors"
        >
          <Compass className="w-4 h-4 text-cravio-accent" />
          <span>Explore All Visual Collections</span>
        </button>
      </div>
    </section>
  );
};
