import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 400], [1, 0.98]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <motion.div style={{ scale, opacity }} className="w-full transition-transform duration-300">
      {children}
    </motion.div>
  );
};
