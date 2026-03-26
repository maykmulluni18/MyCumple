import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Play, MousePointer2, AlertCircle, Keyboard, Zap } from 'lucide-react';
import api from '../api';

const DIFFICULTIES = {
  fácil: { itemSpeed: 1.2, spawnInterval: 1200, mouseChance: 0.1, playerSpeed: 1.3, label: 'Fácil 🥯', color: 'bg-green-500', multiplier: 1 },
  normal: { itemSpeed: 1.8, spawnInterval: 900, mouseChance: 0.2, playerSpeed: 1.1, label: 'Normal 🤖', color: 'bg-blue-500', multiplier: 2.5 },
  difícil: { itemSpeed: 2.6, spawnInterval: 650, mouseChance: 0.35, playerSpeed: 1.0, label: 'Difícil 🔥', color: 'bg-orange-500', multiplier: 7 },
  imposible: { itemSpeed: 4.2, spawnInterval: 400, mouseChance: 0.5, playerSpeed: 0.9, label: 'Imposible 💀', color: 'bg-red-600', multiplier: 25 }
};

export default function DorayakiGame({ theme = 'original', userName }) {
  const [gameState, setGameState] = useState('idle'); // idle, playing, over
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('normal');
  const [highScores, setHighScores] = useState([]);
  const [items, setItems] = useState([]);

  const gameRef = useRef(null);
  const playerRef = useRef(null);
  const requestRef = useRef();
  const lastTimeRef = useRef();
  const nextSpawnRef = useRef(0);
  const keysPressed = useRef({});
  const posRef = useRef({ x: 50, y: 85 });
  const scoreRef = useRef(0);

  const fetchHighScores = async () => {
    try {
      const response = await api.get('/gadget-interactions?type=dorayaki_game');

      const weightedScores = response.data.map(h => {
        const rawScoreMatch = h.content.match(/Puntaje: (\d+)/);
        const diffMatch = h.content.match(/\(([^)]+)\)/);
        const rawScore = rawScoreMatch ? parseInt(rawScoreMatch[1]) : 0;
        const diffLabel = diffMatch ? diffMatch[1].toLowerCase() : 'normal';
        const diffKey = Object.keys(DIFFICULTIES).find(k => k === diffLabel) || 'normal';
        const multiplier = DIFFICULTIES[diffKey].multiplier;
        return { ...h, weightedScore: rawScore * multiplier, rawScore };
      });

      // Filter: Only the BEST result per user
      const userBest = new Map();
      weightedScores.forEach(item => {
        const user = item.user_name.trim().toLowerCase();
        if (!userBest.has(user) || item.weightedScore > userBest.get(user).weightedScore) {
          userBest.set(user, item);
        }
      });

      const sorted = Array.from(userBest.values()).sort((a, b) => b.weightedScore - a.weightedScore);
      setHighScores(sorted.slice(0, 8));
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  useEffect(() => {
    fetchHighScores();
    const handleKeyDown = (e) => { keysPressed.current[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e) => { keysPressed.current[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, [theme]);

  const spawnItem = () => {
    const config = DIFFICULTIES[difficulty];
    const isMouse = Math.random() < config.mouseChance;
    return {
      id: Math.random(),
      x: Math.random() * 90 + 5,
      y: -10,
      type: isMouse ? 'mouse' : 'dorayaki',
      speed: config.itemSpeed + Math.random() * 1.5 + (scoreRef.current / 500)
    };
  };

  const update = (time) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = Math.min(time - lastTimeRef.current, 100);
      const config = DIFFICULTIES[difficulty];

      const moveSpeed = config.playerSpeed * (deltaTime / 10);
      let newX = posRef.current.x;
      let newY = posRef.current.y;

      if (keysPressed.current['a'] || keysPressed.current['arrowleft']) newX -= moveSpeed;
      if (keysPressed.current['d'] || keysPressed.current['arrowright']) newX += moveSpeed;
      if (keysPressed.current['w'] || keysPressed.current['arrowup']) newY -= moveSpeed;
      if (keysPressed.current['s'] || keysPressed.current['arrowdown']) newY += moveSpeed;

      newX = Math.max(5, Math.min(95, newX));
      newY = Math.max(20, Math.min(90, newY));
      posRef.current = { x: newX, y: newY };

      if (playerRef.current) {
        playerRef.current.style.left = `${newX}%`;
        playerRef.current.style.top = `${newY}%`;
      }

      if (time > nextSpawnRef.current) {
        setItems(prev => [...prev, spawnItem()]);
        nextSpawnRef.current = time + Math.max(config.spawnInterval * 0.5, config.spawnInterval - (scoreRef.current * 1.2));
      }

      setItems(prev => {
        const nextItems = [];
        let hitMouse = false;
        let caughtCount = 0;

        for (const item of prev) {
          const itemY = item.y + (item.speed * (deltaTime / 16));
          const dx = Math.abs(item.x - posRef.current.x);
          const dy = Math.abs(itemY - posRef.current.y);

          if (dx < 12 && dy < 10) {
            if (item.type === 'mouse') {
              hitMouse = true;
            } else {
              caughtCount++;
            }
            continue;
          }

          if (itemY < 110) {
            nextItems.push({ ...item, y: itemY });
          }
        }

        if (hitMouse) {
          endGame();
          return [];
        }

        if (caughtCount > 0) {
          scoreRef.current += caughtCount * 10;
          setScore(scoreRef.current);
        }
        return nextItems;
      });
    }

    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(update);
  };

  const startGame = () => {
    scoreRef.current = 0;
    setScore(0);
    setItems([]);
    posRef.current = { x: 50, y: 85 };
    setGameState('playing');
    lastTimeRef.current = undefined;
    nextSpawnRef.current = performance.now() + 500;
    requestRef.current = requestAnimationFrame(update);
  };

  const endGame = async () => {
    setGameState('over');
    cancelAnimationFrame(requestRef.current);
    const finalScore = scoreRef.current;
    const diffLabel = DIFFICULTIES[difficulty].label.split(' ')[0];

    try {
      await api.post('/gadget-interactions', {
        user_name: userName || 'Anónimo',
        gadget_type: 'dorayaki_game',
        content: `Puntaje: ${finalScore} (${diffLabel})`
      });
      fetchHighScores();
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  if (theme !== 'doraemon') return null;

  return (
    <section className="py-24 px-4 bg-slate-900/40 relative overflow-hidden" id="dorayaki-game">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter text-center">
          🥯 Dorayaki Catch
        </h2>
        <p className="text-slate-400 mb-12 text-center">Elige tu reto y atrapa los dorayakis.</p>

        <div className="w-full flex flex-col lg:flex-row gap-12 items-start justify-center">
          <div
            ref={gameRef}
            className="w-full max-w-xl aspect-[3/4] bg-gradient-to-b from-blue-900/40 to-blue-600/20 rounded-[3rem] border-4 border-white/10 relative overflow-hidden shadow-2xl"
          >
            <AnimatePresence>
              {gameState === 'idle' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md p-6">
                  <Trophy className="text-yellow-400 mb-4" size={60} />
                  <h3 className="text-2xl font-black text-white mb-6 uppercase">Dificultad</h3>

                  <div className="grid grid-cols-2 gap-3 mb-8 w-full max-w-xs">
                    {Object.entries(DIFFICULTIES).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => setDifficulty(key)}
                        className={`py-3 px-2 rounded-xl text-xs font-black uppercase transition-all border-2 ${difficulty === key
                          ? `${config.color} border-white text-white scale-105 shadow-lg`
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                          }`}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>

                  <button onClick={startGame} className="bg-blue-600 hover:bg-blue-500 text-white font-black px-12 py-5 rounded-2xl text-2xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95 flex items-center gap-3">
                    <Play fill="currentColor" /> EMPEZAR
                  </button>

                  <p className="mt-8 text-slate-500 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                    <Keyboard size={14} /> Mueve con W, A, S, D
                  </p>
                </motion.div>
              )}

              {gameState === 'over' && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-lg text-center p-8">
                  <AlertCircle className="text-red-500 mb-4" size={64} />
                  <h3 className="text-4xl font-black text-white mb-1 uppercase italic">¡FIN DEL JUEGO!</h3>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-6 px-4 py-1 bg-blue-500/10 rounded-full">
                    Dificultad: {difficulty}
                  </p>

                  <div className="bg-white/10 rounded-3xl p-8 mb-8 border border-white/5 w-full max-w-[200px]">
                    <p className="text-slate-400 uppercase font-black text-[10px] mb-1">Puntaje</p>
                    <p className="text-6xl font-black text-white leading-none">{score}</p>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setGameState('idle')} className="bg-white/10 hover:bg-white/20 text-white font-black px-6 py-4 rounded-2xl text-sm transition-all">
                      MENÚ
                    </button>
                    <button onClick={startGame} className="bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-4 rounded-2xl text-sm transition-all shadow-xl active:scale-95">
                      REINTENTAR
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* In-game HUD */}
            <div className="absolute top-8 left-8 z-30 flex items-center gap-4">
              <div>
                <p className="text-white/40 font-black uppercase tracking-widest text-[10px]">Puntaje</p>
                <p className="text-4xl font-black text-white drop-shadow-lg">{score}</p>
              </div>
              <div className={`px-3 py-1 rounded-full ${DIFFICULTIES[difficulty].color} text-[10px] font-black text-white uppercase shadow-lg`}>
                {difficulty}
              </div>
            </div>

            {items.map(item => (
              <div key={item.id} className="absolute text-4xl" style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translate(-50%, -50%)' }}>
                {item.type === 'dorayaki' ? '🥯' : '🐭'}
              </div>
            ))}

            <div
              ref={playerRef}
              className="absolute transition-none flex flex-col items-center"
              style={{
                left: `${posRef.current.x}%`,
                top: `${posRef.current.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500 rounded-full border-4 border-white relative shadow-2xl">
                <div className="absolute inset-2 bg-white rounded-full translate-y-1">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
                    <div className="w-1.5 h-2.5 bg-slate-900 rounded-full" />
                    <div className="w-1.5 h-2.5 bg-slate-900 rounded-full" />
                  </div>
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full border-2 border-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 flex flex-col gap-6">
            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border-2 border-white/10 p-8 flex flex-col h-[500px]">
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 uppercase italic">
                <Trophy className="text-yellow-400" /> Top Récords
              </h3>
              <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                {highScores.map((h, i) => (
                  <div key={h.id} className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors group">
                    <div className={`text-2xl font-black ${i === 0 ? 'text-yellow-400' : 'text-white/20'}`}>#{i + 1}</div>
                    <div className="flex-1">
                      <p className="text-blue-400 font-bold text-[10px] uppercase tracking-tighter mb-0.5">{h.user_name}</p>
                      <div className="flex justify-between items-end">
                        <p className="text-white font-black text-xl leading-none">{h.content.split(': ')[1].split(' ')[0]}</p>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{h.content.includes('(') ? h.content.split('(')[1].replace(')', '') : ''}</span>
                      </div>
                      <p className="text-slate-500 text-[9px] mt-1 uppercase font-black opacity-50">
                        {new Date(h.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600/10 border-2 border-blue-500/20 rounded-[2rem] p-6 text-xs text-slate-400">
              <p className="flex items-center gap-2 mb-2 font-black text-blue-400 uppercase text-[10px]">
                <Zap size={14} className="text-yellow-400" /> Pro Tip
              </p>
              <p className="leading-relaxed">
                Cada nivel reduce la velocidad de Doraemon y aumenta la de los ratones. ¡Usa **WASD** para esquivar en diagonal!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
