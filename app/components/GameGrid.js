import { evaluateMovieGuess } from "../lib/gameLogic";
import { MovieGuessContainer } from "./MovieGuessContainer";

/**
 * Renders the game grid with movie information for each guess
 */
export const GameGrid = ({ guesses, solution, gameStatus }) => {
  const renderGrid = () => {
    const rows = [];

    // Render completed guesses
    guesses.forEach((guessMovie, rowIndex) => {
      const evaluation = evaluateMovieGuess(guessMovie, solution);
      rows.push(
        <MovieGuessContainer
          key={rowIndex}
          movie={guessMovie}
          evaluation={evaluation}
          rowIndex={rowIndex}
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
