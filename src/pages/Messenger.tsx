import React from "react";
import "./Messenger.css";

const Messenger = () => {
  return (
    <div className="messenger-page">

      {/* Messenger Header */}
      <header className="messenger-header">

        <div>
          <h1>
            💬 Sarah Johnson
          </h1>

          <small>
            🟢 Online
          </small>
        </div>


        <div className="call-actions">

          <button>
            📞
          </button>

          <button>
            📹
          </button>

        </div>

      </header>



      {/* Search */}
      <div className="message-search">
        🔍 Search conversations...
      </div>



      {/* Recent Chats */}

      <section className="conversation-list">

        <h2>
          Messages
        </h2>


        <div className="conversation-card">

          <h3>
            👤 Sarah Johnson
          </h3>

          <p>
            Welcome to Mingle 👋
          </p>

          <small>
            2 minutes ago
          </small>

        </div>




        <div className="conversation-card">

          <h3>
            🟣 Pi Community
          </h3>

          <p>
            New community update available
          </p>

          <small>
            10 minutes ago
          </small>

        </div>




        <div className="conversation-card">

          <h3>
            👤 David
          </h3>

          <p>
            Let's connect on Mingle
          </p>

          <small>
            Yesterday
          </small>

        </div>


      </section>





      {/* Chat Input Preview */}

      <section className="chat-box">

        <button>
          📎
        </button>


        <input
          placeholder="Type a message..."
        />


        <button>
          🎤
        </button>


        <button>
          😊
        </button>


      </section>





      {/* Floating New Chat */}

      <button className="new-message">

        +

      </button>





      {/* Navigation */}

      <nav className="message-nav">

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


export default Messenger;
