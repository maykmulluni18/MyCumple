import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

export default function MemoryBread({ theme = 'original', userName }) {
  const [input, setInput] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (theme !== 'doraemon') return null;

  const addMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      await api.post('/gadget-interactions', {
        user_name: userName || 'Anónimo',
        gadget_type: 'memory_bread',
        content: input
      });
      setIsSent(true);
      setInput('');
      setTimeout(() => setIsSent(false), 3000);
    } catch (error) {
      console.error('Error saving memory bread:', error);
    }
  };

  return (
    <section className="py-24 px-4 bg-slate-900/30">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl font-black text-white mb-4">🍞 Pan del Recuerdo</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          Escribe un mensaje especial y quedará grabado para siempre en la memoria del siglo XXII.
          (Los mensajes se guardan de forma privada).
        </p>

        <form onSubmit={addMessage} className="w-full max-w-lg mb-8 relative">
          <div className="flex gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu secreto o mensaje..."
              className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl text-white font-black tracking-widest transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95 disabled:opacity-50" disabled={isSent}>
              {isSent ? '¡GRABADO!' : '¡GRABAR!'}
            </button>
          </div>

          <AnimatePresence>
            {isSent && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-emerald-400 font-bold uppercase tracking-widest text-xs"
              >
                ✨ ¡Tu mensaje ha sido guardado con éxito! ✨
              </motion.p>
            )}
          </AnimatePresence>
        </form>

        <div className="relative group perspective-1000 mt-8">
          <motion.div
            animate={isSent ? { rotateY: [0, 10, -10, 0], scale: [1, 1.05, 1] } : {}}
            className="w-48 h-48 bg-[#f5deb3] rounded-3xl border-8 border-[#d2b48c] shadow-2xl flex items-center justify-center p-6"
          >
            <p className="text-[#8b4513] font-handwriting font-bold text-center text-lg italic opacity-40 select-none">
              {isSent ? '¡Bocado Mágico!' : 'Pan listo para grabar'}
            </p>
          </motion.div>
          <div className="absolute -bottom-4 -left-4 w-full h-full bg-slate-800/50 -z-10 rounded-3xl blur-xl" />
        </div>
      </div>
    </section>
  );
}
