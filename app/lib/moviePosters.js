// app/lib/moviePosters.js

/**
 * Fetches poster URLs for movies from TMDB or generates local posters
 */

import { createLocalMoviePoster } from "./localPosters";

// Cache to store poster URLs to avoid repeated API calls
const posterCache = new Map();

/**
 * Fetch poster URL for a single movie
 */
export async function fetchMoviePoster(title, year) {
  const cacheKey = `${title}-${year}`;

  // Return cached result if available
  if (posterCache.has(cacheKey)) {
    return posterCache.get(cacheKey);
  }

  // For now, always generate local posters to bypass network issues
  console.log(`Generating local poster for ${title} (${year})`);
  const localPosterUrl = createLocalMoviePoster(title, year, 300, 450);

  // Cache the result
  posterCache.set(cacheKey, localPosterUrl);
  return localPosterUrl;

  /* 
  // TODO: Re-enable TMDB when network issues are resolved
  // Try TMDB first
  try {
    const response = await fetch(`/api/search-movie?query=${encodeURIComponent(title)}&year=${year}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      const posterUrl = data.poster_url;
      
      if (posterUrl) {
        // Cache the result
        posterCache.set(cacheKey, posterUrl);
        return posterUrl;
      }
    } else if (response.status !== 404) {
      console.warn(`TMDB API error for ${title}: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching TMDB poster for ${title}:`, error.message);
  }

  // Fallback to mock poster service
  try {
    console.log(`Trying mock poster for ${title} (${year})`);
    const mockResponse = await fetch(`/api/mock-poster?title=${encodeURIComponent(title)}&year=${year}`);
    
    if (mockResponse.ok) {
      const mockData = await mockResponse.json();
      const posterUrl = mockData.poster_url;
      
      // Cache the result
      posterCache.set(cacheKey, posterUrl);
      return posterUrl;
    }
  } catch (error) {
    console.error(`Error fetching mock poster for ${title}:`, error.message);
  }
  */
}

/**
 * Fetch poster URLs for multiple movies
 * Returns a Map with movie titles as keys and poster URLs as values
 */
export async function fetchMoviePosters(movies, batchSize = 5) {
  const posterMap = new Map();

  // Process movies in batches to avoid overwhelming the API
  for (let i = 0; i < movies.length; i += batchSize) {
    const batch = movies.slice(i, i + batchSize);

    const promises = batch.map(async (movie) => {
      const posterUrl = await fetchMoviePoster(movie.title, movie.year);
      return { title: movie.title, posterUrl };
    });

    const results = await Promise.all(promises);

    results.forEach(({ title, posterUrl }) => {
      posterMap.set(title, posterUrl);
    });

    // Small delay between batches to be respectful to the API
    if (i + batchSize < movies.length) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return posterMap;
}

/**
 * Enhanced movie object with poster URL
 */
export function addPosterToMovie(movie, posterUrl) {
  return {
    ...movie,
    posterUrl: posterUrl || null,
  };
}
