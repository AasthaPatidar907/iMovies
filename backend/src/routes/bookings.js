
import { Router } from "express";
import Booking from "../models/Booking.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      movieId,
      movie,
      cinema,
      area,
      city,
      date,
      showtime,
      seats,
      total,
      customerEmail
    } = req.body;

    if (
      !movie ||
      !cinema ||
      !date ||
      !showtime ||
      !Array.isArray(seats) ||
      seats.length === 0 ||
      !Number.isFinite(Number(total))
    ) {
      return res.status(400).json({
        message: "Movie, cinema, date, showtime, seats, and total are required."
      });
    }

    const booking = await Booking.create({
      movieId: String(movieId || movie),
      movie: String(movie),
      cinema: String(cinema),
      area: String(area || ""),
      city: String(city || ""),
      seats: [...new Set(seats.map(String))],
      date: String(date),
      showtime: String(showtime),
      total: Number(total),
      customerEmail: String(customerEmail || "Guest")
    });

    res.status(201).json({
      message: "Booking saved.",
      booking
    });
  } catch (error) {
    console.error("Booking save error:", error);
    res.status(500).json({
      message: "Could not save booking.",
      error: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const email = String(req.query.email || "");
    const filter = email ? { customerEmail: email } : {};

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(bookings);
  } catch (error) {
    console.error("Booking fetch error:", error);
    res.status(500).json({
      message: "Could not fetch bookings.",
      error: error.message
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const email = String(req.query.email || "");

    if (!email) {
      return res.status(400).json({
        message: "Customer email is required."
      });
    }

    const booking = await Booking.findOneAndDelete({
      _id: id,
      customerEmail: email
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found."
      });
    }

    res.json({
      message: "Booking cancelled successfully."
    });
  } catch (error) {
    console.error("Booking cancellation error:", error);
    res.status(500).json({
      message: "Could not cancel booking."
    });
  }
});
export default router;
