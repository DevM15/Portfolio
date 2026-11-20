import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DMIdentityCard from '../components/entrance/DMIdentityCard';
import TechText from '../components/TechText/TechText';

export default function HomeSection({
  onOpenSection,
  phaseIndex = 10,
}) {
  const [introStep, setIntroStep] = useState('big_dm'); // 'big_dm' -> 'settled_dm_greeting'
  const containerRef = useRef(null);

  // Intro choreographic flow:
  // 1. First show DM in big size in center with slow, elegant drawing animation (0 - 5.4s)
  // 2. Then scale down DM and reveal "Hello, I'm Dev." outline-to-fill animation (5.4s+)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroStep('settled_dm_greeting');
    }, 5400);
    return () => clearTimeout(timer);
  }, []);

  // Discrete Phase Indicators matching useTransitionTimeline
  const isGreetingPhase = phaseIndex < 1;       // INTRO
  const isGreetingExit = phaseIndex >= 1;       // GREETING_EXIT
  const isCardFormed = phaseIndex >= 2;         // CARD_FORMATION
  const isCardFlipped = phaseIndex >= 3;        // CARD_FLIP (180deg flip)
  const isProfileTrans = phaseIndex >= 6;       // PROFILE_TRANSITION
  const isHeroRevealed = phaseIndex >= 7;       // HERO_REVEAL
  const isFullySettled = phaseIndex >= 9;       // DECORATION_SETTLEMENT & COMPLETED

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden outline-none px-4 sm:px-8 md:px-12 text-[var(--text-primary)]"
    >
      {/* ==================== 1. INITIAL ENTRANCE GREETING ==================== */}
      <AnimatePresence>
        {!isGreetingExit && introStep === 'settled_dm_greeting' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: isGreetingPhase ? 1 : 0,
              y: isGreetingPhase ? 0 : 16,
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            exit={{
              opacity: 0,
              y: -20,
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute top-[calc(50%+46px)] sm:top-[calc(50%+54px)] md:top-[calc(50%+60px)] left-0 right-0 flex flex-col items-center justify-center pointer-events-none text-center px-4 z-40 select-none"
          >
            {/* Heading with Caveat Script Outline Border Loading First, then Color Fill */}
            <div className="flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 560 90"
                className="w-[min(88vw,480px)] h-[min(13vw,72px)] overflow-visible"
              >
                <text
                  x="50%"
                  y="68%"
                  textAnchor="middle"
                  fontFamily="'Caveat', cursive"
                  fontWeight="700"
                  fontSize="58"
                  letterSpacing="1px"
                  className="stroke-fill-text"
                >
                  Hello, I'm Dev
                  <tspan className="stroke-fill-dot">.</tspan>
                </text>
              </svg>
            </div>

            {/* Swiss Minimal Architectural Subtitle with Generous Spacing & Smooth Transition */}
            <div className="overflow-hidden mt-2 sm:mt-3">
              <motion.p
                initial={{ y: '120%', opacity: 0 }}
                animate={{ y: '0%', opacity: 0.75 }}
                transition={{
                  duration: 1.2,
                  delay: 1.3,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="font-mono text-[9px] sm:text-[10px] md:text-[11px] text-[#7c877b] tracking-[3.5px] uppercase select-none text-center"
              >
                DESIGNING & BUILDING DIGITAL EXPERIENCES.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== 2. EDITORIAL HERO EXHIBITION STAGE ==================== */}
      <div className="relative w-full max-w-[1440px] h-full flex flex-col justify-center items-center py-4">

        {/* --- MAIN HERO ROW: CENTERED PORTRAIT WITH ONLY THE BIG IDENTITY CARD --- */}
        <div className="relative z-20 flex items-center justify-center w-full min-h-[580px]">

          {/* ==================== ONLY HOVERING CARD: BIG NAME CARD (BOTTOM RIGHT) ==================== */}
          <motion.div
            initial={{ opacity: 0, x: 70, y: 40, scale: 0.88 }}
            animate={{
              opacity: isHeroRevealed ? 1 : 0,
              x: isHeroRevealed ? 0 : 70,
              y: isHeroRevealed ? [0, 8, 0] : 40,
              scale: isHeroRevealed ? 1 : 0.88,
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              scale: { duration: 0.8, delay: 0.2 },
              x: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              y: {
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
              },
            }}
            className="absolute right-4 sm:right-8 md:right-12 lg:right-16 xl:right-24 bottom-6 sm:bottom-12 z-30 pointer-events-auto"
          >
            <div className="w-[300px] sm:w-[360px] md:w-[420px] p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)]/95 backdrop-blur-2xl border border-[var(--border-primary)] shadow-[0_24px_60px_rgba(0,0,0,0.12)] hover:shadow-[0_32px_75px_rgba(0,0,0,0.20)] hover:border-[var(--accent)] transition-all duration-300 flex flex-col justify-center cursor-default overflow-hidden">
              {/* Header: Role and Base */}
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2 mb-2">
                <span className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  FULL STACK DEVELOPER
                </span>
                <span className="text-[var(--accent)] font-semibold">
                  MUMBAI · 19°N
                </span>
              </div>

              {/* Animated Interactive TechText Component for DEV MISTRY */}
              <div className="w-full h-[54px] sm:h-[64px] md:h-[72px] relative flex items-center justify-center -my-1">
                <TechText
                  text="DEV MISTRY"
                  fontFamily='"Cormorant Garamond", "Bodoni Moda", Georgia, serif'
                  fontWeight={700}
                  fontSize={62}
                  letterSpacing={-0.02}
                  align="center"
                  color="var(--text-primary)"
                  accentColor="var(--accent)"
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={15}
                  selection={true}
                  labels={true}
                  draggable={true}
                  bounce={0.4}
                  clickKick={true}
                  guides={false}
                  sweep={true}
                  speed={1}
                  intro="assemble"
                  introDuration={1.8}
                />
              </div>
            </div>
          </motion.div>

          {/* ==================== CENTRAL PROFILE IDENTITY ==================== */}
          <div className="flex flex-col items-center justify-center z-20">
            <div className="relative w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center">

              {/* Background ambient framing glow */}
              <div
                className={`absolute -inset-4 bg-gradient-to-b from-[var(--border-subtle)]/40 via-transparent to-[var(--border-subtle)]/20 rounded-lg pointer-events-none transition-opacity duration-700 ${isCardFlipped ? 'opacity-100' : 'opacity-0'
                  }`}
              />

              {/* The Central DM Identity Card (Transitions smoothly in 3D into the hero portrait) */}
              <motion.div
                data-cursor="profile"
                animate={{
                  y: isProfileTrans
                    ? 0
                    : isGreetingExit
                    ? 0
                    : introStep === 'settled_dm_greeting' && isGreetingPhase
                    ? -42
                    : 0,
                  scale: isProfileTrans
                    ? 1
                    : isCardFormed
                    ? 1.0
                    : introStep === 'big_dm' && isGreetingPhase
                    ? 1.85
                    : 0.95,
                }}
                transition={{
                  duration: isGreetingExit ? 0.8 : introStep === 'settled_dm_greeting' ? 1.3 : 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative z-30 w-full h-full cursor-pointer flex items-center justify-center"
                onClick={() => {
                  if (isFullySettled && onOpenSection) onOpenSection('about');
                }}
              >
                <DMIdentityCard
                  flipDeg={isCardFlipped ? 180 : 0}
                  isFramed={isCardFormed}
                  isLifted={isCardFlipped && !isFullySettled}
                  onOpenSection={isFullySettled ? onOpenSection : null}
                />
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
