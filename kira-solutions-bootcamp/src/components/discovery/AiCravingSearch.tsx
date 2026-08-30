import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, ArrowRight, Flame, Star, Plus, Eye, CheckCircle2 } from 'lucide-react';
import { processNaturalLanguageCraving } from '../../services/api';
import { RecommendationMatch } from '../../types';
import { useCravioStore } from '../../store/useCravioStore';
import { RatingBadge } from '../common/RatingBadge';

interface AiCravingSearchProps {
  onNavigate: (path: string) => void;
}

export const AiCravingSearch: React.FC<AiCravingSearchProps> = ({ onNavigate }) => {
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<RecommendationMatch[] | null>(null);

  const openDishModal = useCravioStore(s => s.openDishModal);
  const addToCart = useCravioStore(s => s.addToCart);

  const samplePrompts = [
    '🔥 Spicy & cheesy woodfired pizza',
    '🍗 Crispy honey garlic wings for late night',
    '🍝 Creamy truffle pasta under ₹500',
    '🥗 Nourishing avocado & grain goddess bowl',
    '🌙 Midnight comforting ramen bowl',
  ];

  const handleSearch = (queryText: string) => {
    const q = queryText || prompt;
    if (!q.trim()) return;

    setIsAnalyzing(true);
    setPrompt(q);

    setTimeout(() => {
      const matches = processNaturalLanguageCraving(q);
      setResults(matches);
      setIsAnalyzing(false);
    }, 400);
  };

  return (
    <div className="w-full bg-cravio-darkBg/95 border-y border-cravio-borderDark/60 py-12 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-widest border border-amber-500/30">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>Natural Language AI Engine</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Describe what you’re craving in plain words.
          </h3>

          <p className="text-xs sm:text-sm text-cravio-mutedLight font-light">
            Our AI flavor matrix converts your mood, textures, and price preferences into exact culinary pairings.
          </p>
        </div>

        {/* Input Bar */}
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(prompt);
            }}
            className="relative"
          >
            <div className="relative flex items-center bg-cravio-darkCard border border-white/20 rounded-full p-2.5 shadow-2xl focus-within:border-cravio-accent transition-all">
              <Sparkles className="w-5 h-5 text-amber-400 ml-4 shrink-0" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Hot spicy chicken with creamy cheese pasta..."
                className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder-cravio-mutedLight focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cravio-accent to-amber-500 text-white text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-md shrink-0 flex items-center gap-2"
              >
                <span>Ask CRAVIO AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Sample Prompts Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-[11px] text-amber-300/80 font-medium">Try asking:</span>
            {samplePrompts.map(p => (
              <button
                key={p}
                onClick={() => handleSearch(p)}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-cravio-accent hover:text-white transition-all text-[11px] font-medium border border-white/10 text-cravio-cream/90"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Analyzing Animation */}
        {isAnalyzing && (
          <div className="py-12 text-center space-y-3">
            <div className="w-10 h-10 rounded-full border-2 border-cravio-accent border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-amber-200 animate-pulse font-medium">
              Mapping flavor notes, spice profiles & nearby oven capacity...
            </p>
          </div>
        )}

        {/* Recommendations Result Grid */}
        <AnimatePresence>
          {results && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 space-y-4 border-t border-cravio-borderDark/60"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                  AI Palate Matches ({results.length} Recommendations Found)
                </span>
                <button
                  onClick={() => setResults(null)}
                  className="text-xs text-cravio-mutedLight hover:text-white"
                >
                  Clear Results
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((match, idx) => (
                  <div
                    key={match.dish.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cravio-accent/60 transition-all flex gap-4 items-center group"
                  >
                    <img
                      src={match.dish.image}
                      alt={match.dish.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                      onClick={() => openDishModal(match.dish)}
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                          {match.matchScore}% Flavor Match
                        </span>
                        <RatingBadge rating={match.dish.rating} size="sm" />
                      </div>

                      <h4
                        onClick={() => openDishModal(match.dish)}
                        className="font-serif font-bold text-base text-white group-hover:text-amber-200 transition-colors cursor-pointer truncate"
                      >
                        {match.dish.name}
                      </h4>

                      <p className="text-[11px] text-amber-200/90 font-light truncate">
                        {match.matchReason}
                      </p>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="font-serif font-bold text-cravio-accent text-base">
                          ₹{match.dish.price}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openDishModal(match.dish)}
                            className="px-3 py-1 rounded-lg bg-white/10 text-white text-[11px] font-medium hover:bg-white/20"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => addToCart(match.dish)}
                            className="p-1.5 rounded-lg bg-cravio-accent hover:bg-cravio-accentHover text-white shadow"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
