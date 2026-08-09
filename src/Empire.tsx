import "./Empire.css";
import "./Empire.css";
import React from "react";

type EmpireProps = {
  onMingle: () => void;
  onPi: () => void;
};

export default function Empire({ onMingle, onPi }: EmpireProps) {
  return (
    <main className="empire-container">

      <div className="bg-lights" />

      <header className="main-heading">
        MINGLE EMPIRE
        <span>Where People Don't Just Connect... They Belong.</span>
      </header>

      <section className="centerpiece">
        <div className="person" />
        <div className="person woman" />
      </section>

      <section className="scrolls">

        <article className="scroll pi">
          <div className="rod top" />

          <div className="parchment">
            <h4>Pi World</h4>

            <p>
              Enter the dedicated Mingle experience
              for the Pi community.
            </p>

            <ul>
              <li>Pi community</li>
              <li>Pi profile & identity</li>
              <li>Pi marketplace</li>
              <li>Pi services</li>
            </ul>

            <button type="button" onClick={onPi}>
              Enter Pi World
            </button>
          </div>

          <div className="rod bottom" />
        </article>


        <article className="scroll global">
          <div className="rod top" />

          <div className="parchment">
            <h4>Mingle World</h4>

            <p>
              Connect, share, discover and belong
              in the world of Mingle.
            </p>

            <ul>
              <li>Social connections</li>
              <li>Posts & stories</li>
              <li>Messenger</li>
              <li>Marketplace & communities</li>
            </ul>

            <button type="button" onClick={onMingle}>
              Enter Mingle
            </button>
          </div>

          <div className="rod bottom" />
        </article>

      </section>

      <footer className="footer">
        MINGLE
        <span>
          An empire where people don't just connect... they belong.
        </span>
      </footer>

    </main>
  );
}
