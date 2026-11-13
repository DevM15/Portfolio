import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DigitalCD from '../components/cd/DigitalCD';
import DigitalCDPlayer from '../components/cd/DigitalCDPlayer';
import LargeProjectBrowser from '../components/cd/LargeProjectBrowser';

/**
 * ProjectsSection:
 * Completely Redesigned Interactive Digital CD Player Experience
 *
 * Mode 1: Initial CD Collection & Player Stage
 * - LEFT / CENTER: Minimal, elegant CD collection grid with realistic CD covers and hover lift.
 * - RIGHT: Prominent Modern Digital CD Player drop target.
 * - Interaction: Drag any CD directly into the player OR click any CD to load it.
 *
 * Mode 2: Active Project Layout (After CD is loaded)
 * - LEFT: Compact vertical CD rack showing all remaining projects.
 * - CENTER (70-75% width): Large dominant Website Preview with browser-like frame, live iframe / high-res fallback.
 * - RIGHT: Compact Digital CD Player with spinning disc animation and transport controls.
 * - Seamless Transition: Selecting another CD causes the current CD to exit smoothly while the new CD glides from the left into the player.
 */
export default function ProjectsSection({
  projects = [],
  activeFilter = 'ALL WORK',
  onFilterChange = () => {},
  filters = [],
}) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDraggingCD, setIsDraggingCD] = useState(false);
  const [isDropTargetActive, setIsDropTargetActive] = useState(false);
  const playerZoneRef = useRef(null);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    return activeFilter === 'ALL WORK'
      ? projects
      : projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  // Current loaded project
  const currentProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return projects.find((p) => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  const currentIndex = useMemo(() => {
    if (!currentProject) return 0;
    return filteredProjects.findIndex((p) => p.id === currentProject.id);
  }, [filteredProjects, currentProject]);

  // Select / Mount a CD
  const handleSelectCD = useCallback((project) => {
    setSelectedProjectId(project.id);
    setIsPlaying(true);
    setIsDropTargetActive(false);
  }, []);

  // Eject CD back to collection
  const handleEject = useCallback(() => {
    setSelectedProjectId(null);
    setIsPlaying(false);
  }, []);

  const handleNextCD = useCallback(() => {
    if (filteredProjects.length === 0) return;
    const nextIdx = (currentIndex + 1) % filteredProjects.length;
    setSelectedProjectId(filteredProjects[nextIdx].id);
    setIsPlaying(true);
  }, [currentIndex, filteredProjects]);

  const handlePrevCD = useCallback(() => {
    if (filteredProjects.length === 0) return;
    const prevIdx = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    setSelectedProjectId(filteredProjects[prevIdx].id);
    setIsPlaying(true);
  }, [currentIndex, filteredProjects]);

  // Drag-and-drop end detection: check if dropped in player zone
  const handleDragEnd = useCallback(
    (event, info, project) => {
      setIsDraggingCD(false);
      setIsDropTargetActive(false);

      if (playerZoneRef.current) {
        const rect = playerZoneRef.current.getBoundingClientRect();
        const dropX = event.clientX;
        const dropY = event.clientY;

        if (
          dropX >= rect.left &&
          dropX <= rect.right &&
          dropY >= rect.top &&
          dropY <= rect.bottom
        ) {
          handleSelectCD(project);
        }
      }
    },
    [handleSelectCD]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' && selectedProjectId) {
        handleNextCD();
      } else if (e.key === 'ArrowLeft' && selectedProjectId) {
        handlePrevCD();
      } else if (e.key === 'Escape' && selectedProjectId) {
        handleEject();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId, handleNextCD, handlePrevCD, handleEject]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between py-5 sm:py-7 px-4 sm:px-8 md:px-12 max-w-[1720px] mx-auto select-none overflow-hidden text-[var(--text-primary)]">
      {/* ==================== 1. TOP ARCHITECTURAL HEADER & CATEGORIES ==================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[var(--border-primary)] pb-3 gap-3 flex-shrink-0 z-20">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-wider uppercase text-[var(--text-secondary)]">
          <span className="text-[var(--accent)] font-bold">02 // DIGITAL CD PLAYER</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="text-[var(--text-primary)] font-semibold">
            {selectedProjectId ? 'ACTIVE INSPECTION DECK' : 'OPTICAL DISC COLLECTION'}
          </span>
          <span className="text-[var(--text-muted)] hidden md:inline">•</span>
          <span className="hidden md:inline text-[var(--text-secondary)]">
            {filteredProjects.length} AVAILABLE RELEASES
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px] uppercase">
          <span className="text-[var(--text-muted)] mr-1 hidden lg:inline">FILTER:</span>
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
          {!selectedProjectId ? (
            /* -------------------- STATE 1: INITIAL CD COLLECTION + PLAYER -------------------- */
            <motion.div
              key="initial-cd-collection"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-y-auto lg:overflow-hidden no-scrollbar py-2"
            >
              {/* LEFT / CENTER (COL 1-8): Clean CD Collection Grid */}
              <div className="lg:col-span-8 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
                  <div className="flex items-center gap-2 font-mono text-[9px] tracking-wider text-[var(--text-secondary)] uppercase">
                    <span className="text-[var(--accent)] font-bold">DRAG & DROP</span>
                    <span>ANY CD INTO PLAYER</span>
                    <span>•</span>
                    <span>OR CLICK DIRECTLY</span>
                  </div>
                  <span className="font-mono text-[9px] text-[var(--text-muted)]">
                    TOTAL: {filteredProjects.length} DISCS
                  </span>
                </div>

                {/* Grid of Compact Discs */}
                <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 p-1">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      onClick={() => handleSelectCD(project)}
                      data-cursor="drag"
                      className="group relative flex flex-col items-center p-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--accent)] hover:bg-[var(--bg-surface-elevated)] transition-all duration-300 shadow-sm hover:shadow-xl cursor-pointer"
                    >
                      {/* CD Number & Category */}
                      <div className="flex items-center justify-between w-full font-mono text-[8px] text-[var(--text-secondary)] uppercase mb-1">
                        <span className="font-bold text-[var(--accent)]">CD {project.num}</span>
                        <span className="truncate max-w-[80px]">{project.category}</span>
                      </div>

                      {/* Draggable Compact Disc with subtle hover lift */}
                      <div className="relative my-2">
                        <DigitalCD
                          project={project}
                          size={115}
                          isSpinning={false}
                          isSelected={false}
                          isDraggable={true}
                          onDragStart={() => setIsDraggingCD(true)}
                          onDragEnd={(e, info) => handleDragEnd(e, info, project)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectCD(project);
                          }}
                        />
                      </div>

                      {/* Project Name */}
                      <div className="w-full text-center mt-1 space-y-0.5">
                        <h4 className="font-display font-bold text-xs uppercase text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                          {project.title}
                        </h4>
                        <div className="font-mono text-[7.5px] text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                          LOAD DISC ↗
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RIGHT (COL 9-12): The Digital CD Player Drop Target */}
              <div
                ref={playerZoneRef}
                onMouseEnter={() => isDraggingCD && setIsDropTargetActive(true)}
                onMouseLeave={() => setIsDropTargetActive(false)}
                className="lg:col-span-4 flex flex-col items-center justify-center p-2"
              >
                <DigitalCDPlayer
                  loadedProject={null}
                  isPlaying={false}
                  isDropTarget={isDropTargetActive}
                  compact={false}
                />
              </div>
            </motion.div>
          ) : (
            /* -------------------- STATE 2: ACTIVE PROJECT LAYOUT (LARGE PREVIEW) -------------------- */
            <motion.div
              key="active-project-inspection"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col lg:flex-row gap-5 items-stretch overflow-hidden py-1"
            >
              {/* ==================== LEFT: VERTICAL CD COLLECTION RACK (approx 16%) ==================== */}
              <div className="w-full lg:w-[260px] flex-shrink-0 flex flex-col rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-surface)] p-3 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between font-mono text-[8.5px] tracking-wider uppercase text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2 mb-2">
                  <span>DISC RACK</span>
                  <button
                    onClick={handleEject}
                    data-cursor="button"
                    className="text-[var(--accent)] hover:underline font-semibold cursor-pointer"
                  >
                    ALL CDS ⏏
                  </button>
                </div>

                {/* Vertical CD items */}
                <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar pr-1">
                  {filteredProjects.map((proj) => {
                    const isActive = proj.id === currentProject?.id;
                    return (
                      <div
                        key={proj.id}
                        onClick={() => handleSelectCD(proj)}
                        data-cursor="drag"
                        className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all cursor-pointer ${
                          isActive
                            ? 'border-[var(--accent)] bg-[var(--bg-surface-elevated)] shadow-xs translate-x-1'
                            : 'border-[var(--border-subtle)] hover:border-[var(--border-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] hover:translate-x-1'
                        }`}
                      >
                        {/* Mini CD Thumbnail */}
                        <DigitalCD
                          project={proj}
                          size={40}
                          isSpinning={isActive && isPlaying}
                          isDraggable={false}
                          isSelected={isActive}
                        />

                        {/* Title & Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[7px] font-mono text-[var(--text-secondary)] uppercase">
                            <span className="font-bold text-[var(--accent)]">CD {proj.num}</span>
                            <span>{proj.year}</span>
                          </div>
                          <h5 className="font-display font-bold text-xs uppercase text-[var(--text-primary)] truncate">
                            {proj.title}
                          </h5>
                          <p className="font-mono text-[7px] text-[var(--text-secondary)] truncate">
                            {proj.category}
                          </p>
                        </div>

                        {/* Active Arrow */}
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[8px] ${
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

              {/* ==================== CENTER: DOMINANT WEBSITE PREVIEW (approx 70-75%) ==================== */}
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <LargeProjectBrowser
                  project={currentProject}
                  onPrev={handlePrevCD}
                  onNext={handleNextCD}
                  onClose={handleEject}
                  currentIndex={currentIndex}
                  totalProjects={filteredProjects.length}
                />
              </div>

              {/* ==================== RIGHT: COMPACT DIGITAL CD PLAYER (approx 14%) ==================== */}
              <div className="w-full lg:w-[240px] flex-shrink-0 flex flex-col items-center justify-between">
                <DigitalCDPlayer
                  loadedProject={currentProject}
                  isPlaying={isPlaying}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  onNext={handleNextCD}
                  onPrev={handlePrevCD}
                  onEject={handleEject}
                  compact={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================== 3. ARCHITECTURAL FOOTER METADATA ==================== */}
      <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-primary)] pt-2.5 flex-shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span>DIGITAL CD AUDIO SYSTEM</span>
          <span>•</span>
          <span className="text-[var(--accent)] font-semibold">DEV MISTRY // WORKS</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">HOTKEYS: [←] PREV · [→] NEXT · [SPACE] PLAY/PAUSE · [ESC] EJECT</span>
          <span>MUMBAI · 2026</span>
        </div>
      </div>
    </div>
  );
}
