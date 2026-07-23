import React, { useState } from "react";

interface CreatePostProps {
  onPostCreated?: (post: {
    text: string;
    time: string;
  }) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [postText, setPostText] = useState("");

  const createPost = () => {
    if (!postText.trim()) return;

    const newPost = {
      text: postText,
      time: "Just now",
    };

    if (onPostCreated) {
      onPostCreated(newPost);
    }

    setPostText("");
  };

  return (
    <div className="create-post-card">

      <div className="create-post-header">
        <div className="avatar">
          M
        </div>

        <input
          type="text"
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
      </div>

      <div className="post-actions">

        <button>
          📷 Photo
        </button>

        <button>
          😊 Feeling
        </button>

        <button
          className="post-button"
          onClick={createPost}
        >
          Post
        </button>

      </div>

    </div>
  );
};

export default CreatePost;
