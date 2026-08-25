import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, RefreshCw, ArrowRight, Star, Plus } from 'lucide-react';
import { fetchSmartRecommendations } from '../../services/api';
import { RecommendationMatch } from '../../types';
import { useCravioStore } from '../../store/useCravioStore';
import { RatingBadge } from '../common/RatingBadge';

interface SmartDiscoveryWidgetProps {
  onNavigate: (path: string) => void;
}

export const SmartDiscoveryWidget: React.FC<SmartDiscoveryWidgetProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<number>(1);
  const [mood, setMood] = useState<string>('Comforting');
  const [cuisine, setCuisine] = useState<string>('Italian');
  const [budget, setBudget] = useState<string>('₹200–₹400');
  const [diet, setDiet] = useState<string>('Vegetarian');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matches, setMatches] = useState<RecommendationMatch[] | null>(null);

  const openDishModal = useCravioStore(s => s.openDishModal);
  const addToCart = useCravioStore(s => s.addToCart);

  const moods = ['Comforting', 'Adventurous', 'Light', 'Indulgent', 'Spicy', 'Refreshing'];
  const cuisines = ['Indian', 'Italian', 'Chinese', 'Japanese', 'Mexican', 'Korean', 'Continental'];
  const budgets = ['Under ₹200', '₹200–₹400', '₹400–₹700', 'Premium'];
  const diets = ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'No Preference'];

  const handleComputeMatches = async () => {
    setIsLoading(true);
    setStep(5);
    try {
      const results = await fetchSmartRecommendations({ mood, cuisine, budget, diet });
      setMatches(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setMatches(null);
  };

  return (
    <section id="smart-ai" className="py-20 bg-cravio-darkBg text-white relative overflow-hidden">
      {/* Background Subtle Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cravio-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>AI-Powered Craving Matcher</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Tell CRAVIO What You Want.
          </h2>

          <p className="text-sm text-cravio-mutedLight font-light leading-relaxed">
            Answer 4 quick preferences and our recommendation engine will pair your craving with its exact culinary match.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-cravio-darkCard rounded-3xl p-6 sm:p-10 border border-cravio-borderDark/80 shadow-2xl relative">
          
          {/* Progress Indicator */}
          {step <= 4 && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-cravio-borderDark">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                Step {step} of 4
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map(s => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      s === step ? 'w-8 bg-cravio-accent' : s < step ? 'w-4 bg-amber-400' : 'w-4 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Mood */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-amber-100">
                What are you in the mood for?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {moods.map(m => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all ${
                      mood === m
                        ? 'bg-cravio-accent text-white border-cravio-accent shadow-glow'
                        : 'bg-white/5 border-white/10 text-cravio-mutedLight hover:bg-white/10'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-full bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2"
                >
                  <span>Next: Cuisine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Cuisine */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-amber-100">
                Which cuisine do you desire?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {cuisines.map(c => (
                  <button
                    key={c}
                    onClick={() => setCuisine(c)}
                    className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all ${
                      cuisine === c
                        ? 'bg-cravio-accent text-white border-cravio-accent shadow-glow'
                        : 'bg-white/5 border-white/10 text-cravio-mutedLight hover:bg-white/10'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4">
                <button onClick={() => setStep(1)} className="text-xs text-cravio-mutedLight hover:text-white">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-full bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2"
                >
                  <span>Next: Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Budget */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-amber-100">
                What is your price expectation per dish?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {budgets.map(b => (
                  <button
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all ${
                      budget === b
                        ? 'bg-cravio-accent text-white border-cravio-accent shadow-glow'
                        : 'bg-white/5 border-white/10 text-cravio-mutedLight hover:bg-white/10'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4">
                <button onClick={() => setStep(2)} className="text-xs text-cravio-mutedLight hover:text-white">
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-8 py-3 rounded-full bg-cravio-accent hover:bg-cravio-accentHover text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2"
                >
                  <span>Next: Diet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Diet */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-amber-100">
                Any dietary preference?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {diets.map(d => (
                  <button
                    key={d}
                    onClick={() => setDiet(d)}
                    className={`p-4 rounded-2xl border text-left text-sm font-medium transition-all ${
                      diet === d
                        ? 'bg-cravio-accent text-white border-cravio-accent shadow-glow'
                        : 'bg-white/5 border-white/10 text-cravio-mutedLight hover:bg-white/10'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4">
                <button onClick={() => setStep(3)} className="text-xs text-cravio-mutedLight hover:text-white">
                  Back
                </button>
                <button
                  onClick={handleComputeMatches}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cravio-accent to-amber-500 hover:scale-105 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal CRAVIO Matches</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: RESULTS */}
          {step === 5 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-cravio-borderDark gap-3">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                    Match Breakdown
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-white mt-1">
                    “Your craving has a match.”
                  </h3>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 text-xs text-cravio-mutedLight hover:text-amber-300 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Wizard</span>
                </button>
              </div>

              {isLoading ? (
                <div className="py-16 text-center space-y-4">
                  <Sparkles className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
                  <p className="text-sm text-cravio-mutedLight animate-pulse">
                    Analyzing flavor profile matrices & local kitchen inventory...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {matches?.map((m, idx) => (
                    <motion.div
                      key={m.dish.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cravio-accent/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={m.dish.image}
                          alt={m.dish.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                              {m.matchScore}% Match
                            </span>
                            <RatingBadge rating={m.dish.rating} />
                          </div>

                          <h4
                            onClick={() => openDishModal(m.dish)}
                            className="font-serif text-lg font-bold text-white hover:text-cravio-accent cursor-pointer"
                          >
                            {m.dish.name}
                          </h4>

                          <p className="text-xs text-amber-200/90 font-light">
                            {m.matchReason}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-0 border-white/10">
                        <span className="font-serif text-xl font-bold text-cravio-accent">
                          ₹{m.dish.price}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openDishModal(m.dish)}
                            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                          >
                            View Dish
                          </button>
                          <button
                            onClick={() => addToCart(m.dish)}
                            className="p-2 rounded-xl bg-cravio-accent hover:bg-cravio-accentHover text-white shadow-md transition-transform hover:scale-105"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
