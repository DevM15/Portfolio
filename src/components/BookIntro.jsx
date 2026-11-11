import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * Cinematic 3D Book Landing Intro Component
 *
 * Visual & Physical Design:
 * - Ultra-luxurious, dark obsidian hardcover book with gold foil / cyan debossed "DM" monogram.
 * - Realistic physical thickness: spine on left, multi-layered 3D page edges with paper grain.
 * - Ambient warm-cool lighting, soft dynamic ground drop shadow, and subtle floating particles.
 * - Interactive states:
 *    - Idle / Hover: Gentle floating hover tilt following cursor / gentle breathing drift.
 *    - Click / Open trigger: Front cover pivots -165deg around spine axis (transform-origin: left center).
 *    - Page flipping: Turning inner flyleaf and signature pages with staggered delays.
 *    - Right page reveals editorial prologue that dissolves as camera moves.
 *    - Smooth camera zoom: 3D perspective camera smoothly dollies into the right page surface (scale & translateZ),
 *      expanding to fill 100% of the viewport and fading seamlessly into the website hero.
 * - Respects prefers-reduced-motion with instant skip or fast fade.
 * - Keyboard accessible (Space / Enter / Esc to open or skip).
 */
export default function BookIntro({ onComplete }) {
  // Animation phases: 'ready' -> 'opening' -> 'zooming' -> 'done'
  const [phase, setPhase] = useState('ready');
  const [tilt, setTilt] = useState({ rx: 12, ry: -14 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
    }
  }, [onComplete]);

  // Subtle interactive mouse tilt when book is closed
  const handleMouseMove = (e) => {
    if (phase !== 'ready' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Base book resting angle is rx: 10, ry: -12; tilt nudges it slightly
    setTilt({
      rx: 10 - y * 14,
      ry: -12 + x * 18,
    });
  };

  const handleMouseLeave = () => {
    if (phase === 'ready') {
      setTilt({ rx: 10, ry: -12 });
      setIsHovered(false);
    }
  };

  const triggerOpen = useCallback(() => {
    if (phase !== 'ready') return;
    setPhase('opening');

    // Phase 1: Book opens (-165deg cover rotation, pages fanning out)
    // After cover opens (~1200ms), begin camera zoom
    setTimeout(() => {
      setPhase('zooming');
    }, 1250);

    // Phase 2: Zoom completes at 2400ms -> hand off to website hero
    setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 2450);
  }, [phase, onComplete]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phase === 'ready' && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
        e.preventDefault();
        triggerOpen();
      } else if (e.key === 'Escape') {
        // Fast skip
        setPhase('done');
        onComplete?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, onComplete, triggerOpen]);

  if (phase === 'done') return null;

  const isOpeningOrZooming = phase === 'opening' || phase === 'zooming';
  const isZooming = phase === 'zooming';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050706] select-none overflow-hidden"
      style={{
        perspective: '1400px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* Ambient background glow & atmospheric vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(101,230,210,0.06)_0%,rgba(5,7,6,0.95)_75%)]" />

      {/* Subtle architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#F1EFE8_1px,transparent_1px),linear-gradient(to_bottom,#F1EFE8_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Top HUD Hint */}
      <div
        className={`absolute top-8 left-0 right-0 px-8 flex justify-between items-center text-[10px] tracking-[0.25em] font-mono text-[#626A65] transition-opacity duration-700 ${
          isOpeningOrZooming ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#65E6D2] animate-pulse" />
          <span className="text-[#9EA49F]">ARCHIVAL MONOGRAPH / VOL. 2026</span>
        </div>
        <button
          onClick={() => {
            setPhase('done');
            onComplete?.();
          }}
          className="text-[#9EA49F] hover:text-[#65E6D2] transition-colors uppercase tracking-[0.25em] cursor-pointer"
        >
          SKIP INTRO [ESC]
        </button>
      </div>

      {/* ==================== 3D BOOK RIG / CAMERA SYSTEM ==================== */}
      <motion.div
        animate={
          isZooming
            ? {
                // Camera zooms straight into the right page of the open book
                scale: 4.8,
                x: '-22%',
                y: '2%',
                z: 680,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                opacity: 0,
              }
            : isOpeningOrZooming
            ? {
                // Book lays flatter to face the reader squarely
                scale: 1.08,
                x: '0%',
                y: '0%',
                z: 80,
                rotateX: 5,
                rotateY: 0,
                rotateZ: 0,
                opacity: 1,
              }
            : {
                // Closed resting state with 3D angle and subtle breathing float
                scale: isHovered ? 1.03 : 1,
                x: 0,
                y: isHovered ? -8 : 0,
                z: 0,
                rotateX: tilt.rx,
                rotateY: tilt.ry,
                rotateZ: -2,
                opacity: 1,
              }
        }
        transition={
          isZooming
            ? { duration: 1.25, ease: [0.76, 0, 0.24, 1] }
            : isOpeningOrZooming
            ? { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
            : { duration: 0.35, ease: 'easeOut' }
        }
        style={{
          transformStyle: 'preserve-3d',
        }}
        onClick={triggerOpen}
        className="relative cursor-pointer group"
      >
        {/* Soft Dynamic Ambient Ground Shadow */}
        <div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[380px] sm:w-[480px] h-[50px] bg-black/80 rounded-full blur-2xl pointer-events-none transition-all duration-700"
          style={{
            transform: `scale(${isOpeningOrZooming ? 1.6 : isHovered ? 1.15 : 1}) translateZ(-80px)`,
            opacity: isZooming ? 0 : 0.7,
          }}
        />

        {/* ==================== BOOK ROOT CONTAINER ==================== */}
        {/* Width/Height ratio: Standard deluxe publication ~ 1 : 1.35 */}
        <div
          className="relative w-[280px] h-[390px] sm:w-[340px] sm:h-[470px] md:w-[380px] md:h-[520px]"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ==================== BACK COVER ==================== */}
          <div
            className="absolute inset-0 rounded-[4px] bg-[#0C100E] border border-[#202723] shadow-2xl"
            style={{
              transform: 'translateZ(-14px)',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 30px 60px rgba(0,0,0,0.9)',
            }}
          />

          {/* ==================== BOOK SPINE (LEFT EDGE) ==================== */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[28px] bg-gradient-to-r from-[#070908] via-[#151C18] to-[#0A0D0B] border-t border-b border-l border-[#222B26] rounded-l-[4px]"
            style={{
              transform: 'rotateY(-90deg) translateZ(14px)',
              transformOrigin: 'left center',
            }}
          >
            {/* Spine Title Foil */}
            <div className="w-full h-full flex flex-col items-center justify-between py-8 select-none">
              <span className="text-[7px] font-mono tracking-[0.25em] text-[#626A65] rotate-90">2026</span>
              <span className="text-[10px] font-mono font-bold tracking-[0.35em] text-[#E8E1D2]/80 rotate-90 whitespace-nowrap">
                DEV MISTRY — FOLIO
              </span>
              <span className="text-[8px] font-mono tracking-widest text-[#65E6D2] rotate-90">DM</span>
            </div>
          </div>

          {/* ==================== RIGHT PAGE THICKNESS BLOCK (PAGE EDGES) ==================== */}
          <div
            className="absolute top-[6px] bottom-[6px] right-0 w-[24px] bg-[#E8E1D2] rounded-r-[2px] overflow-hidden"
            style={{
              transform: 'rotateY(90deg) translateZ(12px)',
              transformOrigin: 'right center',
              background: 'repeating-linear-gradient(to bottom, #D9D2C3 0px, #D9D2C3 1px, #C5BDAE 2px, #EFE9DC 3px)',
              boxShadow: 'inset 4px 0 10px rgba(0,0,0,0.3)',
            }}
          />

          {/* ==================== BOTTOM PAGE THICKNESS BLOCK ==================== */}
          <div
            className="absolute bottom-0 left-[6px] right-[6px] h-[24px] bg-[#D9D2C3]"
            style={{
              transform: 'rotateX(-90deg) translateZ(12px)',
              transformOrigin: 'bottom center',
              background: 'repeating-linear-gradient(to right, #D9D2C3 0px, #D9D2C3 1px, #C5BDAE 2px, #EFE9DC 3px)',
            }}
          />

          {/* ==================== TOP PAGE THICKNESS BLOCK ==================== */}
          <div
            className="absolute top-0 left-[6px] right-[6px] h-[24px] bg-[#D9D2C3]"
            style={{
              transform: 'rotateX(90deg) translateZ(12px)',
              transformOrigin: 'top center',
              background: 'repeating-linear-gradient(to right, #D9D2C3 0px, #D9D2C3 1px, #C5BDAE 2px, #EFE9DC 3px)',
            }}
          />

          {/* ==================== RIGHT INNER SPREAD (THE DESTINATION PAGE) ==================== */}
          {/* This page rests inside the book and becomes the target surface that camera zooms into */}
          <div
            className="absolute inset-[3px] left-[6px] rounded-r-[3px] bg-[#080B0A] border border-[#1E2420] overflow-hidden flex flex-col justify-between p-7 sm:p-9 shadow-inner"
            style={{
              transform: 'translateZ(1px)',
              background: 'radial-gradient(circle at 75% 25%, #101513 0%, #060807 80%)',
            }}
          >
            {/* Fine editorial grid texture */}
            <div className="absolute inset-0 bg-subtle-grain opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.5)_0%,transparent_15%)] pointer-events-none" />

            {/* Page Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#2A302C]/60 pb-3 text-[9px] font-mono tracking-[0.2em] text-[#626A65]">
              <span className="text-[#65E6D2]">SECTION 00 // PRELUDE</span>
              <span>FOLIO EDITION 2026</span>
            </div>

            {/* Page Main Content - Mimics the entry into the website hero */}
            <div className="relative z-10 my-auto py-4">
              <span className="block font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#65E6D2] mb-3">
                FULL STACK DEVELOPER & DESIGNER
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tighter text-[#F1EFE8] leading-[0.95] mb-4">
                DEV
                <br />
                MISTRY
              </h2>
              <p className="text-xs sm:text-sm text-[#9EA49F] max-w-[260px] leading-relaxed font-sans font-light">
                Engineering digital exhibitions, spatial interfaces, and high-performance full-stack architectures.
              </p>

              {/* Technical coordinates badge */}
              <div className="mt-6 pt-4 border-t border-[#2A302C]/40 flex items-center gap-4 text-[9px] font-mono text-[#626A65]">
                <span>MUMBAI, IN</span>
                <span>•</span>
                <span>19.0760° N, 72.8777° E</span>
              </div>
            </div>

            {/* Page Footer */}
            <div className="relative z-10 flex items-center justify-between text-[9px] font-mono tracking-widest text-[#626A65] pt-3 border-t border-[#2A302C]/40">
              <span>EST. 2022</span>
              <span>PAGE 01</span>
            </div>
          </div>

          {/* ==================== FLIPPING INNER PAGES (LAYERED FAN EFFECT) ==================== */}
          {/* Page 1 (Subtle leaf turn) */}
          <motion.div
            animate={
              isOpeningOrZooming
                ? {
                    rotateY: -150,
                  }
                : {
                    rotateY: 0,
                  }
            }
            transition={{
              duration: 1.1,
              delay: 0.12,
              ease: [0.25, 1, 0.5, 1],
            }}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-[4px] left-[6px] rounded-r-[3px] bg-[#0A0E0C] border border-[#1C231F] pointer-events-none"
          >
            <div className="w-full h-full p-6 flex flex-col justify-between opacity-30">
              <div className="h-2 w-16 bg-[#2A302C] rounded" />
              <div className="space-y-2">
                <div className="h-1.5 w-3/4 bg-[#2A302C] rounded" />
                <div className="h-1.5 w-1/2 bg-[#2A302C] rounded" />
              </div>
            </div>
          </motion.div>

          {/* ==================== FRONT COVER WITH REALISTIC MONOGRAM "DM" ==================== */}
          {/* Rotates on spine axis: transform-origin: left center */}
          <motion.div
            animate={
              isOpeningOrZooming
                ? {
                    rotateY: -165,
                    boxShadow: '35px 25px 60px rgba(0,0,0,0.85)',
                  }
                : {
                    rotateY: 0,
                    boxShadow: '15px 15px 45px rgba(0,0,0,0.75)',
                  }
            }
            transition={{
              duration: 1.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(14px)',
            }}
            className="absolute inset-0 rounded-[4px] bg-[#0B0F0D] border border-[#232B26] overflow-hidden"
          >
            {/* Cover Face (Front Side) */}
            <div
              className="absolute inset-0 flex flex-col justify-between p-6 sm:p-9 text-[#F1EFE8] select-none"
              style={{
                backfaceVisibility: 'hidden',
                background:
                  'radial-gradient(circle at 40% 30%, #151D19 0%, #0A0D0C 70%, #060807 100%)',
              }}
            >
              {/* Subtle luxury leather / buckram cloth texture */}
              <div className="absolute inset-0 bg-subtle-grain opacity-60 pointer-events-none" />

              {/* Decorative Debossed Blind Foil Border */}
              <div className="absolute inset-4 sm:inset-6 border border-[#2B352E]/70 rounded-[2px] pointer-events-none" />
              <div className="absolute inset-[18px] sm:inset-[26px] border border-[#2B352E]/30 rounded-[1px] pointer-events-none" />

              {/* Cover Top Header Metadata */}
              <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-[#808983]">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#65E6D2]" />
                  DEV MISTRY
                </span>
                <span>EDITION / 2026</span>
              </div>

              {/* Centered Grand "DM" Monogram with Luxurious Foil Shimmer */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                {/* Subtle behind-monogram radial flare */}
                <div className="absolute w-44 h-44 rounded-full bg-[#65E6D2]/10 blur-3xl pointer-events-none" />

                <div className="relative flex items-center justify-center">
                  {/* Monogram Backdrop Diamond / Ring */}
                  <div className="absolute w-28 h-28 sm:w-36 sm:h-36 border border-[#65E6D2]/25 rotate-45 rounded-sm" />

                  {/* Monogram DM Letters */}
                  <div className="text-7xl sm:text-8xl md:text-9xl font-display font-black tracking-tighter text-[#F1EFE8] leading-none select-none flex items-center">
                    <span className="inline-block drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                      D
                    </span>
                    <span className="inline-block text-[#65E6D2] -ml-2 sm:-ml-3 drop-shadow-[0_0_24px_rgba(101,230,210,0.35)]">
                      M
                    </span>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <span className="block text-[10px] sm:text-[11px] font-mono tracking-[0.35em] text-[#E8E1D2] font-semibold uppercase">
                    SELECTED WORKS & ARCHIVES
                  </span>
                  <span className="block text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-[#626A65] mt-1">
                    AUTONOMOUS CODE & SPATIAL SYSTEMS
                  </span>
                </div>
              </div>

              {/* Cover Bottom Footer Call-To-Action */}
              <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#808983] pt-2 border-t border-[#232B26]">
                <span>MUMBAI, INDIA</span>
                <span className="text-[#65E6D2] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  CLICK TO OPEN <span>→</span>
                </span>
              </div>
            </div>

            {/* Cover Inside Face (The back of the front cover when flipped open) */}
            <div
              className="absolute inset-0 bg-[#0B0E0C] p-7 flex flex-col justify-between border border-[#1F2621]"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                background: 'radial-gradient(circle at 30% 50%, #111714 0%, #070908 100%)',
              }}
            >
              <div className="text-[9px] font-mono text-[#626A65] tracking-widest border-b border-[#202722] pb-3">
                FOLIO EX LIBRIS
              </div>
              <div className="my-auto space-y-3 max-w-[200px]">
                <div className="w-8 h-8 rounded border border-[#65E6D2]/40 flex items-center justify-center font-display font-bold text-xs text-[#65E6D2]">
                  DM
                </div>
                <p className="text-[10px] font-mono text-[#8E9791] leading-relaxed">
                  "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
                </p>
              </div>
              <div className="text-[8px] font-mono text-[#525A55] tracking-wider">
                PORTFOLIO CATALOGUE // 01 OF 01
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Subtle Interaction Prompt */}
      <div
        className={`absolute bottom-8 left-0 right-0 flex justify-center items-center pointer-events-none transition-opacity duration-500 ${
          isOpeningOrZooming ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0C110E]/80 border border-[#232B26] backdrop-blur-md text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#E8E1D2] shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-[#65E6D2] animate-ping" />
          <span>CLICK THE BOOK TO ENTER EXHIBITION</span>
        </div>
      </div>
    </div>
  );
}
