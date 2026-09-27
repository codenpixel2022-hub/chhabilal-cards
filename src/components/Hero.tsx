import React from 'react';
import { Sparkles, Palette, ArrowRight, CheckCircle2, Award, FileText } from 'lucide-react';

interface HeroProps {
  onExploreCards: () => void;
  onOpenCustomizer: () => void;
  onExploreStationery: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCards,
  onOpenCustomizer,
  onExploreStationery,
  onOpenCalculator,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-[#E5E1DA] py-12 md:py-16 px-4 sm:px-6">
      {/* Subtle organic linen background texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#D1CABF_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#F2EDE4] border border-[#D1CABF] text-[#4A443F] px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest font-sans font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#8B0000]" />
              <span>Premier Wedding & Stationery House • Jharsuguda</span>
            </div>

            <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2D2926] leading-tight">
              Graceful Wedding Invitations & <br className="hidden sm:block" />
              <span className="text-[#8B0000] font-serif-luxury italic">
                Artisanal Stationery Supplies
              </span>
            </h1>

            <p className="text-[#4A443F] text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              From our landmark workshop in Brajarajnagar, we craft bespoke wedding cards—featuring 10/5 UK pearl series, glitter finishes, 3D pop-up mandaps, royal velvet scrolls—alongside durable office filing systems and custom school supplies.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                id="hero-explore-cards-btn"
                onClick={onExploreCards}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-sans text-xs uppercase tracking-widest font-medium shadow-xs transition-all"
              >
                <span>Browse 500+ Wedding Designs</span>
                <ArrowRight className="w-4 h-4 text-[#F2EDE4]" />
              </button>

              <button
                id="hero-open-customizer-btn"
                onClick={onOpenCustomizer}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#2D2926] font-sans text-xs uppercase tracking-widest font-medium transition-all"
              >
                <Palette className="w-4 h-4 text-[#8B0000]" />
                <span>Live Card Designer</span>
              </button>

              <button
                id="hero-stationery-btn"
                onClick={onExploreStationery}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-[#4A443F] hover:text-[#8B0000] hover:bg-[#F2EDE4] font-sans text-xs uppercase tracking-widest font-medium transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-[#A69076]" />
                <span>Office & School Filing</span>
              </button>
            </div>

            {/* Value bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E5E1DA]">
              <div className="flex items-center gap-2 text-[#4A443F] text-xs font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>Rates from ₹4.80/pc</span>
              </div>
              <div className="flex items-center gap-2 text-[#4A443F] text-xs font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>Odia, Hindi & English</span>
              </div>
              <div className="flex items-center gap-2 text-[#4A443F] text-xs font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>Fast Sample Proofing</span>
              </div>
              <div className="flex items-center gap-2 text-[#4A443F] text-xs font-sans">
                <CheckCircle2 className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>Doorstep Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#F2EDE4] border border-[#D1CABF] rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#D1CABF]/80 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#8B0000]" />
                  <span className="font-royal font-bold text-sm text-[#2D2926]">Spotlight Craftsmanship</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider bg-[#FAF9F6] text-[#8B0000] border border-[#D1CABF] px-2.5 py-0.5 rounded-full font-sans font-medium">
                  Direct Manufacturer
                </span>
              </div>

              {/* Visual Showcase Box */}
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-[#FAF9F6] border border-[#E5E1DA]">
                <img 
                  src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85" 
                  alt="Chhabilal Wedding Card 10/5 UK Pearl Edition" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = './logo.png';
                  }}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <span className="text-[#D4AF37] text-[11px] font-sans font-bold uppercase tracking-widest">Top Recommended</span>
                  <p className="text-white font-serif-luxury text-base font-bold">10/5 UK Pearl Series with Gold Foil Stamping</p>
                  <p className="text-[#F2EDE4] text-xs font-sans">Starting @ ₹9.80 in bulk • 320 GSM Imported Sheet</p>
                </div>
              </div>

              {/* Quick Action inside Box */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={onOpenCalculator}
                  className="w-full text-center py-2.5 px-3 rounded-lg bg-[#FAF9F6] hover:bg-white border border-[#D1CABF] text-[#4A443F] text-xs uppercase tracking-wider font-sans font-medium transition-colors"
                >
                  Estimate Total Cost
                </button>
                <a
                  href="https://wa.me/919348341358?text=Hello%20Chhabilal%20Cards,%20I%20am%20interested%20in%20wedding%20invitations%20catalogue."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 px-3 rounded-lg bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-sans font-medium transition-colors"
                >
                  WhatsApp Direct
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
