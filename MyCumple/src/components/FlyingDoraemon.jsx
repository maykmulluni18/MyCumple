import React from 'react';
import { motion } from 'framer-motion';

export default function FlyingDoraemon({ theme }) {
  if (theme !== 'doraemon') return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[80]"
      animate={{
        x: [window.innerWidth, -100, window.innerWidth],
        y: [100, 300, 150, 400, 100],
        rotate: [0, 5, -5, 10, 0]
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ left: 0, top: 0 }}
    >
      <div className="relative p-4">
        {/* Take-copter (Bamboo-copter) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 flex flex-col items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-1 bg-yellow-600 rounded-full"
          />
          <div className="w-1 h-3 bg-yellow-700 -mt-0.5" />
        </div>

        {/* Small Doraemon Head */}
        <div className="w-12 h-12 bg-[#00A1E9] rounded-full border-2 border-slate-900 shadow-lg relative flex items-center justify-center overflow-hidden">
          <div className="w-10 h-8 bg-white rounded-full mt-3 flex flex-col items-center">
            <div className="flex gap-1 -mt-1.5">
              <div className="w-3 h-4 bg-white border border-slate-900 rounded-full relative">
                <div className="absolute top-1 right-0.5 w-1 h-1.5 bg-slate-950 rounded-full" />
              </div>
              <div className="w-3 h-4 bg-white border border-slate-900 rounded-full relative">
                <div className="absolute top-1 left-0.5 w-1 h-1.5 bg-slate-950 rounded-full" />
              </div>
            </div>
            <div className="w-2 h-2 bg-red-600 rounded-full border border-slate-950 -mt-0.5" />
          </div>
          <div className="absolute bottom-0 w-full h-1.5 bg-red-600" />
        </div>
      </div>
    </motion.div>
  );
}
