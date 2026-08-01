import { useState } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { supabase } from '../supabaseClient';
import '../portfolio.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let result;
      if (isLogin) {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }
      
      if (result.error) throw result.error;
      alert(isLogin ? 'Login Successful! 👑' : 'Account Created! 👑');
      setEmail('');
      setPassword('');
    } catch (err) {
      alert("ERROR: " + err.message) // <-- THIS WILL SHOW THE PROBLEM
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-wrap">
          <div className="logo-circle"><span className="logo-m">M</span></div>
          <h1 className="app-title">MINGLE</h1>
          <p className="tagline">Where People Don't Just Connect... They Belong.</p>
        </div>

        <div className="auth-tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <div className="password-box">
              <FiMail style={{position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', color:'#FFD54A'}} />
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-box">
              <FiLock style={{position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', color:'#FFD54A'}} />
              <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          {error && <p style={{color:'#ff6b6b', fontSize:'13px', marginBottom:'12px'}}>{error}</p>}

          <button type="submit" className={`login-btn ${loading ? 'loading' : ''}`} disabled={loading}>
            {loading ? 'Creating...' : (isLogin ? 'Login' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
