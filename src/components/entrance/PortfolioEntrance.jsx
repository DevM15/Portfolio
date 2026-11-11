import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DMMonogram from './DMMonogram';
import PortalScene from './PortalScene';
import EntranceWorkspaceDetails from './EntranceWorkspaceDetails';

/**
 * State Machine for PortfolioEntrance:
 * INITIAL -> ACTIVATING -> PORTAL_OPEN -> TRANSITIONING -> COMPLETED
 *
 * Visual Direction:
 * Light, Minimal, Warm Ivory (#F5F4F0), Editorial, Apple-Style Precision.
 *
 * Sequence Timeline:
 * - Scene 01: Warm ivory background, architectural crosshairs, 3D DM monogram emerges.
 * - Scene 02: On click / Enter: D & M letters gently separate in 3D, catching light reflections.
 * - Scene 03: Minimal architectural portal doorway forms between D & M showing real hero core.
 * - Scene 04: Cinematic forward camera zoom smoothly magnifies portal to 100vw x 100vh.
 * - Scene 05: Seamless handoff to the existing dark portfolio hero without abrupt cut.
 */
export default function PortfolioEntrance({ onComplete = () => {} }) {
  // State Machine
  const [stage, setStage] = useState('INITIAL'); // 'INITIAL' | 'ACTIVATING' | 'PORTAL_OPEN' | 'TRANSITIONING' | 'COMPLETED'
  const [isHovered, setIsHovered] = useState(false);
  const isTriggeredRef = useRef(false);

  // Check user prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [onComplete]);

  // Activate Entrance Sequence
  const handleActivate = useCallback(() => {
    if (isTriggeredRef.current || stage !== 'INITIAL') return;
    isTriggeredRef.current = true;
    setStage('ACTIVATING');

    // 1. Monogram activation (letters separate & rotate) -> Portal Opens at 700ms
    const t1 = setTimeout(() => {
      setStage('PORTAL_OPEN');
    }, 700);

    // 2. Portal formed and viewed -> Camera zoom begins at 1700ms
    const t2 = setTimeout(() => {
      setStage('TRANSITIONING');
    }, 1750);

    // 3. Camera reaches 100vw, seamless reveal of hero section at 2950ms
    const t3 = setTimeout(() => {
      setStage('COMPLETED');
      onComplete();
    }, 2950);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [stage, onComplete]);

  // Skip Intro immediately
  const handleSkip = useCallback(() => {
    isTriggeredRef.current = true;
    setStage('COMPLETED');
    onComplete();
  }, [onComplete]);

  // Keyboard navigation support (Esc to skip, Enter / Space handled on button)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  if (stage === 'COMPLETED') {
    return null;
  }

  const isActivating = stage === 'ACTIVATING' || stage === 'PORTAL_OPEN' || stage === 'TRANSITIONING';
  const isPortalOpen = stage === 'PORTAL_OPEN' || stage === 'TRANSITIONING';
  const isTransitioning = stage === 'TRANSITIONING';

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-hidden select-none"
      style={{
        backgroundColor: '#F5F4F0', // Warm off-white / ivory architectural background
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isTransitioning ? 0 : 1,
      }}
      transition={{
        opacity: { duration: 0.6, delay: isTransitioning ? 0.65 : 0, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Subtle Warm Paper Texture Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Thin Architectural Horizon and Vertical Grid Guide Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal Alignment Guides */}
        <div className="absolute top-20 left-8 right-8 h-px bg-[#E2DFD6]" />
        <div className="absolute bottom-20 left-8 right-8 h-px bg-[#E2DFD6]" />

        {/* Vertical Center Grid Line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#ECE9E1] -translate-x-1/2" />

        {/* Corner Precision Crosshair Coordinates */}
        <div className="absolute top-20 left-8 w-2 h-2 -translate-x-1/2 -translate-y-1/2 border-t border-l border-[#A6A296]" />
        <div className="absolute top-20 right-8 w-2 h-2 translate-x-1/2 -translate-y-1/2 border-t border-r border-[#A6A296]" />
        <div className="absolute bottom-20 left-8 w-2 h-2 -translate-x-1/2 translate-y-1/2 border-b border-l border-[#A6A296]" />
        <div className="absolute bottom-20 right-8 w-2 h-2 translate-x-1/2 translate-y-1/2 border-b border-r border-[#A6A296]" />
      </div>

      {/* Subtle Digital Workspace Telemetry */}
      <EntranceWorkspaceDetails
        isActivating={isActivating}
        isPortalOpen={isPortalOpen}
      />

      {/* Top Editorial Bar */}
      <header className="relative z-20 w-full px-8 py-7 flex items-center justify-between text-[11px] font-mono tracking-[0.25em] uppercase text-[#1C1E1D]">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1C1E1D]" />
          <span className="font-bold">DEV MISTRY</span>
          <span className="text-[#8C877B] hidden sm:inline">• PORTFOLIO</span>
        </div>

        {/* Skip Intro Button */}
        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 py-1.5 px-3 rounded-full border border-[#D5D2C7] bg-[#EFECE3]/70 hover:bg-[#E3DFD3] text-[#545148] hover:text-[#1C1E1D] transition-all cursor-pointer font-mono text-[10px] tracking-widest"
          title="Skip intro to hero (Esc)"
        >
          <span>SKIP INTRO</span>
          <span className="group-hover:translate-x-0.5 transition-transform text-[#8C877B]">→</span>
        </button>
      </header>

      {/* Center 3D Stage (Monogram + Portal) */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-6">
        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Architectural Digital Portal */}
          <PortalScene
            isPortalOpen={isPortalOpen}
            isTransitioning={isTransitioning}
          />

          {/* 3D DM Sculptural Monogram */}
          <DMMonogram
            isActivating={isActivating}
            isPortalOpen={isPortalOpen}
            isHovered={isHovered}
            onActivate={handleActivate}
          />
        </div>

        {/* Editorial Subtitle & Enter Instruction (Fades out once clicked) */}
        <div
          className={`flex flex-col items-center justify-center mt-6 text-center transition-all duration-500 ${
            isActivating ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#6E6B62] font-medium max-w-md">
            DESIGNING & BUILDING DIGITAL EXPERIENCES
          </p>

          <button
            onClick={handleActivate}
            className="mt-6 flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#C8C5B9] bg-[#EAE7DC]/80 hover:bg-[#DDD8CB] text-[#1C1E1D] font-mono text-[11px] tracking-[0.25em] uppercase font-bold transition-all shadow-sm hover:shadow-md cursor-pointer group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C1E1D] group-hover:scale-125 transition-transform" />
            <span>ENTER EXPERIENCE</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </main>

      {/* Bottom Architectural Metadata Bar */}
      <footer className="relative z-20 w-full px-8 py-7 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] uppercase text-[#8C877B]">
        <div className="flex items-center gap-3">
          <span>ARCHITECTURAL 3D PORTAL</span>
        </div>
        <div className="flex items-center gap-2">
          <span>CLICK MONOGRAM TO INITIATE</span>
        </div>
      </footer>
    </motion.div>
  );
}
