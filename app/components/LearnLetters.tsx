'use client';

import { formatSounds, getDisplayLetters, hebrewLetters } from '../data/hebrewLetters';

const letterEmphasisClasses = (isFinal?: boolean) => {
  if (isFinal) {
    return [
      'text-slate-300',
      'text-slate-300',
      'text-slate-900 drop-shadow-sm',
    ];
  }

  return [
    'text-slate-300',
    'text-slate-900 drop-shadow-sm',
    'text-slate-300',
  ];
};

export default function LearnLetters() {
  return (
    <div className="flex w-full flex-col gap-5">
      {hebrewLetters.map(letter => {
        const emphasis = letterEmphasisClasses(letter.isFinal);
        const displayLetters = getDisplayLetters(letter);

        return (
          <article
            key={letter.name}
            className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur"
          >
            <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-8 sm:p-10">
              {letter.isFinal ? (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white shadow-md">
                  End form
                </span>
              ) : null}

              <div className="flex items-center justify-center gap-6 text-[clamp(3rem,10vw,5rem)]">
                <span className="sr-only">
                  {letter.letter} – {letter.name}
                </span>
                {displayLetters.map((glyph, position) => (
                  <span
                    key={`${letter.letter}-${position}`}
                    className={`font-bold transition-colors duration-200 ${emphasis[position]}`}
                    aria-hidden="true"
                  >
                    {glyph}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-col items-center justify-center gap-1 text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500/80">
                  {letter.name}
                </span>
                <span className="text-sm text-slate-600">
                  {formatSounds(letter.sounds)}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
