import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

function SearchBar() {
  return (
    <section className="search-section">
      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search people, posts, videos..."
        />
      </div>
    </section>
  );
}

export default SearchBar;
