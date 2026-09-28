import React from 'react';
import { CinematicHero } from './invitation/CinematicHero';
import { ProductItem } from '../types';

interface HeroProps {
  onExploreCards: () => void;
  onOpenCustomizer: () => void;
  onExploreStationery: () => void;
  onOpenCalculator: () => void;
  onOpenSampleModal?: () => void;
  onAddToQuote?: (product: ProductItem, quantity: number, notes: string, color: string) => void;
}

export const Hero: React.FC<HeroProps> = (props) => {
  return <CinematicHero {...props} />;
};
