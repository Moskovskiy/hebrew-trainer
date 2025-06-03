'use client';
import { useEffect, useState } from 'react';
import { randomSentence, Language, wordBank } from '../data/dictionaries';
import confetti from 'canvas-confetti';
import LanguageSelector from './LanguageSelector';

const languageOptions: { code: Language; name: string; emoji: string }[] = [
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

  const [sentence, setSentence] = useState('');

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
      const next = index + 1;
      setTimeout(() => setIndex(next), 500);
    }
  }, [input, sentence, startTime, index]);

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
      <LanguageSelector
        options={languageOptions}
        value={language}
        onChange={setLanguage}
      />
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
