import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import HomeSection from '../sections/HomeSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import JourneySection from '../sections/JourneySection';

/**
 * HorizontalScrollExhibition:
 * 3D Curved Horizontal Scroll Gallery with Interactive Workspace Cards.
 *
 * Each card is a fully interactive, sized architectural room:
 * - Card 01: HERO WORKSPACE (Dev Mistry identity, TechText headline, DM Monogram flip card, WebGL works)
 * - Card 02: ABOUT WORKSPACE (Monolithic profile spec, WebGL DecayCard portrait showcase)
 * - Card 03: SKILLS WORKSPACE (Interactive 3D InfiniteSpiral language helix, domain matrix)
 * - Card 04: JOURNEY WORKSPACE (Evolution milestones & architectural trajectory)
 *
 * Physics & Controls:
 * - Mouse wheel scrolling directly glides the gallery horizontally with spring inertia (0 vertical scroll).
 * - Touch & pointer dragging with velocity toss and automatic card snapping.
 * - 3D circular perspective: inactive cards curve subtly in 3D (bend, scale, opacity, rotateY).
 * - Clicking any neighboring card smoothly glides it into the centered focus.
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
  const containerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef(0);
  const progressTargetRef = useRef(0);
  const snapTimerRef = useRef(null);

  // Smooth damped spring for the horizontal track progress
  const smoothProgress = useSpring(0, {
    stiffness: 140,
    damping: 24,
    mass: 0.8,
  });

  const totalCards = 4;

  const goToCard = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, totalCards - 1));
    progressTargetRef.current = clamped;
    smoothProgress.set(clamped);
    setActiveCardIndex(clamped);
  }, [totalCards, smoothProgress]);

  const WORKSPACE_ROOMS = useMemo(() => [
    {
      id: 'hero',
      num: '01',
      title: 'HERO WORKSPACE',
      category: 'IDENTITY & RUNTIME',
      component: (
        <HomeSection
          onOpenSection={onOpenSection}
          onNavigateToProjects={onNavigateToProjects}
          onNavigateToContact={onNavigateToContact}
        />
      ),
    },
    {
      id: 'about',
      num: '02',
      title: 'PROFILE SPECIFICATION',
      category: 'IDENTITY & DECAY SHADER',
      component: <AboutSection onBack={() => goToCard(0)} />,
    },
    {
      id: 'skills',
      num: '03',
      title: 'DIGITAL TECHNICAL MAP',
      category: '3D COMPILER HELIX & STACK',
      component: <SkillsSection onBack={() => goToCard(0)} />,
    },
    {
      id: 'journey',
      num: '04',
      title: 'EVOLUTION TRAJECTORY',
      category: 'CAREER MILESTONES 2022–2026',
      component: <JourneySection onBack={() => goToCard(0)} />,
    },
  ], [onOpenSection, onNavigateToProjects, onNavigateToContact, goToCard]);

  // Synchronize active card index with spring output
  useEffect(() => {
    const unsub = smoothProgress.on('change', (latest) => {
      const nearest = Math.round(latest);
      setActiveCardIndex(Math.max(0, Math.min(nearest, totalCards - 1)));
    });
    return () => unsub();
  }, [smoothProgress, totalCards]);

  // Handle Mouse Wheel scrolling (converts vertical wheel delta into horizontal card progress)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // If user is scrolling inside an internal list or textarea, don't hijack unless boundary is reached
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;

      e.preventDefault();

      // Sensitivity factor
      const step = (delta / 420);
      const nextTarget = Math.max(0, Math.min(totalCards - 1, progressTargetRef.current + step));
      progressTargetRef.current = nextTarget;
      smoothProgress.set(nextTarget);

      // Snap to nearest card after wheel motion settles
      clearTimeout(snapTimerRef.current);
      snapTimerRef.current = setTimeout(() => {
        const nearest = Math.round(progressTargetRef.current);
        goToCard(nearest);
      }, 160);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      clearTimeout(snapTimerRef.current);
    };
  }, [totalCards, smoothProgress, goToCard]);

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToCard(activeCardIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToCard(activeCardIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIndex, goToCard]);

  // Pointer drag interactions
  const handlePointerDown = (e) => {
    // Only left click drags
    if (e.button !== 0) return;
    // Don't drag if clicking buttons, links, or inputs
    if (e.target.closest('button, a, input, select, textarea, [data-cursor="button"]')) return;

    setIsDragging(true);
    dragStartRef.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current;
    dragStartRef.current = e.clientX;

    // Convert pixel delta to card index progress (card width ~1100px)
    const progressDelta = -deltaX / 900;
    const nextTarget = Math.max(0, Math.min(totalCards - 1, progressTargetRef.current + progressDelta));
    progressTargetRef.current = nextTarget;
    smoothProgress.set(nextTarget);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    // Snap to nearest card
    const nearest = Math.round(progressTargetRef.current);
    goToCard(nearest);
  };

  const activeRoom = WORKSPACE_ROOMS[activeCardIndex] || WORKSPACE_ROOMS[0];

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-[calc(100vh-128px)] overflow-hidden flex flex-col justify-between select-none touch-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ perspective: 1200 }}
    >
      {/* ==================== 1. TOP GALLERY HEADER ==================== */}
      <div className="px-6 md:px-12 pt-3 pb-2 z-30 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/85 backdrop-blur-xs font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="font-semibold text-[var(--text-primary)]">
            {activeRoom.num} {'//'} {activeRoom.title}
          </span>
          <span className="opacity-40">•</span>
          <span className="hidden sm:inline text-[9px] text-[var(--text-muted)]">
            {activeRoom.category}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[9px]">
          <span className="hidden md:inline text-[var(--text-muted)]">
            SCROLL WHEEL OR DRAG TO ROTATE CARDS
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToCard(activeCardIndex - 1);
              }}
              disabled={activeCardIndex === 0}
              data-cursor="button"
              className="px-2 py-0.5 rounded-[1px] bg-[var(--bg-surface)] border border-[var(--border-primary)] hover:border-[var(--accent)] disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
            >
              ← PREV
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToCard(activeCardIndex + 1);
              }}
              disabled={activeCardIndex === totalCards - 1}
              data-cursor="button"
              className="px-2 py-0.5 rounded-[1px] bg-[var(--bg-surface)] border border-[var(--border-primary)] hover:border-[var(--accent)] disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>

      {/* ==================== 2. MAIN 3D CURVED CARDS STAGE ==================== */}
      <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center pointer-events-auto">
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {WORKSPACE_ROOMS.map((room, idx) => {
            return (
              <WorkspaceCard
                key={room.id}
                room={room}
                index={idx}
                smoothProgress={smoothProgress}
                isActive={idx === activeCardIndex}
                onSelect={() => goToCard(idx)}
              />
            );
          })}
        </div>
      </div>

      {/* ==================== 3. BOTTOM GALLERY HUD & JUMP PILLS ==================== */}
      <div className="px-6 md:px-12 py-3 z-30 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]/85 backdrop-blur-xs font-mono text-[10px] text-[var(--text-secondary)]">
        {/* Active Stage Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-bold">ROOM {activeRoom.num} OF 0{totalCards}</span>
          <span className="opacity-40">•</span>
          <span className="font-semibold text-[var(--text-primary)] uppercase">{activeRoom.title}</span>
        </div>

        {/* Clickable Room Jump Dots */}
        <div className="flex items-center gap-2">
          {WORKSPACE_ROOMS.map((room, idx) => (
            <button
              key={room.id}
              onClick={(e) => {
                e.stopPropagation();
                goToCard(idx);
              }}
              data-cursor="button"
              className={`flex items-center gap-1 px-2.5 py-1 rounded-[2px] transition-all cursor-pointer font-mono text-[9px] ${
                idx === activeCardIndex
                  ? 'bg-[var(--accent)] text-[#F7F6F2] font-bold shadow-xs'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)]'
              }`}
            >
              <span>{room.num}</span>
              <span className="hidden sm:inline">{room.id.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* Quick Launch / Projects Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigateToProjects && onNavigateToProjects();
            }}
            data-cursor="button"
            className="px-3 py-1 rounded-[2px] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] border border-[var(--border-primary)] font-mono text-[9px] font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            DISCOGRAPHY DECK ↗
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigateToContact && onNavigateToContact();
            }}
            data-cursor="button"
            className="px-3 py-1 rounded-[2px] bg-[var(--accent)] text-[#F7F6F2] font-mono text-[9px] font-bold tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
          >
            GET IN TOUCH ↗
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * WorkspaceCard:
 * 3D Curved Architectural Container holding each live section component.
 * Sized to fit gracefully inside the gallery card frame with subtle circular perspective.
 */
function WorkspaceCard({ room, index, smoothProgress, isActive, onSelect }) {
  // Transform progress relative to this card's index (offset = 0 when centered)
  const offset = useTransform(smoothProgress, (p) => index - p);

  // 3D curved horizontal position: Card width is ~1140px, spacing ~1200px
  const x = useTransform(offset, (o) => `${o * 105}%`);

  // Circular arc bend: rotate cards around Y axis as they move off-center
  const rotateY = useTransform(offset, (o) => Math.max(-24, Math.min(24, o * 14)));

  // Subtle circular depth translation
  const translateZ = useTransform(offset, (o) => -Math.abs(o) * 120);

  // Card scale: active card is 1.0, neighbor cards shrink slightly for depth
  const scale = useTransform(offset, (o) => {
    const abs = Math.abs(o);
    return Math.max(0.86, 1 - abs * 0.12);
  });

  // Opacity fade for cards that slide further off-screen
  const opacity = useTransform(offset, (o) => {
    const abs = Math.abs(o);
    if (abs < 0.6) return 1;
    if (abs < 1.4) return 0.5 + (1.4 - abs) * 0.5;
    return Math.max(0.1, 0.4 - (abs - 1.4) * 0.3);
  });

  return (
    <motion.div
      onClick={!isActive ? onSelect : undefined}
      style={{
        x,
        rotateY,
        translateZ,
        scale,
        opacity,
        zIndex: isActive ? 20 : Math.round(10 - Math.abs(index)),
        transformStyle: 'preserve-3d',
      }}
      className={`absolute w-[min(94vw,1260px)] h-[min(calc(100vh-165px),640px)] rounded-[4px] border transition-colors duration-300 shadow-xl overflow-hidden will-change-transform ${
        isActive
          ? 'border-[var(--border-primary)] bg-[var(--bg-surface)]/95 shadow-2xl pointer-events-auto'
          : 'border-[var(--border-subtle)] bg-[var(--bg-surface)]/75 cursor-pointer pointer-events-auto'
      }`}
    >
      {/* Top Architectural Spec Trim on Card */}
      <div className="h-7 px-4 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-primary)] flex items-center justify-between font-mono text-[8px] uppercase tracking-wider text-[var(--text-secondary)] select-none">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[var(--accent)] animate-pulse' : 'bg-[var(--text-muted)]'}`} />
          <span className="font-bold text-[var(--text-primary)]">ROOM {room.num} {'//'} {room.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{room.category}</span>
          {!isActive && (
            <span className="text-[var(--accent)] font-semibold hidden sm:inline">CLICK TO FOCUS ↗</span>
          )}
        </div>
      </div>

      {/* Internal Room Content Viewport */}
      <div className="relative w-full h-[calc(100%-28px)] overflow-y-auto no-scrollbar">
        {room.component}
      </div>
    </motion.div>
  );
}
