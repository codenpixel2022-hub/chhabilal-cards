import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, RotateCw, Eye, Maximize2, ShieldCheck, ChevronRight } from 'lucide-react';
import { InvitationSceneManager } from './InvitationScene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GatefoldInvitationProps {
  onOpenCustomizer?: () => void;
  onOpenCalculator?: () => void;
  enableScrollTrigger?: boolean;
}

export const GatefoldInvitation: React.FC<GatefoldInvitationProps> = ({
  onOpenCustomizer,
  onOpenCalculator,
  enableScrollTrigger = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const managerRef = useRef<InvitationSceneManager | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentProgress, setCurrentProgress] = useState<number>(0); // 0 to 1
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<'closed' | 'angled' | 'open'>('closed');

  useEffect(() => {
    if (!containerRef.current) return;

    // Instantiate 3D Scene Manager
    const manager = new InvitationSceneManager({
      container: containerRef.current,
      onLoaded: () => {
        setIsLoading(false);
      },
    });
    managerRef.current = manager;

    // Bind GSAP ScrollTrigger if enabled
    let st: ScrollTrigger | null = null;
    if (enableScrollTrigger && wrapperRef.current) {
      st = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top+=100',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const prog = self.progress;
          manager.setProgress(prog);
          setCurrentProgress(prog);
          if (prog < 0.25) setActivePreset('closed');
          else if (prog < 0.75) setActivePreset('angled');
          else setActivePreset('open');
        },
      });
    }

    return () => {
      if (st) st.kill();
      manager.dispose();
      managerRef.current = null;
    };
  }, [enableScrollTrigger]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentProgress(val);
    if (managerRef.current) {
      managerRef.current.setProgress(val);
    }
    if (val < 0.25) setActivePreset('closed');
    else if (val < 0.75) setActivePreset('angled');
    else setActivePreset('open');
  };

  const handleSetState = (state: 'closed' | 'angled' | 'open') => {
    setActivePreset(state);
    let target = 0;
    if (state === 'closed') target = 0;
    if (state === 'angled') target = 0.5;
    if (state === 'open') target = 1.0;

    setCurrentProgress(target);
    if (managerRef.current) {
      managerRef.current.setProgress(target);
    }
  };

  const handleToggleAutoRotate = () => {
    const next = !isAutoRotate;
    setIsAutoRotate(next);
    if (managerRef.current) {
      managerRef.current.setAutoRotate(next);
    }
  };

  return (
    <div ref={wrapperRef} className="w-full relative flex flex-col items-center select-none font-sans">
      
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef}
        className="w-full h-[460px] sm:h-[560px] md:h-[620px] relative rounded-3xl overflow-hidden bg-radial from-[#FAF6EE] via-[#F2EDE4] to-[#EBE4D8] border border-[#D4AF37]/30 shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {/* Loading Spinner Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-[#FAF9F6] flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full border-4 border-[#D4AF37] border-t-transparent animate-spin"></div>
            <span className="font-royal text-sm font-bold text-[#8B0000] tracking-wider uppercase">
              Rendering 3D Invitation...
            </span>
          </div>
        )}

        {/* Floating Top Status Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#FAF9F6]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <span className="text-xs font-semibold text-[#8B0000] uppercase tracking-wider">
            Real 3D Gatefold Invitation
          </span>
        </div>

        {/* Floating Controls Bar (Top Right) */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={handleToggleAutoRotate}
            className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
              isAutoRotate 
                ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-md' 
                : 'bg-[#FAF9F6]/90 text-[#2D2926] border-[#D1CABF] hover:bg-white'
            }`}
            title="Toggle Auto 3D Spin"
          >
            <RotateCw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Bottom Interactive Control Panel overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#FAF9F6]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-[#D4AF37]/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
            <button
              onClick={() => handleSetState('closed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activePreset === 'closed'
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA]'
              }`}
            >
              Closed (Facade)
            </button>
            <button
              onClick={() => handleSetState('angled')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activePreset === 'angled'
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA]'
              }`}
            >
              Half Open (3D Angle)
            </button>
            <button
              onClick={() => handleSetState('open')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activePreset === 'open'
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'bg-[#F2EDE4] text-[#4A443F] hover:bg-[#E5E1DA]'
              }`}
            >
              Fully Open (Interior)
            </button>
          </div>

          {/* Interactive Opening Slider */}
          <div className="flex items-center gap-3 w-full sm:max-w-xs">
            <span className="text-[11px] font-bold text-[#8C847C] uppercase tracking-wider shrink-0">
              Unfold:
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={currentProgress}
              onChange={handleSliderChange}
              className="w-full accent-[#8B0000] cursor-pointer h-2 bg-[#E5E1DA] rounded-lg"
            />
            <span className="text-xs font-mono font-bold text-[#8B0000] w-9 text-right">
              {Math.round(currentProgress * 100)}%
            </span>
          </div>
        </div>

      </div>

      {/* Action Helper Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 w-full">
        {onOpenCustomizer && (
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B0000] hover:bg-[#6D0000] text-white text-xs uppercase tracking-wider font-semibold shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Customize Names & Shloka on 3D Card</span>
          </button>
        )}
        {onOpenCalculator && (
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F2EDE4] border border-[#D1CABF] text-[#2D2926] text-xs uppercase tracking-wider font-semibold shadow-xs transition-colors"
          >
            <span>Calculate Printing Price for Gatefold</span>
            <ChevronRight className="w-4 h-4 text-[#8C847C]" />
          </button>
        )}
      </div>

    </div>
  );
};
