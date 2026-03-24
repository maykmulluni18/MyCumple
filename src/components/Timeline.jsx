import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import * as Icons from 'lucide-react';

const TimelineItem = ({ item, index }) => {
  const IconComponent = Icons[item.icon] || Icons.Star;
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`relative flex items-center justify-between md:justify-normal w-full mb-12 md:mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Spacer for desktop layout */}
      <div className="hidden md:block w-5/12" />
      
      {/* Center Line Dot */}
      <div className="absolute left-4 md:left-1/2 -ml-[20px] md:-ml[16px] w-[40px] h-[40px] md:w-[32px] md:h-[32px] rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 shadow-[0_0_15px_rgba(139,92,246,0.6)] flex items-center justify-center z-10 border-4 border-slate-950">
        <IconComponent size={14} className="text-white hidden md:block" />
      </div>

      {/* Content Card */}
      <div className={`w-[calc(100%-4rem)] md:w-5/12 ml-16 md:ml-0 glass-card p-6 md:p-8 rounded-2xl relative ${isEven ? 'md:text-left' : 'md:text-right'}`}>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <IconComponent size={64} />
        </div>
        <span className="inline-block py-1 px-3 rounded-full bg-primary-500/20 text-primary-300 text-sm font-bold mb-3 border border-primary-500/30">
          {item.year}
        </span>
        <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function Timeline({ theme = 'original', isKonjacActive = false }) {
  const kt = (text) => {
    if (!isKonjacActive) return text;
    const translations = {
      "Un Viaje en el Tiempo": "¡Avenida del Tiempo! 🕒",
      "Momentos especiales que han marcado el camino hasta el día de hoy.": "¡Nuestra propia máquina del tiempo de recuerdos!"
    };
    return translations[text] || `${text}-mon`;
  };

  return (
    <section className="py-20 relative px-4 overflow-hidden" id="timeline">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {kt("Un Viaje en el Tiempo")}
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          {kt("Momentos especiales que han marcado el camino hasta el día de hoy.")}
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Main Vertical Line */}
        <div className="absolute left-9 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-600/0 via-primary-500/50 to-secondary-500/0 md:-ml-[0.5px]" />
        
        <div className="relative z-10">
          {config.timeline.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
