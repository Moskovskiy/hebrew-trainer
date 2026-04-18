'use client';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { cherokeePracticePrompts } from '../data/cherokee';
import { copticPracticePrompts } from '../data/coptic';
import { emojiPracticePrompts } from '../data/emoji';
import { javanesePracticePrompts } from '../data/javanese';
import { hiraganaPracticePrompts, katakanaPracticePrompts } from '../data/japaneseKana';
import { maldivianPracticePrompts } from '../data/maldivian';
import { osagePracticePrompts } from '../data/osage';
import { qaniujaaqpaitPracticePrompts } from '../data/qaniujaaqpait';
import { type Language, randomSentence } from '../data/dictionaries';
import { VIRTUAL_BACKSPACE_KEY } from './VirtualKeyboardContext';

type TypingLanguage =
  | Extract<
      Language,
      | 'english'
      | 'hebrew'
      | 'chinese'
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
      | 'myanmar'
    >
  | 'cherokee'
  | 'osage'
  | 'emoji'
  | 'coptic'
  | 'qaniujaaqpait'
  | 'javanese'
  | 'maldivian'
  | 'hiragana'
  | 'katakana';

const segmentText = (text: string) => {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return Array.from(text);
};

const typingLanguageConfig: Record<
  TypingLanguage,
  {
    label: string;
    direction: 'ltr' | 'rtl';
    htmlLang: string;
  }
> = {
  english: {
    label: 'English',
    direction: 'ltr',
    htmlLang: 'en',
  },
  hebrew: {
    label: 'Hebrew',
    direction: 'rtl',
    htmlLang: 'he',
  },
  chinese: {
    label: 'Chinese',
    direction: 'ltr',
    htmlLang: 'zh-Hans',
  },
  hiragana: {
    label: 'Hiragana',
    direction: 'ltr',
    htmlLang: 'ja',
  },
  katakana: {
    label: 'Katakana',
    direction: 'ltr',
    htmlLang: 'ja',
  },
  russian: {
    label: 'Russian',
    direction: 'ltr',
    htmlLang: 'ru',
  },
  korean: {
    label: 'Korean',
    direction: 'ltr',
    htmlLang: 'ko',
  },
  ethiopian: {
    label: 'Ethiopian',
    direction: 'ltr',
    htmlLang: 'am',
  },
  greek: {
    label: 'Greek',
    direction: 'ltr',
    htmlLang: 'el',
  },
  thai: {
    label: 'Thai',
    direction: 'ltr',
    htmlLang: 'th',
  },
  armenian: {
    label: 'Armenian',
    direction: 'ltr',
    htmlLang: 'hy',
  },
  georgian: {
    label: 'Georgian',
    direction: 'ltr',
    htmlLang: 'ka',
  },
  gujarati: {
    label: 'Gujarati',
    direction: 'ltr',
    htmlLang: 'gu',
  },
  javanese: {
    label: 'Javanese',
    direction: 'ltr',
    htmlLang: 'jv',
  },
  maldivian: {
    label: 'Maldivian',
    direction: 'rtl',
    htmlLang: 'dv',
  },
  khmer: {
    label: 'Khmer',
    direction: 'ltr',
    htmlLang: 'km',
  },
  sanskrit: {
    label: 'Sanskrit',
    direction: 'ltr',
    htmlLang: 'sa',
  },
  tibetan: {
    label: 'Tibetan',
    direction: 'ltr',
    htmlLang: 'bo',
  },
  urdu: {
    label: 'Urdu',
    direction: 'rtl',
    htmlLang: 'ur',
  },
  marathi: {
    label: 'Marathi',
    direction: 'ltr',
    htmlLang: 'mr',
  },
  myanmar: {
    label: 'Myanmar',
    direction: 'ltr',
    htmlLang: 'my',
  },
  arabic: {
    label: 'Arabic',
    direction: 'rtl',
    htmlLang: 'ar',
  },
  farsi: {
    label: 'Farsi',
    direction: 'rtl',
    htmlLang: 'fa',
  },
  cherokee: {
    label: 'Cherokee',
    direction: 'ltr',
    htmlLang: 'chr',
  },
  osage: {
    label: 'Osage',
    direction: 'ltr',
    htmlLang: 'osa',
  },
  emoji: {
    label: 'Emojis',
    direction: 'ltr',
    htmlLang: 'en',
  },
  coptic: {
    label: 'Coptic',
    direction: 'ltr',
    htmlLang: 'cop',
  },
  qaniujaaqpait: {
    label: 'Qaniujaaqpait',
    direction: 'ltr',
    htmlLang: 'iu',
  },
};

const normalizePromptForTyping = (language: TypingLanguage, prompt: string) => {
  const withoutArabicDiacritics = prompt.replace(/[\u064b-\u065f\u0670]/g, '');
  const withoutHalfSpaces =
    language === 'farsi' ? withoutArabicDiacritics.replace(/\u200c/g, ' ') : withoutArabicDiacritics;

  return withoutHalfSpaces.replace(/\s+/g, ' ').trim();
};

const pickRandomPrompt = <T,>(prompts: readonly T[]) =>
  prompts[Math.floor(Math.random() * prompts.length)];

function RefreshIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 fill-none stroke-current stroke-[1.9]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-3.15-6.86" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

const createPrompt = (language: TypingLanguage) => {
  if (language === 'cherokee') {
    return pickRandomPrompt(cherokeePracticePrompts);
  }

  if (language === 'osage') {
    return pickRandomPrompt(osagePracticePrompts);
  }

  if (language === 'emoji') {
    return pickRandomPrompt(emojiPracticePrompts);
  }

  if (language === 'coptic') {
    return pickRandomPrompt(copticPracticePrompts);
  }

  if (language === 'qaniujaaqpait') {
    return pickRandomPrompt(qaniujaaqpaitPracticePrompts);
  }

  if (language === 'hiragana') {
    return pickRandomPrompt(hiraganaPracticePrompts);
  }

  if (language === 'katakana') {
    return pickRandomPrompt(katakanaPracticePrompts);
  }

  if (language === 'javanese') {
    return pickRandomPrompt(javanesePracticePrompts);
  }

  if (language === 'maldivian') {
    return pickRandomPrompt(maldivianPracticePrompts);
  }

  return normalizePromptForTyping(language, randomSentence(language));
};

export default function TypingTrainer({
  language,
  onStatsChange,
  onVirtualKeyHandlerChange,
}: {
  language: TypingLanguage;
  onStatsChange?: (stats: { label: string; value: string | number }[]) => void;
  onVirtualKeyHandlerChange?: (handler: ((key: string) => void) | null) => void;
}) {
  const languageConfig = typingLanguageConfig[language];
  const inputRef = useRef<HTMLInputElement>(null);
  const [promptKey, setPromptKey] = useState(0);
  const [prompt, setPrompt] = useState(() => createPrompt(language));
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [completedPrompts, setCompletedPrompts] = useState(0);
  const [lastSpeed, setLastSpeed] = useState<number | null>(null);
  const [lastAccuracy, setLastAccuracy] = useState<number | null>(null);
  const promptUnits = segmentText(prompt);
  const inputUnits = segmentText(input);

  useEffect(() => {
    setPrompt(createPrompt(language));
    setInput('');
    setStartTime(null);
    setMistakes(0);
  }, [language, promptKey]);

  useEffect(() => {
    setCompletedPrompts(0);
    setLastSpeed(null);
    setLastAccuracy(null);
  }, [language]);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [language]);

  useEffect(() => {
    onStatsChange?.([
      { label: 'Completed', value: completedPrompts },
      { label: 'Mistakes', value: mistakes },
      { label: 'Speed', value: lastSpeed ? `${lastSpeed.toFixed(1)}/s` : '—' },
      { label: 'Accuracy', value: lastAccuracy !== null ? `${Math.round(lastAccuracy)}%` : '—' },
    ]);
  }, [completedPrompts, lastAccuracy, lastSpeed, mistakes, onStatsChange]);

  const moveToNextPrompt = () => {
    setPromptKey(current => current + 1);
  };

  const applyInputValue = (nextValue: string) => {
    const nextUnits = segmentText(nextValue);

    if (startTime === null && nextUnits.length > 0) {
      setStartTime(Date.now());
    }

    if (nextUnits.length > inputUnits.length) {
      let nextMistakes = 0;

      for (let nextIndex = inputUnits.length; nextIndex < nextUnits.length; nextIndex += 1) {
        if (nextIndex >= promptUnits.length || nextUnits[nextIndex] !== promptUnits[nextIndex]) {
          nextMistakes += 1;
        }
      }

      if (nextMistakes > 0) {
        setMistakes(current => current + nextMistakes);
      }
    }

    setInput(nextValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    applyInputValue(event.target.value);
  };

  useEffect(() => {
    const handleVirtualKeyPress = (key: string | null | undefined) => {
      if (!key) {
        return;
      }

      const inputElement = inputRef.current;
      const selectionStart = inputElement?.selectionStart ?? input.length;
      const selectionEnd = inputElement?.selectionEnd ?? input.length;
      const hasSelection = selectionStart !== selectionEnd;
      const isBackspace = key === VIRTUAL_BACKSPACE_KEY;
      const deleteStart =
        isBackspace && !hasSelection ? Math.max(selectionStart - 1, 0) : selectionStart;
      const nextValue = isBackspace
        ? `${input.slice(0, deleteStart)}${input.slice(selectionEnd)}`
        : `${input.slice(0, selectionStart)}${key}${input.slice(selectionEnd)}`;
      const nextCursorPosition = isBackspace ? deleteStart : selectionStart + key.length;

      applyInputValue(nextValue);

      window.requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(nextCursorPosition, nextCursorPosition);
      });
    };

    onVirtualKeyHandlerChange?.(handleVirtualKeyPress);

    return () => {
      onVirtualKeyHandlerChange?.(null);
    };
  }, [input, onVirtualKeyHandlerChange, startTime, inputUnits.length, promptUnits]);

  useEffect(() => {
    if (input !== prompt || !startTime) {
      return;
    }

    const seconds = Math.max((Date.now() - startTime) / 1000, 0.1);
    const accuracy = Math.max(((promptUnits.length - mistakes) / promptUnits.length) * 100, 0);

    setLastSpeed(promptUnits.length / seconds);
    setLastAccuracy(accuracy);
    setCompletedPrompts(current => current + 1);

    const timeout = window.setTimeout(() => {
      setPromptKey(current => current + 1);
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [input, prompt, promptUnits.length, startTime, mistakes]);

  const getCharClass = (char: string, idx: number) => {
    if (idx < inputUnits.length) {
      return inputUnits[idx] === char ? 'text-zinc-950' : 'text-red-600';
    }

    if (idx === inputUnits.length) {
      return 'border-b border-zinc-950 text-zinc-950';
    }

    return 'text-zinc-400';
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="p-4 sm:p-6">
        <div className="flex flex-col gap-3">
          <div
            dir={languageConfig.direction}
            lang={languageConfig.htmlLang}
            className={`min-h-[6.5rem] px-5 py-5 text-[1.65rem] leading-loose tracking-[0.03em] text-zinc-950 sm:px-6 sm:py-6 sm:text-3xl ${
              languageConfig.direction === 'rtl' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`flex items-start gap-3 ${
                languageConfig.direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <button
                type="button"
                onClick={moveToNextPrompt}
                className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
                aria-label="Load a new prompt"
                title="New prompt"
              >
                <RefreshIcon />
              </button>

              <div className="min-w-0 flex-1">
                {promptUnits.map((char, idx) => (
                  <span key={idx} className={getCharClass(char, idx)}>
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <label>
            <input
              ref={inputRef}
              type="text"
              dir={languageConfig.direction}
              lang={languageConfig.htmlLang}
              autoFocus
              value={input}
              onChange={handleChange}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className={`min-h-[80px] w-full rounded-2xl bg-zinc-100 px-4 py-3.5 text-xl text-zinc-950 outline-none transition focus:bg-zinc-200 sm:py-4 ${
                languageConfig.direction === 'rtl' ? 'text-right' : 'text-left'
              }`}
              aria-label={`Type the ${languageConfig.label} prompt`}
            />
          </label>
        </div>
      </section>

      <aside className="border-t border-[var(--border)] p-4 lg:hidden">
        <div className="space-y-4 text-sm">
          <div>
            <p className="text-zinc-500">Completed</p>
            <p className="mt-1 text-2xl font-medium text-zinc-950">{completedPrompts}</p>
          </div>
          <div>
            <p className="text-zinc-500">Current mistakes</p>
            <p className="mt-1 text-2xl font-medium text-zinc-950">{mistakes}</p>
          </div>
          <div>
            <p className="text-zinc-500">Last speed</p>
            <p className="mt-1 text-2xl font-medium text-zinc-950">
              {lastSpeed ? `${lastSpeed.toFixed(1)}/s` : '—'}
            </p>
          </div>
          <div>
            <p className="text-zinc-500">Last accuracy</p>
            <p className="mt-1 text-2xl font-medium text-zinc-950">
              {lastAccuracy !== null ? `${Math.round(lastAccuracy)}%` : '—'}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
