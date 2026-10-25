
import React, { useState } from "react";
import "./Login.css";

export default function Login({ onLoginSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (isRegistering && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isRegistering ? "register" : "login";

      const response = await fetch(
        `http://https://imovies-eex6.onrender.com/api/auth/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isRegistering
              ? { name: name.trim(), email: email.trim(), password }
              : { email: email.trim(), password }
          ),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      // Save authentication details for this browser.
      localStorage.setItem("imoviesToken", data.token);
      localStorage.setItem("imoviesUser", JSON.stringify(data.user));

     alert(
  isRegistering
    ? "🎉 Account created successfully! Welcome to iMovies!"
    : "🎉 Login successful! Welcome back!"
);

if (onLoginSuccess) {
  onLoginSuccess(data.user);
}
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Make sure your backend is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <a href="/" className="login-logo">
          i<span>MOVIES</span>
        </a>

        <h1>{isRegistering ? "Create your account" : "Welcome back!"}</h1>

        <p className="login-subtitle">
          {isRegistering
            ? "Join iMovies and plan your next movie night."
            : "Sign in to continue your movie journey."}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <label htmlFor="login-name">Full name</label>
              <input
                id="login-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </>
          )}

          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="login-password">Password</label>

          <div className="login-password-wrapper">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete={
                isRegistering ? "new-password" : "current-password"
              }
              minLength={6}
              required
            />

            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="login-submit-button"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isRegistering
                ? "Create Account"
                : "Sign In"}
          </button>
        </form>

        <p className="login-footer">
          {isRegistering
            ? "Already have an account? "
            : "New to iMovies? "}

          <button
            type="button"
            className="login-switch-button"
            onClick={() => {
              setIsRegistering((current) => !current);
              setError("");
            }}
          >
            {isRegistering ? "Sign in" : "Create account"}
          </button>
        </p>

        <p className="login-demo-note">
          Your account is securely authenticated through iMovies.
        </p>
      </div>
    </div>
  );
}
