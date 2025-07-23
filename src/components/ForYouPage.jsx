import React, { useState } from 'react';

const ForYouPage = ({ navigationProps }) => {
  const [activeTab, setActiveTab] = useState('podcasts'); // 'podcasts', 'articles', 'tests'
  const [selectedMood, setSelectedMood] = useState(null);

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

  const moods = [
    { id: 'happy', label: 'Feliz', emoji: '😊' },
    { id: 'sad', label: 'Triste', emoji: '😢' },
    { id: 'anxious', label: 'Ansioso', emoji: '😰' },
    { id: 'calm', label: 'Tranquilo', emoji: '😌' },
    { id: 'tired', label: 'Cansado', emoji: '😴' },
    { id: 'motivated', label: 'Motivado', emoji: '⭐' }
  ];

  const content = {
    podcasts: [
      {
        id: 1,
        type: 'Relajación',
        title: 'Mindfulness para principiantes',
        description: 'Aprende técnicas básicas de atención plena para reducir el estrés',
        author: 'Dr. Carlos Ruiz',
        duration: '25 min',
        icon: '🎧'
      }
    ],
    articles: [
      {
        id: 1,
        type: 'Ansiedad',
        title: 'Superando la ansiedad social',
        description: 'Estrategias prácticas para manejar situaciones sociales con confianza',
        author: 'Dra. Ana Martín',
        duration: '30 min',
        icon: '📖'
      }
    ],
    tests: [
      {
        id: 1,
        type: 'Test',
        title: '¿Cómo está tu nivel de estrés?',
        description: 'Evalúa tu estado actual y recibe recomendaciones personalizadas',
        questions: '10 preguntas',
        duration: '5 min',
        icon: '🧠'
      },
      {
        id: 2,
        type: 'Test',
        title: 'Test de bienestar emocional',
        description: 'Conoce mejor tu estado emocional y áreas de mejora',
        questions: '15 preguntas',
        duration: '8 min',
        icon: '🧠'
      }
    ]
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

            {/* For You - Activo */}
            <button
              onClick={() => handleNavigation('for-you')}
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

        {/* Contenido de For You */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto'
        }}>
          {/* Header de la página */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontSize: 32,
              fontWeight: 800,
              margin: '0 0 0.5rem 0',
              color: '#333'
            }}>
              For You
            </h1>
            <p style={{
              fontSize: 16,
              color: '#666',
              margin: 0
            }}>
              Contenido personalizado para tu bienestar emocional
            </p>
          </div>

          {/* Sección de emociones */}
          <div style={{
            background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)',
            borderRadius: 16,
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1rem'
            }}>
              <span role="img" aria-label="heart" style={{ fontSize: 20 }}>❤️</span>
              <h2 style={{
                fontSize: 20,
                fontWeight: 700,
                margin: 0,
                color: '#333'
              }}>
                ¿Cómo te sientes hoy?
              </h2>
            </div>
            
            <p style={{
              color: '#666',
              margin: '0 0 1.5rem 0',
              fontSize: 14
            }}>
              Tómate un momento para reflexionar sobre tu estado emocional
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  style={{
                    background: selectedMood === mood.id ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    minWidth: '80px',
                    transition: 'all 0.2s',
                    boxShadow: selectedMood === mood.id ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
                  }}
                >
                  <span style={{ fontSize: 24 }}>{mood.emoji}</span>
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#333'
                  }}>
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Pestañas de contenido */}
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #e0e0e0',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => setActiveTab('podcasts')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '1rem 2rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'podcasts' ? '2px solid #0057FF' : '2px solid transparent',
                color: activeTab === 'podcasts' ? '#0057FF' : '#666',
                fontWeight: activeTab === 'podcasts' ? 600 : 400,
                fontSize: 16
              }}
            >
              Podcasts
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '1rem 2rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'articles' ? '2px solid #0057FF' : '2px solid transparent',
                color: activeTab === 'articles' ? '#0057FF' : '#666',
                fontWeight: activeTab === 'articles' ? 600 : 400,
                fontSize: 16
              }}
            >
              Artículos
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '1rem 2rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'tests' ? '2px solid #0057FF' : '2px solid transparent',
                color: activeTab === 'tests' ? '#0057FF' : '#666',
                fontWeight: activeTab === 'tests' ? 600 : 400,
                fontSize: 16
              }}
            >
              Tests
            </button>
          </div>

          {/* Contenido de las pestañas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1.5rem'
          }}>
            {content[activeTab].map((item) => (
              <div
                key={item.id}
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  position: 'relative'
                }}
              >
                {/* Bookmark */}
                <button style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 18,
                  color: '#666'
                }}>
                  🔖
                </button>

                {/* Tag */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span style={{
                    background: activeTab === 'tests' ? '#ffe0b2' : '#d7ccc8',
                    color: activeTab === 'tests' ? '#e65100' : '#5d4037',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {item.type}
                  </span>
                </div>

                {/* Título */}
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: '0 0 0.5rem 0',
                  color: '#333'
                }}>
                  {item.title}
                </h3>

                {/* Descripción */}
                <p style={{
                  color: '#666',
                  fontSize: 14,
                  margin: '0 0 1rem 0',
                  lineHeight: 1.5
                }}>
                  {item.description}
                </p>

                {/* Detalles específicos para tests */}
                {activeTab === 'tests' ? (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontSize: 12,
                      color: '#666'
                    }}>
                      {item.questions}
                    </span>
                    <span style={{
                      fontSize: 12,
                      color: '#666',
                      fontWeight: 600
                    }}>
                      {item.duration}
                    </span>
                  </div>
                ) : (
                  /* Autor y duración para podcasts y artículos */
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontSize: 12,
                      color: '#666'
                    }}>
                      {item.author}
                    </span>
                    <span style={{
                      fontSize: 12,
                      color: '#666',
                      fontWeight: 600
                    }}>
                      {item.duration}
                    </span>
                  </div>
                )}

                {/* Botón de acción */}
                <button style={{
                  background: '#0057FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  width: '100%',
                  fontSize: 14
                }}>
                  {activeTab === 'podcasts' ? 'Escuchar ahora' : 
                   activeTab === 'articles' ? 'Leer ahora' : 
                   'Comenzar test'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYouPage; 