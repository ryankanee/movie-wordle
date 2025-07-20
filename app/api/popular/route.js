// app/api/popular/route.js

import { fetchFromTMDB } from "@/app/lib/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("API Key exists:", !!process.env.TMDB_API_KEY);
    const data = await fetchFromTMDB("/movie/popular");
    return NextResponse.json(data.results);
  } catch (error) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch popular movies", details: error.message },
      { status: 500 },
    );
  }
}
