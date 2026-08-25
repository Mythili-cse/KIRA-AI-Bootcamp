import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCravioStore } from '../../store/useCravioStore';
import { X, Heart, Clock, Plus, Minus, Flame, ShoppingBag, Sparkles, Activity } from 'lucide-react';
import { RatingBadge } from '../common/RatingBadge';
import { DietaryBadge } from '../common/DietaryBadge';

export const DishDetailModal: React.FC = () => {
  const activeDishModal = useCravioStore(s => s.activeDishModal);
  const closeDishModal = useCravioStore(s => s.closeDishModal);
  const addToCart = useCravioStore(s => s.addToCart);
  const favoriteDishIds = useCravioStore(s => s.favoriteDishIds);
  const toggleFavoriteDish = useCravioStore(s => s.toggleFavoriteDish);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string>>({});
  const [instructions, setInstructions] = useState<string>('');

  if (!activeDishModal) return null;

  const dish = activeDishModal;
  const isFav = favoriteDishIds.includes(dish.id);

  const fp = dish.flavorProfile || { spice: 4, crunch: 5, creaminess: 7, sweetness: 2, savory: 8 };

  const handleCustomizationChange = (groupName: string, optionLabel: string) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [groupName]: optionLabel,
    }));
  };

  const handleAddToCart = () => {
    addToCart(dish, quantity, selectedCustomizations, instructions);
    closeDishModal();
    setQuantity(1);
    setSelectedCustomizations({});
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDishModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-cravio-darkBg text-white rounded-3xl overflow-hidden border border-cravio-borderDark shadow-2xl z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={closeDishModal}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image Header */}
          <div className="relative h-72 sm:h-80 overflow-hidden">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cravio-darkBg via-black/30 to-transparent" />

            <div className="absolute top-4 left-4">
              <DietaryBadge isVegetarian={dish.isVegetarian} isVegan={dish.isVegan} />
            </div>

            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                  {dish.cuisine} • {dish.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white drop-shadow-md">
                  {dish.name}
                </h2>
                <p className="text-xs text-cravio-mutedLight">
                  Prepared by <span className="text-amber-100 font-semibold">{dish.restaurantName}</span>
                </p>
              </div>

              <button
                onClick={() => toggleFavoriteDish(dish.id)}
                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all shadow-lg"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-cravio-accent text-cravio-accent' : ''}`} />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <RatingBadge rating={dish.rating} reviewsCount={dish.reviewsCount} />
              <div className="flex items-center gap-1.5 text-cravio-mutedLight bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>{dish.preparationTimeMinutes} min prep time</span>
              </div>
              {dish.calories && (
                <div className="flex items-center gap-1.5 text-cravio-mutedLight bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <Flame className="w-3.5 h-3.5 text-cravio-accent" />
                  <span>{dish.calories} kcal</span>
                </div>
              )}
            </div>

            {/* AI Flavor Radar Bar */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <Activity className="w-4 h-4 text-cravio-accent" />
                  <span>AI Palate Flavor Profile</span>
                </div>
                <span className="text-[10px] text-cravio-mutedLight">Verified Flavor Notes</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-cravio-mutedLight">Spice Level</span>
                    <span className="text-amber-300 font-bold">{fp.spice}/10</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${fp.spice * 10}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-cravio-mutedLight">Crunchiness</span>
                    <span className="text-amber-300 font-bold">{fp.crunch}/10</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${fp.crunch * 10}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-cravio-mutedLight">Creaminess</span>
                    <span className="text-amber-300 font-bold">{fp.creaminess}/10</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-200 rounded-full" style={{ width: `${fp.creaminess * 10}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-cravio-mutedLight">Savory Umami</span>
                    <span className="text-amber-300 font-bold">{fp.savory}/10</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-cravio-accent rounded-full" style={{ width: `${fp.savory * 10}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-cravio-cream/90 font-light leading-relaxed">
              {dish.description}
            </p>

            {/* Key Ingredients */}
            {dish.ingredients && dish.ingredients.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-serif text-xs font-semibold text-amber-200 uppercase tracking-wider">
                  Key Artisanal Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map(ing => (
                    <span
                      key={ing}
                      className="px-3 py-1 rounded-xl bg-white/5 text-cravio-mutedLight text-xs border border-white/10"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customizations */}
            {dish.customizations && dish.customizations.length > 0 && (
              <div className="space-y-4 pt-2 border-t border-cravio-borderDark">
                {dish.customizations.map(cGroup => (
                  <div key={cGroup.name} className="space-y-2">
                    <h4 className="font-serif text-sm font-semibold text-amber-200">
                      Select {cGroup.name}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cGroup.options.map(opt => {
                        const isSelected = selectedCustomizations[cGroup.name] === opt.label;

                        return (
                          <button
                            key={opt.label}
                            onClick={() => handleCustomizationChange(cGroup.name, opt.label)}
                            className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                              isSelected
                                ? 'bg-cravio-accent/20 border-cravio-accent text-white'
                                : 'bg-white/5 border-white/10 text-cravio-mutedLight hover:bg-white/10'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {opt.price > 0 && <span className="text-amber-300">+₹{opt.price}</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Kitchen Instructions */}
            <div className="space-y-2 pt-2 border-t border-cravio-borderDark">
              <label className="font-serif text-xs font-semibold text-amber-200 block">
                Special Kitchen Instructions (Optional)
              </label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g., Extra hot chili oil, sauce on the side..."
                className="w-full bg-white/5 border border-cravio-borderDark rounded-xl px-4 py-2.5 text-xs text-white placeholder-cravio-mutedLight focus:outline-none focus:border-cravio-accent"
              />
            </div>

          </div>

          {/* Footer Bar */}
          <div className="p-6 border-t border-cravio-borderDark bg-cravio-darkCard flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
              <span className="font-serif text-2xl font-bold text-cravio-accent">
                ₹{dish.price * quantity}
              </span>

              <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-2xl px-3 py-1.5 text-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-cravio-accent transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:text-cravio-accent transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cravio-accent/30 transition-transform active:scale-98"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add To Craving Basket</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
