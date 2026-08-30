import React from 'react';
import { CRAVING_CATEGORIES } from '../../data/mockData';
import { useCravioStore } from '../../store/useCravioStore';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface CravingCategoriesProps {
  onNavigate: (path: string) => void;
}

export const CravingCategories: React.FC<CravingCategoriesProps> = ({ onNavigate }) => {
  const setActiveCraving = useCravioStore(s => s.setActiveCraving);
  const activeCraving = useCravioStore(s => s.activeCraving);

  const handleSelectCategory = (categoryId: string) => {
    setActiveCraving(categoryId === activeCraving ? null : categoryId);
    onNavigate(`/discover?craving=${categoryId}`);
  };

  return (
    <section className="py-20 bg-cravio-bg text-cravio-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-cravio-border pb-6 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-cravio-accent font-bold">
              Personalized Cravings
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-cravio-charcoal mt-1">
              WHAT ARE YOU CRAVING?
            </h2>
          </div>
          <p className="text-sm text-cravio-muted max-w-md font-light leading-relaxed">
            Select what your palate desires right now to filter artisanal dishes and nearby kitchens.
          </p>
        </div>

        {/* 8 Craving Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {CRAVING_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => handleSelectCategory(cat.id)}
              className="group relative h-56 sm:h-64 rounded-3xl overflow-hidden cursor-pointer shadow-cravio hover:shadow-cravio-hover transition-all duration-500 border border-cravio-border/40"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.bgGradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between text-white z-10">
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl filter drop-shadow group-hover:scale-125 transition-transform duration-300">
                    {cat.emoji}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold tracking-wide group-hover:text-amber-200 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-cravio-cream/80 font-light mt-1">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
