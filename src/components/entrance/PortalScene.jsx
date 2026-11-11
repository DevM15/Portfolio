import { motion } from 'framer-motion';

/**
 * Architectural Digital Portal Scene
 * Forms an elegant rectangular/curved doorway between the separating D and M letters.
 * Inside the portal, displays a pristine, live-styled miniature preview of the real portfolio hero:
 * including real portfolio items, Dev's portrait card, editorial headers, and coordinate ticks.
 */
export default function PortalScene({
  isPortalOpen = false,
  isTransitioning = false,
}) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isPortalOpen ? 1 : 0,
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Expanding Architectural Doorway / Portal Frame */}
      <motion.div
        className="relative overflow-hidden rounded-sm"
        animate={{
          width: isTransitioning ? '100vw' : isPortalOpen ? '320px' : '0px',
          height: isTransitioning ? '100vh' : isPortalOpen ? '440px' : '0px',
          borderRadius: isTransitioning ? '0px' : '4px',
          boxShadow: isPortalOpen
            ? '0 30px 90px -20px rgba(37, 42, 39, 0.25), 0 0 0 1px rgba(209, 206, 196, 0.85), inset 0 0 0 1px rgba(255, 255, 255, 0.6)'
            : 'none',
        }}
        transition={{
          width: { duration: isTransitioning ? 1.25 : 0.9, ease: [0.16, 1, 0.3, 1] },
          height: { duration: isTransitioning ? 1.25 : 0.9, ease: [0.16, 1, 0.3, 1] },
          borderRadius: { duration: 0.8 },
          boxShadow: { duration: 0.8 },
        }}
        style={{
          background: '#050706', // Seamlessly matches the actual portfolio background
        }}
      >
        {/* Fine Architectural Precision Corner Brackets on the Portal */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#788477]/80 z-30" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#788477]/80 z-30" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#788477]/80 z-30" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#788477]/80 z-30" />

        {/* Portal Atmosphere - Atmospheric horizon glow */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-70"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(185, 111, 82, 0.12) 0%, rgba(5, 7, 6, 0.95) 75%)',
          }}
        />

        {/* Real Portfolio Content Miniature Preview inside the Portal */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-20 select-none overflow-hidden text-[#F7F6F2]">
          {/* Header Preview */}
          <div className="flex items-center justify-between text-[8px] font-mono tracking-wider text-[#788477] border-b border-[#2A302C]/60 pb-2">
            <span>DEV MISTRY // 2026</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B96F52] animate-pulse" />
              <span>LIVE CORE</span>
            </div>
          </div>

          {/* Center 3D Cylinder Mini Preview Cards */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            {/* Left Card Silhouette */}
            <div
              className="absolute left-2 w-20 h-28 bg-[#111513] border border-[#2A302C] rounded-sm opacity-60 overflow-hidden"
              style={{
                transform: 'perspective(400px) rotateY(24deg) scale(0.85)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=70"
                alt=""
                className="w-full h-full object-cover filter grayscale contrast-125 opacity-40"
              />
            </div>

            {/* Center Dev Portrait Hero Card */}
            <div
              className="relative w-28 h-40 bg-[#161B18] border border-[#B96F52]/60 rounded-sm shadow-2xl z-10 overflow-hidden flex flex-col justify-between p-2"
              style={{
                transform: 'perspective(500px) translateZ(20px)',
              }}
            >
              <div className="text-[7px] font-mono text-[#B96F52] tracking-wider">
                01 / PROFILE
              </div>
              <div className="relative w-full h-24 overflow-hidden rounded-[1px] my-1 bg-black/40">
                <img
                  src="/img/dev_portrait.jpg"
                  alt="Dev Mistry"
                  className="w-full h-full object-cover filter contrast-110"
                />
              </div>
              <div className="text-[7px] font-mono text-[#F7F6F2] flex items-center justify-between">
                <span>DEV MISTRY</span>
                <span className="text-[#B96F52]">→</span>
              </div>
            </div>

            {/* Right Card Silhouette */}
            <div
              className="absolute right-2 w-20 h-28 bg-[#121614] border border-[#2A302C] rounded-sm opacity-60 overflow-hidden"
              style={{
                transform: 'perspective(400px) rotateY(-24deg) scale(0.85)',
              }}
            >
              <img
                src="./img/project1.png"
                alt=""
                className="w-full h-full object-cover filter grayscale contrast-125 opacity-40"
              />
            </div>
          </div>

          {/* Footer Preview */}
          <div className="flex items-center justify-between text-[7px] font-mono text-[#788477] tracking-[0.12em] border-t border-[#2A302C]/60 pt-2">
            <span>MUMBAI • FULL STACK</span>
            <span>CYLINDER 3D</span>
          </div>
        </div>

        {/* Portal Edge Specular Shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: 'inset 0 0 24px rgba(185, 111, 82, 0.2)',
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
