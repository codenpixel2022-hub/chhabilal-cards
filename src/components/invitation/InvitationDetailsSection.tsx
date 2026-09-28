import React, { useState } from 'react';
import { Sparkles, Layers, ShieldCheck, Award, Feathr, Stamp } from 'lucide-react';
import lifestyleImg from '../../assets/invitation/lifestyle-reference.png';
import closedImg from '../../assets/invitation/closed-reference.png';
import openImg from '../../assets/invitation/fully-open-reference.png';

export const InvitationDetailsSection: React.FC = () => {
  const [activeDetail, setActiveDetail] = useState<number>(0);

  const details = [
    {
      id: 0,
      title: 'Imported 350 GSM Italian Linen Board',
      subtitle: 'Tactile Shimmer & High-Sheen Texture',
      description: 'Engineered with heavy-weight 350 GSM pearlescent stock imported from European paper mills. Features micro-embossed linen grid texture that catches ambient warm lighting with subtle lustre.',
      badge: 'Material Excellence',
      image: lifestyleImg,
    },
    {
      id: 1,
      title: '24K Antique Gold Foil Embossing',
      subtitle: 'Precision Hot Foil Stamping',
      description: 'Every Lord Ganesha emblem, royal crown border, and shloka inscription undergoes multi-stage hydraulic hot-foil stamping for deep dimensional debossing and non-tarnishing gold brilliant gleam.',
      badge: 'Royal Craftsmanship',
      image: closedImg,
    },
    {
      id: 2,
      title: 'Handcrafted Wax Seal & Velvet Ribbon',
      subtitle: 'Authentic Imperial Monogram',
      description: 'The physical invitation band is completed with an authentic crimson wax seal motif stamped with classic monograms and paired with soft satin/velvet silk ribbon ties.',
      badge: 'Traditional Finishing',
      image: openImg,
    },
    {
      id: 3,
      title: 'Multilingual Odia, Hindi & English Typography',
      subtitle: 'Precision Script Calligraphy',
      description: 'Custom typesetters in Jharsuguda proofread and render pure Odia scripts, Devanagari Hindi shlokas, and formal English invite wording with flawless alignment and vector precision.',
      badge: 'Localized Typography',
      image: lifestyleImg,
    },
  ];

  return (
    <section id="invitation-details" className="bg-[#FAF9F6] py-20 px-4 sm:px-6 border-t border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto space-y-12 font-sans">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#F2EDE4] border border-[#D4AF37]/50 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#8B0000]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Section 05 • Craftsmanship Focus</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-[#2D2926]">
            Every Detail, Thoughtfully Crafted
          </h2>
          <p className="text-sm sm:text-base text-[#4A443F]">
            We believe that a wedding invitation is not merely paper—it is the very first tactile experience of your life’s grandest celebration.
          </p>
        </div>

        {/* Interactive Feature Spotlight Container */}
        <div className="bg-[#F2EDE4]/60 border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          
          {/* Left Buttons Navigation (4 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {details.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveDetail(idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  activeDetail === idx
                    ? 'bg-[#FAF9F6] border-[#D4AF37] shadow-md translate-x-2'
                    : 'bg-[#FAF9F6]/50 border-[#D1CABF]/50 hover:bg-[#FAF9F6] hover:border-[#D1CABF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B0000]">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#8C847C]">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-royal font-bold text-base text-[#2D2926] mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#4A443F] mt-1 line-clamp-1 font-serif-luxury italic">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* Right Image Showcase + Text (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 bg-[#FAF9F6] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-8 shadow-inner">
            <div className="aspect-16/9 rounded-xl overflow-hidden bg-[#EBE4D8] relative border border-[#D1CABF]">
              <img
                src={details[activeDetail].image}
                alt={details[activeDetail].title}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 bg-[#FAF9F6]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 text-xs font-bold text-[#8B0000]">
                ✨ {details[activeDetail].badge}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-royal text-2xl font-bold text-[#2D2926]">
                {details[activeDetail].title}
              </h3>
              <p className="text-sm text-[#4A443F] leading-relaxed">
                {details[activeDetail].description}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
