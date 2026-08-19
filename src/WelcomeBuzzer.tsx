import React, { useEffect, useState } from "react";
import "./WelcomeBuzzer.css";

interface WelcomeBuzzerProps {
  userName?: string;
  onComplete: () => void;
}

export default function WelcomeBuzzer({
  userName = "Mingle User",
  onComplete,
}: WelcomeBuzzerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShow(true);
    }, 300);

    return () => window.clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setShow(false);

    window.setTimeout(() => {
      onComplete();
    }, 650);
  };

  return (
    <div
      className={`welcome-buzzer ${
        show ? "welcome-buzzer-visible" : ""
      }`}
    >
      <div className="welcome-buzzer-glow" />

      <div className="welcome-buzzer-content">
        <div className="welcome-logo-mark">M</div>

        <div className="welcome-word">
          {"WELCOME".split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              style={{
                animationDelay: `${index * 0.09}s`,
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="welcome-divider" />

        <div className="welcome-user">
          {userName.toUpperCase()}
        </div>

        <button
          className="welcome-buzzer-button"
          type="button"
          onClick={handleEnter}
          aria-label="Enter Mingle"
        >
          <span className="welcome-buzzer-core">
            <span className="welcome-buzzer-m">M</span>
          </span>

          <span className="welcome-buzzer-ring ring-one" />
          <span className="welcome-buzzer-ring ring-two" />

          <span className="welcome-buzzer-label">
            ENTER MINGLE
          </span>
        </button>
      </div>
    </div>
  );
}
