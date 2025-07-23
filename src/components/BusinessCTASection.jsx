import React from 'react';

const BusinessCTASection = () => {
  return (
    <section style={{
      background: '#0057FF',
      padding: '5rem 0 4rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Formas circulares abstractas de fondo */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(110, 168, 254, 0.2) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(200, 182, 255, 0.2) 0%, transparent 70%)',
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
            letterSpacing: -1,
            color: '#fff'
          }}>
            ¿Listo para transformar el{' '}
            <span style={{
              background: 'linear-gradient(90deg, #6ea8fe 0%, #c8b6ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>
              bienestar
            </span>{' '}
            de tu equipo?
          </h2>
          <p style={{
            color: '#fff',
            fontSize: 18,
            margin: 0,
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Agenda una demo personalizada y descubre cómo Empathica puede revolucionar la cultura de bienestar en tu organización.
          </p>
        </div>

        {/* Contenido principal - Dos bloques */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          alignItems: 'stretch',
          flexWrap: 'wrap',
          marginBottom: '4rem'
        }}>
          {/* Bloque izquierdo - Solicita tu demo gratuita */}
          <div style={{
            background: '#fff',
            borderRadius: 20,
            padding: '2.5rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            flex: '1 1 500px',
            minWidth: 300
          }}>
            <h3 style={{
              fontSize: 24,
              fontWeight: 700,
              margin: '0 0 1.5rem 0',
              color: '#333'
            }}>
              Solicita tu demo gratuita
            </h3>
            
            <p style={{
              color: '#666',
              fontSize: 16,
              margin: '0 0 2rem 0',
              lineHeight: 1.6
            }}>
              En 30 minutos te mostramos cómo funciona nuestro sistema y cómo puede adaptarse a las necesidades específicas de tu empresa.
            </p>

            {/* Lista de beneficios */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff9800' }} />
                <span style={{ color: '#333', fontSize: 16 }}>Demo personalizada de 30 minutos</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff9800' }} />
                <span style={{ color: '#333', fontSize: 16 }}>Análisis de necesidades sin costo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff9800' }} />
                <span style={{ color: '#333', fontSize: 16 }}>Propuesta de implementación personalizada</span>
              </div>
            </div>

            {/* Botones */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button style={{
                background: '#ff9800',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '1rem 2rem',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 2px 8px rgba(255, 152, 0, 0.3)'
              }}>
                Agendar demo ahora →
              </button>
              <button style={{
                background: '#fff',
                color: '#0057FF',
                border: '2px solid #0057FF',
                borderRadius: 12,
                padding: '1rem 2rem',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer'
              }}>
                Descargar brochure
              </button>
            </div>
          </div>

          {/* Bloque derecho - Contacto directo */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 20,
            padding: '2.5rem',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            flex: '1 1 400px',
            minWidth: 300
          }}>
            <h3 style={{
              fontSize: 24,
              fontWeight: 700,
              margin: '0 0 2rem 0',
              color: '#fff'
            }}>
              Contacto directo
            </h3>

            {/* Información de contacto */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1.5rem' }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#0057FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3z" stroke="#fff" strokeWidth="2" fill="none"/>
                    <path d="M2 3l8 6 8-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: '4px' }}>Email</div>
                  <div style={{ color: '#fff', fontSize: 16 }}>empresas@empathica.com.co</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: '1.5rem' }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#0057FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M18 2l-4 4-4-4M18 18l-4-4-4 4M2 6h16M2 14h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: '4px' }}>Teléfono</div>
                  <div style={{ color: '#fff', fontSize: 16 }}>+57 (1) 234-5678</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#0057FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path d="M3 7h14v10H3z" stroke="#fff" strokeWidth="2" fill="none"/>
                    <path d="M7 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="#fff" strokeWidth="2" fill="none"/>
                    <path d="M8 11h4M8 13h4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: '4px' }}>Oficinas</div>
                  <div style={{ color: '#fff', fontSize: 16 }}>Bogotá, Medellín, Cali</div>
                </div>
              </div>
            </div>

            {/* Caja de respuesta garantizada */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 12,
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: 16,
                margin: '0 0 0.5rem 0'
              }}>
                Respuesta garantizada en menos de 2 horas
              </div>
              <div style={{
                color: '#fff',
                fontSize: 14,
                opacity: 0.9
              }}>
                Nuestro equipo especializado te contactará inmediatamente
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas en la parte inferior */}
        <div style={{
          textAlign: 'center',
          color: '#fff'
        }}>
          <div style={{
            fontSize: 18,
            margin: '0 0 1.5rem 0',
            fontWeight: 500
          }}>
            Empresas que ya transformaron su cultura de bienestar:
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              fontSize: 20,
              fontWeight: 700
            }}>
              +200 Empresas
            </div>
            <div style={{
              fontSize: 20,
              fontWeight: 700
            }}>
              +15,000 Colaboradores
            </div>
            <div style={{
              fontSize: 20,
              fontWeight: 700
            }}>
              98% Satisfacción
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessCTASection; 