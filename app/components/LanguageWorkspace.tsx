'use client';

import { type ReactNode, useState } from 'react';

import TrainerTabs, { type StudyLanguage, type TabValue } from './TrainerTabs';
import HebrewKeyboardLayout from './HebrewKeyboardLayout';
import KoreanKeyboardLayout from './KoreanKeyboardLayout';

const languageOptions: {
  value: StudyLanguage;
  label: string;
  referenceEyebrow: string;
  referenceHeading: string;
  referenceDescription: string;
  referenceContent: ReactNode;
}[] = [
  {
    value: 'hebrew',
    label: 'Hebrew',
    referenceEyebrow: 'Keyboard layout',
    referenceHeading: 'Keep the Hebrew keyboard visible while you practice.',
    referenceDescription:
      'A quick reference for the standard Hebrew letter positions, so you can glance down and stay in the flow while typing.',
    referenceContent: <HebrewKeyboardLayout />,
  },
  {
    value: 'korean',
    label: 'Korean',
    referenceEyebrow: 'Keyboard layout',
    referenceHeading: 'Keep the Korean keyboard visible while you practice.',
    referenceDescription:
      'A quick reference for the standard Korean 2-set layout, so you can check Hangul key positions while working through the sounds drill.',
    referenceContent: <KoreanKeyboardLayout />,
  },
  {
    value: 'russian',
    label: 'Russian',
    referenceEyebrow: 'Keyboard layout',
    referenceHeading: 'Keep the Russian keyboard visible while you practice.',
    referenceDescription:
      'Russian typing uses the standard JCUKEN layout, not QWERTY. Keeping the key positions in view makes the keyboard drill much more useful.',
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
    value: 'greek',
    label: 'Greek',
    referenceEyebrow: 'Keyboard layout',
    referenceHeading: 'Keep the Greek keyboard visible while you practice.',
    referenceDescription:
      'Modern Greek uses its own key arrangement, with final sigma and accent keys in different spots from Latin keyboards. A visible layout helps you build real keyboard memory.',
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
    value: 'arabic',
    label: 'Arabic',
    referenceEyebrow: 'Keyboard layout',
    referenceHeading: 'Keep the Arabic keyboard visible while you practice right-to-left.',
    referenceDescription:
      'Arabic typing follows the standard Arabic 101 layout. Seeing the key positions matters more than seeing the alphabet in order during keyboard practice.',
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
    referenceEyebrow: 'Keyboard layout',
    referenceHeading: 'Keep the Persian keyboard visible while you practice right-to-left.',
    referenceDescription:
      'Farsi typing uses the Persian standard keyboard, including letters like پ, چ, ژ, and گ in fixed key positions. This is more useful here than an alphabet reference.',
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
  rows: string[][];
}) {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6" dir={direction} lang={lang}>
      <div className="space-y-3">
        {rows.map(row => (
          <div key={row.join('')} className="flex flex-wrap justify-center gap-2">
            {row.map(letter => (
              <div
                key={letter}
                className="flex h-14 min-w-[3.5rem] items-center justify-center border border-[var(--border)] px-3 text-2xl font-medium text-zinc-950 sm:h-16 sm:min-w-[4rem] sm:text-3xl"
              >
                {letter}
              </div>
            ))}
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

  return (
    <div className="flex flex-col gap-10">
      <nav
        className="flex gap-6 overflow-x-auto border-b border-[var(--border)]"
        role="tablist"
        aria-label="Study languages"
      >
        {languageOptions.map(option => {
          const isActive = option.value === activeLanguage;

          return (
            <button
              key={option.value}
              type="button"
              className={`border-b-2 pb-4 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${
                isActive
                  ? 'border-zinc-950 text-zinc-950'
                  : 'border-transparent text-zinc-500 hover:text-zinc-950'
              }`}
              onClick={() => {
                setActiveLanguage(option.value);
                setActiveTab('typing');
              }}
              aria-selected={isActive}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              id={`language-tab-${option.value}`}
              aria-controls={`language-panel-${option.value}`}
            >
              {option.label}
            </button>
          );
        })}
      </nav>

      <div
        role="tabpanel"
        id={`language-panel-${activeLanguage}`}
        aria-labelledby={`language-tab-${activeLanguage}`}
        className="flex flex-col gap-10"
      >
        <section>
          <TrainerTabs language={activeLanguage} activeTab={activeTab} onTabChange={setActiveTab} />
        </section>

        {activeTab === 'typing' ? (
          <section className="border-t border-[var(--border)] pt-10">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-zinc-500">
                {activeOption.referenceEyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-zinc-950 sm:text-3xl">
                {activeOption.referenceHeading}
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600">
                {activeOption.referenceDescription}
              </p>
            </div>

            <div className="mt-8">{activeOption.referenceContent}</div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
