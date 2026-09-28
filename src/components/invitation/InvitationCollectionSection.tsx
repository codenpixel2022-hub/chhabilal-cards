import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Eye, Heart, Check, Filter } from 'lucide-react';
import { ProductItem } from '../../types';
import { ALL_PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface InvitationCollectionSectionProps {
  onSelectProduct?: (product: ProductItem) => void;
  onOpenWhatsApp?: (productName: string) => void;
}

export const InvitationCollectionSection: React.FC<InvitationCollectionSectionProps> = ({
  onSelectProduct,
  onOpenWhatsApp,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Collections' },
    { id: 'wedding-cards', label: 'Wedding Invitations' },
    { id: 'engagement', label: 'Engagement & Roka' },
    { id: 'reception', label: 'Anniversary & Events' },
    { id: 'stationery', label: 'Office & School Supplies' },
  ];

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'wedding-cards') return product.category === 'wedding-cards';
    if (activeCategory === 'engagement') return product.category === 'engagement-cards' || product.subCategory?.includes('Engagement');
    if (activeCategory === 'reception') return product.category === 'anniversary-cards' || product.category === 'event-cards';
    if (activeCategory === 'stationery') return product.category === 'office-stationery' || product.category === 'school-stationery';
    return true;
  });

  const handleAddToCart = (product: ProductItem) => {
    addToCart(product, product.minOrderQuantity || 100);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section id="invitation-collection" className="bg-[#FAF9F6] py-20 px-4 sm:px-6 border-t border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto space-y-12 font-sans">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#F2EDE4] border border-[#D1CABF] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#8B0000]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Section 04 • Curated Luxury Catalog</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-[#2D2926]">
            The Chhabilal Masterpiece Collection
          </h2>
          <p className="text-sm sm:text-base text-[#4A443F]">
            From high-sheen imported pearl metallic sheets to heavy-duty office lever files—engineered with wholesale pricing for Jharsuguda and across India.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#8B0000] text-white shadow-md'
                  : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA] hover:text-[#2D2926] border border-[#D1CABF]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#FAF9F6] border border-[#D1CABF]/80 hover:border-[#D4AF37] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-1"
            >
              {/* Product Image Box */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#F2EDE4] cursor-pointer" onClick={() => onSelectProduct?.(product)}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.isBestSeller && (
                    <span className="bg-[#8B0000] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
                      Best Seller
                    </span>
                  )}
                  {product.isNewArrival && (
                    <span className="bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
                      New Arrival
                    </span>
                  )}
                </div>

                {/* MOQ Badge */}
                <div className="absolute bottom-3 right-3 bg-[#FAF9F6]/90 backdrop-blur-md text-[#2D2926] text-[11px] font-semibold px-3 py-1 rounded-full border border-[#D1CABF]">
                  MOQ: {product.minOrderQuantity || 100} Pcs
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C847C]">
                    {product.subCategory || product.category}
                  </span>
                  <h3
                    className="font-royal font-bold text-lg text-[#2D2926] hover:text-[#8B0000] cursor-pointer transition-colors line-clamp-2"
                    onClick={() => onSelectProduct?.(product)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#4A443F] line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-[#E5E1DA] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-[#8C847C] font-semibold block">Wholesale Rate</span>
                      <span className="font-royal text-xl font-bold text-[#8B0000]">
                        ₹{product.pricePerPiece.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#8C847C] ml-1">/ piece</span>
                    </div>

                    <span className="text-xs text-[#8B0000] font-semibold underline cursor-pointer" onClick={() => onSelectProduct?.(product)}>
                      View Details
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
                        addedId === product.id
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#8B0000] hover:bg-[#6D0000] text-white shadow-xs'
                      }`}
                    >
                      {addedId === product.id ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                      <span>{addedId === product.id ? 'Added!' : 'Add to Cart'}</span>
                    </button>

                    <button
                      onClick={() => onOpenWhatsApp?.(product.name)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#2D2926] text-xs uppercase tracking-wider font-semibold transition-colors"
                    >
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
