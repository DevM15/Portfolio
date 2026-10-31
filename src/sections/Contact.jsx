import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 max-w-[1700px] mx-auto bg-[#080809] border-t border-white/10"
    >
      <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-stone-500 mb-8">
        <span>[ 03 ]</span>
        <span>COMMISSIONS & INQUIRIES</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <h2 className="text-display-section font-display font-medium text-white tracking-tight uppercase leading-[0.95] mb-8">
            LET'S CONCEIVE
            <br />
            <span className="text-stone-500">YOUR NEXT</span> SYSTEM.
          </h2>

          <p className="text-stone-400 font-sans text-base md:text-xl font-light leading-relaxed max-w-2xl mb-12">
            Available for architectural consulting, AI agent workflow deployments, and resilient cloud systems.
          </p>

          <a
            href="mailto:devmistry1510@gmail.com"
            className="inline-flex items-center gap-4 text-2xl md:text-4xl font-display text-white border-b-2 border-white pb-2 hover:text-stone-400 hover:border-stone-400 transition-colors"
          >
            devmistry1510@gmail.com
            <span className="text-xl md:text-2xl">↗</span>
          </a>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-between pt-4 lg:border-l border-white/10 lg:pl-12">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-stone-600 block uppercase mb-4">
              STUDIO CHANNELS
            </span>
            <div className="flex flex-col space-y-4 font-mono text-xs">
              <a
                href="https://github.com/DevM15"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-stone-400 hover:text-white transition-colors py-2 border-b border-white/[0.05]"
              >
                <span>GITHUB / DEVM15</span>
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/dev-mistry-828586298/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-stone-400 hover:text-white transition-colors py-2 border-b border-white/[0.05]"
              >
                <span>LINKEDIN / DEV-MISTRY</span>
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://x.com/DevM15"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-stone-400 hover:text-white transition-colors py-2 border-b border-white/[0.05]"
              >
                <span>X / TWITTER</span>
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>

          <div className="mt-12 font-mono text-[10px] text-stone-600 tracking-wider">
            RESPONSE TIMEFRAME: WITHIN 24 HOURS
          </div>
        </div>
      </div>
    </section>
  );
}
