import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, Heart, Award, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data/reviews';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenSampleModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenSampleModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1F1916] text-[#E5E1DA] border-t border-[#D1CABF]/30 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B0000] flex items-center justify-center text-[#F2EDE4] font-royal font-bold text-xl border border-[#D4AF37]/50 shadow-sm">
                CC
              </div>
              <div>
                <span className="font-royal font-bold text-xl text-[#FAF9F6] tracking-wide block">
                  CHHABILAL CARDS
                </span>
                <span className="text-[11px] text-[#A69076] uppercase tracking-wider">
                  Wedding Cards & Stationery Hub
                </span>
              </div>
            </div>

            <p className="text-[#D1CABF] text-xs leading-relaxed max-w-sm">
              Western Odisha's premier house for 10/5 UK pearl cards, glitter textures, 3D pop-up mandaps, royal velvet scrolls, office lever arch box files, and custom school bag merchandise.
            </p>

            <div className="inline-flex items-center gap-2 bg-[#FAF9F6]/10 border border-[#D1CABF]/20 text-[#E5E1DA] px-3 py-1 rounded-full text-[11px]">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>GST Registered Since 2017 • Justdial 4.8★ Verified</span>
            </div>
          </div>

          {/* Quick Nav Collections */}
          <div className="space-y-3">
            <h4 className="font-royal font-bold text-[#FAF9F6] text-sm tracking-wider uppercase">
              Wedding Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#D1CABF]">
              <li>
                <button 
                  onClick={() => { setActiveTab('wedding-cards'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  10/5 UK Pearl Series
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('wedding-cards'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  10/5 UK Glitter Coated
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('wedding-cards'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  8/8 Square Floral Art
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('wedding-cards'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  3D Pop-Up Mandap Series
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('wedding-cards'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  Royal Farman Scrolls
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('wedding-cards'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  Laser Cut Filigree Gates
                </button>
              </li>
            </ul>
          </div>

          {/* Stationery & Tools */}
          <div className="space-y-3">
            <h4 className="font-royal font-bold text-[#FAF9F6] text-sm tracking-wider uppercase">
              Stationery & Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#D1CABF]">
              <li>
                <button 
                  onClick={() => { setActiveTab('stationery'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  Lever Arch Box Files
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('stationery'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  Crystal Transparent Files
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('stationery'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  Cobra Clip Record Files
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('stationery'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  PVC ID Cards & Satin Lanyards
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('customizer'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left font-medium text-[#D4AF37]"
                >
                  ✨ Live Card Designer Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('calculator'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left"
                >
                  Bulk Price Estimator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('about'); scrollToTop(); }}
                  className="hover:text-white transition-colors text-left font-medium text-[#D4AF37]"
                >
                  🚚 Track Manufacturing / Dispatch
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSampleModal}
                  className="hover:text-white transition-colors text-left text-[#FAF9F6] font-semibold"
                >
                  📦 Order Sample Swatch Kit
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-royal font-bold text-[#FAF9F6] text-sm tracking-wider uppercase">
              Workshop Contact
            </h4>
            <div className="space-y-2 text-xs text-[#D1CABF]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
                <span>Rajpur, Baghrachaka, Brajarajnagar, Jharsuguda, Odisha - 768216</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8B0000] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone1}`} className="hover:text-white">{BUSINESS_INFO.phone1}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>{BUSINESS_INFO.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>8:30 AM – 9:00 PM (All 7 Days)</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#D1CABF]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A69076]">
          <p>© {new Date().getFullYear()} Chhabilal Cards. All rights reserved. Registered under GST since 2017.</p>
          <div className="flex items-center gap-4">
            <span>Brajarajnagar, Jharsuguda, Odisha</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 bg-[#FAF9F6]/10 hover:bg-[#FAF9F6]/20 text-[#FAF9F6] rounded-lg flex items-center gap-1 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
