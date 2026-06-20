import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HUDFrame from '../components/HUDFrame';
import GlitchText from '../components/GlitchText';

const Skills = () => {
  const [activeSector, setActiveSector] = useState('ALL');
  const [selectedNode, setSelectedNode] = useState('AGENT');
  const [hoveredNode, setHoveredNode] = useState(null);

  const sectors = [
    { id: 'ALL', name: 'All Skills', color: 'ivory' },
    { id: 'AI', name: 'AI & GenAI', color: 'lime' },
    { id: 'LANG', name: 'Languages', color: 'orange' },
    { id: 'WEB', name: 'Web Dev', color: 'emerald' },
    { id: 'CORE', name: 'Core Concepts', color: 'orange' },
    { id: 'TOOL', name: 'Tools & Systems', color: 'lime' }
  ];

  // Coordinates for the SVG nodes relative to a 500x400 box
  const nodes = {
    // AI & GenAI
    AGENT: { name: "Agentic AI", sector: "AI", x: 250, y: 150, level: 90, desc: "Multi-agent cognitive orchestrations. Implemented specialized LLM agents in Startup Forge to validate ventures, design architectures, and pitch decks.", connections: ["LLM", "CHROMA"] },
    CHROMA: { name: "ChromaDB", sector: "AI", x: 190, y: 120, level: 85, desc: "Vector database for semantic similarity and context injection. Configured ChromaDB embedding retrieval structures with Y Combinator data.", connections: ["RAG"] },
    RAG: { name: "RAG Setup", sector: "AI", x: 310, y: 120, level: 88, desc: "Retrieval-Augmented Generation for factually accurate model synthesis. Deployed in startup discovery pipelines.", connections: ["LLM"] },
    LLM: { name: "LLM Integration", sector: "AI", x: 250, y: 80, level: 92, desc: "Fast inference prompt engineering using Groq API, Llama, and Gemini architectures.", connections: [] },

    // Languages
    PYTHON: { name: "Python", sector: "LANG", x: 140, y: 220, level: 95, desc: "Primary logic stack for artificial intelligence, FastAPI structures, pandas data frames, and RAG pipelines.", connections: ["AGENT", "MYSQL"] },
    CPP: { name: "C / C++", sector: "LANG", x: 90, y: 260, level: 90, desc: "High-performance computation structures. Core engine of data structure validation, solved 1150+ problems on SkillRack.", connections: ["DSA"] },
    JAVA: { name: "Java", sector: "LANG", x: 110, y: 180, level: 80, desc: "Object-oriented structures. Certified in Oracle Java Foundations 2025.", connections: ["OOPS"] },
    MYSQL: { name: "MySQL / SQL", sector: "LANG", x: 70, y: 210, level: 85, desc: "Relational queries. Deployed with HackerRank certifications for structured database schemas.", connections: ["DBMS"] },

    // Web Dev
    REACT: { name: "React.js", sector: "WEB", x: 360, y: 220, level: 92, desc: "Rich component-based rendering. Engineered responsive frontends for Price Trackers and Startup Forge.", connections: ["JS", "NODE"] },
    JS: { name: "JavaScript", sector: "WEB", x: 390, y: 180, level: 90, desc: "Core client scripting, asynchronous promises, state controls, dynamic vector interfaces.", connections: [] },
    NODE: { name: "Node / Express", sector: "WEB", x: 410, y: 260, level: 80, desc: "RESTful server protocols, middleware authentications, JWT validation routines. (Beginner/Intermediate levels).", connections: ["MYSQL"] },
    HTML: { name: "HTML / CSS", sector: "WEB", x: 430, y: 210, level: 90, desc: "Semantic structural hierarchy, fluid grid environments, and highly polished responsive custom overlays.", connections: [] },

    // Core Concepts
    DSA: { name: "DSA Core", sector: "CORE", x: 150, y: 350, level: 92, desc: "Data structures and algorithms. Mastered search patterns, graph structures, trees, dynamic programming. Udemy Certified.", connections: ["CPP"] },
    DBMS: { name: "DBMS Structure", sector: "CORE", x: 220, y: 380, level: 85, desc: "Database optimization, indices, normalizations, transactions, ACID properties.", connections: [] },
    OOPS: { name: "OOP Principles", sector: "CORE", x: 280, y: 380, level: 88, desc: "Encapsulation, inheritance, polymorphism, abstraction. Applied across Python and C++ class blueprints.", connections: [] },

    // Tools
    GITHUB: { name: "GitHub", sector: "TOOL", x: 350, y: 350, level: 90, desc: "Version control systems, branching, pull requests, automated webhooks, task integrations.", connections: ["REACT", "PYTHON"] },
    VSCODE: { name: "VS Code", sector: "TOOL", x: 310, y: 300, level: 95, desc: "Primary scripting environment, extension optimization, debugging routines.", connections: [] },
    FIGMA: { name: "Figma / Canva", sector: "TOOL", x: 380, y: 300, level: 78, desc: "Vector graphics wireframing, high fidelity HUD conceptualization, and creative editorial prototypes.", connections: [] }
  };

  const getSectorColor = (sectorId) => {
    switch (sectorId) {
      case 'ALL': return '#f5eedc'; // Ivory
      case 'AI': return '#a3e635'; // Lime neon
      case 'LANG': return '#ff6f3c'; // Orange neon
      case 'WEB': return '#10b981'; // Emerald glow
      case 'CORE': return '#ff6f3c'; // Orange neon
      case 'TOOL': return '#a3e635'; // Lime neon
      default: return '#94a3b8';
    }
  };

  const getSectorThemeName = (sectorId) => {
    switch (sectorId) {
      case 'ALL': return 'lime';
      case 'AI': return 'lime';
      case 'LANG': return 'orange';
      case 'WEB': return 'emerald';
      case 'CORE': return 'orange';
      case 'TOOL': return 'lime';
      default: return 'orange';
    }
  };

  const getConnections = () => {
    const lines = [];
    const seen = new Set();
    Object.keys(nodes).forEach((key) => {
      const node = nodes[key];
      node.connections.forEach((targetKey) => {
        const target = nodes[targetKey];
        if (target) {
          const pairId = [key, targetKey].sort().join('-');
          if (!seen.has(pairId)) {
            seen.add(pairId);
            lines.push({
              id: pairId,
              sourceKey: key,
              targetKey: targetKey,
              x1: node.x,
              y1: node.y,
              x2: target.x,
              y2: target.y,
              active: activeSector === 'ALL' || (node.sector === activeSector && target.sector === activeSector)
            });
          }
        }
      });
    });
    return lines;
  };

  // Telemetry details data
  const activeNodeData = nodes[selectedNode] || nodes.AGENT;
  const currentTheme = getSectorThemeName(activeNodeData.sector);
  const currentThemeColor = getSectorColor(activeNodeData.sector);

  // Digital level blocks
  const totalBlocks = 10;
  const filledBlocks = Math.round(activeNodeData.level / 10);
  const blocksArray = Array.from({ length: totalBlocks });

  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5 select-none">
      <div className="text-left mb-10">
        <h2 className="text-3xl font-orbitron font-extrabold text-ivory tracking-wide">
          TECHNICAL SKILLS
        </h2>
      </div>

      {/* Category selector tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 select-none">
        {sectors.map((sec) => {
          const isTabActive = activeSector === sec.id;
          const themeColor = getSectorColor(sec.id);
          
          return (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSector(sec.id);
                // Select the first node in the newly selected sector
                if (sec.id === 'ALL') {
                  setSelectedNode('AGENT');
                } else {
                  const firstNode = Object.keys(nodes).find(key => nodes[key].sector === sec.id);
                  if (firstNode) setSelectedNode(firstNode);
                }
              }}
              className="relative px-4 py-2 text-xs font-mono font-semibold tracking-wide border rounded cursor-pointer transition-all duration-300"
              style={{
                borderColor: isTabActive ? themeColor : 'rgba(255, 255, 255, 0.05)',
                color: isTabActive ? '#ffffff' : 'var(--color-metallic)',
                backgroundColor: isTabActive ? `${themeColor}0f` : 'rgba(5, 5, 8, 0.4)',
                boxShadow: isTabActive ? `0 0 12px ${themeColor}1a` : 'none'
              }}
            >
              {isTabActive && (
                <span 
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full animate-pulse" 
                  style={{ backgroundColor: themeColor }}
                />
              )}
              {sec.name}
            </button>
          );
        })}
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column - Skill Constellation Visualizer */}
        <div className="lg:col-span-7 flex">
          <HUDFrame
            borderColor={getSectorThemeName(activeSector)}
            className="flex-1 flex flex-col justify-between animate-fade-in"
            showHeader={false}
            showFooter={false}
          >
            <h3 className="text-xs font-orbitron font-bold text-lime-neon uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-neon animate-pulse" />
              Neural Skill Constellation
            </h3>
            <div className="relative border border-white/5 rounded bg-black/60 h-[400px] overflow-hidden flex items-center justify-center">
              {/* Dotted Grid Background */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="0.75" fill="rgba(255, 255, 255, 0.07)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_80%)]" />
              
              <svg 
                viewBox="0 0 500 400" 
                className="w-full h-full select-none relative z-10"
              >
                {/* Connection lines */}
                {getConnections().map((line) => {
                  const isLineHighlighted = 
                    (line.sourceKey === selectedNode || line.targetKey === selectedNode) ||
                    (line.sourceKey === hoveredNode || line.targetKey === hoveredNode);

                  const sourceColor = getSectorColor(nodes[line.sourceKey].sector);
                  
                  const strokeColor = isLineHighlighted 
                    ? sourceColor 
                    : line.active 
                      ? `${sourceColor}66` 
                      : 'rgba(255, 255, 255, 0.02)';

                  const strokeWidth = isLineHighlighted ? 1.75 : 0.75;
                  const strokeDasharray = isLineHighlighted 
                    ? "none" 
                    : (activeSector === 'ALL') 
                      ? "3,5" 
                      : line.active 
                        ? "none" 
                        : "3,5";

                  return (
                    <line
                      key={line.id}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={strokeDasharray}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* Nodes rendering */}
                {Object.keys(nodes).map((key) => {
                  const node = nodes[key];
                  const isActive = activeSector === 'ALL' || node.sector === activeSector;
                  const isSelected = key === selectedNode;
                  const isHovered = key === hoveredNode;
                  const themeColor = getSectorColor(node.sector);

                  // Fade out inactive sector nodes
                  const opacityClass = isActive || isSelected || isHovered
                    ? 'opacity-100 scale-100'
                    : 'opacity-25 scale-95';

                  const labelWidth = node.name.length * 6.2 + 10;
                  const labelX = node.x - labelWidth / 2;
                  const labelY = node.y - 24;

                  return (
                    <g 
                      key={key} 
                      className={`cursor-pointer transition-all duration-500 origin-center ${opacityClass}`}
                      onClick={() => {
                        setSelectedNode(key);
                        setActiveSector(node.sector);
                      }}
                      onMouseEnter={() => setHoveredNode(key)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Outer Pulse aura on active selection */}
                      {(isSelected || isHovered) && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={15}
                          fill="none"
                          stroke={themeColor}
                          strokeWidth={1}
                          className="animate-ping opacity-30"
                          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                        />
                      )}

                      {/* Interactive ring */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? 9 : isHovered ? 7.5 : 5.5}
                        className="transition-all duration-300 fill-[#08080c] stroke-2"
                        stroke={isSelected ? '#ffffff' : isActive || isHovered ? themeColor : 'rgba(255, 255, 255, 0.2)'}
                      />
                      
                      {/* Inner solid node point */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? 4 : isHovered ? 3.5 : 2}
                        fill={isSelected ? themeColor : isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'}
                        className="transition-colors duration-300"
                      />

                      {/* Text label backdrop box for clean styling */}
                      <rect
                        x={labelX}
                        y={labelY}
                        width={labelWidth}
                        height={15}
                        rx={3}
                        fill="rgba(5, 5, 8, 0.95)"
                        stroke={isSelected ? '#ffffff' : isHovered ? themeColor : isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'}
                        strokeWidth={isSelected ? 1.25 : 0.75}
                        className="transition-all duration-300"
                      />

                      {/* Text label */}
                      <text
                        x={node.x}
                        y={labelY + 10}
                        textAnchor="middle"
                        fill={isSelected ? '#ffffff' : isHovered ? themeColor : isActive ? 'rgba(245, 238, 220, 0.85)' : 'rgba(245, 238, 220, 0.4)'}
                        className={`font-mono text-[9px] select-none tracking-wide transition-colors duration-300 ${
                          isSelected ? 'font-bold' : ''
                        }`}
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </HUDFrame>
        </div>

        {/* Right Column - Constellation Decrypt details */}
        <div className="lg:col-span-5 flex">
          <HUDFrame
            borderColor={currentTheme}
            className="flex-1 flex flex-col justify-between"
            showHeader={false}
            showFooter={false}
          >
            <div className="bg-[#050508]/60 border border-white/5 rounded p-5 text-left h-full flex flex-col justify-between min-h-[360px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNode}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5 flex-grow"
                >
                  {/* Sector & Name Header */}
                  <div>
                    <span 
                      className="text-[10px] font-mono uppercase tracking-wider block"
                      style={{ color: currentThemeColor }}
                    >
                      SECTOR: {sectors.find(s => s.id === activeNodeData.sector)?.name || "UNKNOWN"}
                    </span>
                    <h4 className="font-orbitron font-extrabold text-xl text-ivory tracking-wide mt-1">
                      <GlitchText text={activeNodeData.name} speed={20} />
                    </h4>
                  </div>

                  {/* Level / Expertise Indicator */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-metallic uppercase tracking-widest block">
                      PROFICIENCY_INDEX:
                    </span>
                    <div className="flex items-center gap-1">
                      {blocksArray.map((_, i) => {
                        const isFilled = i < filledBlocks;
                        return (
                          <div
                            key={i}
                            className={`h-2.5 w-3.5 rounded-xs transition-all duration-500 ${
                              isFilled
                                ? currentTheme === 'lime'
                                  ? 'bg-lime-neon/80 shadow-[0_0_8px_rgba(163,230,53,0.4)]'
                                  : currentTheme === 'orange'
                                    ? 'bg-orange-neon/80 shadow-[0_0_8px_rgba(255,111,60,0.4)]'
                                    : 'bg-emerald-glow/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                                : 'bg-white/5 border border-white/10'
                            }`}
                          />
                        );
                      })}
                      <span className="ml-2 text-xs font-mono font-bold" style={{ color: currentThemeColor }}>
                        {activeNodeData.level}%
                      </span>
                    </div>
                  </div>

                  {/* Deployment report text */}
                  <div className="space-y-2 font-mono">
                    <div className="text-[10px] text-metallic uppercase tracking-widest">
                      SYSTEM_DEPLOYMENT_REPORTS:
                    </div>
                    <p className="text-xs text-ivory leading-relaxed bg-[#08080c]/60 border border-white/5 p-3 rounded select-text min-h-[90px]">
                      {activeNodeData.desc}
                    </p>
                  </div>

                  {/* Relational connections badges */}
                  <div className="border-t border-white/5 pt-3 space-y-2">
                    <span className="text-[9px] font-mono text-metallic block">RELATIONAL LINK MAPS:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeNodeData.connections.length > 0 ? (
                        activeNodeData.connections.map((conn) => (
                          <button 
                            key={conn}
                            onClick={() => {
                              setSelectedNode(conn);
                              setActiveSector(nodes[conn].sector);
                            }}
                            className="px-2 py-0.5 bg-lime-neon/5 hover:bg-lime-neon/15 border border-lime-neon/20 hover:border-lime-neon/50 text-lime-neon font-mono text-[9px] rounded cursor-pointer transition-colors duration-200"
                            style={{
                              color: getSectorColor(nodes[conn].sector),
                              borderColor: `${getSectorColor(nodes[conn].sector)}33`,
                              backgroundColor: `${getSectorColor(nodes[conn].sector)}0a`
                            }}
                          >
                            &gt; {nodes[conn]?.name || conn}
                          </button>
                        ))
                      ) : (
                        <span className="text-[9px] font-mono text-metallic/40 italic">No direct connections mapped</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </HUDFrame>
        </div>
      </div>
    </section>
  );
};

export default Skills;

