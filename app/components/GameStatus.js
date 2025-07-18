import { formatGross } from "../lib/movieList";

/**
 * Renders the game status (win/lose messages)
 */
export const GameStatus = ({ gameStatus, solution, onRestart }) => {
  if (gameStatus === "won") {
    return (
      <div className="status-box status-win">
        <p className="status-title">🎉 Congratulations!</p>
        <p className="status-text">
          You guessed the movie:{" "}
          <span className="solution-text">{solution.title}</span>
        </p>
        <div className="solution-details">
          <p>
            <strong>Director:</strong> {solution.director}
          </p>
          <p>
            <strong>Year:</strong> {solution.year}
          </p>
          <p>
            <strong>Genre:</strong> {solution.genre}
          </p>
          <p>
            <strong>Gross:</strong> {formatGross(solution.gross)}
          </p>
          <p>
            <strong>Oscars:</strong> {solution.oscars}
          </p>
          <p>
            <strong>Rating:</strong> {solution.rating}
          </p>
        </div>
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
          The movie was: <span className="solution-text">{solution.title}</span>
        </p>
        <div className="solution-details">
          <p>
            <strong>Director:</strong> {solution.director}
          </p>
          <p>
            <strong>Year:</strong> {solution.year}
          </p>
          <p>
            <strong>Genre:</strong> {solution.genre}
          </p>
          <p>
            <strong>Gross:</strong> {formatGross(solution.gross)}
          </p>
          <p>
            <strong>Oscars:</strong> {solution.oscars}
          </p>
          <p>
            <strong>Rating:</strong> {solution.rating}
          </p>
        </div>
        <button onClick={onRestart} className="btn btn-primary">
          🔄 Try Again
        </button>
      </div>
    );
  }

  return null;
};
