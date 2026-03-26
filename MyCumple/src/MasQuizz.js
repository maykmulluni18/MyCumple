
const mas = [

    // Preguntas sobre películas y arcos largos
    {
        question: "¿Cómo se llama la primera película de Doraemon?",
        options: ["Doraemon: El dinosaurio", "Doraemon: Las mil y una noches", "Doraemon: El mundo perdido", "Doraemon: Viaje al centro de la tierra"],
        correct: 0
    },
    {
        question: "¿Cómo se llama el dinosaurio que cría Nobita?",
        options: ["Pipi", "Pisuke", "Pekk", "Pita"],
        correct: 1
    },
    {
        question: "¿En qué película aparece el perro-gato Hachi?",
        options: ["Doraemon y el mundo perdido", "Doraemon y el reino de las nubes", "Doraemon: El perro-gato", "Doraemon: Nobita y los extraterrestres"],
        correct: 0
    },
    {
        question: "¿Cómo se llama el reino en 'Doraemon: Nobita y el reino de las nubes'?",
        options: ["Reino de las nubes", "Reino celestial", "Paraíso de nubes", "Reino del cielo"],
        correct: 0
    },
    {
        question: "¿Qué animal legendario aparece en 'Doraemon: Nobita y la gran aventura en el mundo de los mitos'?",
        options: ["Un dragón", "Un fénix", "Un unicornio", "Un grifo"],
        correct: 0
    },
    {
        question: "¿En qué película viajan al Lejano Oeste?",
        options: ["Doraemon: Nobita en el Oeste", "Doraemon: Vaqueros espaciales", "Doraemon: Aventura en el Lejano Oeste", "Doraemon: Nobita y la leyenda del Oeste"],
        correct: 3
    },
    {
        question: "¿Cómo se llama la princesa del reino subterráneo en 'Doraemon: Nobita y las aventuras subterráneas'?",
        options: ["Riruru", "Sue", "Mimi", "Luna"],
        correct: 0
    },
    {
        question: "¿En qué película aparece un planeta mecanizado?",
        options: ["Doraemon: Nobita y el planeta de las máquinas", "Doraemon: Robots del futuro", "Doraemon: Imperio mecánico", "Doraemon: La rebelión de los robots"],
        correct: 0
    },
    {
        question: "¿Cuál es la película donde Nobita se convierte en un mago?",
        options: ["Doraemon: Nobita y la leyenda de los magos", "Doraemon: El mundo de la magia", "Doraemon: Nobita y los hechiceros", "Doraemon: La llave mágica"],
        correct: 0
    },
    {
        question: "¿En qué película aparece el personaje 'Riruru'?",
        options: ["Nobita y las aventuras subterráneas", "Nobita y el reino de las nubes", "Nobita y el planeta de las máquinas", "Nobita y el mundo de los mitos"],
        correct: 0
    },
    {
        question: "¿Cómo se llama el país en 'Doraemon: Nobita y la civilización del pájaro'?",
        options: ["Pájaro-landia", "Aviopolis", "Pájaros del paraíso", "Reino de las aves"],
        correct: 0
    },
    {
        question: "¿En qué película Nobita ayuda a un extraterrestre llamado Papi?",
        options: ["Nobita y los extraterrestres", "Nobita y la invasión", "Nobita y el pequeño alien", "Nobita y el amigo del espacio"],
        correct: 0
    },
    {
        question: "¿Qué objeto es clave en 'Doraemon: Nobita y la isla de los animales'?",
        options: ["El arca de Noé", "Un barco volador", "Un libro de animales", "Una máquina del tiempo"],
        correct: 0
    },
    {
        question: "¿En qué película aparece un mago malvado llamado 'Demao'?",
        options: ["Nobita y la leyenda de los magos", "Nobita y el mundo de los mitos", "Nobita y el reino de las nubes", "Nobita y los caballeros del espacio"],
        correct: 0
    },
    {
        question: "¿Cómo se llama el perro que es rey en 'Nobita y la isla de los animales'?",
        options: ["Chippo", "Rock", "King", "Duke"],
        correct: 0
    },
    {
        question: "¿En qué película viajan a la China antigua?",
        options: ["Nobita y la leyenda del dragón", "Nobita en China", "Nobita y el dragón milenario", "Nobita y la muralla mágica"],
        correct: 0
    },
    {
        question: "¿Cuál es la última película donde aparece la voz original de Doraemon (Nobuyo Oyama)?",
        options: ["Nobita y la isla de los animales", "Nobita y el reino de las nubes", "Nobita y la civilización del pájaro", "Nobita y el planeta de las máquinas"],
        correct: 0
    },
    {
        question: "¿En qué película aparece un robot gigante llamado 'Zanda Claus'?",
        options: ["Nobita y el reino de las nubes", "Nobita y el planeta de las máquinas", "Nobita y el gigante de hierro", "Nobita y la rebelión de los robots"],
        correct: 0
    },
    {
        question: "¿Cómo se llama la chica extraterrestre de 'Nobita y los caballeros del espacio'?",
        options: ["Riruru", "Sue", "Miyuki", "Shizuka"],
        correct: 0
    },
    {
        question: "¿En qué película aparece un mundo paralelo donde la magia existe?",
        options: ["Nobita y el mundo de la magia", "Nobita y los hechiceros", "Nobita y la llave mágica", "Nobita y el espejo mágico"],
        correct: 0
    },

    // Preguntas varias y curiosidades
    {
        question: "¿Cuánto pesa Doraemon?",
        options: ["129.3 kg", "100 kg", "150 kg", "80 kg"],
        correct: 0
    },
    {
        question: "¿Cuánto mide Doraemon?",
        options: ["1.293 m", "1.50 m", "1.20 m", "1.80 m"],
        correct: 0
    },
    {
        question: "¿Cuál es el número de Doraemon? (su código de fábrica)",
        options: ["MS-903", "DS-009", "NT-001", "DK-1293"],
        correct: 0
    },
    {
        question: "¿Cuál es la velocidad máxima de Doraemon?",
        options: ["100 km/h", "129.3 km/h", "150 km/h", "80 km/h"],
        correct: 1
    },
    {
        question: "¿Cuál es la potencia de Doraemon?",
        options: ["100 caballos", "129.3 caballos", "150 caballos", "80 caballos"],
        correct: 1
    },
    {
        question: "¿Qué le pasa a Doraemon si se le acaba la batería?",
        options: ["Se apaga", "Se congela", "Pierde la memoria", "Vuelve al futuro"],
        correct: 2
    },
    {
        question: "¿Qué color tienen los ojos de Doraemon cuando está normal?",
        options: ["Negros", "Azules", "Rojos", "Blancos"],
        correct: 0
    },
    {
        question: "¿Qué color tienen los ojos de Doraemon cuando está triste?",
        options: ["Azules", "Rojos", "Verdes", "Amarillos"],
        correct: 0
    },
    {
        question: "¿Qué color tienen los ojos de Doraemon cuando está enojado?",
        options: ["Rojos", "Azules", "Negros", "Blancos"],
        correct: 0
    },
    {
        question: "¿Cuántos dedos tiene Doraemon en cada mano?",
        options: ["4", "5", "3", "6"],
        correct: 0
    },
    {
        question: "¿De qué material está hecho Doraemon?",
        options: ["Acero", "Aleación de titanio", "Cobre", "Hierro"],
        correct: 1
    },
    {
        question: "¿Qué tipo de nariz tiene Doraemon?",
        options: ["Redonda roja", "Negra", "Azul", "De botón"],
        correct: 0
    },
    {
        question: "¿Qué función tiene la nariz de Doraemon?",
        options: ["Detector de olores", "Botón de emergencia", "Sensor de movimiento", "Panel solar"],
        correct: 1
    },
    {
        question: "¿Qué hay dentro del bolsillo de Doraemon?",
        options: ["El espacio cuatridimensional", "Un almacén", "Un agujero negro", "Un universo paralelo"],
        correct: 0
    },
    {
        question: "¿Cómo se llama el programa de televisión favorito de Nobita?",
        options: ["Superhéroes", "Dibujos animados", "Mágico Mako-chan", "Las chicas de la suerte"],
        correct: 2
    },
    {
        question: "¿Qué tipo de comida le encanta a Doraemon?",
        options: ["Dorayaki", "Tempura", "Sushi", "Ramen"],
        correct: 0
    },
    {
        question: "¿Cuál es el miedo de Nobita?",
        options: ["Gian", "Los exámenes", "Su mamá", "Las alturas"],
        correct: 0
    },
    {
        question: "¿Qué le encanta hacer a Shizuka?",
        options: ["Bañarse", "Leer", "Tocar el violín", "Cocinar"],
        correct: 0
    },
    {
        question: "¿Qué hace siempre Suneo cuando algo sale mal?",
        options: ["Llorar", "Echarle la culpa a Nobita", "Correr a su mamá", "Llamar a Gian"],
        correct: 1
    },
    {
        question: "¿Cómo se llama el maestro de Nobita?",
        options: ["Sensei", "Sr. Nakamura", "Sr. Eiga", "Sr. Tsubasa"],
        correct: 1
    },
    {
        question: "¿En qué ciudad vive Nobita?",
        options: ["Tokio", "Osaka", "Nagoya", "Yokohama"],
        correct: 0
    },
    {
        question: "¿Cómo se llama la calle donde vive Nobita?",
        options: ["Calle Shinkawa", "Calle Nerima", "Calle Aoi", "Calle Sakura"],
        correct: 0
    },
    {
        question: "¿Qué deporte practica Gian?",
        options: ["Béisbol", "Fútbol", "Karate", "Sumo"],
        correct: 0
    },
    {
        question: "¿Qué posición juega Gian en el béisbol?",
        options: ["Lanzador", "Bateador", "Jardinero", "Receptor"],
        correct: 0
    },
    {
        question: "¿Cuál es el sueño de Gian?",
        options: ["Ser cantante profesional", "Ser jugador de béisbol", "Ser chef", "Ser actor"],
        correct: 0
    },
    {
        question: "¿Cómo se llama la canción famosa de Gian?",
        options: ["Soy Gian", "El tigre", "Mi camino", "Canción del ogro"],
        correct: 0
    },
    {
        question: "¿Qué colecciona Suneo?",
        options: ["Carros de juguete", "Figuras de acción", "Sellos", "Monedas antiguas"],
        correct: 0
    },
    {
        question: "¿Qué habilidad tiene Nobita que sorprende a todos?",
        options: ["Tirar cuerda", "Disparar", "Dormir rápido", "Pintar"],
        correct: 0
    },
    {
        question: "¿En qué es bueno realmente Nobita?",
        options: ["Tiro con cuerda", "Disparo con pistola", "Origami", "Natación"],
        correct: 1
    },
    {
        question: "¿Qué récord tiene Nobita?",
        options: ["Dormir más rápido", "Sacar cero", "Llorar más seguido", "Llegar tarde"],
        correct: 0
    },
    {
        question: "¿Qué le promete Nobita a Shizuka al final de la serie?",
        options: ["Casarse con ella", "Ser mejor estudiante", "Hacerla feliz", "Viajar con ella"],
        correct: 0
    },
    {
        question: "¿Doraemon regresa al futuro en algún momento?",
        options: ["Sí, en el final original", "No, se queda para siempre", "Solo en las películas", "Nunca"],
        correct: 0
    },
    {
        question: "¿Cómo reacciona Nobita cuando Doraemon se va?",
        options: ["Lucha solo", "Se pone a estudiar", "Llora mucho", "Se muda de ciudad"],
        correct: 0
    },
    {
        question: "¿Qué inventa Nobita de adulto?",
        options: ["Una empresa", "Un robot", "Un libro", "Un viaje espacial"],
        correct: 0
    },
    {
        question: "¿Con quién se casa Nobita de adulto?",
        options: ["Shizuka", "Otra mujer", "No se casa", "Queda soltero"],
        correct: 0
    },
    {
        question: "¿Qué personaje se casa con Suneo?",
        options: ["Una chica rica", "Shizuka", "Una desconocida", "No se casa"],
        correct: 0
    },
    {
        question: "¿Qué personaje se casa con Gian?",
        options: ["Una chica fuerte", "Shizuka", "Una cantante", "No se casa"],
        correct: 0
    },
    {
        question: "¿Cómo se llama el hijo de Nobita?",
        options: ["Nobisuke", "Nobita Jr.", "Sewashi", "Nobihiro"],
        correct: 0
    },
    {
        question: "¿Qué relación tiene Sewashi con Nobita?",
        options: ["Bisnieto", "Nieto", "Hijo", "Sobrino"],
        correct: 0
    },
    {
        question: "¿En qué año nació Doraemon?",
        options: ["2112", "2100", "2150", "2099"],
        correct: 0
    },
    {
        question: "¿En qué fecha se fabricó Doraemon?",
        options: ["3 de septiembre", "1 de enero", "15 de agosto", "7 de marzo"],
        correct: 0
    },
    {
        question: "¿Qué día se celebra el cumpleaños de Doraemon?",
        options: ["3 de septiembre", "1 de enero", "15 de agosto", "7 de marzo"],
        correct: 0
    },
    {
        question: "¿Cuál es el actor de voz original de Doraemon?",
        options: ["Nobuyo Oyama", "Masako Nozawa", "Mayumi Tanaka", "Megumi Hayashibara"],
        correct: 0
    },
    {
        question: "¿Quién reemplazó a Nobuyo Oyama como la voz de Doraemon?",
        options: ["Wasabi Mizuta", "Minami Takayama", "Romi Park", "Junko Takeuchi"],
        correct: 0
    },
    {
        question: "¿Cuántos episodios tiene la serie clásica de Doraemon?",
        options: ["Más de 1700", "500", "1000", "800"],
        correct: 0
    },
    {
        question: "¿Cuántas películas de Doraemon se han estrenado?",
        options: ["Más de 40", "30", "50", "20"],
        correct: 0
    },
    {
        question: "¿Doraemon es considerado un icono cultural en Japón?",
        options: ["Sí", "No", "Solo en los 80", "Solo en los 90"],
        correct: 0
    },
    {
        question: "¿Doraemon fue embajador de Japón?",
        options: ["Sí", "No", "Solo en Tokio", "Nunca"],
        correct: 0
    },
    {
        question: "¿En qué año se emitió el primer episodio de Doraemon?",
        options: ["1979", "1969", "1989", "1999"],
        correct: 0
    },
    {
        question: "¿Quién canta el opening clásico de Doraemon?",
        options: ["Satoko Yamano", "Hironobu Kageyama", "Masato Shimon", "Mitsuko Horie"],
        correct: 0
    },
    {
        question: "¿Qué significa 'Dora' en Doraemon?",
        options: ["Callejero", "Dorayaki", "Regalo", "Gato"],
        correct: 0
    },
    {
        question: "¿Qué significa 'emon' en japonés antiguo?",
        options: ["Guardián", "Amigo", "Señor", "Gato"],
        correct: 0
    },
    {
        question: "¿Cuál es el color de la piel de Doraemon antes de perder las orejas?",
        options: ["Amarillo", "Azul", "Rojo", "Blanco"],
        correct: 0
    },
    {
        question: "¿Qué le regaló Doraemon a Shizuka en el episodio del cumpleaños?",
        options: ["Un vestido", "Un espejo", "Un pañuelo", "Un anillo"],
        correct: 0
    },
    {
        question: "¿Qué quería ser Nobita de pequeño?",
        options: ["Astronauta", "Doctor", "Científico", "Profesor"],
        correct: 0
    },
    {
        question: "¿Qué animal es el más común en los inventos de Doraemon?",
        options: ["Gato", "Ratón", "Perro", "Pájaro"],
        correct: 0
    },
    {
        question: "¿Qué objeto usa Doraemon para limpiarse?",
        options: ["Un paño", "Agua", "Un líquido especial", "Un cepillo"],
        correct: 0
    },
    {
        question: "¿Doraemon puede nadar?",
        options: ["No, se oxida", "Sí", "Solo con flotadores", "Solo en agua dulce"],
        correct: 0
    },
    {
        question: "¿Qué le pasa a Doraemon con el agua?",
        options: ["Se oxida", "Flota", "Se encoge", "Nada bien"],
        correct: 0
    },
    {
        question: "¿Qué tipo de energía usa Doraemon?",
        options: ["Atómica", "Solar", "Nuclear", "Eléctrica"],
        correct: 0
    },
    {
        question: "¿Cuánto dura la batería de Doraemon?",
        options: ["24 horas", "48 horas", "1 semana", "1 mes"],
        correct: 0
    },
    {
        question: "¿Cómo se llama la fábrica donde crearon a Doraemon?",
        options: ["Matsushiba", "Toshida", "Honda", "Sony"],
        correct: 0
    },
    {
        question: "¿Qué le pasó a las orejas de Doraemon?",
        options: ["Se las comió un ratón", "Se las cortaron", "Se las quemaron", "Se las robaron"],
        correct: 0
    },
    {
        question: "¿Por qué Doraemon tiene miedo a los ratones?",
        options: ["Porque le comieron las orejas", "Porque es un gato", "Porque es alérgico", "Por una mala experiencia"],
        correct: 0
    },
    {
        question: "¿Qué come Doraemon cuando está feliz?",
        options: ["Dorayaki", "Dango", "Mochi", "Sushi"],
        correct: 0
    },
    {
        question: "¿Qué come Doraemon cuando está triste?",
        options: ["También dorayaki", "Nada", "Pescado", "Arroz"],
        correct: 0
    },
    {
        question: "¿Quién hace los dorayakis favoritos de Doraemon?",
        options: ["La mamá de Nobita", "Una tienda", "Dorami", "Nobita"],
        correct: 0
    },
    {
        question: "¿Doraemon puede tomar café?",
        options: ["No, es malo para él", "Sí", "Solo descafeinado", "Le da sueño"],
        correct: 0
    },
    {
        question: "¿Qué color es el interior de las orejas de Doraemon?",
        options: ["Rosa", "Azul", "Negro", "Blanco"],
        correct: 0
    },
    {
        question: "¿Qué función tienen las campanas que a veces lleva Doraemon?",
        options: ["Llamada de emergencia", "Adorno", "Comunicador", "Reloj"],
        correct: 0
    },
    {
        question: "¿Cuál es el objeto más usado por Doraemon?",
        options: ["Puerta de todos lados", "Helicóptero bambú", "Máquina del tiempo", "Linterna encogedora"],
        correct: 0
    },
    {
        question: "¿Qué objeto usan para hablar con el futuro?",
        options: ["Teléfono del tiempo", "Radio del futuro", "Comunicador temporal", "Mensajero cósmico"],
        correct: 0
    },
    {
        question: "¿Qué objeto permite tener suerte?",
        options: ["Mano de la suerte", "Amuleto de Doraemon", "Sombrero de la fortuna", "Moneda mágica"],
        correct: 0
    },
    {
        question: "¿Con qué objeto pueden cambiar el tamaño de las cosas?",
        options: ["Linterna de aumento/reducción", "Polvo de cambio", "Crema elástica", "Agua de tamaño"],
        correct: 0
    },
    {
        question: "¿Qué objeto crea copias exactas de personas?",
        options: ["Espejo duplicador", "Clonador", "Cámara de clones", "Fotocopiadora humana"],
        correct: 0
    },
    {
        question: "¿Qué objeto puede congelar el tiempo?",
        options: ["Cronos", "Reloj de parada", "Detenedor", "Alto al tiempo"],
        correct: 1
    },
    {
        question: "¿Qué objeto te permite caminar por las paredes?",
        options: ["Grapas magnéticas", "Zapatos de araña", "Cinturón de gravedad", "Pegamento volador"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite volar como Superman?",
        options: ["Capa voladora", "Traje espacial", "Helicóptero de bambú", "Alas mecánicas"],
        correct: 2
    },
    {
        question: "¿Qué objeto te permite hacerte invisible?",
        options: ["Manto de invisibilidad", "Capa fantasma", "Sábana mágica", "Paño transparente"],
        correct: 0
    },
    {
        question: "¿Qué objeto es un teléfono que te lleva a donde quieras?",
        options: ["Teléfono mágico", "Puerta de todos lados", "Taxi espacial", "Llamada dimensional"],
        correct: 1
    },
    {
        question: "¿Qué objeto es un arma que adormece?",
        options: ["Pistola del sueño", "Dormilón 3000", "Cañón de siesta", "Rayo somnífero"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite cambiar de voz?",
        options: ["Modulador", "Cambiavoces", "Micrófono de imitación", "Vocalizador"],
        correct: 2
    },
    {
        question: "¿Qué objeto te permite hablar con los animales?",
        options: ["Traductor animal", "Collar de comunicación", "Galleta del idioma", "Sombrero de mascotas"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite hacer cualquier trabajo?",
        options: ["Robot universal", "Asistente mágico", "Androide de servicio", "Ayudante personal"],
        correct: 0
    },
    {
        question: "¿Qué objeto es una máquina que hace realidad los sueños?",
        options: ["Realizador de sueños", "Creador de ilusiones", "Generador de fantasías", "Máquina de los sueños"],
        correct: 3
    },
    {
        question: "¿Qué objeto te permite viajar al pasado?",
        options: ["Máquina del tiempo", "Cápsula temporal", "Reloj viajero", "Puerta del tiempo"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite ver el futuro?",
        options: ["Televisor del futuro", "Espejo adivino", "Cristal de predicción", "Bola de cristal"],
        correct: 0
    },
    {
        question: "¿Qué objeto es una pistola que te hace decir la verdad?",
        options: ["Pistola de la verdad", "Suerómetro", "Detector de mentiras", "Confesionador"],
        correct: 0
    },
    {
        question: "¿Qué objeto es un libro que predice el futuro?",
        options: ["Libro del destino", "Enciclopedia futura", "Periódico de mañana", "Almanaque temporal"],
        correct: 2
    },
    {
        question: "¿Qué objeto te permite volar en el espacio?",
        options: ["Traje espacial", "Cohete personal", "Nave espacial", "Cápsula voladora"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite hacerte pequeño?",
        options: ["Linterna encogedora", "Polvo de reducción", "Cápsula mini", "Rayo miniaturizador"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite hacerte gigante?",
        options: ["Linterna de aumento", "Polvo de crecimiento", "Cápsula maxi", "Rayo agrandador"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite respirar bajo el agua?",
        options: ["Respiradero submarino", "Pulmón artificial", "Aletas mágicas", "Traje acuático"],
        correct: 0
    },
    {
        question: "¿Qué objeto es un lápiz que dibuja cosas reales?",
        options: ["Lápiz mágico", "Pincel de realidad", "Rotulador viviente", "Dibujo animado"],
        correct: 0
    },
    {
        question: "¿Qué objeto es una alfombra voladora?",
        options: ["Alfombra mágica", "Tapete volador", "Alfombra alada", "Doraemon no tiene alfombra voladora"],
        correct: 3
    },
    {
        question: "¿Qué objeto es un control remoto que controla todo?",
        options: ["Mando universal", "Control de la realidad", "Remoto mágico", "Poder total"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite cambiar de cuerpo?",
        options: ["Intercambiador de cuerpos", "Pistola de cambios", "Crema de intercambio", "Sombrero de trueque"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite leer mentes?",
        options: ["Sombrero lector", "Diadema mental", "Casco telepático", "Antena psíquica"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite convertirte en superhéroe?",
        options: ["Traje de héroe", "Capa de fuerza", "Máscara de poder", "Cinturón de valentía"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite tener dinero infinito?",
        options: ["Billetera sin fondo", "Tarjeta de crédito infinita", "Generador de monedas", "Máquina de dinero"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite tener cualquier cosa que quieras?",
        options: ["Caja de deseos", "Teléfono de deseos", "Realizador de sueños", "Generador de objetos"],
        correct: 1
    },
    {
        question: "¿Qué objeto te permite hacer trampa en los exámenes?",
        options: ["Pan de memoria", "Lápiz copión", "Goma de borrar", "Libro de respuestas"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite ver los sueños de otros?",
        options: ["Visor de sueños", "Pantalla onírica", "Antena de sueños", "Cascos de ensueño"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite convertirte en animal?",
        options: ["Galleta de transformación", "Crema animal", "Traje de animal", "Máscara zoomorfa"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite viajar al centro de la tierra?",
        options: ["Taladro subterráneo", "Máquina perforadora", "Túnel de tierra", "Cápsula terrestre"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite viajar a otros planetas?",
        options: ["Nave espacial", "Cohete dimensional", "Puerta estelar", "Transportador planetario"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite hacerte invisible?",
        options: ["Capa invisible", "Manto de invisibilidad", "Paño mágico", "Tela fantasma"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite flotar?",
        options: ["Flotador mágico", "Gorro de gravedad", "Cinturón levitador", "Zapatos flotantes"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite hablar con extraterrestres?",
        options: ["Traductor universal", "Comunicador galáctico", "Idioma alienígena", "Radio espacial"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite tener cualquier profesión?",
        options: ["Sombrero profesional", "Traje de trabajo", "Carnet mágico", "Diploma instantáneo"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite crear islas?",
        options: ["Creador de islas", "Generador de tierra", "Máquina de geografía", "Constructor de mundos"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite controlar el clima?",
        options: ["Máquina del clima", "Control meteorológico", "Nube artificial", "Paraguas climático"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite hacer películas reales?",
        options: ["Cámara de realidad", "Filmadora de sueños", "Realizador de películas", "Cine en casa"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite ser invisible para los demás?",
        options: ["Capa invisible", "Manto de invisibilidad", "Paño mágico", "Tela fantasma"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite viajar a través de espejos?",
        options: ["Espejo dimensional", "Portal espejo", "Mundo espejo", "Pasaje reflejado"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite cambiar de sexo?",
        options: ["Pistola de cambio", "Crema de género", "Sombrero de transformación", "Agua de metamorfosis"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite hacerte mayor o menor?",
        options: ["Linterna de edad", "Cápsula del tiempo", "Polvo de años", "Agua de juventud"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite tener supervelocidad?",
        options: ["Zapatos de velocidad", "Cinturón de carrera", "Botas supersónicas", "Acelerador corporal"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite tener superfuerza?",
        options: ["Guantes de fuerza", "Cinturón de poder", "Traje de músculo", "Píldora de fuerza"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite tener visión de rayos X?",
        options: ["Gafas de rayos X", "Visor especial", "Lentes de penetración", "Ojos de águila"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite ser un genio?",
        options: ["Sombrero de inteligencia", "Diadema de sabiduría", "Casco de conocimiento", "Gafas de genio"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite ser artista?",
        options: ["Pincel mágico", "Lápiz de dibujo", "Rotulador creativo", "Caja de talento"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite ser músico?",
        options: ["Instrumento mágico", "Guitarra de ensueño", "Violín virtuoso", "Bastón de batuta"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite ser chef?",
        options: ["Cuchillo mágico", "Delantal de cocina", "Libro de recetas", "Utensilio divino"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite ser deportista?",
        options: ["Zapatos de deporte", "Camiseta de campeón", "Balón mágico", "Equipo profesional"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite ser detective?",
        options: ["Lupa mágica", "Sombrero de detective", "Carnet de investigación", "Kit de pistas"],
        correct: 0
    },
    {
        question: "¿Qué objeto te permite ser astronauta?",
        options: ["Traje espacial", "Casco galáctico", "Nave personal", "Botas lunares"],
        correct: 0
    }
]