import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const agents = [
  {
    id: 'orchestrator',
    name: 'ORCHESTRATOR',
    description: 'Central coordinator that plans task decomposition and resource allocation.',
    status: 'ACTIVE',
    tools: ['Task Planner', 'Resource Scheduler'],
    position: { x: 50, y: 50 },
    connections: ['research', 'coding', 'analysis'],
  },
  {
    id: 'research',
    name: 'RESEARCH',
    description: 'Gathers information from the web, documents, and APIs.',
    status: 'IDLE',
    tools: ['Web Search', 'Document Reader', 'API Client'],
    position: { x: 20, y: 150 },
    connections: ['coding'],
  },
  {
    id: 'coding',
    name: 'CODING',
    description: 'Writes, tests, and refactors code across multiple languages.',
    status: 'ACTIVE',
    tools: ['GitHub', 'Terminal', 'File System'],
    position: { x: 50, y: 150 },
    connections: ['qa'],
  },
  {
    id: 'analysis',
    name: 'ANALYSIS',
    description: 'Analyzes codebases, logs, and performance metrics.',
    status: 'ACTIVE',
    tools: ['Codebase Scanner', 'Log Parser', 'Metrics'],
    position: { x: 80, y: 150 },
    connections: ['qa'],
  },
  {
    id: 'qa',
    name: 'QA',
    description: 'Validates outputs and runs automated test suites.',
    status: 'IDLE',
    tools: ['Test Runner', 'Linting', 'Validation'],
    position: { x: 50, y: 250 },
    connections: ['deployment'],
  },
  {
    id: 'deployment',
    name: 'DEPLOYMENT',
    description: 'Packages, deploys, and monitors production systems.',
    status: 'ACTIVE',
    tools: ['AWS', 'Docker', 'Kubernetes'],
    position: { x: 50, y: 350 },
    connections: [],
  },
];

export default function AgentLab() {
  const [selectedAgent, setSelectedAgent] = useState(null);
  const containerRef = useRef(null);

  const activeAgent = selectedAgent
    ? agents.find((a) => a.id === selectedAgent)
    : null;

  return (
    <section className="relative min-h-screen bg-ink py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="section-num mb-8 block">05_Agent_Lab</span>
          <h2 className="text-display-xl font-display font-bold text-white mb-4">
            AGENT
            <br />
            LAB
          </h2>
          <p className="text-text-muted text-lg max-w-2xl">
            Systems that don't just generate. They reason, act, and execute.
          </p>
        </div>

        {/* Agent orchestration graph */}
        <div
          ref={containerRef}
          className="relative h-[600px] border border-white/5 rounded-[32px] glass-card p-8 overflow-hidden"
        >
          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {agents.map((agent) =>
              agent.connections.map((targetId) => {
                const target = agents.find((a) => a.id === targetId);
                if (!target) return null;
                return (
                  <g key={`${agent.id}-${targetId}`}>
                    <defs>
                      <linearGradient
                        id={`grad-${agent.id}-${targetId}`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d={`M ${agent.position.x}% ${agent.position.y}% L ${target.position.x}% ${target.position.y}%`}
                      fill="none"
                      stroke={`url(#grad-${agent.id}-${targetId})`}
                      strokeWidth={activeAgent && (agent.id === selectedAgent || target.id === selectedAgent) ? '2.5' : '1.5'}
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0.3 }}
                      animate={{ pathLength: 1, opacity: activeAgent && (agent.id === selectedAgent || target.id === selectedAgent) ? 0.8 : 0.3 }}
                      transition={{ duration: 1.5, delay: agent.position.y * 0.01 }}
                    />
                  </g>
                );
              })
            )}
          </svg>

          {/* Animated data packets */}
          <DataPackets agents={agents} />

          {/* Agent nodes */}
          <div className="relative h-full w-full">
            {agents.map((agent) => (
              <AgentNode
                key={agent.id}
                agent={agent}
                isSelected={selectedAgent === agent.id}
                onClick={() => setSelectedAgent(agent.id)}
              />
            ))}
          </div>

          {/* Flow labels */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-12 text-[10px] font-mono text-text-muted">
            <span>↓ RESEARCH</span>
            <span>↓ CODING</span>
            <span>↓ ANALYSIS</span>
            <span>↓ QA</span>
            <span>↓ DEPLOYMENT</span>
            <span>→ AWS</span>
          </div>
        </div>

        {/* Agent detail panel */}
        <AnimatePresence>
          {activeAgent && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 30, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -30, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 glass-card rounded-[24px] p-8 border border-white/5"
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">
                    {activeAgent.name.split(' ')[0]}
                  </h3>
                  <p className="text-text-muted text-sm mb-4">
                    {activeAgent.description}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-mono text-success">
                      {activeAgent.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeAgent.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 text-[10px] font-mono text-electric/80 bg-electric/5 border border-electric/20 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h4 className="text-xs font-mono text-text-muted mb-4">EXECUTION PATH</h4>
                  <div className="flex items-center gap-4 flex-wrap">
                    {activeAgent.connections.map((connId) => {
                      const conn = agents.find((a) => a.id === connId);
                      return conn ? (
                        <motion.div
                          key={conn.id}
                          className="glass-card px-4 py-3 rounded-xl border border-white/5"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span className="text-sm font-mono text-white">
                            {conn.name}
                          </span>
                        </motion.div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function AgentNode({ agent, isSelected, onClick }) {
  const statusColor =
    agent.status === 'ACTIVE'
      ? 'bg-success'
      : agent.status === 'IDLE'
      ? 'bg-text-muted'
      : 'bg-electric';

  return (
    <motion.div
      className={`absolute cursor-pointer transition-all duration-300 ${
        isSelected ? 'scale-110 z-20' : 'hover:scale-105'
      }`}
      style={{
        left: `calc(${agent.position.x}% - 32px)`,
        top: `calc(${agent.position.y}% - 32px)`,
      }}
      onClick={onClick}
      data-cursor="AGENT"
    >
      <motion.div
        className={`w-16 h-16 rounded-[16px] border-2 flex items-center justify-center transition-all duration-300 ${
          isSelected
            ? 'border-electric/50 shadow-lg shadow-electric/20'
            : 'border-white/10 hover:border-electric/30'
        }`}
      >
        <div
          className={`absolute inset-0 rounded-[16px] bg-gradient-to-r ${agent.color || 'from-electric to-cyan'} opacity-0 transition-opacity duration-300 ${
          isSelected ? 'opacity-10' : 'group-hover:opacity-10'
          }`}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div
            className={`absolute inset-0 m-auto w-6 h-6 rounded-full ${statusColor} animate-pulse`}
            style={{ display: isSelected ? 'block' : 'none' }}
          />
          <span className="text-[9px] font-mono text-white font-bold">
            {agent.name}
          </span>
        </div>
      </motion.div>
      <motion.div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-text-muted text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isSelected ? 1 : 0, y: isSelected ? 0 : 10 }}
      >
        {agent.status === 'ACTIVE' && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ●
          </motion.span>
        )}
        <span className="ml-1">{agent.status}</span>
      </motion.div>
    </motion.div>
  );
}

// Animated data packets moving along connections
function DataPackets({ agents }) {
  const connections = [];
  agents.forEach((agent) => {
    agent.connections.forEach((targetId) => {
      const target = agents.find((a) => a.id === targetId);
      if (target) {
        connections.push({
          from: agent.position,
          to: target.position,
          delay: Math.random() * 2,
        });
      }
    });
  });

  return (
    <>
      {connections.slice(0, 8).map((conn, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-electric"
          initial={{
            left: `${conn.from.x}%`,
            top: `${conn.from.y}%`,
          }}
          animate={{
            left: `${conn.to.x}%`,
            top: `${conn.to.y}%`,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: conn.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </>
  );
}
