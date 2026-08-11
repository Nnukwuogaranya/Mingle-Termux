import "./Empire.css";

interface EmpireProps {
  onEnterMingle: () => void;
  onEnterPi: () => void;
}

export default function Empire({
  onEnterMingle,
  onEnterPi,
}: EmpireProps) {
  return (
    <main className="empire-page">

      <div className="empire-bg" />
      <div className="empire-vignette" />
      <div className="empire-grain" />

      <header className="empire-header">
        <div className="empire-brand">
          <div className="brand-mark">
            M
          </div>

          <div>
            <div className="brand-name">MINGLE</div>
            <div className="brand-subtitle">
              EMPIRE
            </div>
          </div>
        </div>

        <div className="empire-status">
          <span className="status-dot" />
          <span>THE WORLD OF CONNECTION</span>
        </div>
      </header>

      <section className="empire-content">

        <div className="hero-copy">

          <div className="eyebrow">
            <span />
            THE MINGLE EXPERIENCE
            <span />
          </div>

          <h1>
            Enter the
            <strong>Mingle Empire</strong>
          </h1>

          <p>
            Where people don't just connect...
            <br />
            <span>they belong.</span>
          </p>

        </div>

        <div className="world-portals">

          {/* PI ENTRANCE */}

          <article className="world-card pi-world">

            <div className="portal-glow" />

            <div className="portal-top">

              <div className="portal-symbol pi-symbol">
                π
              </div>

              <div>
                <div className="portal-label">
                  PI AUTHENTICATION
                </div>

                <h2>
                  Continue with Pi
                </h2>
              </div>

            </div>

            <p className="world-description">
              Use your Pi identity to enter the Mingle social platform.
            </p>

            <ul>
              <li>Sign in with your Pi identity</li>
              <li>No separate Mingle authorization</li>
              <li>Access the same Mingle social world</li>
              <li>Pi identity can enrich your Mingle profile</li>
            </ul>

            <button
              className="portal-button pi-button"
              onClick={onEnterPi}
              type="button"
            >
              <span>Continue with Pi</span>
              <b>→</b>
            </button>

          </article>


          {/* MINGLE ACCOUNT ENTRANCE */}

          <article className="world-card mingle-world">

            <div className="portal-glow" />

            <div className="portal-top">

              <div className="portal-symbol mingle-symbol">
                M
              </div>

              <div>
                <div className="portal-label">
                  THE GLOBAL COMMUNITY
                </div>

                <h2>
                  Enter Mingle
                </h2>
              </div>

            </div>

            <p className="world-description">
              Create or access your Mingle account and build meaningful
              relationships.
            </p>

            <ul>
              <li>People & communities</li>
              <li>Posts, stories & moments</li>
              <li>Messenger & conversations</li>
              <li>Marketplace & discovery</li>
            </ul>

            <button
              className="portal-button mingle-button"
              onClick={onEnterMingle}
              type="button"
            >
              <span>Enter Mingle</span>
              <b>→</b>
            </button>

          </article>

        </div>

        <div className="empire-divider">
          <span />
          <div>M</div>
          <span />
        </div>

        <footer className="empire-footer">
          <p>
            One platform. Two entrances. One place to belong.
          </p>

          <span>
            © 2026 Mingle Empire
          </span>
        </footer>

      </section>

    </main>
  );
}
