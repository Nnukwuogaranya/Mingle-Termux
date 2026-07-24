import "./Feed.css";

const posts = [
  {
    id: 1,
    author: "Mingle",
    time: "Just now",
    content:
      "🎉 Welcome to Mingle! This is the beginning of your journey. Connect. Share. Grow. Where People Don't Just Connect... They Belong.",
  },
  {
    id: 2,
    author: "Grace",
    time: "10 min ago",
    content:
      "Good morning everyone! Wishing you a productive and blessed day.",
  },
];

function Feed() {
  return (
    <section className="feed">
      {posts.map((post) => (
        <article className="feed-card" key={post.id}>
          <div className="feed-header">
            <strong>{post.author}</strong>
            <span>{post.time}</span>
          </div>

          <p>{post.content}</p>
        </article>
      ))}
    </section>
  );
}

export default Feed;
