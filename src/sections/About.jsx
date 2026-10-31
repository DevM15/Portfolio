import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 max-w-[1700px] mx-auto bg-[#080809] border-t border-white/10"
    >
      <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-stone-500 mb-8">
        <span>[ 02 ]</span>
        <span>STUDIO PHILOSOPHY & MANIFESTO</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Architectural Headline */}
        <div className="lg:col-span-6">
          <motion.h2
            className="text-display-section font-display font-medium text-white tracking-tight uppercase leading-[0.95]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            STRUCTURAL
            <br />
            SIMPLICITY.
            <br />
            <span className="text-stone-500">MAXIMAL</span>
            <br />
            IMPACT.
          </motion.h2>

          <div className="mt-12 space-y-6 text-stone-400 font-sans text-base md:text-lg leading-relaxed font-light max-w-xl">
            <p>
              Just as Shamsudin Kerimov conceives architectural volumes that merge seamlessly into cliff edges and landscapes, digital architecture demands similar purity: structures reduced to their essential intent, stripped of decorative noise.
            </p>
            <p>
              My work treats systems as spatial entities—where data pipelines, agent interactions, and cloud primitives harmonize into scalable, self-healing, and beautifully restrained environments.
            </p>
          </div>
        </div>

        {/* Right Column: Architectural Profile & Specifications */}
        <div className="lg:col-span-6 space-y-12">
          {/* Architectural Image Placeholder Frame */}
          <div className="relative aspect-[4/3] bg-stone-900 border border-white/10 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
              alt="Architectural Lines"
              className="w-full h-full object-cover grayscale contrast-125 brightness-75 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-widest text-stone-300 bg-black/70 px-3 py-1.5 backdrop-blur-sm border border-white/10">
              AXIS // MONOLITHIC STRUCTURE & RUNTIME
            </div>
          </div>

          {/* Studio Metrics & Attributes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono">
            <div>
              <span className="text-[10px] tracking-widest text-stone-600 block mb-1">
                LOCATION
              </span>
              <span className="text-sm text-stone-200">AHMEDABAD, IN</span>
              <span className="text-[10px] text-stone-500 block">GLOBAL DELIVERY</span>
            </div>
            <div>
              <span className="text-[10px] tracking-widest text-stone-600 block mb-1">
                DISCIPLINE
              </span>
              <span className="text-sm text-stone-200">SYSTEM ENG.</span>
              <span className="text-[10px] text-stone-500 block">AI & CLOUD INFRA</span>
            </div>
            <div>
              <span className="text-[10px] tracking-widest text-stone-600 block mb-1">
                METHODOLOGY
              </span>
              <span className="text-sm text-stone-200">MONOLITH TO MESH</span>
              <span className="text-[10px] text-stone-500 block">HIGH RESILIENCE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
