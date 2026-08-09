
import { useState } from "react";
import Auth from "./Auth";

/*
=========================================================
  MINGLE — APPLICATION ROOT
=========================================================

  IMPORTANT ARCHITECTURE

  Mingle is ONE social platform.

  Authentication methods:
    • Pi authentication
    • Normal Mingle account

  Both methods eventually produce:
    → ONE Mingle session
    → ONE Mingle social experience

  Pi World is NOT a separate application.
  It is a feature inside Mingle.
=========================================================
*/

export type MingleAuthMethod = "pi" | "email";

export interface MingleUser {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  avatar?: string;

  /*
   * How the user entered Mingle.
   * This does NOT determine which social platform
   * they can access.
   */
  authMethod: MingleAuthMethod;

  /*
   * Optional Pi information.
   * Only users who authenticated through Pi,
   * or users who later connect their Pi identity,
   * may have this information.
   */
  piProfile?: {
    username?: string;
    badge?: string;
    status?: string;
  };
}

export interface MingleSession {
  user: MingleUser;
  authenticated: boolean;
}

function MingleApp({
  session,
  onLogout,
}: {
  session: MingleSession;
  onLogout: () => void;
}) {
  return (
    <div className="mingle-app">
      {/* 
        TEMPORARY HOME SHELL

        We will replace this with the real Mingle
        navigation and screens after Empire/Auth
        are fully connected.
      */}

      <header className="mingle-header">
        <div className="mingle-brand">
          <strong>MINGLE</strong>
        </div>

        <div className="mingle-user">
          <span>
            Welcome{session.user.name ? `, ${session.user.name}` : ""}
          </span>

          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="mingle-main">
        <h1>Welcome to Mingle</h1>

        <p>
          Connect. Share. Grow. Where People Don’t Just Connect…
          They Belong.
        </p>

        {session.user.authMethod === "pi" && (
          <div className="pi-member-indicator">
            🟣 Pi Member
          </div>
        )}

        <nav className="mingle-navigation">
          <button type="button">Home</button>
          <button type="button">Profile</button>
          <button type="button">Friends</button>
          <button type="button">Messenger</button>
          <button type="button">Groups</button>
          <button type="button">Marketplace</button>
          <button type="button">Notifications</button>
          <button type="button">Search</button>
          <button type="button">Menu</button>
        </nav>
      </main>
    </div>
  );
}

function App() {
  const [session, setSession] = useState<MingleSession | null>(null);

  /*
   * This function is the central bridge between
   * authentication and Mingle.
   *
   * Whether Auth eventually receives:
   *
   *   • Pi authentication
   *   • Email authentication
   *
   * both must call this function with a MingleUser.
   */
  const handleLogin = (user: MingleUser) => {
    setSession({
      user,
      authenticated: true,
    });
  };

  const handleLogout = () => {
    setSession(null);
  };

  /*
   * No authenticated Mingle session?
   *
   * Show the authentication gateway.
   */
  if (!session?.authenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  /*
   * Authenticated users enter Mingle itself.
   *
   * Pi users and normal Mingle users arrive here
   * together.
   */
  return (
    <MingleApp
      session={session}
      onLogout={handleLogout}
    />
  );
}

export default App;
