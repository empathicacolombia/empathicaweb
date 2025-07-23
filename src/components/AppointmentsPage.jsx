import React, { useState } from 'react';

const AppointmentsPage = ({ navigationProps }) => {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' o 'history'

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

  const appointments = [
    {
      id: 1,
      type: 'Sesión individual',
      date: 'jueves, 18 de julio de 2024',
      time: '10:00 AM',
      specialist: 'Dra. María González',
      status: 'Confirmada',
      statusColor: '#e8f5e8',
      statusTextColor: '#00C851'
    },
    {
      id: 2,
      type: 'Seguimiento',
      date: 'jueves, 25 de julio de 2024',
      time: '2:00 PM',
      specialist: 'Dra. María González',
      status: 'Pendiente',
      statusColor: '#fff3e0',
      statusTextColor: '#ff9800'
    }
  ];

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

            {/* Citas - Activo */}
            <button
              onClick={() => handleNavigation('appointments')}
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
              <span role="img" aria-label="calendar" style={{ fontSize: 18 }}>📅</span>
              {sidebarOpen && <span>Citas</span>}
            </button>

            {/* For You */}
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

        {/* Contenido de citas */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto'
        }}>
          {/* Header de la página */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2rem'
          }}>
            <div>
              <h1 style={{
                fontSize: 32,
                fontWeight: 800,
                margin: '0 0 0.5rem 0',
                color: '#333'
              }}>
                Mis Citas
              </h1>
              <p style={{
                fontSize: 16,
                color: '#666',
                margin: 0
              }}>
                Gestiona tus sesiones y seguimiento
              </p>
            </div>
            
            <button style={{
              background: '#0057FF',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.75rem 1.5rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: 14
            }}>
              <span style={{ fontSize: 16 }}>+</span>
              Agendar nueva cita
            </button>
          </div>

          {/* Pestañas */}
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #e0e0e0',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => setActiveTab('upcoming')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '1rem 2rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'upcoming' ? '2px solid #0057FF' : '2px solid transparent',
                color: activeTab === 'upcoming' ? '#0057FF' : '#666',
                fontWeight: activeTab === 'upcoming' ? 600 : 400,
                fontSize: 16
              }}
            >
              Próximas Citas
            </button>
            <button
              onClick={() => setActiveTab('history')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '1rem 2rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'history' ? '2px solid #0057FF' : '2px solid transparent',
                color: activeTab === 'history' ? '#0057FF' : '#666',
                fontWeight: activeTab === 'history' ? 600 : 400,
                fontSize: 16
              }}
            >
              Historial
            </button>
          </div>

          {/* Lista de citas */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {/* Información de la cita */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#333',
                    marginBottom: '0.5rem'
                  }}>
                    {appointment.type}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '2rem',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#666',
                      fontSize: 14
                    }}>
                      <span role="img" aria-label="calendar" style={{ fontSize: 16 }}>📅</span>
                      {appointment.date}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#666',
                      fontSize: 14
                    }}>
                      <span role="img" aria-label="clock" style={{ fontSize: 16 }}>🕐</span>
                      {appointment.time}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#666',
                      fontSize: 14
                    }}>
                      <span role="img" aria-label="person" style={{ fontSize: 16 }}>👤</span>
                      {appointment.specialist}
                    </div>
                  </div>
                </div>

                {/* Estado y acciones */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  {/* Estado */}
                  <div style={{
                    background: appointment.statusColor,
                    color: appointment.statusTextColor,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    {appointment.status}
                  </div>

                  {/* Botones de acción */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    <button style={{
                      background: 'transparent',
                      color: '#0057FF',
                      border: '1px solid #0057FF',
                      borderRadius: 6,
                      padding: '0.5rem 1rem',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Reagendar
                    </button>
                    <button style={{
                      background: 'transparent',
                      color: '#ff4444',
                      border: '1px solid #ff4444',
                      borderRadius: 6,
                      padding: '0.5rem 1rem',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Cancelar
                    </button>
                  </div>

                  {/* Menú de opciones */}
                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 18,
                    color: '#666',
                    padding: '0.25rem'
                  }}>
                    ⋯
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage; 