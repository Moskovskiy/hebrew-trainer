'use client';
import { useEffect, useState } from 'react';
import dictionaries, { Language } from '../data/dictionaries';
import confetti from 'canvas-confetti';

const languageOptions: { code: Language; name: string; emoji: string }[] = [
  { code: 'english', name: 'English', emoji: '🇺🇸' },
  { code: 'hebrew', name: 'Hebrew', emoji: '🇮🇱' },
  { code: 'german', name: 'German', emoji: '🇩🇪' },
  { code: 'chinese', name: 'Chinese', emoji: '🇨🇳' },
  { code: 'spanish', name: 'Spanish', emoji: '🇪🇸' },
  { code: 'arabic', name: 'Arabic', emoji: '🇸🇦' },
  { code: 'hindi', name: 'Hindi', emoji: '🇮🇳' },
  { code: 'telugu', name: 'Telugu', emoji: '🇮🇳' },
  { code: 'russian', name: 'Russian', emoji: '🇷🇺' },
  { code: 'japanese', name: 'Japanese', emoji: '🇯🇵' },
];

export default function TypingTrainer() {
  const [language, setLanguage] = useState<Language>('english');
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && Object.keys(dictionaries).includes(hash)) {
      setLanguage(hash as Language);
    }
  }, []);

  const sentences = dictionaries[language];
  const sentence = sentences[index % sentences.length];

  useEffect(() => {
    setInput('');
    setStartTime(null);
  }, [index, language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (startTime === null && e.target.value.length === 1) {
      setStartTime(Date.now());
    }
    setInput(e.target.value);
  };

  useEffect(() => {
    if (input === sentence) {
      if (startTime) {
        const seconds = (Date.now() - startTime) / 1000;
        const speedVal = sentence.length / seconds;
        setSpeed(speedVal);
        confetti();
      }
      const next = (index + 1) % sentences.length;
      setTimeout(() => setIndex(next), 500);
    }
  }, [input, sentence, startTime, index, sentences.length]);

  useEffect(() => {
    setIndex(0);
    setSpeed(null);
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
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {languageOptions.map((opt) => (
          <button
            key={opt.code}
            onClick={() => setLanguage(opt.code)}
            className={
              `px-3 py-1 rounded-full border text-sm flex items-center gap-1 ` +
              (language === opt.code
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white hover:bg-gray-100')
            }
          >
            <span>{opt.emoji}</span>
            <span>{opt.name}</span>
          </button>
        ))}
      </div>
      {speed && (
        <div className="text-center text-xl font-bold">
          Speed: {speed.toFixed(2)} chars/sec
        </div>
      )}
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className="text-2xl bg-white p-4 rounded shadow min-h-[4rem] font-medium tracking-wide"
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
        className="w-full p-3 border rounded focus:outline-none text-xl"
      />
    </div>
  );
}
