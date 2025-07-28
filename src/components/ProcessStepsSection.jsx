import React from 'react';

const steps = [
  {
    number: 1,
    color: '#0057FF',
    icon: (
      <svg width="38" height="38" fill="none" viewBox="0 0 38 38">
        <rect x="4" y="4" width="30" height="30" rx="6" fill="#E8F0FF"/>
        <path d="M12 8h14c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H12c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2zm2 2v6h10v-6H14z" fill="#0057FF"/>
        <path d="M16 12h6v1h-6v-1zm0 2h4v1h-4v-1z" fill="#0057FF"/>
      </svg>
    ),
    title: 'Cuestionario Científico',
    desc: 'Responde nuestro test psicológico diseñado por expertos que analiza tu personalidad, necesidades y preferencias terapéuticas en profundidad.',
    tags: ['15+ variables analizadas', 'Basado en ciencia', '5 minutos de duración'],
  },
  {
    number: 2,
    color: '#E9CFC0',
    icon: (
      <svg width="38" height="38" fill="none" viewBox="0 0 38 38">
        <rect x="4" y="4" width="30" height="30" rx="6" fill="#F7F2ED"/>
        <path d="M19 8l2.5 5.1 5.5.8-4 3.9.9 5.3L19 20.5l-4.8 2.5.9-5.3-4-3.9 5.5-.8L19 8z" fill="#C89B7B"/>
      </svg>
    ),
    title: 'Match Inteligente',
    desc: 'Nuestro algoritmo avanzado cruza más de 50 variables psicológicas para encontrar psicólogos que realmente conecten contigo y tu situación específica.',
    tags: ['Algoritmo IA avanzado', 'Compatibilidad 95%+', 'Match instantáneo'],
  },
  {
    number: 3,
    color: '#2ECC40',
    icon: (
      <svg width="38" height="38" fill="none" viewBox="0 0 38 38">
        <rect x="4" y="4" width="30" height="30" rx="6" fill="#E6F9ED"/>
        <path d="M19 8c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5S21.5 8 19 8zm0 6c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" fill="#2ECC40"/>
        <path d="M19 15c-3.3 0-6 2.7-6 6v3h12v-3c0-3.3-2.7-6-6-6z" fill="#2ECC40"/>
      </svg>
    ),
    title: 'Seguimiento 24/7',
    desc: 'Accede a soporte continuo con IA inteligente, recursos personalizados y seguimiento constante de tu progreso hacia una mejor salud mental.',
    tags: ['Soporte IA 24/7', 'Recursos personalizados', 'Seguimiento continuo'],
  },
];

const Arrow = () => (
  <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M16 24h16M32 24l-6-6M32 24l-6 6" stroke="#0057FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </div>
);

const ProcessStepsSection = () => (
  <section className="section-container" style={{ background: 'linear-gradient(180deg, #f8f9fb 60%, #f3f6fd 100%)', padding: '5rem 0 4rem 0' }}>
    <div className="container" style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <span style={{ background: '#e8f0ff', color: '#0057FF', fontWeight: 600, fontSize: 16, borderRadius: 20, padding: '0.4rem 1.2rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span role="img" aria-label="bolt">⚡</span> ¿Cómo inicio mi proceso?
        </span>
      </div>
      <h2 className="section-title" style={{ fontSize: 38, fontWeight: 800, margin: 0, marginBottom: 12, letterSpacing: -1 }}>
        Tu <span style={{ color: '#0057FF' }}>Ecosistema de Bienestar</span> <span style={{ color: '#c8b6ff' }}>en 3 pasos</span>
      </h2>
      <p className="section-subtitle" style={{ color: '#555', fontSize: 18, margin: '0 0 2.5rem 0', fontWeight: 400 }}>
        Creamos un ecosistema completo diseñado para mejorar y mantener tu salud mental. Desde el primer contacto hasta el seguimiento continuo, cada elemento trabaja en armonía para tu bienestar emocional.
      </p>
      <div className="cards-grid" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'stretch', marginTop: 40, flexWrap: 'nowrap' }}>
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div
              className="card"
              style={{
                background: '#fff',
                borderRadius: 24,
                boxShadow: '0 4px 32px #0001',
                padding: '2.5rem 2rem 2rem 2rem',
                flex: '1 1 260px',
                minWidth: 260,
                maxWidth: 320,
                transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s, border 0.25s',
                cursor: 'pointer',
                border: '2px solid #fff',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.06)';
                e.currentTarget.style.boxShadow = '0 8px 32px #0057ff33';
                e.currentTarget.style.border = '2px solid #AEE2FF';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 32px #0001';
                e.currentTarget.style.border = '2px solid #fff';
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
                <div style={{ background: step.color, color: '#fff', fontWeight: 700, fontSize: 20, borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, boxShadow: '0 2px 8px #0001' }}>{step.number}</div>
                <div style={{ marginBottom: 10 }}>{step.icon}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{step.title}</div>
              <div style={{ color: '#555', fontSize: 16, marginBottom: 18 }}>{step.desc}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                {step.tags.map((tag, j) => (
                  <span key={j} style={{ background: '#f2f4fa', color: '#0057FF', borderRadius: 8, padding: '3px 12px', fontSize: 13, fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
            </div>
            {i < steps.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessStepsSection; 