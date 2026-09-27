import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  MessageCircle, 
  Copy, 
  Check, 
  Plus, 
  Minus 
} from 'lucide-react';
import { QuoteItem } from '../types';
import { BUSINESS_INFO } from '../data/reviews';

interface QuoteInquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
}

export const QuoteInquiryDrawer: React.FC<QuoteInquiryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [copied, setCopied] = useState(false);

  // Calculate item pricing based on discount tiers
  const getItemPrice = (item: QuoteItem) => {
    const p = item.product;
    if (!p.discountTiers || p.discountTiers.length === 0) {
      return p.pricePerPiece;
    }
    const tiers = [...p.discountTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of tiers) {
      if (item.quantity >= tier.minQty) {
        return tier.price;
      }
    }
    return p.pricePerPiece;
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const estimatedSubtotal = items.reduce((acc, item) => {
    return acc + (getItemPrice(item) * item.quantity);
  }, 0);

  const getFormattedMessage = () => {
    let msg = `*CHHABILAL CARDS - INQUIRY REQUEST*\n`;
    if (customerName) msg += `*Customer:* ${customerName}\n`;
    if (customerCity) msg += `*Location:* ${customerCity}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    
    items.forEach((item, idx) => {
      const price = getItemPrice(item);
      const total = price * item.quantity;
      msg += `${idx + 1}. *${item.product.name}* (Code: ${item.product.code})\n`;
      msg += `   • Quantity: ${item.quantity} units @ ₹${price.toFixed(2)}/unit\n`;
      if (item.selectedColor) msg += `   • Color/Finish: ${item.selectedColor}\n`;
      if (item.customizationNotes) msg += `   • Note: ${item.customizationNotes}\n`;
      msg += `   • Subtotal: ₹${total.toFixed(2)}\n\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*ESTIMATED TOTAL:* ₹${estimatedSubtotal.toFixed(2)}\n`;
    msg += `*Total Units:* ${totalItemsCount} units\n\n`;
    msg += `Please check stock, printing proofing schedule, and dispatch options. Thank you!`;

    return msg;
  };

  const handleWhatsAppSend = () => {
    const text = getFormattedMessage();
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E5E1DA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E5E1DA] bg-[#F2EDE4] flex items-center justify-between font-sans">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#8B0000] text-white rounded-lg shadow-xs">
              <ShoppingBag className="w-4 h-4 text-[#F2EDE4]" />
            </div>
            <div>
              <h3 className="font-royal font-bold text-base text-[#8B0000]">Inquiry & Quote Bag</h3>
              <p className="text-[11px] text-[#8C847C] uppercase tracking-wider">{items.length} unique items ({totalItemsCount} units)</p>
            </div>
          </div>

          <button
            id="close-quote-drawer-btn"
            onClick={onClose}
            className="p-1.5 text-[#8C847C] hover:text-[#2D2926] hover:bg-[#E5E1DA] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F2EDE4] text-[#8B0000] border border-[#D1CABF] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="font-royal text-base font-bold text-[#2D2926]">Your Inquiry Bag is Empty</h4>
              <p className="text-xs text-[#4A443F] max-w-xs mx-auto">
                Browse our wedding cards collection or office stationery supplies and click "Inquire" to build your custom price quote.
              </p>
            </div>
          ) : (
            <>
              {/* Customer quick contact input */}
              <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF] space-y-2 text-xs">
                <span className="font-bold text-[#2D2926] uppercase tracking-wider block">Your Details (For Invoice/Quote):</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name / School"
                    className="px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md outline-none focus:border-[#8B0000] text-xs text-[#2D2926]"
                  />
                  <input
                    type="text"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="City (e.g. Jharsuguda)"
                    className="px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md outline-none focus:border-[#8B0000] text-xs text-[#2D2926]"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {items.map((item) => {
                  const unitPrice = getItemPrice(item);
                  const itemTotal = unitPrice * item.quantity;
                  return (
                    <div 
                      key={item.product.id}
                      className="bg-[#FAF9F6] p-3 rounded-xl border border-[#E5E1DA] shadow-xs space-y-2"
                    >
                      <div className="flex gap-3">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded-lg bg-[#F2EDE4] border border-[#E5E1DA] shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-[#2D2926] text-xs truncate">{item.product.name}</h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-[#8C847C] hover:text-[#8B0000] p-1 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[10px] text-[#8C847C] font-mono">Code: {item.product.code}</span>
                          {item.selectedColor && (
                            <div className="text-[10px] text-[#8B0000] font-medium uppercase tracking-wider">Color: {item.selectedColor}</div>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Price Controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#E5E1DA] text-xs">
                        <div className="flex items-center gap-1.5 bg-[#F2EDE4] p-1 rounded-lg border border-[#D1CABF]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, Math.max(item.product.minOrderQuantity || 10, item.quantity - 50))}
                            className="w-5 h-5 rounded bg-[#FAF9F6] text-[#2D2926] hover:bg-white flex items-center justify-center font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold text-[#2D2926]">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 50)}
                            className="w-5 h-5 rounded bg-[#FAF9F6] text-[#2D2926] hover:bg-white flex items-center justify-center font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <span className="text-[10px] text-[#8C847C] ml-1">units</span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-[#8C847C]">@ ₹{unitPrice.toFixed(2)}/unit</span>
                          <div className="font-bold text-[#8B0000] text-sm">₹{itemTotal.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {items.length > 1 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-[#8B0000] hover:underline font-medium block mx-auto pt-1 uppercase tracking-wider"
                >
                  Clear All Items
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer with Total & Direct WhatsApp CTA */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#E5E1DA] bg-[#F2EDE4] space-y-3 font-sans">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C847C] uppercase tracking-wider">Estimated Total Cost:</span>
                <div className="text-2xl font-royal font-bold text-[#8B0000]">
                  ₹{estimatedSubtotal.toFixed(2)}
                </div>
              </div>
              <div className="text-right text-[11px] text-[#8C847C] uppercase tracking-wider">
                {totalItemsCount} Total Pieces
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                id="drawer-whatsapp-quote-btn"
                onClick={handleWhatsAppSend}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-medium text-xs uppercase tracking-wider shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#F2EDE4]" />
                <span>Submit Inquiry on WhatsApp</span>
              </button>

              <button
                id="drawer-copy-summary-btn"
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F2EDE4] border border-[#D1CABF] text-[#4A443F] text-xs uppercase tracking-wider font-medium transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#8B0000]" /> : <Copy className="w-3.5 h-3.5 text-[#A69076]" />}
                <span>{copied ? 'Quotation Copied to Clipboard!' : 'Copy Summary Text'}</span>
              </button>
            </div>

            <p className="text-[10px] text-[#8C847C] text-center">
              Direct response from Chhabilal Cards team in Brajarajnagar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
