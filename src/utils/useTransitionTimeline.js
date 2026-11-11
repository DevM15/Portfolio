import { useState, useEffect, useRef } from 'react';

export const TRANSITION_PHASES = {
  INTRO: 'INTRO',                                 // 0 - 6650ms: Slower, cinematic DM reveal + greeting + 2800ms reading pause
  GREETING_EXIT: 'GREETING_EXIT',                 // 6650 - 7100ms: Greeting slides up and fades out (450ms)
  CARD_FORMATION: 'CARD_FORMATION',               // 7100 - 7600ms: Rectangular identity card forms (500ms)
  CARD_FLIP: 'CARD_FLIP',                         // 7600 - 8800ms: 180° Y-axis flip revealing profile photo (1200ms)
  BACKGROUND_TRANSFORM: 'BACKGROUND_TRANSFORM',   // 8400 - 9200ms: Canvas grid and horizon lines draw (800ms)
  NAVIGATION_REVEAL: 'NAVIGATION_REVEAL',         // 8900 - 9500ms: Header & nav links staggered entrance (600ms)
  PROFILE_TRANSITION: 'PROFILE_TRANSITION',       // 9200 - 9700ms: Profile card moves into 3D cylinder depth (500ms)
  HERO_REVEAL: 'HERO_REVEAL',                     // 9600 - 10100ms: Center camera reticle expands & settles (500ms)
  PROJECT_REVEAL: 'PROJECT_REVEAL',               // 9900 - 10900ms: Gallery project cards fan out along cylinder (1000ms)
  DECORATION_SETTLEMENT: 'DECORATION_SETTLEMENT', // 10600 - 11300ms: Footer & micro-metadata glide into place (700ms)
  COMPLETED: 'COMPLETED',                         // 11300ms+: Full interactive mode, physics unrestricted
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
  { phase: TRANSITION_PHASES.GREETING_EXIT, time: 6650 },
  { phase: TRANSITION_PHASES.CARD_FORMATION, time: 7100 },
  { phase: TRANSITION_PHASES.CARD_FLIP, time: 7600 },
  { phase: TRANSITION_PHASES.BACKGROUND_TRANSFORM, time: 8400 },
  { phase: TRANSITION_PHASES.NAVIGATION_REVEAL, time: 8900 },
  { phase: TRANSITION_PHASES.PROFILE_TRANSITION, time: 9200 },
  { phase: TRANSITION_PHASES.HERO_REVEAL, time: 9600 },
  { phase: TRANSITION_PHASES.PROJECT_REVEAL, time: 9900 },
  { phase: TRANSITION_PHASES.DECORATION_SETTLEMENT, time: 10600 },
  { phase: TRANSITION_PHASES.COMPLETED, time: 11300 },
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

    // Continuous RAF loop for smooth gallery fan-out interpolation (9900ms to 10900ms)
    const updateProgress = () => {
      if (!startTimeRef.current) return;
      const elapsed = performance.now() - startTimeRef.current;
      if (elapsed >= 10900) {
        setUnfoldProgress(1);
        return;
      }
      if (elapsed > 9900) {
        const p = Math.min((elapsed - 9900) / 1000, 1);
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
