import { useState } from 'react';
import { Phone, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [activeTab, setActiveTab] = useState('phone');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // will connect backend register here
  };

  const handlePiRegister = () => {
    // will connect Pi SDK here next
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Register</h1>
        <p className="text-gray-500 text-center mb-6">Join Mingle today</p>

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

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="text" placeholder="Full name" className="w-full pl-10 pr-4 py-2 border rounded-lg" />
          </div>

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
            Sign Up
          </button>
        </form>

        <button
          onClick={handlePiRegister}
          className="w-full mt-4 border border-purple-500 text-purple-500 py-3 rounded-lg font-semibold"
        >
          Register with Pi
        </button>
      </div>
    </div>
  );
};

export default Register;
