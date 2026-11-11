import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import DMMonogram from './DMMonogram';
import PortalScene from './PortalScene';
import EntranceWorkspaceDetails from './EntranceWorkspaceDetails';

/**
 * PortfolioEntrance - Automatic Cinematic Entrance Experience
 *
 * Sequence Timeline (Fully Automatic, no click needed):
 * - 0–500ms: Background and architectural layout appear.
 * - 500–1200ms: 3D DM monogram reveals and settles into position.
 * - 1200–2200ms: Prominent greeting "HELLO, I'M DEV." fades in with subtle upward glide.
 * - 2200–3500ms: Hold composition so visitors comfortably read it.
 * - 3500ms: DM letters naturally separate & rotate, opening the architectural portal.
 * - 4400ms: Cinematic camera moves forward smoothly through the portal into the hero.
 * - 5500ms: Transition completes into the live portfolio hero.
 *
 * Color System:
 * - Primary Background: #F7F6F2 (Warm Ivory)
 * - Primary Typography: #252A27 (Deep Charcoal)
 * - Secondary Typography & Accents: #788477 (Muted Sage)
 */
export default function PortfolioEntrance({ onComplete = () => {} }) {
  // Sequence State: 'BG' -> 'MONOGRAM' -> 'GREETING' -> 'ACTIVATING' -> 'PORTAL_OPEN' -> 'TRANSITIONING' -> 'COMPLETED'
  const [step, setStep] = useState(0); 
  const isTriggeredRef = useRef(false);
  const timersRef = useRef([]);

  // Check user prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [onComplete]);

  // Skip Intro immediately
  const handleSkip = useCallback(() => {
    if (isTriggeredRef.current) return;
    isTriggeredRef.current = true;
    timersRef.current.forEach((t) => clearTimeout(t));
    setStep(6);
    onComplete();
  }, [onComplete]);

  // Automatic Timeline Sequence Setup
  useEffect(() => {
    if (isTriggeredRef.current) return;

    // Step 1: Monogram reveal at 500ms
    const t1 = setTimeout(() => {
      setStep(1);
    }, 500);

    // Step 2: Large Greeting appears at 1300ms
    const t2 = setTimeout(() => {
      setStep(2);
    }, 1300);

    // Step 3: Hold until 3500ms, then automatically start activation
    const t3 = setTimeout(() => {
      setStep(3); // ACTIVATING (monogram separates)
    }, 3500);

    // Step 4: Portal opens at 4200ms
    const t4 = setTimeout(() => {
      setStep(4); // PORTAL_OPEN
    }, 4200);

    // Step 5: Camera zooms forward at 4900ms
    const t5 = setTimeout(() => {
      setStep(5); // TRANSITIONING
    }, 4900);

    // Step 6: Complete entrance at 5900ms
    const t6 = setTimeout(() => {
      isTriggeredRef.current = true;
      setStep(6);
      onComplete();
    }, 5900);

    timersRef.current = [t1, t2, t3, t4, t5, t6];

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  // Keyboard navigation (Esc to skip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  if (step >= 6) {
    return null;
  }

  const isActivating = step >= 3;
  const isPortalOpen = step >= 4;
  const isTransitioning = step >= 5;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden select-none"
      style={{
        backgroundColor: '#F7F6F2', // Warm Ivory (Primary background)
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isTransitioning ? 0 : 1,
      }}
      transition={{
        opacity: { duration: 0.7, delay: isTransitioning ? 0.45 : 0, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Subtle Warm Paper Texture Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Thin Architectural Horizon Guidelines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[88px] left-6 right-6 md:left-12 md:right-12 h-px bg-[#DED9CE]/80" />
        <div className="absolute bottom-[80px] left-6 right-6 md:left-12 md:right-12 h-px bg-[#DED9CE]/80" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#EFECE6] -translate-x-1/2" />
      </div>

      {/* Subtle Digital Workspace Telemetry (Non-overlapping) */}
      <EntranceWorkspaceDetails
        isActivating={isActivating}
        isPortalOpen={isPortalOpen}
      />

      {/* ==================== 1. CLEAN TWO-COLUMN HEADER ==================== */}
      <header className="relative z-20 w-full px-6 md:px-12 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono select-none">
        {/* Left Column: Identity & Subtitle */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#252A27]" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.22em] text-[#252A27] uppercase">
              DEV MISTRY / PORTFOLIO
            </span>
          </div>
          <span className="text-[10px] tracking-[0.2em] text-[#788477] uppercase mt-1 pl-4">
            DESIGN & CODE ARCHIVES
          </span>
        </div>

        {/* Right Column: Specification & Skip Action */}
        <div className="flex items-center justify-between sm:justify-end gap-6 md:gap-8">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#252A27] uppercase">
              DIMENSIONAL PORTFOLIO
            </span>
            <span className="text-[10px] tracking-[0.2em] text-[#788477] uppercase mt-0.5">
              SPEC / 2026 EDITION
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="group flex items-center gap-2 py-1.5 px-4 rounded-full border border-[#DED9CE] bg-[#EFECE6]/80 hover:bg-[#E5E1D8] text-[#252A27] transition-all cursor-pointer font-mono text-[10px] sm:text-xs tracking-widest font-semibold"
            title="Skip intro to hero (Esc)"
          >
            <span>SKIP INTRO</span>
            <span className="group-hover:translate-x-0.5 transition-transform text-[#788477]">→</span>
          </button>
        </div>
      </header>

      {/* ==================== 2. CENTER STAGE: MONOGRAM, GREETING & PORTAL ==================== */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-6 py-4">
        {/* Portal and 3D DM Monogram */}
        <div className="relative flex items-center justify-center">
          <PortalScene
            isPortalOpen={isPortalOpen}
            isTransitioning={isTransitioning}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: step >= 1 ? 1 : 0,
              scale: step >= 1 ? 1 : 0.95,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <DMMonogram
              isActivating={isActivating}
              isPortalOpen={isPortalOpen}
            />
          </motion.div>
        </div>

        {/* Prominent Editorial Greeting: "HELLO, I'M DEV." */}
        <motion.div
          className="flex flex-col items-center justify-center text-center mt-3 sm:mt-5 max-w-2xl px-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{
            opacity: isActivating ? 0 : step >= 2 ? 1 : 0,
            y: isActivating ? -12 : step >= 2 ? 0 : 18,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-[#252A27] leading-[0.95] select-none">
            HELLO, I'M DEV.
          </h1>

          <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs md:text-sm font-mono tracking-[0.28em] uppercase text-[#788477] font-semibold">
            DESIGNING & BUILDING DIGITAL EXPERIENCES
          </p>

          {/* Automatic Progress Indicator */}
          <div className="mt-5 flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] text-[#788477] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#788477] animate-pulse" />
            <span>TRANSITIONING TO EXHIBITION</span>
          </div>
        </motion.div>
      </main>

      {/* ==================== 3. CLEAN TWO-COLUMN FOOTER ==================== */}
      <footer className="relative z-20 w-full px-6 md:px-12 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase select-none">
        <div className="flex items-center gap-2 text-[#252A27] font-semibold">
          <span className="w-1 h-1 rounded-full bg-[#788477]" />
          <span>ARCHITECTURAL 3D PORTAL</span>
        </div>

        <div className="flex items-center gap-2 text-[#788477]">
          <span>AUTOMATIC PORTFOLIO TRANSITION</span>
          <span className="hidden sm:inline">→</span>
        </div>
      </footer>
    </motion.div>
  );
}
