'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const handleSignup = async () => {
    setMsg('Signing up...')
    const { error } = await supabase.auth.signUp({ email, password })
    if(error) setMsg(error.message)
    else setMsg('Success! Check your email to confirm.')
  }

  const handleLogin = async () => {
    setMsg('Logging in...')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if(error) setMsg(error.message)
    else setMsg('Logged in successfully!')
  }

  return (
    <div style={{padding: '30px', maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif'}}>
      <h1 style={{textAlign: 'center'}}>Mingle 🔥</h1>
      
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={e => setEmail(e.target.value)} 
        style={{width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ccc'}} 
      />
      
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={e => setPassword(e.target.value)} 
        style={{width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc'}} 
      />
      
      <div style={{display: 'flex', gap: '10px'}}>
        <button onClick={handleLogin} style={{flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: 'black', color: 'white'}}>Login</button>
        <button onClick={handleSignup} style={{flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#6366f1', color: 'white'}}>Sign Up</button>
      </div>
      
      <p style={{textAlign: 'center', marginTop: '20px', color: '#666'}}>{msg}</p>
    </div>
  )
}
