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
        <p>Guess the movie title in 6 tries or fewer</p>
        <p>Each guess will show you movie information with color-coded hints</p>
      </div>
      <div className="legend">
        <div className="legend-item">
          <div className="legend-tile tile-correct">Match</div>
          <span>Exact match (Green)</span>
        </div>
        <div className="legend-item">
          <div className="legend-tile tile-close">Close</div>
          <span>Close match (Yellow) - Year: ±5, Gross: ±$50M, Oscars: ±1</span>
        </div>
        <div className="legend-item">
          <div className="legend-tile tile-incorrect">Wrong</div>
          <span>No match (Red)</span>
        </div>
      </div>
    </div>
  );
};
