import type { UserStats, CardProgress } from '../types';
import { vocabulary } from '../data/vocabulary';

interface Props {
  stats: UserStats;
  progress: Record<string, CardProgress>;
  onBack: () => void;
}

export function ProgressScreen({ stats, progress, onBack }: Props) {
  const enWords = vocabulary.filter((w) => w.language === 'en');
  const esWords = vocabulary.filter((w) => w.language === 'es');

  const enLearned = enWords.filter(
    (w) => progress[w.id] && progress[w.id].repetitions > 0
  ).length;
  const esLearned = esWords.filter(
    (w) => progress[w.id] && progress[w.id].repetitions > 0
  ).length;

  const enMastered = enWords.filter(
    (w) => progress[w.id] && progress[w.id].repetitions >= 3
  ).length;
  const esMastered = esWords.filter(
    (w) => progress[w.id] && progress[w.id].repetitions >= 3
  ).length;

  return (
    <div className="progress-screen">
      <div className="screen-header">
        <button className="btn-back" onClick={onBack}>
          ← Retour
        </button>
        <h2>Ma progression</h2>
      </div>

      {/* Overall stats */}
      <div className="progress-stats-grid">
        <div className="progress-stat-card">
          <span className="progress-stat-value">{stats.streak}</span>
          <span className="progress-stat-label">🔥 Jours de suite</span>
        </div>
        <div className="progress-stat-card">
          <span className="progress-stat-value">{stats.xp}</span>
          <span className="progress-stat-label">⭐ XP total</span>
        </div>
        <div className="progress-stat-card">
          <span className="progress-stat-value">Niv. {stats.level}</span>
          <span className="progress-stat-label">🎯 Niveau</span>
        </div>
        <div className="progress-stat-card">
          <span className="progress-stat-value">{stats.totalExercises}</span>
          <span className="progress-stat-label">📝 Exercices</span>
        </div>
      </div>

      {/* English progress */}
      <div className="language-progress-card">
        <h3>🇬🇧 Anglais</h3>
        <div className="lang-progress-details">
          <div className="lang-progress-row">
            <span>Mots vus</span>
            <div className="mini-progress">
              <div
                className="mini-progress-fill"
                style={{
                  width: `${(enLearned / enWords.length) * 100}%`,
                }}
              />
            </div>
            <span>
              {enLearned}/{enWords.length}
            </span>
          </div>
          <div className="lang-progress-row">
            <span>Maîtrisés</span>
            <div className="mini-progress">
              <div
                className="mini-progress-fill mastered"
                style={{
                  width: `${(enMastered / enWords.length) * 100}%`,
                }}
              />
            </div>
            <span>
              {enMastered}/{enWords.length}
            </span>
          </div>
        </div>
      </div>

      {/* Spanish progress */}
      <div className="language-progress-card">
        <h3>🇪🇸 Espagnol</h3>
        <div className="lang-progress-details">
          <div className="lang-progress-row">
            <span>Mots vus</span>
            <div className="mini-progress">
              <div
                className="mini-progress-fill"
                style={{
                  width: `${(esLearned / esWords.length) * 100}%`,
                }}
              />
            </div>
            <span>
              {esLearned}/{esWords.length}
            </span>
          </div>
          <div className="lang-progress-row">
            <span>Maîtrisés</span>
            <div className="mini-progress">
              <div
                className="mini-progress-fill mastered"
                style={{
                  width: `${(esMastered / esWords.length) * 100}%`,
                }}
              />
            </div>
            <span>
              {esMastered}/{esWords.length}
            </span>
          </div>
        </div>
      </div>

      {/* Next XP milestone */}
      <div className="xp-milestone">
        <span>Prochain niveau : {stats.level * 100} XP</span>
        <div className="mini-progress">
          <div
            className="mini-progress-fill"
            style={{
              width: `${((stats.xp % 100) / 100) * 100}%`,
            }}
          />
        </div>
        <span>{100 - (stats.xp % 100)} XP restants</span>
      </div>
    </div>
  );
}
