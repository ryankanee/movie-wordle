import { useState, useEffect } from "react";
import { formatGross } from "../lib/movieList";

/**
 * Renders a full-screen celebration or failure overlay
 */
export const GameOverlay = ({ gameStatus, solution, onRestart, guesses }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [animationPhase, setAnimationPhase] = useState("entering");

  useEffect(() => {
    if (gameStatus === "won" || gameStatus === "lost") {
      setShowOverlay(true);
      setAnimationPhase("entering");
      
      // Add a small delay before showing the main content
      const timer = setTimeout(() => {
        setAnimationPhase("showing");
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setShowOverlay(false);
    }
  }, [gameStatus]);

  const handleRestart = () => {
    setAnimationPhase("exiting");
    setTimeout(() => {
      setShowOverlay(false);
      onRestart();
    }, 300);
  };

  if (!showOverlay) return null;

  const isWon = gameStatus === "won";
  const guessCount = guesses.length;

  return (
    <div className={`game-overlay ${animationPhase}`}>
      <div className="overlay-backdrop" onClick={handleRestart} />
      <div className={`overlay-content ${isWon ? "celebration" : "failure"}`}>
        <div className="overlay-header">
          {isWon ? (
            <>
              <div className="celebration-icon">🎉</div>
              <h1 className="overlay-title">Congratulations!</h1>
              <p className="overlay-subtitle">
                You guessed it in {guessCount} {guessCount === 1 ? "try" : "tries"}!
              </p>
            </>
          ) : (
            <>
              <div className="failure-icon">😞</div>
              <h1 className="overlay-title">Game Over</h1>
              <p className="overlay-subtitle">Better luck next time!</p>
            </>
          )}
        </div>

        <div className="movie-reveal-card">
          {/* Movie poster and title section */}
          <div className="card-header">
            <div className="card-image">
              <div className="movie-poster-placeholder">
                <div className="poster-circle">🎬</div>
              </div>
            </div>
            <div className="card-title">
              <div className="card-name">
                <h1>{solution.title}</h1>
              </div>
            </div>
          </div>

          {/* Movie attributes in two rows */}
          <div className="card-body">
            {/* First row - Director, Year, Rating */}
            <div className="movie-row">
              <div className="movie-tile overlay-tile-correct">
                <div className="tile-label">Director</div>
                <div className="tile-value-container">
                  <div className="tile-value">{solution.director}</div>
                </div>
              </div>
              <div className="movie-tile overlay-tile-correct">
                <div className="tile-label">Year</div>
                <div className="tile-value-container">
                  <div className="tile-value">{solution.year}</div>
                </div>
              </div>
              <div className="movie-tile overlay-tile-correct">
                <div className="tile-label">Rating</div>
                <div className="tile-value-container">
                  <div className="tile-value">{solution.rating}</div>
                </div>
              </div>
            </div>
            {/* Second row - Genre, Oscars, Gross */}
            <div className="movie-row">
              <div className="movie-tile overlay-tile-correct">
                <div className="tile-label">Genre</div>
                <div className="tile-value-container">
                  <div className="tile-value">{solution.genre}</div>
                </div>
              </div>
              <div className="movie-tile overlay-tile-correct">
                <div className="tile-label">Oscars</div>
                <div className="tile-value-container">
                  <div className="tile-value">{solution.oscars}</div>
                </div>
              </div>
              <div className="movie-tile overlay-tile-correct">
                <div className="tile-label">Gross</div>
                <div className="tile-value-container">
                  <div className="tile-value">{formatGross(solution.gross)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overlay-actions">
          <button onClick={handleRestart} className="play-again-btn">
            🔄 Play Again
          </button>
        </div>

        {isWon && (
          <div className="confetti">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`confetti-piece confetti-${i % 5}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
