import React from "react";
import Auth, { type MingleUser } from "./Auth";
import Entrance from "./Entrance";
import CreateProfile from "./CreateProfile";
import EmailVerification from "./EmailVerification";
import WelcomeBuzzer from "./WelcomeBuzzer";
import MingleHome from "./MingleHome";
import PiTestPayment from "./PiTestPayment";
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

  const piInitPromiseRef =
    React.useRef<Promise<void> | null>(null);

  /*
   * INITIALIZE PI SDK
   *
   * The SDK must be initialized before
   * Pi.authenticate() is called.
   */

  React.useEffect(() => {
    let cancelled = false;

    const initializePi = async () => {
      try {
        /*
         * If the SDK is already available, initialize it.
         */
        if (window.Pi) {
          await window.Pi.init({
            version: "2.0",
          });

          if (!cancelled) {
            console.log("Pi SDK initialized.");
          }

          return;
        }

        /*
         * Check whether the SDK script is already loading.
         */
        let script =
          document.querySelector<HTMLScriptElement>(
            'script[src="https://sdk.minepi.com/pi-sdk.js"]'
          );

        /*
         * If the script does not exist, create it.
         */
        if (!script) {
          script = document.createElement("script");

          script.src =
            "https://sdk.minepi.com/pi-sdk.js";

          script.async = true;

          document.head.appendChild(script);
        }

        /*
         * Wait until the SDK becomes available.
         */
        await new Promise<void>(
          (resolve, reject) => {
            if (window.Pi) {
              resolve();
              return;
            }

            const timeout =
              window.setTimeout(() => {
                reject(
                  new Error(
                    "Pi SDK did not become available."
                  )
                );
              }, 15000);

            const checkPi =
              window.setInterval(() => {
                if (window.Pi) {
                  window.clearInterval(checkPi);
                  window.clearTimeout(timeout);
                  resolve();
                }
              }, 100);

            script?.addEventListener(
              "error",
              () => {
                window.clearInterval(checkPi);
                window.clearTimeout(timeout);

                reject(
                  new Error(
                    "Unable to load Pi SDK."
                  )
                );
              },
              { once: true }
            );
          }
        );

        const pi = window.Pi as PiSDK | undefined;

        if (!pi) {
          throw new Error(
            "Pi SDK is unavailable."
          );
        }

        await pi.init({
          version: "2.0",
        });

        if (!cancelled) {
          console.log(
            "Pi SDK initialized successfully."
          );
        }
      } catch (error) {
        console.error(
          "Pi SDK initialization failed:",
          error
        );
      }
    };

    piInitPromiseRef.current =
      initializePi();

    return () => {
      cancelled = true;
    };
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

      if (!piInitPromiseRef.current) {
      } else {
        await piInitPromiseRef.current;
      }

      const pi = window.Pi;

      if (!pi) {
        throw new Error(
          "Pi SDK is not available. Please open Mingle in Pi Browser."
        );
      }


      let auth: PiAuthResult;

      try {
        auth = await pi.authenticate(
          ["username"],
          (payment: unknown) => {
            console.log(
              "Incomplete Pi payment:",
              payment
            );
          }
        );
      } catch (authError) {
        console.error(
          "Pi.authenticate() ERROR:",
          authError
        );

        const details =
          authError instanceof Error
            ? `${authError.name}: ${authError.message}`
            : JSON.stringify(authError);

        alert(
          `Pi.authenticate() failed:\n\n${details}`
        );

        throw authError;
      }


      console.log(
        "Pi authentication successful:",
        auth
      );

      const accessToken = auth.accessToken;

      if (!accessToken) {
        throw new Error(
          "Pi authentication returned no access token."
        );
      }


      const verificationResponse =
        await fetch("/api/pi/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken,
          }),
        });

      const verification =
        await verificationResponse.json();

      if (
        !verificationResponse.ok ||
        !verification.success ||
        !verification.user
      ) {
        throw new Error(
          verification.error ||
            "Pi identity verification failed."
        );
      }

      const piUser = verification.user;

      const mingleUser: MingleUser = {
        id:
          piUser.uid ||
          `pi-${Date.now()}`,

        name:
          piUser.username ||
          "Pi Pioneer",

        username:
          piUser.username ||
          "",

        email: "",

        authMethod: "pi",

        piProfile: {
          uid: piUser.uid,
          username: piUser.username,
        },
      };

      setUser(mingleUser);
      setStage("home");

    } catch (error) {
      console.error(
        "Pi authentication failed:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : String(error);

      alert(
        `Pi authentication failed: ${message}`
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

  if (
    stage === "verification" &&
    user
  ) {
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
      <>
        <MingleHome
          user={user}
          onLogout={handleLogout}
        />

        <PiTestPayment />
      </>
    );
  }

  return null;
}
