import type { Word, Exercise, ExerciseType } from '../types';
import { getSentenceForWord, getWordsWithSentences } from '../data/sentences';

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandom<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}

export function generateMultipleChoice(
  targetWord: Word,
  allWords: Word[],
  direction: 'to-french' | 'from-french'
): Exercise {
  const sameLanguageWords = allWords.filter(
    (w) => w.language === targetWord.language && w.id !== targetWord.id
  );

  const distractors = pickRandom(sameLanguageWords, 3);

  const correctAnswer =
    direction === 'to-french' ? targetWord.translation : targetWord.word;

  const options = shuffle([
    correctAnswer,
    ...distractors.map((d) =>
      direction === 'to-french' ? d.translation : d.word
    ),
  ]);

  return {
    type: 'multiple-choice',
    word: targetWord,
    options,
    correctAnswer,
    direction,
  };
}

export function generateTranslateExercise(
  targetWord: Word,
  direction: 'to-french' | 'from-french'
): Exercise {
  return {
    type: 'translate',
    word: targetWord,
    correctAnswer:
      direction === 'to-french' ? targetWord.translation : targetWord.word,
    direction,
  };
}

export function generateClozeChoice(
  targetWord: Word,
  allWords: Word[]
): Exercise {
  const template = getSentenceForWord(targetWord.id);
  if (!template) {
    // Fallback to multiple choice if no sentence
    return generateMultipleChoice(targetWord, allWords, 'from-french');
  }

  const sameLanguageWords = allWords.filter(
    (w) => w.language === targetWord.language && w.id !== targetWord.id
  );
  const distractors = pickRandom(sameLanguageWords, 3);

  const sentence = template.sentence.replace('{word}', '______');
  const options = shuffle([
    targetWord.word,
    ...distractors.map((d) => d.word),
  ]);

  return {
    type: 'cloze-choice',
    word: targetWord,
    options,
    correctAnswer: targetWord.word,
    direction: 'from-french',
    sentence,
    sentenceTranslation: template.translation,
  };
}

export function generateClozeType(
  targetWord: Word
): Exercise {
  const template = getSentenceForWord(targetWord.id);
  if (!template) {
    // Fallback to translate if no sentence
    return generateTranslateExercise(targetWord, 'from-french');
  }

  const sentence = template.sentence.replace('{word}', '______');

  return {
    type: 'cloze-type',
    word: targetWord,
    correctAnswer: targetWord.word,
    direction: 'from-french',
    sentence,
    sentenceTranslation: template.translation,
  };
}

export function generateSession(
  words: Word[],
  count: number = 10
): Exercise[] {
  const selectedWords = pickRandom(words, Math.min(count, words.length));
  const wordsWithSentences = new Set(getWordsWithSentences());

  const allTypes: ExerciseType[] = [
    'multiple-choice',
    'translate',
    'cloze-choice',
    'cloze-type',
  ];

  return selectedWords.map((word) => {
    const hasSentence = wordsWithSentences.has(word.id);

    // Pick available types for this word
    const availableTypes = hasSentence
      ? allTypes
      : (['multiple-choice', 'translate'] as ExerciseType[]);

    const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    const direction: 'to-french' | 'from-french' =
      Math.random() > 0.5 ? 'to-french' : 'from-french';

    switch (type) {
      case 'multiple-choice':
        return generateMultipleChoice(word, words, direction);
      case 'translate':
        return generateTranslateExercise(word, direction);
      case 'cloze-choice':
        return generateClozeChoice(word, words);
      case 'cloze-type':
        return generateClozeType(word);
      default:
        return generateMultipleChoice(word, words, direction);
    }
  });
}

export function normalizeAnswer(answer: string): string {
  return answer
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '');
}

export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  const normalizedUser = normalizeAnswer(userAnswer);
  const normalizedCorrect = normalizeAnswer(correctAnswer);

  if (normalizedUser === normalizedCorrect) return true;

  // Check if the answer contains the correct one (for multi-word translations)
  const correctParts = correctAnswer
    .split('/')
    .map((p) => normalizeAnswer(p.trim()));
  return correctParts.some((part) => part === normalizedUser);
}

export function getHint(word: string, level: number): string {
  if (level === 1) {
    // Reveal first half of the word
    const half = Math.ceil(word.length / 2);
    return word.slice(0, half) + '·'.repeat(word.length - half);
  }
  // level 2+: full reveal
  return word;
}
