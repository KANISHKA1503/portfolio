import React, { useState, useEffect, useRef } from 'react';
import HUDFrame from '../components/HUDFrame';
import GlitchText from '../components/GlitchText';

const TerminalContact = () => {
  const [consoleHistory, setConsoleHistory] = useState([
    { text: "COMMUNICATION TERMINAL [V1.4.12] SECURE_COMMS_INIT_OK", type: "system" },
    { text: "Type '/' to see available routing commands or select diagnostic macros below.", type: "system" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const historyEndRef = useRef(null);

  const macros = [
    { cmd: "/email", desc: "Dispatch email connection" },
    { cmd: "/linkedin", desc: "Access LinkedIn secure link" },
    { cmd: "/github", desc: "Tunnel to GitHub repositories" },
    { cmd: "/phone", desc: "Fetch direct contact frequency" },
    { cmd: "/clear", desc: "Clear terminal console buffer" }
  ];

  const handleCommand = (commandStr) => {
    const rawCmd = commandStr.trim();
    if (!rawCmd) return;

    setConsoleHistory(prev => [...prev, { text: `Guest_User@SECURE_NET:~$ ${rawCmd}`, type: "input" }]);

    const cmdTokens = rawCmd.toLowerCase().split(" ");
    const primaryCmd = cmdTokens[0];
    const args = cmdTokens.slice(1).join(" ");

    setTimeout(() => {
      switch (primaryCmd) {
        case "/email":
          setConsoleHistory(prev => [...prev, 
            { text: "ROUTING EMAIL CHANNEL: kanishka.s2024cse@sece.ac.in", type: "success" },
            { text: "Opening mail client interface...", type: "system" }
          ]);
          window.location.href = "mailto:kanishka.s2024cse@sece.ac.in";
          break;
        case "/linkedin":
          setConsoleHistory(prev => [...prev, 
            { text: "ESTABLISHING SECURE LINKEDIN TETHER...", type: "success" },
            { text: "Redirecting...", type: "system" }
          ]);
          window.open("https://linkedin.com", "_blank"); // replace with real linkedin if provided
          break;
        case "/github":
          setConsoleHistory(prev => [...prev, 
            { text: "ESTABLISHING ENCRYPTED TUNNEL TO GITHUB DECK...", type: "success" },
            { text: "Redirecting...", type: "system" }
          ]);
          window.open("https://github.com", "_blank");
          break;
        case "/phone":
          setConsoleHistory(prev => [...prev, 
            { text: "CONTACT TELEPHONE CORRELATION: +91 9865294439", type: "success" }
          ]);
          break;
        case "/clear":
          setConsoleHistory([]);
          break;
        default:
          if (primaryCmd.startsWith("/msg")) {
            if (!args) {
              setConsoleHistory(prev => [...prev, 
                { text: "ERROR: Empty message buffer. Syntax: /msg [your message text]", type: "error" }
              ]);
            } else {
              setConsoleHistory(prev => [...prev, 
                { text: `TRANSMITTING ENCRYPTED CONTENT BLOCK: "${args}"`, type: "success" },
                { text: "LOGICAL PACKET SENT SUCCESSFULLY TO PORT 9865. CLEARANCE: ACK", type: "success" }
              ]);
            }
          } else {
            setConsoleHistory(prev => [...prev, 
              { text: `COMMAND NOT RECOGNIZED: "${primaryCmd}". Use /email, /linkedin, /github, /phone, or type /msg [text]`, type: "error" }
            ]);
          }
      }
    }, 300);

    setInputValue("");
  };

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleHistory]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch font-mono">
      {/* Left Column - Diagnostic Macro Buttons */}
      <div className="lg:col-span-4 flex flex-col gap-4 select-none">
        <HUDFrame
          title="DISPATCH MACROS"
          subtitle="TTACTICAL SPEED-DIAL"
          borderColor="orange"
          badge="MACRO_DEC"
          cornerText="CMD-MCR"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="space-y-3.5">
            {macros.map((item) => (
              <button
                key={item.cmd}
                onClick={() => handleCommand(item.cmd)}
                className="w-full flex justify-between items-center px-4 py-2.5 rounded border border-orange-neon/15 bg-black/40 hover:bg-orange-neon/10 hover:border-orange-neon/50 text-orange-neon hover:text-white transition-all duration-300 group cursor-pointer text-left text-xs"
              >
                <span className="font-bold">{item.cmd}</span>
                <span className="text-[10px] text-metallic group-hover:text-ivory">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 border border-white/5 p-3 rounded bg-black/20 text-left text-[11px] leading-relaxed text-metallic">
            <span className="text-[10px] text-orange-neon block mb-1 font-bold">// COMMAND HINTS</span>
            You can type directly into the terminal console. For custom messaging, type: <span className="text-lime-neon">/msg [Your Message]</span> and hit enter.
          </div>
        </HUDFrame>
      </div>

      {/* Right Column - Terminal Input Console */}
      <div className="lg:col-span-8 flex">
        <HUDFrame
          title="COMMUNICATION COMMAND PROMPT"
          subtitle="SECURE LOG TRANSMISSION"
          borderColor="lime"
          badge="CONSOLE_READY"
          cornerText="TERM-ST"
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col h-full justify-between min-h-[320px] bg-[#050508]/80 border border-lime-neon/10 rounded p-4 text-left">
            
            {/* Terminal logs list */}
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 max-h-[250px] scrollbar-thin text-xs pr-1">
              {consoleHistory.map((log, index) => {
                let colorClass = "text-ivory";
                if (log.type === "system") colorClass = "text-metallic";
                if (log.type === "success") colorClass = "text-lime-neon font-bold";
                if (log.type === "error") colorClass = "text-orange-neon font-bold";
                if (log.type === "input") colorClass = "text-white opacity-90";

                return (
                  <div key={index} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-metallic select-none">
                      {log.type === "input" ? "" : ">>"}
                    </span>
                    <span className={colorClass}>{log.text}</span>
                  </div>
                );
              })}
              <div ref={historyEndRef} />
            </div>

            {/* Input field */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(inputValue);
              }}
              className="flex items-center border-t border-white/5 pt-3 mt-auto select-none"
            >
              <span className="text-lime-neon text-xs font-bold mr-2">
                Guest_User@SECURE_NET:~$
              </span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type command... (e.g. /email)"
                className="flex-1 bg-transparent text-lime-neon text-xs outline-none caret-lime-neon font-mono placeholder-metallic/40 border-none p-0 focus:ring-0"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </form>

          </div>
        </HUDFrame>
      </div>
    </div>
  );
};

export default TerminalContact;
