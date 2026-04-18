import SoundTrainer from './SoundTrainer';
import { hebrewLetters } from '../data/hebrewLetters';

const hebrewSoundEntries = hebrewLetters.map(letter => ({
  symbol: letter.letter,
  sounds: letter.sounds,
}));

export default function HebrewLetterTrainer() {
  return (
    <SoundTrainer
      entries={hebrewSoundEntries}
      promptLabel="Hebrew letter"
      instructionText="Choose the sound that matches the letter. The next card appears automatically."
    />
  );
}
