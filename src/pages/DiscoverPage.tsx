import React, { useState, useEffect } from 'react';
import { DISHES, CRAVING_CATEGORIES } from '../data/mockData';
import { Dish, RecommendationMatch } from '../types';
import { processNaturalLanguageCraving } from '../services/api';
import { useCravioStore } from '../store/useCravioStore';
import { RatingBadge } from '../components/common/RatingBadge';
import { DietaryBadge } from '../components/common/DietaryBadge';
import { Search, Compass, Heart, Plus, Clock, Sparkles, Filter, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiscoverPageProps {
  onNavigate: (path: string) => void;
  urlCraving?: string | null;
  urlOccasion?: string | null;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({ onNavigate, urlCraving, urlOccasion }) => {
  const openDishModal = useCravioStore(s => s.openDishModal);
  const addToCart = useCravioStore(s => s.addToCart);
  const favoriteDishIds = useCravioStore(s => s.favoriteDishIds);
  const toggleFavoriteDish = useCravioStore(s => s.toggleFavoriteDish);
  const globalSearchQuery = useCravioStore(s => s.searchQuery);

  const [searchTerm, setSearchTerm] = useState(globalSearchQuery || '');
  const [selectedCraving, setSelectedCraving] = useState<string | null>(urlCraving || null);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [dietFilter, setDietFilter] = useState<'All' | 'Veg' | 'NonVeg'>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'priceAsc' | 'priceDesc'>('recommended');

  useEffect(() => {
    if (urlCraving) setSelectedCraving(urlCraving);
  }, [urlCraving]);

  const cuisinesList = ['All', 'Modern Indian', 'Italian', 'Asian', 'Japanese', 'South Indian', 'Healthy', 'French', 'Mexican', 'Korean'];

  // AI-Powered Natural Language & Fallback Matching
  let aiMatches: RecommendationMatch[] = [];
  if (searchTerm.trim()) {
    aiMatches = processNaturalLanguageCraving(searchTerm);
  }

  let filteredDishes = DISHES.filter(dish => {
    // If AI match exists and active search query, check if dish in matches
    if (searchTerm.trim() && aiMatches.length > 0) {
      const matchFound = aiMatches.some(m => m.dish.id === dish.id);
      if (!matchFound) return false;
    }

    // Craving filter
    if (selectedCraving) {
      const crvCat = CRAVING_CATEGORIES.find(c => c.id === selectedCraving);
      if (crvCat) {
        const hasTag = dish.cravingTags.some(t => 
          t.toLowerCase() === crvCat.id || 
          t.toLowerCase().includes(crvCat.name.toLowerCase()) ||
          crvCat.synonyms.some(s => t.toLowerCase().includes(s))
        );
        if (!hasTag) return false;
      } else {
        const hasTag = dish.cravingTags.some(t => t.toLowerCase().includes(selectedCraving.toLowerCase()));
        if (!hasTag) return false;
      }
    }

    // Cuisine filter
    if (selectedCuisine !== 'All' && dish.cuisine !== selectedCuisine) {
      return false;
    }

    // Diet filter
    if (dietFilter === 'Veg' && !dish.isVegetarian) return false;
    if (dietFilter === 'NonVeg' && dish.isVegetarian) return false;

    return true;
  });

  // INTELLIGENT FALLBACK: If combined filters return 0, fall back to top CRAVIO recommendations!
  const isUsingFallback = filteredDishes.length === 0;
  if (isUsingFallback) {
    filteredDishes = DISHES.slice(0, 6);
  }

  // Sorting
  if (sortBy === 'rating') {
    filteredDishes.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'priceAsc') {
    filteredDishes.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceDesc') {
    filteredDishes.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="pt-28 pb-24 bg-cravio-darkBg text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest border border-amber-500/30">
            <Compass className="w-4 h-4" />
            <span>AI Food Marketplace</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Find Your Next Favorite Dish.
          </h1>

          <p className="text-sm text-cravio-mutedLight font-light leading-relaxed">
            Type your exact craving in plain English or select flavor filters below.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-cravio-darkCard rounded-3xl p-4 sm:p-6 border border-cravio-borderDark shadow-2xl mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-cravio-accent absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search natural cravings: e.g., spicy cheesy pasta, crispy wings..."
                className="w-full bg-white/5 border border-white/15 rounded-full pl-12 pr-4 py-3 text-sm text-white placeholder-cravio-mutedLight focus:outline-none focus:border-cravio-accent"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/5 border border-white/15 rounded-full px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:border-cravio-accent cursor-pointer"
              >
                <option value="recommended" className="bg-cravio-darkBg">Sort: AI Recommended</option>
                <option value="rating" className="bg-cravio-darkBg">Sort: Top Rated</option>
                <option value="priceAsc" className="bg-cravio-darkBg">Price: Low to High</option>
                <option value="priceDesc" className="bg-cravio-darkBg">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Craving Filter Chips */}
          <div className="pt-2 border-t border-cravio-borderDark flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-xs text-cravio-mutedLight font-medium shrink-0">Craving:</span>
            <button
              onClick={() => setSelectedCraving(null)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                selectedCraving === null ? 'bg-amber-400 text-cravio-darkBg font-bold' : 'bg-white/5 text-cravio-mutedLight hover:bg-white/10'
              }`}
            >
              All Cravings
            </button>
            {CRAVING_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCraving(cat.id === selectedCraving ? null : cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 flex items-center gap-1 ${
                  selectedCraving === cat.id ? 'bg-cravio-accent text-white font-bold' : 'bg-white/5 text-cravio-mutedLight hover:bg-white/10'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Cuisine & Diet Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-cravio-mutedLight font-medium shrink-0">Cuisine:</span>
              {cuisinesList.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCuisine(c)}
                  className={`px-2.5 py-1 rounded-lg transition-all shrink-0 ${
                    selectedCuisine === c ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-cravio-mutedLight hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Diet Toggle */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
              <button
                onClick={() => setDietFilter('All')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  dietFilter === 'All' ? 'bg-amber-400 text-cravio-darkBg font-bold' : 'text-cravio-mutedLight'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietFilter('Veg')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  dietFilter === 'Veg' ? 'bg-emerald-600 text-white' : 'text-cravio-mutedLight'
                }`}
              >
                Veg Only
              </button>
              <button
                onClick={() => setDietFilter('NonVeg')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  dietFilter === 'NonVeg' ? 'bg-amber-700 text-white' : 'text-cravio-mutedLight'
                }`}
              >
                Non-Veg
              </button>
            </div>
          </div>
        </div>

        {/* Intelligent Fallback Banner if 0 Exact Filters */}
        {isUsingFallback && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                No exact match for your strict filter combination. Displaying <strong>CRAVIO’s top signature alternatives</strong> for your palate!
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedCraving(null);
                setSelectedCuisine('All');
                setSearchTerm('');
                setDietFilter('All');
              }}
              className="px-3 py-1 rounded-lg bg-amber-400 text-cravio-darkBg font-bold uppercase tracking-wider shrink-0"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-cravio-mutedLight font-medium">
          <span>Showing {filteredDishes.length} artisanal dishes</span>
        </div>

        {/* Dish Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish, idx) => {
            const isFav = favoriteDishIds.includes(dish.id);
            const aiMatch = aiMatches.find(m => m.dish.id === dish.id);

            return (
              <motion.div
                key={dish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-cravio-darkCard rounded-3xl overflow-hidden shadow-2xl hover:border-amber-500/40 transition-all duration-300 border border-cravio-borderDark flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => openDishModal(dish)}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cravio-darkCard via-transparent to-black/40" />

                  {/* Top Badges */}
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

                  {/* Rating & Prep Time on Image Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <RatingBadge rating={dish.rating} reviewsCount={dish.reviewsCount} />
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium border border-white/20">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>{dish.preparationTimeMinutes} min</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-300 font-semibold tracking-wide uppercase">
                        {dish.cuisine}
                      </span>
                      {aiMatch && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/30">
                          {aiMatch.matchScore}% Match
                        </span>
                      )}
                    </div>

                    <h3
                      onClick={() => openDishModal(dish)}
                      className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors cursor-pointer line-clamp-1"
                    >
                      {dish.name}
                    </h3>

                    <p className="text-xs text-cravio-mutedLight font-medium">
                      By {dish.restaurantName}
                    </p>

                    <p className="text-xs text-cravio-mutedLight/80 line-clamp-2 leading-relaxed pt-1 font-light">
                      {dish.description}
                    </p>
                  </div>

                  {/* Flavor Tags */}
                  <div className="flex flex-wrap gap-1">
                    {dish.cravingTags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-amber-200/90 border border-white/5">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Bar */}
                  <div className="pt-4 border-t border-cravio-borderDark/60 flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-cravio-accent">
                      ₹{dish.price}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openDishModal(dish)}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white transition-colors"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => addToCart(dish)}
                        className="px-4 py-2.5 rounded-xl bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
                      >
                        <Plus className="w-4 h-4" />
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
    </div>
  );
};
