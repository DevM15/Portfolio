import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * DMIdentityCard:
 * Premium Architectural Interactive Identity Card
 *
 * Front Face (0deg):
 * - Standalone metallic DM monogram floating on warm ivory/charcoal canvas.
 * - Architectural frame forms around it before flipping.
 *
 * Back Face (180deg):
 * - Upgraded Architectural Identity Card.
 * - Foreground subject: Dev Mistry's authentic transparent portrait cutout (object-fit: contain).
 * - Layered architectural background with fine construction grid, ambient spotlight, and corner brackets.
 * - Surrounding technical metadata:
 *   - Top: 01 / PROFILE, live pulsing terracotta status, DM // 2026.
 *   - Left: Architectural measurement ticks, vertical identity specimen, coordinates.
 *   - Right: Rotating circular target reticle, technical metadata badges.
 *   - Bottom: DEV MISTRY // PORTRAIT, FIG. 01, and enhanced ABOUT DEV button.
 * - Interactive 3D mouse tilt with smooth tracking and hover state animations.
 * - Seamless adaptation to Light (#F7F6F2) and Dark (#151916) themes via CSS variables.
 */
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

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardContainerRef = useRef(null);
  const isFlipped = flipDeg >= 90;

  // Track mouse movement over the card for smooth 3D tilt
  const handleMouseMove = useCallback((e) => {
    if (!cardContainerRef.current) return;
    // Disable 3D tilt on touch or reduced motion
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.matchMedia('(hover: none)').matches) return;
    }

    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle restrained tilt angles (max +/- 7 degrees)
    const rawRy = ((x - centerX) / centerX) * 7;
    const rawRx = -((y - centerY) / centerY) * 7;

    setTilt({ rx: rawRx, ry: rawRy });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  // Adjust tilt coordinates based on 180deg flip state
  const effectiveTiltX = isFlipped ? -tilt.rx : tilt.rx;
  const effectiveTiltY = isFlipped ? -tilt.ry : tilt.ry;

  return (
    <div
      ref={cardContainerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative select-none flex items-center justify-center w-full h-full group/card"
      style={{
        width: widthStyle,
        height: heightStyle,
        perspective: 1400,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Rotating Card Container */}
      <div
        className="relative w-full h-full transition-shadow duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${flipDeg + effectiveTiltY}deg) rotateX(${effectiveTiltX}deg) translateZ(${
            isLifted || isHovered ? 24 : 0
          }px)`,
          transition: isHovered
            ? 'transform 0.15s ease-out, box-shadow 0.4s ease'
            : 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
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
            transform: 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundColor: isFramed ? 'var(--bg-primary)' : 'transparent',
            borderRadius: isFramed ? `${borderRadius}px` : '0px',
            border: isFramed ? '1px solid var(--border-primary)' : '1px solid transparent',
            visibility: flipDeg >= 90 ? 'hidden' : 'visible',
            pointerEvents: flipDeg >= 90 ? 'none' : 'auto',
          }}
        >
          {/* Subtle Warm Paper Texture Grain Overlay (visible when framed) */}
          {isFramed && (
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply transition-opacity duration-500 bg-subtle-grain" />
          )}

          {/* Micro Top Header on Identity Card */}
          <div
            className={`absolute top-3 left-4 right-4 flex items-center justify-between text-[8px] font-mono tracking-wider text-[var(--text-secondary)] uppercase border-b border-[var(--border-subtle)] pb-2 transition-opacity duration-500 ${
              isFramed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              DEV MISTRY
            </span>
            <span>EDITION / 2026</span>
          </div>

          {/* Centered Metallic DM Monogram with Brand Identity Reveal & Light Sheen Sweep */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-center justify-center my-auto overflow-hidden px-4 py-2"
          >
            {/* D Letter */}
            <div className="relative inline-block">
              <span
                className="absolute inset-0 font-display font-black text-7xl sm:text-8xl leading-none text-[#C8C4B7]/40 select-none blur-[2px]"
                style={{ transform: 'translate3d(3px, 6px, 0px)' }}
                aria-hidden="true"
              >
                D
              </span>
              <span
                className="relative block font-display font-black text-7xl sm:text-8xl leading-none tracking-tight select-none"
                style={{
                  background:
                    'linear-gradient(135deg, #1C1E1D 0%, #353A37 38%, #8E9691 52%, #262927 68%, #0F1110 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 14px 20px rgba(0,0,0,0.18))',
                }}
              >
                D
              </span>
            </div>

            {/* M Letter */}
            <div className="relative inline-block -ml-2 sm:-ml-3">
              <span
                className="absolute inset-0 font-display font-black text-7xl sm:text-8xl leading-none text-[#C8C4B7]/40 select-none blur-[2px]"
                style={{ transform: 'translate3d(3px, 6px, 0px)' }}
                aria-hidden="true"
              >
                M
              </span>
              <span
                className="relative block font-display font-black text-7xl sm:text-8xl leading-none tracking-tight select-none"
                style={{
                  background:
                    'linear-gradient(135deg, #1C1E1D 0%, #353A37 34%, #9BA39E 48%, #4A514D 60%, #151817 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 14px 20px rgba(0,0,0,0.18))',
                }}
              >
                M
              </span>
            </div>

            {/* Subtle Metallic Light Sheen Reflection Sweep */}
            <motion.div
              initial={{ x: '-120%', opacity: 0 }}
              animate={{ x: '180%', opacity: [0, 0.65, 0.65, 0] }}
              transition={{
                duration: 1.2,
                delay: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                background:
                  'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.85) 50%, transparent 80%)',
                transform: 'skewX(-20deg)',
              }}
            />
          </motion.div>

          {/* Micro Bottom Footer on Identity Card */}
          <div
            className={`absolute bottom-3 left-4 right-4 flex items-center justify-between text-[7px] font-mono tracking-wider text-[var(--text-secondary)] uppercase border-t border-[var(--border-subtle)] pt-2 transition-opacity duration-500 ${
              isFramed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span>IDENTITY FOLIO</span>
            <span className="text-[var(--accent)] font-semibold">01 / PROFILE</span>
          </div>
        </div>

        {/* ==================== BACK FACE: UPGRADED ARCHITECTURAL IDENTITY CARD ==================== */}
        <div
          className="absolute inset-0 overflow-hidden bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors duration-400"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: `${borderRadius}px`,
            border: isHovered ? '1px solid var(--accent)' : '1px solid var(--border-primary)',
            visibility: flipDeg >= 90 ? 'visible' : 'hidden',
          }}
        >
          {/* ----- LAYER 1: ARCHITECTURAL CARD BACKGROUND & GRID ----- */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Subtle Technical Grid Lines */}
            <div
              className="absolute inset-0 opacity-[0.35] transition-opacity duration-500"
              style={{
                backgroundImage:
                  'linear-gradient(to right, var(--border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                backgroundPosition: 'center center',
              }}
            />

            {/* Ambient Radial Spotlight (Accentuates Portrait Silhouette) */}
            <div
              className="absolute inset-0 opacity-80 pointer-events-none transition-all duration-700"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 45%, var(--bg-surface-elevated) 0%, var(--bg-surface) 72%)',
              }}
            />

            {/* Fine Corner Calibration Brackets */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[var(--border-primary)]" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[var(--border-primary)]" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[var(--border-primary)]" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[var(--border-primary)]" />

            {/* Paper Grain Overlay */}
            <div className="absolute inset-0 bg-subtle-grain opacity-[var(--grain-opacity)] mix-blend-multiply pointer-events-none" />
          </div>

          {/* ----- LAYER 2: SURROUNDING DECORATIVE ARCHITECTURAL ELEMENTS ----- */}

          {/* TOP SECTION: Header Bar */}
          <div className="absolute top-0 inset-x-0 px-3.5 pt-3 pb-2 flex items-center justify-between border-b border-[var(--border-subtle)] z-10 bg-[var(--bg-surface)]/70 backdrop-blur-[2px]">
            <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-wider uppercase">
              <span className="font-semibold text-[var(--text-primary)]">01 / PROFILE</span>
            </div>

            {/* Terracotta Live Status Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
              </span>
              <span className="font-mono text-[7px] tracking-wider text-[var(--accent)] font-semibold uppercase">
                VERIFIED
              </span>
            </div>

            <div className="font-mono text-[8px] tracking-wider text-[var(--text-secondary)] uppercase">
              DM // 2026
            </div>
          </div>

          {/* LEFT FLANK: Architectural Scale, Ticks & Coordinates */}
          <div className="absolute left-2.5 top-14 bottom-16 flex flex-col justify-between items-start z-10 pointer-events-none">
            {/* Ruler Ticks */}
            <div className="flex flex-col gap-2.5 py-1">
              {[
                { label: '01', width: 'w-3.5' },
                { label: '', width: 'w-2' },
                { label: '02', width: 'w-3' },
                { label: '', width: 'w-2' },
                { label: '03', width: 'w-3.5' },
              ].map((tick, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className={`h-px bg-[var(--border-primary)] transition-all duration-300 ${tick.width} ${
                      isHovered ? 'bg-[var(--accent)]' : ''
                    }`}
                  />
                  {tick.label && (
                    <span className="font-mono text-[6px] text-[var(--text-muted)] tracking-tighter">
                      {tick.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Vertical Identity Marking */}
            <div
              className="font-mono text-[7px] text-[var(--text-muted)] tracking-[0.2em] uppercase select-none transition-colors duration-300"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              DEV MISTRY // SPEC.01
            </div>

            {/* Geographic Coordinate Stamp */}
            <div className="font-mono text-[6.5px] text-[var(--text-secondary)] tracking-wider">
              19°N · 72°E
            </div>
          </div>

          {/* RIGHT FLANK: Rotating Technical Reticle & Metadata Badges */}
          <div className="absolute right-2.5 top-14 bottom-16 flex flex-col justify-between items-end z-10 pointer-events-none">
            {/* Minimal Circular Technical Graphic */}
            <div
              className="relative w-8 h-8 rounded-full border border-[var(--border-primary)] flex items-center justify-center transition-transform duration-700 ease-out"
              style={{
                transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            >
              <div className="w-4 h-4 rounded-full border border-[var(--border-subtle)] border-dashed" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-80" />
              <div className="absolute top-0 w-px h-1 bg-[var(--border-primary)]" />
              <div className="absolute bottom-0 w-px h-1 bg-[var(--border-primary)]" />
              <div className="absolute left-0 h-px w-1 bg-[var(--border-primary)]" />
              <div className="absolute right-0 h-px w-1 bg-[var(--border-primary)]" />
            </div>

            {/* Floating Technical Metadata Stack */}
            <div className="flex flex-col items-end gap-1.5 text-right font-mono text-[6.5px] text-[var(--text-secondary)] tracking-wider">
              <span className="text-[var(--text-primary)] font-semibold">ROLE: FULL STACK</span>
              <span>SYS: CLOUD & AI</span>
              <span>STATUS: ACTIVE</span>
              <span className="text-[var(--accent)] font-semibold">REF: ARCH.01</span>
            </div>

            {/* Minor Datum Marker */}
            <div className="flex items-center gap-1 font-mono text-[6.5px] text-[var(--text-muted)]">
              <span>DATUM</span>
              <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
            </div>
          </div>

          {/* ----- LAYER 3: FOREGROUND PORTRAIT CUTOUT SUBJECT ----- */}
          {/*
              Cutout photograph positioned centrally with natural object-fit: contain.
              Anchored to the bottom boundary, occupying the natural vertical span without being cut off.
          */}
          <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-20 overflow-hidden">
            <img
              src="/img/dev_pic.png"
              alt="Dev Mistry"
              className="h-[87%] w-auto max-w-[84%] object-contain object-bottom transition-all duration-500 ease-out"
              style={{
                filter: isHovered
                  ? 'drop-shadow(0 16px 28px rgba(0,0,0,0.30)) drop-shadow(0 4px 10px rgba(0,0,0,0.18))'
                  : 'drop-shadow(0 12px 20px rgba(0,0,0,0.20)) drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
                transform: isHovered ? 'scale(1.025) translateY(-3px)' : 'scale(1) translateY(0)',
              }}
            />
          </div>

          {/* ----- LAYER 4: BOTTOM SECTION FOOTER STRIP & ABOUT BUTTON ----- */}
          <div className="absolute bottom-0 inset-x-0 p-3 pt-6 flex items-end justify-between z-30 bg-gradient-to-t from-[var(--bg-surface)] via-[var(--bg-surface)]/85 to-transparent">
            {/* Editorial Caption Tag */}
            <div className="flex flex-col font-mono tracking-wider select-none">
              <span className="text-[8.5px] font-bold text-[var(--text-primary)] leading-tight">
                DEV MISTRY
              </span>
              <div className="flex items-center gap-1.5 text-[7px] text-[var(--text-secondary)]">
                <span>PORTRAIT</span>
                <span>//</span>
                <span className="text-[var(--accent)] font-semibold">FIG. 01</span>
              </div>
            </div>

            {/* Enhanced Editorial ABOUT DEV Button */}
            <div className="pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onOpenSection) onOpenSection('about');
                }}
                data-cursor="button"
                className="group/btn relative px-2.5 py-1 rounded-[1px] border border-[var(--border-primary)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[8px] font-mono tracking-wider uppercase transition-all duration-300 shadow-xs cursor-pointer flex items-center gap-1.5"
                title="View Full Profile Specification"
              >
                <span>ABOUT DEV</span>
                <span className="text-[var(--accent)] font-bold transition-transform duration-300 group-hover/btn:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
