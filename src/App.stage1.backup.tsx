import './App.css'

function App() {
  return (
    <div className="app">

      <header className="hero">
        <div className="logo">
          🟣 Mingle
        </div>

        <h1>Connect. Share. Grow.</h1>

        <p>
          Welcome to Mingle, the social network built for the Pi Community.
        </p>

        <button className="pi-btn">
          🔐 Sign in with Pi
        </button>
      </header>

      <main className="content">
                <section className="card">
          <h2>📰 News Feed</h2>
          <p>
            Share your thoughts, updates, and discover what your friends are doing.
          </p>
        </section>

        <section className="card">
          <h2>👥 Groups</h2>
          <p>
            Join communities, create groups, and connect with people who share your interests.
          </p>
        </section>

        <section className="card">
          <h2>💬 Chat</h2>
          <p>
            Send messages and build real connections with the Mingle community.
          </p>
        </section>

        <section className="card">
          <h2>🛒 Marketplace</h2>
          <p>
            Buy and sell products using a trusted Pi-powered marketplace.
          </p>
        </section>
              </main>

      <footer className="footer">
        © 2026 Mingle • Built for the Pi Community
      </footer>

    </div>
  )
}

export default App
