import { useState } from 'react';
import { Eye, EyeOff, Mail, Phone, Lock } from 'lucide-react';

export default function Login() {
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ phone: '', email: '', password: '' });

  const handlePiLogin = async () => {
    // TODO: We will connect Pi SDK here next
    alert('Pi Login coming next! First let\'s make UI perfect');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6B46C1] via-[#805AD5] to-[#D4AF37] flex items-center justify-center p-4">
      
      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border-white/20 p-8 animate-fadeIn">
        
        {/* Logo + Tagline */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#D4AF37] to-[#F59E0B] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-white">M</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Mingle</h1>
          <p className="text-white/80 text-sm">Where People Don't Just Connect... They Belong</p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white/10 rounded-2xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('phone')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'phone' ? 'bg-white text-[#6B46C1] shadow-lg' : 'text-white/70'
            }`}
          >
            <Phone size={18} /> Phone
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'email' ? 'bg-white text-[#6B46C1] shadow-lg' : 'text-white/70'
            }`}
          >
            <Mail size={18} /> Email
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {activeTab === 'phone' ? (
            <div className="flex gap-2">
              <div className="w-24 bg-white/10 border-white/20 rounded-xl px-3 py-3 text-white font-semibold">
                +234
              </div>
              <input
                type="tel"
                placeholder="801 234 5678"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 outline-none focus:border-[#D4AF37]"
              />
            </div>
          ) : (
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-white/60" size={20} />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/10 border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 outline-none focus:border-[#D4AF37]"
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-white/60" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full bg-white/10 border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/50 outline-none focus:border-[#D4AF37]"
            />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-white/60">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-right">
            <a href="/forgot" className="text-sm text-[#D4AF37] hover:underline">Forgot Password?</a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-white text-[#6B46C1] font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg">
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 text-sm">OR</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Pi Button - WORLD CLASS */}
          <button 
            onClick={handlePiLogin}
            className="w-full bg-gradient-to-r from-[#F59E0B] to-[#D4AF37] text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-all shadow-2xl flex items-center justify-center gap-3"
          >
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-[#F59E0B] font-bold">π</span>
            </div>
            Continue with Pi
          </button>
        </div>

        <p className="text-center text-white/70 text-sm mt-6">
          Don't have an account? <a href="/register" className="text-[#D4AF37] font-semibold hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
