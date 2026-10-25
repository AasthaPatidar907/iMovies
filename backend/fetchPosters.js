
import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import Movie from "./src/models/Movie.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const API_KEY = process.env.TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

async function findPoster(title) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    query: title,
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?${params}`
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  const data = await response.json();

  // Prefer a result that actually has a poster.
  const match = data.results?.find((movie) => movie.poster_path);

  return match ? `${IMAGE_BASE}${match.poster_path}` : "";
}

async function main() {
  if (!API_KEY) {
    throw new Error("TMDB_API_KEY is missing from backend/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  try {
    const movies = await Movie.find({
      $or: [{ image: "" }, { image: { $exists: false } }],
    });

    console.log(`Checking ${movies.length} movies without posters...`);

    let updated = 0;
    let missing = 0;

    for (const movie of movies) {
      try {
        const poster = await findPoster(movie.title);

        if (poster) {
          movie.image = poster;
          await movie.save();
          updated++;
          console.log("✓ Poster saved:", movie.title);
        } else {
          missing++;
          console.log("No poster found:", movie.title);
        }
      } catch (error) {
        console.log("Error for", movie.title, error.message);
      }
    }

    console.log(`Finished! Updated: ${updated}; not found: ${missing}`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exitCode = 1;
});
