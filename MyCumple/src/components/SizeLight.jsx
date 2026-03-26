import React from 'react';
import { motion } from 'framer-motion';
import { Minimize2, Maximize2, X } from 'lucide-react';

export default function SizeLight({ sizeMode, setSizeMode, theme }) {
  if (theme !== 'doraemon') return null;

  return (
    <div className="fixed bottom-6 right-32 z-[60] flex gap-2">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-full flex gap-1 shadow-2xl">
        <button
          onClick={() => setSizeMode(sizeMode === 'big' ? 'none' : 'big')}
          className={`p-3 rounded-full transition-all ${sizeMode === 'big' ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'text-orange-400 hover:bg-white/5'}`}
          title="Luz de Aumento"
        >
          <Maximize2 size={20} />
        </button>
        <button
          onClick={() => setSizeMode(sizeMode === 'small' ? 'none' : 'small')}
          className={`p-3 rounded-full transition-all ${sizeMode === 'small' ? 'bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'text-pink-400 hover:bg-white/5'}`}
          title="Luz de Reducción"
        >
          <Minimize2 size={20} />
        </button>
        {sizeMode !== 'none' && (
          <button
            onClick={() => setSizeMode('none')}
            className="p-3 rounded-full text-slate-400 hover:bg-white/5 transition-all"
            title="Desactivar"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {sizeMode !== 'none' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-tighter whitespace-nowrap border border-white/10"
        >
          {sizeMode === 'big' ? 'Luz de Aumento Activa' : 'Luz de Reducción Activa'}
        </motion.div>
      )}
    </div>
  );
}
