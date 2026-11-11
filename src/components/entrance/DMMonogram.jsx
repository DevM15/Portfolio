import { motion } from 'framer-motion';

/**
 * Architectural 3D Sculptural DM Monogram
 * Crafted with multi-layered metallic bevels, specular lighting reflections,
 * dynamic drop shadows, and delicate architectural dimension.
 */
export default function DMMonogram({
  isActivating = false,
  isPortalOpen = false,
  isHovered = false,
}) {
  return (
    <div
      className="relative select-none flex items-center justify-center p-4 sm:p-8"
      style={{ perspective: 1200 }}
    >
      {/* Ambient Radial Illumination behind Monogram */}
      <motion.div
        className="absolute w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(235,233,225,0.45) 50%, rgba(247,246,242,0) 70%)',
        }}
        animate={{
          scale: isPortalOpen ? 2.5 : isHovered ? 1.15 : 1,
          opacity: isPortalOpen ? 0.9 : 0.6,
        }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Subtle Geometric Orbit Ring on Monogram */}
      <motion.div
        className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] rounded-full border border-[#D1CEC4]/50 pointer-events-none"
        animate={{
          rotate: isActivating ? 180 : 0,
          scale: isActivating ? 1.4 : isHovered ? 1.05 : 1,
          opacity: isActivating ? 0.2 : 0.55,
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Main 3D Monogram Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Letter D */}
        <motion.div
          className="relative inline-block"
          style={{ transformOrigin: 'right center' }}
          animate={{
            x: isPortalOpen ? -140 : isActivating ? -36 : isHovered ? -6 : 0,
            y: isActivating ? -12 : 0,
            rotateY: isActivating ? -16 : isHovered ? -4 : 0,
            rotateZ: isActivating ? -4 : 0,
            scale: isPortalOpen ? 1.15 : 1,
          }}
          transition={{
            duration: isPortalOpen ? 1.1 : 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Depth Extrusion Shadow Layer */}
          <span
            className="absolute inset-0 font-display font-black text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11rem] leading-none text-[#C8C4B7]/60 select-none blur-[2px]"
            style={{
              transform: 'translate3d(4px, 8px, -20px)',
            }}
            aria-hidden="true"
          >
            D
          </span>

          {/* Primary Sculptural Letter Face */}
          <span
            className="relative block font-display font-black text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11rem] leading-none tracking-tighter select-none"
            style={{
              background: 'linear-gradient(135deg, #1C1E1D 0%, #353A37 38%, #8E9691 52%, #262927 68%, #0F1110 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 18px 24px rgba(32,36,34,0.12))',
            }}
          >
            D
          </span>

          {/* Precision Specular Edge Highlight Overlay */}
          <span
            className="absolute inset-0 font-display font-black text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11rem] leading-none tracking-tighter select-none pointer-events-none mix-blend-overlay opacity-60"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            aria-hidden="true"
          >
            D
          </span>
        </motion.div>

        {/* Letter M */}
        <motion.div
          className="relative inline-block -ml-2 sm:-ml-4 md:-ml-5"
          style={{ transformOrigin: 'left center' }}
          animate={{
            x: isPortalOpen ? 140 : isActivating ? 36 : isHovered ? 6 : 0,
            y: isActivating ? 12 : 0,
            rotateY: isActivating ? 16 : isHovered ? 4 : 0,
            rotateZ: isActivating ? 4 : 0,
            scale: isPortalOpen ? 1.15 : 1,
          }}
          transition={{
            duration: isPortalOpen ? 1.1 : 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Depth Extrusion Shadow Layer */}
          <span
            className="absolute inset-0 font-display font-black text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11rem] leading-none text-[#C8C4B7]/60 select-none blur-[2px]"
            style={{
              transform: 'translate3d(4px, 8px, -20px)',
            }}
            aria-hidden="true"
          >
            M
          </span>

          {/* Primary Sculptural Letter Face */}
          <span
            className="relative block font-display font-black text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11rem] leading-none tracking-tighter select-none"
            style={{
              background: 'linear-gradient(135deg, #1C1E1D 0%, #353A37 34%, #9BA39E 48%, #4A514D 60%, #151817 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 18px 24px rgba(32,36,34,0.12))',
            }}
          >
            M
          </span>

          {/* Metallic Silver Center Apex Accent */}
          <motion.span
            className="absolute inset-0 font-display font-black text-6xl sm:text-8xl md:text-[9.5rem] lg:text-[11rem] leading-none tracking-tighter select-none pointer-events-none mix-blend-color-dodge"
            animate={{
              opacity: isActivating ? 0.85 : isHovered ? 0.45 : 0.25,
            }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.95) 50%, transparent 60%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            aria-hidden="true"
          >
            M
          </motion.span>
        </motion.div>
      </div>

      {/* Floating Center Axis Coordinate Pip (Active during activation) */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-[#252A27] border border-white/80 pointer-events-none"
        animate={{
          scale: isActivating ? [0, 1.4, 1] : 0,
          opacity: isActivating ? 0.8 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
