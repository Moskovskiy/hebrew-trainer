'use client';

import HebrewLetterTrainer from './HebrewLetterTrainer';
import KoreanLetterTrainer from './KoreanLetterTrainer';
import SoundTrainer from './SoundTrainer';
import TypingTrainer from './TypingTrainer';
import { arabicLetters, ethiopianLetters, farsiLetters, greekLetters, myanmarLetters, russianLetters } from '../data/scriptLetters';

export type StudyLanguage = 'hebrew' | 'korean' | 'russian' | 'ethiopian' | 'greek' | 'arabic' | 'farsi' | 'myanmar';

export type TabValue = 'typing' | 'letters';

export const tabsByLanguage: Record<
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
      label: 'Sound Practice',
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
      label: 'Sound Practice',
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
      label: 'Sound Practice',
      description: 'Match Russian Cyrillic letters to their common pronunciations.',
    },
  ],
  ethiopian: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Ethiopian prompts with a mnemonic Ethiopic keyboard layout.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match common Ethiopic letters to their usual sounds.',
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
      label: 'Sound Practice',
      description: 'Match Greek letters to their common pronunciations and reinforce quick recall.',
    },
  ],
  myanmar: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Myanmar prompts and practice on the standard Burmese keyboard layout.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match common Myanmar letters to their usual sounds and build script recall.',
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
      label: 'Sound Practice',
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
      label: 'Sound Practice',
      description: 'Match Persian letters to their common sounds, including the characters unique to Farsi.',
    },
  ],
};

export default function TrainerTabs({
  language,
  activeTab,
}: {
  language: StudyLanguage;
  activeTab: TabValue;
}) {
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
      ethiopian: {
        entries: ethiopianLetters,
        promptLabel: 'Ethiopian letter',
        instructionText:
          'Choose the sound that best matches the Ethiopian letter. The next card appears automatically.',
      },
      greek: {
        entries: greekLetters,
        promptLabel: 'Greek letter',
        instructionText:
          'Choose the sound that best matches the Greek letter. The next card appears automatically.',
      },
      myanmar: {
        entries: myanmarLetters,
        promptLabel: 'Myanmar letter',
        instructionText:
          'Choose the sound that best matches the Myanmar letter. The next card appears automatically.',
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
    <div className="flex w-full flex-col">
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
