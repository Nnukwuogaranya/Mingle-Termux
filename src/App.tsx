import React from "react";
import Auth, { type MingleUser } from "./Auth";
import Entrance from "./Entrance";
import CreateProfile from "./CreateProfile";
import EmailVerification from "./EmailVerification";
import MingleHome from "./MingleHome";
import "./mingle.css";

type AppStage =
  | "entrance"
  | "auth"
  | "profile"
  | "verification"
  | "home";

export default function App() {
  const [stage, setStage] = React.useState<AppStage>("entrance");
  const [user, setUser] = React.useState<MingleUser | null>(null);

  /*
   * ========================================================
   * PORTAL → NORMAL LOGIN
   * ========================================================
   */
  const handlePortalLogin = () => {
    setStage("auth");
  };

  /*
   * ========================================================
   * PORTAL → PI LOGIN
   * ========================================================
   *
   * Pi authentication will be connected here.
   * For now, we keep the Pi gate separate from
   * the normal Mingle authentication flow.
   */
  const handlePiLogin = () => {
    console.log("Pi Login selected");
  };

  /*
   * ========================================================
   * EXISTING USER LOGIN
   * ========================================================
   */
  const handleLogin = (mingleUser: MingleUser) => {
    setUser(mingleUser);
    setStage("home");
  };

  /*
   * ========================================================
   * NEW USER REGISTRATION
   * ========================================================
   */
  const handleRegister = (mingleUser: MingleUser) => {
    setUser(mingleUser);
    setStage("profile");
  };

  /*
   * ========================================================
   * PROFILE COMPLETE
   * ========================================================
   */
  const handleProfileComplete = (mingleUser: MingleUser) => {
    setUser(mingleUser);
    setStage("verification");
  };

  /*
   * ========================================================
   * EMAIL VERIFIED
   * ========================================================
   *
   * After verification, send the user back to LOGIN.
   */
  const handleEmailVerified = () => {
    setStage("auth");
  };

  /*
   * ========================================================
   * LOGOUT
   * ========================================================
   */
  const handleLogout = () => {
    setUser(null);
    setStage("entrance");
  };

  /*
   * ========================================================
   * 1. ENTRANCE PORTAL
   * ========================================================
   */
  if (stage === "entrance") {
    return (
      <Entrance
        onLogin={handlePortalLogin}
        onPiLogin={handlePiLogin}
      />
    );
  }

  /*
   * ========================================================
   * 2. LOGIN / REGISTER
   * ========================================================
   */
  if (stage === "auth") {
    return (
      <Auth
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  /*
   * ========================================================
   * 3. CREATE PROFILE
   * ========================================================
   */
  if (stage === "profile" && user) {
    return (
      <CreateProfile
        user={user}
        onComplete={handleProfileComplete}
      />
    );
  }

  /*
   * ========================================================
   * 4. EMAIL VERIFICATION
   * ========================================================
   */
  if (stage === "verification" && user) {
    return (
      <EmailVerification
        user={user}
        onVerified={handleEmailVerified}
        onBackToLogin={() => setStage("auth")}
      />
    );
  }

  /*
   * ========================================================
   * 5. MINGLE HOME
   * ========================================================
   */
  if (stage === "home" && user) {
    return (
      <MingleHome
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}
