import { 
  GameHeader,
  GameGrid,
  GameOverlay,
  GuessInput,
} from "./index";

/**
 * Home section component - contains the main game
 */
export const Home = ({ 
  solution, 
  guesses, 
  gameStatus, 
  restartGame, 
  submitGuess, 
  isPlaying 
}) => {
  return (
    <div className="home-container">
      <div className="game-board">
        <GuessInput
          onSubmit={submitGuess}
          isPlaying={isPlaying}
          guesses={guesses}
        />

        <GameGrid
          guesses={guesses}
          solution={solution}
          gameStatus={gameStatus}
        />

        <GameOverlay
          gameStatus={gameStatus}
          solution={solution}
          onRestart={restartGame}
          guesses={guesses}
        />
      </div>
    </div>
  );
};
