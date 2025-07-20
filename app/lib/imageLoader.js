// app/lib/imageLoader.js

/**
 * Custom image loader for TMDB images
 * Handles HTTPS and sizing for movie posters
 */
export default function tmdbImageLoader({ src, width, quality = 75 }) {
  // If it's already a full TMDB URL, use it directly
  if (src.startsWith("https://image.tmdb.org/")) {
    return src;
  }

  // If it's just a poster path, construct the full URL
  const sizeMap = {
    150: "w154",
    300: "w300",
    500: "w500",
    780: "w780",
  };

  // Find the closest size
  const availableSizes = Object.keys(sizeMap)
    .map(Number)
    .sort((a, b) => a - b);
  const targetSize =
    availableSizes.find((size) => size >= width) ||
    availableSizes[availableSizes.length - 1];
  const tmdbSize = sizeMap[targetSize] || "w500";

  return `https://image.tmdb.org/t/p/${tmdbSize}${src.startsWith("/") ? src : "/" + src}`;
}
