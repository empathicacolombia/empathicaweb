import React from 'react';

const CallToActionSection = () => (
  <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3.5rem 0 4rem 0', background: 'transparent' }}>
    <div style={{ background: 'linear-gradient(120deg, #f3f6fd 80%, #fff8f6 100%)', border: '1.5px solid #cfe0ff', borderRadius: 24, maxWidth: 950, width: '100%', margin: '0 1rem', padding: '3rem 2rem 2.5rem 2rem', boxShadow: '0 2px 24px #0057ff11', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #6ea8fe 40%, #c8b6ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0 auto', boxShadow: '0 2px 12px #0057ff22' }}>
          <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="18" fill="#fff"/>
            <path d="M18 11c-2.2 0-4 1.8-4 4v2c0 2.2 1.8 4 4 4s4-1.8 4-4v-2c0-2.2-1.8-4-4-4Zm0 9c-1.7 0-3-1.3-3-3v-2c0-1.7 1.3-3 3-3s3 1.3 3 3v2c0 1.7-1.3 3-3 3Z" fill="#6ea8fe"/>
            <path d="M11 21c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2H13c-1.1 0-2 .9-2 2v2z" fill="#6ea8fe"/>
          </svg>
        </div>
      </div>
      <h2 style={{ fontSize: 30, fontWeight: 800, margin: 0, marginBottom: 12, background: 'linear-gradient(90deg, #0057FF 60%, #c8b6ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        ¿Listo para transformar tu bienestar?
      </h2>
      <p style={{ color: '#555', fontSize: 18, margin: '0 0 2.2rem 0', fontWeight: 400 }}>
        Únete a miles de personas que ya han encontrado el apoyo profesional que necesitaban. Tu viaje hacia una mejor salud mental comienza con un solo clic.
      </p>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: 18 }}>
        <button style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2.2rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span role="img" aria-label="bolt">⚡</span> Comenzar mi evaluación
        </button>
        <button style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2.2rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22' }}>
          Orientación gratuita
        </button>
      </div>
    </div>
  </section>
);

export default CallToActionSection; 