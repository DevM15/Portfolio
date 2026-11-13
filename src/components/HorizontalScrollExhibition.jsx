import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import HomeSection from '../sections/HomeSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import JourneySection from '../sections/JourneySection';

/**
 * HorizontalScrollExhibition:
 * Transforms the vertical page scroll into a smooth, architectural horizontal digital exhibition.
 * 
 * Flow:
 * - Room 01: Hero Exhibition (Editorial Intro, DM Identity Card, Curated Featured Works)
 * - Room 02: Architectural Blueprint & System Specifications (Identity, Specs, Disciplines)
 * - Room 03: Technical Map & Capabilities (Web, Backend, Cloud/AWS, Agentic AI)
 * - Room 04: Engineering Trajectory & Timeline (Milestones 2022 -> 2026)
 *
 * Controls:
 * - Mouse wheel / vertical scroll smoothly glides the exhibition left and right.
 * - On desktop, track is pinned (`sticky top-0 h-[calc(100vh-128px)]`).
 * - On mobile/touch screens, gracefully falls back to natural vertical stacking.
 * - Bottom HUD indicator shows current room coordinate, progress bar, and clickable quick-jump dots.
 */
export default function HorizontalScrollExhibition({
  onOpenSection,
  onNavigateToProjects,
  onNavigateToContact,
  transitionPhase,
  phaseIndex,
  timelineStart,
  isCompleted = true,
}) {
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);

  // Detect mobile / narrow viewports for responsive adaptation
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enforce top scroll on mount and when completed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isCompleted) {
      window.scrollTo(0, 0);
      setActiveRoomIndex(0);
    }
  }, [isCompleted]);

  // Framer Motion useScroll hook tracking scrollContainerRef progress
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth out scroll with architectural damping spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Total panels = 4 rooms. Total translation = 0% to -75% (each room is 100% of pinned container)
  // [0, 0.33, 0.66, 1] map to [0%, -25%, -50%, -75%] of the 400% track width
  const xTranslation = useTransform(smoothProgress, [0, 1], ['0%', '-75%']);

  // Parallax / subtle counter-translations for depth
  const room02Parallax = useTransform(smoothProgress, [0.15, 0.45], [50, 0]);
  const room03Parallax = useTransform(smoothProgress, [0.45, 0.75], [50, 0]);
  const room04Parallax = useTransform(smoothProgress, [0.75, 1], [50, 0]);

  // Update active room index for HUD indicator
  useEffect(() => {
    const updateRoom = (latest) => {
      if (latest < 0.22) {
        setActiveRoomIndex(0);
      } else if (latest < 0.52) {
        setActiveRoomIndex(1);
      } else if (latest < 0.82) {
        setActiveRoomIndex(2);
      } else {
        setActiveRoomIndex(3);
      }
    };
    updateRoom(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on('change', updateRoom);
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Programmatic jump to room
  const scrollToRoom = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const totalScrollable = container.scrollHeight - window.innerHeight;
    const targetY = (index / 3) * totalScrollable;
    window.scrollTo({
      top: container.offsetTop + targetY,
      behavior: 'smooth',
    });
  };

  const rooms = [
    { id: 'hero', name: 'ROOM 01 // EXHIBITION HERO', num: '01' },
    { id: 'about', name: 'ROOM 02 // SPECIFICATION & BLUEPRINT', num: '02' },
    { id: 'skills', name: 'ROOM 03 // TECHNICAL MAP & FABRIC', num: '03' },
    { id: 'journey', name: 'ROOM 04 // EVOLUTION TIMELINE', num: '04' },
  ];

  // If mobile, render as natural vertical sections without pin lock
  if (isMobile) {
    return (
      <div className="w-full flex flex-col gap-16 py-8">
        <div className="w-full min-h-[calc(100vh-128px)] flex items-center justify-center">
          <HomeSection
            onOpenSection={onOpenSection}
            onNavigateToProjects={onNavigateToProjects}
            onNavigateToContact={onNavigateToContact}
            transitionPhase={transitionPhase}
            phaseIndex={phaseIndex}
            timelineStart={timelineStart}
          />
        </div>

        <div className="w-full border-t border-[var(--border-primary)] pt-12 px-4">
          <AboutSection onBack={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>

        <div className="w-full border-t border-[var(--border-primary)] pt-12 px-4">
          <SkillsSection onBack={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>

        <div className="w-full border-t border-[var(--border-primary)] pt-12 px-4">
          <JourneySection onBack={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className={`relative w-full bg-transparent ${isCompleted ? 'h-[400vh]' : 'h-[calc(100vh-128px)]'}`}
    >
      {/* Pinned Viewport Stage */}
      <div className="sticky top-0 w-full h-[calc(100vh-128px)] overflow-hidden flex flex-col justify-between">
        {/* Horizontal Sliding Track: 400% width holding 4 distinct 100% width panels */}
        <motion.div
          style={{ x: isCompleted ? xTranslation : '0%' }}
          className="flex h-full w-[400%] will-change-transform"
        >
          {/* ==================== PANEL 01: HERO EXHIBITION ==================== */}
          <section className="relative w-full h-full flex-shrink-0 flex items-center justify-center overflow-hidden" style={{ width: '25%' }}>
            <HomeSection
              onOpenSection={onOpenSection}
              onNavigateToProjects={onNavigateToProjects}
              onNavigateToContact={onNavigateToContact}
              transitionPhase={transitionPhase}
              phaseIndex={phaseIndex}
              timelineStart={timelineStart}
            />

            {/* Room 01 Right Border Transition Guideline */}
            {isCompleted && (
              <>
                <div className="absolute right-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[var(--border-primary)] to-transparent pointer-events-none" />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 font-mono text-[9px] text-[var(--text-secondary)] pointer-events-none select-none">
                  <span className="tracking-widest [writing-mode:vertical-lr] uppercase">SCROLL DOWN TO ENTER EXHIBITION</span>
                  <span className="text-[var(--accent)] animate-pulse">→</span>
                </div>
              </>
            )}
          </section>

          {/* ==================== PANEL 02: ARCHITECTURAL SPECIFICATION ==================== */}
          <section className="relative w-full h-full flex-shrink-0 flex items-center justify-center overflow-hidden px-8 md:px-16" style={{ width: '25%' }}>
            <motion.div
              style={{ x: room02Parallax }}
              className="w-full h-full max-w-[1600px] flex items-center justify-center"
            >
              <AboutSection onBack={() => scrollToRoom(0)} />
            </motion.div>

            {/* Room 02 Right Border Transition Guideline */}
            <div className="absolute right-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[var(--border-primary)] to-transparent pointer-events-none" />
          </section>

          {/* ==================== PANEL 03: TECHNICAL MAP & CAPABILITIES ==================== */}
          <section className="relative w-full h-full flex-shrink-0 flex items-center justify-center overflow-hidden px-8 md:px-16" style={{ width: '25%' }}>
            <motion.div
              style={{ x: room03Parallax }}
              className="w-full h-full max-w-[1600px] flex items-center justify-center"
            >
              <SkillsSection onBack={() => scrollToRoom(0)} />
            </motion.div>

            {/* Room 03 Right Border Transition Guideline */}
            <div className="absolute right-0 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-[var(--border-primary)] to-transparent pointer-events-none" />
          </section>

          {/* ==================== PANEL 04: EVOLUTION TIMELINE & VINYL LAUNCH ==================== */}
          <section className="relative w-full h-full flex-shrink-0 flex items-center justify-center overflow-hidden px-8 md:px-16" style={{ width: '25%' }}>
            <motion.div
              style={{ x: room04Parallax }}
              className="w-full h-full max-w-[1600px] flex flex-col justify-between py-8"
            >
              <JourneySection onBack={() => scrollToRoom(0)} />

              {/* Call-to-action banner transitioning to full Vinyl record player */}
              <div className="mt-4 p-4 rounded-[2px] bg-[var(--bg-surface)]/90 border border-[var(--border-primary)] flex items-center justify-between font-mono text-xs shadow-xs">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
                  <span className="text-[var(--text-primary)] font-semibold">
                    EXPLORE THE COMPLETE ARCHIVE ON THE VINYL RECORD PLAYER
                  </span>
                </div>
                <button
                  onClick={onNavigateToProjects}
                  data-cursor="button"
                  className="px-4 py-1.5 rounded-[2px] bg-[var(--accent)] text-[#F7F6F2] font-semibold tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                >
                  LOAD VINYL TURNTABLE ↗
                </button>
              </div>
            </motion.div>
          </section>
        </motion.div>

        {/* ==================== EXHIBITION NAVIGATION HUD ==================== */}
        {isCompleted && (
          <div className="pointer-events-auto absolute bottom-2 left-8 right-8 z-30 flex items-center justify-between font-mono text-[10px] text-[var(--text-secondary)]">
            {/* Active Room Title */}
            <div className="flex items-center gap-2.5 bg-[var(--bg-surface)]/80 backdrop-blur-sm px-3 py-1 border border-[var(--border-subtle)] rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[var(--text-primary)] font-medium">
                {rooms[activeRoomIndex]?.name}
              </span>
            </div>

            {/* Room Step Indicators */}
            <div className="flex items-center gap-2 bg-[var(--bg-surface)]/80 backdrop-blur-sm px-3 py-1 border border-[var(--border-subtle)] rounded-full">
              {rooms.map((room, idx) => (
                <button
                  key={room.id}
                  onClick={() => scrollToRoom(idx)}
                  data-cursor="button"
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                    activeRoomIndex === idx
                      ? 'bg-[var(--accent)] text-[#F7F6F2] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{room.num}</span>
                  <span className="hidden xl:inline text-[9px]">{room.id.toUpperCase()}</span>
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="hidden sm:flex items-center gap-2.5 bg-[var(--bg-surface)]/80 backdrop-blur-sm px-3 py-1.5 border border-[var(--border-subtle)] rounded-full">
              <span className="text-[9px]">PROGRESS</span>
              <div className="w-24 h-1 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                <motion.div
                  style={{ scaleX: smoothProgress }}
                  className="h-full bg-[var(--accent)] origin-left"
                />
              </div>
              <span className="text-[9px] text-[var(--text-primary)] font-semibold">
                {Math.round((activeRoomIndex / 3) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
