'use client';

import { type ReactNode, useState } from 'react';

import TrainerTabs, { StudyLanguage } from './TrainerTabs';
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
    referenceEyebrow: 'Alphabet reference',
    referenceHeading: 'Keep the Cyrillic alphabet visible while you practice Russian prompts.',
    referenceDescription:
      'Russian runs left to right. These common uppercase letters make it easier to stay oriented while you switch between keyboard layouts.',
    referenceContent: (
      <ScriptReferenceCard
        direction="ltr"
        lang="ru"
        rows={[
          ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й'],
          ['К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф'],
          ['Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'],
        ]}
      />
    ),
  },
  {
    value: 'greek',
    label: 'Greek',
    referenceEyebrow: 'Alphabet reference',
    referenceHeading: 'Keep the Greek alphabet nearby while you practice.',
    referenceDescription:
      'Greek runs left to right. A quick visual pass over the uppercase forms helps when you are switching between Latin and Greek keyboard layouts.',
    referenceContent: (
      <ScriptReferenceCard
        direction="ltr"
        lang="el"
        rows={[
          ['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ'],
          ['Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π'],
          ['Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'],
        ]}
      />
    ),
  },
  {
    value: 'arabic',
    label: 'Arabic',
    referenceEyebrow: 'Script reference',
    referenceHeading: 'Keep the Arabic script visible while you practice right-to-left.',
    referenceDescription:
      'Arabic prompts read from right to left. These core letters give you a quick visual anchor while you settle into the script flow.',
    referenceContent: (
      <ScriptReferenceCard
        direction="rtl"
        lang="ar"
        rows={[
          ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ'],
          ['ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع'],
          ['غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'],
        ]}
      />
    ),
  },
  {
    value: 'farsi',
    label: 'Farsi',
    referenceEyebrow: 'Script reference',
    referenceHeading: 'Keep the Persian alphabet visible while you practice right-to-left.',
    referenceDescription:
      'Farsi uses the Arabic script plus Persian letters like پ, چ, ژ, and گ. Keeping the full set nearby makes the typing drill easier to trust.',
    referenceContent: (
      <ScriptReferenceCard
        direction="rtl"
        lang="fa"
        rows={[
          ['ا', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ'],
          ['د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض'],
          ['ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل'],
          ['م', 'ن', 'و', 'ه', 'ی'],
        ]}
      />
    ),
  },
];

function ScriptReferenceCard({
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
      </div>
    </div>
  );
}

export default function LanguageWorkspace() {
  const [activeLanguage, setActiveLanguage] = useState<StudyLanguage>('hebrew');
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
              onClick={() => setActiveLanguage(option.value)}
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
          <TrainerTabs language={activeLanguage} />
        </section>

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
      </div>
    </div>
  );
}
