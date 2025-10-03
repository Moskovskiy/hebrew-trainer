export interface HebrewLetter {
  letter: string;
  name: string;
  sounds: string[];
  isFinal?: boolean;
  baseLetter?: string;
}

export const hebrewLetters: HebrewLetter[] = [
  { letter: 'א', name: 'Alef', sounds: ['Silent', 'Ah'] },
  { letter: 'ב', name: 'Bet', sounds: ['B'] },
  { letter: 'ג', name: 'Gimel', sounds: ['G'] },
  { letter: 'ד', name: 'Dalet', sounds: ['D'] },
  { letter: 'ה', name: 'He', sounds: ['H'] },
  { letter: 'ו', name: 'Vav', sounds: ['V', 'O', 'U'] },
  { letter: 'ז', name: 'Zayin', sounds: ['Z'] },
  { letter: 'ח', name: 'Chet', sounds: ['Kh (like Bach)'] },
  { letter: 'ט', name: 'Tet', sounds: ['T (Tet)'] },
  { letter: 'י', name: 'Yod', sounds: ['Y', 'I'] },
  { letter: 'כ', name: 'Kaf', sounds: ['Kh (Kaf)'] },
  { letter: 'ך', name: 'Final Kaf', sounds: ['Kh (final)'], isFinal: true, baseLetter: 'כ' },
  { letter: 'ל', name: 'Lamed', sounds: ['L'] },
  { letter: 'מ', name: 'Mem', sounds: ['M'] },
  { letter: 'ם', name: 'Final Mem', sounds: ['M (final)'], isFinal: true, baseLetter: 'מ' },
  { letter: 'נ', name: 'Nun', sounds: ['N'] },
  { letter: 'ן', name: 'Final Nun', sounds: ['N (final)'], isFinal: true, baseLetter: 'נ' },
  { letter: 'ס', name: 'Samekh', sounds: ['S (Samekh)'] },
  { letter: 'ע', name: 'Ayin', sounds: ['Ah (deep)', 'Silent throat'] },
  { letter: 'פ', name: 'Pe', sounds: ['P'] },
  { letter: 'ף', name: 'Final Pe', sounds: ['F (final)'], isFinal: true, baseLetter: 'פ' },
  { letter: 'צ', name: 'Tsadi', sounds: ['Ts'] },
  { letter: 'ץ', name: 'Final Tsadi', sounds: ['Ts (final)'], isFinal: true, baseLetter: 'צ' },
  { letter: 'ק', name: 'Qof', sounds: ['K (deep)'] },
  { letter: 'ר', name: 'Resh', sounds: ['R'] },
  { letter: 'שׁ', name: 'Shin', sounds: ['Sh'] },
  { letter: 'שׂ', name: 'Sin', sounds: ['S (Sin)'] },
  { letter: 'ת', name: 'Tav', sounds: ['T (Tav)'] },
];

export const formatSounds = (sounds: string[]) => sounds.join(' · ');

export const getDisplayLetters = (letter: HebrewLetter): [string, string, string] => {
  if (letter.isFinal && letter.baseLetter) {
    return [letter.baseLetter, letter.baseLetter, letter.letter];
  }

  return [letter.letter, letter.letter, letter.letter];
};
