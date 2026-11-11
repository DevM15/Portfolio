import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DMIdentityCard from './DMIdentityCard';

/**
 * PortfolioEntrance - 3D Flip Card Reveal Transition
 *
 * Sequence Timeline:
 * 1. Initial State (0–2000ms):
 *    - Warm ivory background (#F7F6F2)
 *    - Metallic DM monogram centered with subtle geometric orbit
 *    - Large greeting: "HELLO, I'M DEV." + Subtitle
 *    - Visitors have comfortable time to read and observe.
 *
 * 2. Greeting Disappearance (2000–2400ms):
 *    - "HELLO, I'M DEV." and subtitle smoothly fade out with slight upward movement.
 *    - The DM monogram remains the focal point.
 *
 * 3. Rectangular Frame Formation (2400–2900ms):
 *    - A sophisticated rectangular border forms around DM with subtle warm shadow.
 *    - Circular frame fades away as the monogram becomes a physical identity card.
 *
 * 4. 3D Flip Animation (2900–4100ms):
 *    - Card lifts with perspective (translateZ: 25px).
 *    - Smooth 180° vertical Y-axis flip revealing actual profile photograph (/img/dev_portrait.jpg).
 *    - Brief pause (300ms) for visitor recognition.
 *
 * 5. Card Transformation to Hero Position & Progressive Reveal (4400–5300ms):
 *    - The flipped profile card smoothly travels to the hero profile card position (x, y, scale).
 *    - Background dissolves seamlessly from warm ivory into the spatial deep dark background.
 *    - Navigation, header identity, and other hero elements progressively reveal in staggered succession.
 *    - Handoff complete: Website is 100% functional and interactive.
 */
export default function PortfolioEntrance({ onComplete = () => {} }) {
  // Sequence Stages:
  // 0: Initial (Greeting + Monogram)
  // 1: Greeting fades out
  // 2: Rectangular frame forms
  // 3: Card lifts & 3D Flip begins (0 -> 180deg)
  // 4: Flip completed, pause on profile photo
  // 5: Card moves towards hero position & ivory fades out
  // 6: Completed (unmounted)
  const [stage, setStage] = useState(0);
  const [flipDeg, setFlipDeg] = useState(0);
  const isTriggeredRef = useRef(false);
  const timersRef = useRef([]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [onComplete]);

  // Master Automatic Animation Sequence
  useEffect(() => {
    if (isTriggeredRef.current) return;

    // Stage 1: Greeting fades out at 2000ms
    const t1 = setTimeout(() => {
      setStage(1);
    }, 2000);

    // Stage 2: Rectangular frame forms around DM at 2450ms
    const t2 = setTimeout(() => {
      setStage(2);
    }, 2450);

    // Stage 3: Card lifts and starts 3D flip at 3000ms
    const t3 = setTimeout(() => {
      setStage(3);
      setFlipDeg(180);
    }, 3000);

    // Stage 4: 180 flip done, brief pause on profile photograph at 4000ms
    const t4 = setTimeout(() => {
      setStage(4);
    }, 4000);

    // Stage 5: Card travels into hero position & ivory background dissolves at 4400ms
    const t5 = setTimeout(() => {
      setStage(5);
    }, 4400);

    // Stage 6: Full handoff to existing hero at 5300ms
    const t6 = setTimeout(() => {
      isTriggeredRef.current = true;
      setStage(6);
      onComplete();
    }, 5300);

    timersRef.current = [t1, t2, t3, t4, t5, t6];

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  if (stage >= 6) {
    return null;
  }

  const isGreetingVisible = stage === 0;
  const isFramed = stage >= 2;
  const isLifted = stage >= 3;
  const isTraveling = stage === 5;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none pointer-events-none"
      style={{
        backgroundColor: '#F7F6F2',
      }}
      initial={{ opacity: 1 }}
      animate={{
        opacity: isTraveling ? 0 : 1,
      }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Subtle Warm Paper Texture Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Center 3D Stage */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-4xl px-6 text-center">
        {/* ==================== 1. DM IDENTITY FLIP CARD ==================== */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isTraveling ? 0.9 : isLifted ? 1.04 : 1,
            y: isTraveling ? -10 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Subtle Circular Architectural Frame (gradually fades out as rectangle forms) */}
          <motion.div
            className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-[#DED9CE] pointer-events-none"
            animate={{
              opacity: isFramed ? 0 : 0.6,
              scale: isFramed ? 1.15 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* DM Identity Card Component with 180° vertical 3D Flip */}
          <DMIdentityCard
            flipDeg={flipDeg}
            cardWidth={240}
            cardHeight={340}
            borderRadius={isFramed ? 4 : 2}
            isFramed={isFramed}
            isLifted={isLifted}
            shadowOpacity={isLifted ? 0.32 : 0.18}
          />
        </motion.div>

        {/* ==================== 2. GREETING & SUBTITLE (SMOOTH FADE OUT) ==================== */}
        <AnimatePresence>
          {isGreetingVisible && (
            <motion.div
              className="flex flex-col items-center justify-center mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-[#252A27] tracking-tight whitespace-normal sm:whitespace-nowrap leading-[1.05] select-none">
                HELLO, I'M DEV<span className="text-[#B96F52]">.</span>
              </h1>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-sans font-medium text-[#788477] tracking-normal select-none">
                DESIGNING & BUILDING DIGITAL EXPERIENCES.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
