import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnywhereDoor({ theme = 'original', isKonjacActive = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scenario, setScenario] = useState(0); // 0: Warp, 1: Future, 2: Forest

  // Auto-close effect
  React.useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000); // Close after 5 seconds
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const kt = (text) => {
    if (!isKonjacActive) return text;
    const translations = {
      "Puerta Mágica": "Ventana al Infinito 🚪✨",
      "¿Te aburriste de caminar? Entra por la puerta y aparecé en cualquier parte de tu cumple.": "Observa otras dimensiones a través de esta puerta tecnológica.",
      "Vía Satélite": "Enlace Intergaláctico",
      "Teletransporte": "Salto Cuántico",
      "¡VIAJANDO EN EL ESPACIO!": "¡Sincronizando Átomos!",
      "Haz clic para entrar": "Abre la Puerta al Mañana",
      "Cambiar Destino": "Sintonizar Dimensión"
    };
    return translations[text] || `${text}-mon`;
  };

  if (theme !== 'doraemon') return null;

  const scenarios = [
    { 
      name: 'Espacio Profundo', 
      color: 'bg-slate-900', 
      effect: (
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-50%] bg-[radial-gradient(circle,rgba(219,39,119,0.5)_0%,rgba(124,58,237,0.3)_50%,transparent_100%)] blur-2xl opacity-60" 
        />
      ),
      icon: "🌌"
    },
    { 
      name: 'Siglo XXII', 
      color: 'bg-cyan-900', 
      effect: (
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent">
          <motion.div 
            animate={{ x: [-100, 300] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-10 h-1 bg-cyan-400 blur-sm absolute top-1/4 shadow-[0_0_10px_cyan]"
          />
          <motion.div 
            animate={{ x: [300, -100] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-16 h-1 bg-pink-400 blur-sm absolute top-2/3 shadow-[0_0_10px_pink]"
          />
        </div>
      ),
      icon: "🏙️"
    },
    { 
      name: 'Bosque Mágico', 
      color: 'bg-emerald-950', 
      effect: (
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-500/30 to-transparent">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
              className="absolute w-1 h-1 bg-yellow-200 rounded-full blur-[2px]"
              style={{ left: Math.random() * 100 + "%", bottom: Math.random() * 100 + "%" }}
            />
          ))}
        </div>
      ),
      icon: "🌳"
    }
  ];

  const handleDoorClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setScenario((prev) => (prev + 1) % scenarios.length);
    }
  };

  return (
    <section className="py-24 flex flex-col items-center justify-center relative overflow-hidden text-center px-4" id="anywheredoor">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 blur-[120px] rounded-full -z-10" />

      <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-center tracking-tighter uppercase italic drop-shadow-lg">
        🚪 {kt("Puerta Mágica")}
      </h2>
      <p className="text-slate-400 mb-16 text-center max-w-xl font-medium leading-relaxed">
        {kt("Observa otras dimensiones a través de esta puerta tecnológica. Haz clic repetidamente para viajar.")}
      </p>

      <div className="relative group perspective-[1000px]">
        {/* Door Frame */}
        <div className="w-64 h-96 md:w-72 md:h-[450px] bg-pink-600 rounded-t-3xl border-[8px] border-pink-700 shadow-[0_40px_80px_rgba(219,39,119,0.5)] relative overflow-visible">
          
          {/* THE INTERIOR CONTENT */}
          <div className={`absolute inset-0 ${scenarios[scenario].color} flex items-center justify-center overflow-hidden transition-colors duration-1000`}>
             {scenarios[scenario].effect}
             
             <div className="relative z-10 text-center text-white p-4">
                <motion.div
                  key={scenario}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl md:text-6xl mb-4"
                >
                  {scenarios[scenario].icon}
                </motion.div>
                <div className="text-lg font-black uppercase tracking-[0.2em] italic text-pink-200 drop-shadow-lg">
                   {scenarios[scenario].name}
                </div>
                {isOpen && (
                  <div className="mt-4 text-[10px] font-bold uppercase tracking-widest opacity-50 text-white animate-pulse">
                     {kt("Dimensión Estable")}
                  </div>
                )}
             </div>
          </div>

          {/* THE DOOR PANEL */}
          <motion.div 
            animate={{ 
              rotateY: isOpen ? -120 : 0,
              x: isOpen ? -15 : 0
            }}
            transition={{ duration: 1, ease: "anticipate" }}
            style={{ transformOrigin: 'left' }}
            onClick={handleDoorClick}
            className="absolute inset-0 bg-pink-500 rounded-sm border-4 border-pink-400 shadow-2xl cursor-pointer hover:bg-pink-400 transition-colors z-20 flex items-center justify-end p-6 group-active:scale-[0.98]"
          >
             <div className="absolute inset-6 border-2 border-pink-300/20 rounded-xl pointer-events-none" />
             
             {/* Handle */}
             <div className="relative z-30 flex items-center justify-center w-12 h-12 rounded-full transform hover:scale-110 transition-transform bg-yellow-400 border-2 border-yellow-600 shadow-xl group-hover:rotate-12">
                <div className="w-full h-full rounded-full shadow-inner flex items-center justify-center text-yellow-900 font-bold text-xl">
                   !
                </div>
             </div>
          </motion.div>
          
          {/* Light flash covering the whole door area */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key={scenario}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute -inset-10 bg-white z-[100] rounded-full blur-[80px] pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>
        
        <div className="absolute -inset-10 bg-pink-500/10 rounded-full blur-[100px] -z-20 group-hover:bg-pink-500/20 transition-all" />
      </div>

      <div className="mt-12 text-center">
        <p className="text-pink-400 font-black tracking-widest uppercase italic text-xl drop-shadow-[0_0_15px_rgba(219,39,119,0.4)]">
           {isOpen ? kt("Haz clic para cambiar de destino") : kt("Inicia la Secuencia de Salto")}
        </p>
        <div className="mt-3 flex gap-2 justify-center">
           {scenarios.map((_, i) => (
             <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === scenario ? 'w-8 bg-pink-500 shadow-[0_0_10px_rgba(219,39,119,1)]' : 'w-2 bg-slate-800'}`} />
           ))}
        </div>
      </div>
    </section>
  );
}
