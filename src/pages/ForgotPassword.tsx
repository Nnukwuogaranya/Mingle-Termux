import React, { useState } from "react";
import "./Auth.css";

export default function ForgotPassword() {

  const [contact, setContact] = useState("");

  const resetPassword = () => {

    if (!contact) {
      alert("Enter your email or phone number");
      return;
    }

    alert("Password reset link/verification sent");
  };


  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          M
        </div>


        <h1>Reset Password</h1>

        <p>
          Recover your Mingle account securely.
        </p>


        <input
          placeholder="Email or Phone Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />


        <button onClick={resetPassword}>
          Send Verification
        </button>


        <button className="finger-button">
          🔐 Use Account Recovery
        </button>


      </div>

    </div>

  );
}
