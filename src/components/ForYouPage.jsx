import React, { useState } from 'react';
import { Home, CalendarDays, Heart, Users, LifeBuoy, User, LogOut } from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import ClientSidebar from './ClientSidebar';
import MobileDashboardNav from './MobileDashboardNav';

/**
 * Componente de página "For You" - Contenido Personalizado
 * Muestra contenido personalizado para el bienestar emocional del usuario
 * Incluye actividades mensuales, podcasts, artículos y tests recomendados
 * 
 * @param {Object} navigationProps - Propiedades para navegación y control del sidebar
 * @param {Function} navigationProps.onNavigate - Función para cambiar de página
 * @param {Function} navigationProps.toggleSidebar - Función para mostrar/ocultar sidebar
 * @param {boolean} navigationProps.sidebarOpen - Estado de apertura del sidebar
 */
const ForYouPage = ({ navigationProps }) => {
  /**
   * Estado para controlar la pestaña activa de contenido
   */
  const [activeTab, setActiveTab] = useState('podcasts'); // 'podcasts', 'articles'
  
  /**
   * Estado para el estado de ánimo seleccionado (funcionalidad futura)
   */
  const [selectedMood, setSelectedMood] = useState(null);

  /**
   * Maneja la navegación entre diferentes páginas de la aplicación
   * @param {string} page - Nombre de la página a la que navegar
   */
  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  /**
   * Alterna la visibilidad del sidebar (colapsar/expandir)
   */
  const toggleSidebar = () => {
    if (navigationProps && navigationProps.toggleSidebar) {
      navigationProps.toggleSidebar();
    }
  };

  // Usar el estado global del sidebar
  const sidebarOpen = navigationProps?.sidebarOpen ?? true;

  /**
   * Datos de actividades mensuales del usuario
   * En una implementación real, estos datos vendrían del backend
   */
  const monthlyActivities = {
    sessions: { completed: 8, total: 12, percentage: 67 },
    exercises: { completed: 15, total: 20, percentage: 75 },
    readings: { completed: 6, total: 8, percentage: 75 },
    meditations: { completed: 22, total: 30, percentage: 73 },
    goals: { completed: 3, total: 5, percentage: 60 }
  };

  /**
   * Etiquetas en español para las actividades
   */
  const activityLabels = {
    sessions: 'Sesiones',
    exercises: 'Ejercicios',
    readings: 'Lecturas',
    meditations: 'Meditaciones',
    goals: 'Metas'
  };

  /**
   * Contenido personalizado organizado por categorías
   * En una implementación real, este contenido se generaría dinámicamente
   */
  const content = {
    podcasts: [
      {
        id: 1,
        type: 'Psicología Clínica',
        title: 'Psicología al Desnudo',
        description: 'Un podcast con un enfoque clínico y profundo sobre temas como la ansiedad, las relaciones y la construcción de una autoestima sana.',
        author: 'Psi Mammoliti',
        duration: '30-40 min',
        icon: '🎧',
        externalUrl: 'https://open.spotify.com/show/1TDJJoHWEq7Nbh3yEBOJOj'
      },
      {
        id: 2,
        type: 'Meditación y Mindfulness',
        title: 'Meditada',
        description: 'Hola! Soy Luis. Meditada es un lugar de Meditación Guiada y Mindfulness. Un espacio seguro en el que evadirse, dormir, relajarse y liberarse de la ansiedad y el estrés.',
        author: 'Luis',
        duration: '15-30 min',
        icon: '🎧',
        externalUrl: 'https://open.spotify.com/show/4TmUpG1YdJMa4aAnp9s21F'
      },

    ],
    articles: [
      {
        id: 1,
        type: 'Ansiedad Social',
        title: 'Trastorno de ansiedad social (fobia social) - Mayo Clinic',
        description: 'Este artículo es muy completo. Explica los síntomas, las causas y, lo más importante, ofrece una guía detallada sobre el tratamiento, incluyendo remedios caseros, estrategias de afrontamiento y cuándo buscar ayuda profesional.',
        author: 'Mayo Clinic',
        duration: '20 min',
        icon: '📖',
        externalUrl: 'https://www.mayoclinic.org/es/diseases-conditions/social-anxiety-disorder/diagnosis-treatment/drc-20353567'
      },
      {
        id: 2,
        type: 'Ansiedad Social',
        title: 'Cómo Superar la Ansiedad Social Efectivamente - Bupa Salud',
        description: 'Un recurso práctico que se enfoca en técnicas concretas como reconocer y cuestionar pensamientos negativos, practicar la aceptación, técnicas de relajación y la exposición gradual a situaciones sociales.',
        author: 'Bupa Salud',
        duration: '15 min',
        icon: '📖',
        externalUrl: 'https://www.bupasalud.com.mx/salud/superar-ansiedad-social'
      },
      {
        id: 3,
        type: 'Ansiedad Social',
        title: '12 Formas poderosas para superar la ansiedad social - Psychology Today',
        description: 'Ofrece una docena de estrategias prácticas y respaldadas por la psicología para manejar y superar la ansiedad social, incluyendo el desafío a pensamientos negativos y la práctica de la atención plena (mindfulness).',
        author: 'Psychology Today',
        duration: '25 min',
        icon: '📖',
        externalUrl: 'https://www.psychologytoday.com/mx/blog/12-formas-poderosas-para-superar-la-ansiedad-social'
      }
    ]
  };

  /**
   * Función para abrir URLs externas en una nueva pestaña
   * @param {string} url - URL a abrir
   */
  const openExternalUrl = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#f8f9fa',
      overflow: 'hidden'
    }}>
      {/* ========================================
           SIDEBAR DE NAVEGACIÓN
           ======================================== */}
      <ClientSidebar navigationProps={navigationProps} activePage="for-you" sidebarOpen={sidebarOpen} />

      {/* ========================================
           CONTENIDO PRINCIPAL
           ======================================== */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* ========================================
             HEADER SUPERIOR
             ======================================== */}
        <div style={{
          background: '#fff',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Lado izquierdo - Botón de menú y título */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {/* Botón para alternar sidebar */}
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
            
            {/* Título del dashboard */}
            <span style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333'
            }}>
              Tu espacio de bienestar
            </span>
          </div>
          
          {/* Lado derecho - Avatar del usuario */}
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

        {/* ========================================
             CONTENIDO DE FOR YOU
             ======================================== */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          {/* ========================================
               NAVEGACIÓN MÓVIL
               ======================================== */}
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
          
          {/* ========================================
               HEADER DE LA PÁGINA
               ======================================== */}
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

          {/* ========================================
               SECCIÓN DE ACTIVIDADES MENSUALES
               ======================================== */}
          <div style={{
            background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)',
            borderRadius: 16,
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Encabezado de la sección */}
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
            
            {/* Descripción */}
            <p style={{
              color: '#666',
              margin: '0 0 1.5rem 0',
              fontSize: 14
            }}>
              Tu progreso en las actividades de bienestar este mes
            </p>
            
            {/* Lista de actividades con barras de progreso */}
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
                  {/* Encabezado de la actividad */}
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
                  
                  {/* Barra de progreso */}
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
                  
                  {/* Detalles de completado */}
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

          {/* ========================================
               PESTAÑAS DE CONTENIDO
               ======================================== */}
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #e0e0e0',
            marginBottom: '2rem'
          }}>
            {/* Pestaña de podcasts */}
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
            
            {/* Pestaña de artículos */}
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
          </div>

          {/* ========================================
               CONTENIDO DE LAS PESTAÑAS
               ======================================== */}
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
                {/* Botón de bookmark */}
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

                {/* Etiqueta del tipo de contenido */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  <span style={{
                    background: '#d7ccc8',
                    color: '#5d4037',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {item.type}
                  </span>
                </div>

                {/* Título del contenido */}
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 700,
                  margin: '0 0 0.5rem 0',
                  color: '#333'
                }}>
                  {item.title}
                </h3>

                {/* Descripción del contenido */}
                <p style={{
                  color: '#666',
                  fontSize: 14,
                  margin: '0 0 1rem 0',
                  lineHeight: 1.5
                }}>
                  {item.description}
                </p>

                {/* Autor y duración para podcasts y artículos */}
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

                {/* Botón de acción principal */}
                <button 
                  onClick={() => openExternalUrl(item.externalUrl)}
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
                  {activeTab === 'podcasts' ? 'Escuchar ahora' : 'Leer ahora'}
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