import React from 'react';
import { CinematicHero } from '../components/hero/CinematicHero';
import { TrendingDishes } from '../components/discovery/TrendingDishes';
import { MadeForYouSection } from '../components/discovery/MadeForYouSection';
import { MoodExploreSection } from '../components/discovery/MoodExploreSection';
import { HiddenGems } from '../components/discovery/HiddenGems';
import { CravioPicksSection } from '../components/discovery/CravioPicksSection';
import { RestaurantGrid } from '../components/discovery/RestaurantGrid';
import { SmartDiscoveryWidget } from '../components/discovery/SmartDiscoveryWidget';
import { HeroTransition } from '../components/hero/HeroTransition';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-cravio-darkBg">
      {/* HERO SECTION: Cinematic Video + AI Input + Craving Chips */}
      <CinematicHero onNavigate={onNavigate} />

      {/* Hero Scroll Scale Transition */}
      <HeroTransition>
        {/* SECTION 1 — TRENDING RIGHT NOW */}
        <TrendingDishes onNavigate={onNavigate} />

        {/* SECTION 2 — MADE FOR YOUR CRAVINGS */}
        <MadeForYouSection onNavigate={onNavigate} />

        {/* SECTION 3 — EXPLORE BY MOOD */}
        <MoodExploreSection onNavigate={onNavigate} />

        {/* SECTION 4 — HIDDEN GEMS */}
        <HiddenGems onNavigate={onNavigate} />

        {/* SECTION 5 — CRAVIO PICKS */}
        <CravioPicksSection onNavigate={onNavigate} />

        {/* PLACES WORTH DISCOVERING */}
        <RestaurantGrid onNavigate={onNavigate} />

        {/* SMART AI DISCOVERY WIZARD */}
        <SmartDiscoveryWidget onNavigate={onNavigate} />
      </HeroTransition>
    </div>
  );
};
