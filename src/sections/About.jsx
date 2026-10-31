import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });

  const yRange = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={imageRef}
      id="about"
      className="relative min-h-screen bg-ink py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Headline */}
          <div>
            <span className="section-num mb-6 block">02_About</span>
            <motion.h2
              className="text-display-xl font-display font-bold text-white leading-[0.9]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              ENGINEERED
              <br />
              WITH
              <br />
              CURIOSITY.
            </motion.h2>

            <motion.p
              className="mt-8 text-text-muted text-lg leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              I enjoy turning complex technical problems into software that is simple to use, scalable to operate and intelligent enough to automate meaningful work.
            </motion.p>

            {/* Metadata tags */}
            <motion.div
              className="mt-12 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-electric" />
                <span className="text-text-muted">SOFTWARE ENGINEER</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                <span className="text-text-muted">INDIA</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-violet" />
                <span className="text-text-muted">FULLSTACK · CLOUD · AI</span>
              </div>
            </motion.div>
          </div>

          {/* Photo area - asymmetrical */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div
              className="relative w-[280px] h-[420px] lg:w-[320px] lg:h-[480px] rounded-[24px] overflow-hidden border-2 border-electric/20 bg-ink-surface"
              style={{ y: yRange }}
              data-cursor="ABOUT"
            >
              {/* Photo placeholder - for user to replace later */}
              <img
                src="/img/placeholder.svg"
                alt="DEV MISTRY"
                className="w-full h-full object-cover opacity-60"
              />
              {/* Replace with actual img when available */}
              {/* <img src="/img/portrait.jpg" alt="Dev Mistry" className="w-full h-full object-cover" /> */}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Repeated text background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <div className="text-repeat text-[16vw] font-display font-bold opacity-2 text-center">
          BUILD · SCALE · AUTOMATE · BUILD · SCALE · AUTOMATE
        </div>
      </div>
    </section>
  );
}