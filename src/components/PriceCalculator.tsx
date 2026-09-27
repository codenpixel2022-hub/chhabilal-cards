import React, { useState } from 'react';
import { 
  Calculator, 
  MessageCircle, 
  TrendingDown
} from 'lucide-react';
import { ALL_PRODUCTS } from '../data/products';
import { BUSINESS_INFO } from '../data/reviews';

const PRINTING_METHODS = [
  { id: 'screen-single', label: 'Standard Screen Printing (Single Color)', extraCost: 0, description: 'Classic auspicious red, gold, or brown ink printing included.' },
  { id: 'offset-multi', label: 'Multi-Color Offset Printing (Full CMYK)', extraCost: 2.50, description: 'Vibrant photo-grade color printing for photos and intricate motifs.' },
  { id: 'gold-foil', label: 'Metallic Hot Gold / Rose Gold Foil Stamping', extraCost: 3.50, description: 'Gleaming hot-stamped metallic foil highlights on names & borders.' },
  { id: 'deep-emboss', label: 'Deep Blind Embossing / Letterpress', extraCost: 3.00, description: 'Raised tactile lettering giving a 3D luxury touch.' },
];

export const PriceCalculator: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>(ALL_PRODUCTS[0].id);
  const [quantity, setQuantity] = useState<number>(250);
  const [selectedPrinting, setSelectedPrinting] = useState<string>('screen-single');
  const [extraInsertCount, setExtraInsertCount] = useState<number>(0);
  const [includeWaxSeal, setIncludeWaxSeal] = useState<boolean>(false);
  const [urgentDelivery, setUrgentDelivery] = useState<boolean>(false);

  const product = ALL_PRODUCTS.find(p => p.id === selectedProductId) || ALL_PRODUCTS[0];

  // Base tier calculation
  const getBaseRate = (qty: number) => {
    if (!product.discountTiers || product.discountTiers.length === 0) {
      return product.pricePerPiece;
    }
    const tiers = [...product.discountTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of tiers) {
      if (qty >= tier.minQty) {
        return tier.price;
      }
    }
    return product.pricePerPiece;
  };

  const baseRate = getBaseRate(quantity);
  const printingExtra = PRINTING_METHODS.find(m => m.id === selectedPrinting)?.extraCost || 0;
  const insertExtra = extraInsertCount * 3.00;
  const waxSealExtra = includeWaxSeal ? 2.50 : 0;
  const urgentExtra = urgentDelivery ? 1.50 : 0;

  const unitTotal = baseRate + printingExtra + insertExtra + waxSealExtra + urgentExtra;
  const grandTotal = unitTotal * quantity;
  
  // Benchmark standard price without bulk tier
  const standardTotal = (product.pricePerPiece + printingExtra + insertExtra + waxSealExtra + urgentExtra) * quantity;
  const bulkSavings = Math.max(0, standardTotal - grandTotal);

  const generateWhatsAppQuote = () => {
    const printingName = PRINTING_METHODS.find(m => m.id === selectedPrinting)?.label || 'Screen Printing';
    const text = `Hello Chhabilal Cards! I calculated a bulk quotation on your website:

*Product:* ${product.name} (Code: ${product.code})
*Quantity:* ${quantity} pcs
*Base Rate:* ₹${baseRate.toFixed(2)}/pc
*Printing Method:* ${printingName}
${extraInsertCount > 0 ? `*Extra Inserts:* ${extraInsertCount} additional leaves\n` : ''}${includeWaxSeal ? `*Wax Seal / Sticker:* Included\n` : ''}${urgentDelivery ? `*Priority Dispatch:* 24-48h Expedited\n` : ''}
━━━━━━━━━━━━━━━━━━━━
*ESTIMATED UNIT RATE:* ₹${unitTotal.toFixed(2)} / pc
*ESTIMATED TOTAL:* ₹${grandTotal.toFixed(2)}
${bulkSavings > 0 ? `*Bulk Savings:* ₹${bulkSavings.toFixed(2)}\n` : ''}
Please confirm availability and paper sample kit.`;

    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="bulk-price-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#F2EDE4] border border-[#D1CABF] text-[#4A443F] px-3.5 py-1 rounded-full text-xs uppercase tracking-widest font-sans font-medium">
          <Calculator className="w-3.5 h-3.5 text-[#8B0000]" />
          <span>Transparent Wholesale & Retail Estimator</span>
        </div>
        <h2 className="font-royal text-2xl sm:text-4xl font-bold text-[#8B0000]">
          Instant Bulk Cost Calculator
        </h2>
        <p className="text-[#4A443F] text-xs sm:text-sm font-sans leading-relaxed">
          Select any wedding card model, office file, or school merchandise. Adjust quantity to see live tiered manufacturer discounts and customize printing techniques.
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Selections & Config */}
        <div className="lg:col-span-7 bg-[#FAF9F6] rounded-2xl border border-[#E5E1DA] shadow-xs p-5 sm:p-6 space-y-6">
          
          {/* Step 1: Product Selection */}
          <div className="space-y-2 font-sans">
            <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest block">
              1. Select Product Model
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full bg-[#F2EDE4] border border-[#D1CABF] rounded-xl p-3 text-xs font-medium text-[#2D2926] outline-none focus:border-[#8B0000] focus:bg-white cursor-pointer"
            >
              <optgroup label="✨ Wedding Cards & Invitations">
                {ALL_PRODUCTS.filter(p => p.category === 'wedding-cards').map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — Base ₹{p.pricePerPiece.toFixed(2)}/pc (Code: {p.code})
                  </option>
                ))}
              </optgroup>
              <optgroup label="📁 Office Files & Folders">
                {ALL_PRODUCTS.filter(p => p.category === 'office-stationery').map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — Base ₹{p.pricePerPiece.toFixed(2)}/pc (Code: {p.code})
                  </option>
                ))}
              </optgroup>
              <optgroup label="🎒 School Merchandising & Merchandise">
                {ALL_PRODUCTS.filter(p => p.category === 'school-stationery').map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — Base ₹{p.pricePerPiece.toFixed(2)}/pc (Code: {p.code})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Step 2: Quantity Adjustment with Slider & Quick Chips */}
          <div className="space-y-3 pt-3 border-t border-[#E5E1DA] font-sans">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest">
                2. Order Quantity: <span className="text-[#8B0000] text-sm font-extrabold">{quantity} units</span>
              </label>
              <span className="text-[11px] text-[#8B0000] font-semibold bg-[#F2EDE4] px-2.5 py-0.5 rounded border border-[#D1CABF] uppercase tracking-wider">
                {quantity >= 500 ? 'Tier 3 High Volume' : quantity >= 250 ? 'Tier 2 Volume' : 'Standard MOQ'}
              </span>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min={product.minOrderQuantity || 50}
              max={2000}
              step={50}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full h-2 bg-[#E5E1DA] rounded-lg appearance-none cursor-pointer accent-[#8B0000]"
            />

            {/* Preset Buttons */}
            <div className="flex flex-wrap gap-2">
              {[50, 100, 200, 300, 500, 800, 1000, 1500].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setQuantity(preset)}
                  className={`px-3 py-1 text-xs uppercase tracking-wider rounded-lg font-medium transition-colors ${
                    quantity === preset
                      ? 'bg-[#8B0000] text-white shadow-xs'
                      : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA]'
                  }`}
                >
                  {preset} pcs
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Printing Technology */}
          {product.category === 'wedding-cards' && (
            <div className="space-y-2.5 pt-3 border-t border-[#E5E1DA] font-sans">
              <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest block">
                3. Choose Printing & Embellishment Technique
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRINTING_METHODS.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedPrinting(method.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedPrinting === method.id
                        ? 'border-[#8B0000] bg-[#F2EDE4] ring-2 ring-[#8B0000]/20'
                        : 'border-[#E5E1DA] hover:border-[#D1CABF] bg-[#FAF9F6]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2D2926]">{method.label}</span>
                      <span className="text-xs font-extrabold text-[#8B0000] shrink-0 ml-1">
                        {method.extraCost === 0 ? 'Included' : `+₹${method.extraCost.toFixed(2)}/pc`}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#6B655F] mt-1 leading-snug">{method.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Add-on Options */}
          {product.category === 'wedding-cards' && (
            <div className="space-y-3 pt-3 border-t border-[#E5E1DA] font-sans">
              <label className="text-xs font-bold text-[#2D2926] uppercase tracking-widest block">
                4. Optional Add-ons & Inserts
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Extra Leaf Inserts */}
                <div className="p-3 bg-[#F2EDE4] rounded-xl border border-[#D1CABF] text-xs space-y-1.5">
                  <span className="font-semibold text-[#2D2926] block">Extra Leaf Inserts</span>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setExtraInsertCount(Math.max(0, extraInsertCount - 1))}
                      className="w-6 h-6 rounded bg-[#FAF9F6] border border-[#D1CABF] hover:bg-white font-bold text-[#2D2926]"
                    >-</button>
                    <span className="font-bold text-[#2D2926]">+{extraInsertCount} Leaves</span>
                    <button
                      type="button"
                      onClick={() => setExtraInsertCount(extraInsertCount + 1)}
                      className="w-6 h-6 rounded bg-[#FAF9F6] border border-[#D1CABF] hover:bg-white font-bold text-[#2D2926]"
                    >+</button>
                  </div>
                  <span className="text-[10px] text-[#6B655F] block text-center">+₹3.00 per leaf</span>
                </div>

                {/* Wax Seal */}
                <label className="p-3 bg-[#F2EDE4] rounded-xl border border-[#D1CABF] text-xs flex flex-col justify-between cursor-pointer hover:bg-[#E5E1DA]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2D2926]">Wax Seal Sticker</span>
                    <input
                      type="checkbox"
                      checked={includeWaxSeal}
                      onChange={(e) => setIncludeWaxSeal(e.target.checked)}
                      className="accent-[#8B0000] w-4 h-4"
                    />
                  </div>
                  <span className="text-[10px] text-[#6B655F] mt-2">+₹2.50/pc (Peel & Stick)</span>
                </label>

                {/* Urgent Delivery */}
                <label className="p-3 bg-[#F2EDE4] rounded-xl border border-[#D1CABF] text-xs flex flex-col justify-between cursor-pointer hover:bg-[#E5E1DA]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2D2926]">Priority 24-48h Print</span>
                    <input
                      type="checkbox"
                      checked={urgentDelivery}
                      onChange={(e) => setUrgentDelivery(e.target.checked)}
                      className="accent-[#8B0000] w-4 h-4"
                    />
                  </div>
                  <span className="text-[10px] text-[#6B655F] mt-2">+₹1.50/pc (Rush Order)</span>
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Instant Cost Summary & Breakdown */}
        <div className="lg:col-span-5 sticky top-24 space-y-4 font-sans">
          <div className="bg-[#F2EDE4] rounded-2xl border border-[#D1CABF] p-6 shadow-sm space-y-5">
            
            <div className="flex items-center justify-between border-b border-[#D1CABF] pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#A69076] uppercase tracking-widest">Live Quotation</span>
                <h3 className="font-royal text-lg font-bold text-[#8B0000]">{product.name}</h3>
              </div>
              <span className="text-xs bg-[#FAF9F6] text-[#8B0000] border border-[#D1CABF] font-mono px-2.5 py-0.5 rounded font-bold">
                {product.code}
              </span>
            </div>

            {/* Price Line Breakdown */}
            <div className="space-y-2 text-xs text-[#4A443F]">
              <div className="flex justify-between">
                <span>Base Unit Rate ({quantity} pcs tier):</span>
                <span className="font-semibold text-[#2D2926]">₹{baseRate.toFixed(2)}</span>
              </div>

              {printingExtra > 0 && (
                <div className="flex justify-between">
                  <span>Printing Tech ({PRINTING_METHODS.find(m => m.id === selectedPrinting)?.label.split(' ')[0]}):</span>
                  <span className="font-semibold text-[#2D2926]">+₹{printingExtra.toFixed(2)}</span>
                </div>
              )}

              {insertExtra > 0 && (
                <div className="flex justify-between">
                  <span>Extra Inserts ({extraInsertCount} leaves):</span>
                  <span className="font-semibold text-[#2D2926]">+₹{insertExtra.toFixed(2)}</span>
                </div>
              )}

              {waxSealExtra > 0 && (
                <div className="flex justify-between">
                  <span>Self-Adhesive Wax Seal:</span>
                  <span className="font-semibold text-[#2D2926]">+₹{waxSealExtra.toFixed(2)}</span>
                </div>
              )}

              {urgentExtra > 0 && (
                <div className="flex justify-between text-[#8B0000]">
                  <span>Rush Dispatch (24-48h):</span>
                  <span className="font-semibold">+₹{urgentExtra.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-[#D1CABF] flex justify-between font-bold text-[#2D2926]">
                <span className="uppercase tracking-wider">Net Rate per Piece:</span>
                <span className="text-base text-[#8B0000]">₹{unitTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Grand Total Highlight */}
            <div className="bg-[#8B0000] text-white p-5 rounded-xl shadow-xs space-y-1 text-center">
              <span className="text-xs text-[#F2EDE4] font-medium uppercase tracking-wider">Estimated Total Price ({quantity} pcs)</span>
              <div className="text-3xl font-royal font-extrabold text-[#FAF9F6]">
                ₹{grandTotal.toFixed(2)}
              </div>
              <p className="text-[10px] text-[#F2EDE4]/80">
                Includes digital proofing & packing at our Jharsuguda facility
              </p>
            </div>

            {/* Savings Callout */}
            {bulkSavings > 0 && (
              <div className="flex items-center gap-2 bg-[#FAF9F6] text-[#2D2926] border border-[#D1CABF] p-2.5 rounded-lg text-xs font-semibold">
                <TrendingDown className="w-4 h-4 text-[#8B0000] shrink-0" />
                <span>You save ₹{bulkSavings.toFixed(2)} compared to standard single-unit rates!</span>
              </div>
            )}

            {/* WhatsApp Quote CTA */}
            <button
              id="calc-whatsapp-quote-btn"
              onClick={generateWhatsAppQuote}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2D2926] hover:bg-black text-white font-medium text-xs uppercase tracking-wider shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Get This Official Quote on WhatsApp</span>
            </button>

            <p className="text-[10px] text-[#8C847C] text-center">
              GST and interstate courier charges (if outside western Odisha) calculated on final invoice.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
