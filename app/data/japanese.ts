import generateSentences from './generator';

const words = [
  '私', 'あなた', '彼', '彼女', '私たち', '行く', '欲しい', '食べる', '飲む', '働く',
  '子供', '犬', '猫', '家', '学校', 'アパート', '机', '椅子', '海', '太陽',
  '速い', '遅い', 'きれい', '大きい', '小さい', '新しい', '古い', '日', '夜', '朝',
  '夕方', '週', '月', '年', '赤', '青', '緑', 'カラフル', '空', '地球',
  '祭り', '楽しい', '友達', '家族', '旅行', '音楽'
];

const prepositions = [
  'で', 'から', 'と', 'なしで', 'の下で', 'の上で', '近くで', 'の間に', '周りに', '通して'
];

const sentences = generateSentences(words, '', prepositions);

export default sentences;
