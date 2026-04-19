import SoundTrainer from './SoundTrainer';
import { hebrewLetters } from '../data/hebrewLetters';

const hebrewSoundEntries = hebrewLetters.map(letter => ({
  symbol: letter.letter,
  sounds: letter.sounds,
}));

export default function HebrewLetterTrainer({
  onStatsChange,
}: {
  onStatsChange?: (stats: { label: string; value: string | number }[]) => void;
}) {
  return (
    <SoundTrainer
      entries={hebrewSoundEntries}
      promptLabel="Hebrew letter"
      onStatsChange={onStatsChange}
    />
  );
}
