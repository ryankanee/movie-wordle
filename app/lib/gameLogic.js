// Game logic for Movie Wordle

export const GAME_STATUS = {
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost'
};

export const EVALUATION_RESULT = {
  CORRECT: 'correct',
  PRESENT: 'present',
  ABSENT: 'absent'
};

/**
 * Evaluates a guess against the solution
 * @param {string} guess - The player's guess
 * @param {string} solution - The correct answer
 * @returns {Array<string>} Array of evaluation results
 */
export const evaluateGuess = (guess, solution) => {
  const result = [];
  const solutionArray = solution.split("");
  const guessArray = guess.split("");

  // First pass: mark correct letters (green)
  const letterCounts = {};
  for (let i = 0; i < solutionArray.length; i++) {
    const letter = solutionArray[i];
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
  }

  // Check for exact matches first
  for (let i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === solutionArray[i]) {
      result[i] = EVALUATION_RESULT.CORRECT;
      letterCounts[guessArray[i]]--;
    }
  }

  // Second pass: mark present letters (yellow) and absent letters (gray)
  for (let i = 0; i < guessArray.length; i++) {
    if (result[i] === EVALUATION_RESULT.CORRECT) continue;

    const letter = guessArray[i];
    if (letterCounts[letter] > 0) {
      result[i] = EVALUATION_RESULT.PRESENT;
      letterCounts[letter]--;
    } else {
      result[i] = EVALUATION_RESULT.ABSENT;
    }
  }

  return result;
};

/**
 * Checks if a guess is valid
 * @param {string} guess - The player's guess
 * @returns {boolean} Whether the guess is valid
 */
export const isValidGuess = (guess) => {
  return guess.length === 5 && /^[a-zA-Z]{5}$/.test(guess);
};

/**
 * Determines the game status after a guess
 * @param {string} guess - The player's guess
 * @param {string} solution - The correct answer
 * @param {number} guessCount - Number of guesses made
 * @param {number} maxGuesses - Maximum number of guesses allowed
 * @returns {string} The new game status
 */
export const getGameStatus = (guess, solution, guessCount, maxGuesses = 6) => {
  if (guess === solution) {
    return GAME_STATUS.WON;
  }
  
  if (guessCount >= maxGuesses) {
    return GAME_STATUS.LOST;
  }
  
  return GAME_STATUS.PLAYING;
};

/**
 * Processes a key press and returns the new game state
 * @param {string} key - The pressed key
 * @param {Object} currentState - Current game state
 * @returns {Object} New game state
 */
export const processKeyPress = (key, currentState) => {
  const { currentGuess, guesses, solution, gameStatus } = currentState;
  
  // Don't allow input if game is over
  if (gameStatus !== GAME_STATUS.PLAYING) {
    return currentState;
  }

  if (key === "Enter" && isValidGuess(currentGuess)) {
    const newGuesses = [...guesses, currentGuess];
    const newGameStatus = getGameStatus(currentGuess, solution, newGuesses.length);
    
    return {
      ...currentState,
      guesses: newGuesses,
      currentGuess: "",
      gameStatus: newGameStatus
    };
  } else if (key === "Backspace") {
    return {
      ...currentState,
      currentGuess: currentGuess.slice(0, -1)
    };
  } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
    return {
      ...currentState,
      currentGuess: currentGuess + key.toLowerCase()
    };
  }

  return currentState;
};

/**
 * Creates initial game state
 * @param {string} solution - The word to guess
 * @returns {Object} Initial game state
 */
export const createInitialState = (solution) => ({
  solution,
  guesses: [],
  currentGuess: "",
  gameStatus: GAME_STATUS.PLAYING
});
