import React from 'react';
import {
  Home,
  CalendarDays,
  Heart,
  Users,
  LifeBuoy,
  User,
  LogOut,
  Menu,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Smile,
} from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import ClientSidebar from './ClientSidebar';
import MobileDashboardNav from './MobileDashboardNav';

const ClientDashboard = ({ navigationProps }) => {
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
    <div className="dashboard-container" style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f8f9fa'
    }}>
      {/* Sidebar */}
      <ClientSidebar navigationProps={navigationProps} activePage="client-dashboard" sidebarOpen={sidebarOpen} />

      {/* Contenido principal */}
      <div className="main-content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header superior */}
        <div style={{
          background: '#fff',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e0e7ef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px #0057ff0a'
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
                fontSize: 22,
                color: '#0057FF',
                padding: 4
              }}
            >
              <Menu size={28} />
            </button>
            <span style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#0057FF',
              letterSpacing: 0.2
            }}>
              Tu espacio de bienestar
            </span>
          </div>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: '#f0f4ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px #0057ff11'
          }}>
            <User color="#0057FF" size={24} />
          </div>
        </div>

        {/* Contenido del dashboard */}
        <div className="main-content" style={{
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
            activeSection="Dashboard"
            onSectionChange={(section) => {
              if (section === 'Appointments') handleNavigation('appointments');
              else if (section === 'ForYou') handleNavigation('for-you');
              else if (section === 'MySpecialist') handleNavigation('my-specialist');
              else if (section === 'Support') handleNavigation('support');
            }}
          />
          
          {/* Botón de cerrar sesión móvil */}
          <div className="visible-mobile mobile-logout-container">
            <button 
              className="mobile-logout-button"
              onClick={() => handleNavigation('individuals')}
            >
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </div>
          
          {/* Banner de bienvenida */}
          <div className="dashboard-banner" style={{
            background: 'linear-gradient(135deg, #0057FF 0%, #1a237e 100%)',
            borderRadius: 16,
            padding: '2.5rem',
            color: '#fff',
            marginBottom: '2rem',
            boxShadow: '0 4px 24px #0057ff22'
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
            {/* Botones removidos - se accede desde el menú lateral */}
          </div>

          {/* Métricas */}
          <div className="dashboard-metrics" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Citas realizadas */}
            <div className="dashboard-metric-card" style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px #0057ff11',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 16px #0057ff22';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px #0057ff11';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                color: '#0057FF',
                background: '#e3f2fd',
                borderRadius: 8,
                padding: 6
              }}>
                <CalendarDays size={20} />
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
              boxShadow: '0 2px 8px #0057ff11',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 16px #0057ff22';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px #0057ff11';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                color: '#00C851',
                background: '#eaffef',
                borderRadius: 8,
                padding: 6
              }}>
                <TrendingUp size={20} />
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
              boxShadow: '0 2px 8px #0057ff11',
              position: 'relative',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 16px #0057ff22';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px #0057ff11';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                color: '#ff9800',
                background: '#fffbe6',
                borderRadius: 8,
                padding: 6
              }}>
                <Heart size={20} />
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
              boxShadow: '0 2px 8px #0057ff11'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '1.5rem'
              }}>
                <Users size={18} color="#0057FF" />
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
                  background: '#f0f4ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24
                }}>
                  <User color="#0057FF" size={32} />
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
                  fontWeight: 700,
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
              boxShadow: '0 2px 8px #0057ff11'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '1.5rem'
              }}>
                <CalendarDays size={18} color="#0057FF" />
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
                  fontWeight: 700,
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

export default ClientDashboard; 