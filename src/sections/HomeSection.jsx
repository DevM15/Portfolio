import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DMIdentityCard from '../components/entrance/DMIdentityCard';

/**
 * Curated Exhibition Projects:
 * Replaces the 12 floating cards with an art-directed editorial curation.
 * Features 2 primary prominent exhibition pieces (Left & Right),
 * 2 subtle ambient pieces in the backdrop,
 * and quick-switch tabs to explore all 6 key disciplines.
 */
const CURATED_PROJECTS = [
  {
    id: '01',
    num: '01 / SYSTEM',
    title: 'Arcade System Platform',
    role: 'Lead Architect',
    type: 'Interactive Canvas Runtime & State Fabric',
    year: '2026',
    category: 'WEB ARCHITECTURE',
    tech: ['REACT', 'CANVAS API', 'WEB WORKERS'],
    image: './img/project1.png',
    sectionId: 'projects',
    position: 'left',
  },
  {
    id: '02',
    num: '02 / AGENTIC',
    title: 'Autonomous Swarm Fabric',
    role: 'Systems Engineer',
    type: 'Distributed Reasoning & MCP Protocol Network',
    year: '2026',
    category: 'AGENTIC AI',
    tech: ['LANGGRAPH', 'FASTAPI', 'MCP CLIENT'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    sectionId: 'skills',
    position: 'right',
  },
  {
    id: '03',
    num: '03 / CLOUD',
    title: 'Multi-Region Mesh Cluster',
    role: 'Cloud Architect',
    type: 'Terraform IaC & AWS ECS Fargate Mesh',
    year: '2025',
    category: 'CLOUD / AWS',
    tech: ['AWS ECS', 'TERRAFORM', 'DOCKER'],
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80',
    sectionId: 'skills',
    position: 'bg-left',
  },
  {
    id: '04',
    num: '04 / RUNTIME',
    title: 'PDF Decoder Binary Engine',
    role: 'Core Developer',
    type: 'Client-Side Binary Extraction & Parsing',
    year: '2026',
    category: 'SYSTEM TOOLS',
    tech: ['JAVASCRIPT', 'WEBASSEMBLY', 'BUFFERS'],
    image: './img/project2.png',
    sectionId: 'journey',
    position: 'bg-right',
  },
];

export default function HomeSection({
  onOpenSection,
  onNavigateToProjects,
  phaseIndex = 10,
}) {
  const [selectedExhibitionIndex, setSelectedExhibitionIndex] = useState(0);
  const containerRef = useRef(null);

  // Discrete Phase Indicators matching useTransitionTimeline
  const isGreetingPhase = phaseIndex < 1;       // INTRO
  const isGreetingExit = phaseIndex >= 1;       // GREETING_EXIT
  const isCardFormed = phaseIndex >= 2;         // CARD_FORMATION
  const isCardFlipped = phaseIndex >= 3;        // CARD_FLIP (180deg flip)
  const isBgTransformed = phaseIndex >= 4;      // BACKGROUND_TRANSFORM
  const isProfileTrans = phaseIndex >= 6;       // PROFILE_TRANSITION
  const isHeroRevealed = phaseIndex >= 7;       // HERO_REVEAL (Intro text glides in)
  const isProjectsRevealed = phaseIndex >= 8;   // PROJECT_REVEAL (Editorial projects reveal)
  const isFullySettled = phaseIndex >= 9;       // DECORATION_SETTLEMENT & COMPLETED

  // Featured pair based on selected index
  const leftProject = CURATED_PROJECTS[selectedExhibitionIndex % CURATED_PROJECTS.length];
  const rightProject = CURATED_PROJECTS[(selectedExhibitionIndex + 1) % CURATED_PROJECTS.length];
  const bgLeftProject = CURATED_PROJECTS[(selectedExhibitionIndex + 2) % CURATED_PROJECTS.length];
  const bgRightProject = CURATED_PROJECTS[(selectedExhibitionIndex + 3) % CURATED_PROJECTS.length];

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
            className="absolute top-[calc(50%+130px)] sm:top-[calc(50%+150px)] md:top-[calc(50%+165px)] left-0 right-0 flex flex-col items-center justify-center pointer-events-none text-center px-4 z-40"
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

        {/* Ambient Subtle Geometric Horizon Guides */}
        <div
          className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-[480px] pointer-events-none transition-opacity duration-1000 ${
            isBgTransformed ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute left-0 right-0 top-0 h-px bg-[var(--border-subtle)]" />
          <div className="absolute left-0 right-0 bottom-0 h-px bg-[var(--border-subtle)]" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[var(--border-subtle)]/50 border-dashed" />
        </div>

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
            className={`flex flex-col justify-center space-y-6 lg:col-span-4 order-2 lg:order-1 ${
              isHeroRevealed ? 'pointer-events-auto' : 'pointer-events-none'
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
            <div className="space-y-2">
              <span className="font-mono text-xs tracking-wider text-[var(--accent)] uppercase block font-semibold">
                FULL STACK DEVELOPER
              </span>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.0] uppercase">
                DEV MISTRY
              </h1>
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
            <div className="relative w-[230px] sm:w-[260px] md:w-[280px] aspect-[0.70] flex items-center justify-center">

              {/* Background ambient framing glow */}
              <div
                className={`absolute -inset-4 bg-gradient-to-b from-[var(--border-subtle)]/40 via-transparent to-[var(--border-subtle)]/20 rounded-lg pointer-events-none transition-opacity duration-700 ${
                  isCardFlipped ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* The Central DM Identity Card (Transitions smoothly in 3D into the hero portrait) */}
              <motion.div
                layoutId="dm-central-anchor"
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
                className="absolute -bottom-8 flex items-center justify-between w-full px-1 font-mono text-[9px] tracking-wider text-[var(--text-secondary)] uppercase pointer-events-none"
              >
                <span>DEV MISTRY // PORTRAIT</span>
                <span className="text-[var(--accent)] font-semibold">FIG. 01</span>
              </motion.div>
            </div>
          </div>

          {/* ==================== ZONE 3: SURROUNDING CURATED PROJECT EXHIBITION (COL 9-12) ==================== */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-4 order-3">

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
              <div className="flex items-center gap-1.5">
                {CURATED_PROJECTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedExhibitionIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      i === selectedExhibitionIndex % CURATED_PROJECTS.length
                        ? 'bg-[var(--accent)] scale-125'
                        : 'bg-[var(--border-primary)] hover:bg-[var(--text-secondary)]'
                    }`}
                    title={`View Exhibition Piece 0${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Curated Piece 01 (Prominent Right Card) */}
            <motion.div
              initial={{ opacity: 0, x: 36, scale: 0.95 }}
              animate={{
                opacity: isProjectsRevealed ? 1 : 0,
                x: isProjectsRevealed ? 0 : 36,
                scale: isProjectsRevealed ? 1 : 0.95,
              }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onOpenSection && onOpenSection(rightProject.sectionId)}
              data-cursor="project"
              className="group relative bg-[var(--bg-surface)] border border-[var(--border-primary)] hover:border-[var(--accent)] rounded-[2px] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition-all duration-300 cursor-pointer overflow-hidden flex gap-4 items-center"
            >
              <div className="relative w-28 h-20 sm:w-32 sm:h-22 rounded-[1px] overflow-hidden flex-shrink-0 border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                <img
                  src={rightProject.image}
                  alt={rightProject.title}
                  className="w-full h-full object-cover contrast-[1.03] transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute top-1 left-1 font-mono text-[7px] text-[var(--text-primary)] bg-[var(--bg-primary)] px-1 py-0.2 rounded-[1px] border border-[var(--border-subtle)]">
                  {rightProject.category}
                </div>
              </div>

              <div className="flex flex-col justify-between flex-grow min-w-0 py-0.5">
                <div>
                  <div className="flex items-center justify-between font-mono text-[9px] text-[var(--text-secondary)]">
                    <span>{rightProject.num}</span>
                    <span>{rightProject.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] tracking-tight leading-snug truncate mt-1 transition-colors">
                    {rightProject.title}
                  </h3>
                  <p className="font-sans text-[11px] text-[var(--text-secondary)] line-clamp-1 mt-0.5">
                    {rightProject.type}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-[var(--border-subtle)] font-mono text-[9px]">
                  <div className="flex gap-1.5 text-[var(--text-secondary)] text-[8px]">
                    {rightProject.tech.slice(0, 2).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 bg-[var(--bg-primary)] rounded-[1px] border border-[var(--border-subtle)]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[var(--accent)] font-semibold group-hover:translate-x-1 transition-transform duration-200">
                    OPEN →
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Curated Piece 02 (Secondary Curated Piece) */}
            <motion.div
              initial={{ opacity: 0, x: 36, scale: 0.95 }}
              animate={{
                opacity: isProjectsRevealed ? 1 : 0,
                x: isProjectsRevealed ? 0 : 36,
                scale: isProjectsRevealed ? 1 : 0.95,
              }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onOpenSection && onOpenSection(leftProject.sectionId)}
              data-cursor="project"
              className="group relative bg-[var(--bg-surface)] border border-[var(--border-primary)] hover:border-[var(--accent)] rounded-[2px] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition-all duration-300 cursor-pointer overflow-hidden flex gap-4 items-center"
            >
              <div className="relative w-28 h-20 sm:w-32 sm:h-22 rounded-[1px] overflow-hidden flex-shrink-0 border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
                <img
                  src={leftProject.image}
                  alt={leftProject.title}
                  className="w-full h-full object-cover contrast-[1.03] transition-transform duration-500 group-hover:scale-108"
                />
                <div className="absolute top-1 left-1 font-mono text-[7px] text-[var(--text-primary)] bg-[var(--bg-primary)] px-1 py-0.2 rounded-[1px] border border-[var(--border-subtle)]">
                  {leftProject.category}
                </div>
              </div>

              <div className="flex flex-col justify-between flex-grow min-w-0 py-0.5">
                <div>
                  <div className="flex items-center justify-between font-mono text-[9px] text-[var(--text-secondary)]">
                    <span>{leftProject.num}</span>
                    <span>{leftProject.year}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] tracking-tight leading-snug truncate mt-1 transition-colors">
                    {leftProject.title}
                  </h3>
                  <p className="font-sans text-[11px] text-[var(--text-secondary)] line-clamp-1 mt-0.5">
                    {leftProject.type}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 mt-2 border-t border-[var(--border-subtle)] font-mono text-[9px]">
                  <div className="flex gap-1.5 text-[var(--text-secondary)] text-[8px]">
                    {leftProject.tech.slice(0, 2).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 bg-[var(--bg-primary)] rounded-[1px] border border-[var(--border-subtle)]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[var(--accent)] font-semibold group-hover:translate-x-1 transition-transform duration-200">
                    OPEN →
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Additional Subtle Ambient Thumbnails */}
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
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)]" />
                <span className="text-[var(--text-primary)] font-medium">MORE ARCHIVED WORKS:</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenSection && onOpenSection(bgLeftProject.sectionId)}
                  className="hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  {bgLeftProject.title.split(' ')[0]} ↗
                </button>
                <span>/</span>
                <button
                  onClick={() => onOpenSection && onOpenSection(bgRightProject.sectionId)}
                  className="hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  {bgRightProject.title.split(' ')[0]} ↗
                </button>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </div>
  );
}
