import { motion } from 'framer-motion';

const nodes = [
  { id: 'web', label: 'WEB', x: 0, y: 0, color: 'electric' },
  { id: 'cloud', label: 'CLOUD', x: 120, y: 0, color: 'violet' },
  { id: 'ai', label: 'AI', x: 60, y: 80, color: 'cyan' },
];

export default function SystemNodes() {
  return (
    <div className="relative w-full h-64 mt-8">
      {/* SVG connections */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {nodes.map((a, i) =>
          nodes.slice(i + 1).map((b) => (
            <line
              key={`${a.id}-${b.id}`}
              x1={a.x + 30}
              y1={a.y + 30}
              x2={b.x + 30}
              y2={b.y + 30}
              stroke="currentColor"
              strokeWidth="1"
              className="text-electric/30"
              strokeDasharray="4 4"
            />
          ))
        )}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute w-10 h-10 rounded-lg border flex items-center justify-center font-mono text-[8px] font-bold"
          style={{
            left: node.x,
            top: node.y,
            borderColor: `var(--tw-${node.color})`,
            backgroundColor: 'rgba(11, 14, 19, 0.8)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: node.x * 0.01 + node.y * 0.01 + 3 }}
          data-cursor={node.label}
        >
          <motion.span
            className="block w-2 h-2 rounded-full mb-1"
            style={{ backgroundColor: `var(--tw-${node.color})` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {node.label}
        </motion.div>
      ))}
    </div>
  );
}
