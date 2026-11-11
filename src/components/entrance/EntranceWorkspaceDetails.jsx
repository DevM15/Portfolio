import { motion } from 'framer-motion';

/**
 * Subtle Digital Workspace Elements
 * Architectural grid ticks and non-overlapping corner telemetry.
 * All ordinary text has been refactored into the structured header/footer flexboxes.
 */
export default function EntranceWorkspaceDetails({
  isActivating = false,
  isPortalOpen = false,
}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Floating Minimal Architectural Wireframes (emerge on portal open) */}
      {isPortalOpen && (
        <>
          {/* Left Satellite Blueprint Outline */}
          <motion.div
            className="absolute left-[8%] top-1/2 -translate-y-1/2 w-44 h-60 rounded-[2px] border border-[#D5D2C7] p-3 hidden lg:flex flex-col justify-between"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 0.7, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between text-[8px] font-mono text-[#788477]">
              <span>NODE_01</span>
              <span>[REACT // MOTION]</span>
            </div>
            <div className="space-y-1.5 py-4">
              <div className="h-1 bg-[#E2DFD6] w-3/4 rounded-full" />
              <div className="h-1 bg-[#E2DFD6] w-1/2 rounded-full" />
              <div className="h-1 bg-[#E2DFD6] w-5/6 rounded-full" />
            </div>
            <div className="text-[7px] font-mono text-[#788477] border-t border-[#E8E5DD] pt-1.5">
              ORBITAL CYLINDER ENGINE
            </div>
          </motion.div>

          {/* Right Satellite Blueprint Outline */}
          <motion.div
            className="absolute right-[8%] top-1/2 -translate-y-1/2 w-44 h-60 rounded-[2px] border border-[#D5D2C7] p-3 hidden lg:flex flex-col justify-between"
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 0.7, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between text-[8px] font-mono text-[#788477]">
              <span>SYSTEM</span>
              <span>12 OBJECTS</span>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="w-16 h-16 rounded-full border border-dashed border-[#B8B4A8] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-[#788477]" />
              </div>
            </div>
            <div className="text-[7px] font-mono text-[#788477] border-t border-[#E8E5DD] pt-1.5 text-right">
              CAMERA @ (0, 0, 0)
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
