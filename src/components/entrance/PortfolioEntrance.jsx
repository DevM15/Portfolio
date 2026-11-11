import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DMIdentityCard from './DMIdentityCard';

/**
 * PortfolioEntrance - Synchronized State Machine Animation Controller
 *
 * Sequence of Explicit Stages:
 * - STAGE 0: INITIAL_INTRO (0–2400ms)
 *   1. Warm ivory background (#F7F6F2) fades in.
 *   2. Standalone metallic DM monogram appears with no border (NO CIRCLE, NO RECTANGLE).
 *   3. "HELLO, I'M DEV." fades in with subtle upward glide.
 *   4. Subtitle "DESIGNING & BUILDING DIGITAL EXPERIENCES." appears.
 *   5. Comfortable reading pause (1800ms).
 *
 * - STAGE 1: GREETING_EXIT (2400–2800ms, duration: 400ms)
 *   Greeting & subtitle fade out with gentle upward movement.
 *   DM monogram remains perfectly visible and centered.
 *
 * - STAGE 2: CARD_FORMATION (2800–3300ms, duration: 500ms)
 *   Rectangular card boundary (#DED9CE) emerges smoothly around the DM monogram.
 *
 * - STAGE 3: CARD_LIFT (3300–3650ms, duration: 350ms)
 *   Card subtly lifts from the background (translateZ: 30px) with soft realistic shadow.
 *
 * - STAGE 4: CARD_FLIP (3650–4850ms, duration: 1200ms)
 *   Smooth 180° vertical flip around Y-axis.
 *   Reveals Dev's actual profile photograph covering the ENTIRE back face (edge-to-edge).
 *
 * - STAGE 5: PROFILE_PAUSE (4850–5250ms, duration: 400ms)
 *   Pause facing the visitor to recognize the photograph.
 *
 * - STAGE 6: CARD_TO_HERO & WEBSITE_REVEAL (5250–6150ms, duration: 900ms)
 *   The flipped card scales and moves into the hero profile card position.
 *   The entrance dissolves into the light-themed website.
 *
 * - STAGE 7: COMPLETED (6150ms+)
 *   Full handoff to the live, fully interactive portfolio.
 */
export default function PortfolioEntrance({ onComplete = () => {} }) {
  const [stage, setStage] = useState(0);
  const [flipDeg, setFlipDeg] = useState(0);
  const isTriggeredRef = useRef(false);
  const timersRef = useRef([]);

  // Preload actual profile photo so reverse face is rendered instantly
  useEffect(() => {
    const img = new Image();
    img.src = '/img/dev_portrait.jpg';
  }, []);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [onComplete]);

  // Synchronized Master Timeline Setup
  useEffect(() => {
    if (isTriggeredRef.current) return;

    // Stage 1: GREETING_EXIT at 2400ms (duration 400ms)
    const t1 = setTimeout(() => {
      setStage(1);
    }, 2400);

    // Stage 2: CARD_FORMATION at 2800ms (duration 500ms)
    const t2 = setTimeout(() => {
      setStage(2);
    }, 2800);

    // Stage 3: CARD_LIFT at 3300ms (duration 350ms)
    const t3 = setTimeout(() => {
      setStage(3);
    }, 3300);

    // Stage 4: CARD_FLIP at 3650ms (duration 1200ms)
    const t4 = setTimeout(() => {
      setStage(4);
      setFlipDeg(180);
    }, 3650);

    // Stage 5: PROFILE_PAUSE at 4850ms (duration 400ms)
    const t5 = setTimeout(() => {
      setStage(5);
    }, 4850);

    // Stage 6: CARD_TO_HERO at 5250ms (duration 900ms)
    const t6 = setTimeout(() => {
      setStage(6);
    }, 5250);

    // Stage 7: COMPLETED at 6150ms
    const t7 = setTimeout(() => {
      isTriggeredRef.current = true;
      setStage(7);
      onComplete();
    }, 6150);

    timersRef.current = [t1, t2, t3, t4, t5, t6, t7];

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  if (stage >= 7) {
    return null;
  }

  const isGreetingVisible = stage === 0;
  const isFramed = stage >= 2;
  const isLifted = stage >= 3;
  const isTraveling = stage === 6;

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
            scale: isTraveling ? 0.92 : isLifted ? 1.03 : 1,
            y: isTraveling ? -15 : 0,
          }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* DM Identity Card: initially standalone DM, then rectangle forms at Stage 2 */}
          <DMIdentityCard
            flipDeg={flipDeg}
            cardWidth={240}
            cardHeight={340}
            borderRadius={6}
            isFramed={isFramed}
            isLifted={isLifted}
          />
        </motion.div>

        {/* ==================== 2. GREETING & SUBTITLE ==================== */}
        <AnimatePresence>
          {isGreetingVisible && (
            <motion.div
              className="flex flex-col items-center justify-center mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
