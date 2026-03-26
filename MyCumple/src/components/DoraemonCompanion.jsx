import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DoraemonCompanion({ theme = 'original' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [dorayakis, setDorayakis] = useState([]);

  if (theme !== 'doraemon') return null;

  const handleDoraemonClick = () => {
    console.log("Spawning dorayakis!");
    const newDorayakis = Array.from({ length: 20 }).map((_, i) => ({
      id: Math.random() + "-" + Date.now() + "-" + i,
      x: Math.random() * (window.innerWidth - 50),
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 3
    }));
    setDorayakis(prev => [...prev, ...newDorayakis]);
    
    // Clean up after animation
    setTimeout(() => {
      setDorayakis(prev => prev.filter(d => !newDorayakis.find(nd => nd.id === d.id)));
    }, 8000);
  };

  return (
    <>
      <AnimatePresence>
        {dorayakis.map(d => (
          <motion.div
            key={d.id}
            initial={{ y: -100, x: d.x, rotate: 0, opacity: 1 }}
            animate={{ y: window.innerHeight + 100, rotate: 720 }}
            exit={{ opacity: 0 }}
            transition={{ duration: d.duration, delay: d.delay, ease: "linear" }}
            className="fixed top-0 left-0 z-[9999] pointer-events-none drop-shadow-xl"
          >
            <img 
              src="/imagenes/dorayaki.png" 
              className="w-12 h-12 object-contain" 
              alt="dorayaki"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        initial={{ opacity: 0, x: 20, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        className="fixed bottom-24 right-8 z-[70] cursor-pointer select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTap={handleDoraemonClick}
      >
        <div className="relative group">
          {/* Thought Bubble */}
          <AnimatePresence>
            {isHovered && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.5, y: 10 }}
                 animate={{ opacity: 1, scale: 1, y: -60 }}
                 exit={{ opacity: 0, scale: 0.5 }}
                 className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-blue-600 px-4 py-2 rounded-2xl shadow-xl font-bold text-sm whitespace-nowrap border-2 border-blue-200"
               >
                 ¡Hazme clic para una sorpresa! 🥞
                 <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-blue-200 rotate-45" />
               </motion.div>
            )}
          </AnimatePresence>

          {/* Simplistic CSS Doraemon Head */}
          <div className="w-16 h-16 bg-[#00A1E9] rounded-full border-2 border-slate-900 shadow-lg relative flex items-center justify-center overflow-hidden">
            <div className="w-14 h-12 bg-white rounded-full mt-4 flex flex-col items-center">
               {/* Eyes */}
               <div className="flex gap-1 -mt-2">
                  <div className="w-4 h-6 bg-white border border-slate-900 rounded-full relative">
                     <div className="absolute top-2 right-1 w-1 h-2 bg-slate-950 rounded-full" />
                  </div>
                  <div className="w-4 h-6 bg-white border border-slate-900 rounded-full relative">
                     <div className="absolute top-2 left-1 w-1 h-2 bg-slate-950 rounded-full" />
                  </div>
               </div>
               {/* Nose */}
               <div className="w-3 h-3 bg-red-600 rounded-full border border-slate-950 -mt-1" />
            </div>
            {/* Bell area at bottom */}
            <div className="absolute bottom-0 w-full h-2 bg-red-600" />
          </div>
          
          {/* Floating Animation */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-2 rounded-full border-2 border-blue-400/20 blur-sm pointer-events-none"
          />
        </div>
      </motion.div>
    </>
  );
}
