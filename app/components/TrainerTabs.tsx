'use client';

import HebrewWordTrainer from './HebrewWordTrainer';
import HebrewLetterTrainer from './HebrewLetterTrainer';
import KoreanLetterTrainer from './KoreanLetterTrainer';
import SoundTrainer from './SoundTrainer';
import TypingTrainer from './TypingTrainer';
import {
  arabicLetters,
  armenianLetters,
  chineseCharacters,
  devanagariLetters,
  ethiopianLetters,
  farsiLetters,
  georgianLetters,
  greekLetters,
  gujaratiLetters,
  japaneseKana,
  khmerLetters,
  myanmarLetters,
  russianLetters,
  thaiLetters,
  tibetanLetters,
  urduLetters,
} from '../data/scriptLetters';

export type StudyLanguage =
  | 'hebrew'
  | 'chinese'
  | 'japanese'
  | 'korean'
  | 'russian'
  | 'ethiopian'
  | 'greek'
  | 'thai'
  | 'armenian'
  | 'georgian'
  | 'gujarati'
  | 'khmer'
  | 'sanskrit'
  | 'tibetan'
  | 'urdu'
  | 'marathi'
  | 'arabic'
  | 'farsi'
  | 'myanmar';

export type TabValue = 'typing' | 'letters' | 'words';

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
      value: 'words',
      label: 'Word Practice',
      description: 'Match common Hebrew words to their English meanings and build everyday vocabulary.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match each Hebrew letter to its common sound and build instant recall.',
    },
  ],
  chinese: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Chinese prompts with your IME and build steady character recall.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match common Chinese characters to their usual pronunciations.',
    },
  ],
  japanese: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Japanese prompts with your IME and stay comfortable across kana and kanji.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match core Japanese kana to their usual sounds.',
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
  thai: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Thai prompts and build comfort with the Thai script.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match common Thai letters to their usual sounds.',
    },
  ],
  armenian: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Armenian prompts and reinforce the Armenian alphabet.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Armenian letters to their usual sounds.',
    },
  ],
  georgian: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Georgian prompts and build confidence with Mkhedruli script.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Georgian letters to their usual sounds.',
    },
  ],
  gujarati: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Gujarati prompts and practice steady Gujarati script recognition.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Gujarati letters to their usual sounds.',
    },
  ],
  khmer: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Khmer prompts and get comfortable with Khmer script flow.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Khmer letters to their usual sounds.',
    },
  ],
  sanskrit: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Sanskrit prompts and practice Devanagari script recall.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Devanagari letters used in Sanskrit to their usual sounds.',
    },
  ],
  tibetan: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Tibetan prompts and practice Tibetan script recognition.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match common Tibetan letters to their usual sounds.',
    },
  ],
  urdu: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Urdu prompts right-to-left and get comfortable with Urdu letterforms.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Urdu letters to their usual names and sounds.',
    },
  ],
  marathi: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Marathi prompts and reinforce Devanagari typing flow.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Marathi Devanagari letters to their usual sounds.',
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

    if (value === 'words' && language === 'hebrew') {
      return <HebrewWordTrainer />;
    }

    if (language === 'hebrew') {
      return <HebrewLetterTrainer />;
    }

    if (language === 'korean') {
      return <KoreanLetterTrainer />;
    }

    const letterPracticeByLanguage = {
      chinese: {
        entries: chineseCharacters,
        promptLabel: 'Chinese character',
        instructionText:
          'Choose the sound that best matches the Chinese character. The next card appears automatically.',
      },
      japanese: {
        entries: japaneseKana,
        promptLabel: 'Japanese kana',
        instructionText:
          'Choose the sound that best matches the Japanese kana. The next card appears automatically.',
      },
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
      thai: {
        entries: thaiLetters,
        promptLabel: 'Thai letter',
        instructionText:
          'Choose the sound that best matches the Thai letter. The next card appears automatically.',
      },
      armenian: {
        entries: armenianLetters,
        promptLabel: 'Armenian letter',
        instructionText:
          'Choose the sound that best matches the Armenian letter. The next card appears automatically.',
      },
      georgian: {
        entries: georgianLetters,
        promptLabel: 'Georgian letter',
        instructionText:
          'Choose the sound that best matches the Georgian letter. The next card appears automatically.',
      },
      gujarati: {
        entries: gujaratiLetters,
        promptLabel: 'Gujarati letter',
        instructionText:
          'Choose the sound that best matches the Gujarati letter. The next card appears automatically.',
      },
      khmer: {
        entries: khmerLetters,
        promptLabel: 'Khmer letter',
        instructionText:
          'Choose the sound that best matches the Khmer letter. The next card appears automatically.',
      },
      sanskrit: {
        entries: devanagariLetters,
        promptLabel: 'Sanskrit letter',
        instructionText:
          'Choose the sound that best matches the Sanskrit letter. The next card appears automatically.',
      },
      tibetan: {
        entries: tibetanLetters,
        promptLabel: 'Tibetan letter',
        instructionText:
          'Choose the sound that best matches the Tibetan letter. The next card appears automatically.',
      },
      urdu: {
        entries: urduLetters,
        promptLabel: 'Urdu letter',
        instructionText:
          'Choose the sound that best matches the Urdu letter. The next card appears automatically.',
      },
      marathi: {
        entries: devanagariLetters,
        promptLabel: 'Marathi letter',
        instructionText:
          'Choose the sound that best matches the Marathi letter. The next card appears automatically.',
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
