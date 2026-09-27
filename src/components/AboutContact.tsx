import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  Star, 
  ShieldCheck, 
  Truck, 
  HelpCircle, 
  MessageCircle,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { BUSINESS_INFO, CUSTOMER_REVIEWS } from '../data/reviews';
import { OrderTracker } from './OrderTracker';

export const AboutContact: React.FC = () => {
  const faqs = [
    {
      q: 'What is the standard turnaround time for wedding cards printing?',
      a: 'Digital proofing is completed within 12–24 hours via WhatsApp. Once the proof is approved, standard printing and dispatch take 2–4 business days. Priority 24-48 hour rush printing is also available.'
    },
    {
      q: 'Can we print in Odia, Hindi, and English languages?',
      a: 'Yes! We specialize in multilingual wedding typography including pure Odia scripts, Hindi Devanagari, English, and bilingual combined layouts.'
    },
    {
      q: 'What is the Minimum Order Quantity (MOQ)?',
      a: 'For wedding cards, the MOQ is 50–100 pieces depending on the model (e.g. 3D pop-up and Farman scrolls start at 50 pcs). For office files and custom notebooks, MOQs start from 20–50 units.'
    },
    {
      q: 'Do you deliver across Odisha and pan-India?',
      a: 'Yes, we provide direct delivery and reliable courier dispatch across Jharsuguda, Sambalpur, Rourkela, Bargarh, Sundargarh, Bhubaneswar, and nationwide throughout India.'
    },
    {
      q: 'Do you offer GST billing for corporate and educational institutions?',
      a: 'Yes, Chhabilal Cards has been fully GST registered since 2017. All corporate, school, and government orders receive official GST tax invoices.'
    }
  ];

  return (
    <section id="about-and-contact" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* About Business Hero Block */}
      <div className="bg-[#58141C] text-[#FAF9F6] rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden border border-[#D4AF37]/30">
        <div className="relative z-10 max-w-3xl space-y-4 font-sans">
          <div className="inline-flex items-center gap-2 bg-[#FAF9F6]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-3.5 py-1 rounded-full text-xs uppercase tracking-wider font-semibold">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Serving Western Odisha & Pan-India Since 2017</span>
          </div>

          <h2 className="font-royal text-2xl sm:text-4xl font-bold text-[#F2EDE4]">
            About Chhabilal Cards
          </h2>

          <p className="text-[#E5E1DA] text-xs sm:text-sm leading-relaxed">
            Established in Brajarajnagar (Jharsuguda, Odisha), Chhabilal Cards has emerged as western Odisha's most trusted manufacturing house for opulent wedding invitations and durable office & educational stationery. 
          </p>

          <p className="text-[#E5E1DA] text-xs sm:text-sm leading-relaxed">
            We blend time-honored Indian aesthetic craftsmanship—like hot gold foil stamping, metallic pearl coatings, and 3D pop-up mandaps—with modern high-speed printing machinery to deliver unrivaled elegance at genuine factory-direct wholesale rates.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#D4AF37]/30 text-xs font-sans">
            <div>
              <div className="font-royal text-2xl font-bold text-[#D4AF37]">4.8★</div>
              <div className="text-[#E5E1DA]/80 text-[11px] uppercase tracking-wider">Justdial Rating</div>
            </div>
            <div>
              <div className="font-royal text-2xl font-bold text-[#D4AF37]">500+</div>
              <div className="text-[#E5E1DA]/80 text-[11px] uppercase tracking-wider">Invitation Designs</div>
            </div>
            <div>
              <div className="font-royal text-2xl font-bold text-[#D4AF37]">2017</div>
              <div className="text-[#E5E1DA]/80 text-[11px] uppercase tracking-wider">GST Registered</div>
            </div>
            <div>
              <div className="font-royal text-2xl font-bold text-[#D4AF37]">100%</div>
              <div className="text-[#E5E1DA]/80 text-[11px] uppercase tracking-wider">On-Time Dispatch</div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Customer Reviews Grid */}
      <div className="space-y-6 font-sans">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-semibold text-[#8B0000] uppercase tracking-wider">
            Real Customer Feedback
          </span>
          <h3 className="font-royal text-2xl sm:text-3xl font-bold text-[#8B0000]">
            Trusted by Families, Schools & Advocates
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.slice(0, 3).map((rev) => (
            <div 
              key={rev.id}
              className="bg-[#FAF9F6] rounded-2xl p-5 border border-[#E5E1DA] shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#8B0000]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#8B0000]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#8C847C] font-mono">{rev.date}</span>
                </div>
                <p className="text-xs text-[#4A443F] italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#E5E1DA] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#2D2926] text-xs">{rev.author}</div>
                  <div className="text-[10px] text-[#8C847C]">{rev.location}</div>
                </div>
                <span className="text-[10px] text-[#2D2926] bg-[#F2EDE4] border border-[#D1CABF] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
                  Verified Order
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location & Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-sans">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-royal text-xl font-bold text-[#2D2926]">
            Visit Our Store & Workshop
          </h3>
          
          <div className="bg-[#FAF9F6] rounded-2xl p-5 border border-[#E5E1DA] space-y-4 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-[#F2EDE4] text-[#8B0000] rounded-xl shrink-0 mt-0.5 border border-[#D1CABF]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-[#2D2926] text-sm block">Workshop & Retail Showroom</span>
                <p className="text-[#4A443F]">{BUSINESS_INFO.address}</p>
                <p className="text-[#8B0000] font-medium">{BUSINESS_INFO.landmark}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-[#E5E1DA]">
              <div className="p-2.5 bg-[#F2EDE4] text-[#8B0000] rounded-xl shrink-0 mt-0.5 border border-[#D1CABF]">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-[#2D2926] text-sm block">Business Hours</span>
                <p className="text-[#4A443F]">{BUSINESS_INFO.hours}</p>
                <p className="text-[#2D2926] font-medium">Open 7 days a week for consultations</p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-3 border-t border-[#E5E1DA]">
              <div className="p-2.5 bg-[#F2EDE4] text-[#8B0000] rounded-xl shrink-0 mt-0.5 border border-[#D1CABF]">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs space-y-1">
                <span className="font-bold text-[#2D2926] text-sm block">Phone & WhatsApp Inquiries</span>
                <div className="flex flex-wrap gap-3">
                  <a href={`tel:${BUSINESS_INFO.phone1}`} className="text-[#8B0000] font-semibold hover:underline">
                    {BUSINESS_INFO.phone1}
                  </a>
                  <span className="text-[#D1CABF]">|</span>
                  <a href={`tel:${BUSINESS_INFO.phone2}`} className="text-[#8B0000] font-semibold hover:underline">
                    {BUSINESS_INFO.phone2}
                  </a>
                </div>
                <p className="text-[#8C847C]">Email: {BUSINESS_INFO.email}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent('Hello Chhabilal Cards, I would like to visit your shop in Brajarajnagar / get catalog details.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-semibold shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#F2EDE4]" />
              <span>Connect on WhatsApp</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phone1}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2D2926] hover:bg-black text-white text-xs uppercase tracking-wider font-semibold shadow-xs transition-all"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call Us Directly</span>
            </a>
          </div>
        </div>

        {/* Map Simulation & Areas Served */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-royal text-xl font-bold text-[#2D2926]">
            Odisha Regional Dispatch Network
          </h3>

          <div className="bg-[#FAF9F6] rounded-2xl p-5 border border-[#E5E1DA] space-y-4 shadow-xs">
            <div className="aspect-16/9 rounded-xl bg-[#F2EDE4] border border-[#D1CABF] relative overflow-hidden flex flex-col items-center justify-center text-center p-6">
              <div className="w-12 h-12 rounded-full bg-[#8B0000] text-[#F2EDE4] flex items-center justify-center shadow-md mb-2 border border-[#D1CABF]">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-royal font-bold text-[#2D2926] text-sm">Chhabilal Cards Brajarajnagar</h4>
              <p className="text-[11px] text-[#4A443F] max-w-xs mt-1">
                Rajpur, Baghrachaka, Brajarajnagar, Jharsuguda, Odisha - 768216
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Chhabilal Cards Brajarajnagar Jharsuguda Odisha')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg text-xs font-semibold text-[#2D2926] hover:bg-[#E5E1DA] shadow-xs"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-[#8C847C]" />
              </a>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#2D2926] uppercase tracking-wider block">
                Regular Service & Courier Areas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {BUSINESS_INFO.districtsServed.map((dist, idx) => (
                  <span key={idx} className="bg-[#F2EDE4] text-[#4A443F] border border-[#E5E1DA] text-xs px-2.5 py-1 rounded-md">
                    📍 {dist}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Live Manufacturing & Dispatch Order Tracker */}
      <OrderTracker />

      {/* Frequently Asked Questions */}
      <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 border border-[#E5E1DA] space-y-6 font-sans">
        <div className="flex items-center gap-2 text-[#A69076] text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-[#8B0000]" />
          <span>Frequently Asked Questions</span>
        </div>
        <h3 className="font-royal text-2xl font-bold text-[#8B0000]">
          Answers to Common Ordering Questions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#F2EDE4] p-4 rounded-xl border border-[#D1CABF] space-y-1.5">
              <h4 className="text-xs font-bold text-[#2D2926] flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#8B0000] shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-[#4A443F] leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
