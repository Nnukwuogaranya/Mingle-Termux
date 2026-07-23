import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="search-card">

      <input
        type="text"
        placeholder="Search people, posts, businesses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="search-button">
        Search
      </button>

    </div>
  );
};

export default SearchBar;
