import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-screen bg-ink py-20 overflow-hidden"
    >
      {/* Slowly moving gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, #3B82F622 0%, transparent 50%), radial-gradient(circle at 70% 50%, #8B5CF622 0%, transparent 50%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-num mb-6 block">09_Contact</span>
        </div>

        {/* Headline */}
        <motion.h2
          className="text-display-2xl font-display font-bold text-white leading-[0.95] mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          HAVE A
          <br />
          SYSTEM
          <br />
          TO BUILD?
        </motion.h2>

        <motion.p
          className="text-text-muted text-lg max-w-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Let's turn the idea into something intelligent, scalable and
          deployable.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.a
            href="mailto:devmistry1501@gmail.com"
            data-cursor="→"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-electric via-violet to-cyan text-white font-display font-semibold rounded-[16px] shadow-2xl shadow-electric/20 text-lg group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            START A CONVERSATION
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-sm group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.a>

          <motion.a
            href="https://github.com/DevM15"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="GH"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 rounded-[16px] text-sm font-mono transition-colors duration-200"
            whileHover={{ y: -2 }}
          >
            <FontAwesomeIcon icon={faGithub} className="text-lg" />
            GITHUB
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/dev-mistry-828586298/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="LI"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/30 rounded-[16px] text-sm font-mono transition-colors duration-200"
            whileHover={{ y: -2 }}
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-lg text-electric" />
            LINKEDIN
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
