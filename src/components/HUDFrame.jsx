import React from 'react';
import { motion } from 'framer-motion';

const HUDFrame = ({
  title,
  subtitle,
  children,
  badge = "SYS_OK",
  borderColor = "orange", // orange, lime, emerald
  className = "",
  cornerText = "LAT-34.9N",
  showHeader = true,
  showFooter = true
}) => {
  const borderClasses = {
    orange: "border-orange-neon/20 hover:border-orange-neon/40 text-orange-neon",
    lime: "border-lime-neon/20 hover:border-lime-neon/40 text-lime-neon",
    emerald: "border-emerald-glow/20 hover:border-emerald-glow/40 text-emerald-glow"
  };

  const hudBorders = {
    orange: "border-hud",
    lime: "border-hud-lime",
    emerald: "border-hud-lime" // fallback or reuse
  };

  const badgeColors = {
    orange: "bg-orange-neon/10 text-orange-neon border-orange-neon/30",
    lime: "bg-lime-neon/10 text-lime-neon border-lime-neon/30",
    emerald: "bg-emerald-glow/10 text-emerald-glow border-emerald-glow/30"
  };

  const ledColors = {
    orange: "bg-orange-neon",
    lime: "bg-lime-neon",
    emerald: "bg-emerald-glow"
  };

  const selectedBorder = borderClasses[borderColor] || borderClasses.orange;
  const selectedHUD = hudBorders[borderColor] === "border-hud" ? "border-hud" : "border-hud-lime";
  const selectedBadge = badgeColors[borderColor] || badgeColors.orange;
  const selectedLed = ledColors[borderColor] || ledColors.orange;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative p-5 bg-cyber-bg/90 backdrop-blur-md ${selectedHUD} ${className}`}
    >
      {/* Top Header Row */}
      {showHeader && (
        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2 select-none">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-metallic block font-mono">
              {subtitle || "CORE MODULE"}
            </span>
            <h3 className="font-orbitron font-bold text-sm tracking-widest text-ivory uppercase flex items-center gap-2">
              <span className={`inline-block w-1.5 h-1.5 rounded-full pulse-led ${selectedLed}`} />
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-metallic">{cornerText}</span>
            <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${selectedBadge}`}>
              {badge}
            </span>
          </div>
        </div>
      )}

      {/* Frame Elements (Holographic HUD Details) */}
      <div className="absolute top-0 right-12 w-8 h-[1px] bg-white/10" />
      <div className="absolute bottom-0 left-12 w-16 h-[1px] bg-white/10" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-6 bg-white/10" />

      {/* Main Content Area */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom Footer Info */}
      {showFooter && (
        <div className="mt-4 flex justify-between items-center text-[8px] font-mono text-metallic border-t border-white/5 pt-2 select-none">
          <span>SECURITY_LEVEL: 02</span>
          <span>SYS_HZ: 60.00</span>
        </div>
      )}
    </motion.div>
  );
};

export default HUDFrame;
