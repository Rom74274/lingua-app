import { useState, useCallback } from 'react';
import type { Exercise, SessionResult } from './types';
import { getWordsByLanguage, getWordsByCategory } from './data/vocabulary';
import { generateSession } from './utils/exerciseGenerator';
import {
  calculateNextReview,
  createInitialProgress,
} from './utils/spacedRepetition';
import {
  loadProgress,
  saveProgress,
  loadStats,
  saveStats,
  updateStatsAfterExercise,
} from './utils/storage';
import { HomeScreen } from './components/HomeScreen';
import { ExerciseScreen } from './components/ExerciseScreen';
import { ResultScreen } from './components/ResultScreen';
import { ProgressScreen } from './components/ProgressScreen';
import './App.css';

type Screen = 'home' | 'exercise' | 'result' | 'progress';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [stats, setStats] = useState(loadStats);
  const [progress, setProgress] = useState(loadProgress);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionResults, setSessionResults] = useState<
    { word: Exercise['word']; correct: boolean }[]
  >([]);
  const [lastLanguage, setLastLanguage] = useState<'en' | 'es'>('en');
  const [lastCategory, setLastCategory] = useState<string | undefined>();

  const startSession = useCallback(
    (language: 'en' | 'es', category?: string) => {
      setLastLanguage(language);
      setLastCategory(category);

      let words = category
        ? getWordsByCategory(category).filter((w) => w.language === language)
        : getWordsByLanguage(language);

      if (words.length < 4) {
        words = getWordsByLanguage(language);
      }

      const now = Date.now();
      const dueWords = words.filter((w) => {
        const p = progress[w.id];
        return !p || now >= p.nextReview;
      });

      const wordsToUse = dueWords.length >= 4 ? dueWords : words;
      const session = generateSession(wordsToUse, 10);

      setExercises(session);
      setCurrentIndex(0);
      setSessionResults([]);
      setScreen('exercise');
    },
    [progress]
  );

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const exercise = exercises[currentIndex];

      const cardProgress =
        progress[exercise.word.id] || createInitialProgress(exercise.word.id);
      const quality = correct ? 4 : 1;
      const updatedCard = calculateNextReview(cardProgress, quality);
      const newProgress = { ...progress, [exercise.word.id]: updatedCard };
      setProgress(newProgress);
      saveProgress(newProgress);

      const newStats = updateStatsAfterExercise(stats, correct);
      setStats(newStats);
      saveStats(newStats);

      const newResults = [
        ...sessionResults,
        { word: exercise.word, correct },
      ];
      setSessionResults(newResults);

      if (currentIndex + 1 < exercises.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setScreen('result');
      }
    },
    [exercises, currentIndex, progress, stats, sessionResults]
  );

  const sessionResult: SessionResult = {
    correct: sessionResults.filter((r) => r.correct).length,
    total: sessionResults.length,
    words: sessionResults,
  };

  return (
    <div className="app-container">
      {screen === 'home' && (
        <HomeScreen
          stats={stats}
          onStartSession={startSession}
          onShowProgress={() => setScreen('progress')}
        />
      )}

      {screen === 'exercise' && (
        <ExerciseScreen
          exercises={exercises}
          currentIndex={currentIndex}
          onAnswer={handleAnswer}
          onQuit={() => setScreen('home')}
        />
      )}

      {screen === 'result' && (
        <ResultScreen
          result={sessionResult}
          onBackHome={() => setScreen('home')}
          onRetry={() => startSession(lastLanguage, lastCategory)}
        />
      )}

      {screen === 'progress' && (
        <ProgressScreen
          stats={stats}
          progress={progress}
          onBack={() => setScreen('home')}
        />
      )}
    </div>
  );
}

export default App;
