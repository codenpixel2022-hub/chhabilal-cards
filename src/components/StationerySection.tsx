import React, { useState } from 'react';
import { 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Check, 
  ShoppingBag, 
  MessageCircle,
  Heart
} from 'lucide-react';
import { STATIONERY_DATA } from '../data/products';
import { ProductItem } from '../types';
import { BUSINESS_INFO } from '../data/reviews';

interface StationerySectionProps {
  onSelectProduct: (product: ProductItem) => void;
  onAddToQuote: (product: ProductItem, quantity: number, notes: string, color: string) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (product: ProductItem) => void;
}

export const StationerySection: React.FC<StationerySectionProps> = ({
  onSelectProduct,
  onAddToQuote,
  wishlistIds = [],
  onToggleWishlist,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'office' | 'school'>('all');

  const filteredItems = STATIONERY_DATA.filter((item) => {
    if (activeSubTab === 'office' && item.category !== 'office-stationery') return false;
    if (activeSubTab === 'school' && item.category !== 'school-stationery') return false;
    return true;
  });

  return (
    <section id="stationery-hub" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Section Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E1DA] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#A69076] text-xs uppercase tracking-widest font-sans font-medium">
            <FileText className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>Commercial & Institutional Supplies</span>
          </div>
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#8B0000] mt-1">
            Office Files, Folders & School Merchandise
          </h2>
          <p className="text-[#4A443F] text-xs sm:text-sm mt-1 max-w-2xl font-sans leading-relaxed">
            Supplying government departments, legal chambers, schools, and corporate institutions throughout Jharsuguda, Sambalpur, and Rourkela with heavy-duty filing solutions and custom printed merchandise.
          </p>
        </div>

        {/* Sub Category Switcher */}
        <div className="flex items-center gap-2 bg-[#F2EDE4] p-1.5 rounded-xl border border-[#E5E1DA] text-xs font-sans self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-medium transition-all ${
              activeSubTab === 'all' ? 'bg-[#8B0000] text-white shadow-xs' : 'text-[#4A443F] hover:bg-[#E5E1DA]'
            }`}
          >
            All Supplies
          </button>
          <button
            onClick={() => setActiveSubTab('office')}
            className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-medium transition-all flex items-center gap-1 ${
              activeSubTab === 'office' ? 'bg-[#8B0000] text-white shadow-xs' : 'text-[#4A443F] hover:bg-[#E5E1DA]'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            Office & Files
          </button>
          <button
            onClick={() => setActiveSubTab('school')}
            className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-medium transition-all flex items-center gap-1 ${
              activeSubTab === 'school' ? 'bg-[#8B0000] text-white shadow-xs' : 'text-[#4A443F] hover:bg-[#E5E1DA]'
            }`}
          >
            <GraduationCap className="w-3 h-3" />
            School & ID Cards
          </button>
        </div>
      </div>

      {/* Grid of Stationery items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const isWishlisted = wishlistIds.includes(item.id);
          return (
          <div
            key={item.id}
            className="group flex flex-col bg-[#FAF9F6] rounded-2xl border border-[#E5E1DA] hover:border-[#8B0000] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Image Preview */}
            <div className="relative aspect-[16/10] bg-[#F2EDE4] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=900&q=85';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-[#FAF9F6] text-[10px] font-mono px-2 py-0.5 rounded z-10">
                {item.code}
              </div>
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="bg-[#FAF9F6] text-[#8B0000] text-[10px] uppercase tracking-wider font-sans font-bold px-2 py-0.5 rounded border border-[#E5E1DA] shadow-xs">
                  {item.subCategory}
                </span>
              </div>

              {/* Wishlist Heart Toggle */}
              {onToggleWishlist && (
                <button
                  id={`wishlist-toggle-${item.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(item);
                  }}
                  className={`absolute bottom-2.5 right-2.5 z-20 p-2 rounded-full transition-all shadow-md ${
                    isWishlisted 
                      ? 'bg-[#8B0000] text-white' 
                      : 'bg-[#FAF9F6]/90 text-[#4A443F] hover:text-[#8B0000] hover:bg-white'
                  }`}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-white text-white' : 'text-[#8B0000]'}`} />
                </button>
              )}
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 
                  onClick={() => onSelectProduct(item)}
                  className="font-bold text-[#2D2926] text-base leading-snug hover:text-[#8B0000] cursor-pointer transition-colors"
                >
                  {item.name}
                </h3>
                <p className="text-xs text-[#4A443F] mt-1.5 font-sans leading-relaxed">
                  {item.description}
                </p>

                {/* Features List */}
                <div className="mt-3 space-y-1">
                  {item.features.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-[#4A443F] font-sans">
                      <Check className="w-3.5 h-3.5 text-[#8B0000] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-3 border-t border-[#E5E1DA]">
                <div className="flex items-baseline justify-between mb-3 font-sans">
                  <div>
                    <span className="text-[10px] text-[#8C847C] uppercase tracking-wider">Wholesale from</span>
                    <div className="text-lg font-extrabold text-[#8B0000]">
                      ₹{item.pricePerPiece.toFixed(2)}
                      <span className="text-xs font-normal text-[#8C847C]"> / unit</span>
                    </div>
                  </div>
                  <span className="text-xs text-[#8C847C] font-medium">
                    MOQ: {item.minOrderQuantity} units
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 font-sans">
                  <button
                    onClick={() => onSelectProduct(item)}
                    className="py-2 px-3 text-center text-xs uppercase tracking-wider font-medium text-[#4A443F] bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] rounded-lg transition-colors"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => onAddToQuote(item, item.minOrderQuantity, '', item.colorsAvailable[0] || 'Default')}
                    className="py-2 px-3 flex items-center justify-center gap-1 text-center text-xs uppercase tracking-wider font-semibold text-white bg-[#8B0000] hover:bg-[#6D0000] rounded-lg transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#F2EDE4]" />
                    <span>Inquire</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </div>

      {/* Institutional Inquiry Callout Banner */}
      <div className="bg-[#F2EDE4] rounded-2xl p-6 border border-[#D1CABF] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="font-royal text-lg font-bold text-[#2D2926]">
            Need Annual School or Government Bulk Procurement?
          </h4>
          <p className="text-xs text-[#4A443F] max-w-2xl font-sans">
            We provide official GST invoices, custom logo embossings on files, customized school notebook covers, and student identity card bulk printing batches.
          </p>
        </div>

        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('Hello Chhabilal Cards, I am inquiring regarding bulk school / office institutional stationery procurement.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-sans font-semibold shrink-0 shadow-xs transition-all"
        >
          <MessageCircle className="w-4 h-4 text-[#F2EDE4]" />
          <span>WhatsApp Institutional Desk</span>
        </a>
      </div>
    </section>
  );
};
