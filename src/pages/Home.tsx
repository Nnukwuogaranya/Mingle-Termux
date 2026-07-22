import { useNavigate } from "react-router-dom";
import "./../App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="mingle-home">

      <header className="mingle-header">
        <h1>Mingle</h1>

        <button onClick={() => navigate("/login")}>
          Logout
        </button>
      </header>


      <section className="profile-banner">

        <div className="profile-circle">
          M
        </div>

        <div>
          <h2>
            Welcome to Mingle
          </h2>

          <p>
            Connect. Share. Belong.
          </p>
        </div>

      </section>


      <section className="stories-section">

        <h3>
          Stories
        </h3>

        <div className="stories">

          <div className="story">
            +
            <span>Add Story</span>
          </div>

          <div className="story">
            👤
            <span>Friend</span>
          </div>

          <div className="story">
            👤
            <span>Friend</span>
          </div>

        </div>

      </section>


      <section className="feed">

        <h3>
          Mingle Feed
        </h3>


        <div className="post-card">

          <h4>
            Welcome to the Mingle Community 🎉
          </h4>

          <p>
            This is where friendships, communities and ideas grow.
          </p>

        </div>


        <div className="post-card">

          <h4>
            Share your moment
          </h4>

          <p>
            Your posts will appear here.
          </p>

        </div>


      </section>


      <nav className="bottom-nav">

        <button>
          🏠 Home
        </button>

        <button>
          👥 Friends
        </button>

        <button>
          💬 Chat
        </button>

        <button>
          👤 Profile
        </button>

      </nav>


    </div>
  );
}
