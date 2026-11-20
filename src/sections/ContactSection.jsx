import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection({ onOpenMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'Architecture & Cloud',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name && !formData.email && !formData.message) return;

    const subject = encodeURIComponent(
      `[ARCHITECTURAL INQUIRY] ${formData.scope} — from ${formData.name || 'Anonymous'}`
    );
    const body = encodeURIComponent(
      `From: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.scope}\n\nProject Specifications / Note:\n${formData.message}\n\n— Transmitted via Dev Mistry Portfolio`
    );
    window.location.href = `mailto:devmistry1510@gmail.com?subject=${subject}&body=${body}`;
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4500);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center py-6 sm:py-10 px-4 sm:px-8 md:px-14 max-w-[1540px] mx-auto select-none text-[var(--text-primary)]">
      {/* Main Dual-Wing Composition */}
      <div className="grid items-center grid-cols-1 gap-8 py-4 my-auto lg:grid-cols-12 lg:gap-12">
        {/* Left Wing: Architectural Studio Dossier & Direct Access Channels */}
        <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-[2px] font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              TRANSMISSION TERMINAL
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight uppercase text-[var(--text-primary)] leading-[0.92]">
              LET&apos;S ARCHITECT <br />
              <span className="text-[var(--accent)] font-serif italic font-normal lowercase tracking-normal">something</span> RESILIENT.
            </h1>

            <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-md">
              Whether you need scalable cloud microservices, multi-agent LLM reasoning workflows, or full-stack web platforms, send an architectural dispatch directly to my desk.
            </p>
          </motion.div>

          {/* Direct Access Channel Badges */}
          <div className="space-y-2.5 font-mono text-xs w-full max-w-md">
            {/* Channel 1: Primary Email */}
            <a
              href="mailto:devmistry1510@gmail.com"
              className="group flex items-center justify-between p-3.5 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-primary)] hover:border-[var(--accent)] rounded-[3px] transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block font-semibold">
                    DIRECT DISPATCH
                  </span>
                  <span className="text-[var(--text-primary)] group-hover:text-[var(--accent)] font-bold text-xs sm:text-sm transition-colors">
                    devmistry1510@gmail.com
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                ↗
              </span>
            </a>

            {/* Channel 2: LinkedIn & GitHub Split Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="https://www.linkedin.com/in/dev-mistry-828586298/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-primary)] hover:border-[var(--accent)] rounded-[3px] transition-all shadow-xs"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block font-semibold">
                    NETWORK
                  </span>
                  <span className="text-[var(--text-primary)] group-hover:text-[var(--accent)] font-bold text-xs transition-colors">
                    LINKEDIN ↗
                  </span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">CONNECT</span>
              </a>

              <a
                href="https://github.com/DevM15"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-primary)] hover:border-[var(--accent)] rounded-[3px] transition-all shadow-xs"
              >
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block font-semibold">
                    SOURCE CODE
                  </span>
                  <span className="text-[var(--text-primary)] group-hover:text-[var(--accent)] font-bold text-xs transition-colors">
                    GITHUB ↗
                  </span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">REPOS</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Wing: Modern Architectural Dispatch Postcard */}
        <div className="flex justify-center lg:col-span-7 lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[650px] bg-[var(--bg-surface)] border border-[var(--border-primary)] p-6 sm:p-9 rounded-[4px] shadow-2xl"
          >
            {/* Telemetry Stamps (Top Right Header) */}
            <div className="absolute flex items-center gap-3 pointer-events-none select-none top-6 right-6">
              {/* Circular Verification Seal Stamp */}
              <div className="w-16 h-16 rounded-full border border-dashed border-[var(--accent)]/70 text-[var(--accent)] flex flex-col items-center justify-center font-mono text-[7px] font-bold uppercase rotate-[-8deg]">
                <span>MUMBAI</span>
                <span className="text-[6px] tracking-widest opacity-80">VERIFIED</span>
                <span>2026</span>
              </div>

              {/* Serrated Priority Stamp */}
              <div className="w-13 h-12 bg-[var(--accent)] text-[#F7F6F2] p-1.5 flex flex-col justify-between items-center border border-dashed border-[#F7F6F2]/60 shadow-xs rotate-[3deg]">
                <span className="font-mono text-[6px] tracking-wider uppercase font-bold">PRIORITY</span>
                <span className="text-base leading-none">✉</span>
              </div>
            </div>

            {/* Header / Subject */}
            <div className="mb-6 pr-28">

              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[var(--text-primary)]">
                TRANSMISSION BRIEF
              </h3>
              <p className="font-mono text-xs text-[var(--text-secondary)] mt-1">
                To: <strong className="text-[var(--text-primary)]">Dev Mistry</strong> • Software Architect, Mumbai
              </p>
            </div>

            {/* The Message Form */}
            <form onSubmit={handleSubmit} className="grid items-start grid-cols-1 gap-6 md:grid-cols-12">
              {/* Left Column: Ruled Note Writing Surface */}
              <div className="flex flex-col justify-between md:col-span-7">
                <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-1.5 block">
                  PROJECT SPECIFICATIONS / INQUIRY DETAILS:
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Drop a note regarding your project vision, timeline, cloud requirements, or just say hi..."
                  className="w-full bg-transparent border-0 border-b border-[var(--border-primary)] focus:border-[var(--accent)] p-2 font-mono text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none resize-none leading-relaxed transition-colors"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(transparent, transparent 27px, var(--border-subtle) 28px)',
                    lineHeight: '28px',
                  }}
                />
              </div>

              {/* Right Column: Sender Coordinates & Scope */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-4 pt-2 border-t md:border-t-0 md:border-l md:border-[var(--border-subtle)] md:pl-6">
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold block mb-1">
                    FROM (YOUR NAME):
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name / Organization"
                    className="w-full bg-transparent border-b border-[var(--border-primary)] focus:border-[var(--accent)] pb-1.5 font-mono text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold block mb-1">
                    REPLY ADDRESS (EMAIL):
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full bg-transparent border-b border-[var(--border-primary)] focus:border-[var(--accent)] pb-1.5 font-mono text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold block mb-1">
                    PROJECT FOCUS / SCOPE:
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-primary)] focus:border-[var(--accent)] px-2 py-1.5 font-mono text-xs text-[var(--text-primary)] focus:outline-none transition-colors rounded-[2px]"
                  >
                    <option value="Full-Stack Web & Next.js">Full-Stack Web & Next.js</option>
                    <option value="Cloud Architecture & AWS">Cloud Architecture & AWS</option>
                    <option value="Agentic AI & LLM Systems">Agentic AI & LLM Systems</option>
                    <option value="Contract / Full-Time Role">Contract / Full-Time Role</option>
                    <option value="General Conversation">General Conversation</option>
                  </select>
                </div>

                {/* Dispatch Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[#F7F6F2] font-mono text-xs uppercase tracking-widest font-bold rounded-[3px] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isSent ? 'DISPATCH TRANSMITTED ✓' : 'TRANSMIT MESSAGE →'}</span>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
