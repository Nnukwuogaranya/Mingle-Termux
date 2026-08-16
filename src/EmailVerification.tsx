import React, { useState } from "react";
import type { MingleUser } from "./Auth";
import { FaEnvelope } from "react-icons/fa";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase";

interface EmailVerificationProps {
  user: MingleUser;
  onVerified: () => void;
  onBackToLogin: () => void;
}

export default function EmailVerification({
  user,
  onVerified,
  onBackToLogin,
}: EmailVerificationProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendVerification = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setError("Your registration session has expired. Please login again.");
        return;
      }

      await sendEmailVerification(currentUser);

      setMessage(
        "Verification email sent. Please check your inbox and verify your email."
      );
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to send the verification email."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setError("Your session has expired. Please login again.");
        return;
      }

      await currentUser.reload();

      if (!currentUser.emailVerified) {
        setError(
          "Your email has not been verified yet. Please verify it first."
        );
        return;
      }

      onVerified();
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to verify your email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-logo">
          <FaEnvelope />
        </div>

        <h1>Verify Your Email</h1>

        <p className="profile-subtitle">
          We sent a verification link to
        </p>

        <div className="verification-email">
          {user.email}
        </div>

        {error && (
          <div className="profile-error">
            {error}
          </div>
        )}

        {message && (
          <div className="profile-success">
            {message}
          </div>
        )}

        <button
          className="profile-submit"
          type="button"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Checking..." : "I've Verified My Email"}
          {!loading && <span>→</span>}
        </button>

        <button
          className="verification-resend"
          type="button"
          onClick={handleSendVerification}
          disabled={loading}
        >
          Resend Verification Email
        </button>

        <button
          className="verification-login"
          type="button"
          onClick={onBackToLogin}
          disabled={loading}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}
