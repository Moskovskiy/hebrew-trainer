export interface MaldivianEntry {
  symbol: string;
  sounds: string[];
}

export const maldivianPracticePrompts = [
  'ހަ ހި ހު ހެ ހޮ',
  'ކަ ކި ކު ކެ ކޮ',
  'މަ މި މު މެ މޮ',
  'ނަ ނި ނު ނެ ނޮ',
  'ބަ ބި ބު ބެ ބޮ',
  'ފަ ފި ފު ފެ ފޮ',
  'ރަ ރި ރު ރެ ރޮ',
  'ސަ ސި ސު ސެ ސޮ',
  'ދިވެހި',
  'މާލެ',
] as const;

export const maldivianLetters: MaldivianEntry[] = [
  { symbol: 'ހ', sounds: ['H'] },
  { symbol: 'ށ', sounds: ['Sh'] },
  { symbol: 'ނ', sounds: ['N'] },
  { symbol: 'ރ', sounds: ['R'] },
  { symbol: 'ބ', sounds: ['B'] },
  { symbol: 'ޅ', sounds: ['Lh'] },
  { symbol: 'ކ', sounds: ['K'] },
  { symbol: 'އ', sounds: ['Alif'] },
  { symbol: 'ވ', sounds: ['V'] },
  { symbol: 'މ', sounds: ['M'] },
  { symbol: 'ފ', sounds: ['F'] },
  { symbol: 'ދ', sounds: ['Dh'] },
  { symbol: 'ތ', sounds: ['Th'] },
  { symbol: 'ލ', sounds: ['L'] },
  { symbol: 'ގ', sounds: ['G'] },
  { symbol: 'ޏ', sounds: ['Gn'] },
  { symbol: 'ސ', sounds: ['S'] },
  { symbol: 'ޑ', sounds: ['Dd'] },
  { symbol: 'ޒ', sounds: ['Z'] },
  { symbol: 'ޓ', sounds: ['Tt'] },
  { symbol: 'ޔ', sounds: ['Y'] },
  { symbol: 'ޕ', sounds: ['P'] },
  { symbol: 'ޖ', sounds: ['J'] },
  { symbol: 'ޗ', sounds: ['Ch'] },
  { symbol: 'ޤ', sounds: ['Q'] },
  { symbol: 'ޥ', sounds: ['W'] },
];
