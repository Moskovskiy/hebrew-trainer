'use client';
import { useEffect, useState } from 'react';
import { randomSentence, Language, wordBank } from '../data/dictionaries';
import confetti from 'canvas-confetti';
import LanguageSelector from './LanguageSelector';

const languageOptions: { code: Language; name: string; emoji: string }[] = [
  { code: 'english', name: 'English', emoji: '🇬🇧' },
  { code: 'hebrew', name: 'Hebrew', emoji: '🇮🇱' },
  { code: 'german', name: 'German', emoji: '🇩🇪' },
  { code: 'chinese', name: 'Chinese', emoji: '🇨🇳' },
  { code: 'spanish', name: 'Spanish', emoji: '🇪🇸' },
  { code: 'arabic', name: 'Arabic', emoji: '🇸🇦' },
  { code: 'hindi', name: 'Hindi', emoji: '🇮🇳' },
  { code: 'telugu', name: 'Telugu', emoji: '🇮🇳' },
  { code: 'russian', name: 'Russian', emoji: '🇷🇺' },
  { code: 'japanese', name: 'Japanese', emoji: '🇯🇵' },
  { code: 'thai', name: 'Thai', emoji: '🇹🇭' },
  { code: 'korean', name: 'Korean', emoji: '🇰🇷' },
  { code: 'armenian', name: 'Armenian', emoji: '🇦🇲' },
  { code: 'farsi', name: 'Farsi', emoji: '🇮🇷' },
  { code: 'greek', name: 'Greek', emoji: '🇬🇷' },
  { code: 'ukrainian', name: 'Ukrainian', emoji: '🇺🇦' },
  { code: 'georgian', name: 'Georgian', emoji: '🇬🇪' },
  { code: 'gujarati', name: 'Gujarati', emoji: '🇮🇳' },
  { code: 'myanmar', name: 'Burmese', emoji: '🇲🇲' },
  { code: 'khmer', name: 'Khmer', emoji: '🇰🇭' },
  { code: 'sanskrit', name: 'Sanskrit', emoji: '🇮🇳' },
  { code: 'tibetan', name: 'Tibetan', emoji: '🇨🇳' },
  { code: 'urdu', name: 'Urdu', emoji: '🇵🇰' },
  { code: 'marathi', name: 'Marathi', emoji: '🇮🇳' },
];

export default function TypingTrainer() {
  const [language, setLanguage] = useState<Language>('hebrew');
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [resultMistakes, setResultMistakes] = useState<number | null>(null);

  const [sentence, setSentence] = useState('');
  const activeLanguage = languageOptions.find(option => option.code === language);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && Object.keys(wordBank).includes(hash)) {
      setLanguage(hash as Language);
    }
  }, []);

  useEffect(() => {
    setSentence(randomSentence(language));
  }, [language, index]);

  useEffect(() => {
    setInput('');
    setStartTime(null);
    setMistakes(0);
    setResultMistakes(null);
  }, [index, language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (startTime === null && e.target.value.length === 1) {
      setStartTime(Date.now());
    }
    const newValue = e.target.value;
    if (newValue.length > input.length) {
      const idx = newValue.length - 1;
      const char = newValue[idx];
      if (idx >= sentence.length || char !== sentence[idx]) {
        setMistakes(m => m + 1);
      }
    }
    setInput(newValue);
  };

  useEffect(() => {
    if (input === sentence) {
      if (startTime) {
        const seconds = (Date.now() - startTime) / 1000;
        const speedVal = sentence.length / seconds;
        setSpeed(speedVal);
        setResultMistakes(mistakes);
        confetti();
      }
      const next = index + 1;
      setTimeout(() => setIndex(next), 500);
    }
  }, [input, sentence, startTime, index, mistakes]);

  useEffect(() => {
    setIndex(0);
    setSpeed(null);
    setResultMistakes(null);
    window.location.hash = language;
  }, [language]);

  const getCharClass = (char: string, idx: number) => {
    if (idx < input.length) {
      return input[idx] === char
        ? 'text-green-600'
        : 'text-red-600 bg-red-100';
    }
    if (idx === input.length) {
      return 'border-b-2 border-blue-500';
    }
    return 'text-gray-700';
  };

  const isRTL = language === 'hebrew' || language === 'arabic';

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-lg sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <LanguageSelector options={languageOptions} value={language} onChange={setLanguage} />
            <p className="max-w-md text-sm text-slate-500">
              Type the prompt below as quickly and accurately as you can. We will calculate your characters per second and track
              mistakes for each sentence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-900/90 p-4 text-white shadow-inner sm:grid-cols-3">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-300">Language</div>
              <div className="mt-1 text-lg font-semibold">{activeLanguage?.name ?? '—'}</div>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-300">Speed</div>
              <div className="mt-1 text-lg font-semibold text-emerald-300">
                {speed ? `${speed.toFixed(2)} chars/sec` : '—'}
              </div>
            </div>
            <div className="col-span-2 text-center sm:col-span-1">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-300">Mistakes</div>
              <div className="mt-1 text-lg font-semibold text-rose-300">
                {resultMistakes !== null ? resultMistakes : mistakes}
              </div>
            </div>
          </div>

          <div
            dir={isRTL ? 'rtl' : 'ltr'}
            className="min-h-[6rem] rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-6 text-2xl font-semibold tracking-wide text-slate-900 shadow-md"
          >
            {sentence.split('').map((char, idx) => (
              <span key={idx} className={getCharClass(char, idx)}>
                {char}
              </span>
            ))}
          </div>

          <input
            type="text"
            dir={isRTL ? 'rtl' : 'ltr'}
            autoFocus
            value={input}
            onChange={handleChange}
            className="w-full rounded-2xl border-2 border-slate-200 bg-white/90 px-4 py-3 text-lg font-medium text-slate-900 shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            placeholder="Start typing here..."
          />
        </div>
      </div>
    </div>
  );
}
