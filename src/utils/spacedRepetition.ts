import type { CardProgress } from '../types';

// SM-2 algorithm for spaced repetition
export function calculateNextReview(
  card: CardProgress,
  quality: number // 0-5 scale: 0=complete fail, 5=perfect
): CardProgress {
  let { easeFactor, interval, repetitions } = card;

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect - reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  const now = Date.now();
  const nextReview = now + interval * 24 * 60 * 60 * 1000;

  return {
    ...card,
    easeFactor,
    interval,
    repetitions,
    nextReview,
    lastReview: now,
  };
}

export function createInitialProgress(wordId: string): CardProgress {
  return {
    wordId,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: 0,
    lastReview: 0,
  };
}

export function isDueForReview(card: CardProgress): boolean {
  return Date.now() >= card.nextReview;
}
