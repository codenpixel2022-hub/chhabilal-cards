import React from 'react';
import { 
  Award, 
  CheckCircle, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ChevronRight,
  LayerGroup,
  Layers,
  Sparkle
} from 'lucide-react';
import { ProductItem } from '../../types';
import lifestyleRefImg from '../../assets/invitation/lifestyle-reference.png';

interface ProductShowcaseSectionProps {
  onOpenCustomizer?: () => void;
  onOpenSampleModal?: () => void;
  onAddToQuote?: (product: ProductItem, quantity: number, notes: string, color: string) => void;
}

export const ProductShowcaseSection: React.FC<ProductShowcaseSectionProps> = ({
  onOpenCustomizer,
  onOpenSampleModal,
  onAddToQuote,
}) => {
  // Mock product item corresponding to the reference gatefold design
  const gatefoldProduct: ProductItem = {
    id: 'wc-gatefold-01',
    name: 'Royal Velvet Gatefold Card with Gold Wax Seal',
    category: 'wedding-cards',
    subCategory: 'Royal Gatefold & Box Series',
    theme: 'traditional-royal',
    code: 'CC-GF-ROYAL-01',
    pricePerPiece: 28.50,
    minOrderQuantity: 100,
    discountTiers: [
      { minQty: 100, price: 28.50 },
      { minQty: 250, price: 24.80 },
      { minQty: 500, price: 21.50 },
      { minQty: 1000, price: 18.90 },
    ],
    rating: 5.0,
    reviewsCount: 42,
    tags: ['3D Interactive', 'Velvet Belly Band', 'Gold Wax Seal', 'Royal Gatefold'],
    paperType: '340 GSM Imported Pearl Linen Cardstock',
    gsm: 340,
    dimensions: '7.5 x 5.5 inches (Closed) | 15 x 5.5 inches (Open)',
    includedInserts: 2,
    features: [
      '3-Panel Gatefold opening mechanism',
      'Burgundy velvet removable belly band',
      'Antique gold embossed wax seal medallion',
      'Multilingual Odia, Hindi & English typography',
      'Hot-stamp gold foil mandap & Ganesha artwork'
    ],
    isBestSeller: true,
    isNewArrival: true,
    description: 'Our flagship 3-panel luxury gatefold wedding card crafted from imported 340 GSM pearl linen cardboard. Encased in a deep burgundy velvet belly band with an antique gold wax seal medallion.',
    sampleAvailable: true,
    colorsAvailable: ['Crimson Burgundy & Gold', 'Royal Navy & Silver', 'Emerald Green & Gold'],
    imageUrl: lifestyleRefImg,
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 font-sans space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#F2EDE4] text-[#8B0000] border border-[#D1CABF] px-3.5 py-1 rounded-full text-xs uppercase tracking-wider font-semibold">
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Flagship Physical Craftsmanship</span>
        </div>
        
        <h2 className="font-royal text-3xl sm:text-4xl font-bold text-[#8B0000]">
          Royal 3-Panel Gatefold Wedding Card
        </h2>
        
        <p className="text-[#4A443F] text-sm leading-relaxed">
          Inspired by Western Odisha's royal matrimonial traditions. Handcrafted at our Brajarajnagar workshop using imported metallic linen sheets, gold foil embossing, and deep velvet sleeve closures.
        </p>
      </div>

      {/* Feature Grid with Lifestyle Reference Photography */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF9F6] p-6 sm:p-8 rounded-3xl border border-[#E5E1DA] shadow-sm">
        
        {/* Left Side: Lifestyle Photography Showcase */}
        <div className="lg:col-span-6 relative group rounded-2xl overflow-hidden border border-[#D1CABF] shadow-md bg-[#F2EDE4]">
          <img 
            src={lifestyleRefImg} 
            alt="Royal Velvet Gatefold Lifestyle Photography"
            className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37]">
              Lifestyle Product Photography
            </span>
            <h3 className="font-royal text-xl font-bold text-[#FAF9F6]">
              340 GSM Imperial Pearl Linen & Velvet Sleeve
            </h3>
          </div>
        </div>

        {/* Right Side: Craftsmanship Breakdown & Specifications */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#8C847C] uppercase tracking-wider">
              Item Code: {gatefoldProduct.code}
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-royal text-3xl font-bold text-[#8B0000]">
                ₹{gatefoldProduct.pricePerPiece.toFixed(2)}
              </span>
              <span className="text-xs text-[#8C847C]">/ piece (Min. 100 pcs)</span>
              <span className="bg-[#8B0000]/10 text-[#8B0000] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                Wholesale Direct
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF] space-y-1">
              <span className="text-[11px] text-[#8C847C] uppercase tracking-wider block font-bold">Paper Material</span>
              <span className="text-xs font-semibold text-[#2D2926]">{gatefoldProduct.paperType}</span>
            </div>
            <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF] space-y-1">
              <span className="text-[11px] text-[#8C847C] uppercase tracking-wider block font-bold">Opening Mechanism</span>
              <span className="text-xs font-semibold text-[#2D2926]">3-Panel Vertical Hinge Gatefold</span>
            </div>
            <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF] space-y-1">
              <span className="text-[11px] text-[#8C847C] uppercase tracking-wider block font-bold">Band & Seal</span>
              <span className="text-xs font-semibold text-[#2D2926]">Velvet Band + Gold Wax Seal</span>
            </div>
            <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF] space-y-1">
              <span className="text-[11px] text-[#8C847C] uppercase tracking-wider block font-bold">Dispatch Time</span>
              <span className="text-xs font-semibold text-[#2D2926]">2–4 Days (Western Odisha)</span>
            </div>
          </div>

          {/* Key Features Bullet List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#2D2926] uppercase tracking-wider block">
              Handcrafted Highlights:
            </span>
            <div className="space-y-1.5">
              {gatefoldProduct.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#4A443F]">
                  <CheckCircle className="w-4 h-4 text-[#8B0000] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            {onAddToQuote && (
              <button
                onClick={() => onAddToQuote(gatefoldProduct, 200, 'Royal Velvet Gatefold Inquiry', 'Crimson Burgundy & Gold')}
                className="flex-1 min-w-[180px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-semibold shadow-xs transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#F2EDE4]" />
                <span>Add to Inquiry Bag</span>
              </button>
            )}

            {onOpenSampleModal && (
              <button
                onClick={onOpenSampleModal}
                className="flex-1 min-w-[160px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2D2926] hover:bg-black text-white text-xs uppercase tracking-wider font-semibold shadow-xs transition-all"
              >
                <span>Request Sample Kit</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </section>
  );
};
