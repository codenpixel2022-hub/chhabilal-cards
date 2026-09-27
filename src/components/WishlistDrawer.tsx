import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  ShoppingBag, 
  Palette, 
  MessageCircle, 
  ExternalLink,
  Sparkles,
  Check,
  Share2
} from 'lucide-react';
import { ProductItem } from '../types';
import { BUSINESS_INFO } from '../data/reviews';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: ProductItem[];
  onRemoveFromWishlist: (productId: string) => void;
  onClearWishlist: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onOpenCustomizerWithProduct: (product: ProductItem) => void;
  onAddToQuote: (product: ProductItem, quantity: number, notes: string, color: string) => void;
  onExploreCards: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onClearWishlist,
  onSelectProduct,
  onOpenCustomizerWithProduct,
  onAddToQuote,
  onExploreCards,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedAllSuccess, setAddedAllSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAddAllToQuote = () => {
    wishlistProducts.forEach((product) => {
      onAddToQuote(
        product,
        product.minOrderQuantity || 100,
        'Added from Wishlist',
        product.colorsAvailable[0] || 'Default'
      );
    });
    setAddedAllSuccess(true);
    setTimeout(() => {
      setAddedAllSuccess(false);
    }, 2500);
  };

  const handleShareWhatsAppWishlist = () => {
    let text = `*MY SAVED WISHLIST - CHHABILAL CARDS*\n`;
    text += `Hello! I have shortlisted the following cards & stationery designs from your catalog:\n\n`;
    
    wishlistProducts.forEach((p, idx) => {
      text += `${idx + 1}. *${p.name}* (Code: ${p.code})\n`;
      text += `   • Starting Rate: ₹${p.pricePerPiece.toFixed(2)}/pc (MOQ: ${p.minOrderQuantity})\n`;
      if (p.paperType) text += `   • Paper: ${p.paperType}\n`;
      text += `\n`;
    });

    text += `━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Total Saved Designs: ${wishlistProducts.length}\n`;
    text += `Please send sample photos, customization options, and delivery timeline to Jharsuguda/Western Odisha. Thank you!`;

    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyWishlistText = () => {
    let text = `*My Shortlisted Chhabilal Cards:*\n`;
    wishlistProducts.forEach((p, idx) => {
      text += `${idx + 1}. ${p.name} (${p.code}) - ₹${p.pricePerPiece.toFixed(2)}/pc\n`;
    });
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-lg bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E5E1DA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E5E1DA] bg-[#F2EDE4] flex items-center justify-between font-sans">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#8B0000] text-white rounded-lg shadow-xs">
              <Heart className="w-4 h-4 text-[#FAF9F6] fill-[#FAF9F6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-royal font-bold text-base text-[#8B0000]">My Saved Wishlist</h3>
                <span className="bg-[#FAF9F6] text-[#8B0000] border border-[#D1CABF] text-[11px] font-bold px-2 py-0.2 rounded-full">
                  {wishlistProducts.length}
                </span>
              </div>
              <p className="text-[11px] text-[#8C847C] uppercase tracking-wider">
                Saved locally on your browser
              </p>
            </div>
          </div>

          <button
            id="close-wishlist-drawer-btn"
            onClick={onClose}
            className="p-1.5 text-[#8C847C] hover:text-[#2D2926] hover:bg-[#E5E1DA] rounded-full transition-colors"
            title="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 space-y-4 px-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F2EDE4] text-[#8B0000] border border-[#D1CABF] flex items-center justify-center mx-auto shadow-inner">
                <Heart className="w-8 h-8 text-[#A69076]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-royal text-lg font-bold text-[#2D2926]">Your Wishlist is Empty</h4>
                <p className="text-xs text-[#4A443F] max-w-xs mx-auto leading-relaxed">
                  Click the heart icon on any wedding card or office stationery product to save your favorites here for later reference.
                </p>
              </div>

              <button
                id="wishlist-explore-catalog-btn"
                onClick={() => {
                  onClose();
                  onExploreCards();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-semibold shadow-xs transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Explore Wedding Catalog</span>
              </button>
            </div>
          ) : (
            <>
              {/* Top Quick Action Bar */}
              <div className="flex items-center justify-between bg-[#F2EDE4] px-3.5 py-2 rounded-xl border border-[#D1CABF] text-xs">
                <span className="text-[#4A443F] font-medium">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Design' : 'Designs'} Shortlisted
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyWishlistText}
                    className="text-[#8B0000] hover:underline text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Share2 className="w-3 h-3" />}
                    <span>{copiedLink ? 'Copied' : 'Share List'}</span>
                  </button>
                  <span className="text-[#D1CABF]">|</span>
                  <button
                    onClick={onClearWishlist}
                    className="text-[#8C847C] hover:text-[#8B0000] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#E5E1DA] hover:border-[#A69076] shadow-xs space-y-3 transition-all"
                  >
                    <div className="flex gap-3">
                      {/* Product Thumbnail */}
                      <div 
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F2EDE4] border border-[#E5E1DA] shrink-0 cursor-pointer group"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        {product.isBestSeller && (
                          <div className="absolute top-1 left-1 bg-[#8B0000] text-white text-[8px] font-bold px-1 rounded uppercase">
                            ★ Top
                          </div>
                        )}
                      </div>

                      {/* Product Information */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 
                              onClick={() => {
                                onClose();
                                onSelectProduct(product);
                              }}
                              className="font-bold text-[#2D2926] text-xs leading-snug truncate hover:text-[#8B0000] cursor-pointer"
                            >
                              {product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveFromWishlist(product.id)}
                              className="p-1 text-[#8C847C] hover:text-[#8B0000] hover:bg-[#F2EDE4] rounded transition-colors shrink-0"
                              title="Remove from wishlist"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#8C847C] font-mono">
                            <span>Code: {product.code}</span>
                            <span>•</span>
                            <span className="font-sans font-semibold text-[#8B0000]">
                              ₹{product.pricePerPiece.toFixed(2)}/pc
                            </span>
                          </div>

                          {product.paperType && (
                            <p className="text-[10px] text-[#4A443F] truncate mt-1">
                              📄 {product.paperType}
                            </p>
                          )}
                        </div>

                        <div className="text-[10px] text-[#8C847C]">
                          Min Order: {product.minOrderQuantity} units
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons for this item */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[#E5E1DA] text-xs">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="py-1.5 px-2 bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#4A443F] rounded-lg text-[11px] uppercase tracking-wider font-medium text-center transition-colors truncate"
                      >
                        Specs
                      </button>

                      {product.category === 'wedding-cards' ? (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenCustomizerWithProduct(product);
                          }}
                          className="py-1.5 px-2 bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#8B0000] rounded-lg text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1 transition-colors truncate"
                        >
                          <Palette className="w-3 h-3 text-[#8B0000]" />
                          <span>Design</span>
                        </button>
                      ) : (
                        <a
                          href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(`Hello Chhabilal Cards, inquiring about wishlist item: ${product.name} (${product.code})`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2 bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#2D2926] rounded-lg text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1 transition-colors truncate"
                        >
                          <MessageCircle className="w-3 h-3 text-[#8B0000]" />
                          <span>Inquire</span>
                        </a>
                      )}

                      <button
                        onClick={() => {
                          onAddToQuote(
                            product, 
                            product.minOrderQuantity || 100, 
                            'Shortlisted from Wishlist', 
                            product.colorsAvailable[0] || 'Default'
                          );
                        }}
                        className="py-1.5 px-2 bg-[#8B0000] hover:bg-[#6D0000] text-white rounded-lg text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1 shadow-xs transition-colors truncate"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#F2EDE4]" />
                        <span>Add Bag</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer with Batch CTAs */}
        {wishlistProducts.length > 0 && (
          <div className="p-4 border-t border-[#E5E1DA] bg-[#F2EDE4] space-y-2.5 font-sans">
            <button
              id="wishlist-add-all-btn"
              onClick={handleAddAllToQuote}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-semibold text-xs uppercase tracking-wider shadow-xs transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#FAF9F6]" />
              <span>{addedAllSuccess ? 'All Added to Inquiry Bag!' : 'Add All to Inquiry Bag'}</span>
            </button>

            <button
              id="wishlist-whatsapp-all-btn"
              onClick={handleShareWhatsAppWishlist}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2D2926] hover:bg-black text-white font-medium text-xs uppercase tracking-wider shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Send All Favorites via WhatsApp</span>
            </button>

            <p className="text-[10px] text-[#8C847C] text-center">
              Items remain securely saved on this device for your next visit.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
