import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: '01',
    title: 'ONEPLAN',
    subtitle: 'AI-Powered Planning Platform',
    description: 'AI-powered planning and productivity platform built on AWS infrastructure with agentic task orchestration.',
    tags: ['REACT', 'FASTAPI', 'POSTGRESQL', 'AWS', 'AI'],
    visualization: 'api-architecture',
    gradient: 'from-electric via-violet to-cyan',
    color: '#3B82F6',
  },
  {
    id: '02',
    title: 'VISION LAB',
    subtitle: 'Computer Vision Pipeline',
    description: 'Real-time computer vision inference system with automated model deployment pipeline and streaming analytics.',
    tags: ['PYTHON', 'PYTORCH', 'S3', 'LAMBDA', 'AI'],
    visualization: 'cv-pipeline',
    gradient: 'from-purple-500 to-pink-500',
    color: '#8B5CF6',
  },
  {
    id: '03',
    title: 'CLOUD SYSTEM',
    subtitle: 'Infrastructure Orchestration',
    description: 'Multi-region AWS infrastructure with Terraform-based IaC, automated CI/CD, and service mesh monitoring.',
    tags: ['TERRAFORM', 'AWS', 'DOCKER', 'KUBERNETES', 'CLOUD'],
    visualization: 'aws-infra',
    gradient: 'from-aws to-orange-500',
    color: '#FF9900',
  },
  {
    id: '04',
    title: 'AGENT PLATFORM',
    subtitle: 'Agent Orchestration Engine',
    description: 'Autonomous multi-agent system for research, coding, and deployment with LLM-based reasoning and execution.',
    tags: ['PYTHON', 'LLM', 'RAG', 'MCP', 'AGENTS'],
    visualization: 'agent-orchestration',
    gradient: 'from-cyan-500 to-electric',
    color: '#22D3EE',
  },
];

export default function HorizontalProjects({ targetRef }) {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  // Parallax factors
  const bgTranslate = useTransform(scrollYProgress, [0, 1], ['0px', '-200px']);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-ink flex items-center"
    >
      {/* Section title */}
      <motion.div
        className="absolute top-12 left-6 z-20"
        style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, -50]) }}
      >
        <span className="section-num">SELECTED SYSTEMS</span>
        <div className="mt-4">
          <h2 className="text-[11vw] font-display font-bold text-white leading-[0.95] tracking-tight">
            SELECTED
            <br />
            SYSTEMS
          </h2>
        </div>
      </motion.div>

      {/* Horizontal scroll container */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center"
          style={{ x: bgTranslate }}
        >
          {projects.map((project, index) => (
            <ProjectPanel
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
              scrollYProgress={scrollYProgress}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </motion.div>
      </div>

      {/* Parallax background graphics */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgTranslate }}
      >
        <div className="absolute top-1/3 left-1/4 w-px h-40 bg-gradient-to-b from-electric to-transparent opacity-15" />
        <div className="absolute bottom-1/4 right-1/3 w-px h-32 bg-gradient-to-t from-violet to-transparent opacity-15" />
      </motion.div>
    </section>
  );
}

function ProjectPanel({ project, index, total, scrollYProgress, hoveredIndex, setHoveredIndex }) {
  const isHovered = hoveredIndex === index;

  // Slight horizontal drift for parallax effect
  const drift = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -20 : 20, index % 2 === 0 ? 20 : -20]
  );

  // Title moves faster than content
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  // Background graphics move slower
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <motion.div
      className="relative flex-shrink-0 flex items-center"
      style={{
        width: '75vw',
        x: useTransform(scrollYProgress, [index / total, (index + 1) / total], ['0%', '0%']),
        translateX: drift,
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <motion.div
        className="glass-card rounded-[28px] overflow-hidden relative h-[70vh] border border-white/5 group"
      >
        {/* Border glow on hover */}
        <div
          className="absolute -inset-0.5 rounded-[29px] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${project.color}22, transparent)`,
          }}
        />

        {/* Technical visualization background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ink-surface to-ink-surface/60 overflow-hidden">
          <ProjectVisualization type={project.visualization} />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full p-10 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <motion.span
              className="text-3xl font-mono text-electric/50"
              style={{ y: titleY }}
            >
              {project.id}
            </motion.span>
            <motion.span
              className={`px-3 py-1 rounded-full text-xs font-mono bg-electric/10 text-electric`}
            >
              {project.subtitle}
            </motion.span>
          </div>

          <motion.h3
            className="text-[4vw] font-display font-bold text-white leading-[0.95]"
            style={{ y: titleY }}
          >
            {project.title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h3>

          {/* Description on hover */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={isHovered ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-text-muted text-sm mb-4">{project.description}</p>
          </motion.div>

          {/* Technology strip */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[10px] font-mono text-text-muted border border-white/5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <motion.a
              href="#"
              data-cursor="VIEW"
              className="text-xs font-mono text-electric opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ x: 5 }}
            >
              VIEW PROJECT →
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Peek of next panel */}
      {index < projects.length - 1 && (
        <div className="absolute -right-[10vw] top-1/2 -translate-y-1/2 w-[10vw] h-[70vh] rounded-[28px] overflow-hidden glass-card border border-white/5 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-ink-surface to-ink-surface/60 flex items-center justify-center">
            <span className="text-xs font-mono text-text-muted">
              {projects[index + 1].title}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// SVG Visualization components
const ProjectVisualization = ({ type }) => {
  const renderViz = () => {
    switch (type) {
      case 'api-architecture':
        return (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
            <rect x="50" y="30" width="80" height="40" rx="4" fill="#22D3EE11" stroke="#22D3EE33" strokeWidth="1" />
            <text x="90" y="55" textAnchor="middle" className="text-[10px] fill-cyan/70 font-mono">API GW</text>
            <rect x="50" y="90" width="80" height="40" rx="4" fill="#3B82F611" stroke="#3B82F633" strokeWidth="1" />
            <text x="90" y="115" textAnchor="middle" className="text-[10px] fill-electric/70 font-mono">Lambda</text>
            <rect x="50" y="150" width="80" height="40" rx="4" fill="#8B5CF611" stroke="#8B5CF633" strokeWidth="1" />
            <text x="90" y="175" textAnchor="middle" className="text-[10px] fill-violet/70 font-mono">Dynamo</text>
            <rect x="200" y="90" width="120" height="40" rx="4" fill="#FF990011" stroke="#FF990033" strokeWidth="1" />
            <text x="260" y="115" textAnchor="middle" className="text-[10px] fill-aws/70 font-mono">S3 Storage</text>
            <path d="M130 110 L200 110" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M200 150 L280 150" stroke="#FF9900" strokeWidth="1.5" />
            <path d="M130 70 L130 90" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        );
      case 'cv-pipeline':
        return (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
            <circle cx="70" cy="70" r="30" fill="#8B5CF611" stroke="#8B5CF633" strokeWidth="1" />
            <text x="70" y="73" textAnchor="middle" className="text-[8px] fill-violet/70 font-mono">CAMERA</text>
            <rect x="130" y="50" width="80" height="40" rx="4" fill="#3B82F611" stroke="#3B82F633" strokeWidth="1" />
            <text x="170" y="75" textAnchor="middle" className="text-[8px] fill-electric/70 font-mono">MODEL</text>
            <rect x="250" y="50" width="80" height="40" rx="4" fill="#22D3EE11" stroke="#22D3EE33" strokeWidth="1" />
            <text x="290" y="75" textAnchor="middle" className="text-[8px] fill-cyan/70 font-mono">TENSOR RT</text>
            <rect x="130" y="130" width="200" height="40" rx="4" fill="#FF990011" stroke="#FF990033" strokeWidth="1" />
            <text x="230" y="155" textAnchor="middle" className="text-[8px] fill-aws/70 font-mono">RESULTS</text>
            <path d="M100 70 L130 70" stroke="#8B5CF6" strokeWidth="1.5" />
            <path d="M210 70 L250 70" stroke="#22D3EE" strokeWidth="1.5" />
            <path d="M170 90 L170 130" stroke="#FF9900" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M290 90 L290 130" stroke="#FF9900" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M230 170 L330 170" stroke="#FF9900" strokeWidth="1.5" />
          </svg>
        );
      case 'aws-infra':
        return (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
            <rect x="50" y="30" width="80" height="50" rx="6" fill="#FF990011" stroke="#FF990033" strokeWidth="1" />
            <text x="90" y="58" textAnchor="middle" className="text-[8px] fill-aws/70 font-mono">EC2</text>
            <rect x="50" y="100" width="80" height="50" rx="6" fill="#FF990011" stroke="#FF990033" strokeWidth="1" />
            <text x="90" y="128" textAnchor="middle" className="text-[8px] fill-aws/70 font-mono">RDS</text>
            <rect x="50" y="180" width="80" height="50" rx="6" fill="#FF990011" stroke="#FF990033" strokeWidth="1" />
            <text x="90" y="208" textAnchor="middle" className="text-[8px] fill-aws/70 font-mono">S3</text>
            <rect x="200" y="100" width="80" height="50" rx="6" fill="#3B82F611" stroke="#3B82F633" strokeWidth="1" />
            <text x="240" y="128" textAnchor="middle" className="text-[8px] fill-electric/70 font-mono">VPC</text>
            <rect x="280" y="30" width="80" height="50" rx="6" fill="#22D3EE11" stroke="#22D3EE33" strokeWidth="1" />
            <text x="320" y="58" textAnchor="middle" className="text-[8px] fill-cyan/70 font-mono">CF</text>
            <path d="M130 125 L200 125" stroke="#FF9900" strokeWidth="1.5" />
            <path d="M280 55 L280 105" stroke="#22D3EE" strokeWidth="1.5" />
            <path d="M320 55 L320 105" stroke="#22D3EE" strokeWidth="1.5" />
          </svg>
        );
      case 'agent-orchestration':
        return (
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none">
            <polygon points="200,30 230,90 170,90" fill="#3B82F611" stroke="#3B82F633" strokeWidth="1" />
            <text x="200" y="65" textAnchor="middle" className="text-[8px] fill-electric/70 font-mono">ORCH</text>
            <rect x="30" y="130" width="70" height="50" rx="4" fill="#22D3EE11" stroke="#22D3EE33" strokeWidth="1" />
            <text x="65" y="160" textAnchor="middle" className="text-[8px] fill-cyan/70 font-mono">RESEARCH</text>
            <rect x="165" y="130" width="70" height="50" rx="4" fill="#8B5CF611" stroke="#8B5CF633" strokeWidth="1" />
            <text x="200" y="160" textAnchor="middle" className="text-[8px] fill-violet/70 font-mono">CODING</text>
            <rect x="295" y="130" width="70" height="50" rx="4" fill="#FF990011" stroke="#FF990033" strokeWidth="1" />
            <text x="330" y="160" textAnchor="middle" className="text-[8px] fill-aws/70 font-mono">ANALYSIS</text>
            <rect x="165" y="210" width="70" height="50" rx="4" fill="#22C55E11" stroke="#22C55E33" strokeWidth="1" />
            <text x="200" y="240" textAnchor="middle" className="text-[8px] fill-success/70 font-mono">QA</text>
            <rect x="295" y="210" width="70" height="50" rx="4" fill="#FF990011" stroke="#FF990033" strokeWidth="1" />
            <text x="330" y="240" textAnchor="middle" className="text-[8px] fill-aws/70 font-mono">AWS</text>
            <path d="M215 90 L200 130" stroke="#3B82F6" strokeWidth="1.5" />
            <path d="M200 130 L200 180" stroke="#3B82F6" strokeWidth="1.5" />
            <path d="M235 90 L265 130" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M165 130 L165 210" stroke="#8B5CF6" strokeWidth="1.5" />
            <path d="M200 180 L235 210" stroke="#3B82F6" strokeWidth="1.5" />
          </svg>
        );
      default:
        return <div className="absolute inset-0 bg-ink-surface" />;
    }
  };

  return renderViz();
};