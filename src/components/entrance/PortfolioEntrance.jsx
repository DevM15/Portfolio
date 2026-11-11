import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DMMonogram from './DMMonogram';
import PortalScene from './PortalScene';

/**
 * PortfolioEntrance - Minimal Editorial Loading Experience
 *
 * Requirements:
 * - Extremely minimal: ONLY 3 text elements:
 *     1. DM Monogram
 *     2. HELLO, I'M DEV.
 *     3. DESIGNING & BUILDING DIGITAL EXPERIENCES.
 * - Removed completely:
 *     - SKIP INTRO button
 *     - ENTER EXPERIENCE button
 *     - Unnecessary technical specifications & telemetry
 *     - Extra architectural descriptions & duplicate labels
 *     - Instructions such as "CLICK MONOGRAM"
 *     - Excessive footer metadata
 * - Typography: Manrope Bold with natural letter spacing (-0.03em), Inter body.
 * - Restrained Terracotta Accent (#B96F52) on the greeting dot.
 * - Automatic portal transition into hero (~4.5s total).
 */
export default function PortfolioEntrance({ onComplete = () => {} }) {
  // Step 0: Monogram reveal -> Step 1: Greeting -> Step 2: Monogram Activation -> Step 3: Portal Open -> Step 4: Camera Zoom -> Step 5: Complete
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

  // Automatic Timeline Sequence (Clean ~4.5s Experience)
  useEffect(() => {
    if (isTriggeredRef.current) return;

    // Step 0: Monogram reveals (0-400ms)
    const t0 = setTimeout(() => {
      setStep(1); // Monogram in place
    }, 400);

    // Step 1: Greeting & Subtitle glide in smoothly at 1000ms
    const t1 = setTimeout(() => {
      setStep(2); // Greeting visible
    }, 1000);

    // Step 2: Hold until 2800ms, then letters separate & activate automatically
    const t2 = setTimeout(() => {
      setStep(3); // ACTIVATING (monogram separates)
    }, 2800);

    // Step 3: Portal opens cleanly between letters at 3500ms
    const t3 = setTimeout(() => {
      setStep(4); // PORTAL_OPEN
    }, 3500);

    // Step 4: Cinematic camera forward dolly at 4100ms
    const t4 = setTimeout(() => {
      setStep(5); // TRANSITIONING
    }, 4100);

    // Step 5: Complete and hand off to website hero at 4900ms
    const t5 = setTimeout(() => {
      isTriggeredRef.current = true;
      setStep(6);
      onComplete();
    }, 4900);

    timersRef.current = [t0, t1, t2, t3, t4, t5];

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  if (step >= 6) {
    return null;
  }

  const isActivating = step >= 3;
  const isPortalOpen = step >= 4;
  const isTransitioning = step >= 5;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none bg-[#F7F6F2]"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isTransitioning ? 0 : 1,
      }}
      transition={{
        opacity: { duration: 0.65, delay: isTransitioning ? 0.35 : 0, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Subtle Warm Paper Texture Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Center Exhibition Stage: Monogram, Portal, and Minimal 3-Tier Typography */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-4xl px-6 text-center">
        {/* 1. Sculptural 3D DM Monogram & Expanding Doorway Portal */}
        <div className="relative flex items-center justify-center mb-6 sm:mb-8">
          <PortalScene
            isPortalOpen={isPortalOpen}
            isTransitioning={isTransitioning}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: step >= 1 ? 1 : 0,
              scale: step >= 1 ? 1 : 0.94,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <DMMonogram
              isActivating={isActivating}
              isPortalOpen={isPortalOpen}
            />
          </motion.div>
        </div>

        {/* 2 & 3. Pure Minimal Greeting & Subtitle (No buttons, no instructions, no clutter) */}
        <motion.div
          className="flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: isActivating ? 0 : step >= 2 ? 1 : 0,
            y: isActivating ? -10 : step >= 2 ? 0 : 16,
          }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main Greeting: "HELLO, I'M DEV." - Single Line Desktop, Manrope Bold, Natural Proportions */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-display font-bold text-[#252A27] tracking-tight whitespace-normal sm:whitespace-nowrap leading-[1.05] select-none">
            HELLO, I'M DEV<span className="text-[#B96F52]">.</span>
          </h1>

          {/* Subtitle: "DESIGNING & BUILDING DIGITAL EXPERIENCES." */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-sans font-medium text-[#788477] tracking-normal select-none">
            DESIGNING & BUILDING DIGITAL EXPERIENCES.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
