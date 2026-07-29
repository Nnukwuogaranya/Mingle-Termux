import { supabase } from './supabaseClient'
import { useState } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    setMsg(error ? error.message : 'Account created! Check email')
  }

  return (
    <div style={{padding:20}}>
      <h1>Mingle 🔥</h1>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <br/>
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <br/>
      <button onClick={signUp}>Sign Up</button>
      <p>{msg}</p>
    </div>
  )
}
