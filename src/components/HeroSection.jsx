import React, { useState, useEffect } from 'react';

const dynamicStats = [
  { value: '24/7', label: 'Soporte' },
  { value: '98%', label: 'satisfacción' },
  { value: '15,000+', label: 'usuarios activos' },
];

const carouselCards = [
  {
    initials: 'DMT',
    name: 'Dra. María Torres',
    specialty: 'Terapeuta Familiar',
    rating: 4.9,
    tags: [
      { text: 'Familia', color: '#0057FF' },
      { text: 'Comunicación', color: '#0057FF' },
      { text: 'Pareja', color: '#888' },
      { text: 'Conflictos', color: '#888' },
    ],
    match: '94%',
    matchColor: '#0057FF',
    desc: '*Especializada en dinámicas familiares y resolución de conflictos*',
    button: 'Ver perfil completo',
  },
  {
    initials: 'RS',
    name: 'Dr. Roberto Silva',
    specialty: 'Psicólogo Deportivo',
    rating: 4.7,
    tags: [
      { text: 'Deportes', color: '#0057FF' },
      { text: 'Motivación', color: '#0057FF' },
      { text: 'Rendimiento', color: '#888' },
      { text: 'Estrés', color: '#888' },
    ],
    match: '89%',
    matchColor: '#0057FF',
    desc: '"Enfocado en el rendimiento mental y la superación personal"',
    button: 'Ver perfil completo',
  },
  // Puedes agregar más tarjetas aquí
];

const HeroSection = () => {
  // Texto dinámico
  const [statIndex, setStatIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setStatIndex((prev) => (prev + 1) % dynamicStats.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Carrusel
  const [cardIndex, setCardIndex] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setFade(false), 2300);
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCardIndex((prev) => (prev + 1) % carouselCards.length);
        setFade(true);
      }, 300);
    }, 3000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  const card = carouselCards[cardIndex];

  return (
    <section style={{ background: 'linear-gradient(120deg, #e8f0ff 0%, #f3f6fd 100%)', minHeight: '90vh', padding: '5rem 0 6rem 0' }}>
      <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: '4rem' }}>
        {/* Columna izquierda */}
        <div style={{ flex: 1, minWidth: 340, marginRight: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: 24 }}>
            <div style={{ width: 56, height: 56, background: '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #0001' }}>
              <span role="img" aria-label="logo" style={{ fontSize: 32 }}>💙</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#0057FF' }}>Empathica</div>
              <div style={{ fontSize: 15, color: '#888' }}>Conectando mentes expertas</div>
            </div>
          </div>
          <h1 style={{ fontSize: 60, fontWeight: 800, margin: 0, lineHeight: 1.08, marginBottom: 24, textAlign: 'left' }}>
            Tu bienestar mental merece<br />
            <span style={{
              background: 'linear-gradient(90deg, #0057FF 60%, #c8b6ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
              display: 'inline-block',
            }}>
              el cuidado perfecto
            </span>
          </h1>
          <p style={{ fontSize: 20, margin: '1.5rem 0 1.5rem 0', color: '#222', lineHeight: 1.5, textAlign: 'left' }}>
            Conectamos tu mundo emocional con el psicólogo ideal para ti. <span style={{ color: '#0057FF', fontWeight: 600 }}>Sin prueba y error.</span> Con ciencia y tecnología avanzada.
          </p>
          <div style={{ display: 'flex', gap: '3rem', margin: '2rem 0 2rem 0', color: '#555', fontSize: 16, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="science">🔬</span> Matching basado en ciencia
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="lock">🔒</span> 100% confidencial
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span role="img" aria-label="change">🔄</span> Cambio gratuito de terapeuta
            </div>
          </div>
          {/* Botones */}
          <div style={{ display: 'flex', gap: '1.2rem', marginBottom: 18, alignItems: 'center' }}>
            <button style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 10, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22' }}>Encuentra tu match perfecto</button>
            <button style={{ background: '#fff', color: '#0057FF', border: '2px solid #0057FF', borderRadius: 10, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Orientación gratuita</button>
          </div>
          {/* Separador superior grande */}
          <div style={{ height: 1, background: '#e3e6f0', width: '100%', margin: '2.5rem 0 1.2rem 0' }} />
          {/* Texto dinámico */}
          <div style={{ minHeight: 40, marginTop: 0, marginBottom: 32 }}>
            <span style={{ fontWeight: 700, fontSize: 22, color: '#0057FF', marginRight: 8, transition: 'all 0.3s' }}>{dynamicStats[statIndex].value}</span>
            <span style={{ color: '#888', fontSize: 16, transition: 'all 0.3s' }}>{dynamicStats[statIndex].label}</span>
          </div>
        </div>
        {/* Columna derecha: Carrusel de tarjetas centrado verticalmente */}
        <div style={{ flex: 1, minWidth: 340, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px #0002', padding: '2.5rem', width: 390, maxWidth: '100%', opacity: fade ? 1 : 0, transition: 'opacity 0.3s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#0057FF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 26 }}>{card.initials}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 20 }}>{card.name}</div>
                <div style={{ color: '#0057FF', fontWeight: 600, fontSize: 16 }}>{card.specialty}</div>
                <div style={{ color: '#888', fontSize: 15 }}>⭐ {card.rating}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
              {card.tags.map((tag, i) => (
                <span key={i} style={{ background: '#f2f4fa', color: tag.color, borderRadius: 8, padding: '3px 12px', fontSize: 14 }}>{tag.text}</span>
              ))}
            </div>
            <div style={{ color: card.matchColor, fontWeight: 700, fontSize: 24, margin: '1.2rem 0 0.7rem 0' }}>{card.match} match</div>
            <div style={{ color: '#888', fontSize: 14, marginBottom: 20 }}>{card.desc}</div>
            <button style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 10, padding: '0.9rem 1.7rem', fontWeight: 700, fontSize: 18, cursor: 'pointer', width: '100%' }}>{card.button}</button>
          </div>
        </div>
      </div>
      <div style={{ width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', background: 'transparent' }}>
        <div style={{ height: 1, background: '#e3e6f0', width: '100%', maxWidth: '1600px', margin: '0 auto 2.5rem auto' }} />
      </div>
      {/* Estadísticas fijas */}
      <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '5rem', padding: '1.5rem 0 2.5rem 0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#0057FF', fontWeight: 800, fontSize: 32, marginBottom: 4 }}>15,000+</div>
          <div style={{ color: '#888', fontSize: 16 }}>Usuarios activos</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#0057FF', fontWeight: 800, fontSize: 32, marginBottom: 4 }}>500+</div>
          <div style={{ color: '#888', fontSize: 16 }}>Psicólogos expertos</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#0057FF', fontWeight: 800, fontSize: 32, marginBottom: 4 }}>98%</div>
          <div style={{ color: '#888', fontSize: 16 }}>Satisfacción</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#0057FF', fontWeight: 800, fontSize: 32, marginBottom: 4 }}>24/7</div>
          <div style={{ color: '#888', fontSize: 16 }}>Soporte</div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 