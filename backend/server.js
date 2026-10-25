import dns from "node:dns";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/auth.js";
import movieRoutes from "./src/routes/movies.js";
import bookingRoutes from "./src/routes/bookings.js";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (_req, res) => res.json({ message: "IMovies API is running" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" }));
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
async function start() {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
      console.log("API will start, but database-dependent routes will not work until MongoDB is configured.");
    }
  } else {
    console.log("MONGO_URI missing. Add it to backend/.env to enable MongoDB.");
  }
  app.listen(PORT, () => console.log(`IMovies API running on http://localhost:${PORT}`));
}
start();
