import React, { useState } from "react";
import "./PiCommunityHub.css";

interface PiCommunityHubProps {
  onBack?: () => void;
}

type HubSection = {
  icon: string;
  title: string;
  description: string;
};

const sections: HubSection[] = [
  {
    icon: "🟣",
    title: "Pi Overview",
    description:
      "Learn about Pi Network, its vision, ecosystem and important concepts.",
  },
  {
    icon: "📰",
    title: "Pi News & Updates",
    description:
      "Stay informed about important Pi-related announcements and developments.",
  },
  {
    icon: "⛏️",
    title: "Mining",
    description:
      "Explore Pi mining concepts, mining roles and useful community resources.",
  },
  {
    icon: "👛",
    title: "Wallet & Security",
    description:
      "Learn safe wallet practices and how to protect your Pi wallet credentials.",
  },
  {
    icon: "🌐",
    title: "Pi Ecosystem",
    description:
      "Discover applications, services and community projects within the Pi ecosystem.",
  },
  {
    icon: "🛍️",
    title: "Pi Marketplace",
    description:
      "Explore Pi-related marketplace features available within Mingle.",
  },
  {
    icon: "💰",
    title: "Pi Transactions",
    description:
      "Learn about supported Pi transaction features and payment experiences.",
  },
  {
    icon: "🎁",
    title: "Pi Rewards",
    description:
      "Explore supported Pi-related rewards and community opportunities.",
  },
  {
    icon: "🛡️",
    title: "Safety & Scam Protection",
    description:
      "Learn how to identify scams, impersonators, phishing attempts and fake Pi support.",
  },
  {
    icon: "❓",
    title: "Pi FAQ",
    description:
      "Find answers to common questions about Pi and its ecosystem.",
  },
  {
    icon: "📩",
    title: "Pi Support",
    description:
      "Find useful support resources and official information when you need help.",
  },
];

export default function PiCommunityHub({
  onBack,
}: PiCommunityHubProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionClick = (title: string) => {
    setActiveSection((current) =>
      current === title ? null : title
    );
  };

  return (
    <div className="pi-hub-page">
      <div className="pi-hub-background" />

      <header className="pi-hub-header">
        <div className="pi-hub-header-inner">
          <button
            className="pi-hub-back"
            type="button"
            onClick={onBack}
            aria-label="Go back"
          >
            ←
          </button>

          <div className="pi-hub-brand">
            <div className="pi-hub-logo">π</div>

            <div>
              <span className="pi-hub-eyebrow">MINGLE</span>
              <h1>Pi Community Hub</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="pi-hub-content">
        <section className="pi-hub-hero">
          <div className="pi-hub-hero-glow" />

          <div className="pi-hub-hero-icon">
            π
          </div>

          <div className="pi-hub-hero-copy">
            <span className="pi-hub-label">
              PI COMMUNITY
            </span>

            <h2>
              Welcome to the
              <span> Pi Community Hub</span>
            </h2>

            <p>
              Explore Pi updates, resources, ecosystem
              information, security guidance and supported
              Pi features — all in one place.
            </p>
          </div>
        </section>

        <section className="pi-hub-section">
          <div className="pi-hub-section-heading">
            <div>
              <span>EXPLORE</span>
              <h2>Pi Resources</h2>
            </div>

            <div className="pi-hub-count">
              {sections.length} sections
            </div>
          </div>

          <div className="pi-hub-grid">
            {sections.map((section) => {
              const isActive = activeSection === section.title;

              return (
                <button
                  key={section.title}
                  type="button"
                  className={`pi-hub-card ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() =>
                    handleSectionClick(section.title)
                  }
                >
                  <div className="pi-hub-card-top">
                    <div className="pi-hub-card-icon">
                      {section.icon}
                    </div>

                    <span className="pi-hub-card-arrow">
                      →
                    </span>
                  </div>

                  <h3>{section.title}</h3>

                  <p>{section.description}</p>

                  {isActive && (
                    <div className="pi-hub-card-message">
                      <span>Coming to this section</span>
                      <small>
                        This area will be connected to its
                        full Mingle experience.
                      </small>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="pi-hub-safety">
          <div className="pi-hub-safety-icon">
            🛡️
          </div>

          <div>
            <span>STAY SAFE</span>

            <h2>Protect your Pi wallet</h2>

            <p>
              Never share your wallet passphrase with
              another person, website or supposed support
              representative. Always verify information
              through trusted sources.
            </p>
          </div>
        </section>

        <footer className="pi-hub-footer">
          <div className="pi-hub-footer-logo">M</div>

          <div>
            <strong>Mingle</strong>
            <p>
              Where People Don’t Just Connect… They Belong.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
