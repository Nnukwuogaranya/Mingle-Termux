import React, { useState } from "react";
import "./Auth.css";

import { loginUser } from "../services/auth";

type LoginProps = {
  onLogin: () => void;
  onRegister: () => void;
  onForgotPassword: () => void;
};


export default function Login({
  onLogin,
  onRegister,
  onForgotPassword,
}: LoginProps) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const login = async () => {

    setError("");

    if (!email || !password) {
      setError("Enter email and password.");
      return;
    }


    try {

      setLoading(true);

      await loginUser(
        email,
        password
      );

      onLogin();


    } catch {

      setError(
        "Invalid email or password."
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="auth-page">

      <div className="auth-card">


        <div className="auth-logo">
          M
        </div>


        <h1>
          Welcome Back
        </h1>


        <p>
          Sign in to continue your Mingle journey.
        </p>



        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}



        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />



        <div className="password-box">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          <button
            type="button"
            className="eye-button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >

            {showPassword ? "🙈" : "👁️"}

          </button>


        </div>



        <button
          onClick={login}
          disabled={loading}
        >

          {loading
            ? "Logging in..."
            : "Login"
          }

        </button>



        <button className="pi-button">
          🟣 Continue with Pi
        </button>



        <button className="finger-button">
          🔐 Login with Fingerprint
        </button>



        <div className="auth-links">

          <button
            className="link-button"
            onClick={onForgotPassword}
          >
            Forgot Password?
          </button>

        </div>



        <div className="auth-divider">
          OR
        </div>



        <button
          className="secondary-button"
          onClick={onRegister}
        >

          Create New Mingle Account

        </button>



      </div>

    </div>

  );

}
