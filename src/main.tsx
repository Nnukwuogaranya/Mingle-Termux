
cat > src/App.tsx << 'EOF'
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/forgot" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
EOF
