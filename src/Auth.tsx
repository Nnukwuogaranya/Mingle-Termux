import React, { useState } from "react";
import "./portfolio.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Auth() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return(
    <>
      {/* Floating Gold Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="logo-wrap">
            <div className="logo-circle">
              <div className="logo-m">M</div>
            </div>
            <h1 className="app-title">MINGLE</h1>
            <p className="tagline">
              Where People Don't Just Connect... They Belong.
            </p>
          </div>

          <div className="auth-tabs">
            <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
              Login
            </button>
            <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
              Register
            </button>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div className="password-box">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                style={{paddingLeft: '45px'}}
              />
              <FaEnvelope style={{position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', color:'var(--gold)'}}/>
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text":"password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                style={{paddingLeft: '45px'}}
              />
              <FaLock style={{position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', color:'var(--gold)'}}/>
              <div
                className="password-toggle"
                onClick={()=>setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash/> : <FaEye/>}
              </div>
            </div>
          </div>

          <div className="options-row">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="forgot-link">
              Forgot Password?
            </a>
          </div>

          <button className="login-btn" type="button">
            {isLogin ? 'Login' : 'Create Account'}
          </button>

          <div className="divider">OR</div>

          <button className="pi-btn" type="button">
            🟣 Continue with Pi
          </button>

          <div className="footer-text">
            Don't have an account? {" "}
            <a href="#" onClick={() => setIsLogin(false)}>
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
