import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DMIdentityCard from './DMIdentityCard';

/**
 * PortfolioEntrance - Synchronized State Machine Animation Controller
 *
 * Sequence of Explicit Stages:
 * - STAGE 0: INITIAL (0 to 2800ms)
 *   Persistent rectangular DM identity card on warm ivory (#F7F6F2).
 *   Greeting: "HELLO, I'M DEV." + Subtitle.
 *   NO CIRCULAR BORDER anywhere. Card is completely stationary.
 *
 * - STAGE 1: GREETING_EXIT (2800ms to 3250ms, duration: 450ms)
 *   Greeting & subtitle fade out with subtle upward glide.
 *   The rectangular card remains perfectly stationary and focused.
 *
 * - STAGE 2: CARD_LIFT (3250ms to 3750ms, duration: 500ms)
 *   Card subtly lifts from background (translateZ: 30px) with soft realistic shadow.
 *   Card dimensions remain unchanged. NO rotation yet.
 *
 * - STAGE 3: CARD_FLIP (3750ms to 4850ms, duration: 1100ms)
 *   Smooth 180-degree vertical flip around Y-axis with gentle ease-in-out curve.
 *   Reverses to show Dev's actual profile portrait (/img/dev_portrait.jpg).
 *
 * - STAGE 4: PHOTO_PAUSE (4850ms to 5350ms, duration: 500ms)
 *   Settles facing the visitor so the portrait is recognized.
 *
 * - STAGE 5: CARD_TO_HERO (5350ms to 6250ms, duration: 900ms)
 *   Card moves smoothly into the exact hero profile card position while the ivory
 *   background dissolves into the spatial deep dark canvas.
 *
 * - STAGE 6: COMPLETED (6250ms+)
 *   Triggers onComplete() to unmount entrance and activate the fully functional portfolio.
 */
export default function PortfolioEntrance({ onComplete = () => {} }) {
  // State Machine: 0 to 6
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

    // Stage 1: GREETING_EXIT at 2800ms (duration 450ms)
    const t1 = setTimeout(() => {
      setStage(1);
    }, 2800);

    // Stage 2: CARD_LIFT at 3250ms (duration 500ms)
    const t2 = setTimeout(() => {
      setStage(2);
    }, 3250);

    // Stage 3: CARD_FLIP at 3750ms (duration 1100ms)
    const t3 = setTimeout(() => {
      setStage(3);
      setFlipDeg(180);
    }, 3750);

    // Stage 4: PHOTO_PAUSE at 4850ms (duration 500ms)
    const t4 = setTimeout(() => {
      setStage(4);
    }, 4850);

    // Stage 5: CARD_TO_HERO at 5350ms (duration 900ms)
    const t5 = setTimeout(() => {
      setStage(5);
    }, 5350);

    // Stage 6: COMPLETED at 6250ms
    const t6 = setTimeout(() => {
      isTriggeredRef.current = true;
      setStage(6);
      onComplete();
    }, 6250);

    timersRef.current = [t1, t2, t3, t4, t5, t6];

    return () => {
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, [onComplete]);

  if (stage >= 6) {
    return null;
  }

  const isGreetingVisible = stage === 0;
  const isLifted = stage >= 2;
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
        duration: 0.9,
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
        {/* ==================== 1. PERSISTENT RECTANGULAR IDENTITY CARD ==================== */}
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isTraveling ? 0.92 : isLifted ? 1.03 : 1,
            y: isTraveling ? -15 : 0,
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Strictly rectangular from frame 0 - NO circles or morphing */}
          <DMIdentityCard
            flipDeg={flipDeg}
            cardWidth={240}
            cardHeight={340}
            borderRadius={6}
            isLifted={isLifted}
          />
        </motion.div>

        {/* ==================== 2. GREETING & SUBTITLE ==================== */}
        <AnimatePresence>
          {isGreetingVisible && (
            <motion.div
              className="flex flex-col items-center justify-center mt-6 sm:mt-8"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
