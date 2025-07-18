import { evaluateGuess, EVALUATION_RESULT } from "../lib/gameLogic";

/**
 * Renders the game grid with all rows (no current guess row)
 */
export const GameGrid = ({ guesses, solution, gameStatus }) => {
  const renderGrid = () => {
    const rows = [];

    // Render completed guesses
    guesses.forEach((guess, rowIndex) => {
      const evaluation = evaluateGuess(guess, solution);
      rows.push(
        <div key={rowIndex} className="row">
          {guess.split("").map((letter, colIndex) => (
            <div
              key={colIndex}
              className={`tile tile-flip ${
                evaluation[colIndex] === EVALUATION_RESULT.CORRECT
                  ? "tile-correct"
                  : evaluation[colIndex] === EVALUATION_RESULT.PRESENT
                    ? "tile-present"
                    : "tile-absent"
              }`}
              style={{
                animationDelay: `${colIndex * 0.1}s`,
              }}
            >
              {letter.toUpperCase()}
            </div>
          ))}
        </div>,
      );
    });

    // Only show completed guesses - no empty rows
    return rows;
  };

  return <div className="grid-container">{renderGrid()}</div>;
};
