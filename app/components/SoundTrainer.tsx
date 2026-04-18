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
  onStatsChange?: (stats: { label: string; value: string | number }[]) => void;
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

export default function SoundTrainer({
  entries,
  promptLabel,
  instructionText,
  onStatsChange,
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

  useEffect(() => {
    onStatsChange?.([
      { label: 'Correct', value: score.correct },
      { label: 'Incorrect', value: score.incorrect },
      { label: 'Accuracy', value: accuracy !== null ? `${accuracy}%` : '—' },
    ]);
  }, [accuracy, onStatsChange, score.correct, score.incorrect]);

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
      'flex min-h-[4rem] items-center justify-center rounded-2xl px-4 py-3 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 sm:min-h-[4.5rem] sm:px-5 sm:py-4 sm:text-base';

    if (!selectedOption) {
      return `${baseStyles} text-zinc-700 hover:bg-zinc-950 hover:text-white`;
    }

    if (option === correctOption) {
      return `${baseStyles} bg-zinc-950 text-white`;
    }

    if (option === selectedOption) {
      return `${baseStyles} bg-zinc-100 text-zinc-400`;
    }

    return `${baseStyles} text-zinc-400`;
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          <div
            className="relative rounded-[2rem] bg-zinc-100/70 px-6 py-8 text-center sm:px-8 sm:py-10"
            aria-label={`${promptLabel} ${entries[currentIndex].symbol}`}
          >
            <button
              type="button"
              onClick={goToNextSymbol}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
              aria-label="Skip to the next card"
              title="Skip"
            >
              <RefreshIcon />
            </button>
            <p className="sr-only">{instructionText}</p>
            <div className="text-[4.5rem] font-medium leading-none text-zinc-950 sm:text-[6.25rem]">
              {entries[currentIndex].symbol}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
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
      </section>

      <aside className="p-4 pt-0 lg:hidden">
        <div className="space-y-4 text-sm">
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
