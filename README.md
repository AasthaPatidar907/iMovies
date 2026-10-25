# IMovies Starter

A React + Vite frontend and Express + MongoDB backend for a cinema booking project.

## 1. Frontend
Open a terminal in `IMovies_Starter/frontend` and run:
```bash
npm install
npm run dev
```

## 2. Backend
Create `backend/.env` by copying `.env.example`, then add your MongoDB connection string and a long JWT secret.
Open a second terminal in `IMovies_Starter/backend` and run:
```bash
npm install
npm run dev
```

Backend default URL: http://https://imovies-eex6.onrender.com

## Included
- Movie browsing, search, genre filters, popular/upcoming sections
- Movie details and showtimes
- Seat selection and booking summary
- Watchlist saved in browser localStorage
- Booking history saved in browser localStorage when backend is unavailable; saved in MongoDB when connected
- Register/login API using bcrypt and JWT
- Movie CRUD API; admin route protection can be expanded for a production system
- Admin UI for adding sample movie entries in the browser

## Important
- The UI's demo login mode is not a substitute for backend authentication. Use the backend endpoints for real authentication.
- Do not claim live inventory, payments, or production-grade admin security unless implemented and tested.
- The movie poster URLs are examples and may be replaced with your preferred posters.
