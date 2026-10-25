
import React from "react";
import "./Profile.css";

export default function Profile({ user, onViewBookings, onLogout }) {
  return (
    <section className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar-large">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <h1>{user?.name || "Movie Lover"}</h1>
        <p className="profile-subtitle">Your iMovies account</p>

        <div className="profile-details">
          <div className="profile-detail">
            <span>Full name</span>
            <strong>{user?.name || "Not available"}</strong>
          </div>

          <div className="profile-detail">
            <span>Email address</span>
            <strong>{user?.email || "Not available"}</strong>
          </div>
        </div>

        <button
          className="profile-action-button"
          onClick={onViewBookings}
        >
          My Bookings →
        </button>

        <button
          className="profile-logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}
