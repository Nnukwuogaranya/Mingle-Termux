import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="profile-page">
      <div className="profile-cover"></div>

      <div className="profile-card">
        <div className="profile-avatar">
          JP
        </div>

        <h2>PST Juddy Praise</h2>

        <p style={{ color: "#777", marginTop: "10px" }}>
          Founder of Mingle
        </p>

        <p
          style={{
            marginTop: "20px",
            lineHeight: "1.8"
          }}
        >
          Welcome to my profile. Mingle is a premium social network
          created to bring people together, build communities,
          support businesses and connect the Pi ecosystem.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "30px"
          }}
        >
          <div>
            <h3>0</h3>
            <small>Posts</small>
          </div>

          <div>
            <h3>0</h3>
            <small>Friends</small>
          </div>

          <div>
            <h3>0</h3>
            <small>Followers</small>
          </div>
        </div>

        <button
          className="gold-btn"
          onClick={() => navigate("/")}
          style={{ marginTop: "30px" }}
        >
          Back Home
        </button>
      </div>
    </div>
  );
}
