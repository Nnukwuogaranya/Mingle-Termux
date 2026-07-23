export default function Header() {
  return (
    <header className="mingle-header">

      <div className="logo">
        <h2>Mingle</h2>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search Mingle..."
        />
      </div>

      <div className="header-icons">
        <span title="Home">🏠</span>
        <span title="Friends">👥</span>
        <span title="Messages">💬</span>
        <span title="Notifications">🔔</span>
      </div>

    </header>
  );
}
