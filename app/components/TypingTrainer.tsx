'use client';
import { useEffect, useState } from 'react';
import sentences from '../data/sentences';
import confetti from 'canvas-confetti';

export default function TypingTrainer() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number | null>(null);

  const sentence = sentences[index % sentences.length];

  useEffect(() => {
    setInput('');
    setStartTime(null);
  }, [index]);

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
  }, [input, sentence, startTime, index]);

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

  return (
    <div className="space-y-4">
      {speed && (
        <div className="text-center text-xl font-bold">
          Speed: {speed.toFixed(2)} chars/sec
        </div>
      )}
      <div dir="rtl" className="text-2xl bg-white p-4 rounded shadow min-h-[4rem] font-medium tracking-wide">
        {sentence.split('').map((char, idx) => (
          <span key={idx} className={getCharClass(char, idx)}>
            {char}
          </span>
        ))}
      </div>
      <input
        type="text"
        dir="rtl"
        autoFocus
        value={input}
        onChange={handleChange}
        className="w-full p-3 border rounded focus:outline-none text-xl"
      />
    </div>
  );
}
