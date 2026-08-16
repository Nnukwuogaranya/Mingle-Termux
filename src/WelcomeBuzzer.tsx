import React, { useState } from "react";
import "./WelcomeBuzzer.css";

interface WelcomeBuzzerProps {
  onComplete: () => void;
}

export default function WelcomeBuzzer({
  onComplete,
}: WelcomeBuzzerProps) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    if (pressed) return;

    setPressed(true);

    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="mingle-welcome">

      <div className="welcome-glow" />

      <div className="welcome-content">

        <div className="welcome-logo">
          M
        </div>

        <h1>WELCOME TO MINGLE</h1>

        <p>
          Where People Don't Just Connect...
          <br />
          <strong>They Belong.</strong>
        </p>

        <button
          type="button"
          className={`golden-buzzer ${
            pressed ? "buzzer-pressed" : ""
          }`}
          onClick={handlePress}
          disabled={pressed}
          aria-label="Enter Mingle"
        >
          <span className="buzzer-ring">
            <span className="buzzer-core">
              {pressed ? "✓" : "M"}
            </span>
          </span>

          <span className="buzzer-label">
            {pressed
              ? "ENTERING MINGLE..."
              : "ENTER MINGLE"}
          </span>
        </button>

      </div>

    </div>
  );
}
