import React from 'react';
import { motion } from 'framer-motion';

/**
 * DMIdentityCard:
 * A precision 3D Flip Identity Card representing the physical transition:
 *
 * Front face:
 * - Refined ivory/warm surface with subtle architectural border
 * - Sculptural metallic DM monogram with specular reflections
 *
 * Back face (180deg rotated):
 * - Dev Mistry's actual profile photograph (/img/dev_portrait.jpg)
 * - Fine editorial label: "01 / PROFILE" & "DEV MISTRY"
 * - Styled to match the exact hero cylinder profile card
 *
 * Flipping:
 * - Controlled by flipProgress (0 to 180 degrees)
 * - Real 3D depth, perspective, and backfaceVisibility: 'hidden'
 */
export default function DMIdentityCard({
  flipDeg = 0,
  cardWidth = 260,
  cardHeight = 360,
  borderRadius = 6,
  isFramed = false,
  isLifted = false,
  shadowOpacity = 0.25,
}) {
  return (
    <div
      className="relative select-none flex items-center justify-center"
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        perspective: 1400,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Rotating Card Container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${flipDeg}deg) translateZ(${isLifted ? 25 : 0}px)`,
          transition: 'box-shadow 0.4s ease, border-radius 0.4s ease',
          borderRadius: `${borderRadius}px`,
          boxShadow: isFramed
            ? `0 ${isLifted ? 30 : 16}px ${isLifted ? 70 : 40}px -10px rgba(37, 42, 39, ${shadowOpacity}), 0 0 0 1px rgba(209, 206, 196, 0.85)`
            : 'none',
        }}
      >
        {/* ==================== FRONT FACE: METALLIC DM MONOGRAM ==================== */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundColor: '#F7F6F2',
            borderRadius: `${borderRadius}px`,
            border: isFramed ? '1px solid #DED9CE' : '1px solid transparent',
          }}
        >
          {/* Subtle Warm Paper Texture Grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Micro Top Header on Identity Card */}
          {isFramed && (
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[8px] font-mono tracking-wider text-[#788477] uppercase z-10">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B96F52]" />
                IDENTITY
              </span>
              <span>FOLIO / 2026</span>
            </div>
          )}

          {/* Centered DM Monogram */}
          <div
            className="relative flex items-center justify-center my-auto"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Ambient Radial Flare */}
            <div
              className="absolute w-44 h-44 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(235,233,225,0.5) 50%, rgba(247,246,242,0) 75%)',
              }}
            />

            {/* D Letter */}
            <div className="relative inline-block">
              <span
                className="absolute inset-0 font-display font-black text-7xl sm:text-8xl leading-none text-[#C8C4B7]/60 select-none blur-[2px]"
                style={{ transform: 'translate3d(3px, 6px, -15px)' }}
                aria-hidden="true"
              >
                D
              </span>
              <span
                className="relative block font-display font-black text-7xl sm:text-8xl leading-none tracking-tighter select-none"
                style={{
                  background: 'linear-gradient(135deg, #1C1E1D 0%, #353A37 38%, #8E9691 52%, #262927 68%, #0F1110 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 14px 20px rgba(32,36,34,0.12))',
                }}
              >
                D
              </span>
            </div>

            {/* M Letter */}
            <div className="relative inline-block -ml-2 sm:-ml-3">
              <span
                className="absolute inset-0 font-display font-black text-7xl sm:text-8xl leading-none text-[#C8C4B7]/60 select-none blur-[2px]"
                style={{ transform: 'translate3d(3px, 6px, -15px)' }}
                aria-hidden="true"
              >
                M
              </span>
              <span
                className="relative block font-display font-black text-7xl sm:text-8xl leading-none tracking-tighter select-none"
                style={{
                  background: 'linear-gradient(135deg, #1C1E1D 0%, #353A37 34%, #9BA39E 48%, #4A514D 60%, #151817 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 14px 20px rgba(32,36,34,0.12))',
                }}
              >
                M
              </span>
            </div>
          </div>

          {/* Micro Bottom Footer on Identity Card */}
          {isFramed && (
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[7px] font-mono tracking-wider text-[#788477] uppercase border-t border-[#DED9CE]/60 pt-2 z-10">
              <span>DEV MISTRY</span>
              <span className="text-[#B96F52]">AUTONOMOUS SYSTEMS</span>
            </div>
          )}
        </div>

        {/* ==================== BACK FACE: REAL PROFILE PHOTOGRAPH ==================== */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-3.5 bg-[#0D1211] overflow-hidden"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: `${borderRadius}px`,
            border: '1px solid rgba(247, 246, 242, 0.15)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95)',
          }}
        >
          {/* Header Metadata matching Hero card */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[8px] tracking-wider text-[#F7F6F2] uppercase px-1">
            <span className="bg-[#050706]/80 px-2 py-0.5 rounded-[1px] border border-white/10 backdrop-blur-sm">
              01 / PROFILE
            </span>
            <span className="text-[#B96F52] text-[7px] font-semibold tracking-widest">
              LIVE
            </span>
          </div>

          {/* Actual Dev Mistry Profile Photograph from Assets */}
          <div className="relative w-full flex-1 my-2 overflow-hidden rounded-[2px] bg-black/40">
            <img
              src="/img/dev_portrait.jpg"
              alt="Dev Mistry"
              className="w-full h-full object-cover filter contrast-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom Callout matching Hero card */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[8px] tracking-wider uppercase px-1">
            <span className="text-[#788477]">DEV MISTRY</span>
            <span className="px-2 py-0.5 rounded-[1px] bg-[#B96F52] text-[#F7F6F2] font-semibold text-[7px] flex items-center gap-1 shadow-sm">
              <span>ABOUT DEV</span>
              <span>→</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
