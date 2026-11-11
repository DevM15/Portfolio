import { motion } from 'framer-motion';

/**
 * Subtle Digital Workspace Elements
 * Architectural grid ticks, miniature coordinate tags, floating subtle card outlines,
 * and delicate telemetry that briefly emerge during the portal expansion without clutter.
 */
export default function EntranceWorkspaceDetails({
  isActivating = false,
  isPortalOpen = false,
}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Precision Corner Metric Ticks */}
      <motion.div
        className="absolute top-10 left-10 text-[9px] font-mono tracking-[0.25em] text-[#A6A296] hidden md:block select-none"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: isActivating ? 0.9 : 0.4, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="block text-[#1C1E1D] font-bold">LAT 19.0760° N // LON 72.8777° E</span>
        <span className="block text-[8px] text-[#8C877B] mt-0.5">DEV MISTRY • DESIGN & CODE ARCHIVES</span>
      </motion.div>

      <motion.div
        className="absolute top-10 right-10 text-[9px] font-mono tracking-[0.25em] text-[#A6A296] text-right hidden md:block select-none"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: isActivating ? 0.9 : 0.4, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="block text-[#1C1E1D] font-bold">DIMENSION / 03 AXIS</span>
        <span className="block text-[8px] text-[#8C877B] mt-0.5">SPEC // 2026 EDITION</span>
      </motion.div>

      {/* Floating Minimal Architectural Wireframes (emerge on portal open) */}
      {isPortalOpen && (
        <>
          {/* Left Satellite Blueprint Outline */}
          <motion.div
            className="absolute left-[10%] top-1/2 -translate-y-1/2 w-44 h-60 rounded-[2px] border border-[#D5D2C7] p-3 hidden lg:flex flex-col justify-between"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 0.7, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between text-[8px] font-mono text-[#8C877B]">
              <span>NODE_01</span>
              <span>[REACT // MOTION]</span>
            </div>
            <div className="space-y-1.5 py-4">
              <div className="h-1 bg-[#E2DFD6] w-3/4 rounded-full" />
              <div className="h-1 bg-[#E2DFD6] w-1/2 rounded-full" />
              <div className="h-1 bg-[#E2DFD6] w-5/6 rounded-full" />
            </div>
            <div className="text-[7px] font-mono text-[#A6A296] border-t border-[#E8E5DD] pt-1.5">
              ORBITAL CYLINDER ENGINE
            </div>
          </motion.div>

          {/* Right Satellite Blueprint Outline */}
          <motion.div
            className="absolute right-[10%] top-1/2 -translate-y-1/2 w-44 h-60 rounded-[2px] border border-[#D5D2C7] p-3 hidden lg:flex flex-col justify-between"
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 0.7, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between text-[8px] font-mono text-[#8C877B]">
              <span>SYSTEM</span>
              <span>12 OBJECTS</span>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="w-16 h-16 rounded-full border border-dashed border-[#B8B4A8] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-[#8C877B]" />
              </div>
            </div>
            <div className="text-[7px] font-mono text-[#A6A296] border-t border-[#E8E5DD] pt-1.5 text-right">
              CAMERA @ (0, 0, 0)
            </div>
          </motion.div>
        </>
      )}

      {/* Subtle Bottom Status Axis */}
      <motion.div
        className="absolute bottom-8 left-10 text-[9px] font-mono tracking-[0.25em] text-[#8C877B] hidden sm:block select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8 }}
      >
        <span>STANDBY MODE</span>
        <span className="mx-2">•</span>
        <span>READY FOR TRANSIT</span>
      </motion.div>
    </div>
  );
}
