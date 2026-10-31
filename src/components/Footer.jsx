import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="relative bg-ink-surface border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <span className="font-display font-bold text-xl text-gradient">
              DM
            </span>
            <div className="hidden sm:block text-sm text-text-muted">
              <p>Built with React, Tailwind, Framer Motion</p>
              <p className="font-mono text-xs mt-1">v2026.1 • Open Source</p>
            </div>
          </div>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="https://github.com/DevM15"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-electric transition-colors duration-200"
              data-cursor="GH"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/dev-mistry-828586298/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-electric transition-colors duration-200"
              data-cursor="LI"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a
              href="https://x.com/DevM15"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-muted hover:text-electric transition-colors duration-200"
              data-cursor="TW"
            >
              <FontAwesomeIcon icon={faXTwitter} size="lg" />
            </a>
            <a
              href="mailto:devmistry1501@gmail.com"
              className="p-2 text-text-muted hover:text-electric transition-colors duration-200"
              data-cursor="EM"
            >
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
            </a>
          </motion.div>

          <div className="text-sm text-text-muted text-center md:text-right">
            <p>© 2026 Dev Mistry. All rights reserved.</p>
            <p className="font-mono text-xs mt-1">dev@cloud-engineer.local</p>
          </div>
        </div>
      </div>
    </footer>
  );
}