'use client';

import { formatSounds, hebrewLetters } from '../data/hebrewLetters';

export default function LearnLetters() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {hebrewLetters.map(letter => {
        return (
          <article
            key={letter.name}
            className="border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.28em] text-zinc-500">
                  {letter.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{formatSounds(letter.sounds)}</p>
              </div>
              {letter.isFinal ? (
                <span className="text-[0.72rem] uppercase tracking-[0.22em] text-zinc-500">
                  Final
                </span>
              ) : null}
            </div>

            <div className="mt-8 text-right text-5xl font-medium leading-none text-zinc-950">
              <span className="sr-only">
                {letter.letter} - {letter.name}
              </span>
              <span aria-hidden="true">{letter.letter}</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
