import React, { useState } from 'react';
import { Sparkles, Palette, ArrowRight, CheckCircle2, Award, FileText, Box, Film } from 'lucide-react';
import { GatefoldInvitation } from './invitation/GatefoldInvitation';
import { InvitationFrameAnimation } from './invitation/InvitationFrameAnimation';
import { ProductShowcaseSection } from './invitation/ProductShowcaseSection';
import { ProductItem } from '../types';

interface HeroProps {
  onExploreCards: () => void;
  onOpenCustomizer: () => void;
  onExploreStationery: () => void;
  onOpenCalculator: () => void;
  onOpenSampleModal?: () => void;
  onAddToQuote?: (product: ProductItem, quantity: number, notes: string, color: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCards,
  onOpenCustomizer,
  onExploreStationery,
  onOpenCalculator,
  onOpenSampleModal,
  onAddToQuote,
}) => {
  const [showcaseMode, setShowcaseMode] = useState<'cinematic-frames' | 'interactive-3d'>('cinematic-frames');

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-[#E5E1DA] py-10 md:py-14 px-4 sm:px-6">
        {/* Subtle organic linen background texture */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#D1CABF_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="relative max-w-7xl mx-auto space-y-10">
          
          {/* Top Hero Text Header */}
          <div className="max-w-4xl mx-auto text-center space-y-4 font-sans">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#F2EDE4] border border-[#D1CABF] text-[#4A443F] px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs uppercase tracking-widest font-medium max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-[#8B0000] shrink-0" />
              <span>Premier Wedding & Stationery • Jharsuguda, Odisha</span>
            </div>

            <h1 className="font-royal text-3xl sm:text-5xl font-bold tracking-tight text-[#2D2926] leading-tight">
              Graceful Wedding Invitations & <br className="hidden sm:block" />
              <span className="text-[#8B0000] font-serif-luxury italic">
                Cinematic Invitation Experience
              </span>
            </h1>

            <p className="text-[#4A443F] text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
              From our landmark manufacturing house in Brajarajnagar, we craft bespoke wedding invitations—featuring royal 3-panel gatefolds with gold wax seals, velvet scrolls, 3D pop-up mandaps—alongside durable office and school stationery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2 w-full">
              <button
                id="hero-explore-cards-btn"
                onClick={onExploreCards}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-sans text-xs uppercase tracking-widest font-medium shadow-xs transition-all w-full sm:w-auto"
              >
                <span>Browse 500+ Wedding Designs</span>
                <ArrowRight className="w-4 h-4 text-[#F2EDE4]" />
              </button>

              <button
                id="hero-open-customizer-btn"
                onClick={onOpenCustomizer}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#2D2926] font-sans text-xs uppercase tracking-widest font-medium transition-all w-full sm:w-auto"
              >
                <Palette className="w-4 h-4 text-[#8B0000]" />
                <span>Live Card Designer</span>
              </button>

              <button
                id="hero-stationery-btn"
                onClick={onExploreStationery}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[#4A443F] hover:text-[#8B0000] hover:bg-[#F2EDE4] font-sans text-xs uppercase tracking-widest font-medium transition-all w-full sm:w-auto border border-[#E5E1DA] sm:border-transparent"
              >
                <FileText className="w-3.5 h-3.5 text-[#A69076]" />
                <span>Office & School Filing</span>
              </button>
            </div>

            {/* Value Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E5E1DA]">
              <div className="flex items-center justify-center gap-2 text-[#4A443F] text-xs font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>Rates from ₹4.80/pc</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[#4A443F] text-xs font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>Odia, Hindi & English</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[#4A443F] text-xs font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>Fast Sample Proofing</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[#4A443F] text-xs font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>Doorstep Delivery</span>
              </div>
            </div>
          </div>

          {/* Interactive Showcase Mode Switcher Header */}
          <div className="max-w-5xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#D1CABF] pb-3 gap-3 font-sans">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-[#8B0000]" />
                <span className="font-royal font-bold text-base text-[#2D2926]">
                  Cinematic Unfolding Invitation Experience
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center bg-[#F2EDE4] p-1 rounded-xl border border-[#D1CABF]">
                <button
                  onClick={() => setShowcaseMode('cinematic-frames')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    showcaseMode === 'cinematic-frames'
                      ? 'bg-[#8B0000] text-white shadow-xs'
                      : 'text-[#4A443F] hover:text-[#2D2926]'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Cinematic Scroll (40 Frames)</span>
                </button>
                <button
                  onClick={() => setShowcaseMode('interactive-3d')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    showcaseMode === 'interactive-3d'
                      ? 'bg-[#8B0000] text-white shadow-xs'
                      : 'text-[#4A443F] hover:text-[#2D2926]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Interactive 3D View</span>
                </button>
              </div>
            </div>

            {/* Render selected showcase component */}
            {showcaseMode === 'cinematic-frames' ? (
              <InvitationFrameAnimation 
                onOpenCustomizer={onOpenCustomizer}
                onOpenCalculator={onOpenCalculator}
              />
            ) : (
              <GatefoldInvitation 
                onOpenCustomizer={onOpenCustomizer}
                onOpenCalculator={onOpenCalculator}
                enableScrollTrigger={true}
              />
            )}
          </div>

        </div>
      </section>

      {/* Product Showcase Section for Reference 4 Lifestyle Photography */}
      <ProductShowcaseSection 
        onOpenCustomizer={onOpenCustomizer}
        onOpenSampleModal={onOpenSampleModal}
        onAddToQuote={onAddToQuote}
      />
    </div>
  );
};


