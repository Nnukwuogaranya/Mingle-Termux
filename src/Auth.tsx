import React, { useState } from "react";
import "./portfolio.css";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  loginUser,
  registerUser,
  forgotPassword,
} from "./services/auth";

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
  onRegister?: (user: MingleUser) => void;
}

export default function Auth({ onLogin, onRegister }: AuthProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  /*
   * ========================================================
   * FIREBASE → MINGLE USER
   * ========================================================
   *
   * Firebase handles the actual authentication.
   *
   * Once Firebase authenticates the person, we convert
   * that Firebase user into the ONE Mingle user model.
   */
  const createMingleUser = (firebaseUser: any): MingleUser => {
    const displayName =
      firebaseUser.displayName ||
      firebaseUser.email?.split("@")[0] ||
      "Mingle User";

    return {
      id: firebaseUser.uid,
      name: displayName,
      username: displayName
        .toLowerCase()
        .replace(/\s+/g, "_"),
      email: firebaseUser.email || "",
      avatar: firebaseUser.photoURL || "",
      authMethod: "email",
    };
  };

  /*
   * ========================================================
   * EMAIL LOGIN / REGISTRATION
   * ========================================================
   */
  const handleMingleAuth = async () => {
    setError("");
    setMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!isLogin && !name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!isLogin && !confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const firebaseUser = isLogin
        ? await loginUser(cleanEmail, password)
        : await registerUser(
            name.trim(),
            cleanEmail,
            password
          );

      const mingleUser = createMingleUser(firebaseUser);

      /*
       * LOGIN → enter Mingle directly.
       *
       * REGISTER → create profile first.
       */
      if (isLogin) {
        onLogin?.(mingleUser);
      } else {
        onRegister?.(mingleUser);
      }
    } catch (err: any) {
      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ========================================================
   * FORGOT PASSWORD
   * ========================================================
   */
  const handleForgotPassword = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    setError("");
    setMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError(
        "Enter your email address first, then select Forgot Password."
      );
      return;
    }

    try {
      await forgotPassword(cleanEmail);

      setMessage(
        "Password reset instructions have been sent to your email."
      );
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to send the password reset email."
      );
    }
  };

  /*
   * ========================================================
   * PI LOGIN
   * ========================================================
   *
   * We are NOT creating a fake Pi user anymore.
   *
   * The real Pi SDK authentication will be connected here.
   *
   * Once authenticated, it must call onLogin() with:
   *
   * authMethod: "pi"
   *
   * and the user will enter the SAME Mingle platform.
   */
  const handlePiLogin = () => {
    setError("");
    setMessage("");

    setError(
      "Pi authentication is not connected yet. The Pi SDK will be connected here."
    );
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
              onClick={() => {
                setIsLogin(true);
                setError("");
                setMessage("");
              }}
            >
              Login
            </button>

            <button
              type="button"
              className={!isLogin ? "active" : ""}
              onClick={() => {
                setIsLogin(false);
                setError("");
                setMessage("");
              }}
            >
              Register
            </button>
          </div>

          {/* NAME — REGISTER ONLY */}
          {!isLogin && (
            <div className="input-group">
              <label>Full Name</label>

              <div className="password-box">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

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
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                role="button"
                tabIndex={0}
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </div>
            </div>
          </div>

          {/* CONFIRM PASSWORD — REGISTER ONLY */}
          {!isLogin && (
            <div className="input-group">
              <label>Confirm Password</label>
              <div className="password-box">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  role="button"
                  tabIndex={0}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                borderRadius: "10px",
                color: "#7f0000",
                background: "rgba(255, 235, 235, 0.88)",
                border: "1px solid rgba(180, 0, 0, 0.30)",
                fontWeight: "600",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {message && (
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                borderRadius: "10px",
                color: "#d4af37",
                background: "rgba(212, 175, 55, 0.08)",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}

          {/* OPTIONS */}
          <div className="options-row">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>

            {isLogin && (
              <a
                href="#"
                className="forgot-link"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </a>
            )}
          </div>

          {/* EMAIL AUTH */}
          <button
            className="login-btn"
            type="button"
            onClick={handleMingleAuth}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>

          {/* DIVIDER */}
          <div className="divider">OR</div>

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
                setError("");
                setMessage("");
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
