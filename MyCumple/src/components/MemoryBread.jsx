import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import { checkProfanity } from '../utils/profanityFilter';

const BreadSlice = ({ content, isNew = false }) => (
  // ... (rest of the component)
  <motion.div
    initial={isNew ? { scale: 0, rotate: -20 } : { opacity: 0, y: 20 }}
    animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
    className="relative group perspective-1000"
  >
    <div className="w-46 h-46 bg-[#f5deb3] rounded-2xl border-4 border-[#d2b48c] shadow-xl flex flex-col items-center justify-center p-3 relative overflow-hidden cursor-default hover:scale-105 transition-transform duration-300">
      {/* Decoration Lines */}
      <div className="absolute top-2 left-0 w-full h-[1px] bg-[#d2b48c]/30" />
      <div className="absolute top-1/3 left-0 w-full h-[1px] bg-[#d2b48c]/30" />
      <div className="absolute top-2/3 left-0 w-full h-[1px] bg-[#d2b48c]/30" />

      <p className="text-[#8b4513] font-handwriting text-[15px] font-bold text-center leading-tight italic z-10 break-words line-clamp-4">
        {content}
      </p>

      {/* Sello */}
      <div className="absolute bottom-1 right-1 opacity-10 rotate-12">
        <div className="border border-[#8b4513] rounded-full p-0.5 text-[4px] font-black text-[#8b4513] uppercase">
          XXII
        </div>
      </div>
    </div>
    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-2 bg-black/20 -z-10 rounded-full blur-md" />
  </motion.div>
);

export default function MemoryBread({ theme = 'original', userName }) {
  const [input, setInput] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (theme === 'doraemon') {
      fetchHistory();
    }
  }, [theme]);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/gadget-interactions?type=memory_bread');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching memory bread history:', error);
    }
  };

  if (theme !== 'doraemon') return null;

  const addMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError(null);

    // 1. Local Profanity Check (Instant & Secure)
    if (checkProfanity(input)) {
      setError('⚡ ¡ERROR DIMENSIONAL! Contenido no apto para el siglo XXII.');
      setTimeout(() => setError(null), 3500);
      return;
    }

    try {
      // 2. Save to database
      await api.post('/gadget-interactions', {
        user_name: userName || 'Anónimo',
        gadget_type: 'memory_bread',
        content: input
      });

      setIsSent(true);
      setInput('');
      fetchHistory();
      setTimeout(() => setIsSent(false), 3000);
    } catch (err) {
      console.error('Error in message submission:', err);
    }
  };

  const lastSix = history.slice(0, 6);

  return (
    <section className="py-10 px-4 bg-slate-900/40 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4"
          >
            🍞 Pan del Recuerdo
          </motion.h2>
          <p className="text-slate-400 max-w-md">
            Graba tus pensamientos en rebanadas de pan mágicas del siglo XXII.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
          {/* Interaction & Grid Area */}
          <div className="flex-1 w-full space-y-12">

            {/* Input Form */}
            <form onSubmit={addMessage} className="max-w-xl mx-auto relative z-20">
              <div className="flex gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe algo para grabar..."
                  className="flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
                />
                <button
                  className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl text-white font-black tracking-widest transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                  disabled={isSent || !input.trim()}
                >
                  {isSent ? '¡GRABADO!' : '¡GRABAR!'}
                </button>
              </div>
              <AnimatePresence>
                {isSent && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-8 left-0 right-0 text-center text-emerald-400 font-bold uppercase tracking-widest text-[10px]"
                  >
                    ✨ ¡Nueva rebanada de memoria creada! ✨
                  </motion.p>
                )}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-8 left-0 right-0 text-center text-red-500 font-bold uppercase tracking-widest text-[10px] drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            {/* Bread Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-6 justify-items-center">
                {lastSix.length > 0 ? (
                  lastSix.map((msg, idx) => (
                    <BreadSlice key={msg.id} content={msg.content} isNew={idx === 0 && isSent} />
                  ))
                ) : (
                  <div className="col-span-full py-12 flex flex-col items-center opacity-20 grayscale">
                    <div className="w-36 h-36 bg-[#f5deb3] rounded-2xl border-4 border-[#d2b48c] border-dashed flex items-center justify-center">
                      <span className="text-4xl text-[#8b4513]">🍞</span>
                    </div>
                    <p className="mt-4 text-[#d2b48c] font-black uppercase tracking-tighter">Esperando recuerdos...</p>
                  </div>
                )}
              </div>
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[100px] -z-10" />
            </div>
          </div>

          {/* Side History Log - Bolsillo 4D Style */}
          <div className="w-full lg:w-80 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border-2 border-white/10 p-6 flex flex-col h-[550px] shadow-2xl shrink-0 sticky top-24">
            <div className="mb-6">
              <h3 className="text-xl font-black text-white flex items-center gap-2 uppercase tracking-tighter">
                Recuerdos 🎒
              </h3>
              <p className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                🔦 Historial de recuerdos
              </p>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {history.length > 0 ? history.map((item) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={item.id}
                  className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-4 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                    🍞
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-200 font-bold text-sm leading-snug mb-1 truncate">
                      {item.content}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-blue-400 text-[9px] font-bold uppercase tracking-widest truncate">
                        {item.user_name}
                      </p>
                      <span className="w-1 h-1 bg-slate-600 rounded-full" />
                      <p className="text-slate-500 text-[8px] uppercase font-black opacity-50">
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="flex flex-col items-center justify-center h-full opacity-30">
                  <span className="text-4xl mb-4">🔍</span>
                  <p className="text-white text-sm font-black uppercase tracking-widest italic text-center">Sin actividad reciente</p>
                </div>
              )}
            </div>

            {/* <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-[9px] text-slate-500 font-bold text-center uppercase tracking-widest">
                Tecnología del Siglo XXII
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
