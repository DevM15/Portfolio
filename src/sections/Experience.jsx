import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const timelineStages = [
  {
    id: '01',
    title: 'BUILD',
    description: 'Architecting and developing scalable web applications with React and Next.js, backed by FastAPI and PostgreSQL.',
    tech: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'FASTAPI', 'POSTGRESQL'],
  },
  {
    id: '02',
    title: 'DEPLOY',
    description:
      'Building CI/CD pipelines and deploying cloud-native infrastructure on AWS using Terraform and Docker.',
    tech: ['AWS', 'DOCKER', 'TERRAFORM', 'CI/CD', 'KUBERNETES'],
  },
  {
    id: '03',
    title: 'AUTOMATE',
    description:
      'Engineering autonomous AI agents with LLM reasoning, RAG knowledge systems, and MCP tool integration.',
    tech: ['PYTHON', 'LLM', 'RAG', 'MCP', 'AI AGENTS'],
  },
  {
    id: '04',
    title: 'SCALE',
    description: 'Optimizing for scale — multi-region deployments, performance tuning, and observability.',
    tech: ['AWS', 'MONITORING', 'OPTIMIZATION', 'SCALING'],
  },
];

function StageItem({ stage, index, total, scrollYProgress }) {
  const stepProgress = useTransform(
    scrollYProgress,
    [index / total, (index + 1) / total],
    [0, 1]
  );

  const scale = useTransform(stepProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(stepProgress, [0, 1], [0.3, 1]);

  return (
    <motion.div
      key={stage.id}
      className="flex items-start gap-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      {/* Number marker */}
      <div className="flex-shrink-0">
        <motion.div
          className="w-24 h-12 rounded-full bg-ink-surface border border-white/5 flex items-center justify-center font-mono text-electric"
          style={{ scale, opacity }}
        >
          {stage.id}
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-2xl">
        <h3 className="text-3xl font-display font-bold text-white mb-3">
          {stage.title}
        </h3>
        <p className="text-text-muted text-base leading-relaxed mb-4">
          {stage.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {stage.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-[10px] font-mono text-text-muted border border-white/5 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative min-h-screen bg-ink py-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-num mb-6 block">07_Experience</span>
          <h2 className="text-display-xl font-display font-bold text-white">
            EXPERIENCE
            <br />
            JOURNEY
          </h2>
        </div>

        <div className="relative py-20">
          {/* Vertical line */}
          <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-electric to-transparent opacity-30" />

          {/* Stages */}
          <div className="space-y-24 mt-8">
            {timelineStages.map((stage, i) => (
              <StageItem
                key={stage.id}
                stage={stage}
                index={i}
                total={timelineStages.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}