import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle, ShoppingBag, Truck, Building, FileText, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Order } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order, whatsappUrl?: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const { items, subtotal, submitCheckoutOrder } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [businessName, setBusinessName] = useState(user?.businessName || '');
  const [gstNumber, setGstNumber] = useState(user?.gstNumber || '');

  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Brajarajnagar');
  const [state, setState] = useState('Odisha');
  const [pincode, setPincode] = useState('768216');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail || !street || !city || !pincode) {
      setErrorMsg('Please fill in all required contact and shipping details.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const res = await submitCheckoutOrder({
      customerName,
      customerPhone,
      customerEmail,
      businessName,
      gstNumber,
      street,
      landmark,
      city,
      state,
      pincode,
      notes,
    });

    setIsSubmitting(false);

    if (res.success && res.order) {
      onOrderSuccess(res.order, res.whatsappUrl);
      onClose();
    } else {
      setErrorMsg(res.message || 'Failed to submit order request.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div 
        className="w-full max-w-2xl bg-[#FAF9F6] rounded-3xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#58141C] text-[#FAF9F6] p-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FAF9F6]/10 border border-[#D4AF37]/40 rounded-xl">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-royal font-bold text-lg text-[#F2EDE4]">Wholesale Order Request</h3>
              <p className="text-[11px] text-[#E5E1DA]/80 uppercase tracking-wider">No online payment required • Pay on Proofing/Dispatch</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#E5E1DA] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Customer & Business Info */}
          <div className="space-y-3">
            <h4 className="font-royal font-bold text-sm text-[#8B0000] border-b border-[#E5E1DA] pb-1 uppercase tracking-wider">
              1. Contact & Business Details
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#2D2926]">Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D2926]">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D2926]">Email Address *</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D2926]">School / Business Name (Optional)</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. St. Xavier School / Family Name"
                  className="w-full px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="space-y-3">
            <h4 className="font-royal font-bold text-sm text-[#8B0000] border-b border-[#E5E1DA] pb-1 uppercase tracking-wider">
              2. Odisha & Pan-India Dispatch Address
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-[#2D2926]">Street Address & House No. *</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. Rajpur Main Road, Near Bus Stand"
                  className="w-full px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D2926]">City / District *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#2D2926]">Pincode *</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F2EDE4] border border-[#D1CABF] rounded-xl text-xs text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Summary */}
          <div className="bg-[#F2EDE4] p-4 rounded-2xl border border-[#D1CABF] space-y-2">
            <div className="flex justify-between text-xs font-bold text-[#2D2926]">
              <span>Selected Items:</span>
              <span>{items.length} Products</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#8B0000]">
              <span>Estimated Order Total:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-[#666]">
              * Official tax invoice & proofing layout will be generated by Chhabilal Cards within 12 hours.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-semibold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Submitting Order Request...' : 'Submit Wholesale Order Request'}
            <ArrowRight className="w-4 h-4 text-[#F2EDE4]" />
          </button>
        </form>
      </div>
    </div>
  );
};
