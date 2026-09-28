import React, { useState } from 'react';
import { Sparkles, Palette, ArrowRight, CheckCircle2, FileText, Box, ChevronDown } from 'lucide-react';
import { GatefoldInvitation } from './invitation/GatefoldInvitation';
import { ProductShowcaseSection } from './invitation/ProductShowcaseSection';
import { InvitationContentSection } from './invitation/InvitationContentSection';
import { InvitationCollectionSection } from './invitation/InvitationCollectionSection';
import { InvitationDetailsSection } from './invitation/InvitationDetailsSection';
import { InvitationCustomizerSection } from './invitation/InvitationCustomizerSection';
import { InvitationCtaSection } from './invitation/InvitationCtaSection';
import { ProductItem } from '../types';

interface HeroProps {
  onExploreCards: () => void;
  onOpenCustomizer: () => void;
  onExploreStationery: () => void;
  onOpenCalculator: () => void;
  onOpenSampleModal?: () => void;
  onSelectProduct?: (product: ProductItem) => void;
  onOpenWhatsApp?: (productName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCards,
  onOpenCustomizer,
  onExploreStationery,
  onOpenCalculator,
  onOpenSampleModal,
  onSelectProduct,
  onOpenWhatsApp,
}) => {
  const scrollToShowcase = () => {
    const el = document.getElementById('flagship-product-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-0">
      
      {/* HERO LANDING SECTION */}
      <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-[#E5E1DA] py-16 md:py-24 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#D1CABF_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="relative max-w-6xl mx-auto space-y-10 text-center font-sans">
          
          <div className="inline-flex items-center gap-2 bg-[#F2EDE4] border border-[#D1CABF] text-[#4A443F] px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium">
            <Sparkles className="w-4 h-4 text-[#8B0000] shrink-0" />
            <span>Premier Wedding Cards & Stationery Hub • Jharsuguda, Odisha</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="font-royal text-4xl sm:text-7xl font-bold tracking-tight text-[#2D2926] leading-tight">
              Your Story. <br className="hidden sm:block" />
              <span className="text-[#8B0000] font-serif-luxury italic">
                Beautifully Invited.
              </span>
            </h1>

            <p className="text-[#4A443F] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Experience Western Odisha's premier card manufacturing house—featuring royal 3-panel gatefolds with gold wax seals, velvet scrolls, and 3D pop-up mandaps.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 w-full max-w-xl mx-auto">
            <button
              id="hero-explore-invitation-btn"
              onClick={scrollToShowcase}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Flagship Showcase</span>
              <ChevronDown className="w-4 h-4 text-[#F2EDE4] animate-bounce" />
            </button>

            <button
              id="hero-browse-designs-btn"
              onClick={onExploreCards}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#2D2926] font-sans text-xs uppercase tracking-widest font-bold transition-all"
            >
              <span>Browse 500+ Designs</span>
            </button>
          </div>

          {/* Value Bullets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#E5E1DA] max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-[#4A443F] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
              <span>Wholesale Rates from ₹4.80</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-[#4A443F] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
              <span>Odia, Hindi & English</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-[#4A443F] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
              <span>Fast 24-Hr Sample Proofing</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-[#4A443F] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
              <span>Doorstep Delivery Across India</span>
            </div>
          </div>

        </div>
      </section>

      {/* FLAGSHIP IMAGE & 3D GLB SHOWCASE SECTION */}
      <section id="flagship-product-showcase" className="bg-[#FAF9F6] border-b border-[#E5E1DA] py-12 px-4 sm:px-6">
        <ProductShowcaseSection 
          onOpenCustomizer={onOpenCustomizer}
          onOpenSampleModal={onOpenSampleModal}
        />

        <div className="max-w-7xl mx-auto pt-10">
          <div className="bg-[#F2EDE4]/50 border border-[#D1CABF] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#D1CABF] pb-4">
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-[#8B0000]" />
                <h3 className="font-royal font-bold text-lg text-[#2D2926]">
                  Interactive 3D Gatefold Card Viewer (.GLB Asset)
                </h3>
              </div>
              <span className="text-xs text-[#8C847C] font-mono">Drag to Rotate & Unfold</span>
            </div>

            <GatefoldInvitation 
              onOpenCustomizer={onOpenCustomizer}
              onOpenCalculator={onOpenCalculator}
            />
          </div>
        </div>
      </section>

      {/* INVITATION CONTENT */}
      <InvitationContentSection
        onOpenCustomizer={onOpenCustomizer}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* MASTERPIECE COLLECTION */}
      <InvitationCollectionSection
        onSelectProduct={onSelectProduct}
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* CRAFTSMANSHIP DETAILS */}
      <InvitationDetailsSection />

      {/* LIVE CUSTOMIZER */}
      <InvitationCustomizerSection
        onOpenWhatsApp={onOpenWhatsApp}
      />

      {/* GRAND CTA */}
      <InvitationCtaSection
        onOpenCustomizer={onOpenCustomizer}
        onOpenCalculator={onOpenCalculator}
        onOpenWhatsApp={onOpenWhatsApp}
      />

    </div>
  );
};
