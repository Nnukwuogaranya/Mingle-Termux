import React, { useEffect, useState } from "react";
import "./profile.css";

interface ProfileProps {
  user: {
    id: string;
    name?: string;
    username?: string;
    email?: string;
    avatar?: string;
  };
  onBack: () => void;
}

export default function Profile({ user, onBack }: ProfileProps) {
  const [photo, setPhoto] = useState<string>("");

  useEffect(() => {
    const savedPhoto = localStorage.getItem("mingle-profile-photo");
    if (savedPhoto) {
      setPhoto(savedPhoto);
    }
  }, []);

  const handlePhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setPhoto(result);
      localStorage.setItem("mingle-profile-photo", result);
    };

    reader.readAsDataURL(file);
  };

  const displayName = user.name || "Mingle User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="profile-page">

      {/* HEADER */}
      <header className="profile-header">
        <button className="profile-back" onClick={onBack}>
          ←
        </button>

        <div>
          <strong>MINGLE</strong>
          <span>Profile</span>
        </div>
      </header>

      {/* PROFILE HERO */}
      <main className="profile-content">

        <section className="profile-card">

          {/* PREMIUM MINGLE FRAME */}
          <div className="mingle-profile-frame">

            <div className="frame-crown">
              ♛
              <span>M</span>
            </div>

            <div className="frame-photo">

              {photo ? (
                <img
                  src={photo}
                  alt={`${displayName} profile`}
                />
              ) : (
                <div className="profile-placeholder">
                  {initial}
                </div>
              )}

            </div>

            <div className="frame-brand">
              <strong>MINGLE</strong>
              <span>They Belong.</span>
            </div>

          </div>

          {/* UPLOAD */}
          <label className="upload-photo-button">
            {photo ? "Change Profile Picture" : "Add Profile Picture"}

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              hidden
            />
          </label>

          {/* USER DETAILS */}
          <div className="profile-details">

            <h1>{displayName}</h1>

            {user.username && (
              <p className="username">@{user.username}</p>
            )}

            {user.email && (
              <p className="email">{user.email}</p>
            )}

            <p className="profile-tagline">
              Where People Don't Just Connect... They Belong.
            </p>

          </div>

          {/* ACTIONS */}
          <div className="profile-actions">
            <button>Edit Profile</button>
            <button>Share Profile</button>
          </div>

        </section>

      </main>

    </div>
  );
}
