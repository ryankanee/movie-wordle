import { evaluateMovieGuess } from "../lib/gameLogic";
import { MovieGuessContainer } from "./MovieGuessContainer";

/**
 * Renders the game grid with movie information for each guess
 */
export const GameGrid = ({ guesses, solution, gameStatus }) => {
  const renderGrid = () => {
    const rows = [];

    // Render completed guesses in reverse order (most recent first)
    guesses
      .slice()
      .reverse()
      .forEach((guessMovie, reverseIndex) => {
        const originalIndex = guesses.length - 1 - reverseIndex;
        const evaluation = evaluateMovieGuess(guessMovie, solution);
        rows.push(
          <MovieGuessContainer
            key={originalIndex}
            movie={guessMovie}
            evaluation={evaluation}
            rowIndex={originalIndex}
          />
        );
      });

    return rows;
  };

  return (
    <div className="movie-grid-container">
      {renderGrid()}
    </div>
  );
};
