import React, { useState } from 'react';
import { Send, User, MessageCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

export default function Guestbook({ theme = 'original', isKonjacActive = false, userName }) {
  const kt = (text) => {
    if (!isKonjacActive) return text;
    const translations = {
      "Déjame un mensaje": "¡Buzón de Sugerencias Mágicas! 📬",
      "Tus palabras hacen que este día sea aún más especial.": "¡Tus mensajes me alegran más que un dorayaki!",
      "Tu Nombre": "Identidad del Siglo XXII",
      "Mensaje": "Transmisión Galáctica",
      "Enviar Mensaje": "Teletransportar Mensaje",
      "Aún no hay mensajes. ¡Sé el primero en escribir!": "¡Bolsillo vacío! Sé el primero en dejar un invento de palabras."
    };
    return translations[text] || `${text}-mon`;
  };

  const [name, setName] = useState(userName || '');
  const [content, setContent] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setIsLoading(true);
    try {
      await api.post('/gadget-interactions', {
        user_name: name.trim(),
        gadget_type: 'guestbook',
        content: content.trim()
      });
      
      setIsSent(true);
      setName(userName || '');
      setContent('');
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error('Error saving message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto relative overflow-hidden" id="guestbook">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase italic">
          {kt("Déjame un mensaje")}
        </h2>
        <div className="h-1.5 w-24 bg-primary-500 mx-auto rounded-full mb-6" />
        <p className="text-slate-400 font-medium max-w-2xl mx-auto">
          {kt("Tus palabras hacen que este día sea aún más especial.")}
        </p>
      </div>

      <div className="max-w-2xl mx-auto relative group">
        <div className="glass-card p-8 rounded-3xl relative z-10 border border-white/10 bg-white/5 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center text-center gap-4"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-2">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">¡Mensaje Enviado!</h3>
                  <p className="text-slate-400">
                    Tu mensaje ha sido guardado de forma privada en el Bolsillo 4D. ¡Gracias por tus palabras!
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="mt-4 text-primary-400 font-bold hover:text-white transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
                      <User size={16} className="text-primary-400" /> {kt("Tu Nombre")}
                    </label>
                    <input
                      type="text"
                      placeholder="Tu nombre aquí"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-semibold mb-2 flex items-center gap-2">
                      <MessageCircle size={16} className="text-primary-400" /> {kt("Mensaje")}
                    </label>
                    <textarea
                      rows="5"
                      placeholder="Escribe algo especial..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-all resize-none"
                      required
                      disabled={isLoading}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        {kt("Enviar Mensaje")}
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
