import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Brain } from 'lucide-react';
import { config } from '../config';

export default function MiniQuiz({ theme = 'original', onComplete }) {
  const [currentStep, setCurrentStep] = useState(0); 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // Use theme-specific quiz from config
  const quizData = config.themes[theme].quiz;

  useEffect(() => {
    // Reset if theme changes while playing
    setCurrentStep(0);
    setCurrentQuestion(0);
    setScore(0);
    setFeedback(null);
    setSelectedAnswer(null);
  }, [theme]);

  const handleAnswer = (index) => {
    if (feedback) return;
    setSelectedAnswer(index);

    if (index === quizData[currentQuestion].correct) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentStep(2);
        if (onComplete) onComplete(score + (index === quizData[currentQuestion].correct ? 1 : 0));
      }
    }, 1500);
  };

  return (
    <section className="py-20 px-4 max-w-2xl mx-auto" id="quiz">
      <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden">
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
                  onClick={() => setCurrentStep(0)}
                  className="text-primary-400 underline font-semibold hover:text-white transition-colors"
                >
                  Intentar de nuevo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
