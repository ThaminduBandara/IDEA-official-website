import React from 'react'

export function StudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '2px 4px' }}>
      <img
        src="/static/logo.png"
        alt="IDEA Sri Lanka Logo"
        style={{
          height: '28px',
          width: 'auto',
          objectFit: 'contain',
          borderRadius: '4px',
        }}
      />
      <span
        style={{
          fontWeight: 800,
          fontSize: '15px',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        IDEA <span style={{ color: '#34d399', fontWeight: 600, fontSize: '13px' }}>CMS</span>
      </span>
    </div>
  )
}
