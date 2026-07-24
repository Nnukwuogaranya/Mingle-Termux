import {
  FaHome,
  FaUserFriends,
  FaComments,
  FaBell,
} from "react-icons/fa";
import "./BottomNavigation.css";

function BottomNavigation() {
  return (
    <nav className="bottom-nav">
      <button className="active">
        <FaHome />
        <span>Home</span>
      </button>

      <button>
        <FaUserFriends />
        <span>Friends</span>
      </button>

      <button>
        <FaComments />
        <span>Chats</span>
      </button>

      <button>
        <FaBell />
        <span>Alerts</span>
      </button>
    </nav>
  );
}

export default BottomNavigation;
