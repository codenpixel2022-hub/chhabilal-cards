import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Filter, 
  Palette, 
  ShoppingBag, 
  Eye, 
  ArrowUpDown, 
  Star, 
  Gift,
  Heart
} from 'lucide-react';
import { WEDDING_CARDS_DATA } from '../data/products';
import { ProductItem } from '../types';

interface CatalogSectionProps {
  searchQuery: string;
  onSelectProduct: (product: ProductItem) => void;
  onOpenCustomizerWithProduct: (product: ProductItem) => void;
  onAddToQuote: (product: ProductItem, quantity: number, notes: string, color: string) => void;
  onOpenSampleModal: () => void;
  wishlistIds?: string[];
  onToggleWishlist?: (product: ProductItem) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  searchQuery,
  onSelectProduct,
  onOpenCustomizerWithProduct,
  onAddToQuote,
  onOpenSampleModal,
  wishlistIds = [],
  onToggleWishlist,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const themes = [
    { id: 'all', label: 'All Wedding Designs' },
    { id: 'metallic-pearl', label: 'UK Metallic & Pearl' },
    { id: '3d-popup', label: '3D Pop-Up Mandap' },
    { id: 'scroll-farman', label: 'Royal Farman Scroll' },
    { id: 'laser-cut', label: 'Laser Cut Filigree' },
    { id: 'modern-floral', label: '8/8 Floral Art' },
    { id: 'traditional-royal', label: 'Traditional & Heritage' },
  ];

  const filteredProducts = useMemo(() => {
    return WEDDING_CARDS_DATA.filter((item) => {
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCode = item.code.toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesTags && !matchesDesc) {
          return false;
        }
      }

      // Theme match
      if (selectedTheme !== 'all' && item.theme !== selectedTheme) {
        return false;
      }

      // Budget match
      if (selectedBudget === 'economy' && item.pricePerPiece > 15) return false;
      if (selectedBudget === 'premium' && (item.pricePerPiece <= 15 || item.pricePerPiece > 35)) return false;
      if (selectedBudget === 'luxury' && item.pricePerPiece <= 35) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerPiece - b.pricePerPiece;
      if (sortBy === 'price-desc') return b.pricePerPiece - a.pricePerPiece;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: best sellers first
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return 0;
    });
  }, [searchQuery, selectedTheme, selectedBudget, sortBy]);

  return (
    <section id="wedding-cards-catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E5E1DA] pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#A69076] text-xs font-sans uppercase tracking-widest font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>Jharsuguda Handcrafted Collection</span>
          </div>
          <h2 className="font-royal text-2xl sm:text-3xl font-bold text-[#8B0000] mt-1">
            Exquisite Wedding Invitation Cards
          </h2>
          <p className="text-[#4A443F] text-xs sm:text-sm mt-1 max-w-2xl font-sans leading-relaxed">
            Explore hundreds of bespoke wedding cards manufactured directly at our Brajarajnagar facility. Includes pearl finish, glitter textures, wooden scroll rods, and precision 3D paper crafts.
          </p>
        </div>

        <button
          onClick={onOpenSampleModal}
          className="flex items-center gap-2 self-start md:self-auto px-4 py-2.5 rounded-xl bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#4A443F] text-xs uppercase tracking-wider font-sans font-medium transition-all shrink-0"
        >
          <Gift className="w-4 h-4 text-[#8B0000]" />
          <span>Request Paper Swatch Box</span>
        </button>
      </div>

      {/* Filter & Sort Toolbar */}
      <div className="space-y-4 bg-[#F2EDE4] p-4 rounded-2xl border border-[#E5E1DA] shadow-xs">
        {/* Themes Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs uppercase tracking-wider font-sans font-semibold text-[#8C847C] shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-[#8B0000]" /> Filter:
          </span>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-sans uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedTheme === theme.id
                  ? 'bg-[#8B0000] text-white shadow-xs font-medium'
                  : 'bg-[#FAF9F6] text-[#4A443F] border border-[#E5E1DA] hover:bg-[#E5E1DA]'
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>

        {/* Second Row: Budget Filter & Sort Selection */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E5E1DA] text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="text-[#8C847C] font-medium uppercase tracking-wider">Price Bracket:</span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'all', label: 'All Budgets' },
                { id: 'economy', label: 'Budget (< ₹15)' },
                { id: 'premium', label: 'Mid (₹15 – ₹35)' },
                { id: 'luxury', label: 'Royal (₹35+)' },
              ].map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBudget(b.id)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    selectedBudget === b.id
                      ? 'bg-[#8B0000] text-white font-medium shadow-xs'
                      : 'bg-[#FAF9F6] text-[#4A443F] border border-[#E5E1DA] hover:bg-[#E5E1DA]'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8C847C]" />
            <span className="text-[#8C847C] font-medium uppercase tracking-wider">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF9F6] border border-[#D1CABF] rounded-lg px-2.5 py-1 text-xs font-medium text-[#2D2926] outline-none focus:border-[#8B0000] cursor-pointer"
            >
              <option value="recommended">Featured / Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#F2EDE4] rounded-2xl border border-[#E5E1DA] p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F6] text-[#8B0000] border border-[#D1CABF] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-royal text-lg font-bold text-[#2D2926]">No matching wedding cards found</h3>
          <p className="text-xs text-[#4A443F] max-w-md mx-auto font-sans">
            Try adjusting your search keywords or resetting your budget/theme filters to see our full catalogue.
          </p>
          <button
            onClick={() => {
              setSelectedTheme('all');
              setSelectedBudget('all');
            }}
            className="px-4 py-2 rounded-lg bg-[#8B0000] text-white text-xs uppercase tracking-wider font-medium shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
            <div
              key={product.id}
              className="group flex flex-col bg-[#FAF9F6] rounded-2xl border border-[#E5E1DA] hover:border-[#8B0000] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Product Image Stage */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F2EDE4]">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                  {product.isBestSeller && (
                    <span className="bg-[#8B0000] text-[#FAF9F6] text-[10px] uppercase tracking-wider font-sans font-bold px-2 py-0.5 rounded shadow-xs">
                      Best Seller
                    </span>
                  )}
                  {product.isNewArrival && (
                    <span className="bg-[#4A443F] text-[#FAF9F6] text-[10px] uppercase tracking-wider font-sans font-bold px-2 py-0.5 rounded shadow-xs">
                      New Design
                    </span>
                  )}
                </div>

                <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-[#FAF9F6] text-[10px] font-mono px-2 py-0.5 rounded z-10">
                  {product.code}
                </div>

                {/* Wishlist Quick Toggle Heart */}
                {onToggleWishlist && (
                  <button
                    id={`wishlist-toggle-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
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

                {/* Quick overlay actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="p-2.5 bg-[#FAF9F6] text-[#2D2926] rounded-full hover:scale-110 transition-transform shadow-md"
                    title="View Full Specifications"
                  >
                    <Eye className="w-4 h-4 text-[#8B0000]" />
                  </button>
                  <button
                    onClick={() => onOpenCustomizerWithProduct(product)}
                    className="p-2.5 bg-[#8B0000] text-white rounded-full hover:scale-110 transition-transform shadow-md"
                    title="Open Live Card Designer"
                  >
                    <Palette className="w-4 h-4 text-[#FAF9F6]" />
                  </button>
                </div>
              </div>

              {/* Product Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8C847C] mb-1 font-sans">
                    <span className="uppercase tracking-wider">{product.subCategory}</span>
                    <div className="flex items-center text-[#8B0000] font-semibold">
                      <Star className="w-3 h-3 fill-[#8B0000] text-[#8B0000] mr-0.5" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="font-serif-luxury font-bold text-[#2D2926] text-base leading-snug line-clamp-1 hover:text-[#8B0000] cursor-pointer transition-colors"
                  >
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-[#4A443F] line-clamp-2 mt-1 font-sans leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Paper spec chip */}
                {product.paperType && (
                  <div className="text-[10px] text-[#6B655F] bg-[#F2EDE4] border border-[#E5E1DA] px-2 py-1 rounded truncate font-sans">
                    📄 {product.gsm ? `${product.gsm} GSM • ` : ''}{product.paperType}
                  </div>
                )}

                {/* Pricing & Order Actions */}
                <div className="pt-2 border-t border-[#E5E1DA]">
                  <div className="flex items-baseline justify-between font-sans">
                    <div>
                      <span className="text-[10px] text-[#8C847C] uppercase tracking-wider">Starts from</span>
                      <div className="text-base font-extrabold text-[#8B0000]">
                        ₹{product.pricePerPiece.toFixed(2)}
                        <span className="text-[11px] font-normal text-[#8C847C]"> / pc</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#8C847C] font-medium">
                      MOQ: {product.minOrderQuantity} pcs
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 font-sans">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full py-2 px-2 text-center text-xs uppercase tracking-wider font-medium text-[#4A443F] bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] rounded-lg transition-colors"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => onAddToQuote(product, product.minOrderQuantity, '', product.colorsAvailable[0] || 'Default')}
                      className="w-full py-2 px-2 flex items-center justify-center gap-1 text-center text-xs uppercase tracking-wider font-semibold text-white bg-[#8B0000] hover:bg-[#6D0000] rounded-lg transition-colors shadow-xs"
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
      )}
    </section>
  );
};
