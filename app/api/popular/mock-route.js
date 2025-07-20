// app/api/popular/mock-route.js

import { NextResponse } from "next/server";

// Mock data for testing
const mockMovies = [
  { id: 1, title: "The Shawshank Redemption", release_date: "1994-09-23" },
  { id: 2, title: "The Godfather", release_date: "1972-03-24" },
  { id: 3, title: "The Dark Knight", release_date: "2008-07-18" },
  { id: 4, title: "Pulp Fiction", release_date: "1994-10-14" },
  { id: 5, title: "Forrest Gump", release_date: "1994-07-06" },
  { id: 6, title: "Inception", release_date: "2010-07-16" },
  { id: 7, title: "The Matrix", release_date: "1999-03-31" },
  { id: 8, title: "Goodfellas", release_date: "1990-09-19" },
  {
    id: 9,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    release_date: "2001-12-19",
  },
  { id: 10, title: "Star Wars", release_date: "1977-05-25" },
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json(mockMovies);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 },
    );
  }
}
