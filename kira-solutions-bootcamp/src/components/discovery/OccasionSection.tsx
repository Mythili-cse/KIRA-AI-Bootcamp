import React from 'react';
import { OCCASIONS } from '../../data/mockData';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface OccasionSectionProps {
  onNavigate: (path: string) => void;
}

export const OccasionSection: React.FC<OccasionSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-cravio-bg text-cravio-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cravio-border pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-cravio-accent font-bold">
              Curated Moments
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-cravio-charcoal mt-1">
              Where are you eating today?
            </h2>
          </div>
          <p className="text-sm text-cravio-muted font-light max-w-md">
            Whether it’s a romantic candlelit date night or a solo quiet comfort meal, discover handpicked dining environments.
          </p>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2">
          {OCCASIONS.map((occ, idx) => (
            <motion.div
              key={occ.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => onNavigate(`/discover?occasion=${occ.slug}`)}
              className="flex-none w-72 sm:w-80 h-96 rounded-3xl overflow-hidden relative cursor-pointer group shadow-cravio hover:shadow-cravio-hover transition-all duration-500 border border-cravio-border/60"
            >
              {/* Background Image */}
              <img
                src={occ.image}
                alt={occ.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-semibold uppercase tracking-wider border border-white/20">
                  {occ.badge}
                </span>
              </div>

              {/* Card Footer Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-white z-10 space-y-2">
                <h3 className="font-serif text-2xl font-bold tracking-wide group-hover:text-amber-200 transition-colors">
                  {occ.name}
                </h3>
                <p className="text-xs text-cravio-cream/80 font-light line-clamp-2 leading-relaxed">
                  {occ.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs text-cravio-accent font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Explore Dining Picks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
