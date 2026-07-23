import React, { useState } from "react";

const Messenger = () => {

  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;

    alert(`Message sent: ${message}`);

    setMessage("");
  };

  return (
    <div className="messenger-card">

      <div className="messenger-header">
        💬 Messenger
      </div>

      <div className="chat-preview">
        <div className="avatar">
          M
        </div>

        <div>
          <h4>
            Mingle Community
          </h4>

          <p>
            Start connecting with people.
          </p>
        </div>
      </div>


      <div className="message-box">

        <input
          type="text"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
};

export default Messenger;
