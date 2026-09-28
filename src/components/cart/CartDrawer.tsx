import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
  onOpenAuth: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onOpenCheckout,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  const { items, subtotal, totalQuantity, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  const handleProceedCheckout = () => {
    if (!user) {
      onOpenAuth();
    } else {
      onOpenCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end font-sans">
      <div 
        className="w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#D4AF37]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E5E1DA] bg-[#58141C] text-[#FAF9F6] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FAF9F6]/10 border border-[#D4AF37]/40 rounded-xl">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-royal font-bold text-base text-[#F2EDE4]">Wholesale Shopping Cart</h3>
              <p className="text-[11px] text-[#E5E1DA]/80 uppercase tracking-wider">{items.length} unique items ({totalQuantity} total units)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#E5E1DA] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#F2EDE4] text-[#8B0000] border border-[#D1CABF] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7 text-[#8B0000]" />
              </div>
              <h4 className="font-royal text-lg font-bold text-[#2D2926]">Your Cart is Empty</h4>
              <p className="text-xs text-[#4A443F] max-w-xs mx-auto">
                Browse our wedding cards collection or school/office stationery and click "Add to Cart" to build your wholesale order.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const moq = item.product.minOrderQuantity || 10;
                const isBelowMoq = item.quantity < moq;

                return (
                  <div 
                    key={item.product.id}
                    className="bg-[#FAF9F6] p-3.5 rounded-2xl border border-[#E5E1DA] shadow-xs space-y-3"
                  >
                    <div className="flex gap-3">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl bg-[#F2EDE4] border border-[#E5E1DA] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-[#2D2926] text-xs truncate">{item.product.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
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

                    {/* MOQ Warning */}
                    {isBelowMoq && (
                      <div className="flex items-center gap-1.5 p-2 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                        <span>Minimum order quantity for this item is {moq} units.</span>
                      </div>
                    )}

                    {/* Controls & Subtotal */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#E5E1DA]">
                      <div className="flex items-center gap-1.5 bg-[#F2EDE4] p-1 rounded-xl border border-[#D1CABF]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 50)}
                          className="w-6 h-6 rounded-lg bg-[#FAF9F6] text-[#2D2926] hover:bg-white flex items-center justify-center font-bold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold text-xs text-[#2D2926]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 50)}
                          className="w-6 h-6 rounded-lg bg-[#FAF9F6] text-[#2D2926] hover:bg-white flex items-center justify-center font-bold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="text-[10px] text-[#8C847C] ml-1">pcs</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-[#8C847C]">Subtotal</span>
                        <div className="font-bold text-[#8B0000] text-sm">
                          ₹{(item.product.pricePerPiece * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}

              <button
                onClick={clearCart}
                className="text-xs text-[#8B0000] hover:underline font-medium block mx-auto pt-2 uppercase tracking-wider"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Footer Checkout Trigger */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#E5E1DA] bg-[#F2EDE4] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C847C] uppercase tracking-wider">Estimated Subtotal:</span>
                <div className="text-2xl font-royal font-bold text-[#8B0000]">
                  ₹{subtotal.toFixed(2)}
                </div>
              </div>
              <div className="text-right text-[11px] text-[#8C847C] uppercase tracking-wider">
                {totalQuantity} Units
              </div>
            </div>

            <button
              onClick={handleProceedCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-medium text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <span>{user ? 'Proceed to Order Checkout' : 'Login / Register to Checkout'}</span>
              <ArrowRight className="w-4 h-4 text-[#F2EDE4]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
