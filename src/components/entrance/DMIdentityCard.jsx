import React from 'react';
import { motion } from 'framer-motion';

/**
 * DMIdentityCard:
 * Represents the 3D identity card with:
 * - Initially: NO BORDER, just standalone metallic DM letters floating on warm ivory.
 * - Stage 2+: A subtle, elegant rectangular card forms around the monogram.
 * - Stage 3+: 180-degree vertical 3D flip.
 * - Back Face: Dev Mistry's actual profile photograph covering the ENTIRE surface (edge-to-edge, full background cover).
 */
export default function DMIdentityCard({
  flipDeg = 0,
  cardWidth = null,
  cardHeight = null,
  borderRadius = 4,
  isFramed = false,
  isLifted = false,
  onOpenSection = null,
}) {
  const widthStyle = cardWidth ? (typeof cardWidth === 'number' ? `${cardWidth}px` : cardWidth) : '100%';
  const heightStyle = cardHeight ? (typeof cardHeight === 'number' ? `${cardHeight}px` : cardHeight) : '100%';

  return (
    <div
      className="relative select-none flex items-center justify-center w-full h-full"
      style={{
        width: widthStyle,
        height: heightStyle,
        perspective: 1400,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Rotating Card Container */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${flipDeg}deg) translateZ(${isLifted ? 30 : 0}px)`,
          transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
          borderRadius: isFramed ? `${borderRadius}px` : '0px',
          boxShadow: isFramed
            ? isLifted
              ? '0 32px 75px -12px rgba(37, 42, 39, 0.28), 0 0 0 1px #DED9CE'
              : '0 16px 40px -10px rgba(37, 42, 39, 0.14), 0 0 0 1px #DED9CE'
            : 'none',
        }}
      >
        {/* ==================== FRONT FACE: METALLIC DM MONOGRAM ==================== */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden transition-all duration-500"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            backgroundColor: isFramed ? '#F7F6F2' : 'transparent',
            borderRadius: isFramed ? `${borderRadius}px` : '0px',
            border: isFramed ? '1px solid #DED9CE' : '1px solid transparent',
          }}
        >
          {/* Subtle Warm Paper Texture Grain Overlay (visible when framed) */}
          {isFramed && (
            <div
              className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply transition-opacity duration-500"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
              }}
            />
          )}

          {/* Micro Top Header on Identity Card (reveals smoothly when framed) */}
          <div
            className={`absolute top-3 left-4 right-4 flex items-center justify-between text-[8px] font-mono tracking-wider text-[#788477] uppercase border-b border-[#DED9CE]/60 pb-2 transition-opacity duration-500 ${
              isFramed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="flex items-center gap-1.5 font-semibold text-[#252A27]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B96F52]" />
              DEV MISTRY
            </span>
            <span>EDITION / 2026</span>
          </div>

          {/* Centered Metallic DM Monogram with Brand Identity Reveal & Light Sheen Sweep */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2.0,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-center justify-center my-auto overflow-hidden px-4 py-2"
            style={{ transformStyle: 'preserve-3d' }}
          >
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
                className="relative block font-display font-black text-7xl sm:text-8xl leading-none tracking-tight select-none"
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
                className="relative block font-display font-black text-7xl sm:text-8xl leading-none tracking-tight select-none"
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

            {/* Subtle Metallic Light Sheen Reflection Sweep */}
            <motion.div
              initial={{ x: '-120%', opacity: 0 }}
              animate={{ x: '180%', opacity: [0, 0.65, 0.65, 0] }}
              transition={{
                duration: 1.8,
                delay: 1.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                background: 'linear-gradient(105deg, transparent 20%, rgba(255, 255, 255, 0.85) 50%, transparent 80%)',
                transform: 'skewX(-20deg)',
              }}
            />
          </motion.div>

          {/* Micro Bottom Footer on Identity Card (reveals smoothly when framed) */}
          <div
            className={`absolute bottom-3 left-4 right-4 flex items-center justify-between text-[7px] font-mono tracking-wider text-[#788477] uppercase border-t border-[#DED9CE]/60 pt-2 transition-opacity duration-500 ${
              isFramed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span>IDENTITY FOLIO</span>
            <span className="text-[#B96F52] font-semibold">01 / PROFILE</span>
          </div>
        </div>

        {/* ==================== BACK FACE: REAL PROFILE PHOTO (FULL EDGE-TO-EDGE COVER) ==================== */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: `${borderRadius}px`,
            border: '1px solid #DED9CE',
            boxShadow: '0 25px 60px rgba(37, 42, 39, 0.35)',
          }}
        >
          {/* Full background coverage with Dev Mistry's actual profile portrait */}
          <img
            src="/img/dev_portrait.jpg"
            alt="Dev Mistry"
            className="w-full h-full object-cover"
            style={{
              objectPosition: 'center 20%', // Centers face perfectly
            }}
          />

          {/* Subtle Editorial Top Tag */}
          <div className="absolute top-2.5 left-2.5 font-mono text-[8px] tracking-wider text-[#252A27] bg-[#F7F6F2]/90 px-2 py-0.5 backdrop-blur-sm rounded-[1px] border border-[#DED9CE] uppercase">
            01 / PROFILE
          </div>

          {/* Subtle Editorial Bottom Callout */}
          <div className="absolute bottom-3 right-3 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenSection) onOpenSection('about');
              }}
              className="font-mono text-[8px] tracking-wider uppercase px-2.5 py-1 rounded-[1px] border border-[#DED9CE] bg-[#F7F6F2]/90 text-[#252A27] hover:border-[#B96F52] hover:bg-[#B96F52] hover:text-[#F7F6F2] hover:font-semibold transition-all shadow-sm cursor-pointer flex items-center gap-1"
            >
              <span>ABOUT DEV →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
