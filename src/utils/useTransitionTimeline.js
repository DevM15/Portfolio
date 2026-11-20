import { useState, useEffect, useRef } from 'react';

export const TRANSITION_PHASES = {
  INTRO: 'INTRO',                                 // 0 - 7400ms: Big DM drawing (0-5.4s) + scaled-down DM with "Hello, I'm Dev." outline & fill + subtitle reading pause
  GREETING_EXIT: 'GREETING_EXIT',                 // 7400 - 7900ms: Greeting slides up and smoothly fades out (500ms)
  CARD_FORMATION: 'CARD_FORMATION',               // 7900 - 8400ms: Central identity card forms with refined border and metadata (500ms)
  CARD_FLIP: 'CARD_FLIP',                         // 8400 - 9300ms: 180° Y-axis flip revealing authentic profile photo (900ms)
  BACKGROUND_TRANSFORM: 'BACKGROUND_TRANSFORM',   // 9100 - 9700ms: Spatial canvas grid and horizon lines draw (600ms)
  NAVIGATION_REVEAL: 'NAVIGATION_REVEAL',         // 9400 - 9900ms: Header & nav links staggered entrance (500ms)
  PROFILE_TRANSITION: 'PROFILE_TRANSITION',       // 9600 - 10100ms: Profile card glides into balanced 3-zone hero position (500ms)
  HERO_REVEAL: 'HERO_REVEAL',                     // 9900 - 10500ms: Typographic identity & Dev Mistry title reveal (600ms)
  PROJECT_REVEAL: 'PROJECT_REVEAL',               // 10200 - 10900ms: Curated project cards and horizontal gallery cards reveal (700ms)
  DECORATION_SETTLEMENT: 'DECORATION_SETTLEMENT', // 10700 - 11300ms: Footer & architectural micro-metadata glide into place (600ms)
  COMPLETED: 'COMPLETED',                         // 11300ms+: Full interactive mode, 3D gallery navigation active
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
  { phase: TRANSITION_PHASES.GREETING_EXIT, time: 7400 },
  { phase: TRANSITION_PHASES.CARD_FORMATION, time: 7900 },
  { phase: TRANSITION_PHASES.CARD_FLIP, time: 8400 },
  { phase: TRANSITION_PHASES.BACKGROUND_TRANSFORM, time: 9400 },
  { phase: TRANSITION_PHASES.NAVIGATION_REVEAL, time: 9600 },
  { phase: TRANSITION_PHASES.PROFILE_TRANSITION, time: 9700 },
  { phase: TRANSITION_PHASES.HERO_REVEAL, time: 10000 },
  { phase: TRANSITION_PHASES.PROJECT_REVEAL, time: 10300 },
  { phase: TRANSITION_PHASES.DECORATION_SETTLEMENT, time: 10800 },
  { phase: TRANSITION_PHASES.COMPLETED, time: 11400 },
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
    img.src = '/img/dev_pic.png';
  }, []);

  useEffect(() => {
    // If reduced motion is requested, immediately complete
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase(TRANSITION_PHASES.COMPLETED);
      return;
    }

    timelineStartRef.current = performance.now();

    const activeTimers = TIMINGS.map(({ phase: targetPhase, time }) => {
      return setTimeout(() => {
        setPhase(targetPhase);
      }, time);
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
