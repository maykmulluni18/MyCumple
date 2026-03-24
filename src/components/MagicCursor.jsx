import React, { useEffect, useState } from 'react';
import { config } from '../config';

export default function MagicCursor({ theme = 'original' }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let particleId = 0;

    const createParticle = (x, y, type = 'trail') => {
      particleId += 1;
      
      const isClick = type === 'click';
      
      // Theme-dependent emojis and colors
      let emojis = ['✨', '⭐', '❤️', '💖', '🌟'];
      let palette = ['#8b5cf6', '#ec4899', '#fde047', '#3b82f6'];
      
      if (theme === 'doraemon') {
        emojis = ['🥮', '🔔', '✨', '⭐', '💙'];
        palette = ['#00A1E9', '#ED1C24', '#FFCB00', '#ffffff'];
      }

      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

      const newParticle = {
        id: particleId,
        x,
        y,
        emoji: isClick ? randomEmoji : null,
        color: isClick ? 'transparent' : palette[Math.floor(Math.random() * palette.length)],
        size: isClick ? (Math.random() * 25 + 20) : (Math.random() * 8 + 4),
        type,
        vx: isClick ? (Math.random() - 0.5) * 15 : 0,
        vy: isClick ? (Math.random() - 0.5) * 15 : 0,
        rotation: isClick ? Math.random() * 360 : 0,
        rotationSpeed: isClick ? (Math.random() - 0.5) * 10 : 0
      };

      setParticles((prev) => [...prev, newParticle]);

      setTimeout(() => {
        setParticles((prev) => prev.filter(p => p.id !== newParticle.id));
      }, isClick ? 1200 : 800);
    };

    const handleMouseMove = (e) => {
      if (Math.random() > 0.4) {
        createParticle(e.clientX, e.clientY, 'trail');
      }
    };

    const handleClick = (e) => {
      for (let i = 0; i < 15; i++) {
        createParticle(e.clientX, e.clientY, 'click');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [theme]); // Re-attach listeners if theme changes just in case, although technically listeners don't need it if it were a ref, but here we use closure

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className={`absolute flex items-center justify-center transition-opacity duration-1000 ${
            p.type === 'click' ? 'animate-star-burst' : 'animate-magic-sparkle rounded-full'
          }`}
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            color: p.color,
            fontSize: `${p.size}px`,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            '--vx': `${p.vx * 25}px`,
            '--vy': `${p.vy * 25}px`,
            '--rot': `${p.rotationSpeed * 100}deg`,
            boxShadow: p.type === 'click' ? 'none' : '0 0 10px currentColor',
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
