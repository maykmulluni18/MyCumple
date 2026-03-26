import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function TakeCopterButton({ theme = 'original' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (theme !== 'doraemon') return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-24 z-[60] group"
          title="Volar al inicio"
        >
          {/* Propeller */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
            className="w-10 h-[2px] bg-yellow-600 mx-auto -mb-[2px] relative z-10"
          >
             <div className="absolute top-1/2 left-0 w-2 h-2 bg-yellow-400 rounded-full -translate-y-1/2" />
             <div className="absolute top-1/2 right-0 w-2 h-2 bg-yellow-400 rounded-full -translate-y-1/2" />
          </motion.div>
          {/* Stick */}
          <div className="w-[3px] h-3 bg-slate-300 mx-auto" />
          {/* Base Button */}
          <div className="bg-blue-500 hover:bg-blue-400 text-white p-3 rounded-xl shadow-xl border-2 border-slate-900 transition-colors">
            <ArrowUp size={20} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
