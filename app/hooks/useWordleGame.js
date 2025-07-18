// Custom hook for managing game state and input-based gameplay

import { useEffect, useState, useCallback } from "react";
import { getRandomWord } from "../lib/wordList";
import {
  createInitialState,
  GAME_STATUS,
  getGameStatus,
  isValidGuess,
} from "../lib/gameLogic";

/**
 * Custom hook for managing Movie Wordle game state
 */
export const useWordleGame = () => {
  const [gameState, setGameState] = useState(() =>
    createInitialState(getRandomWord()),
  );

  const restartGame = useCallback(() => {
    setGameState(createInitialState(getRandomWord()));
  }, []);

  const submitGuess = useCallback((guess) => {
    if (!isValidGuess(guess)) {
      return false; // Invalid guess
    }

    setGameState((currentState) => {
      if (currentState.gameStatus !== GAME_STATUS.PLAYING) {
        return currentState;
      }

      const newGuesses = [...currentState.guesses, guess.toLowerCase()];
      const newGameStatus = getGameStatus(
        guess.toLowerCase(),
        currentState.solution,
        newGuesses.length
      );

      return {
        ...currentState,
        guesses: newGuesses,
        gameStatus: newGameStatus,
      };
    });

    return true; // Valid guess submitted
  }, []);

  return {
    ...gameState,
    restartGame,
    submitGuess,
    isPlaying: gameState.gameStatus === GAME_STATUS.PLAYING,
    hasWon: gameState.gameStatus === GAME_STATUS.WON,
    hasLost: gameState.gameStatus === GAME_STATUS.LOST,
  };
};
