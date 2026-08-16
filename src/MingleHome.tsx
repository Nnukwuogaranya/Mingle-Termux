import React, { useEffect, useRef, useState } from "react";
import type { MingleUser } from "./Auth";
import "./mingle.css";

interface MingleHomeProps {
  user: MingleUser;
  onLogout: () => void;
}

export default function MingleHome({
  user,
  onLogout,
}: MingleHomeProps) {
  const displayName =
    user.name || user.username || "Mingle User";

  const [profilePicture, setProfilePicture] = useState<string | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  /*
   * Load saved profile picture
   */
  useEffect(() => {
    const savedPicture = localStorage.getItem(
      `mingle-profile-picture-${user.id}`
    );

    if (savedPicture) {
      setProfilePicture(savedPicture);
    }
  }, [user.id]);

  /*
   * Select profile picture
   */
  const openProfilePicker = () => {
    fileInputRef.current?.click();
  };

  /*
   * Save profile picture locally
   */
  const handleProfilePicture = (
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
      const image = reader.result as string;

      setProfilePicture(image);

      localStorage.setItem(
        `mingle-profile-picture-${user.id}`,
        image
      );
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const getInitial = () =>
    displayName.charAt(0).toUpperCase();

  return (
    <div className="mingle-home">

      {/* ================= HEADER ================= */}

      <header className="mingle-header">

        <div className="brand-area">
          <div className="brand-mark">M</div>

          <div className="brand-text">
            <strong>MINGLE</strong>
            <span>
              Where People Don't Just Connect... They Belong.
            </span>
          </div>
        </div>

        <div className="header-actions">
          <button aria-label="Search">⌕</button>
          <button aria-label="Notifications">♧</button>
          <button aria-label="Menu">☰</button>
        </div>

      </header>

      {/* ================= HIDDEN IMAGE INPUT ================= */}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden-profile-input"
        onChange={handleProfilePicture}
      />

      <main className="mingle-content">

        {/* ================= WELCOME ================= */}

        <section className="welcome-card">

          <button
            className="profile-frame"
            onClick={openProfilePicker}
            aria-label="Change profile picture"
            type="button"
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={displayName}
              />
            ) : (
              <span>{getInitial()}</span>
            )}

            <span className="profile-camera">
              +
            </span>
          </button>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            Sign out
          </button>

          <div className="welcome-text">
            <h1>
              Hello, {displayName} 👋
            </h1>

            <p>
              Connect. Share. Grow.
            </p>

            <strong>
              Where People Don't Just Connect... They Belong.
            </strong>
          </div>

        </section>

        {/* ================= CREATE POST ================= */}

        <section className="create-post">

          <button
            className="composer-profile"
            onClick={openProfilePicker}
            type="button"
            aria-label="Change profile picture"
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={displayName}
              />
            ) : (
              <span>{getInitial()}</span>
            )}
          </button>

          <button
            className="post-input"
            type="button"
          >
            What's on your mind, {displayName}?
          </button>

          <button
            className="image-post-button"
            type="button"
            aria-label="Add photo"
          >
            ▧
          </button>

        </section>

        {/* ================= STORIES ================= */}

        <section className="stories-section">

          <div className="section-heading">
            <h2>Stories</h2>

            <button>
              See all
            </button>
          </div>

          <div className="stories-row">

            <button className="story-card">
              <span className="story-icon plus">
                +
              </span>

              <span>
                Your
                <br />
                Story
              </span>
            </button>

            <button className="story-card">
              <span className="story-icon">
                M
              </span>

              <span>Mingle</span>
            </button>

            <button className="story-card">
              <span className="story-icon">
                A
              </span>

              <span>Alex</span>
            </button>

            <button className="story-card">
              <span className="story-icon">
                J
              </span>

              <span>James</span>
            </button>

          </div>

        </section>

        {/* ================= FEED ================= */}

        <section className="feed-section">

          <div className="section-heading">
            <h2>Your Feed</h2>

            <button>
              Latest
            </button>
          </div>

          <article className="post-card">

            <div className="post-author">

              <button
                className="post-profile-frame"
                onClick={openProfilePicker}
                type="button"
                aria-label="Change profile picture"
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt={displayName}
                  />
                ) : (
                  <span>M</span>
                )}
              </button>

              <div>
                <strong>Mingle</strong>

                <span>
                  Welcome to Mingle • Just now
                </span>
              </div>

              <button className="post-menu">
                •••
              </button>

            </div>

            <div className="post-content">

              <h3>
                🎉 Welcome to Mingle!
              </h3>

              <p>
                This is the beginning of your journey.
              </p>

              <p>
                Connect. Share. Grow.
              </p>

              <strong>
                Where People Don't Just Connect... They Belong.
              </strong>

            </div>

            <div className="post-actions">

              <button>
                ♡
                <span>Like</span>
              </button>

              <button>
                □
                <span>Comment</span>
              </button>

              <button>
                ↗
                <span>Share</span>
              </button>

            </div>

          </article>

        </section>

      </main>

      {/* ================= BOTTOM NAV ================= */}

      <nav className="bottom-nav">

        <button className="active">
          ⌂
          <span>Home</span>
        </button>

        <button>
          ♧
          <span>Friends</span>
        </button>

        <button>
          ＋
          <span>Create</span>
        </button>

        <button>
          ◉
          <span>Messages</span>
        </button>

        <button
          onClick={openProfilePicker}
        >
          ♙
          <span>Profile</span>
        </button>

      </nav>

    </div>
  );
}
