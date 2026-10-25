import "dotenv/config";
import dns from "node:dns";
import mongoose from "mongoose";
import Movie from "./src/models/Movie.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const movies = await Movie.find({
    $or: [
      { image: "" },
      { image: { $exists: false } },
      { image: null },
    ],
  }).select("title city cinema");

  console.log("Movies without posters:", movies.length);
  console.log(movies.map((m) => ({
    title: m.title,
    city: m.city,
    cinema: m.cinema,
  })));

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect().catch(() => {});
  process.exitCode = 1;
});