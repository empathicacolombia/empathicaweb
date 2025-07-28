import React from 'react';

const CallToActionSection = ({ navigationProps }) => {
  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3.5rem 0 4rem 0', background: 'transparent' }}>
      <div style={{ background: 'linear-gradient(120deg, #f3f6fd 80%, #fff8f6 100%)', border: '1.5px solid #cfe0ff', borderRadius: 24, maxWidth: 950, width: '100%', margin: '0 1rem', padding: '3rem 2rem 2.5rem 2rem', boxShadow: '0 2px 24px #0057ff11', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(135deg, #6ea8fe 40%, #c8b6ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0 auto', boxShadow: '0 2px 12px #0057ff22' }}>
            <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="18" fill="#fff"/>
              <path d="M18 12c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5S20.5 12 18 12zm0 6c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" fill="#6ea8fe"/>
              <path d="M18 18c-3.3 0-6 2.7-6 6v3h12v-3c0-3.3-2.7-6-6-6z" fill="#6ea8fe"/>
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
          <button 
            onClick={() => handleNavigation('questionnaire-match')}
            style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2.2rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span role="img" aria-label="bolt">⚡</span> Comenzar mi evaluación
          </button>
          <button 
            onClick={() => handleNavigation('free-orientation')}
            style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2.2rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22' }}
          >
            Orientación gratuita
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection; 