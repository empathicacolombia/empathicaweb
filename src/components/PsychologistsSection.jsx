import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';

const PsychologistsSection = ({ navigationProps }) => {
  const [index, setIndex] = useState(0);
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar psicólogos activos desde el backend
  useEffect(() => {
    const fetchActivePsychologists = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await userService.getAllPsychologists();
        const allPsychologists = response.content || response || [];
        
        // Filtrar solo psicólogos activos
        const activePsychologists = allPsychologists.filter(psychologist => 
          psychologist.userStatus === 'ACTIVE'
        );
        
        // Transformar los datos para el formato requerido por el componente
        const transformedPsychologists = activePsychologists.slice(0, 6).map((psychologist, index) => ({
          id: psychologist.userId || index,
          name: `${psychologist.name} ${psychologist.lastName}`,
          specialty: psychologist.specialty || 'Psicólogo Clínico',
          match: Math.floor(Math.random() * 20) + 80, // Match aleatorio entre 80-99%
          img: null, // No tenemos imágenes en el backend
          initials: `${psychologist.name?.charAt(0) || 'P'}${psychologist.lastName?.charAt(0) || 'S'}`,
          description: psychologist.oneliner || 'Psicólogo especializado en bienestar emocional y desarrollo personal.',
          tags: psychologist.therapeuticStyle?.slice(0, 3) || ['Terapia Cognitiva', 'Bienestar', 'Desarrollo Personal'],
          phrase: psychologist.oneliner || 'Comprometido con tu bienestar emocional',
          rating: 4.5 + (Math.random() * 0.5), // Rating entre 4.5-5.0
          sessions: Math.floor(Math.random() * 1000) + 100, // Sesiones entre 100-1100
        }));
        
        setPsychologists(transformedPsychologists);
      } catch (error) {
        console.error('Error cargando psicólogos:', error);
        setError('Error al cargar los psicólogos. Inténtalo de nuevo.');
        
        // Fallback a datos estáticos si hay error
        setPsychologists([
          {
            id: 1,
            name: 'Dra. Ana Martínez',
            specialty: 'Psicóloga Clínica',
            match: 96,
            img: 'https://randomuser.me/api/portraits/women/44.jpg',
            description: 'Especialista en ansiedad y terapia cognitivo-conductual con 8 años de experiencia ayudando a jóvenes adultos.',
            tags: ['Ansiedad', 'Terapia Cognitiva', 'Adultos Jóvenes'],
            phrase: 'Enfoque práctico y empático para el manejo de la ansiedad',
            rating: 4.9,
            sessions: 1250,
          },
          {
            id: 2,
            name: 'Dr. Carlos López',
            specialty: 'Psicólogo Organizacional',
            match: 89,
            img: 'https://randomuser.me/api/portraits/men/32.jpg',
            description: 'Experto en burnout, estrés laboral y desarrollo de habilidades de liderazgo empresarial.',
            tags: ['Burnout', 'Estrés Laboral', 'Liderazgo'],
            phrase: 'Herramientas concretas para el equilibrio trabajo-vida',
            rating: 4.8,
            sessions: 980,
          },
          {
            id: 3,
            name: 'Dra. María González',
            specialty: 'Psicóloga Familiar',
            match: 92,
            initials: 'DMG',
            description: 'Especializada en terapia de pareja, comunicación efectiva y resolución de conflictos familiares.',
            tags: ['Terapia de Pareja', 'Comunicación', 'Familias'],
            phrase: 'Construyamos relaciones más sanas y comunicación efectiva',
            rating: 4.9,
            sessions: 1450,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePsychologists();
  }, []);

  const visible = psychologists.slice(0, 3);

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  // Navegación (placeholder, no cambia el carrusel aún)
  const handlePrev = () => {};
  const handleNext = () => {};

  return (
    <section className="section-container" style={{ background: '#fcfcfd', padding: '5rem 0 4rem 0' }}>
      <div className="container" style={{ maxWidth: 1300, margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-title" style={{ fontSize: 38, fontWeight: 800, margin: 0, marginBottom: 10, letterSpacing: -1 }}>
          Conoce a nuestros <span style={{ color: '#0057FF' }}>psicólogos</span> <span style={{ background: 'linear-gradient(90deg, #0057FF 60%, #c8b6ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>expertos</span>
        </h2>
        <p className="section-subtitle" style={{ color: '#555', fontSize: 18, margin: '0 0 2.5rem 0', fontWeight: 400 }}>
          Cada profesional ha sido seleccionado por su experiencia, enfoque y capacidad de crear conexiones auténticas. Encuentra al que mejor entienda tu proceso.
        </p>
        <div className="cards-grid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          {/* Estado de carga */}
          {loading ? (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: 400,
              width: '100%'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  border: '4px solid #f3f3f3', 
                  borderTop: '4px solid #0057FF', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 16px'
                }} />
                <p style={{ color: '#6b7280' }}>Cargando psicólogos...</p>
              </div>
            </div>
          ) : error ? (
            <div style={{ 
              background: '#fee', 
              border: '1px solid #fcc', 
              borderRadius: 8, 
              padding: 16, 
              textAlign: 'center',
              color: '#c33',
              width: '100%'
            }}>
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Flecha izquierda */}
              <button onClick={handlePrev} style={{ background: '#fff', border: 'none', borderRadius: '50%', width: 38, height: 38, boxShadow: '0 2px 8px #0001', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginRight: 8 }}>
                <span style={{ fontSize: 22, color: '#bbb' }}>←</span>
              </button>
              {/* Tarjetas */}
              {visible.map((psy, i) => (
            <div key={i} className="card" style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #e3e6f0', boxShadow: '0 4px 32px #0001', padding: '2.2rem 2rem 2rem 2rem', minWidth: 370, maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', transition: 'transform 0.25s cubic-bezier(.4,2,.6,1)', cursor: 'pointer' }}>
              {/* Match */}
              <div style={{ position: 'absolute', top: 24, right: 24, background: '#e8f0ff', color: '#0057FF', fontWeight: 700, fontSize: 15, borderRadius: 16, padding: '0.2rem 1rem' }}>{psy.match}% match</div>
              {/* Foto o iniciales */}
              {psy.img ? (
                <img src={psy.img} alt={psy.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', marginBottom: 10 }} />
              ) : (
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#0057FF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, marginBottom: 10 }}>{psy.initials}</div>
              )}
              <div style={{ fontWeight: 700, fontSize: 20, textAlign: 'left' }}>{psy.name}</div>
              <div style={{ color: '#0057FF', fontWeight: 600, fontSize: 15, textAlign: 'left', marginBottom: 10 }}>{psy.specialty}</div>
              <div style={{ color: '#555', fontSize: 16, marginBottom: 10, textAlign: 'left' }}>{psy.description}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                {psy.tags.map((tag, j) => (
                  <span key={j} style={{ background: '#f2f4fa', color: '#888', borderRadius: 8, padding: '3px 12px', fontSize: 13 }}>{tag}</span>
                ))}
              </div>
              <div style={{ color: '#888', fontSize: 14, fontStyle: 'italic', marginBottom: 10, textAlign: 'left' }}>
                "{psy.phrase}"
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <span style={{ color: '#bbb', fontSize: 15, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span role="img" aria-label="sessions">👤</span> {psy.sessions} sesiones
                </span>
              </div>
            </div>
          ))}
              {/* Flecha derecha */}
              <button onClick={handleNext} style={{ background: '#fff', border: 'none', borderRadius: '50%', width: 38, height: 38, boxShadow: '0 2px 8px #0001', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: 8 }}>
                <span style={{ fontSize: 22, color: '#bbb' }}>→</span>
              </button>
            </>
          )}
        </div>
        {/* Tarjeta de búsqueda de especialista ideal */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
          <div style={{ background: '#fff', borderRadius: 24, border: '1.5px solid #e3e6f0', boxShadow: '0 4px 32px #0001', padding: '2.5rem 2rem 2.5rem 2rem', maxWidth: 600, width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
              <span style={{ fontSize: 32 }}>🔍</span>
            </div>
            <h3 style={{ fontSize: 26, fontWeight: 800, margin: 0, marginBottom: 12, color: '#222' }}>¿No encuentras tu especialista ideal?</h3>
            <p style={{ color: '#555', fontSize: 18, margin: '0 0 2.2rem 0', fontWeight: 400 }}>
              Nuestro algoritmo puede encontrar otros profesionales perfectos para ti entre nuestros psicólogos certificados.
            </p>
            <button 
              onClick={() => handleNavigation('psychologists')}
              style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 12, padding: '1rem 2.2rem', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22', display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto' }}
            >
              <span role="img" aria-label="target">🎯</span> Ver todos los especialistas
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </section>
  );
};

export default PsychologistsSection; 