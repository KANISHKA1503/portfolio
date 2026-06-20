import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HUDFrame from '../components/HUDFrame';
import GlitchText from '../components/GlitchText';

const AchievementVault = () => {
  const [activeDossier, setActiveDossier] = useState('HACK');

  const dossiers = {
    HACK: {
      folderName: "ARCHIVE-HACK-2025",
      title: "HACKATHONS & TOURNAMENTS",
      description: "Records of high-intensity, multi-hour development events and state-level engineering competitions.",
      items: [
        {
          name: "TNSkills state competition",
          role: "Top 10 Finalist",
          details: "Shortlisted in the top 10 finalists for the skillset 'Intelligent Security Technology' under TNSkills state initiative.",
          year: "2025",
          badge: "STATE_CLEAR"
        },
        {
          name: "Gameathon SECE (24 Hours)",
          role: "Finalist Node",
          details: "Pitched and designed a gaming interface in a fast-paced 24-hour engineering challenge (Intra-college).",
          year: "2025",
          badge: "FINALIST"
        },
        {
          name: "Prompt-A-Thon VIT Chennai (24 Hours)",
          role: "Developer",
          details: "Engineered prompt logic maps and contextual triggers in a 24-hour competitive environment at VIT Chennai.",
          year: "2025",
          badge: "PARTICIPANT"
        },
        {
          name: "GEN AI Hackathon Sri Eshwar (Intra)",
          role: "Developer",
          details: "Configured generative APIs to automate visual text analysis flows in a single-day sprint.",
          year: "2025",
          badge: "PARTICIPANT"
        }
      ]
    },
    PROFILES: {
      folderName: "CYBER-STATS-CODING",
      title: "ALGORITHMIC PROFILES",
      description: "Real-time query metrics from competitive coding engines and data structure hubs.",
      items: [
        {
          name: "SkillRack telemetry",
          role: "1,150+ Problems Solved",
          details: "Mastered algorithmic patterns. Obtained 14 certifications and logged over 350+ Bronze validations.",
          year: "2025-2026",
          badge: "14_CERTS"
        },
        {
          name: "LeetCode grid",
          role: "150+ Solved | Rating: 1475",
          details: "Ranked 999,708 globally. Maintaining algorithmic optimizations in arrays, graphs, and dynamic grids.",
          year: "Active",
          badge: "TOP_999K"
        },
        {
          name: "CodeChef pipeline",
          role: "80+ Solved",
          details: "Maintained speed optimizations under time-boxed math constraints.",
          year: "Active",
          badge: "STABLE"
        },
        {
          name: "HackerRank stars",
          role: "3★ C | 1★ Problem Solving & SQL",
          details: "Validated databases and basic logic architectures.",
          year: "2025",
          badge: "3_STARS"
        }
      ]
    },
    CERTS: {
      folderName: "CRED-VERIFIED-AUTH",
      title: "SYSTEM CERTIFICATIONS",
      description: "Verified academic and technological credentials logged from global education centers.",
      items: [
        {
          name: "Mastering DSA using C/C++",
          role: "Udemy Credential",
          details: "Comprehensive data structures and algorithm verification, complexity checks, and node trees.",
          year: "2025",
          badge: "DSA_EXPERT"
        },
        {
          name: "Oracle Java Foundations",
          role: "Oracle Verified",
          details: "Object-oriented foundations, JVM compilation procedures, interfaces, and exception protocols.",
          year: "2025",
          badge: "JAVA_FOUND"
        },
        {
          name: "Python Programming Masterclass",
          role: "Udemy Credential",
          details: "Advanced object arrays, modules, pandas data streams, and server script integration.",
          year: "2025",
          badge: "PY_MASTER"
        },
        {
          name: "Introduction to Generative AI",
          role: "IBM SkillsBuild & LinkedIn",
          details: "Foundation models, LLM parameters, prompt engineering pipelines, and semantic RAG parameters.",
          year: "2025",
          badge: "GENAI_INIT"
        }
      ]
    }
  };

  const currentDossier = dossiers[activeDossier];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Column - Directory Folder indexes */}
      <div className="lg:col-span-4 flex flex-col gap-4 select-none">
        <HUDFrame
          title="VAULT DOSSIERS"
          subtitle="SECURITY VAULT GRID"
          borderColor="lime"
          badge="VAULT_SECTORS"
          cornerText="VLT-DR"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            {Object.keys(dossiers).map((key) => {
              const dossier = dossiers[key];
              const isSelected = activeDossier === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDossier(key)}
                  className={`w-full text-left p-4 rounded border font-mono transition-all duration-300 relative group cursor-pointer ${
                    isSelected
                      ? 'bg-lime-neon/15 border-lime-neon text-lime-neon shadow-[0_0_15px_rgba(163,230,53,0.2)]'
                      : 'bg-black/40 border-white/5 text-metallic hover:text-ivory hover:border-white/10'
                  }`}
                >
                  <div className="text-[9px] text-metallic mb-1 font-bold">
                    // {dossier.folderName}
                  </div>
                  <h4 className="font-orbitron font-extrabold text-xs tracking-wider text-ivory">
                    {dossier.title}
                  </h4>
                  <div className="mt-2.5 flex justify-between items-center text-[9px]">
                    <span className="text-metallic">STATUS: DECRYPTED</span>
                    <span className="text-lime-neon opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      OPEN RECORDS &gt;
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 border border-white/5 p-3 rounded bg-black/20 text-left font-mono text-[11px] leading-relaxed text-metallic">
            <span className="text-[10px] text-lime-neon block mb-1 font-bold">// SECURE STORAGE READS</span>
            Credentials verified via external registries (Udemy, Oracle, SkillRack, LeetCode, Sri Eshwar College). Selecting dossier updates decryption logs.
          </div>
        </HUDFrame>
      </div>

      {/* Right Column - Dossier Contents list */}
      <div className="lg:col-span-8 flex">
        <HUDFrame
          title={`VAULT VIEW: ${currentDossier.folderName}`}
          subtitle="DECRYPTED DOSSIER TELEMETRY"
          borderColor="orange"
          badge="DECRYPT_CLEAR"
          cornerText="VLT-LOGS"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            {/* Dossier description */}
            <div className="text-left bg-black/40 border border-white/5 p-3.5 rounded font-mono text-xs text-metallic">
              <span className="text-[9px] text-orange-neon block uppercase font-bold tracking-widest mb-0.5">
                DOSSIER PURPOSE
              </span>
              "{currentDossier.description}"
            </div>

            {/* Dossier Dossier items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-1">
              <AnimatePresence mode="wait">
                {currentDossier.items.map((item, idx) => (
                  <motion.div
                    key={`${activeDossier}-${idx}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="p-3.5 bg-[#050508]/80 border border-white/5 rounded text-left flex flex-col justify-between hover:border-orange-neon/30 transition-all duration-300"
                  >
                    <div>
                      <div className="flex justify-between items-center text-[8px] font-mono mb-1">
                        <span className="px-1.5 py-0.5 bg-orange-neon/10 text-orange-neon border border-orange-neon/20 rounded font-bold">
                          {item.badge}
                        </span>
                        <span className="text-metallic">{item.year}</span>
                      </div>
                      
                      <h5 className="font-orbitron font-extrabold text-xs text-ivory tracking-wide">
                        {item.name}
                      </h5>
                      <span className="text-[10px] font-mono text-lime-neon block mt-0.5 font-semibold">
                        {item.role}
                      </span>
                    </div>

                    <p className="font-sans text-[11px] text-metallic mt-2 leading-relaxed">
                      {item.details}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </HUDFrame>
      </div>
    </div>
  );
};

export default AchievementVault;
