import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DecayCard from '../DecayCard/DecayCard';

if (typeof window !== 'undefined') {
  const preloadImg = new Image();
  preloadImg.src = '/img/dev_pic.png';
}

/**
 * DMIdentityCard:
 * Multi-Iteration Identity Card System.
 *
 * Provides 5 distinct architectural and editorial design iterations that can be switched live:
 * 
 * 1. "editorial" (Iteration 01 - Magazine / Gallery Specification)
 * 2. "architectural" (Iteration 02 - Technical Blueprint & Engineering Spec)
 * 3. "pass" (Iteration 03 - Contemporary ID Pass / Security Badge)
 * 4. "curated" (Iteration 04 - Swiss Studio Minimalist / Framing Exhibition)
 * 5. "decay" (Iteration 05 - WebGL Decay Shader Specimen)
 */

export const CARD_ITERATIONS = [
  { id: 'editorial', label: '01 · EDITORIAL', name: 'Editorial Exhibition' },
  { id: 'architectural', label: '02 · BLUEPRINT', name: 'Architectural Blueprint' },
  { id: 'pass', label: '03 · ID PASS', name: 'Physical Studio Pass' },
  { id: 'curated', label: '04 · SWISS', name: 'Swiss Minimalist' },
  { id: 'decay', label: '05 · DECAY', name: 'WebGL Decay Shader' },
];

export default function DMIdentityCard({
  flipDeg = 0,
  cardWidth = null,
  cardHeight = null,
  borderRadius = 6,
  isFramed = false,
  isLifted = false,
  onOpenSection = null,
}) {
  const widthStyle = cardWidth ? (typeof cardWidth === 'number' ? `${cardWidth}px` : cardWidth) : '100%';
  const heightStyle = cardHeight ? (typeof cardHeight === 'number' ? `${cardHeight}px` : cardHeight) : '100%';

  const [iteration, setIteration] = useState('editorial');
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardContainerRef = useRef(null);
  const isFlipped = flipDeg >= 90;

  // Track mouse movement over the card for smooth 3D tilt
  const handleMouseMove = useCallback((e) => {
    if (!cardContainerRef.current) return;
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.matchMedia('(hover: none)').matches) return;
    }

    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rawRy = ((x - centerX) / centerX) * 6;
    const rawRx = -((y - centerY) / centerY) * 6;

    setTilt({ rx: rawRx, ry: rawRy });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  }, []);

  return (
    <div
      ref={cardContainerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-full h-full select-none will-change-transform"
      style={{
        width: widthStyle,
        height: heightStyle,
        perspective: 1200,
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${flipDeg}deg) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          borderRadius: isFramed ? `${borderRadius}px` : '0px',
          boxShadow: isFramed
            ? isHovered
              ? '0 30px 70px -15px rgba(0, 0, 0, 0.28), 0 0 0 1px var(--accent)'
              : isLifted
                ? '0 25px 60px -12px rgba(0, 0, 0, 0.22), 0 0 0 1px var(--border-primary)'
                : '0 14px 36px -10px rgba(0, 0, 0, 0.14), 0 0 0 1px var(--border-primary)'
            : 'none',
        }}
      >
        {/* ==================== FRONT FACE: METALLIC DM MONOGRAM ==================== */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden transition-all duration-500"
          style={{
            transform: 'rotateY(0deg) translateZ(1px)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundColor: isFramed ? 'var(--bg-primary)' : 'transparent',
            borderRadius: isFramed ? `${borderRadius}px` : '0px',
            border: isFramed ? '1px solid var(--border-primary)' : '1px solid transparent',
            pointerEvents: isFlipped ? 'none' : 'auto',
          }}
        >
          {isFramed && (
            <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-20 mix-blend-multiply bg-subtle-grain" />
          )}

          <div
            className={`absolute top-3 left-4 right-4 flex items-center justify-between text-[8px] font-mono tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-subtle)] pb-2 transition-opacity duration-500 ${isFramed ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <span className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              DEV MISTRY
            </span>
            <span>EDITION / 2026</span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
            className="relative flex items-center justify-center px-4 py-2 my-auto select-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Subtle Metallic Ambient Halo behind Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.35, 0.2], scale: [0.6, 1.25, 1] }}
              transition={{ duration: 2.4, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 rounded-full bg-[var(--accent)]/15 blur-2xl pointer-events-none"
            />

            {/* Swiss Minimal DM Monogram (Space Grotesk -7px tracking) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.8, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
              className="relative inline-flex items-center justify-center"
            >
              <span
                className="absolute inset-0 font-space font-extrabold text-[65px] sm:text-[75px] md:text-[85px] leading-none tracking-[-7px] text-[var(--border-subtle)] select-none blur-[2px]"
                style={{ transform: 'translate3d(3px, 5px, -8px)' }}
                aria-hidden="true"
              >
                DM
              </span>
              <span
                className="relative block font-space font-extrabold text-[65px] sm:text-[75px] md:text-[85px] leading-none tracking-[-7px] select-none"
                style={{
                  background: 'linear-gradient(130deg, #222a26, #87918a, #222a26)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                  filter: 'drop-shadow(0 10px 18px rgba(0, 0, 0, 0.18))',
                }}
              >
                DM
              </span>
            </motion.div>

            {/* Radiant Specular Light Sheen sweep across the Monogram */}
            <motion.div
              initial={{ x: '-150%', opacity: 0 }}
              animate={{ x: '240%', opacity: [0, 0.85, 0.85, 0] }}
              transition={{ duration: 1.8, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 pointer-events-none mix-blend-screen"
              style={{
                background:
                  'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.9) 50%, transparent 80%)',
                transform: 'skewX(-22deg)',
              }}
            />
          </motion.div>

          <div
            className={`absolute bottom-3 left-4 right-4 flex items-center justify-between text-[7px] font-mono tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-subtle)] pt-2 transition-opacity duration-500 ${isFramed ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <span>IDENTITY FOLIO</span>
            <span className="text-[var(--accent)] font-semibold">01 / PROFILE</span>
          </div>
        </div>

        {/* ==================== BACK FACE: MULTI-ITERATION DESIGN ==================== */}
        <div
          className="absolute inset-0 overflow-hidden bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors duration-400"
          style={{
            transform: 'rotateY(180deg) translateZ(1px)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: `${borderRadius}px`,
            border: isHovered ? '1px solid var(--accent)' : '1px solid var(--border-primary)',
            pointerEvents: isFlipped ? 'auto' : 'none',
          }}
        >
          <AnimatePresence mode="wait">
            {/* -------------------- ITERATION 1: EDITORIAL EXHIBITION -------------------- */}
            {iteration === 'editorial' && (
              <motion.div
                key="iter-editorial"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col justify-between w-full h-full"
              >
                {/* Subtle Background Horizon & Soft Gradient */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 40%, var(--bg-surface-elevated) 0%, var(--bg-surface) 80%)',
                    }}
                  />
                  <div className="absolute inset-0 bg-subtle-grain opacity-[var(--grain-opacity)] mix-blend-multiply" />
                </div>

                {/* Top Minimal Editorial Masthead */}
                <div className="relative z-10 px-4 pt-3 pb-2 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/75 backdrop-blur-xs font-mono text-[8px] uppercase tracking-wider text-[var(--text-secondary)]">
                  <div className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span>FOLIO // 01</span>
                  </div>
                  <span>DEV MISTRY</span>
                  <span className="text-[var(--accent)] font-semibold">MUMBAI · 2026</span>
                </div>

                {/* Centered Transparent Cutout Portrait with Skeleton Fallback */}
                <div className="absolute inset-0 z-20 flex items-end justify-center overflow-hidden pointer-events-none">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <span className="font-serif font-bold text-7xl text-[var(--text-muted)] animate-pulse">
                        DM
                      </span>
                    </div>
                  )}
                  <img
                    src="/img/dev_pic.png"
                    alt="Dev Mistry"
                    loading="eager"
                    decoding="sync"
                    onLoad={() => setImageLoaded(true)}
                    className="h-[84%] w-auto max-w-[84%] object-contain object-bottom transition-all duration-500 ease-out"
                    style={{
                      filter: isHovered
                        ? 'drop-shadow(0 16px 26px rgba(0,0,0,0.28))'
                        : 'drop-shadow(0 10px 18px rgba(0,0,0,0.18))',
                    }}
                  />
                </div>

                {/* Clean Bottom Editorial Metadata Block */}
                <div className="relative z-30 p-3 pt-6 flex items-end justify-between bg-gradient-to-t from-[var(--bg-surface)] via-[var(--bg-surface)]/90 to-transparent">
                  <div className="flex flex-col font-mono tracking-wider">
                    <span className="text-[10px] font-display font-black text-[var(--text-primary)] uppercase leading-none">
                      DEV MISTRY
                    </span>
                    <span className="text-[7px] text-[var(--text-secondary)] uppercase mt-0.5">
                      FULL STACK ARCHITECT
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenSection) onOpenSection('about');
                    }}
                    data-cursor="button"
                    className="px-2.5 py-1 rounded-[1px] border border-[var(--border-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[7.5px] font-mono tracking-wider uppercase transition-all shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>PROFILE SPEC</span>
                    <span className="text-[var(--accent)] font-bold">→</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* -------------------- ITERATION 2: ARCHITECTURAL BLUEPRINT -------------------- */}
            {iteration === 'architectural' && (
              <motion.div
                key="iter-architectural"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col justify-between w-full h-full"
              >
                {/* Technical Blueprint Grid */}
                <div
                  className="absolute inset-0 opacity-[0.4] pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, var(--border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                {/* Corner Precision Markers */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[var(--border-primary)] pointer-events-none" />
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[var(--border-primary)] pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[var(--border-primary)] pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[var(--border-primary)] pointer-events-none" />

                {/* Top Technical Metadata */}
                <div className="relative z-10 px-3.5 pt-2.5 pb-2 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-xs font-mono text-[7.5px] uppercase tracking-wider text-[var(--text-secondary)]">
                  <span className="text-[var(--text-primary)] font-bold">SPEC: 01 // ID</span>
                  <span className="text-[var(--accent)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    CALIBRATED
                  </span>
                  <span>19°N · 72°E</span>
                </div>

                {/* Left Measurement Ticks */}
                <div className="absolute left-2.5 top-12 bottom-14 flex flex-col justify-between items-start z-10 pointer-events-none font-mono text-[6px] text-[var(--text-muted)]">
                  <span>+100</span>
                  <span>+050</span>
                  <span className="text-[var(--accent)]">DATUM</span>
                  <span>-050</span>
                </div>

                {/* Right Reticle */}
                <div className="absolute right-3 top-14 w-6 h-6 rounded-full border border-dashed border-[var(--border-primary)] flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                </div>

                {/* Centered Transparent Cutout Portrait */}
                <div className="absolute inset-0 z-20 flex items-end justify-center overflow-hidden pointer-events-none">
                  <img
                    src="/img/dev_pic.png"
                    alt="Dev Mistry"
                    className="h-[84%] w-auto max-w-[84%] object-contain object-bottom"
                    style={{
                      filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.22))',
                    }}
                  />
                </div>

                {/* Bottom Blueprint Spec Banner */}
                <div className="relative z-30 p-3 pt-5 flex items-end justify-between bg-gradient-to-t from-[var(--bg-surface)] via-[var(--bg-surface)]/90 to-transparent">
                  <div className="font-mono text-[7px] text-[var(--text-secondary)] uppercase">
                    <div className="text-[var(--text-primary)] font-bold text-[8.5px]">DEV MISTRY</div>
                    <div>FIG 01 · CORE ARCHITECTURE</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenSection) onOpenSection('about');
                    }}
                    data-cursor="button"
                    className="px-2 py-0.5 rounded-[1px] border border-[var(--border-primary)] hover:border-[var(--accent)] text-[var(--accent)] font-mono text-[7px] uppercase cursor-pointer"
                  >
                    SPECS →
                  </button>
                </div>
              </motion.div>
            )}

            {/* -------------------- ITERATION 3: CONTEMPORARY ID PASS / STUDIO BADGE -------------------- */}
            {iteration === 'pass' && (
              <motion.div
                key="iter-pass"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col justify-between w-full h-full"
              >
                {/* Top Lanyard Slot Graphic */}
                <div className="absolute inset-x-0 z-20 flex justify-center pointer-events-none top-2">
                  <div className="w-12 h-2 rounded-full bg-[var(--border-primary)] border border-white/20 shadow-inner flex items-center justify-center">
                    <div className="w-8 h-0.5 rounded-full bg-black/40" />
                  </div>
                </div>

                {/* Top Header with Pass Chip & Status */}
                <div className="relative z-10 px-3.5 pt-5 pb-2 flex items-center justify-between border-b border-[var(--border-subtle)] font-mono text-[7px] uppercase tracking-wider text-[var(--text-secondary)]">
                  <div className="flex items-center gap-1.5">
                    {/* Gold Sim Microchip Emblem */}
                    <div className="w-4 h-3 rounded-[1px] bg-amber-400/80 border border-amber-600/60 shadow-2xs grid grid-cols-2 gap-0.5 p-0.5">
                      <div className="border-r border-amber-700/50" />
                      <div className="border-l border-amber-700/50" />
                    </div>
                    <span className="font-bold text-[var(--text-primary)] text-[8px]">DM LABS PASS</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-[1px] bg-emerald-500/15 text-emerald-600 font-bold border border-emerald-500/30">
                    ACCESS: GRANTED
                  </span>
                </div>

                {/* Centered Transparent Cutout Portrait */}
                <div className="absolute inset-0 z-20 flex items-end justify-center overflow-hidden pointer-events-none">
                  <img
                    src="/img/dev_pic.png"
                    alt="Dev Mistry"
                    className="h-[82%] w-auto max-w-[82%] object-contain object-bottom"
                    style={{
                      filter: 'drop-shadow(0 14px 22px rgba(0,0,0,0.24))',
                    }}
                  />
                </div>

                {/* Bottom Pass Barcode & Identity */}
                <div className="relative z-30 p-3 pt-5 flex items-end justify-between bg-gradient-to-t from-[var(--bg-surface)] via-[var(--bg-surface)]/90 to-transparent">
                  <div className="flex flex-col">
                    <span className="font-display font-black text-xs text-[var(--text-primary)] uppercase">
                      DEV MISTRY
                    </span>
                    {/* Barcode Strip */}
                    <div className="flex items-center gap-0.5 mt-1 h-3 opacity-70">
                      {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2].map((w, idx) => (
                        <div key={idx} className="bg-[var(--text-primary)] h-full" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenSection) onOpenSection('about');
                    }}
                    data-cursor="button"
                    className="px-2.5 py-1 rounded-[2px] bg-[var(--accent)] text-[#F7F6F2] font-mono text-[7.5px] font-bold tracking-wider uppercase shadow-xs cursor-pointer"
                  >
                    INSPECT ↗
                  </button>
                </div>
              </motion.div>
            )}

            {/* -------------------- ITERATION 4: SWISS STUDIO MINIMALIST -------------------- */}
            {iteration === 'curated' && (
              <motion.div
                key="iter-curated"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col justify-between w-full h-full"
              >
                {/* Swiss Top Monolithic Block */}
                <div className="relative z-10 p-3.5 border-b border-[var(--border-primary)] flex items-start justify-between">
                  <div>
                    <div className="text-[20px] font-display font-black leading-none text-[var(--text-primary)] uppercase tracking-tight">
                      DEV.
                    </div>
                    <div className="text-[7.5px] font-mono text-[var(--accent)] font-bold tracking-widest uppercase mt-0.5">
                      MISTRY // 2026
                    </div>
                  </div>
                  <div className="text-right font-mono text-[7px] text-[var(--text-secondary)] uppercase">
                    <div>DISCIPLINE</div>
                    <div className="text-[var(--text-primary)] font-bold">SYSTEM ARCH</div>
                  </div>
                </div>

                {/* Centered Transparent Cutout Portrait */}
                <div className="absolute inset-0 z-20 flex items-end justify-center overflow-hidden pointer-events-none">
                  <img
                    src="/img/dev_pic.png"
                    alt="Dev Mistry"
                    className="h-[84%] w-auto max-w-[84%] object-contain object-bottom"
                    style={{
                      filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.22))',
                    }}
                  />
                </div>

                {/* Swiss Bottom Horizontal Band */}
                <div className="relative z-30 p-3 pt-5 flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/95">
                  <span className="font-mono text-[7px] text-[var(--text-secondary)] uppercase tracking-wider">
                    MUMBAI · EXP 04 YRS
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenSection) onOpenSection('about');
                    }}
                    data-cursor="button"
                    className="px-2 py-1 rounded-[1px] bg-[var(--text-primary)] text-[var(--bg-primary)] font-mono text-[7px] font-bold tracking-wider uppercase hover:bg-[var(--accent)] hover:text-[#F7F6F2] transition-colors cursor-pointer"
                  >
                    VIEW ARCHIVE →
                  </button>
                </div>
              </motion.div>
            )}

            {/* -------------------- ITERATION 5: WEBGL DECAY SHADER SPECIMEN -------------------- */}
            {iteration === 'decay' && (
              <motion.div
                key="iter-decay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[var(--bg-surface)]"
              >
                {/* Top Shader Tag */}
                <div className="relative z-20 px-3.5 pt-2.5 pb-2 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 backdrop-blur-xs font-mono text-[7.5px] uppercase tracking-wider text-[var(--text-secondary)]">
                  <div className="flex items-center gap-1.5 font-bold text-[var(--text-primary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                    <span>DECAY SHADER // 05</span>
                  </div>
                  <span className="text-[var(--accent)] font-semibold">MOVE CURSOR</span>
                </div>

                {/* Central Decay Card Showcase */}
                <div className="relative z-10 flex items-center justify-center flex-1 w-full p-2 overflow-hidden">
                  <DecayCard
                    image="/img/dev_pic.png"
                    width={260}
                    height={340}
                    intensity={0.5}
                    sensitivity={0.5}
                    hoverDecay={0.08}
                    recovery={0.6}
                    idle={0.3}
                    grain={0.25}
                    detail={5}
                    pattern={4}
                    flow={0.3}
                    chroma={0.15}
                    travel={30}
                    tilt={8}
                    scope="card"
                    radius={2}
                  >
                    <div className="font-mono text-[7px] uppercase tracking-wider bg-black/60 backdrop-blur-md p-2 rounded-[2px] border border-white/20">
                      <div className="flex items-center justify-between text-[var(--accent)] font-bold text-[7.5px] mb-0.5">
                        <span>DEV MISTRY</span>
                        <span>05 / DECAY</span>
                      </div>
                      <div className="text-white/80 text-[6.5px]">INTERACTIVE SIMPLEX SHADER</div>
                    </div>
                  </DecayCard>
                </div>

                {/* Bottom Bar */}
                <div className="relative z-20 p-2.5 flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 font-mono text-[7px] text-[var(--text-secondary)] uppercase">
                  <span>GLSL TURBULENCE</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenSection) onOpenSection('about');
                    }}
                    data-cursor="button"
                    className="px-2 py-0.5 rounded-[1px] bg-[var(--accent)] text-[#F7F6F2] font-bold cursor-pointer"
                  >
                    OPEN ABOUT →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ==================== LIVE ITERATION SWITCHER CONTROLS ==================== */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 rounded-full bg-[var(--bg-surface)]/90 backdrop-blur-md border border-[var(--border-primary)] shadow-xs z-30 whitespace-nowrap"
        >
          {CARD_ITERATIONS.map((iter) => (
            <button
              key={iter.id}
              onClick={(e) => {
                e.stopPropagation();
                setIteration(iter.id);
              }}
              data-cursor="button"
              className={`px-2 py-0.5 rounded-full font-mono text-[8px] tracking-wider uppercase transition-all cursor-pointer ${iteration === iter.id
                  ? 'bg-[var(--accent)] text-[#F7F6F2] font-bold shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
            >
              {iter.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
