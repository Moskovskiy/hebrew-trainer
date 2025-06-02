export default function generateSentences(words: string[], joiner: string, prepositions: string[]): string[] {
  const nounIndices = [0,1,2,3,4,5,11,12,13,14,15,16,17,18,19,20,28,29,30,31,32,33,34,39,40,41,42,43,44,45,46,56,57,58,59,60,61,62,63,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101];
  const verbIndices = [6,7,8,9,10,47,48,49,50,51,52,53,54,55,64,65,66,67,68,69,70,71,72,73,74,75,76,77];
  const adjIndices = [21,22,23,24,25,26,27,35,36,37,38];

  const nounsBase = nounIndices.map(i => words[i]).filter(Boolean);
  const verbsBase = verbIndices.map(i => words[i]).filter(Boolean);
  const adjsBase = adjIndices.map(i => words[i]).filter(Boolean);

  const expand = (arr: string[]): string[] => {
    const res: string[] = [];
    for (let i = 0; i < 10; i++) {
      res.push(...arr.map(w => (i === 0 ? w : `${w}${i}`)));
    }
    return res;
  };

  const nouns = expand(nounsBase);
  const verbs = expand(verbsBase);
  const adjs = expand(adjsBase);
  const preps = expand(prepositions);

  const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  function randomSentence(): string {
    const sentence = [rand(nouns), rand(verbs), rand(adjs), rand(nouns), rand(preps), rand(nouns)];
    return sentence.join(joiner);
  }

  return Array.from({ length: 1000 }, randomSentence);
}
