import React from 'react';
import HUDFrame from '../components/HUDFrame';

const About = () => {
  const stats = [
    { label: "Degree", value: "B.E. Computer Science & Eng." },
    { label: "Institution", value: "Sri Eshwar College of Engineering" },
    { label: "Batch Duration", value: "2024 - 2028" }
  ];

  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5 select-none">
      <div className="text-left mb-10">
        <h2 className="text-3xl font-orbitron font-extrabold text-ivory tracking-wide">
          ABOUT ME
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Profile Narrative */}
        <div className="md:col-span-7 space-y-4 text-left font-sans text-metallic text-sm md:text-base leading-relaxed">
          <p>
            I am a Computer Science Engineering student at <strong className="text-ivory">Sri Eshwar College of Engineering</strong> with a deep focus on building cognitive systems, agentic workflows, and semantic search architectures. My technical interest lies at the intersection of AI, Vector databases, and knowledge representation.
          </p>
          <p>
            Throughout my academic journey, I have actively participated in multiple state-level and college hackathons to refine my prototyping speed. I enjoy building structured systems, from designing agentic reasoning loops to deploying semantic RAG systems for venture analysis.
          </p>
          <p>
            I am dedicated to writing clean, maintainable, and optimized code, and I leverage competitive coding to keep my logic fast and structured.
          </p>
        </div>

        {/* Academic Profile Card */}
        <div className="md:col-span-5 w-full">
          <HUDFrame
            borderColor="orange"
            showHeader={false}
            showFooter={false}
          >
            <h3 className="text-xs font-orbitron font-bold text-orange-neon uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-neon animate-pulse" />
              Academic Credentials
            </h3>
            <div className="space-y-3.5 font-mono text-xs text-left">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-metallic">{stat.label}:</span>
                  <span className="text-ivory font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </HUDFrame>
        </div>
      </div>
    </section>
  );
};

export default About;
