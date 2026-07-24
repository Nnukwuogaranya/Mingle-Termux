import { useState } from "react";
import "./CreatePost.css";

function CreatePost() {
  const [post, setPost] = useState("");

  const handlePost = () => {
    if (!post.trim()) return;

    alert("Post created successfully!");
    setPost("");
  };

  return (
    <section className="create-post">
      <textarea
        placeholder="What's happening on Mingle?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <button onClick={handlePost}>Share Post</button>
    </section>
  );
}

export default CreatePost;
