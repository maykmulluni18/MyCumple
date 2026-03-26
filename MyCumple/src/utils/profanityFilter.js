const BAD_WORDS = [
  // Generales y muy comunes
  'mierda', 'puta', 'puto', 'pendejo', 'pendeja', 'carajo', 'culiao', 'weon', 'gonorrea',
  'malparido', 'zorra', 'idiota', 'estupido', 'estupida', 'cabron', 'cabrona', 'hdp',
  'verga', 'pene', 'vagina', 'culo', 'tetas', 'chupa', 'mamada', 'cojer', 'follar',
  'paja', 'pajero', 'perra', 'perro', 'basta', 'marico', 'maricon', 'putita', 'zorrita',

  // Variaciones regionales (México, Colombia, Argentina, Chile, Perú, etc.)
  'chingar', 'chingada', 'pinche', 'culero', 'ojete', 'wey', 'boludo', 'pelotudo',
  'concha', 'conchadesumadre', 'chuchetumare', 'wevada', 'huevada', 'pichula',
  'pico', 'gil', 'gilipollas', 'capullo', 'cerote', 'chimba', 'pirobo', 'carechimba'
];

/**
 * Normaliza el texto para detectar variaciones comunes
 * @param {string} text 
 */
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[0-9]/g, (match) => { // Sustitución básica de números
      const map = { '4': 'a', '3': 'e', '1': 'i', '0': 'o', '5': 's', '7': 't' };
      return map[match] || match;
    })
    .replace(/[^a-z\s]/g, ''); // Quitar símbolos (p.uta -> puta)
};

/**
 * Verifica si un texto contiene palabras ofensivas
 * @param {string} text 
 * @returns {boolean} true si se detecta profanidad
 */
export const checkProfanity = (text) => {
  if (!text) return false;

  const normalized = normalizeText(text);
  const words = normalized.split(/\s+/);

  return words.some(word =>
    BAD_WORDS.some(bad => word === bad || normalized.includes(bad))
  );
};
