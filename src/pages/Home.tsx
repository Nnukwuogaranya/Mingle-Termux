import { useState } from "react";
import {
  FaHome,
  FaUserFriends,
  FaBell,
  FaComments,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";
import "./Home.css";

type Post = {
  id: number;
  author: string;
  text: string;
  time: string;
};

function Home() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Mingle",
      text: "🎉 Welcome to Mingle! This is the beginning of your journey. Connect. Share. Grow. Where People Don't Just Connect... They Belong.",
      time: "Just now",
    },
  ]);

  const [text, setText] = useState("");

  const createPost = () => {
    if (!text.trim()) return;

    setPosts([
      {
        id: Date.now(),
        author: "You",
        text,
        time: "Now",
      },
      ...posts,
    ]);

    setText("");
  };

  return (
    <div className="home">
      <header className="topbar">
        <h1 className="logo">Mingle</h1>

        <div className="top-icons">
          <FaSearch />
          <FaBell />
        </div>
      </header>

      <section className="welcome-card">
        <h2>Welcome to Mingle</h2>
        <p>Where People Don't Just Connect... They Belong.</p>
      </section>

      <section className="create-post">
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={createPost}>
          <FaPlusCircle /> Share
        </button>
      </section>

      <section className="feed">
        {posts.map((post) => (
          <article className="post" key={post.id}>
            <div className="post-header">
              <strong>{post.author}</strong>
              <span>{post.time}</span>
            </div>

            <p>{post.text}</p>
          </article>
        ))}
      </section>

      <nav className="bottom-nav">
        <button>
          <FaHome />
          <span>Home</span>
        </button>

        <button>
          <FaUserFriends />
          <span>Friends</span>
        </button>

        <button>
          <FaComments />
          <span>Chat</span>
        </button>

        <button>
          <FaBell />
          <span>Alerts</span>
        </button>
      </nav>
    </div>
  );
}

export default Home;
