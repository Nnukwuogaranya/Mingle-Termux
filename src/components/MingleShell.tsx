import React from "react";
import "./MingleShell.css";
import BottomNav from "./BottomNav";

type Props = {
  children: React.ReactNode;
};

export default function MingleShell({ children }: Props) {
  return (
    <div className="mingle-shell">
      <div className="mingle-glow glow-one"></div>
      <div className="mingle-glow glow-two"></div>

      <header className="mingle-top-bar">
        <div className="mingle-brand">
          <span className="mingle-symbol">M</span>
          <h2>Mingle</h2>
        </div>

        <div className="mingle-actions">
          <button>🔔</button>
          <button>🔍</button>
        </div>
      </header>

      <main className="mingle-content">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
