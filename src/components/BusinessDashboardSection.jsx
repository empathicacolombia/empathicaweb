import React from 'react';

const BusinessDashboardSection = () => {
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
              Dashboard
            </span>
            <span style={{
              color: '#9e9e9e',
              display: 'inline-block',
              marginLeft: '8px'
            }}>
              para RH
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
            Visualiza el bienestar de tu equipo con datos precisos y toma decisiones informadas
          </p>
        </div>

        {/* Contenido principal - Dos columnas */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}>
          {/* Panel izquierdo - Panel de Bienestar por Áreas */}
          <div style={{ flex: '1 1 500px', minWidth: 300 }}>
            <div style={{
              background: '#fff',
              borderRadius: 20,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              {/* Header del panel */}
              <div style={{
                background: '#1a237e',
                color: '#fff',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  margin: 0
                }}>
                  Panel de Bienestar por Áreas
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '4px'
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff' }} />
                </div>
              </div>

              {/* Contenido del panel */}
              <div style={{ padding: '2rem' }}>
                {/* Estado por Áreas */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    margin: '0 0 1rem 0',
                    color: '#333'
                  }}>
                    Estado por Áreas
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {/* Ventas */}
                    <div style={{
                      background: '#ffebee',
                      borderRadius: 12,
                      padding: '1rem 1.2rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontWeight: 600, color: '#333' }}>Ventas</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f44336' }} />
                        <span style={{ fontSize: 14, color: '#f44336', fontWeight: 600 }}>Alto riesgo</span>
                      </div>
                    </div>

                    {/* Marketing */}
                    <div style={{
                      background: '#fff8e1',
                      borderRadius: 12,
                      padding: '1rem 1.2rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontWeight: 600, color: '#333' }}>Marketing</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff9800' }} />
                        <span style={{ fontSize: 14, color: '#ff9800', fontWeight: 600 }}>Moderado</span>
                      </div>
                    </div>

                    {/* Producto */}
                    <div style={{
                      background: '#e8f5e8',
                      borderRadius: 12,
                      padding: '1rem 1.2rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontWeight: 600, color: '#333' }}>Producto</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4caf50' }} />
                        <span style={{ fontSize: 14, color: '#4caf50', fontWeight: 600 }}>Estable</span>
                      </div>
                    </div>

                    {/* C-Level */}
                    <div style={{
                      background: '#fff3e0',
                      borderRadius: 12,
                      padding: '1rem 1.2rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontWeight: 600, color: '#333' }}>C-Level</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff9800' }} />
                        <span style={{ fontSize: 14, color: '#ff9800', fontWeight: 600 }}>Observación</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Engagement del Equipo */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    margin: '0 0 1rem 0',
                    color: '#333'
                  }}>
                    Engagement del Equipo
                  </h4>
                  
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: 14, color: '#666' }}>Sesiones activas</span>
                  </div>
                  
                  <div style={{
                    background: '#f5f5f5',
                    borderRadius: 8,
                    height: 12,
                    position: 'relative',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      background: '#0057FF',
                      borderRadius: 8,
                      height: '100%',
                      width: '79%' // 142/180 ≈ 79%
                    }} />
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 14, color: '#666', fontWeight: 600 }}>142/180</span>
                  </div>
                </div>

                {/* Top 3 Motivos de Consulta */}
                <div>
                  <h4 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    margin: '0 0 1rem 0',
                    color: '#333'
                  }}>
                    Top 3 Motivos de Consulta
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0'
                    }}>
                      <span style={{ fontSize: 14, color: '#333' }}>Estrés laboral</span>
                      <span style={{ fontSize: 14, color: '#0057FF', fontWeight: 600 }}>34%</span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0'
                    }}>
                      <span style={{ fontSize: 14, color: '#333' }}>Ansiedad</span>
                      <span style={{ fontSize: 14, color: '#0057FF', fontWeight: 600 }}>28%</span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0'
                    }}>
                      <span style={{ fontSize: 14, color: '#333' }}>Conflictos interpersonales</span>
                      <span style={{ fontSize: 14, color: '#0057FF', fontWeight: 600 }}>22%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel derecho - Sugerencias con IA */}
          <div style={{ flex: '1 1 500px', minWidth: 300 }}>
            <h3 style={{
              fontSize: 24,
              fontWeight: 700,
              margin: '0 0 2rem 0',
              color: '#333'
            }}>
              Sugerencias con IA
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Área de Ventas */}
              <div style={{
                background: '#fff3e0',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
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
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Área de Ventas
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: '0 0 12px 0',
                      lineHeight: 1.5
                    }}>
                      Se recomienda implementar pausas activas en área de ventas. Detectamos 40% más estrés que el promedio.
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{ color: '#ff9800', fontSize: 12 }}>▲</span>
                      <span style={{
                        color: '#ff9800',
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        Prioridad Alta
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Área Administrativa */}
              <div style={{
                background: '#e3f2fd',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
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
                    <span role="img" aria-label="person" style={{ fontSize: 24, color: '#fff' }}>👤</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Área Administrativa
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: '0 0 12px 0',
                      lineHeight: 1.5
                    }}>
                      Comunicación no violenta: tendencia de necesidad en área administrativa. Sugerimos taller grupal.
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{ color: '#2196f3', fontSize: 12 }}>↗</span>
                      <span style={{
                        color: '#2196f3',
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        Oportunidad de Mejora
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logros del Mes */}
              <div style={{
                background: '#e8f5e8',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: '#4caf50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span role="img" aria-label="chart" style={{ fontSize: 24, color: '#fff' }}>📊</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Logros del Mes
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: '0 0 12px 0',
                      lineHeight: 1.5
                    }}>
                      El área de TI mostró 25% de mejora en bienestar. Continuar con el programa actual.
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{ color: '#4caf50', fontSize: 12 }}>↗</span>
                      <span style={{
                        color: '#4caf50',
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        En buen camino
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacidad y Ética */}
              <div style={{
                background: '#f5f5f5',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)'
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
                    <span role="img" aria-label="shield" style={{ fontSize: 24, color: '#fff' }}>🛡️</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontWeight: 700,
                      fontSize: 18,
                      margin: '0 0 8px 0',
                      color: '#333'
                    }}>
                      Privacidad y Ética
                    </h4>
                    <p style={{
                      color: '#666',
                      fontSize: 14,
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      Toda la información es anónima. Solo se muestran tendencias generales para mejorar el clima emocional de tu empresa.
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

export default BusinessDashboardSection; 