import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VinylRecord from '../vinyl/VinylRecord';

/**
 * SonyCDPPlayer:
 * Clean, compact Sony CDP Unit with motorized bottom slide-out tray:
 * - NO action buttons.
 * - Upper deck houses SONY branding, green POWER indicator, and glowing red digital VFD track display.
 * - Bottom motorized tray plate: When a disc is selected, the tray emerges from the bottom of the player,
 *   holds the disc, and then glides back inside the player.
 */
export default function SonyCDPPlayer({
  activeProject = null,
  isPlaying = false,
  isTrayOpen = false,
  compact = false,
  className = '',
}) {
  const trackNum = activeProject?.num || '01';

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-start font-sans ${
        compact ? 'w-[250px] sm:w-[280px]' : 'w-[300px] sm:w-[350px] md:w-[390px]'
      } ${className}`}
    >
      {/* ==================== SONY CDP COMPACT MAIN UNIT ==================== */}
      <div
        className="relative w-full rounded-xl border border-[#2A2E2C] shadow-2xl transition-all duration-300 z-20"
        style={{
          background: 'linear-gradient(180deg, #1C201E 0%, #121514 25%, #0B0D0C 100%)',
          boxShadow:
            '0 25px 50px -12px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -2px 0 rgba(0,0,0,0.8)',
        }}
      >
        {/* Top Cabinet Bevel & Micro Louver */}
        <div className="w-full h-2.5 bg-gradient-to-b from-[#2B312E] to-[#161A18] border-b border-[#0D0F0E] flex flex-col justify-center px-4 rounded-t-xl">
          <div className="w-full h-[1px] bg-black shadow-[0_1px_0_rgba(255,255,255,0.08)]" />
        </div>

        {/* Front Panel Header Strip: SONY + Status + Glowing VFD */}
        <div className="p-3 sm:p-3.5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2.5">
            {/* Left: SONY Wordmark + Power Indicator */}
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black tracking-widest text-sm sm:text-base text-gray-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  SONY
                </span>
                <span className="font-mono text-[7px] text-[#A2A9A1] tracking-wider">
                  CDP-101
                </span>
              </div>

              {/* Power LED */}
              <div className="flex items-center gap-1.5 mt-1 font-mono text-[7px] text-gray-400">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isPlaying
                      ? 'bg-emerald-400 shadow-[0_0_8px_#34D399]'
                      : 'bg-red-500/80 shadow-[0_0_4px_#EF4444]'
                  }`}
                />
                <span className="text-[6.5px] uppercase tracking-wider">
                  {isTrayOpen ? 'LOADING' : isPlaying ? 'PLAYING' : 'READY'}
                </span>
              </div>
            </div>

            {/* Right: Vintage Red VFD Digital Display */}
            <div className="flex-1 max-w-[190px] rounded-[3px] bg-[#0A0505] border border-[#251818] p-1.5 relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[34px]">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-transparent pointer-events-none" />

              <div className="flex items-center justify-between text-[6.5px] font-mono tracking-wider text-[#A33B3B] uppercase select-none">
                <span className={isPlaying ? 'text-[#FF4444] font-bold animate-pulse' : 'opacity-40'}>
                  ● DISC SET
                </span>
                <span>TRACK</span>
                <span>TIME</span>
              </div>

              <div className="flex items-baseline justify-between mt-0.5 font-mono">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[#FF3B30] font-black text-sm sm:text-base tracking-wider drop-shadow-[0_0_8px_rgba(255,59,48,0.7)]">
                    {trackNum}
                  </span>
                  <span className="text-[7.5px] text-[#A33B3B] font-bold uppercase truncate max-w-[85px] sm:max-w-[110px]">
                    {activeProject ? activeProject.title : 'NO DISC'}
                  </span>
                </div>

                <div className="text-[#FF3B30] font-black text-xs sm:text-sm tracking-widest drop-shadow-[0_0_6px_rgba(255,59,48,0.6)]">
                  {isPlaying ? '02:45' : '--:--'}
                </div>
              </div>
            </div>
          </div>

          {/* Motorized Skate Slot Aperture (Where the plate comes in/out) */}
          <div className="w-full rounded bg-[#0A0D0B] border border-[#1C221F] px-2.5 py-1.5 flex items-center justify-between font-mono text-[6.5px] text-[#788477] uppercase shadow-inner">
            <div className="flex items-center gap-1.5">
              <span className="px-1 py-0.2 rounded-[1px] border border-white/20 bg-black/60 text-[5.5px] text-gray-200 font-bold">
                COMPACT DISC
              </span>
              <span className="text-[6.5px] text-[#A2A9A1] font-semibold">
                MOTORIZED TRAY SERVO
              </span>
            </div>

            <span className={`font-bold tracking-wider ${isTrayOpen ? 'text-amber-400 animate-pulse' : 'text-emerald-400'}`}>
              {isTrayOpen ? (activeProject ? 'DISC INSERTED · RETRACTING ▼' : 'TRAY OPEN · SELECT DISC ▼') : 'DISC LOADED ▲'}
            </span>
          </div>
        </div>
      </div>

      {/* ==================== MOTORIZED SLIDER TRAY PLATE ==================== */}
      {/* Glides out from the bottom of the player when a disc is selected */}
      <div className="relative w-full flex items-center justify-center -mt-2 z-10 overflow-visible">
        <motion.div
          initial={false}
          animate={{
            y: isTrayOpen ? 20 : -95,
            opacity: isTrayOpen ? 1 : 0,
            scale: isTrayOpen ? 1 : 0.9,
          }}
          transition={{
            type: 'spring',
            stiffness: 160,
            damping: 20,
          }}
          className="w-[90%] rounded-b-2xl bg-gradient-to-b from-[#181D1A] to-[#0A0D0B] border-x-2 border-b-2 border-[#3A453F] p-3 shadow-2xl flex flex-col items-center justify-center"
          style={{
            boxShadow: isTrayOpen
              ? '0 30px 45px rgba(0,0,0,0.85), 0 0 25px rgba(185,111,82,0.3)'
              : 'none',
          }}
        >
          {/* Circular Recessed Platter Chuck on the Plate */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#0D0F0E] border-2 border-[#38433C] flex items-center justify-center shadow-inner overflow-hidden">
            <div className="absolute inset-2 rounded-full border border-white/[0.08]" />
            <div className="absolute inset-4 rounded-full border border-black/90" />

            {/* Center Spindle Chuck */}
            <div className="absolute z-20 w-4 h-4 rounded-full bg-black border border-white/30 flex items-center justify-center shadow-md">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B96F52] shadow-inner" />
            </div>

            {/* Disc on the Plate */}
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 0.3, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.3, rotate: 90 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10"
                >
                  <VinylRecord
                    project={activeProject}
                    size={compact ? 90 : 105}
                    isSpinning={isPlaying}
                    isHoverable={false}
                    isSelected={false}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tray Plate Label */}
          <div className="mt-2 text-[6.5px] font-mono tracking-widest text-[#B96F52] uppercase font-bold text-center">
            LINEAR MOTORIZED CASSETTE PLATE
          </div>
        </motion.div>
      </div>
    </div>
  );
}
