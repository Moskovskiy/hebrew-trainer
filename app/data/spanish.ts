import generateSentences from './generator';

const words = [
  'yo', 'tú', 'él', 'ella', 'nosotros', 'vosotros', 'ir', 'querer', 'comer', 'beber',
  'trabajar', 'niño', 'perro', 'gato', 'casa', 'escuela', 'apartamento', 'mesa', 'silla',
  'mar', 'sol', 'rápido', 'lento', 'bonito', 'grande', 'pequeño', 'nuevo', 'viejo', 'día',
  'noche', 'mañana', 'tarde', 'semana', 'mes', 'año', 'rojo', 'azul', 'verde',
  'colorido', 'cielo', 'tierra', 'fiesta', 'diversión', 'amigos', 'familia', 'viaje', 'música',
  'estudiar', 'escribir', 'leer', 'comer', 'beber', 'correr', 'hablar', 'pasear', 'entrenar',
  'preguntas', 'respuestas', 'manzana', 'pan', 'café', 'té', 'leche', 'agua', 'viajar',
  'parado', 'sentado', 'encender', 'apagar', 'reír', 'llorar', 'escuchar', 'recordar', 'olvidar',
  'pintar', 'construir', 'soñar', 'pensar', 'pelota', 'boda', 'estudios', 'vacaciones',
  'hombre', 'mujer', 'niños', 'trabajo', 'regalo', 'historia', 'juego', 'imagen',
  'tienda', 'parque', 'jardín', 'lugar', 'flor', 'árbol', 'cuaderno', 'lápiz',
  'bolígrafo', 'papel', 'computadora', 'teléfono'
];

const prepositions = [
  'en', 'desde', 'con', 'sin', 'debajo', 'encima', 'cerca', 'entre', 'alrededor', 'a través'
];

const sentences = generateSentences(words, ' ', prepositions);

export default sentences;
