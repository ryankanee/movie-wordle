// lib/tmdb.js

const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchFromTMDB(endpoint, params = "") {
  const res = await fetch(
    `${BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}&${params}`,
  );

  if (!res.ok) {
    throw new Error(`TMDb API error: ${res.status}`);
  }

  return res.json();
}
