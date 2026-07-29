'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSignup = async () => {
    setMsg('Creating account...')
    const { error } = await supabase.auth.signUp({ email, password })
    if(error) setMsg(error.message)
    else setMsg('Account created! Check email to confirm, then login.')
  }

  const handleLogin = async () => {
    setMsg('Logging in...')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if(error) setMsg(error.message)
    else setMsg('Welcome back!')
  }

  return (
    <div style={{padding: '30px', maxWidth: '400px', margin: '50px auto', textAlign: 'center', fontFamily: 'sans-serif'}}>
      <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', borderRadius: '20px', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '40px', fontWeight: 'bold'}}>M</div>
      <h1>Mingle</h1>
      <p style={{color: '#888', marginBottom: '20px'}}>Connect. Chat. Pi.</p>
      
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={e => setEmail(e.target.value)} 
        style={{width: '100%', padding: '14px', marginBottom: '10px', borderRadius: '10px', border: '1px solid #ddd'}} 
      />
      
      <div style={{position: 'relative'}}>
        <input 
          type={showPass ? "text" : "password"} 
          placeholder="Password" 
          value={password}
          onChange={e => setPassword(e.target.value)} 
          style={{width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd'}} 
        />
        <button onClick={() => setShowPass(!showPass)} style={{position: 'absolute', right: '10px', top: '12px', background: 'none', border: 'none', cursor: 'pointer'}}>👁️</button>
      </div>
      
      <button onClick={handleLogin} style={{width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: '#1e3a8a', color: 'white', fontWeight: 'bold', marginBottom: '10px'}}>Login</button>
      <button onClick={handleSignup} style={{width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: '#6366f1', color: 'white', fontWeight: 'bold'}}>Create Account</button>
      
      <p style={{marginTop: '20px', color: '#666'}}>{msg}</p>
    </div>
  )
}
