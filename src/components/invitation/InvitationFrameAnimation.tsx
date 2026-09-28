import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, Play, Pause, RotateCcw, Volume2, ShieldCheck, Film } from 'lucide-react';
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

// Array of all 40 imported frame image URLs
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
}

export const InvitationFrameAnimation: React.FC<InvitationFrameAnimationProps> = ({
  className = '',
  onOpenCustomizer,
  onOpenCalculator,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Preloaded Image elements cache
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef<number>(0);
  const targetFrameIndexRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  const [loadProgress, setLoadProgress] = useState<number>(0); // 0 to 100%
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check reduced motion accessibility
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 1. Preload all 40 frames into RAM cache
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
          // Render first frame immediately
          renderFrameToCanvas(0);
        }

        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = (err) => {
        console.warn(`Frame ${idx + 1} failed to load:`, err);
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

  // 2. High-DPI Canvas Rendering function (Contain Scaling)
  const renderFrameToCanvas = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fallback: draw nearest available frame
      for (let i = frameIdx - 1; i >= 0; i--) {
        if (imagesRef.current[i] && imagesRef.current[i].complete) {
          renderFrameToCanvas(i);
          return;
        }
      }
      return;
    }

    // High-DPI Resolution Scaling
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const cssWidth = rect.width || 900;
    const cssHeight = rect.height || 506; // 16:9 ratio

    if (canvas.width !== cssWidth * dpr || canvas.height !== cssHeight * dpr) {
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // Aspect Ratio Contain Math (16:9)
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

    // Smooth Canvas Draw
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    ctx.restore();
  }, []);

  // 3. Scroll Progress to Frame Index Mapping
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      // Scroll Progress inside sticky section (0.0 to 1.0)
      const currentScroll = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, currentScroll / totalScrollableHeight));

      // Calculate Target Frame Index (0 to 39)
      const targetFrame = Math.floor(rawProgress * (TOTAL_FRAMES - 1));
      targetFrameIndexRef.current = targetFrame;

      // Schedule frame render inside requestAnimationFrame
      if (!animFrameIdRef.current) {
        animFrameIdRef.current = requestAnimationFrame(() => {
          if (currentFrameIndexRef.current !== targetFrameIndexRef.current) {
            currentFrameIndexRef.current = targetFrameIndexRef.current;
            renderFrameToCanvas(currentFrameIndexRef.current);
            setActiveFrameIndex(currentFrameIndexRef.current);
          }
          animFrameIdRef.current = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [prefersReducedMotion, renderFrameToCanvas]);

  // Handle manual slider scrubbing
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10);
    currentFrameIndexRef.current = idx;
    targetFrameIndexRef.current = idx;
    setActiveFrameIndex(idx);
    renderFrameToCanvas(idx);
  };

  return (
    <div 
      ref={sectionRef} 
      className={`w-full relative font-sans ${className}`}
      style={{ height: prefersReducedMotion ? 'auto' : '260vh' }}
    >
      {/* Sticky Cinematic Container */}
      <div className={`${prefersReducedMotion ? 'relative' : 'sticky top-16 md:top-20'} w-full flex flex-col items-center justify-center space-y-4 py-4`}>
        
        {/* Main Canvas Viewport Box */}
        <div className="w-full max-w-5xl aspect-16/9 relative rounded-3xl overflow-hidden bg-radial from-[#FAF6EE] via-[#F2EDE4] to-[#EBE4D8] border border-[#D4AF37]/40 shadow-2xl flex items-center justify-center">
          
          {/* Preloader Screen Overlay */}
          {!isLoaded && (
            <div className="absolute inset-0 z-20 bg-[#FAF9F6] flex flex-col items-center justify-center space-y-4 px-6 text-center">
              <div className="w-14 h-14 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>
              
              <div className="space-y-1">
                <h4 className="font-royal text-base font-bold text-[#8B0000]">
                  Preparing Your Royal Invitation...
                </h4>
                <p className="text-xs text-[#8C847C] font-mono">
                  Loading Cinematic Frames: {loadProgress}%
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-64 h-2 bg-[#E5E1DA] rounded-full overflow-hidden border border-[#D1CABF]">
                <div 
                  className="h-full bg-[#8B0000] transition-all duration-200"
                  style={{ width: `${loadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Single HTML5 Animation Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain block drop-shadow-xl cursor-ns-resize"
          />

          {/* Floating Top Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#FAF9F6]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
            <Film className="w-4 h-4 text-[#8B0000] animate-pulse" />
            <span className="text-xs font-semibold text-[#8B0000] uppercase tracking-wider">
              Cinematic Unfolding • Frame {activeFrameIndex + 1} / 40
            </span>
          </div>

          {/* Floating Bottom Control Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#FAF9F6]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#D4AF37]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-semibold text-[#2D2926] uppercase tracking-wider">
                {activeFrameIndex < 10 ? 'Phase 1: Exterior Facade' : 
                 activeFrameIndex < 22 ? 'Phase 2: Unbanding & Opening' : 
                 activeFrameIndex < 32 ? 'Phase 3: Interior Reveal' : 
                 'Phase 4: Full Luxury Showcase'}
              </span>
            </div>

            {/* Interactive Frame Slider Scrub */}
            <div className="flex items-center gap-3 w-full sm:max-w-xs">
              <span className="text-[11px] font-bold text-[#8C847C] uppercase tracking-wider shrink-0">
                Scroll / Scrub:
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

        {/* Action Helper CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-5xl">
          {onOpenCustomizer && (
            <button
              onClick={onOpenCustomizer}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-semibold shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Personalize Names & Shlokas</span>
            </button>
          )}
          {onOpenCalculator && (
            <button
              onClick={onOpenCalculator}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F2EDE4] border border-[#D1CABF] text-[#2D2926] text-xs uppercase tracking-wider font-semibold shadow-xs transition-colors"
            >
              <span>Calculate Bulk Printing Rates</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
