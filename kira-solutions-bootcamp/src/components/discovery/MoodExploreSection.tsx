import React from 'react';
import { OCCASIONS } from '../../data/mockData';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface MoodExploreSectionProps {
  onNavigate: (path: string) => void;
}

export const MoodExploreSection: React.FC<MoodExploreSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-cravio-darkBg text-white border-t border-cravio-borderDark/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cravio-borderDark/60 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-widest border border-amber-500/20 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cravio-accent" />
              <span>Tailored Experiences</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
              Explore by mood
            </h2>
            <p className="text-sm text-cravio-mutedLight font-light mt-1">
              Curated dining moments designed around your atmosphere, company & cravings.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/discover')}
            className="px-6 py-2.5 rounded-full border border-white/20 hover:border-cravio-accent text-white hover:text-cravio-accent font-medium text-xs tracking-wider uppercase transition-all shrink-0"
          >
            All Moments
          </button>
        </div>

        {/* Mood Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OCCASIONS.map((occ, idx) => (
            <motion.div
              key={occ.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => onNavigate(`/discover?occasion=${occ.slug}`)}
              className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer border border-white/10 shadow-2xl"
            >
              {/* Background Image */}
              <img
                src={occ.image}
                alt={occ.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cravio-darkBg via-black/40 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-[10px] font-bold uppercase tracking-widest border border-white/20">
                  {occ.badge}
                </span>
              </div>

              {/* Card Footer Content */}
              <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                <h3 className="font-serif text-2xl font-bold group-hover:text-amber-200 transition-colors">
                  {occ.name}
                </h3>
                <p className="text-xs text-cravio-mutedLight font-light line-clamp-2">
                  {occ.tagline}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-cravio-accent uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Explore Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
