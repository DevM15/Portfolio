import React from 'react';
import { motion } from 'framer-motion';

/**
 * DigitalCD:
 * Realistic Compact Disc (CD) visual component.
 * Features:
 * - Transparent polycarbonate center ring with clamping area & hub.
 * - Precision center hole with metallic inner ring.
 * - Iridescent holographic specular reflections that react to angle.
 * - Circular printed artwork label on top half with silk-screened project details.
 * - Micro radial data pits/grooves simulating authentic physical optical media.
 * - Optional continuous smooth rotation when loaded and playing.
 * - Full drag-and-drop support with Framer Motion layoutId and drag mechanics.
 */
export default function DigitalCD({
  project,
  size = 180,
  isSpinning = false,
  isSelected = false,
  isDraggable = true,
  onDragStart = () => {},
  onDragEnd = () => {},
  onClick = () => {},
  layoutId = null,
  className = '',
  style = {},
}) {
  const accentColor = project?.accent || project?.color || '#B96F52';
  const labelRadius = Math.round(size * 0.42);
  const centerHoleSize = Math.max(16, Math.round(size * 0.18));
  const innerRingSize = Math.max(26, Math.round(size * 0.36));

  return (
    <motion.div
      layoutId={layoutId}
      drag={isDraggable}
      dragSnapToOrigin={true}
      whileDrag={{
        scale: 1.12,
        rotate: 6,
        zIndex: 999,
        cursor: 'grabbing',
        filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.45)) drop-shadow(0 0 16px var(--accent))',
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      data-cursor="drag"
      className={`relative select-none rounded-full flex items-center justify-center flex-shrink-0 cursor-grab active:cursor-grabbing will-change-transform ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: isSelected
          ? 'drop-shadow(0 18px 30px rgba(0,0,0,0.35)) drop-shadow(0 0 10px var(--accent))'
          : 'drop-shadow(0 10px 20px rgba(0,0,0,0.22))',
        transition: 'filter 0.3s ease',
        ...style,
      }}
    >
      {/* ==================== 1. OPTICAL DISC BASE WITH PRISMATIC REFLECTION ==================== */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center border border-white/20"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, #ECE9E2 0%, #D8D2C4 55%, #C2BAA8 100%)
          `,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 0 12px rgba(0,0,0,0.25)',
          animation: isSpinning ? 'spin 2.8s linear infinite' : 'none',
        }}
      >
        {/* Holographic Prismatic Specular Rainbow Sheen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge"
          style={{
            background: `
              conic-gradient(
                from 45deg at 50% 50%,
                rgba(255, 0, 128, 0.35) 0deg,
                rgba(0, 200, 255, 0.4) 60deg,
                rgba(255, 220, 0, 0.4) 120deg,
                rgba(0, 255, 150, 0.35) 180deg,
                rgba(255, 0, 200, 0.4) 240deg,
                rgba(0, 180, 255, 0.35) 300deg,
                rgba(255, 0, 128, 0.35) 360deg
              )
            `,
          }}
        />

        {/* Micro Optical Radial Data Pits / Track Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[96, 92, 88, 84, 80, 76, 72, 68, 64, 60, 56, 52, 48].map((r, i) => (
            <circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              stroke={i % 2 === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)'}
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {/* ==================== 2. PRINTED SILK-SCREEN TOP ARTWORK ==================== */}
        {/* Semi-circular or arc printed surface showing project branding */}
        <div
          className="absolute inset-0 m-auto rounded-full overflow-hidden pointer-events-none"
          style={{
            width: `${labelRadius * 2}px`,
            height: `${labelRadius * 2}px`,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 50% 88%, 0% 70%)',
            background: `linear-gradient(135deg, ${accentColor} 0%, #151916 100%)`,
            opacity: 0.92,
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {/* Faint Project Artwork Image Blend */}
          {project?.image && (
            <img
              src={project.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
            />
          )}

          {/* Printed Minimal Typographic Specs */}
          <div className="absolute inset-0 p-2.5 flex flex-col justify-between text-white/95 select-none font-mono">
            <div className="flex items-center justify-between text-[7px] tracking-wider uppercase font-semibold">
              <span className="bg-black/40 px-1 py-0.5 rounded-[1px]">CD {project?.num || '01'}</span>
              <span className="opacity-80">{project?.year || '2026'}</span>
            </div>

            <div className="text-center my-auto px-1">
              <div className="text-[9px] font-display font-black tracking-tight uppercase truncate drop-shadow-sm">
                {project?.title || 'UNTITLED'}
              </div>
              <div className="text-[6.5px] opacity-75 truncate tracking-wider font-mono">
                {project?.category || 'SYSTEM'}
              </div>
            </div>

            <div className="text-[6px] tracking-widest text-center opacity-70 uppercase font-mono">
              DIGITAL COMPACT DISC · STEREO
            </div>
          </div>
        </div>

        {/* ==================== 3. TRANSPARENT POLYCARBONATE CENTER HUB ==================== */}
        {/* Transparent clamping area */}
        <div
          className="absolute rounded-full flex items-center justify-center border border-white/50 pointer-events-none"
          style={{
            width: `${innerRingSize}px`,
            height: `${innerRingSize}px`,
            background: 'radial-gradient(circle at 45% 45%, rgba(255,255,255,0.7) 0%, rgba(220,215,205,0.4) 60%, rgba(180,175,165,0.6) 100%)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.35), 0 0 4px rgba(0,0,0,0.2)',
          }}
        >
          {/* Inner Polycarbonate Mirror Ring */}
          <div
            className="rounded-full border border-black/20 flex items-center justify-center"
            style={{
              width: `${Math.round(innerRingSize * 0.72)}px`,
              height: `${Math.round(innerRingSize * 0.72)}px`,
              background: 'rgba(255,255,255,0.35)',
            }}
          >
            {/* Center Spindle Hole (Physical void) */}
            <div
              className="rounded-full bg-[var(--bg-primary)] border border-black/40 shadow-inner flex items-center justify-center"
              style={{
                width: `${centerHoleSize}px`,
                height: `${centerHoleSize}px`,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-black/25" />
            </div>
          </div>
        </div>

        {/* Glossy Plastic Sheen Overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 45%, rgba(255,255,255,0.15) 100%)',
          }}
        />
      </div>
    </motion.div>
  );
}
