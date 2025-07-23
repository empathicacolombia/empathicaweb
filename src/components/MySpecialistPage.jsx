import React from 'react';

const MySpecialistPage = ({ navigationProps }) => {
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
            {/* Inicio */}
            <button
              onClick={() => handleNavigation('psychologist-dashboard')}
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

            {/* Mi Especialista - Activo */}
            <button
              onClick={() => handleNavigation('my-specialist')}
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

        {/* Contenido de Mi Especialista */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto'
        }}>
          {/* Header de la página */}
          <div style={{
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontSize: 32,
              fontWeight: 800,
              margin: '0 0 0.5rem 0',
              color: '#333'
            }}>
              Mi Especialista
            </h1>
            <p style={{
              fontSize: 16,
              color: '#666',
              margin: 0
            }}>
              Tu acompañante en el proceso de bienestar emocional
            </p>
          </div>

          {/* Tarjeta del especialista */}
          <div style={{
            background: '#0057FF',
            borderRadius: 16,
            padding: '2rem',
            marginBottom: '2rem',
            color: '#fff',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.5rem'
            }}>
              {/* Foto de perfil */}
              <div style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: '#fff',
                border: '4px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{
                  fontSize: 48,
                  color: '#0057FF'
                }}>👩‍⚕️</span>
              </div>

              {/* Información del especialista */}
              <div style={{ flex: 1 }}>
                <h2 style={{
                  fontSize: 28,
                  fontWeight: 700,
                  margin: '0 0 0.5rem 0',
                  color: '#fff'
                }}>
                  Dra. María González
                </h2>
                
                <p style={{
                  fontSize: 18,
                  color: 'rgba(255, 255, 255, 0.9)',
                  margin: '0 0 1rem 0',
                  fontWeight: 500
                }}>
                  Psicóloga Clínica
                </p>

                {/* Calificación */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: 20 }}>⭐</span>
                  <span style={{
                    fontSize: 18,
                    fontWeight: 700
                  }}>
                    4.9
                  </span>
                  <span style={{
                    fontSize: 14,
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    (127 reseñas)
                  </span>
                </div>

                {/* Cita */}
                <p style={{
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontStyle: 'italic',
                  margin: '0 0 1.5rem 0'
                }}>
                  "Te ayudo a encontrar equilibrio desde la empatía y comprensión profunda de tus necesidades emocionales."
                </p>

                {/* Botón */}
                <button style={{
                  background: '#fff',
                  color: '#0057FF',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span role="img" aria-label="calendar" style={{ fontSize: 16 }}>📅</span>
                  Agendar cita
                </button>
              </div>
            </div>
          </div>

          {/* Secciones de información */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Formación Académica */}
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
                marginBottom: '1rem'
              }}>
                <span role="img" aria-label="graduation" style={{ fontSize: 20 }}>🎓</span>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: 0,
                  color: '#333'
                }}>
                  Formación Académica
                </h3>
              </div>
              
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: 14,
                  color: '#666'
                }}>
                  Doctorado en Psicología Clínica - Universidad Nacional
                </li>
                <li style={{
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: 14,
                  color: '#666'
                }}>
                  Maestría en Terapia Cognitivo-Conductual - Universidad Javeriana
                </li>
                <li style={{
                  padding: '0.5rem 0',
                  fontSize: 14,
                  color: '#666'
                }}>
                  Especialización en Trastornos de Ansiedad
                </li>
              </ul>
            </div>

            {/* Información Personal */}
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
                marginBottom: '1rem'
              }}>
                <span role="img" aria-label="person" style={{ fontSize: 20 }}>👤</span>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: 0,
                  color: '#333'
                }}>
                  Información Personal
                </h3>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 14,
                  color: '#666'
                }}>
                  <span>Edad:</span>
                  <span style={{ fontWeight: 600, color: '#333' }}>35 años</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 14,
                  color: '#666'
                }}>
                  <span>Experiencia:</span>
                  <span style={{ fontWeight: 600, color: '#333' }}>8 años</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 14,
                  color: '#666'
                }}>
                  <span>Enfoque:</span>
                  <span style={{
                    background: '#0057FF',
                    color: '#fff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    Terapia Cognitivo-Conductual
                  </span>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 14,
                  color: '#666'
                }}>
                  <span>Ubicación:</span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 600,
                    color: '#333'
                  }}>
                    <span role="img" aria-label="location" style={{ fontSize: 14 }}>📍</span>
                    Bogotá, Colombia
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Próxima Disponibilidad */}
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span role="img" aria-label="clock" style={{ fontSize: 20 }}>🕐</span>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: 0,
                  color: '#333'
                }}>
                  Próxima Disponibilidad
                </h3>
              </div>
              
              <div style={{
                marginLeft: '2rem'
              }}>
                <div style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '0.25rem'
                }}>
                  Mañana a las 2:00 PM
                </div>
                <div style={{
                  fontSize: 14,
                  color: '#666'
                }}>
                  Sesión de 50 minutos disponible
                </div>
              </div>
            </div>
            
            <button style={{
              background: '#0057FF',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.75rem 1.5rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14
            }}>
              Reservar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySpecialistPage; 