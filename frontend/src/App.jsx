import { FiUser } from "react-icons/fi";
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Login from "./Login.jsx";
import Profile from "./Profile.jsx";
const cities = [
  "Indore",
  "Bhopal",
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Jaipur",
  "Ahmedabad"
];

const movies = [
  {
    id: 1,
    title: "Udta Teer",
    genre: "Comedy",
    duration: "2h 15m",
    rating: "—",
    language: "Hindi",
    image: ""
  },
  {
    id: 2,
    title: "Drishyam The Conclusion",
    genre: "Drama",
    duration: "2h 30m",
    rating: "—",
    language: "Hindi",
    image: ""
  },
  {
    id: 3,
    title: "Prahaar: The Untold Story of Ujjwal Nikam",
    genre: "Drama",
    duration: "2h 15m",
    rating: "—",
    language: "Hindi",
    image: ""
  },
  {
    id: 4,
    title: "Hanuman Ansh",
    genre: "Drama",
    duration: "2h",
    rating: "—",
    language: "Hindi",
    image: ""
  },
  {
    id: 5,
    title: "Clayface",
    genre: "Horror",
    duration: "2h",
    rating: "—",
    language: "English",
    image: ""
  },
  {
    id: 6,
    title: "Pehla Pyaar Doosri Baar",
    genre: "Romance",
    duration: "2h",
    rating: "—",
    language: "Hindi",
    image: ""
  },
  {
    id: 7,
    title: "Whalefall",
    genre: "Thriller",
    duration: "2h",
    rating: "—",
    language: "English",
    image: ""
  },
  {
    id: 8,
    title: "Street Fighter",
    genre: "Action",
    duration: "2h",
    rating: "—",
    language: "English",
    image: ""
  },
  {
    id: 9,
    title: "Nayyi Navelli",
    genre: "Comedy",
    duration: "2h",
    rating: "—",
    language: "Hindi",
    image: ""
  },
  {
    id: 10,
    title: "Hope",
    genre: "Thriller",
    duration: "2h",
    rating: "—",
    language: "Hindi",
    image: ""
  },
  {
    id: 11,
    title: "Ranabaali",
    genre: "Drama",
    duration: "2h",
    rating: "—",
    language: "Telugu",
    image: ""
  },
  {
    id: 12,
    title: "Tum Mere Ho",
    genre: "Drama",
    duration: "2h",
    rating: "—",
    language: "Hindi",
    image: ""
  }
];



const cinemaDataByCity = {
  Indore: [
    ["INOX C21 Mall", "AB Road"],
    ["PVR Treasure Island", "MG Road"],
    ["INOX Phoenix Citadel", "MR 10 Road"],
    ["Sapna Sangeeta Lumiere", "Sapna Sangeeta Road"],
    ["Miraj Cinemas Velocity III", "Ring Road"],
    ["Odeon Cinema", "Westend Mall, Rajendra Nagar"],
    ["Cine Square Cinema", "Airport Road"],
    ["Rajhans Cinemas", "Malhar Mega Mall"]
  ],

  Bhopal: [
    ["PVR Aura Mall", "Gulmohar Colony"],
    ["Cinépolis DB Mall", "Arera Hills"],
    ["Cinépolis Aashima Mall", "Hoshangabad Road"]
  ],

  Mumbai: [
    ["PVR ICON Phoenix Palladium", "Lower Parel"],
    ["INOX EROS", "Churchgate"],
    ["PVR ICON Infiniti", "Andheri West"],
    ["Maison PVR Jio World Drive", "BKC"],
    ["INOX R City", "Ghatkopar"],
    ["PVR Oberoi Mall", "Goregaon East"],
    ["PVR Market City", "Kurla"]
  ],

  Delhi: [
    ["PVR Select Citywalk", "Saket"],
    ["PVR Promenade", "Vasant Kunj"],
    ["INOX Vishal Mall", "Rajouri Garden"],
    ["INOX Pacific Mall", "Jasola"],
    ["PVR Plaza", "Connaught Place"],
    ["PVR Sangam", "R.K. Puram"],
    ["PVR Anupam", "Saket"],
    ["PVR IMAX Priya", "Vasant Vihar"],
    ["PVR Vegas", "Dwarka"]
  ],

  Bengaluru: [
    ["PVR Orion Mall", "Rajajinagar"],
    ["PVR Vega City", "Bannerghatta Road"],
    ["PVR VR Bengaluru", "Whitefield"],
    ["PVR Superplex Forum Mall", "Kanakapura Road"],
    ["PVR Orion Uptown", "Old Madras Road"],
    ["PVR Global Mall", "Mysore Road"]
  ],

  Hyderabad: [
    ["AMB Cinemas", "Gachibowli"],
    ["PVR Next Galleria", "Panjagutta"],
    ["PVR Irrum Manzil", "Khairatabad"],
    ["PVR ICON Hitech", "Madhapur"],
    ["PVR Musarambagh", "New Malakpet"],
    ["PVR Preston", "Gachibowli"],
    ["INOX SMR Vinay Metro Mall", "Miyapur"]
  ],

  Pune: [
    ["PVR Phoenix Marketcity", "Viman Nagar"],
    ["Cinépolis Nexus Westend Mall", "Aundh"],
    ["INOX Amanora", "Hadapsar"],
    ["INOX Bund Garden Road", "Bund Garden"],
    ["PVR Kumar Pacific", "Swargate"],
    ["INOX Jai Ganesh", "Akurdi"],
    ["City Pride Kothrud", "Kothrud"]
  ],

  Chennai: [
    ["PVR Sathyam", "Royapettah"],
    ["PVR Palazzo", "Vadapalani"],
    ["PVR Grand Mall", "Velachery"],
    ["PVR Grand Galada", "Pallavaram"],
    ["PVR Aerohub", "Meenambakkam"],
    ["PVR Heritage RSL", "ECR"],
    ["Rohini Silver Screens", "Koyambedu"],
    ["AGS Cinemas", "T. Nagar"],
    ["Devi Cineplex", "Anna Salai"]
  ],

  Kolkata: [
    ["INOX South City", "Prince Anwar Shah Road"],
    ["INOX Quest Mall", "Park Circus"],
    ["PVR Mani Square", "EM Bypass"],
    ["Cinépolis Acropolis Mall", "Rajdanga"],
    ["INOX City Centre Salt Lake", "Salt Lake"],
    ["PVR Diamond Plaza", "Jessore Road"],
    ["Nandan", "A.J.C. Bose Road"]
  ],

  Jaipur: [
    ["Raj Mandir Cinema", "C-Scheme"],
    ["PVR Mall of Jaipur", "Vaishali Nagar"],
    ["Cinépolis World Trade Park", "Malviya Nagar"],
    ["INOX GT Central Mall", "Malviya Nagar"],
    ["Cinépolis Triton Mega Mall", "Jhotwara Road"],
    ["Miraj Cinemas Entertainment Paradise", "Jawahar Circle"]
  ],

  Ahmedabad: [
    ["PVR Acropolis", "Thaltej"],
    ["PVR Palladium Mall", "Thaltej"],
    ["PVR 4D Square", "Motera"],
    ["PVR Arved Transcube", "Ranip"],
    ["PVR Satyamev Emporio", "Odhav"],
    ["INOX Himalaya Mall", "Drive-In Road"]
  ]
};




const cinemaMoviesByName = {
  "INOX C21 Mall": [1, 2, 3, 4, 5, 6, 7, 8, 9],
  "PVR Treasure Island": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
};


function getCinemas(city) {
  const list = cinemaDataByCity[city] || [];

  return list.map(([name, area], index) => ({
    id: `${city}-${index + 1}`,
    name,
    area,
    movies: []
  }));
}




const showtimes = [
  "10:00 AM", "1:30 PM", "4:45 PM", "7:30 PM", "10:15 PM"
];

const seatRows = ["A", "B", "C", "D", "E", "F"];
const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
const seatPrice = 180;

function Poster({ movie }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="movie-poster">
      {!failed ? (
        <img
          src={movie.image}
          alt={`${movie.title} poster`}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="poster-fallback">
          <span>IMOVIES</span>
          <strong>{movie.title}</strong>
          <small>{movie.genre} · {movie.language}</small>
        </div>
      )}
      <span className="poster-rating">★ {movie.rating}</span>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState("Indore");
  const [movies, setMovies] = useState([]);
  const [citySearch, setCitySearch] = useState("");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [cinemaId, setCinemaId] = useState("Indore-1");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

 const [wishlist, setWishlist] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("imovies-wishlist")) || [];
  } catch {
    return [];
  }
});
useEffect(() => {
  localStorage.setItem(
    "imovies-wishlist",
    JSON.stringify(wishlist)
  );
}, [wishlist]);
  const [page, setPage] = useState("movies");
  const [activeMovie, setActiveMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("7:30 PM");
  const [requestedSeats, setRequestedSeats] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState({});
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
  let cancelled = false;



  async function loadMovies() {
    try {
      const response = await fetch(
        `http://https://imovies-eex6.onrender.com/api/movies?city=${encodeURIComponent(city)}`
      );

      if (!response.ok) {
        throw new Error("Could not load movies");
      }

      const data = await response.json();

      if (!cancelled) {
        setMovies(
          data.map((movie) => ({
            ...movie,
            id: movie._id,
            image: movie.image || ""
          }))
        );
      }
    } catch (error) {
      console.error("Movie loading failed:", error);
      if (!cancelled) setMovies([]);
    }
  }

  loadMovies();

  return () => {
    cancelled = true;
  };
}, [city]);
  useEffect(() => {
  async function loadBookings() {
    const token = localStorage.getItem("imoviesToken");
    const user = JSON.parse(localStorage.getItem("imoviesUser") || "null");

    if (!token || !user?.email) return;

    try {
      const response = await fetch(
        `http://https://imovies-eex6.onrender.com/api/bookings?email=${encodeURIComponent(user.email)}`
      );

      if (!response.ok) {
        throw new Error("Could not load bookings.");
      }

      const data = await response.json();

      const savedBookings = data.map((booking) => ({
        id: booking._id,
        movie: typeof booking.movie === "string"
          ? { title: booking.movie }
          : booking.movie,
        cinema: booking.cinema || "Cinema",
        area: booking.area || "",
        city: booking.city || "",
        date: booking.date,
        time: booking.showtime,
        seats: booking.seats,
        total: booking.total
      }));

      setBookings(savedBookings);
    } catch (error) {
      console.error("Could not load bookings:", error);
    }
  }

  loadBookings();
}, []);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [toast, setToast] = useState("");

  // Login popup state
  const [showLogin, setShowLogin] = useState(false);
const [currentUser, setCurrentUser] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("imoviesUser")) || null;
  } catch {
    return null;
  }
});

const [isLoggedIn, setIsLoggedIn] = useState(
  () => Boolean(localStorage.getItem("imoviesToken"))
);
  const cinemas = useMemo(
  () =>
    getCinemas(city).map((item) => ({
      ...item,
      movies: movies.filter((movie) => movie.cinema === item.name)
    })),
  [city, movies]
);
  const cinema = cinemas.find((item) => item.id === cinemaId) || cinemas[0];

 const filteredMovies = (cinema?.movies || []).filter((movie) => {
  const matchesSearch = movie.title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesGenre =
    genre === "All" ||
    movie.genre.toLowerCase().includes(genre.toLowerCase());

  return matchesSearch && matchesGenre;
});

  const wishlistMovies = movies.filter((movie) =>
    wishlist.includes(movie.id)
  );

  const seatKey = activeMovie
    ? `${city}|${cinemaId}|${activeMovie.id}|${selectedDate}|${selectedTime}`
    : "";

  const unavailableSeats = bookedSeats[seatKey] || [];

  function chooseCity(value) {
    if (!cities.includes(value)) return;

    setCity(value);
    setCitySearch("");
    setCityDropdownOpen(false);
    setCinemaId(`${value}-1`);
    setSearch("");
    setGenre("All");
    setSelectedSeats([]);
  }

  function toggleWishlist(movieId) {
    setWishlist((current) =>
      current.includes(movieId)
        ? current.filter((id) => id !== movieId)
        : [...current, movieId]
    );
  }

  function openBooking(movie) {
    setActiveMovie(movie);
    setSelectedSeats([]);
    setRequestedSeats(2);
    setSelectedDate("Today");
    setSelectedTime("7:30 PM");
    setShowBookings(false);
    setShowWishlist(false);
  }

  function changeDate(value) {
    setSelectedDate(value);
    setSelectedSeats([]);
  }

  function changeTime(value) {
    setSelectedTime(value);
    setSelectedSeats([]);
  }

  function toggleSeat(seat) {
    if (unavailableSeats.includes(seat)) return;

    setSelectedSeats((current) => {
      if (current.includes(seat)) {
        return current.filter((item) => item !== seat);
      }

      if (current.length >= requestedSeats) {
        setToast(`You can select only ${requestedSeats} seats.`);
        return current;
      }

      return [...current, seat];
    });
  }

  function updateRequestedSeats(value) {
    const amount = Number(value);
    setRequestedSeats(amount);
    setSelectedSeats((current) => current.slice(0, amount));
  }

async function confirmBooking() {
  if (!activeMovie) return;

  if (selectedSeats.length !== requestedSeats) {
    setToast(
      `Please select exactly ${requestedSeats} seat${
        requestedSeats > 1 ? "s" : ""
      }.`
    );
    return;
  }

  if (!isLoggedIn) {
    setShowLogin(true);
    return;
  }

  const token = localStorage.getItem("imoviesToken");

  if (!token) {
    setToast("Please log in again to confirm your booking.");
    setShowLogin(true);
    return;
  }

  const booking = {
    id: Date.now(),
  movie: activeMovie.title,
    cinema: cinema.name,
    area: cinema.area,
    city,
    date: selectedDate,
    time: selectedTime,
    seats: [...selectedSeats].sort(),
    total: selectedSeats.length * seatPrice
  };

  try {
    const response = await fetch("http://https://imovies-eex6.onrender.com/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        movieId: String(activeMovie._id || activeMovie.id || activeMovie.title),
movie: activeMovie.title,
cinema: cinema.name,
area: cinema.area,
city,
date: selectedDate,
showtime: selectedTime,
        seats: booking.seats,
        total: booking.total,
        customerEmail: currentUser?.email
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not save booking.");
    }

    const savedBooking = {
      ...booking,
      id: data.booking._id,
      time: data.booking.showtime
    };

    setBookedSeats((current) => ({
      ...current,
      [seatKey]: [...(current[seatKey] || []), ...selectedSeats]
    }));

    setBookings((current) => [savedBooking, ...current]);
    setActiveMovie(null);
    setSelectedSeats([]);
    setShowBookings(true);
    setShowWishlist(false);
    setToast("Your booking has been confirmed and saved!");
  } catch (error) {
    console.error("Booking error:", error);
    setToast(error.message || "Could not save booking. Please try again.");
  }
}

async function cancelBooking(bookingId) {
  const confirmed = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmed) return;

  try {
    const email = currentUser?.email;

    if (!email) {
      setToast("Please log in to cancel your booking.");
      return;
    }

    const response = await fetch(
      `http://https://imovies-eex6.onrender.com/api/bookings/${encodeURIComponent(bookingId)}?email=${encodeURIComponent(email)}`,
      { method: "DELETE" }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not cancel booking.");
    }

    setBookings((current) =>
      current.filter((booking) => booking.id !== bookingId)
    );

    setToast("Booking cancelled successfully!");
  } catch (error) {
    console.error("Booking cancellation error:", error);
    setToast(error.message || "Could not cancel booking.");
  }
}


  function closePanels() {
    setShowWishlist(false);
    setShowBookings(false);
  }

  const filteredCities = cities.filter((item) =>
    item.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div className="imovies-app">
      <header className="site-header">
        <button
          className="brand"
          onClick={() => {
            setPage("movies");
            closePanels();
          }}
        >
          <span className="brand-mark">i</span>
          <span>iMovies<span className="brand-dot">.</span></span>
        </button>

        
        
<div className="header-actions">
  <button
    className="header-icon-button"
    onClick={() => {
      setShowWishlist(true);
      setShowBookings(false);
      setShowProfileMenu(false);
    }}
  >
    <span className="header-heart">♡</span> Wishlist
   
{movies.filter((movie) => wishlist.includes(movie.id)).length > 0 && (
  <span className="count-badge">
    {movies.filter((movie) => wishlist.includes(movie.id)).length}
  </span>
)}

  </button>

  <button
    className="header-icon-button"
    onClick={() => {
      setShowBookings(true);
      setShowWishlist(false);
      setShowProfileMenu(false);
    }}
  >
    <span>▤</span> My Bookings
    {bookings.length > 0 && (
      <span className="count-badge">{bookings.length}</span>
    )}
  </button>

  {isLoggedIn ? (
    <div className="profile-menu-wrapper">
      <button
        className="profile-trigger"
        onClick={() => setShowProfileMenu((open) => !open)}
        aria-expanded={showProfileMenu}
      >
        <span className="profile-avatar">
  <FiUser size={21} />
</span>
        <span className="profile-trigger-text">
          <strong>{currentUser?.name || "My Account"}</strong>
          <small>My Account</small>
        </span>
      </button>

      {showProfileMenu && (
        <div className="profile-dropdown">
          <button
            onClick={() => {
              setShowProfileMenu(false);
              setShowWishlist(false);
              setShowBookings(false);
              setPage("profile");
            }}
          >
            <span className="dropdown-icon">
              <FiUser />
            </span>
            Profile
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("imoviesToken");
              localStorage.removeItem("imoviesUser");
              setCurrentUser(null);
              setIsLoggedIn(false);
              setShowProfileMenu(false);
              setToast("You have been logged out.");
            }}
          >
            <span>↪</span> Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <button
      className="booking-header-button"
      onClick={() => {
        setShowLogin(true);
        setShowWishlist(false);
        setShowBookings(false);
      }}
    >
      Login
    </button>
  )}
</div>

      </header>

      <main className="page-content">
        {page !== "profile" && (
  <section className="city-section">  
          <div className="city-copy">
            <p className="eyebrow">YOUR NEXT MOVIE NIGHT STARTS HERE</p>
            <h1>Cities to watch <span>movies in.</span></h1>
            <p className="section-subtitle">
              Find a cinema, explore its shows, and book your seats.
            </p>
          </div>

          <div className="city-picker">
            <label htmlFor="city-search">SELECT YOUR CITY</label>

            <button
              type="button"
              className="city-current"
              onClick={() => {
                setCityDropdownOpen((open) => !open);
                setCitySearch("");
              }}
              aria-expanded={cityDropdownOpen}
            >
              <span>{city}</span>
              
            </button>

            {cityDropdownOpen && (
              <div className="city-dropdown">
                <input
                  id="city-search"
                  value={citySearch}
                  onChange={(event) => setCitySearch(event.target.value)}
                  placeholder="Search cities..."
                  autoFocus
                />

                <div className="city-options">
                  {filteredCities.map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        item === city ? "city-option selected" : "city-option"
                      }
                      onClick={() => chooseCity(item)}
                    >
                      {item}
                      {item === city && <span>✓</span>}
                    </button>
                  ))}

                  {filteredCities.length === 0 && (
                    <p className="no-cities">No cities found.</p>
                  )}
                </div>
              </div>
            )}

            <span className="city-hint">Currently exploring {city}</span>
          </div>
        </section>
        )}
       {page === "profile" ? (
  <Profile
    user={currentUser}
    onViewBookings={() => {
      setPage("movies");
      setShowWishlist(false);
      setShowBookings(true);
    }}
    onLogout={() => {
      localStorage.removeItem("imoviesToken");
      localStorage.removeItem("imoviesUser");
      setCurrentUser(null);
      setIsLoggedIn(false);
      setPage("movies");
      setShowProfileMenu(false);
      setToast("You have been logged out.");
    }}
  />
) : page === "movies" ? (
          <>
            <section className="cinema-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">PICK YOUR SPOT</p>
                  <h2>Cinemas in {city}</h2>
                </div>

                <button
                  className="text-link"
                  onClick={() => setPage("cinemas")}
                >
                  View all cinemas →
                </button>
              </div>

              <div className="cinema-strip">
                {cinemas.map((item) => (
                  <button
                    key={item.id}
                    className={
                      cinemaId === item.id
                        ? "cinema-chip selected"
                        : "cinema-chip"
                    }
                    onClick={() => {
                      setCinemaId(item.id);
                      setSearch("");
                      setGenre("All");
                    }}
                  >
                    <span className="cinema-symbol">▣</span>
                    <span className="cinema-chip-copy">
                      <strong>{item.name}</strong>
                      <small>{item.area}, {city}</small>
                    </span>
                    <span className="cinema-arrow">↗</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="movies-section">
              <div className="section-heading movies-heading">
                <div>
                  <p className="eyebrow">NOW SHOWING</p>
                  <h2>Movies to fall for.</h2>
                  <p className="section-subtitle">
                    Showing at {cinema.name} · {city}
                  </p>
                </div>

                <div className="movie-search">
                  <span>⌕</span>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search movies..."
                    aria-label="Search movies"
                  />
                </div>
              </div>

              <div className="movie-toolbar">
                <div className="genre-tabs">
                  {["All", "Action", "Drama", "Comedy"].map((item) => (
                    <button
                      key={item}
                      className={
                        genre === item ? "genre-tab active" : "genre-tab"
                      }
                      onClick={() => setGenre(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <span className="results-count">
                  {filteredMovies.length} results
                </span>
              </div>

              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <article className="movie-card" key={movie.id}>
                    <div className="poster-wrap">
                      <Poster movie={movie} />

                      <button
                        className={
                          wishlist.includes(movie.id)
                            ? "wishlist-button saved"
                            : "wishlist-button"
                        }
                        aria-label={
                          wishlist.includes(movie.id)
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                        onClick={() => toggleWishlist(movie.id)}
                      >
                        {wishlist.includes(movie.id) ? "♥" : "♡"}
                      </button>
                    </div>

                    <div className="movie-card-content">
                      <div className="movie-meta">
                        <span>{movie.genre}</span>
                        <span>{movie.duration}</span>
                      </div>

                      <h3>{movie.title}</h3>
                      <p className="movie-language">{movie.language}</p>

                      <button
                        className="book-button"
                        onClick={() => openBooking(movie)}
                      >
                        Book tickets <span>→</span>
                      </button>
                    </div>
                  </article>
                ))}

                {filteredMovies.length === 0 && (
                  <div className="empty-movies">
                    <span>⌕</span>
                    <h3>No movies found</h3>
                    <p>Try another title or choose a different genre.</p>
                    <button
                      className="text-link"
                      onClick={() => {
                        setSearch("");
                        setGenre("All");
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          <section className="cinemas-page">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR LOCAL CINEMAS</p>
                <h2>Find a cinema in {city}</h2>
                <p className="section-subtitle">
                  Choose a cinema to see its available movies.
                </p>
              </div>
            </div>

            <div className="cinema-list">
              {cinemas.map((item) => (
                <article className="cinema-list-card" key={item.id}>
                  <div className="cinema-list-icon">▣</div>

                  <div className="cinema-list-info">
                    <h3>{item.name}</h3>
                    <p>{item.area}, {city}</p>
                    <small>{item.movies.length} movies listed</small>
                  </div>

                  <button
                    className="book-button cinema-select-button"
                    onClick={() => {
                      setCinemaId(item.id);
                      setPage("movies");
                    }}
                  >
                    Explore shows →
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <button
          className="brand footer-brand"
          onClick={() => setPage("movies")}
        >
          <span className="brand-mark">i</span>
          <span>iMovies<span className="brand-dot">.</span></span>
        </button>

        <p>Your movie plans, all in one place.</p>
        <span>Demo booking experience · ₹{seatPrice} per seat</span>
      </footer>

      {activeMovie && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveMovie(null);
            }
          }}
        >
          <section
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
          >
            <div className="modal-heading">
              <div>
                <p className="eyebrow">YOUR MOVIE NIGHT</p>
                <h2 id="booking-title">Book your seats</h2>
                <p className="section-subtitle">
                  {activeMovie.title} · {cinema.name}, {city}
                </p>
              </div>

              <button
                className="close-button"
                onClick={() => setActiveMovie(null)}
                aria-label="Close booking"
              >
                ×
              </button>
            </div>

            <div className="booking-controls">
              <label>
                <span>Show date</span>
                <select
                  value={selectedDate}
                  onChange={(event) => changeDate(event.target.value)}
                >
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>In 2 days</option>
                </select>
              </label>

              <label>
                <span>Show time</span>
                <select
                  value={selectedTime}
                  onChange={(event) => changeTime(event.target.value)}
                >
                  {showtimes.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </label>

              <label>
                <span>Seats needed</span>
                <select
                  value={requestedSeats}
                  onChange={(event) =>
                    updateRequestedSeats(event.target.value)
                  }
                >
                  {[1, 2, 3, 4, 5, 6].map((number) => (
                    <option key={number} value={number}>
                      {number} {number === 1 ? "seat" : "seats"}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="seat-area">
              <div className="screen-label">SCREEN THIS WAY</div>
              <div className="screen-curve" />

              <div className="seat-legend">
                <span><i className="legend-seat available" /> Available</span>
                <span><i className="legend-seat selected" /> Selected</span>
                <span><i className="legend-seat booked" /> Booked</span>
              </div>

              <div className="seat-map">
                {seatRows.map((row) => (
                  <div className="seat-row" key={row}>
                    <span className="row-label">{row}</span>

                    {seatNumbers.map((number) => {
                      const seat = `${row}${number}`;
                      const isBooked = unavailableSeats.includes(seat);
                      const isSelected = selectedSeats.includes(seat);

                      return (
                        <button
                          type="button"
                          key={seat}
                          disabled={isBooked}
                          aria-label={`Seat ${seat}`}
                          className={`seat ${
                            isBooked
                              ? "booked"
                              : isSelected
                                ? "selected"
                                : "available"
                          }`}
                          onClick={() => toggleSeat(seat)}
                        >
                          {number}
                        </button>
                      );
                    })}

                    <span className="row-label">{row}</span>
                  </div>
                ))}
              </div>

              <p className="seat-instruction">
                Select {requestedSeats} seat{requestedSeats > 1 ? "s" : ""}.
                {" "}{selectedSeats.length} of {requestedSeats} selected.
              </p>
            </div>

            <div className="checkout-summary">
              <div>
                <span className="summary-label">TOTAL AMOUNT</span>
                <strong>₹{selectedSeats.length * seatPrice}</strong>
                <small>₹{seatPrice} per seat</small>
              </div>

              <button
                className="checkout-button"
                disabled={selectedSeats.length !== requestedSeats}
                onClick={confirmBooking}
              >
                Confirm booking · ₹{selectedSeats.length * seatPrice}
              </button>
            </div>
          </section>
        </div>
      )}

      {(showWishlist || showBookings) && (
        <div
          className="panel-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePanels();
          }}
        >
          <aside className="side-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">
                  {showWishlist ? "YOUR FAVOURITES" : "YOUR PLANS"}
                </p>
                <h2>{showWishlist ? "Wishlist" : "My bookings"}</h2>
              </div>

              <button
                className="close-button"
                onClick={closePanels}
                aria-label="Close panel"
              >
                ×
              </button>
            </div>

            {showWishlist && (
              <div className="panel-items">
                {wishlist.length === 0 ? (
                  <div className="panel-empty">
                    <span>♡</span>
                    <h3>Your wishlist is empty</h3>
                    <p>Tap the heart on a movie to save it here.</p>
                  </div>
                ) : (
                  movies
                    .filter((movie) => wishlist.includes(movie.id))
                    .map((movie) => (
                      <article className="wishlist-item" key={movie.id}>
                        <div className="mini-poster">
                          <Poster movie={movie} />
                        </div>

                        <div className="wishlist-item-info">
                          <h3>{movie.title}</h3>
                          <p>{movie.genre} · {movie.duration}</p>
                          <button
                            className="text-link"
                            onClick={() => {
                              closePanels();
                              openBooking(movie);
                            }}
                          >
                            Book tickets →
                          </button>
                        </div>

                        <button
                          className="remove-wishlist"
                          onClick={() => toggleWishlist(movie.id)}
                          aria-label={`Remove ${movie.title}`}
                        >
                          ♥
                        </button>
                      </article>
                    ))
                )}
              </div>
            )}

            {showBookings && (
              <div className="panel-items">
                {bookings.length === 0 ? (
                  <div className="panel-empty">
                    <span>▤</span>
                    <h3>No bookings yet</h3>
                    <p>Your confirmed bookings will appear here.</p>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    
<article className="booking-item" key={booking.id}>
  <button
    type="button"
    className="booking-remove-button"
    onClick={() => cancelBooking(booking.id)}
    aria-label={`Cancel booking for ${booking.movie.title}`}
    title="Cancel booking"
  >
    −
  </button>

  <div className="booking-item-top">

                        <span className="booking-confirmed">✓ Confirmed</span>
                        <span className="booking-id">
                          #{String(booking.id).slice(-6)}
                        </span>
                      </div>

                     <h3>
  {typeof booking.movie === "string"
    ? booking.movie
    : booking.movie?.title || "Movie name unavailable"}
</h3>
                      <p>{booking.cinema}</p>
                      <p>{booking.area}, {booking.city}</p>

                      <div className="booking-item-details">
                        <span>{booking.date} · {booking.time}</span>
                        <span>Seats: {booking.seats.join(", ")}</span>
                      </div>

                      <div className="booking-item-total">
                        <span>Total</span>
                        <strong>₹{booking.total}</strong>
                      </div>
                     


                    </article>
                  ))
                )}
              </div>
            )}
          </aside>
        </div>
      )}

      {showLogin && (
        <div
          className="login-popup-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowLogin(false);
            }
          }}
        >
          <div className="login-popup-content">
            <button
              type="button"
              className="login-popup-close"
              onClick={() => setShowLogin(false)}
              aria-label="Close login"
            >
              ×
            </button>

            <Login
  onLoginSuccess={(user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setShowLogin(false);
    setToast(
      activeMovie
        ? "Login successful! Click Confirm booking again to finish."
        : "Login successful!"
    );
  }}
/>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          <span>{toast}</span>
          <button
            onClick={() => setToast("")}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
