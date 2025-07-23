import React from 'react';

const BusinessBenefitsSection = () => {
  return (
    <section style={{
      background: '#fff',
      padding: '5rem 0 4rem 0'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 2rem'
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
              Beneficios para
            </span>
            <span style={{
              background: 'linear-gradient(90deg, #e1bee7 0%, #f8bbd9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              marginLeft: '8px'
            }}>
              todos
            </span>
          </h2>
        </div>

        {/* Contenido principal - Dos columnas */}
        <div style={{
          display: 'flex',
          gap: '4rem',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* Columna izquierda - Para Colaboradores */}
          <div style={{ flex: '1 1 400px', minWidth: 300, maxWidth: 500 }}>
            <h3 style={{
              fontSize: 24,
              fontWeight: 700,
              margin: '0 0 2rem 0',
              color: '#0057FF',
              textAlign: 'center'
            }}>
              Para Colaboradores
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Card 1 - Match dinámico */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '2px solid #e3f2fd'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#e3f2fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="#0057FF" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Match dinámico
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Persona correcta, no 'alguien'
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Chat 24/7 */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '2px solid #e3f2fd'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#e3f2fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#0057FF" strokeWidth="2" fill="none"/>
                      <path d="M8 9h8M8 13h6" stroke="#0057FF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Chat 24/7
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Contención rápida
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 - 3 sesiones/mes */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '2px solid #e3f2fd'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#e3f2fd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="#0057FF" strokeWidth="2" fill="none"/>
                      <polyline points="12,6 12,12 16,14" stroke="#0057FF" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      3 sesiones/mes
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Para él y su familia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Para la Empresa */}
          <div style={{ flex: '1 1 400px', minWidth: 300, maxWidth: 500 }}>
            <h3 style={{
              fontSize: 24,
              fontWeight: 700,
              margin: '0 0 2rem 0',
              color: '#ff5722',
              textAlign: 'center'
            }}>
              Para la Empresa
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Card 1 - Menos ausentismo */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '2px solid #fff3e0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#fff3e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M3 3v18h18" stroke="#ff5722" strokeWidth="2" fill="none"/>
                      <path d="M7 12l3-3 3 3 4-4" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18 8v10" stroke="#ff5722" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Menos ausentismo
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Equipos más estables
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Métricas reales */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '2px solid #fff3e0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#fff3e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M3 3v18h18" stroke="#ff5722" strokeWidth="2" fill="none"/>
                      <path d="M7 17l3-3 3 3 4-4" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="7" y="7" width="3" height="10" fill="#ff5722"/>
                      <rect x="12" y="4" width="3" height="13" fill="#ff5722"/>
                      <rect x="17" y="10" width="3" height="7" fill="#ff5722"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Métricas reales
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Decisiones con datos
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Confidencialidad */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '2px solid #fff3e0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#fff3e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#ff5722" strokeWidth="2" fill="none"/>
                      <path d="M9 12l2 2 4-4" stroke="#ff5722" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Confidencialidad
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Datos anónimos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessBenefitsSection; 