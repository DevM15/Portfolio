import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-[#080809] border-t border-white/10 py-12 px-6 md:px-12">
      <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-stone-500">
        <div className="flex items-center gap-4">
          <span className="font-display font-medium text-white text-sm">DEV MISTRY</span>
          <span>© 2026 ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex items-center gap-6 text-[11px] tracking-widest uppercase">
          <span>DESIGN INSPIRED BY KERIMOV ARCHITECTS</span>
          <span className="text-stone-700">/</span>
          <span>EDITORIAL MINIMALISM</span>
        </div>

        <div className="flex items-center gap-4 text-stone-400">
          <a
            href="https://github.com/DevM15"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/dev-mistry-828586298/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://x.com/DevM15"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
        </div>
      </div>
    </footer>
  );
}
