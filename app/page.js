"use client";

import { useWordleGame } from "./hooks/useWordleGame";
import {
  GameHeader,
  GameGrid,
  GameStatus,
  GameInstructions,
  GuessInput,
} from "./components";

export default function HomePage() {
  const { solution, guesses, gameStatus, restartGame, submitGuess, isPlaying } =
    useWordleGame();

  return (
    <div className="game-container">
      <div className="game-board">
        <GameHeader />

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

        <GameStatus
          gameStatus={gameStatus}
          solution={solution}
          onRestart={restartGame}
        />

        <GameInstructions gameStatus={gameStatus} />
      </div>
    </div>
  );
}
