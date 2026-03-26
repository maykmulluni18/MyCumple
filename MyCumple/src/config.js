
import doraemon1 from "./assets/Doraemon_1.jpg";
import doraemon2 from "./assets/Doraemon_2.jpg";
import doraemon3 from "./assets/Doraemon_3.jpg";
import QuizzDoraemon from "./QuizzDoraemon";

export const config = {
  // Configuración de Temas
  themes: {
    original: {
      primary: "#8b5cf6",
      secondary: "#ec4899",
      heroTitle: "¡Feliz Cumpleaños!",
      heroSubtitle: "Un día especial merece una celebración espectacular.",
      quiz: [
        {
          question: "¿Cuál es la comida favorita de la cumpleañera?",
          options: ["Pizza", "Sushi", "Tacos", "Hamburguesa"],
          correct: 1
        },
        {
          question: "¿Si pudiera tener un superpoder, cuál sería?",
          options: ["Volar", "Leer mentes", "Teletransportación", "Invisibilidad"],
          correct: 2
        },
        {
          question: "¿A dónde le gustaría viajar?",
          options: ["Japón", "París", "Las Bahamas", "Nueva York"],
          correct: 0
        }
      ],
      scratchImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=1480&auto=format&fit=crop",
      musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    doraemon: {
      primary: "#00A1E9",
      secondary: "#ED1C24",
      heroTitle: "¡Feliz Cumpleaños a lo Doraemon, Maykol!",
      heroSubtitle: "¡Con la hélice o la puerta mágica, este día será galáctico!",
      quiz: QuizzDoraemon,
      scratchImage: "https://images.squarespace-cdn.com/content/v1/5e1f06b677a2d46e27a69796/1586548540846-E9J2K1W1Z2X2V6C6V6C6/Doraemon.jpg?format=1500w",
      musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    }
  },

  // Datos fijos (Independientes del tema)
  name: "Serena",
  birthDate: "2026-04-06T00:00:00",
  birthDateForAge: "2000-04-06T14:30:00",

  timeline: [
    {
      year: "2000",
      title: "El comienzo de la aventura",
      description: "Nace una estrella que iluminará el mundo con su alegría.",
      icon: "Baby",
    },
    {
      year: "2023",
      title: "Graduación",
      description: "Un gran paso hacia el futuro y nuevas metas.",
      icon: "School",
    },
    {
      year: "Hoy",
      title: "Un nuevo capítulo",
      description: "Celebrando la vida y todo lo bueno que vendrá.",
      icon: "Gift",
    }
  ],

  carouselImages: [
    doraemon1,
    doraemon2,
    doraemon3,
  ],

  yapeQr: "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
};
