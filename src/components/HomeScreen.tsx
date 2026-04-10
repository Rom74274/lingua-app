import type { UserStats } from '../types';
import { categories } from '../data/vocabulary';

interface Props {
  stats: UserStats;
  onStartSession: (language: 'en' | 'es', category?: string) => void;
  onShowProgress: () => void;
}

export function HomeScreen({ stats, onStartSession, onShowProgress }: Props) {
  const progressPercent = Math.min(
    (stats.todayExercises / stats.dailyGoal) * 100,
    100
  );
  const goalReached = stats.todayExercises >= stats.dailyGoal;

  return (
    <div className="home-screen">
      <div className="home-header">
        <h1 className="app-title">Lingua</h1>
        <p className="app-subtitle">Ton vocabulaire quotidien</p>
      </div>

      {/* Stats bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-icon">&#x1F525;</span>
          <span className="stat-value">{stats.streak}</span>
          <span className="stat-label">Série</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">&#x2B50;</span>
          <span className="stat-value">{stats.xp}</span>
          <span className="stat-label">XP</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">&#x1F3AF;</span>
          <span className="stat-value">Niv. {stats.level}</span>
          <span className="stat-label">Niveau</span>
        </div>
      </div>

      {/* Daily goal */}
      <div className="daily-goal-card">
        <div className="daily-goal-header">
          <span>Objectif du jour</span>
          <span>
            {stats.todayExercises}/{stats.dailyGoal}
          </span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {goalReached && (
          <p className="goal-reached">Objectif atteint ! Continue !</p>
        )}
      </div>

      {/* Language selection */}
      <h2 className="section-title">Choisir une langue</h2>

      <div className="language-cards">
        <button
          className="language-card english"
          onClick={() => onStartSession('en')}
        >
          <span className="lang-flag">&#x1F1EC;&#x1F1E7;</span>
          <span className="lang-name">Anglais</span>
          <span className="lang-desc">279 mots</span>
        </button>

        <button
          className="language-card spanish"
          onClick={() => onStartSession('es')}
        >
          <span className="lang-flag">&#x1F1EA;&#x1F1F8;</span>
          <span className="lang-name">Espagnol</span>
          <span className="lang-desc">130 mots</span>
        </button>
      </div>

      {/* Categories */}
      <h2 className="section-title">Par catégorie</h2>
      <div className="category-grid">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            className="category-chip"
            onClick={() => onStartSession('en', key)}
          >
            {label}
          </button>
        ))}
      </div>

      <button className="btn-secondary" onClick={onShowProgress}>
        Voir ma progression
      </button>
    </div>
  );
}
