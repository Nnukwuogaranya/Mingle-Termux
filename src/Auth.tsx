import React, { useState } from "react";
import "./portfolio.css";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export type MingleAuthMethod = "pi" | "email";

export interface MingleUser {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  avatar?: string;
  authMethod: MingleAuthMethod;
  piProfile?: {
    username?: string;
    badge?: string;
    status?: string;
  };
}

interface AuthProps {
  onLogin?: (user: MingleUser) => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  /*
   * -------------------------------------------------------
   * NORMAL MINGLE ACCOUNT
   * -------------------------------------------------------
   *
   * This is the temporary front-end authentication bridge.
   *
   * Later we can connect this directly to Firebase
   * Authentication.
   */
  const handleMingleAuth = () => {
    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      alert("Please enter your email and password.");
      return;
    }

    const user: MingleUser = {
      id: `mingle-${Date.now()}`,
      email: cleanEmail,
      name: cleanEmail.split("@")[0],
      username: cleanEmail.split("@")[0],
      authMethod: "email",
    };

    onLogin?.(user);
  };

  /*
   * -------------------------------------------------------
   * PI AUTHENTICATION
   * -------------------------------------------------------
   *
   * IMPORTANT:
   *
   * Pi authentication does NOT send the user to a separate
   * Pi social network.
   *
   * Successful Pi authentication creates a normal Mingle
   * session with authMethod = "pi".
   *
   * The real Pi SDK authentication will be connected here.
   */
  const handlePiLogin = () => {
    /*
     * TEMPORARY DEVELOPMENT USER
     *
     * Replace this section with the real Pi SDK login
     * once the Pi authentication environment is connected.
     */
    const user: MingleUser = {
      id: `pi-${Date.now()}`,
      name: "Pi Member",
      username: "pi_user",
      authMethod: "pi",
      piProfile: {
        username: "pi_user",
        badge: "Pi Member",
        status: "Pi Authenticated",
      },
    };

    onLogin?.(user);
  };

  return (
    <>
      {/* Floating Gold Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="auth-container">
        <div className="auth-card">

          {/* MINGLE BRAND */}
          <div className="logo-wrap">
            <div className="logo-circle">
              <div className="logo-m">M</div>
            </div>

            <h1 className="app-title">MINGLE</h1>

            <p className="tagline">
              Where People Don't Just Connect... They Belong.
            </p>
          </div>

          {/* LOGIN / REGISTER */}
          <div className="auth-tabs">
            <button
              type="button"
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              type="button"
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email Address</label>

            <div className="password-box">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: "45px" }}
              />

              <FaEnvelope
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--gold)",
                }}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: "45px" }}
              />

              <FaLock
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--gold)",
                }}
              />

              <div
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                tabIndex={0}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* OPTIONS */}
          <div className="options-row">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>

            <a
              href="#"
              className="forgot-link"
              onClick={(e) => e.preventDefault()}
            >
              Forgot Password?
            </a>
          </div>

          {/* NORMAL MINGLE LOGIN / REGISTER */}
          <button
            className="login-btn"
            type="button"
            onClick={handleMingleAuth}
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          {/* DIVIDER */}
          <div className="divider">OR</div>

          {/* PI ENTRY */}
          <button
            className="pi-btn"
            type="button"
            onClick={handlePiLogin}
          >
            🟣 Continue with Pi
          </button>

          {/* FOOTER */}
          <div className="footer-text">
            {isLogin
              ? "Don't have an account? "
              : "Already have an account? "}

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(!isLogin);
              }}
            >
              {isLogin ? "Register" : "Login"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
