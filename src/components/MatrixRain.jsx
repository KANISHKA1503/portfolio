import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Kanishka-specific portfolio tokens and status nodes
    const dataTokens = [
      'RAG_ACTIVE', 'CHROMADB_VEC', 'GROQ_LLM', 'AGENT_PULSE', 
      'JWT_SECURE', 'SECE_CSE', 'SYS_INIT', 'REACT_VITE', 
      'NODE_EXPRESS', 'MONGODB_SYS', 'API_FAST_GET', 'YC_DATA_LOAD', 
      '0101_DSA', 'C++', 'PYTHON_3', 'LEET_150', 'SKILL_RACK_1150',
      'Prompt-A-Thon', 'GEN_AI_HACK', 'TNSKILLS_TOP10', 'SECURE_AUTH'
    ];

    const extraSymbols = ['0', '1', 'Ø', '×', '»', '•', '¤', '±', '§'];

    const columnsCount = Math.floor(window.innerWidth / 120) + 1;
    const columns = [];

    for (let i = 0; i < columnsCount; i++) {
      columns.push({
        x: i * 120,
        y: Math.random() * -500,
        speed: 1 + Math.random() * 2,
        tokens: [],
        colorSeed: Math.random()
      });
    }

    const draw = () => {
      // Fade canvas to create trails
      ctx.fillStyle = 'rgba(8, 8, 12, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columns.forEach((col) => {
        // Randomly select a token or symbol
        let text = '';
        if (Math.random() > 0.3) {
          text = dataTokens[Math.floor(Math.random() * dataTokens.length)];
        } else {
          text = extraSymbols[Math.floor(Math.random() * extraSymbols.length)];
        }

        // Color variation based on seed
        if (col.colorSeed > 0.85) {
          // Alert Burnt Orange
          ctx.fillStyle = 'rgba(255, 111, 60, 0.4)';
          ctx.font = 'bold 9px "Share Tech Mono", monospace';
        } else if (col.colorSeed > 0.5) {
          // Electric Lime
          ctx.fillStyle = 'rgba(163, 230, 53, 0.35)';
          ctx.font = '10px "Share Tech Mono", monospace';
        } else {
          // Deep Emerald Glow
          ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
          ctx.font = '10px "Share Tech Mono", monospace';
        }

        // Render token
        ctx.fillText(text, col.x + (Math.random() * 5), col.y);

        // Move down
        col.y += col.speed;

        // Reset to top when offscreen
        if (col.y > canvas.height + 100) {
          col.y = Math.random() * -300;
          col.speed = 1 + Math.random() * 2;
          col.colorSeed = Math.random();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
};

export default MatrixRain;
