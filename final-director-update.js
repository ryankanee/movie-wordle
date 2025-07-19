// Final script to update remaining unknown directors
const fs = require("fs");

const remainingUpdates = [
  {
    title: "Lilo & Stitch",
    director: "Dean DeBlois",
    genre: "Animation",
    rating: "PG",
  },
  { title: "Aquaman", director: "James Wan", genre: "Action", rating: "PG-13" },
  {
    title: "Captain Marvel",
    director: "Anna Boden",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Bohemian Rhapsody",
    director: "Bryan Singer",
    genre: "Drama",
    rating: "PG-13",
  },
  {
    title: "Spider-Man: Far From Home",
    director: "Jon Watts",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Joker: Folie à Deux",
    director: "Todd Phillips",
    genre: "Drama",
    rating: "R",
  },
  {
    title: "The Little Mermaid",
    director: "Rob Marshall",
    genre: "Musical",
    rating: "PG",
  },
  {
    title: "Fast & Furious Presents: Hobbs & Shaw",
    director: "David Leitch",
    genre: "Action",
    rating: "PG-13",
  },
  { title: "Aladdin", director: "Guy Ritchie", genre: "Musical", rating: "PG" },
  {
    title: "The Super Mario Bros. Movie",
    director: "Aaron Horvath",
    genre: "Animation",
    rating: "PG",
  },
  {
    title: "Jurassic World: Fallen Kingdom",
    director: "J.A. Bayona",
    genre: "Action",
    rating: "PG-13",
  },
  { title: "Frozen", director: "Chris Buck", genre: "Animation", rating: "PG" },
  {
    title: "Beauty and the Beast",
    director: "Bill Condon",
    genre: "Musical",
    rating: "PG",
  },
  {
    title: "Incredibles 2",
    director: "Brad Bird",
    genre: "Animation",
    rating: "PG",
  },
  {
    title: "The Fate of the Furious",
    director: "F. Gary Gray",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Iron Man 3",
    director: "Shane Black",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Minions",
    director: "Kyle Balda",
    genre: "Animation",
    rating: "PG",
  },
  {
    title: "Captain America: Civil War",
    director: "Anthony Russo",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Transformers: Dark of the Moon",
    director: "Michael Bay",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Toy Story 4",
    director: "Josh Cooley",
    genre: "Animation",
    rating: "G",
  },
  {
    title: "Toy Story 3",
    director: "Lee Unkrich",
    genre: "Animation",
    rating: "G",
  },
  {
    title: "Pirates of the Caribbean: Dead Man's Chest",
    director: "Gore Verbinski",
    genre: "Adventure",
    rating: "PG-13",
  },
  {
    title: "Rogue One: A Star Wars Story",
    director: "Gareth Edwards",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Pirates of the Caribbean: On Stranger Tides",
    director: "Rob Marshall",
    genre: "Adventure",
    rating: "PG-13",
  },
  {
    title: "Despicable Me 3",
    director: "Pierre Coffin",
    genre: "Animation",
    rating: "PG",
  },
  {
    title: "The Dark Knight Rises",
    director: "Christopher Nolan",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Skyfall",
    director: "Sam Mendes",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Transformers: Age of Extinction",
    director: "Michael Bay",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Jurassic Park",
    director: "Steven Spielberg",
    genre: "Adventure",
    rating: "PG-13",
  },
  {
    title: "Star Wars: Episode IX - The Rise of Skywalker",
    director: "J.J. Abrams",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Toy Story 2",
    director: "John Lasseter",
    genre: "Animation",
    rating: "G",
  },
  {
    title: "Finding Dory",
    director: "Andrew Stanton",
    genre: "Animation",
    rating: "PG",
  },
  {
    title: "Star Wars",
    director: "George Lucas",
    genre: "Action",
    rating: "PG",
  },
  {
    title: "Venom",
    director: "Ruben Fleischer",
    genre: "Action",
    rating: "PG-13",
  },
  {
    title: "Ghostbusters",
    director: "Ivan Reitman",
    genre: "Comedy",
    rating: "PG",
  },
  {
    title: "The Lion King",
    director: "Jon Favreau",
    genre: "Animation",
    rating: "PG",
  },
  {
    title: "Despicable Me 4",
    director: "Chris Renaud",
    genre: "Animation",
    rating: "PG",
  },
  {
    title: "Pirates of the Caribbean: At World's End",
    director: "Gore Verbinski",
    genre: "Adventure",
    rating: "PG-13",
  },
];

function performFinalUpdates() {
  const filePath = "/Users/Ryan.kane12/movie-wordle/app/lib/movieList.js";
  let content = fs.readFileSync(filePath, "utf-8");

  let updateCount = 0;

  remainingUpdates.forEach(({ title, director, genre, rating }) => {
    // Find and replace pattern for movies with Unknown director
    const unknownPattern = new RegExp(
      `(\\s*{\\s*title:\\s*"${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",\\s*director:\\s*"Unknown",\\s*year:\\s*(\\d+),\\s*genre:\\s*"[^"]*",\\s*gross:\\s*(\\d+),\\s*oscars:\\s*(\\d+),\\s*rating:\\s*"[^"]*",\\s*})`,
      "g",
    );

    const match = content.match(unknownPattern);
    if (match) {
      // Extract year, gross, and oscars from the match
      const movieDetails = content.match(
        new RegExp(
          `{\\s*title:\\s*"${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}",\\s*director:\\s*"Unknown",\\s*year:\\s*(\\d+),\\s*genre:\\s*"[^"]*",\\s*gross:\\s*(\\d+),\\s*oscars:\\s*(\\d+),\\s*rating:\\s*"[^"]*",\\s*}`,
        ),
      );

      if (movieDetails) {
        const year = movieDetails[1];
        const gross = movieDetails[2];
        const oscars = movieDetails[3];

        const replacement = `  {
    title: "${title}",
    director: "${director}",
    year: ${year},
    genre: "${genre}",
    gross: ${gross},
    oscars: ${oscars},
    rating: "${rating}",
  }`;

        content = content.replace(match[0], replacement);
        updateCount++;
        console.log(`Updated: ${title} -> ${director}`);
      }
    }
  });

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`\nCompleted final updates: ${updateCount} movies updated!`);
}

performFinalUpdates();
