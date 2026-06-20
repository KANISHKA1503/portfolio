import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Award, Cpu, Briefcase, HelpCircle, Network, Clock, Radio } from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import LandingOS from './sections/LandingOS';
import IdentityChamber from './sections/IdentityChamber';
import SkillConstellation from './sections/SkillConstellation';
import MissionControl from './sections/MissionControl';
import AchievementVault from './sections/AchievementVault';
import TerminalContact from './sections/TerminalContact';

function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [activeSection, setActiveSection] = useState('SPECS');
  const [currentTime, setCurrentTime] = useState('');
  const [batteryLevel, setBatteryLevel] = useState('100%');

  // Realistic time and metrics ticks
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'SPECS', label: 'SYS_SPECS', icon: Shield, subtitle: 'Identity Chamber' },
    { id: 'NEURAL', label: 'NEURAL_NET', icon: Network, subtitle: 'Skill Constellation' },
    { id: 'MISSIONS', label: 'MISSION_CTRL', icon: Briefcase, subtitle: 'Project Laboratories' },
    { id: 'VAULT', label: 'RECORD_VAULT', icon: Award, subtitle: 'Milestone Dossiers' },
    { id: 'DISPATCH', label: 'DISPATCH_CMD', icon: Terminal, subtitle: 'Comms Prompt' }
  ];

  return (
    <>
      {/* Scanline CRT simulation */}
      <div className="scanlines" />

      <AnimatePresence mode="wait">
        {!isBooted ? (
          <LandingOS key="boot" onBootComplete={() => setIsBooted(true)} />
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen bg-cyber-bg flex flex-col justify-between relative overflow-hidden"
          >
            {/* Immersive Backgrounds */}
            <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20" />
            <div className="absolute inset-0 cyber-grid-fine pointer-events-none opacity-45" />
            <div className="absolute inset-0 radar-sweep pointer-events-none opacity-5" />
            <MatrixRain />

            {/* Dashboard Top Header Bar */}
            <header className="relative z-20 border-b border-orange-neon/15 bg-black/60 backdrop-blur-md px-6 py-4 flex flex-wrap justify-between items-center select-none">
              <div className="flex items-center gap-3">
                <span className="font-orbitron font-black text-lg tracking-widest text-ivory">
                  KANISHKA<span className="text-orange-neon">.OS</span>
                </span>
                <span className="px-2 py-0.5 border border-lime-neon/30 bg-lime-neon/10 rounded text-[9px] font-mono text-lime-neon">
                  SECURE_MODE
                </span>
              </div>

              {/* Status parameters */}
              <div className="flex items-center gap-6 font-mono text-[10px] text-metallic">
                <div className="hidden md:flex items-center gap-2">
                  <Radio size={12} className="text-orange-neon animate-pulse" />
                  <span>DISPATCH_PINGS: ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={12} className="text-lime-neon" />
                  <span>SYS_TIME: {currentTime || '12:00:00'}</span>
                </div>
                <div className="hidden md:block">
                  <span>BATTERY: 100% [DC]</span>
                </div>
              </div>
            </header>

            {/* Main Workspace Layout */}
            <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-stretch">
              
              {/* Left Column Navigation console */}
              <nav className="lg:col-span-3 flex flex-col gap-3 justify-center select-none">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`text-left p-3.5 border rounded font-mono transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                        isActive
                          ? 'bg-orange-neon/15 border-orange-neon text-orange-neon shadow-[0_0_15px_rgba(255,111,60,0.15)]'
                          : 'bg-black/60 border-white/5 text-metallic hover:text-ivory hover:border-white/15'
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div 
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange-neon" 
                        />
                      )}

                      <div className="flex items-center gap-3">
                        <Icon size={16} className={isActive ? 'text-orange-neon' : 'text-metallic group-hover:text-ivory'} />
                        <div>
                          <div className="text-xs font-bold tracking-widest uppercase">
                            0{idx + 1} // {item.label}
                          </div>
                          <div className="text-[9px] tracking-wider text-metallic uppercase mt-0.5">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Central Section Workspace viewport */}
              <section className="lg:col-span-9 flex items-stretch">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full flex"
                  >
                    {activeSection === 'SPECS' && <IdentityChamber />}
                    {activeSection === 'NEURAL' && <SkillConstellation />}
                    {activeSection === 'MISSIONS' && <MissionControl />}
                    {activeSection === 'VAULT' && <AchievementVault />}
                    {activeSection === 'DISPATCH' && <TerminalContact />}
                  </motion.div>
                </AnimatePresence>
              </section>
            </main>

            {/* System Status Footer */}
            <footer className="relative z-20 border-t border-white/5 bg-black/40 px-6 py-3 flex flex-wrap justify-between items-center text-[9px] font-mono text-metallic select-none">
              <div className="flex items-center gap-4">
                <span>NODE_IP: 192.168.1.99</span>
                <span>OS_PORT: 8080</span>
                <span>PACKET_LOSS: 0.00%</span>
              </div>
              <div className="mt-1 sm:mt-0">
                <span>DESIGNED BY KANISHKA S // BUILD_VER_2.0</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
