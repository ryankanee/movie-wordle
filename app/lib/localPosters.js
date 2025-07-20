// app/lib/localPosters.js

/**
 * Local poster generation using data URIs and CSS gradients
 * This works completely offline without external dependencies
 */

const colors = [
  { bg: "#4A90E2", text: "#FFFFFF" }, // Blue
  { bg: "#E94B3C", text: "#FFFFFF" }, // Red
  { bg: "#50C878", text: "#FFFFFF" }, // Green
  { bg: "#FFD700", text: "#000000" }, // Gold
  { bg: "#FF8C00", text: "#FFFFFF" }, // Orange
  { bg: "#9370DB", text: "#FFFFFF" }, // Purple
  { bg: "#DC143C", text: "#FFFFFF" }, // Crimson
  { bg: "#32CD32", text: "#FFFFFF" }, // Lime
  { bg: "#FF69B4", text: "#FFFFFF" }, // Pink
  { bg: "#00CED1", text: "#FFFFFF" }, // Turquoise
];

/**
 * Generate a simple hash from string
 */
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Create an SVG data URI for a movie poster
 */
export function createLocalMoviePoster(title, year, width = 300, height = 450) {
  const colorIndex = simpleHash(title + year) % colors.length;
  const { bg, text } = colors[colorIndex];

  // Create abbreviated title if too long
  const shortTitle = title.length > 20 ? title.substring(0, 17) + "..." : title;

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustBrightness(bg, -20)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)" rx="8" ry="8"/>
      <rect x="10" y="10" width="${width - 20}" height="${height - 20}" fill="none" stroke="${text}" stroke-width="2" rx="4" ry="4" opacity="0.3"/>
      
      <!-- Movie icon -->
      <circle cx="${width / 2}" cy="${height * 0.3}" r="30" fill="${text}" opacity="0.8"/>
      <text x="${width / 2}" y="${height * 0.3 + 8}" font-family="Arial, sans-serif" font-size="24" fill="${bg}" text-anchor="middle">🎬</text>
      
      <!-- Title -->
      <text x="${width / 2}" y="${height * 0.6}" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="${text}" text-anchor="middle">
        ${escapeXml(shortTitle)}
      </text>
      
      <!-- Year -->
      <text x="${width / 2}" y="${height * 0.7}" font-family="Arial, sans-serif" font-size="16" fill="${text}" text-anchor="middle" opacity="0.9">
        (${year})
      </text>
      
      <!-- Border -->
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="${text}" stroke-width="1" rx="8" ry="8" opacity="0.5"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/**
 * Adjust color brightness
 */
function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

/**
 * Escape XML characters
 */
function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}
