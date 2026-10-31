import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const commands = [
  { type: 'input', text: '$ systemctl status agents' },
  { type: 'service', name: 'orchestrator.service', status: 'ACTIVE', color: 'electric' },
  { type: 'service', name: 'research-agent.service', status: 'ACTIVE', color: 'cyan' },
  { type: 'service', name: 'coding-agent.service', status: 'ACTIVE', color: 'violet' },
  { type: 'service', name: 'qa-agent.service', status: 'ACTIVE', color: 'success' },
  { type: 'blank' },
  { type: 'input', text: '$ aws infrastructure --status' },
  { type: 'infra', name: 'COMPUTE', status: 'ONLINE', color: 'violet' },
  { type: 'infra', name: 'DATABASE', status: 'ONLINE', color: 'cyan' },
  { type: 'infra', name: 'STORAGE', status: 'ONLINE', color: 'aws' },
  { type: 'infra', name: 'AI SERVICES', status: 'ONLINE', color: 'electric' },
];

export default function Terminal() {
  const controls = useAnimation();
  const [visibleLines, setVisibleLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const timer = setTimeout(() => {
      if (lineIndex < commands.length) {
        setVisibleLines((prev) => [...prev, commands[lineIndex]]);
        setLineIndex((prev) => prev + 1);
      }
    }, lineIndex < 6 ? 400 : 300);

    return () => clearTimeout(timer);
  }, [inView, lineIndex]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-ink py-20"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12">
          <span className="section-num mb-6 block">08_Terminal</span>
          <h2 className="text-display-xl font-display font-bold text-white">
            SYSTEM
            <br />
            STATUS
          </h2>
        </div>

        <motion.div
          className="glass-card rounded-[24px] p-8 border border-white/5 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 pb-4 border-b border-white/5 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="ml-auto text-xs font-mono text-text-muted">
              dev@cloud-engineer.local
            </span>
          </div>

          {/* Terminal output */}
          <div className="font-mono text-sm space-y-1 min-h-[200px]">
            {visibleLines.map((line, i) => (
              <TerminalLine key={i} line={line} isLast={i === visibleLines.length - 1} />
            ))}

            {visibleLines.length === commands.length && (
              <motion.div
                className="mt-6 pt-4 border-t border-white/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-success font-mono">✓ All services operational</span>
              </motion.div>
            )}

            {/* Cursor on empty input line */}
            {visibleLines.length < commands.length &&
              (commands[visibleLines.length]?.type === 'blank' || true) && (
                <motion.div
                  className="text-electric"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showCursor ? 1 : 0 }}
                >
                  DEV@MISTRY:~$ <span className="inline-block w-2 h-4 bg-electric animate-blink" />
                </motion.div>
              )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TerminalLine({ line, isLast }) {
  const colorMap = {
    electric: 'text-electric',
    cyan: 'text-cyan',
    violet: 'text-violet',
    success: 'text-success',
    aws: 'text-aws',
  };

  if (line.type === 'blank') {
    return <div className="h-4" />;
  }

  if (line.type === 'input') {
    return (
      <motion.div
        className="text-text-muted flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <span>{line.text}</span>
        <motion.span
          className="ml-2 w-2 h-4 bg-electric inline-block animate-blink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </motion.div>
    );
  }

  if (line.type === 'service' || line.type === 'infra') {
    return (
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>{line.name}</span>
        </span>
        <span className={`${colorMap[line.color]} font-mono`}>
          {line.status}
        </span>
      </motion.div>
    );
  }

  return null;
}
