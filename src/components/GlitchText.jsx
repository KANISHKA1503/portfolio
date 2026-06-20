import React, { useState, useEffect } from 'react';

const GlitchText = ({ text, className = "", delay = 0, speed = 40 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*§+Ø";

  useEffect(() => {
    let timer;
    let iteration = 0;
    
    // Initial delay
    const startTimeout = setTimeout(() => {
      timer = setInterval(() => {
        setDisplayedText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(timer);
        }

        iteration += 1 / 3;
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(timer);
    };
  }, [text, delay, speed]);

  return <span className={`${className} font-mono`}>{displayedText || text.replace(/./g, ' ')}</span>;
};

export default GlitchText;
