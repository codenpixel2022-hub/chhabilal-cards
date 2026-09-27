import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Gift, 
  Sparkles, 
  CheckCircle2, 
  Truck
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/reviews';

interface SampleKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleKitModal: React.FC<SampleKitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Odisha',
    pincode: '',
    eventType: 'Wedding Invitation',
    expectedQty: '250',
    selectedInterests: ['10/5 UK Pearl Series', '3D Pop-Up Series', 'Hot Gold Foil Swatches'],
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const sampleTypes = [
    '10/5 UK Pearl Series',
    '10/5 UK Glitter Texture',
    '3D Pop-Up Series',
    'Royal Farman Silk Scroll',
    'Floral Laser Cut Gates',
    'Hot Gold Foil Swatches',
    'Office Box File Swatch',
    'PVC ID Card & Lanyard'
  ];

  const toggleInterest = (type: string) => {
    if (form.selectedInterests.includes(type)) {
      setForm({ ...form, selectedInterests: form.selectedInterests.filter(t => t !== type) });
    } else {
      setForm({ ...form, selectedInterests: [...form.selectedInterests, type] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 70, spread: 60 });
    setIsSubmitted(true);

    const message = `Hello Chhabilal Cards! I would like to request a Physical Sample Swatch Kit:

*Name:* ${form.name}
*Phone:* ${form.phone}
*Delivery Address:* ${form.address}, ${form.city}, ${form.state} - ${form.pincode}
*Event Type:* ${form.eventType}
*Expected Order Quantity:* ${form.expectedQty} pcs
*Interested Samples:* ${form.selectedInterests.join(', ')}

Please dispatch the sample box to my address. Thank you!`;

    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#FAF9F6] rounded-2xl shadow-xl border border-[#E5E1DA] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E1DA] bg-[#F2EDE4] font-sans">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#8B0000] text-white rounded-lg shadow-xs">
              <Gift className="w-5 h-5 text-[#F2EDE4]" />
            </div>
            <div>
              <h3 className="font-royal font-bold text-base text-[#8B0000]">Physical Paper Swatch Box</h3>
              <p className="text-[11px] text-[#8C847C] uppercase tracking-wider">Touch & feel actual papers, hot foils & textures</p>
            </div>
          </div>
          <button
            id="close-sample-modal-btn"
            onClick={onClose}
            className="p-1.5 text-[#8C847C] hover:text-[#2D2926] hover:bg-[#E5E1DA] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 font-sans">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F2EDE4] text-[#8B0000] border border-[#D1CABF] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-royal text-xl font-bold text-[#2D2926]">Sample Kit Requested!</h4>
              <p className="text-xs text-[#4A443F] max-w-xs mx-auto">
                Your sample kit inquiry has been shared with Chhabilal Cards team. We will contact you on WhatsApp (+91 {form.phone}) with dispatch tracking.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#8B0000] text-white text-xs uppercase tracking-wider font-semibold rounded-xl shadow-xs"
              >
                Close & Continue Browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#D1CABF] text-xs text-[#4A443F] flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                <span>
                  Our sample box contains <strong className="text-[#2D2926]">actual 300+ GSM paper sheets, hot foil stamp swatches, pearl finishes, and 3D card samples</strong> delivered to your doorstep.
                </span>
              </div>

              {/* Sample type selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest block">
                  Select Swatches You Want to Examine:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {sampleTypes.map((type) => (
                    <label 
                      key={type}
                      className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                        form.selectedInterests.includes(type)
                          ? 'border-[#8B0000] bg-[#F2EDE4] text-[#8B0000] font-medium'
                          : 'border-[#E5E1DA] text-[#4A443F] hover:bg-[#F2EDE4]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.selectedInterests.includes(type)}
                        onChange={() => toggleInterest(type)}
                        className="accent-[#8B0000] w-3.5 h-3.5"
                      />
                      <span className="truncate">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact and Address */}
              <div className="space-y-2.5 pt-2 border-t border-[#E5E1DA] text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block font-medium">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg outline-none focus:border-[#8B0000] text-[#2D2926]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block font-medium">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg outline-none focus:border-[#8B0000] text-[#2D2926]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block font-medium">Delivery Street Address *</label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="House/Plot number, Area, Landmark"
                    className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg outline-none focus:border-[#8B0000] text-[#2D2926]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block font-medium">City / District *</label>
                    <input
                      type="text"
                      required
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      placeholder="e.g. Jharsuguda"
                      className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg outline-none focus:border-[#8B0000] text-[#2D2926]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block font-medium">State</label>
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg outline-none focus:border-[#8B0000] text-[#2D2926]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block font-medium">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      placeholder="768216"
                      className="w-full px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg outline-none focus:border-[#8B0000] text-[#2D2926]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="submit-sample-request-btn"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-semibold text-xs uppercase tracking-wider shadow-xs transition-all mt-3"
              >
                <Truck className="w-4 h-4 text-[#F2EDE4]" />
                <span>Request Sample Kit & Dispatch on WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
