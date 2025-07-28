import React from 'react';

const benefits = [
  {
    color: '#FFA726',
    bg: 'linear-gradient(120deg, #fff8f0 80%, #fff 100%)',
    icon: <span style={{ fontSize: 32 }}>🎯</span>,
    title: 'Personalización Total',
    subtitle: 'Encontramos según lo que necesitas',
    content: (
      <div style={{ background: 'linear-gradient(90deg, #fffbe6 60%, #fff6e0 100%)', borderRadius: 16, padding: '1.2rem 1rem', margin: '1.2rem 0', fontWeight: 600, fontSize: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>No somos solo un directorio</div>
        <div style={{ color: '#bfa14a', fontWeight: 400, fontSize: 15, marginBottom: 12 }}>Creamos conexiones reales basadas en ciencia</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          <div style={{ color: '#0057FF', fontWeight: 800, fontSize: 20 }}>50+<div style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>Variables analizadas</div></div>
          <div style={{ color: '#FFB300', fontWeight: 800, fontSize: 20 }}>95%<div style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>Compatibilidad</div></div>
          <div style={{ color: '#2ECC40', fontWeight: 800, fontSize: 20 }}>AI<div style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>Matching inteligente</div></div>
          <div style={{ color: '#FF7043', fontWeight: 800, fontSize: 20 }}>24/7<div style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>Disponibilidad</div></div>
        </div>
      </div>
    ),
    footer: (
      <div style={{ color: '#888', fontSize: 14, marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span role="img" aria-label="science">🧬</span> Basado en ciencia psicológica
      </div>
    ),
  },
  {
    color: '#7C4DFF',
    bg: 'linear-gradient(120deg, #f6f3ff 80%, #fff 100%)',
    icon: <span style={{ fontSize: 32 }}>🤖</span>,
    title: 'Apoyo IA 24/7',
    subtitle: 'Asistente inteligente siempre disponible',
    content: (
      <div style={{ background: 'linear-gradient(90deg, #f3f0ff 60%, #f6f3ff 100%)', borderRadius: 16, padding: '1.2rem 1rem', margin: '1.2rem 0', fontWeight: 600, fontSize: 18 }}>
        <div style={{ color: '#888', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Usuario:</div>
        <div style={{ color: '#7C4DFF', background: '#ede7f6', borderRadius: 8, padding: '0.5rem 1rem', marginBottom: 10, fontSize: 15 }}>
          "Me siento muy ansioso últimamente y no sé qué hacer"
        </div>
        <div style={{ color: '#888', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Empathica AI:</div>
        <div style={{ color: '#7C4DFF', background: '#ede7f6', borderRadius: 8, padding: '0.5rem 1rem', fontSize: 15 }}>
          "Te entiendo perfectamente. Aquí tienes técnicas de respiración que te ayudarán ahora y te conectaré con tu psicólogo especializado."
        </div>
      </div>
    ),
    footer: (
      <div style={{ color: '#888', fontSize: 14, marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span role="img" aria-label="clock">⏰</span> Respuesta instantánea las 24 horas
      </div>
    ),
  },
  {
    color: '#2ECC40',
    bg: 'linear-gradient(120deg, #eafaf2 80%, #fff 100%)',
    icon: <span style={{ fontSize: 32 }}>👤</span>,
    title: 'Contenido Personalizado',
    subtitle: 'Recursos adaptados a tu proceso',
    content: (
      <div style={{ background: 'linear-gradient(90deg, #eafaf2 60%, #f6fdf8 100%)', borderRadius: 16, padding: '1.2rem 1rem', margin: '1.2rem 0', fontWeight: 600, fontSize: 18 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>Tu Dashboard Personal</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          <div style={{ color: '#0057FF', fontWeight: 700, fontSize: 15 }}>Técnicas de Ansiedad<div style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>12 ejercicios</div></div>
          <div style={{ color: '#7C4DFF', fontWeight: 700, fontSize: 15 }}>Mindfulness<div style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>8 sesiones</div></div>
          <div style={{ color: '#43A047', fontWeight: 700, fontSize: 15 }}>Libros Recomendados<div style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>5 títulos</div></div>
          <div style={{ color: '#C8B6FF', fontWeight: 700, fontSize: 15 }}>Meditaciones<div style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>15 audios</div></div>
        </div>
      </div>
    ),
    footer: (
      <div style={{ color: '#888', fontSize: 14, marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span role="img" aria-label="update">🔄</span> Actualizado según tu progreso
      </div>
    ),
  },
];

const BenefitsSection = () => (
  <section className="section-container" style={{ background: 'linear-gradient(180deg, #f8f9fb 60%, #f3f6fd 100%)', padding: '5rem 0 4rem 0' }}>
    <div className="container" style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <span style={{ background: '#e8f0ff', color: '#0057FF', fontWeight: 600, fontSize: 16, borderRadius: 20, padding: '0.4rem 1.2rem', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span role="img" aria-label="science">🧬</span> Proceso científicamente respaldado
        </span>
      </div>
      <h2 className="section-title" style={{ fontSize: 38, fontWeight: 800, margin: 0, marginBottom: 12, letterSpacing: -1 }}>
        Cómo <span style={{ color: '#0057FF' }}>Funciona</span> <span style={{ color: '#c8b6ff' }}> </span>
      </h2>
      <p className="section-subtitle" style={{ color: '#555', fontSize: 18, margin: '0 0 2.5rem 0', fontWeight: 400 }}>
        Nuestro proceso científicamente respaldado te conecta con el profesional ideal y te acompaña en cada paso de tu bienestar emocional.
      </p>
      <div className="cards-grid" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'stretch', marginTop: 40, flexWrap: 'nowrap' }}>
        {benefits.map((benefit, i) => (
          <div
            key={i}
            className="card"
            style={{
              background: benefit.bg,
              borderRadius: 24,
              boxShadow: '0 4px 32px #0001',
              padding: '2.5rem 2rem 2rem 2rem',
              flex: '1 1 320px',
              minWidth: 320,
              maxWidth: 400,
              transition: 'transform 0.25s cubic-bezier(.4,2,.6,1)',
              cursor: 'pointer',
              border: '1.5px solid #e3e6f0',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 18, gap: 14 }}>
              <div style={{ background: benefit.color, color: '#fff', fontWeight: 700, fontSize: 20, borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #0001' }}>{benefit.icon}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: 20 }}>{benefit.title}</div>
                <div style={{ color: '#888', fontSize: 15 }}>{benefit.subtitle}</div>
              </div>
            </div>
            {benefit.content}
            {benefit.footer}
          </div>
        ))}
      </div>
      {/* Tarjetas adicionales */}
      <div className="cards-grid" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', alignItems: 'stretch', marginTop: 40, flexWrap: 'nowrap' }}>
        {/* Matching Científico */}
        <div
          className="card"
          style={{
            background: '#fff',
            borderRadius: 20,
            boxShadow: '0 4px 32px #0001',
            padding: '2.2rem 2rem 2rem 2rem',
            minWidth: 370,
            maxWidth: 420,
            border: '1.5px solid #e3e6f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s, border 0.25s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.boxShadow = '0 8px 32px #0057ff33';
            e.currentTarget.style.border = '2px solid #AEE2FF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 32px #0001';
            e.currentTarget.style.border = '1.5px solid #e3e6f0';
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 18, gap: 14 }}>
            <div style={{ background: 'linear-gradient(135deg, #a259ff 40%, #ff6f91 100%)', color: '#fff', fontWeight: 700, fontSize: 20, borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #0001' }}>
              <span style={{ fontSize: 24 }}>❤️</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: 20 }}>Matching Científico</div>
              <div style={{ color: '#888', fontSize: 15 }}>Algoritmo de emparejamiento avanzado</div>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(90deg, #f3eaff 60%, #ffe6f0 100%)', borderRadius: 16, padding: '1.2rem 1rem', margin: '1.2rem 0', fontWeight: 600, fontSize: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Compatibilidad con Dr. Ana <span style={{ color: '#a259ff', float: 'right', fontSize: 20 }}>95%</span></div>
            <div style={{ height: 8, borderRadius: 6, background: '#f3eaff', margin: '10px 0 18px 0', width: '100%', position: 'relative' }}>
              <div style={{ height: 8, borderRadius: 6, background: 'linear-gradient(90deg, #a259ff 60%, #ff6f91 100%)', width: '95%', position: 'absolute', left: 0, top: 0 }}></div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'flex-start', color: '#888', fontSize: 15 }}>
              <div>✔ Especialidad: <span style={{ color: '#a259ff' }}>Ansiedad</span></div>
              <div>✔ Enfoque: <span style={{ color: '#a259ff' }}>Cognitivo</span></div>
              <div>✔ Género: <span style={{ color: '#a259ff' }}>Preferido</span></div>
              <div>✔ Experiencia: <span style={{ color: '#a259ff' }}>8+ años</span></div>
            </div>
          </div>
          <div style={{ color: '#888', fontSize: 14, marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span role="img" aria-label="science">⚙️</span> Analiza más de 50 variables
          </div>
        </div>
        {/* Seguimiento de Progreso */}
        <div
          className="card"
          style={{
            background: '#fff',
            borderRadius: 20,
            boxShadow: '0 4px 32px #0001',
            padding: '2.2rem 2rem 2rem 2rem',
            minWidth: 370,
            maxWidth: 420,
            border: '1.5px solid #e3e6f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s, border 0.25s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.boxShadow = '0 8px 32px #0057ff33';
            e.currentTarget.style.border = '2px solid #AEE2FF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 32px #0001';
            e.currentTarget.style.border = '1.5px solid #e3e6f0';
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 18, gap: 14 }}>
            <div style={{ background: 'linear-gradient(135deg, #ff9800 40%, #ff6f91 100%)', color: '#fff', fontWeight: 700, fontSize: 20, borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #0001' }}>
              <span style={{ fontSize: 24 }}>📈</span>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: 20 }}>Seguimiento de Progreso</div>
              <div style={{ color: '#888', fontSize: 15 }}>Monitorea tu evolución continua</div>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(90deg, #fff3e6 60%, #ffe6e6 100%)', borderRadius: 16, padding: '1.2rem 1rem', margin: '1.2rem 0', fontWeight: 600, fontSize: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Tu Progreso Este Mes <span style={{ color: '#ff6f91', float: 'right', fontSize: 20 }}>+32%</span></div>
            <div style={{ margin: '10px 0 18px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: '#888', fontSize: 15, width: 140, textAlign: 'left' }}>Bienestar general</span>
                <div style={{ flex: 1, height: 8, borderRadius: 6, background: '#f3eaff', marginLeft: 10, position: 'relative' }}>
                  <div style={{ height: 8, borderRadius: 6, background: 'linear-gradient(90deg, #43e97b 60%, #38f9d7 100%)', width: '78%', position: 'absolute', left: 0, top: 0 }}></div>
                </div>
                <span style={{ color: '#43e97b', fontWeight: 700, marginLeft: 10 }}>78%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: '#888', fontSize: 15, width: 140, textAlign: 'left' }}>Manejo de ansiedad</span>
                <div style={{ flex: 1, height: 8, borderRadius: 6, background: '#e3e6f0', marginLeft: 10, position: 'relative' }}>
                  <div style={{ height: 8, borderRadius: 6, background: 'linear-gradient(90deg, #0057FF 60%, #7C4DFF 100%)', width: '65%', position: 'absolute', left: 0, top: 0 }}></div>
                </div>
                <span style={{ color: '#0057FF', fontWeight: 700, marginLeft: 10 }}>65%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#888', fontSize: 15, width: 140, textAlign: 'left' }}>Herramientas usadas</span>
                <div style={{ flex: 1, height: 8, borderRadius: 6, background: '#f3eaff', marginLeft: 10, position: 'relative' }}>
                  <div style={{ height: 8, borderRadius: 6, background: 'linear-gradient(90deg, #a259ff 60%, #ff6f91 100%)', width: '82%', position: 'absolute', left: 0, top: 0 }}></div>
                </div>
                <span style={{ color: '#a259ff', fontWeight: 700, marginLeft: 10 }}>82%</span>
              </div>
            </div>
          </div>
          <div style={{ color: '#888', fontSize: 14, marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span role="img" aria-label="update">📊</span> Reportes semanales personalizados
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BenefitsSection; 