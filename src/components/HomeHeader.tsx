import React from "react";

const HomeHeader = () => {
  return (
    <header className="home-header">

      <div className="logo-section">
        <h1 className="mingle-logo">
          Mingle
        </h1>

        <p className="mingle-tagline">
          Where People Don't Just Connect... They Belong.
        </p>
      </div>

      <div className="header-actions">

        <button className="header-btn">
          🔍
        </button>

        <button className="header-btn">
          🔔
        </button>

        <button className="header-btn">
          💬
        </button>

      </div>

    </header>
  );
};

export default HomeHeader;
