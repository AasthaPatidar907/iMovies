
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  movie: { type: String, required: true },
  cinema: { type: String, required: true },
  area: { type: String, default: "" },
  city: { type: String, default: "" },
  customerEmail: { type: String, default: "Guest" },
  date: { type: String, required: true },
  showtime: { type: String, required: true },
  seats: {
    type: [String],
    required: true,
    validate: (v) => v.length > 0
  },
  total: { type: Number, required: true, min: 1 },
  status: {
    type: String,
    enum: ["confirmed", "cancelled"],
    default: "confirmed"
  }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
