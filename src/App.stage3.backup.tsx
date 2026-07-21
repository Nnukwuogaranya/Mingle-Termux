import './App.css'

function App() {
  return (
    <div className="mingle-app">

      <header className="profile-header">

        <div className="avatar">
          👤
        </div>

        <div className="profile-info">
          <h2>
            Mingle Pioneer
            <span className="pi-badge"> π</span>
          </h2>

          <p>
            Building the future of social connection
          </p>

          <small>
            1.2K Friends • 350 Followers
          </small>
        </div>

      </header>


      <section className="stories">

        <div className="story add-story">
          ➕
          <span>Add</span>
        </div>

        <div className="story">
          🌍
          <span>Community</span>
        </div>

        <div className="story">
          💡
          <span>Ideas</span>
        </div>

        <div className="story">
          🚀
          <span>Projects</span>
        </div>

      </section>
      <main className="feed">

        <article className="post-card">

          <div className="post-header">
            <div className="mini-avatar">
              👤
            </div>

            <div>
              <h3>
                Ada Pi Pioneer
                <span className="pi-badge"> π</span>
              </h3>

              <small>
                10 minutes ago
              </small>
            </div>
          </div>


          <p>
            Welcome to Mingle! A new generation of connection,
            creativity and opportunities.
          </p>


          <div className="post-actions">

            <button>
              ❤️ Like
            </button>

            <button>
              💬 Comment
            </button>

            <button>
              🚀 Share
            </button>

          </div>

        </article>


        <article className="post-card">

          <div className="post-header">
            <div className="mini-avatar">
              🌍
            </div>

            <div>
              <h3>
                Pi Community
                <span className="pi-badge"> π</span>
              </h3>

              <small>
                1 hour ago
              </small>
            </div>
          </div>


          <p>
            Discover communities, businesses and ideas from around the world.
          </p>


          <div className="post-actions">

            <button>
              ❤️ Like
            </button>

            <button>
              💬 Comment
            </button>

            <button>
              🚀 Share
            </button>

          </div>

        </article>
      </main>


      <nav className="bottom-nav">

        <div>
          🏠
          <span>Home</span>
        </div>

        <div>
          🔍
          <span>Discover</span>
        </div>

        <div className="create-btn">
          ➕
          <span>Create</span>
        </div>

        <div>
          💬
          <span>Chat</span>
        </div>

        <div>
          👤
          <span>Profile</span>
        </div>

      </nav>


    </div>
  )
}

export default App
