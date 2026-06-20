import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Radio } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import Navbar from './components/Navbar';
import LandingOS from './sections/LandingOS';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Continuous background time check
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Scanline CRT overlay */}
      <div className="scanlines" />

      <AnimatePresence mode="wait">
        {!isBooted ? (
          <LandingOS key="boot" onBootComplete={() => setIsBooted(true)} />
        ) : (
          <motion.div
            key="portfolio-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen bg-cyber-bg flex flex-col justify-between relative overflow-x-hidden text-ivory"
          >
            {/* Background elements */}
            <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20 z-0" />
            <div className="absolute inset-0 cyber-grid-fine pointer-events-none opacity-30 z-0" />
            <MatrixRain />

            {/* Navigation Header */}
            <Navbar />

            {/* Scrolling Portfolio Content */}
            <main className="flex-grow pt-20 relative z-10 w-full">
              {/* Home / Hero */}
              <Hero />

              {/* About Section */}
              <About />

              {/* Skills Section */}
              <Skills />

              {/* Projects Section */}
              <Projects />

              {/* Achievements Section */}
              <Achievements />

              {/* Contact Section */}
              <Contact />
            </main>

            {/* Global system status bar */}
            <footer className="relative z-20 border-t border-white/5 bg-black/60 px-6 py-4 flex flex-wrap justify-between items-center text-[10px] font-mono text-metallic select-none gap-4">
              <div className="flex items-center gap-4">
                <span>LOCAL_TIME: {currentTime || '12:00:00'}</span>
                <span>NODE_IP: 192.168.1.99</span>
                <span>SECURE_ROUTE: ON</span>
              </div>
              <div>
                <span>© 2026 KANISHKA S // AI & COGNITIVE SYSTEMS</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
