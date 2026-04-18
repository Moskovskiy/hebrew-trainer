export interface JavaneseEntry {
  symbol: string;
  sounds: string[];
}

export const javanesePracticePrompts = [
  'ꦄ ꦆ ꦈ ꦌ ꦎ',
  'ꦏ ꦒ ꦔ ꦕ ꦗ ꦚ',
  'ꦠ ꦢ ꦤ ꦥ ꦧ ꦩ',
  'ꦪ ꦫ ꦭ ꦮ ꦱ ꦲ',
  'ꦄ ꦉ ꦊ ꦌ ꦎ',
  'ꦏ ꦠ ꦥ ꦩ ꦫ ꦭ',
  'ꦒ ꦔ ꦗ ꦚ ꦢ ꦤ',
  'ꦧ ꦩ ꦪ ꦫ ꦮ ꦱ',
  'ꦲ ꦱ ꦮ ꦭ ꦫ ꦪ',
  'ꦏ ꦒ ꦕ ꦗ ꦠ ꦢ ꦥ ꦧ',
] as const;

export const javaneseLetters: JavaneseEntry[] = [
  { symbol: 'ꦄ', sounds: ['A'] },
  { symbol: 'ꦆ', sounds: ['I'] },
  { symbol: 'ꦈ', sounds: ['U'] },
  { symbol: 'ꦌ', sounds: ['E'] },
  { symbol: 'ꦎ', sounds: ['O'] },
  { symbol: 'ꦉ', sounds: ['Re'] },
  { symbol: 'ꦊ', sounds: ['Le'] },
  { symbol: 'ꦏ', sounds: ['Ka'] },
  { symbol: 'ꦒ', sounds: ['Ga'] },
  { symbol: 'ꦔ', sounds: ['Nga'] },
  { symbol: 'ꦕ', sounds: ['Ca'] },
  { symbol: 'ꦗ', sounds: ['Ja'] },
  { symbol: 'ꦚ', sounds: ['Nya'] },
  { symbol: 'ꦠ', sounds: ['Ta'] },
  { symbol: 'ꦢ', sounds: ['Da'] },
  { symbol: 'ꦤ', sounds: ['Na'] },
  { symbol: 'ꦥ', sounds: ['Pa'] },
  { symbol: 'ꦧ', sounds: ['Ba'] },
  { symbol: 'ꦩ', sounds: ['Ma'] },
  { symbol: 'ꦪ', sounds: ['Ya'] },
  { symbol: 'ꦫ', sounds: ['Ra'] },
  { symbol: 'ꦭ', sounds: ['La'] },
  { symbol: 'ꦮ', sounds: ['Wa'] },
  { symbol: 'ꦱ', sounds: ['Sa'] },
  { symbol: 'ꦲ', sounds: ['Ha'] },
  { symbol: 'ꦛ', sounds: ['Tha'] },
  { symbol: 'ꦝ', sounds: ['Dha'] },
];
