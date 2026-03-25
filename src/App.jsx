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
import DorayakiGame from './components/DorayakiGame';
import DoraemonCompanion from './components/DoraemonCompanion';
import TakeCopterButton from './components/TakeCopterButton';
import SizeLight from './components/SizeLight';
import FlyingDoraemon from './components/FlyingDoraemon';
import { Palette, Languages } from 'lucide-react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('doraemon');
  const [isKonjacActive, setIsKonjacActive] = useState(false);
  const [sizeMode, setSizeMode] = useState('none'); // 'none', 'big', 'small'
  const [userName, setUserName] = useState(localStorage.getItem('doraemon_user_name') || '');

  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll on mount
  }, []);

  useEffect(() => {
    if (theme === 'doraemon') {
      document.documentElement.classList.add('doraemon-theme');
    } else {
      document.documentElement.classList.remove('doraemon-theme');
      setIsKonjacActive(false); // Disable Konjac when leaving Doraemon theme
    }
  }, [theme]);

  const handleSetName = (name) => {
    setUserName(name);
    localStorage.setItem('doraemon_user_name', name);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'original' ? 'doraemon' : 'original');
  };

  return (
    <div className={`min-h-screen bg-slate-950 selection:bg-primary-500/30 transition-colors duration-500 ${theme === 'doraemon' ? 'doraemon-theme' : ''}`}>
      <MagicCursor theme={theme} />
      <Navbar theme={theme} />
      <Hero theme={theme} isKonjacActive={isKonjacActive} />

      {/* Galactic Features (Theme Specific) */}
      {theme === 'doraemon' && (
        <>
          {!userName && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
              <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border-4 border-blue-500">
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase">¿Cómo te llamas? 🤖</h3>
                <p className="text-slate-500 mb-6 text-sm">Para que Doraemon guarde tus aventuras en el bolsillo mágico.</p>
                <input
                  type="text"
                  placeholder="Tu nombre aquí..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      handleSetName(e.target.value.trim());
                    }
                  }}
                  className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl px-4 py-3 text-slate-900 mb-4 outline-none focus:border-blue-500 transition-all text-center"
                />
                <button
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    if (input.value.trim()) handleSetName(input.value.trim());
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-3 rounded-xl transition-all shadow-lg hover:shadow-blue-500/30"
                >
                  ¡LISTO!
                </button>
              </div>
            </div>
          )}
          {/* Interactive Cake Section */}
          {/* <div id="cake" className="bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"> */}
          <InteractiveCake theme={theme} sizeMode={sizeMode} />
          {/* </div> */}

          <AnywhereDoor theme={theme} isKonjacActive={isKonjacActive} userName={userName} />
          <GadgetPocket theme={theme} userName={userName} />
          <MemoryBread theme={theme} userName={userName} />
          <DorayakiGame theme={theme} userName={userName} />
        </>
      )}


      {/* <ImageCarousel theme={theme} sizeMode={sizeMode} isKonjacActive={isKonjacActive} /> */}

      {/* Scratch Card Section */}
      <div id="scratch" className="bg-slate-900/50 overflow-hidden">
        <ScratchCard theme={theme} />
      </div>

      <Timeline theme={theme} isKonjacActive={isKonjacActive} />

      {/* Mini Quiz Section */}
      <div id="quiz" className="bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
        <MiniQuiz theme={theme} userName={userName} />
      </div>

      {/* Decorative divider */}
      <div className="w-full flex justify-center py-10 opacity-30">
        <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      </div>

      <Guestbook theme={theme} isKonjacActive={isKonjacActive} userName={userName} />

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
        {/* <button
          onClick={toggleTheme}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group relative"
          title="Cambiar Tema"
        >
          <Palette className={theme === 'doraemon' ? 'text-[#00A1E9]' : 'text-primary-400'} size={24} />
          <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {theme === 'doraemon' ? 'Tema Original' : 'Tema Doraemon'}
          </span>
        </button> */}

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
