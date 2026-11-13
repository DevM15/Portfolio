import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LargeProjectBrowser:
 * Dominant Architectural Website Inspection Screen (occupies 70-75% width).
 * Features:
 * - High-dimension browser viewport allowing natural scrolling.
 * - Minimal architectural header with address bar, SSL lock, and live/screenshot mode toggle.
 * - Loading indicator with smooth project cross-fade skeleton.
 * - Fallback high-resolution preview if iframe embedding is blocked by CORS/X-Frame-Options.
 * - Direct external link button and source code repository buttons.
 */
export default function LargeProjectBrowser({
  project,
  onPrev = () => {},
  onNext = () => {},
  onClose = () => {},
  currentIndex = 0,
  totalProjects = 12,
}) {
  const [viewMode, setViewMode] = useState(project?.liveUrl ? 'live' : 'screenshot');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full flex flex-col rounded-2xl overflow-hidden border border-[var(--border-primary)] bg-[var(--bg-surface)] shadow-2xl transition-all duration-400 select-none"
    >
      {/* ==================== 1. MINIMAL BROWSER CONTROL BAR ==================== */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-primary)] flex-shrink-0 z-20">
        {/* Left: Window Action Dots */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            title="Eject CD / Return to Collection [Esc]"
            data-cursor="button"
            className="w-3 h-3 rounded-full bg-[var(--accent)] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center text-[8px] text-white font-bold leading-none"
          >
            ×
          </button>
          <span className="w-3 h-3 rounded-full bg-[var(--border-primary)]" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="ml-2 font-mono text-[9px] tracking-wider text-[var(--text-secondary)] uppercase hidden sm:inline font-semibold">
            CD INSPECTION // {project.num}
          </span>
        </div>

        {/* Center: Address Bar */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)] w-60 sm:w-96 md:w-[460px] truncate shadow-inner">
          <span className="text-emerald-500 text-[10px]">🔒</span>
          <span className="truncate text-[var(--text-primary)] font-medium">
            {project.liveUrl || project.githubUrl || `https://devmistry.io/cd/${project.id}`}
          </span>
        </div>

        {/* Right: View Toggle, Visit Live, and Eject */}
        <div className="flex items-center gap-2 font-mono text-[9px]">
          {project.liveUrl && (
            <button
              onClick={() => {
                setViewMode(viewMode === 'live' ? 'screenshot' : 'live');
                setIframeError(false);
              }}
              data-cursor="button"
              className="px-2.5 py-1 rounded-[2px] border border-[var(--border-primary)] hover:border-[var(--accent)] text-[var(--text-primary)] transition-all bg-[var(--bg-surface)] cursor-pointer hidden md:inline"
            >
              {viewMode === 'live' ? 'VIEW SCREENSHOT' : 'VIEW LIVE IFRAME'}
            </button>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="px-2.5 py-1 rounded-[2px] bg-[var(--accent)] text-[#F7F6F2] font-semibold hover:opacity-90 transition-opacity flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>OPEN</span>
              <span>↗</span>
            </a>
          )}

          <button
            onClick={onClose}
            title="Eject CD"
            data-cursor="button"
            className="px-2 py-1 rounded-[2px] border border-[var(--border-primary)] hover:border-[var(--accent)] text-[var(--accent)] font-bold transition-all bg-[var(--bg-surface)] cursor-pointer"
          >
            EJECT ⏏
          </button>
        </div>
      </div>

      {/* ==================== 2. MAIN BROWSER CONTENT CANVAS ==================== */}
      <div className="relative flex-1 w-full bg-[var(--bg-primary)] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          {viewMode === 'live' && project.liveUrl && !iframeError ? (
            <motion.div
              key={`live-${project.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative w-full h-full"
            >
              {/* Iframe Loading Skeleton */}
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-surface)] z-10 gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
                  <span className="font-mono text-xs tracking-wider text-[var(--text-secondary)] uppercase">
                    READING OPTICAL DISC DATA...
                  </span>
                </div>
              )}

              <iframe
                src={project.liveUrl}
                title={project.title}
                onLoad={() => setIframeLoading(false)}
                onError={() => {
                  setIframeError(true);
                  setViewMode('screenshot');
                }}
                className="w-full h-full border-none bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </motion.div>
          ) : (
            /* Screenshot Fallback & High-Res Inspection View */
            <motion.div
              key={`screenshot-${project.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative w-full h-full flex flex-col items-center justify-center p-4 overflow-y-auto no-scrollbar"
            >
              {project.image ? (
                <div className="relative max-w-4xl max-h-full rounded-lg overflow-hidden border border-[var(--border-primary)] shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto max-h-[60vh] object-contain"
                  />
                  <div className="absolute bottom-3 right-3 bg-[var(--bg-primary)]/90 backdrop-blur-md px-3 py-1 border border-[var(--border-primary)] rounded-[2px] font-mono text-[9px] text-[var(--accent)] font-semibold">
                    HIGH-RESOLUTION CAPTURE
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-[var(--border-primary)] rounded-lg max-w-md">
                  <span className="text-3xl mb-3">💿</span>
                  <h4 className="font-display font-bold text-lg text-[var(--text-primary)] uppercase">
                    {project.title}
                  </h4>
                  <p className="font-sans text-xs text-[var(--text-secondary)] mt-2">
                    {project.description}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================== 3. BOTTOM STREAMLINED PROJECT METADATA BAR ==================== */}
      <div className="px-5 py-3 bg-[var(--bg-surface-elevated)] border-t border-[var(--border-primary)] flex-shrink-0 flex items-center justify-between font-mono text-[10px]">
        {/* Project Title, Number, & Category */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-[var(--accent)] text-xs">
            {project.num}
          </span>
          <span className="font-display font-bold text-sm uppercase text-[var(--text-primary)]">
            {project.title}
          </span>
          <span className="text-[var(--border-subtle)] hidden sm:inline">|</span>
          <span className="text-[var(--text-secondary)] uppercase hidden sm:inline">
            {project.category}
          </span>
        </div>

        {/* Action Links & Pagination */}
        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>SOURCE</span>
              <span>↗</span>
            </a>
          )}

          <div className="flex items-center gap-1 text-[var(--text-secondary)]">
            <button
              onClick={onPrev}
              data-cursor="button"
              className="hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              ← PREV
            </button>
            <span className="opacity-50">/</span>
            <span className="text-[var(--text-primary)] font-bold">
              {currentIndex + 1} of {totalProjects}
            </span>
            <span className="opacity-50">/</span>
            <button
              onClick={onNext}
              data-cursor="button"
              className="hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              NEXT →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
