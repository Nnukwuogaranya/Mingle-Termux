import { useState, useEffect } from 'react'

export default function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [pressed, setPressed] = useState(null)
  const [showModal, setShowModal] = useState(null)
  const [isRegister, setIsRegister] = useState(false)
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
    setParticles(Array.from({ length: 15 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 2 + 1
    })))
  }, [])

  const buttonStyle = (id, gradient, shadow) => ({
    background: gradient,
    borderRadius: '16px',
    padding: '14px',
    marginBottom: '12px',
    textAlign: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: '15px',
    cursor: 'pointer',
    boxShadow: pressed === id? `0 3px 12px ${shadow}` : `0 10px 30px ${shadow}`,
    transform: pressed === id? 'translateY(3px) scale(0.98)' : 'translateY(0) scale(1)',
    filter: pressed === id? 'brightness(1.15)' : 'brightness(1)',
    transition: 'all 0.2s ease',
    opacity: loaded? 1 : 0,
    animation: loaded? `floatUp 0.6s ease-out ${id*0.1 + 0.4}s both` : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  })

  const TermsContent = {
    legal: `MINGLE LEGAL\n\nBy using Mingle, you agree to our community standards. We promote peace, respect, and positive civilization. Hate speech, violence, and spam are not allowed. Mingle reserves the right to moderate content to maintain a safe environment.`,
    privacy: `MINGLE PRIVACY POLICY\n\nWe protect your data like crystal. Your email and Pi data are encrypted. We never sell your information. You control what you share. Cookies are used only to improve your experience.`,
    support: `MINGLE SUPPORT\n\nNeed help? We are here for you.\n\nEmail: mingle.1.support@gmail.com\nResponse time: Within 24 hours\nFor Pi related issues: mingle.app.pi@gmail.com`,
    pi: `PI NETWORK\nLogin with Pi connects your Pi Wallet securely. Mingle is a Pi Network ecosystem app. Pi payments and Pi utilities will be available soon.`
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #FFFDFB 0%, #F5F0FF 40%, #FFF8F0 100%)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* MORNING LIGHT */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle at 50% 0%, rgba(255, 247, 230, 0.5) 0%, transparent 60%)',
        animation: 'rotate 20s linear infinite',
        zIndex: 0
      }}></div>

      {/* FLOATING DUST */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${p.left}%`,
          top: `${p.top}%`,
          width: `${p.size}px`,
          height: `${p.size}px`,
          background: '#FFE5B4',
          borderRadius: '50%',
          boxShadow: `0 0 ${p.size*4}px #FFE5B4`,
          animation: `driftUp ${8 + Math.random()*4}s ease-in-out infinite`,
          animationDelay: `${p.delay}s`,
          opacity: 0.4,
          zIndex: 0
        }}></div>
      ))}

      {/* GLASS MIST */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 100%)',
        backdropFilter: 'blur(50px)',
        zIndex: 0
      }}></div>

      {/* MAIN CARD - BRIGHTER */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(35px)',
        border: '1.5px solid rgba(255,255,255,0.9)',
        borderRadius: '28px',
        width: '100%',
        maxWidth: '390px',
        padding: '28px 22px',
        boxShadow: '0 25px 80px rgba(200, 180, 255, 0.25), inset 0 1px 3px rgba(255,255,255,0.95)',
        zIndex: 1,
        position: 'relative',
        opacity: loaded? 1 : 0,
        transform: loaded? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 1s ease-out 0.3s'
      }}>
        
        {/* ENGRAVED LOGO */}
        <div style={{
          width: '75px',
          height: '75px',
          borderRadius: '50%',
          margin: '0 auto 20px auto',
          background: 'linear-gradient(145deg, #F7E7CE, #FFF8E7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 50px rgba(247, 231, 206, 0.7), inset 0 2px 8px rgba(0,0,0,0.08)',
          position: 'relative',
          opacity: loaded? 1 : 0,
          animation: loaded? 'glowIn 1.2s ease-out 0.2s both' : 'none'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.9) 50%, transparent 70%)',
            animation: 'shine 3s ease-in-out infinite'
          }}></div>
          <span style={{ 
            fontSize: '34px', 
            fontWeight: '800', 
            background: 'linear-gradient(180deg, #C8A882 0%, #A68B5B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            fontFamily: 'serif',
            letterSpacing: '1px'
          }}>M</span>
        </div>

        {/* BUTTON 1: PI - BRIGHTER */}
        <div 
          onMouseDown={() => setPressed(1)} 
          onMouseUp={() => setPressed(null)}
          style={buttonStyle(1, 'linear-gradient(90deg, #D4B5FF, #E8CFFF)', 'rgba(212, 181, 255, 0.4)')}
        >
          <span style={{
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: '900',
            color: '#D4B5FF'
          }}>π</span>
          Login with Pi
        </div>

        {/* BUTTON 2: FINGERPRINT - BRIGHTER */}
        <div 
          onMouseDown={() => setPressed(2)} 
          onMouseUp={() => setPressed(null)}
          style={{
           ...buttonStyle(2, 'linear-gradient(90deg, #FFF0D9, #FFF8E7)', 'rgba(247, 231, 206, 0.4)'),
            border: '2px solid #F7E7CE',
            color: '#A68B5B',
            backdropFilter: 'blur(10px)'
          }}
        >👆 Login with Fingerprint</div>

        <div style={{ display: 'flex', alignItems: 'center', margin: '16px 0', color: 'rgba(0,0,0,0.25)' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
          <span style={{ padding: '0 12px', fontSize: '12px', fontWeight: '600', color: '#888', letterSpacing: '0.5px' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,0,0,0.1)' }}></div>
        </div>

        {/* EMAIL - BRIGHTER PINK */}
        <div style={{ marginBottom: '14px', opacity: loaded? 1 : 0, animation: loaded? 'floatUp 0.6s ease-out 0.7s both' : 'none' }}>
          <label style={{ color: '#A68B5B', fontSize: '12px', fontWeight: '700', marginLeft: '5px' }}>Email Address</label>
          <div style={{
            marginTop: '6px',
            background: 'rgba(255, 210, 230, 0.45)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 180, 210, 0.5)',
            borderRadius: '16px',
            padding: '13px 15px',
            boxShadow: '0 8px 25px rgba(255,180,210,0.2), inset 0 1px 2px rgba(255,255,255,0.9)'
          }}>
            <input type="email" placeholder="you@mingle.com" style={{ 
              width: '100%', 
              background: 'transparent',
              border: 'none', 
              color: '#444', 
              outline: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}/>
          </div>
        </div>

        {/* PASSWORD - BRIGHTER RED */}
        <div style={{ marginBottom: '10px', opacity: loaded? 1 : 0, animation: loaded? 'floatUp 0.6s ease-out 0.8s both' : 'none' }}>
          <label style={{ color: '#A68B5B', fontSize: '12px', fontWeight: '700', marginLeft: '5px' }}>Password</label>
          <div style={{
            marginTop: '6px',
            background: 'rgba(255, 200, 200, 0.45)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 160, 160, 0.5)',
            borderRadius: '16px',
            padding: '13px 45px 13px 15px',
            boxShadow: '0 8px 25px rgba(255,160,160,0.2), inset 0 1px 2px rgba(255,255,255,0.9)',
            position: 'relative'
          }}>
            <input type={showPassword? "text" : "password"} placeholder="••••" style={{ 
              width: '100%', 
              background: 'transparent',
              border: 'none', 
              color: '#444', 
              outline: 'none',
              fontSize: '14px',
              fontWeight: '600'
            }}/>
            <span onClick={() => setShowPassword(!showPassword)} style={{ 
              position: 'absolute', 
              right: '14px', 
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer', 
              fontSize: '16px',
              opacity: 0.7
            }}>👁️</span>
          </div>
        </div>

        <p style={{ textAlign: 'right', color: '#A68B5B', fontSize: '12px', marginBottom: '18px', fontWeight: '700', cursor: 'pointer' }}>Forgot Password?</p>

        {/* BUTTON 3: SIGN IN - BRIGHTER */}
        <div 
          onMouseDown={() => setPressed(3)} 
          onMouseUp={() => setPressed(null)}
          style={{
           ...buttonStyle(3, 'linear-gradient(90deg, #D4B5FF 0%, #F7E7CE 100%)', 'rgba(247, 231, 206, 0.5)'),
            fontSize: '16px',
            letterSpacing: '1.2px',
            animation: loaded? 'floatUp 0.6s ease-out 0.9s both' : 'none'
          }}
        >SIGN IN</div>

        <div style={{ textAlign: 'center', marginTop: '18px', color: '#888', fontSize: '14px', opacity: loaded? 1 : 0, animation: loaded? 'floatUp 0.6s ease-out 1s both' : 'none' }}>
          New here? 
          <span onClick={() => setIsRegister(!isRegister)} style={{ 
            background: 'linear-gradient(90deg, #D4B5FF, #F7E7CE)',
            color: 'white',
            padding: '7px 15px',
            borderRadius: '50px',
            fontWeight: '800',
            marginLeft: '6px',
            cursor: 'pointer',
            fontSize: '13px',
            boxShadow: '0 0 20px rgba(212,181,255,0.3)'
          }}>{isRegister? 'Sign In' : 'Join Now'}</span>
        </div>

        {/* FOOTER LINKS - CLICKABLE */}
        <div style={{ textAlign: "center", fontSize: "11px", color: "#AAA", marginTop: "20px", opacity: loaded? 1 : 0, animation: loaded? 'floatUp 0.6s ease-out 1.1s both' : 'none' }}>
          <span onClick={() => setShowModal('legal')} style={{ color: '#A68B5B', margin: '0 4px', cursor: 'pointer', fontWeight: '600' }}>Legal</span> | 
          <span onClick={() => setShowModal('privacy')} style={{ color: '#A68B5B', margin: '0 4px', cursor: 'pointer', fontWeight: '600' }}>Privacy</span> | 
          <span onClick={() => setShowModal('support')} style={{ color: '#A68B5B', margin: '0 4px', cursor: 'pointer', fontWeight: '600' }}>Support</span> | 
          <span onClick={() => setShowModal('pi')} style={{ color: '#A68B5B', margin: '0 4px', cursor: 'pointer', fontWeight: '600' }}>Pi</span>
        </div>

        {/* MODAL POPUP */}
        {showModal && (
          <div onClick={() => setShowModal(null)} style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: '20px'
          }}>
            <div onClick={(e) => e.stopPropagation()} style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(30px)',
              borderRadius: '20px',
              padding: '25px',
              maxWidth: '400px',
              maxHeight: '70vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.8)'
            }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontSize: '13px', color: '#555', lineHeight: '1.6', fontFamily: 'system-ui' }}>{TermsContent[showModal]}</pre>
              <button onClick={() => setShowModal(null)} style={{
                marginTop: '15px',
                width: '100%',
                padding: '10px',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(90deg, #D4B5FF, #F7E7CE)',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer'
              }}>Close</button>
            </div>
          </div>
        )}

        <style>{`
          @keyframes glowIn {
            0% { transform: scale(0.8); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes floatUp {
            0% { transform: translateY(15px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes shine {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes driftUp {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
            50% { transform: translateY(-30px) translateX(10px); opacity: 0.5; }
          }
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  )
}
