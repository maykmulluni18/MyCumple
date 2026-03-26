import React, { useState } from 'react';
import { Menu, X, Gift, Heart, CalendarHeart, DollarSign, PartyPopper, Brain, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { title: "Inicio", id: "hero", icon: <PartyPopper size={18} /> },
    { title: "Pastel", id: "cake", icon: <PartyPopper size={18} /> },
    { title: "Recuerdos", id: "carousel", icon: <Heart size={18} /> },
    { title: "Sorpresa", id: "scratch", icon: <Star size={18} /> },
    { title: "Línea de Vida", id: "timeline", icon: <CalendarHeart size={18} /> },
    { title: "Juego", id: "quiz", icon: <Brain size={18} /> },
    { title: "Mensajes", id: "guestbook", icon: <Gift size={18} /> }
  ];

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleDonation = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#22c55e', '#fed7aa', '#16a34a', '#8b5cf6'] // Money/Yape colors
    });
    setIsModalOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full z-40 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400 cursor-pointer" onClick={() => handleScroll('hero')}>
              MiCumple<span className="text-secondary-500">🥳</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex flex-1 justify-center space-x-8">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScroll(link.id)}
                  className="text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  {link.icon} {link.title}
                </button>
              ))}
            </div>

            {/* Special "Acepto Donaciones" Button - Desktop */}
            <div className="hidden md:flex items-center">
               <button
                  onClick={handleDonation}
                  className="animate-pulse bg-gradient-to-r from-purple-600 to-primary-500 hover:from-purple-500 hover:to-primary-400 text-white font-bold py-2 px-4 rounded-full text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.6)] transform hover:scale-105 transition-all"
                >
                  <DollarSign size={16} /> ¡Acepto Yape!
                </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-300 hover:text-white focus:outline-none"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <div className="md:hidden absolute w-full bg-slate-900 border-b border-white/10 py-4 shadow-xl select-none">
            <div className="flex flex-col space-y-4 px-6 items-center">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScroll(link.id)}
                  className="text-slate-300 hover:text-white w-full py-2 flex items-center justify-center gap-2 text-lg font-medium border-b border-white/5 last:border-0"
                >
                  {link.icon} {link.title}
                </button>
              ))}
              
              <button
                onClick={handleDonation}
                className="w-full justify-center bg-gradient-to-r from-purple-600 to-primary-500 text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 mt-4 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
              >
                <DollarSign size={20} /> ¡Acepto Yape! jajaja
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Yape Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="relative w-full max-w-sm bg-gradient-to-b from-purple-800 to-purple-950 rounded-3xl p-6 shadow-[0_0_40px_rgba(139,92,246,0.6)] border border-purple-500/30 flex flex-col items-center text-center"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-purple-300 hover:text-white bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-16 h-1 bg-white/20 rounded-full mb-6" />
              
              <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">¡YAPE!</h3>
              <p className="text-purple-200 text-sm mb-6 leading-relaxed bg-white/10 p-3 rounded-xl border border-white/5">
                "Este cumpleaños se financia solo... ¡Muchas gracias por tu amable colaboración!" 😂🎉
              </p>
              
              <div className="bg-white p-4 rounded-2xl w-full aspect-square mb-6 shadow-xl flex items-center justify-center">
                <img 
                   src={config.yapeQr} 
                   alt="QR de Yape" 
                   className="w-full h-full object-contain"
                />
              </div>
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-white text-purple-900 font-bold py-3 rounded-xl hover:bg-purple-100 transition-colors shadow-lg active:scale-95"
              >
                ¡Ya doné! / Cerrar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
