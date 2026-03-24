import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Timer, Search } from 'lucide-react';

export default function GadgetPocket({ theme = 'original' }) {
  const [currentGadget, setCurrentGadget] = useState(null);

  if (theme !== 'doraemon') return null;

  const gadgets = [
    { name: "Hélice de Bambú", desc: "¡Para volar por los aires!", icon: <Sparkles className="text-yellow-400" /> },
    { name: "Linterna de Aumento", desc: "¡Haz todo gigante!", icon: <Zap className="text-orange-500" /> },
    { name: "Cámara Cambia-Vestimenta", desc: "¡Nueva ropa al instante!", icon: <Search className="text-blue-500" /> },
    { name: "Bombilla Temporal", desc: "¡Para viajar en el tiempo!", icon: <Timer className="text-purple-500" /> },
    { name: "Mantel Gourmet", desc: "¡Toda la comida que quieras!", icon: <Sparkles className="text-orange-400" /> },
    { name: "Pan de Memoria", desc: "¡Prepárate para el examen!", icon: <Zap className="text-yellow-600" /> },
    { name: "Capa de Invisibilidad", desc: "¡Nadie te verá!", icon: <Sparkles className="text-slate-400" /> },
    { name: "Luz de Reducción", desc: "¡Todo cabe en tu bolsillo!", icon: <Search className="text-pink-500" /> }
  ];

  const spawnGadget = () => {
    const random = gadgets[Math.floor(Math.random() * gadgets.length)];
    setCurrentGadget(random);
    setTimeout(() => setCurrentGadget(null), 3000);
  };

  return (
    <div className="py-24 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">Bolsillo 4D 🎒</h2>
      <p className="text-slate-400 mb-12">¡Explora los inventos mágicos!</p>
      
      <div className="relative group" onClick={spawnGadget}>
        {/* Pocket Shape */}
        <div className="w-64 h-32 bg-white rounded-b-full border-4 border-slate-200 shadow-2xl relative overflow-hidden flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
          <div className="absolute top-0 w-full h-2 bg-slate-300" />
          <span className="text-slate-200 font-black text-6xl opacity-20 group-hover:opacity-40 transition-opacity">4D</span>
        </div>

        {/* Floating Gadget Result */}
        <AnimatePresence>
          {currentGadget && (
             <motion.div
               initial={{ opacity: 0, scale: 0.5, y: 0 }}
               animate={{ opacity: 1, scale: 1, y: -150 }}
               exit={{ opacity: 0, scale: 0.5, y: -200 }}
               className="absolute z-50 left-1/2 -translate-x-1/2 w-48 bg-white p-6 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.4)] border-2 border-slate-900 rotate-3"
             >
                <div className="flex flex-col items-center text-center">
                   <div className="w-12 h-12 mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                     {currentGadget.icon}
                   </div>
                   <h3 className="text-slate-950 font-black mb-1">{currentGadget.name}</h3>
                   <p className="text-slate-500 text-xs">{currentGadget.desc}</p>
                </div>
                <div className="absolute -bottom-2 -left-2 w-full h-full bg-slate-200 -z-10 rounded-2xl" />
             </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <p className="mt-8 text-slate-500 font-bold uppercase tracking-widest text-[10px] animate-bounce">
        Toca el bolsillo para sacar un invento
      </p>
    </div>
  );
}
