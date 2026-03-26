// preguntas.js
// Más de 200 preguntas sobre Doraemon

const QuizzDoraemon = [
  // Preguntas sobre Doraemon (Personajes)
  {
    question: "¿Cuál es el nombre completo de Nobita?",
    options: ["Nobita Nobi", "Nobita Tamako", "Nobita Suneo", "Nobita Takeshi"],
    correct: 0
  },
  {
    question: "¿De qué siglo viene Doraemon?",
    options: ["Siglo XX", "Siglo XXI", "Siglo XXII", "Siglo XXIII"],
    correct: 2
  },
  {
    question: "¿Cuál es el color original de Doraemon antes de perder las orejas?",
    options: ["Rojo", "Azul", "Amarillo", "Verde"],
    correct: 2
  },
  {
    question: "¿Qué le royeron las orejas a Doraemon?",
    options: ["Un perro", "Un gato", "Un ratón robótico", "Suneo"],
    correct: 2
  },
  {
    question: "¿Cómo se llama la hermana de Doraemon?",
    options: ["Dorami", "Dorako", "Dorarina", "Dora-chan"],
    correct: 0
  },
  {
    question: "¿Qué color es Dorami?",
    options: ["Azul", "Rojo", "Amarillo", "Rosa"],
    correct: 2
  },
  {
    question: "¿Cuál es el mayor miedo de Doraemon?",
    options: ["Las alturas", "Los ratones", "Los truenos", "Gian"],
    correct: 1
  },
  {
    question: "¿Cómo se llama el creador de Doraemon?",
    options: ["Hayao Miyazaki", "Akira Toriyama", "Fujiko F. Fujio", "Rumiko Takahashi"],
    correct: 2
  },
  {
    question: "¿Qué significa 'Doraemon' en japonés?",
    options: ["Gato callejero", "Gato de metal", "Gato guardián", "Gato dorado"],
    correct: 0
  },
  {
    question: "¿Qué tipo de robot es Doraemon?",
    options: ["Robot doméstico", "Robot de combate", "Robot gato", "Robot de rescate"],
    correct: 2
  },
  {
    question: "¿Quién envía a Doraemon al pasado para ayudar a Nobita?",
    options: ["Sewashi", "Dorami", "El gobierno del futuro", "La mamá de Nobita"],
    correct: 0
  },
  {
    question: "¿Cómo se llama la mamá de Nobita?",
    options: ["Tamako", "Shizuka", "Mamako", "Nobiko"],
    correct: 0
  },
  {
    question: "¿Cómo se llama el papá de Nobita?",
    options: ["Nobisuke", "Takeshi", "Suneo", "Hideo"],
    correct: 0
  },
  {
    question: "¿Qué apodo le dan a Takeshi Goda?",
    options: ["Suneo", "Gian", "Nobita", "Sensei"],
    correct: 1
  },
  {
    question: "¿Qué quiere ser Gian de mayor?",
    options: ["Doctor", "Cantante", "Piloto", "Científico"],
    correct: 1
  },
  {
    question: "¿Cómo se llama la mamá de Gian?",
    options: ["Michiko", "Tamako", "Sachiko", "Yoshiko"],
    correct: 0
  },
  {
    question: "¿Qué negocio tiene la familia de Suneo?",
    options: ["Una tienda de juguetes", "Una empresa de autos", "Una cadena de restaurantes", "Un banco"],
    correct: 0
  },
  {
    question: "¿Cómo se llama el perro de Nobita?",
    options: ["Hachi", "Peko", "Ichi", "Muku"],
    correct: 0
  },
  {
    question: "¿Cómo se llama el gato de Shizuka?",
    options: ["Peke", "Mii-chan", "Tama", "Kuro"],
    correct: 1
  },
  {
    question: "¿Qué instrumento toca Suneo?",
    options: ["Guitarra", "Piano", "Violín", "Flauta"],
    correct: 2
  },
  {
    question: "¿Qué color es el sombrero de Gian?",
    options: ["Rojo", "Azul", "Amarillo", "Verde"],
    correct: 2
  },
  {
    question: "¿Cuál es el sueño de Shizuka?",
    options: ["Ser cantante", "Ser maestra", "Casarse con Nobita", "Ser bailarina"],
    correct: 1
  },
  {
    question: "¿Qué personaje es extremadamente presumido y rico?",
    options: ["Nobita", "Gian", "Suneo", "Dekisugi"],
    correct: 2
  },
  {
    question: "¿Cómo se llama el amigo inteligente y rival de Nobita por Shizuka?",
    options: ["Dekisugi", "Suneo", "Gian", "Sensei"],
    correct: 0
  },
  {
    question: "¿Qué le regala Nobita a Shizuka en su cumpleaños casi siempre?",
    options: ["Flores", "Un anillo", "Un pastel", "Un libro"],
    correct: 0
  },
  {
    question: "¿Qué comida odia Nobita?",
    options: ["Pimientos", "Zanahorias", "Cebolla", "Brócoli"],
    correct: 0
  },
  {
    question: "¿Qué materia se le da peor a Nobita?",
    options: ["Matemáticas", "Ciencias", "Historia", "Educación Física"],
    correct: 0
  },
  {
    question: "¿Cuál es el récord de Nobita en los exámenes?",
    options: ["0 puntos", "10 puntos", "25 puntos", "100 puntos"],
    correct: 0
  },
  {
    question: "¿Qué hace siempre Nobita cuando llega a casa?",
    options: ["Estudiar", "Dormir", "Llorar", "Comer"],
    correct: 1
  },
  {
    question: "¿Quién suele defender a Nobita de Gian?",
    options: ["Shizuka", "Suneo", "Doraemon", "Dekisugi"],
    correct: 2
  },

  // Preguntas sobre objetos y gadgets de Doraemon
  {
    question: "¿Cómo se llama el bolsillo mágico de Doraemon?",
    options: ["Bolso mágico", "Cuatro dimensiones", "Mochila espacial", "Petaca dimensional"],
    correct: 1
  },
  {
    question: "¿Qué puerta permite viajar a cualquier lugar?",
    options: ["Puerta Mágica", "Puerta Dimensional", "Puerta de Todos lados", "Puerta Secreta"],
    correct: 2
  },
  {
    question: "¿Qué objeto permite volar?",
    options: ["Helicóptero de bambú", "Alas de metal", "Sombrero volador", "Capa invisible"],
    correct: 0
  },
  {
    question: "¿Cómo se llama el objeto que hace realidad cualquier deseo?",
    options: ["Libro de los sueños", "Teléfono de deseos", "Micrófono mágico", "Caja de sueños"],
    correct: 1
  },
  {
    question: "¿Qué objeto es un mini tanque que dispara luz para encoger cosas?",
    options: ["Linterna encogedora", "Cañón reductor", "Rayo miniaturizador", "Pistola de encogimiento"],
    correct: 0
  },
  {
    question: "¿Con qué objeto se puede ver el futuro?",
    options: ["Televisor del futuro", "Espejo adivino", "Libro del porvenir", "Cristal mágico"],
    correct: 0
  },
  {
    question: "¿Qué galleta transforma en animal a quien la come?",
    options: ["Galletas de transformación", "Pastel animal", "Biscocho mutante", "Dulce zoomórfico"],
    correct: 0
  },
  {
    question: "¿Cómo se llama el pan que te hace recordar todo lo que estudias?",
    options: ["Pan de memoria", "Pan de estudio", "Pan de copiar", "Pan de repaso"],
    correct: 0
  },
  {
    question: "¿Qué objeto permite detener el tiempo?",
    options: ["Reloj de parada", "Cronómetro temporal", "Detenedor de tiempo", "Freno cósmico"],
    correct: 0
  },
  {
    question: "¿Qué objeto permite hacer clones de uno mismo?",
    options: ["Crema de duplicación", "Espejo duplicador", "Polvo de clones", "Agua gemela"],
    correct: 0
  },
  {
    question: "¿Con qué objeto se puede viajar al pasado?",
    options: ["Máquina del tiempo", "Cápsula temporal", "Reloj viajero", "Puerta del tiempo"],
    correct: 0
  },
  {
    question: "¿Cómo se llama el sombrero que permite volar?",
    options: ["Sombrero volador", "Turbina de cabeza", "Hélice bambú", "Ala-sombrero"],
    correct: 2
  },
  {
    question: "¿Qué objeto te hace invisible?",
    options: ["Capa invisible", "Manto de invisibilidad", "Tela de ocultación", "Paño mágico"],
    correct: 0
  },
  {
    question: "¿Qué objeto permite cambiar de voz?",
    options: ["Micrófono de imitación", "Grabadora de voces", "Cambiavoces", "Modulador"],
    correct: 0
  },
  {
    question: "¿Con qué objeto se pueden hacer películas de verdad?",
    options: ["Cámara de realidad", "Filmadora de sueños", "Realizador de películas", "Cine en casa"],
    correct: 0
  },
  {
    question: "¿Cómo se llama el arma que adormece a las personas?",
    options: ["Pistola del sueño", "Dormilón", "Somnifusor", "Cañón de dormir"],
    correct: 0
  },
  {
    question: "¿Qué objeto permite hacer dibujos que cobran vida?",
    options: ["Pincel mágico", "Lápiz viviente", "Rotulador animador", "Pintura real"],
    correct: 0
  },
  {
    question: "¿Qué objeto es una puerta que te lleva al espacio?",
    options: ["Puerta estelar", "Portal galáctico", "Puerta de los planetas", "Puerta espacial"],
    correct: 0
  },
  {
    question: "¿Cómo se llama la alfombra voladora de Doraemon?",
    options: ["Alfombra mágica", "Tapete volador", "Alfombra alada", "No tiene alfombra, usa el helicóptero"],
    correct: 3
  },
  {
    question: "¿Qué objeto permite ver los sueños de otros?",
    options: ["Visor de sueños", "Pantalla onírica", "Antena de sueños", "Cascos de ensueño"],
    correct: 0
  },
  {
    question: "¿Qué objeto es un pequeño robot que limpia todo?",
    options: ["Limpia-botas", "Aspirador cósmico", "Robot de limpieza", "Trapero mecánico"],
    correct: 0
  },
  {
    question: "¿Cómo se llama la máquina que hace tareas por ti?",
    options: ["Robot doméstico", "Hacedor de tareas", "Asistente personal", "Androide ayudante"],
    correct: 0
  },
  {
    question: "¿Qué objeto permite cambiar el clima?",
    options: ["Paraguas climático", "Máquina del tiempo atmosférico", "Control meteorológico", "Nube artificial"],
    correct: 0
  },
  {
    question: "¿Qué galleta te hace pequeño?",
    options: ["Galleta de reducción", "Kaki pequeño", "Bizcocho mini", "Dulce encogedor"],
    correct: 1
  },
  {
    question: "¿Qué galleta te hace grande?",
    options: ["Galleta de aumento", "Kaki grande", "Bizcocho maxi", "Dulce agrandador"],
    correct: 1
  }
];

// Si estás en Node.js, puedes exportarlo
export default QuizzDoraemon;
// Si estás en el navegador, estará disponible globalmente