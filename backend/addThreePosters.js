
import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import Movie from "./src/models/Movie.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const API_KEY = process.env.TMDB_API_KEY;

const titles = [
  "Udta Teer",
  "Drishyam The Conclusion",
  "Prahaar",
];

async function main() {
  if (!API_KEY) throw new Error("TMDB_API_KEY is missing");

  for (const title of titles) {
    const params = new URLSearchParams({
      api_key: API_KEY,
      query: title,
      include_adult: "false",
    });

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?${params}`
    );

    if (!response.ok) {
      throw new Error(`TMDB error for ${title}: ${response.status}`);
    }

    const data = await response.json();
    const matches = (data.results || [])
      .filter((movie) => movie.poster_path)
      .slice(0, 5)
      .map((movie) => ({
        title: movie.title,
        release_date: movie.release_date,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }));

    console.log(`\nSearch: ${title}`);
    console.log(matches);
  }
}

main().catch(console.error);
