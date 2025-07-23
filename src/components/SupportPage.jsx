import React, { useState } from 'react';

const SupportPage = ({ navigationProps }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se manejaría el envío del formulario
    console.log('Formulario enviado:', formData);
  };

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

            {/* Soporte - Activo */}
            <button
              onClick={() => handleNavigation('support')}
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

        {/* Contenido de Soporte */}
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
              Centro de Soporte
            </h1>
            <p style={{
              fontSize: 16,
              color: '#666',
              margin: 0
            }}>
              Estamos aquí para ayudarte en cada paso de tu bienestar emocional
            </p>
          </div>

          {/* Tarjetas de contacto */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Chat en vivo */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <span role="img" aria-label="chat" style={{ fontSize: 28, color: '#0057FF' }}>💬</span>
              </div>
              
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                margin: '0 0 0.5rem 0',
                color: '#333'
              }}>
                Chat en vivo
              </h3>
              
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 1.5rem 0',
                lineHeight: 1.4
              }}>
                Respuesta inmediata de nuestro equipo
              </p>
              
              <button style={{
                background: '#0057FF',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 14,
                width: '100%'
              }}>
                Iniciar chat
              </button>
            </div>

            {/* Email */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <span role="img" aria-label="email" style={{ fontSize: 28, color: '#0057FF' }}>✉️</span>
              </div>
              
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                margin: '0 0 0.5rem 0',
                color: '#333'
              }}>
                Email
              </h3>
              
              <p style={{
                fontSize: 14,
                color: '#0057FF',
                margin: '0 0 0.25rem 0',
                fontWeight: 600
              }}>
                soporte@empathica.com
              </p>
              
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 1.5rem 0'
              }}>
                Respuesta en 24 horas
              </p>
              
              <button style={{
                background: '#fff',
                color: '#0057FF',
                border: '1px solid #0057FF',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 14,
                width: '100%'
              }}>
                Enviar email
              </button>
            </div>

            {/* Teléfono */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <span role="img" aria-label="phone" style={{ fontSize: 28, color: '#0057FF' }}>📞</span>
              </div>
              
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                margin: '0 0 0.5rem 0',
                color: '#333'
              }}>
                Teléfono
              </h3>
              
              <p style={{
                fontSize: 14,
                color: '#0057FF',
                margin: '0 0 0.25rem 0',
                fontWeight: 600
              }}>
                +57 (1) 234-5678
              </p>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '1.5rem',
                fontSize: 14,
                color: '#666'
              }}>
                <span role="img" aria-label="clock" style={{ fontSize: 14 }}>🕐</span>
                Lun-Vie 8AM-6PM
              </div>
              
              <button style={{
                background: '#fff',
                color: '#0057FF',
                border: '1px solid #0057FF',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 14,
                width: '100%'
              }}>
                Llamar ahora
              </button>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.5rem'
            }}>
              <span role="img" aria-label="message" style={{ fontSize: 20, color: '#0057FF' }}>💬</span>
              <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                margin: 0,
                color: '#333'
              }}>
                Envíanos un mensaje
              </h3>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '0.5rem'
                  }}>
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: 8,
                      fontSize: 14,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333',
                    marginBottom: '0.5rem'
                  }}>
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e0e0e0',
                      borderRadius: 8,
                      fontSize: 14,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '0.5rem'
                }}>
                  Asunto
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="¿En qué podemos ayudarte?"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '0.5rem'
                }}>
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe tu consulta o problema..."
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              
              <button
                type="submit"
                style={{
                  background: '#0057FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 14,
                  width: '100%'
                }}
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 