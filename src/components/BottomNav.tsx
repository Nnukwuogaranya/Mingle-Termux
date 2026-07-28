import "./BottomNav.css";
import { NavLink } from "react-router-dom";
import {
FaHome,
FaUserFriends,
FaComments,
FaBell,
FaUserCircle,
} from "react-icons/fa";

const BottomNav = () => {
return (
<nav className="bottom-nav">
<NavLink to="/home">
<FaHome />
<span>Home</span>
</NavLink>

<NavLink to="/friends">  
    <FaUserFriends />  
    <span>Friends</span>  
  </NavLink>  

  <NavLink to="/messenger">  
    <FaComments />  
    <span>Chat</span>  
  </NavLink>  

  <NavLink to="/notifications">  
    <FaBell />  
    <span>Alerts</span>  
  </NavLink>  

  <NavLink to="/profile">  
    <FaUserCircle />  
    <span>Profile</span>  
  </NavLink>  
</nav>

);
};

export default BottomNav;
