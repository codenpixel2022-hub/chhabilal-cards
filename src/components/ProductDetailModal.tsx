import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShoppingBag, 
  MessageCircle, 
  Palette, 
  ShieldCheck, 
  Star,
  Heart
} from 'lucide-react';
import { ProductItem } from '../types';
import { BUSINESS_INFO } from '../data/reviews';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToQuote: (product: ProductItem, quantity: number, notes: string, color: string) => void;
  onOpenCustomizerWithProduct?: (product: ProductItem) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
  onOpenCustomizerWithProduct,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(product.minOrderQuantity || 100);
  const [selectedColor, setSelectedColor] = useState<string>(product.colorsAvailable[0] || 'Default');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Calculate current effective price per piece based on quantity tiers
  const getEffectivePrice = (qty: number) => {
    if (!product.discountTiers || product.discountTiers.length === 0) {
      return product.pricePerPiece;
    }
    const tiers = [...product.discountTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of tiers) {
      if (qty >= tier.minQty) {
        return tier.price;
      }
    }
    return product.pricePerPiece;
  };

  const effectivePrice = getEffectivePrice(quantity);
  const totalPrice = (effectivePrice * quantity).toFixed(2);
  const savings = ((product.pricePerPiece - effectivePrice) * quantity).toFixed(2);

  const handleAdd = () => {
    onAddToQuote(product, quantity, customNotes, selectedColor);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
    }, 2000);
  };

  const generateWhatsAppUrl = () => {
    const text = `Hello Chhabilal Cards! I am interested in:
*Product:* ${product.name} (Code: ${product.code})
*Quantity:* ${quantity} pcs
*Estimated Rate:* ₹${effectivePrice}/pc (Total: ~₹${totalPrice})
*Selected Color:* ${selectedColor}
${customNotes ? `*Special Request:* ${customNotes}` : ''}

Please share print sample proofs and delivery details to my location.`;
    return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF9F6] rounded-2xl shadow-xl border border-[#E5E1DA] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E1DA] bg-[#F2EDE4]">
          <div className="flex items-center gap-2 font-sans">
            <span className="bg-[#FAF9F6] text-[#8B0000] border border-[#D1CABF] text-xs px-2.5 py-0.5 rounded-full font-bold">
              {product.code}
            </span>
            <span className="text-xs text-[#8C847C] uppercase tracking-wider">
              {product.category === 'wedding-cards' ? 'Wedding Collection' : 'Stationery Hub'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleWishlist && (
              <button
                id="modal-wishlist-toggle-btn"
                onClick={() => onToggleWishlist(product)}
                className={`p-1.5 rounded-full transition-colors flex items-center gap-1.5 px-3 text-xs uppercase tracking-wider font-sans font-medium ${
                  isWishlisted 
                    ? 'bg-[#8B0000] text-white' 
                    : 'bg-[#FAF9F6] text-[#4A443F] border border-[#D1CABF] hover:bg-[#E5E1DA]'
                }`}
                title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white text-white' : 'text-[#8B0000]'}`} />
                <span className="hidden sm:inline">{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            )}
            <button
              id="close-product-modal-btn"
              onClick={onClose}
              className="p-1.5 text-[#8C847C] hover:text-[#2D2926] hover:bg-[#E5E1DA] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[80vh] overflow-y-auto">
          {/* Left Column: Image & Quick Specs */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-[#F2EDE4] border border-[#E5E1DA]">
              <img
                src={product.imageUrl}
                alt={product.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=85';
                }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.isBestSeller && (
                <div className="absolute top-2.5 left-2.5 bg-[#8B0000] text-white text-[11px] font-sans font-bold px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
                  ★ Best Seller
                </div>
              )}
            </div>

            {/* Quick Specs Table */}
            <div className="bg-[#F2EDE4] rounded-xl p-3.5 border border-[#D1CABF] text-xs font-sans space-y-2">
              <h4 className="font-semibold text-[#2D2926] text-xs tracking-wider uppercase">Specifications</h4>
              {product.paperType && (
                <div className="flex justify-between border-b border-[#D1CABF]/60 pb-1">
                  <span className="text-[#8C847C]">Material / Paper:</span>
                  <span className="font-medium text-[#2D2926] text-right max-w-[150px] truncate">{product.paperType}</span>
                </div>
              )}
              {product.gsm && (
                <div className="flex justify-between border-b border-[#D1CABF]/60 pb-1">
                  <span className="text-[#8C847C]">Thickness (GSM):</span>
                  <span className="font-medium text-[#2D2926]">{product.gsm} GSM</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between border-b border-[#D1CABF]/60 pb-1">
                  <span className="text-[#8C847C]">Dimensions:</span>
                  <span className="font-medium text-[#2D2926]">{product.dimensions}</span>
                </div>
              )}
              {product.includedInserts && (
                <div className="flex justify-between">
                  <span className="text-[#8C847C]">Leaf Inserts:</span>
                  <span className="font-medium text-[#2D2926]">{product.includedInserts} Leaves Included</span>
                </div>
              )}
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-2 text-xs text-[#4A443F] bg-[#F2EDE4] p-2.5 rounded-lg border border-[#D1CABF] font-sans">
              <ShieldCheck className="w-4 h-4 text-[#8B0000] shrink-0" />
              <span>Chhabilal Cards Quality Guarantee with free digital proofing before final batch print.</span>
            </div>
          </div>

          {/* Right Column: Title, Tier Pricing & Inquiry Form */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#8B0000] font-medium font-sans">
                <div className="flex items-center">
                  <Star className="w-3.5 h-3.5 fill-[#8B0000] text-[#8B0000]" />
                  <span className="ml-1 text-[#2D2926] font-bold">{product.rating}</span>
                </div>
                <span>•</span>
                <span className="text-[#8C847C]">{product.reviewsCount} customer reviews</span>
              </div>
              <h2 className="font-royal text-xl sm:text-2xl font-bold text-[#8B0000] mt-1">
                {product.name}
              </h2>
              <p className="text-xs text-[#4A443F] mt-1 font-sans leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features bullet list */}
            <div className="space-y-1 font-sans">
              <h4 className="text-xs font-semibold text-[#2D2926] uppercase tracking-wider">Features & Finishes</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-[#4A443F]">
                    <Check className="w-3.5 h-3.5 text-[#8B0000] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bulk Pricing Tier Chart */}
            {product.discountTiers && product.discountTiers.length > 0 && (
              <div className="space-y-1.5 font-sans">
                <h4 className="text-xs font-semibold text-[#2D2926] flex items-center justify-between uppercase tracking-wider">
                  <span>Wholesale & Bulk Price Tiers:</span>
                  <span className="text-[11px] text-[#8B0000] font-normal lowercase">Higher quantity = lower rate</span>
                </h4>
                <div className="grid grid-cols-4 gap-1.5">
                  {product.discountTiers.map((tier) => (
                    <div 
                      key={tier.minQty}
                      className={`p-2 rounded-lg text-center border text-xs transition-all ${
                        quantity >= tier.minQty 
                          ? 'border-[#8B0000] bg-[#F2EDE4] text-[#8B0000] font-medium' 
                          : 'border-[#E5E1DA] bg-[#FAF9F6] text-[#8C847C]'
                      }`}
                    >
                      <div className="font-bold text-sm">₹{tier.price.toFixed(2)}</div>
                      <div className="text-[10px] text-[#8C847C]">{tier.minQty}+ pcs</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Color Option Selector */}
            {product.colorsAvailable.length > 0 && (
              <div className="space-y-1.5 font-sans">
                <label className="text-xs font-semibold text-[#2D2926] uppercase tracking-wider block">Select Color / Finish:</label>
                <div className="flex flex-wrap gap-2">
                  {product.colorsAvailable.map((clr) => (
                    <button
                      key={clr}
                      type="button"
                      onClick={() => setSelectedColor(clr)}
                      className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all ${
                        selectedColor === clr
                          ? 'bg-[#8B0000] text-white font-medium shadow-xs'
                          : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA] border border-[#D1CABF]'
                      }`}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Slider & Dynamic Price Calculation */}
            <div className="bg-[#F2EDE4] p-4 rounded-xl border border-[#D1CABF] space-y-3 font-sans">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#2D2926] uppercase tracking-wider">Order Quantity:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={product.minOrderQuantity || 50}
                    step="50"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(product.minOrderQuantity || 1, parseInt(e.target.value) || 0))}
                    className="w-24 px-2.5 py-1 text-right text-sm font-bold bg-[#FAF9F6] border border-[#D1CABF] rounded-md focus:border-[#8B0000] outline-none text-[#2D2926]"
                  />
                  <span className="text-xs text-[#8C847C]">pcs</span>
                </div>
              </div>

              {/* Live Cost Summary */}
              <div className="flex items-center justify-between pt-2 border-t border-[#D1CABF]">
                <div>
                  <span className="text-xs text-[#8C847C] uppercase tracking-wider">Rate per piece:</span>
                  <div className="text-base font-bold text-[#8B0000]">₹{effectivePrice.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#8C847C] uppercase tracking-wider">Estimated Total:</span>
                  <div className="text-lg font-extrabold text-[#8B0000]">₹{totalPrice}</div>
                  {parseFloat(savings) > 0 && (
                    <span className="text-[11px] text-[#8B0000] font-medium">You save ₹{savings} on bulk!</span>
                  )}
                </div>
              </div>

              {/* Custom notes input */}
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="Optional notes (e.g. need in Odia script / extra leaf)..."
                className="w-full text-xs px-3 py-2 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg outline-none focus:border-[#8B0000] text-[#2D2926]"
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  id="modal-add-to-quote-btn"
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-medium text-xs uppercase tracking-wider shadow-xs transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#F2EDE4]" />
                  <span>{isAddedSuccess ? 'Added to Inquiry Bag!' : 'Add to Inquiry Bag'}</span>
                </button>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2D2926] hover:bg-black text-white font-medium text-xs uppercase tracking-wider shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

              {product.category === 'wedding-cards' && onOpenCustomizerWithProduct && (
                <button
                  id="modal-customize-btn"
                  onClick={() => {
                    onClose();
                    onOpenCustomizerWithProduct(product);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FAF9F6] hover:bg-[#F2EDE4] border border-[#D1CABF] text-[#4A443F] font-medium text-xs uppercase tracking-wider transition-colors"
                >
                  <Palette className="w-4 h-4 text-[#8B0000]" />
                  <span>Open in Live Card Designer Studio</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
