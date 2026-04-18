'use client';

import { useEffect } from 'react';

import HebrewLetterTrainer from './HebrewLetterTrainer';
import KoreanLetterTrainer from './KoreanLetterTrainer';
import SoundTrainer from './SoundTrainer';
import TypingTrainer from './TypingTrainer';
import { arabicLetters, farsiLetters, greekLetters, russianLetters } from '../data/scriptLetters';

export type StudyLanguage = 'hebrew' | 'korean' | 'russian' | 'greek' | 'arabic' | 'farsi';

export type TabValue = 'typing' | 'letters';

const tabsByLanguage: Record<
  StudyLanguage,
  { value: TabValue; label: string; description: string }[]
> = {
  hebrew: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Hebrew prompts and track your pace and accuracy.',
    },
    {
      value: 'letters',
      label: 'Letter Practice',
      description: 'Match each Hebrew letter to its common sound and build instant recall.',
    },
  ],
  korean: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Korean prompts and build comfort with Hangul keyboard flow.',
    },
    {
      value: 'letters',
      label: 'Letter Practice',
      description: 'Match each Hangul letter to its common sound and build instant recall.',
    },
  ],
  russian: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Russian prompts in Cyrillic and track your pace and accuracy.',
    },
    {
      value: 'letters',
      label: 'Letter Practice',
      description: 'Match Russian Cyrillic letters to their common pronunciations.',
    },
  ],
  greek: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Greek prompts and build confidence with the modern Greek alphabet.',
    },
    {
      value: 'letters',
      label: 'Letter Practice',
      description: 'Match Greek letters to their common pronunciations and reinforce quick recall.',
    },
  ],
  arabic: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Arabic prompts right-to-left and practice steady script recognition.',
    },
    {
      value: 'letters',
      label: 'Letter Practice',
      description: 'Match Arabic letters to their common sounds while staying oriented in right-to-left script.',
    },
  ],
  farsi: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Farsi prompts right-to-left and get comfortable with Persian letterforms.',
    },
    {
      value: 'letters',
      label: 'Letter Practice',
      description: 'Match Persian letters to their common sounds, including the characters unique to Farsi.',
    },
  ],
};

export default function TrainerTabs({
  language,
  activeTab,
  onTabChange,
}: {
  language: StudyLanguage;
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
}) {
  const tabs = tabsByLanguage[language];
  const activeTabDetails = tabs.find(tab => tab.value === activeTab) ?? tabs[0];

  useEffect(() => {
    if (!tabs.some(tab => tab.value === activeTab)) {
      onTabChange(tabs[0].value);
    }
  }, [activeTab, onTabChange, tabs]);

  const renderContent = (value: TabValue) => {
    if (value === 'typing') {
      return <TypingTrainer language={language} />;
    }

    if (language === 'hebrew') {
      return <HebrewLetterTrainer />;
    }

    if (language === 'korean') {
      return <KoreanLetterTrainer />;
    }

    const letterPracticeByLanguage = {
      russian: {
        entries: russianLetters,
        promptLabel: 'Russian letter',
        instructionText:
          'Choose the sound that best matches the Russian letter. The next card appears automatically.',
      },
      greek: {
        entries: greekLetters,
        promptLabel: 'Greek letter',
        instructionText:
          'Choose the sound that best matches the Greek letter. The next card appears automatically.',
      },
      arabic: {
        entries: arabicLetters,
        promptLabel: 'Arabic letter',
        instructionText:
          'Choose the sound that best matches the Arabic letter. The next card appears automatically.',
      },
      farsi: {
        entries: farsiLetters,
        promptLabel: 'Farsi letter',
        instructionText:
          'Choose the sound that best matches the Farsi letter. The next card appears automatically.',
      },
    } satisfies Record<
      Exclude<StudyLanguage, 'hebrew' | 'korean'>,
      {
        entries: { symbol: string; sounds: string[] }[];
        promptLabel: string;
        instructionText: string;
      }
    >;

    const practiceConfig = letterPracticeByLanguage[language];

    return (
      <SoundTrainer
        entries={practiceConfig.entries}
        promptLabel={practiceConfig.promptLabel}
        instructionText={practiceConfig.instructionText}
      />
    );
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
                onClick={() => onTabChange(tab.value)}
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
