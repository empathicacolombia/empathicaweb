import React, { useState, useEffect } from 'react';
import { Home, CalendarDays, Heart, Users, LifeBuoy, User, LogOut, Calendar, X } from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import ClientSidebar from './ClientSidebar';
import AppointmentCalendarModal from './AppointmentCalendarModal';
import MobileDashboardNav from './MobileDashboardNav';
import { userService, apiConfig } from '../services/api';

/**
 * Componente de página de Citas del Cliente
 * Permite gestionar citas próximas, ver historial y agendar nuevas citas
 * Incluye pestañas para próximas citas e historial, y modal para agendar
 * 
 * @param {Object} navigationProps - Propiedades para navegación y control del sidebar
 * @param {Function} navigationProps.onNavigate - Función para cambiar de página
 * @param {Function} navigationProps.toggleSidebar - Función para mostrar/ocultar sidebar
 * @param {boolean} navigationProps.sidebarOpen - Estado de apertura del sidebar
 */
const AppointmentsPage = ({ navigationProps }) => {
  /**
   * Estado para almacenar la información del usuario desde el backend
   */
  const [userInfo, setUserInfo] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userError, setUserError] = useState('');

  /**
   * Estado para controlar la pestaña activa (próximas citas o historial)
   */
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' o 'history'
  
  /**
   * Estado para controlar la apertura del modal de agendar cita
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Estado para almacenar las citas próximas (se actualiza cuando se agenda una nueva)
   */
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  /**
   * Estado para controlar la apertura del modal de detalles de sesión
   */
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

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
      console.log('Información del paciente obtenida en citas:', patientData);
      setUserInfo(patientData);

    } catch (error) {
      console.error('Error obteniendo información del usuario en citas:', error);
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
   * Abre el modal de detalles de una sesión específica
   */
  const openSessionDetails = (session) => {
    setSelectedSession(session);
    setIsDetailsModalOpen(true);
  };

  /**
   * Cierra el modal de detalles de sesión
   */
  const closeSessionDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedSession(null);
  };

  /**
   * Maneja cuando se agenda una nueva cita
   */
  const handleAppointmentScheduled = (newAppointment) => {
    setUpcomingAppointments([newAppointment]);
  };

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
   * Datos de ejemplo de citas del historial
   * En una implementación real, estos datos vendrían del backend
   */
  const historyAppointments = [
    {
      id: 101,
      type: 'Sesión individual',
      date: 'jueves, 11 de julio de 2024',
      time: '10:00 AM',
      specialist: 'Dra. María González',
      status: 'Completada',
      statusColor: '#e8f5e8',
      statusTextColor: '#00C851'
    },
    {
      id: 102,
      type: 'Sesión de seguimiento',
      date: 'jueves, 4 de julio de 2024',
      time: '2:00 PM',
      specialist: 'Dra. María González',
      status: 'Completada',
      statusColor: '#e8f5e8',
      statusTextColor: '#00C851'
    },
    {
      id: 103,
      type: 'Sesión individual',
      date: 'jueves, 27 de junio de 2024',
      time: '11:00 AM',
      specialist: 'Dra. María González',
      status: 'Completada',
      statusColor: '#e8f5e8',
      statusTextColor: '#00C851'
    },
    {
      id: 104,
      type: 'Sesión de evaluación',
      date: 'jueves, 20 de junio de 2024',
      time: '3:00 PM',
      specialist: 'Dra. María González',
      status: 'Completada',
      statusColor: '#e8f5e8',
      statusTextColor: '#00C851'
    },
    {
      id: 105,
      type: 'Sesión individual',
      date: 'jueves, 13 de junio de 2024',
      time: '10:00 AM',
      specialist: 'Dra. María González',
      status: 'Completada',
      statusColor: '#e8f5e8',
      statusTextColor: '#00C851'
    },
    {
      id: 106,
      type: 'Sesión de seguimiento',
      date: 'jueves, 6 de junio de 2024',
      time: '2:00 PM',
      specialist: 'Dra. María González',
      status: 'Completada',
      statusColor: '#e8f5e8',
      statusTextColor: '#00C851'
    }
  ];

  // Seleccionar las citas según la pestaña activa
  const appointments = activeTab === 'upcoming' ? upcomingAppointments : historyAppointments;

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
      <ClientSidebar navigationProps={navigationProps} activePage="appointments" sidebarOpen={sidebarOpen} />

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
             CONTENIDO DE CITAS
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
            activeSection="Appointments"
            onSectionChange={(section) => {
              if (section === 'Dashboard') handleNavigation('client-dashboard');
              else if (section === 'ForYou') handleNavigation('for-you');
              else if (section === 'MySpecialist') handleNavigation('my-specialist');
              else if (section === 'Support') handleNavigation('support');
            }}
          />
          
          {/* ========================================
               HEADER CON INFORMACIÓN DEL USUARIO
               ======================================== */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2rem'
          }}>
            {/* Información del usuario */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              {/* Avatar circular */}
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #90EE90, #98FB98)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #9370DB, #FFD700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  {isLoadingUser ? '...' : userInfo ? `${userInfo.name?.charAt(0) || 'U'}${userInfo.lastName?.charAt(0) || ''}` : 'U'}
                </div>
              </div>
              
              {/* Información del usuario */}
            <div>
              <h1 style={{
                  fontSize: 28,
                  fontWeight: 700,
                  margin: '0 0 0.25rem 0',
                color: '#333'
              }}>
                  {isLoadingUser ? 'Cargando...' : userInfo ? `Hola, ${userInfo.name} ${userInfo.lastName}!` : 'Hola, Usuario!'} 👋
              </h1>
              <p style={{
                fontSize: 16,
                color: '#666',
                  margin: '0 0 0.25rem 0'
              }}>
                  Bienvenida de vuelta a tu portal de bienestar mental
              </p>
              </div>
            </div>
            
            {/* Botón verde para agendar nueva cita */}
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                background: '#22C55E',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '0.875rem 1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: 14,
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
              }}
            >
              <Calendar size={16} />
              Agendar Nueva Cita
            </button>
          </div>

          {/* ========================================
               PESTAÑAS DE NAVEGACIÓN
               ======================================== */}
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #e0e0e0',
            marginBottom: '2rem'
          }}>
            {/* Pestaña de próximas citas */}
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
            
            {/* Pestaña de historial */}
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

          {/* ========================================
               SECCIÓN PRINCIPAL DE CITAS
               ======================================== */}
          <div style={{
            background: '#f8f9fa',
            borderRadius: 20,
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid #e9ecef'
          }}>
            {activeTab === 'upcoming' && upcomingAppointments.length === 0 ? (
              /* ========================================
                   ESTADO: NO HAY CITAS PROGRAMADAS
                   ======================================== */
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem'
              }}>
                {/* Icono de calendario vacío */}
                <div style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: '#e9ecef',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <div style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Calendar size={40} color="#6c757d" />
                    <X 
                      size={20} 
                      color="#dc3545" 
                      style={{
                        position: 'absolute',
                        top: -5,
                        right: -5
                      }}
                    />
                  </div>
                </div>
                
                {/* Texto principal */}
                <h2 style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#495057',
                  margin: '0 0 0.5rem 0'
                }}>
                  No hay citas programadas
                </h2>
                
                {/* Texto secundario */}
                <p style={{
                  fontSize: 16,
                  color: '#6c757d',
                  margin: '0 0 2rem 0'
                }}>
                  Agenda tu próxima cita para comenzar tu sesión
                </p>
              </div>
            ) : activeTab === 'upcoming' && upcomingAppointments.length > 0 ? (
              /* ========================================
                   ESTADO: PRÓXIMA SESIÓN VIRTUAL
                   ======================================== */
              <div>
                {/* Tarjeta principal de próxima sesión */}
                <div style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '2rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e0e0e0'
                }}>
                  {/* Header de la sesión */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    {/* Icono de reloj */}
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: '#E3F2FD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#1976D2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ fontSize: 12, color: 'white', fontWeight: 'bold' }}>🕐</span>
                      </div>
                    </div>
                    
                    {/* Título y tiempo */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#1565C0',
                        margin: '0 0 0.25rem 0'
                      }}>
                        Próxima Sesión
                      </h3>
                      <p style={{
                        fontSize: 16,
                        color: '#1976D2',
                        margin: 0,
                        fontWeight: 500
                      }}>
                        14:00 • 1 hora
                      </p>
                    </div>
                  </div>

                  {/* Tipo de sesión y tags */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#666',
                      fontSize: 14
                    }}>
                      <span style={{ fontSize: 16 }}>👤</span>
                      Sesión de seguimiento
                    </div>
                    
                    {/* Tags de temas */}
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      {['Ansiedad', 'Estrés laboral', 'Mindfulness'].map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#f8f9fa',
                            color: '#666',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: 12,
                            fontWeight: 500,
                            border: '1px solid #e0e0e0'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Verificación técnica */}
                  <div style={{
                    background: '#f8f9fa',
                    borderRadius: 12,
                    padding: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.75rem',
                      color: '#666',
                      fontSize: 14
                    }}>
                      <span style={{ fontSize: 16 }}>ℹ️</span>
                      Verificación técnica recomendada:
                    </div>
                    
                    {/* Lista de verificaciones */}
                    <div style={{
                      display: 'flex',
                      gap: '1.5rem'
                    }}>
                      {[
                        { icon: '📹', label: 'Cámara' },
                        { icon: '🎤', label: 'Micrófono' },
                        { icon: '🎧', label: 'Audio' }
                      ].map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#666',
                            fontSize: 14
                          }}
                        >
                          <span style={{ fontSize: 16 }}>{item.icon}</span>
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botón de unirse */}
                  <div style={{
                    background: '#f8f9fa',
                    borderRadius: 12,
                    padding: '1rem',
                    textAlign: 'center',
                    border: '1px solid #e0e0e0'
                  }}>
                    <button
                      style={{
                        background: 'transparent',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        color: '#666',
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      <span style={{ fontSize: 18 }}>▶️</span>
                      Unirse
                    </button>
                    <p style={{
                      fontSize: 12,
                      color: '#999',
                      margin: '0.5rem 0 0 0'
                    }}>
                      Podrás unirte 15 minutos antes de la sesión
                    </p>
                  </div>
                </div>

                {/* Información adicional */}
                <div style={{
                  display: 'flex',
                  gap: '2rem',
                  marginTop: '1rem',
                  padding: '0 0.5rem'
                }}>
                  <div>
                    <p style={{
                      fontSize: 14,
                      color: '#333',
                      margin: '0 0 0.25rem 0',
                      fontWeight: 600
                    }}>
                      Modalidad:
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: '#666',
                      margin: 0
                    }}>
                      Virtual
                    </p>
                  </div>
                  
                  <div>
                    <p style={{
                      fontSize: 14,
                      color: '#333',
                      margin: '0 0 0.25rem 0',
                      fontWeight: 600
                    }}>
                      Duración:
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: '#666',
                      margin: 0
                    }}>
                      1 hora
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* ========================================
                   ESTADO: HISTORIAL DE CITAS
                   ======================================== */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
                {historyAppointments.map((appointment) => (
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

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
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

                      <button 
                        onClick={() => openSessionDetails(appointment)}
                        style={{
                      background: 'transparent',
                      color: '#0057FF',
                      border: '1px solid #0057FF',
                      borderRadius: 6,
                      padding: '0.5rem 1rem',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                        }}
                      >
                        Ver detalles
                  </button>
                </div>
              </div>
            ))}
              </div>
            )}
            
            {/* ========================================
                 BOTÓN AGENDAR NUEVA CITA (AL FINAL)
                 ======================================== */}
            <div style={{
              textAlign: 'center',
              marginTop: '2rem'
            }}>
              <button 
                onClick={() => setIsModalOpen(true)}
                style={{
                  background: '#fff',
                  color: '#0057FF',
                  border: '2px solid #0057FF',
                  borderRadius: 12,
                  padding: '0.875rem 2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 14,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#0057FF';
                  e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#fff';
                  e.target.style.color = '#0057FF';
                }}
              >
                <Calendar size={16} />
                Agendar Nueva Cita
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* ========================================
           MODAL DE CALENDARIO PARA AGENDAR CITA
           ======================================== */}
      <AppointmentCalendarModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAppointmentScheduled={handleAppointmentScheduled}
      />

      {/* ========================================
           MODAL DE DETALLES DE SESIÓN
           ======================================== */}
      {isDetailsModalOpen && selectedSession && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 20,
            maxWidth: 800,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            {/* Header del modal */}
            <div style={{
              padding: '2rem 2rem 1rem 2rem',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h2 style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#333',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Historial de Notas Médicas
                  </h2>
                  
                  
                  
                  {/* Tags de áreas clave */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {['Ansiedad', 'Estrés laboral', 'Mindfulness'].map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#E3F2FD',
                          color: '#1976D2',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: 12,
                          fontWeight: 600
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Total de sesiones */}
                <div style={{
                  textAlign: 'center',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: 12,
                  border: '1px solid #e0e0e0'
                }}>
                  <p style={{
                    fontSize: 14,
                    color: '#666',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Total de Sesiones
                  </p>
                  <p style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: '#1976D2',
                    margin: 0
                  }}>
                    12
                  </p>
                </div>
              </div>
            </div>

            {/* Contenido del modal */}
            <div style={{ padding: '2rem' }}>
              {/* Estado actual */}
              <div style={{
                background: '#fff',
                borderRadius: 12,
                padding: '1.5rem',
                border: '1px solid #e0e0e0',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#333',
                  margin: '0 0 1rem 0'
                }}>
                  Estado Actual
                </h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <p style={{
                    fontSize: 16,
                    color: '#666',
                    margin: 0
                  }}>
                    Puntuación promedio: 72/100
                  </p>
                  <span style={{
                    background: '#FFF3CD',
                    color: '#856404',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: 14,
                    fontWeight: 600
                  }}>
                    Bueno
                  </span>
                </div>
              </div>

              {/* Detalles de la sesión específica */}
              <div style={{
                background: '#fff',
                borderRadius: 12,
                padding: '1.5rem',
                border: '1px solid #e0e0e0'
              }}>
                {/* Header de la sesión */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontSize: 18 }}>📅</span>
                      <h4 style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: '#333',
                        margin: 0
                      }}>
                        Sesión del {selectedSession.date}
                      </h4>
                    </div>
                    <p style={{
                      fontSize: 14,
                      color: '#666',
                      margin: 0
                    }}>
                      Evaluación de 3 áreas terapéuticas
                    </p>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#333'
                    }}>
                      Puntuación 72/100
                    </span>
                    <span style={{ fontSize: 16 }}>⬇️</span>
                  </div>
                </div>

                {/* Evaluación por áreas */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: 16 }}>📈</span>
                    <h5 style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#333',
                      margin: 0
                    }}>
                      Evaluación por Áreas
                    </h5>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    {[
                      { name: 'Ansiedad', score: 65, status: 'Bueno' },
                      { name: 'Estrés laboral', score: 72, status: 'Bueno' },
                      { name: 'Mindfulness', score: 78, status: 'Bueno' }
                    ].map((area, index) => (
                      <div
                        key={index}
                        style={{
                          background: '#f8f9fa',
                          borderRadius: 8,
                          padding: '1rem',
                          border: '1px solid #e0e0e0'
                        }}
                      >
                        <h6 style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#333',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {area.name}
                        </h6>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{
                    fontSize: 18,
                            fontWeight: 700,
                            color: '#FF9800'
                          }}>
                            {area.score}
                          </span>
                          <span style={{
                            background: '#FFF3CD',
                            color: '#856404',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: 12,
                            fontWeight: 600
                          }}>
                            {area.status}
                          </span>
                        </div>
                        {/* Estrellas */}
                        <div style={{
                          display: 'flex',
                          gap: '2px'
                        }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              style={{
                                fontSize: 14,
                                color: star <= 3 ? '#FFD700' : '#e0e0e0'
                              }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notas de la sesión */}
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: 16 }}>📄</span>
                    <h5 style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#333',
                      margin: 0
                    }}>
                      Notas de la Sesión
                    </h5>
                  </div>
                  <p style={{
                    fontSize: 14,
                    color: '#666',
                    lineHeight: 1.6,
                    margin: 0,
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: 8,
                    border: '1px solid #e0e0e0'
                  }}>
                    Progreso notable en técnicas de respiración. Continúa con episodios ocasionales de ansiedad, pero ha mejorado significativamente en el manejo del estrés laboral. Se recomienda continuar con las prácticas de mindfulness diarias y mantener la frecuencia de sesiones actual.
                  </p>
                </div>
              </div>
            </div>

            {/* Botón de cerrar */}
            <div style={{
              padding: '1rem 2rem 2rem 2rem',
              textAlign: 'center'
            }}>
              <button
                onClick={closeSessionDetails}
                style={{
                  background: '#0057FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.75rem 2rem',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage; 