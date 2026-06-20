import React, { useState } from 'react';
import HUDFrame from '../components/HUDFrame';

const Contact = () => {
  const [msgStatus, setMsgStatus] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const contactLinks = [
    { label: "Email Address", val: "kanishka.s2024cse@sece.ac.in", action: "mailto:kanishka.s2024cse@sece.ac.in" },
    { label: "LinkedIn Secure Profile", val: "LinkedIn Connection", action: "https://linkedin.com" },
    { label: "GitHub Code Deck", val: "KANISHKA1503 Profile", action: "https://github.com/KANISHKA1503" },
    { label: "Contact Telephone", val: "+91 9865294439", action: "tel:9865294439" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setMsgStatus('ERROR: Ensure all input buffers are filled.');
      return;
    }
    setMsgStatus('TRANSMITTING ENCRYPTED CONTENT... SUCCESS [ACK]');
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setMsgStatus('MESSAGE DELIVERED TO KANISHKA S.');
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5 select-none">
      <div className="text-left mb-10">
        <h2 className="text-3xl font-orbitron font-extrabold text-ivory tracking-wide text-center">
          GET IN TOUCH
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-mono">
        {/* Contact Links */}
        <div className="lg:col-span-5 flex">
          <HUDFrame
            borderColor="orange"
            className="flex-1 flex flex-col justify-between"
            showHeader={false}
            showFooter={false}
          >
            <div>
              <h3 className="text-xs font-orbitron font-bold text-orange-neon uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-neon animate-pulse" />
                Direct Connectivity
              </h3>
              <div className="space-y-4 text-left">
                {contactLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.action}
                    target={item.action.startsWith('http') ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="block p-3 border border-orange-neon/15 bg-black/40 hover:bg-orange-neon/10 hover:border-orange-neon/50 text-orange-neon hover:text-white transition-all duration-300 rounded text-xs group"
                  >
                    <span className="text-[10px] text-metallic group-hover:text-ivory block uppercase mb-1">
                      {item.label}:
                    </span>
                    <span className="font-bold text-sm tracking-wide">{item.val}</span>
                  </a>
                ))}
              </div>
            </div>
          </HUDFrame>
        </div>

        {/* Message dispatch card */}
        <div className="lg:col-span-7 flex">
          <HUDFrame
            borderColor="lime"
            className="flex-1 flex flex-col justify-between"
            showHeader={false}
            showFooter={false}
          >
            <div>
              <h3 className="text-xs font-orbitron font-bold text-lime-neon uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-neon animate-pulse" />
                Message Dispatch Node
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-metallic uppercase font-bold">// NAME</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#050508]/80 border border-white/10 rounded px-3 py-2 text-ivory outline-none focus:border-lime-neon font-sans transition-all duration-200"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-metallic uppercase font-bold">// EMAIL</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#050508]/80 border border-white/10 rounded px-3 py-2 text-ivory outline-none focus:border-lime-neon font-sans transition-all duration-200"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-metallic uppercase font-bold">// MESSAGE TEXT</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full bg-[#050508]/80 border border-white/10 rounded px-3 py-2 text-ivory outline-none focus:border-lime-neon font-sans transition-all duration-200 resize-none"
                    placeholder="Enter message buffer..."
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className={`text-[10px] font-mono font-bold ${msgStatus.includes('ERROR') ? 'text-orange-neon' : 'text-lime-neon'}`}>
                    {msgStatus}
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-lime-neon text-black font-orbitron font-bold uppercase tracking-widest text-[10px] rounded hover:bg-lime-neon/80 transition-all duration-300 shadow-[0_0_10px_rgba(163,230,53,0.2)] cursor-pointer"
                  >
                    Dispatch Message
                  </button>
                </div>
              </form>
            </div>
          </HUDFrame>
        </div>
      </div>
    </section>
  );
};

export default Contact;
