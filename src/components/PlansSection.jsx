import React from 'react';

const plans = [
  {
    icon: <span style={{ fontSize: 28 }}>🔍</span>,
    name: 'Explorador',
    price: 'Gratis',
    description: 'Perfecto para comenzar tu viaje de autoconocimiento',
    features: [
      'Contenido educativo premium',
      'Chat con IA especializada en bienestar',
      'Biblioteca de recursos de salud mental',
      'Cambio de terapeuta gratuito',
      'App móvil completa',
    ],
    button: 'Comenzar gratis',
    highlight: false,
    action: 'register',
  },
  {
    icon: <span style={{ fontSize: 28 }}>💙</span>,
    name: 'Cuidador',
    price: '$99',
    description: 'El equilibrio perfecto entre apoyo humano y tecnología',
    features: [
      'Todo lo del plan Explorador',
      '2 sesiones mensuales con psicólogo certificado',
      'Match personalizado con nuestro algoritmo',
      'Sesión orientativa gratuita',
      'Cambio de terapeuta gratuito',
      'Seguimiento emocional personalizado',
    ],
    button: 'Elegir plan',
    highlight: true,
    tag: 'Más popular',
    action: 'register',
  },
  {
    icon: <span style={{ fontSize: 28 }}>🏢</span>,
    name: 'Empresas',
    price: 'Desde $99',
    description: 'Bienestar integral para tu equipo con dashboard empresarial',
    features: [
      'Dashboard empresarial completo',
      'Métricas de bienestar del equipo',
      'Sesiones individuales y grupales',
      'Programas de prevención personalizados',
      'Cambio de terapeuta gratuito',
      'Reportes de impacto y ROI',
      'Máxima confidencialidad y privacidad',
      'Talleres y capacitaciones especializadas',
    ],
    button: 'Hablar con un experto',
    highlight: false,
    action: 'business',
  },
];

const PlansSection = ({ navigationProps }) => {
  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  return (
    <section className="section-container" style={{ background: '#fcfcfd', padding: '5rem 0 4rem 0' }}>
      <div className="container" style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-title" style={{ fontSize: 38, fontWeight: 800, margin: 0, marginBottom: 10, letterSpacing: -1 }}>
          Elige el plan que <span style={{ color: '#0057FF' }}>mejor te acompañe</span>
        </h2>
        <p className="section-subtitle" style={{ color: '#555', fontSize: 18, margin: '0 0 2.5rem 0', fontWeight: 400 }}>
          Todos nuestros planes incluyen la posibilidad de cambiar de terapeuta las veces que necesites, sin costo adicional.
        </p>
        <div className="plans-container cards-grid" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'stretch', marginTop: 40, flexWrap: 'nowrap' }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className="plan-card card"
              style={{
                background: '#fff',
                borderRadius: 24,
                boxShadow: plan.highlight ? '0 4px 32px #0057ff22' : '0 4px 32px #0001',
                padding: '2.5rem 2rem 2rem 2rem',
                minWidth: 340,
                maxWidth: 400,
                flex: '1 1 340px',
                border: plan.highlight ? '2.5px solid #0057FF' : '1.5px solid #e3e6f0',
                position: 'relative',
                transition: 'transform 0.25s cubic-bezier(.4,2,.6,1)',
                cursor: 'pointer',
                zIndex: plan.highlight ? 2 : 1,
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {plan.highlight && (
                <div style={{ position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)', background: '#0057FF', color: '#fff', fontWeight: 700, fontSize: 15, borderRadius: 16, padding: '0.3rem 1.2rem', boxShadow: '0 2px 8px #0057ff22', zIndex: 3 }}>
                  {plan.tag}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ background: '#f3f6fd', color: '#0057FF', fontWeight: 700, fontSize: 20, borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, boxShadow: '0 2px 8px #0001' }}>{plan.icon}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 26, marginBottom: 6 }}>{plan.name}</div>
              <div style={{ color: '#0057FF', fontWeight: 900, fontSize: 32, marginBottom: 6 }}>{plan.price}<span style={{ color: '#888', fontWeight: 400, fontSize: 18 }}>{plan.name === 'Cuidador' ? '/mes' : plan.name === 'Empresas' ? '/mes' : ''}</span></div>
              <div style={{ color: '#888', fontSize: 16, marginBottom: 16 }}>{plan.description}</div>
              <ul style={{ textAlign: 'left', color: '#222', fontSize: 16, margin: '0 0 2rem 0', padding: 0, listStyle: 'none' }}>
                {plan.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ color: '#0057FF', fontSize: 18 }}>✔</span> {f}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleNavigation(plan.action)}
                style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2.2rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 10 }}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
        {/* Tarjeta empresas */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
          <div style={{ background: '#fff', borderRadius: 24, border: '1.5px solid #e3e6f0', boxShadow: '0 4px 32px #0001', padding: '2.5rem 2rem 2.5rem 2rem', maxWidth: 700, width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
              <svg width="38" height="38" fill="none" viewBox="0 0 38 38"><rect x="6" y="6" width="26" height="26" rx="6" fill="#fff" stroke="#0057FF" strokeWidth="2.5"/><rect x="12" y="12" width="4" height="4" rx="2" fill="#0057FF"/><rect x="22" y="12" width="4" height="4" rx="2" fill="#0057FF"/><rect x="12" y="22" width="4" height="4" rx="2" fill="#0057FF"/><rect x="22" y="22" width="4" height="4" rx="2" fill="#0057FF"/></svg>
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, margin: 0, marginBottom: 12, color: '#222' }}>¿Tienes una empresa?</h3>
            <p style={{ color: '#555', fontSize: 18, margin: '0 0 2.2rem 0', fontWeight: 400 }}>
              Nuestro plan empresarial incluye un dashboard completo para monitorear el bienestar de tu equipo, con métricas detalladas, reportes de impacto y programas personalizados de prevención.
            </p>
            <button 
              onClick={() => handleNavigation('business')}
              style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2.2rem', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22', display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto' }}
            >
              <span role="img" aria-label="building">🏢</span> Más información para empresas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection; 