import React from 'react';
import brochurePdf from '../assets/brochure empathica.pdf';

const BusinessHeroSection = ({ navigationProps }) => {
  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = brochurePdf;
    link.download = 'brochure-empathica.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section className="section-container" style={{ 
      background: 'linear-gradient(120deg, #f8f9fb 0%, #f3f6fd 100%)', 
      minHeight: '90vh', 
      padding: '5rem 0 6rem 0' 
    }}>
      <div className="container hero-container" style={{ 
        maxWidth: 1300, 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'stretch', 
        justifyContent: 'space-between', 
        gap: '4rem' 
      }}>
        {/* Columna izquierda */}
        <div className="hero-content" style={{ 
          flex: 1, 
          minWidth: 340, 
          marginRight: '2rem', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center' 
        }}>
          {/* Tag superior */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-start', 
            marginBottom: 24 
          }}>
            <span style={{ 
              background: '#fff3e0', 
              color: '#ff9800', 
              fontWeight: 600, 
              fontSize: 14, 
              borderRadius: 20, 
              padding: '0.4rem 1rem', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: 8 
            }}>
              <span role="img" aria-label="house">🏠</span> Para Recursos Humanos y Líderes
            </span>
          </div>

          {/* Headline principal */}
          <h1 style={{ 
            fontSize: 56, 
            fontWeight: 800, 
            margin: 0, 
            lineHeight: 1.1, 
            marginBottom: 24, 
            textAlign: 'left' 
          }}>
            <span style={{ color: '#0057FF' }}>Bienestar emocional</span><br />
            <span style={{ color: '#666' }}>para tu equipo.</span><br />
            <span style={{ 
              background: 'linear-gradient(90deg, #ff9800 0%, #ff6f00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
              display: 'inline-block',
            }}>
              Sin suposiciones. Con ciencia.
            </span>
          </h1>

          {/* Descripción */}
          <p style={{ 
            fontSize: 18, 
            margin: '1.5rem 0 2rem 0', 
            color: '#555', 
            lineHeight: 1.6, 
            textAlign: 'left' 
          }}>
            Acompañamos a empresas con tecnología, psicología y datos reales. Cada colaborador recibe atención personalizada porque generalizar ya no funciona.
          </p>

          {/* Tarjetas de características */}
          <div className="cards-grid" style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            marginBottom: '2.5rem' 
          }}>
            <div className="card" style={{ 
              background: '#fff', 
              borderRadius: 16, 
              padding: '1.2rem 1.5rem', 
              boxShadow: '0 2px 12px #0001',
              border: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 10, 
                background: '#fff3e0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span role="img" aria-label="brain" style={{ fontSize: 20 }}>🧠</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#333' }}>IA + Psicología</div>
                <div style={{ fontSize: 12, color: '#666' }}>Match emocional dinámico</div>
              </div>
            </div>

            <div className="card" style={{ 
              background: '#fff', 
              borderRadius: 16, 
              padding: '1.2rem 1.5rem', 
              boxShadow: '0 2px 12px #0001',
              border: '1px solid #f0f0f0',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 10, 
                background: '#e3f2fd', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span role="img" aria-label="chart" style={{ fontSize: 20 }}>📊</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#333' }}>Datos reales</div>
                <div style={{ fontSize: 12, color: '#666' }}>Métricas y dashboards</div>
              </div>
            </div>
          </div>

          {/* Botones CTA */}
          <div className="hero-buttons" style={{ 
            display: 'flex', 
            gap: '1.2rem', 
            marginBottom: '2rem', 
            alignItems: 'center' 
          }}>
            <button
              style={{ 
                background: '#ff9800', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 12, 
                padding: '0.9rem 2rem', 
                fontWeight: 700, 
                fontSize: 16, 
                cursor: 'pointer', 
                boxShadow: '0 2px 8px #ff980022',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
              onClick={() => navigationProps && navigationProps.onNavigate && navigationProps.onNavigate('business-demo-dashboard')}
            >
              Ver demo <span style={{ fontSize: 18 }}>→</span>
            </button>
            <button 
              onClick={handleDownloadBrochure}
              style={{ 
                background: '#fff', 
                color: '#0057FF', 
                border: '2px solid #0057FF', 
                borderRadius: 12, 
                padding: '0.9rem 2rem', 
                fontWeight: 700, 
                fontSize: 16, 
                cursor: 'pointer' 
              }}
            >
              Descargar brochure
            </button>
          </div>

          {/* Indicadores de confianza */}
          <div style={{ 
            color: '#666', 
            fontSize: 14, 
            marginTop: '1rem' 
          }}>
            <div style={{ marginBottom: 8 }}>Empresas que ya confían en nosotros:</div>
            <div style={{ 
              display: 'flex', 
              gap: '2rem', 
              alignItems: 'center' 
            }}>
              <span style={{ fontWeight: 600 }}>+12,000 usuarios</span>
              <span style={{ fontWeight: 600 }}>98% satisfacción</span>
              <span style={{ fontWeight: 600 }}>24/7 disponible</span>
            </div>
          </div>
        </div>

        {/* Columna derecha: Match Emocional Dinámico - Fijo */}
        <div className="hero-card" style={{ 
          flex: 1, 
          minWidth: 340, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ 
            background: '#fff', 
            borderRadius: 24, 
            boxShadow: '0 4px 24px #0002', 
            padding: '2.5rem', 
            width: 420, 
            maxWidth: '100%'
          }}>
            <h3 style={{ 
              fontWeight: 700, 
              fontSize: 20, 
              margin: '0 0 1.5rem 0', 
              color: '#333',
              textAlign: 'center' 
            }}>
              Match Emocional Dinámico
            </h3>

            {/* Card del empleado - Fijo */}
            <div style={{ 
              background: '#fff5f5', 
              borderRadius: 16, 
              padding: '1.5rem', 
              marginBottom: '1rem',
              position: 'relative'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 12 
              }}>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '50%', 
                  background: '#0057FF', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 700, 
                  fontSize: 18 
                }}>
                  JR
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                    Juan Ramírez
                  </div>
                  <div style={{ 
                    color: '#0057FF', 
                    fontWeight: 600, 
                    fontSize: 14, 
                    marginBottom: 8 
                  }}>
                    Vendedor
                  </div>
                  <div style={{ 
                    color: '#666', 
                    fontSize: 14, 
                    fontStyle: 'italic' 
                  }}>
                    "Ya no sé si soy bueno y estoy hecho para esto"
                  </div>
                </div>
              </div>
              {/* Dots indicadores */}
              <div style={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                display: 'flex', 
                gap: 4 
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff4444' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbb33' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00C851' }} />
              </div>
            </div>

            {/* Icono separador */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              margin: '1rem 0' 
            }}>
              <div style={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                background: '#0057FF', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <span role="img" aria-label="heart" style={{ fontSize: 16, color: '#fff' }}>❤️</span>
              </div>
            </div>

            {/* Card del psicólogo - Fijo */}
            <div style={{ 
              background: '#f0fff4', 
              borderRadius: 16, 
              padding: '1.5rem' 
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 12 
              }}>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '50%', 
                  background: '#00C851', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 700, 
                  fontSize: 18 
                }}>
                  Dr
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
                    Psicólogo Coach
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: 8, 
                    marginBottom: 8,
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ 
                      background: '#e8f5e8', 
                      color: '#00C851', 
                      borderRadius: 8, 
                      padding: '2px 8px', 
                      fontSize: 12, 
                      fontWeight: 600 
                    }}>
                      Coach Empresarial
                    </span>
                    <span style={{ 
                      background: '#fff3e0', 
                      color: '#ff9800', 
                      borderRadius: 8, 
                      padding: '2px 8px', 
                      fontSize: 12, 
                      fontWeight: 600 
                    }}>
                      Subir Autoestima
                    </span>
                  </div>
                  <div style={{ 
                    color: '#666', 
                    fontSize: 14 
                  }}>
                    Especialista en refuerzo de confianza
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

export default BusinessHeroSection; 