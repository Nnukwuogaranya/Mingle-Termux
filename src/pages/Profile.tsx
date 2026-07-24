import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-page">

      {/* Cover Area */}
      <section className="profile-cover">

        <div className="profile-avatar">
          👤
        </div>

      </section>


      {/* Profile Info */}
      <section className="profile-info">

        <h1>
          Mingle User
        </h1>

        <p>
          🌍 Connecting people. Sharing moments.
          Building belonging.
        </p>


        <button className="edit-btn">
          Edit Profile
        </button>


        <div className="profile-stats">

          <div>
            <strong>120</strong>
            <span>Posts</span>
          </div>


          <div>
            <strong>2.5K</strong>
            <span>Followers</span>
          </div>


          <div>
            <strong>500</strong>
            <span>Following</span>
          </div>


        </div>


      </section>



      {/* Premium Badge */}

      <section className="badge-card">

        <h2>
          ✨ Mingle Identity
        </h2>

        <p>
          Active member of the Mingle community.
        </p>

      </section>



      {/* Pi Area */}

      <section className="wallet-card">

        <h2>
          🟣 Pi Connection
        </h2>

        <p>
          Connect your Pi identity and explore
          Mingle opportunities.
        </p>


        <button>
          Connect Pi
        </button>


      </section>




      {/* User Posts */}

      <section className="user-posts">

        <h2>
          📰 Posts
        </h2>


        <div className="post-card">

          <h3>
            Mingle User
          </h3>

          <p>
            Welcome to my Mingle journey 💜
          </p>

          <small>
            ❤️ 45 Likes • 💬 8 Comments
          </small>


        </div>



        <div className="post-card">

          <h3>
            Mingle User
          </h3>

          <p>
            Connecting with amazing people.
          </p>

          <small>
            ❤️ 21 Likes • 💬 4 Comments
          </small>

        </div>


      </section>




      {/* Bottom Navigation */}

      <nav className="profile-nav">

        <button>
          🏠
          <span>Home</span>
        </button>


        <button>
          🔎
          <span>Explore</span>
        </button>


        <button>
          ➕
          <span>Create</span>
        </button>


        <button>
          💬
          <span>Chat</span>
        </button>


        <button>
          👤
          <span>Profile</span>
        </button>


      </nav>


    </div>
  );
};


export default Profile;
