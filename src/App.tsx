import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  if (page === "profile") {
    return (
      <div className="mingle-screen">
        <div className="mingle-card">
          <div className="profile-photo">JP</div>

          <h2>My Mingle Profile</h2>

          <h3>Juddy Praise</h3>

          <p>Mingle ID: MGL001</p>

          <p className="tagline">
            Connect. Belong. Grow.
          </p>

          <button className="join-btn">
            Edit Profile
          </button>

          <button className="back-btn" onClick={() => setPage("home")}>
            Back Home
          </button>
        </div>
      </div>
    );
  }

  if (page === "register") {
    return (
      <div className="mingle-screen">
        <div className="mingle-card">

          <div className="logo">Mingle</div>

          <h2>Create Account</h2>

          <input placeholder="Email Address" />
          <input placeholder="Password" type="password" />

          <button 
            className="join-btn"
            onClick={() => setPage("profile")}
          >
            Register
          </button>

          <button className="back-btn" onClick={() => setPage("home")}>
            Back
          </button>

        </div>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div className="mingle-screen">
        <div className="mingle-card">

          <div className="logo">Mingle</div>

          <h2>Welcome Back</h2>

          <input placeholder="Email Address" />
          <input placeholder="Password" type="password" />

          <p className="forgot">
            Forgot Password?
          </p>

          <button 
            className="login-btn"
            onClick={() => setPage("profile")}
          >
            Login
          </button>

          <button className="pi-btn">
            Login with Pi
          </button>

          <button className="recover-btn">
            Recover with Email
          </button>

          <button className="back-btn" onClick={() => setPage("home")}>
            Back
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="mingle-screen">

      <div className="mingle-card">

        <div className="logo">
          Mingle
        </div>

        <p className="tagline">
          Connect. Belong. Grow.
        </p>

        <button 
          className="join-btn"
          onClick={() => setPage("register")}
        >
          Join Mingle
        </button>

        <button 
          className="login-btn"
          onClick={() => setPage("login")}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default App;
