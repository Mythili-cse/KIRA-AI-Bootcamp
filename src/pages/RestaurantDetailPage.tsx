import React, { useState, useEffect } from 'react';
import { RESTAURANTS, DISHES, REVIEWS } from '../data/mockData';
import { Restaurant, Dish } from '../types';
import { fetchRestaurantById } from '../services/api';
import { RatingBadge } from '../components/common/RatingBadge';
import { DietaryBadge } from '../components/common/DietaryBadge';
import { useCravioStore } from '../store/useCravioStore';
import { MapPin, Clock, Heart, Award, Utensils, Phone, Star, Plus, Eye, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface RestaurantDetailPageProps {
  restaurantId: string;
  onNavigate: (path: string) => void;
}

export const RestaurantDetailPage: React.FC<RestaurantDetailPageProps> = ({ restaurantId, onNavigate }) => {
  const [restaurantData, setRestaurantData] = useState<(Restaurant & { dishes: Dish[] }) | null>(null);
  const [activeTab, setActiveTab] = useState<'menu' | 'overview' | 'reviews' | 'about'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const openDishModal = useCravioStore(s => s.openDishModal);
  const addToCart = useCravioStore(s => s.addToCart);
  const favoriteRestaurantIds = useCravioStore(s => s.favoriteRestaurantIds);
  const toggleFavoriteRestaurant = useCravioStore(s => s.toggleFavoriteRestaurant);

  useEffect(() => {
    fetchRestaurantById(restaurantId).then(data => {
      setRestaurantData(data);
    });
  }, [restaurantId]);

  if (!restaurantData) {
    const fallback = RESTAURANTS.find(r => r.id === restaurantId || r.slug === restaurantId) || RESTAURANTS[0];
    const fallbackDishes = DISHES.filter(d => d.restaurantId === fallback.id);
    setRestaurantData({ ...fallback, dishes: fallbackDishes });
    return null;
  }

  const rest = restaurantData;
  const isFav = favoriteRestaurantIds.includes(rest.id);

  const categories = ['All', 'Signature Dishes', 'Starters', 'Main Course', 'Desserts'];

  const filteredDishes = rest.dishes.filter(d => {
    if (selectedCategory === 'All') return true;
    return d.category === selectedCategory;
  });

  return (
    <div className="pt-20 pb-24 bg-cravio-bg text-cravio-charcoal min-h-screen">
      {/* Cover Banner */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-cravio-darkBg">
        <img
          src={rest.coverImage}
          alt={rest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cravio-darkBg via-black/40 to-transparent" />

        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={() => toggleFavoriteRestaurant(rest.id)}
            className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-lg"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-cravio-accent text-cravio-accent' : ''}`} />
          </button>
        </div>

        {/* Cover Info Overlay */}
        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              ● Open Now
            </span>
            <span className="text-xs text-amber-300 font-medium">
              {rest.cuisine.join(' • ')}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
            {rest.name}
          </h1>

          <p className="text-sm text-cravio-cream/90 font-light max-w-2xl">
            {rest.tagline}
          </p>
        </div>
      </div>

      {/* Meta Bar */}
      <div className="bg-cravio-darkCard text-white border-b border-cravio-borderDark py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <RatingBadge rating={rest.rating} reviewsCount={rest.reviewsCount} size="lg" />
            <span className="text-amber-300 font-bold">{rest.priceRange}</span>
            <span className="flex items-center gap-1 text-cravio-mutedLight">
              <MapPin className="w-3.5 h-3.5 text-cravio-accent" />
              {rest.location} ({rest.distanceKm} km away)
            </span>
          </div>

          <div className="flex items-center gap-4 text-cravio-mutedLight">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              {rest.openingHours}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-cravio-accent" />
              {rest.deliveryTimeMinutes} mins delivery
            </span>
          </div>
        </div>
      </div>

      {/* Page Tabs */}
      <div className="bg-cravio-card border-b border-cravio-border sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-8 text-sm font-semibold py-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('menu')}
            className={`py-1.5 transition-colors relative shrink-0 ${
              activeTab === 'menu' ? 'text-cravio-accent' : 'text-cravio-muted hover:text-cravio-charcoal'
            }`}
          >
            Menu & Dishes ({rest.dishes.length})
            {activeTab === 'menu' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cravio-accent rounded-full" />}
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`py-1.5 transition-colors relative shrink-0 ${
              activeTab === 'overview' ? 'text-cravio-accent' : 'text-cravio-muted hover:text-cravio-charcoal'
            }`}
          >
            Overview
            {activeTab === 'overview' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cravio-accent rounded-full" />}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-1.5 transition-colors relative shrink-0 ${
              activeTab === 'reviews' ? 'text-cravio-accent' : 'text-cravio-muted hover:text-cravio-charcoal'
            }`}
          >
            Reviews ({rest.reviewsCount})
            {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cravio-accent rounded-full" />}
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`py-1.5 transition-colors relative shrink-0 ${
              activeTab === 'about' ? 'text-cravio-accent' : 'text-cravio-muted hover:text-cravio-charcoal'
            }`}
          >
            About & Chef
            {activeTab === 'about' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cravio-accent rounded-full" />}
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* MENU TAB */}
        {activeTab === 'menu' && (
          <div className="space-y-8">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-cravio-accent text-white shadow-md'
                      : 'bg-cravio-card text-cravio-charcoal border border-cravio-border hover:bg-cravio-cream'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map(dish => (
                <div
                  key={dish.id}
                  className="bg-cravio-card rounded-3xl p-4 border border-cravio-border shadow-cravio hover:shadow-cravio-hover transition-all flex gap-4 group"
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-28 h-28 rounded-2xl object-cover shrink-0 cursor-pointer"
                    onClick={() => openDishModal(dish)}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between space-y-1">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <DietaryBadge isVegetarian={dish.isVegetarian} isVegan={dish.isVegan} />
                        <RatingBadge rating={dish.rating} size="sm" />
                      </div>

                      <h4
                        onClick={() => openDishModal(dish)}
                        className="font-serif font-bold text-base text-cravio-charcoal group-hover:text-cravio-accent transition-colors cursor-pointer truncate pt-1"
                      >
                        {dish.name}
                      </h4>

                      <p className="text-xs text-cravio-muted line-clamp-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-cravio-border/60">
                      <span className="font-serif font-bold text-lg text-cravio-charcoal">
                        ₹{dish.price}
                      </span>

                      <button
                        onClick={() => addToCart(dish)}
                        className="px-3 py-1.5 rounded-xl bg-cravio-accent hover:bg-cravio-accentHover text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow transition-transform hover:scale-105"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="bg-cravio-card rounded-3xl p-8 border border-cravio-border shadow-cravio space-y-6">
            <h3 className="font-serif text-2xl font-bold">About {rest.name}</h3>
            <p className="text-sm text-cravio-muted leading-relaxed font-light">
              {rest.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-cravio-border">
              <div className="space-y-1">
                <span className="text-xs text-cravio-muted uppercase font-bold">Executive Chef</span>
                <p className="font-serif text-lg font-bold">{rest.chefName || 'Chef In-Charge'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-cravio-muted uppercase font-bold">Address</span>
                <p className="text-sm font-medium">{rest.address}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-cravio-muted uppercase font-bold">Dining Options</span>
                <p className="text-sm font-medium">Dine-in • Takeaway • Express Delivery</p>
              </div>
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-cravio-card rounded-3xl p-6 border border-cravio-border shadow-cravio flex items-center justify-between">
              <div>
                <span className="text-xs text-cravio-muted font-bold uppercase">Overall Customer Rating</span>
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="font-serif text-4xl font-bold">{rest.rating.toFixed(1)}</span>
                  <span className="text-sm text-cravio-muted">out of 5 ({rest.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {REVIEWS.map(rev => (
                <div key={rev.id} className="bg-cravio-card rounded-2xl p-5 border border-cravio-border shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h5 className="font-serif font-bold text-sm">{rev.userName}</h5>
                        <span className="text-[11px] text-cravio-muted">{rev.date}</span>
                      </div>
                    </div>
                    <RatingBadge rating={rev.rating} size="sm" />
                  </div>
                  <p className="text-xs text-cravio-muted leading-relaxed font-light">
                    “{rev.comment}”
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="bg-cravio-card rounded-3xl p-8 border border-cravio-border shadow-cravio space-y-4">
            <h3 className="font-serif text-2xl font-bold">Culinary Heritage & Story</h3>
            <p className="text-sm text-cravio-muted leading-relaxed font-light">
              Crafted under the direction of {rest.chefName}, {rest.name} brings together single-origin ingredients, artisanal cooking techniques, and passionate hospitality to create an unforgettable dining destination.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
