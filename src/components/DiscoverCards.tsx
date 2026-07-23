import React from "react";

const cards = [
  {
    title: "Pi Community",
    icon: "🌍",
    color: "#6C3BFF",
  },
  {
    title: "Marketplace",
    icon: "💰",
    color: "#D4AF37",
  },
  {
    title: "Businesses",
    icon: "🏢",
    color: "#0EA5E9",
  },
  {
    title: "Friends",
    icon: "👥",
    color: "#16A34A",
  },
];

const DiscoverCards = () => {
  return (
    <div className="discover-section">

      <h2>Discover</h2>

      <div className="discover-grid">

        {cards.map((card, index) => (
          <div
            key={index}
            className="discover-card"
            style={{
              borderTop: `4px solid ${card.color}`,
            }}
          >
            <div className="discover-icon">
              {card.icon}
            </div>

            <h3>{card.title}</h3>
          </div>
        ))}

      </div>

    </div>
  );
};

export default DiscoverCards;
