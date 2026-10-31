import { useRef } from 'react';
import SkillsAnimation from '../components/SkillsAnimation';

export default function Skills() {
  return (
    <section
      className="relative min-h-screen bg-ink py-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-num mb-6 block">03_Skills</span>
          <h2 className="text-display-xl font-display font-bold text-white">
            TECH STACK
            <br />
            TOOLKIT
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mt-6">
            Interactive collection of technologies in Web Development, Cloud
            Infrastructure, and Agentic AI.
          </p>
        </div>

        {/* Animated skills container */}
        <div className="relative">
          <SkillsAnimation />
        </div>
      </div>
    </section>
  );
}