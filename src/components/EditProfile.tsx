import React from "react";

const EditProfile = () => {
  return (
    <div className="edit-profile">

      <h2>Edit Profile</h2>

      <label>Full Name</label>
      <input
        type="text"
        placeholder="Enter your full name"
      />

      <label>Username</label>
      <input
        type="text"
        placeholder="@username"
      />

      <label>Bio</label>
      <textarea
        placeholder="Tell people about yourself..."
      />

      <label>Location</label>
      <input
        type="text"
        placeholder="City, Country"
      />

      <label>Website</label>
      <input
        type="text"
        placeholder="https://"
      />

      <button className="save-profile">
        Save Changes
      </button>

    </div>
  );
};

export default EditProfile;
