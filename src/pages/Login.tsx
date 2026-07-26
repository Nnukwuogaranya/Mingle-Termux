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
      setError("Please enter your email and password.");
      return;
    }


    try {

      setLoading(true);


      await loginUser(
        email,
        password
      );


      onLogin();


    } catch (err: any) {

      setError(
        err.message ||
        "Login failed."
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
          Mingle
        </h1>


        <p>
          Where People Don't Just Connect...
          They Belong.
        </p>



        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}



        <input
          type="email"
          placeholder="Email"
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
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>



        <button
          className="login-button"
          onClick={login}
          disabled={loading}
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>



        <button
          className="link-button"
          onClick={onForgotPassword}
        >
          Forgot Password?
        </button>



        <div className="auth-links">

          <span>
            Don't have an account?
          </span>


          <button
            className="link-button"
            onClick={onRegister}
          >
            Join Mingle
          </button>

        </div>


      </div>

    </div>

  );

}
