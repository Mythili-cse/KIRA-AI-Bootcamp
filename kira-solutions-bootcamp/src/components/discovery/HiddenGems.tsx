import React from 'react';
import { RESTAURANTS } from '../../data/mockData';
import { RatingBadge } from '../common/RatingBadge';
import { Sparkles, MapPin, Award, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface HiddenGemsProps {
  onNavigate: (path: string) => void;
}

export const HiddenGems: React.FC<HiddenGemsProps> = ({ onNavigate }) => {
  const hiddenGems = RESTAURANTS.filter(r => r.isHiddenGem || r.rating >= 4.8).slice(0, 3);

  return (
    <section className="py-20 bg-cravio-cream/70 text-cravio-charcoal relative overflow-hidden border-t border-cravio-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cravio-border pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-bold uppercase tracking-widest border border-amber-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Boutique Gastronomy</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-cravio-charcoal">
              Hidden Gems
            </h2>
            <p className="text-sm text-cravio-muted font-light mt-1">
              Under-the-radar artisanal kitchens and secret tasting tables recommended by CRAVIO AI.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/restaurants')}
            className="px-6 py-2.5 rounded-full border border-cravio-charcoal/20 hover:border-cravio-accent text-cravio-charcoal hover:text-cravio-accent font-medium text-xs tracking-wider uppercase transition-all shrink-0"
          >
            Explore All Kitchens
          </button>
        </div>

        {/* Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hiddenGems.map((rest, idx) => (
            <motion.div
              key={rest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => onNavigate(`/restaurants/${rest.id}`)}
              className="bg-cravio-card rounded-3xl overflow-hidden border border-cravio-border shadow-cravio hover:shadow-cravio-hover transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Cover Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={rest.coverImage}
                  alt={rest.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-cravio-darkBg text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    ✦ Hidden Gem
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <RatingBadge rating={rest.rating} reviewsCount={rest.reviewsCount} />
                  <span className="text-xs font-bold text-amber-300">{rest.priceRange}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-cravio-accent uppercase tracking-wider">
                    {rest.cuisine.join(' • ')}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-cravio-charcoal group-hover:text-cravio-accent transition-colors">
                    {rest.name}
                  </h3>

                  <p className="text-xs text-cravio-muted leading-relaxed font-light line-clamp-2">
                    {rest.description}
                  </p>
                </div>

                {/* Signature Dish Callout */}
                <div className="p-3 rounded-2xl bg-cravio-cream border border-cravio-border space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-cravio-accent tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    <span>Boutique Specialty</span>
                  </div>
                  <p className="text-xs font-bold text-cravio-charcoal line-clamp-1">
                    {rest.signatureDish}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-cravio-border/60 text-cravio-muted font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cravio-accent" />
                    {rest.location}
                  </span>

                  <span className="font-bold text-cravio-accent flex items-center gap-1 uppercase tracking-wider text-[11px] group-hover:translate-x-1 transition-transform">
                    Discover Menu
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
