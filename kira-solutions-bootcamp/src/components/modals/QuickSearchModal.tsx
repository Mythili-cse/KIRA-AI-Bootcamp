import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCravioStore } from '../../store/useCravioStore';
import { Search, X, Utensils, Store, ArrowRight, Sparkles } from 'lucide-react';
import { DISHES, RESTAURANTS } from '../../data/mockData';

interface QuickSearchModalProps {
  onNavigate: (path: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ onNavigate }) => {
  const isSearchOpen = useCravioStore(s => s.isSearchOpen);
  const toggleSearchModal = useCravioStore(s => s.toggleSearchModal);
  const openDishModal = useCravioStore(s => s.openDishModal);

  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredDishes = query.trim()
    ? DISHES.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.cuisine.toLowerCase().includes(query.toLowerCase()))
    : DISHES.slice(0, 3);

  const filteredRestaurants = query.trim()
    ? RESTAURANTS.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.some(c => c.toLowerCase().includes(query.toLowerCase())))
    : RESTAURANTS.slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => toggleSearchModal(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-cravio-darkBg text-white rounded-3xl overflow-hidden border border-cravio-borderDark shadow-2xl z-10"
        >
          {/* Input Header */}
          <div className="p-4 sm:p-5 border-b border-cravio-borderDark flex items-center gap-3">
            <Search className="w-5 h-5 text-cravio-accent ml-2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, restaurants, cuisines, occasions..."
              className="flex-1 bg-transparent text-base sm:text-lg text-white placeholder-cravio-mutedLight focus:outline-none"
            />
            <button
              onClick={() => toggleSearchModal(false)}
              className="p-2 rounded-full hover:bg-white/10 text-cravio-mutedLight hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-5 space-y-6">
            {/* Dishes Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-300 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  Dishes
                </span>
                <span>{filteredDishes.length} matches</span>
              </div>

              <div className="space-y-2">
                {filteredDishes.map(dish => (
                  <div
                    key={dish.id}
                    onClick={() => {
                      toggleSearchModal(false);
                      openDishModal(dish);
                    }}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-serif font-bold text-sm text-white group-hover:text-cravio-accent transition-colors">
                          {dish.name}
                        </h5>
                        <span className="text-xs text-cravio-mutedLight">
                          {dish.restaurantName} • {dish.cuisine}
                        </span>
                      </div>
                    </div>
                    <span className="font-serif font-bold text-cravio-accent text-sm">₹{dish.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurants Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-300 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5" />
                  Restaurants
                </span>
                <span>{filteredRestaurants.length} matches</span>
              </div>

              <div className="space-y-2">
                {filteredRestaurants.map(rest => (
                  <div
                    key={rest.id}
                    onClick={() => {
                      toggleSearchModal(false);
                      onNavigate(`/restaurants/${rest.id}`);
                    }}
                    className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={rest.coverImage} alt={rest.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h5 className="font-serif font-bold text-sm text-white group-hover:text-cravio-accent transition-colors">
                          {rest.name}
                        </h5>
                        <span className="text-xs text-cravio-mutedLight">
                          {rest.cuisine.join(', ')} • {rest.location}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cravio-mutedLight group-hover:text-cravio-accent group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
