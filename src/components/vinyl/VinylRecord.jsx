import React from 'react';

/**
 * VinylRecord:
 * Renders an authentic physical 12" vinyl record with:
 * - Deep charcoal vinyl body with realistic concentric sound grooves.
 * - Conic specular reflections that simulate ambient light glistening off vinyl grooves.
 * - Center label sticker featuring the project title, artwork thumbnail, volume number, and year.
 * - Center brass spindle hole.
 * - Optional continuous spinning animation when playing.
 */
export default function VinylRecord({
  project,
  size = 240,
  isSpinning = false,
  isSelected = false,
  isHoverable = true,
  onClick = null,
  className = '',
  style = {},
}) {
  const labelColor = project?.color || '#B96F52';
  const labelSize = Math.round(size * 0.38);

  return (
    <div
      onClick={onClick}
      data-cursor={isHoverable ? 'record' : undefined}
      className={`relative select-none rounded-full flex items-center justify-center flex-shrink-0 ${
        isHoverable ? 'cursor-pointer group' : ''
      } ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: isSelected
          ? 'drop-shadow(0 20px 35px rgba(0,0,0,0.45)) drop-shadow(0 0 12px var(--accent))'
          : 'drop-shadow(0 14px 24px rgba(0,0,0,0.30))',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease',
        ...style,
      }}
    >
      {/* Spinning Disc Wrapper */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #0F1210 0%, #171B18 60%, #0B0D0C 100%)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 8px rgba(0,0,0,0.85)',
          animation: isSpinning ? 'spin 3.2s linear infinite' : 'none',
        }}
      >
        {/* Concentric Vinyl Grooves (SVG) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Micro sound grooves */}
          {[96, 92, 88, 84, 80, 76, 72, 68, 64, 60, 56, 52, 48, 44].map((r, i) => (
            <circle
              key={i}
              cx="100"
              cy="100"
              r={r}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={i % 3 === 0 ? '0.75' : '0.4'}
              strokeDasharray={i % 2 === 0 ? '12 2' : 'none'}
            />
          ))}
          {/* Run-out groove near label */}
          <circle cx="100" cy="100" r="42" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="40" stroke="rgba(0,0,0,0.6)" strokeWidth="1" />
        </svg>

        {/* Dynamic Light Sheen / Conic Specular Highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-25"
          style={{
            background:
              'conic-gradient(from 45deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.18) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.18) 225deg, transparent 270deg)',
          }}
        />

        {/* Center Circular Record Label */}
        <div
          className="relative rounded-full flex flex-col items-center justify-between p-1.5 overflow-hidden border border-white/20 shadow-md flex-shrink-0"
          style={{
            width: `${labelSize}px`,
            height: `${labelSize}px`,
            backgroundColor: labelColor,
            color: '#F7F6F2',
          }}
        >
          {/* Subtle label paper grain */}
          <div className="absolute inset-0 bg-black/15 pointer-events-none" />

          {/* Top Label: Track number & Side */}
          <div className="relative z-10 flex items-center justify-between w-full px-1 text-[6.5px] font-mono tracking-wider opacity-90">
            <span>SIDE A</span>
            <span className="font-bold">VOL. {project?.num || '01'}</span>
          </div>

          {/* Center: Miniature Artwork Thumbnail or Monogram */}
          <div className="relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/30 shadow-inner flex items-center justify-center bg-black/40">
            {project?.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover filter contrast-110"
              />
            ) : (
              <span className="font-display font-black text-xs text-white/90">
                {project?.num || 'DM'}
              </span>
            )}
          </div>

          {/* Bottom Label: Project Title & RPM */}
          <div className="relative z-10 flex flex-col items-center text-center w-full px-0.5">
            <span className="font-display font-bold text-[7.5px] leading-tight tracking-tight uppercase truncate max-w-[85px] drop-shadow-xs">
              {project?.title || 'UNTITLED'}
            </span>
            <span className="font-mono text-[5.5px] tracking-wider opacity-75">
              33 ⅓ RPM · 2026
            </span>
          </div>

          {/* Center Brass Spindle Hole */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/60 shadow-xs z-20"
            style={{
              width: `${Math.max(10, Math.round(size * 0.045))}px`,
              height: `${Math.max(10, Math.round(size * 0.045))}px`,
              background: 'radial-gradient(circle, #D4AF37 30%, #8C7322 80%, #3D320A 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
