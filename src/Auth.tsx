import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";

export type MingleAuthMethod = "pi" | "email";

export interface MingleUser {
  uid?: string;
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  authMethod?: MingleAuthMethod;
  piProfile?: {
    uid?: string;
  id?: string;
    username?: string;
  };
}

interface AuthProps {
  onLogin?: (user: MingleUser) => void;
  onRegister?: (user: MingleUser) => void;
  onFirstLogin?: (user: MingleUser) => void;
}

export default function Auth({
  onLogin,
  onRegister,
  onFirstLogin,
}: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem("mingle_remember_email") || "";
    } catch {
      return "";
    }
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [rememberMe, setRememberMe] = useState(() => {
    try {
      return localStorage.getItem("mingle_remember_me") === "true";
    } catch {
      return false;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setError("");
    setMessage("");
  }, [isLogin]);

  const switchMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    setError("");
    setMessage("");
    setPassword("");
    setConfirmPassword("");
  };

  const friendlyFirebaseError = (code: string) => {
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/user-not-found":
      case "auth/invalid-credential":
        return "Incorrect email or password.";

      case "auth/wrong-password":
        return "Incorrect email or password.";

      case "auth/email-already-in-use":
        return "An account already exists with this email.";

      case "auth/weak-password":
        return "Password must be at least 6 characters.";

      case "auth/network-request-failed":
        return "Network connection failed. Please try again.";

      case "auth/too-many-requests":
        return "Too many attempts. Please wait and try again.";

      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (!isLogin) {
      if (!cleanName) {
        setError("Please enter your name.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (!confirmPassword) {
        setError("Please confirm your password.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setLoading(true);

    try {
      if (rememberMe) {
        localStorage.setItem(
          "mingle_remember_email",
          cleanEmail
        );

        localStorage.setItem(
          "mingle_remember_me",
          "true"
        );
      } else {
        localStorage.removeItem("mingle_remember_email");
        localStorage.removeItem("mingle_remember_me");
      }

      if (isLogin) {
        const result =
          await signInWithEmailAndPassword(
            auth,
            cleanEmail,
            password
          );

        const firebaseUser = result.user;

        const mingleUser: MingleUser = {
          uid: firebaseUser.uid,
          name:
            firebaseUser.displayName ||
            cleanEmail.split("@")[0],
          username:
            firebaseUser.displayName ||
            cleanEmail.split("@")[0],
          email: firebaseUser.email || cleanEmail,
          authMethod: "email",
        };

        /*
         * If the application has a special
         * first-login flow, preserve it.
         */
        let firstLogin = false;

        try {
          firstLogin =
            localStorage.getItem(
              "mingle_profile_pending"
            ) === "true";
        } catch {
          firstLogin = false;
        }

        if (firstLogin && onFirstLogin) {
          onFirstLogin(mingleUser);
        } else {
          onLogin?.(mingleUser);
        }
      } else {
        const result =
          await createUserWithEmailAndPassword(
            auth,
            cleanEmail,
            password
          );

        const firebaseUser = result.user;

        await updateProfile(firebaseUser, {
          displayName: cleanName,
        });

        const mingleUser: MingleUser = {
          uid: firebaseUser.uid,
          name: cleanName,
          username: cleanName,
          email: firebaseUser.email || cleanEmail,
          authMethod: "email",
        };

        onRegister?.(mingleUser);

        if (!onRegister) {
          onLogin?.(mingleUser);
        }
      }
    } catch (err: unknown) {
      const firebaseError = err as {
        code?: string;
        message?: string;
      };

      setError(
        friendlyFirebaseError(
          firebaseError.code || ""
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError(
        "Enter your email address first, then tap Forgot Password."
      );
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(
        auth,
        cleanEmail
      );

      setMessage(
        "Password reset instructions have been sent to your email."
      );
    } catch (err: unknown) {
      const firebaseError = err as {
        code?: string;
      };

      setError(
        friendlyFirebaseError(
          firebaseError.code || ""
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mingle-auth-page">
      <style>{`
        :root {
          --mingle-gold: #d4af37;
          --mingle-gold-light: #f7e7a1;
          --mingle-gold-bright: #ffe48a;

          --mingle-blue: #17345f;
          --mingle-blue-light: #2e5d91;

          --mingle-burgundy: #641f2c;
          --mingle-burgundy-dark: #3c111b;

          --mingle-green: #477b61;
          --mingle-green-light: #73a989;

          --mingle-pearl: #fdfbf7;
          --mingle-glass: rgba(9, 20, 38, 0.76);
        }

        * {
          box-sizing: border-box;
        }

        .mingle-auth-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 28px 18px;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;

          background:
            linear-gradient(
              135deg,
              rgba(10, 23, 43, .66),
              rgba(60, 17, 27, .42),
              rgba(23, 52, 95, .54)
            ),
            url("/mingle-pictures/mingle-login.jpg");

          background-size: cover;
          background-position: center;
          background-attachment: fixed;

          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            sans-serif;

          color: var(--mingle-pearl);
        }

        .mingle-auth-page::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              circle at 20% 20%,
              rgba(212,175,55,.18),
              transparent 30%
            ),
            radial-gradient(
              circle at 80% 75%,
              rgba(71,123,97,.18),
              transparent 32%
            ),
            linear-gradient(
              180deg,
              rgba(3,10,20,.08),
              rgba(3,10,20,.54)
            );
          pointer-events: none;
        }

        .mingle-auth-shell {
          position: relative;
          z-index: 2;
          width: min(470px, 100%);
          padding: 1px;
          border-radius: 30px;

          background:
            linear-gradient(
              135deg,
              rgba(247,231,161,.78),
              rgba(255,255,255,.22) 24%,
              rgba(71,123,97,.55) 54%,
              rgba(212,175,55,.72)
            );

          box-shadow:
            0 30px 80px rgba(0,0,0,.52),
            0 0 55px rgba(212,175,55,.16);
        }

        .mingle-auth-card {
          border-radius: 29px;
          padding: 30px 27px 26px;

          background:
            linear-gradient(
              145deg,
              rgba(9,20,38,.91),
              rgba(23,52,95,.82) 54%,
              rgba(60,17,27,.86)
            );

          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);

          border: 1px solid rgba(255,255,255,.14);

          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.14),
            inset 0 -1px 0 rgba(212,175,55,.13);
        }

        .mingle-brand {
          text-align: center;
          margin-bottom: 22px;
        }

        .mingle-logo-ring {
          width: 76px;
          height: 76px;
          margin: 0 auto 13px;
          border-radius: 50%;
          display: grid;
          place-items: center;

          background:
            radial-gradient(
              circle at 35% 30%,
              #fff8d1,
              #d4af37 42%,
              #755716 74%,
              #17120a
            );

          border: 2px solid rgba(247,231,161,.92);

          box-shadow:
            0 0 0 5px rgba(212,175,55,.09),
            0 0 28px rgba(212,175,55,.34),
            inset 0 0 20px rgba(255,255,255,.32);
        }

        .mingle-logo-letter {
          font-family: Georgia, serif;
          font-size: 43px;
          font-weight: 700;
          color: #fff8dc;
          text-shadow:
            0 2px 5px rgba(0,0,0,.55),
            0 0 14px rgba(255,232,145,.52);
        }

        .mingle-brand-title {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 30px;
          font-weight: 800;
          letter-spacing: .25em;

          background:
            linear-gradient(
              90deg,
              #f5df8d,
              #fff5c5,
              #d4af37,
              #fff5c5,
              #f5df8d
            );

          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;

          text-shadow:
            0 0 18px rgba(212,175,55,.17);
        }

        .mingle-brand-tagline {
          margin-top: 7px;
          color: rgba(253,251,247,.68);
          font-size: 12px;
          letter-spacing: .07em;
        }

        .mingle-switch {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 5px;
          margin-bottom: 22px;

          border-radius: 17px;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,.12),
              rgba(255,255,255,.05)
            );

          border: 1px solid rgba(255,255,255,.16);
          box-shadow:
            inset 0 1px 1px rgba(255,255,255,.08);
        }

        .mingle-switch button {
          border: 0;
          min-height: 48px;
          border-radius: 13px;
          background: transparent;
          color: rgba(253,251,247,.62);
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: .25s ease;
        }

        .mingle-switch button.active {
          color: #1c1a13;

          background:
            linear-gradient(
              135deg,
              #f8e8a1,
              #d4af37 52%,
              #f7dfa0
            );

          box-shadow:
            0 8px 22px rgba(212,175,55,.25),
            inset 0 1px 1px rgba(255,255,255,.65);
        }

        .mingle-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .mingle-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .mingle-field label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .04em;
          color: rgba(253,251,247,.82);
        }

        .mingle-input-wrap {
          position: relative;
        }

        .mingle-input-icon {
          position: absolute;
          left: 17px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--mingle-gold-light);
          font-size: 16px;
          pointer-events: none;
          z-index: 2;
        }

        .mingle-input {
          width: 100%;
          height: 53px;
          border-radius: 15px;

          border: 1px solid rgba(255,255,255,.15);

          outline: none;
          padding: 0 47px 0 48px;

          color: #fff;
          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,.095),
              rgba(255,255,255,.045)
            );

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          box-shadow:
            inset 0 1px 1px rgba(255,255,255,.07),
            0 8px 20px rgba(0,0,0,.11);

          font-size: 14px;
          transition: .22s ease;
        }

        .mingle-input::placeholder {
          color: rgba(253,251,247,.42);
        }

        .mingle-input:focus {
          border-color: rgba(212,175,55,.72);
          box-shadow:
            0 0 0 3px rgba(212,175,55,.10),
            0 8px 25px rgba(0,0,0,.17);
        }

        .mingle-eye {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          color: rgba(253,251,247,.56);
          cursor: pointer;
          font-size: 17px;
        }

        .mingle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: -2px;
        }

        .mingle-remember {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: rgba(253,251,247,.68);
          cursor: pointer;
        }

        .mingle-remember input {
          accent-color: var(--mingle-gold);
          width: 15px;
          height: 15px;
        }

        .mingle-forgot {
          border: 0;
          background: transparent;
          color: #f0d879;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .mingle-error,
        .mingle-success {
          padding: 11px 13px;
          border-radius: 12px;
          font-size: 12px;
          line-height: 1.45;
        }

        .mingle-error {
          color: #ffd6d6;
          background: rgba(100,31,44,.62);
          border: 1px solid rgba(255,140,155,.25);
        }

        .mingle-success {
          color: #d9f5df;
          background: rgba(71,123,97,.42);
          border: 1px solid rgba(115,169,137,.35);
        }

        .mingle-v-button {
          position: relative;
          width: 100%;
          min-height: 55px;
          border: 0;
          cursor: pointer;
          color: #18140b;

          font-size: 14px;
          font-weight: 900;
          letter-spacing: .09em;
          text-transform: uppercase;

          clip-path:
            polygon(
              0 0,
              100% 0,
              93% 50%,
              100% 100%,
              0 100%,
              7% 50%
            );

          background:
            linear-gradient(
              105deg,
              #f1d77e,
              #fff1ae 25%,
              #d4af37 52%,
              #f8e39a 76%,
              #b98c21
            );

          box-shadow:
            0 10px 30px rgba(212,175,55,.22);

          transition:
            transform .2s ease,
            filter .2s ease;
        }

        .mingle-v-button:hover {
          filter: brightness(1.08);
          transform: translateY(-2px);
        }

        .mingle-v-button:active {
          transform: translateY(0);
        }

        .mingle-v-button:disabled {
          opacity: .65;
          cursor: wait;
        }

        .mingle-register-note {
          text-align: center;
          margin-top: 20px;
          color: rgba(253,251,247,.58);
          font-size: 12px;
        }

        .mingle-register-link {
          border: 0;
          background: transparent;
          color: #d9bf5d;
          font-weight: 800;
          cursor: pointer;
        }

        .mingle-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 5px 0 0;
          color: rgba(253,251,247,.35);
          font-size: 10px;
          letter-spacing: .22em;
        }

        .mingle-divider::before,
        .mingle-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(212,175,55,.35),
              transparent
            );
        }

        .mingle-legal {
          margin: 18px auto 0;
          max-width: 360px;
          text-align: center;
          color: rgba(253,251,247,.46);
          font-size: 10px;
          line-height: 1.65;
        }

        .mingle-legal a {
          color: #d9bf5d;
          font-weight: 700;
          text-decoration: none;
          transition: .2s ease;
        }

        .mingle-legal a:hover {
          color: #fff1ae;
          text-decoration: underline;
        }

        .mingle-footer {
          text-align: center;
          margin-top: 21px;
          color: rgba(253,251,247,.37);
          font-size: 9px;
          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .mingle-footer strong {
          color: rgba(212,175,55,.67);
          font-weight: 700;
        }

        @media (max-width: 520px) {
          .mingle-auth-page {
            padding: 17px 13px;
            align-items: center;
            background-attachment: scroll;
          }

          .mingle-auth-shell {
            width: 100%;
            border-radius: 25px;
          }

          .mingle-auth-card {
            padding: 25px 18px 22px;
            border-radius: 24px;
          }

          .mingle-logo-ring {
            width: 68px;
            height: 68px;
          }

          .mingle-logo-letter {
            font-size: 38px;
          }

          .mingle-brand-title {
            font-size: 27px;
          }

          .mingle-brand-tagline {
            font-size: 11px;
          }

          .mingle-input {
            height: 52px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mingle-switch button,
          .mingle-input,
          .mingle-v-button {
            transition: none;
          }
        }
      `}</style>

      <div className="mingle-auth-shell">
        <div className="mingle-auth-card">

          <div className="mingle-brand">
            <div className="mingle-logo-ring">
              <div className="mingle-logo-letter">M</div>
            </div>

            <h1 className="mingle-brand-title">
              MINGLE
            </h1>

            <div className="mingle-brand-tagline">
              Where People Don't Just Connect... They Belong.
            </div>
          </div>

          <div className="mingle-switch">
            <button
              type="button"
              className={isLogin ? "active" : ""}
              onClick={() => switchMode(true)}
            >
              Login
            </button>

            <button
              type="button"
              className={!isLogin ? "active" : ""}
              onClick={() => switchMode(false)}
            >
              Register
            </button>
          </div>

          <form
            className="mingle-form"
            onSubmit={handleSubmit}
          >

            {!isLogin && (
              <div className="mingle-field">
                <label>Full Name</label>

                <div className="mingle-input-wrap">
                  <span className="mingle-input-icon">
                    ✦
                  </span>

                  <input
                    className="mingle-input"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            <div className="mingle-field">
              <label>Email Address</label>

              <div className="mingle-input-wrap">
                <span className="mingle-input-icon">
                  ✉
                </span>

                <input
                  className="mingle-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="mingle-field">
              <label>Password</label>

              <div className="mingle-input-wrap">
                <span className="mingle-input-icon">
                  ◆
                </span>

                <input
                  className="mingle-input"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete={
                    isLogin
                      ? "current-password"
                      : "new-password"
                  }
                />

                <button
                  type="button"
                  className="mingle-eye"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="mingle-field">
                <label>Confirm Password</label>

                <div className="mingle-input-wrap">
                  <span className="mingle-input-icon">
                    ◆
                  </span>

                  <input
                    className="mingle-input"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="mingle-eye"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword
                      ? "◉"
                      : "◌"}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="mingle-row">
                <label className="mingle-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                  />

                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="mingle-forgot"
                  onClick={handleForgotPassword}
                  disabled={loading}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {error && (
              <div className="mingle-error">
                {error}
              </div>
            )}

            {message && (
              <div className="mingle-success">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="mingle-v-button"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Enter Mingle  →"
                : "Create My Mingle Account  →"}
            </button>

            <div className="mingle-divider">
              <span>OR</span>
            </div>

            <div className="mingle-register-note">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="mingle-register-link"
                    onClick={() =>
                      switchMode(false)
                    }
                  >
                    Create Account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="mingle-register-link"
                    onClick={() =>
                      switchMode(true)
                    }
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </form>

          <div className="mingle-legal">
            By continuing, you agree to Mingle's{" "}
            <a
              href="/legal/terms.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </a>
            {" "}and{" "}
            <a
              href="/legal/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </div>

          <div className="mingle-footer">
            <strong>MINGLE</strong>
            &nbsp; • &nbsp;
            WHERE PEOPLE BELONG
          </div>

        </div>
      </div>
    </div>
  );
}
