import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImageCarousel from './components/ImageCarousel';
import Timeline from './components/Timeline';
import Guestbook from './components/Guestbook';
import EasterEggs from './components/EasterEggs';
import MagicCursor from './components/MagicCursor';
import MusicPlayer from './components/MusicPlayer';
import InteractiveCake from './components/InteractiveCake';
import ScratchCard from './components/ScratchCard';
import MiniQuiz from './components/MiniQuiz';
import AnywhereDoor from './components/AnywhereDoor';
import MemoryBread from './components/MemoryBread';
import GadgetPocket from './components/GadgetPocket';
import DoraemonCompanion from './components/DoraemonCompanion';
import TakeCopterButton from './components/TakeCopterButton';
import SizeLight from './components/SizeLight';
import FlyingDoraemon from './components/FlyingDoraemon';
import { Palette, Languages } from 'lucide-react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('original');
  const [isKonjacActive, setIsKonjacActive] = useState(false);
  const [sizeMode, setSizeMode] = useState('none'); // 'none', 'big', 'small'

  useEffect(() => {
    if (theme === 'doraemon') {
      document.documentElement.classList.add('doraemon-theme');
    } else {
      document.documentElement.classList.remove('doraemon-theme');
      setIsKonjacActive(false); // Disable Konjac when leaving Doraemon theme
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'original' ? 'doraemon' : 'original');
  };

  // Logic for Translate Konjac: simple global overlay or specific text wrapper
  // We'll use a hacky but effective way for this demo: a CSS var or just manual check in components
  // But for now, let's just keep the state and maybe show a notice.
  // Actually, we can add a data attribute and use CSS content if we wanted, but let's stick to React state.

  return (
    <div className={`min-h-screen bg-slate-950 selection:bg-primary-500/30 transition-colors duration-500 ${theme === 'doraemon' ? 'doraemon-theme' : ''}`}>
      <MagicCursor theme={theme} />
      <Navbar theme={theme} />
      <Hero theme={theme} isKonjacActive={isKonjacActive} />

      {/* Galactic Features (Theme Specific) */}
      {theme === 'doraemon' && (
        <>
          <AnywhereDoor theme={theme} isKonjacActive={isKonjacActive} />
          <GadgetPocket theme={theme} />
          <MemoryBread theme={theme} />
        </>
      )}

      {/* Interactive Cake Section */}
      <div id="cake" className="bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
        <InteractiveCake theme={theme} sizeMode={sizeMode} />
      </div>

      {/* <ImageCarousel theme={theme} sizeMode={sizeMode} isKonjacActive={isKonjacActive} /> */}

      {/* Scratch Card Section */}
      <div id="scratch" className="bg-slate-900/50 overflow-hidden">
        <ScratchCard theme={theme} />
      </div>

      <Timeline theme={theme} isKonjacActive={isKonjacActive} />

      {/* Mini Quiz Section */}
      <div id="quiz" className="bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
        <MiniQuiz theme={theme} />
      </div>

      {/* Decorative divider */}
      <div className="w-full flex justify-center py-10 opacity-30">
        <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      </div>

      <Guestbook theme={theme} isKonjacActive={isKonjacActive} />

      {/* Footer */}
      <footer className="py-12 text-center text-slate-500 text-sm border-t border-white/5 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/10 to-transparent" />
        <div className="relative z-10">
          <p>Hecho con ❤️ para un día muy especial.</p>
          <p className="mt-2 text-slate-600 uppercase tracking-widest text-xs">¡Felicidades!</p>
        </div>
      </footer>

      <EasterEggs />
      <MusicPlayer theme={theme} />

      {/* Doraemon Specific Overlay Components */}
      <DoraemonCompanion theme={theme} />
      <TakeCopterButton theme={theme} />
      <FlyingDoraemon theme={theme} />

      {/* Floating Control Center */}
      <div className="fixed bottom-6 left-6 z-[60] flex gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
          title="Cambiar Tema"
        >
          <Palette className={theme === 'doraemon' ? 'text-[#00A1E9]' : 'text-primary-400'} size={24} />
          <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {theme === 'doraemon' ? 'Tema Original' : 'Tema Doraemon'}
          </span>
        </button>

        {/* Translate Konjac (Only in Doraemon Theme) */}
        {theme === 'doraemon' && (
          <button
            onClick={() => setIsKonjacActive(!isKonjacActive)}
            className={`p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group relative border ${isKonjacActive ? 'bg-blue-600 border-white text-white' : 'bg-white/10 backdrop-blur-md border-white/20 text-blue-400'}`}
            title="Traductor de Konjac"
          >
            <Languages size={24} />
            <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {isKonjacActive ? 'Desactivar Traductor' : 'Activar Traductor de Konjac'}
            </span>
          </button>
        )}

        {/* Size Light (Only in Doraemon Theme) */}
        <SizeLight sizeMode={sizeMode} setSizeMode={setSizeMode} theme={theme} />
      </div>
    </div>
  );
}

export default App;
