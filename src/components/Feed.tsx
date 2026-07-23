import React, { useState } from "react";

interface Post {
  text: string;
  time: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      text: "🎉 Welcome to Mingle!\nThis is the beginning of your journey. Connect. Share. Grow. Where People Don't Just Connect... They Belong.",
      time: "Welcome",
    },
  ]);

  const addPost = (post: Post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className="feed">

      <div className="feed-title">
        📰 Feed
      </div>

      {posts.map((post, index) => (
        <div className="post-card" key={index}>

          <div className="post-user">
            <div className="avatar">
              M
            </div>

            <div>
              <h4>Mingle User</h4>
              <small>{post.time}</small>
            </div>
          </div>

          <p>
            {post.text}
          </p>

          <div className="post-footer">
            ❤️ Like
            💬 Comment
            ↗ Share
          </div>

        </div>
      ))}

    </div>
  );
};

export default Feed;
