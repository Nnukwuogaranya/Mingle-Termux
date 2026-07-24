import React, { useState } from "react";
import "./Messenger.css";

const Messenger = () => {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "Welcome to Mingle 👋",
      sender: "Sarah"
    },
    {
      text: "This is the beginning of our journey 💜",
      sender: "Sarah"
    }
  ]);


  const sendMessage = () => {

    if (message.trim() === "") return;


    setMessages([
      ...messages,
      {
        text: message,
        sender: "You"
      }
    ]);


    setMessage("");

  };



  return (
    <div className="messenger-page">


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



      <section className="chat-messages">

        {messages.map((msg,index)=>(

          <div
            key={index}
            className={
              msg.sender === "You"
              ? "my-message"
              : "their-message"
            }
          >

            <strong>
              {msg.sender}
            </strong>

            <p>
              {msg.text}
            </p>

          </div>

        ))}

      </section>





      <div className="chat-box">


        <button>
          📎
        </button>


        <input

          value={message}

          onChange={(e)=>setMessage(e.target.value)}

          placeholder="Type a message..."

        />



        <button onClick={sendMessage}>
          ➤
        </button>


      </div>



    </div>
  );
};


export default Messenger;
