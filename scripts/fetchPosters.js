// scripts/fetchPosters.js
// Run this script to add poster URLs to your movie data

const fs = require("fs");
const path = require("path");

async function searchMoviePoster(title, year) {
  try {
    // Use our local search API directly
    const query = encodeURIComponent(title);
    const url = `http://localhost:3000/api/search-movie?query=${query}&year=${year || ""}`;

    console.log(`Fetching: ${url}`);

    const response = await fetch(url);

    if (response.ok) {
      const movieData = await response.json();
      if (movieData.tmdb_poster_url) {
        return movieData.tmdb_poster_url;
      }
    }

    console.log(`No poster found for: ${title} (${year})`);
    return null;
  } catch (error) {
    console.error(`Error searching for ${title}:`, error.message);
    return null;
  }
}

async function updateMovieList() {
  // Read the current movie list
  const movieListPath = path.join(process.cwd(), "app", "lib", "movieList.js");
  const movieListContent = fs.readFileSync(movieListPath, "utf8");

  // Extract the movies array using regex
  const moviesMatch = movieListContent.match(
    /export const movies = (\[[\s\S]*?\]);/,
  );
  if (!moviesMatch) {
    throw new Error("Could not find movies array in movieList.js");
  }

  // Parse the movies array (this is a bit hacky but works for this format)
  const moviesArrayString = moviesMatch[1];
  const movies = eval(moviesArrayString);

  console.log(`Found ${movies.length} movies to process`);

  // Process all movies that don't already have poster URLs
  const moviesToProcess = movies.filter((movie) => !movie.posterUrl);
  const moviesAlreadyProcessed = movies.filter((movie) => movie.posterUrl);

  console.log(
    `${moviesAlreadyProcessed.length} movies already have poster URLs`,
  );
  console.log(`Processing ${moviesToProcess.length} remaining movies`);

  // Process movies in batches of 5 to be respectful to the API
  const batchSize = 5;
  const processedMovies = [];

  for (let i = 0; i < moviesToProcess.length; i += batchSize) {
    const batch = moviesToProcess.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(moviesToProcess.length / batchSize);
    console.log(
      `Processing batch ${batchNumber}/${totalBatches} (${i + 1}-${Math.min(i + batchSize, moviesToProcess.length)} of ${moviesToProcess.length})`,
    );

    const promises = batch.map(async (movie, index) => {
      console.log(
        `  ${i + index + 1}. Searching for: ${movie.title} (${movie.year})`,
      );

      const posterUrl = await searchMoviePoster(movie.title, movie.year);

      if (posterUrl) {
        console.log(`    ✓ Found poster: ${posterUrl.substring(0, 60)}...`);
        return { ...movie, posterUrl };
      } else {
        console.log(`    ✗ No poster found`);
        return movie;
      }
    });

    const batchResults = await Promise.all(promises);
    processedMovies.push(...batchResults);

    // Small delay between batches (except for the last batch)
    if (i + batchSize < moviesToProcess.length) {
      console.log("  Waiting 1 second before next batch...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Progress update every 20 batches
    if (batchNumber % 20 === 0) {
      const foundSoFar = processedMovies.filter((m) => m.posterUrl).length;
      console.log(
        `\n📊 Progress: ${batchNumber}/${totalBatches} batches complete, ${foundSoFar} posters found so far\n`,
      );
    }
  }

  // Combine already processed movies with newly processed ones
  const allUpdatedMovies = [];

  // Maintain original order by going through original array
  for (const originalMovie of movies) {
    if (originalMovie.posterUrl) {
      // Already had poster URL
      allUpdatedMovies.push(originalMovie);
    } else {
      // Find the processed version
      const processedMovie = processedMovies.find(
        (pm) =>
          pm.title === originalMovie.title && pm.year === originalMovie.year,
      );
      allUpdatedMovies.push(processedMovie || originalMovie);
    }
  }

  // Generate the updated file content
  const updatedContent = movieListContent.replace(
    /export const movies = \[[\s\S]*?\];/,
    `export const movies = ${JSON.stringify(allUpdatedMovies, null, 2)};`,
  );

  // Write the updated content back
  fs.writeFileSync(movieListPath, updatedContent);

  const totalPostersFound = allUpdatedMovies.filter((m) => m.posterUrl).length;
  const newPostersFound = processedMovies.filter((m) => m.posterUrl).length;
  console.log(
    `\\n✅ Updated movieList.js with ${newPostersFound} new poster URLs`,
  );
  console.log(
    `📈 Total progress: ${totalPostersFound}/${movies.length} movies now have poster URLs`,
  );

  return allUpdatedMovies;
}

// Run the script
async function main() {
  try {
    console.log("🎬 Starting poster URL fetching...");
    await updateMovieList();
    console.log("🎉 Done! Your movie list now includes poster URLs.");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
