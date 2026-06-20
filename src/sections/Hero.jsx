import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from '../components/GlitchText';

const Hero = () => {
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center items-center text-center p-6 relative overflow-hidden select-none"
    >
      {/* Background visual accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,111,60,0.06)_0%,transparent_50%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl space-y-6 z-10"
      >
        <div>
          <span className="text-orange-neon text-xs md:text-sm font-mono tracking-[0.35em] uppercase block mb-3 font-semibold">
            &gt; SYSTEM ACTIVE_
          </span>
          <h1 className="text-5xl md:text-8xl font-orbitron font-extrabold text-ivory tracking-wider uppercase leading-none">
            KANISHKA<span className="text-orange-neon"> S</span>
          </h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-2xl font-sans text-white/95 max-w-2xl mx-auto leading-relaxed font-bold"
        >
          Agentic AI & Cognitive Systems Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xs md:text-sm font-mono text-metallic max-w-xl mx-auto leading-relaxed border-y border-white/5 py-4"
        >
          Specializing in <span className="text-lime-neon">Agentic AI Orchestrations</span>, 
          semantic <span className="text-lime-neon">Vector Database (ChromaDB) RAG pipelines</span>, 
          and <span className="text-lime-neon">cognitive system architectures</span>.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center gap-4 pt-4"
        >
          <button
            onClick={() => scrollToSection('#projects')}
            className="px-6 py-2.5 bg-orange-neon text-black font-orbitron font-bold text-xs uppercase tracking-widest rounded hover:bg-orange-neon/80 transition-all duration-300 shadow-[0_0_15px_rgba(255,111,60,0.2)] cursor-pointer"
          >
            Explore Projects
          </button>
          <button
            onClick={() => scrollToSection('#contact')}
            className="px-6 py-2.5 bg-transparent border border-white/20 text-ivory hover:border-orange-neon hover:text-orange-neon font-orbitron font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 cursor-pointer"
          >
            Get In Touch
          </button>
        </motion.div>
      </motion.div>

      {/* Down arrow scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer select-none text-metallic hover:text-white transition-colors duration-200"
        onClick={() => scrollToSection('#about')}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase block mb-1">SCROLL_DOWN</span>
        <div className="w-1.5 h-1.5 border-r border-b border-white/40 transform rotate-45 mx-auto" />
      </motion.div>
    </section>
  );
};

export default Hero;
