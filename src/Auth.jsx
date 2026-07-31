import React, { useState } from 'react';
import './Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isLogin){
      alert(`Login: ${form.email}`) // Later we connect to backend
    } else {
      alert(`Register: ${form.name} - ${form.email}`) // Later we connect to backend
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo-wrapper">
          <div className="logo-circle">M</div>
          <div className="auth-logo">
            <h1>MINGLE</h1>
            <p>Where People Don't Just Connect... They Belong.</p>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

          {!isLogin && (
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            </div>
          )}

          <div className="input-group">
            <span className="input-icon">✉️</span>
            <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            <span className="eye-icon">👁️</span>
          </div>

          {isLogin && (
            <div className="form-options">
              <label><input type="checkbox" /> Remember Me</label>
              <a href="#">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="btn-login">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          <button type="button" className="btn-pi">
            <span className="pi-icon">π</span> Continue with Pi
          </button>

          <button type="button" className="btn-fingerprint">
            <span>👆</span> Fingerprint Login
          </button>

          <p className="switch-auth">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? ' Create Account' : ' Login'}
            </span>
          </p>
        </form>

        <div className="footer-links">
          <a href="#">Support</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Language</a>
        </div>
      </div>
    </div>
  )
}

