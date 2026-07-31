import React, { useState } from "react";
import "./Auth.css";
import {
  FaEye,
  FaEyeSlash,
  FaFingerprint,
  FaLock,
  FaEnvelope
} from "react-icons/fa";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Firebase Login / Register goes here

      console.log(formData);

      await new Promise((resolve) =>
        setTimeout(resolve, 1800)
      );

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handlePiLogin = () => {
    console.log("Pi Login");
  };

  const handleFingerprint = () => {
    alert("Fingerprint login coming soon.");
  };

  return (
    <div className="auth-container">

      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <div className="bg-blob blob3"></div>

      <div className="auth-card">

        <div className="light-reflection"></div>

        {/* Logo */}

        <div className="auth-logo">

          <div className="logo-ring">

            <div className="logo-circle">
              M
            </div>

          </div>

          <h1>MINGLE</h1>

          <p>
            Where People Don't Just Connect...
            <br />
            They Belong.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <h2>
            {isLogin
              ? "Welcome Back"
              : "Create Account"}
          </h2>

          {!isLogin && (

            <input
              className="auth-input"
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          )}

          <div className="input-group">

            <FaEnvelope className="input-icon" />

            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <FaLock className="input-icon" />

            <input
              className="auth-input"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="show-password"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword
                ? <FaEyeSlash />
                : <FaEye />}
            </button>

          </div>

          <div className="remember-row">

            <label>

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(!rememberMe)
                }
              />

              Remember Me

            </label>

            <span className="forgot-password">
              Forgot Password?
            </span>

          </div>

          <button
            type="submit"
            className="btn-primary login-btn"
            disabled={loading}
          >

            {loading ? (

              <>
                <span className="loader"></span>

                Signing In...

              </>

            ) : (

              isLogin
                ? "Login"
                : "Create Account"

            )}

          </button>

          <button
            type="button"
            className="pi-btn"
            onClick={handlePiLogin}
          >

            <div className="pi-logo">
              π
            </div>

            Continue with Pi

          </button>

          <button
            type="button"
            className="fingerprint-btn"
            onClick={handleFingerprint}
          >

            <FaFingerprint />

            Fingerprint Login

          </button>

        </form>

        <p className="auth-toggle">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >

            {isLogin
              ? " Create Account"
              : " Login"}

          </span>

        </p>

        <div className="auth-footer">

          <span>Support</span>

          <span>Terms</span>

          <span>Privacy</span>

          <span>Language</span>

        </div>

      </div>

    </div>
  );
}
