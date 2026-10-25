
import { Router } from "express";
import Movie from "../models/Movie.js";

const router = Router();

// Get movies for a selected city and cinema
router.get("/", async (req, res) => {
  try {
    const { city, cinema } = req.query;
    const filter = {};

    if (city) filter.city = city;
    if (cinema) filter.cinema = cinema;

    const movies = await Movie.find(filter).sort({ title: 1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch movies." });
  }
});

// Add a movie
router.post("/", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({
      message: "Could not add movie.",
      error: error.message
    });
  }
});

export default router;
