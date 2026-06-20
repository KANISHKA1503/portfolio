import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HUDFrame from '../components/HUDFrame';
import GlitchText from '../components/GlitchText';

const MissionControl = () => {
  const [activeMission, setActiveMission] = useState('ALPHA');
  const [activeTab, setActiveTab] = useState('PROBLEM');

  const missions = {
    ALPHA: {
      code: "MSN-01-ALPHA",
      title: "STARTUP FORGE",
      subtitle: "AI-POWERED ACCELERATOR",
      date: "JUNE 2026",
      status: "COMPLETED",
      gitLink: "https://github.com", // placeholder, can point to github
      overview: "An AI-powered multi-agent startup acceleration platform that transforms raw user skills, interests, and goals into validated venture architectures.",
      tabs: {
        PROBLEM: {
          title: "PROBLEM STATEMENT",
          content: "Aspiring founders face immense friction validating early startup ideas. High-quality market analysis, technical planning, and investor readiness benchmarks require weeks of expensive coordination or consulting, leading to misaligned MVPs or rapid failure rates.",
          highlights: ["No objective automated founder-idea fit checks", "Slow manual market validation models", "Complex early-stage MVP technical planning"]
        },
        ARCHITECT: {
          title: "DESIGN DECISIONS & BLUEPRINTS",
          content: "Built a distributed multi-agent system where specialized AI agents orchestrate distinct tasks: discovery, market validation, revenue modeling, founder fit, and pitch deck synthesis. Leveraged ChromaDB vector embedding lookup to cross-reference concepts against comprehensive historical Y Combinator databases, ensuring data-backed venture planning rather than arbitrary hallucinated responses.",
          highlights: ["Multi-Agent orchestration paradigm using Groq APIs", "ChromaDB vector embedding retriever for YC data mapping", "Asynchronous FastAPI state updates for responsive telemetry"]
        },
        TELEMETRY: {
          title: "TECHNOLOGY TELEMETRY",
          content: "FastAPI server infrastructure feeding RAG queries to vector structures, handling high-speed dataframes, and rendering output dynamically.",
          techStack: ["Python", "FastAPI", "Groq API", "ChromaDB", "Pandas", "RAG (Retrieval-Augmented)", "Y Combinator Dataset", "GitHub"]
        },
        RESULTS: {
          title: "MISSION REPORT & LESSONS",
          content: "Successfully automated end-to-end startup acceleration blueprints. aspired founders can generate formatted executive decks, MVP database diagrams, and investor readiness scores in under 60 seconds. Learned that agent coordination requires strict state locks to prevent loops, and RAG embeddings must be carefully partitioned to maintain high vector search accuracy.",
          highlights: ["Reduced validation turnaround from weeks to seconds", "Maintained stable vector queries over 1k YC records", "Discovered strict prompt bounds needed for agent output coherence"]
        }
      }
    },
    BETA: {
      code: "MSN-02-BETA",
      title: "VEG PRICE TRACKER",
      subtitle: "DAILY AGRI TELEMETRY",
      date: "DECEMBER 2025",
      status: "STABLE",
      gitLink: "https://github.com",
      overview: "A secure full-stack logistics and price dashboard enabling rural agricultural farmers to view market pricing and coordinate vendor deliveries.",
      tabs: {
        PROBLEM: {
          title: "PROBLEM STATEMENT",
          content: "Local vegetable farmers suffer from severe information asymmetry regarding market price ranges. Middling vendors often exploit this, leading to agricultural waste and poor returns. Additionally, farmers lacked a clean, secure channel to notify administrators of pending harvests.",
          highlights: ["Exploitation due to lack of market price transparency", "Clunky manual coordination channels for produce sales", "Vulnerability to fake notifications and spam"]
        },
        ARCHITECT: {
          title: "DESIGN DECISIONS & BLUEPRINTS",
          content: "Engineered a secured role-based portal dividing actions between 'Admin' (manage list pricing, verify notifications) and 'Farmer' (view lists, dispatch produce notifications). Implemented strict JWT route locks and integrated Google reCAPTCHA v3 on registration/submission endpoints to secure the server against automated bot notifications.",
          highlights: ["JWT tokens stored securely in HTTPOnly states", "Google reCAPTCHA filtering automated bot spam", "Role-based views dividing vendor lists and farmer grids"]
        },
        TELEMETRY: {
          title: "TECHNOLOGY TELEMETRY",
          content: "React frontend communicating with an Express/Node API backend, utilizing MongoDB collections to log pricing and dispatch notification alerts.",
          techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Google reCAPTCHA", "Tailwind CSS", "GitHub"]
        },
        RESULTS: {
          title: "MISSION REPORT & LESSONS",
          content: "Deployed dashboard showing daily pricing lists and incoming logs. Farmers gained clear pricing leverage before driving to markets. Learned how to manage JWT token expiration and coordinate double validation middleware checkouts to prevent race conditions during parallel vendor price postings.",
          highlights: ["Eliminated pricing asymmetry for local farming sectors", "Filtered 99.8% bot submissions using reCAPTCHA", "Refined understanding of MongoDB schema indexes for price trends"]
        }
      }
    }
  };

  const activeData = missions[activeMission];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Column - Missions HUD list */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <HUDFrame
          title="MISSION COORDINATES"
          subtitle="ACTIVE PROJECTS GRID"
          borderColor="orange"
          badge="LAUNCH_DECK"
          cornerText="MSN-CTL"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            {Object.keys(missions).map((key) => {
              const item = missions[key];
              const isSelected = activeMission === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveMission(key);
                    setActiveTab('PROBLEM');
                  }}
                  className={`w-full text-left p-4 rounded border font-mono transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    isSelected
                      ? 'bg-orange-neon/15 border-orange-neon text-orange-neon shadow-[0_0_15px_rgba(255,111,60,0.2)]'
                      : 'bg-black/40 border-white/5 text-metallic hover:text-ivory hover:border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] mb-1 font-bold">
                    <span>{item.code}</span>
                    <span className={isSelected ? 'text-lime-neon' : 'text-metallic'}>
                      ● {item.status}
                    </span>
                  </div>
                  
                  <h4 className="font-orbitron font-extrabold text-base tracking-wider text-ivory">
                    {item.title}
                  </h4>
                  
                  <p className="text-[10px] text-metallic tracking-widest mt-0.5">
                    {item.subtitle}
                  </p>

                  <div className="mt-3 flex justify-between items-center text-[9px]">
                    <span className="text-metallic">{item.date}</span>
                    <span className="text-orange-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      LOAD MISSION SYSTEM &gt;
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 border border-white/5 p-3 rounded bg-black/20 text-left font-mono text-xs select-none">
            <span className="text-[10px] text-orange-neon block mb-1 font-bold">// SECTOR TELEMETRY</span>
            <p className="text-[11px] text-metallic leading-relaxed">
              Click a mission node above to load database records, API routes, and post-operational audits into the analysis console.
            </p>
          </div>
        </HUDFrame>
      </div>

      {/* Right Column - Laboratory Diagnostics Tabs */}
      <div className="lg:col-span-8 flex">
        <HUDFrame
          title={`LABORATORY: ${activeData.title}`}
          subtitle="MISSION TELEMETRY EXPLORER"
          borderColor="lime"
          badge={activeData.code}
          cornerText="LAB-CONSOLE"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col h-full justify-between gap-5">
            {/* Project Overview block */}
            <div className="bg-[#050508]/40 border border-white/5 p-3 rounded text-left">
              <span className="text-[9px] font-mono text-lime-neon uppercase tracking-widest block font-bold">
                SYSTEM SUMMARY
              </span>
              <p className="font-sans text-xs text-ivory/90 mt-1 leading-relaxed">
                {activeData.overview}
              </p>
            </div>

            {/* Diagnostic Tabs selectors */}
            <div className="flex border-b border-white/5 pb-2 overflow-x-auto select-none">
              {Object.keys(activeData.tabs).map((tabKey) => {
                const tab = activeData.tabs[tabKey];
                const isSelected = activeTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    onClick={() => setActiveTab(tabKey)}
                    className={`whitespace-nowrap px-4 py-2 font-mono text-xs border-t border-x rounded-t -mb-[9px] mr-1.5 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-lime-neon/15 border-lime-neon/50 border-b-transparent text-lime-neon font-bold shadow-[0_-3px_10px_rgba(163,230,53,0.05)]'
                        : 'bg-black/20 border-white/5 text-metallic hover:text-ivory'
                    }`}
                  >
                    {tabKey === 'PROBLEM' && '1. PROBLEM'}
                    {tabKey === 'ARCHITECT' && '2. BLUEPRINTS'}
                    {tabKey === 'TELEMETRY' && '3. STACK'}
                    {tabKey === 'RESULTS' && '4. OUTCOMES'}
                  </button>
                );
              })}
            </div>

            {/* Tab content readout */}
            <div className="bg-[#050508]/70 border border-lime-neon/10 rounded p-4 text-left flex-1 flex flex-col justify-between min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <h5 className="font-orbitron font-bold text-xs tracking-wider text-ivory uppercase">
                    &gt; {activeData.tabs[activeTab].title}
                  </h5>
                  
                  <p className="font-mono text-xs text-metallic leading-relaxed">
                    {activeData.tabs[activeTab].content}
                  </p>

                  {/* Highlights or technology chip lists */}
                  {activeData.tabs[activeTab].highlights && (
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono text-lime-neon uppercase tracking-wider block font-bold">
                        KEY PARAMETERS:
                      </span>
                      <ul className="text-xs space-y-1.5 pl-1 text-ivory">
                        {activeData.tabs[activeTab].highlights.map((hl, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-orange-neon select-none">&gt;</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeData.tabs[activeTab].techStack && (
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-orange-neon uppercase tracking-wider block font-bold">
                        DEPLOYED COMPONENT ARRAY:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeData.tabs[activeTab].techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-black/60 border border-orange-neon/20 hover:border-orange-neon/50 text-orange-neon font-mono text-[9px] rounded select-none transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Action footer for Git logs */}
              <div className="mt-4 pt-2 border-t border-white/5 flex justify-between items-center text-[9px] font-mono">
                <span className="text-metallic">SYSTEM: VERIFIED_RELEASES</span>
                <a
                  href={activeData.gitLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-lime-neon hover:text-white transition-colors duration-200 font-bold"
                >
                  [ ACCESS_REPOSITORIES_GATE ]
                </a>
              </div>
            </div>
          </div>
        </HUDFrame>
      </div>
    </div>
  );
};

export default MissionControl;
