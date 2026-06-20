import React from 'react';
import HUDFrame from '../components/HUDFrame';

const Projects = () => {
  const projectsList = [
    {
      code: "PROJECT_01",
      title: "STARTUP FORGE - AI ACCELERATOR",
      subtitle: "Multi-Agent Startup Validation Platform",
      overview: "An AI-powered multi-agent accelerator transforming user skills and goals into validated venture recommendations and blueprints.",
      problem: "Aspiring founders struggle to perform prompt market size checks, database modeling, and investor pitch deck preparation, leading to months of validation delay.",
      decisions: "Orchestrated specialized Groq LLM agents using FastAPI state loops. Configured ChromaDB vector embedding retrievals to ground analyses on historical Y Combinator startup datasets.",
      results: "Automated end-to-end accelerator outputs (executive pitch decks, database schemas, and readiness scores) down to 60 seconds.",
      techStack: ["Python", "FastAPI", "Groq API", "ChromaDB", "Pandas", "RAG", "Y Combinator Dataset", "GitHub"],
      link: "https://github.com/KANISHKA1503"
    },
    {
      code: "PROJECT_02",
      title: "VEG PRICE TRACKER",
      subtitle: "Secure Daily Price Tracking Platform",
      overview: "A full-stack agricultural logistics dashboard enabling rural farmers to monitor market price ranges and log delivery notifications.",
      problem: "Farmers face information asymmetry regarding market price lists, leaving them vulnerable to intermediaries. They also lacked a verified harvest dispatch portal.",
      decisions: "Designed role-based permissions (Farmer vs Admin views). Secured endpoints against automated spam using Google reCAPTCHA v3 and protected routes with JWT authentication.",
      results: "Provided direct daily price updates to local farming communities and successfully filtered out 99.8% of spam harvest entries.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Google reCAPTCHA", "Tailwind CSS", "GitHub"],
      link: "https://github.com/KANISHKA1503"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5 select-none">
      <div className="text-left mb-10">
        <h2 className="text-3xl font-orbitron font-extrabold text-ivory tracking-wide text-center">
          FEATURED PROJECTS
        </h2>
      </div>

      <div className="space-y-12">
        {projectsList.map((project, idx) => {
          const isEven = idx % 2 === 0;
          const themeColor = isEven ? '#ff6f3c' : '#a3e635'; // orange or lime
          const themeName = isEven ? 'orange' : 'lime';

          return (
            <HUDFrame
              key={idx}
              borderColor={themeName}
              showHeader={false}
              showFooter={false}
            >
              {/* Internal Title Header */}
              <div className="mb-6 border-b border-white/5 pb-4">
                <span 
                  className="text-[10px] font-mono tracking-widest uppercase block mb-1"
                  style={{ color: themeColor }}
                >
                  {project.code} // {project.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl font-orbitron font-extrabold text-ivory tracking-wide flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full animate-pulse" 
                    style={{ backgroundColor: themeColor }}
                  />
                  {project.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 text-left">
                {/* Left description */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-metallic block tracking-wider font-bold">
                      SYSTEM SUMMARY:
                    </span>
                    <p className="font-sans text-sm text-ivory/95 leading-relaxed mt-0.5">
                      {project.overview}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <span 
                        className="text-[9px] block tracking-widest font-bold"
                        style={{ color: isEven ? 'var(--color-orange-neon)' : 'var(--color-lime-neon)' }}
                      >
                        THE PROBLEM:
                      </span>
                      <p className="text-metallic leading-relaxed mt-1">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <span 
                        className="text-[9px] block tracking-widest font-bold"
                        style={{ color: isEven ? 'var(--color-lime-neon)' : 'var(--color-orange-neon)' }}
                      >
                        BLUEPRINT & DECISIONS:
                      </span>
                      <p className="text-metallic leading-relaxed mt-1">
                        {project.decisions}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right tech stack & results */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4 border-l border-white/5 pl-0 lg:pl-6">
                  <div>
                    <span className="text-[10px] font-mono text-metallic block tracking-wider font-bold mb-2">
                      TECHNOLOGY COMPONENT ARRAY:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-black/60 border border-white/10 text-metallic font-mono text-[9px] rounded select-none hover:border-orange-neon/30 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span 
                      className="text-[9px] font-mono block tracking-widest font-bold"
                      style={{ color: isEven ? 'var(--color-lime-neon)' : 'var(--color-orange-neon)' }}
                    >
                      VERIFIED RESULT:
                    </span>
                    <p className="font-mono text-xs text-ivory/90 leading-relaxed mt-1">
                      {project.results}
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-4 py-2 bg-white/5 border border-white/10 hover:border-orange-neon hover:text-orange-neon text-ivory font-mono text-[10px] tracking-widest uppercase rounded transition-all duration-300"
                    >
                      View Code on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </HUDFrame>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
