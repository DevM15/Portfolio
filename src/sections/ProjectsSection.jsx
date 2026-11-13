import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VinylRecord from '../components/vinyl/VinylRecord';
import TurntablePlayer from '../components/vinyl/TurntablePlayer';
import ProjectBrowserPreview from '../components/vinyl/ProjectBrowserPreview';

/**
 * ProjectsSection:
 * Immersive Interactive Vinyl Record Player Experience
 *
 * Mode A: Initial State (Record Player Introduction)
 * - Large realistic turntable on the RIGHT.
 * - Interactive vinyl record crate rack on the LEFT.
 * - Category filter pills and discography metadata.
 *
 * Mode B: Project Selection & Live Web Reveal
 * - CENTER / LEFT: Expansive architectural browser preview window.
 * - RIGHT: Compact live turntable dock and quick-switch vinyl rack.
 * - Smooth tonearm and vinyl rotation transitions.
 */
export default function ProjectsSection({
  projects = [],
  activeFilter = 'ALL WORK',
  onFilterChange = () => {},
  filters = [],
}) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    return activeFilter === 'ALL WORK'
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  // Current selected project object
  const currentProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return projects.find((p) => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  // Currently mounted project on the turntable
  const mountedProject = useMemo(() => {
    if (currentProject) return currentProject;
    if (hoveredProjectId) {
      return projects.find((p) => p.id === hoveredProjectId) || projects[0];
    }
    return filteredProjects[0] || projects[0];
  }, [currentProject, hoveredProjectId, filteredProjects, projects]);

  const currentIndex = useMemo(() => {
    if (!currentProject) return 0;
    return filteredProjects.findIndex((p) => p.id === currentProject.id);
  }, [filteredProjects, currentProject]);

  // Select a record: mounts to turntable, starts spinning, and opens preview
  const handleSelectRecord = useCallback((project) => {
    setSelectedProjectId(project.id);
    setIsPlaying(true);
  }, []);

  const handlePrevRecord = useCallback(() => {
    if (filteredProjects.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProjectId(filteredProjects[prevIdx].id);
  }, [currentIndex, filteredProjects]);

  const handleNextRecord = useCallback(() => {
    if (filteredProjects.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredProjects.length;
    setSelectedProjectId(filteredProjects[nextIdx].id);
  }, [currentIndex, filteredProjects]);

  const handleReturnToCrate = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' && selectedProjectId) {
        handleNextRecord();
      } else if (e.key === 'ArrowLeft' && selectedProjectId) {
        handlePrevRecord();
      } else if (e.key === 'Escape' && selectedProjectId) {
        handleReturnToCrate();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId, handleNextRecord, handlePrevRecord, handleReturnToCrate]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 md:px-12 max-w-[1720px] mx-auto select-none overflow-hidden text-[var(--text-primary)]">
      {/* ==================== 1. ARCHITECTURAL TOP HEADER & CATEGORY TABS ==================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[var(--border-primary)] pb-3 gap-3 flex-shrink-0 z-20">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider uppercase text-[var(--text-secondary)]">
          <span className="text-[var(--accent)] font-bold">04 // DISCOGRAPHY</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="text-[var(--text-primary)] font-semibold">
            {selectedProjectId ? 'LIVE INSPECTION DECK' : 'INTERACTIVE VINYL COLLECTION'}
          </span>
          <span className="text-[var(--text-muted)] hidden md:inline">•</span>
          <span className="hidden md:inline text-[var(--text-secondary)]">
            33 ⅓ RPM · 6 RELEASES
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px] uppercase">
          <span className="text-[var(--text-muted)] mr-1 hidden lg:inline">GENRE:</span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              data-cursor="button"
              className={`px-2.5 py-1 transition-all rounded-[2px] cursor-pointer ${
                activeFilter === f
                  ? 'bg-[var(--accent)] text-[#F7F6F2] font-bold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)] border border-[var(--border-subtle)]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ==================== 2. MAIN INTERACTIVE STAGE ==================== */}
      <div className="relative flex-1 w-full my-3 sm:my-4 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          {/* -------------------- STATE A: INITIAL CRATE & TURNTABLE INTRO -------------------- */}
          {!selectedProjectId ? (
            <motion.div
              key="crate-intro-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-y-auto lg:overflow-hidden no-scrollbar py-2"
            >
              {/* LEFT / CENTER (COL 1-7): Editorial Introduction & Physical Vinyl Record Crate */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                {/* Intro Typographic Statement */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-[var(--accent)] uppercase font-semibold">
                    <span>SELECTABLE ARCHITECTURAL RELEASES</span>
                    <span>•</span>
                    <span>2025–2026</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl xl:text-5xl font-display font-black tracking-tight leading-[1.05] text-[var(--text-primary)] uppercase">
                    DROP THE NEEDLE<span className="text-[var(--accent)]">.</span>
                    <br />
                    ENTER THE ARCHITECTURE.
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
                    Every project is pressed onto an individual high-fidelity vinyl record. Select any
                    disc from the collection below to mount it on the turntable and reveal its live
                    system runtime.
                  </p>
                </div>

                {/* Vinyl Record Crate / Tactile Shelf Rack */}
                <div className="relative flex-1 flex flex-col justify-center">
                  <div className="text-[9px] font-mono tracking-wider text-[var(--text-secondary)] uppercase mb-3 flex items-center justify-between border-b border-[var(--border-subtle)] pb-1.5">
                    <span>RECORD CRATE // {filteredProjects.length} AVAILABLE DISCS</span>
                    <span className="text-[var(--accent)] font-semibold">CLICK RECORD TO PLAY →</span>
                  </div>

                  {/* Horizontal Scrollable / Grid Vinyl Records Stack */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 xl:gap-6 py-2">
                    {filteredProjects.map((project) => {
                      const isHovered = hoveredProjectId === project.id;
                      return (
                        <div
                          key={project.id}
                          onMouseEnter={() => setHoveredProjectId(project.id)}
                          onMouseLeave={() => setHoveredProjectId(null)}
                          onClick={() => handleSelectRecord(project)}
                          data-cursor="record"
                          className="group relative flex flex-col items-center p-3 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--accent)] hover:bg-[var(--bg-surface-elevated)] transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer"
                        >
                          {/* Top Card Label: Number & Badge */}
                          <div className="flex items-center justify-between w-full font-mono text-[8px] text-[var(--text-secondary)] uppercase mb-2">
                            <span className="font-bold text-[var(--accent)]">VOL. {project.num}</span>
                            <span className="truncate max-w-[80px]">{project.category}</span>
                          </div>

                          {/* The Physical Vinyl Record (Animated lift & rotate on hover) */}
                          <div className="relative my-2">
                            <VinylRecord
                              project={project}
                              size={135}
                              isSpinning={isHovered}
                              isSelected={false}
                              isHoverable={false}
                              style={{
                                transform: isHovered
                                  ? 'translateY(-12px) scale(1.05)'
                                  : 'translateY(0) scale(1)',
                              }}
                            />
                          </div>

                          {/* Bottom Card Title & CTA */}
                          <div className="w-full text-center mt-1 space-y-0.5">
                            <h4 className="font-display font-bold text-xs uppercase text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                              {project.title}
                            </h4>
                            <div className="font-mono text-[7.5px] text-[var(--text-secondary)] tracking-wider">
                              {project.year} · {project.tags?.[0] || 'FULL STACK'}
                            </div>
                            <div className="text-[7.5px] font-mono text-[var(--accent)] font-semibold opacity-0 group-hover:opacity-100 transition-opacity pt-1">
                              DROP NEEDLE ↗
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT (COL 8-12): The Realistic Master Vinyl Record Player */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-2">
                <TurntablePlayer
                  activeProject={mountedProject}
                  isPlaying={isPlaying}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  compact={false}
                />
                {/* Turntable Calibration Metadata */}
                <div className="mt-4 flex items-center justify-between w-full max-w-[440px] px-2 font-mono text-[8px] tracking-wider text-[var(--text-secondary)] uppercase">
                  <span>SERVO-DRIVE MOTOR // 33 ⅓ RPM</span>
                  <span className="text-[var(--accent)] font-semibold">
                    NOW MOUNTED: {mountedProject?.title || 'NONE'}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* -------------------- STATE B: PROJECT INSPECTION & BROWSER PREVIEW -------------------- */
            <motion.div
              key="project-inspection-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch overflow-hidden py-1"
            >
              {/* LEFT / CENTER (COL 1-8): Large Centered Architectural Project Browser */}
              <div className="lg:col-span-8 flex flex-col h-full overflow-hidden">
                <ProjectBrowserPreview
                  project={currentProject}
                  onPrev={handlePrevRecord}
                  onNext={handleNextRecord}
                  onClose={handleReturnToCrate}
                  currentIndex={currentIndex}
                  totalProjects={filteredProjects.length}
                />
              </div>

              {/* RIGHT (COL 9-12): Compact Turntable Dock & Vinyl Selection Rack */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 overflow-y-auto no-scrollbar pl-1">
                {/* Compact Turntable Player */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <TurntablePlayer
                    activeProject={currentProject}
                    isPlaying={isPlaying}
                    onTogglePlay={() => setIsPlaying(!isPlaying)}
                    compact={true}
                  />
                </div>

                {/* Remaining Vinyl Records Side Rack */}
                <div className="flex-1 flex flex-col rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)] p-3 overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between font-mono text-[8px] tracking-wider uppercase text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2 mb-2">
                    <span>VINYL RACK</span>
                    <button
                      onClick={handleReturnToCrate}
                      data-cursor="button"
                      className="text-[var(--accent)] hover:underline font-semibold cursor-pointer"
                    >
                      ALL DISCS ⏏
                    </button>
                  </div>

                  {/* Vertical Quick-Switch Records List */}
                  <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar pr-1">
                    {filteredProjects.map((proj) => {
                      const isActive = proj.id === currentProject?.id;
                      return (
                        <div
                          key={proj.id}
                          onClick={() => handleSelectRecord(proj)}
                          data-cursor="record"
                          className={`flex items-center gap-3 p-2 rounded-[3px] border transition-all cursor-pointer ${
                            isActive
                              ? 'border-[var(--accent)] bg-[var(--bg-surface-elevated)] shadow-xs'
                              : 'border-[var(--border-subtle)] hover:border-[var(--border-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)]'
                          }`}
                        >
                          {/* Mini Vinyl Disc */}
                          <VinylRecord
                            project={proj}
                            size={44}
                            isSpinning={isActive && isPlaying}
                            isHoverable={false}
                          />

                          {/* Track Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-[7px] font-mono text-[var(--text-secondary)] uppercase">
                              <span className="font-bold text-[var(--accent)]">VOL. {proj.num}</span>
                              <span>{proj.year}</span>
                            </div>
                            <h5 className="font-display font-bold text-xs uppercase text-[var(--text-primary)] truncate">
                              {proj.title}
                            </h5>
                            <p className="font-mono text-[7px] text-[var(--text-secondary)] truncate">
                              {proj.category}
                            </p>
                          </div>

                          {/* Active Indicator Arrow */}
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px] ${
                              isActive
                                ? 'bg-[var(--accent)] text-[#F7F6F2]'
                                : 'text-[var(--text-muted)]'
                            }`}
                          >
                            {isActive ? '▶' : '→'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================== 3. ARCHITECTURAL FOOTER METADATA ==================== */}
      <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-2.5 flex-shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span>VINYL AUDIO DECK</span>
          <span>•</span>
          <span className="text-[var(--accent)] font-semibold">DEV MISTRY // WORKS</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">HOTKEYS: [←] PREV · [→] NEXT · [SPACE] PLAY/PAUSE</span>
          <span>MUMBAI · 2026</span>
        </div>
      </div>
    </div>
  );
}
