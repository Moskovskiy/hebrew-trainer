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
      instructionText="Choose the sound that best matches the Korean letter. The next card appears automatically."
      onStatsChange={onStatsChange}
    />
  );
}
