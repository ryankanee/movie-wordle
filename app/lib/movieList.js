// Movie database with details for each movie
export const movieList = [
  {
    id: 1,
    title: "Avatar",
    director: "James Cameron",
    year: 2009,
    genre: "Sci-Fi",
    gross: 2923706026, // $2.92 billion worldwide
    oscars: 3, // Won 3 Oscars (Cinematography, Visual Effects, Art Direction)
    rating: "PG-13", // MPAA rating
  },
  {
    id: 2,
    title: "Avengers: Endgame",
    director: "Anthony Russo, Joe Russo",
    year: 2019,
    genre: "Action",
    gross: 2797501328, // $2.79 billion worldwide
    oscars: 0, // No Oscar wins
    rating: "PG-13", // MPAA rating
  },
  {
    id: 3,
    title: "Titanic",
    director: "James Cameron",
    year: 1997,
    genre: "Romance",
    gross: 2257844554, // $2.26 billion worldwide
    oscars: 11, // Won 11 Oscars including Best Picture and Best Director
    rating: "PG-13", // MPAA rating
  },
  {
    id: 4,
    title: "Star Wars: The Force Awakens",
    director: "J.J. Abrams",
    year: 2015,
    genre: "Sci-Fi",
    gross: 2071310218, // $2.07 billion worldwide
    oscars: 0, // No Oscar wins
    rating: "PG-13", // MPAA rating
  },
  {
    id: 5,
    title: "Avengers: Infinity War",
    director: "Anthony Russo, Joe Russo",
    year: 2018,
    genre: "Action",
    gross: 2048359754, // $2.05 billion worldwide
    oscars: 0, // No Oscar wins
    rating: "PG-13", // MPAA rating
  },
  {
    id: 6,
    title: "Spider-Man: No Way Home",
    director: "Jon Watts",
    year: 2021,
    genre: "Action",
    gross: 1921847111, // $1.92 billion worldwide
    oscars: 0, // No Oscar wins
    rating: "PG-13", // MPAA rating
  },
  {
    id: 7,
    title: "Jurassic World",
    director: "Colin Trevorrow",
    year: 2015,
    genre: "Action",
    gross: 1672296865, // $1.67 billion worldwide
    oscars: 0, // No Oscar wins
    rating: "PG-13", // MPAA rating
  },
  {
    id: 8,
    title: "The Lion King",
    director: "Jon Favreau",
    year: 2019,
    genre: "Family",
    gross: 1656943394, // $1.66 billion worldwide
    oscars: 0, // No Oscar wins
    rating: "PG", // MPAA rating
  },
  {
    id: 9,
    title: "The Avengers",
    director: "Joss Whedon",
    year: 2012,
    genre: "Action",
    gross: 1518815515, // $1.52 billion worldwide
    oscars: 0, // No Oscar wins
    rating: "PG-13", // MPAA rating
  },
  {
    id: 10,
    title: "Furious 7",
    director: "James Wan",
    year: 2015,
    genre: "Action",
    gross: 1515341399, // $1.52 billion worldwide
    oscars: 0, // No Oscar wins
    rating: "PG-13", // MPAA rating
  },
];

// Helper function to get a random movie
export const getRandomMovie = () => {
  const randomIndex = Math.floor(Math.random() * movieList.length);
  return movieList[randomIndex];
};

// Helper function to get movies by genre
export const getMoviesByGenre = (genre) => {
  return movieList.filter(
    (movie) => movie.genre.toLowerCase() === genre.toLowerCase(),
  );
};

// Helper function to get movies by year range
export const getMoviesByYearRange = (startYear, endYear) => {
  return movieList.filter(
    (movie) => movie.year >= startYear && movie.year <= endYear,
  );
};

// Helper function to get movies by Oscar count
export const getMoviesByOscars = (minOscars = 0) => {
  return movieList.filter((movie) => movie.oscars >= minOscars);
};

// Helper function to get movies by rating
export const getMoviesByRating = (rating) => {
  return movieList.filter((movie) => movie.rating === rating);
};

// Helper function to format gross revenue
export const formatGross = (gross) => {
  if (gross >= 1000000000) {
    return `$${(gross / 1000000000).toFixed(2)}B`;
  } else if (gross >= 1000000) {
    return `$${(gross / 1000000).toFixed(2)}M`;
  } else {
    return `$${gross.toLocaleString()}`;
  }
};

export default movieList;
