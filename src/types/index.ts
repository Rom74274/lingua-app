export interface Word {
  id: string;
  word: string;
  translation: string;
  language: 'en' | 'es';
  category?: string;
}

export interface CardProgress {
  wordId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: number;
  lastReview: number;
}

export interface UserStats {
  streak: number;
  lastPracticeDate: string;
  totalWordsLearned: number;
  totalExercises: number;
  dailyGoal: number;
  todayExercises: number;
  todayDate: string;
  xp: number;
  level: number;
}

export type ExerciseType =
  | 'multiple-choice'
  | 'translate'
  | 'cloze-choice'
  | 'cloze-type';

export interface Exercise {
  type: ExerciseType;
  word: Word;
  options?: string[];
  correctAnswer: string;
  direction: 'to-french' | 'from-french';
  sentence?: string;
  sentenceTranslation?: string;
}

export interface SessionResult {
  correct: number;
  total: number;
  words: { word: Word; correct: boolean }[];
}
