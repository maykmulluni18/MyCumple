import React from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';

export default function ImageCarousel({ theme = 'original', sizeMode = 'none', isKonjacActive = false }) {
  const kt = (text) => {
    if (!isKonjacActive) return text;
    const translations = {
      "Momentos Inolvidables": "¡Recuerdos del Siglo XXII! 📸",
      "Cada foto es una historia, una sonrisa y un recuerdo que perdura en el tiempo.": "¡Guardamos estos momentos en el bolsillo 4D para siempre!",
      "Recuerdo": "Dato Guardado"
    };
    return translations[text] || `${text}-mon`;
  };

  return (
    <section className="py-20 bg-slate-900/50" id="carousel">
      <div className="max-w-6xl mx-auto px-4 text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {kt("Momentos Inolvidables")}
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          {kt("Cada foto es una historia, una sonrisa y un recuerdo que perdura en el tiempo.")}
        </p>
      </div>

      <div className="w-full relative px-4 md:px-10">
        <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory py-8 custom-scrollbar scroll-smooth">
          {config.carouselImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: sizeMode === 'big' ? 1.2 : sizeMode === 'small' ? 0.7 : 1
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="snap-center shrink-0 w-[80vw] md:w-[60vw] lg:w-[40vw] max-w-[500px]"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden glass-card shadow-2xl group border-2 border-white/10 hover:border-primary-500/50 transition-colors">
                <img
                  src={src}
                  alt={`Recuerdo ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white text-lg font-medium drop-shadow-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-500 animate-pulse"></span>
                    {kt("Recuerdo")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Spacer to allow scrolling perfectly to the last item */}
          <div className="shrink-0 w-4 md:w-10"></div>
        </div>
      </div>
    </section>
  );
}
