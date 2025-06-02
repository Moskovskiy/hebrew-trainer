const words = [
  'я', 'ты', 'он', 'она', 'мы', 'вы', 'идти', 'хотеть', 'есть', 'пить',
  'работать', 'ребенок', 'собака', 'кошка', 'дом', 'школа', 'квартира', 'стол', 'стул',
  'море', 'солнце', 'быстро', 'медленно', 'красиво', 'большой', 'маленький', 'новый', 'старый', 'день',
  'ночь', 'утро', 'вечер', 'неделя', 'месяц', 'год', 'красный', 'синий', 'зеленый', 'разноцветный',
  'небо', 'земля', 'праздник', 'веселье', 'друзья', 'семья', 'путешествие', 'музыка'
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
