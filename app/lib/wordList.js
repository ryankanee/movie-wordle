import { movies } from "./movieList";

export function getRandomWord() {
  // This is now deprecated, use getRandomMovie from movieList instead
  return movies[Math.floor(Math.random() * movies.length)].title.toLowerCase();
}

export function getMovieSuggestions(input) {
  if (!input || input.length < 1) return [];

  const lowerInput = input.toLowerCase();
  return movies
    .filter((movie) => movie.title.toLowerCase().startsWith(lowerInput))
    .map((movie) => movie.title)
    .slice(0, 10); // Limit to 10 suggestions
}

export function isValidMovieTitle(title) {
  return movies.some(
    (movie) => movie.title.toLowerCase() === title.toLowerCase(),
  );
}
