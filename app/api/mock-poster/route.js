// app/api/mock-poster/route.js

import { NextResponse } from "next/server";

// Mock poster data with working placeholder images
const mockPosters = {
  "Avatar-2009":
    "https://via.placeholder.com/300x450/4A90E2/FFFFFF?text=Avatar+%282009%29",
  "Avengers: Endgame-2019":
    "https://via.placeholder.com/300x450/E94B3C/FFFFFF?text=Avengers+Endgame",
  "Titanic-1997":
    "https://via.placeholder.com/300x450/50C878/FFFFFF?text=Titanic+%281997%29",
  "Star Wars-1977":
    "https://via.placeholder.com/300x450/FFD700/000000?text=Star+Wars+%281977%29",
  "The Lion King-1994":
    "https://via.placeholder.com/300x450/FF8C00/FFFFFF?text=Lion+King+%281994%29",
  "E.T. the Extra-Terrestrial-1982":
    "https://via.placeholder.com/300x450/9370DB/FFFFFF?text=E.T.+%281982%29",
  "Spider-Man-2002":
    "https://via.placeholder.com/300x450/DC143C/FFFFFF?text=Spider-Man+%282002%29",
  "Spider-Man 2-2004":
    "https://via.placeholder.com/300x450/DC143C/FFFFFF?text=Spider-Man+2+%282004%29",
  "Spider-Man 3-2007":
    "https://via.placeholder.com/300x450/DC143C/FFFFFF?text=Spider-Man+3+%282007%29",
  "The Amazing Spider-Man-2012":
    "https://via.placeholder.com/300x450/DC143C/FFFFFF?text=Amazing+Spider-Man",
  "The Amazing Spider-Man 2-2014":
    "https://via.placeholder.com/300x450/DC143C/FFFFFF?text=Amazing+Spider-Man+2",
  "Peter Rabbit-2018":
    "https://via.placeholder.com/300x450/32CD32/FFFFFF?text=Peter+Rabbit+%282018%29",
  "Deadpool & Wolverine-2024":
    "https://via.placeholder.com/300x450/FF0000/FFFFFF?text=Deadpool+%26+Wolverine",
  "Toy Story 2-1999":
    "https://via.placeholder.com/300x450/FFB6C1/000000?text=Toy+Story+2+%281999%29",
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const year = searchParams.get("year");

  if (!title || !year) {
    return NextResponse.json(
      { error: "Title and year parameters are required" },
      { status: 400 },
    );
  }

  const key = `${title}-${year}`;
  const posterUrl = mockPosters[key];

  if (posterUrl) {
    return NextResponse.json({
      title: title,
      year: year,
      poster_url: posterUrl,
      mock: true,
    });
  } else {
    // Generate a generic placeholder
    const fallbackUrl = `https://via.placeholder.com/300x450/808080/FFFFFF?text=${encodeURIComponent(title)}+%28${year}%29`;
    return NextResponse.json({
      title: title,
      year: year,
      poster_url: fallbackUrl,
      mock: true,
      fallback: true,
    });
  }
}
