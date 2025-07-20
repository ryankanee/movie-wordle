import { EVALUATION_RESULT } from "../lib/gameLogic";
import { formatGross } from "../lib/movieList";

/**
 * Renders a single movie guess with its evaluation in a two-row layout
 */
export const MovieGuessContainer = ({ movie, evaluation, rowIndex }) => {
  console.log(`MovieGuessContainer rendering: ${movie.title}`, {
    posterUrl: movie.posterUrl,
    posterLoading: movie.posterLoading,
  });

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
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              className="movie-poster"
              width={80}
              height={120}
              loading="lazy"
              onError={(e) => {
                console.log(
                  `Failed to load poster for ${movie.title}: ${movie.posterUrl}`,
                );
                // Try a fallback approach - show a styled placeholder with movie info
                e.target.style.display = "none";
                const placeholder = e.target.nextElementSibling;
                if (placeholder) {
                  placeholder.style.display = "flex";
                  // Update placeholder with movie year
                  const circle = placeholder.querySelector(".poster-circle");
                  if (circle) {
                    circle.innerHTML = `<div style="font-size: 12px; text-align: center; line-height: 1.1;"><div>🎬</div><div>${movie.year}</div></div>`;
                  }
                }
              }}
              onLoad={() => {
                console.log(`Successfully loaded poster for ${movie.title}`);
              }}
            />
          ) : null}
          <div
            className="movie-poster-placeholder"
            style={{ display: movie.posterUrl ? "none" : "flex" }}
          >
            <div className="poster-circle">
              <div
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  lineHeight: "1.1",
                }}
              >
                <div>🎬</div>
                <div>{movie.year}</div>
              </div>
            </div>
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
