import type { CardProgress, UserStats } from '../types';

const PROGRESS_KEY = 'lingua_progress';
const STATS_KEY = 'lingua_stats';

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function getDefaultStats(): UserStats {
  return {
    streak: 0,
    lastPracticeDate: '',
    totalWordsLearned: 0,
    totalExercises: 0,
    dailyGoal: 10,
    todayExercises: 0,
    todayDate: getToday(),
    xp: 0,
    level: 1,
  };
}

export function loadProgress(): Record<string, CardProgress> {
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveProgress(progress: Record<string, CardProgress>): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function loadStats(): UserStats {
  try {
    const data = localStorage.getItem(STATS_KEY);
    if (!data) return getDefaultStats();

    const stats: UserStats = JSON.parse(data);
    const today = getToday();

    // Reset daily count if it's a new day
    if (stats.todayDate !== today) {
      const lastDate = new Date(stats.lastPracticeDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Reset streak if more than 1 day gap
      if (diffDays > 1) {
        stats.streak = 0;
      }

      stats.todayExercises = 0;
      stats.todayDate = today;
    }

    return stats;
  } catch {
    return getDefaultStats();
  }
}

export function saveStats(stats: UserStats): void {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

export function updateStatsAfterExercise(
  stats: UserStats,
  correct: boolean
): UserStats {
  const today = getToday();
  const newStats = { ...stats };

  newStats.totalExercises += 1;
  newStats.todayExercises += 1;
  newStats.todayDate = today;

  if (correct) {
    newStats.xp += 10;
  } else {
    newStats.xp += 2;
  }

  // Level up every 100 XP
  newStats.level = Math.floor(newStats.xp / 100) + 1;

  // Update streak
  if (stats.lastPracticeDate !== today) {
    const lastDate = new Date(stats.lastPracticeDate);
    const todayDate = new Date(today);
    const diffDays = Math.floor(
      (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 1) {
      newStats.streak += 1;
    } else {
      newStats.streak = 1;
    }
    newStats.lastPracticeDate = today;
  }

  return newStats;
}
