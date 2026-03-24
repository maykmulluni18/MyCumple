import React, { useRef, useEffect, useState } from 'react';
import { config } from '../config';

export default function ScratchCard({ theme = 'original' }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  // Use theme-specific image
  const scratchImage = config.themes[theme].scratchImage;

  useEffect(() => {
    // Reset reveal when theme changes
    setIsRevealed(false);
    setScratchPercent(0);
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#475569'; 
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = '#cbd5e1'; 
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('¡RASPA AQUÍ!', width / 2, height / 2);
    ctx.font = '14px sans-serif';
    ctx.fillText('Para una sorpresa...', width / 2, height / 2 + 30);

    let isDrawing = false;

    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();
      checkReveal();
    };

    const handleMouseDown = (e) => {
      isDrawing = true;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      scratch((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      scratch((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    };

    const handleMouseUp = () => isDrawing = false;

    const checkReveal = () => {
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let alphaCount = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) alphaCount++;
      }
      const percent = (alphaCount / (pixels.length / 4)) * 100;
      setScratchPercent(percent);
      if (percent > 55) setIsRevealed(true);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Touch support
    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      scratch((e.touches[0].clientX - rect.left) * scaleX, (e.touches[0].clientY - rect.top) * scaleY);
    };
    canvas.addEventListener('touchmove', handleTouchMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [theme]); // Redraw cover on theme change

  return (
    <section className="py-20 px-4 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-white mb-8 text-center uppercase tracking-tight">
        {theme === 'doraemon' ? '¿Qué hay en el bolsillo?' : 'Tu Tarjeta de la Suerte'} 🎫
      </h2>
      <p className="text-slate-400 mb-10 max-w-md text-center">
        {theme === 'doraemon' ? 'Raspa para ver qué invento trajo Doraemon del futuro.' : 'Usa tu mouse o el dedo para descubrir un momento especial.'}
      </p>

      <div className="relative w-full max-w-sm aspect-[4/3] rounded-3xl overflow-hidden glass-card shadow-2xl border-4 border-white/20 select-none">
        <img 
          key={scratchImage}
          src={scratchImage} 
          alt="Sorpresa" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className={`absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />

        {isRevealed && (
          <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white border border-white/30 font-bold animate-bounce z-10">
            🎉 ¡Sorpresa revelada!
          </div>
        )}
      </div>
    </section>
  );
}
