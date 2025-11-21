import React from 'react'

export default function StartPage({ onStart }) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '62vh',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div style={{
        maxWidth: 760,
        textAlign: 'center',
        borderRadius: 14,
        padding: 28,
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        background: 'linear-gradient(180deg,#fff,#fffefc)'
      }}>
        <h1 style={{ fontSize: 34, margin: 0 }}>Which coffee person are you?</h1>
        <p style={{ color: '#666', marginTop: 12, fontSize: 16 }}>
          Answer a few fun questions and we’ll tell you the coffee that matches your personality.
        </p>

        <div style={{ marginTop: 22, display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center' }}>
          <button
            className="btn"
            onClick={onStart}
            style={{ padding: '12px 20px', fontSize: 16, borderRadius: 10 }}
          >
            Let's find out ☕
          </button>
        </div>
      </div>
    </div>
  )
}
