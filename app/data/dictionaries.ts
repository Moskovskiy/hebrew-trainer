import hebrew from './hebrew';
import german from './german';
import chinese from './chinese';
import spanish from './spanish';
import arabic from './arabic';

const dictionaries = {
  hebrew,
  german,
  chinese,
  spanish,
  arabic,
};

export type Language = keyof typeof dictionaries;

export default dictionaries;
