import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DMIdentityCard from '../components/entrance/DMIdentityCard';
import TechText from '../components/TechText/TechText';
import FlexCarousel from '../components/FlexCarousel/FlexCarousel';

/**
 * Curated Exhibition Projects:
 * Replaces the 12 floating cards with an art-directed editorial curation.
 * Features WebGL FlexCarousel from React Bits with liquid glass refraction.
 */
const CAROUSEL_ITEMS = [
  {
    src: 'https://raw.githubusercontent.com/devm15/Kart/main/public/image.png',
    alt: 'Kart Editor Web IDE',
    title: 'Kart Editor',
    subtitle: '01 / AI WEB IDE'
  },
  {
    src: 'https://raw.githubusercontent.com/devm15/coinpulse/main/public/readme/readme-hero.webp',
    alt: 'CoinPulse Analytics Platform',
    title: 'CoinPulse',
    subtitle: '02 / CRYPTO ANALYTICS'
  },
  {
    src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
    alt: 'Travel Planner Dynamic Route Engine',
    title: 'Travel Planner',
    subtitle: '03 / 3D WEBGL GLOBE'
  },
  {
    src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80',
    alt: 'NewsMan Engine AI News Aggregator',
    title: 'NewsMan AI',
    subtitle: '04 / GEMINI AI SCRAPER'
  },
  {
    src: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&w=1000&q=80',
    alt: 'Sew Secure PDF Sharing Runtime',
    title: 'Sew Cloud',
    subtitle: '05 / CLOUD DOCUMENT SYSTEM'
  },
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    alt: 'Autonomous Swarm Fabric',
    title: 'Swarm Fabric',
    subtitle: '06 / AGENTIC NETWORK'
  }
];

export default function HomeSection({
  onOpenSection,
  onNavigateToProjects,
  phaseIndex = 10,
}) {
  const containerRef = useRef(null);

  // Discrete Phase Indicators matching useTransitionTimeline
  const isGreetingPhase = phaseIndex < 1;       // INTRO
  const isGreetingExit = phaseIndex >= 1;       // GREETING_EXIT
  const isCardFormed = phaseIndex >= 2;         // CARD_FORMATION
  const isCardFlipped = phaseIndex >= 3;        // CARD_FLIP (180deg flip)
  // eslint-disable-next-line no-unused-vars
  const isBgTransformed = phaseIndex >= 4;      // BACKGROUND_TRANSFORM
  const isProfileTrans = phaseIndex >= 6;       // PROFILE_TRANSITION
  const isHeroRevealed = phaseIndex >= 7;       // HERO_REVEAL (Intro text glides in)
  const isProjectsRevealed = phaseIndex >= 8;   // PROJECT_REVEAL (Editorial projects reveal)
  const isFullySettled = phaseIndex >= 9;       // DECORATION_SETTLEMENT & COMPLETED

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden outline-none px-4 sm:px-8 md:px-12 text-[var(--text-primary)]"
    >
      {/* ==================== 1. INITIAL ENTRANCE GREETING ==================== */}
      <AnimatePresence>
        {!isGreetingExit && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: isGreetingPhase ? 1 : 0,
              y: isGreetingPhase ? 0 : -16,
            }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute top-[calc(50%+90px)] sm:top-[calc(50%+100px)] md:top-[calc(50%+115px)] left-0 right-0 flex flex-col items-center justify-center pointer-events-none text-center px-4 z-40"
          >
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: 1.0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-[var(--text-primary)] tracking-tight whitespace-normal sm:whitespace-nowrap leading-[1.05] select-none"
            >
              HELLO, I'M DEV<span className="text-[var(--accent)]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 1.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-3 sm:mt-4 text-xs sm:text-base md:text-lg lg:text-xl font-mono font-medium text-[var(--text-secondary)] tracking-[0.16em] sm:tracking-[0.24em] uppercase select-none"
            >
              DESIGNING & BUILDING DIGITAL EXPERIENCES.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== 2. EDITORIAL HERO EXHIBITION STAGE ==================== */}
      <div className="relative w-full max-w-[1420px] h-full flex flex-col justify-center items-center py-4">

        {/* --- MAIN HERO ROW: 3-ZONE BALANCED EDITORIAL COMPOSITION --- */}
        <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">

          {/* ==================== ZONE 1: TYPOGRAPHIC IDENTITY & INTRO (COL 1-4) ==================== */}
          <motion.div
            initial={{ opacity: 0, x: -36, filter: 'blur(4px)' }}
            animate={{
              opacity: isHeroRevealed ? 1 : 0,
              x: isHeroRevealed ? 0 : -36,
              filter: isHeroRevealed ? 'blur(0px)' : 'blur(4px)',
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col justify-center space-y-6 lg:col-span-4 order-2 lg:order-1 ${isHeroRevealed ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
          >
            {/* Fine Header Meta */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase font-medium">
                PROFILE & EXHIBITION / 2026
              </span>
            </div>

            {/* Main Typographic Hierarchy */}
            <div className="space-y-1">
              <span className="font-mono text-xs tracking-wider text-[var(--accent)] uppercase block font-semibold">
                FULL STACK DEVELOPER
              </span>
              <div
                className="w-full h-[60px] sm:h-[72px] xl:h-[84px] relative -ml-1"
                data-cursor="explore"
              >
                <TechText
                  text="DEV MISTRY"
                  fontWeight={800}
                  fontSize={72}
                  letterSpacing={-0.03}
                  align="left"
                  color="var(--text-primary)"
                  accentColor="var(--accent)"
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={14}
                  selection={true}
                  labels={true}
                  draggable={true}
                  clickKick={true}
                  bounce={0.4}
                  sweep={true}
                  speed={0.8}
                  guides={true}
                  intro="metrics"
                  introDuration={1.8}
                />
              </div>
            </div>

            {/* Contemporary Editorial Statement */}
            <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] font-normal leading-relaxed max-w-md">
              Designing and building digital experiences. Specialized in deterministic cloud architecture, high-availability web platforms, and autonomous agentic swarms.
            </p>

            {/* Restrained Metadata Strip */}
            <div className="flex items-center gap-6 pt-1 font-mono text-[11px] text-[var(--text-secondary)] border-t border-[var(--border-primary)] pt-4">
              <div className="flex flex-col">
                <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">BASE LOCATION</span>
                <span className="font-semibold text-[var(--text-primary)] mt-0.5">MUMBAI, INDIA</span>
              </div>
              <div className="w-px h-8 bg-[var(--border-primary)]" />
              <div className="flex flex-col">
                <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">STATUS</span>
                <span className="font-semibold text-[var(--accent)] mt-0.5">OPEN FOR SELECT CONTRACTS</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenSection && onOpenSection('about')}
                data-cursor="button"
                className="group px-5 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#F7F6F2] font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-[2px] shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>ABOUT SPECIFICATION</span>
                <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
              </button>

              <button
                onClick={() => onNavigateToProjects && onNavigateToProjects()}
                data-cursor="archive"
                className="px-4 py-2.5 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:text-[var(--accent)] border border-[var(--border-primary)] hover:border-[var(--accent)] font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-[2px] cursor-pointer"
              >
                VIEW ARCHIVE
              </button>
            </div>
          </motion.div>

          {/* ==================== ZONE 2: CENTRAL PROFILE IDENTITY (COL 5-8) ==================== */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-[260px] sm:w-[285px] md:w-[310px] lg:w-[330px] h-[385px] sm:h-[420px] md:h-[455px] lg:h-[485px] flex items-center justify-center">

              {/* Background ambient framing glow */}
              <div
                className={`absolute -inset-4 bg-gradient-to-b from-[var(--border-subtle)]/40 via-transparent to-[var(--border-subtle)]/20 rounded-lg pointer-events-none transition-opacity duration-700 ${isCardFlipped ? 'opacity-100' : 'opacity-0'
                  }`}
              />

              {/* The Central DM Identity Card (Transitions smoothly in 3D into the hero portrait) */}
              <motion.div
                data-cursor="profile"
                animate={{
                  y: isProfileTrans ? 0 : isGreetingExit ? -8 : 0,
                  scale: isProfileTrans ? 1 : isCardFormed ? 1.02 : 1.0,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-full h-full cursor-pointer z-30"
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

              {/* Editorial Caption Tag underneath Portrait */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHeroRevealed ? 1 : 0,
                  y: isHeroRevealed ? 0 : 10,
                }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-7 flex items-center justify-between w-full px-1 font-mono text-[8px] tracking-wider text-[var(--text-secondary)] uppercase pointer-events-none"
              >
                <span>DEV MISTRY // IDENTITY SPEC</span>
                <span className="text-[var(--accent)] font-semibold">REF: 01</span>
              </motion.div>
            </div>
          </div>

          {/* ==================== ZONE 3: WEBGL FLEX CAROUSEL EXHIBITION (COL 9-12) ==================== */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-3 order-3">

            {/* Section Header for the Exhibition */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{
                opacity: isProjectsRevealed ? 1 : 0,
                y: isProjectsRevealed ? 0 : -12,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between border-b border-[var(--border-primary)] pb-2 font-mono text-[10px] tracking-wider text-[var(--text-secondary)] uppercase"
            >
              <div className="flex items-center gap-2">
                <span className="text-[var(--accent)] font-semibold">SELECTED EXHIBITION</span>
                <span>•</span>
                <span>WORKS</span>
              </div>
              <span className="text-[9px] text-[var(--text-muted)]">
                DRAG / WHEEL TO ROTATE
              </span>
            </motion.div>

            {/* WebGL Flex Carousel Stage */}
            <motion.div
              initial={{ opacity: 0, x: 36, scale: 0.95 }}
              animate={{
                opacity: isProjectsRevealed ? 1 : 0,
                x: isProjectsRevealed ? 0 : 36,
                scale: isProjectsRevealed ? 1 : 0.95,
              }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[360px] sm:h-[390px] md:h-[410px] lg:h-[420px] rounded-[3px] border border-[var(--border-primary)] bg-[var(--bg-surface)] overflow-hidden shadow-sm hover:border-[var(--accent)] transition-all duration-300"
            >
              <FlexCarousel
                items={CAROUSEL_ITEMS}
                preset="liquid"
                intro="rise"
                cardHeight={0.52}
                gap={14}
                radius={4}
                squeeze={0.2}
                focusOnClick={true}
                captions={true}
                autoplay={false}
                onSelect={() => {
                  if (onNavigateToProjects) onNavigateToProjects();
                }}
              />
            </motion.div>

            {/* Quick Navigation Footer */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: isFullySettled ? 1 : 0,
                y: isFullySettled ? 0 : 12,
              }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between p-2.5 bg-[var(--bg-surface)]/70 border border-[var(--border-subtle)] rounded-[2px] font-mono text-[9px] text-[var(--text-secondary)]"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--text-primary)] font-medium">CLICK CENTER CARD TO INSPECT</span>
              </div>
              <button
                onClick={() => onNavigateToProjects && onNavigateToProjects()}
                data-cursor="archive"
                className="hover:text-[var(--accent)] font-semibold transition-colors cursor-pointer"
              >
                VIEW ARCHIVE ↗
              </button>
            </motion.div>

          </div>

        </div>

      </div>
    </div>
  );
}
