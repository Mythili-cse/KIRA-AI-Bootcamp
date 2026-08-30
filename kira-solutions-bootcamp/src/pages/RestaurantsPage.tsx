import React, { useState } from 'react';
import { RESTAURANTS } from '../data/mockData';
import { RatingBadge } from '../components/common/RatingBadge';
import { useCravioStore } from '../store/useCravioStore';
import { Store, MapPin, Heart, ArrowUpRight, Search, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface RestaurantsPageProps {
  onNavigate: (path: string) => void;
}

export const RestaurantsPage: React.FC<RestaurantsPageProps> = ({ onNavigate }) => {
  const favoriteRestaurantIds = useCravioStore(s => s.favoriteRestaurantIds);
  const toggleFavoriteRestaurant = useCravioStore(s => s.toggleFavoriteRestaurant);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'name'>('rating');

  const cuisinesList = ['All', 'Modern Indian', 'Italian', 'Asian', 'Japanese', 'South Indian', 'Healthy', 'French', 'Mexican', 'Mediterranean'];

  let filtered = RESTAURANTS.filter(rest => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = rest.name.toLowerCase().includes(q);
      const matchCuisine = rest.cuisine.some(c => c.toLowerCase().includes(q));
      const matchLoc = rest.location.toLowerCase().includes(q);
      if (!matchName && !matchCuisine && !matchLoc) return false;
    }

    if (selectedCuisine !== 'All' && !rest.cuisine.includes(selectedCuisine)) {
      return false;
    }

    return true;
  });

  if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'distance') {
    filtered.sort((a, b) => a.distanceKm - b.distanceKm);
  } else if (sortBy === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="pt-28 pb-24 bg-cravio-darkBg text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest border border-amber-500/30">
            <Store className="w-4 h-4" />
            <span>Curated Directory</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Discover Places Worth Eating At.
          </h1>

          <p className="text-sm text-cravio-mutedLight font-light leading-relaxed">
            From woodfired charcoal grills to hidden dim sum parlors, explore the city’s top culinary landmarks.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-cravio-darkCard rounded-3xl p-4 sm:p-6 border border-cravio-borderDark shadow-2xl mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-cravio-mutedLight absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by restaurant name, neighborhood, or cuisine..."
                className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 text-sm text-white placeholder-cravio-mutedLight focus:outline-none focus:border-amber-400"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 cursor-pointer w-full sm:w-auto"
            >
              <option value="rating" className="bg-cravio-darkBg">Sort: Highest Rated</option>
              <option value="distance" className="bg-cravio-darkBg">Sort: Nearest Distance</option>
              <option value="name" className="bg-cravio-darkBg">Sort: Alphabetical</option>
            </select>
          </div>

          {/* Cuisine Chips */}
          <div className="pt-2 border-t border-cravio-borderDark/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs text-cravio-mutedLight font-medium shrink-0">Cuisine:</span>
            {cuisinesList.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                  selectedCuisine === c ? 'bg-amber-400 text-cravio-darkBg font-bold' : 'bg-white/5 text-cravio-mutedLight hover:bg-white/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Counter */}
        <div className="mb-6 text-xs text-cravio-mutedLight">
          Showing {filtered.length} curated restaurants
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((rest, idx) => {
            const isFav = favoriteRestaurantIds.includes(rest.id);

            return (
              <motion.div
                key={rest.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onNavigate(`/restaurants/${rest.id}`)}
                className="bg-cravio-darkCard rounded-3xl overflow-hidden border border-cravio-borderDark/60 shadow-2xl flex flex-col group cursor-pointer hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={rest.coverImage}
                    alt={rest.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cravio-darkCard via-transparent to-black/40" />

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

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      <Award className="w-3.5 h-3.5" />
                      <span>Signature Dish</span>
                    </div>
                    <p className="text-xs text-amber-100 font-medium line-clamp-1">
                      {rest.signatureDish}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs border-t border-cravio-borderDark/60">
                    <span className="text-cravio-mutedLight">
                      {rest.location}
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
    </div>
  );
};
