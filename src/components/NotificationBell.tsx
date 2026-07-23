import React, { useState } from "react";

const NotificationBell = () => {

  const [notifications, setNotifications] = useState(3);

  const openNotifications = () => {
    setNotifications(0);
  };

  return (
    <button
      className="notification-bell"
      onClick={openNotifications}
    >

      🔔

      {notifications > 0 && (
        <span className="notification-count">
          {notifications}
        </span>
      )}

    </button>
  );
};

export default NotificationBell;
