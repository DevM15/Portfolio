import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircularGallery from './CircularGallery/CircularGallery';
import HomeSection from '../sections/HomeSection';
import { useTheme } from '../utils/ThemeContext';

/**
 * HorizontalScrollExhibition:
 * Powered by React Bits <CircularGallery /> WebGL 3D Arc Engine.
 *
 * Replaces the buggy 400vh window scroll with a true 3D circular exhibition gallery:
 * - Mouse wheel scrolling & horizontal dragging directly rotate the 3D circular arc.
 * - Zero vertical document scroll — viewport is firmly locked at 100vh.
 * - Clicking or opening any room card enters that architectural section.
 * - Bottom HUD indicator displays active coordinate, room metadata, and one-click entry.
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
  const { isDark } = useTheme();
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | 'direct'

  const textColor = isDark ? '#F7F6F2' : '#252A27';

  // Portfolio Exhibition Sections mapped into 3D circular cards
  const EXHIBITION_SECTIONS = useMemo(() => [
    {
      id: 'hero',
      image: '/img/dev_portrait.jpg',
      text: '01 · EXHIBITION HERO',
      description: 'Dev Mistry — Full Stack Architect, WebGL FlexCarousel, and system specification.',
      category: 'IDENTITY',
      room: 'ROOM 01',
    },
    {
      id: 'about',
      image: '/img/dev_pic.png',
      text: '02 · PROFILE SPEC & DECAY',
      description: 'Profile specification, distributed systems, active research, and WebGL DecayCard showcase.',
      category: 'SPECIFICATION',
      room: 'ROOM 02',
    },
    {
      id: 'skills',
      image: '/img/bg.png',
      text: '03 · 3D LANGUAGE SPIRAL',
      description: 'Interactive 3D compiler & runtime helix, 12 production languages, and 4-domain architecture.',
      category: 'CAPABILITIES',
      room: 'ROOM 03',
    },
    {
      id: 'projects',
      image: '/img/project1.png',
      text: '04 · DIGITAL CD DISCOGRAPHY',
      description: 'Tactile digital CD player, optical releases, and full live website inspection deck.',
      category: 'DISCOGRAPHY',
      room: 'ROOM 04',
    },
    {
      id: 'journey',
      image: '/img/project2.png',
      text: '05 · EVOLUTION TIMELINE',
      description: 'Career progression, engineering contracts, and architectural milestones from 2023 to 2026.',
      category: 'TRAJECTORY',
      room: 'ROOM 05',
    },
    {
      id: 'contact',
      image: '/img/project3.png',
      text: '06 · AGENT LAB & TRANSMISSION',
      description: 'ParticleText interactive typography, agentic reasoning protocols, and direct inquiry terminal.',
      category: 'TRANSMISSION',
      room: 'ROOM 06',
    },
  ], []);

  const activeSection = EXHIBITION_SECTIONS[activeRoomIndex % EXHIBITION_SECTIONS.length] || EXHIBITION_SECTIONS[0];

  const handleCardClick = (item) => {
    if (!item) return;
    if (item.id === 'hero') {
      setViewMode('direct');
    } else if (item.id === 'projects') {
      onNavigateToProjects();
    } else if (item.id === 'contact') {
      onNavigateToContact();
    } else {
      onOpenSection(item.id);
    }
  };

  // If initial entrance greeting timeline is still progressing, show HomeSection entrance
  if (!isCompleted) {
    return (
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <HomeSection
          onOpenSection={onOpenSection}
          onNavigateToProjects={onNavigateToProjects}
          onNavigateToContact={onNavigateToContact}
          transitionPhase={transitionPhase}
          phaseIndex={phaseIndex}
          timelineStart={timelineStart}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[calc(100vh-128px)] overflow-hidden flex flex-col justify-between select-none">
      {/* ==================== 1. TOP CONTROL BAR ==================== */}
      <div className="px-6 md:px-12 pt-3 pb-2 z-30 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-xs font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="font-semibold text-[var(--text-primary)]">
            {viewMode === 'gallery' ? '01 // CIRCULAR EXHIBITION GALLERY' : '01 // DIRECT HERO STAGE'}
          </span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="hidden sm:inline">
            {viewMode === 'gallery'
              ? 'SCROLL MOUSE WHEEL OR DRAG TO ROTATE SECTIONS'
              : 'DIRECT COMPONENT INSPECTION'}
          </span>
        </div>

        {/* View Switcher Toggle */}
        <div className="flex items-center gap-1.5 p-0.5 rounded-[2px] bg-[var(--bg-surface)] border border-[var(--border-primary)]">
          <button
            onClick={() => setViewMode('gallery')}
            data-cursor="button"
            className={`px-2.5 py-1 rounded-[1px] font-mono text-[9px] font-semibold transition-all cursor-pointer ${
              viewMode === 'gallery'
                ? 'bg-[var(--accent)] text-[#F7F6F2] shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            3D CIRCULAR ARC
          </button>
          <button
            onClick={() => setViewMode('direct')}
            data-cursor="button"
            className={`px-2.5 py-1 rounded-[1px] font-mono text-[9px] font-semibold transition-all cursor-pointer ${
              viewMode === 'direct'
                ? 'bg-[var(--accent)] text-[#F7F6F2] shadow-xs'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            HERO WORKSPACE
          </button>
        </div>
      </div>

      {/* ==================== 2. MAIN 3D CIRCULAR GALLERY STAGE ==================== */}
      <div className="relative flex-1 w-full h-full overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          {viewMode === 'gallery' ? (
            <motion.div
              key="circular-gallery-stage"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="relative w-full h-full"
            >
              <CircularGallery
                items={EXHIBITION_SECTIONS}
                bend={2.8}
                textColor={textColor}
                borderRadius={0.04}
                scrollSpeed={2.2}
                scrollEase={0.05}
                itemSize={0.92}
                itemAspect={0.76}
                gap={0.24}
                wave={0.75}
                fadeEdges={0.14}
                shadow={0.3}
                grayscale={false}
                showTitles={true}
                snap={true}
                openOnClick={false}
                onItemClick={handleCardClick}
                onActiveChange={(index) => setActiveRoomIndex(index)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="direct-hero-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <HomeSection
                onOpenSection={onOpenSection}
                onNavigateToProjects={onNavigateToProjects}
                onNavigateToContact={onNavigateToContact}
                transitionPhase={transitionPhase}
                phaseIndex={phaseIndex}
                timelineStart={timelineStart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================== 3. BOTTOM EXHIBITION HUD & NAVIGATION ==================== */}
      <div className="px-6 md:px-12 py-3 z-30 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-xs font-mono text-[10px] text-[var(--text-secondary)]">
        {/* Active Room Title & Spec */}
        <div className="flex items-center gap-3">
          <span className="text-[var(--accent)] font-bold">{activeSection.room}</span>
          <span className="opacity-40">•</span>
          <span className="font-semibold text-[var(--text-primary)] uppercase">{activeSection.text}</span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="hidden sm:inline text-[9px] text-[var(--text-muted)] uppercase">
            {activeSection.category}
          </span>
        </div>

        {/* Room Navigation Indicators */}
        <div className="flex items-center gap-1.5">
          {EXHIBITION_SECTIONS.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveRoomIndex(idx);
                if (viewMode === 'direct' && sec.id !== 'hero') {
                  handleCardClick(sec);
                }
              }}
              data-cursor="button"
              className={`w-6 h-1.5 rounded-full transition-all cursor-pointer ${
                (activeRoomIndex % EXHIBITION_SECTIONS.length) === idx
                  ? 'bg-[var(--accent)] w-10'
                  : 'bg-[var(--border-primary)] hover:bg-[var(--text-secondary)]'
              }`}
              title={sec.text}
            />
          ))}
        </div>

        {/* Open Section Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleCardClick(activeSection)}
            data-cursor="button"
            className="px-3.5 py-1.5 rounded-[2px] bg-[var(--accent)] text-[#F7F6F2] font-mono text-[9px] font-bold tracking-wider uppercase hover:opacity-90 transition-opacity cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <span>ENTER {activeSection.category}</span>
            <span>↗</span>
          </button>
        </div>
      </div>
    </div>
  );
}
