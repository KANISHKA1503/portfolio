import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, ShieldCheck } from 'lucide-react';

const LandingOS = ({ onBootComplete }) => {
  const [scanState, setScanState] = useState('idle'); // idle | scanning | success
  const [scanProgress, setScanProgress] = useState(0);
  const [scrambleKey, setScrambleKey] = useState('');
  const [logs, setLogs] = useState([
    '// PORTFOLIO INITIALIZATION PROTOCOLS: ONLINE',
    '// WELCOME TO KANISHKA S. DIGITAL OS DECK',
    '// PLACE FINGER ON TARGET OR TAP SPEED BOOT FOR INSTANT ENTRY...'
  ]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);

  // Background 3D Holographic Particle Sphere Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 3D sphere points
    const particles = [];
    const particleCount = 110;
    const sphereRadius = Math.min(width, height) * 0.26;
    const perspective = 320;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;

      particles.push({
        x: sphereRadius * Math.sin(theta) * Math.cos(phi),
        y: sphereRadius * Math.sin(theta) * Math.sin(phi),
        z: sphereRadius * Math.cos(theta),
        radius: Math.random() * 1.5 + 1.2
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotation speeds based on scanning state
      let angleX = 0.003;
      let angleY = 0.004;
      if (scanState === 'scanning') {
        angleX = 0.012;
        angleY = 0.018;
      } else if (scanState === 'success') {
        angleX = 0.03;
        angleY = 0.04;
      }

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Rotate points in 3D
      const projected = particles.map(p => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Save rotated coordinates
        p.x = x1;
        p.y = y2;
        p.z = z2;

        // Project 3D onto 2D viewport
        const zDepth = z2 + sphereRadius + 120;
        const scale = perspective / (perspective + zDepth);
        const projX = x1 * scale + width / 2;
        const projY = y2 * scale + height / 2;

        return {
          x: projX,
          y: projY,
          z: z2,
          radius: p.radius * scale * 2.2,
          opacity: scale * 0.95
        };
      });

      // Draw connection lines in projected 3D space
      ctx.lineWidth = 0.55;
      const connectionDist = 70;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const p1 = projected[i];
          const p2 = projected[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < connectionDist && Math.abs(p1.z - p2.z) < 80) {
            const alpha = (1 - dist / connectionDist) * 0.12 * (p1.opacity + p2.opacity) / 2;
            ctx.strokeStyle = scanState === 'success'
              ? `rgba(163, 230, 53, ${alpha * 1.8})`
              : scanState === 'scanning'
                ? `rgba(255, 111, 60, ${alpha * 2.2})`
                : `rgba(255, 111, 60, ${alpha * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Sort points by Z to draw front points over back points
      projected.sort((a, b) => a.z - b.z);
      projected.forEach(p => {
        ctx.fillStyle = scanState === 'success'
          ? `rgba(163, 230, 53, ${p.opacity})`
          : scanState === 'scanning'
            ? `rgba(255, 111, 60, ${p.opacity * 1.2})`
            : `rgba(255, 111, 60, ${p.opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Core highlight on points closer to reader
        if (p.z > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.45})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scanState]);

  // Dynamic status display ticker simulation
  useEffect(() => {
    if (scanState !== 'scanning') {
      setScrambleKey('');
      return;
    }
    const statusCodes = [
      'LOAD_PROFILE_DATA_STREAM',
      'INDEX_PROJECT_METADATA',
      'PARSE_COGNITIVE_NODES',
      'RETRIEVE_VEG_TRACKER_ASSETS',
      'COMPILED_EXPERIENCE_MATRIX',
      'BOOT_PORTFOLIO_WORKSPACE'
    ];
    const interval = setInterval(() => {
      const code = statusCodes[Math.floor(Math.random() * statusCodes.length)];
      const num = Math.floor(Math.random() * 9000) + 1000;
      setScrambleKey(`>> ${code}_[OK_${num}]`);
    }, 180);

    return () => clearInterval(interval);
  }, [scanState]);

  // Authentication progress controller
  useEffect(() => {
    let interval;
    if (scanState === 'scanning') {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 9) + 3;
          if (next >= 100) {
            clearInterval(interval);
            setScanState('success');
            return 100;
          }
          return next;
        });
      }, 90);
    }
    return () => clearInterval(interval);
  }, [scanState]);

  // Dynamic log terminal stream during scanner verification
  useEffect(() => {
    if (scanState === 'idle') {
      return;
    }

    if (scanState === 'success') {
      setLogs((prev) => [
        ...prev,
        '// [SUCCESS] BIO-INDEX VERIFIED SUCCESSFULLY',
        '// [SUCCESS] INITIALIZING PORTFOLIO WORKSPACE DISPLAY...',
      ]);
      const timeout = setTimeout(() => {
        onBootComplete();
      }, 950);
      return () => clearTimeout(timeout);
    }

    // Logging based on progress percentage
    if (scanState === 'scanning') {
      const logMilestones = [
        { progress: 5, log: '>> [BOOT] INITIATING PORTFOLIO DECK LOAD ROUTINE...' },
        { progress: 18, log: '>> [LOAD] FETCHING PROFILE & BIO DETAILS...' },
        { progress: 32, log: '>> [INDEX] ASSEMBLING SKILLS CONSTELLATION COGNITIVE NODES...' },
        { progress: 48, log: '>> [DATABASE] LOADING VEGETABLE PRICE TRACKER & PROJECT ASSETS...' },
        { progress: 65, log: '>> [AGENT] RETRIEVING CHROMADB VECTOR STORES...' },
        { progress: 80, log: '>> [STYLE] INJECTING METALLIC GLASS DESIGN LAYERS...' },
        { progress: 92, log: '>> [READY] TRANSITIONING TO INTERACTIVE PORTFOLIO ENVIRONMENT...' }
      ];

      logMilestones.forEach(m => {
        if (scanProgress >= m.progress) {
          setLogs((prev) => {
            if (prev.includes(m.log)) return prev;
            return [...prev, m.log];
          });
        }
      });
    }
  }, [scanState, scanProgress, onBootComplete]);

  // Automatic verification on tap
  const handleStartScan = () => {
    if (scanState === 'idle') {
      setScanState('scanning');
      setScanProgress(0);
      setLogs(['>> [SYSTEM] INITIALIZING BIOMETRIC SCAN SEQUENCE...']);
    }
  };

  // Mouse tilt parallax handling
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = (clientX / width - 0.5) * 16;
    const y = (clientY / height - 0.5) * 16;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-0 bg-[#08080c] flex flex-col justify-between p-6 md:p-10 z-50 overflow-hidden select-none font-mono"
    >
      <style>{`
        @keyframes scan-laser {
          0%, 100% { transform: translateY(-75px); opacity: 0.8; }
          50% { transform: translateY(75px); opacity: 0.9; }
        }
        @keyframes rotate-outer {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotate-inner {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-rotate-outer {
          transform-origin: center;
          animation: rotate-outer 25s infinite linear;
        }
        .animate-rotate-inner {
          transform-origin: center;
          animation: rotate-inner 12s infinite linear;
        }
        .laser-line-animated {
          animation: scan-laser 2s infinite ease-in-out;
        }
        .glitch-text {
          text-shadow: 0 0 8px rgba(255, 111, 60, 0.4);
        }
        @keyframes pulse-bar-0 { 0% { height: 15%; opacity: 0.25; } 100% { height: 85%; opacity: 0.75; } }
        @keyframes pulse-bar-1 { 0% { height: 35%; opacity: 0.35; } 100% { height: 100%; opacity: 0.85; } }
        @keyframes pulse-bar-2 { 0% { height: 25%; opacity: 0.2; } 100% { height: 65%; opacity: 0.7; } }
        @keyframes pulse-bar-3 { 0% { height: 45%; opacity: 0.45; } 100% { height: 90%; opacity: 0.8; } }
      `}</style>

      {/* Floating Canvas Neural Net Animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-55"
      />

      {/* Subtly glowing grids */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none z-0" />
      <div className="absolute inset-0 cyber-grid-fine opacity-25 pointer-events-none z-0" />

      {/* Viewport Corners Frames */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-orange-neon/30 pointer-events-none z-10" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-orange-neon/30 pointer-events-none z-10" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-orange-neon/30 pointer-events-none z-10" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-orange-neon/30 pointer-events-none z-10" />

      {/* Top HUD Frame */}
      <div className="flex justify-between items-center text-[10px] tracking-widest text-metallic border-b border-white/5 pb-4 relative z-10 mx-6">
        <div className="flex items-center gap-2">
          <span 
            className={`w-2 h-2 rounded-full pulse-led transition-colors duration-300 ${
              scanState === 'success' ? 'bg-lime-neon' : scanState === 'scanning' ? 'bg-orange-neon' : 'bg-white/30'
            }`} 
          />
          <span>PORTFOLIO GATEWAY: STANDBY</span>
        </div>
        <span className="hidden sm:inline">ROLE: COGNITIVE SYSTEM DEV</span>
        <span>SYSTEM: ONLINE</span>
      </div>

      {/* Fullscreen Interactive Portal Workspace */}
      <div className="flex-grow flex items-center justify-center px-6 py-6 relative z-10 w-full max-w-5xl mx-auto">

        {/* Outer Flat 2D Container to prevent text rasterization blur */}
        <div className="flex-grow flex flex-col items-center justify-center space-y-6 w-full max-w-2xl mx-auto relative z-10">
          
          {/* Header Identity Info (Flat 2D - Crisp rendering) */}
          <div className="text-center space-y-1 w-full">
            <span className="text-orange-neon text-xs font-mono tracking-[0.35em] uppercase block mb-2 font-semibold">
              &gt; SYSTEM STANDBY_
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-orbitron font-extrabold text-ivory tracking-wider uppercase leading-none whitespace-nowrap select-none">
              KANISHKA<span className="text-orange-neon"> S</span>
            </h1>
            <p className="text-[10px] sm:text-xs tracking-[0.25em] text-metallic uppercase font-mono mt-2">
              Agentic AI & Cognitive Systems Gateway
            </p>
          </div>

          {/* Central Rotating Biometric Target HUD (Tilts in 3D) */}
          <motion.div 
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 85, damping: 22 }}
            style={{ 
              transformStyle: "preserve-3d", 
              perspective: 1200,
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'antialiased'
            }}
            className="relative w-56 h-56 flex items-center justify-center z-20"
          >
            
            {/* Concentric Circle 1 - Detailed Ring with Angle Scale */}
            <svg className="absolute w-full h-full animate-rotate-outer opacity-50 pointer-events-none">
              <circle 
                cx="112" 
                cy="112" 
                r="104" 
                fill="none" 
                stroke={scanState === 'success' ? '#a3e635' : '#ff6f3c'} 
                strokeWidth="1.5" 
                strokeDasharray="4 8 16 12 30 8" 
                className="transition-colors duration-300"
              />
            </svg>

            {/* Concentric Circle 2 - Inner Dotted Ring */}
            <svg className="absolute w-5/6 h-5/6 animate-rotate-inner opacity-40 pointer-events-none">
              <circle 
                cx="93.3" 
                cy="93.3" 
                r="84" 
                fill="none" 
                stroke={scanState === 'success' ? '#a3e635' : '#ff6f3c'} 
                strokeWidth="1.5" 
                strokeDasharray="2 12 6 6" 
                className="transition-colors duration-300"
              />
            </svg>

            {/* Pulsing Target Overlay */}
            <div 
              className={`absolute w-40 h-40 rounded-full border border-white/5 transition-all duration-500 flex items-center justify-center ${
                scanState === 'success' 
                  ? 'border-lime-neon/40 shadow-[0_0_35px_rgba(163,230,53,0.18)] bg-lime-neon/5 scale-105' 
                  : scanState === 'scanning'
                    ? 'border-orange-neon/50 shadow-[0_0_25px_rgba(255,111,60,0.18)] bg-orange-neon/5 scale-100'
                    : 'border-white/10 hover:border-orange-neon/40 hover:bg-white/5'
              }`}
            >
              {/* Scanner Button Surface */}
              <button
                onClick={handleStartScan}
                disabled={scanState !== 'idle'}
                className={`w-32 h-32 rounded-full flex flex-col items-center justify-center outline-none transition-all duration-300 ${
                  scanState === 'success'
                    ? 'bg-lime-neon/10 border-lime-neon shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                    : scanState === 'scanning'
                      ? 'bg-orange-neon/10 border-orange-neon shadow-[0_0_15px_rgba(255,111,60,0.2)]'
                      : 'bg-[#0a0a0f]/80 border border-white/20 hover:border-orange-neon hover:shadow-[0_0_20px_rgba(255,111,60,0.25)] cursor-pointer'
                }`}
              >
                <Fingerprint 
                  size={52} 
                  className={`transition-all duration-500 ${
                    scanState === 'success' 
                      ? 'text-lime-neon scale-105' 
                      : scanState === 'scanning'
                        ? 'text-orange-neon animate-pulse'
                        : 'text-metallic group-hover:text-orange-neon'
                  }`}
                />
                
                {scanState === 'scanning' && (
                  <span className="text-[11px] text-orange-neon mt-2 font-bold tracking-widest">
                    {scanProgress}%
                  </span>
                )}
                {scanState === 'idle' && (
                  <span className="text-[8px] text-metallic uppercase tracking-widest mt-2 font-bold group-hover:text-orange-neon">
                    TAP TO SCAN
                  </span>
                )}
              </button>
            </div>

            {/* Holographic scanning laser line overlay */}
            {scanState === 'scanning' && (
              <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-orange-neon shadow-[0_0_8px_#ff6f3c] laser-line-animated pointer-events-none" />
            )}
          </motion.div>

          {/* Status Display Ticker Display (Flat 2D - Crisp) */}
          <div className="h-4 flex items-center justify-center">
            <AnimatePresence>
              {scrambleKey ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.85 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-orange-neon/90 tracking-widest uppercase font-mono font-semibold"
                >
                  {scrambleKey}
                </motion.div>
              ) : (
                <div className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                  PORTFOLIO INTERFACE STANDBY
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Instruction Bar / Verification Result Prompts (Flat 2D) */}
          <div className="w-full text-center space-y-1.5 px-4">
            <div className={`text-xs font-bold tracking-widest transition-colors duration-300 uppercase ${
              scanState === 'success' ? 'text-lime-neon glow-lime' : 'text-orange-neon glow-orange'
            }`}>
              {scanState === 'success' 
                ? '>> PORTFOLIO ENTRY GRANTED // ENTERING <<' 
                : scanState === 'scanning'
                  ? '>> INITIALIZING PORTFOLIO RETRIEVAL <<'
                  : '>> TOUCH FINGERPRINT TO ACCESS PORTFOLIO <<'}
            </div>
            <div className="text-[10px] text-metallic uppercase tracking-widest leading-relaxed">
              {scanState === 'idle' 
                ? 'SCAN YOUR FINGERPRINT ON THE CORRESPONDING TARGET TO INITIATE BOOT SEQUENCE AND VIEW THE PORTFOLIO SECTIONS.'
                : scanState === 'scanning'
                  ? 'LOADING DEVELOPMENT ENVIRONMENT, PROJECTS, AND COGNITIVE KNOWLEDGE FILES...'
                  : 'BOOT COMPLETED. LOADING INTERACTIVE GRAPH WORKSPACE.'}
            </div>
          </div>

          {/* Speed Bypass / Entrance Buttons (Flat 2D) */}
          {scanState === 'idle' && (
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStartScan}
                className="px-6 py-2.5 bg-orange-neon text-black font-orbitron font-bold text-xs uppercase tracking-widest rounded hover:bg-orange-neon/80 transition-all duration-300 shadow-[0_0_15px_rgba(255,111,60,0.2)] cursor-pointer"
              >
                Initiate scan
              </button>
              <button
                onClick={onBootComplete}
                className="px-6 py-2.5 bg-transparent border border-white/20 text-ivory hover:border-orange-neon hover:text-orange-neon font-orbitron font-bold text-xs uppercase tracking-widest rounded transition-all duration-300 cursor-pointer"
              >
                Bypass scan
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Bottom HUD bar */}
      <div className="flex flex-col items-center gap-1.5 relative z-10 border-t border-white/5 pt-4 text-[8px] text-metallic tracking-wider mx-6">
        <span>KANISHKA S // COGNITIVE DEVELOPMENT OS // INTERACTIVE DECK</span>
        <span>© 2026 KANISHKA S. ALL RIGHTS OPERATIONAL.</span>
      </div>
    </motion.div>
  );
};

export default LandingOS;
