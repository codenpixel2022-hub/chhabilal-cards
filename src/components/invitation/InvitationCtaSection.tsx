import React from 'react';
import { Sparkles, ArrowRight, Phone, MessageSquare, ShieldCheck } from 'lucide-react';

interface InvitationCtaSectionProps {
  onOpenCustomizer?: () => void;
  onOpenCalculator?: () => void;
  onOpenWhatsApp?: (topic?: string) => void;
}

export const InvitationCtaSection: React.FC<InvitationCtaSectionProps> = ({
  onOpenCustomizer,
  onOpenCalculator,
  onOpenWhatsApp,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-[#FAF9F6] via-[#FAF6EE] to-[#F2EDE4] py-24 px-4 sm:px-6 overflow-hidden border-t border-[#E5E1DA]">
      {/* Background Ornament Texture */}
      <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#D4AF37_1.5px,transparent_1.5px)] [background-size:28px_28px]"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8 font-sans">
        
        <div className="inline-flex items-center gap-2 bg-[#F2EDE4] border border-[#D4AF37]/50 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#8B0000]">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Section 07 • Western Odisha’s Premier Cards House</span>
        </div>

        <h2 className="font-royal text-4xl sm:text-6xl font-bold text-[#2D2926] tracking-tight leading-tight">
          Make Your Invitation <br />
          <span className="text-[#8B0000] font-serif-luxury italic">
            Part of the Celebration.
          </span>
        </h2>

        <p className="text-sm sm:text-lg text-[#4A443F] max-w-2xl mx-auto leading-relaxed">
          Visit our landmark workshop in Brajarajnagar, Jharsuguda, or collaborate directly over WhatsApp for custom gold foil proofing, sample dispatch, and bulk wholesale rates across Odisha.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Create Your Invitation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {onOpenWhatsApp && (
            <button
              onClick={() => onOpenWhatsApp?.('Wholesale Bulk Invitation Enquiry')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE57] text-white font-sans text-xs uppercase tracking-widest font-bold shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct Consult</span>
            </button>
          )}

          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#FAF9F6] hover:bg-[#F2EDE4] border border-[#D1CABF] text-[#2D2926] font-sans text-xs uppercase tracking-widest font-bold transition-colors"
            >
              <span>Bulk Price Calculator</span>
            </button>
          )}
        </div>

        {/* Reassurance Footer */}
        <div className="pt-8 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-center gap-6 text-xs text-[#8C847C] font-semibold">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#8B0000]" />
            <span>Guaranteed Fast Proofing in 24 Hours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#8B0000]" />
            <span>Wholesale Pricing Starting @ ₹4.80</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#8B0000]" />
            <span>Multi-District Odisha Doorstep Dispatch</span>
          </div>
        </div>

      </div>
    </section>
  );
};
