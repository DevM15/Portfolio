import { useState, useEffect, useRef } from 'react';

export const TRANSITION_PHASES = {
  INTRO: 'INTRO',                                 // 0 - 2200ms: Standalone DM monogram + greeting
  GREETING_EXIT: 'GREETING_EXIT',                 // 2200 - 2600ms: Greeting slides up and fades out
  CARD_FORMATION: 'CARD_FORMATION',               // 2600 - 3100ms: Rectangular identity card forms
  CARD_FLIP: 'CARD_FLIP',                         // 3100 - 4300ms: 180° Y-axis flip revealing profile photo
  BACKGROUND_TRANSFORM: 'BACKGROUND_TRANSFORM',   // 3900 - 4700ms: Canvas grid and horizon lines draw
  NAVIGATION_REVEAL: 'NAVIGATION_REVEAL',         // 4400 - 5200ms: Header & nav links staggered entrance
  PROFILE_TRANSITION: 'PROFILE_TRANSITION',       // 4700 - 5400ms: Profile card moves into 3D cylinder depth
  HERO_REVEAL: 'HERO_REVEAL',                     // 5100 - 5800ms: Center camera reticle expands & settles
  PROJECT_REVEAL: 'PROJECT_REVEAL',               // 5400 - 6400ms: Gallery project cards fan out along cylinder
  DECORATION_SETTLEMENT: 'DECORATION_SETTLEMENT', // 6100 - 6800ms: Footer & micro-metadata glide into place
  COMPLETED: 'COMPLETED',                         // 6800ms+: Full interactive mode, physics unrestricted
};

export const PHASE_ORDER = [
  TRANSITION_PHASES.INTRO,
  TRANSITION_PHASES.GREETING_EXIT,
  TRANSITION_PHASES.CARD_FORMATION,
  TRANSITION_PHASES.CARD_FLIP,
  TRANSITION_PHASES.BACKGROUND_TRANSFORM,
  TRANSITION_PHASES.NAVIGATION_REVEAL,
  TRANSITION_PHASES.PROFILE_TRANSITION,
  TRANSITION_PHASES.HERO_REVEAL,
  TRANSITION_PHASES.PROJECT_REVEAL,
  TRANSITION_PHASES.DECORATION_SETTLEMENT,
  TRANSITION_PHASES.COMPLETED,
];

const TIMINGS = [
  { phase: TRANSITION_PHASES.GREETING_EXIT, time: 2200 },
  { phase: TRANSITION_PHASES.CARD_FORMATION, time: 2600 },
  { phase: TRANSITION_PHASES.CARD_FLIP, time: 3100 },
  { phase: TRANSITION_PHASES.BACKGROUND_TRANSFORM, time: 3900 },
  { phase: TRANSITION_PHASES.NAVIGATION_REVEAL, time: 4400 },
  { phase: TRANSITION_PHASES.PROFILE_TRANSITION, time: 4700 },
  { phase: TRANSITION_PHASES.HERO_REVEAL, time: 5100 },
  { phase: TRANSITION_PHASES.PROJECT_REVEAL, time: 5400 },
  { phase: TRANSITION_PHASES.DECORATION_SETTLEMENT, time: 6100 },
  { phase: TRANSITION_PHASES.COMPLETED, time: 6800 },
];

export function useTransitionTimeline() {
  const [phase, setPhase] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return TRANSITION_PHASES.COMPLETED;
    }
    return TRANSITION_PHASES.INTRO;
  });

  const [unfoldProgress, setUnfoldProgress] = useState(0);
  const animFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  // Preload authentic profile photograph
  useEffect(() => {
    const img = new Image();
    img.src = '/img/dev_portrait.jpg';
  }, []);

  useEffect(() => {
    // If reduced motion is requested, immediately complete
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase(TRANSITION_PHASES.COMPLETED);
      setUnfoldProgress(1);
      return;
    }

    startTimeRef.current = performance.now();

    const activeTimers = [];

    // Schedule all discrete state transitions
    TIMINGS.forEach(({ phase: p, time }) => {
      const timer = setTimeout(() => {
        setPhase(p);
      }, time);
      activeTimers.push(timer);
    });

    // Continuous RAF loop for smooth gallery fan-out interpolation (5400ms to 6400ms)
    const updateProgress = () => {
      if (!startTimeRef.current) return;
      const elapsed = performance.now() - startTimeRef.current;
      if (elapsed >= 6400) {
        setUnfoldProgress(1);
        return;
      }
      if (elapsed > 5400) {
        const p = Math.min((elapsed - 5400) / 1000, 1);
        setUnfoldProgress(p);
      } else {
        setUnfoldProgress(0);
      }
      animFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      activeTimers.forEach((t) => clearTimeout(t));
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const phaseIndex = PHASE_ORDER.indexOf(phase);

  const isAtLeast = (targetPhase) => {
    const targetIdx = PHASE_ORDER.indexOf(targetPhase);
    return phaseIndex >= targetIdx;
  };

  return {
    phase,
    phaseIndex,
    isAtLeast,
    isCompleted: phase === TRANSITION_PHASES.COMPLETED,
    flipDeg: isAtLeast(TRANSITION_PHASES.CARD_FLIP) ? 180 : 0,
    unfoldProgress: isAtLeast(TRANSITION_PHASES.COMPLETED) ? 1 : unfoldProgress,
  };
}
