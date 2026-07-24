import React from "react";

const ProfileHeader = () => {
  return (
    <div className="profile-header">

      <div className="cover-photo"></div>

      <div className="profile-avatar">
        M
      </div>

      <div className="profile-info">

        <h2>Juddy Praise</h2>

        <p>@juddypraise</p>

        <small>🟣 Pi Verified • 📍 Nigeria</small>

      </div>

      <div className="profile-actions">

        <button>Edit Profile</button>

        <button>Share</button>

        <button>Connect Pi</button>

      </div>

    </div>
  );
};

export default ProfileHeader;
