import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'PROJECTS', href: '#projects' },
    { label: 'PHILOSOPHY', href: '#about' },
    { label: 'LAB & ARCHITECTURE', href: '#agent-lab' },
    { label: 'CAPABILITIES', href: '#skills' },
    { label: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-[#080809]/90 backdrop-blur-md border-b border-white/[0.08]'
          : 'py-7 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Studio / Portfolio Monogram */}
        <a href="#top" className="flex items-baseline gap-3 group">
          <span className="font-display font-medium text-lg md:text-xl tracking-tight text-white group-hover:text-stone-300 transition-colors">
            DEV MISTRY
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest text-text-muted uppercase">
            / STUDIO & ARCHITECTURE
          </span>
        </a>

        {/* Minimal Editorial Nav Links */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-text-muted hover:text-white transition-colors duration-200"
            >
              <span className="text-[9px] text-stone-600 group-hover:text-stone-400 transition-colors">
                0{idx + 1}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Status / Location Stamp */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-stone-400 border border-white/10 px-3.5 py-1.5 rounded-full bg-white/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden md:inline">STUDIO ACTIVE • 2026</span>
            <span className="md:hidden">ACTIVE</span>
          </div>

          <a
            href="#contact"
            className="hidden sm:inline-block font-mono text-[11px] tracking-[0.16em] uppercase px-4 py-1.5 bg-white text-black hover:bg-stone-200 transition-colors duration-200"
          >
            INQUIRE
          </a>
        </div>
      </div>
    </header>
  );
}
