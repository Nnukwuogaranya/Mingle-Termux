import React from "react";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile-page">

      {/* =========================
          MINGLE BANNER
      ========================== */}

      <section className="profile-cover">

        <div className="profile-avatar">
          📷
        </div>

      </section>

      {/* =========================
          PROFILE INFORMATION
      ========================== */}

      <section className="profile-info">

        <h1>Juddy Praise</h1>

        <div className="mingle-id">
          ⭐ Mingle ID: MNG-000001
        </div>

        <p>
          Where People Don't Just Connect...
          They Belong.
        </p>

        <button className="edit-btn">
          Edit Identity
        </button>

      </section>

      {/* =========================
          STATS
      ========================== */}

      <section className="profile-stats">

        <div>
          <strong>12</strong>
          <span>Posts</span>
        </div>

        <div>
          <strong>245</strong>
          <span>Friends</span>
        </div>

        <div>
          <strong>86</strong>
          <span>Photos</span>
        </div>

        <div>
          <strong>15</strong>
          <span>Groups</span>
        </div>

      </section>
      {/* =========================
          MINGLE IDENTITY
      ========================== */}

      <section className="identity-panel">

        <h3>Mingle Identity</h3>

        <div className="identity-item">
          <span className="identity-label">Status</span>
          <span className="identity-value">🟢 Online</span>
        </div>

        <div className="identity-item">
          <span className="identity-label">Location</span>
          <span className="identity-value">Nigeria</span>
        </div>

        <div className="identity-item">
          <span className="identity-label">Joined</span>
          <span className="identity-value">2026</span>
        </div>

        <div className="identity-item">
          <span className="identity-label">Verification</span>
          <span className="identity-value">Coming Soon</span>
        </div>

      </section>

      {/* =========================
          QUICK ACTIONS
      ========================== */}

      <section className="quick-actions">

        <button>Share Identity</button>

        <button>My Photos</button>

        <button>
      {/* =========================
          MINGLE COMMAND DOCK
      ========================== */}

      <section className="profile-tabs">

        <div className="profile-tab active">
          📝 Posts
        </div>

        <div className="profile-tab">
          👥 Friends
        </div>

        <div className="profile-tab">
          📷 Photos
        </div>

        <div className="profile-tab">
          🛒 Market
        </div>

        <div className="profile-tab">
          ℹ️ About
        </div>

      </section>

      {/* =========================
          CONTENT AREA
      ========================== */}

      <section className="profile-content">

        <h2>Welcome to your Mingle Identity</h2>

        <p>
          This is where your posts, photos, achievements,
          memories and connections will appear.
        </p>

        <p>
          🚀 More premium profile features are coming soon.
        </p>

      </section>

    </div>
  );
}
