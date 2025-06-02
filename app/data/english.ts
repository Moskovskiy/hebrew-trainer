const words = [
  'I', 'you', 'he', 'she', 'we', 'you(plural)', 'go', 'want', 'eat', 'drink',
  'work', 'child', 'dog', 'cat', 'house', 'school', 'apartment', 'table', 'chair',
  'sea', 'sun', 'fast', 'slow', 'beautiful', 'big', 'small', 'new', 'old', 'day',
  'night', 'morning', 'evening', 'week', 'month', 'year', 'red', 'blue', 'green',
  'colorful', 'sky', 'earth', 'party', 'fun', 'friends', 'family', 'trip', 'music',
  'study', 'write', 'read', 'eat', 'drink', 'run', 'speak', 'walk', 'train',
  'questions', 'answers', 'apple', 'bread', 'coffee', 'tea', 'milk', 'water',
  'travel', 'standing', 'sitting', 'turn on', 'turn off', 'laugh', 'cry',
  'listen', 'remember', 'forget', 'paint', 'build', 'dream', 'think', 'ball',
  'wedding', 'studies', 'vacation', 'man', 'woman', 'children', 'work', 'gift',
  'story', 'game', 'picture', 'store', 'park', 'garden', 'place', 'flower',
  'tree', 'notebook', 'pencil', 'pen', 'paper', 'computer', 'phone'
];

function randomSentence(): string {
  const arr: string[] = [];
  for (let i = 0; i < 10; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    arr.push(word);
  }
  return arr.join(' ');
}

const sentences: string[] = Array.from({ length: 1000 }, randomSentence);

export default sentences;
