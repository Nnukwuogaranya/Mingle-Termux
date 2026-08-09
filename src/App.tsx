import { useState } from "react";
import Auth from "./Auth";
import Empire from "./Empire";

type Screen = "empire" | "auth" | "pi";

function App() {
  const [screen, setScreen] = useState<Screen>("empire");

  if (screen === "auth") {
    return <Auth />;
  }

  if (screen === "pi") {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050814",
          color: "#fff",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <h1 style={{ color: "#FFD54A" }}>
            Pi World
          </h1>

          <p>
            Pi World will be connected here next.
          </p>

          <button
            type="button"
            onClick={() => setScreen("empire")}
            style={{
              marginTop: "20px",
              padding: "12px 24px",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Back to Empire
          </button>
        </div>
      </div>
    );
  }

  return (
    <Empire
      onMingle={() => setScreen("auth")}
      onPi={() => setScreen("pi")}
    />
  );
}

export default App;
