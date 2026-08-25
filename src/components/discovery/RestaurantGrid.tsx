import React from 'react';
import { RESTAURANTS } from '../../data/mockData';
import { RatingBadge } from '../common/RatingBadge';
import { useCravioStore } from '../../store/useCravioStore';
import { MapPin, Utensils, Heart, ArrowUpRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface RestaurantGridProps {
  onNavigate: (path: string) => void;
}

export const RestaurantGrid: React.FC<RestaurantGridProps> = ({ onNavigate }) => {
  const favoriteRestaurantIds = useCravioStore(s => s.favoriteRestaurantIds);
  const toggleFavoriteRestaurant = useCravioStore(s => s.toggleFavoriteRestaurant);

  const featuredRestaurants = RESTAURANTS.filter(r => r.featured).slice(0, 6);

  return (
    <section className="py-20 bg-cravio-darkBg text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-cravio-borderDark gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-amber-300 font-bold">
              Artisanal Destinations
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white mt-1">
              Places Worth Discovering
            </h2>
          </div>

          <button
            onClick={() => onNavigate('/restaurants')}
            className="px-6 py-2.5 rounded-full border border-white/20 hover:border-amber-400 text-white hover:text-amber-300 font-medium text-xs tracking-wider uppercase transition-all shrink-0"
          >
            Explore All Restaurants ({RESTAURANTS.length})
          </button>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRestaurants.map((rest, idx) => {
            const isFav = favoriteRestaurantIds.includes(rest.id);

            return (
              <motion.div
                key={rest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => onNavigate(`/restaurants/${rest.id}`)}
                className="bg-cravio-darkCard rounded-3xl overflow-hidden border border-cravio-borderDark/60 shadow-2xl flex flex-col group cursor-pointer hover:border-amber-500/40 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={rest.coverImage}
                    alt={rest.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cravio-darkCard via-transparent to-black/40" />

                  {/* Status & Favorite */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold uppercase tracking-wider">
                      ● Open Now
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteRestaurant(rest.id);
                      }}
                      className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all border border-white/10"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-cravio-accent text-cravio-accent' : ''}`} />
                    </button>
                  </div>

                  {/* Price & Location Floating Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <RatingBadge rating={rest.rating} reviewsCount={rest.reviewsCount} />

                    <div className="flex items-center gap-2 text-cravio-mutedLight font-medium">
                      <span className="text-amber-300 font-bold">{rest.priceRange}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cravio-accent" />
                        {rest.distanceKm} km
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {rest.cuisine.map((c, i) => (
                        <span key={i} className="text-[11px] uppercase tracking-wider text-amber-200/80 font-medium">
                          {c}{i < rest.cuisine.length - 1 ? ' • ' : ''}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                      {rest.name}
                    </h3>

                    <p className="text-xs text-cravio-mutedLight font-light line-clamp-2 leading-relaxed">
                      {rest.description}
                    </p>
                  </div>

                  {/* Signature Dish Callout */}
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      <Award className="w-3.5 h-3.5" />
                      <span>Signature Dish</span>
                    </div>
                    <p className="text-xs text-amber-100 font-medium line-clamp-1">
                      {rest.signatureDish}
                    </p>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="pt-2 flex items-center justify-between text-xs border-t border-cravio-borderDark/60">
                    <span className="text-cravio-mutedLight flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5 text-cravio-accent" />
                      {rest.dineInAvailable ? 'Dine-In & Delivery' : 'Delivery Only'}
                    </span>

                    <span className="font-semibold text-cravio-accent group-hover:translate-x-1 transition-transform flex items-center gap-1 uppercase tracking-wider text-[11px]">
                      View Restaurant
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
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
