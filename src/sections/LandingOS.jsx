import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchText from '../components/GlitchText';

const LandingOS = ({ onBootComplete }) => {
  const [bootLogs, setBootLogs] = useState([]);
  const [bootProgress, setBootProgress] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  const logs = [
    { text: "INITIALIZING DIGITAL PORTAL [V2.0.26]...", delay: 100 },
    { text: "CORE: Connecting neural network grids...", delay: 400 },
    { text: "DATA: Synchronizing Sri Eshwar College database...", delay: 700 },
    { text: "SECURITY: Loading role-based JWT auth protocols...", delay: 1000 },
    { text: "MODELS: Initializing Groq API & LLM connectors...", delay: 1300 },
    { text: "VECTOR: Querying ChromaDB instance for Startup Forge...", delay: 1600 },
    { text: "DSA: Verifying LeetCode Contest rating [1475]... OK", delay: 1900 },
    { text: "SYSTEMS: Fetching 1,150+ SkillRack validations... OK", delay: 2100 },
    { text: "ENV: Injecting Burnt Orange & Emerald glow variables...", delay: 2400 },
    { text: "PORTAL: Diagnostics green. Authorization required...", delay: 2700 }
  ];

  useEffect(() => {
    // Process boot logs sequentially
    logs.forEach((log) => {
      setTimeout(() => {
        setBootLogs((prev) => [...prev, log.text]);
      }, log.delay);
    });

    // Animate progress bar
    const interval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFullyLoaded(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#08080c] flex flex-col justify-between p-6 md:p-12 z-50 overflow-hidden select-none">
      {/* Background Matrix/Grid Overlay inside boot screen */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 radar-sweep opacity-10 pointer-events-none" />

      {/* Top Header */}
      <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-metallic border-b border-white/5 pb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-orange-neon rounded-full pulse-led" />
          <span>SYS_BOOT: ACTIVE</span>
        </div>
        <span>COORD_LOC: 11.018° N, 77.027° E</span>
        <span>STATUS: VERIFYING_CREATOR</span>
      </div>

      {/* Center OS Console */}
      <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full py-8 relative z-10 font-mono">
        <div className="mb-6">
          <h1 className="text-3xl md:text-5xl font-orbitron font-extrabold tracking-widest text-ivory mb-2">
            SYSTEMS<span className="text-orange-neon">.BOOT</span>
          </h1>
          <p className="text-xs text-metallic tracking-wider">
            OPERATING SYSTEM INTERFACE FOR IDENT: <span className="text-lime-neon font-bold">KANISHKA S</span>
          </p>
        </div>

        {/* Live logs terminal box */}
        <div className="bg-[#050508]/90 border border-orange-neon/20 p-4 h-64 overflow-y-auto rounded shadow-inner text-left text-xs space-y-1.5 scrollbar-thin">
          <AnimatePresence>
            {bootLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2"
              >
                <span className="text-orange-neon select-none">&gt;&gt;</span>
                <span className={log.includes("OK") ? "text-lime-neon" : "text-ivory"}>
                  {log}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          {bootLogs.length < logs.length && (
            <div className="text-metallic animate-pulse">&gt;&gt; STAGING MEMORY BLOCKS...</div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex justify-between text-[10px] text-metallic mb-1.5 font-bold">
            <span>MEM_DECRYPT_SECURE</span>
            <span>{Math.min(bootProgress, 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-neon to-lime-neon"
              style={{ width: `${Math.min(bootProgress, 100)}%` }}
              layout
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex flex-col items-center gap-4 relative z-10 border-t border-white/5 pt-4">
        {isFullyLoaded ? (
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBootComplete}
            className="px-8 py-3 bg-transparent border border-lime-neon text-lime-neon font-orbitron font-bold tracking-widest text-sm uppercase rounded cursor-pointer relative overflow-hidden group shadow-[0_0_15px_rgba(163,230,53,0.2)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] transition-all duration-300"
          >
            <span className="absolute inset-0 bg-lime-neon/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <GlitchText text="ENTER DIGITAL UNIVERSE" speed={25} />
          </motion.button>
        ) : (
          <span className="text-[10px] font-mono text-metallic tracking-wider animate-pulse">
            PERFORMING BIOMETRIC SCANNING... STANDBY
          </span>
        )}
        <span className="text-[8px] font-mono text-metallic">
          © 2026 KANISHKA S. ALL RIGHTS OPERATIONAL.
        </span>
      </div>
    </div>
  );
};

export default LandingOS;
