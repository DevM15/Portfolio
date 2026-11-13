import React from 'react';
import { motion } from 'framer-motion';
import DigitalCD from './DigitalCD';

/**
 * DigitalCDPlayer:
 * Modern architectural digital CD player unit.
 * Features:
 * - Minimalist hardware aesthetics with soft brushed metallic borders.
 * - Circular optical motorized tray with spindle chuck.
 * - Glass / smoked acrylic top cover visor with subtle reflection.
 * - Drop zone feedback highlighting when a CD is dragged over it.
 * - Smooth insertion animation and spinning drive mechanism.
 * - Tactile hardware playback buttons: Play/Pause, Next Track, Prev Track, Eject [⏏].
 * - Minimal OLED status display: Track number, time elapsed, sample rate (96kHz / 24-bit).
 */
export default function DigitalCDPlayer({
  loadedProject = null,
  isPlaying = true,
  onTogglePlay = () => {},
  onNext = () => {},
  onPrev = () => {},
  onEject = () => {},
  isDropTarget = false,
  compact = false,
}) {
  const size = compact ? 220 : 340;
  const cdSize = compact ? 130 : 210;

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 flex flex-col items-center justify-between p-4 shadow-xl select-none ${
        isDropTarget
          ? 'border-[var(--accent)] bg-[var(--bg-surface-elevated)] ring-2 ring-[var(--accent)]/50 scale-[1.02]'
          : 'border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--border-subtle)]'
      }`}
      style={{
        width: `${size}px`,
        minHeight: compact ? '290px' : '430px',
      }}
    >
      {/* ==================== 1. PLAYER TOP STATUS OLED BAR ==================== */}
      <div className="w-full flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full transition-colors ${
              loadedProject
                ? isPlaying
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-amber-500'
                : 'bg-[var(--border-primary)]'
            }`}
          />
          <span className="font-semibold text-[var(--text-primary)]">
            {compact ? 'CD-DECK' : 'DM // CD-PRO PLAYER'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[8px]">
          <span className="px-1.5 py-0.5 rounded-[2px] bg-[var(--bg-primary)] border border-[var(--border-subtle)] font-bold text-[var(--accent)]">
            {loadedProject ? (isPlaying ? 'READING' : 'PAUSED') : 'TRAY OPEN'}
          </span>
          {!compact && (
            <span className="hidden sm:inline text-[var(--text-muted)]">
              96kHz · 24-bit
            </span>
          )}
        </div>
      </div>

      {/* ==================== 2. CIRCULAR DRIVE MOTOR CHUCK & DROP ZONE ==================== */}
      <div
        className="relative flex items-center justify-center rounded-full my-auto overflow-hidden transition-all duration-300"
        style={{
          width: `${cdSize + 24}px`,
          height: `${cdSize + 24}px`,
          background: 'radial-gradient(circle at 50% 50%, #151916 0%, #1B211D 60%, #111412 100%)',
          boxShadow: 'inset 0 4px 14px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        {/* Drive optical laser guide rail & lens */}
        <div className="absolute top-4 bottom-4 w-1 bg-white/5 rounded-full pointer-events-none">
          <div
            className={`w-2.5 h-2.5 -left-0.75 rounded-full bg-cyan-400/80 shadow-[0_0_8px_cyan] pointer-events-none transition-all duration-700 ${
              isPlaying ? 'translate-y-12 animate-pulse' : 'translate-y-2'
            }`}
          />
        </div>

        {/* Central Drive Spindle Clamp Hub */}
        <div
          className="absolute z-10 rounded-full border border-white/20 flex items-center justify-center pointer-events-none"
          style={{
            width: '42px',
            height: '42px',
            background: 'radial-gradient(circle at 45% 45%, #4A524C 0%, #202422 100%)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.3)',
          }}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-black/60 border border-white/25 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          </div>
        </div>

        {/* Loaded Digital CD or Empty Tray Drop Target Prompt */}
        {loadedProject ? (
          <motion.div
            initial={{ scale: 0.85, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.85, opacity: 0, rotate: 25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-0"
          >
            <DigitalCD
              project={loadedProject}
              size={cdSize}
              isSpinning={isPlaying}
              isSelected={true}
              isDraggable={false}
              layoutId="loaded-cd-in-player"
            />
          </motion.div>
        ) : (
          <div className="relative flex flex-col items-center justify-center text-center p-4 z-0 pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-12 h-12 rounded-full border-2 border-dashed border-[var(--accent)] flex items-center justify-center mb-2"
            >
              <span className="text-[var(--accent)] text-lg">↓</span>
            </motion.div>
            <span className="font-mono text-[9px] font-bold tracking-wider text-[var(--accent)] uppercase">
              DROP CD HERE
            </span>
            <span className="font-mono text-[7px] text-[var(--text-secondary)] mt-0.5">
              OR CLICK ANY DISC
            </span>
          </div>
        )}

        {/* Smoked Acrylic Glass Sheen (Top Visor reflection) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(255,255,255,0.03) 100%)',
          }}
        />
      </div>

      {/* ==================== 3. HARDWARE TRANSPORT PLAYBACK CONTROLS ==================== */}
      <div className="w-full mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex flex-col gap-2">
        {/* Track Title Metadata */}
        <div className="flex items-center justify-between font-mono text-[9px] text-[var(--text-secondary)]">
          <span className="truncate max-w-[140px] text-[var(--text-primary)] font-bold uppercase">
            {loadedProject ? loadedProject.title : 'NO DISC LOADED'}
          </span>
          <span className="text-[var(--accent)] font-semibold">
            {loadedProject ? `TRACK ${loadedProject.num}` : '--/--'}
          </span>
        </div>

        {/* Tactile Hardware Buttons */}
        <div className="flex items-center justify-between gap-1.5 pt-1">
          <button
            onClick={onPrev}
            disabled={!loadedProject}
            title="Previous CD [←]"
            data-cursor="button"
            className="flex-1 py-1.5 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] text-[var(--text-primary)] disabled:opacity-40 font-mono text-[9px] font-bold transition-all cursor-pointer hover:bg-[var(--bg-surface-elevated)]"
          >
            |◀
          </button>

          <button
            onClick={onTogglePlay}
            disabled={!loadedProject}
            title="Play / Pause [Space]"
            data-cursor="button"
            className={`flex-1 py-1.5 rounded-[3px] font-mono text-[9px] font-bold transition-all cursor-pointer shadow-xs ${
              isPlaying && loadedProject
                ? 'bg-[var(--accent)] text-[#F7F6F2] hover:opacity-90'
                : 'bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[var(--text-primary)] hover:border-[var(--accent)]'
            } disabled:opacity-40`}
          >
            {isPlaying && loadedProject ? '❚❚' : '▶'}
          </button>

          <button
            onClick={onNext}
            disabled={!loadedProject}
            title="Next CD [→]"
            data-cursor="button"
            className="flex-1 py-1.5 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] text-[var(--text-primary)] disabled:opacity-40 font-mono text-[9px] font-bold transition-all cursor-pointer hover:bg-[var(--bg-surface-elevated)]"
          >
            ▶|
          </button>

          <button
            onClick={onEject}
            disabled={!loadedProject}
            title="Eject CD [Esc]"
            data-cursor="button"
            className="px-2.5 py-1.5 rounded-[3px] bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] text-[var(--accent)] disabled:opacity-40 font-mono text-[9px] font-bold transition-all cursor-pointer hover:bg-[var(--bg-surface-elevated)]"
          >
            ⏏
          </button>
        </div>
      </div>
    </div>
  );
}
