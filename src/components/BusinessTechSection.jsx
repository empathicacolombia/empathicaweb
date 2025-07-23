import React from 'react';

const BusinessTechSection = () => {
  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)', 
      padding: '5rem 0 4rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Gradientes circulares de fondo */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(100, 181, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(100, 181, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Tag superior */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '2rem' 
        }}>
          <span style={{ 
            background: '#1a237e', 
            color: '#fff', 
            fontWeight: 600, 
            fontSize: 14, 
            borderRadius: 20, 
            padding: '0.5rem 1.2rem', 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 8,
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <span role="img" aria-label="gear" style={{ fontSize: 16 }}>⚙️</span> Inteligencia Artificial
          </span>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: 42, 
            fontWeight: 800, 
            margin: 0, 
            marginBottom: '1.5rem', 
            letterSpacing: -1,
            lineHeight: 1.2
          }}>
            <span style={{
              background: 'linear-gradient(90deg, #64b5f6 0%, #1976d2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>
              Tecnología
            </span>
            <span style={{
              color: '#e1bee7',
              display: 'inline-block',
              marginLeft: '8px'
            }}>
              que entiende
            </span>
            <span style={{
              background: 'linear-gradient(90deg, #e1bee7 0%, #f5f5dc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              marginLeft: '8px'
            }}>
              emociones
            </span>
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
            Empathica usa inteligencia artificial avanzada para analizar y comprender el bienestar de tu equipo
          </p>
        </div>

        {/* Contenido principal - Dos columnas */}
        <div style={{ 
          display: 'flex', 
          gap: '3rem', 
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}>
          {/* Columna izquierda - Nuestro algoritmo analiza */}
          <div style={{ flex: '1 1 500px', minWidth: 300 }}>
            <h3 style={{ 
              fontSize: 24, 
              fontWeight: 700, 
              margin: '0 0 2rem 0', 
              color: '#fff'
            }}>
              Nuestro algoritmo analiza:
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Card 1 - Estado emocional */}
              <div style={{ 
                background: 'rgba(26, 35, 126, 0.8)', 
                borderRadius: 16, 
                padding: '1.5rem', 
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: '#fff', 
                    border: '2px solid #ff9800',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="brain" style={{ fontSize: 24, color: '#ff9800' }}>🧠</span>
                  </div>
                  <div>
                    <h4 style={{ 
                      fontWeight: 700, 
                      fontSize: 18, 
                      margin: '0 0 8px 0', 
                      color: '#fff' 
                    }}>
                      Estado emocional
                    </h4>
                    <p style={{ 
                      color: '#e3f2fd', 
                      fontSize: 15, 
                      margin: 0, 
                      lineHeight: 1.5 
                    }}>
                      Análisis profundo del bienestar actual de cada colaborador
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Compatibilidad terapéutica */}
              <div style={{ 
                background: 'rgba(26, 35, 126, 0.8)', 
                borderRadius: 16, 
                padding: '1.5rem', 
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: '#fff', 
                    border: '2px solid #ff9800',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8" stroke="#ff9800" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="5" stroke="#ff9800" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="1" fill="#ff9800"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ 
                      fontWeight: 700, 
                      fontSize: 18, 
                      margin: '0 0 8px 0', 
                      color: '#fff' 
                    }}>
                      Compatibilidad terapéutica
                    </h4>
                    <p style={{ 
                      color: '#e3f2fd', 
                      fontSize: 15, 
                      margin: 0, 
                      lineHeight: 1.5 
                    }}>
                      Match perfecto entre persona y especialista
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Riesgos psicológicos ocultos */}
              <div style={{ 
                background: 'rgba(26, 35, 126, 0.8)', 
                borderRadius: 16, 
                padding: '1.5rem', 
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: '#fff', 
                    border: '2px solid #ff9800',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="warning" style={{ fontSize: 24, color: '#ff9800' }}>⚠️</span>
                  </div>
                  <div>
                    <h4 style={{ 
                      fontWeight: 700, 
                      fontSize: 18, 
                      margin: '0 0 8px 0', 
                      color: '#fff' 
                    }}>
                      Riesgos psicológicos ocultos
                    </h4>
                    <p style={{ 
                      color: '#e3f2fd', 
                      fontSize: 15, 
                      margin: 0, 
                      lineHeight: 1.5 
                    }}>
                      Detección temprana de problemas antes de que escalen
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4 - +15 variables analizadas */}
              <div style={{ 
                background: 'rgba(26, 35, 126, 0.8)', 
                borderRadius: 16, 
                padding: '1.5rem', 
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: 12, 
                    background: '#fff', 
                    border: '2px solid #ff9800',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="database" style={{ fontSize: 24, color: '#ff9800' }}>📊</span>
                  </div>
                  <div>
                    <h4 style={{ 
                      fontWeight: 700, 
                      fontSize: 18, 
                      margin: '0 0 8px 0', 
                      color: '#fff' 
                    }}>
                      +15 variables analizadas
                    </h4>
                    <p style={{ 
                      color: '#e3f2fd', 
                      fontSize: 15, 
                      margin: 0, 
                      lineHeight: 1.5 
                    }}>
                      Consideramos variables psicológicas, de estilo de vida, preferencias de comunicación y mucho más para crear el match perfecto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Proceso de IA en tiempo real */}
          <div style={{ 
            flex: '1 1 400px', 
            minWidth: 300,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(26, 35, 126, 0.9) 0%, rgba(103, 58, 183, 0.8) 100%)', 
              borderRadius: 20, 
              padding: '2rem', 
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              width: '100%',
              maxWidth: 450
            }}>
              {/* Icono de engranaje en la esquina superior derecha */}
              <div style={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                width: 32, 
                height: 32, 
                borderRadius: 8, 
                background: 'rgba(255, 255, 255, 0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}>
                <span role="img" aria-label="gear" style={{ fontSize: 16, color: '#ff9800' }}>⚙️</span>
              </div>

              {/* Icono de cerebro en la esquina inferior izquierda */}
              <div style={{ 
                position: 'absolute', 
                bottom: 16, 
                left: 16, 
                width: 32, 
                height: 32, 
                borderRadius: 8, 
                background: 'rgba(255, 255, 255, 0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}>
                <span role="img" aria-label="brain" style={{ fontSize: 16, color: '#ff9800' }}>🧠</span>
              </div>

              <h3 style={{ 
                fontSize: 22, 
                fontWeight: 700, 
                margin: '0 0 2rem 0', 
                color: '#fff',
                textAlign: 'center'
              }}>
                Proceso de IA en tiempo real
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {/* Paso 1 - Azul */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                  background: 'rgba(33, 150, 243, 0.3)',
                  borderRadius: 8,
                  padding: '0.8rem 1rem'
                }}>
                  <div style={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    background: '#2196f3',
                    flexShrink: 0
                  }} />
                  <span style={{ 
                    color: '#fff', 
                    fontSize: 16, 
                    fontWeight: 500 
                  }}>
                    Analizando estado emocional...
                  </span>
                </div>

                {/* Paso 2 - Naranja */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                  background: 'rgba(255, 152, 0, 0.3)',
                  borderRadius: 8,
                  padding: '0.8rem 1rem'
                }}>
                  <div style={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    background: '#ff9800',
                    flexShrink: 0
                  }} />
                  <span style={{ 
                    color: '#fff', 
                    fontSize: 16, 
                    fontWeight: 500 
                  }}>
                    Evaluando compatibilidad terapéutica...
                  </span>
                </div>

                {/* Paso 3 - Verde */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                  background: 'rgba(76, 175, 80, 0.3)',
                  borderRadius: 8,
                  padding: '0.8rem 1rem'
                }}>
                  <div style={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    background: '#4caf50',
                    flexShrink: 0
                  }} />
                  <span style={{ 
                    color: '#fff', 
                    fontSize: 16, 
                    fontWeight: 500 
                  }}>
                    Match encontrado: 98% compatibilidad
                  </span>
                </div>

                {/* Paso 4 - Azul oscuro/púrpura */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                  background: 'rgba(26, 35, 126, 0.4)',
                  borderRadius: 8,
                  padding: '0.8rem 1rem'
                }}>
                  <div style={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: '50%', 
                    background: '#ff9800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="chart" style={{ fontSize: 8, color: '#fff' }}>📊</span>
                  </div>
                  <span style={{ 
                    color: '#fff', 
                    fontSize: 16, 
                    fontWeight: 500 
                  }}>
                    Algoritmo funcionando 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessTechSection; 