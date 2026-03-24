import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MemoryBread({ theme = 'original' }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  if (theme !== 'doraemon') return null;

  useEffect(() => {
    const saved = localStorage.getItem('memory_bread');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  const addMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsgs = [{ text: input, id: Date.now() }, ...messages].slice(0, 6);
    setMessages(newMsgs);
    localStorage.setItem('memory_bread', JSON.stringify(newMsgs));
    setInput('');
  };

  return (
    <section className="py-24 px-4 bg-slate-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-black text-white mb-4">🍞 Pan del Recuerdo (Memory Bread)</h2>
        <p className="text-slate-400 mb-12">¡Escribe algo y graba tu memoria en el pan del siglo XXII!</p>

        <form onSubmit={addMessage} className="flex gap-2 max-w-md mx-auto mb-16">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white outline-none focus:border-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-xl text-white font-bold transition-all shadow-lg hover:shadow-blue-500/30">
            ¡GRABAR!
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: (i % 2 === 0 ? 2 : -2) }}
                className="relative aspect-square flex items-center justify-center p-6"
              >
                {/* Bread Shape */}
                <div className="absolute inset-0 bg-[#f5deb3] rounded-[40px] border-8 border-[#d2b48c] shadow-xl" />
                <div className="absolute top-0 w-full h-8 bg-[#d2b48c] rounded-t-[40px] opacity-30 shadow-inner" />
                
                {/* Message Text */}
                <p className="relative z-10 text-[#8b4513] font-handwriting font-bold text-center text-lg italic overflow-hidden overscroll-none">
                  "{m.text}"
                </p>
                
                {/* Number pattern similar to the real anime bread */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8b4513_1px,transparent_1px)] bg-[size:15px_15px] p-8" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {messages.length === 0 && (
          <p className="text-slate-600 italic">No hay memorias grabadas aún... ¡Sé el primero!</p>
        )}
      </div>
    </section>
  );
}
