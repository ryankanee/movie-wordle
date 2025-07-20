// app/api/search-movie/route.js

import { fetchFromTMDB } from "@/app/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const year = searchParams.get("year");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }

  try {
    console.log(`Searching for movie: ${query} (${year || "any year"})`);

    // Search for the movie
    const searchData = await fetchFromTMDB(
      `/search/movie`,
      `query=${encodeURIComponent(query)}&year=${year || ""}`,
    );

    if (searchData.results && searchData.results.length > 0) {
      // Return the first (most relevant) result with poster info
      const movie = searchData.results[0];
      const baseImageUrl = "https://image.tmdb.org/t/p/w500";
      const tmdbPosterUrl = movie.poster_path
        ? `${baseImageUrl}${movie.poster_path}`
        : null;

      // Use local proxy to bypass network issues
      const posterUrl = tmdbPosterUrl
        ? `/api/proxy-image?url=${encodeURIComponent(tmdbPosterUrl)}`
        : null;

      return NextResponse.json({
        title: movie.title,
        poster_path: movie.poster_path,
        poster_url: posterUrl,
        tmdb_poster_url: tmdbPosterUrl, // Keep original for debugging
        release_date: movie.release_date,
        tmdb_id: movie.id,
      });
    } else {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Search API Error:", error.message);
    return NextResponse.json(
      { error: "Failed to search for movie", details: error.message },
      { status: 500 },
    );
  }
}
