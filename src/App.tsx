import React from "react";
import Auth, { type MingleUser } from "./Auth";
import Entrance from "./Entrance";
import CreateProfile from "./CreateProfile";
import EmailVerification from "./EmailVerification";
import WelcomeBuzzer from "./WelcomeBuzzer";
import MingleHome from "./MingleHome";
import "./mingle.css";

type AppStage =
  | "entrance"
  | "auth"
  | "profile"
  | "verification"
  | "buzzer"
  | "home";

interface PiUser {
  uid?: string;
  username?: string;
}

interface PiAuthResult {
  user?: PiUser;
  accessToken?: string;
}

interface PiSDK {
  init: (options: { version: string }) => Promise<void> | void;

  authenticate: (
    scopes: string[],
    onIncompletePaymentFound?: (payment: unknown) => void
  ) => Promise<PiAuthResult>;
}

declare global {
  interface Window {
    Pi?: PiSDK;
  }
}

export default function App() {
  const [stage, setStage] =
    React.useState<AppStage>("entrance");

  const [user, setUser] =
    React.useState<MingleUser | null>(null);

  /*
   * LOAD PI SDK
   *
   * The Pi SDK is loaded automatically.
   * Nothing needs to be added manually to index.html.
   */

  React.useEffect(() => {
    const existingScript =
      document.querySelector(
        'script[src="https://sdk.minepi.com/pi-sdk.js"]'
      );

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");

    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;

    script.onload = () => {
      try {
        if (window.Pi) {
          window.Pi.init({
            version: "2.0",
          });

          console.log("Pi SDK initialized.");
        }
      } catch (error) {
        console.error(
          "Pi SDK initialization failed:",
          error
        );
      }
    };

    script.onerror = () => {
      console.error(
        "Unable to load Pi SDK."
      );
    };

    document.head.appendChild(script);
  }, []);

  /*
   * GOLD MINGLE GATE
   *
   * RIGHT SIDE OF ENTRANCE
   *
   * Goes directly to normal Mingle
   * login / registration.
   */

  const handlePortalLogin = () => {
    setStage("auth");
  };

  /*
   * PURPLE PI GATE
   *
   * LEFT SIDE OF ENTRANCE
   *
   * Uses the real Pi SDK.
   */

  const handlePiLogin = async () => {
    try {
      if (!window.Pi) {
        alert(
          "Pi Login is available through Pi Browser. Please open Mingle in Pi Browser and try again."
        );

        return;
      }

      const auth =
        await window.Pi.authenticate(
          ["username"],
          (payment: unknown) => {
            console.log(
              "Incomplete Pi payment:",
              payment
            );
          }
        );

      console.log(
        "Pi authentication successful:",
        auth
      );

      const piUser = auth.user;

      if (!piUser) {
        throw new Error(
          "Pi authentication returned no user."
        );
      }

      /*
       * Pi is only an entrance into Mingle.
       * The authenticated person becomes
       * a normal Mingle user.
       */

      const mingleUser = {
        name:
          piUser.username ||
          "Pi Pioneer",

        username:
          piUser.username ||
          "",

        email: "",

        authMethod: "pi",

        piProfile: piUser,
      } as MingleUser;

      setUser(mingleUser);

      setStage("home");

    } catch (error) {
      console.error(
        "Pi authentication failed:",
        error
      );

      alert(
        "Pi authentication was not completed. Please try again."
      );
    }
  };

  /*
   * EXISTING USER LOGIN
   */

  const handleLogin = (
    mingleUser: MingleUser
  ) => {
    setUser(mingleUser);
    setStage("home");
  };

  /*
   * NEW USER REGISTRATION
   */

  const handleRegister = (
    mingleUser: MingleUser
  ) => {
    setUser(mingleUser);

    localStorage.setItem(
      "mingle_profile_pending",
      "true"
    );

    setStage("profile");
  };

  /*
   * PROFILE COMPLETE
   */

  const handleProfileComplete = (
    mingleUser: MingleUser
  ) => {
    setUser(mingleUser);

    localStorage.removeItem(
      "mingle_profile_pending"
    );

    localStorage.setItem(
      "mingle_verification_pending",
      "true"
    );

    setStage("verification");
  };

  /*
   * EMAIL VERIFIED
   */

  const handleEmailVerified = () => {
    setStage("auth");
  };

  /*
   * FIRST LOGIN AFTER REGISTRATION
   */

  const handleFirstLogin = (
    mingleUser: MingleUser
  ) => {
    setUser(mingleUser);

    localStorage.removeItem(
      "mingle_profile_pending"
    );

    localStorage.removeItem(
      "mingle_verification_pending"
    );

    localStorage.setItem(
      "mingle_welcome_seen",
      "true"
    );

    setStage("buzzer");
  };

  /*
   * GOLDEN BUZZER COMPLETE
   */

  const handleBuzzerComplete = () => {
    setStage("home");
  };

  /*
   * LOGOUT
   */

  const handleLogout = () => {
    setUser(null);
    setStage("entrance");
  };

  /*
   * =======================================================
   * MINGLE ENTRANCE
   * =======================================================
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
   * =======================================================
   * MINGLE LOGIN / REGISTER
   * =======================================================
   */

  if (stage === "auth") {
    return (
      <Auth
        onLogin={handleLogin}
        onRegister={handleRegister}
        onFirstLogin={handleFirstLogin}
      />
    );
  }

  /*
   * =======================================================
   * CREATE PROFILE
   * =======================================================
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
   * =======================================================
   * EMAIL VERIFICATION
   * =======================================================
   */

  if (stage === "verification" && user) {
    return (
      <EmailVerification
        user={user}
        onVerified={handleEmailVerified}
        onBackToLogin={() =>
          setStage("auth")
        }
      />
    );
  }

  /*
   * =======================================================
   * PREMIUM WELCOME / GOLDEN BUZZER
   * =======================================================
   */

  if (stage === "buzzer" && user) {
    return (
      <WelcomeBuzzer
        userName={
          user.name ||
          user.username ||
          "Mingle User"
        }
        onComplete={handleBuzzerComplete}
      />
    );
  }

  /*
   * =======================================================
   * MINGLE HOME
   * =======================================================
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
