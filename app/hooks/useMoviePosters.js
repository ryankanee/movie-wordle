// app/hooks/useMoviePosters.js

import { useState } from "react";
import { createLocalMoviePoster } from "../lib/localPosters";

/**
 * Custom hook for managing movie posters
 * Since 99.8% of movies now have preloaded poster URLs, this is much simplified
 */
export function useMoviePosters() {
  const [localPosterCache, setLocalPosterCache] = useState(new Map());

  /**
   * Get local fallback poster for movies without preloaded URLs
   */
  const getLocalPoster = (movie) => {
    const cacheKey = `${movie.title}-${movie.year}`;

    if (localPosterCache.has(cacheKey)) {
      return localPosterCache.get(cacheKey);
    }

    // Generate local poster
    const localPosterUrl = createLocalMoviePoster(
      movie.title,
      movie.year,
      movie.director,
    );

    // Cache it
    setLocalPosterCache(
      (prev) => new Map([...prev, [cacheKey, localPosterUrl]]),
    );

    return localPosterUrl;
  };

  /**
   * Enhanced movie object with poster URL - preloaded or local fallback
   */
  const getEnhancedMovie = (movie) => {
    let posterUrl = movie.posterUrl;

    // If no preloaded poster, use local fallback
    if (!posterUrl) {
      posterUrl = getLocalPoster(movie);
    }

    return {
      ...movie,
      posterUrl: posterUrl,
      posterLoading: false, // No more async loading since we use preloaded data
    };
  };

  /**
   * Simplified method for backward compatibility
   */
  const getMoviePoster = async (movie) => {
    return movie.posterUrl || getLocalPoster(movie);
  };

  return {
    getMoviePoster,
    getEnhancedMovie,
    posterCache: localPosterCache,
    loadingPosters: new Set(), // Empty set since no async loading
  };
}
