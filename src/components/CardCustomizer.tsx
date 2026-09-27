import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Palette, 
  MessageCircle, 
  Copy, 
  Check, 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  Plus, 
  Trash2,
  Heart
} from 'lucide-react';
import { CardCustomizerState, ProductItem } from '../types';
import { BUSINESS_INFO } from '../data/reviews';
import { WEDDING_CARDS_DATA } from '../data/products';

const AUSPICIOUS_SYMBOLS = [
  { id: 'ganesh', name: 'Lord Ganesha', symbol: '॥ श्री गणेशाय नमः ॥', iconText: '卐 ॐ 卐' },
  { id: 'om', name: 'Om (ॐ)', symbol: '॥ ॐ ॥', iconText: 'ॐ' },
  { id: 'kalash', name: 'Mangal Kalash', symbol: '॥ शुभ विवाह ॥', iconText: '🏺' },
  { id: 'ek-onkar', name: 'Ek Onkar', symbol: 'ੴ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ ੴ', iconText: 'ੴ' },
  { id: 'bismillah', name: 'Bismillah', symbol: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', iconText: '﷽' },
  { id: 'cross', name: 'Holy Cross', symbol: '† In God\'s Sacred Grace †', iconText: '✝' },
  { id: 'swastika', name: 'Swastika', symbol: '॥ 卐 शुभ लाभ 卐 ॥', iconText: '卐' },
];

const SHLOKA_PRESETS = [
  {
    title: 'Sanskrit Ganesh Vandana',
    text: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
  },
  {
    title: 'Mangalam Bhagwan Vishnu',
    text: 'मङ्गलं भगवान् विष्णुर्मङ्गलं गरुडध्वजः।\nमङ्गलं पुण्डरीकाक्षो मङ्गलाय तनो हरिः॥',
  },
  {
    title: 'Modern English Matrimony',
    text: 'Two lives, two hearts, joined together in friendship, united forever in love and holy matrimony.',
  },
  {
    title: 'Odia Shloka Tradition',
    text: 'ଶ୍ରୀ ଶ୍ରୀ ଜଗନ୍ନାଥ ସ୍ଵାମୀ ନୟନ ପଥଗାମୀ ଭବତୁ ମେ।\nପରମ କୃପାମୟଙ୍କ ଆଶୀର୍ବାଦରୁ ଶୁଭ ପରିଣୟ॥',
  }
];

const THEME_STYLES: Record<string, {
  bg: string;
  cardBg: string;
  borderColor: string;
  accentColor: string;
  goldText: string;
  textColor: string;
  subTextColor: string;
  borderPattern: string;
}> = {
  'crimson-gold': {
    bg: 'bg-[#4A1016]',
    cardBg: 'bg-[#58141C]',
    borderColor: 'border-[#D4AF37]/60',
    accentColor: 'text-[#D4AF37]',
    goldText: 'text-[#F2EDE4]',
    textColor: 'text-[#FAF9F6]',
    subTextColor: 'text-[#E5E1DA]/90',
    borderPattern: 'border-[#D4AF37]/40',
  },
  'royal-navy': {
    bg: 'bg-[#1A222B]',
    cardBg: 'bg-[#242F3B]',
    borderColor: 'border-[#A69076]/60',
    accentColor: 'text-[#D4AF37]',
    goldText: 'text-[#FAF9F6]',
    textColor: 'text-[#F2EDE4]',
    subTextColor: 'text-[#E5E1DA]/80',
    borderPattern: 'border-[#A69076]/40',
  },
  'emerald-gold': {
    bg: 'bg-[#1C2E24]',
    cardBg: 'bg-[#273F32]',
    borderColor: 'border-[#D4AF37]/60',
    accentColor: 'text-[#D4AF37]',
    goldText: 'text-[#FAF9F6]',
    textColor: 'text-[#FAF9F6]',
    subTextColor: 'text-[#E5E1DA]/80',
    borderPattern: 'border-[#D4AF37]/40',
  },
  'dusty-rose': {
    bg: 'bg-[#F2EDE4]',
    cardBg: 'bg-[#FAF9F6]',
    borderColor: 'border-[#D1CABF]',
    accentColor: 'text-[#8B0000]',
    goldText: 'text-[#8B0000]',
    textColor: 'text-[#2D2926]',
    subTextColor: 'text-[#4A443F]',
    borderPattern: 'border-[#D1CABF]',
  },
  'plum-gold': {
    bg: 'bg-[#361E28]',
    cardBg: 'bg-[#452734]',
    borderColor: 'border-[#D4AF37]/60',
    accentColor: 'text-[#D4AF37]',
    goldText: 'text-[#FAF9F6]',
    textColor: 'text-[#FAF9F6]',
    subTextColor: 'text-[#E5E1DA]/80',
    borderPattern: 'border-[#D4AF37]/40',
  },
  'pearl-champagne': {
    bg: 'bg-[#FAF9F6]',
    cardBg: 'bg-[#F2EDE4]',
    borderColor: 'border-[#D1CABF]',
    accentColor: 'text-[#8B0000]',
    goldText: 'text-[#8B0000]',
    textColor: 'text-[#2D2926]',
    subTextColor: 'text-[#4A443F]',
    borderPattern: 'border-[#D1CABF]',
  }
};

interface CardCustomizerProps {
  initialProduct?: ProductItem | null;
  onAddToQuote?: (product: ProductItem, quantity: number, notes: string, color: string) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: ProductItem) => void;
}

export const CardCustomizer: React.FC<CardCustomizerProps> = ({
  initialProduct,
  onAddToQuote,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [activeViewTab, setActiveViewTab] = useState<'main' | 'events' | 'envelope'>('main');
  const [copied, setCopied] = useState(false);
  const cardPreviewRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<CardCustomizerState>({
    cardTheme: 'crimson-gold',
    fontStyle: 'royal-serif',
    auspiciousSymbol: 'ganesh',
    topBlessing: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    groomName: 'Aarav',
    groomParents: 'Smt. Sunita & Shri Rameshwar Agarwal',
    groomGrandParents: 'Late Smt. & Shri G.D. Agarwal',
    groomNative: 'Brajarajnagar, Jharsuguda',
    brideName: 'Ananya',
    brideParents: 'Smt. Geeta & Shri Radheshyam Sharma',
    brideGrandParents: 'Late Smt. & Shri K.L. Sharma',
    brideNative: 'Sambalpur, Odisha',
    weddingDate: 'Friday, 27th November 2026',
    weddingTime: '7:30 PM Onwards (Hastamelap: 10:15 PM)',
    weddingVenue: 'Royal Palace Banquet Hall, Near Bypass Road',
    weddingCity: 'Jharsuguda, Odisha',
    receptionDate: 'Saturday, 28th November 2026',
    receptionVenue: 'Grand Celebration Lawn, Sambalpur Road',
    additionalEvents: [
      { name: 'Mehendi & Sangeet', date: '25th Nov 2026', time: '5:00 PM', venue: 'Residence Lawn' },
      { name: 'Haldi Ceremony', date: '26th Nov 2026', time: '10:00 AM', venue: 'Anand Vatika' },
    ],
    rsvpName: 'The Agarwal & Sharma Family',
    rsvpPhone: '+91 93483 41358',
    welcomingFamily: 'With Best Compliments from Relatives & Friends',
    specialNote: 'Blessings Only • Please grace the occasion with your divine presence',
    envelopeSeal: 'gold-wax',
    insertCount: 2,
  });

  const currentTheme = THEME_STYLES[state.cardTheme] || THEME_STYLES['crimson-gold'];

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getFormattedInvitationText = () => {
    return `॥ शुभ विवाह आमंत्रण ॥
${state.topBlessing}

Cordially invite you and your family to celebrate the holy wedding ceremony of:

✨ GROOM: ${state.groomName}
Son of: ${state.groomParents}
Grandson of: ${state.groomGrandParents}
Native: ${state.groomNative}

❤️ WEDS ❤️

✨ BRIDE: ${state.brideName}
Daughter of: ${state.brideParents}
Granddaughter of: ${state.brideGrandParents}
Native: ${state.brideNative}

━━━━━━━━━━━━━━━━━━━━
📅 WEDDING CEREMONY:
Date: ${state.weddingDate}
Time: ${state.weddingTime}
Venue: ${state.weddingVenue}, ${state.weddingCity}

🎉 RECEPTION:
Date: ${state.receptionDate}
Venue: ${state.receptionVenue}

${state.additionalEvents.map(e => `• ${e.name}: ${e.date} at ${e.time} (${e.venue})`).join('\n')}

RSVP: ${state.rsvpName} | 📞 ${state.rsvpPhone}
${state.welcomingFamily}
${state.specialNote}`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(getFormattedInvitationText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppSend = () => {
    triggerCelebration();
    const message = `Hello Chhabilal Cards! Here is my custom wedding invitation draft designed on your website:

*Selected Theme:* ${state.cardTheme}
*Symbol:* ${state.auspiciousSymbol}
*Groom:* ${state.groomName} (${state.groomNative})
*Bride:* ${state.brideName} (${state.brideNative})
*Wedding Date:* ${state.weddingDate}
*Venue:* ${state.weddingVenue}, ${state.weddingCity}
*RSVP Contact:* ${state.rsvpPhone}

━━━━━━━━━━━━━━━━━━━━
*FULL CARD DRAFT TEXT:*
${getFormattedInvitationText()}

Please provide a printing quote and digital proof for this card design.`;
    
    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddEvent = () => {
    setState(prev => ({
      ...prev,
      additionalEvents: [
        ...prev.additionalEvents,
        { name: 'New Ceremony', date: 'Date & Month', time: 'Time', venue: 'Venue Details' }
      ]
    }));
  };

  const handleRemoveEvent = (index: number) => {
    setState(prev => ({
      ...prev,
      additionalEvents: prev.additionalEvents.filter((_, i) => i !== index)
    }));
  };

  return (
    <section id="card-designer-studio" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Studio Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#F2EDE4] border border-[#D1CABF] text-[#4A443F] px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-sans font-medium">
          <Palette className="w-3.5 h-3.5 text-[#8B0000]" />
          <span>Interactive Live Invitation Studio</span>
        </div>
        <h2 className="font-royal text-2xl sm:text-4xl font-bold text-[#8B0000]">
          Design & Preview Your Wedding Card
        </h2>
        <p className="text-[#4A443F] text-xs sm:text-sm font-sans leading-relaxed">
          Type your bride & groom details, auspicious shlokas, and ceremony dates below. See the royal card update in real-time, then send it directly to Chhabilal Cards for custom proofing!
        </p>
      </div>

      {/* Main Studio Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Customization Controls (Inputs) */}
        <div className="lg:col-span-6 bg-[#FAF9F6] rounded-2xl border border-[#E5E1DA] shadow-xs p-5 sm:p-6 space-y-6">
          
          {/* Theme & Palette Selector */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest font-sans flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#8B0000]" />
              1. Royal Card Theme & Color Scheme
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { id: 'crimson-gold', label: 'Crimson Gold', color: '#58141C' },
                { id: 'royal-navy', label: 'Royal Slate', color: '#242F3B' },
                { id: 'emerald-gold', label: 'Deep Forest', color: '#273F32' },
                { id: 'plum-gold', label: 'Terracotta', color: '#452734' },
                { id: 'dusty-rose', label: 'Linen Ochre', color: '#E5E1DA' },
                { id: 'pearl-champagne', label: 'Pearl Ivory', color: '#F2EDE4' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, cardTheme: theme.id as any }))}
                  className={`p-2 rounded-xl text-center border transition-all ${
                    state.cardTheme === theme.id
                      ? 'border-[#8B0000] ring-2 ring-[#8B0000]/20 bg-[#F2EDE4] scale-105'
                      : 'border-[#E5E1DA] hover:border-[#D1CABF] bg-[#FAF9F6]'
                  }`}
                >
                  <div 
                    className="w-full h-7 rounded-md border border-black/10 shadow-xs mb-1" 
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className="text-[10px] uppercase tracking-wider font-sans font-medium text-[#4A443F] block truncate">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Auspicious Symbol & Shloka Picker */}
          <div className="space-y-3 pt-3 border-t border-[#E5E1DA]">
            <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest font-sans flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B0000]" />
              2. Auspicious Symbol & Opening Shloka
            </label>

            <div className="flex flex-wrap gap-1.5 font-sans">
              {AUSPICIOUS_SYMBOLS.map((sym) => (
                <button
                  key={sym.id}
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, auspiciousSymbol: sym.id as any }))}
                  className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all ${
                    state.auspiciousSymbol === sym.id
                      ? 'bg-[#8B0000] text-white font-semibold shadow-xs'
                      : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA] border border-[#E5E1DA]'
                  }`}
                >
                  <span className="mr-1.5">{sym.iconText}</span>
                  {sym.name}
                </button>
              ))}
            </div>

            {/* Shloka Selector dropdown */}
            <div className="space-y-1.5 font-sans">
              <label className="text-[11px] text-[#8C847C] uppercase tracking-wider">Preset Shlokas & Verses:</label>
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (val) setState(prev => ({ ...prev, topBlessing: val }));
                }}
                className="w-full bg-[#F2EDE4] border border-[#D1CABF] rounded-lg p-2 text-xs text-[#2D2926] outline-none focus:border-[#8B0000] cursor-pointer"
              >
                {SHLOKA_PRESETS.map((p, idx) => (
                  <option key={idx} value={p.text}>{p.title}</option>
                ))}
              </select>
              <textarea
                rows={2}
                value={state.topBlessing}
                onChange={(e) => setState(prev => ({ ...prev, topBlessing: e.target.value }))}
                className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-lg outline-none focus:border-[#8B0000] font-sans text-[#2D2926]"
                placeholder="Type custom blessing / shloka..."
              />
            </div>
          </div>

          {/* Groom & Bride Details */}
          <div className="space-y-4 pt-3 border-t border-[#E5E1DA] font-sans">
            <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest flex items-center gap-2">
              <User className="w-4 h-4 text-[#8B0000]" />
              3. Groom & Bride Family Details
            </label>

            {/* Groom Details Box */}
            <div className="bg-[#F2EDE4] p-3.5 rounded-xl border border-[#D1CABF] space-y-2.5">
              <div className="text-xs font-bold text-[#8B0000] uppercase tracking-wider flex items-center gap-1.5">
                <span>🤵 Groom's Information:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Groom's Name</label>
                  <input
                    type="text"
                    value={state.groomName}
                    onChange={(e) => setState(prev => ({ ...prev, groomName: e.target.value }))}
                    className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md font-semibold text-[#2D2926] outline-none focus:border-[#8B0000]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Native City/Town</label>
                  <input
                    type="text"
                    value={state.groomNative}
                    onChange={(e) => setState(prev => ({ ...prev, groomNative: e.target.value }))}
                    className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926] outline-none focus:border-[#8B0000]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Parents' Names (S/o)</label>
                <input
                  type="text"
                  value={state.groomParents}
                  onChange={(e) => setState(prev => ({ ...prev, groomParents: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Grandparents' Names (Paternal/Maternal)</label>
                <input
                  type="text"
                  value={state.groomGrandParents}
                  onChange={(e) => setState(prev => ({ ...prev, groomGrandParents: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
            </div>

            {/* Bride Details Box */}
            <div className="bg-[#F2EDE4] p-3.5 rounded-xl border border-[#D1CABF] space-y-2.5">
              <div className="text-xs font-bold text-[#8B0000] uppercase tracking-wider flex items-center gap-1.5">
                <span>👰 Bride's Information:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Bride's Name</label>
                  <input
                    type="text"
                    value={state.brideName}
                    onChange={(e) => setState(prev => ({ ...prev, brideName: e.target.value }))}
                    className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md font-semibold text-[#2D2926] outline-none focus:border-[#8B0000]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Native City/Town</label>
                  <input
                    type="text"
                    value={state.brideNative}
                    onChange={(e) => setState(prev => ({ ...prev, brideNative: e.target.value }))}
                    className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926] outline-none focus:border-[#8B0000]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Parents' Names (D/o)</label>
                <input
                  type="text"
                  value={state.brideParents}
                  onChange={(e) => setState(prev => ({ ...prev, brideParents: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Grandparents' Names</label>
                <input
                  type="text"
                  value={state.brideGrandParents}
                  onChange={(e) => setState(prev => ({ ...prev, brideGrandParents: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
            </div>
          </div>

          {/* Wedding Dates & Venues */}
          <div className="space-y-3 pt-3 border-t border-[#E5E1DA] font-sans">
            <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8B0000]" />
              4. Wedding & Reception Schedule
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Wedding Date</label>
                <input
                  type="text"
                  value={state.weddingDate}
                  onChange={(e) => setState(prev => ({ ...prev, weddingDate: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Auspicious Time (Muhurat)</label>
                <input
                  type="text"
                  value={state.weddingTime}
                  onChange={(e) => setState(prev => ({ ...prev, weddingTime: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">Wedding Venue & City</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={state.weddingVenue}
                  onChange={(e) => setState(prev => ({ ...prev, weddingVenue: e.target.value }))}
                  placeholder="Venue name & address"
                  className="sm:col-span-2 text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
                <input
                  type="text"
                  value={state.weddingCity}
                  onChange={(e) => setState(prev => ({ ...prev, weddingCity: e.target.value }))}
                  placeholder="City (e.g. Jharsuguda)"
                  className="text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926] outline-none focus:border-[#8B0000]"
                />
              </div>
            </div>

            {/* Additional Ceremonies (Haldi, Mehendi, etc.) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#2D2926] uppercase tracking-wider">Pre-Wedding Functions:</span>
                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="text-[11px] text-[#8B0000] hover:text-[#6D0000] font-medium flex items-center gap-1 uppercase tracking-wider"
                >
                  <Plus className="w-3 h-3" /> Add Event
                </button>
              </div>

              {state.additionalEvents.map((evt, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-[#F2EDE4] p-2 rounded-lg border border-[#D1CABF]">
                  <input
                    type="text"
                    value={evt.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setState(prev => ({
                        ...prev,
                        additionalEvents: prev.additionalEvents.map((ev, i) => i === idx ? { ...ev, name: val } : ev)
                      }));
                    }}
                    placeholder="Event Name"
                    className="w-1/3 text-[11px] px-2 py-1 bg-[#FAF9F6] border border-[#D1CABF] rounded"
                  />
                  <input
                    type="text"
                    value={evt.date}
                    onChange={(e) => {
                      const val = e.target.value;
                      setState(prev => ({
                        ...prev,
                        additionalEvents: prev.additionalEvents.map((ev, i) => i === idx ? { ...ev, date: val } : ev)
                      }));
                    }}
                    placeholder="Date & Time"
                    className="w-1/3 text-[11px] px-2 py-1 bg-[#FAF9F6] border border-[#D1CABF] rounded"
                  />
                  <input
                    type="text"
                    value={evt.venue}
                    onChange={(e) => {
                      const val = e.target.value;
                      setState(prev => ({
                        ...prev,
                        additionalEvents: prev.additionalEvents.map((ev, i) => i === idx ? { ...ev, venue: val } : ev)
                      }));
                    }}
                    placeholder="Venue"
                    className="w-1/3 text-[11px] px-2 py-1 bg-[#FAF9F6] border border-[#D1CABF] rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveEvent(idx)}
                    className="text-[#8C847C] hover:text-[#8B0000] p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RSVP & Welcoming Family */}
          <div className="space-y-3 pt-3 border-t border-[#E5E1DA] font-sans">
            <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#8B0000]" />
              5. RSVP & Family Compliments
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">RSVP Names</label>
                <input
                  type="text"
                  value={state.rsvpName}
                  onChange={(e) => setState(prev => ({ ...prev, rsvpName: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926]"
                />
              </div>
              <div>
                <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">RSVP Phone Numbers</label>
                <input
                  type="text"
                  value={state.rsvpPhone}
                  onChange={(e) => setState(prev => ({ ...prev, rsvpPhone: e.target.value }))}
                  className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926]"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-[#8C847C] uppercase tracking-wider block">With Best Compliments From</label>
              <input
                type="text"
                value={state.welcomingFamily}
                onChange={(e) => setState(prev => ({ ...prev, welcomingFamily: e.target.value }))}
                className="w-full text-xs px-2.5 py-1.5 bg-[#FAF9F6] border border-[#D1CABF] rounded-md text-[#2D2926]"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Live Interactive Card Render Stage */}
        <div className="lg:col-span-6 sticky top-24 space-y-4">
          
          {/* Card View Switcher Tabs */}
          <div className="flex items-center justify-between bg-[#F2EDE4] p-1.5 rounded-xl border border-[#E5E1DA] text-xs font-sans">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveViewTab('main')}
                className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-medium transition-all ${
                  activeViewTab === 'main'
                    ? 'bg-[#8B0000] text-white shadow-xs'
                    : 'text-[#4A443F] hover:bg-[#E5E1DA]'
                }`}
              >
                Main Vivah Card
              </button>
              <button
                type="button"
                onClick={() => setActiveViewTab('events')}
                className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-medium transition-all ${
                  activeViewTab === 'events'
                    ? 'bg-[#8B0000] text-white shadow-xs'
                    : 'text-[#4A443F] hover:bg-[#E5E1DA]'
                }`}
              >
                Ceremonies Insert
              </button>
              <button
                type="button"
                onClick={() => setActiveViewTab('envelope')}
                className={`px-3.5 py-1.5 rounded-lg uppercase tracking-wider font-medium transition-all ${
                  activeViewTab === 'envelope'
                    ? 'bg-[#8B0000] text-white shadow-xs'
                    : 'text-[#4A443F] hover:bg-[#E5E1DA]'
                }`}
              >
                Matching Envelope
              </button>
            </div>

            <span className="text-[11px] text-[#8C847C] font-mono hidden sm:inline">
              Live Proof
            </span>
          </div>

          {/* THE WEDDING CARD VISUAL STAGE */}
          <div 
            ref={cardPreviewRef}
            className={`relative rounded-2xl ${currentTheme.cardBg} border-2 ${currentTheme.borderColor} p-4 sm:p-8 shadow-md transition-all duration-300 overflow-hidden text-center max-w-full`}
          >
            {/* Subtle ornate border box */}
            <div className={`absolute inset-2 sm:inset-3 border ${currentTheme.borderPattern} rounded-xl pointer-events-none`}></div>
            <div className={`absolute inset-3 sm:inset-4 border border-dashed ${currentTheme.borderPattern} rounded-lg pointer-events-none opacity-40`}></div>

            {/* Corner Decorative Dots/Accents */}
            <div className="absolute top-3 sm:top-5 left-3 sm:left-5 text-[#D4AF37] text-xs">❖</div>
            <div className="absolute top-3 sm:top-5 right-3 sm:right-5 text-[#D4AF37] text-xs">❖</div>
            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 text-[#D4AF37] text-xs">❖</div>
            <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-5 text-[#D4AF37] text-xs">❖</div>

            {/* TAB 1: MAIN VIVAH CARD */}
            {activeViewTab === 'main' && (
              <div className="relative z-10 space-y-3 sm:space-y-4 py-1 sm:py-2">
                {/* Auspicious Header */}
                <div className="space-y-1">
                  <div className="text-lg sm:text-2xl font-royal tracking-widest text-[#D4AF37] break-words">
                    {AUSPICIOUS_SYMBOLS.find(s => s.id === state.auspiciousSymbol)?.symbol || '॥ श्री गणेशाय नमः ॥'}
                  </div>
                  <div className={`text-[10px] sm:text-[11px] ${currentTheme.subTextColor} whitespace-pre-line font-serif-luxury italic leading-relaxed`}>
                    {state.topBlessing}
                  </div>
                </div>

                {/* Inviting Words */}
                <div className="pt-1 sm:pt-2">
                  <p className={`text-[10px] sm:text-[11px] uppercase tracking-widest ${currentTheme.subTextColor} font-sans font-medium`}>
                    Cordially request the honour of your presence at the auspicious wedding of
                  </p>
                </div>

                {/* Groom & Bride Highlight Banner */}
                <div className="py-2 sm:py-3 space-y-1.5 sm:space-y-2">
                  <div>
                    <h3 className={`font-royal text-xl sm:text-3xl font-bold ${currentTheme.goldText} tracking-wide drop-shadow-sm break-words`}>
                      {state.groomName}
                    </h3>
                    <p className={`text-[10px] sm:text-[11px] ${currentTheme.subTextColor} mt-0.5 font-sans`}>
                      Son of {state.groomParents}
                    </p>
                    <p className={`text-[9px] sm:text-[10px] ${currentTheme.subTextColor} opacity-80 font-sans`}>
                      Grandson of {state.groomGrandParents} ({state.groomNative})
                    </p>
                  </div>

                  {/* Sacred Knot Symbol */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
                    <span className="h-px w-8 sm:w-12 bg-[#D4AF37]/50"></span>
                    <span className="font-royal text-[10px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                      Weds
                    </span>
                    <span className="h-px w-8 sm:w-12 bg-[#D4AF37]/50"></span>
                  </div>

                  <div>
                    <h3 className={`font-royal text-xl sm:text-3xl font-bold ${currentTheme.goldText} tracking-wide drop-shadow-sm break-words`}>
                      {state.brideName}
                    </h3>
                    <p className={`text-[10px] sm:text-[11px] ${currentTheme.subTextColor} mt-0.5 font-sans`}>
                      Daughter of {state.brideParents}
                    </p>
                    <p className={`text-[9px] sm:text-[10px] ${currentTheme.subTextColor} opacity-80 font-sans`}>
                      Granddaughter of {state.brideGrandParents} ({state.brideNative})
                    </p>
                  </div>
                </div>

                {/* Date & Muhurat Section */}
                <div className="bg-black/20 backdrop-blur-xs rounded-xl p-3 border border-[#D4AF37]/20 space-y-1.5 font-sans">
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#D4AF37]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{state.weddingDate}</span>
                  </div>
                  <div className={`text-[11px] ${currentTheme.textColor}`}>
                    Auspicious Vivah Time: {state.weddingTime}
                  </div>
                  <div className={`flex items-center justify-center gap-1.5 text-[11px] ${currentTheme.subTextColor}`}>
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{state.weddingVenue}, {state.weddingCity}</span>
                  </div>
                </div>

                {/* Footer RSVP & Blessing */}
                <div className="pt-2 border-t border-[#D4AF37]/20 text-[11px] space-y-1 font-sans">
                  <div className={`font-semibold ${currentTheme.accentColor}`}>
                    RSVP: {state.rsvpName} ({state.rsvpPhone})
                  </div>
                  <div className={`${currentTheme.subTextColor} text-[10px]`}>
                    {state.welcomingFamily}
                  </div>
                  <div className={`text-[9px] ${currentTheme.subTextColor} opacity-70 italic`}>
                    {state.specialNote}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CEREMONIES INSERT */}
            {activeViewTab === 'events' && (
              <div className="relative z-10 space-y-4 py-3">
                <div className="space-y-1">
                  <span className="text-xs font-royal uppercase tracking-widest text-[#D4AF37]">Program Itinerary</span>
                  <h3 className={`font-royal text-xl font-bold ${currentTheme.goldText}`}>
                    Celebration Schedule
                  </h3>
                </div>

                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 font-sans">
                  {state.additionalEvents.map((evt, idx) => (
                    <div key={idx} className="bg-black/25 p-3 rounded-xl border border-[#D4AF37]/30 text-left">
                      <div className="flex justify-between items-start">
                        <span className="font-royal font-bold text-[#F2EDE4] text-sm">{evt.name}</span>
                        <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-medium">{evt.date}</span>
                      </div>
                      <div className={`text-[11px] ${currentTheme.textColor} mt-1`}>Time: {evt.time}</div>
                      <div className={`text-[10px] ${currentTheme.subTextColor} flex items-center gap-1 mt-0.5`}>
                        <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span>{evt.venue}</span>
                      </div>
                    </div>
                  ))}

                  {/* Reception Event */}
                  <div className="bg-black/25 p-3 rounded-xl border border-[#D4AF37]/30 text-left">
                    <div className="flex justify-between items-start">
                      <span className="font-royal font-bold text-[#F2EDE4] text-sm">Grand Wedding Reception</span>
                      <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-medium">{state.receptionDate}</span>
                    </div>
                    <div className={`text-[10px] ${currentTheme.subTextColor} flex items-center gap-1 mt-1`}>
                      <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                      <span>{state.receptionVenue}</span>
                    </div>
                  </div>
                </div>

                <p className={`text-[10px] ${currentTheme.subTextColor} italic pt-2 font-sans`}>
                  Printed on premium insert sheet with matching botanical gold border
                </p>
              </div>
            )}

            {/* TAB 3: MATCHING ENVELOPE */}
            {activeViewTab === 'envelope' && (
              <div className="relative z-10 space-y-5 py-4">
                <div className="space-y-1">
                  <span className="text-xs font-royal uppercase tracking-widest text-[#D4AF37]">Exterior Presentation</span>
                  <h3 className={`font-royal text-xl font-bold ${currentTheme.goldText}`}>
                    Matching Royal Envelope & Seal
                  </h3>
                </div>

                <div className="p-6 bg-black/20 rounded-xl border-2 border-[#D4AF37]/30 space-y-4 font-sans">
                  {/* Seal Stamp */}
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#D4AF37] to-[#A69076] border-2 border-[#FAF9F6] flex items-center justify-center text-[#2D2926] font-royal font-bold text-xl shadow-lg">
                    {state.groomName[0]}&{state.brideName[0]}
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-royal tracking-wider text-[#D4AF37]">
                      SHREE GANESHAYA NAMAH
                    </p>
                    <p className={`text-[11px] ${currentTheme.subTextColor}`}>
                      To, <br />
                      <span className="font-serif-luxury text-sm italic font-bold text-white">Respected Family & Friends</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#D4AF37]/20 text-[10px] text-[#D4AF37]">
                    From: {state.groomParents}, {state.groomNative}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons under card preview */}
          <div className="space-y-2 pt-2 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                id="studio-whatsapp-submit-btn"
                onClick={handleWhatsAppSend}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-semibold shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#F2EDE4]" />
                <span>Send Draft to Chhabilal Cards</span>
              </button>

              <button
                id="studio-copy-text-btn"
                onClick={handleCopyText}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FAF9F6] hover:bg-[#F2EDE4] border border-[#D1CABF] text-[#4A443F] text-xs uppercase tracking-wider font-medium shadow-xs transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-[#8B0000]" /> : <Copy className="w-4 h-4 text-[#A69076]" />}
                <span>{copied ? 'Card Text Copied!' : 'Copy Formatted Card Text'}</span>
              </button>
            </div>

            {onToggleWishlist && (
              <button
                id="studio-wishlist-toggle-btn"
                onClick={() => {
                  const targetProduct = initialProduct || WEDDING_CARDS_DATA[0];
                  onToggleWishlist(targetProduct);
                }}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-medium shadow-xs transition-all ${
                  isWishlisted 
                    ? 'bg-[#8B0000] text-white' 
                    : 'bg-[#FAF9F6] hover:bg-[#F2EDE4] border border-[#D1CABF] text-[#4A443F]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white text-white' : 'text-[#8B0000]'}`} />
                <span>{isWishlisted ? 'Saved in Wishlist' : 'Save Design Base to Wishlist'}</span>
              </button>
            )}
          </div>

          <div className="bg-[#F2EDE4] rounded-xl p-3.5 border border-[#D1CABF] text-[11px] text-[#4A443F] flex items-start gap-2 font-sans">
            <Sparkles className="w-4 h-4 text-[#8B0000] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#2D2926]">Free Proofing Guarantee:</strong> When you send your draft, our master typographers in Brajarajnagar create official print-ready proofs in Hindi, Odia, or English font typesets before finalizing the print plate.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
