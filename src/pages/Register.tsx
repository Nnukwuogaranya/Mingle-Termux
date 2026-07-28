import { Eye, EyeOff, Mail, Phone, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [activeTab, setActiveTab] = useState<'phone' | 'email'>('phone');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6B46C1] via-[#805AD5] to-[#D4AF37] flex items-center justify-center p-4">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border-white/20 p-8">
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#D4AF37] to-[#F59E0B] rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-white">M</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join Mingle</h1>
          <p className="text-white/80 text-sm">Where People Don't Just Connect... They Belong</p>
        </div>

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

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-white/60" size={20} />
            <input type="text" placeholder="Full Name" className="w-full bg-white/10 border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 outline-none focus:border-[#D4AF37]" />
          </div>

          {activeTab === 'phone' ? (
            <div className="flex gap-2">
              <div className="w-24 bg-white/10 border-white/20 rounded-xl px-3 py-3 text-white font-semibold">+234</div>
              <input type="tel" placeholder="801 234 5678" className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 outline-none focus:border-[#D4AF37]" />
            </div>
          ) : (
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-white/60" size={20} />
              <input type="email" placeholder="your@email.com" className="w-full bg-white/10 border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/50 outline-none focus:border-[#D4AF37]" />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-white/60" size={20} />
            <input type={showPassword ? 'text' : 'password'} placeholder="Create Password" className="w-full bg-white/10 border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/50 outline-none focus:border-[#D4AF37]" />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-white/60">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="w-full bg-white text-[#6B46C1] font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg">
            Create Account
          </button>
        </div>

        <p className="text-center text-white/70 text-sm mt-6">
          Already have an account? <Link to="/login" className="text-[#D4AF37] font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
