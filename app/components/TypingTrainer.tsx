'use client';
import { ChangeEvent, useEffect, useState } from 'react';

import { type Language, randomSentence } from '../data/dictionaries';

type TypingLanguage =
  Extract<
    Language,
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
    | 'myanmar'
  >;

const typingLanguageConfig: Record<
  TypingLanguage,
  {
    label: string;
    direction: 'ltr' | 'rtl';
    htmlLang: string;
  }
> = {
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
  japanese: {
    label: 'Japanese',
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
};

const normalizePromptForTyping = (language: TypingLanguage, prompt: string) => {
  const withoutArabicDiacritics = prompt.replace(/[\u064b-\u065f\u0670]/g, '');
  const withoutHalfSpaces =
    language === 'farsi' ? withoutArabicDiacritics.replace(/\u200c/g, ' ') : withoutArabicDiacritics;

  return withoutHalfSpaces.replace(/\s+/g, ' ').trim();
};

const createPrompt = (language: TypingLanguage) =>
  normalizePromptForTyping(language, randomSentence(language));

export default function TypingTrainer({ language }: { language: TypingLanguage }) {
  const languageConfig = typingLanguageConfig[language];
  const [promptKey, setPromptKey] = useState(0);
  const [prompt, setPrompt] = useState(() => createPrompt(language));
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [completedPrompts, setCompletedPrompts] = useState(0);
  const [lastSpeed, setLastSpeed] = useState<number | null>(null);
  const [lastAccuracy, setLastAccuracy] = useState<number | null>(null);

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

  const moveToNextPrompt = () => {
    setPromptKey(current => current + 1);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    if (startTime === null && nextValue.length === 1) {
      setStartTime(Date.now());
    }

    if (nextValue.length > input.length) {
      const nextIndex = nextValue.length - 1;
      const nextCharacter = nextValue[nextIndex];

      if (nextIndex >= prompt.length || nextCharacter !== prompt[nextIndex]) {
        setMistakes(current => current + 1);
      }
    }

    setInput(nextValue);
  };

  useEffect(() => {
    if (input !== prompt || !startTime) {
      return;
    }

    const seconds = Math.max((Date.now() - startTime) / 1000, 0.1);
    const accuracy = Math.max(((prompt.length - mistakes) / prompt.length) * 100, 0);

    setLastSpeed(prompt.length / seconds);
    setLastAccuracy(accuracy);
    setCompletedPrompts(current => current + 1);

    const timeout = window.setTimeout(() => {
      setPromptKey(current => current + 1);
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [input, prompt, startTime, mistakes]);

  const getCharClass = (char: string, idx: number) => {
    if (idx < input.length) {
      return input[idx] === char ? 'text-zinc-950' : 'text-zinc-400 underline';
    }

    if (idx === input.length) {
      return 'border-b border-zinc-950 text-zinc-950';
    }

    return 'text-zinc-400';
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <section className="p-6 sm:p-8">
        <div className="flex flex-col gap-6">
          <div
            dir={languageConfig.direction}
            lang={languageConfig.htmlLang}
            className={`min-h-[7rem] border border-[var(--border)] p-6 text-2xl leading-loose tracking-[0.03em] text-zinc-950 sm:text-3xl ${
              languageConfig.direction === 'rtl' ? 'text-right' : 'text-left'
            }`}
          >
            {prompt.split('').map((char, idx) => (
              <span key={idx} className={getCharClass(char, idx)}>
                {char}
              </span>
            ))}
          </div>

          <label>
            <input
              type="text"
              dir={languageConfig.direction}
              lang={languageConfig.htmlLang}
              autoFocus
              value={input}
              onChange={handleChange}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className={`w-full border border-[var(--border)] bg-transparent px-4 py-4 text-xl text-zinc-950 outline-none transition focus:border-zinc-950 ${
                languageConfig.direction === 'rtl' ? 'text-right' : 'text-left'
              }`}
              aria-label={`Type the ${languageConfig.label} prompt`}
            />
          </label>

          <div className="flex justify-end border-t border-[var(--border)] pt-4">
            <button
              type="button"
              onClick={moveToNextPrompt}
              className="inline-flex items-center justify-center border border-zinc-950 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            >
              New prompt
            </button>
          </div>
        </div>
      </section>

      <aside className="border-t border-[var(--border)] p-5 lg:border-l lg:border-t-0 lg:pl-6">
        <div className="space-y-5 text-sm">
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
