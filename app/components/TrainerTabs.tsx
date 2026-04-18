'use client';

import { type ComponentProps, useEffect, useState } from 'react';

import HebrewLetterTrainer from './HebrewLetterTrainer';
import KoreanLetterTrainer from './KoreanLetterTrainer';
import TypingTrainer from './TypingTrainer';

export type StudyLanguage = 'hebrew' | 'korean' | 'russian' | 'greek' | 'arabic' | 'farsi';
type TypingLanguage = ComponentProps<typeof TypingTrainer>['language'];

type TabValue = 'typing' | 'sounds';

const tabsByLanguage: Record<
  StudyLanguage,
  { value: TabValue; label: string; description: string }[]
> = {
  hebrew: [
    {
      value: 'typing',
      label: 'Typing',
      description: 'Type generated Hebrew prompts and track your pace and accuracy.',
    },
    {
      value: 'sounds',
      label: 'Hebrew Sounds',
      description: 'Match each letter to its common sound and build instant recall.',
    },
  ],
  korean: [
    {
      value: 'sounds',
      label: 'Korean Sounds',
      description: 'Match Hangul letters to their common sounds and build instant recall.',
    },
  ],
  russian: [
    {
      value: 'typing',
      label: 'Typing',
      description: 'Type generated Russian prompts in Cyrillic and track your pace and accuracy.',
    },
  ],
  greek: [
    {
      value: 'typing',
      label: 'Typing',
      description: 'Type generated Greek prompts and build confidence with the modern Greek alphabet.',
    },
  ],
  arabic: [
    {
      value: 'typing',
      label: 'Typing',
      description: 'Type generated Arabic prompts right-to-left and practice steady script recognition.',
    },
  ],
  farsi: [
    {
      value: 'typing',
      label: 'Typing',
      description: 'Type generated Farsi prompts right-to-left and get comfortable with Persian letterforms.',
    },
  ],
};

const isTypingLanguage = (language: StudyLanguage): language is TypingLanguage => language !== 'korean';

export default function TrainerTabs({ language }: { language: StudyLanguage }) {
  const tabs = tabsByLanguage[language];
  const [activeTab, setActiveTab] = useState<TabValue>(tabs[0].value);
  const activeTabDetails = tabs.find(tab => tab.value === activeTab) ?? tabs[0];

  useEffect(() => {
    setActiveTab(tabs[0].value);
  }, [language, tabs]);

  const renderContent = (value: TabValue) => {
    if (value === 'typing' && isTypingLanguage(language)) {
      return <TypingTrainer language={language} />;
    }

    if (language === 'hebrew') {
      return <HebrewLetterTrainer />;
    }

    return <KoreanLetterTrainer />;
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {tabs.length > 1 ? (
        <nav
          className="flex gap-6 overflow-x-auto border-b border-[var(--border)]"
          role="tablist"
          aria-label={`${language} trainer exercises`}
        >
          {tabs.map(tab => {
            const isActive = tab.value === activeTab;

            return (
              <button
                key={tab.value}
                type="button"
                className={`border-b-2 pb-4 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-zinc-950 text-zinc-950'
                    : 'border-transparent text-zinc-500 hover:text-zinc-950'
                }`}
                onClick={() => setActiveTab(tab.value)}
                aria-selected={isActive}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                id={`trainer-tab-${language}-${tab.value}`}
                aria-controls={`trainer-tabpanel-${language}-${tab.value}`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      ) : null}

      <div className="max-w-2xl">
        <p className="text-sm leading-7 text-zinc-600">{activeTabDetails.description}</p>
      </div>

      <div
        role="tabpanel"
        id={`trainer-tabpanel-${language}-${activeTab}`}
        aria-labelledby={`trainer-tab-${language}-${activeTab}`}
      >
        {renderContent(activeTab)}
      </div>
    </div>
  );
}
