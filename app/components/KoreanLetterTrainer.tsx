import SoundTrainer from './SoundTrainer';
import { koreanLetters } from '../data/koreanLetters';

export default function KoreanLetterTrainer({
  onStatsChange,
}: {
  onStatsChange?: (stats: { label: string; value: string | number }[]) => void;
}) {
  return (
    <SoundTrainer
      entries={koreanLetters}
      promptLabel="Korean letter"
      onStatsChange={onStatsChange}
    />
  );
}
