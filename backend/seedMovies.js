
import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config";
import mongoose from "mongoose";
import Movie from "./src/models/Movie.js";

const showtimes = ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"];

const cinemaData = {
  Indore: [
    "INOX C21 Mall",
    "PVR Treasure Island",
    "INOX Phoenix Citadel",
    "Sapna Sangeeta Lumiere",
    "Miraj Cinemas Velocity III",
    "Odeon Cinema",
    "Cine Square Cinema",
    "Rajhans Cinemas"
  ],
  Bhopal: [
    "PVR Aura Mall",
    "Cinépolis DB Mall",
    "Cinépolis Aashima Mall"
  ],
  Mumbai: [
    "PVR ICON Phoenix Palladium",
    "INOX EROS",
    "PVR ICON Infiniti",
    "Maison PVR Jio World Drive",
    "INOX R City",
    "PVR Oberoi Mall",
    "PVR Market City"
  ],
  Delhi: [
    "PVR Select Citywalk",
    "PVR Promenade",
    "INOX Vishal Mall",
    "INOX Pacific Mall",
    "PVR Plaza",
    "PVR Sangam",
    "PVR Anupam",
    "PVR IMAX Priya",
    "PVR Vegas"
  ],
  Bengaluru: [
    "PVR Orion Mall",
    "PVR Vega City",
    "PVR VR Bengaluru",
    "PVR Superplex Forum Mall",
    "PVR Orion Uptown",
    "PVR Global Mall"
  ],
  Hyderabad: [
    "AMB Cinemas",
    "PVR Next Galleria",
    "PVR Irrum Manzil",
    "PVR ICON Hitech",
    "PVR Musarambagh",
    "PVR Preston",
    "INOX SMR Vinay Metro Mall"
  ],
  Pune: [
    "PVR Phoenix Marketcity",
    "Cinépolis Nexus Westend Mall",
    "INOX Amanora",
    "INOX Bund Garden Road",
    "PVR Kumar Pacific",
    "INOX Jai Ganesh",
    "City Pride Kothrud"
  ],
  Chennai: [
    "PVR Sathyam",
    "PVR Palazzo",
    "PVR Grand Mall",
    "PVR Grand Galada",
    "PVR Aerohub",
    "PVR Heritage RSL",
    "Rohini Silver Screens",
    "AGS Cinemas",
    "Devi Cineplex"
  ],
  Kolkata: [
    "INOX South City",
    "INOX Quest Mall",
    "PVR Mani Square",
    "Cinépolis Acropolis Mall",
    "INOX City Centre Salt Lake",
    "PVR Diamond Plaza",
    "Nandan"
  ],
  Jaipur: [
    "Raj Mandir Cinema",
    "PVR Mall of Jaipur",
    "Cinépolis World Trade Park",
    "INOX GT Central Mall",
    "Cinépolis Triton Mega Mall",
    "Miraj Cinemas Entertainment Paradise"
  ],
  Ahmedabad: [
    "PVR Acropolis",
    "PVR Palladium Mall",
    "PVR 4D Square",
    "PVR Arved Transcube",
    "PVR Satyamev Emporio",
    "INOX Himalaya Mall"
  ]
};

// Curated catalogue for the project demo.
// These are not verified live cinema schedules.
const films = [
  ["12th Fail", "Drama", "Hindi", "2023", "2h 27m", "9.2"],
  ["3 Idiots", "Comedy", "Hindi", "2009", "2h 50m", "8.4"],
  ["Dangal", "Drama", "Hindi", "2016", "2h 41m", "8.3"],
  ["Jawan", "Action", "Hindi", "2023", "2h 49m", "7.5"],
  ["Pathaan", "Action", "Hindi", "2023", "2h 26m", "7.0"],
  ["Zindagi Na Milegi Dobara", "Drama", "Hindi", "2011", "2h 35m", "8.2"],
  ["RRR", "Action", "Telugu", "2022", "3h 7m", "8.0"],
  ["Kantara", "Thriller", "Kannada", "2022", "2h 28m", "8.2"],
  ["Jailer", "Action", "Tamil", "2023", "2h 48m", "7.1"],
  ["Manjummel Boys", "Thriller", "Malayalam", "2024", "2h 15m", "8.2"],
  ["Laapataa Ladies", "Comedy", "Hindi", "2024", "2h 2m", "8.0"],
  ["Stree 2", "Horror Comedy", "Hindi", "2024", "2h 29m", "7.0"],
  ["Bhool Bhulaiyaa 3", "Horror Comedy", "Hindi", "2024", "2h 38m", "5.7"],
  ["Pushpa 2: The Rule", "Action", "Telugu", "2024", "3h 21m", "6.2"],
  ["Interstellar", "Sci-Fi", "English", "2014", "2h 49m", "8.7"],
  ["Inception", "Sci-Fi", "English", "2010", "2h 28m", "8.8"],
  ["The Dark Knight", "Action", "English", "2008", "2h 32m", "9.0"],
  ["Coco", "Animation", "English", "2017", "1h 45m", "8.4"],
  ["Frozen", "Animation", "English", "2013", "1h 42m", "7.4"],
  ["Spider-Man: No Way Home", "Action", "English", "2021", "2h 28m", "8.2"]
];

const posterCache = new Map();


async function getPoster(title, year) {
  const pageNames = [
    `${title} (${year} film)`,
    title,
  ];

  for (const pageName of pageNames) {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageName)}`
      );

      if (!response.ok) continue;

      const data = await response.json();

      if (data.thumbnail?.source) {
        return data.thumbnail.source;
      }
    } catch (error) {
      console.error(`Could not fetch poster for ${pageName}`);
    }
  }

  return "";
}


async function seedMovies() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing from backend/.env");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const operations = [];
    let count = 0;

    for (const [city, cinemas] of Object.entries(cinemaData)) {
      for (let i = 0; i < cinemas.length; i++) {
        const cinema = cinemas[i];

        // Four different films per hall, rotating through the catalogue.
        const selected = Array.from(
          { length: 4 },
          (_, offset) => films[(i * 3 + offset + city.length) % films.length]
        );

        for (const [title, genre, language, year, duration, rating] of selected) {
          const image = await getPoster(title, year);

          operations.push({
            updateOne: {
              filter: { title, city, cinema },
              update: {
                $set: {
                  title,
                  genre,
                  language,
                  city,
                  cinema,
                  duration,
                  rating,
                  image,
                  showtimes,
                  price: 180
                }
              },
              upsert: true
            }
          });

          count++;
        }
      }
    }

    if (operations.length) {
      await Movie.bulkWrite(operations, { ordered: false });
    }

    console.log(`Updated or added ${count} movie-cinema records.`);
    console.log("Existing records not included in this catalogue were preserved.");
  } catch (error) {
    console.error("Seed failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedMovies();
