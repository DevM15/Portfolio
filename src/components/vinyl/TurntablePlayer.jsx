import React, { useState } from 'react';
import VinylRecord from './VinylRecord';

/**
 * TurntablePlayer:
 * Renders an authentic high-fidelity vinyl record player featuring:
 * - Solid brushed plinth with architectural chamfers and soft ambient drop-shadow.
 * - Precision cast-aluminum platter with strobe perimeter dots and slipmat.
 * - Dynamic pivoted tonearm with counterweight, gimbal pivot, and cartridge needle.
 * - Smooth tonearm transition onto the active record when playing.
 * - Tactile start/pause button, 33/45 RPM selector, and power status LED.
 * - Fully responsive with compact dock mode for side-by-side project inspection.
 */
export default function TurntablePlayer({
  activeProject,
  isPlaying = false,
  onTogglePlay = () => {},
  compact = false,
  className = '',
}) {
  const [rpm, setRpm] = useState(33);

  // Scaled dimensions depending on compact or large layout
  const plinthWidth = compact ? 'w-[280px] sm:w-[320px]' : 'w-[320px] sm:w-[380px] md:w-[440px]';
  const vinylSize = compact ? 200 : 280;

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-center ${plinthWidth} aspect-[1.1] ${className}`}
    >
      {/* ==================== TURNTABLE CHASSIS / PLINTH ==================== */}
      <div
        className="relative w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)',
          border: '1px solid var(--border-primary)',
          boxShadow:
            '0 25px 60px -15px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Subtle Brushed Metal Surface Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
          }}
        />

        {/* Chassis Corner Calibration Marks */}
        <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-[var(--border-primary)]" />
        <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-[var(--border-primary)]" />
        <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-[var(--border-primary)]" />
        <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-[var(--border-primary)]" />

        {/* Top Header Strip: Model / Deck Metadata */}
        <div className="relative z-10 flex items-center justify-between text-[7.5px] font-mono tracking-wider uppercase text-[var(--text-secondary)] border-b border-[var(--border-subtle)] pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-semibold text-[var(--text-primary)]">DM-TURNTABLE 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <span>HI-FI AUDIO CORE</span>
            <span className="font-bold text-[var(--accent)]">{isPlaying ? 'PLAYING' : 'IDLE'}</span>
          </div>
        </div>

        {/* Main Body: Turntable Platter (Left/Center) + Tonearm (Right) */}
        <div className="relative flex-1 flex items-center justify-between my-2">
          {/* ----- CIRCULAR PLATTER & ACTIVE VINYL ----- */}
          <div className="relative flex-1 flex items-center justify-center">
            {/* Cast Aluminum Platter Rim with Strobe Dots */}
            <div
              className="relative rounded-full flex items-center justify-center shadow-2xl"
              style={{
                width: `${vinylSize + 24}px`,
                height: `${vinylSize + 24}px`,
                background:
                  'radial-gradient(circle at 45% 45%, #D4D8DC 0%, #A6ADB4 45%, #6A727A 85%, #424850 100%)',
                boxShadow:
                  '0 12px 30px rgba(0, 0, 0, 0.45), inset 0 0 0 2px rgba(255,255,255,0.4), inset 0 0 10px rgba(0,0,0,0.5)',
              }}
            >
              {/* Platter Strobe Ring Pattern */}
              <div
                className="absolute inset-1 rounded-full border border-black/30 pointer-events-none opacity-40"
                style={{
                  backgroundImage:
                    'repeating-conic-gradient(from 0deg, #333 0deg, #333 3deg, #aaa 3deg, #aaa 6deg)',
                  animation: isPlaying ? 'spin 1.8s linear infinite' : 'none',
                }}
              />

              {/* Rubber Slipmat */}
              <div
                className="relative rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  width: `${vinylSize + 4}px`,
                  height: `${vinylSize + 4}px`,
                  background: 'radial-gradient(circle, #1A1E1C 0%, #111413 85%, #0B0D0C 100%)',
                  boxShadow: 'inset 0 0 12px rgba(0,0,0,0.9)',
                }}
              >
                {/* Mounted Active Vinyl Record */}
                {activeProject ? (
                  <VinylRecord
                    project={activeProject}
                    size={vinylSize}
                    isSpinning={isPlaying}
                    isHoverable={false}
                    isSelected={false}
                  />
                ) : (
                  <div className="text-[9px] font-mono tracking-wider text-[var(--text-muted)] uppercase">
                    NO RECORD LOADED
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ----- REALISTIC PIVOTED TONEARM (RIGHT ASSEMBLY) ----- */}
          <div
            className="absolute right-0 top-0 bottom-0 w-28 sm:w-36 pointer-events-none z-30 flex items-center justify-center"
            style={{ perspective: 800 }}
          >
            {/* Tonearm Assembly Pivot Base */}
            <div
              className="relative w-full h-full"
              style={{
                transformOrigin: '75% 22%',
                transform: isPlaying ? 'rotate(27deg)' : 'rotate(0deg)',
                transition: 'transform 1.1s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {/* Circular Bearing Gimbal Base */}
              <div
                className="absolute right-6 top-6 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-black/40 shadow-xl flex items-center justify-center"
                style={{
                  background:
                    'radial-gradient(circle at 40% 40%, #E8EBED 0%, #ADB5BD 60%, #495057 100%)',
                }}
              >
                {/* Center Gimbal Pin */}
                <div className="w-4 h-4 rounded-full bg-[#343A40] border border-white/40 shadow-inner" />
              </div>

              {/* Cylindrical Counterweight */}
              <div
                className="absolute right-7 top-1 w-7 h-5 rounded-sm border border-black/30 shadow-md"
                style={{
                  background:
                    'linear-gradient(to right, #495057 0%, #CED4DA 50%, #343A40 100%)',
                }}
              />

              {/* S-Shaped Brushed Aluminum Arm Wand */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow(0 6px 8px rgba(0,0,0,0.4))"
                viewBox="0 0 140 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Arm tube with chrome highlights */}
                <path
                  d="M102 36 Q100 110 82 145 T52 195"
                  stroke="url(#armChrome)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M102 36 Q100 110 82 145 T52 195"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="armChrome" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#DEE2E6" />
                    <stop offset="40%" stopColor="#ADB5BD" />
                    <stop offset="70%" stopColor="#F8F9FA" />
                    <stop offset="100%" stopColor="#495057" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Headshell & Stylus Needle Cartridge */}
              <div
                className="absolute left-6 sm:left-9 bottom-4 sm:bottom-6 w-5 h-8 rounded-[2px] border border-black/40 shadow-lg flex flex-col justify-between p-0.5"
                style={{
                  background: 'linear-gradient(135deg, #212529 0%, #343A40 100%)',
                  transform: 'rotate(-25deg)',
                }}
              >
                <div className="w-full h-1 bg-[var(--accent)] rounded-[1px]" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/80 self-center shadow-xs" />
                {/* Needle Point */}
                <div className="w-0.5 h-1 bg-amber-400 self-center shadow-xs animate-pulse" />
              </div>

              {/* Stylus Target Light Reflection on Vinyl */}
              {isPlaying && (
                <div
                  className="absolute left-7 bottom-5 w-4 h-4 rounded-full pointer-events-none opacity-40 blur-[2px]"
                  style={{
                    background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)',
                  }}
                />
              )}
            </div>

            {/* Static Tonearm Rest Post & Cueing Lever */}
            <div className="absolute right-5 top-16 w-3 h-6 bg-[#495057] rounded-[1px] border border-black/40 shadow-xs pointer-events-none" />
          </div>
        </div>

        {/* Bottom Control Deck: Play/Pause, Speed Selector, Strobe Light */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
          {/* Tactile Start / Pause Mechanical Switch */}
          <button
            onClick={onTogglePlay}
            data-cursor="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-[3px] border border-[var(--border-primary)] bg-[var(--bg-surface)] hover:border-[var(--accent)] text-[9px] font-mono tracking-wider uppercase transition-all shadow-xs cursor-pointer group"
          >
            <span
              className={`w-2 h-2 rounded-full transition-colors ${
                isPlaying ? 'bg-emerald-500 shadow-[0_0_8px_#10B981]' : 'bg-[var(--accent)]'
              }`}
            />
            <span className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
              {isPlaying ? 'PAUSE MOTOR' : 'START TURNTABLE'}
            </span>
          </button>

          {/* RPM Selector: 33 ⅓ vs 45 */}
          <div className="flex items-center gap-1 bg-[var(--bg-surface-elevated)] p-0.5 rounded-[3px] border border-[var(--border-subtle)] text-[8px] font-mono">
            {[33, 45].map((speed) => (
              <button
                key={speed}
                onClick={() => setRpm(speed)}
                className={`px-2 py-0.5 rounded-[2px] transition-all cursor-pointer ${
                  rpm === speed
                    ? 'bg-[var(--accent)] text-[#F7F6F2] font-bold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {speed} RPM
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
