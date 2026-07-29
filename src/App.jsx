import { supabase } from './supabaseClient'
import { useState, useEffect } from 'react'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    setMsg(error ? error.message : 'Account created! Check email to confirm')
  }

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMsg(error.message)
    else { setUser(data.user); setMsg('Logged in!') }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMsg('Logged out')
  }

  return (
    <div style={{padding:20, maxWidth:400}}>
      <h1>Mingle 🔥</h1>
      
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={signOut}>Logout</button>
        </div>
      ) : (
        <div>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <br/><br/>
          <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
          <br/><br/>
          <button onClick={signUp}>Register</button>
          <button onClick={signIn} style={{marginLeft:10}}>Login</button>
          <p>{msg}</p>
        </div>
      )}
    </div>
  )
}
