
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, default: "Drama" },
  duration: { type: String, default: "2h" },
  rating: { type: String, default: "—" },
  language: { type: String, default: "Hindi" },
  image: { type: String, default: "" },
  city: { type: String, required: true },
  cinema: { type: String, required: true },
  showtimes: { type: [String], default: [] },
  price: { type: Number, default: 180 }
});

movieSchema.index(
  { title: 1, city: 1, cinema: 1 },
  { unique: true }
);

export default mongoose.model("Movie", movieSchema);
