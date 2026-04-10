import { useState, useRef, useEffect } from 'react';
import type { Exercise } from '../types';
import { checkAnswer, getHint } from '../utils/exerciseGenerator';

interface Props {
  exercises: Exercise[];
  currentIndex: number;
  onAnswer: (correct: boolean) => void;
  onQuit: () => void;
}

export function ExerciseScreen({
  exercises,
  currentIndex,
  onAnswer,
  onQuit,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [hintText, setHintText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const clozeInputRef = useRef<HTMLInputElement>(null);

  const exercise = exercises[currentIndex];
  const progress = (currentIndex / exercises.length) * 100;

  useEffect(() => {
    setSelectedOption(null);
    setTypedAnswer('');
    setShowResult(false);
    setIsCorrect(false);
    setRevealed(false);
    setErrorCount(0);
    setHintText(null);
    if (exercise?.type === 'translate' && inputRef.current) {
      inputRef.current.focus();
    }
    if (exercise?.type === 'cloze-type' && clozeInputRef.current) {
      clozeInputRef.current.focus();
    }
  }, [currentIndex, exercise?.type]);

  if (!exercise) return null;

  const prompt =
    exercise.direction === 'to-french'
      ? exercise.word.word
      : exercise.word.translation;

  const directionLabel =
    exercise.type === 'cloze-choice'
      ? 'Complète la phrase'
      : exercise.type === 'cloze-type'
      ? 'Tape le mot manquant'
      : exercise.direction === 'to-french'
      ? 'Traduis en français'
      : exercise.word.language === 'en'
      ? 'Traduis en anglais'
      : 'Traduis en espagnol';

  const langLabel = exercise.word.language === 'en' ? '🇬🇧' : '🇪🇸';

  function handleMultipleChoiceSelect(option: string) {
    if (showResult) return;
    setSelectedOption(option);
    const correct = option === exercise.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setTimeout(() => onAnswer(correct), 1200);
  }

  function handleTranslateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (showResult || !typedAnswer.trim()) return;
    const correct = checkAnswer(typedAnswer, exercise.correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);
    setTimeout(() => onAnswer(correct), 1500);
  }

  function handleReveal() {
    setRevealed(true);
    setTypedAnswer(exercise.correctAnswer);
    setIsCorrect(false);
    setShowResult(true);
    setTimeout(() => onAnswer(false), 1500);
  }

  function handleClozeTypeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (showResult || !typedAnswer.trim()) return;

    const correct = checkAnswer(typedAnswer, exercise.correctAnswer);

    if (correct) {
      setIsCorrect(true);
      setShowResult(true);
      setTimeout(() => onAnswer(true), 1200);
    } else {
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);

      if (newErrorCount === 1) {
        // First error: show half the word as hint
        const hint = getHint(exercise.correctAnswer, 1);
        setHintText(hint);
        setTypedAnswer('');
        if (clozeInputRef.current) clozeInputRef.current.focus();
      } else {
        // Second error: reveal full answer
        setHintText(null);
        setTypedAnswer(exercise.correctAnswer);
        setIsCorrect(false);
        setShowResult(true);
        setTimeout(() => onAnswer(false), 1800);
      }
    }
  }

  // Render sentence with blank highlighted
  function renderSentence(sentence: string) {
    const parts = sentence.split('______');
    if (parts.length < 2) return <span>{sentence}</span>;

    return (
      <span>
        {parts[0]}
        <span className="cloze-blank">______</span>
        {parts[1]}
      </span>
    );
  }

  return (
    <div className="exercise-screen">
      {/* Header */}
      <div className="exercise-header">
        <button className="btn-close" onClick={onQuit}>
          ✕
        </button>
        <div className="progress-bar-container exercise-progress">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="exercise-counter">
          {currentIndex + 1}/{exercises.length}
        </span>
      </div>

      {/* === MULTIPLE CHOICE === */}
      {exercise.type === 'multiple-choice' && (
        <>
          <div className="exercise-prompt">
            <span className="direction-label">{directionLabel}</span>
            <div className="prompt-word">
              <span className="prompt-flag">{langLabel}</span>
              <span className="prompt-text">{prompt}</span>
            </div>
          </div>

          <div className="options-grid">
            {exercise.options?.map((option, i) => {
              let className = 'option-btn';
              if (showResult) {
                if (option === exercise.correctAnswer) {
                  className += ' correct';
                } else if (option === selectedOption) {
                  className += ' incorrect';
                }
              } else if (option === selectedOption) {
                className += ' selected';
              }

              return (
                <button
                  key={i}
                  className={className}
                  onClick={() => handleMultipleChoiceSelect(option)}
                  disabled={showResult}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* === TRANSLATE (with reveal button) === */}
      {exercise.type === 'translate' && (
        <>
          <div className="exercise-prompt">
            <span className="direction-label">{directionLabel}</span>
            <div className="prompt-word">
              <span className="prompt-flag">{langLabel}</span>
              <span className="prompt-text">{prompt}</span>
            </div>
          </div>

          <form className="translate-form" onSubmit={handleTranslateSubmit}>
            <input
              ref={inputRef}
              type="text"
              className={`translate-input ${
                showResult ? (isCorrect ? 'correct' : 'incorrect') : ''
              }`}
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              placeholder="Tape ta réponse..."
              disabled={showResult}
              autoComplete="off"
              autoCapitalize="off"
            />
            {!showResult && (
              <div className="translate-actions">
                <button
                  type="button"
                  className="btn-reveal"
                  onClick={handleReveal}
                >
                  Révéler la réponse
                </button>
                <button
                  type="submit"
                  className="btn-primary submit-btn"
                  disabled={!typedAnswer.trim()}
                >
                  Valider
                </button>
              </div>
            )}
          </form>
        </>
      )}

      {/* === CLOZE WITH CHOICES === */}
      {exercise.type === 'cloze-choice' && (
        <>
          <div className="exercise-prompt">
            <span className="direction-label">{directionLabel}</span>
          </div>

          <div className="cloze-card">
            <div className="cloze-sentence">
              <span className="cloze-flag">{langLabel}</span>
              {renderSentence(exercise.sentence || '')}
            </div>
            {exercise.sentenceTranslation && (
              <div className="cloze-translation">
                🇫🇷 {exercise.sentenceTranslation}
              </div>
            )}
          </div>

          <div className="options-grid">
            {exercise.options?.map((option, i) => {
              let className = 'option-btn';
              if (showResult) {
                if (option === exercise.correctAnswer) {
                  className += ' correct';
                } else if (option === selectedOption) {
                  className += ' incorrect';
                }
              } else if (option === selectedOption) {
                className += ' selected';
              }

              return (
                <button
                  key={i}
                  className={className}
                  onClick={() => handleMultipleChoiceSelect(option)}
                  disabled={showResult}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* === CLOZE TYPE (with progressive hints) === */}
      {exercise.type === 'cloze-type' && (
        <>
          <div className="exercise-prompt">
            <span className="direction-label">{directionLabel}</span>
          </div>

          <div className="cloze-card">
            <div className="cloze-sentence">
              <span className="cloze-flag">{langLabel}</span>
              {renderSentence(exercise.sentence || '')}
            </div>
            {exercise.sentenceTranslation && (
              <div className="cloze-translation">
                🇫🇷 {exercise.sentenceTranslation}
              </div>
            )}
          </div>

          {/* Hint display */}
          {hintText && !showResult && (
            <div className="hint-box">
              <span className="hint-label">Indice :</span>
              <span className="hint-text">{hintText}</span>
            </div>
          )}

          {/* Error counter */}
          {errorCount > 0 && !showResult && (
            <div className="error-counter">
              {errorCount === 1
                ? '1 erreur — encore un essai !'
                : ''}
            </div>
          )}

          <form className="translate-form" onSubmit={handleClozeTypeSubmit}>
            <input
              ref={clozeInputRef}
              type="text"
              className={`translate-input ${
                showResult
                  ? isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : errorCount > 0
                  ? 'has-error'
                  : ''
              }`}
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              placeholder="Tape le mot manquant..."
              disabled={showResult}
              autoComplete="off"
              autoCapitalize="off"
            />
            {!showResult && (
              <button
                type="submit"
                className="btn-primary submit-btn"
                disabled={!typedAnswer.trim()}
              >
                Valider
              </button>
            )}
          </form>
        </>
      )}

      {/* Result feedback (shared) */}
      {showResult && (
        <div
          className={`result-feedback ${
            isCorrect ? 'correct' : 'incorrect'
          }`}
        >
          {isCorrect ? (
            <span className="result-text">Correct !</span>
          ) : (
            <div className="result-wrong">
              <span className="result-text">
                {revealed ? 'Réponse révélée' : 'Pas tout à fait...'}
              </span>
              <span className="correct-answer">
                {exercise.correctAnswer}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
