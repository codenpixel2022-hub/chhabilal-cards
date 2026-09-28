import React from 'react';
import { Calendar, MapPin, Clock, Heart, Sparkles, Send, Download } from 'lucide-react';
import { ProductItem, Quotation } from '../../types';
import { generatePrintableQuotation } from '../../services/pdf';

interface InvitationContentSectionProps {
  onOpenCustomizer?: () => void;
  onOpenWhatsApp?: (productName?: string) => void;
}

export const InvitationContentSection: React.FC<InvitationContentSectionProps> = ({
  onOpenCustomizer,
  onOpenWhatsApp,
}) => {
  const handleDownloadSample = () => {
    const mockQuotation: Quotation = {
      id: 'quote-sample-01',
      quotationNumber: 'QT-CHB-SAMPLE-2026',
      enquiryId: 'enq-sample-01',
      customerName: 'Ananya & Rohan (Sample Proof)',
      phone: '+91 94370 12345',
      email: 'sample@chhabilalcards.in',
      items: [
        {
          productId: 'wc-royal-mandap',
          productName: 'Royal 3D Gatefold Mandap Invitation',
          productCode: 'CC-3D-MNDP',
          quantity: 500,
          unitPrice: 38.00,
          discount: 10,
          subtotal: 19000.00,
          selectedColor: 'Royal Crimson & Gold',
        }
      ],
      subtotal: 19000.00,
      discountTotal: 1900.00,
      gstAmount: 855.00,
      shippingAmount: 0,
      grandTotal: 17955.00,
      validUntil: '2026-12-31',
      status: 'SENT',
      notes: 'Sample specification proof for Royal 3D Gatefold Card with 24K Gold Foil stamping.',
      createdAt: new Date().toISOString(),
    };

    generatePrintableQuotation(mockQuotation);
  };

  return (
    <section id="invitation-content" className="relative bg-gradient-to-b from-[#FAF9F6] via-[#F5EFE6] to-[#FAF9F6] py-20 px-4 sm:px-6 overflow-hidden">
      {/* Decorative Gold Filigree Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px]"></div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-12 text-center font-sans">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#F2EDE4] border border-[#D4AF37]/50 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#8B0000]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Section 03 • Unfolded Royal Invitation</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-[#2D2926]">
            The Sacred Invitation Content
          </h2>
          <p className="text-sm sm:text-base text-[#4A443F] max-w-2xl mx-auto font-serif-luxury italic">
            "Together with the blessings of Almighty Lord Ganesha and our elders, we request your graceful presence."
          </p>
        </div>

        {/* Physical Invitation Card Frame Mockup */}
        <div className="relative mx-auto max-w-3xl bg-[#FAF9F6] border-2 border-[#D4AF37] rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 backdrop-blur-md">
          
          {/* Top Auspicious Shloka Header */}
          <div className="space-y-2 border-b border-[#D4AF37]/30 pb-6">
            <p className="font-royal font-bold text-lg text-[#8B0000] tracking-widest">
              ॥ ॐ श्री गणेशाय नमः ॥
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#8C847C] tracking-wide">
              ॥ ଵକ୍ରତୁଣ୍ଡ ମହାକାଯ ସୂର୍ଯ୍ଯକୋଟି ସମପ୍ରଭ, ନିର୍ବିଘ୍ନଂ କୁରୁ ମେ ଦେଵ ସର୍ବକାର୍ଯ୍ଯେଷୁ ସର୍ବଦା ॥
            </p>
          </div>

          {/* Couple Announcement */}
          <div className="space-y-4 py-4">
            <span className="text-xs uppercase tracking-widest text-[#8C847C] font-semibold">
              Solemnizing The Holy Union Of
            </span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              <h3 className="font-royal text-4xl sm:text-6xl font-bold text-[#8B0000] tracking-tight">
                Ananya
              </h3>
              <Heart className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37]/20 animate-pulse shrink-0" />
              <h3 className="font-royal text-4xl sm:text-6xl font-bold text-[#8B0000] tracking-tight">
                Rohan
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4A443F] max-w-lg mx-auto font-serif-luxury italic">
              D/o Smt. Sunita & Shri Rajesh Mohanty (Jharsuguda) <br />
              S/o Smt. Pratima & Shri Suresh Patnaik (Sambalpur)
            </p>
          </div>

          {/* Event Timeline Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#D4AF37]/30 text-left">
            <div className="bg-[#F2EDE4]/70 p-4 rounded-2xl border border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#8B0000] font-bold text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>Mehendi & Sangeet</span>
              </div>
              <p className="text-xs text-[#2D2926] font-semibold">Friday, 11th Dec 2026</p>
              <p className="text-[11px] text-[#4A443F] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#8C847C]" /> 6:00 PM Onwards
              </p>
            </div>

            <div className="bg-[#F2EDE4]/70 p-4 rounded-2xl border border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#8B0000] font-bold text-xs uppercase tracking-wider">
                <Heart className="w-4 h-4 text-[#D4AF37]" />
                <span>Shubh Vivah Mandap</span>
              </div>
              <p className="text-xs text-[#2D2926] font-semibold">Saturday, 12th Dec 2026</p>
              <p className="text-[11px] text-[#4A443F] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#8C847C]" /> Hastakanya 7:30 PM
              </p>
            </div>

            <div className="bg-[#F2EDE4]/70 p-4 rounded-2xl border border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#8B0000] font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Royal Reception</span>
              </div>
              <p className="text-xs text-[#2D2926] font-semibold">Sunday, 13th Dec 2026</p>
              <p className="text-[11px] text-[#4A443F]">The Royal Palace Banquet, Jharsuguda</p>
            </div>
          </div>

          {/* Action CTAs inside Invitation View */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            {onOpenCustomizer && (
              <button
                onClick={onOpenCustomizer}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-widest font-semibold shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Personalize This Card Layout</span>
              </button>
            )}

            <button
              onClick={handleDownloadSample}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F2EDE4] border border-[#D4AF37] text-[#2D2926] text-xs uppercase tracking-widest font-semibold transition-all"
            >
              <Download className="w-4 h-4 text-[#8B0000]" />
              <span>Download Printable Sample Proof</span>
            </button>

            {onOpenWhatsApp && (
              <button
                onClick={() => onOpenWhatsApp('Royal 3D Gatefold Mandap Invitation')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE57] text-white text-xs uppercase tracking-widest font-semibold shadow-xs transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Ask Quotation on WhatsApp</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
