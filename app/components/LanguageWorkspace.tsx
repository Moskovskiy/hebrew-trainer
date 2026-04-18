'use client';

import { useState } from 'react';

import TrainerTabs, { StudyLanguage } from './TrainerTabs';
import HebrewKeyboardLayout from './HebrewKeyboardLayout';
import KoreanKeyboardLayout from './KoreanKeyboardLayout';

const languageOptions: {
  value: StudyLanguage;
  label: string;
  keyboardHeading: string;
  keyboardDescription: string;
}[] = [
  {
    value: 'hebrew',
    label: 'Hebrew',
    keyboardHeading: 'Keep the Hebrew keyboard visible while you practice.',
    keyboardDescription:
      'A quick reference for the standard Hebrew letter positions, so you can glance down and stay in the flow while typing.',
  },
  {
    value: 'korean',
    label: 'Korean',
    keyboardHeading: 'Keep the Korean keyboard visible while you practice.',
    keyboardDescription:
      'A quick reference for the standard Korean 2-set layout, so you can check Hangul key positions while working through the sounds drill.',
  },
];

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
              Keyboard layout
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-zinc-950 sm:text-3xl">
              {activeOption.keyboardHeading}
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              {activeOption.keyboardDescription}
            </p>
          </div>

          <div className="mt-8">
            {activeLanguage === 'hebrew' ? <HebrewKeyboardLayout /> : <KoreanKeyboardLayout />}
          </div>
        </section>
      </div>
    </div>
  );
}
