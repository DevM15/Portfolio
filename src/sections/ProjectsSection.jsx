import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LargeProjectBrowser from '../components/cd/LargeProjectBrowser';
import VinylRecord from '../components/vinyl/VinylRecord';
import SonyCDPPlayer from '../components/cd/SonyCDPPlayer';

export default function ProjectsSection({
  projects = [],
}) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [previewVinyl, setPreviewVinyl] = useState(null);
  const [isTrayOpen, setIsTrayOpen] = useState(true); // Plate starts OUT waiting for a disc

  // Projects list
  const currentProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return projects.find((p) => p.id === selectedProjectId) || projects[0];
  }, [projects, selectedProjectId]);

  const currentIndex = useMemo(() => {
    if (!currentProject) return 0;
    return projects.findIndex((p) => p.id === currentProject.id);
  }, [projects, currentProject]);

  // Select / Mount a Vinyl Record with motorized bottom plate
  const handleSelectRecord = useCallback((project) => {
    setIsPlaying(true);
    // 1. Put selected record onto the already extended plate
    setPreviewVinyl(project);

    // 2. Wait for disc to settle on plate, then plate retracts inside
    setTimeout(() => {
      setIsTrayOpen(false); // Retracts plate in!

      // 3. Open full inspection preview once plate is smoothly inside
      setTimeout(() => {
        setSelectedProjectId(project.id);
      }, 650);
    }, 600);
  }, []);

  // Eject Vinyl back to collection: Reset and keep plate out ready for next selection
  const handleEject = useCallback(() => {
    setSelectedProjectId(null);
    setIsTrayOpen(true); // Plate comes back out ready
  }, []);

  const handleNextRecord = useCallback(() => {
    if (projects.length === 0) return;
    const nextIdx = (currentIndex + 1) % projects.length;
    setSelectedProjectId(projects[nextIdx].id);
    setPreviewVinyl(projects[nextIdx]);
    setIsPlaying(true);
  }, [currentIndex, projects]);

  const handlePrevRecord = useCallback(() => {
    if (projects.length === 0) return;
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProjectId(projects[prevIdx].id);
    setPreviewVinyl(projects[prevIdx]);
    setIsPlaying(true);
  }, [currentIndex, projects]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' && selectedProjectId) {
        handleNextRecord();
      } else if (e.key === 'ArrowLeft' && selectedProjectId) {
        handlePrevRecord();
      } else if (e.key === 'Escape' && selectedProjectId) {
        handleEject();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId, handleNextRecord, handlePrevRecord, handleEject]);

  return (
    <div className="relative w-full h-full flex flex-col justify-center py-2 sm:py-4 px-3 sm:px-6 md:px-10 max-w-[1720px] mx-auto select-none overflow-hidden text-[var(--text-primary)]">
      {/* ==================== MAIN INTERACTIVE STAGE ==================== */}
      <div className="relative flex-1 w-full my-2 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!selectedProjectId ? (
            /* -------------------- STATE 1: VINYL GALLERY (LEFT) + TURNTABLE PLAYER (RIGHT) -------------------- */
            <motion.div
              key="vinyl-gallery-player-layout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center overflow-y-auto lg:overflow-hidden no-scrollbar py-2"
            >
              {/* LEFT / CENTER (COL 1-7): VINYL RECORD GALLERY CARD CONTAINER */}
              <div
                className="lg:col-span-7 h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border-primary)]/80 p-4 sm:p-6 shadow-xl relative"
                style={{
                  background:
                    'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 60%, var(--bg-surface) 100%)',
                  boxShadow:
                    '0 20px 45px -15px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 0 40px rgba(0, 0, 0, 0.02)',
                }}
              >
                {/* Subtle architectural background grid & micro-texture */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    backgroundImage:
                      'radial-gradient(var(--border-primary) 0.75px, transparent 0.75px), linear-gradient(to right, var(--border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)',
                    backgroundSize: '24px 24px, 72px 72px, 72px 72px',
                  }}
                />

                {/* Ambient radial accent spotlight behind gallery */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-15 blur-2xl"
                  style={{
                    background:
                      'radial-gradient(circle at 45% 45%, var(--accent) 0%, transparent 65%)',
                  }}
                />

                {/* Gallery Header Strip */}
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2 font-mono text-[9px] tracking-wider uppercase text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    <span className="font-semibold text-[var(--text-primary)]">VINYL CRATE</span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span>{projects.length} PRESSINGS</span>
                  </div>
                  <span className="font-mono text-[8.5px] text-[var(--accent)] font-semibold uppercase tracking-wider">
                    CLICK RECORD TO MOUNT ↗
                  </span>
                </div>

                {/* Vinyl Record Grid */}
                <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 p-2 items-center justify-items-center my-2">
                  {projects.map((project) => {
                    const isSelectedInDeck = previewVinyl?.id === project.id;
                    return (
                      <motion.div
                        key={project.id}
                        onClick={() => handleSelectRecord(project)}
                        onMouseEnter={() => setPreviewVinyl(project)}
                        data-cursor="pointer"
                        whileHover={{ scale: 1.06, y: -4, rotate: 6 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className={`group relative flex flex-col items-center cursor-pointer p-2.5 rounded-xl border transition-all duration-300 w-full ${isSelectedInDeck
                            ? 'border-[var(--accent)] bg-[var(--bg-surface-elevated)] shadow-md'
                            : 'border-[var(--border-subtle)] hover:border-[var(--border-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)]'
                          }`}
                      >
                        {/* Vinyl Record Body */}
                        <div className="relative transition-transform duration-300 drop-shadow-md group-hover:drop-shadow-2xl">
                          <VinylRecord
                            project={project}
                            size={110}
                            isSpinning={isSelectedInDeck && isPlaying}
                            isSelected={isSelectedInDeck}
                            isHoverable={true}
                          />
                        </div>

                        {/* Title & Metadata */}
                        <div className="w-full text-center mt-2.5 space-y-0.5">
                          <div className="font-mono text-[8px] text-[var(--accent)] font-semibold tracking-wider uppercase">
                            SIDE A · VOL. {project.num}
                          </div>
                          <h4 className="font-display font-bold text-xs uppercase text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate max-w-[120px]">
                            {project.title}
                          </h4>
                          <span className="font-mono text-[7px] text-[var(--text-muted)] truncate block uppercase">
                            {project.category}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer hint */}
                <div className="relative z-10 pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-[8px] text-[var(--text-muted)] uppercase">
                  <span>33 ⅓ RPM STEREO AUDIO</span>
                  <span>CLICK ANY RECORD TO PLAY LIVE SITE</span>
                </div>
              </div>

              {/* RIGHT (COL 8-12): REALISTIC SONY CDP VINTAGE HI-FI DECK */}
              <div className="lg:col-span-5 h-full flex flex-col items-center justify-center p-2">
                <SonyCDPPlayer
                  activeProject={previewVinyl || projects[0]}
                  isPlaying={isPlaying}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  onNext={handleNextRecord}
                  onPrev={handlePrevRecord}
                  isTrayOpen={isTrayOpen}
                  onToggleTray={() => setIsTrayOpen(!isTrayOpen)}
                  compact={false}
                />
              </div>
            </motion.div>
          ) : (
            /* -------------------- STATE 2: ACTIVE PROJECT INSPECTION (EXPANSIVE PREVIEW) -------------------- */
            <motion.div
              key="active-project-inspection"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col lg:flex-row gap-5 items-stretch overflow-hidden py-1"
            >
              {/* ==================== LEFT: VERTICAL VINYL COLLECTION RACK ==================== */}
              <div className="w-full lg:w-[260px] flex-shrink-0 flex flex-col rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-surface)] p-3 overflow-hidden shadow-sm">
                <div className="flex items-center justify-between font-mono text-[8.5px] tracking-wider uppercase text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2 mb-2">
                  <span>RECORD RACK</span>
                  <button
                    onClick={handleEject}
                    data-cursor="button"
                    className="text-[var(--accent)] hover:underline font-semibold cursor-pointer"
                  >
                    ALL RECORDS ⏏
                  </button>
                </div>

                {/* Vertical Vinyl items */}
                <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar pr-1">
                  {projects.map((proj) => {
                    const isActive = proj.id === currentProject?.id;
                    return (
                      <div
                        key={proj.id}
                        onClick={() => handleSelectRecord(proj)}
                        data-cursor="pointer"
                        className={`flex items-center gap-2.5 p-2 rounded-lg border transition-all cursor-pointer ${isActive
                            ? 'border-[var(--accent)] bg-[var(--bg-surface-elevated)] shadow-xs translate-x-1'
                            : 'border-[var(--border-subtle)] hover:border-[var(--border-primary)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] hover:translate-x-1'
                          }`}
                      >
                        {/* Mini Vinyl Thumbnail */}
                        <VinylRecord
                          project={proj}
                          size={42}
                          isSpinning={isActive && isPlaying}
                          isHoverable={false}
                          isSelected={isActive}
                        />

                        {/* Title & Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[7px] font-mono text-[var(--text-secondary)] uppercase">
                            <span className="font-bold text-[var(--accent)]">VOL. {proj.num}</span>
                            <span>{proj.year || '2026'}</span>
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
                          className={`w-4 h-4 rounded-full flex items-center justify-center font-mono text-[8px] ${isActive
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

              {/* ==================== CENTER: DOMINANT WEBSITE PREVIEW ==================== */}
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <LargeProjectBrowser
                  project={currentProject}
                  onPrev={handlePrevRecord}
                  onNext={handleNextRecord}
                  onClose={handleEject}
                  currentIndex={currentIndex}
                  totalProjects={projects.length}
                />
              </div>

              {/* ==================== RIGHT: COMPACT SONY CDP PLAYER DOCK ==================== */}
              <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col items-center justify-center">
                <SonyCDPPlayer
                  activeProject={currentProject}
                  isPlaying={isPlaying}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  onNext={handleNextRecord}
                  onPrev={handlePrevRecord}
                  isTrayOpen={false}
                  onToggleTray={() => { }}
                  compact={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
