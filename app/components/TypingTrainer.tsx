'use client';
import { ChangeEvent, useEffect, useState } from 'react';

import { type Language, randomSentence } from '../data/dictionaries';

type TypingLanguage =
  Extract<Language, 'hebrew' | 'korean' | 'russian' | 'greek' | 'arabic' | 'farsi'>;

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
  greek: {
    label: 'Greek',
    direction: 'ltr',
    htmlLang: 'el',
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
      <section className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
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

          <label className="flex flex-col gap-2">
            <span className="text-[0.72rem] uppercase tracking-[0.28em] text-zinc-500">
              Your typing
            </span>
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
              className={`w-full border border-[var(--border)] bg-[var(--surface)] px-4 py-4 text-xl text-zinc-950 outline-none transition focus:border-zinc-950 ${
                languageConfig.direction === 'rtl' ? 'text-right' : 'text-left'
              }`}
              placeholder="Start typing here"
              aria-label={`Type the ${languageConfig.label} prompt`}
            />
          </label>

          <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-4 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <p>Finish the line to load the next {languageConfig.label} prompt automatically.</p>
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

      <aside className="border border-[var(--border)] bg-[var(--surface)] p-5">
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
