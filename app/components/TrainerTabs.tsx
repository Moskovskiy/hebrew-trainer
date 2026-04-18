'use client';

import { cherokeeLetters } from '../data/cherokee';
import { copticLetters } from '../data/coptic';
import { emojiEntries } from '../data/emoji';
import { javaneseLetters } from '../data/javanese';
import { hiraganaLetters, katakanaLetters } from '../data/japaneseKana';
import { maldivianLetters } from '../data/maldivian';
import { osageLetters } from '../data/osage';
import { qaniujaaqpaitEntries } from '../data/qaniujaaqpait';
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
  khmerLetters,
  myanmarLetters,
  russianLetters,
  thaiLetters,
  tibetanLetters,
  urduLetters,
} from '../data/scriptLetters';

export type StudyLanguage =
  | 'english'
  | 'hebrew'
  | 'chinese'
  | 'hiragana'
  | 'katakana'
  | 'korean'
  | 'russian'
  | 'ethiopian'
  | 'greek'
  | 'thai'
  | 'armenian'
  | 'georgian'
  | 'gujarati'
  | 'javanese'
  | 'khmer'
  | 'sanskrit'
  | 'tibetan'
  | 'urdu'
  | 'maldivian'
  | 'marathi'
  | 'arabic'
  | 'farsi'
  | 'myanmar'
  | 'cherokee'
  | 'osage'
  | 'emoji'
  | 'coptic'
  | 'qaniujaaqpait';

export type TabValue = 'typing' | 'letters' | 'words';

export const tabsByLanguage: Record<
  StudyLanguage,
  { value: TabValue; label: string; description: string }[]
> = {
  english: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated English prompts and build steady QWERTY speed and accuracy.',
    },
  ],
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
  hiragana: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Hiragana prompts and build confidence with core Japanese syllables.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Hiragana symbols to their usual sounds.',
    },
  ],
  katakana: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Katakana prompts and build confidence with core Japanese syllables.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Katakana symbols to their usual sounds.',
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
  coptic: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Coptic alphabet drills and build familiarity with Coptic letterforms.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Coptic letters to their names and build quick script recognition.',
    },
  ],
  qaniujaaqpait: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Qaniujaaqpait drills and build comfort with Inuktitut syllabics.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Qaniujaaqpait syllabics to their common sounds and finals.',
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
  javanese: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Javanese drills and build comfort with Javanese script input.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Javanese letters to their common sounds and romanized names.',
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
  maldivian: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Maldivian prompts right-to-left and build comfort with Thaana script.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Thaana letters to their common sounds and romanized forms.',
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
  cherokee: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Cherokee syllabary drills and build comfort with the Cherokee keyboard layout.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Cherokee syllabary symbols to their common sounds.',
    },
  ],
  osage: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated Osage alphabet drills and build comfort with the Osage keyboard layout.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match Osage letters to their common sounds.',
    },
  ],
  emoji: [
    {
      value: 'typing',
      label: 'Keyboard Practice',
      description: 'Type generated emoji prompts and push your speed on short visual sequences.',
    },
    {
      value: 'letters',
      label: 'Sound Practice',
      description: 'Match each emoji to its name and build instant visual recall.',
    },
  ],
};

export default function TrainerTabs({
  language,
  activeTab,
  onStatsChange,
  onVirtualKeyHandlerChange,
}: {
  language: StudyLanguage;
  activeTab: TabValue;
  onStatsChange?: (stats: { label: string; value: string | number }[]) => void;
  onVirtualKeyHandlerChange?: (handler: ((key: string) => void) | null) => void;
}) {
  const renderContent = (value: TabValue) => {
    if (value === 'typing') {
      return (
        <TypingTrainer
          language={language}
          onStatsChange={onStatsChange}
          onVirtualKeyHandlerChange={onVirtualKeyHandlerChange}
        />
      );
    }

    if (value === 'words' && language === 'hebrew') {
      return <HebrewWordTrainer onStatsChange={onStatsChange} />;
    }

    if (language === 'hebrew') {
      return <HebrewLetterTrainer onStatsChange={onStatsChange} />;
    }

    if (language === 'korean') {
      return <KoreanLetterTrainer onStatsChange={onStatsChange} />;
    }

    const letterPracticeByLanguage = {
      chinese: {
        entries: chineseCharacters,
        promptLabel: 'Chinese character',
        instructionText:
          'Choose the sound that best matches the Chinese character. The next card appears automatically.',
      },
      hiragana: {
        entries: hiraganaLetters,
        promptLabel: 'Hiragana kana',
        instructionText:
          'Choose the sound that best matches the Hiragana symbol. The next card appears automatically.',
      },
      katakana: {
        entries: katakanaLetters,
        promptLabel: 'Katakana kana',
        instructionText:
          'Choose the sound that best matches the Katakana symbol. The next card appears automatically.',
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
      javanese: {
        entries: javaneseLetters,
        promptLabel: 'Javanese letter',
        instructionText:
          'Choose the sound that best matches the Javanese letter. The next card appears automatically.',
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
      maldivian: {
        entries: maldivianLetters,
        promptLabel: 'Maldivian letter',
        instructionText:
          'Choose the sound that best matches the Thaana letter. The next card appears automatically.',
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
      cherokee: {
        entries: cherokeeLetters,
        promptLabel: 'Cherokee syllable',
        instructionText:
          'Choose the sound that best matches the Cherokee syllabary symbol. The next card appears automatically.',
      },
      osage: {
        entries: osageLetters,
        promptLabel: 'Osage letter',
        instructionText:
          'Choose the sound that best matches the Osage letter. The next card appears automatically.',
      },
      emoji: {
        entries: emojiEntries,
        promptLabel: 'Emoji',
        instructionText:
          'Choose the name that best matches the emoji. The next card appears automatically.',
      },
      coptic: {
        entries: copticLetters,
        promptLabel: 'Coptic letter',
        instructionText:
          'Choose the name that best matches the Coptic letter. The next card appears automatically.',
      },
      qaniujaaqpait: {
        entries: qaniujaaqpaitEntries,
        promptLabel: 'Qaniujaaqpait syllabic',
        instructionText:
          'Choose the sound that best matches the Qaniujaaqpait syllabic. The next card appears automatically.',
      },
    } satisfies Record<
      Exclude<StudyLanguage, 'hebrew' | 'korean' | 'english'>,
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
        onStatsChange={onStatsChange}
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
