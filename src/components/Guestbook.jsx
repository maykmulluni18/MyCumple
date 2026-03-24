import React, { useState, useEffect } from 'react';
import { Send, User, MessageCircle } from 'lucide-react';

export default function Guestbook({ theme = 'original', isKonjacActive = false }) {
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

  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('birthday_messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse messages', e);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString()
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('birthday_messages', JSON.stringify(updated));
    
    setName('');
    setContent('');
  };

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto relative overflow-hidden" id="guestbook">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase italic">
          {kt("Déjame un mensaje")}
        </h2>
        <div className="h-1.5 w-24 bg-primary-500 mx-auto rounded-full mb-6" />
        <p className="text-slate-400 font-medium max-w-2xl mx-auto">
          {kt("Tus palabras hacen que este día sea aún más especial.")}
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Form: Default Glass Style */}
        <div className="lg:col-span-2 relative group">
          <div className="glass-card p-8 rounded-3xl relative z-10 border border-white/10 bg-white/5 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                <Send size={18} />
                {kt("Enviar Mensaje")}
              </button>
            </form>
          </div>
        </div>

        {/* Message List: Default Glass Style */}
        <div className="lg:col-span-3">
          <div className="flex flex-col gap-6 max-h-[650px] overflow-y-auto pr-4 custom-scrollbar">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white/5 border-2 border-dashed border-white/10 rounded-3xl">
                <MessageCircle size={48} className="text-slate-700 mb-4 opacity-20" />
                <p className="text-slate-500 font-bold italic">{kt("Aún no hay mensajes. ¡Sé el primero en escribir!")}</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="glass-card p-8 border border-white/10 text-white rounded-2xl relative transition-all hover:-translate-y-1">
                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-500/20 text-primary-400">
                        <User size={16} />
                      </div>
                      <h4 className="font-black uppercase tracking-tighter text-lg text-primary-300">
                        {msg.name}
                      </h4>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-white/5 text-slate-500">
                      {msg.date}
                    </span>
                  </div>
                  
                  <p className="relative z-10 text-lg leading-relaxed font-medium italic text-slate-200">
                    "{msg.content}"
                  </p>
                  
                  {theme === 'doraemon' && (
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 rotate-12 transition-opacity">
                      <img src="/imagenes/dorayaki.png" className="w-full h-full object-contain opacity-80" alt="" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
