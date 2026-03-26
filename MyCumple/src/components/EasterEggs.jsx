import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PartyPopper } from 'lucide-react';

export default function EasterEggs() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 3) {
      triggerConfetti();
      setClickCount(0); // reset
    } else {
      // Small pop
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { y: 0.8, x: 0.1 }
      });
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8b5cf6', '#ec4899', '#3b82f6']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8b5cf6', '#ec4899', '#3b82f6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={handleClick}
        className="p-3 rounded-full bg-white/5 border border-white/10 text-white/20 hover:text-white hover:bg-white/20 shadow-lg backdrop-blur-sm transition-all duration-300 hover:rotate-12 hover:scale-110 group"
        title="Secreto"
      >
        <PartyPopper size={24} className="group-hover:animate-bounce" />
      </button>
    </div>
  );
}
