import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Brain, Trophy } from 'lucide-react';
import { config } from '../config';
import api from '../api';

export default function MiniQuiz({ theme = 'original', onComplete, userName }) {
  const [currentStep, setCurrentStep] = useState(0); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [history, setHistory] = useState([]);

  // Use theme-specific quiz from config
  const quizData = config.themes[theme].quiz;

  const fetchHistory = async () => {
    try {
      const response = await api.get('/gadget-interactions?type=quiz');
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching quiz history:', error);
    }
  };

  useEffect(() => {
    // Reset if theme changes while playing
    setCurrentStep(0);
    setCurrentQuestion(0);
    setScore(0);
    setFeedback(null);
    setSelectedAnswer(null);
    fetchHistory();
  }, [theme]);

  const handleAnswer = (index) => {
    if (feedback) return;
    setSelectedAnswer(index);

    const isCorrect = index === quizData[currentQuestion].correct;
    const newScore = isCorrect ? score + 1 : score;
    
    if (isCorrect) {
      setScore(newScore);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(async () => {
      setFeedback(null);
      setSelectedAnswer(null);
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentStep(2);
        
        // Log score to database
        try {
          await api.post('/gadget-interactions', {
            user_name: userName || 'Anónimo',
            gadget_type: 'quiz',
            content: `Puntaje: ${newScore}/${quizData.length}`
          });
          fetchHistory();
        } catch (error) {
          console.error('Error saving quiz score:', error);
        }

        if (onComplete) onComplete(newScore);
      }
    }, 1500);
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto flex flex-col lg:flex-row gap-12" id="quiz">
      <div className="flex-1 glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden h-fit">
        {/* Decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="start"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="text-primary-400" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  {theme === 'doraemon' ? '¿Qué tanto sabes de Doraemon?' : '¿Qué tanto me conoces?'}
                </h2>
                <p className="text-slate-400 mb-8">
                  Supera este reto para demostrar tu amistad. ¡Cuidado con fallar!
                </p>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg"
                >
                  ¡Aceptar Reto!
                </button>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-primary-300 font-bold uppercase tracking-widest text-sm">
                    Pregunta {currentQuestion + 1} de {quizData.length}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-8">
                  {quizData[currentQuestion].question}
                </h3>

                <div className="grid gap-4">
                  {quizData[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={!!feedback}
                      className={`w-full text-left p-5 rounded-2xl border transition-all flex justify-between items-center ${
                        feedback && idx === quizData[currentQuestion].correct
                          ? 'bg-green-500/20 border-green-500 text-green-100'
                          : feedback === 'wrong' && idx === selectedAnswer
                          ? 'bg-red-500/20 border-red-500 text-red-100'
                          : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {option}
                      {feedback && idx === quizData[currentQuestion].correct && <CheckCircle2 size={20} />}
                      {feedback === 'wrong' && idx === selectedAnswer && <XCircle size={20} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <h2 className="text-4xl font-extrabold text-white mb-4">
                   Puntaje: {score}/{quizData.length}
                </h2>
                <p className="text-xl text-slate-300 mb-8 px-4">
                  {score === quizData.length 
                     ? (theme === 'doraemon' ? "¡Eres un experto del siglo XXII! 🔥" : "¡Eres un experto/a! Tienes acceso VIP ilimitado. 🔥")
                     : "¡Buen intento! Sigue celebrando con nosotros. 🎉"}
                </p>
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setCurrentQuestion(0);
                    setScore(0);
                  }}
                  className="text-primary-400 underline font-semibold hover:text-white transition-colors"
                >
                  Intentar de nuevo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Score History / Leaderboard */}
      <div className="w-full lg:w-80 bg-white/5 backdrop-blur-md rounded-[2.5rem] border-2 border-white/10 p-6 flex flex-col h-[500px]">
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
           <Trophy className="text-yellow-400" size={24} /> Ranking de Amigos
        </h3>
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar text-left">
          {history.length > 0 ? history.slice(0, 15).map((item, idx) => (
            <div key={item.id} className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-4 relative overflow-hidden group">
              <div className="text-lg font-black text-white/20 w-6">#{idx + 1}</div>
              <div className="flex-1">
                <p className="text-primary-400 font-bold text-xs uppercase tracking-tighter mb-0.5">
                  {item.user_name}
                </p>
                <p className="text-white font-black text-lg leading-none">{item.content.split(': ')[1]}</p>
              </div>
              {item.content.includes(quizData.length.toString() + '/' + quizData.length.toString()) && (
                <div className="absolute -right-2 -bottom-2 opacity-10 group-hover:opacity-30 transition-opacity rotate-12">
                   <Trophy size={60} className="text-yellow-400" />
                </div>
              )}
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center h-full opacity-30">
               <Brain size={48} className="mb-4" />
               <p className="text-center italic">Aún no hay puntajes...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
