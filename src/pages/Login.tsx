import React, { useState } from "react";
import "./Auth.css";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!emailOrPhone.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, emailOrPhone, password);
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignup = async () => {
    setError("");
    if (!emailOrPhone.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, emailOrPhone, password);
      alert("Account Created!");
      navigate("/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePiLogin = () => {
    // @ts-ignore
    if (window.Pi) {
      window.Pi.authenticate(['username', 'payments'],
        function(auth) {
          console.log("Pi Login Success", auth);
          navigate("/home");
        },
        function(error) {
          console.error(error);
          setError("Pi Login Failed");
        }
      );
    } else {
      setError("Open this in Pi Browser");
    }
  };

  return (
    <div className="auth-page fade-in">
      <div className="auth-card">
        <div className="auth-logo">M</div>
        <h1>Welcome Back</h1>
        <p>Sign in to continue your Mingle journey.</p>

        <input type="email" placeholder="Email" value={emailOrPhone} onChange={(e) => setEmailOrPhone(e.target.value)} />
        
        <div className="password-box">
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
        </div>

        {error && <p style={{color: 'red', fontSize: '12px', textAlign: 'center'}}>{error}</p>}

        <button className="login-button" onClick={handleLogin}>Login</button>
        <button className="link-button" onClick={handleSignup}>Create New Mingle Account</button>
        
        <div className="auth-divider">OR</div>
        
        <button className="pi-button" onClick={handlePiLogin}>🟣 Continue with Pi</button>
      </div>
    </div>
  );
}
