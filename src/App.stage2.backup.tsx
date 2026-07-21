import './App.css'

function App() {
  return (
    <div className="mingle-app">

      <div className="welcome-card">

        <div className="mingle-logo">
          <span>🟣</span>
          <h1>Mingle</h1>
        </div>

        <h2>
          Connect. Share. Grow.
        </h2>

        <p>
          The next generation social experience built for the Pi Community.
        </p>

        <button className="pi-login">
          🔐 Sign in with Pi
        </button>

      </div>

      <div className="feature-grid">

        <div className="glass-card">
          <h3>🌍 Community</h3>
          <p>
            Discover people, ideas and opportunities around the world.
          </p>
        </div>

        <div className="glass-card">
          <h3>📰 Smart Feed</h3>
          <p>
            Share moments and follow conversations that matter.
          </p>
        </div>
        <div className="glass-card">
          <h3>💬 Connect</h3>
          <p>
            Chat privately and build meaningful relationships.
          </p>
        </div>

        <div className="glass-card">
          <h3>🛒 Pi Marketplace</h3>
          <p>
            Trade, create and grow inside the Pi economy.
          </p>
        </div>

      </div>

      <div className="bottom-preview">

        <div className="nav-item">
          🏠
          <span>Home</span>
        </div>

        <div className="nav-item">
          🔍
          <span>Discover</span>
        </div>

        <div className="nav-item">
          👤
          <span>Profile</span>
        </div>

        <div className="nav-item">
          🔔
          <span>Alerts</span>
        </div>

      </div>

    </div>
  )
}

export default App
