import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SkillsAnimation() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const skills = [
    { name: 'React', category: 'WEB', color: '#3B82F6' },
    { name: 'Next.js', category: 'WEB', color: '#3B82F6' },
    { name: 'TypeScript', category: 'WEB', color: '#3B82F6' },
    { name: 'Python', category: 'AI', color: '#8B5CF6' },
    { name: 'FastAPI', category: 'WEB', color: '#3B82F6' },
    { name: 'PostgreSQL', category: 'CLOUD', color: '#22D3EE' },
    { name: 'AWS', category: 'CLOUD', color: '#FF9900' },
    { name: 'Docker', category: 'DEVOPS', color: '#22D3EE' },
    { name: 'Git', category: 'DEVOPS', color: '#22D3EE' },
    { name: 'LLM', category: 'AI', color: '#8B5CF6' },
    { name: 'RAG', category: 'AI', color: '#8B5CF6' },
    { name: 'MCP', category: 'AI', color: '#8B5CF6' },
    { name: 'AI Agents', category: 'AI', color: '#8B5CF6' },
    { name: 'Terraform', category: 'CLOUD', color: '#22D3EE' },
  ];

  return (
    <div ref={containerRef} className="relative py-12">
      <div className="flex flex-wrap gap-3 justify-center items-center">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="px-4 py-2 rounded-full bg-ink-surface border border-white/10 cursor-pointer group transition-all duration-300"
            style={{
              backgroundColor: `${skill.color}05`,
              borderColor: `${skill.color}30`,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={isInView ? {
              opacity: 1,
              scale: 1,
              y: Math.sin(i * 0.5) * 10,
            } : { opacity: 0, scale: 0.8, y: 30 }}
            whileHover={{
              scale: 1.12,
              y: -5,
              borderColor: `${skill.color}80`,
              backgroundColor: `${skill.color}10`,
            }}
            transition={{
              duration: 0.3,
              delay: i * 0.04,
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            data-cursor={skill.name}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-text-muted group-hover:text-white transition-colors duration-300">
                {skill.name}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-text-muted group-hover:text-white">
                {skill.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}