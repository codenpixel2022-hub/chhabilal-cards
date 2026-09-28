import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Play, Pause, RotateCcw, Volume2, ShieldCheck, Film, ChevronDown, Check, ArrowRight } from 'lucide-react';
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

interface InvitationFrameAnimationProps {
  className?: string;
  onOpenCustomizer?: () => void;
  onOpenCalculator?: () => void;
  onExploreCards?: () => void;
}

export const InvitationFrameAnimation: React.FC<InvitationFrameAnimationProps> = ({
  className = '',
  onOpenCustomizer,
  onOpenCalculator,
  onExploreCards,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameFloatRef = useRef<number>(0);
  const targetFrameIndexRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  // Check reduced motion accessibility
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 1. Preload 40 frames into memory
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    FRAME_SOURCES.forEach((src, idx) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(pct);

        if (idx === 0) {
          renderFrameToCanvas(0);
        }
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setIsLoaded(true);
      };
      imgArray[idx] = img;
    });

    imagesRef.current = imgArray;

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // 2. High-DPI Canvas Rendering function
  const renderFrameToCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const roundedIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frameIdx)));
    const img = imagesRef.current[roundedIndex];

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = roundedIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i] && imagesRef.current[i].complete) {
          renderFrameToCanvas(i);
          return;
        }
      }
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const cssWidth = rect.width || 1024;
    const cssHeight = rect.height || 576;

    if (canvas.width !== cssWidth * dpr || canvas.height !== cssHeight * dpr) {
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;
    const imgAspect = imgWidth / imgHeight;
    const canvasAspect = cssWidth / cssHeight;

    let drawW = cssWidth;
    let drawH = cssHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawW = cssHeight * imgAspect;
      offsetX = (cssWidth - drawW) / 2;
    } else {
      drawH = cssWidth / imgAspect;
      offsetY = (cssHeight - drawH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    ctx.restore();
  }, []);

  // Smooth LERP loop for silky frame transitions
  const startLerpLoop = useCallback(() => {
    if (animFrameIdRef.current) return;

    const loop = () => {
      const target = targetFrameIndexRef.current;
      const current = currentFrameFloatRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        currentFrameFloatRef.current += diff * 0.18; // smooth spring physics factor
        const currentInt = Math.round(currentFrameFloatRef.current);
        renderFrameToCanvas(currentInt);
        setActiveFrameIndex(currentInt);
        animFrameIdRef.current = requestAnimationFrame(loop);
      } else {
        currentFrameFloatRef.current = target;
        renderFrameToCanvas(target);
        setActiveFrameIndex(target);
        animFrameIdRef.current = null;
      }
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
  }, [renderFrameToCanvas]);

  // 3. Scroll Progress to Frame Mapping
  useEffect(() => {
    if (prefersReducedMotion || isPlayingAuto) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollableHeight));

      const targetFrame = Math.round(rawProgress * (TOTAL_FRAMES - 1));
      targetFrameIndexRef.current = targetFrame;
      startLerpLoop();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [prefersReducedMotion, isPlayingAuto, startLerpLoop]);

  // Auto-play feature toggle
  useEffect(() => {
    if (!isPlayingAuto) return;
    let frameTimer: ReturnType<typeof setInterval>;

    frameTimer = setInterval(() => {
      targetFrameIndexRef.current = (targetFrameIndexRef.current + 1) % TOTAL_FRAMES;
      startLerpLoop();
    }, 120);

    return () => clearInterval(frameTimer);
  }, [isPlayingAuto, startLerpLoop]);

  // Scrub slider input change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    targetFrameIndexRef.current = idx;
    currentFrameFloatRef.current = idx;
    setActiveFrameIndex(idx);
    renderFrameToCanvas(idx);
  };

  // Synchronized contextual text lines based on frame milestone
  const getContextualCaption = () => {
    if (activeFrameIndex < 10) {
      return {
        title: "Designed to be opened.",
        subtitle: "A royal 3-panel gatefold wrapped in imperial crimson and embossed antique gold deckle borders.",
        phase: "Phase 1: Royal Exterior Facade"
      };
    } else if (activeFrameIndex < 24) {
      return {
        title: "Created to be remembered.",
        subtitle: "The gold wax seal breaks gently as the silk band slides off, revealing multi-leaf ceremonial inserts.",
        phase: "Phase 2: Unbanding & Unfolding"
      };
    } else if (activeFrameIndex < 35) {
      return {
        title: "Unfolding every sacred detail.",
        subtitle: "Gilded Odia and Devanagari typography with intricate laser-cut floral mandap motifs.",
        phase: "Phase 3: Interior Reveal"
      };
    } else {
      return {
        title: "Your Story. Eternally Invited.",
        subtitle: "Crafted by Chhabilal Cards Jharsuguda using imported 350 GSM pearlescent linen board.",
        phase: "Phase 4: Full Luxury Showcase"
      };
    }
  };

  const caption = getContextualCaption();

  return (
    <div 
      ref={sectionRef} 
      className={`w-full relative font-sans ${className}`}
      style={{ height: prefersReducedMotion ? 'auto' : '260vh' }}
    >
      {/* Sticky Canvas Container */}
      <div className={`${prefersReducedMotion ? 'relative py-8' : 'sticky top-16 md:top-20'} w-full flex flex-col items-center justify-center space-y-6 py-4`}>
        
        {/* Main Canvas Viewport with Luxury Styling */}
        <div className="w-full max-w-6xl aspect-16/9 relative rounded-3xl overflow-hidden bg-radial from-[#FAF6EE] via-[#F2EDE4] to-[#EBE4D8] border border-[#D4AF37]/40 shadow-2xl flex items-center justify-center group">
          
          {/* Preloader Overlay */}
          {!isLoaded && (
            <div className="absolute inset-0 z-30 bg-[#FAF9F6] flex flex-col items-center justify-center space-y-4 px-6 text-center">
              <div className="w-14 h-14 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>
              <div className="space-y-1">
                <h4 className="font-royal text-base font-bold text-[#8B0000]">
                  Preparing Royal Invitation Animation...
                </h4>
                <p className="text-xs text-[#8C847C] font-mono">
                  Loading Frame Cache: {loadProgress}%
                </p>
              </div>
              <div className="w-64 h-2 bg-[#E5E1DA] rounded-full overflow-hidden border border-[#D1CABF]">
                <div 
                  className="h-full bg-[#8B0000] transition-all duration-200"
                  style={{ width: `${loadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* HTML5 Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain block drop-shadow-2xl cursor-ns-resize transition-transform duration-500 hover:scale-[1.01]"
          />

          {/* Overlay Text Sync (Milestone Overlay) */}
          <div className="absolute inset-x-6 top-8 z-10 flex flex-col items-center text-center space-y-1 pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#8B0000] font-bold bg-[#FAF9F6]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/30 shadow-xs">
              {caption.phase}
            </span>
            <h3 className="font-royal text-xl sm:text-3xl font-bold text-[#2D2926] drop-shadow-xs transition-all duration-300">
              {caption.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#4A443F] max-w-xl hidden sm:block drop-shadow-xs font-serif-luxury italic">
              "{caption.subtitle}"
            </p>
          </div>

          {/* Floating Top Controls */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#FAF9F6]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
              <Film className="w-4 h-4 text-[#8B0000] animate-pulse" />
              <span className="text-xs font-semibold text-[#8B0000] uppercase tracking-wider">
                Frame {activeFrameIndex + 1} / {TOTAL_FRAMES}
              </span>
            </div>
          </div>

          {/* Auto Play & Reset Actions */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className="flex items-center gap-1.5 bg-[#FAF9F6]/95 hover:bg-white backdrop-blur-md px-3 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs text-xs font-semibold text-[#2D2926] transition-all"
              title={isPlayingAuto ? 'Pause animation' : 'Auto-play 40 frames'}
            >
              {isPlayingAuto ? <Pause className="w-3.5 h-3.5 text-[#8B0000]" /> : <Play className="w-3.5 h-3.5 text-[#8B0000]" />}
              <span className="hidden sm:inline">{isPlayingAuto ? 'Pause' : 'Auto Play'}</span>
            </button>
            <button
              onClick={() => {
                targetFrameIndexRef.current = 0;
                currentFrameFloatRef.current = 0;
                setActiveFrameIndex(0);
                renderFrameToCanvas(0);
              }}
              className="bg-[#FAF9F6]/95 hover:bg-white backdrop-blur-md p-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs text-[#2D2926] transition-all"
              title="Reset to Frame 1"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#8B0000]" />
            </button>
          </div>

          {/* Bottom Floating Scrubber Bar */}
          <div className="absolute bottom-4 inset-x-4 z-20 bg-[#FAF9F6]/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#D4AF37]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-semibold text-[#2D2926] uppercase tracking-wider">
                {caption.phase}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:max-w-md">
              <span className="text-[10px] font-bold text-[#8C847C] uppercase tracking-wider shrink-0">
                Scroll / Drag Frame:
              </span>
              <input
                type="range"
                min="0"
                max={TOTAL_FRAMES - 1}
                value={activeFrameIndex}
                onChange={handleSliderChange}
                className="w-full accent-[#8B0000] cursor-pointer h-2 bg-[#E5E1DA] rounded-lg"
              />
              <span className="text-xs font-mono font-bold text-[#8B0000] w-9 text-right">
                {Math.round(((activeFrameIndex + 1) / TOTAL_FRAMES) * 100)}%
              </span>
            </div>
          </div>

        </div>

        {/* Floating Action Bar Below Canvas */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-6xl">
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-widest font-semibold shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Customize Names & Shlokas</span>
            </button>
          )}

          {onExploreCards && (
            <button
              onClick={onExploreCards}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F2EDE4] hover:bg-[#E5E1DA] border border-[#D1CABF] text-[#2D2926] text-xs uppercase tracking-widest font-semibold shadow-xs transition-colors"
            >
              <span>Explore All 500+ Designs</span>
              <ArrowRight className="w-4 h-4 text-[#8B0000]" />
            </button>
          )}

          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF9F6] hover:bg-[#F2EDE4] border border-[#D1CABF] text-[#4A443F] text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              <span>Calculate Bulk Printing Rates</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
