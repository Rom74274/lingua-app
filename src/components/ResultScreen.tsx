import type { SessionResult } from '../types';

interface Props {
  result: SessionResult;
  onBackHome: () => void;
  onRetry: () => void;
}

export function ResultScreen({ result, onBackHome, onRetry }: Props) {
  const percentage = Math.round((result.correct / result.total) * 100);

  let message: string;
  let emoji: string;
  if (percentage === 100) {
    message = 'Parfait !';
    emoji = '🏆';
  } else if (percentage >= 80) {
    message = 'Excellent !';
    emoji = '🌟';
  } else if (percentage >= 60) {
    message = 'Bien joué !';
    emoji = '💪';
  } else if (percentage >= 40) {
    message = 'Continue comme ça !';
    emoji = '📚';
  } else {
    message = 'Encore un effort !';
    emoji = '🔄';
  }

  return (
    <div className="result-screen">
      <div className="result-hero">
        <span className="result-emoji">{emoji}</span>
        <h2 className="result-message">{message}</h2>
        <div className="result-score">
          <span className="score-number">{percentage}%</span>
          <span className="score-detail">
            {result.correct}/{result.total} correct{result.correct > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* XP earned */}
      <div className="xp-earned">
        +{result.correct * 10 + (result.total - result.correct) * 2} XP
      </div>

      {/* Word review */}
      <div className="word-review">
        <h3>Récapitulatif</h3>
        <div className="word-review-list">
          {result.words.map((item, i) => (
            <div
              key={i}
              className={`word-review-item ${item.correct ? 'correct' : 'incorrect'}`}
            >
              <span className="review-status">
                {item.correct ? '✓' : '✗'}
              </span>
              <span className="review-word">{item.word.word}</span>
              <span className="review-translation">
                {item.word.translation}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="result-actions">
        <button className="btn-primary" onClick={onRetry}>
          Recommencer
        </button>
        <button className="btn-secondary" onClick={onBackHome}>
          Accueil
        </button>
      </div>
    </div>
  );
}
