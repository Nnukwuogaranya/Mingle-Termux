import { useState } from "react";
import "./Auth.css";
import {
  FaEye,
  FaEyeSlash,
  FaFingerprint,
  FaArrowRight,
} from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-logo">
          <div className="logo-circle">
            <span className="logo-letter">M</span>
          </div>

         <h1 className="mingle-title">MINGLE</h1>

          <p>
            Where People Don't Just Connect...
            <br />
            They Belong.
          </p>
        </div>

        <form className="auth-form">

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="auth-input"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="auth-input"
          />

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="auth-input"
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          {!isLogin && (

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="auth-input"
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          )}

          <button
            type="button"
            className="pi-btn"
          >
            <span className="pi-logo">π</span>

            <span>
              Continue with Pi
            </span>

            <FaArrowRight />
          </button>

          <button
            type="button"
            className="finger-btn"
          >
            <FaFingerprint />

            Fingerprint Authentication
          </button>
          <div className="auth-row">

            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#">
              Forgot Password?
            </a>

          </div>

          <button
            type="submit"
            className="login-btn"
          >
            {isLogin
              ? "Login"
              : "Create Account"}
          </button>

          <button
            type="button"
            className="switch-link"
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >
            {isLogin
              ? "Don't have an account? Create Account"
              : "Already have an account? Login"}
          </button>

          <div className="auth-footer">

            <a href="/legal/about.html">
              About
            </a>

            <a href="/legal/privacy.html">
              Privacy
            </a>

            <a href="/legal/terms.html">
              Terms
            </a>

            <a href="/legal/support.html">
              Support
            </a>

          </div>

        </form>

      </div>
    </div>
  );
}

export default Login;
