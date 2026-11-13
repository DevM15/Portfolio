import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ProjectBrowserPreview:
 * Large centered project inspection interface styled as an architectural browser window.
 * Features:
 * - Refined browser title bar with window controls, responsive URL bar, and view toggle.
 * - Live embedded iframe with loading skeleton and iframe security sandboxing.
 * - High-resolution screenshot mode toggle.
 * - Full specification details: title, tags, description, live link, and GitHub repository.
 * - Previous/Next record controls and "Return to Crate" action.
 */
export default function ProjectBrowserPreview({
  project,
  onPrev = () => {},
  onNext = () => {},
  onClose = () => {},
  currentIndex = 0,
  totalProjects = 6,
}) {
  const [viewMode, setViewMode] = useState(project?.liveUrl ? 'live' : 'screenshot');
  const [iframeLoading, setIframeLoading] = useState(true);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 14 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex flex-col justify-between overflow-hidden"
    >
      {/* ==================== 1. REFINED BROWSER FRAME CONTAINER ==================== */}
      <div
        className="relative flex-1 flex flex-col rounded-xl overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-surface)] shadow-2xl transition-all duration-400"
      >
        {/* ----- BROWSER TOP BAR ----- */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-primary)] flex-shrink-0">
          {/* Left: Window Action Dots */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              title="Return to Record Crate"
              className="w-3 h-3 rounded-full bg-[var(--accent)] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center text-[7px] text-white opacity-90"
            >
              ×
            </button>
            <span className="w-3 h-3 rounded-full bg-[var(--border-primary)]" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
            <span className="ml-2 font-mono text-[9px] tracking-wider text-[var(--text-secondary)] uppercase hidden sm:inline">
              SYS // PREVIEW WINDOW
            </span>
          </div>

          {/* Center: Address Bar */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-[3px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)] w-56 sm:w-80 md:w-96 truncate shadow-inner">
            <span className="text-[var(--accent)] text-[9px]">🔒</span>
            <span className="truncate text-[var(--text-primary)]">
              {project.liveUrl || `https://devmistry.io/projects/${project.id}`}
            </span>
          </div>

          {/* Right: View Mode Toggle (Live Web vs Screenshot) */}
          <div className="flex items-center gap-1.5 font-mono text-[8.5px]">
            {project.liveUrl && (
              <button
                onClick={() => setViewMode(viewMode === 'live' ? 'screenshot' : 'live')}
                data-cursor="button"
                className="px-2.5 py-1 rounded-[2px] border border-[var(--border-primary)] hover:border-[var(--accent)] text-[var(--text-primary)] transition-all bg-[var(--bg-surface)] cursor-pointer"
              >
                {viewMode === 'live' ? 'VIEW SCREENSHOT' : 'VIEW LIVE IFRAME'}
              </button>
            )}
            <button
              onClick={onClose}
              data-cursor="button"
              className="px-2 py-1 rounded-[2px] bg-[var(--accent)] text-[#F7F6F2] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              CRATE ⏏
            </button>
          </div>
        </div>

        {/* ----- BROWSER CONTENT CANVAS ----- */}
        <div className="relative flex-1 w-full bg-[var(--bg-primary)] overflow-hidden flex items-center justify-center">
          {viewMode === 'live' && project.liveUrl ? (
            <div className="relative w-full h-full">
              {/* Iframe Loading Skeleton */}
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-surface)] z-10 gap-3">
                  <div className="w-7 h-7 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
                  <span className="font-mono text-xs tracking-wider text-[var(--text-secondary)] uppercase">
                    LOADING SYSTEM RUNTIME...
                  </span>
                </div>
              )}

              <iframe
                src={project.liveUrl}
                title={project.title}
                onLoad={() => setIframeLoading(false)}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </div>
          ) : (
            /* Screenshot High-Resolution View */
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center p-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain rounded-[2px] shadow-lg filter contrast-[1.03]"
              />
              <div className="absolute bottom-6 left-6 bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-primary)] px-3 py-1.5 rounded-[2px] font-mono text-[9px] text-[var(--text-secondary)] uppercase shadow-md">
                SNAPSHOT MODE · {project.year} ARCHIVE
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ==================== 2. PROJECT ARCHITECTURAL SPECIFICATION FOOTER ==================== */}
      <div className="mt-4 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-surface)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 flex-shrink-0 shadow-sm">
        {/* Left: Project Identity & Description */}
        <div className="flex-1 space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-wider uppercase">
            <span className="text-[var(--accent)] font-bold">VOL. {project.num}</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--text-secondary)]">{project.category}</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[var(--text-secondary)]">{project.year}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-bold text-[var(--text-primary)] tracking-tight">
            {project.title}
          </h3>

          <p className="text-xs text-[var(--text-secondary)] font-sans line-clamp-2 leading-relaxed">
            {project.description || project.type}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {(project.tags || []).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-[1px] bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[8px] font-mono text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Record Navigation & Outbound Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0 w-full md:w-auto">
          {/* Live URL Link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="px-3 py-2 rounded-[2px] bg-[var(--accent)] text-[#F7F6F2] font-mono text-[10px] tracking-wider uppercase font-semibold text-center hover:opacity-90 transition-opacity shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>VISIT LIVE</span>
              <span>↗</span>
            </a>
          )}

          {/* GitHub Source Link */}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="px-3 py-2 rounded-[2px] border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-[var(--text-primary)] font-mono text-[10px] tracking-wider uppercase text-center transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>SOURCE REPO</span>
              <span>↗</span>
            </a>
          )}

          {/* Previous / Next Track Controls */}
          <div className="flex items-center gap-1 bg-[var(--bg-surface-elevated)] p-1 rounded-[2px] border border-[var(--border-primary)]">
            <button
              onClick={onPrev}
              title="Previous Vinyl Record"
              data-cursor="button"
              className="px-2.5 py-1 text-[9px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-[1px] transition-all cursor-pointer"
            >
              ← PREV
            </button>
            <span className="font-mono text-[8.5px] px-1 text-[var(--text-secondary)]">
              {currentIndex + 1} / {totalProjects}
            </span>
            <button
              onClick={onNext}
              title="Next Vinyl Record"
              data-cursor="button"
              className="px-2.5 py-1 text-[9px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-[1px] transition-all cursor-pointer"
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
