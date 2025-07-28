import React, { useState } from 'react';
import { Home, CalendarDays, Heart, Users, LifeBuoy, User, LogOut } from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import ClientSidebar from './ClientSidebar';
import MobileDashboardNav from './MobileDashboardNav';

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

  // Datos de actividades mensuales
  const monthlyActivities = {
    sessions: { completed: 8, total: 12, percentage: 67 },
    exercises: { completed: 15, total: 20, percentage: 75 },
    readings: { completed: 6, total: 8, percentage: 75 },
    meditations: { completed: 22, total: 30, percentage: 73 },
    goals: { completed: 3, total: 5, percentage: 60 }
  };

  const activityLabels = {
    sessions: 'Sesiones',
    exercises: 'Ejercicios',
    readings: 'Lecturas',
    meditations: 'Meditaciones',
    goals: 'Metas'
  };

  const content = {
    podcasts: [
      {
        id: 1,
        type: 'Relajación',
        title: 'Mindfulness para principiantes',
        description: 'Aprende técnicas básicas de atención plena para reducir el estrés',
        author: 'Dr. Carlos Ruiz',
        duration: '25 min',
        icon: '🎧',
        externalUrl: 'https://open.spotify.com/show/example-mindfulness'
      },
      {
        id: 2,
        type: 'Ansiedad',
        title: 'Manejo del estrés diario',
        description: 'Estrategias prácticas para reducir la ansiedad en el trabajo',
        author: 'Dra. María González',
        duration: '20 min',
        icon: '🎧',
        externalUrl: 'https://www.youtube.com/watch?v=example-stress'
      },
      {
        id: 3,
        type: 'Autoestima',
        title: 'Construyendo confianza personal',
        description: 'Herramientas para mejorar tu autoestima y autoconfianza',
        author: 'Psic. Laura Torres',
        duration: '30 min',
        icon: '🎧',
        externalUrl: 'https://anchor.fm/example-confidence'
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
        icon: '📖',
        externalUrl: 'https://www.psychologytoday.com/us/blog/example-social-anxiety'
      },
      {
        id: 2,
        type: 'Bienestar',
        title: 'Hábitos matutinos para un día productivo',
        description: 'Rutinas que transformarán tu mañana y tu día completo',
        author: 'Dr. Roberto Silva',
        duration: '15 min',
        icon: '📖',
        externalUrl: 'https://medium.com/@example/morning-habits'
      },
      {
        id: 3,
        type: 'Relaciones',
        title: 'Comunicación efectiva en pareja',
        description: 'Técnicas para mejorar la comunicación y fortalecer tu relación',
        author: 'Psic. Carmen Vega',
        duration: '25 min',
        icon: '📖',
        externalUrl: 'https://www.huffpost.com/entry/example-couple-communication'
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

  // Función para abrir URLs externas
  const openExternalUrl = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f8f9fa'
    }}>
      {/* Sidebar */}
      <ClientSidebar navigationProps={navigationProps} activePage="for-you" sidebarOpen={sidebarOpen} />

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
          {/* Navegación móvil */}
          <MobileDashboardNav 
            items={[
              { icon: <Home size={20} />, label: 'Inicio', section: 'Dashboard' },
              { icon: <CalendarDays size={20} />, label: 'Citas', section: 'Appointments' },
              { icon: <Heart size={20} />, label: 'Para Ti', section: 'ForYou' },
              { icon: <User size={20} />, label: 'Mi Especialista', section: 'MySpecialist' },
              { icon: <LifeBuoy size={20} />, label: 'Soporte', section: 'Support' }
            ]}
            activeSection="ForYou"
            onSectionChange={(section) => {
              if (section === 'Dashboard') handleNavigation('client-dashboard');
              else if (section === 'Appointments') handleNavigation('appointments');
              else if (section === 'MySpecialist') handleNavigation('my-specialist');
              else if (section === 'Support') handleNavigation('support');
            }}
          />
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
              <span role="img" aria-label="chart" style={{ fontSize: 20 }}>📊</span>
              <h2 style={{
                fontSize: 20,
                fontWeight: 700,
                margin: 0,
                color: '#333'
              }}>
                Actividades del mes
              </h2>
            </div>
            
            <p style={{
              color: '#666',
              margin: '0 0 1.5rem 0',
              fontSize: 14
            }}>
              Tu progreso en las actividades de bienestar este mes
            </p>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {Object.entries(monthlyActivities).map(([key, data]) => (
                <div key={key} style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '1rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#333'
                    }}>
                      {activityLabels[key]}
                    </span>
                    <span style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#0057FF'
                    }}>
                      {data.percentage}%
                    </span>
                  </div>
                  
                  <div style={{
                    width: '100%',
                    height: 8,
                    background: '#f0f0f0',
                    borderRadius: 4,
                    overflow: 'hidden',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      width: `${data.percentage}%`,
                      height: '100%',
                      background: '#0057FF',
                      borderRadius: 4,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 12,
                    color: '#666'
                  }}>
                    <span>{data.completed} de {data.total} completadas</span>
                    <span>{data.completed}/{data.total}</span>
                  </div>
                </div>
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
                <button 
                  onClick={() => {
                    if (activeTab === 'tests') {
                      handleNavigation('questionnaire-match');
                    } else {
                      openExternalUrl(item.externalUrl);
                    }
                  }}
                  style={{
                    background: '#0057FF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: 14
                  }}
                >
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