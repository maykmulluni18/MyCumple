import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Timer, Search } from 'lucide-react';
import api from '../api';
import gadgetsData from '../assets/dataDoraemon.json';

export default function GadgetPocket({ theme = 'original', userName }) {
  const [history, setHistory] = useState([]);
  const [currentGadget, setCurrentGadget] = useState(null);

  if (theme !== 'doraemon') return null;

  const fetchHistory = async () => {
    try {
      const response = await api.get('/gadget-interactions?type=magic_pocket');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching magic pocket history:', error);
    }
  };

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const coreGadgetsMap = {
    "Gorrocóptero": {
      desc: "¡Para volar por los aires!",
      icon: <Sparkles className="text-yellow-400" />
    },
    "Luz Más (Rayo Aumentador)": {
      desc: "¡Haz todo gigante!",
      icon: <Zap className="text-orange-500" />
    },
    "Cámara de Cambio de Ropa": {
      desc: "¡Nueva ropa al instante!",
      icon: <Search className="text-blue-500" />
    },
    "Máquina del Tiempo": {
      desc: "¡Para viajar en el tiempo!",
      icon: <Timer className="text-purple-500" />
    },
    "Mantel Gourmet": {
      desc: "¡Toda la comida que quieras!",
      icon: <Sparkles className="text-orange-400" />
    },
    "Pan del Recuerdo": {
      desc: "¡Prepárate para el examen!",
      icon: <Zap className="text-yellow-600" />
    },
    "Capa de Invisibilidad": {
      desc: "¡Nadie te verá!",
      icon: <Sparkles className="text-slate-400" />
    },
    "Luz Menos (Rayo Reductor)": {
      desc: "¡Todo cabe en tu bolsillo!",
      icon: <Search className="text-pink-500" />
    }
  };

  const randomIcons = [
    <Sparkles className="text-blue-400" />,
    <Zap className="text-yellow-400" />,
    <Timer className="text-purple-400" />,
    <Search className="text-green-400" />,
    <Sparkles className="text-pink-400" />,
    <Zap className="text-orange-400" />
  ];

  const allGadgets = useMemo(() => {
    return gadgetsData.map(g => {
      const core = coreGadgetsMap[g.title];
      return {
        id: g.id,
        name: g.title,
        desc: core ? core.desc : "¡Un invento asombroso del siglo XXII!",
        icon: core ? core.icon : randomIcons[g.id % randomIcons.length],
        image: g.image
      };
    });
  }, []);

  const spawnGadget = async () => {
    const random = allGadgets[Math.floor(Math.random() * allGadgets.length)];
    setCurrentGadget(random);

    try {
      await api.post('/gadget-interactions', {
        user_name: userName || 'Anónimo',
        gadget_type: 'magic_pocket',
        content: random.name
      });
      fetchHistory(); // Refresh history
    } catch (error) {
      console.error('Error saving gadget interaction:', error);
    }

    setTimeout(() => setCurrentGadget(null), 3000);
  };

  return (
    <section className="py-10 px-4 bg-slate-950/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tighter">Bolsillo 4D 🎒</h2>
          <p className="text-slate-400 mb-12">¡Explora los inventos mágicos!</p>

          <div className="relative group" onClick={spawnGadget}>
            {/* Pocket Shape */}
            <div className="w-64 h-32 bg-white rounded-b-full border-4 border-slate-200 shadow-2xl relative overflow-hidden flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
              <div className="absolute top-0 w-full h-2 bg-slate-300" />
              <span className="text-slate-200 font-black text-6xl opacity-20 group-hover:opacity-40 transition-opacity">4D</span>
            </div>

            {/* Floating Gadget Result */}
            <AnimatePresence>
              {currentGadget && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -150 }}
                  exit={{ opacity: 0, scale: 0.5, y: -200 }}
                  className="absolute z-50 left-1/2 -translate-x-1/2 w-48 bg-white p-6 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.4)] border-2 border-slate-900 rotate-3"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 mb-4 bg-slate-950 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-slate-800">
                      {currentGadget.image ? (
                        <img src={`/${currentGadget.image}`} alt={currentGadget.name} className="w-full h-full object-contain p-2" />
                      ) : (
                        <div className="scale-150">{currentGadget.icon}</div>
                      )}
                    </div>
                    <h3 className="text-slate-950 font-black mb-1 text-sm">{currentGadget.name}</h3>
                    <p className="text-slate-500 text-[10px] leading-tight">{currentGadget.desc}</p>
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-full h-full bg-slate-200 -z-10 rounded-2xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="mt-8 text-slate-500 font-bold uppercase tracking-widest text-[10px] animate-bounce">
            Toca el bolsillo para sacar un invento
          </p>
        </div>

        {/* Global History Section */}
        <div className="w-full md:w-80 bg-white/5 backdrop-blur-md rounded-[2.5rem] border-2 border-white/10 p-6 flex flex-col h-[400px]">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            🔦 Hallazgos en el Bolsillo
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {history.length > 0 ? history.map((item) => (
              <div key={item.id} className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-xl shrink-0">
                  {item.content.includes('Bambú') || item.content.includes('Gorrocóptero') ? '🎋' :
                    item.content.includes('Máquina') ? '⏳' :
                      item.content.includes('Cámara') ? '📸' :
                        item.content.includes('Mantel') ? '🍖' :
                          item.content.includes('Pan') ? '🍞' :
                            item.content.includes('Capa') ? '🧣' :
                              item.content.includes('Luz') ? '🔦' :
                                item.content.includes('Gominolas') ? '🍬' : '✨'}
                </div>
                <div>
                  <p className="text-slate-200 font-black text-sm uppercase leading-none mb-1">
                    {item.content}
                  </p>
                  <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                    Por: {item.user_name}
                  </p>
                  <p className="text-slate-500 text-[9px] mt-1 uppercase font-black opacity-50">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            )) : (
              <p className="text-slate-500 text-center italic mt-10">¡Saca algo del bolsillo!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
