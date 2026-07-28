export default function Login() {
  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white'}}>
      <div style={{textAlign: 'center'}}>
        <div style={{
          width: '100px', 
          height: '100px', 
          background: 'linear-gradient(135deg, #0a1f44, #ec4899, #FFD700)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <span style={{color: 'white', fontSize: '48px', fontWeight: '900'}}>M</span>
        </div>
        <h1 style={{fontSize: '32px', fontWeight: 'bold', color: '#0a1f44'}}>Mingle</h1>
        <p style={{color: 'gray'}}>Connect. Chat. Pi.</p>
        <input placeholder="Email" style={{width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', marginTop: '16px'}} />
        <input type="password" placeholder="Password" style={{width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', marginTop: '8px'}} />
        <button style={{width: '100%', padding: '12px', background: '#0a1f44', color: 'white', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold'}}>Login</button>
      </div>
    </div>
  );
}
