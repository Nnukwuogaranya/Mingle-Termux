import React from "react";
import type { MingleUser } from "../Auth";

interface HomeProps {
  user: MingleUser;
  onLogout: () => void;
}

export default function Home({ user, onLogout }: HomeProps) {
  const displayName =
    user.name ||
    user.username ||
    user.email?.split("@")[0] ||
    "Mingle User";

  return (
    <div className="mingle-home">
      <header className="mingle-topbar">
        <div className="mingle-brand">
          <div className="mingle-brand-mark">M</div>

          <div>
            <div className="mingle-brand-name">MINGLE</div>
            <div className="mingle-brand-tagline">
              Where People Belong
            </div>
          </div>
        </div>

        <div className="mingle-top-actions">
          <button type="button" aria-label="Search">
            🔍
          </button>

          <button type="button" aria-label="Notifications">
            🔔
          </button>

          <button
            type="button"
            className="mingle-avatar-button"
            aria-label="Profile"
          >
            {displayName.charAt(0).toUpperCase()}
          </button>
        </div>
      </header>

      <main className="mingle-content">
        <section className="mingle-welcome">
          <div>
            <span className="mingle-eyebrow">WELCOME TO MINGLE</span>

            <h1>
              Hello, {displayName}
              <span> 👋</span>
            </h1>

            <p>
              Connect. Share. Grow.
              <br />
              Where People Don't Just Connect... They Belong.
            </p>
          </div>
        </section>

        <section className="mingle-create-card">
          <div className="mingle-create-avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>

          <button type="button" className="mingle-create-input">
            What's on your mind, {displayName.split(" ")[0]}?
          </button>
        </section>

        <section className="mingle-section">
          <div className="mingle-section-heading">
            <h2>Stories</h2>
            <button type="button">See all</button>
          </div>

          <div className="mingle-stories">
            <div className="mingle-story mingle-story-add">
              <div className="mingle-story-circle">+</div>
              <span>Your Story</span>
            </div>

            <div className="mingle-story">
              <div className="mingle-story-circle">M</div>
              <span>Mingle</span>
            </div>

            <div className="mingle-story">
              <div className="mingle-story-circle">A</div>
              <span>Alex</span>
            </div>

            <div className="mingle-story">
              <div className="mingle-story-circle">J</div>
              <span>James</span>
            </div>
          </div>
        </section>

        <section className="mingle-section">
          <div className="mingle-section-heading">
            <h2>Your Feed</h2>
            <button type="button">Latest</button>
          </div>

          <article className="mingle-post-card">
            <div className="mingle-post-header">
              <div className="mingle-post-avatar">M</div>

              <div>
                <strong>Mingle</strong>
                <span>Welcome to Mingle • Just now</span>
              </div>
            </div>

            <p className="mingle-post-text">
              🎉 Welcome to Mingle!
              <br />
              This is the beginning of your journey.
              <br />
              <br />
              Connect. Share. Grow.
              <br />
              <strong>Where People Don't Just Connect... They Belong.</strong>
            </p>

            <div className="mingle-post-actions">
              <button type="button">♡ Like</button>
              <button type="button">💬 Comment</button>
              <button type="button">↗ Share</button>
            </div>
          </article>
        </section>
      </main>

      <nav className="mingle-bottom-nav">
        <button type="button" className="active">
          <span>⌂</span>
          Home
        </button>

        <button type="button">
          <span>♧</span>
          Friends
        </button>

        <button type="button" className="mingle-plus">
          +
        </button>

        <button type="button">
          <span>◌</span>
          Messages
        </button>

        <button type="button">
          <span>♙</span>
          Profile
        </button>
      </nav>

      <button
        type="button"
        className="mingle-logout"
        onClick={onLogout}
      >
        Sign out
      </button>
    </div>
  );
}
