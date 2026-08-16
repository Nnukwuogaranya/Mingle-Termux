import React from "react";
import "./Entrance.css";

interface EntranceProps {
  onLogin: () => void;
  onPiLogin: () => void;
}

export default function Entrance({
  onLogin,
  onPiLogin,
}: EntranceProps) {
  return (
    <div className="mingle-entrance">

      <button
        type="button"
        className="portal-gate portal-gate-login"
        onClick={onLogin}
        aria-label="Login"
      >
        <span className="portal-icon">M</span>
        <span className="portal-label">LOGIN</span>
        <span className="portal-arrow">→</span>
      </button>

      <button
        type="button"
        className="portal-gate portal-gate-pi"
        onClick={onPiLogin}
        aria-label="Login with Pi"
      >
        <span className="portal-icon">π</span>
        <span className="portal-label">LOGIN WITH PI</span>
        <span className="portal-arrow">→</span>
      </button>

    </div>
  );
}
