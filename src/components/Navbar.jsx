import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  const navItems = [
    { label: 'Work', href: '#selected-systems' },
    { label: 'Agent Lab', href: '#agent-lab' },
    { label: 'Cloud', href: '#cloud' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'py-3 bg-ink/80 backdrop-blur-md border-b border-white/5' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-lg tracking-tight">
          <span className="text-gradient">DM</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label)}
              className="text-sm text-text-muted hover:text-text transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-electric transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-mono text-success/90">ONLINE</span>
          </div>
          <a
            href="#contact"
            className="hidden sm:inline-block text-xs font-mono px-4 py-2 rounded-full border border-white/15 hover:border-electric/50 hover:text-electric transition-colors duration-200"
          >
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
}