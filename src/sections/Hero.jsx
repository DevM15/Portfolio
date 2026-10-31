import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import SystemNodes from '../components/SystemNodes';

const WORDS = ['BUILDING', 'INTELLIGENT', 'SYSTEMS.'];

export default function Hero() {
  const controls = useAnimation();
  const [ready, setReady] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1200);
    // Entrance sequence
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    });
    return () => clearTimeout(t);
  }, [controls]);

  // Repeated text background
  const repeatedWords = ['WEB', 'CLOUD', 'AI', 'AGENT', 'SYSTEM', 'CODE'];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-ink overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink to-[#030406]" />

      {/* Repeated text background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-repeat text-[12vw] font-display font-bold opacity-5">
          WEB
        </div>
        <div className="absolute top-40 right-10 text-repeat text-[10vw] font-display font-bold opacity-5 rotate-180">
          AGENT
        </div>
        <div className="absolute bottom-20 left-16 text-repeat text-[14vw] font-display font-bold opacity-5">
          SYSTEM
        </div>
        <div className="absolute top-60 left-1/2 -translate-x-1/2 text-repeat text-[8vw] font-display font-bold opacity-5">
          CLOUD
        </div>
        <div className="absolute bottom-10 right-20 text-repeat text-[9vw] font-display font-bold opacity-5">
          CODE
        </div>
      </div>

      {/* Gradient line travel */}
      <motion.div
        className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent"
        initial={{ width: '0%', opacity: 0 }}
        animate={{ width: '100%', opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 3.5, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <span className="section-num mb-4 block">DEV MISTRY</span>
            <div className="flex items-center gap-3 mb-12">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono text-success">AVAILABLE FOR WORK</span>
            </div>
          </motion.div>

          {/* Headline - word by word */}
          <motion.h1
            className="text-display-2xl font-display font-bold text-white leading-[0.9] mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              BUILDING
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              INTELLIGENT
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
            >
              SYSTEMS.
            </motion.span>
          </motion.h1>

          {/* Subhead */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mb-8"
          >
            <p className="text-text-muted text-lg mb-6">
              Software Engineer — Web Development · Cloud · Agentic AI
            </p>
            <p className="text-text-muted text-base max-w-md leading-relaxed">
              I build scalable web applications, cloud infrastructure and autonomous AI systems.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            className="flex items-center gap-8 mb-12"
          >
            <a
              href="#selected-systems"
              data-cursor="VIEW"
              className="inline-flex items-center gap-2 text-sm font-mono text-electric hover:text-white transition-colors duration-200 group"
            >
              <span className="w-5 h-px bg-electric group-hover:w-10 transition-all duration-300" />
              VIEW WORK
            </a>
            <a
              href="#agent-lab"
              data-cursor="AGENT"
              className="inline-flex items-center gap-2 text-sm font-mono text-electric hover:text-white transition-colors duration-200 group"
            >
              <span className="w-5 h-px bg-electric group-hover:w-10 transition-all duration-300" />
              EXPLORE AGENTS
            </a>
          </motion.div>

          {/* Status bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-8 text-xs font-mono text-text-muted">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse" />
                <span>SYSTEM ONLINE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan">03</span>
                <span>ACTIVE SERVICES</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-violet">99.9</span>
                <span>UPTIME</span>
              </div>
            </div>
          </motion.div>

          {/* System nodes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="hidden lg:block"
          >
            <SystemNodes />
          </motion.div>
        </div>

        {/* Photo area */}
        <div className="relative flex items-start justify-end">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="relative"
          >
            {/* Technical labels around photo */}
            <div className="absolute -top-4 -left-8 text-xs font-mono text-text-muted">
              DEV MISTRY
            </div>
            <div className="absolute -top-4 -right-4 text-xs font-mono text-text-muted">
              SOFTWARE ENGINEER
            </div>
            <div className="absolute -bottom-4 -left-4 text-xs font-mono text-text-muted">
              INDIA
            </div>
            <div className="absolute -bottom-4 -right-8 text-xs font-mono text-text-muted">
              2026
            </div>

            {/* Photo container */}
            <div
              className={`relative w-[320px] h-[480px] lg:w-[380px] lg:h-[560px] rounded-[24px] overflow-hidden border-2 transition-all duration-700 ${
                photoLoaded
                  ? 'border-electric/30 opacity-100'
                  : 'border-transparent opacity-50'
              }`}
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 rounded-[25px] z-0 opacity-0 transition-opacity duration-700 peer-hover:opacity-100">
                <div className="absolute -inset-0.5 rounded-[24px] bg-gradient-to-r from-electric via-violet to-cyan opacity-40 blur" />
              </div>

              {/* Image placeholder */}
              <div
                className="absolute inset-2 rounded-[22px] overflow-hidden bg-ink-surface border border-white/5 flex items-center justify-center transition-all duration-700"
              >
                {!photoLoaded && (
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-white/10 flex items-center justify-center">
                      <span className="text-xs font-mono text-text-muted">📷</span>
                    </div>
                    <p className="text-xs font-mono text-text-muted">
                      [ PERSONAL PORTRAIT ]
                    </p>
                  </div>
                )}
                <img
                  src="/img/placeholder.svg"
                  alt="DEV MISTRY"
                  onLoad={() => setPhotoLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    photoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ display: photoLoaded ? 'block' : 'none' }}
                />
              </div>
            </div>

            {/* Coordinate-style metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.2 }}
              className="absolute top-1/2 -right-16 lg:-right-20 transform -translate-y-1/2 writing-mode-vertical text-xs font-mono text-text-muted"
            >
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-electric" />
                <span>COORD: 22.5726° N, 88.3612° E</span>
              </div>
            </motion.div>

            {/* Gradient line travels */}
            <motion.div
              className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-px h-40 bg-gradient-to-b from-electric to-transparent opacity-40"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: '10rem', opacity: 0.4 }}
              transition={{ duration: 1.5, delay: 3.5 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-text-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.5 }}
      >
        <span className="text-[10px] font-mono mb-2">SCROLL TO EXPLORE</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-electric to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
