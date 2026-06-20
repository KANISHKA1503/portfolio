import React from 'react';
import HUDFrame from '../components/HUDFrame';

const Achievements = () => {
  const hackathons = [
    { name: "TNSkills State Competition 2025", desc: "Top 10 Finalist in the skillset 'Intelligent Security Technology'." },
    { name: "Gameathon SECE 2025", desc: "Intra-college 24-Hour game development hackathon finalist." },
    { name: "Prompt-A-Thon VIT Chennai 2025", desc: "Completed 24-hour prompt logic design challenge." },
    { name: "GenAI Hackathon SECE 2025", desc: "Participated in intra-college Generative AI prototyping sprint." }
  ];

  const codingStats = [
    { platform: "SkillRack", stat: "1,150+ Solved", detail: "14 certificates & 350+ Bronzes" },
    { platform: "LeetCode", stat: "150+ Solved", detail: "Contest Rating: 1475 | Rank: 999k" },
    { platform: "CodeChef", stat: "80+ Solved", detail: "Active solver" },
    { platform: "HackerRank", stat: "3★ C | 1★ PS", detail: "Validated database query & SQL tasks" }
  ];

  const certs = [
    { title: "Mastering DSA using C/C++", issuer: "Udemy 2025" },
    { title: "Oracle Java Foundations", issuer: "Oracle 2025" },
    { title: "Python Programming Masterclass", issuer: "Udemy 2025" },
    { title: "Generative AI Foundations", issuer: "IBM & LinkedIn 2025" }
  ];

  return (
    <section id="achievements" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5 select-none">
      <div className="text-left mb-10">
        <h2 className="text-3xl font-orbitron font-extrabold text-ivory tracking-wide text-center">
          ACHIEVEMENTS & MILESTONES
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Hackathons Card */}
        <div className="flex">
          <HUDFrame
            borderColor="lime"
            showHeader={false}
            showFooter={false}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xs font-orbitron font-bold text-lime-neon uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-neon animate-pulse" />
                Hackathons & Competitions
              </h3>
              <div className="space-y-4 text-left font-mono text-xs">
                {hackathons.map((hack, idx) => (
                  <div key={idx} className="border-l-2 border-lime-neon/50 pl-3 space-y-0.5">
                    <h4 className="text-ivory font-bold">{hack.name}</h4>
                    <p className="text-metallic text-[11px] leading-relaxed">{hack.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </HUDFrame>
        </div>

        {/* Coding Stats Card */}
        <div className="flex">
          <HUDFrame
            borderColor="orange"
            showHeader={false}
            showFooter={false}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xs font-orbitron font-bold text-orange-neon uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-neon animate-pulse" />
                Algorithmic Standings
              </h3>
              <div className="grid grid-cols-1 gap-3 text-left font-mono">
                {codingStats.map((stat, idx) => (
                  <div key={idx} className="border border-white/5 bg-[#050508]/40 p-2.5 rounded">
                    <span className="text-[10px] text-orange-neon block tracking-wider font-bold">
                      {stat.platform}
                    </span>
                    <span className="text-ivory font-bold text-sm block mt-0.5">
                      {stat.stat}
                    </span>
                    <span className="text-[10px] text-metallic block mt-0.5 leading-tight">
                      {stat.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </HUDFrame>
        </div>

        {/* Certifications Card */}
        <div className="flex">
          <HUDFrame
            borderColor="lime"
            showHeader={false}
            showFooter={false}
            className="flex-1 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xs font-orbitron font-bold text-lime-neon uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-neon animate-pulse" />
                Certifications
              </h3>
              <div className="space-y-3.5 text-left font-mono text-[11px]">
                {certs.map((cert, idx) => (
                  <div key={idx} className="flex justify-between border-b border-white/5 pb-1.5">
                    <span className="text-ivory font-bold truncate max-w-[160px]">{cert.title}</span>
                    <span className="text-lime-neon font-semibold text-right">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>
          </HUDFrame>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
