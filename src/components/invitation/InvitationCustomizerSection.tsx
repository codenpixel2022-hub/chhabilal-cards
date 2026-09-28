import React, { useState } from 'react';
import { Sparkles, Palette, Type, Heart, Send, Check } from 'lucide-react';

interface InvitationCustomizerSectionProps {
  onOpenWhatsApp?: (customizerSummary: string) => void;
}

export const InvitationCustomizerSection: React.FC<InvitationCustomizerSectionProps> = ({
  onOpenWhatsApp,
}) => {
  const [brideName, setBrideName] = useState<string>('Ananya');
  const [groomName, setGroomName] = useState<string>('Rohan');
  const [weddingDate, setWeddingDate] = useState<string>('12th Dec 2026');
  const [colorTheme, setColorTheme] = useState<string>('crimson-gold');
  const [language, setLanguage] = useState<string>('bilingual');

  const themes = [
    { id: 'crimson-gold', name: 'Royal Crimson & Gold', bg: '#8B0000', text: '#D4AF37', cardBg: '#FAF9F6' },
    { id: 'pearl-ivory', name: 'Pearl Ivory & Antique Gold', bg: '#FAF9F6', text: '#8B0000', cardBg: '#F5EFE6' },
    { id: 'champagne-gold', name: 'Champagne Gold & Maroon', bg: '#D4AF37', text: '#4A0E17', cardBg: '#FFFDF9' },
    { id: 'midnight-navy', name: 'Midnight Navy & Silver', bg: '#0F172A', text: '#E2E8F0', cardBg: '#F8FAFC' },
  ];

  const currentTheme = themes.find(t => t.id === colorTheme) || themes[0];

  const handleSendCustomization = () => {
    const summary = `Custom Invitation Preview Request:\nCouple: ${brideName} & ${groomName}\nDate: ${weddingDate}\nTheme: ${currentTheme.name}\nLanguage: ${language}`;
    onOpenWhatsApp?.(summary);
  };

  return (
    <section id="invitation-customizer" className="bg-gradient-to-b from-[#FAF9F6] to-[#F2EDE4] py-20 px-4 sm:px-6 border-t border-[#E5E1DA]">
      <div className="max-w-7xl mx-auto space-y-12 font-sans">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#F2EDE4] border border-[#D4AF37]/50 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#8B0000]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Section 06 • Live Card Designer</span>
          </div>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-[#2D2926]">
            Interactive Card Customizer
          </h2>
          <p className="text-sm sm:text-base text-[#4A443F]">
            Experiment with colors, names, and script styles in real-time. Request a digital proof directly from our Jharsuguda print studio.
          </p>
        </div>

        {/* Customizer Work Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FAF9F6] border border-[#D1CABF] rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
            <h3 className="font-royal font-bold text-xl text-[#8B0000] border-b border-[#E5E1DA] pb-3">
              Personalization Controls
            </h3>

            {/* Couple Names */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D2926] block">
                1. Bride & Groom Names
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-[#8C847C] font-semibold block mb-1">Bride's Name</span>
                  <input
                    type="text"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1CABF] bg-[#FAF9F6] text-xs font-semibold text-[#2D2926] focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-[#8C847C] font-semibold block mb-1">Groom's Name</span>
                  <input
                    type="text"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1CABF] bg-[#FAF9F6] text-xs font-semibold text-[#2D2926] focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
                  />
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D2926] block">
                2. Wedding Date
              </label>
              <input
                type="text"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1CABF] bg-[#FAF9F6] text-xs font-semibold text-[#2D2926] focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
              />
            </div>

            {/* Color Palette Picker */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D2926] block">
                3. Color Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setColorTheme(t.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                      colorTheme === t.id
                        ? 'border-[#8B0000] bg-[#F2EDE4] shadow-xs'
                        : 'border-[#D1CABF] hover:bg-[#F2EDE4]/50'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: t.bg }}></span>
                    <span className="truncate text-[#2D2926]">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Script */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D2926] block">
                4. Primary Script Wording
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D1CABF] bg-[#FAF9F6] text-xs font-semibold text-[#2D2926] focus:border-[#8B0000]"
              >
                <option value="bilingual">Bilingual (Odia + English)</option>
                <option value="pure-odia">Pure Odia Traditional Script</option>
                <option value="hindi-english">Hindi Devanagari + English</option>
                <option value="english-only">Contemporary English Only</option>
              </select>
            </div>

            <button
              onClick={handleSendCustomization}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-widest font-bold shadow-md transition-all pt-3"
            >
              <Send className="w-4 h-4" />
              <span>Send Customization for WhatsApp Proof</span>
            </button>
          </div>

          {/* Live Preview Display (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FAF9F6] border-2 border-[#D4AF37] rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 text-center transition-all duration-500 min-h-[480px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-block bg-[#F2EDE4] px-4 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest text-[#8B0000] border border-[#D4AF37]">
                Live Real-Time Card Rendering
              </div>

              <p className="font-royal text-[#8B0000] font-bold text-lg tracking-widest pt-4">
                ॥ ॐ श्री गणेशाय नमः ॥
              </p>

              {language.includes('odia') && (
                <p className="text-xs font-semibold text-[#8C847C] italic">
                  ॥ ଵକ୍ରତୁଣ୍ଡ ମହାକାଯ ସୂର୍ଯ୍ଯକୋଟି ସମପ୍ରଭ ॥
                </p>
              )}

              <div className="py-8 space-y-3">
                <span className="text-xs uppercase tracking-widest text-[#8C847C] font-semibold block">
                  Together With Their Families
                </span>
                <h3 className="font-royal text-4xl sm:text-6xl font-bold tracking-tight text-[#8B0000]">
                  {brideName || 'Bride'} <span className="text-[#D4AF37] font-serif-luxury italic">&</span> {groomName || 'Groom'}
                </h3>
                <p className="text-sm font-semibold text-[#2D2926] pt-2">
                  Request the pleasure of your company on <br />
                  <span className="font-royal text-xl font-bold text-[#8B0000]">{weddingDate || '12th Dec 2026'}</span>
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D4AF37]/30 flex items-center justify-between text-left text-xs text-[#4A443F]">
              <div>
                <span className="font-semibold block text-[#2D2926]">Chhabilal Card Specimen</span>
                <span>Jharsuguda Print House • Odisha</span>
              </div>
              <span className="font-mono text-[#8B0000] font-bold uppercase tracking-widest">
                {currentTheme.name}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
