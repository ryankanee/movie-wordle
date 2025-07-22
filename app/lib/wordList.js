import { movies } from "./movieList";
import Fuse from "fuse.js";

// Configure Fuse.js for fuzzy searching
const fuseOptions = {
  keys: [
    {
      name: "title",
      weight: 1
    },
    {
      name: "normalizedTitle",
      weight: 0.8
    }
  ],
  threshold: 0.4, // Lower = more strict, Higher = more fuzzy
  distance: 100,
  includeScore: true,
  minMatchCharLength: 1,
  shouldSort: true
};

// Normalize titles by removing articles and common prefixes
function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/^(the|a|an)\s+/i, "") // Remove articles from beginning
    .replace(/[^\w\s]/g, "") // Remove special characters
    .trim();
}

// Prepare movies data with normalized titles for better searching
const moviesWithNormalized = movies.map(movie => ({
  ...movie,
  normalizedTitle: normalizeTitle(movie.title)
}));

// Initialize Fuse instance
const fuse = new Fuse(moviesWithNormalized, fuseOptions);

export function getRandomWord() {
  // This is now deprecated, use getRandomMovie from movieList instead
  return movies[Math.floor(Math.random() * movies.length)].title.toLowerCase();
}

export function getMovieSuggestions(input) {
  if (!input || input.length < 1) return [];

  // First try fuzzy search
  const fuzzyResults = fuse.search(input);
  
  // If we have good fuzzy results, use them
  if (fuzzyResults.length > 0) {
    return fuzzyResults
      .slice(0, 10) // Limit to 10 suggestions
      .map(result => result.item.title);
  }
  
  // Fallback to original exact matching for very short inputs
  const lowerInput = input.toLowerCase();
  return movies
    .filter((movie) => movie.title.toLowerCase().startsWith(lowerInput))
    .map((movie) => movie.title)
    .slice(0, 10);
}

export function isValidMovieTitle(title) {
  // First check for exact match
  const exactMatch = movies.some(
    (movie) => movie.title.toLowerCase() === title.toLowerCase(),
  );
  
  if (exactMatch) return true;
  
  // If no exact match, try fuzzy search with strict threshold
  const strictFuseOptions = {
    ...fuseOptions,
    threshold: 0.2 // Very strict for validation
  };
  
  const strictFuse = new Fuse(moviesWithNormalized, strictFuseOptions);
  const fuzzyResults = strictFuse.search(title);
  
  // Accept if we have a very close fuzzy match
  return fuzzyResults.length > 0 && fuzzyResults[0].score < 0.2;
}
