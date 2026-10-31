import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import HorizontalProjects from './components/HorizontalProjects';
import WhatIBuild from './sections/WhatIBuild';
import AgentLab from './sections/AgentLab';
import Cloud from './sections/Cloud';
import Experience from './sections/Experience';
import Terminal from './sections/Terminal';
import Skills from './sections/Skills';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import './styles/index.css';

export default function App() {
  const horizontalRef = useRef(null);

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Root container with scroll tracking */}
      <div
        className="min-h-screen bg-ink overflow-x-hidden"
      >
        <Navbar />

        {/* Section 01: Hero */}
        <Hero />

        {/* Section 02: About + Photo */}
        <About />

        {/* Section 03: What I Build */}
        <WhatIBuild />

        {/* Section 04: Skills */}
        <Skills />

        {/* Section 05: Selected Systems (Horizontal) */}
        <div
          ref={horizontalRef}
          className="relative h-screen w-full overflow-hidden bg-ink"
        >
          <HorizontalProjects targetRef={horizontalRef} />
        </div>

        {/* Section 06: Agent Lab */}
        <AgentLab />

        {/* Section 07: Cloud / Infrastructure */}
        <Cloud />

        {/* Section 08: Experience */}
        <Experience />

        {/* Section 09: Terminal */}
        <Terminal />

        {/* Section 10: Contact */}
        <Contact />

        <Footer />
      </div>
    </>
  );
}
