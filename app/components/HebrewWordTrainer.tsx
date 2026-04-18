'use client';

import { useEffect, useState } from 'react';

import { hebrewCommonWords } from '../data/hebrewWords';

type Score = {
  correct: number;
  incorrect: number;
};

const INITIAL_SCORE: Score = { correct: 0, incorrect: 0 };

const pickRandomIndex = (length: number, exclude?: number) => {
  let nextIndex = Math.floor(Math.random() * length);

  if (typeof exclude === 'number' && length > 1) {
    while (nextIndex === exclude) {
      nextIndex = Math.floor(Math.random() * length);
    }
  }

  return nextIndex;
};

const buildOptionSet = (currentIndex: number) => {
  const options = new Set<string>();
  options.add(hebrewCommonWords[currentIndex].translation);

  while (options.size < 4) {
    const randomIndex = Math.floor(Math.random() * hebrewCommonWords.length);
    options.add(hebrewCommonWords[randomIndex].translation);
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
};

export default function HebrewWordTrainer() {
  const [score, setScore] = useState<Score>(INITIAL_SCORE);
  const [currentIndex, setCurrentIndex] = useState(() => pickRandomIndex(hebrewCommonWords.length));
  const [options, setOptions] = useState(() => buildOptionSet(currentIndex));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentWord = hebrewCommonWords[currentIndex];
  const totalAnswers = score.correct + score.incorrect;
  const accuracy = totalAnswers > 0 ? Math.round((score.correct / totalAnswers) * 100) : null;

  useEffect(() => {
    setOptions(buildOptionSet(currentIndex));
    setSelectedOption(null);
  }, [currentIndex]);

  useEffect(() => {
    if (!selectedOption) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCurrentIndex(previous => pickRandomIndex(hebrewCommonWords.length, previous));
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [selectedOption]);

  const handleOptionClick = (option: string) => {
    if (selectedOption) {
      return;
    }

    const isCorrect = option === currentWord.translation;

    setSelectedOption(option);
    setScore(previous => ({
      correct: previous.correct + (isCorrect ? 1 : 0),
      incorrect: previous.incorrect + (isCorrect ? 0 : 1),
    }));
  };

  const goToNextWord = () => {
    setCurrentIndex(previous => pickRandomIndex(hebrewCommonWords.length, previous));
  };

  const getOptionClassName = (option: string) => {
    const baseStyles =
      'flex min-h-[4.5rem] items-center justify-center border px-4 py-4 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:text-base';

    if (!selectedOption) {
      return `${baseStyles} border-[var(--border)] text-zinc-700 hover:border-zinc-950 hover:text-zinc-950`;
    }

    if (option === currentWord.translation) {
      return `${baseStyles} border-zinc-950 bg-zinc-950 text-white`;
    }

    if (option === selectedOption) {
      return `${baseStyles} border-zinc-950 text-zinc-400`;
    }

    return `${baseStyles} border-[var(--border)] text-zinc-400`;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <section className="p-6 sm:p-8">
        <div className="flex flex-col gap-6">
          <div
            dir="rtl"
            lang="he"
            className="min-h-[8rem] border border-[var(--border)] p-8 text-center"
            aria-label={`Hebrew word ${currentWord.word}`}
          >
            <div className="text-[3.75rem] font-medium leading-none text-zinc-950 sm:text-[5rem]">
              {currentWord.word}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {options.map(option => (
              <button
                key={option}
                type="button"
                className={getOptionClassName(option)}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-4 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
            <p>Choose the English translation that matches the Hebrew word. The next card appears automatically.</p>
            <button
              type="button"
              onClick={goToNextWord}
              className="inline-flex items-center justify-center border border-zinc-950 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            >
              Skip
            </button>
          </div>
        </div>
      </section>

      <aside className="border-t border-[var(--border)] p-5 lg:border-l lg:border-t-0 lg:pl-6">
        <div className="space-y-5 text-sm">
          <div>
            <p className="text-zinc-500">Words</p>
            <p className="mt-1 text-2xl font-medium text-zinc-950">{hebrewCommonWords.length}</p>
          </div>
          <div>
            <p className="text-zinc-500">Correct</p>
            <p className="mt-1 text-2xl font-medium text-zinc-950">{score.correct}</p>
          </div>
          <div>
            <p className="text-zinc-500">Incorrect</p>
            <p className="mt-1 text-2xl font-medium text-zinc-950">{score.incorrect}</p>
          </div>
          <div>
            <p className="text-zinc-500">Accuracy</p>
            <p className="mt-1 text-2xl font-medium text-zinc-950">
              {accuracy !== null ? `${accuracy}%` : '—'}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
