import React from "react";

const PiHubCard = () => {
  return (
    <div className="pihub-card">

      <div className="pihub-header">
        <h2>🟣 Pi Hub</h2>
        <p>Your gateway to the Pi ecosystem.</p>
      </div>

      <div className="pihub-grid">

        <button>🔗 Connect Wallet</button>

        <button>🛒 Pi Marketplace</button>

        <button>🏢 Verified Businesses</button>

        <button>👥 Community Groups</button>

        <button>📅 Pi Events</button>

        <button>📰 Pi News</button>

      </div>

    </div>
  );
};

export default PiHubCard;
