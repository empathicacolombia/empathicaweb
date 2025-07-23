import React from 'react';

const PsychologistDashboard = ({ navigationProps }) => {
  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  const toggleSidebar = () => {
    if (navigationProps && navigationProps.toggleSidebar) {
      navigationProps.toggleSidebar();
    }
  };

  // Usar el estado global del sidebar
  const sidebarOpen = navigationProps?.sidebarOpen ?? true;

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f8f9fa'
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '280px' : '0px',
        background: '#f5f5f5',
        borderRight: '1px solid #e0e0e0',
        transition: 'width 0.3s ease',
        overflow: 'hidden'
      }}>
        {/* Logo y título */}
        <div style={{
          padding: '2rem 1.5rem',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#0057FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>E</span>
            </div>
            {sidebarOpen && (
              <div>
                <div style={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#0057FF'
                }}>
                  Empathica
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#666',
                  marginTop: '2px'
                }}>
                  Tu bienestar emocional
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navegación */}
        <div style={{
          padding: '1.5rem'
        }}>
          {sidebarOpen && (
            <div style={{
              fontSize: 12,
              color: '#666',
              fontWeight: 600,
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Navegación
            </div>
          )}
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {/* Inicio - Activo */}
            <button
              onClick={() => handleNavigation('psychologist-dashboard')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.75rem',
                background: '#e3f2fd',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
                color: '#0057FF',
                fontWeight: 600
              }}
            >
              <span role="img" aria-label="home" style={{ fontSize: 18 }}>🏠</span>
              {sidebarOpen && <span>Inicio</span>}
            </button>

            {/* Citas */}
            <button
              onClick={() => handleNavigation('appointments')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.75rem',
                background: 'transparent',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
                color: '#666',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span role="img" aria-label="calendar" style={{ fontSize: 18 }}>📅</span>
              {sidebarOpen && <span>Citas</span>}
            </button>

            {/* For You */}
            <button
              onClick={() => handleNavigation('for-you')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.75rem',
                background: 'transparent',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
                color: '#666',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span role="img" aria-label="heart" style={{ fontSize: 18 }}>❤️</span>
              {sidebarOpen && <span>For You</span>}
            </button>

            {/* Mi Especialista */}
            <button
              onClick={() => handleNavigation('my-specialist')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.75rem',
                background: 'transparent',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
                color: '#666',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span role="img" aria-label="specialist" style={{ fontSize: 18 }}>👥</span>
              {sidebarOpen && <span>Mi Especialista</span>}
            </button>

            {/* Soporte */}
            <button
              onClick={() => handleNavigation('support')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.75rem',
                background: 'transparent',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
                color: '#666',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span role="img" aria-label="support" style={{ fontSize: 18 }}>❓</span>
              {sidebarOpen && <span>Soporte</span>}
            </button>

            {/* Mi Perfil */}
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.75rem',
                background: 'transparent',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
                color: '#666',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span role="img" aria-label="profile" style={{ fontSize: 18 }}>👤</span>
              {sidebarOpen && <span>Mi Perfil</span>}
            </button>
          </div>
        </div>

        {/* Cerrar sesión */}
        <div style={{
          marginTop: 'auto',
          padding: '1.5rem'
        }}>
          <button
            onClick={() => handleNavigation('individuals')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.75rem',
              background: 'transparent',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              width: '100%',
              color: '#ff4444',
              fontWeight: 600,
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#ffe6e6'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <span role="img" aria-label="logout" style={{ fontSize: 18 }}>🚪</span>
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header superior */}
        <div style={{
          background: '#fff',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={toggleSidebar}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 20,
                color: '#666'
              }}
            >
              ☰
            </button>
            <span style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333'
            }}>
              Tu espacio de bienestar
            </span>
          </div>
          
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#0057FF'
            }} />
          </div>
        </div>

        {/* Contenido del dashboard */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto'
        }}>
          {/* Banner de bienvenida */}
          <div style={{
            background: 'linear-gradient(135deg, #0057FF 0%, #1a237e 100%)',
            borderRadius: 16,
            padding: '2.5rem',
            color: '#fff',
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontSize: 32,
              fontWeight: 800,
              margin: '0 0 0.5rem 0'
            }}>
              Hola Chris, ¿cómo estás hoy?
            </h1>
            <p style={{
              fontSize: 16,
              margin: '0 0 2rem 0',
              opacity: 0.9
            }}>
              Es un nuevo día para cuidar tu bienestar emocional
            </p>
            
            {/* Botones de acción */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => handleNavigation('appointments')}
                style={{
                  background: '#fff',
                  color: '#0057FF',
                  border: '1px solid #fff',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Agendar cita
              </button>
              <button
                onClick={() => handleNavigation('support')}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Solicitar orientación
              </button>
            </div>
          </div>

          {/* Métricas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Citas realizadas */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                color: '#0057FF',
                fontSize: 20
              }}>
                📅
              </div>
              <h3 style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 0.5rem 0',
                fontWeight: 500
              }}>
                Citas realizadas
              </h3>
              <div style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#0057FF',
                marginBottom: '0.5rem'
              }}>
                12
              </div>
              <p style={{
                fontSize: 12,
                color: '#666',
                margin: 0
              }}>
                En los últimos 6 meses
              </p>
            </div>

            {/* Días consecutivos */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                color: '#0057FF',
                fontSize: 20
              }}>
                📈
              </div>
              <h3 style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 0.5rem 0',
                fontWeight: 500
              }}>
                Días consecutivos
              </h3>
              <div style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#00C851',
                marginBottom: '0.5rem'
              }}>
                15
              </div>
              <p style={{
                fontSize: 12,
                color: '#666',
                margin: 0
              }}>
                Trabajando en tu bienestar
              </p>
            </div>

            {/* Progreso emocional */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                color: '#0057FF',
                fontSize: 20
              }}>
                ❤️
              </div>
              <h3 style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 0.5rem 0',
                fontWeight: 500
              }}>
                Progreso emocional
              </h3>
              <div style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#ff9800',
                marginBottom: '0.5rem'
              }}>
                85%
              </div>
              <p style={{
                fontSize: 12,
                color: '#666',
                margin: 0
              }}>
                Basado en tus sesiones
              </p>
            </div>
          </div>

          {/* Secciones inferiores */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Mi Especialista */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '1.5rem'
              }}>
                <span role="img" aria-label="specialist" style={{ fontSize: 18 }}>👥</span>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: 0,
                  color: '#333'
                }}>
                  Mi Especialista
                </h3>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24
                }}>
                  👤
                </div>
                <div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#333',
                    marginBottom: '4px'
                  }}>
                    Dra. María González
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: '#666'
                  }}>
                    Psicóloga especialista en ansiedad
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleNavigation('my-specialist')}
                style={{
                  background: '#0057FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Ver perfil completo
              </button>
            </div>

            {/* Próxima Cita */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '1.5rem'
              }}>
                <span role="img" aria-label="calendar" style={{ fontSize: 18 }}>📅</span>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: 0,
                  color: '#333'
                }}>
                  Próxima Cita
                </h3>
              </div>
              
              <div style={{
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ color: '#666', fontSize: 14 }}>Fecha:</span>
                  <span style={{ fontWeight: 600, color: '#333' }}>Viernes 19 de Julio, 2024</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#666', fontSize: 14 }}>Hora:</span>
                  <span style={{ fontWeight: 600, color: '#333' }}>10:00 AM</span>
                </div>
              </div>
              
              <button
                onClick={() => handleNavigation('appointments')}
                style={{
                  background: '#0057FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Ver todas las citas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistDashboard; 