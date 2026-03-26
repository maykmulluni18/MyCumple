import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { config } from '../config';

export default function InteractiveCake({ theme = 'original' }) {
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [isBlownOut, setIsBlownOut] = useState(false);

  const isDoraemon = theme === 'doraemon';

  const blowCandle = (index) => {
    if (!candles[index]) return;

    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    if (newCandles.every(c => !c)) {
      setTimeout(() => {
        setIsBlownOut(true);
        triggerSurprise();
      }, 500);
    }
  };

  const triggerSurprise = () => {
    const end = Date.now() + 5000;
    const colors = isDoraemon
      ? ['#00A1E9', '#ED1C24', '#ffffff', '#FFCB00']
      : ['#8b5cf6', '#ec4899', '#ffffff', '#ffd700'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="py-24 flex flex-col items-center justify-center overflow-hidden bg-slate-950/20 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          {isDoraemon ? '¡Pastel Cósmico!' : '¡Pide un Deseo!'} 🎂
        </h2>
        <p className="text-slate-400 text-lg">
          {isDoraemon ? 'Apaga las velitas al estilo Doraemon' : 'Haz clic en las llamas para apagar las velitas'}
        </p>
      </motion.div>

      <div className="relative">
        <AnimatePresence>
          {isBlownOut && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl cursor-default"
              onClick={() => setIsBlownOut(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="relative max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsBlownOut(false)}
                  className="absolute -top-4 -right-4 z-50 p-3 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-full text-white backdrop-blur-xl transition-all hover:scale-110 active:scale-95 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className={`relative overflow-hidden bg-white/10 backdrop-blur-2xl px-8 md:px-16 py-10 md:py-14 rounded-[40px] border-2 border-white/20 shadow-2xl text-center ${isDoraemon ? 'shadow-blue-500/30' : 'shadow-pink-500/30'}`}>
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                  <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-[80px]" />
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px]" />

                  <motion.span 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`block text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r mb-6 ${isDoraemon ? 'from-blue-400 via-white to-red-400' : 'from-pink-400 via-purple-400 to-indigo-400'}`}
                  >
                    {isDoraemon ? '¡DORA-FELICIDADES!' : '¡FELICIDADES!'} 🎉
                  </motion.span>
                  
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-xl md:text-2xl font-medium"
                  >
                    {isDoraemon ? '¡Que Nobita no te quite tus deseos!' : 'Tus deseos se harán realidad ✨'}
                  </motion.p>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => setIsBlownOut(false)}
                    className={`mt-10 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg ${isDoraemon ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/40' : 'bg-pink-600 hover:bg-pink-500 shadow-pink-900/40'}`}
                  >
                    ¡Gracias! 💖
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex flex-col items-center select-none scale-110 md:scale-125">

          {/* Candles Container */}
          <div className="flex gap-4 h-20 items-end justify-center mb-0 relative z-20">
            {candles.map((isOn, idx) => (
              <div
                key={idx}
                className="relative flex flex-col items-center group cursor-pointer"
                onClick={() => blowCandle(idx)}
              >
                <AnimatePresence>
                  {isOn && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0, y: -20 }}
                      className="absolute -top-6 w-5 h-8 z-10"
                    >
                      <div className={`absolute inset-0 rounded-full blur-md opacity-60 animate-pulse ${isDoraemon ? 'bg-blue-400' : 'bg-orange-500'}`} />
                      <div className={`absolute inset-0 rounded-full animate-flame bg-gradient-to-t ${isDoraemon ? 'from-blue-600 via-white to-yellow-200' : 'from-red-600 via-orange-400 to-yellow-200'}`} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`w-3 h-16 rounded-t-sm relative overflow-hidden transition-all duration-500 ${isOn ? 'shadow-[0_0_10px_rgba(251,146,60,0.3)]' : 'opacity-40 brightness-50'}`}>
                  <div className={`absolute inset-0 ${isDoraemon
                    ? ['bg-blue-500', 'bg-red-500', 'bg-yellow-500', 'bg-blue-300', 'bg-white'][idx]
                    : ['bg-pink-400', 'bg-blue-400', 'bg-purple-400', 'bg-green-400', 'bg-orange-400'][idx]
                    }`} />
                  <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,#fff_5px,#fff_10px)]" />
                  <div className="absolute left-0 top-0 w-1/2 h-full bg-white/20" />
                </div>
                <div className="w-[2px] h-2 bg-slate-800 -mt-[66px] mb-[58px] z-0" />
              </div>
            ))}
          </div>

          {/* Cake Body */}
          <div className="relative flex flex-col items-center w-full">
            {/* Top Layer */}
            <div className={`w-60 h-24 rounded-t-[40px] shadow-inner relative overflow-hidden border-b-4 z-10 ${isDoraemon ? 'bg-white border-slate-100' : 'bg-gradient-to-b from-white to-pink-100 border-pink-200'}`}>
              {isDoraemon ? (
                <>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full shadow-lg opacity-80" />
                  <div className="absolute top-12 left-4 w-12 h-[2px] bg-slate-200 rotate-[10deg]" />
                  <div className="absolute top-16 left-6 w-12 h-[2px] bg-slate-200" />
                  <div className="absolute top-12 right-4 w-12 h-[2px] bg-slate-200 -rotate-[10deg]" />
                  <div className="absolute top-16 right-6 w-12 h-[2px] bg-slate-200" />
                </>
              ) : (
                <>
                  <div className="absolute top-0 w-full h-8 flex justify-around">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-8 h-10 bg-white rounded-full -mt-4 shadow-sm" style={{ height: `${Math.random() * 15 + 15}px` }} />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex justify-center items-center gap-4 opacity-40">
                    <div className="w-4 h-4 rounded-full bg-pink-400" />
                    <div className="w-4 h-4 rounded-full bg-purple-400" />
                  </div>
                </>
              )}
            </div>

            {/* Middle Collar Layer (Doraemon only) */}
            {isDoraemon && (
              <div className="w-64 h-8 bg-red-600 -mt-2 z-20 flex items-center justify-center relative shadow-lg">
                <div className="w-10 h-10 bg-yellow-400 rounded-full border-2 border-yellow-600 shadow-xl flex flex-col items-center justify-center overflow-hidden">
                  <div className="w-full h-1 bg-yellow-600 -mt-1" />
                  <div className="w-3 h-3 bg-yellow-900 rounded-full mt-1 shadow-inner" />
                </div>
              </div>
            )}

            {/* Bottom Layer */}
            <div className={`w-72 h-32 rounded-t-[50px] shadow-2xl relative overflow-hidden z-0 ${isDoraemon ? 'bg-gradient-to-b from-[#00A1E9] to-[#0087C4] -mt-6' : 'bg-gradient-to-b from-pink-500 to-pink-700 -mt-5'}`}>
              {isDoraemon ? (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-20 bg-white/20 rounded-b-full border-t-2 border-white/30" />
              ) : (
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-6 bg-white/30 backdrop-blur-sm" />
              )}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            {/* Base/Plate */}
            <div className="w-80 h-10 bg-slate-100 rounded-t-full -mt-4 shadow-lg flex items-center justify-center border-b-[6px] border-slate-300">
              <div className="w-full h-2 bg-slate-200/50 rounded-full mx-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 flex flex-col items-center gap-4">
        <div className="flex -space-x-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < candles.filter(c => !c).length ? (isDoraemon ? 'bg-blue-500' : 'bg-pink-500') : 'bg-slate-700'}`} />
          ))}
        </div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
          Velas apagadas: {candles.filter(c => !c).length} / {candles.length}
        </p>
      </div>
    </section>
  );
}
