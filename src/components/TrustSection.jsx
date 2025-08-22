import React from 'react';

const stats = [
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#e8f0ff"/><path d="M24 16a8 8 0 0 1 8 8v2a8 8 0 0 1-16 0v-2a8 8 0 0 1 8-8Zm0 18c-3.9 0-7-3.1-7-7 0-1.1.2-2.1.6-3h12.8c.4.9.6 1.9.6 3 0 3.9-3.1 7-7 7z" fill="#0057FF"/></svg>
    ),
    value: 'Usuarios activos',
    label: 'Personas confían en nosotros',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#e8f0ff"/><path d="M24 16a8 8 0 0 1 8 8v2a8 8 0 0 1-16 0v-2a8 8 0 0 1 8-8Zm0 18c-3.9 0-7-3.1-7-7 0-1.1.2-2.1.6-3h12.8c.4.9.6 1.9.6 3 0 3.9-3.1 7-7 7z" fill="#0057FF"/></svg>
    ),
    value: 'Psicólogos certificados',
    label: 'Profesionales verificados',
  },
  {
    icon: (
      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="24" fill="#e8f0ff"/><path d="M24 16a8 8 0 0 1 8 8v2a8 8 0 0 1-16 0v-2a8 8 0 0 1 8-8Zm0 18c-3.9 0-7-3.1-7-7 0-1.1.2-2.1.6-3h12.8c.4.9.6 1.9.6 3 0 3.9-3.1 7-7 7z" fill="#0057FF"/></svg>
    ),
    value: '24/7',
    label: 'Soporte disponible',
  },
];

const testimonials = [
  {
    name: 'Ana M.',
    age: 28,
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
    text: 'Nunca pensé que encontraría a alguien que me entendiera tan bien. El sistema de match de Empathica es increíble.',
    rating: 5,
  },
  {
    name: 'Roberto S.',
    age: 34,
    img: 'https://randomuser.me/api/portraits/men/43.jpg',
    text: 'Después de 3 meses, siento que por fin tengo las herramientas para manejar mi ansiedad. Gracias Empathica.',
    rating: 5,
  },
  {
    name: 'María L.',
    age: 22,
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'La sesión orientativa gratuita me ayudó muchísimo a entender qué tipo de terapia necesitaba. Super recomendado.',
    rating: 5,
  },
];

const logos = [
  { name: 'Universidad Nacional', icon: '🏛️' },
  { name: 'Ministerio de Salud', icon: '📑' },
  { name: 'Asociación de Psicólogos', icon: '🧠' },
  { name: 'TechHealth', icon: '💊' },
];

const TrustSection = () => (
  <section className="section-container" style={{ background: '#fcfcfd', padding: '5rem 0 4rem 0' }}>
    <div className="container" style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
      <h2 className="section-title" style={{ fontSize: 38, fontWeight: 800, margin: 0, marginBottom: 10, letterSpacing: -1 }}>
        Miles de personas ya han encontrado <span style={{ color: '#0057FF' }}>su match</span> <span style={{ background: 'linear-gradient(90deg, #0057FF 60%, #c8b6ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>perfecto</span>
      </h2>
      <div className="cards-grid" style={{ display: 'flex', justifyContent: 'center', gap: '5rem', margin: '3rem 0 2.5rem 0' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: 10 }}>{stat.icon}</div>
            <div style={{ color: '#0057FF', fontWeight: 800, fontSize: 32 }}>{stat.value}</div>
            <div style={{ color: '#888', fontSize: 16 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 700, margin: '3rem 0 2rem 0', textAlign: 'center' }}>Lo que dicen nuestros usuarios</h3>
      <div className="cards-grid" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'stretch', marginBottom: 40, flexWrap: 'nowrap' }}>
        {testimonials.map((t, i) => (
          <div key={i} className="card" style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #e3e6f0', boxShadow: '0 4px 32px #0001', padding: '2.2rem 2rem 2rem 2rem', minWidth: 340, maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <img src={t.img} alt={t.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700 }}>{t.name}</div>
                <div style={{ color: '#888', fontSize: 14 }}>{t.age} años</div>
              </div>
            </div>
            <div style={{ color: '#555', fontSize: 16, fontStyle: 'italic', marginBottom: 10 }}>
              "{t.text}"
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 'auto' }}>
              {Array.from({ length: t.rating }).map((_, j) => (
                <span key={j} style={{ color: '#FFD600', fontSize: 18 }}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ color: '#888', fontSize: 17, marginBottom: 18, fontWeight: 500 }}>Respaldados por instituciones de confianza</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {logos.map((logo, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#bbb', fontSize: 20, fontWeight: 600 }}>
            <span style={{ fontSize: 26 }}>{logo.icon}</span> {logo.name}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection; 