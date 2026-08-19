import React, { useState } from "react";
import type { MingleUser } from "./Auth";
import { FaEnvelope } from "react-icons/fa";
import {
  sendEmailVerification,
  reload,
} from "firebase/auth";
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

  /*
   * ========================================================
   * SEND VERIFICATION EMAIL
   * ========================================================
   */

  const handleSendVerification = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setError(
          "Your registration session has expired. Please login again."
        );
        return;
      }

      if (currentUser.emailVerified) {
        setMessage(
          "Your email is already verified. You can continue."
        );
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

  /*
   * ========================================================
   * CHECK VERIFICATION
   * ========================================================
   */

  const handleContinue = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        setError(
          "Your session has expired. Please login again."
        );
        return;
      }

      /*
       * Reload Firebase so we get the latest
       * emailVerified status.
       */

      await reload(currentUser);

      if (!currentUser.emailVerified) {
        setError(
          "Your email has not been verified yet. Please check your inbox and click the verification link."
        );
        return;
      }

      /*
       * Verification is complete.
       */

      localStorage.setItem(
        "mingle_email_verified",
        "true"
      );

      localStorage.removeItem(
        "mingle_verification_pending"
      );

      setMessage(
        "Email verified successfully. Please login to continue."
      );

      /*
       * Give the success message a moment to appear
       * before returning to the login screen.
       */

      setTimeout(() => {
        onVerified();
      }, 900);

    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to verify your email."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ========================================================
   * UI
   * ========================================================
   */

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-logo">
          <FaEnvelope />
        </div>

        <h1>
          VERIFY YOUR EMAIL
        </h1>

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
          {loading
            ? "CHECKING..."
            : "I'VE VERIFIED MY EMAIL"}

          {!loading && (
            <span>→</span>
          )}
        </button>

        <button
          className="verification-resend"
          type="button"
          onClick={handleSendVerification}
          disabled={loading}
        >
          RESEND VERIFICATION EMAIL
        </button>

        <button
          className="verification-login"
          type="button"
          onClick={onBackToLogin}
          disabled={loading}
        >
          BACK TO LOGIN
        </button>

        <div className="auth-footer">
          MINGLE • WHERE PEOPLE BELONG
        </div>

      </div>
    </div>
  );
}
