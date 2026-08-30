import React from 'react';
import { DISHES } from '../../data/mockData';
import { useCravioStore } from '../../store/useCravioStore';
import { Sparkles, Award, ArrowUpRight, Plus, Heart } from 'lucide-react';
import { RatingBadge } from '../common/RatingBadge';
import { motion } from 'framer-motion';

interface CravioPicksSectionProps {
  onNavigate: (path: string) => void;
}

export const CravioPicksSection: React.FC<CravioPicksSectionProps> = ({ onNavigate }) => {
  const openDishModal = useCravioStore(s => s.openDishModal);
  const addToCart = useCravioStore(s => s.addToCart);

  const cravioPicks = DISHES.filter(d => d.featured).slice(0, 3);

  return (
    <section className="py-20 bg-cravio-cream/70 text-cravio-charcoal border-t border-cravio-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cravio-border pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cravio-charcoal/10 text-cravio-charcoal text-xs font-bold uppercase tracking-widest border border-cravio-charcoal/20 mb-2">
              <Award className="w-3.5 h-3.5 text-cravio-accent" />
              <span>Editorial Curation</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-cravio-charcoal">
              CRAVIO picks
            </h2>
            <p className="text-sm text-cravio-muted font-light mt-1">
              Hand-selected signature creations curated by our chief culinary editors.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/discover')}
            className="px-6 py-2.5 rounded-full border border-cravio-charcoal/20 hover:border-cravio-accent text-cravio-charcoal hover:text-cravio-accent font-medium text-xs tracking-wider uppercase transition-all shrink-0"
          >
            Full Selection
          </button>
        </div>

        {/* Editorial Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cravioPicks.map((dish, idx) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-cravio-card rounded-3xl overflow-hidden border border-cravio-border shadow-cravio hover:shadow-cravio-hover transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => openDishModal(dish)}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-cravio-accent text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    ✦ Editor's Choice
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <RatingBadge rating={dish.rating} reviewsCount={dish.reviewsCount} />
                  <span className="text-xs font-bold text-amber-300">₹{dish.price}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-cravio-accent uppercase tracking-wider">
                    {dish.cuisine} • {dish.category}
                  </span>
                  <h3
                    onClick={() => openDishModal(dish)}
                    className="font-serif text-2xl font-bold text-cravio-charcoal group-hover:text-cravio-accent transition-colors cursor-pointer"
                  >
                    {dish.name}
                  </h3>
                  <p className="text-xs text-cravio-muted font-light line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-cravio-border/60 flex items-center justify-between">
                  <span className="text-xs text-cravio-muted font-semibold">
                    By {dish.restaurantName}
                  </span>
                  <button
                    onClick={() => addToCart(dish)}
                    className="px-4 py-2 rounded-xl bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-md transition-transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Order Now</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
