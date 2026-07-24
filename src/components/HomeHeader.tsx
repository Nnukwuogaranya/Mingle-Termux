import {
  FaSearch,
  FaBell,
  FaComments
} from "react-icons/fa";
import "./HomeHeader.css";

function HomeHeader() {
  return (
    <header className="home-header">

      <div className="top-row">

        <div className="brand">

          <h1>Mingle</h1>

          <span>
            Where People Don't Just Connect...
          </span>

        </div>

        <div className="actions">

          <button>
            <FaSearch />
          </button>

          <button>
            <FaComments />
          </button>

          <button className="notify">
            <FaBell />
            <small>3</small>
          </button>

        </div>

      </div>

    </header>
  );
}

export default HomeHeader;
