const words = [
  '私', 'あなた', '彼', '彼女', '私たち', '行く', '欲しい', '食べる', '飲む', '働く',
  '子供', '犬', '猫', '家', '学校', 'アパート', '机', '椅子', '海', '太陽',
  '速い', '遅い', 'きれい', '大きい', '小さい', '新しい', '古い', '日', '夜', '朝',
  '夕方', '週', '月', '年', '赤', '青', '緑', 'カラフル', '空', '地球',
  '祭り', '楽しい', '友達', '家族', '旅行', '音楽'
];

function randomSentence(): string {
  const arr: string[] = [];
  for (let i = 0; i < 10; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    arr.push(word);
  }
  return arr.join('');
}

const sentences: string[] = Array.from({ length: 1000 }, randomSentence);

export default sentences;
