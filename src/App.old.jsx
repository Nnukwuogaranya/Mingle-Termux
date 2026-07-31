import { useState } from 'react'

const colors = {
  purple: '#5b2ca0',
  gold: '#FFD700'
}

export default function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ email: '', password: '', username: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      console.log('Login:', form)
    } else {
      console.log('Signup:', form)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${colors.purple}, #4c1d95)`,
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px',
        padding: '32px'
      }}>
        
        <h1 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: colors.purple, marginBottom: '8px' }}>Mingle</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '24px' }}>
          {isLogin ? 'Welcome back' : 'Create your account'}
        </p>

        <form onSubmit={handleSubmit}>
          
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '8px' }}
              value={form.username}
              onChange={(e) => setForm({...form, username: e.target.value})}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '8px' }}
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            required
          />

          <input
            type="password"
            placeholder="Password"
            style={{ width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '8px' }}
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            required
          />

          <button
            type="submit"
            style={{ width: '100%', background: colors.purple, color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#666' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: colors.purple, fontWeight: 'bold', marginLeft: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

        {/* LEGAL FOOTER - YOUR EMAILS */}
        <div style={{ textAlign: "center", fontSize: "12px", color: "rgba(0,0,0,0.6)", marginTop: "15px" }}>
          <p>
            <a href="mailto:mingle.1.legal@gmail.com" style={{ color: colors.gold }}>Legal</a> | 
            <a href="mailto:mingle.1.privacy@gmail.com" style={{ color: colors.gold }}> Privacy</a> | 
            <a href="mailto:mingle.1.support@gmail.com" style={{ color: colors.gold }}> Support</a> | 
            <a href="mailto:mingle.app.pi@gmail.com" style={{ color: colors.gold }}> Pi</a>
          </p>
          <p style={{ fontSize: "11px" }}>© 2026 Mingle — Where People Don't Just Connect... They Belong.</p>
        </div>

      </div>
    </div>
  )
}
