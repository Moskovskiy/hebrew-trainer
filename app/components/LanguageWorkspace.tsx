'use client';

import { type ReactNode, useEffect, useState } from 'react';

import TrainerTabs, { tabsByLanguage, type StudyLanguage, type TabValue } from './TrainerTabs';
import HebrewKeyboardLayout from './HebrewKeyboardLayout';
import KoreanKeyboardLayout from './KoreanKeyboardLayout';

type Keycap = string | { main: string; sub?: string };

const tabLabels: Record<TabValue, string> = {
  typing: 'Type',
  letters: 'Letters',
  words: 'Words',
};

function AppLogo({
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
  const glyphs = ['ა', 'あ', 'ع', '가'];

  return (
    <div className="pb-1">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 grid-cols-2 overflow-hidden border border-zinc-950">
          {glyphs.map((glyph, index) => {
            const isDark = index === 0 || index === 3;

            return (
              <div
                key={glyph}
                className={`flex items-center justify-center text-base font-medium leading-none ${
                  isDark ? 'bg-zinc-950 text-white' : 'bg-transparent text-zinc-950'
                } ${index < 2 ? 'border-b' : ''} ${index % 2 === 0 ? 'border-r' : ''} border-zinc-950`}
              >
                {glyph}
              </div>
            );
          })}
        </div>

        <nav
          className="flex min-w-0 flex-1 items-center rounded-full border border-[var(--border)] p-1"
          role="tablist"
          aria-label={`${activeLanguage} trainer exercises`}
        >
          {activeTabs.map(tab => {
            const isActive = tab.value === activeTab;

            return (
              <button
                key={tab.value}
                type="button"
                className={`flex h-10 min-w-0 flex-1 items-center justify-center rounded-full px-3 text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:text-[0.68rem] ${
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
                <span className="truncate">{tabLabels[tab.value]}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
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

const japaneseKeyboardRows: Keycap[][] = [
  ['た', 'て', 'い', 'す', 'か', 'ん', 'な', 'に', 'ら', 'せ'],
  ['ち', 'と', 'し', 'は', 'き', 'く', 'ま', 'の', 'り'],
  ['つ', 'さ', 'そ', 'ひ', 'こ', 'み', 'も'],
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

const qaniujaaqpaitKeyboardRows: Keycap[][] = [
  [
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
    { main: 'ᒡ', sub: '=' },
    { main: '˙', sub: ']' },
  ],
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
    value: 'japanese',
    label: 'Japanese',
    flag: '🇯🇵',
    referenceContent: (
      <KeyboardReferenceCard direction="ltr" lang="ja" rows={japaneseKeyboardRows} />
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
            { main: 'h', sub: 'ሀ' },
            { main: 'l', sub: 'ለ' },
            { main: 'm', sub: 'መ' },
            { main: 'r', sub: 'ረ' },
            { main: 's', sub: 'ሰ' },
            { main: 'b', sub: 'በ' },
            { main: 't', sub: 'ተ' },
          ],
          [
            { main: 'n', sub: 'ነ' },
            { main: 'k', sub: 'ከ' },
            { main: 'w', sub: 'ወ' },
            { main: 'z', sub: 'ዘ' },
            { main: 'y', sub: 'የ' },
            { main: 'd', sub: 'ደ' },
            { main: 'g', sub: 'ገ' },
          ],
          [
            { main: 'q', sub: 'ቀ' },
            { main: 'c', sub: 'ቸ' },
            { main: 'j', sub: 'ጀ' },
            { main: 'x', sub: 'ጸ' },
            { main: 'f', sub: 'ፈ' },
            { main: 'p', sub: 'ፐ' },
            { main: 'e/u/i/a/o', sub: 'አ ኡ ኢ ኣ ኦ' },
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
      <KeyboardReferenceCard direction="ltr" lang="iu" rows={qaniujaaqpaitKeyboardRows} />
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
        rows={[
          ['Ա', 'Բ', 'Գ', 'Դ', 'Ե', 'Զ', 'Է'],
          ['Ը', 'Թ', 'Ժ', 'Ի', 'Լ', 'Խ', 'Ծ'],
          ['Կ', 'Հ', 'Ձ', 'Ղ', 'Ճ', 'Մ', 'Շ'],
        ]}
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
      <KeyboardReferenceCard
        direction="ltr"
        lang="ka"
        rows={[
          ['ა', 'ბ', 'გ', 'დ', 'ე', 'ვ', 'ზ'],
          ['თ', 'ი', 'კ', 'ლ', 'მ', 'ნ', 'ო'],
          ['პ', 'ჟ', 'რ', 'ს', 'ტ', 'უ', 'ქ'],
        ]}
      />
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

function KeyboardReferenceCard({
  direction,
  lang,
  rows,
}: {
  direction: 'ltr' | 'rtl';
  lang: string;
  rows: Keycap[][];
}) {
  const bottomRowKeys =
    lang === 'ar' || lang === 'fa' ? ['Enter', 'Space', 'Shift'] : ['Shift', 'Space', 'Enter'];

  return (
    <div className="p-4 sm:p-6" dir={direction} lang={lang}>
      <div className="space-y-3">
        {rows.map(row => (
          <div
            key={row.map(keycap => (typeof keycap === 'string' ? keycap : keycap.main)).join('|')}
            className="flex flex-wrap justify-center gap-1.5"
          >
            {row.map(keycap => {
              const main = typeof keycap === 'string' ? keycap : keycap.main;
              const sub = typeof keycap === 'string' ? null : keycap.sub;
              const mainClassName =
                main.length > 4
                  ? 'text-[0.72rem] font-semibold leading-tight sm:text-sm'
                  : main.length > 2
                    ? 'text-base font-medium leading-none sm:text-lg'
                    : 'text-xl font-medium leading-none sm:text-2xl';

              return (
                <div
                  key={`${main}-${sub ?? ''}`}
                  className="flex h-11 min-w-[2.9rem] flex-col items-center justify-center border border-[var(--border)] px-2 text-zinc-950 sm:h-12 sm:min-w-[3.2rem]"
                >
                  <span className={mainClassName}>{main}</span>
                  {sub ? (
                    <span className="mt-0.5 text-[0.56rem] leading-none text-zinc-500 sm:text-[0.62rem]">
                      {sub}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1.5">
          {bottomRowKeys.map(key => (
            <div
              key={key}
              className={`flex h-10 items-center justify-center border border-[var(--border)] text-[0.65rem] uppercase tracking-[0.18em] text-zinc-500 ${
                key === 'Space' ? 'min-w-[9rem] px-4 sm:min-w-[14rem]' : 'w-20'
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LanguageWorkspace() {
  const [activeLanguage, setActiveLanguage] = useState<StudyLanguage>('arabic');
  const [activeTab, setActiveTab] = useState<TabValue>('typing');
  const activeOption =
    languageOptions.find(option => option.value === activeLanguage) ?? languageOptions[0];
  const activeTabs = tabsByLanguage[activeLanguage];

  useEffect(() => {
    if (!activeTabs.some(tab => tab.value === activeTab)) {
      setActiveTab(activeTabs[0].value);
    }
  }, [activeTab, activeTabs]);

  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
      <aside className="border-b border-[var(--border)] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
        <div className="flex flex-col gap-6 lg:sticky lg:top-8">
          <AppLogo
            activeLanguage={activeLanguage}
            activeTab={activeTab}
            activeTabs={activeTabs}
            onTabChange={setActiveTab}
          />

          <nav
            className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-1"
            role="tablist"
            aria-label="Study languages"
          >
          {languageOptions.map(option => {
            const isActive = option.value === activeLanguage;

            return (
              <button
                key={option.value}
                type="button"
                className={`-mb-px -mr-px flex aspect-square min-h-[3rem] items-center justify-center border border-[var(--border)] text-2xl leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 lg:mr-0 lg:w-full lg:aspect-auto lg:min-h-[3.25rem] lg:justify-start lg:gap-3 lg:px-4 lg:text-left ${
                  isActive
                    ? 'border-zinc-950 bg-zinc-950 text-white'
                    : 'bg-transparent text-zinc-500 hover:text-zinc-950'
                }`}
                onClick={() => {
                  setActiveLanguage(option.value);
                  setActiveTab('typing');
                }}
                aria-label={option.label}
                aria-selected={isActive}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                id={`language-tab-${option.value}`}
                aria-controls={`language-panel-${option.value}`}
                title={option.label}
              >
                <span aria-hidden="true">{option.flag}</span>
                <span className="hidden text-sm font-medium leading-none lg:inline">
                  {option.label}
                </span>
              </button>
            );
          })}
          </nav>

        </div>
      </aside>

      <div
        role="tabpanel"
        id={`language-panel-${activeLanguage}`}
        aria-labelledby={`language-tab-${activeLanguage}`}
        className="min-w-0"
      >
        <section className="flex flex-col gap-10">
          <TrainerTabs language={activeLanguage} activeTab={activeTab} />

          {activeTab === 'typing' && activeOption.referenceContent ? (
            <section className="border-t border-[var(--border)] pt-10">
              {activeOption.referenceContent}
            </section>
          ) : null}
        </section>
      </div>
    </div>
  );
}
