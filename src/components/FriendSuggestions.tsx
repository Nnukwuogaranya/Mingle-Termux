import React from "react";

const FriendSuggestions = () => {
  const friends = [
    {
      name: "Chidi Okafor",
      mutual: "5 mutual friends",
    },
    {
      name: "Amara Grace",
      mutual: "8 mutual friends",
    },
    {
      name: "David Praise",
      mutual: "3 mutual friends",
    },
  ];

  return (
    <div className="friend-suggestions">

      <h3>
        👥 People You May Know
      </h3>

      {friends.map((friend, index) => (
        <div 
          className="friend-card" 
          key={index}
        >

          <div className="avatar">
            {friend.name.charAt(0)}
          </div>

          <div className="friend-info">
            <h4>
              {friend.name}
            </h4>

            <p>
              {friend.mutual}
            </p>
          </div>

          <button>
            Add
          </button>

        </div>
      ))}

    </div>
  );
};

export default FriendSuggestions;
