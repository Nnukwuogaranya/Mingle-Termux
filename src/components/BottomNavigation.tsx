import React from "react";

const BottomNavigation = () => {

  const menuItems = [
    {
      icon: "🏠",
      name: "Home",
    },
    {
      icon: "👥",
      name: "Friends",
    },
    {
      icon: "➕",
      name: "Create",
    },
    {
      icon: "🛒",
      name: "Market",
    },
    {
      icon: "👤",
      name: "Profile",
    },
  ];

  return (
    <div className="bottom-navigation">

      {menuItems.map((item, index) => (
        <button key={index}>

          <span>
            {item.icon}
          </span>

          <small>
            {item.name}
          </small>

        </button>
      ))}

    </div>
  );
};

export default BottomNavigation;
