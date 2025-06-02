import hebrew from './hebrew';
import german from './german';
import chinese from './chinese';
import spanish from './spanish';
import arabic from './arabic';
import english from './english';
import hindi from './hindi';
import telugu from './telugu';
import russian from './russian';
import japanese from './japanese';

const dictionaries = {
  hebrew,
  german,
  chinese,
  spanish,
  arabic,
  english,
  hindi,
  telugu,
  russian,
  japanese,
};

export type Language = keyof typeof dictionaries;

export default dictionaries;
