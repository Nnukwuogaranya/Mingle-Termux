import "./App.css";

function App() {
  return (
    <div className="app">

      <header className="hero">
        <h1>Mingle</h1>
        <p>Connect • Create • Grow</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search people, communities and opportunities..."
          />
        </div>

        <div className="auth-buttons">
          <button className="join-btn">Create Account</button>
          <button className="login-btn">Sign In</button>
        </div>
      </header>

      <section className="section">
        <h2>🔥 Trending Communities</h2>

        <div className="chips">
          <span>Pi Builders</span>
          <span>Creators Hub</span>
          <span>Entrepreneurs</span>
          <span>Technology</span>
        </div>
      </section>

      <section className="section">
        <h2>👥 Discover People</h2>
        <div className="people-grid">
          <div className="card">
            <h3>Connect</h3>
            <p>Meet people with similar interests around the world.</p>
          </div>

          <div className="card">
            <h3>Create</h3>
            <p>Share ideas, stories, photos and opportunities.</p>
          </div>

          <div className="card">
            <h3>Grow</h3>
            <p>Build friendships, businesses and communities.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>🚀 Coming Soon</h2>

        <ul className="features">
          <li>✔ Real User Accounts</li>
          <li>✔ Personal Profiles</li>
          <li>✔ Messaging</li>
          <li>✔ Marketplace</li>
          <li>✔ Pi Integration</li>
        </ul>
      </section>
      <footer className="footer">
        <p>🌍 One World. Many Voices.</p>
      </footer>

      <nav className="bottom-nav">
        <button>🏠 Home</button>
        <button>🔍 Discover</button>
        <button>💬 Messages</button>
        <button>👤 Profile</button>
      </nav>

    </div>
  );
}

export default App;
