import generateSentences from './generator';

const words = [
  'ich', 'du', 'er', 'sie', 'wir', 'ihr', 'gehen', 'möchte', 'essen', 'trinken',
  'arbeiten', 'kind', 'hund', 'katze', 'haus', 'schule', 'wohnung', 'tisch',
  'stuhl', 'meer', 'sonne', 'schnell', 'langsam', 'schön', 'groß', 'klein',
  'neu', 'alt', 'tag', 'nacht', 'morgen', 'abend', 'woche', 'monat', 'jahr',
  'rot', 'blau', 'grün', 'bunt', 'himmel', 'erde', 'fest', 'spaß', 'freunde',
  'familie', 'reise', 'musik', 'lernen', 'schreiben', 'lesen', 'essen', 'trinken',
  'laufen', 'sprechen', 'wandern', 'üben', 'fragen', 'antworten', 'apfel',
  'brot', 'kaffee', 'tee', 'milch', 'wasser', 'fahren', 'stehen', 'sitzen',
  'anmachen', 'ausmachen', 'lachen', 'weinen', 'zuhören', 'erinnern', 'vergessen',
  'malen', 'bauen', 'träumen', 'denken', 'ball', 'hochzeit', 'studium', 'urlaub',
  'mann', 'frau', 'kinder', 'arbeit', 'geschenk', 'geschichte', 'spiel', 'bild',
  'laden', 'park', 'garten', 'platz', 'blume', 'baum', 'heft', 'bleistift',
  'stift', 'papier', 'computer', 'telefon'
];

const prepositions = [
  'in', 'aus', 'mit', 'ohne', 'unter', 'über', 'nahe', 'zwischen', 'um', 'durch'
];

const sentences = generateSentences(words, ' ', prepositions);

export default sentences;
