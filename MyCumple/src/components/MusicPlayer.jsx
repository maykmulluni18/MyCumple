import React, { useState, useRef, useEffect } from 'react';
import { Disc3, Music, VolumeX } from 'lucide-react';
import { config } from '../config';

export default function MusicPlayer({ theme = 'original' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const audioUrl = config.themes[theme].musicUrl;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      // If was playing, keep playing the new track
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
    }
  }, [theme, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {isPlaying && (
        <div className="hidden md:flex flex-col items-end mr-2 animate-pulse">
          <Music size={14} className="text-secondary-400 -mt-2 animate-bounce delay-75" />
          <Music size={20} className="text-primary-400 mr-4 animate-bounce" />
        </div>
      )}
      
      <button
        onClick={togglePlay}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] border-2 ${isPlaying ? 'bg-slate-900 border-primary-500 shadow-[0_0_20px_rgba(var(--primary-main),0.6)]' : 'bg-slate-800 border-white/20'}`}
        title={isPlaying ? "Pausar Música" : "Reproducir Música"}
      >
        <audio ref={audioRef} src={audioUrl} loop />
        
        {isPlaying ? (
          <Disc3 size={32} className="text-white animate-[spin_3s_linear_infinite]" />
        ) : (
          <VolumeX size={24} className="text-slate-400" />
        )}

        <div className="absolute w-3 h-3 bg-slate-950 rounded-full" />
      </button>
    </div>
  );
}
