import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="splash-screen">
        <div className="logo-circle">
          <h1>M</h1>
        </div>

        <h1 className="logo-text">Mingle</h1>

        <p className="tagline">
          Where people don't just connect...
          <br />
          They belong.
        </p>
      </div>
    );
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-card">

        <h1>Mingle</h1>

        <p className="welcome-text">
          Welcome to a premium social experience built for meaningful
          friendships, communities and the Pi ecosystem.
        </p>

        <button className="gold-btn">
          Join Mingle
        </button>

        <button className="purple-btn">
          Login
        </button>

        <p className="links">
          Forgot Password? • Recover with Email • Continue with Pi
        </p>

      </div>
    </div>
  );
}
