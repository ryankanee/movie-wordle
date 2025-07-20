// app/lib/posterUtils.js

/**
 * Utility functions for handling movie posters
 */

/**
 * Get a fallback poster URL if the main one fails
 */
export function getFallbackPosterUrl(posterPath) {
  if (!posterPath) return null;

  // Try different sizes if the default fails
  const sizes = ["w300", "w185", "w154"];

  return sizes.map((size) => `https://image.tmdb.org/t/p/${size}${posterPath}`);
}

/**
 * Handle poster loading errors with fallbacks
 */
export function handlePosterError(event, posterPath, retryCount = 0) {
  const maxRetries = 2;

  if (retryCount < maxRetries && posterPath) {
    const fallbackUrls = getFallbackPosterUrl(posterPath);
    if (fallbackUrls[retryCount]) {
      event.target.src = fallbackUrls[retryCount];
      event.target.dataset.retryCount = retryCount + 1;
      return;
    }
  }

  // If all fallbacks failed, hide image and show placeholder
  event.target.style.display = "none";
  const placeholder = event.target.nextElementSibling;
  if (
    placeholder &&
    placeholder.classList.contains("movie-poster-placeholder")
  ) {
    placeholder.style.display = "flex";
  }
}
