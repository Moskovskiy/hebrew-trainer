import HebrewLetterTrainer from './components/HebrewLetterTrainer';

export default function Home() {
  return (
    <main className="flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-6 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Hebrew Letter Sound Trainer
        </h1>
        <p className="mb-8 text-center text-base text-slate-600 sm:text-lg">
          Strengthen your Hebrew reading intuition by matching each letter with its sound.
          Tap an answer to see instant feedback and grow your score.
        </p>
        <HebrewLetterTrainer />
      </div>
    </main>
  );
}
