'use client';

import { type ReactNode, useEffect, useState } from 'react';

import TrainerTabs, { tabsByLanguage, type StudyLanguage, type TabValue } from './TrainerTabs';
import HebrewKeyboardLayout from './HebrewKeyboardLayout';
import KoreanKeyboardLayout from './KoreanKeyboardLayout';

type Keycap = string | { main: string; sub?: string };

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
    <div className="border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6" dir={direction} lang={lang}>
      <div className="space-y-3">
        {rows.map(row => (
          <div
            key={row.map(keycap => (typeof keycap === 'string' ? keycap : keycap.main)).join('|')}
            className="flex flex-wrap justify-center gap-2"
          >
            {row.map(keycap => {
              const main = typeof keycap === 'string' ? keycap : keycap.main;
              const sub = typeof keycap === 'string' ? null : keycap.sub;

              return (
                <div
                  key={`${main}-${sub ?? ''}`}
                  className="flex h-14 min-w-[3.5rem] flex-col items-center justify-center border border-[var(--border)] px-3 text-zinc-950 sm:h-16 sm:min-w-[4rem]"
                >
                  <span className="text-2xl font-medium leading-none sm:text-3xl">{main}</span>
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

  useEffect(() => {
    if (!activeTabs.some(tab => tab.value === activeTab)) {
      setActiveTab(activeTabs[0].value);
    }
  }, [activeTab, activeTabs]);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3 border-b border-[var(--border)] lg:flex-row lg:items-end lg:justify-between">
        <nav className="flex flex-wrap gap-6" role="tablist" aria-label="Study languages">
          {languageOptions.map(option => {
            const isActive = option.value === activeLanguage;

            return (
              <button
                key={option.value}
                type="button"
                className={`-mb-px border-b-2 pb-3 text-2xl leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-zinc-950 text-zinc-950'
                    : 'border-transparent text-zinc-500 hover:text-zinc-950'
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
          className="flex flex-wrap gap-6 lg:justify-end"
          role="tablist"
          aria-label={`${activeLanguage} trainer exercises`}
        >
          {activeTabs.map(tab => {
            const isActive = tab.value === activeTab;

            return (
              <button
                key={tab.value}
                type="button"
                className={`-mb-px border-b-2 pb-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-zinc-950 text-zinc-950'
                    : 'border-transparent text-zinc-500 hover:text-zinc-950'
                }`}
                onClick={() => setActiveTab(tab.value)}
                aria-selected={isActive}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                id={`trainer-tab-${activeLanguage}-${tab.value}`}
                aria-controls={`trainer-tabpanel-${activeLanguage}-${tab.value}`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </section>

      <div
        role="tabpanel"
        id={`language-panel-${activeLanguage}`}
        aria-labelledby={`language-tab-${activeLanguage}`}
        className="flex flex-col gap-10"
      >
        <section>
          <TrainerTabs language={activeLanguage} activeTab={activeTab} />
        </section>

        {activeTab === 'typing' ? (
          <section className="border-t border-[var(--border)] pt-10">
            {activeOption.referenceContent}
          </section>
        ) : null}
      </div>
    </div>
  );
}
