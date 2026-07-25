import React, { useState } from "react";
import "./Auth.css";

import { forgotPassword } from "../services/auth";


export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  const resetPassword = async () => {

    setMessage("");
    setError("");


    if (!email.trim()) {
      setError("Enter your email address.");
      return;
    }


    try {

      setLoading(true);


      await forgotPassword(email);


      setMessage(
        "Password reset link has been sent to your email."
      );


    } catch (err: any) {

      setError(
        err.message ||
        "Unable to send reset email."
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
          Forgot Password?
        </h1>


        <p>
          Enter your email and we will help you recover your account.
        </p>



        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}



        {message && (
          <div className="auth-success">
            {message}
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



        <button
          onClick={resetPassword}
          disabled={loading}
        >

          {loading
            ? "Sending..."
            : "Send Reset Link"
          }

        </button>



        <div className="auth-links">

          <a href="/login">
            Back to Login
          </a>

        </div>



      </div>

    </div>

  );

}
