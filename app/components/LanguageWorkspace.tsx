'use client';

import { type ReactNode, useEffect, useState } from 'react';

import TrainerTabs, { tabsByLanguage, type StudyLanguage, type TabValue } from './TrainerTabs';
import HebrewKeyboardLayout from './HebrewKeyboardLayout';
import KoreanKeyboardLayout from './KoreanKeyboardLayout';
import {
  VirtualKeyboardContext,
  VIRTUAL_BACKSPACE_KEY,
  useVirtualKeyboard,
} from './VirtualKeyboardContext';

type Keycap = string | { main: string; sub?: string };
type SidebarStat = { label: string; value: string | number };

const usTopLegendRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'];
const usHomeLegendRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
const usBottomLegendRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'];
const usNumberLegendRow = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];
const defaultNumberRow: Keycap[] = usNumberLegendRow.map(key => ({ main: '', sub: key }));

const keyboardLegendOverrides: Partial<Record<string, string[][]>> = {
  el: [usHomeLegendRow.slice(1), usHomeLegendRow.slice(0, 9), usBottomLegendRow.slice(0, 7)],
};

const defaultLetterLegendRows = [usTopLegendRow, usHomeLegendRow, usBottomLegendRow];

function KeyboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.8]">
      <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
      <path d="M7 10h.01M10 10h.01M13 10h.01M16 10h.01M7 13h.01M10 13h.01M13 13h4" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.8]">
      <path d="M5 10.5v3h3l4 3.5v-10L8 10.5H5Z" />
      <path d="M16 9.5a4 4 0 0 1 0 5" />
      <path d="M18.5 7a7.5 7.5 0 0 1 0 10" />
    </svg>
  );
}

function WordsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.8]">
      <rect x="4" y="5" width="16" height="14" rx="2.5" />
      <path d="M8 9.5h8M8 12.5h8M8 15.5h5" />
    </svg>
  );
}

function BrandMark() {
  const glyphs = ['ა', 'あ', 'ع', '가'];

  return (
    <div className="grid h-9 w-9 grid-cols-2 overflow-hidden border border-zinc-950">
      {glyphs.map((glyph, index) => {
        const isDark = index === 0 || index === 3;

        return (
          <div
            key={glyph}
            className={`flex items-center justify-center text-[0.7rem] font-medium leading-none ${
              isDark ? 'bg-zinc-950 text-white' : 'bg-transparent text-zinc-950'
            } ${index < 2 ? 'border-b' : ''} ${index % 2 === 0 ? 'border-r' : ''} border-zinc-950`}
          >
            {glyph}
          </div>
        );
      })}
    </div>
  );
}

function PracticeModeSwitch({
  activeLanguage,
  activeTab,
  activeTabs,
  onTabChange,
}: {
  activeLanguage: StudyLanguage;
  activeTab: TabValue;
  activeTabs: { value: TabValue; label: string; description: string }[];
  onTabChange: (value: TabValue) => void;
}) {
  const tabIcons: Record<TabValue, ReactNode> = {
    typing: <KeyboardIcon />,
    letters: <SoundIcon />,
    words: <WordsIcon />,
  };
  const tabText: Record<TabValue, string> = {
    typing: 'Speed test',
    letters: 'Guess letter',
    words: 'Words',
  };

  return (
    <nav
      className="flex items-center justify-center gap-1"
      role="tablist"
      aria-label={`${activeLanguage} trainer exercises`}
    >
      {activeTabs.map(tab => {
        const isActive = tab.value === activeTab;

        return (
          <button
            key={tab.value}
            type="button"
            className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${
              isActive
                ? 'bg-zinc-950 text-white'
                : 'bg-transparent text-zinc-500 hover:text-zinc-950'
            }`}
            onClick={() => onTabChange(tab.value)}
            aria-selected={isActive}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            id={`trainer-tab-${activeLanguage}-${tab.value}`}
            aria-controls={`trainer-tabpanel-${activeLanguage}-${tab.value}`}
            title={tab.label}
          >
            {tabIcons[tab.value]}
            <span>{tabText[tab.value]}</span>
          </button>
        );
      })}
    </nav>
  );
}

const devanagariReferenceRows: Keycap[][] = [
  [
    { main: 'अ', sub: 'a' },
    { main: 'आ', sub: 'aa' },
    { main: 'इ', sub: 'i' },
    { main: 'उ', sub: 'u' },
    { main: 'ए', sub: 'e' },
    { main: 'ओ', sub: 'o' },
  ],
  [
    { main: 'क', sub: 'ka' },
    { main: 'ख', sub: 'kha' },
    { main: 'ग', sub: 'ga' },
    { main: 'च', sub: 'cha' },
    { main: 'ज', sub: 'ja' },
    { main: 'ट', sub: 'tta' },
    { main: 'त', sub: 'ta' },
  ],
  [
    { main: 'द', sub: 'da' },
    { main: 'प', sub: 'pa' },
    { main: 'ब', sub: 'ba' },
    { main: 'म', sub: 'ma' },
    { main: 'य', sub: 'ya' },
    { main: 'श', sub: 'sha' },
    { main: 'ह', sub: 'ha' },
  ],
];

const hiraganaKeyboardRows: Keycap[][] = [
  ['た', 'て', 'い', 'す', 'か', 'ん', 'な', 'に', 'ら', 'せ'],
  ['ち', 'と', 'し', 'は', 'き', 'く', 'ま', 'の', 'り'],
  ['つ', 'さ', 'そ', 'ひ', 'こ', 'み', 'も'],
];

const katakanaKeyboardRows: Keycap[][] = [
  ['タ', 'テ', 'イ', 'ス', 'カ', 'ン', 'ナ', 'ニ', 'ラ', 'セ'],
  ['チ', 'ト', 'シ', 'ハ', 'キ', 'ク', 'マ', 'ノ', 'リ'],
  ['ツ', 'サ', 'ソ', 'ヒ', 'コ', 'ミ', 'モ'],
];

const cherokeeKeyboardRows: Keycap[][] = [
  [
    'Ꭺ',
    'Ꮃ',
    'Ꭱ',
    'Ꮫ',
    'Ꮤ',
    'Ꮿ',
    'Ꭴ',
    'Ꭲ',
    'Ꭳ',
    'Ꮑ',
    'Ꮥ',
    'Ꮆ',
    'Ꮹ',
  ],
  [
    'Ꭰ',
    'Ꮝ',
    'Ꮧ',
    'Ꭹ',
    'Ꭶ',
    'Ꭿ',
    'Ꮪ',
    'Ꮈ',
    'Ꮅ',
    'Ꮸ',
  ],
  [
    'Ꭼ',
    'Ᏼ',
    'Ꮣ',
    'Ꭵ',
    'Ꭸ',
    'Ꮎ',
    'Ꮕ',
    'Ꮒ',
  ],
];

const osageKeyboardRows: Keycap[][] = [
  ['𐒾', '𐓏', '𐒷', '𐓊', '𐓍', '𐓓', '𐓎', '𐒻', '𐓂', '𐓄', '𐓅', '𐒱', '𐒲'],
  ['𐒰', '𐓆', '𐓈', '𐓉', '𐒼', '𐒹', '𐒽', '𐒿', '𐓋', '𐓌'],
  ['𐓒', '𐓐', '𐒵', '𐓇', '𐒴', '𐓁', '𐓀', '𐓑', '𐓃'],
  ['𐒸', '𐒶', '𐒺', '𐒳'],
];

const copticKeyboardRows: Keycap[][] = [
  ['ⲁ', 'ⲃ', 'ⲅ', 'ⲇ', 'ⲉ', 'ⲍ', 'ⲏ', 'ⲑ'],
  ['ⲓ', 'ⲕ', 'ⲗ', 'ⲙ', 'ⲛ', 'ⲝ', 'ⲟ', 'ⲡ'],
  ['ⲣ', 'ⲥ', 'ⲧ', 'ⲩ', 'ⲫ', 'ⲭ', 'ⲯ', 'ⲱ'],
  ['ϣ', 'ϥ', 'ϧ', 'ϩ', 'ϫ', 'ϭ', 'ϯ'],
];

const qaniujaaqpaitNumberRow: Keycap[] = [
  { main: '', sub: '`' },
  { main: 'ᖕ', sub: '1' },
  { main: 'ᑉ', sub: '2' },
  { main: 'ᕐ', sub: '3' },
  { main: 'ᒃ', sub: '4' },
  { main: 'ᑦ', sub: '5' },
  { main: 'ᖅ', sub: '6' },
  { main: 'ᒻ', sub: '7' },
  { main: 'ᓐ', sub: '8' },
  { main: 'ᓪ', sub: '9' },
  { main: 'ᔾ', sub: '0' },
  { main: '', sub: '-' },
  { main: 'ᒡ', sub: '=' },
];

const qaniujaaqpaitKeyboardRows: Keycap[][] = [
  [
    { main: 'ᖏ', sub: 'q' },
    { main: 'ᐃ', sub: 'w' },
    { main: 'ᕿ', sub: 'e' },
    { main: 'ᑭ', sub: 'r' },
    { main: 'ᑎ', sub: 't' },
    { main: 'ᓯ', sub: 'y' },
    { main: 'ᒥ', sub: 'u' },
    { main: 'ᓂ', sub: 'i' },
    { main: 'ᓕ', sub: 'o' },
    { main: 'ᔨ', sub: 'p' },
  ],
  [
    { main: 'ᖑ', sub: 'a' },
    { main: 'ᐅ', sub: 's' },
    { main: 'ᖁ', sub: 'd' },
    { main: 'ᑯ', sub: 'f' },
    { main: 'ᑐ', sub: 'g' },
    { main: 'ᓱ', sub: 'h' },
    { main: 'ᒧ', sub: 'j' },
    { main: 'ᓄ', sub: 'k' },
    { main: 'ᓗ', sub: 'l' },
  ],
  [
    { main: 'ᖓ', sub: 'z' },
    { main: 'ᐊ', sub: 'x' },
    { main: 'ᖃ', sub: 'c' },
    { main: 'ᑲ', sub: 'v' },
    { main: 'ᑕ', sub: 'b' },
    { main: 'ᓴ', sub: 'n' },
    { main: 'ᒪ', sub: 'm' },
    { main: 'ᔭ', sub: '/' },
  ],
];

const javaneseKeyboardRows: Keycap[][] = [
  [
    { main: 'ꦄꦼ', sub: 'q' },
    { main: 'ꦮ', sub: 'w' },
    { main: 'ꦌ', sub: 'e' },
    { main: 'ꦫ', sub: 'r' },
    { main: 'ꦠ', sub: 't' },
    { main: 'ꦪ', sub: 'y' },
    { main: 'ꦈ', sub: 'u' },
    { main: 'ꦆ', sub: 'i' },
    { main: 'ꦎ', sub: 'o' },
    { main: 'ꦥ', sub: 'p' },
  ],
  [
    { main: 'ꦄ', sub: 'a' },
    { main: 'ꦱ', sub: 's' },
    { main: 'ꦢ', sub: 'd' },
    { main: 'ꦉ', sub: 'f' },
    { main: 'ꦒ', sub: 'g' },
    { main: 'ꦲ', sub: 'h' },
    { main: 'ꦗ', sub: 'j' },
    { main: 'ꦏ', sub: 'k' },
    { main: 'ꦭ', sub: 'l' },
    { main: 'ꦛ', sub: ';' },
    { main: 'ꦝ', sub: "'" },
  ],
  [
    { main: 'ꦚ', sub: 'z' },
    { main: 'ꦔ', sub: 'x' },
    { main: 'ꦕ', sub: 'c' },
    { main: 'ꦊ', sub: 'v' },
    { main: 'ꦧ', sub: 'b' },
    { main: 'ꦤ', sub: 'n' },
    { main: 'ꦩ', sub: 'm' },
    { main: '꧈', sub: ',' },
    { main: '꧉', sub: '.' },
    { main: '꧀', sub: '/' },
  ],
];

const maldivianKeyboardRows: Keycap[][] = [
  ['ް', 'އ', 'ެ', 'ރ', 'ތ', 'ޔ', 'ު', 'ި', 'ޮ', 'ޕ'],
  ['ަ', 'ސ', 'ދ', 'ފ', 'ގ', 'ހ', 'ޖ', 'ކ', 'ލ'],
  ['ޒ', 'ޗ', 'ވ', 'ބ', 'ނ', 'މ'],
];

const armenianNumberRow: Keycap[] = [
  { main: '', sub: '`' },
  { main: '', sub: '1' },
  { main: 'ձ', sub: '2' },
  { main: 'յ', sub: '3' },
  { main: '', sub: '4' },
  { main: '', sub: '5' },
  { main: '', sub: '6' },
  { main: '', sub: '7' },
  { main: '', sub: '8' },
  { main: '', sub: '9' },
  { main: 'օ', sub: '0' },
  { main: 'ռ', sub: '[' },
  { main: 'ժ', sub: '/' },
];

const armenianKeyboardRows: Keycap[][] = [
  ['խ', 'ւ', 'է', 'ր', 'տ', 'ե', 'ը', 'ի', 'ո', 'պ', 'չ', 'ջ'],
  ['ա', 'ս', 'դ', 'ֆ', 'ք', 'հ', 'ճ', 'կ', 'լ', 'թ', 'փ'],
  ['զ', 'ց', 'գ', 'վ', 'բ', 'ն', 'մ', 'շ', 'ղ', 'ծ'],
];

const georgianKeyboardRows: Keycap[][] = [
  ['ღ', 'ჯ', 'უ', 'კ', 'ე', 'ნ', 'გ', 'შ', 'წ', 'ზ', 'ხ', 'ც'],
  ['ფ', 'ძ', 'ვ', 'თ', 'ა', 'პ', 'რ', 'ო', 'ლ', 'დ', 'ჟ'],
  ['ჭ', 'ჩ', 'ყ', 'ს', 'მ', 'ი', 'ტ', 'ქ', 'ბ', 'ჰ'],
];

const englishKeyboardRows: Keycap[][] = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const languageOptions: {
  value: StudyLanguage;
  label: string;
  flag: string;
  referenceContent: ReactNode | null;
}[] = [
  {
    value: 'english',
    label: 'English',
    flag: '🇺🇸',
    referenceContent: (
      <KeyboardReferenceCard direction="ltr" lang="en" rows={englishKeyboardRows} />
    ),
  },
  {
    value: 'arabic',
    label: 'Arabic',
    flag: '🇸🇦',
    referenceContent: (
      <KeyboardReferenceCard
        direction="rtl"
        lang="ar"
        rows={[
          ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'],
          ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك'],
          ['ئ', 'ء', 'ؤ', 'ر', 'ى', 'ة', 'و', 'ز', 'ظ', 'ط'],
        ]}
      />
    ),
  },
  {
    value: 'chinese',
    label: 'Chinese',
    flag: '🇨🇳',
    referenceContent: null,
  },
  {
    value: 'hiragana',
    label: 'Hiragana',
    flag: '🇯🇵',
    referenceContent: (
      <KeyboardReferenceCard direction="ltr" lang="ja" rows={hiraganaKeyboardRows} />
    ),
  },
  {
    value: 'katakana',
    label: 'Katakana',
    flag: '🎌',
    referenceContent: (
      <KeyboardReferenceCard direction="ltr" lang="ja" rows={katakanaKeyboardRows} />
    ),
  },
  {
    value: 'korean',
    label: 'Korean',
    flag: '🇰🇷',
    referenceContent: <KoreanKeyboardLayout />,
  },
  {
    value: 'russian',
    label: 'Russian',
    flag: '🇷🇺',
    referenceContent: (
      <KeyboardReferenceCard
        direction="ltr"
        lang="ru"
        rows={[
          ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
          ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
          ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'],
        ]}
      />
    ),
  },
  {
    value: 'ethiopian',
    label: 'Ethiopian',
    flag: '🇪🇹',
    referenceContent: (
      <KeyboardReferenceCard
        direction="ltr"
        lang="am"
        rows={[
          [
            { main: 'ሀ', sub: 'h' },
            { main: 'ለ', sub: 'l' },
            { main: 'መ', sub: 'm' },
            { main: 'ረ', sub: 'r' },
            { main: 'ሰ', sub: 's' },
            { main: 'በ', sub: 'b' },
            { main: 'ተ', sub: 't' },
          ],
          [
            { main: 'ነ', sub: 'n' },
            { main: 'ከ', sub: 'k' },
            { main: 'ወ', sub: 'w' },
            { main: 'ዘ', sub: 'z' },
            { main: 'የ', sub: 'y' },
            { main: 'ደ', sub: 'd' },
            { main: 'ገ', sub: 'g' },
          ],
          [
            { main: 'ቀ', sub: 'q' },
            { main: 'ቸ', sub: 'c' },
            { main: 'ጀ', sub: 'j' },
            { main: 'ጸ', sub: 'x' },
            { main: 'ፈ', sub: 'f' },
            { main: 'ፐ', sub: 'p' },
            { main: 'አ ኡ ኢ ኣ ኦ', sub: 'e/u/i/a/o' },
          ],
        ]}
      />
    ),
  },
  {
    value: 'greek',
    label: 'Greek',
    flag: '🇬🇷',
    referenceContent: (
      <KeyboardReferenceCard
        direction="ltr"
        lang="el"
        rows={[
          ['ς', 'ε', 'ρ', 'τ', 'υ', 'θ', 'ι', 'ο', 'π'],
          ['α', 'σ', 'δ', 'φ', 'γ', 'η', 'ξ', 'κ', 'λ'],
          ['ζ', 'χ', 'ψ', 'ω', 'β', 'ν', 'μ'],
        ]}
      />
    ),
  },
  {
    value: 'coptic',
    label: 'Coptic',
    flag: '🇪🇬',
    referenceContent: (
      <KeyboardReferenceCard direction="ltr" lang="cop" rows={copticKeyboardRows} />
    ),
  },
  {
    value: 'qaniujaaqpait',
    label: 'Qaniujaaqpait',
    flag: '🇨🇦',
    referenceContent: (
      <KeyboardReferenceCard
        direction="ltr"
        lang="iu"
        numberRow={qaniujaaqpaitNumberRow}
        rows={qaniujaaqpaitKeyboardRows}
      />
    ),
  },
  {
    value: 'javanese',
    label: 'Javanese',
    flag: '🇮🇩',
    referenceContent: (
      <KeyboardReferenceCard direction="ltr" lang="jv" rows={javaneseKeyboardRows} />
    ),
  },
  {
    value: 'thai',
    label: 'Thai',
    flag: '🇹🇭',
    referenceContent: (
      <KeyboardReferenceCard
        direction="ltr"
        lang="th"
        rows={[
          [
            { main: 'ก', sub: 'ko' },
            { main: 'ข', sub: 'kho' },
            { main: 'ค', sub: 'kho' },
            { main: 'ง', sub: 'ngo' },
            { main: 'จ', sub: 'cho' },
            { main: 'ฉ', sub: 'cho' },
            { main: 'ช', sub: 'cho' },
          ],
          [
            { main: 'ด', sub: 'do' },
            { main: 'ต', sub: 'to' },
            { main: 'ท', sub: 'tho' },
            { main: 'น', sub: 'no' },
            { main: 'บ', sub: 'bo' },
            { main: 'ป', sub: 'po' },
            { main: 'ม', sub: 'mo' },
          ],
          [
            { main: 'ย', sub: 'yo' },
            { main: 'ร', sub: 'ro' },
            { main: 'ล', sub: 'lo' },
            { main: 'ว', sub: 'wo' },
            { main: 'ส', sub: 'so' },
            { main: 'ห', sub: 'ho' },
            { main: 'อ', sub: 'o' },
          ],
        ]}
      />
    ),
  },
  {
    value: 'armenian',
    label: 'Armenian',
    flag: '🇦🇲',
    referenceContent: (
      <KeyboardReferenceCard
        direction="ltr"
        lang="hy"
        numberRow={armenianNumberRow}
        rows={armenianKeyboardRows}
      />
    ),
  },
  {
    value: 'hebrew',
    label: 'Hebrew',
    flag: '🇮🇱',
    referenceContent: <HebrewKeyboardLayout />,
  },
  {
    value: 'georgian',
    label: 'Georgian',
    flag: '🇬🇪',
    referenceContent: (
      <KeyboardReferenceCard direction="ltr" lang="ka" rows={georgianKeyboardRows} />
    ),
  },
  {
    value: 'gujarati',
    label: 'Gujarati',
    flag: '🇮🇳',
    referenceContent: (
      <KeyboardReferenceCard
        direction="ltr"
        lang="gu"
        rows={[
          ['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'એ'],
          ['ઐ', 'ઓ', 'ઔ', 'ક', 'ખ', 'ગ', 'ચ'],
          ['જ', 'ટ', 'ડ', 'ત', 'દ', 'પ', 'મ'],
        ]}
      />
    ),
  },
  {
    value: 'khmer',
    label: 'Khmer',
    flag: '🇰🇭',
    referenceContent: (
      <KeyboardReferenceCard
        direction="ltr"
        lang="km"
        rows={[
          ['ក', 'ខ', 'គ', 'ឃ', 'ង', 'ច', 'ឆ'],
          ['ជ', 'ញ', 'ត', 'ថ', 'ទ', 'ន', 'ប'],
          ['ព', 'ភ', 'ម', 'យ', 'រ', 'ល', 'ស'],
        ]}
      />
    ),
  },
  {
    value: 'sanskrit',
    label: 'Sanskrit',
    flag: '🇮🇳',
    referenceContent: <KeyboardReferenceCard direction="ltr" lang="sa" rows={devanagariReferenceRows} />,
  },
  {
    value: 'tibetan',
    label: 'Tibetan',
    flag: '🇧🇹',
    referenceContent: (
      <KeyboardReferenceCard
        direction="ltr"
        lang="bo"
        rows={[
          [
            { main: 'ཀ', sub: 'ka' },
            { main: 'ཁ', sub: 'kha' },
            { main: 'ག', sub: 'ga' },
            { main: 'ང', sub: 'nga' },
            { main: 'ཅ', sub: 'ca' },
            { main: 'ཆ', sub: 'cha' },
          ],
          [
            { main: 'ཇ', sub: 'ja' },
            { main: 'ཉ', sub: 'nya' },
            { main: 'ཏ', sub: 'ta' },
            { main: 'ཐ', sub: 'tha' },
            { main: 'ད', sub: 'da' },
            { main: 'ན', sub: 'na' },
          ],
          [
            { main: 'པ', sub: 'pa' },
            { main: 'ཕ', sub: 'pha' },
            { main: 'བ', sub: 'ba' },
            { main: 'མ', sub: 'ma' },
            { main: 'ར', sub: 'ra' },
            { main: 'ས', sub: 'sa' },
          ],
        ]}
      />
    ),
  },
  {
    value: 'urdu',
    label: 'Urdu',
    flag: '🇵🇰',
    referenceContent: (
      <KeyboardReferenceCard
        direction="rtl"
        lang="ur"
        rows={[
          [
            { main: 'ا', sub: 'alif' },
            { main: 'ب', sub: 'be' },
            { main: 'پ', sub: 'pe' },
            { main: 'ت', sub: 'te' },
            { main: 'ٹ', sub: 'tte' },
            { main: 'ج', sub: 'jeem' },
            { main: 'چ', sub: 'che' },
          ],
          [
            { main: 'د', sub: 'dal' },
            { main: 'ڈ', sub: 'ddal' },
            { main: 'ر', sub: 're' },
            { main: 'ڑ', sub: 'rre' },
            { main: 'ز', sub: 'ze' },
            { main: 'س', sub: 'seen' },
            { main: 'ش', sub: 'sheen' },
          ],
          [
            { main: 'ف', sub: 'fe' },
            { main: 'ق', sub: 'qaf' },
            { main: 'ک', sub: 'kaf' },
            { main: 'گ', sub: 'gaf' },
            { main: 'ل', sub: 'lam' },
            { main: 'م', sub: 'meem' },
            { main: 'ن', sub: 'noon' },
          ],
        ]}
      />
    ),
  },
  {
    value: 'maldivian',
    label: 'Maldivian',
    flag: '🇲🇻',
    referenceContent: (
      <KeyboardReferenceCard direction="rtl" lang="dv" rows={maldivianKeyboardRows} />
    ),
  },
  {
    value: 'marathi',
    label: 'Marathi',
    flag: '🇮🇳',
    referenceContent: <KeyboardReferenceCard direction="ltr" lang="mr" rows={devanagariReferenceRows} />,
  },
  {
    value: 'myanmar',
    label: 'Myanmar',
    flag: '🇲🇲',
    referenceContent: (
      <KeyboardReferenceCard
        direction="ltr"
        lang="my"
        rows={[
          ['ဆ', 'တ', 'န', 'မ', 'အ', 'ပ', 'က', 'င', 'သ', 'စ', 'ဟ', 'ဩ'],
          ['ေ', 'ျ', 'ိ', '်', 'ါ', '့', 'ြ', 'ု', 'ူ', 'း', "'", '၏'],
          ['ဖ', 'ထ', 'ခ', 'လ', 'ဘ', 'ည', 'ာ', ',', '.', '/'],
        ]}
      />
    ),
  },
  {
    value: 'farsi',
    label: 'Farsi',
    flag: '🇮🇷',
    referenceContent: (
      <KeyboardReferenceCard
        direction="rtl"
        lang="fa"
        rows={[
          ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'چ'],
          ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک', 'گ'],
          ['ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'پ', 'و'],
        ]}
      />
    ),
  },
  {
    value: 'cherokee',
    label: 'Cherokee',
    flag: '🇺🇸',
    referenceContent: (
      <KeyboardReferenceCard direction="ltr" lang="chr" rows={cherokeeKeyboardRows} />
    ),
  },
  {
    value: 'osage',
    label: 'Osage',
    flag: '🇺🇸',
    referenceContent: <KeyboardReferenceCard direction="ltr" lang="osa" rows={osageKeyboardRows} />,
  },
  {
    value: 'emoji',
    label: 'Emojis',
    flag: '🏁',
    referenceContent: null,
  },
];

const getDefaultStats = (tab: TabValue): SidebarStat[] =>
  tab === 'typing'
    ? [
        { label: 'Completed', value: 0 },
        { label: 'Mistakes', value: 0 },
        { label: 'Speed', value: '—' },
        { label: 'Accuracy', value: '—' },
      ]
    : [
        { label: 'Correct', value: 0 },
        { label: 'Incorrect', value: 0 },
        { label: 'Accuracy', value: '—' },
      ];

function DesktopLanguageList({
  options,
  value,
  onChange,
}: {
  options: typeof languageOptions;
  value: StudyLanguage;
  onChange: (value: StudyLanguage) => void;
}) {
  return (
    <nav
      className="hidden flex-wrap gap-2 py-4 lg:flex"
      role="tablist"
      aria-label="Study languages"
    >
      {options.map(option => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-sm leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${
              isActive
                ? 'border-zinc-950 bg-zinc-950 text-white'
                : 'border-zinc-200 bg-transparent text-zinc-500 hover:border-zinc-950 hover:text-zinc-950'
            }`}
            aria-label={option.label}
            aria-selected={isActive}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            id={`language-tab-${option.value}`}
            aria-controls={`language-panel-${option.value}`}
            title={option.label}
          >
            <span className="text-base leading-none" aria-hidden="true">
              {option.flag}
            </span>
            <span className="font-medium">{option.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function MobileLanguageGrid({
  options,
  value,
  onChange,
}: {
  options: typeof languageOptions;
  value: StudyLanguage;
  onChange: (value: StudyLanguage) => void;
}) {
  return (
    <nav className="grid grid-cols-5 sm:grid-cols-6 lg:hidden" role="tablist" aria-label="Study languages">
      {options.map(option => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            className={`-mb-px -mr-px flex aspect-square min-h-[3rem] items-center justify-center border border-[var(--border)] text-2xl leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${
              isActive
                ? 'border-zinc-950 bg-zinc-950 text-white'
                : 'bg-transparent text-zinc-500 hover:text-zinc-950'
            }`}
            onClick={() => onChange(option.value)}
            aria-label={option.label}
            aria-selected={isActive}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            id={`language-tab-${option.value}`}
            aria-controls={`language-panel-${option.value}`}
            title={option.label}
          >
            <span aria-hidden="true">{option.flag}</span>
          </button>
        );
      })}
    </nav>
  );
}

function DesktopStatsRail({ stats }: { stats: SidebarStat[] }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-8 space-y-5 pr-6 text-sm">
        {stats.map(stat => (
          <div key={stat.label}>
            <p className="text-zinc-500">{stat.label}</p>
            <p className="mt-1 text-3xl font-medium leading-none text-zinc-950">{stat.value}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

function KeyboardReferenceCard({
  direction,
  lang,
  numberRow,
  rows,
}: {
  direction: 'ltr' | 'rtl';
  lang: string;
  numberRow?: Keycap[];
  rows: Keycap[][];
}) {
  const onVirtualKeyPress = useVirtualKeyboard();
  const bottomRowKeys =
    lang === 'ar' || lang === 'fa' ? ['Backspace', 'Space', 'Shift'] : ['Shift', 'Space', 'Backspace'];
  const mainKeyBaseClassName =
    'absolute right-1 top-1 text-right transition-colors group-hover:text-white sm:right-1.5 sm:top-1.5';
  const legendRows =
    keyboardLegendOverrides[lang] ??
    rows.map((row, rowIndex) =>
      defaultLetterLegendRows[Math.min(rowIndex, defaultLetterLegendRows.length - 1)]?.slice(0, row.length) ??
      row.map(() => ''),
    );
  const visibleNumberRow = numberRow ?? defaultNumberRow;

  return (
    <div className="px-1.5 py-2.5 sm:p-6" dir={direction} lang={lang}>
      <div className="space-y-1.5 sm:space-y-3">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
          {visibleNumberRow.map((keycap, keyIndex) => {
            const main = typeof keycap === 'string' ? keycap : (keycap.main ?? '');
            const sub =
              typeof keycap === 'string'
                ? usNumberLegendRow[keyIndex] ?? ''
                : (keycap.sub ?? usNumberLegendRow[keyIndex] ?? '');
            const insertValue = main || sub;
            const mainKeyClassName =
              main.length > 4
                ? `${mainKeyBaseClassName} text-[0.48rem] font-semibold leading-tight sm:text-[0.72rem]`
                : main.length > 2
                  ? `${mainKeyBaseClassName} text-[0.62rem] font-medium leading-none sm:text-base`
                  : `${mainKeyBaseClassName} text-[0.95rem] font-medium leading-none sm:text-xl`;

            return (
              <button
                key={`${lang}-number-${keyIndex}`}
                type="button"
                onMouseDown={event => event.preventDefault()}
                onClick={() => {
                  if (insertValue) {
                    onVirtualKeyPress?.(insertValue);
                  }
                }}
                className="group relative flex h-8 min-w-[1.35rem] items-stretch overflow-hidden rounded-lg border border-[var(--border)] px-1 py-0.5 text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:h-12 sm:min-w-[3.2rem] sm:rounded-xl sm:px-2 sm:py-1"
                aria-label={`${lang} key ${insertValue}`}
              >
                {main ? (
                  <span className={mainKeyClassName}>
                    {main}
                  </span>
                ) : null}
                {sub ? (
                  <span className="absolute bottom-0.5 left-1 text-[0.42rem] leading-none text-zinc-500 transition-colors group-hover:text-white sm:bottom-1 sm:left-1.5 sm:text-[0.62rem]">
                    {sub}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {legendRows.map((legendRow, rowIndex) => (
          <div
            key={`${lang}-${rowIndex}`}
            className="flex flex-wrap justify-center gap-1 sm:gap-1.5"
          >
            {legendRow.map((legend, keyIndex) => {
              const keycap = rows[rowIndex]?.[keyIndex];
              const main = typeof keycap === 'string' ? keycap : (keycap?.main ?? '');
              const sub =
                typeof keycap === 'string' ? legend : (keycap?.sub ?? legend ?? null);
              const hasMain = main.length > 0;
              const insertValue = main || sub || '';
              const mainKeyClassName =
                main.length > 4
                  ? `${mainKeyBaseClassName} text-[0.48rem] font-semibold leading-tight sm:text-[0.72rem]`
                  : main.length > 2
                    ? `${mainKeyBaseClassName} text-[0.62rem] font-medium leading-none sm:text-base`
                    : `${mainKeyBaseClassName} text-[0.95rem] font-medium leading-none sm:text-xl`;

              return (
                <button
                  key={`${lang}-${rowIndex}-${keyIndex}`}
                  type="button"
                  onMouseDown={event => event.preventDefault()}
                  onClick={() => {
                    if (insertValue) {
                      onVirtualKeyPress?.(insertValue);
                    }
                  }}
                  className="group relative flex h-8 min-w-[1.35rem] items-stretch overflow-hidden rounded-lg border border-[var(--border)] px-1 py-0.5 text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:h-12 sm:min-w-[3.2rem] sm:rounded-xl sm:px-2 sm:py-1"
                  aria-label={`${lang} key ${insertValue}`}
                >
                  {hasMain ? (
                    <span className={mainKeyClassName}>
                      {main}
                    </span>
                  ) : null}
                  {sub ? (
                    <span className="absolute bottom-0.5 left-1 text-[0.42rem] leading-none text-zinc-500 transition-colors group-hover:text-white sm:bottom-1 sm:left-1.5 sm:text-[0.62rem]">
                      {sub}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-center gap-1 pt-1 sm:gap-1.5 sm:pt-1.5">
          {bottomRowKeys.map(key => (
            <button
              key={key}
              type="button"
              onMouseDown={event => event.preventDefault()}
              onClick={() => {
                if (key === 'Space') {
                  onVirtualKeyPress?.(' ');
                  return;
                }

                if (key === 'Backspace') {
                  onVirtualKeyPress?.(VIRTUAL_BACKSPACE_KEY);
                }
              }}
              className={`flex h-7 items-center justify-center rounded-lg border border-[var(--border)] text-[0.46rem] uppercase tracking-[0.16em] text-zinc-500 sm:h-10 sm:rounded-xl sm:text-[0.65rem] sm:tracking-[0.18em] ${
                key === 'Space'
                  ? 'min-w-[6rem] px-3 sm:min-w-[14rem] sm:px-4'
                  : 'w-12 sm:w-20'
              }`}
              aria-label={key}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LanguageWorkspace() {
  const [activeLanguage, setActiveLanguage] = useState<StudyLanguage>('arabic');
  const [activeTab, setActiveTab] = useState<TabValue>('typing');
  const [desktopStats, setDesktopStats] = useState<SidebarStat[]>(getDefaultStats('typing'));
  const [virtualKeyHandler, setVirtualKeyHandler] = useState<((key: string) => void) | null>(null);
  const activeOption =
    languageOptions.find(option => option.value === activeLanguage) ?? languageOptions[0];
  const activeTabs = tabsByLanguage[activeLanguage];

  const handleLanguageChange = (language: StudyLanguage) => {
    setActiveLanguage(language);
    setActiveTab('typing');
  };

  const handleVirtualKeyHandlerChange = (
    handler: ((key: string) => void) | null,
  ) => {
    // Store function values directly instead of letting React treat them as updater callbacks.
    setVirtualKeyHandler(() => handler);
  };

  useEffect(() => {
    if (!activeTabs.some(tab => tab.value === activeTab)) {
      setActiveTab(activeTabs[0].value);
    }
  }, [activeTab, activeTabs]);

  useEffect(() => {
    setDesktopStats(getDefaultStats(activeTab));
  }, [activeLanguage, activeTab]);

  return (
    <VirtualKeyboardContext.Provider value={virtualKeyHandler}>
      <div className="flex flex-col gap-8 lg:gap-10">
      <header className="flex flex-col gap-4 pb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <BrandMark />

          <PracticeModeSwitch
            activeLanguage={activeLanguage}
            activeTab={activeTab}
            activeTabs={activeTabs}
            onTabChange={setActiveTab}
          />
        </div>

        <DesktopLanguageList
          options={languageOptions}
          value={activeLanguage}
          onChange={handleLanguageChange}
        />

        <MobileLanguageGrid
          options={languageOptions}
          value={activeLanguage}
          onChange={handleLanguageChange}
        />
      </header>

      <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-8">
        <DesktopStatsRail stats={desktopStats} />

        <div
          role="tabpanel"
          id={`language-panel-${activeLanguage}`}
          aria-labelledby={`language-tab-${activeLanguage}`}
          className="min-w-0"
        >
          <section className="flex flex-col gap-5 sm:gap-6">
            <TrainerTabs
              language={activeLanguage}
              activeTab={activeTab}
              onStatsChange={setDesktopStats}
              onVirtualKeyHandlerChange={handleVirtualKeyHandlerChange}
            />

            {activeTab === 'typing' && activeOption.referenceContent ? (
              <section className="pt-1 sm:pt-2">
                {activeOption.referenceContent}
              </section>
            ) : null}
          </section>
        </div>
      </div>
      </div>
    </VirtualKeyboardContext.Provider>
  );
}
