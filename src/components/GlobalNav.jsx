export default function GlobalNav({ currentSection = 0, onNavigate }) {
  const sections = ['HOME', 'WORK', 'CONTACT'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between text-ivory pointer-events-none select-none">
      {/* LEFT: DEV MISTRY */}
      <div className="pointer-events-auto">
        <button
          onClick={() => onNavigate(0)}
          className="font-display font-bold text-sm tracking-widest text-ivory hover:text-ivory-secondary transition-colors"
        >
          DEV MISTRY
        </button>
      </div>

      {/* CENTER: WEB / CLOUD / AGENTIC AI */}
      <div className="hidden md:block font-mono text-[10px] tracking-[0.25em] text-olive uppercase">
        WEB / CLOUD / AGENTIC AI
      </div>

      {/* RIGHT: NAVIGATION + SECTION INDEX */}
      <div className="flex items-center gap-8 pointer-events-auto">
        <nav className="flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] text-ivory-muted uppercase">
          {sections.map((sec, idx) => (
            <button
              key={sec}
              onClick={() => onNavigate(idx)}
              className={`transition-colors duration-200 ${
                currentSection === idx ? 'text-ivory font-medium' : 'hover:text-ivory'
              }`}
            >
              {sec}
            </button>
          ))}
        </nav>

        {/* 01 / 03 Indicator */}
        <div className="font-mono text-[10px] tracking-widest text-ivory border-l border-white/10 pl-6">
          0{currentSection + 1} / 03
        </div>
      </div>
    </header>
  );
}

