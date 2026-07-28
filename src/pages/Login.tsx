import { useState } from "react";
import { Eye, EyeOff, Mail, Phone, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ phone: '', email: '', password: '' });
  const navigate = useNavigate();

  const handlePiLogin = async () => {
    // TODO: We will connect Pi SDK here next
    alert('Pi Login coming next! First let\'s make UI work');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect backend login here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-6">Login to your account</p>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button 
            onClick={() => setActiveTab('phone')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md ${activeTab === 'phone' ? 'bg-white shadow' : ''}`}
          >
            <Phone size={18} /> Phone
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md ${activeTab === 'email' ? 'bg-white shadow' : ''}`}
          >
            <Mail size={18} /> Email
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'phone' ? (
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="tel" placeholder="Phone number" className="w-full pl-10 pr-4 py-2 border rounded-lg" />
            </div>
          ) : (
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input type="email" placeholder="Email address" className="w-full pl-10 pr-4 py-2 border rounded-lg" />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="w-full pl-10 pr-10 py-2 border rounded-lg" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold">
            Login
          </button>
        </form>

        <button 
          onClick={handlePiLogin}
          className="w-full mt-4 border-purple-500 text-purple-500 py-3 rounded-lg font-semibold"
        >
          Login with Pi
        </button>

        <p className="text-center mt-6 text-sm">
          Don't have an account? <Link to="/register" className="text-pink-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
