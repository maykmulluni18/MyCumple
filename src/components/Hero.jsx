import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Calendar } from 'lucide-react';
import { config } from '../config';

export default function Hero({ theme = 'original', isKonjacActive = false }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [age, setAge] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showCountdown, setShowCountdown] = useState(false);

  const images = config.carouselImages;
  const themeData = config.themes[theme];

  // Logic for Translate Konjac (Konyaku Honyaku)
  const kt = (text) => {
    if (!isKonjacActive) return text;

    // Simple Doraemon-themed mock translation logic
    const translations = {
      "¡Feliz Cumpleaños!": "¡Omedetou Gozaimasu! 🎉",
      "¡Feliz Cumpleaños a lo Doraemon, Maykol!": "¡HB en el Siglo XXII! 🤖",
      "Un día especial merece una celebración espectacular.": "¡Con mis inventos, hoy será el mejor día de la galaxia!",
      "¡Con la hélice o la puerta mágica, este día será galáctico!": "¡Usaremos el Take-copter para ver los fuegos artificiales!",
      "Tiempo en el mundo": "Cronometraje Espacio-Temporal",
      "Faltan para tu cumple": "Cuenta Regresiva Interdimensional",
      "Año": "Ciclos Solares",
      "Años": "Ciclos Solares",
      "Meses": "Lunas",
      "Días": "Rotaciones",
    };

    return translations[text] || `${text}-mon ✨`;
  };

  // Logic for aging counter
  useEffect(() => {
    const timer = setInterval(() => {
      const birthDate = new Date(config.birthDateForAge);
      const now = new Date();

      let years = now.getFullYear() - birthDate.getFullYear();
      let months = now.getMonth() - birthDate.getMonth();
      let days = now.getDate() - birthDate.getDate();

      if (days < 0) {
        months -= 1;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setAge({
        years,
        months,
        days,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds()
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Logic for birthday countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      let nextBirthday = new Date(config.birthDate);

      if (nextBirthday < now) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }

      const diff = nextBirthday - now;

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Slideshow logic
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Alternate between Age and Countdown every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setShowCountdown(prev => !prev);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative w-full h-screen overflow-hidden group" id="hero">

      {/* Background Image Carousel */}
      {images.map((src, idx) => (
        <motion.img
          key={idx}
          src={src}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: activeSlide === idx ? 1 : 0,
            scale: activeSlide === idx ? 1 : 1.05
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          alt={`Fondo ${idx + 1}`}
        />
      ))}

      {/* Dark tint */}
      <div className="absolute inset-0 bg-slate-950/40 transition-all duration-500" />

      {/* Main Content Area */}
      <div className="relative h-full flex flex-col justify-center items-center px-4 pt-20">

        {/* Animated Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            {kt(themeData.heroTitle)}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            {kt(themeData.heroSubtitle)}
          </p>
        </motion.div>

        {/* Central Band (Horizontal strip like reference) */}
        <div className="w-full max-w-7xl backdrop-blur-xl bg-white/10 border-y border-white/20 py-10 md:py-16 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.3)]">

          <AnimatePresence mode="wait">
            {!showCountdown ? (
              <motion.div
                key="age"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col items-center"
              >
                <div className="flex items-center gap-2 mb-6 text-primary-300 font-bold uppercase tracking-[0.2em] text-sm">
                  <Clock size={16} />
                  <span>{kt("Tiempo en el mundo")}</span>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                  <CounterBox value={age.years} label={kt(age.years === 1 ? 'Año' : 'Años')} />
                  <CounterBox value={age.months} label={kt("Meses")} />
                  <CounterBox value={age.days} label={kt("Días")} />
                  <CounterBox value={age.hours} label="Horas" />
                  <CounterBox value={age.minutes} label="Minutos" />
                  <CounterBox value={age.seconds} label="Segs" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="countdown"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col items-center"
              >
                <div className="flex items-center gap-2 mb-6 text-secondary-300 font-bold uppercase tracking-[0.2em] text-sm">
                  <Calendar size={16} />
                  <span>{kt("Faltan para tu cumple")}</span>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-16">
                  <CounterBox value={countdown.days} label="Días" color="secondary" />
                  <CounterBox value={countdown.hours} label="Horas" color="secondary" />
                  <CounterBox value={countdown.minutes} label="Minutos" color="secondary" />
                  <CounterBox value={countdown.seconds} label="Segs" color="secondary" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Carousel Indicators (Dots) */}
        <div className="absolute bottom-10 flex gap-3 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSlide === i ? 'bg-primary-500 w-8' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>

      {/* Edge Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
      >
        <ChevronRight size={32} />
      </button>
    </section>
  );
}

function CounterBox({ value, label, color = 'primary' }) {
  const colorClass = color === 'primary' ? 'text-primary-400' : 'text-secondary-400';
  return (
    <div className="flex flex-col items-center min-w-[80px]">
      <span className={`text-4xl md:text-6xl font-black ${colorClass} tabular-nums leading-none`}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-white/60 text-xs md:text-sm font-semibold uppercase mt-2 tracking-widest text-center">
        {label}
      </span>
    </div>
  );
}
