











import './App.css'

function App() {
  return (
    <div className="mingle-app">

      <header className="discover-header">

        <h1>
          🟣 Mingle
        </h1>

        <p>
          Discover people, ideas and opportunities.
        </p>


        <div className="search-box">
          🔎 Search Mingle...
        </div>

      </header>


      <section className="trend-section">

        <h2>
          🔥 Trending Communities
        </h2>


        <div className="community-row">

          <div className="community-card">
            🚀
            <span>Pi Builders</span>
          </div>


          <div className="community-card">
            💡
            <span>Creators Hub</span>
          </div>


          <div className="community-card">
            💼
            <span>Entrepreneurs</span>
          </div>

        </div>

      </section>
      <section className="discover-section">

        <h2>
          🌍 Discover People
        </h2>


        <div className="profile-card">

          <div className="avatar">
            👨🏾‍💻
          </div>


          <div>
            <h3>
              Mingle Creator
              <span className="pi-badge"> π</span>
            </h3>

            <p>
              Building innovative ideas with the Pi Community.
            </p>


            <div className="badges">

              🏆 Pioneer
              ⭐ Trusted Creator

            </div>

          </div>

        </div>


        <div className="profile-card">

          <div className="avatar">
            👩🏾‍🚀
          </div>


          <div>

            <h3>
              Community Leader
              <span className="pi-badge"> π</span>
            </h3>

            <p>
              Connecting people and growing communities.
            </p>


            <div className="badges">

              🌍 Leader
              🔥 Popular

            </div>

          </div>

        </div>
      </section>


      <section className="notification-box">

        <h2>
          🔔 Notifications
        </h2>

        <p>
          🎉 Someone followed your Mingle profile.
        </p>

        <p>
          💬 New comment on your post.
        </p>

        <p>
          🚀 New opportunity in Pi Builders.
        </p>

      </section>


      <nav className="bottom-nav">

        <div>
          🏠
          <span>Home</span>
        </div>

        <div>
          🔎
          <span>Discover</span>
        </div>

        <div className="create-btn">
          ➕
          <span>Create</span>
        </div>

        <div>
          🔔
          <span>Alerts</span>
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
