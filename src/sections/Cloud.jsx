import { useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const services = [
  {
    id: 'user',
    name: 'USER',
    role: 'Client',
    status: 'ONLINE',
    icon: '👤',
    color: 'cyan',
  },
  {
    id: 'cloudfront',
    name: 'CLOUDFRONT',
    role: 'CDN',
    status: 'ONLINE',
    icon: '☁️',
    color: 'aws',
  },
  {
    id: 'api',
    name: 'API GATEWAY',
    role: 'API',
    status: 'ONLINE',
    icon: '🚪',
    color: 'electric',
  },
  {
    id: 'compute',
    name: 'COMPUTE',
    role: 'ECS / Lambda',
    status: 'ONLINE',
    icon: '⚙️',
    color: 'violet',
  },
  {
    id: 'database',
    name: 'DATABASE',
    role: 'RDS / Dynamo',
    status: 'ONLINE',
    icon: '🗄️',
    color: 'cyan',
  },
  {
    id: 's3',
    name: 'S3',
    role: 'Storage',
    status: 'ONLINE',
    icon: '🫙',
    color: 'aws',
  },
  {
    id: 'ai',
    name: 'AI SERVICES',
    role: 'Bedrock / SageMaker',
    status: 'ONLINE',
    icon: '🤖',
    color: 'violet',
  },
];

export default function Cloud() {
  const containerRef = useRef(null);
  const [hoveredService, setHoveredService] = useState(null);
  const [activeServices, setActiveServices] = useState([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const flowProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      services.forEach((service, i) => {
        setTimeout(() => {
          setActiveServices((prev) => [...new Set([...prev, service.id])]);
        }, i * 200);
      });
      return () => clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      id="cloud"
      className="relative min-h-screen bg-ink py-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-num mb-6 block">06_Cloud</span>
          <h2 className="text-display-xl font-display font-bold text-white mb-4">
            CLOUD
            <br />
            INFRASTRUCTURE
          </h2>
          <p className="text-text-muted text-lg max-w-2xl">
            FROM LOCALHOST TO PRODUCTION — A resilient, multi-region architecture
            powered entirely by AWS.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="relative py-16">
          {/* Flow animation line */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {/* Connection lines from top to bottom */}
            <defs>
              <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#22D3EE" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>

            {services.map((service, i) => {
              if (i === services.length - 1) return null;
              const x1 = 50;
              const y1 = 30 + i * (600 / services.length);
              const y2 = 30 + (i + 1) * (600 / services.length);
              return (
                <g key={service.id}>
                  <line
                    x1={x1}
                    y1={y1 + 30}
                    x2={x1}
                    y2={y2 + 30}
                    stroke="url(#flow-gradient)"
                    strokeWidth={hoveredService === service.id ? '2' : '1'}
                    strokeOpacity={hoveredService === service.id ? '0.8' : '0.3'}
                    strokeDasharray="0"
                  />
                  {/* Animated data packet */}
                  {activeServices.includes(service.id) && (
                    <circle
                      r="3"
                      fill="#3B82F6"
                      initial={{ cy: y1 + 30 }}
                      animate={{ cy: y2 + 30 }}
                      transition={{
                        duration: 1,
                        ease: 'linear',
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                    >
                      <animate
                        attributeName="cx"
                        values={`${x1};${x1}`}
                        dur="1s"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Service nodes */}
          <div className="relative" style={{ zIndex: 10, height: '600px' }}>
            {services.map((service, i) => (
              <ServiceNode
                key={service.id}
                service={service}
                index={i}
                total={services.length}
                isActive={activeServices.includes(service.id)}
                isHovered={hoveredService === service.id}
                onHover={() => setHoveredService(service.id)}
                onLeave={() => setHoveredService(null)}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-16 flex flex-wrap gap-8 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-aws" />
            <span>• AWS Services</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
            <span>• Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan" />
            <span>• Data flow</span>
          </div>
        </div>
      </div>

      {/* Terminal status bar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-ink-surface border-t border-white/5 px-6 flex items-center justify-between text-xs font-mono text-text-muted overflow-hidden">
        <div className="flex items-center gap-6">
          {services.map((s) => (
            <span key={s.id} className="flex items-center gap-2">
              <span
                className={`w-1 h-1 rounded-full ${
                  activeServices.includes(s.id)
                    ? 'bg-success animate-pulse'
                    : 'bg-text-muted'
                }`}
              />
              {s.name}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span>$ aws infrastructure --status</span>
          <span className="text-success">ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>
    </section>
  );
}

function ServiceNode({ service, index, total, isActive, isHovered, onHover, onLeave }) {
  const colors = {
    aws: '#FF9900',
    electric: '#3B82F6',
    violet: '#8B5CF6',
    cyan: '#22D3EE',
  };

  const color = colors[service.color];

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 transition-all duration-300 cursor-pointer"
      style={{
        top: `${(index / (total - 1)) * 100}%`,
        transform: `translateY(-50%) translateX(-50%)`,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-cursor={service.name}
    >
      <div
        className={`
          flex items-center gap-4 px-6 py-3 rounded-[16px] transition-all duration-300
          ${isHovered ? 'glass-card border border-white/10 shadow-xl' : 'bg-ink-surface/20 border border-white/5'}
        `}
        style={{
          borderColor: isActive && isHovered ? `${color}40` : undefined,
          boxShadow: isHovered ? `0 0 20px ${color}20` : undefined,
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: `${color}11`,
            border: `1px solid ${color}40`,
          }}
        >
          <span className="text-sm">{service.icon}</span>
        </div>
        <div className="flex flex-col">
          <span
            className="font-bold text-sm"
            style={{ color: isHovered ? color : 'inherit' }}
          >
            {service.name}
          </span>
          <div className="flex items-center gap-3 text-[10px] text-text-muted">
            <span>{service.role}</span>
            <span>•</span>
            <span
              className={
                isActive ? 'text-success/80' : 'text-text-muted/50'
              }
            >
              {service.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
