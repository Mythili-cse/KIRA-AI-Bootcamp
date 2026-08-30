import React from 'react';
import { DISHES } from '../../data/mockData';
import { useCravioStore } from '../../store/useCravioStore';
import { Flame, Heart, Plus, Clock, Eye } from 'lucide-react';
import { RatingBadge } from '../common/RatingBadge';
import { DietaryBadge } from '../common/DietaryBadge';
import { motion } from 'framer-motion';

interface TrendingDishesProps {
  onNavigate: (path: string) => void;
}

export const TrendingDishes: React.FC<TrendingDishesProps> = ({ onNavigate }) => {
  const openDishModal = useCravioStore(s => s.openDishModal);
  const addToCart = useCravioStore(s => s.addToCart);
  const favoriteDishIds = useCravioStore(s => s.favoriteDishIds);
  const toggleFavoriteDish = useCravioStore(s => s.toggleFavoriteDish);

  const trendingDishes = DISHES.filter(d => d.trending).slice(0, 4);

  return (
    <section className="py-20 bg-cravio-darkBg text-white border-t border-cravio-borderDark/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cravio-borderDark/60 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest border border-red-500/20 mb-2">
              <Flame className="w-3.5 h-3.5 text-cravio-accent animate-pulse" />
              <span>Real-Time Virality</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white">
              Trending right now
            </h2>
            <p className="text-sm text-cravio-mutedLight font-light mt-1">
              The dishes everyone is talking about across the city right now.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/discover')}
            className="px-6 py-2.5 rounded-full border border-white/20 hover:border-cravio-accent text-white hover:text-cravio-accent font-medium text-xs tracking-wider uppercase transition-all shrink-0"
          >
            Explore All Dishes
          </button>
        </div>

        {/* Trending Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingDishes.map((dish, idx) => {
            const isFav = favoriteDishIds.includes(dish.id);

            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-cravio-darkCard rounded-3xl overflow-hidden border border-cravio-borderDark shadow-xl hover:border-cravio-accent/50 transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden cursor-pointer" onClick={() => openDishModal(dish)}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cravio-darkCard via-transparent to-black/40" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <DietaryBadge isVegetarian={dish.isVegetarian} isVegan={dish.isVegan} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteDish(dish.id);
                      }}
                      className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all border border-white/10"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-cravio-accent text-cravio-accent' : ''}`} />
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <RatingBadge rating={dish.rating} reviewsCount={dish.reviewsCount} />
                    <div className="flex items-center gap-1 text-[11px] text-amber-300 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
                      <Clock className="w-3 h-3" />
                      <span>{dish.preparationTimeMinutes}m</span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-cravio-accent uppercase tracking-wider">
                      {dish.cuisine}
                    </span>
                    <h3
                      onClick={() => openDishModal(dish)}
                      className="font-serif text-lg font-bold text-white group-hover:text-amber-200 transition-colors cursor-pointer line-clamp-1"
                    >
                      {dish.name}
                    </h3>
                    <p className="text-xs text-cravio-mutedLight">By {dish.restaurantName}</p>
                  </div>

                  <div className="pt-2 border-t border-cravio-borderDark/60 flex items-center justify-between">
                    <span className="font-serif text-xl font-bold text-cravio-accent">
                      ₹{dish.price}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openDishModal(dish)}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => addToCart(dish)}
                        className="px-3 py-2 rounded-xl bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-md transition-transform hover:scale-105"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
