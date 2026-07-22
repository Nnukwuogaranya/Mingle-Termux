import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const resetPassword = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("A password reset link has been sent to your email.");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-page">
      <h1>Forgot Password</h1>

      <p>
        Enter your email address and we'll send you a password reset link.
      </p>

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="purple-btn"
        onClick={resetPassword}
      >
        Send Reset Link
      </button>

      <p>
        <Link to="/login">
          Back to Login
        </Link>
      </p>
    </div>
  );
}
