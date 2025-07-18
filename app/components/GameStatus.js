/**
 * Renders the game status (win/lose messages)
 */
export const GameStatus = ({ gameStatus, solution, onRestart }) => {
  if (gameStatus === "won") {
    return (
      <div className="status-box status-win">
        <p className="status-title">🎉 Congratulations!</p>
        <p className="status-text">
          The movie was:{" "}
          <span className="solution-text">{solution.toUpperCase()}</span>
        </p>
        <button onClick={onRestart} className="btn btn-primary">
          🔄 Play Again
        </button>
      </div>
    );
  }

  if (gameStatus === "lost") {
    return (
      <div className="status-box status-lose">
        <p className="status-title">😞 Game Over</p>
        <p className="status-text">
          The movie was:{" "}
          <span className="solution-text">{solution.toUpperCase()}</span>
        </p>
        <button onClick={onRestart} className="btn btn-primary">
          🔄 Try Again
        </button>
      </div>
    );
  }

  return null;
};
