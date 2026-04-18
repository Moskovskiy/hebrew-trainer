export interface CopticEntry {
  symbol: string;
  sounds: string[];
}

export const copticPracticePrompts = [
  'ⲁ ⲃ ⲅ ⲇ ⲉ ⲍ ⲏ ⲑ',
  'ⲓ ⲕ ⲗ ⲙ ⲛ ⲝ ⲟ ⲡ',
  'ⲣ ⲥ ⲧ ⲩ ⲫ ⲭ ⲯ ⲱ',
  'ϣ ϥ ϧ ϩ ϫ ϭ ϯ',
  'ⲁ ⲅ ⲉ ⲓ ⲟ ⲱ ϣ ϯ',
  'ⲃ ⲇ ⲍ ⲕ ⲗ ⲙ ⲛ ⲣ',
  'ⲥ ⲧ ⲩ ⲫ ⲭ ⲯ ϧ ϩ',
  'ϫ ϭ ϥ ϣ ⲁ ⲉ ⲏ ⲟ',
] as const;

export const copticLetters: CopticEntry[] = [
  { symbol: 'ⲁ', sounds: ['Alfa'] },
  { symbol: 'ⲃ', sounds: ['Vida'] },
  { symbol: 'ⲅ', sounds: ['Gamma'] },
  { symbol: 'ⲇ', sounds: ['Dalda'] },
  { symbol: 'ⲉ', sounds: ['Eie'] },
  { symbol: 'ⲍ', sounds: ['Zata'] },
  { symbol: 'ⲏ', sounds: ['Hate'] },
  { symbol: 'ⲑ', sounds: ['Thethe'] },
  { symbol: 'ⲓ', sounds: ['Iau'] },
  { symbol: 'ⲕ', sounds: ['Kapa'] },
  { symbol: 'ⲗ', sounds: ['Laula'] },
  { symbol: 'ⲙ', sounds: ['Mi'] },
  { symbol: 'ⲛ', sounds: ['Ni'] },
  { symbol: 'ⲝ', sounds: ['Ksi'] },
  { symbol: 'ⲟ', sounds: ['O'] },
  { symbol: 'ⲡ', sounds: ['Pi'] },
  { symbol: 'ⲣ', sounds: ['Ro'] },
  { symbol: 'ⲥ', sounds: ['Sima'] },
  { symbol: 'ⲧ', sounds: ['Tau'] },
  { symbol: 'ⲩ', sounds: ['Ua'] },
  { symbol: 'ⲫ', sounds: ['Fi'] },
  { symbol: 'ⲭ', sounds: ['Khi'] },
  { symbol: 'ⲯ', sounds: ['Psi'] },
  { symbol: 'ⲱ', sounds: ['Oou'] },
  { symbol: 'ϣ', sounds: ['Shei'] },
  { symbol: 'ϥ', sounds: ['Fei'] },
  { symbol: 'ϧ', sounds: ['Khei'] },
  { symbol: 'ϩ', sounds: ['Hori'] },
  { symbol: 'ϫ', sounds: ['Gangia'] },
  { symbol: 'ϭ', sounds: ['Shima'] },
  { symbol: 'ϯ', sounds: ['Dei'] },
];
