import { useState } from "react";

const colors = {
  deep: "#0B001A",
  purple: "#6A0DAD", 
  gold: "#FFD700",
  white: "#FFFFFF"
}

// LIQUID GOLD GLITTER
const liquidGold = {
  background: `linear-gradient(90deg, #FFD700 0%, #FFF8DC 25%, #FFD700 50%, #B8860B 75%, #FFD700 100%)`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundSize: "300% 100%",
  animation: "liquid 4s linear infinite",
  filter: "drop-shadow(0 0 25px rgba(255,215,0,0.8))"
}

// FLOATING GLASS
const floatingGlass = {
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(25px)",
  WebkitBackdropFilter: "blur(25px)",
  border: "1.5px solid rgba(255, 215, 0, 0.3)",
  borderRadius: "28px",
  boxShadow: "0 0 40px rgba(106, 13, 173, 0.4), inset 0 0 20px rgba(255,215,0,0.1)"
}

const MingleLogo = () => (
  <div style={{ position: "relative", marginBottom: "20px" }}>
    <div style={{ 
      width: "100px", height: "100px", borderRadius: "50%", 
      background: `radial-gradient(circle, rgba(255,215,0,0.3), transparent)`,
      position: "absolute", top: "-10px", left: "-10px", filter: "blur(15px)"
    }}></div>
    <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: "relative", filter: "drop-shadow(0 0 20px rgba(255,215,0,0.9))" }}>
      <defs>
        <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FFF8DC" }} />
          <stop offset="50%" style={{ stopColor: "#FFD700" }} />
          <stop offset="100%" style={{ stopColor: "#B8860B" }} />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="38" fill="none" stroke="url(#liquidGradient)" strokeWidth="3"/>
      <text x="40" y="52" textAnchor="middle" fill="url(#liquidGradient)" fontSize="28" fontWeight="900">M</text>
    </svg>
  </div>
)

export default function MingleApp() {
  const [screen, setScreen] = useState("welcome");

  return (
    <div style={{ 
      background: `radial-gradient(ellipse at top, #1A0033, ${colors.deep})`, 
      minHeight: "100vh", 
      color: colors.white, 
      fontFamily: "sans-serif",
      overflow: "hidden"
    }}>
      <style>{`
        @keyframes liquid { 0% { background-position: 0% 50% } 100% { background-position: 300% 50% } }
        @keyframes float { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-10px) }
      `}</style>
      
      {screen === "welcome" && <WelcomeScreen onNext={() => setScreen("auth")} />}
      {screen === "auth" && <AuthScreen />}
    </div>
  );
}

function WelcomeScreen({ onNext }) {
  return (
    <div style={{ textAlign: "center", paddingTop: "120px", padding: "20px", animation: "float 4s ease-in-out infinite" }}>
      <MingleLogo />
      <h1 style={{ ...liquidGold, fontSize: "55px", margin: "0", letterSpacing: "3px" }}>MINGLE</h1>
      <p style={{ fontSize: "15px", marginBottom: "50px", color: "rgba(255,255,255,0.8)", fontWeight: "300" }}>
        Where People Don't Just Connect... <br/>They Belong.
      </p>
      <button 
        onClick={onNext}
        style={{ ...floatingGlass, background: `linear-gradient(135deg, rgba(255,215,0,0.2), rgba(184,134,11,0.2))`, color: colors.gold, padding: "18px 40px", fontSize: "17px", fontWeight: "900", width: "90%", letterSpacing: "1px" }}
      >
        ENTER CIVILIZATION
      </button>
    </div>
  );
}

function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if(!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("This will connect to database in Phase 2");
  }

  const inputStyle = {
    ...floatingGlass,
    width: "100%", 
    padding: "14px", 
    borderRadius: "16px", 
    background: "rgba(0,0,0,0.2)", 
    color: "white", 
    marginTop: "8px",
    border: "1px solid rgba(255,215,0,0.2)"
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <div style={{ ...floatingGlass, padding: "35px", width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center" }}><MingleLogo /></div>
        <h2 style={{ ...liquidGold, textAlign: "center", fontSize: "26px" }}>{isLogin ? "Welcome Back" : "Join the Civilization"}</h2>
        
        <button style={{ ...floatingGlass, width: "100%", background: `rgba(106,13,173,0.5)`, color: "white", padding: "15px", fontSize: "16px", marginBottom: "12px", fontWeight: "bold", border: "1px solid rgba(106,13,173,0.8)" }}>
          ⚡ Login with Pi
        </button>
        <button style={{ ...floatingGlass, width: "100%", background: "rgba(255,215,0,0.1)", color: colors.gold, padding: "15px", fontSize: "16px", marginBottom: "18px", fontWeight: "bold" }}>
          👆 Login with Fingerprint
        </button>

        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", margin: "12px 0" }}>───────── or ─────────</div>

        {error && <p style={{ color: "#ff6b6b", textAlign: "center", fontSize: "14px" }}>{error}</p>}

        <div style={{ marginBottom: "18px" }}>
          <label style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" style={inputStyle} />
        </div>
        
        <div style={{ marginBottom: "18px" }}>
          <label style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>Password</label>
          <div style={{ position: "relative" }}>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={inputStyle} />
            <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "20px", background: "none", border: "none", color: colors.gold, fontSize: "18px" }}>👁️</button>
          </div>
        </div>

        {!isLogin && (
          <div style={{ marginBottom: "25px" }}>
            <label style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px" }}>Confirm Password</label>
            <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" style={inputStyle} />
          </div>
        )}

        {isLogin && <p style={{ textAlign: "right", fontSize: "14px", color: colors.gold, marginBottom: "18px", fontWeight: "bold" }}>Forgot Password?</p>}

        <button onClick={handleSubmit} style={{ ...floatingGlass, width: "100%", background: `linear-gradient(135deg, rgba(255,215,0,0.3), rgba(184,134,11,0.3))`, color: colors.gold, padding: "16px", fontSize: "17px", fontWeight: "900", letterSpacing: "1px" }}>
          {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
        </button>

        <p style={{ textAlign: "center", marginTop: "25px", color: "rgba(255,255,255,0.8)" }}>
          {isLogin ? "New here?" : "Already have an account?"}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            style={{ background: "none", border: "none", color: colors.gold, marginLeft: "6px", fontWeight: "900" }}
          >
            {isLogin ? "Join Now" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
