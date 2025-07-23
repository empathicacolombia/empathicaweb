import React from 'react';

const cards = [
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#e8f0ff"/><path d="M24 16a1.5 1.5 0 0 1 1.5 1.5V24h4.5a1.5 1.5 0 0 1 0 3H25.5v4.5a1.5 1.5 0 0 1-3 0V27H18a1.5 1.5 0 0 1 0-3h4.5v-6.5A1.5 1.5 0 0 1 24 16Z" fill="#0057FF"/></svg>
    ),
    title: 'Demo personalizada',
    desc: 'Agenda una demostración de 30 minutos adaptada a las necesidades específicas de tu empresa',
    button: 'Agendar demo',
    buttonColor: '#0057FF',
    buttonBg: '#fff',
    buttonTextColor: '#fff',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#ffe6e0"/><path d="M24 18a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#FF7043"/></svg>
    ),
    title: 'Consulta gratuita',
    desc: 'Habla directamente con nuestros expertos en bienestar organizacional sin ningún compromiso',
    button: 'Llamar ahora',
    buttonColor: '#FF7043',
    buttonBg: '#fff',
    buttonTextColor: '#fff',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#e8faff"/><path d="M32 18v12a2 2 0 0 1-2 2H18a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Zm-8 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" fill="#00B8F4"/></svg>
    ),
    title: 'Recursos gratuitos',
    desc: 'Descarga nuestros whitepapers y casos de éxito para conocer más sobre bienestar empresarial',
    button: 'Descargar recursos',
    buttonColor: '#0057FF',
    buttonBg: '#fff',
    buttonTextColor: '#fff',
  },
];

const BusinessSection = () => (
  <section style={{ background: 'linear-gradient(120deg, #0057FF 0%, #6ea8fe 60%, #c8b6ff 100%)', padding: '6rem 0 5rem 0', position: 'relative' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', color: '#fff', position: 'relative', zIndex: 2 }}>
      <h2 style={{ fontSize: 48, fontWeight: 800, margin: 0, marginBottom: 12, background: 'linear-gradient(90deg, #fff 60%, #ffb199 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        Comienza la transformación de tu empresa <span style={{ color: '#ffb199', background: 'none', WebkitTextFillColor: 'unset' }}>hoy mismo</span>
      </h2>
      <p style={{ color: '#e3e6f0', fontSize: 20, margin: '0 0 2.5rem 0', fontWeight: 400 }}>
        Miles de empresas ya confían en nosotros. Es momento de que tu organización sea la próxima en transformar su cultura de bienestar.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: 48 }}>
        <button style={{ background: '#fff', color: '#0057FF', border: 'none', borderRadius: 24, padding: '1rem 2.5rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span role="img" aria-label="rocket">🚀</span> Ver demo →
        </button>
        <button style={{ background: '#FF7043', color: '#fff', border: 'none', borderRadius: 24, padding: '1rem 2.5rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px #ff704322', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span role="img" aria-label="phone">📞</span> Hablar con un consultor
        </button>
      </div>
      <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'stretch', marginTop: 40, flexWrap: 'nowrap' }}>
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              borderRadius: 24,
              boxShadow: '0 4px 32px #0001',
              padding: '2.5rem 2rem 2rem 2rem',
              minWidth: 320,
              maxWidth: 400,
              flex: '1 1 320px',
              color: '#222',
              transition: 'transform 0.25s cubic-bezier(.4,2,.6,1)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
              {card.icon}
            </div>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 10, color: '#222' }}>{card.title}</div>
            <div style={{ color: '#555', fontSize: 16, marginBottom: 18 }}>{card.desc}</div>
            <button style={{ background: card.buttonColor, color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2.2rem', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 10 }}>
              {card.button}
            </button>
          </div>
        ))}
      </div>
      {/* Franja de beneficios */}
      <div style={{ maxWidth: 1400, margin: '3.5rem auto 0 auto', borderRadius: 32, border: '1.5px solid #fff5', background: 'rgba(255,255,255,0.04)', boxShadow: '0 2px 24px #0001', padding: '2.5rem 2rem', color: '#fff', position: 'relative' }}>
        <h3 style={{ fontSize: 28, fontWeight: 800, margin: 0, marginBottom: 32, textAlign: 'center' }}>¿Por qué elegir Empathica?</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          {/* Beneficio 1 */}
          <div style={{ textAlign: 'center', flex: 1, minWidth: 180 }}>
            <div style={{ color: '#FFB199', fontSize: 32, marginBottom: 8 }}><span role="img" aria-label="check">✔️</span></div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Implementación rápida</div>
            <div style={{ color: '#fff', opacity: 0.8, fontSize: 15 }}>Resultados en menos de 30 días</div>
          </div>
          {/* Beneficio 2 */}
          <div style={{ textAlign: 'center', flex: 1, minWidth: 180 }}>
            <div style={{ color: '#FFB199', fontSize: 32, marginBottom: 8 }}><span role="img" aria-label="check">✔️</span></div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>ROI comprobado</div>
            <div style={{ color: '#fff', opacity: 0.8, fontSize: 15 }}>Retorno de inversión promedio 3:1</div>
          </div>
          {/* Beneficio 3 */}
          <div style={{ textAlign: 'center', flex: 1, minWidth: 180 }}>
            <div style={{ color: '#FFB199', fontSize: 32, marginBottom: 8 }}><span role="img" aria-label="check">✔️</span></div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Soporte 24/7</div>
            <div style={{ color: '#fff', opacity: 0.8, fontSize: 15 }}>Atención personalizada siempre</div>
          </div>
          {/* Beneficio 4 */}
          <div style={{ textAlign: 'center', flex: 1, minWidth: 180 }}>
            <div style={{ color: '#FFB199', fontSize: 32, marginBottom: 8 }}><span role="img" aria-label="check">✔️</span></div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>200+ empresas</div>
            <div style={{ color: '#fff', opacity: 0.8, fontSize: 15 }}>Confían en nuestras soluciones</div>
          </div>
        </div>
      </div>
    </div>
    {/* Círculo decorativo */}
    <div style={{ position: 'absolute', left: -120, top: 40, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, #fff3 0%, #0057ff00 80%)', zIndex: 1 }} />
  </section>
);

export default BusinessSection; 