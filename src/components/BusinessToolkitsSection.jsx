import React from 'react';

const BusinessToolkitsSection = () => {
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
              background: 'linear-gradient(90deg, #0057FF 0%, #1976d2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block'
            }}>
              Toolkits
            </span>
            <span style={{
              background: 'linear-gradient(90deg, #e1bee7 0%, #f8bbd9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              marginLeft: '8px'
            }}>
              y Herramientas
            </span>
          </h2>
          <p style={{
            color: '#666',
            fontSize: 18,
            margin: 0,
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Dashboard completo con actividades, programas y herramientas de medición validadas científicamente
          </p>
        </div>

        {/* Contenido principal - Dos columnas */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          {/* Columna izquierda - Toolkit Dashboard */}
          <div style={{ flex: '1 1 400px', minWidth: 300 }}>
            <div style={{
              background: '#fff',
              borderRadius: 20,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              {/* Header del panel */}
              <div style={{
                background: '#ff9800',
                color: '#fff',
                padding: '1.5rem 2rem',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  margin: '0 0 0.5rem 0'
                }}>
                  Toolkit Dashboard
                </h3>
                <p style={{
                  fontSize: 14,
                  margin: 0,
                  opacity: 0.9
                }}>
                  Herramientas y programas disponibles
                </p>
              </div>

              {/* Contenido del panel */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Card 1 - GAD-7 (Highlighted) */}
                  <div style={{
                    background: '#e3f2fd',
                    borderRadius: 12,
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    border: '2px solid #2196f3'
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#2196f3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span role="img" aria-label="chart" style={{ fontSize: 20, color: '#fff' }}>📊</span>
                    </div>
                    <div>
                      <h4 style={{
                        fontWeight: 700,
                        fontSize: 16,
                        margin: '0 0 4px 0',
                        color: '#333'
                      }}>
                        GAD-7
                      </h4>
                      <p style={{
                        color: '#666',
                        fontSize: 13,
                        margin: 0
                      }}>
                        Evaluación de ansiedad generalizada
                      </p>
                    </div>
                  </div>

                  {/* Card 2 - PHQ-9 */}
                  <div style={{
                    background: '#fff',
                    borderRadius: 12,
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    border: '1px solid #f0f0f0'
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#ff9800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span role="img" aria-label="brain" style={{ fontSize: 20, color: '#fff' }}>🧠</span>
                    </div>
                    <div>
                      <h4 style={{
                        fontWeight: 700,
                        fontSize: 16,
                        margin: '0 0 4px 0',
                        color: '#333'
                      }}>
                        PHQ-9
                      </h4>
                      <p style={{
                        color: '#666',
                        fontSize: 13,
                        margin: 0
                      }}>
                        Cuestionario de salud del paciente
                      </p>
                    </div>
                  </div>

                  {/* Card 3 - Burnout Assessment */}
                  <div style={{
                    background: '#fff',
                    borderRadius: 12,
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    border: '1px solid #f0f0f0'
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#2196f3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span role="img" aria-label="check" style={{ fontSize: 20, color: '#fff' }}>✓</span>
                    </div>
                    <div>
                      <h4 style={{
                        fontWeight: 700,
                        fontSize: 16,
                        margin: '0 0 4px 0',
                        color: '#333'
                      }}>
                        Burnout Assessment
                      </h4>
                      <p style={{
                        color: '#666',
                        fontSize: 13,
                        margin: 0
                      }}>
                        Medición de agotamiento laboral
                      </p>
                    </div>
                  </div>

                  {/* Card 4 - Programas Wellness */}
                  <div style={{
                    background: '#fff',
                    borderRadius: 12,
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    border: '1px solid #f0f0f0'
                  }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#ff9800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span role="img" aria-label="calendar" style={{ fontSize: 20, color: '#fff' }}>📅</span>
                    </div>
                    <div>
                      <h4 style={{
                        fontWeight: 700,
                        fontSize: 16,
                        margin: '0 0 4px 0',
                        color: '#333'
                      }}>
                        Programas Wellness
                      </h4>
                      <p style={{
                        color: '#666',
                        fontSize: 13,
                        margin: 0
                      }}>
                        Actividades de bienestar estructuradas
                      </p>
                    </div>
                  </div>
                </div>

                {/* Link ver todas las herramientas */}
                <div style={{
                  textAlign: 'center',
                  marginTop: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <button 
                    onClick={() => window.location.href = '#toolkits'}
                    style={{
                      color: '#0057FF',
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Ver todas las herramientas →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Herramientas Disponibles */}
          <div style={{ flex: '1 1 600px', minWidth: 300 }}>
            <h3 style={{
              fontSize: 24,
              fontWeight: 700,
              margin: '0 0 2rem 0',
              color: '#333'
            }}>
              Herramientas Disponibles
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {/* GAD-7 */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#2196f3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="chart" style={{ fontSize: 24, color: '#fff' }}>📊</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      GAD-7
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Evaluación de ansiedad generalizada
                    </p>
                  </div>
                </div>
              </div>

              {/* PHQ-9 */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#ff9800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="brain" style={{ fontSize: 24, color: '#fff' }}>🧠</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      PHQ-9
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Cuestionario de salud del paciente
                    </p>
                  </div>
                </div>
              </div>

              {/* Burnout Assessment */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#2196f3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="check" style={{ fontSize: 24, color: '#fff' }}>✓</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Burnout Assessment
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Medición de agotamiento laboral
                    </p>
                  </div>
                </div>
              </div>

              {/* Programas Wellness */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#ff9800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="calendar" style={{ fontSize: 24, color: '#fff' }}>📅</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Programas Wellness
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Actividades de bienestar estructuradas
                    </p>
                  </div>
                </div>
              </div>

              {/* Comunicación Asertiva */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#2196f3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="message" style={{ fontSize: 24, color: '#fff' }}>💬</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Comunicación Asertiva
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Talleres de habilidades blandas
                    </p>
                  </div>
                </div>
              </div>

              {/* Mindfulness Corporativo */}
              <div style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#ff9800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="target" style={{ fontSize: 24, color: '#fff' }}>🎯</span>
                  </div>
                  <div>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Mindfulness Corporativo
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Técnicas de atención plena
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sección inferior - Personalización Total */}
        <div style={{
          background: '#fff3e0',
          borderRadius: 20,
          padding: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: 28,
            fontWeight: 700,
            margin: '0 0 1rem 0',
            color: '#e65100'
          }}>
            Personalización Total
          </h3>
          <p style={{
            color: '#333',
            fontSize: 16,
            margin: 0,
            lineHeight: 1.6,
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Cada empresa puede activar o desactivar herramientas según sus necesidades específicas. Nuestro equipo te ayuda a configurar el toolkit perfecto para tu organización.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessToolkitsSection; 