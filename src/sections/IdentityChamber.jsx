import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HUDFrame from '../components/HUDFrame';
import GlitchText from '../components/GlitchText';

const IdentityChamber = () => {
  const [selectedLog, setSelectedLog] = useState('LOG_01');

  const identityStats = [
    { label: "NAME", value: "KANISHKA S" },
    { label: "ACADEMICS", value: "B.E. Computer Science & Eng" },
    { label: "INSTITUTION", value: "Sri Eshwar College of Engineering" },
    { label: "CURRENT BATCH", value: "2024 - 2028" },
    { label: "CGPA (IV-SEM)", value: "8.3 / 10.0" },
    { label: "HSC SCORE", value: "95.8% (Bharathi Vidhyalaya)" },
    { label: "SSLC SCORE", value: "97.0% (Brindavan Matriculation)" },
    { label: "STATUS", value: "Active Researcher / Developer" },
  ];

  const logEntries = {
    LOG_01: {
      title: "INITIATION [BATCH_2024]",
      date: "August 2024",
      summary: "Bootstrapped foundational computer science algorithms.",
      details: [
        "Incepted core structures in C and Object-Oriented paradigms.",
        "Synthesized core logic and mathematics constructs.",
        "Maintained high academic standing at Sri Eshwar College of Engineering."
      ]
    },
    LOG_02: {
      title: "HACKATHONS & CREDENTIALS [2025]",
      date: "Jan - Nov 2025",
      summary: "Rapid expansion of development capabilities and competitive environments.",
      details: [
        "Nominated as Finalist in Sri Eshwar intra-college Gameathon (24 Hrs).",
        "Shortlisted in the top 10 finalists of TNSkills for Intelligent Security Technology.",
        "Participated in VIT Prompt-A-Thon Chennai (24 Hrs) and Intra GenAI Hackathons.",
        "Acquired formal credentials in DSA, Python programming, and Java foundations."
      ]
    },
    LOG_03: {
      title: "SYSTEM BUILD: PRICE TRACKER",
      date: "December 2025",
      summary: "First major system build connecting local farming vendor hubs.",
      details: [
        "Implemented full-stack Node.js/Express server architecture.",
        "Integrated Google reCAPTCHA and JWT secure verification structures.",
        "Designed responsive admin dashboard and role-based routing systems."
      ]
    },
    LOG_04: {
      title: "AI AGENT SYSTEMS: STARTUP FORGE",
      date: "June 2026",
      summary: "Research and deployment of multi-agent cognitive startup planning models.",
      details: [
        "Built multi-agent FastAPI system orchestrating startup recommendations.",
        "Configured Vector embeddings database using ChromaDB with Groq LLM pipelines.",
        "Integrated Y Combinator dataset with Retrieval-Augmented Generation (RAG)."
      ]
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Column - Core Identity Coordinates */}
      <div className="lg:col-span-5 flex">
        <HUDFrame
          title="IDENTITY CHAMBER"
          subtitle="SPECS & DATAREADS"
          borderColor="orange"
          badge="SECURE_READ"
          cornerText="ID-0997"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <div className="relative border border-orange-neon/10 bg-[#050508]/50 p-4 rounded overflow-hidden">
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-orange-neon/40" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-orange-neon/40" />
              
              {/* Radar visualization overlay */}
              <div className="relative h-32 flex items-center justify-center border border-white/5 rounded bg-black/40 overflow-hidden mb-4 select-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,111,60,0.15)_0%,transparent_60%)]" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute w-20 h-20 rounded-full border border-orange-neon/30"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                  className="absolute w-24 h-24 border-t-2 border-orange-neon/20 rounded-full"
                />
                <span className="text-[10px] font-mono text-lime-neon tracking-widest uppercase">
                  BIOMETRIC_STATUS: SYNCHRONIZED
                </span>
              </div>

              <div className="space-y-2.5 font-mono text-xs text-left">
                {identityStats.map((stat, idx) => (
                  <div key={idx} className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-metallic">{stat.label}:</span>
                    <span className="text-ivory font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </HUDFrame>
      </div>

      {/* Right Column - Chronometer Memory logs */}
      <div className="lg:col-span-7 flex">
        <HUDFrame
          title="IDENTITY TIMELINE LOGS"
          subtitle="CHRONOLOGICAL EXPANSION"
          borderColor="lime"
          badge="LOG_ARCHIVE"
          cornerText="TMLN-02"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-full">
            {/* Timeline selector nodes */}
            <div className="md:col-span-4 flex md:flex-col gap-2 justify-start overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {Object.keys(logEntries).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedLog(key)}
                  className={`w-full text-left px-3 py-2.5 rounded font-mono text-xs border transition-all duration-300 ${
                    selectedLog === key
                      ? 'bg-lime-neon/10 border-lime-neon text-lime-neon shadow-[0_0_10px_rgba(163,230,53,0.15)]'
                      : 'bg-[#050508]/40 border-white/5 text-metallic hover:text-ivory hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{key}</span>
                    <span className="text-[9px] opacity-75">{logEntries[key].date.split(' ')[0]}</span>
                  </div>
                  <div className="text-[10px] mt-1 truncate opacity-85">
                    {logEntries[key].title}
                  </div>
                </button>
              ))}
            </div>

            {/* Decrypted logs content details */}
            <div className="md:col-span-8 bg-[#050508]/60 border border-white/5 rounded p-4 text-left flex flex-col justify-between min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLog}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <span className="text-[9px] font-mono text-lime-neon uppercase tracking-wider block">
                      {logEntries[selectedLog].date}
                    </span>
                    <h4 className="font-orbitron font-extrabold text-base text-ivory tracking-wide mt-0.5">
                      <GlitchText text={logEntries[selectedLog].title} speed={30} />
                    </h4>
                  </div>

                  <p className="text-xs text-metallic font-mono bg-white/2 p-2.5 border-l-2 border-lime-neon italic leading-relaxed">
                    "{logEntries[selectedLog].summary}"
                  </p>

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono text-metallic block tracking-widest uppercase">
                      DECRYPTED_DECOY_BLOCKS:
                    </span>
                    <ul className="text-xs space-y-2 text-ivory/95 font-sans pl-1.5">
                      {logEntries[selectedLog].details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-lime-neon mt-1 select-none">•</span>
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 text-[9px] font-mono text-metallic border-t border-white/5 pt-2">
                SHA256_HASH: d85f812e964b38d380e30e6...
              </div>
            </div>
          </div>
        </HUDFrame>
      </div>
    </div>
  );
};

export default IdentityChamber;
