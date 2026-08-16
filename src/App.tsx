import React from "react";
import Auth, { type MingleUser } from "./Auth";
import Entrance from "./Entrance";
import CreateProfile from "./CreateProfile";
import EmailVerification from "./EmailVerification";
import MingleHome from "./MingleHome";
import WelcomeBuzzer from "./WelcomeBuzzer";
import { auth } from "./firebase";
import "./mingle.css";

type AppStage =
  | "entrance"
  | "auth"
  | "profile"
  | "verification"
  | "welcome"
  | "home";

const welcomeKey = (uid: string) =>
  `mingle_welcome_completed_${uid}`;

export default function App() {
  const [stage, setStage] =
    React.useState<AppStage>("entrance");

  const [user, setUser] =
    React.useState<MingleUser | null>(null);

  /*
   * ========================================================
   * PORTAL → LOGIN
   * ========================================================
   */
  const handlePortalLogin = () => {
    setStage("auth");
  };

  /*
   * ========================================================
   * PI LOGIN
   * ========================================================
   *
   * Real Pi SDK authentication will be connected here.
   */
  const handlePiLogin = () => {
    console.log("Pi Login selected");
  };

  /*
   * ========================================================
   * LOGIN
   * ========================================================
   *
   * Firebase authentication has already happened inside Auth.
   * Here we decide where the verified user goes next.
   */
  const handleLogin = (mingleUser: MingleUser) => {
    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
      return;
    }

    /*
     * Email verification is mandatory for normal Mingle accounts.
     */
    if (!firebaseUser.emailVerified) {
      setUser(mingleUser);
      setStage("verification");
      return;
    }

    setUser(mingleUser);

    /*
     * First verified login:
     * trigger the one-time Mingle welcome buzzer.
     */
    const completed = localStorage.getItem(
      welcomeKey(firebaseUser.uid)
    );

    if (completed !== "true") {
      setStage("welcome");
      return;
    }

    /*
     * Returning verified user:
     * straight to Mingle.
     */
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
   * EMAIL VERIFIED → LOGIN
   * ========================================================
   */
  const handleEmailVerified = () => {
    setStage("auth");
  };

  /*
   * ========================================================
   * GOLDEN BUZZER COMPLETE
   * ========================================================
   */
  const handleWelcomeComplete = () => {
    const firebaseUser = auth.currentUser;

    if (firebaseUser) {
      localStorage.setItem(
        welcomeKey(firebaseUser.uid),
        "true"
      );
    }

    setStage("home");
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
   * 1. ENTRANCE
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
   * 5. ONE-TIME GOLDEN BUZZER
   * ========================================================
   */
  if (stage === "welcome") {
    return (
      <WelcomeBuzzer
        onComplete={handleWelcomeComplete}
      />
    );
  }

  /*
   * ========================================================
   * 6. MINGLE HOME
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
