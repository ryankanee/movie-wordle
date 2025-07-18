// Game logic for Movie Wordle

export const GAME_STATUS = {
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
};

export const EVALUATION_RESULT = {
  CORRECT: "correct",
  CLOSE: "close",
  INCORRECT: "incorrect",
};

/**
 * Evaluates a movie guess against the solution
 * @param {Object} guessMovie - The guessed movie object
 * @param {Object} solutionMovie - The correct movie object
 * @returns {Object} Object with evaluation results for each attribute
 */
export const evaluateMovieGuess = (guessMovie, solutionMovie) => {
  const result = {};

  // Title evaluation
  result.title = {
    status:
      guessMovie.title.toLowerCase() === solutionMovie.title.toLowerCase()
        ? EVALUATION_RESULT.CORRECT
        : EVALUATION_RESULT.INCORRECT,
  };

  // Director evaluation
  result.director = {
    status:
      guessMovie.director.toLowerCase() === solutionMovie.director.toLowerCase()
        ? EVALUATION_RESULT.CORRECT
        : EVALUATION_RESULT.INCORRECT,
  };

  // Year evaluation
  const yearDiff = Math.abs(guessMovie.year - solutionMovie.year);
  if (yearDiff === 0) {
    result.year = { status: EVALUATION_RESULT.CORRECT };
  } else if (yearDiff <= 5) {
    result.year = { status: EVALUATION_RESULT.CLOSE };
  } else {
    result.year = {
      status: EVALUATION_RESULT.INCORRECT,
      direction: guessMovie.year < solutionMovie.year ? "up" : "down",
    };
  }

  // Genre evaluation
  result.genre = {
    status:
      guessMovie.genre.toLowerCase() === solutionMovie.genre.toLowerCase()
        ? EVALUATION_RESULT.CORRECT
        : EVALUATION_RESULT.INCORRECT,
  };

  // Gross evaluation (within 50 million = close)
  const grossDiff = Math.abs(guessMovie.gross - solutionMovie.gross);
  if (grossDiff === 0) {
    result.gross = { status: EVALUATION_RESULT.CORRECT };
  } else if (grossDiff <= 50000000) {
    // 50 million
    result.gross = { status: EVALUATION_RESULT.CLOSE };
  } else {
    result.gross = {
      status: EVALUATION_RESULT.INCORRECT,
      direction: guessMovie.gross < solutionMovie.gross ? "up" : "down",
    };
  }

  // Oscars evaluation (within 1 = close)
  const oscarDiff = Math.abs(guessMovie.oscars - solutionMovie.oscars);
  if (oscarDiff === 0) {
    result.oscars = { status: EVALUATION_RESULT.CORRECT };
  } else if (oscarDiff <= 1) {
    result.oscars = { status: EVALUATION_RESULT.CLOSE };
  } else {
    result.oscars = {
      status: EVALUATION_RESULT.INCORRECT,
      direction: guessMovie.oscars < solutionMovie.oscars ? "up" : "down",
    };
  }

  // Rating evaluation
  result.rating = {
    status:
      guessMovie.rating === solutionMovie.rating
        ? EVALUATION_RESULT.CORRECT
        : EVALUATION_RESULT.INCORRECT,
  };

  return result;
};

/**
 * Checks if a movie title guess is valid
 * @param {string} movieTitle - The movie title to check
 * @param {Array} movieList - Array of valid movies
 * @returns {boolean} Whether the guess is valid
 */
export const isValidMovieGuess = (movieTitle, movieList) => {
  return movieList.some(
    (movie) => movie.title.toLowerCase() === movieTitle.toLowerCase(),
  );
};

/**
 * Finds a movie by title
 * @param {string} title - The movie title to find
 * @param {Array} movieList - Array of movies
 * @returns {Object|null} The movie object or null if not found
 */
export const findMovieByTitle = (title, movieList) => {
  return (
    movieList.find(
      (movie) => movie.title.toLowerCase() === title.toLowerCase(),
    ) || null
  );
};

/**
 * Determines the game status after a guess
 * @param {Object} guessMovie - The guessed movie object
 * @param {Object} solutionMovie - The correct movie object
 * @param {number} guessCount - Number of guesses made
 * @param {number} maxGuesses - Maximum number of guesses allowed
 * @returns {string} The new game status
 */
export const getGameStatus = (
  guessMovie,
  solutionMovie,
  guessCount,
  maxGuesses = 6,
) => {
  if (guessMovie.title.toLowerCase() === solutionMovie.title.toLowerCase()) {
    return GAME_STATUS.WON;
  }

  if (guessCount >= maxGuesses) {
    return GAME_STATUS.LOST;
  }

  return GAME_STATUS.PLAYING;
};

/**
 * Creates initial game state
 * @param {Object} solutionMovie - The movie to guess
 * @returns {Object} Initial game state
 */
export const createInitialState = (solutionMovie) => ({
  solution: solutionMovie,
  guesses: [],
  gameStatus: GAME_STATUS.PLAYING,
});
