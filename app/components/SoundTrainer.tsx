'use client';

import { useEffect, useState } from 'react';

type SoundEntry = {
  symbol: string;
  sounds: string[];
};

type Score = {
  correct: number;
  incorrect: number;
};

const INITIAL_SCORE: Score = { correct: 0, incorrect: 0 };

const formatSounds = (sounds: string[]) => sounds.join(' · ');

type SoundTrainerProps = {
  entries: SoundEntry[];
  promptLabel: string;
  instructionText: string;
};

const pickRandomIndex = (length: number, exclude?: number) => {
  let nextIndex = Math.floor(Math.random() * length);

  if (typeof exclude === 'number' && length > 1) {
    while (nextIndex === exclude) {
      nextIndex = Math.floor(Math.random() * length);
    }
  }

  return nextIndex;
};

const buildOptionSet = (entries: SoundEntry[], currentIndex: number) => {
  const options = new Set<string>();
  options.add(formatSounds(entries[currentIndex].sounds));

  while (options.size < 4) {
    const randomIndex = Math.floor(Math.random() * entries.length);
    options.add(formatSounds(entries[randomIndex].sounds));
  }

  return Array.from(options)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
};

export default function SoundTrainer({
  entries,
  promptLabel,
  instructionText,
}: SoundTrainerProps) {
  const [score, setScore] = useState<Score>(INITIAL_SCORE);
  const [currentIndex, setCurrentIndex] = useState(() => pickRandomIndex(entries.length));
  const [options, setOptions] = useState(() => buildOptionSet(entries, currentIndex));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const correctOption = formatSounds(entries[currentIndex].sounds);
  const totalAnswers = score.correct + score.incorrect;
  const accuracy =
    totalAnswers > 0 ? Math.round((score.correct / totalAnswers) * 100) : null;

  useEffect(() => {
    setOptions(buildOptionSet(entries, currentIndex));
    setSelectedOption(null);
  }, [entries, currentIndex]);

  const goToNextSymbol = () => {
    setCurrentIndex(previous => pickRandomIndex(entries.length, previous));
  };

  useEffect(() => {
    if (!selectedOption) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCurrentIndex(previous => pickRandomIndex(entries.length, previous));
    }, 900);

    return () => clearTimeout(timeout);
  }, [entries.length, selectedOption]);

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
      'flex min-h-[4.5rem] items-center justify-center border px-4 py-4 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:text-base';

    if (!selectedOption) {
      return `${baseStyles} border-[var(--border)] text-zinc-700 hover:border-zinc-950 hover:text-zinc-950`;
    }

    if (option === correctOption) {
      return `${baseStyles} border-zinc-950 bg-zinc-950 text-white`;
    }

    if (option === selectedOption) {
      return `${baseStyles} border-zinc-950 text-zinc-400`;
    }

    return `${baseStyles} border-[var(--border)] text-zinc-400`;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <section className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <div className="flex flex-col gap-6">
          <div
            className="border border-[var(--border)] p-8 text-center"
            aria-label={`${promptLabel} ${entries[currentIndex].symbol}`}
          >
            <div className="text-[5rem] font-medium leading-none text-zinc-950 sm:text-[6.5rem]">
              {entries[currentIndex].symbol}
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
            <p>{instructionText}</p>
            <button
              type="button"
              onClick={goToNextSymbol}
              className="inline-flex items-center justify-center border border-zinc-950 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            >
              Skip
            </button>
          </div>
        </div>
      </section>

      <aside className="border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="space-y-5 text-sm">
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
