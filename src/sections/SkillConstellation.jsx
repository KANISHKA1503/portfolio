import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HUDFrame from '../components/HUDFrame';
import GlitchText from '../components/GlitchText';

const SkillConstellation = () => {
  const [activeSector, setActiveSector] = useState('AI');
  const [selectedNode, setSelectedNode] = useState('AGENT');

  const sectors = [
    { id: 'AI', name: 'AI & GenAI', color: 'lime' },
    { id: 'LANG', name: 'Languages', color: 'orange' },
    { id: 'WEB', name: 'Web Dev', color: 'emerald' },
    { id: 'CORE', name: 'Core Concepts', color: 'orange' },
    { id: 'TOOL', name: 'Tools & Systems', color: 'lime' }
  ];

  // Coordinates for the SVG nodes relative to a 500x500 box
  const nodes = {
    // AI & GenAI
    AGENT: { name: "Agentic AI", sector: "AI", x: 250, y: 150, desc: "Multi-agent cognitive orchestrations. Implemented specialized LLM agents in Startup Forge to validate ventures, design architectures, and pitch decks.", connections: ["LLM", "CHROMA"] },
    CHROMA: { name: "ChromaDB", sector: "AI", x: 190, y: 120, desc: "Vector database for semantic similarity and context injection. Configured ChromaDB embedding retrieval structures with Y Combinator data.", connections: ["RAG"] },
    RAG: { name: "RAG Setup", sector: "AI", x: 310, y: 120, desc: "Retrieval-Augmented Generation for factually accurate model synthesis. Deployed in startup discovery pipelines.", connections: ["LLM"] },
    LLM: { name: "LLM Integration", sector: "AI", x: 250, y: 80, desc: "Fast inference prompt engineering using Groq API, Llama, and Gemini architectures.", connections: [] },

    // Languages
    PYTHON: { name: "Python", sector: "LANG", x: 140, y: 220, desc: "Primary logic stack for artificial intelligence, FastAPI structures, pandas data frames, and RAG pipelines.", connections: ["AGENT", "MYSQL"] },
    CPP: { name: "C / C++", sector: "LANG", x: 90, y: 260, desc: "High-performance computation structures. Core engine of data structure validation, solved 1150+ problems on SkillRack.", connections: ["DSA"] },
    JAVA: { name: "Java", sector: "LANG", x: 110, y: 180, desc: "Object-oriented structures. Certified in Oracle Java Foundations 2025.", connections: ["OOPS"] },
    MYSQL: { name: "MySQL / SQL", sector: "LANG", x: 70, y: 210, desc: "Relational queries. Deployed with HackerRank certifications for structured schema schemas.", connections: ["DBMS"] },

    // Web Dev
    REACT: { name: "React.js", sector: "WEB", x: 360, y: 220, desc: "Rich component-based rendering. Engineered responsive frontends for Price Trackers and Startup Forge.", connections: ["JS", "NODE"] },
    JS: { name: "JavaScript", sector: "WEB", x: 390, y: 180, desc: "Core client scripting, asynchronous promises, state controls, dynamic vector interfaces.", connections: [] },
    NODE: { name: "Node / Express", sector: "WEB", x: 410, y: 260, desc: "RESTful server protocols, middleware authentications, JWT validation routines. (Beginner/Intermediate levels).", connections: ["MYSQL"] },
    HTML: { name: "HTML / CSS", sector: "WEB", x: 430, y: 210, desc: "Semantic structural hierarchy, fluid grid environments, and highly polished responsive custom overlays.", connections: [] },

    // Core Concepts
    DSA: { name: "DSA Core", sector: "CORE", x: 150, y: 350, desc: "Data structures and algorithms. Mastered search patterns, graph structures, trees, dynamic programming. Udemy Certified.", connections: ["CPP"] },
    DBMS: { name: "DBMS Structure", sector: "CORE", x: 220, y: 380, desc: "Database optimization, indices, normalizations, transactions, ACID properties.", connections: [] },
    OOPS: { name: "OOP Principles", sector: "CORE", x: 280, y: 380, desc: "Encapsulation, inheritance, polymorphism, abstraction. Applied across Python and C++ class blueprints.", connections: [] },

    // Tools
    GITHUB: { name: "GitHub", sector: "TOOL", x: 350, y: 350, desc: "Version control systems, branching, pull requests, automated webhooks, task integrations.", connections: ["REACT", "PYTHON"] },
    VSCODE: { name: "VS Code", sector: "TOOL", x: 310, y: 300, desc: "Primary scripting environment, extension optimization, debugging routines.", connections: [] },
    FIGMA: { name: "Figma / Canva", sector: "TOOL", x: 380, y: 300, desc: "Vector graphics wireframing, high fidelity HUD conceptualization, and creative editorial prototypes.", connections: [] }
  };

  const getConnections = () => {
    const lines = [];
    Object.keys(nodes).forEach((key) => {
      const node = nodes[key];
      node.connections.forEach((targetKey) => {
        const target = nodes[targetKey];
        if (target) {
          lines.push({
            id: `${key}-${targetKey}`,
            x1: node.x,
            y1: node.y,
            x2: target.x,
            y2: target.y,
            active: node.sector === activeSector || target.sector === activeSector
          });
        }
      });
    });
    return lines;
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Column - Skill Constellation Visualizer */}
      <div className="lg:col-span-7 flex">
        <HUDFrame
          title="NEURAL SKILL CONSTELLATION"
          subtitle="INTERACTIVE KNOWLEDGE GRID"
          borderColor="lime"
          badge="NETWORK_ONLINE"
          cornerText="SKILL-NET-01"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            {/* Sector selectors */}
            <div className="flex flex-wrap gap-2 justify-center select-none">
              {sectors.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSector(sec.id);
                    // Select first node in that sector
                    const firstNode = Object.keys(nodes).find(key => nodes[key].sector === sec.id);
                    if (firstNode) setSelectedNode(firstNode);
                  }}
                  className={`px-3 py-1 text-[10px] font-mono border rounded transition-all duration-300 ${
                    activeSector === sec.id
                      ? sec.color === 'lime'
                        ? 'bg-lime-neon/15 border-lime-neon text-lime-neon shadow-[0_0_10px_rgba(163,230,53,0.2)]'
                        : 'bg-orange-neon/15 border-orange-neon text-orange-neon shadow-[0_0_10px_rgba(255,111,60,0.2)]'
                      : 'bg-black/40 border-white/5 text-metallic hover:text-white hover:border-white/10'
                  }`}
                >
                  {sec.name}
                </button>
              ))}
            </div>

            {/* Constellation SVG Canvas */}
            <div className="relative border border-white/5 rounded bg-black/40 h-80 overflow-hidden flex items-center justify-center">
              {/* Subtle radar sweeps inside constellation canvas */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.02)_0%,transparent_70%)]" />
              
              <svg 
                viewBox="50 50 420 350" 
                className="w-full h-full max-h-[320px] select-none"
              >
                {/* Connection lines */}
                {getConnections().map((line) => (
                  <line
                    key={line.id}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={line.active ? "#a3e635" : "#334155"}
                    strokeWidth={line.active ? 1.5 : 0.75}
                    strokeDasharray={line.active ? "none" : "3,3"}
                    className="transition-all duration-300"
                  />
                ))}

                {/* Nodes rendering */}
                {Object.keys(nodes).map((key) => {
                  const node = nodes[key];
                  const isActive = node.sector === activeSector;
                  const isSelected = key === selectedNode;

                  // Define node styling based on sector colors
                  let colorClass = "fill-metallic stroke-metallic/20";
                  if (isActive) {
                    colorClass = node.sector === 'AI' || node.sector === 'TOOL' 
                      ? "fill-lime-neon stroke-lime-neon/40 glow-lime" 
                      : "fill-orange-neon stroke-orange-neon/40 glow-orange";
                  }
                  if (isSelected) {
                    colorClass = "fill-white stroke-lime-neon";
                  }

                  return (
                    <g 
                      key={key} 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedNode(key);
                        setActiveSector(node.sector);
                      }}
                    >
                      {/* Interactive hover circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? 10 : 7}
                        className={`transition-all duration-300 ${
                          isSelected 
                            ? 'fill-lime-neon/20 stroke-lime-neon stroke-2 animate-pulse' 
                            : 'fill-black stroke-white/20 group-hover:stroke-white/60'
                        }`}
                      />
                      
                      {/* Inner solid node point */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? 4 : 3}
                        className={`${
                          isSelected 
                            ? 'fill-lime-neon' 
                            : isActive 
                              ? node.sector === 'AI' || node.sector === 'TOOL' ? 'fill-lime-neon' : 'fill-orange-neon'
                              : 'fill-metallic/60'
                        } transition-colors duration-300`}
                      />

                      {/* Text label */}
                      <text
                        x={node.x}
                        y={node.y - 12}
                        textAnchor="middle"
                        className={`font-mono text-[9px] ${
                          isSelected 
                            ? 'fill-lime-neon font-bold' 
                            : isActive 
                              ? 'fill-ivory' 
                              : 'fill-metallic group-hover:fill-ivory'
                        } transition-colors duration-300`}
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </HUDFrame>
      </div>

      {/* Right Column - Constellation Decrypt details */}
      <div className="lg:col-span-5 flex">
        <HUDFrame
          title="DECODED COGNITIVE NODE"
          subtitle="TECHNOLOGY TELEMETRY"
          borderColor="orange"
          badge="NODE_DECRYPT"
          cornerText="SKILL-INFO"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="bg-[#050508]/60 border border-white/5 rounded p-5 text-left h-full flex flex-col justify-between min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <span className="text-[10px] font-mono text-orange-neon uppercase tracking-wider block">
                    SECTOR: {sectors.find(s => s.id === nodes[selectedNode].sector)?.name || "UNKNOWN"}
                  </span>
                  <h4 className="font-orbitron font-extrabold text-xl text-ivory tracking-wide mt-1">
                    <GlitchText text={nodes[selectedNode].name} speed={25} />
                  </h4>
                </div>

                <div className="space-y-3 font-mono">
                  <div className="text-[10px] text-metallic uppercase tracking-widest">
                    SYSTEM_DEPLOYMENT_REPORTS:
                  </div>
                  <p className="text-xs text-ivory leading-relaxed bg-black/40 border border-white/5 p-3 rounded">
                    {nodes[selectedNode].desc}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3 space-y-2">
                  <span className="text-[9px] font-mono text-metallic block">RELATIONAL LINK MAPS:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {nodes[selectedNode].connections.length > 0 ? (
                      nodes[selectedNode].connections.map((conn) => (
                        <span 
                          key={conn}
                          onClick={() => {
                            setSelectedNode(conn);
                            setActiveSector(nodes[conn].sector);
                          }}
                          className="px-2 py-0.5 bg-lime-neon/5 hover:bg-lime-neon/20 border border-lime-neon/20 text-lime-neon font-mono text-[9px] rounded cursor-pointer transition-colors duration-200"
                        >
                          &gt; {nodes[conn]?.name || conn}
                        </span>
                      ))
                    ) : (
                      <span className="text-[9px] font-mono text-metallic italic">No direct sub-links mapped</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 text-[9px] font-mono text-metallic border-t border-white/5 pt-2 flex justify-between">
              <span>STATUS: NOMINAL</span>
              <span>VERIFIED: 2026</span>
            </div>
          </div>
        </HUDFrame>
      </div>
    </div>
  );
};

export default SkillConstellation;
