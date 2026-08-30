import React, { useState } from 'react';
import { useCravioStore } from '../store/useCravioStore';
import { DISHES, RESTAURANTS } from '../data/mockData';
import { RatingBadge } from '../components/common/RatingBadge';
import { DietaryBadge } from '../components/common/DietaryBadge';
import { Heart, Plus, MapPin, Compass, Trash2, Store } from 'lucide-react';
import { motion } from 'framer-motion';

interface FavoritesPageProps {
  onNavigate: (path: string) => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({ onNavigate }) => {
  const favoriteDishIds = useCravioStore(s => s.favoriteDishIds);
  const favoriteRestaurantIds = useCravioStore(s => s.favoriteRestaurantIds);
  const toggleFavoriteDish = useCravioStore(s => s.toggleFavoriteDish);
  const toggleFavoriteRestaurant = useCravioStore(s => s.toggleFavoriteRestaurant);
  const openDishModal = useCravioStore(s => s.openDishModal);
  const addToCart = useCravioStore(s => s.addToCart);

  const [tab, setTab] = useState<'dishes' | 'restaurants'>('dishes');

  const savedDishes = DISHES.filter(d => favoriteDishIds.includes(d.id));
  const savedRestaurants = RESTAURANTS.filter(r => favoriteRestaurantIds.includes(r.id));

  return (
    <div className="pt-28 pb-24 bg-cravio-bg text-cravio-charcoal min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cravio-accent/10 text-cravio-accent text-xs font-semibold uppercase tracking-widest border border-cravio-accent/20">
            <Heart className="w-4 h-4 fill-cravio-accent text-cravio-accent" />
            <span>Your Saved Favorites</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-cravio-charcoal">
            Saved Dishes & Places
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-cravio-card p-1.5 rounded-full border border-cravio-border shadow-sm flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setTab('dishes')}
              className={`px-6 py-2.5 rounded-full transition-all ${
                tab === 'dishes' ? 'bg-cravio-accent text-white shadow-md' : 'text-cravio-muted hover:text-cravio-charcoal'
              }`}
            >
              Saved Dishes ({savedDishes.length})
            </button>
            <button
              onClick={() => setTab('restaurants')}
              className={`px-6 py-2.5 rounded-full transition-all ${
                tab === 'restaurants' ? 'bg-cravio-accent text-white shadow-md' : 'text-cravio-muted hover:text-cravio-charcoal'
              }`}
            >
              Saved Places ({savedRestaurants.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Saved Dishes */}
        {tab === 'dishes' && (
          <div>
            {savedDishes.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-cravio-card rounded-3xl border border-cravio-border shadow-cravio max-w-xl mx-auto p-8">
                <Heart className="w-12 h-12 text-cravio-muted mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-cravio-charcoal">Nothing saved yet.</h3>
                <p className="text-xs text-cravio-muted leading-relaxed font-light">
                  Your next favorite dish might be one scroll away. Explore our artisanal collection and tap the heart icon to save.
                </p>
                <button
                  onClick={() => onNavigate('/discover')}
                  className="px-6 py-3 rounded-full bg-cravio-accent text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
                >
                  Explore Food Discovery
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDishes.map(dish => (
                  <div key={dish.id} className="bg-cravio-card rounded-3xl overflow-hidden border border-cravio-border shadow-cravio flex flex-col group">
                    <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => openDishModal(dish)}>
                      <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
                      <button
                        onClick={() => toggleFavoriteDish(dish.id)}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-cravio-accent shadow"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-xs text-cravio-accent font-semibold">{dish.cuisine}</span>
                        <h4 onClick={() => openDishModal(dish)} className="font-serif font-bold text-lg text-cravio-charcoal cursor-pointer line-clamp-1">
                          {dish.name}
                        </h4>
                        <p className="text-xs text-cravio-muted">By {dish.restaurantName}</p>
                      </div>

                      <div className="pt-3 border-t border-cravio-border flex items-center justify-between">
                        <span className="font-serif font-bold text-xl text-cravio-charcoal">₹{dish.price}</span>
                        <button
                          onClick={() => addToCart(dish)}
                          className="px-4 py-2 rounded-xl bg-cravio-accent text-white font-bold text-xs uppercase flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Restaurants */}
        {tab === 'restaurants' && (
          <div>
            {savedRestaurants.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-cravio-card rounded-3xl border border-cravio-border shadow-cravio max-w-xl mx-auto p-8">
                <Store className="w-12 h-12 text-cravio-muted mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-cravio-charcoal">No saved places yet.</h3>
                <p className="text-xs text-cravio-muted leading-relaxed font-light">
                  Bookmark top dining destinations to keep track of your favorite kitchens.
                </p>
                <button
                  onClick={() => onNavigate('/restaurants')}
                  className="px-6 py-3 rounded-full bg-cravio-accent text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-transform"
                >
                  Discover Restaurants
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRestaurants.map(rest => (
                  <div key={rest.id} className="bg-cravio-card rounded-3xl overflow-hidden border border-cravio-border shadow-cravio flex flex-col group cursor-pointer" onClick={() => onNavigate(`/restaurants/${rest.id}`)}>
                    <div className="relative h-56 overflow-hidden">
                      <img src={rest.coverImage} alt={rest.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavoriteRestaurant(rest.id);
                        }}
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-cravio-accent shadow"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <span className="text-xs text-cravio-accent font-semibold">{rest.cuisine.join(' • ')}</span>
                        <h4 className="font-serif font-bold text-xl text-cravio-charcoal">{rest.name}</h4>
                        <p className="text-xs text-cravio-muted">{rest.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
