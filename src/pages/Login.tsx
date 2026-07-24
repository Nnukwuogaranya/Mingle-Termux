import React, { useState } from "react";
import "./Auth.css";

type LoginProps = {
  onLogin: () => void;
};

export default function Login({ onLogin }: LoginProps) {

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    if (!emailOrPhone.trim()) {
      alert("Enter your email or phone number.");
      return;
    }

    if (!password.trim()) {
      alert("Enter your password.");
      return;
    }

    // Temporary login.
    // Firebase authentication will replace this.
    onLogin();
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          M
        </div>

        <h1>Welcome Back</h1>

        <p>
          Sign in to continue your Mingle journey.
        </p>

        <input
          type="text"
          placeholder="Email or Phone Number"
          value={emailOrPhone}
          onChange={(e) =>
            setEmailOrPhone(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Login
        </button>

        <button className="pi-button">
          🟣 Continue with Pi
        </button>

        <button className="finger-button">
          🔐 Login with Fingerprint
        </button>

        <div className="auth-links">

          <a href="#">
            Forgot Password?
          </a>

        </div>

        <div className="auth-divider">
          OR
        </div>

   
        <button className="pi-button">
          🟣 Continue with Pi
        </button>

        <button className="finger-button">
          🔐 Login with Fingerprint
        </button>

        <div className="auth-links">

          <a href="#">
            Forgot Password?
          </a>

        </div>

        <div className="auth-divider">
          OR
        </div>

        <button className="secondary-button">
          Create New Mingle Account
        </button>
      </div>

    </div>
  );
}
