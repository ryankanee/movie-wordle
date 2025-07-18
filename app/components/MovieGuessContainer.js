import { EVALUATION_RESULT } from "../lib/gameLogic";
import { formatGross } from "../lib/movieList";

/**
 * Renders a single movie guess with its evaluation in a two-row layout
 */
export const MovieGuessContainer = ({ movie, evaluation, rowIndex }) => {
  const attributes = [
    { key: "title", label: "Title", value: movie.title },
    { key: "director", label: "Director", value: movie.director },
    { key: "year", label: "Year", value: movie.year },
    { key: "genre", label: "Genre", value: movie.genre },
    { key: "gross", label: "Gross", value: formatGross(movie.gross) },
    { key: "oscars", label: "Oscars", value: movie.oscars },
    { key: "rating", label: "Rating", value: movie.rating },
  ];

  const renderTile = (attr, colIndex, rowOffset = 0) => {
    const attrEvaluation = evaluation[attr.key];
    const status = attrEvaluation?.status || attrEvaluation; // Handle both old and new format
    const direction = attrEvaluation?.direction;

    return (
      <div
        key={attr.key}
        className={`movie-tile ${
          status === EVALUATION_RESULT.CORRECT
            ? "tile-correct"
            : status === EVALUATION_RESULT.CLOSE
              ? "tile-close"
              : "tile-incorrect"
        }`}
        style={{
          animationDelay: `${(colIndex + rowOffset) * 0.1}s`,
        }}
      >
        <div className="tile-label">{attr.label}</div>
        <div className="tile-value-container">
          <div className="tile-value">{attr.value}</div>
          {status === EVALUATION_RESULT.INCORRECT && direction && (
            <div className={`direction-arrow ${direction}`}>
              {direction === "up" ? "↑" : "↓"}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="movie-guess-container">
      {/* Header section with image and title */}
      <div className="card-header">
        <div className="card-image">
          {/* Movie poster image would go here */}
          <div className="movie-poster-placeholder">
            <div className="poster-circle">🎬</div>
          </div>
        </div>
        <div className="card-title">
          <div className="card-name">
            <h1>{movie.title}</h1>
          </div>
        </div>
      </div>

      {/* Movie attributes in two rows */}
      <div className="card-body">
        {/* First row - Director, Year, Rating */}
        <div className="movie-row">
          {[attributes[1], attributes[2], attributes[6]].map((attr, colIndex) =>
            renderTile(attr, colIndex),
          )}
        </div>
        {/* Second row - Genre, Oscars, Gross */}
        <div className="movie-row">
          {[attributes[3], attributes[5], attributes[4]].map((attr, colIndex) =>
            renderTile(attr, colIndex, 3),
          )}
        </div>
      </div>
    </div>
  );
};
