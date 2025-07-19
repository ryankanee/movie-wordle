// Custom hook for managing game state and movie-based gameplay

import { useEffect, useState, useCallback } from "react";
import { getRandomMovie, movieList } from "../lib/movieList";
import {
  createInitialState,
  GAME_STATUS,
  getGameStatus,
  isValidMovieGuess,
  findMovieByTitle,
} from "../lib/gameLogic";

/**
 * Custom hook for managing Movie Wordle game state
 */
export const useWordleGame = () => {
  const [gameState, setGameState] = useState(() =>
    createInitialState(getRandomMovie()),
  );
  const [showInstructions, setShowInstructions] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const restartGame = useCallback(() => {
    setGameState(createInitialState(getRandomMovie()));
    setShowInstructions(false); // Don't show instructions again on restart
  }, []);

  const closeInstructions = useCallback(() => {
    setShowInstructions(false);
  }, []);

  const showInstructionsOnDemand = useCallback(() => {
    setShowInstructions(true);
  }, []);

  const showHome = useCallback(() => {
    setActiveSection('home');
  }, []);

  const showAbout = useCallback(() => {
    setActiveSection('about');
  }, []);

  const submitGuess = useCallback((movieTitle) => {
    if (!isValidMovieGuess(movieTitle, movieList)) {
      return false; // Invalid guess
    }

    const guessMovie = findMovieByTitle(movieTitle, movieList);
    if (!guessMovie) {
      return false; // Movie not found
    }

    setGameState((currentState) => {
      if (currentState.gameStatus !== GAME_STATUS.PLAYING) {
        return currentState;
      }

      const newGuesses = [...currentState.guesses, guessMovie];
      const newGameStatus = getGameStatus(
        guessMovie,
        currentState.solution,
        newGuesses.length,
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
    showInstructions,
    closeInstructions,
    showInstructionsOnDemand,
    activeSection,
    showHome,
    showAbout,
  };
};
