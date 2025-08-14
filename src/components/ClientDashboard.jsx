import React, { useState, useEffect } from 'react';
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
import { userService, apiConfig } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente principal del Dashboard del Cliente/Paciente
 * Muestra la interfaz principal del usuario con métricas, información del especialista
 * y próximas citas. Incluye navegación responsive y funcionalidades de bienestar emocional.
 * 
 * @param {Object} navigationProps - Propiedades para navegación y control del sidebar
 * @param {Function} navigationProps.onNavigate - Función para cambiar de página
 * @param {Function} navigationProps.toggleSidebar - Función para mostrar/ocultar sidebar
 * @param {boolean} navigationProps.sidebarOpen - Estado de apertura del sidebar
 */
const ClientDashboard = ({ navigationProps }) => {
  const { user } = useAuth();
  
  /**
   * Estado para almacenar la información del usuario
   */
  const [userInfo, setUserInfo] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userError, setUserError] = useState('');



  /**
   * Obtiene la información del usuario desde el backend
   */
  const fetchUserInfo = async () => {
    try {
      setIsLoadingUser(true);
      setUserError('');

      const { token, userId } = apiConfig.getAuthData();
      
      if (!token || !userId) {
        throw new Error('No se encontraron datos de autenticación');
      }

      const patientData = await userService.getPatientById(userId, token);
      console.log('Información del paciente obtenida:', patientData);
      setUserInfo(patientData);

    } catch (error) {
      console.error('Error obteniendo información del usuario:', error);
      setUserError(error.message || 'Error al cargar información del usuario');
    } finally {
      setIsLoadingUser(false);
    }
  };

  /**
   * Carga la información del usuario al montar el componente
   */
  useEffect(() => {
    fetchUserInfo();
  }, []);

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

  return (
    <div className="dashboard-container" style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f8f9fa'
    }}>
      {/* ========================================
           SIDEBAR DE NAVEGACIÓN
           ======================================== */}
      <ClientSidebar navigationProps={navigationProps} activePage="client-dashboard" sidebarOpen={sidebarOpen} />

      {/* ========================================
           CONTENIDO PRINCIPAL DEL DASHBOARD
           ======================================== */}
      <div className="main-content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* ========================================
             HEADER SUPERIOR
             ======================================== */}
        <div style={{
          background: '#fff',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e0e7ef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px #0057ff0a'
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
                fontSize: 22,
                color: '#0057FF',
                padding: 4
              }}
            >
              <Menu size={28} />
            </button>
            
            {/* Título del dashboard */}
            <span style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#0057FF',
              letterSpacing: 0.2
            }}>
              Tu espacio de bienestar
            </span>
          </div>
          
          {/* Lado derecho - Icono de usuario */}
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

        {/* ========================================
             CONTENIDO DEL DASHBOARD
             ======================================== */}
        <div className="main-content" style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto'
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
            activeSection="Dashboard"
            onSectionChange={(section) => {
              if (section === 'Appointments') handleNavigation('appointments');
              else if (section === 'ForYou') handleNavigation('for-you');
              else if (section === 'MySpecialist') handleNavigation('my-specialist');
              else if (section === 'Support') handleNavigation('support');
            }}
          />
          
          {/* ========================================
               BOTÓN DE CERRAR SESIÓN MÓVIL
               ======================================== */}
          <div className="visible-mobile mobile-logout-container">
            <button 
              className="mobile-logout-button"
              onClick={() => handleNavigation('individuals')}
            >
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </div>


          
          {/* ========================================
               BANNER DE BIENVENIDA
               ======================================== */}
          <div className="dashboard-banner" style={{
            background: 'linear-gradient(135deg, #0057FF 0%, #1a237e 100%)',
            borderRadius: 16,
            padding: '2.5rem',
            color: '#fff',
            marginBottom: '2rem',
            boxShadow: '0 4px 24px #0057ff22'
          }}>
            {/* Saludo personalizado */}
            <h1 style={{
              fontSize: 32,
              fontWeight: 800,
              margin: '0 0 0.5rem 0'
            }}>
              {isLoadingUser ? (
                'Cargando información...'
              ) : userError ? (
                'Hola, ¿cómo estás hoy?'
              ) : userInfo ? (
                `Hola ${userInfo.name} ${userInfo.lastName}, ¿cómo estás hoy?`
              ) : (
                'Hola, ¿cómo estás hoy?'
              )}
            </h1>
            
            {/* Mensaje motivacional */}
            <p style={{
              fontSize: 16,
              margin: '0 0 2rem 0',
              opacity: 0.9
            }}>
              Es un nuevo día para cuidar tu bienestar emocional
            </p>

            {/* Mensaje de error si hay problemas al cargar información */}
            {userError && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: 8,
                padding: '0.75rem',
                marginBottom: '1rem',
                color: '#fff',
                fontSize: 14
              }}>
                ⚠️ {userError}
              </div>
            )}
            
            {/* ========================================
                 BOTONES DE ACCIÓN PRINCIPALES
                 ======================================== */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              '@media (min-width: 768px)': {
                flexDirection: 'row',
                gap: '16px'
              }
            }}>
              {/* Botón para realizar test de match */}
              <button
                onClick={() => handleNavigation('questionnaire-match')}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(10px)',
                  flex: 1
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <TrendingUp size={20} />
                Realizar Test de Match Perfecto
              </button>

              {/* Botón para solicitar orientación */}
              <button
                onClick={() => handleNavigation('free-orientation')}
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  border: '2px solid rgba(255, 255, 255, 0.25)',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(10px)',
                  flex: 1
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Heart size={20} />
                Solicitar Orientación
              </button>
            </div>
          </div>

          {/* ========================================
               SECCIÓN DE MÉTRICAS Y ESTADÍSTICAS
               ======================================== */}
          <div className="dashboard-metrics" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* ========================================
                 TARJETA DE CITAS REALIZADAS
                 ======================================== */}
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
              {/* Icono de calendario */}
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
              
              {/* Título de la métrica */}
              <h3 style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 0.5rem 0',
                fontWeight: 500
              }}>
                Citas realizadas
              </h3>
              
              {/* Valor numérico */}
              <div style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#0057FF',
                marginBottom: '0.5rem'
              }}>
                12
              </div>
              
              {/* Descripción del período */}
              <p style={{
                fontSize: 12,
                color: '#666',
                margin: 0
              }}>
                En los últimos 6 meses
              </p>
            </div>

            {/* ========================================
                 TARJETA DE DÍAS CONSECUTIVOS
                 ======================================== */}
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
              {/* Icono de tendencia ascendente */}
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
              
              {/* Título de la métrica */}
              <h3 style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 0.5rem 0',
                fontWeight: 500
              }}>
                Días consecutivos
              </h3>
              
              {/* Valor numérico */}
              <div style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#00C851',
                marginBottom: '0.5rem'
              }}>
                15
              </div>
              
              {/* Descripción del progreso */}
              <p style={{
                fontSize: 12,
                color: '#666',
                margin: 0
              }}>
                Trabajando en tu bienestar
              </p>
            </div>

            {/* ========================================
                 TARJETA DE PROGRESO EMOCIONAL
                 ======================================== */}
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
              {/* Icono de corazón */}
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
              
              {/* Título de la métrica */}
              <h3 style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 0.5rem 0',
                fontWeight: 500
              }}>
                Progreso emocional
              </h3>
              
              {/* Valor porcentual */}
              <div style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#ff9800',
                marginBottom: '0.5rem'
              }}>
                85%
              </div>
              
              {/* Descripción de la base del cálculo */}
              <p style={{
                fontSize: 12,
                color: '#666',
                margin: 0
              }}>
                Basado en tus sesiones
              </p>
            </div>
          </div>

          {/* ========================================
               SECCIÓN DE MI ESPECIALISTA
               ======================================== */}
          <div style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            {/* ========================================
                 TARJETA DE MI ESPECIALISTA
                 ======================================== */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px #0057ff11',
              maxWidth: '500px',
              width: '100%'
            }}>
              {/* Encabezado de la tarjeta */}
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
              
              {/* Información del especialista */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                {/* Avatar del especialista */}
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
                
                {/* Datos del especialista */}
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
              
              {/* Botón para ver perfil completo */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard; 