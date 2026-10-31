import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const pillars = [
  {
    icon: 'WEB',
    title: 'WEB DEVELOPMENT',
    desc: 'Modern frontend with React, Next.js, TypeScript. Full-stack APIs with FastAPI and PostgreSQL.',
    tech: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    color: '#3B82F6',
  },
  {
    icon: 'AWS',
    title: 'CLOUD ENGINEERING',
    desc: 'Infrastructure as Code on AWS. Multi-region deployments, serverless, containers, CI/CD pipelines.',
    tech: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Lambda'],
    color: '#FF9900',
  },
  {
    icon: 'AI',
    title: 'AGENTIC AI',
    desc: 'Autonomous agents that reason, plan, and execute. RAG systems, LLM orchestration, MCP tools.',
    tech: ['LLM', 'RAG', 'MCP', 'LangChain', 'Agents'],
    color: '#8B5CF6',
  },
];

function PillarCard({ pillar, index, total, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, index * 20 - 30]);

  return (
    <motion.div
      key={pillar.icon}
      className="glass-card rounded-[24px] p-8 border border-white/5 h-full"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <motion.div
        className="text-4xl font-display font-bold mb-4"
        style={{ color: pillar.color }}
      >
        {pillar.icon}
      </motion.div>

      <h3 className="text-xl font-display font-bold text-white mb-4">
        {pillar.title}
      </h3>

      <p className="text-text-muted text-base leading-relaxed mb-6">
        {pillar.desc}
      </p>

      <div className="flex flex-wrap gap-2">
        {pillar.tech.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[10px] font-mono text-text-muted border border-white/5 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function WhatIBuild() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-ink py-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-num mb-6 block">04_What_I_Build</span>
          <h2 className="text-display-xl font-display font-bold text-white mb-4">
            WHAT I
            <br />
            BUILD
          </h2>
          <p className="text-text-muted text-lg max-w-2xl">
            Three pillars of modern software engineering — each a deep specialization.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <PillarCard
              key={pillar.icon}
              pillar={pillar}
              index={i}
              total={pillars.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}