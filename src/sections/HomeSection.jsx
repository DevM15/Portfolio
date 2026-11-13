import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import DMIdentityCard from '../components/entrance/DMIdentityCard';
import StrokeText from '../components/StrokeText/StrokeText';

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
    num: '01 / AI IDE',
    title: 'Kart Editor Web IDE',
    role: 'Lead Architect',
    type: 'In-Browser WebContainers & Local LLM',
    year: '2026',
    category: 'AGENTIC AI',
    tech: ['NEXT.JS', 'WEBCONTAINERS', 'MONACO'],
    image: 'https://raw.githubusercontent.com/devm15/Kart/main/public/image.png',
    sectionId: 'projects',
    position: 'left',
  },
  {
    id: '02',
    num: '02 / CRYPTO',
    title: 'CoinPulse Analytics',
    role: 'Full Stack Engineer',
    type: 'Interactive Candlestick Analytics & Metrics',
    year: '2026',
    category: 'WEB ARCHITECTURE',
    tech: ['NEXT.JS', 'TYPESCRIPT', 'LIGHTWEIGHT-CHARTS'],
    image: 'https://raw.githubusercontent.com/devm15/coinpulse/main/public/readme/readme-hero.webp',
    sectionId: 'projects',
    position: 'right',
  },
  {
    id: '03',
    num: '03 / 3D TRAVEL',
    title: 'Travel Planner Dynamic',
    role: 'Creative Developer',
    type: '3D WebGL Globe & Route Engine',
    year: '2026',
    category: 'WEB ARCHITECTURE',
    tech: ['REACT-GLOBE.GL', 'PRISMA', 'GOOGLE MAPS'],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80',
    sectionId: 'projects',
    position: 'bg-left',
  },
  {
    id: '04',
    num: '04 / AI NEWS',
    title: 'NewsMan Engine',
    role: 'Systems Engineer',
    type: 'Google Gemini AI Aggregator & Scraper',
    year: '2025',
    category: 'AGENTIC AI',
    tech: ['GEMINI AI', 'OPENAI', 'EXPRESS'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80',
    sectionId: 'projects',
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

  // Indicators - Hero is immediately ready and interactive inside the workspace card
  const isCardFlipped = true;
  const isProjectsRevealed = true;
  const isFullySettled = true;

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
      {/* ==================== EDITORIAL HERO EXHIBITION STAGE ==================== */}
      <div className="relative w-full max-w-[1420px] h-full flex flex-col justify-center items-center py-4">

        {/* --- MAIN HERO ROW: 3-ZONE BALANCED EDITORIAL COMPOSITION --- */}
        <div className="relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">

          {/* ==================== ZONE 1: TYPOGRAPHIC IDENTITY & INTRO (COL 1-4) ==================== */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center space-y-4 lg:col-span-4 order-2 lg:order-1"
          >
            {/* Main Editorial StrokeText Display: HELLO, I'M DEV. */}
            <div className="w-full relative -ml-1 py-1" data-cursor="pointer">
              <StrokeText
                text="HELLO, I'M DEV."
                fontFamily='"Cormorant Garamond", "Bodoni Moda", Georgia, serif'
                fontSize={56}
                fontWeight={600}
                strokeColor="var(--accent)"
                fillColor="var(--text-primary)"
                strokeWidth={1.2}
                drawDuration={1.3}
                fillDelay={0.15}
                stagger={0.045}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                wipeFrom="left"
                letterSpacing={1.5}
                hoverRedraw={true}
                shadow={false}
              />
            </div>

            {/* Editorial Subtitle */}
            <p className="text-[11px] sm:text-xs font-sans font-medium text-[var(--accent)] tracking-[0.24em] uppercase">
              DESIGNING & BUILDING DIGITAL EXPERIENCES
            </p>

            {/* Crisp Statement - Unwanted Bloat Removed */}
            <p className="font-sans text-sm text-[var(--text-secondary)] font-normal leading-relaxed max-w-sm">
              Specialized in deterministic cloud architecture, high-availability web platforms, and autonomous agentic swarms.
            </p>

            {/* Clean Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onOpenSection && onOpenSection('about')}
                data-cursor="button"
                className="group px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[#F7F6F2] font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-[2px] shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>SPECIFICATION</span>
                <span className="transition-transform group-hover:translate-x-1 duration-200">→</span>
              </button>

              <button
                onClick={() => onNavigateToProjects && onNavigateToProjects()}
                data-cursor="archive"
                className="px-4 py-2 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:text-[var(--accent)] border border-[var(--border-primary)] hover:border-[var(--accent)] font-sans text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-[2px] cursor-pointer"
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
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-full h-full cursor-pointer z-30"
                onClick={() => {
                  if (onOpenSection) onOpenSection('about');
                }}
              >
                <DMIdentityCard
                  flipDeg={180}
                  isFramed={true}
                  isLifted={false}
                  onOpenSection={onOpenSection}
                />
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
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === selectedExhibitionIndex % CURATED_PROJECTS.length
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
