import React, { useState, useEffect } from 'react';
import logoEmpathica from '../assets/Logoempathica.png';

const carouselCards = [
  {
    initials: 'AM',
    name: 'Dra. Ana Martínez',
    specialty: 'Psicóloga Clínica',
    rating: 4.9,
    tags: [
      { text: 'Ansiedad', color: '#0057FF' },
      { text: 'Empática', color: '#0057FF' },
      { text: 'Terapia Cognitiva', color: '#f97316' },
      { text: 'Jóvenes Adultos', color: '#f97316' },
    ],
    match: '96%',
    matchColor: '#0057FF',
    desc: '"Especialista en conectar con personas que buscan herramientas prácticas"',
    button: 'Ver perfil completo',
  },
  {
    initials: 'CL',
    name: 'Dr. Carlos López',
    specialty: 'Psicólogo Coach',
    rating: 4.8,
    tags: [
      { text: 'Autoestima', color: '#0057FF' },
      { text: 'Mindfulness', color: '#0057FF' },
      { text: 'Coaching', color: '#f97316' },
      { text: 'Relaciones', color: '#f97316' },
    ],
    match: '92%',
    matchColor: '#0057FF',
    desc: '"Experto en desarrollo personal y autoconocimiento"',
    button: 'Ver perfil completo',
  },
  // Puedes agregar más tarjetas aquí
];

const HeroSection = ({ navigationProps }) => {
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

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  const card = carouselCards[cardIndex];

  return (
    <section className="section-container" style={{ background: 'linear-gradient(120deg, #e8f0ff 0%, #f3f6fd 100%)', minHeight: '90vh', padding: '5rem 0 6rem 0' }}>
      <div className="container hero-container" style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between', gap: '4rem' }}>
        {/* Columna izquierda */}
        <div className="hero-content" style={{ flex: 1, minWidth: 340, marginRight: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: 24 }}>
            <div style={{ width: 56, height: 56, background: '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #0001' }}>
              <img src={logoEmpathica} alt="Logo Empathica" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#0057FF' }}>Empathica</div>
              <div style={{ fontSize: 15, color: '#888' }}>Conectando mentes expertas</div>
            </div>
          </div>
          <h1 className="hero-title" style={{ fontSize: 60, fontWeight: 800, margin: 0, lineHeight: 1.08, marginBottom: 24, textAlign: 'left' }}>
            Tu bienestar mental merece<br />
            <span style={{
              background: 'linear-gradient(90deg, #0057FF 60%, #c8b6ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
            }}>el cuidado perfecto</span>
          </h1>
          <p className="hero-description" style={{ fontSize: 20, color: '#666', lineHeight: 1.6, marginBottom: 32, textAlign: 'left' }}>
            Conectamos tu mundo emocional con el psicólogo ideal para ti. <span style={{ color: '#0057FF', fontWeight: 600 }}>Sin prueba y error.</span> Con ciencia y tecnología avanzada.
          </p>
          
          {/* Características */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 24, height: 24, background: '#e8f0ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, color: '#0057FF' }}>🧠</span>
              </div>
              <span style={{ color: '#666', fontSize: 16 }}>Matching basado en ciencia</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 24, height: 24, background: '#e8f0ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, color: '#0057FF' }}>🔒</span>
              </div>
              <span style={{ color: '#666', fontSize: 16 }}>100% confidencial</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 24, height: 24, background: '#e8f0ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, color: '#0057FF' }}>💬</span>
              </div>
              <span style={{ color: '#666', fontSize: 16 }}>Cambio gratuito de terapeuta</span>
            </div>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => handleNavigation('questionnaire-match')}
              style={{ 
                background: '#0057FF', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 14, 
                padding: '1rem 2rem', 
                fontWeight: 700, 
                fontSize: 18, 
                cursor: 'pointer', 
                boxShadow: '0 4px 16px rgba(0, 87, 255, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 87, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 87, 255, 0.3)';
              }}
            >
              Encuentra tu match perfecto
            </button>
            <button 
              onClick={() => handleNavigation('free-orientation')}
              style={{ 
                background: '#fff', 
                color: '#0057FF', 
                border: '2px solid #0057FF', 
                borderRadius: 14, 
                padding: '1rem 2rem', 
                fontWeight: 700, 
                fontSize: 18, 
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f0f4ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff';
              }}
            >
              Orientación gratuita
            </button>
          </div>
        </div>
        {/* Columna derecha: Carrusel de tarjetas centrado verticalmente */}
        <div className="hero-card" style={{ flex: 1, minWidth: 340, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 24px #0002', padding: '2.5rem', width: 390, maxWidth: '100%', opacity: fade ? 1 : 0, transition: 'opacity 0.3s', position: 'relative' }}>
            {/* Badge "Al Match" en la esquina superior derecha */}
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
              <span style={{ background: '#fef3c7', color: '#92400e', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '500' }}>
                Al Match
              </span>
            </div>
            
            {/* Badge "Tu Match Ideal" centrado en la parte superior */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ background: '#dbeafe', color: '#1e40af', borderRadius: '20px', padding: '8px 16px', fontSize: '14px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Tu Match Ideal
              </div>
              {/* Línea decorativa debajo del badge */}
              <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #3b82f6 50%, #fbbf24 50%)', margin: '8px auto 0 auto' }}></div>
            </div>

            {/* Información del psicólogo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1.5rem' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f3f4f6', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 24, border: '2px solid #e5e7eb' }}>
                {card.initials}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 22, color: '#1f2937', marginBottom: '4px' }}>{card.name}</div>
                <div style={{ color: '#3b82f6', fontWeight: 600, fontSize: 16, marginBottom: '8px' }}>{card.specialty}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#fbbf24', fontSize: 16 }}>⭐⭐⭐⭐⭐</span>
                  <span style={{ color: '#6b7280', fontSize: 14, fontWeight: '500' }}>{card.rating}</span>
                </div>
              </div>
            </div>

            {/* Tags en dos columnas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '1.5rem' }}>
              {card.tags.map((tag, i) => (
                <span key={i} style={{ 
                  background: tag.color === '#0057FF' ? '#dbeafe' : '#fef3c7', 
                  color: tag.color === '#0057FF' ? '#1e40af' : '#92400e', 
                  borderRadius: '12px', 
                  padding: '6px 12px', 
                  fontSize: 13, 
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  {tag.text}
                </span>
              ))}
            </div>

            {/* Porcentaje de match */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ color: '#3b82f6', fontWeight: 800, fontSize: 28, marginBottom: '8px' }}>{card.match} match</div>
              <div style={{ color: '#6b7280', fontSize: 14, lineHeight: '1.4' }}>{card.desc}</div>
            </div>

            {/* Botón */}
            <button 
              onClick={() => handleNavigation('psychologists')}
              style={{ 
                background: '#3b82f6', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                padding: '12px 20px', 
                fontWeight: 600, 
                fontSize: 16, 
                cursor: 'pointer', 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              {card.button}
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection; 