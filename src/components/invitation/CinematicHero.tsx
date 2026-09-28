import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Palette, ArrowRight, ShieldCheck, CheckCircle2, RotateCw, Box, Film, ChevronDown, Layers, Award, Heart, Eye } from 'lucide-react';
import { GatefoldInvitation } from './GatefoldInvitation';
import { ProductShowcaseSection } from './ProductShowcaseSection';
import { ProductItem } from '../../types';

// Import all 40 JPG Frames
import frame01 from '../../assets/frames/ezgif-frame-001.jpg';
import frame02 from '../../assets/frames/ezgif-frame-002.jpg';
import frame03 from '../../assets/frames/ezgif-frame-003.jpg';
import frame04 from '../../assets/frames/ezgif-frame-004.jpg';
import frame05 from '../../assets/frames/ezgif-frame-005.jpg';
import frame06 from '../../assets/frames/ezgif-frame-006.jpg';
import frame07 from '../../assets/frames/ezgif-frame-007.jpg';
import frame08 from '../../assets/frames/ezgif-frame-008.jpg';
import frame09 from '../../assets/frames/ezgif-frame-009.jpg';
import frame10 from '../../assets/frames/ezgif-frame-010.jpg';
import frame11 from '../../assets/frames/ezgif-frame-011.jpg';
import frame12 from '../../assets/frames/ezgif-frame-012.jpg';
import frame13 from '../../assets/frames/ezgif-frame-013.jpg';
import frame14 from '../../assets/frames/ezgif-frame-014.jpg';
import frame15 from '../../assets/frames/ezgif-frame-015.jpg';
import frame16 from '../../assets/frames/ezgif-frame-016.jpg';
import frame17 from '../../assets/frames/ezgif-frame-017.jpg';
import frame18 from '../../assets/frames/ezgif-frame-018.jpg';
import frame19 from '../../assets/frames/ezgif-frame-019.jpg';
import frame20 from '../../assets/frames/ezgif-frame-020.jpg';
import frame21 from '../../assets/frames/ezgif-frame-021.jpg';
import frame22 from '../../assets/frames/ezgif-frame-022.jpg';
import frame23 from '../../assets/frames/ezgif-frame-023.jpg';
import frame24 from '../../assets/frames/ezgif-frame-024.jpg';
import frame25 from '../../assets/frames/ezgif-frame-025.jpg';
import frame26 from '../../assets/frames/ezgif-frame-026.jpg';
import frame27 from '../../assets/frames/ezgif-frame-027.jpg';
import frame28 from '../../assets/frames/ezgif-frame-028.jpg';
import frame29 from '../../assets/frames/ezgif-frame-029.jpg';
import frame30 from '../../assets/frames/ezgif-frame-030.jpg';
import frame31 from '../../assets/frames/ezgif-frame-031.jpg';
import frame32 from '../../assets/frames/ezgif-frame-032.jpg';
import frame33 from '../../assets/frames/ezgif-frame-033.jpg';
import frame34 from '../../assets/frames/ezgif-frame-034.jpg';
import frame35 from '../../assets/frames/ezgif-frame-035.jpg';
import frame36 from '../../assets/frames/ezgif-frame-036.jpg';
import frame37 from '../../assets/frames/ezgif-frame-037.jpg';
import frame38 from '../../assets/frames/ezgif-frame-038.jpg';
import frame39 from '../../assets/frames/ezgif-frame-039.jpg';
import frame40 from '../../assets/frames/ezgif-frame-040.jpg';

const FRAME_SOURCES: string[] = [
  frame01, frame02, frame03, frame04, frame05, frame06, frame07, frame08, frame09, frame10,
  frame11, frame12, frame13, frame14, frame15, frame16, frame17, frame18, frame19, frame20,
  frame21, frame22, frame23, frame24, frame25, frame26, frame27, frame28, frame29, frame30,
  frame31, frame32, frame33, frame34, frame35, frame36, frame37, frame38, frame39, frame40,
];

const TOTAL_FRAMES = 40;

interface CinematicHeroProps {
  onExploreCards: () => void;
  onOpenCustomizer: () => void;
  onExploreStationery: () => void;
  onOpenCalculator: () => void;
  onOpenSampleModal?: () => void;
  onAddToQuote?: (product: ProductItem, quantity: number, notes: string, color: string) => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onExploreCards,
  onOpenCustomizer,
  onExploreStationery,
  onOpenCalculator,
  onOpenSampleModal,
  onAddToQuote,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'cinematic' | 'interactive3d'>('cinematic');

  // Scroll Animations using Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Transforms for Scenes
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.12], [1, 0.9]);
  
  const cardScale = useTransform(smoothProgress, [0.08, 0.35], [0.85, 1.05]);
  const textRevealOpacity = useTransform(smoothProgress, [0.35, 0.50, 0.65], [0, 1, 0]);

  // Preload 40 Frames
  useEffect(() => {
    let loaded = 0;
    const imgArr: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    FRAME_SOURCES.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (idx === 0) renderCanvas(0);
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      imgArr[idx] = img;
    });

    imagesRef.current = imgArr;
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // Render Frame to Canvas
  const renderCanvas = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[idx];
    if (!img || !img.complete) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const cssW = rect.width || 1000;
    const cssH = rect.height || 562;

    if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssW, cssH);

    const imgW = img.naturalWidth || 1920;
    const imgH = img.naturalHeight || 1080;
    const imgAspect = imgW / imgH;
    const canvasAspect = cssW / cssH;

    let drawW = cssW;
    let drawH = cssH;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawW = cssH * imgAspect;
      offsetX = (cssW - drawW) / 2;
    } else {
      drawH = cssW / imgAspect;
      offsetY = (cssH - drawH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    ctx.restore();
  }, []);

  // Bind Scroll to Frame
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (val) => {
      // Map scroll progress 0.08 to 0.60 to frame 0 to 39
      const frameVal = Math.max(0, Math.min(1, (val - 0.08) / 0.52));
      const targetFrame = Math.floor(frameVal * (TOTAL_FRAMES - 1));
      targetFrameRef.current = targetFrame;

      if (!animFrameIdRef.current) {
        animFrameIdRef.current = requestAnimationFrame(() => {
          if (currentFrameRef.current !== targetFrameRef.current) {
            currentFrameRef.current = targetFrameRef.current;
            renderCanvas(currentFrameRef.current);
            setActiveFrameIndex(currentFrameRef.current);
          }
          animFrameIdRef.current = null;
        });
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, renderCanvas]);

  return (
    <div className="bg-[#0B0706] text-[#FAF9F6] font-sans selection:bg-[#D4AF37] selection:text-[#0B0706]">
      
      {/* ========================================================= */}
      {/* SCENE 01 — DARK HERO & SCENE 02 & 03 (STICKY SCROLL SEQUENCE) */}
      {/* ========================================================= */}
      <div ref={containerRef} className="relative h-[320vh] w-full">
        
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* Subtle Royal Damask Overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px]"></div>

          {/* SCENE 01 OVERLAY TEXT */}
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute z-30 text-center max-w-4xl px-4 space-y-5"
          >
            <div className="inline-flex items-center gap-2 bg-[#8B0000]/60 border border-[#D4AF37]/50 text-[#D4AF37] px-4 py-1.5 rounded-full text-xs uppercase tracking-widest backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chhabilal Cards • Bespoke Wedding Invitation Experience</span>
            </div>

            <h1 className="font-royal text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none drop-shadow-2xl">
              Your Wedding Story. <br />
              <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent font-serif-luxury italic">
                Beautifully Invited.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#D1CABF] max-w-xl mx-auto leading-relaxed">
              Step inside Western Odisha’s premier invitation atelier. Experience our signature royal gatefolds, 3D pop-up mandaps, and metallic pearl series.
            </p>

            <div className="pt-4 flex flex-col items-center space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold animate-pulse">
                Scroll to Explore the Unfolding Card
              </span>
              <ChevronDown className="w-5 h-5 text-[#D4AF37] animate-bounce" />
            </div>
          </motion.div>

          {/* SCENE 03 & 04: CANVAS FRAME ANIMATION */}
          <motion.div 
            style={{ scale: cardScale }}
            className="relative z-20 w-full max-w-5xl aspect-16/9 px-4 flex items-center justify-center"
          >
            {/* Ambient Gold Glow Behind Invitation */}
            <div className="absolute inset-0 bg-radial from-[#D4AF37]/25 via-transparent to-transparent rounded-full blur-3xl opacity-50"></div>

            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#140C0A]">
              
              {/* Loader */}
              {!isLoaded && (
                <div className="absolute inset-0 z-40 bg-[#0B0706] flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>
                  <span className="font-royal text-sm text-[#D4AF37] tracking-widest uppercase">
                    Loading Cinematic Frames {loadProgress}%
                  </span>
                </div>
              )}

              {/* 2D HTML5 Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain block drop-shadow-2xl"
              />

              {/* Phase Status Badge Overlay */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-[#0B0706]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 text-[11px] font-semibold text-[#D4AF37] tracking-wider uppercase">
                <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  {activeFrameIndex < 10 ? 'Facade Exterior' : 
                   activeFrameIndex < 22 ? 'Unfolding Gates' : 
                   activeFrameIndex < 32 ? 'Inner Mandap Reveal' : 
                   'Full Luxury Details'}
                </span>
              </div>

              {/* Manual Frame Slider Control (Bottom) */}
              <div className="absolute bottom-4 left-4 right-4 z-30 bg-[#0B0706]/85 backdrop-blur-md p-3 rounded-2xl border border-[#D4AF37]/30 flex items-center justify-between gap-4">
                <span className="text-xs text-[#D1CABF] font-mono hidden sm:inline">
                  Frame {activeFrameIndex + 1} / 40
                </span>
                <input
                  type="range"
                  min="0"
                  max={TOTAL_FRAMES - 1}
                  value={activeFrameIndex}
                  onChange={(e) => {
                    const idx = parseInt(e.target.value, 10);
                    currentFrameRef.current = idx;
                    setActiveFrameIndex(idx);
                    renderCanvas(idx);
                  }}
                  className="w-full accent-[#D4AF37] cursor-pointer h-1.5 bg-[#2A1D19] rounded-lg"
                />
                <span className="text-xs font-mono font-bold text-[#D4AF37] shrink-0">
                  {Math.round(((activeFrameIndex + 1) / TOTAL_FRAMES) * 100)}%
                </span>
              </div>

            </div>
          </motion.div>

          {/* SCENE 04: INNER INVITATION TYPOGRAPHY OVERLAY */}
          <motion.div 
            style={{ opacity: textRevealOpacity }}
            className="absolute z-30 pointer-events-none text-center px-4 max-w-2xl bg-[#0B0706]/90 backdrop-blur-xl p-8 rounded-3xl border border-[#D4AF37]/50 shadow-2xl space-y-4"
          >
            <div className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">
              ॥ ॐ श्री गणेशाय नमः ॥
            </div>
            <h3 className="font-royal text-2xl sm:text-3xl text-white font-bold">
              Together with their Families
            </h3>
            <div className="font-serif-luxury text-3xl sm:text-4xl text-[#D4AF37] italic">
              Rohan & Ananya
            </div>
            <p className="text-xs sm:text-sm text-[#D1CABF] leading-relaxed">
              Cordially invite you to celebrate their auspicious marriage ceremony <br />
              <strong>Sunday, November 24th, 2026</strong> • Imperial Palace, Jharsuguda
            </p>
            <div className="pt-2 text-[11px] text-[#A69076] uppercase tracking-wider">
              Multilingual Printing Available in Pure Odia, Hindi & English
            </div>
          </motion.div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* SCENE 05 — TRANSITION BAR & VIEW SWITCHER */}
      {/* ========================================================= */}
      <section className="relative z-30 bg-[#140C0A] border-y border-[#D4AF37]/30 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold">
              <Award className="w-4 h-4" />
              <span>Chhabilal Manufacturing Craftsmanship</span>
            </div>
            <h3 className="font-royal text-2xl font-bold text-white">
              Explore Our Full Digital Product Platform
            </h3>
          </div>

          <div className="flex items-center bg-[#0B0706] p-1.5 rounded-2xl border border-[#D4AF37]/40 shadow-inner">
            <button
              onClick={() => setActiveTab('cinematic')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'cinematic'
                  ? 'bg-[#8B0000] text-white shadow-lg'
                  : 'text-[#D1CABF] hover:text-white'
              }`}
            >
              <Film className="w-4 h-4 text-[#D4AF37]" />
              <span>Editorial Showcase</span>
            </button>
            <button
              onClick={() => setActiveTab('interactive3d')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'interactive3d'
                  ? 'bg-[#8B0000] text-white shadow-lg'
                  : 'text-[#D1CABF] hover:text-white'
              }`}
            >
              <Box className="w-4 h-4 text-[#D4AF37]" />
              <span>Interactive WebGL 3D</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 06 — EDITORIAL COLLECTION SHOWCASE */}
      {/* ========================================================= */}
      {activeTab === 'cinematic' ? (
        <ProductShowcaseSection 
          onOpenCustomizer={onOpenCustomizer}
          onOpenSampleModal={onOpenSampleModal}
          onAddToQuote={onAddToQuote}
        />
      ) : (
        /* SCENE 08 — INTERACTIVE 3D WEBGL CARD */
        <section className="py-16 px-4 max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-8">
            <h2 className="font-royal text-3xl font-bold text-white">
              Interactive 3D Gatefold Card Inspection
            </h2>
            <p className="text-sm text-[#D1CABF] max-w-xl mx-auto">
              Rotate, zoom, and test gatefold folding angles using our real-time 3D WebGL renderer built from the master GLB model.
            </p>
          </div>
          <GatefoldInvitation 
            onOpenCustomizer={onOpenCustomizer}
            onOpenCalculator={onOpenCalculator}
            enableScrollTrigger={false}
          />
        </section>
      )}

      {/* ========================================================= */}
      {/* SCENE 07 — MACRO DETAILS CRAFTSMANSHIP */}
      {/* ========================================================= */}
      <section className="py-20 px-4 sm:px-6 bg-[#0E0807] border-t border-[#D4AF37]/20">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold">
              The Art of Card Making
            </span>
            <h2 className="font-royal text-3xl sm:text-5xl font-bold text-white">
              "Every Detail Tells a Story"
            </h2>
            <p className="text-sm text-[#D1CABF] max-w-2xl mx-auto">
              We combine centuries-old Odia ceremonial traditions with precision imported pearlescent paper, heavy gold foil stamping, and laser filing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-[#160B08] p-6 rounded-3xl border border-[#D4AF37]/30 space-y-4 hover:border-[#D4AF37] transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/40 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-royal font-bold text-lg text-white">Italian Pearl Paper</h3>
              <p className="text-xs text-[#D1CABF] leading-relaxed">
                320–350 GSM imported pearlescent cardstock with smooth metallic lustre that shines under warm ceremony lights.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-[#160B08] p-6 rounded-3xl border border-[#D4AF37]/30 space-y-4 hover:border-[#D4AF37] transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/40 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-royal font-bold text-lg text-white">Royal Gold Foil</h3>
              <p className="text-xs text-[#D1CABF] leading-relaxed">
                Deep hot-foil stamping for auspicious Ganesh emblems, floral filigree, and royal border calligraphy.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-[#160B08] p-6 rounded-3xl border border-[#D4AF37]/30 space-y-4 hover:border-[#D4AF37] transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/40 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-royal font-bold text-lg text-white">Wax Seal & Satin</h3>
              <p className="text-xs text-[#D1CABF] leading-relaxed">
                Custom metallic wax seal badges and luxury satin ribbons that bind 3-panel gatefold doors gracefully.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-[#160B08] p-6 rounded-3xl border border-[#D4AF37]/30 space-y-4 hover:border-[#D4AF37] transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#8B0000]/40 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-royal font-bold text-lg text-white">Multilingual Script</h3>
              <p className="text-xs text-[#D1CABF] leading-relaxed">
                Authentic Odia typography, Sanskrit Shlokas, Devanagari Hindi, and English wedding invitations.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 09 — CUSTOMIZATION ENGINE BANNER */}
      {/* ========================================================= */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#1B0B07] via-[#2A0E08] to-[#1B0B07] border-t border-[#D4AF37]/30">
        <div className="max-w-5xl mx-auto bg-[#0B0706] p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#8B0000]/60 border border-[#D4AF37]/40 text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5" />
              <span>Live Card Customizer Studio</span>
            </div>
            
            <h2 className="font-royal text-3xl sm:text-4xl font-bold text-white">
              Personalize Your Wedding Card Online
            </h2>

            <p className="text-sm text-[#D1CABF] leading-relaxed">
              Test paper colors, change gold foil accents, customize bride & groom names, and preview Odia/Hindi wedding shlokas in real-time.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={onOpenCustomizer}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-semibold text-xs uppercase tracking-widest shadow-xl transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Launch Live Designer</span>
            </button>
            
            <button
              onClick={onOpenCalculator}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#140C0A] hover:bg-[#1E120F] border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-xs uppercase tracking-widest transition-all"
            >
              <span>Estimate Printing Rates</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SCENE 10 — FINAL LUXURY CTA */}
      {/* ========================================================= */}
      <section className="py-24 px-4 text-center relative overflow-hidden bg-[#0B0706]">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#8B0000]/50 border border-[#D4AF37]/60 flex items-center justify-center mx-auto text-[#D4AF37] shadow-2xl">
            <Sparkles className="w-8 h-8" />
          </div>

          <h2 className="font-royal text-4xl sm:text-6xl font-bold text-white tracking-tight">
            Your Story. <br />
            <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent font-serif-luxury italic">
              Beautifully Invited.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#D1CABF] max-w-xl mx-auto leading-relaxed">
            Visit our workshop in Brajarajnagar, Jharsuguda, or place bulk orders directly with doorstep delivery across Odisha and India.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreCards}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#8B0000] hover:bg-[#6D0000] text-white font-semibold text-xs uppercase tracking-widest shadow-2xl transition-all w-full sm:w-auto"
            >
              <span>Explore 500+ Wedding Cards</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>

            <button
              onClick={onExploreStationery}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#140C0A] hover:bg-[#1E120F] border border-[#D4AF37]/40 text-white font-semibold text-xs uppercase tracking-widest transition-all w-full sm:w-auto"
            >
              <span>Browse Office & School Stationery</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
