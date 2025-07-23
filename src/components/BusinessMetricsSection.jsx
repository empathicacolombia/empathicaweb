import React from 'react';

const BusinessMetricsSection = () => {
  return (
    <section style={{
      background: '#fff',
      padding: '5rem 0 4rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Formas circulares abstractas de fondo */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(100, 181, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 152, 0, 0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 42,
            fontWeight: 800,
            margin: 0,
            marginBottom: '1.5rem',
            letterSpacing: -1
          }}>
            <span style={{
              color: '#0057FF',
              display: 'inline-block'
            }}>
              Métricas de impacto
            </span>
            <span style={{
              color: '#ff9800',
              display: 'inline-block',
              marginLeft: '8px'
            }}>
              reales
            </span>
          </h2>
          <p style={{
            color: '#333',
            fontSize: 18,
            margin: 0,
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Resultados medibles que demuestran el valor de invertir en bienestar emocional
          </p>
        </div>

        {/* Tarjetas de métricas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {/* Tarjeta 1 - +12,000 usuarios */}
          <div style={{
            background: '#fff3e0',
            borderRadius: 20,
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#ff9800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <path d="M16 8c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" fill="#fff"/>
                <path d="M8 20c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4h-8c-2.2 0-4-1.8-4-4v-2z" fill="#fff"/>
                <path d="M24 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#fff"/>
                <path d="M26 18c0-1.1-.9-2-2-2s-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2z" fill="#fff"/>
              </svg>
            </div>
            
            <div style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#ff9800',
              margin: '0 0 0.5rem 0',
              lineHeight: 1
            }}>
              +12,000
            </div>
            
            <div style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333',
              margin: '0 0 0.5rem 0'
            }}>
              usuarios
            </div>
            
            <div style={{
              fontSize: 14,
              color: '#666',
              margin: 0
            }}>
              Colaboradores transformados
            </div>
          </div>

          {/* Tarjeta 2 - 98% de satisfacción */}
          <div style={{
            background: '#e3f2fd',
            borderRadius: 20,
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#0057FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <path d="M16 28c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z" stroke="#fff" strokeWidth="2" fill="none"/>
                <path d="M12 16l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#0057FF',
              margin: '0 0 0.5rem 0',
              lineHeight: 1
            }}>
              98%
            </div>
            
            <div style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333',
              margin: '0 0 0.5rem 0'
            }}>
              de satisfacción
            </div>
            
            <div style={{
              fontSize: 14,
              color: '#666',
              margin: 0
            }}>
              Calificación promedio
            </div>
          </div>

          {/* Tarjeta 3 - 24/7 acompañamiento */}
          <div style={{
            background: '#fff3e0',
            borderRadius: 20,
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#ff9800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" stroke="#fff" strokeWidth="2" fill="none"/>
                <polyline points="16,8 16,16 22,20" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#ff9800',
              margin: '0 0 0.5rem 0',
              lineHeight: 1
            }}>
              24/7
            </div>
            
            <div style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333',
              margin: '0 0 0.5rem 0'
            }}>
              acompañamiento
            </div>
            
            <div style={{
              fontSize: 14,
              color: '#666',
              margin: 0
            }}>
              Disponibilidad completa
            </div>
          </div>

          {/* Tarjeta 4 - 87% de mejora */}
          <div style={{
            background: '#e3f2fd',
            borderRadius: 20,
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#0057FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <path d="M4 28h24" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 20l4-4 4 4 4-4 4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 16v12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <path d="M20 16v12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            
            <div style={{
              fontSize: 48,
              fontWeight: 800,
              color: '#0057FF',
              margin: '0 0 0.5rem 0',
              lineHeight: 1
            }}>
              87%
            </div>
            
            <div style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333',
              margin: '0 0 0.5rem 0'
            }}>
              de mejora
            </div>
            
            <div style={{
              fontSize: 14,
              color: '#666',
              margin: 0
            }}>
              En síntomas después del primer mes
            </div>
          </div>
        </div>

        {/* Testimonio */}
        <div style={{
          background: '#0057FF',
          borderRadius: 20,
          padding: '3rem',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        }}>
          {/* Icono de maletín en la parte superior */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#8d6e63',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M4 6h12v10H4z" fill="#fff"/>
              <path d="M6 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#fff" strokeWidth="1.5" fill="none"/>
              <path d="M8 10h4M8 12h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <div style={{
            color: '#fff',
            maxWidth: 800,
            margin: '0 auto'
          }}>
            <p style={{
              fontSize: 20,
              lineHeight: 1.6,
              margin: '0 0 2rem 0',
              fontStyle: 'italic'
            }}>
              "Implementamos Empathica hace 8 meses. Vimos reducción del 45% en ausentismo, 60% mejora en satisfacción laboral y 30% aumento en productividad. El ROI fue evidente desde el tercer mes."
            </p>
            
            <div style={{
              fontWeight: 700,
              fontSize: 18,
              margin: '0 0 0.5rem 0'
            }}>
              Carmen Rodríguez
            </div>
            
            <div style={{
              fontSize: 16,
              opacity: 0.9
            }}>
              Directora de Talento Humano, InnovaTech
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessMetricsSection; 