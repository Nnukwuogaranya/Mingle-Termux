return (
  <div className="profile-page">

    {/* Cover Banner */}
    <section className="profile-cover">

      <button className="cover-edit-btn">
        Change Cover
      </button>

    </section>

    {/* Identity Header */}
    <section className="identity-header">

      <div className="profile-photo">
        👤
      </div>

      <div className="identity-info">

        <h1>
          Juddy <span className="verified">✔</span>
        </h1>

        <h3>@juddy</h3>

        <p>
          Software Developer • Nigeria 🇳🇬
        </p>

        <p className="bio">
          Building the future, one connection at a time.
        </p>

      </div>

      <div className="identity-actions">

        <button className="edit-btn">
          Edit Profile
        </button>

        <button className="share-btn">
          Share Profile
        </button>

      </div>

    </section>

  </div>
);
