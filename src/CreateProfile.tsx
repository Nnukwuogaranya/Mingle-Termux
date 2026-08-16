import React, { useState } from "react";
import type { MingleUser } from "./Auth";

interface CreateProfileProps {
  user: MingleUser;
  onComplete: (user: MingleUser) => void;
}

export default function CreateProfile({
  user,
  onComplete,
}: CreateProfileProps) {
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanUsername = username.trim().toLowerCase();

    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    if (!cleanUsername) {
      setError("Please choose a username.");
      return;
    }

    if (!/^[a-z0-9._]{3,20}$/.test(cleanUsername)) {
      setError(
        "Username must be 3–20 characters and use only letters, numbers, dots or underscores."
      );
      return;
    }

    setLoading(true);

    try {
      const updatedUser: MingleUser = {
        ...user,
        name: cleanName,
        username: cleanUsername,
      };

      onComplete(updatedUser);
    } catch {
      setError("Unable to create your Mingle profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-logo">
          M
        </div>

        <h1>Create Your Profile</h1>

        <p className="profile-subtitle">
          Create your Mingle identity.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="profile-field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="profile-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="@username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="profile-error">
              {error}
            </div>
          )}

          <button
            className="profile-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Profile..." : "Continue"}
            {!loading && <span>→</span>}
          </button>

        </form>

      </div>
    </div>
  );
}
