import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home');

  const navLinks = [
    { label: 'Home', target: '#home', id: 'home' },
    { label: 'About', target: '#about', id: 'about' },
    { label: 'Skills', target: '#skills', id: 'skills' },
    { label: 'Projects', target: '#projects', id: 'projects' },
    { label: 'Achievements', target: '#achievements', id: 'achievements' },
    { label: 'Contact', target: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.querySelector(link.target));
      const scrollPos = window.scrollY + 200;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveItem(navLinks[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-cyber-bg/75 backdrop-blur-md border-b border-white/5 py-4 px-6 flex justify-between items-center select-none">
      <div className="flex items-center gap-2">
        <span className="font-orbitron font-extrabold text-base tracking-wider text-ivory">
          KANISHKA<span className="text-orange-neon">.S</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 md:gap-5">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.target}
            onClick={(e) => handleLinkClick(e, link.target)}
            className={`font-mono text-[10px] md:text-xs uppercase tracking-wider transition-colors duration-200 ${
              activeItem === link.id
                ? 'text-orange-neon font-bold'
                : 'text-metallic hover:text-ivory'
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
