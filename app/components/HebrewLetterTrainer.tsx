'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatSounds, hebrewLetters } from '../data/hebrewLetters';

type Score = {
  correct: number;
  incorrect: number;
};

const INITIAL_SCORE: Score = { correct: 0, incorrect: 0 };

const pickRandomIndex = (exclude?: number) => {
  let nextIndex = Math.floor(Math.random() * hebrewLetters.length);
  if (typeof exclude === 'number' && hebrewLetters.length > 1) {
    while (nextIndex === exclude) {
      nextIndex = Math.floor(Math.random() * hebrewLetters.length);
    }
  }
  return nextIndex;
};

const buildOptionSet = (currentIndex: number) => {
  const options = new Set<string>();
  const correct = formatSounds(hebrewLetters[currentIndex].sounds);
  options.add(correct);

  while (options.size < 4) {
    const randomIndex = Math.floor(Math.random() * hebrewLetters.length);
    const option = formatSounds(hebrewLetters[randomIndex].sounds);
    options.add(option);
  }

  return Array.from(options)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
};

export default function HebrewLetterTrainer() {
  const [score, setScore] = useState<Score>(INITIAL_SCORE);
  const [currentIndex, setCurrentIndex] = useState(() => pickRandomIndex());
  const [options, setOptions] = useState(() => buildOptionSet(currentIndex));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const correctOption = useMemo(
    () => formatSounds(hebrewLetters[currentIndex].sounds),
    [currentIndex]
  );

  useEffect(() => {
    setOptions(buildOptionSet(currentIndex));
    setSelectedOption(null);
  }, [currentIndex]);

  const goToNextLetter = useCallback(() => {
    setCurrentIndex(prev => pickRandomIndex(prev));
  }, []);

  useEffect(() => {
    if (!selectedOption) {
      return;
    }

    const timeout = setTimeout(goToNextLetter, 900);
    return () => clearTimeout(timeout);
  }, [selectedOption, goToNextLetter]);

  const handleOptionClick = (option: string) => {
    if (selectedOption) {
      return;
    }

    const isCorrect = option === correctOption;
    setSelectedOption(option);
    setScore(previous => ({
      correct: previous.correct + (isCorrect ? 1 : 0),
      incorrect: previous.incorrect + (isCorrect ? 0 : 1),
    }));
  };

  const getOptionClassName = (option: string) => {
    const baseStyles =
      'relative flex items-center justify-center rounded-xl border-2 p-4 text-lg font-semibold transition-all duration-200 ease-out focus:outline-none';

    if (!selectedOption) {
      return `${baseStyles} border-slate-200 bg-white/80 shadow-sm hover:border-indigo-400 hover:shadow-lg`;
    }

    if (option === selectedOption && option === correctOption) {
      return `${baseStyles} border-emerald-500 bg-emerald-50 text-emerald-900 shadow-[0_0_18px_rgba(16,185,129,0.55)]`;
    }

    if (option === selectedOption) {
      return `${baseStyles} border-rose-500 bg-rose-50 text-rose-900 shadow-[0_0_18px_rgba(244,63,94,0.45)]`;
    }

    if (option === correctOption) {
      return `${baseStyles} border-emerald-400 bg-emerald-50 text-emerald-900 shadow-[0_0_12px_rgba(16,185,129,0.3)]`;
    }

    return `${baseStyles} border-slate-200 bg-white/60 text-slate-500`;
  };

  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-6 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-lg sm:p-8">
        <div className="flex items-center justify-between rounded-2xl bg-slate-900/90 px-6 py-4 text-white shadow-inner">
          <div className="text-sm uppercase tracking-[0.3em] text-slate-200">Score</div>
          <div className="text-right text-lg font-semibold">
            <div className="text-emerald-300">Correct: {score.correct}</div>
            <div className="text-rose-300">Incorrect: {score.incorrect}</div>
          </div>
        </div>

        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-10 text-center shadow-md">
          <div className="text-sm font-medium uppercase tracking-[0.4em] text-indigo-400">
            {hebrewLetters[currentIndex].name}
          </div>
          <div className="mt-4 text-7xl font-bold text-slate-900">
            {hebrewLetters[currentIndex].letter}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}
