'use client';

import { type ReactNode, useEffect, useState } from 'react';

import TrainerTabs, { tabsByLanguage, type StudyLanguage, type TabValue } from './TrainerTabs';
import HebrewKeyboardLayout from './HebrewKeyboardLayout';
import KoreanKeyboardLayout from './KoreanKeyboardLayout';

type Keycap = string | { main: string; sub?: string };

function KeyboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
      <rect x="3.5" y="6" width="17" height="12" rx="2.5" />
      <path d="M7 10h.01M10 10h.01M13 10h.01M16 10h.01M7 13h.01M10 13h.01M13 13h4" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
      <path d="M5 10.5v3h3l4 3.5v-10L8 10.5H5Z" />
      <path d="M16 9.5a4 4 0 0 1 0 5" />
      <path d="M18.5 7a7.5 7.5 0 0 1 0 10" />
    </svg>
  );
}

function WordsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
      <rect x="4" y="5" width="16" height="14" rx="2.5" />
      <path d="M8 9.5h8M8 12.5h8M8 15.5h5" />
    </svg>
  );
}

function AppLogo() {
  const glyphs = ['א', 'あ', 'ع', '가'];

  return (
    <div className="flex items-center gap-4 pb-1">
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

      <div className="min-w-0">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-zinc-500">Script Trainer</p>
        <p className="mt-1 text-base font-medium text-zinc-950">Type Across Scripts</p>
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

const chineseKeyboardRows: Keycap[][] = [
  [
    { main: 'q' },
    { main: 'w' },
    { main: 'e' },
    { main: 'r' },
    { main: 't' },
    { main: 'y' },
    { main: 'u' },
    { main: 'i' },
    { main: 'o' },
    { main: 'p' },
  ],
  [
    { main: 'a' },
    { main: 's' },
    { main: 'd' },
    { main: 'f' },
    { main: 'g' },
    { main: 'h' },
    { main: 'j' },
    { main: 'k' },
    { main: 'l' },
  ],
  [
    { main: 'z' },
    { main: 'x' },
    { main: 'c' },
    { main: 'v', sub: 'u:' },
    { main: 'b' },
    { main: 'n' },
    { main: 'm' },
  ],
];

const japaneseKeyboardRows: Keycap[][] = [
  [
    { main: 'q', sub: 'た' },
    { main: 'w', sub: 'て' },
    { main: 'e', sub: 'い' },
    { main: 'r', sub: 'す' },
    { main: 't', sub: 'か' },
    { main: 'y', sub: 'ん' },
    { main: 'u', sub: 'な' },
    { main: 'i', sub: 'に' },
    { main: 'o', sub: 'ら' },
    { main: 'p', sub: 'せ' },
  ],
  [
    { main: 'a', sub: 'ち' },
    { main: 's', sub: 'と' },
    { main: 'd', sub: 'し' },
    { main: 'f', sub: 'は' },
    { main: 'g', sub: 'き' },
    { main: 'h', sub: 'く' },
    { main: 'j', sub: 'ま' },
    { main: 'k', sub: 'の' },
    { main: 'l', sub: 'り' },
  ],
  [
    { main: 'z', sub: 'つ' },
    { main: 'x', sub: 'さ' },
    { main: 'c', sub: 'そ' },
    { main: 'v', sub: 'ひ' },
    { main: 'b', sub: 'こ' },
    { main: 'n', sub: 'み' },
    { main: 'm', sub: 'も' },
  ],
];

const languageOptions: {
  value: StudyLanguage;
  label: string;
  flag: string;
  referenceContent: ReactNode;
}[] = [
  {
    value: 'hebrew',
    label: 'Hebrew',
    flag: '🇮🇱',
    referenceContent: <HebrewKeyboardLayout />,
  },
  {
    value: 'chinese',
    label: 'Chinese',
    flag: '🇨🇳',
    referenceContent: (
      <KeyboardReferenceCard direction="ltr" lang="zh-Hans" rows={chineseKeyboardRows} />
    ),
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
  return (
    <div className="p-4 sm:p-6" dir={direction} lang={lang}>
      <div className="space-y-3">
        {rows.map(row => (
          <div
            key={row.map(keycap => (typeof keycap === 'string' ? keycap : keycap.main)).join('|')}
            className="flex flex-wrap justify-center gap-2"
          >
            {row.map(keycap => {
              const main = typeof keycap === 'string' ? keycap : keycap.main;
              const sub = typeof keycap === 'string' ? null : keycap.sub;
              const mainClassName =
                main.length > 4
                  ? 'text-sm font-semibold leading-tight sm:text-base'
                  : main.length > 2
                    ? 'text-lg font-medium leading-none sm:text-xl'
                    : 'text-2xl font-medium leading-none sm:text-3xl';

              return (
                <div
                  key={`${main}-${sub ?? ''}`}
                  className="flex h-14 min-w-[3.5rem] flex-col items-center justify-center border border-[var(--border)] px-3 text-zinc-950 sm:h-16 sm:min-w-[4rem]"
                >
                  <span className={mainClassName}>{main}</span>
                  {sub ? (
                    <span className="mt-1 text-[0.62rem] leading-none text-zinc-500 sm:text-[0.7rem]">
                      {sub}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <div className="flex h-12 w-24 items-center justify-center border border-[var(--border)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            Shift
          </div>
          <div className="flex h-12 min-w-[12rem] items-center justify-center border border-[var(--border)] px-6 text-xs uppercase tracking-[0.2em] text-zinc-500 sm:min-w-[18rem]">
            Space
          </div>
          <div className="flex h-12 w-24 items-center justify-center border border-[var(--border)] text-xs uppercase tracking-[0.2em] text-zinc-500">
            Enter
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LanguageWorkspace() {
  const [activeLanguage, setActiveLanguage] = useState<StudyLanguage>('hebrew');
  const [activeTab, setActiveTab] = useState<TabValue>('typing');
  const activeOption =
    languageOptions.find(option => option.value === activeLanguage) ?? languageOptions[0];
  const activeTabs = tabsByLanguage[activeLanguage];
  const tabIcons: Record<TabValue, ReactNode> = {
    typing: <KeyboardIcon />,
    words: <WordsIcon />,
    letters: <SoundIcon />,
  };

  useEffect(() => {
    if (!activeTabs.some(tab => tab.value === activeTab)) {
      setActiveTab(activeTabs[0].value);
    }
  }, [activeTab, activeTabs]);

  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
      <aside className="border-b border-[var(--border)] pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
        <div className="flex flex-col gap-6 lg:sticky lg:top-8">
          <AppLogo />

          <nav
            className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-3"
            role="tablist"
            aria-label="Study languages"
          >
          {languageOptions.map(option => {
            const isActive = option.value === activeLanguage;

            return (
              <button
                key={option.value}
                type="button"
                className={`-mb-px -mr-px flex aspect-square min-h-[3rem] items-center justify-center border border-[var(--border)] text-2xl leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${
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
              </button>
            );
          })}
          </nav>

          <nav
            className="inline-flex w-fit items-center rounded-full border border-[var(--border)] p-1"
            role="tablist"
            aria-label={`${activeLanguage} trainer exercises`}
          >
            {activeTabs.map(tab => {
              const isActive = tab.value === activeTab;

              return (
                <button
                  key={tab.value}
                  type="button"
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-zinc-950 text-white'
                      : 'bg-transparent text-zinc-500 hover:text-zinc-950'
                  }`}
                  onClick={() => setActiveTab(tab.value)}
                  aria-selected={isActive}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  id={`trainer-tab-${activeLanguage}-${tab.value}`}
                  aria-controls={`trainer-tabpanel-${activeLanguage}-${tab.value}`}
                  title={tab.label}
                >
                  {tabIcons[tab.value]}
                  <span className="sr-only">{tab.label}</span>
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

          {activeTab === 'typing' ? (
            <section className="border-t border-[var(--border)] pt-10">
              {activeOption.referenceContent}
            </section>
          ) : null}
        </section>
      </div>
    </div>
  );
}
