import "./Home.css";

const Home = () => {
  return (
    <div className="home">

      {/* Header */}
      <header className="topbar">

        <div className="brand">

          <div className="logo">
            M
          </div>

          <h1>Mingle</h1>

        </div>

        <div className="header-actions">

          <button className="header-btn">🔍</button>

          <button className="header-btn">🔔</button>

          <button className="header-btn">💬</button>

        </div>

      </header>

      {/* Live News */}

      <div className="live-news">

        <span className="live-dot"></span>

        <marquee>

          🔥 Pi Network • Trending Posts • Live Events • Marketplace • Verified Businesses • New Friends • Videos • Communities

        </marquee>

      </div>

      {/* Search */}

      <div className="search-area">

        <input
          type="text"
          placeholder="Search Mingle..."
        />

      </div>

      {/* Stories */}

      <div className="stories">

        <div className="story create">

          <div className="story-image plus">

            +

          </div>

          <span>Create Story</span>

        </div>

        <div className="story">

          <img
            src="https://i.pravatar.cc/200?img=1"
            alt=""
          />

          <span>Grace</span>

        </div>

        <div className="story">

          <img
            src="https://i.pravatar.cc/200?img=5"
            alt=""
          />

          <span>Daniel</span>

        </div>

        <div className="story">

          <img
            src="https://i.pravatar.cc/200?img=8"
            alt=""
          />

          <span>Chioma</span>

        </div>

        <div className="story">

          <img
            src="https://i.pravatar.cc/200?img=10"
            alt=""
          />

          <span>Samuel</span>

        </div>
                <div className="story">

          <img
            src="https://i.pravatar.cc/200?img=15"
            alt=""
          />

          <span>Esther</span>

        </div>

      </div>

      {/* Create Post */}

      <div className="create-post">

        <img
          className="avatar"
          src="https://i.pravatar.cc/200?img=12"
          alt=""
        />

        <input
          type="text"
          placeholder="What's on your mind?"
          readOnly
        />

        <button className="photo-btn">
          📷
        </button>

      </div>

      {/* Feed */}

      <div className="feed">

        <div className="post">

          <div className="post-header">

            <img
              className="avatar"
              src="https://i.pravatar.cc/200?img=20"
              alt=""
            />

            <div>

              <h3>Pst Juddy Praise</h3>

              <small>Just now • Public</small>

            </div>

          </div>

          <p>

            Welcome to the next generation of social networking.
            Mingle is being designed for beautiful conversations,
            quality communities and the Pi ecosystem.

          </p>

          <img
            className="post-image"
            src="https://picsum.photos/900/600"
            alt=""
          />

          <div className="post-actions">

            <button>❤️ Like</button>

            <button>💬 Comment</button>

            <button>↗ Share</button>

          </div>

        </div>

      </div>
            {/* Bottom Navigation */}

      <nav className="bottom-nav">

        <button className="active">
          🏠
          <span>Home</span>
        </button>

        <button>
          🔍
          <span>Discover</span>
        </button>

        <button>
          ➕
          <span>Create</span>
        </button>

        <button>
          💬
          <span>Chats</span>
        </button>

        <button>
          👤
          <span>Profile</span>
        </button>

      </nav>

    </div>
  );
};

export default Home;
