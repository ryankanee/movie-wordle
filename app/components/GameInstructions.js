/**
 * Renders the game instructions
 */
export const GameInstructions = ({ gameStatus }) => {
  return (
    <div className="instructions">
      <p className="instructions-title">🎯 How to Play Movie Wordle</p>
      <div className="instructions-text">
        <p>
          Start typing to see movie suggestions, then click to make your guess
        </p>
        <p>Guess the 5-letter movie title in 6 tries or fewer</p>
      </div>
      <div className="legend">
        <div className="legend-item">
          <div className="legend-tile tile-correct">A</div>
          <span>Correct letter in correct position</span>
        </div>
        <div className="legend-item">
          <div className="legend-tile tile-present">B</div>
          <span>Correct letter in wrong position</span>
        </div>
        <div className="legend-item">
          <div className="legend-tile tile-absent">C</div>
          <span>Letter not in movie title</span>
        </div>
      </div>
    </div>
  );
};
