import { useState } from "react";
import Empire from "./Empire";
import Auth from "./Auth";

function App() {
  const [world, setWorld] = useState<"empire" | "mingle" | "pi">("empire");

  if (world === "mingle") {
    return <Auth />;
  }

  if (world === "pi") {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          background:
            "radial-gradient(circle at 50% 20%, #5b21b6, #180b35 55%, #050814)",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "430px",
            padding: "40px 28px",
            borderRadius: "28px",
            background: "rgba(255,255,255,.10)",
            border: "1px solid rgba(255,255,255,.18)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 30px 80px rgba(0,0,0,.45)",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>π</div>

          <h1 style={{ margin: 0, fontSize: "32px" }}>
            Pi World
          </h1>

          <p style={{ opacity: 0.75, lineHeight: 1.6 }}>
            Your dedicated Mingle experience for the Pi community is
            being prepared.
          </p>

          <button
            onClick={() => setWorld("empire")}
            style={{
              width: "100%",
              marginTop: "24px",
              height: "52px",
              border: 0,
              borderRadius: "15px",
              background: "linear-gradient(135deg,#7c3aed,#a855f7)",
              color: "#fff",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            ← Back to Mingle Empire
          </button>
        </div>
      </div>
    );
  }

  return (
    <Empire
      onEnterMingle={() => setWorld("mingle")}
      onEnterPi={() => setWorld("pi")}
    />
  );
}

export default App;
