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
    <main className="mingle-entrance">

      {/* RIGHT GOLD GATE — ENTER MINGLE */}
      <button
        type="button"
        className="portal-hotspot portal-hotspot-login"
        onClick={onLogin}
        aria-label="Enter Mingle"
      />

      {/* LEFT PURPLE GATE — LOGIN WITH PI */}
      <button
        type="button"
        className="portal-hotspot portal-hotspot-pi"
        onClick={onPiLogin}
        aria-label="Login with Pi"
      />

    </main>
  );
}
