import React, { useState } from "react";
import "./Auth.css";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

type LoginProps = {
  onLogin: () => void;
};

export default function Login({ onLogin }: LoginProps) {
  const = useState("");
  const = useState("");
  const = useState("");[emailOrPhone][setEmailOrPhone][password][setPassword][error][setError]

  const handleLogin = async () => {
    setError("");
    if (!emailOrPhone.trim() ||!password.trim()) {
      setError("Please enter email and password");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, emailOrPhone, password);
      onLogin();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignup = async () => {
    setError("");
    if (!emailOrPhone.trim() ||!password.trim()) {
      setError("Please enter email and password");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, emailOrPhone, password);
      alert("Account Created!");
      onLogin();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePiLogin = () => {
    // @ts-ignore
    http://window.Pi.authenticate(['username', 'payments'],
      function(auth) {
        http://console.log("Pi Login Success", auth);
        onLogin();
      },
      function(error) {
        http://console.error(error);
        setError("Pi Login Failed");
      }
    );
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">M</div>
        <h1>Welcome Back</h1>
        <p>Sign in to continue your Mingle journey.</p>
        <input
          type="email"
          placeholder="Email"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{color: 'red', fontSize: '12px'}}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
        <button className="secondary-button" onClick={handleSignup}>
          Create New Mingle Account
        </button>
        <div className="auth-divider">OR</div>
        <button className="pi-button" onClick={handlePiLogin}>
          🟣 Continue with Pi
        </button>
        <div className="auth-links">
          <a href="#">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}
