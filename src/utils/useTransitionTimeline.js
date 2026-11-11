import { useState, useEffect, useRef } from 'react';

export const TRANSITION_PHASES = {
  INTRO: 'INTRO',                                 // 0 - 3200ms: DM reveal + greeting + comfortable reading pause
  GREETING_EXIT: 'GREETING_EXIT',                 // 3200 - 3600ms: Greeting slides up and fades out (400ms)
  CARD_FORMATION: 'CARD_FORMATION',               // 3600 - 4000ms: Rectangular identity card forms (400ms)
  CARD_FLIP: 'CARD_FLIP',                         // 4000 - 4800ms: 180° Y-axis flip revealing profile photo (800ms)
  BACKGROUND_TRANSFORM: 'BACKGROUND_TRANSFORM',   // 4600 - 5200ms: Canvas grid and horizon lines draw (600ms)
  NAVIGATION_REVEAL: 'NAVIGATION_REVEAL',         // 4900 - 5400ms: Header & nav links staggered entrance (500ms)
  PROFILE_TRANSITION: 'PROFILE_TRANSITION',       // 5100 - 5500ms: Profile card moves into 3D cylinder depth (400ms)
  HERO_REVEAL: 'HERO_REVEAL',                     // 5400 - 5700ms: Center camera reticle expands & settles (300ms)
  PROJECT_REVEAL: 'PROJECT_REVEAL',               // 5600 - 6300ms: Gallery project cards fan out along cylinder (700ms)
  DECORATION_SETTLEMENT: 'DECORATION_SETTLEMENT', // 6100 - 6600ms: Footer & micro-metadata glide into place (500ms)
  COMPLETED: 'COMPLETED',                         // 6600ms+: Full interactive mode, physics unrestricted
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

export const TIMINGS = [
  { phase: TRANSITION_PHASES.GREETING_EXIT, time: 3200 },
  { phase: TRANSITION_PHASES.CARD_FORMATION, time: 3600 },
  { phase: TRANSITION_PHASES.CARD_FLIP, time: 4000 },
  { phase: TRANSITION_PHASES.BACKGROUND_TRANSFORM, time: 4600 },
  { phase: TRANSITION_PHASES.NAVIGATION_REVEAL, time: 4900 },
  { phase: TRANSITION_PHASES.PROFILE_TRANSITION, time: 5100 },
  { phase: TRANSITION_PHASES.HERO_REVEAL, time: 5400 },
  { phase: TRANSITION_PHASES.PROJECT_REVEAL, time: 5600 },
  { phase: TRANSITION_PHASES.DECORATION_SETTLEMENT, time: 6100 },
  { phase: TRANSITION_PHASES.COMPLETED, time: 6600 },
];

export function useTransitionTimeline() {
  const [phase, setPhase] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return TRANSITION_PHASES.COMPLETED;
    }
    return TRANSITION_PHASES.INTRO;
  });

  const timelineStartRef = useRef(performance.now());

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
      return;
    }

    timelineStartRef.current = performance.now();

    const activeTimers = [];

    // Schedule discrete state transitions (ONLY 10 total state changes throughout the intro)
    TIMINGS.forEach(({ phase: p, time }) => {
      const timer = setTimeout(() => {
        setPhase(p);
      }, time);
      activeTimers.push(timer);
    });

    return () => {
      activeTimers.forEach((t) => clearTimeout(t));
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
    timelineStart: timelineStartRef.current,
  };
}
