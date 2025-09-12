import React, { useState, useEffect } from 'react';
import { Home, CalendarDays, Heart, Users, LifeBuoy, User, LogOut, Calendar, X } from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import ClientSidebar from './ClientSidebar';
import AppointmentCalendarModal from './AppointmentCalendarModal';
import PaymentModal from './PaymentModal';
import PsychologistScheduleModal from './PsychologistScheduleModal';
import MobileDashboardNav from './MobileDashboardNav';
import { userService, appointmentService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

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
  const { user } = useAuth();
  
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
   * Estado para controlar la apertura del modal de pago
   */
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  /**
   * Estado para controlar la apertura del modal de horario del psicólogo
   */
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

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
   * Estados para las sesiones del paciente desde el backend
   */
  const [patientSessions, setPatientSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sessionsError, setSessionsError] = useState(null);

  /**
   * Obtiene la información del usuario desde el backend
   */
  const fetchUserInfo = async () => {
    if (!user?.id) {
      setUserError('No se pudo identificar al usuario');
      setIsLoadingUser(false);
      return;
    }

    try {
      setIsLoadingUser(true);
      setUserError(null);
      const data = await userService.getPatientById(user.id);
      setUserInfo(data);
      
      // Debug: mostrar información del paciente
      console.log('Datos del paciente cargados:', data);
      console.log('Roles del paciente:', data?.roles);
      console.log('¿Es paciente Empathica?', data?.roles?.some(role => role.toLowerCase().includes('empathica')));
      console.log('¿Tiene psicólogo asignado?', !!data?.psychologist?.userId);
      console.log('Psicólogo asignado:', data?.psychologist);
      console.log('Estado del botón de agendar:', data?.psychologist?.userId ? 'Habilitado' : 'Deshabilitado');
      
    } catch (error) {
      console.error('Error obteniendo datos del paciente:', error);
      setUserError('Error al cargar los datos del paciente');
    } finally {
      setIsLoadingUser(false);
    }
  };

  /**
   * Carga la información del usuario al montar el componente
   */
  useEffect(() => {
    fetchUserInfo();
  }, [user?.id]);

  /**
   * Obtiene las sesiones del paciente desde el backend
   */
  const fetchPatientSessions = async () => {
    if (!user?.id) {
      setSessionsError('No se pudo identificar al paciente');
      return;
    }

    try {
      setLoadingSessions(true);
      setSessionsError(null);
      
      const data = await appointmentService.getPatientSessions();
      console.log('=== SESIONES DEL PACIENTE OBTENIDAS ===');
      console.log('Estructura completa:', data);
      console.log('Total elementos:', data?.totalElements);
      console.log('Contenido:', data?.content);
      console.log('Primera sesión (si existe):', data?.content?.[0]);
      console.log('========================================');
      
      if (data?.content && Array.isArray(data.content)) {
        setPatientSessions(data.content);
      } else {
        setPatientSessions([]);
      }
    } catch (error) {
      console.error('Error obteniendo sesiones del paciente:', error);
      setSessionsError('Error al cargar las sesiones');
      setPatientSessions([]);
    } finally {
      setLoadingSessions(false);
    }
  };

  // Cargar sesiones al montar el componente
  useEffect(() => {
    fetchPatientSessions();
  }, [user?.id]);

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
   * Verifica si el paciente pertenece a Empathica basado en sus roles
   * @returns {boolean} - true si pertenece a Empathica, false en caso contrario
   */
  const isEmpathicaPatient = () => {
    if (!userInfo?.roles || !Array.isArray(userInfo.roles)) {
      return false;
    }
    
    // Buscar cualquier rol que contenga "empathica" (case-insensitive)
    return userInfo.roles.some(role => 
      role.toLowerCase().includes('empathica')
    );
  };

  /**
   * Maneja el click en el botón de agendar cita
   * Verifica si el paciente tiene psicólogo asignado antes de permitir agendar
   */
  const handleScheduleAppointment = () => {
    // Verificar si tiene psicólogo asignado
    if (!userInfo?.psychologist?.userId) {
      console.log('Paciente sin psicólogo asignado - Bloqueando agendado');
      // No permitir agendar cita, mostrar mensaje de error
      setUserError('Para agendar una cita, primero necesitas seleccionar un especialista. Ve a "Mi Especialista" para encontrar tu psicólogo ideal.');
      return;
    }

    // Verificar si es paciente de Empathica para mostrar modal de pago primero
    if (isEmpathicaPatient()) {
      console.log('Paciente de Empathica - Mostrando modal de pago antes de seleccionar cita');
      // Mostrar modal de pago primero
      setIsPaymentModalOpen(true);
    } else {
      console.log('Paciente empresarial - Mostrando horario del psicólogo directamente');
      // Para pacientes empresariales, mostrar horario directamente
      setIsScheduleModalOpen(true);
    }
  };



  /**
   * Maneja la confirmación del modal de horario del psicólogo
   * Solo se usa para pacientes empresariales (los de Empathica ya pagaron)
   */
  const handleScheduleConfirm = (psychologistId, sessionDateTime) => {
    setIsScheduleModalOpen(false);
    
    // Solo pacientes empresariales llegan aquí (los de Empathica ya pagaron)
    console.log('Paciente empresarial - Creando sesión directamente');
    createSessionDirectly(psychologistId, sessionDateTime);
  };

  /**
   * Crea una sesión directamente para pacientes institucionales
   */
  const createSessionDirectly = async (psychologistId, sessionDateTime) => {
    try {
      console.log('=== DATOS ENVIADOS AL BACKEND ===');
      console.log('URL:', `/api/patients/session/${psychologistId}`);
      console.log('Payload:', { sessionTime: sessionDateTime });
      console.log('Tipo de psychologistId:', typeof psychologistId);
      console.log('Tipo de sessionDateTime:', typeof sessionDateTime);
      console.log('Valor de sessionDateTime:', sessionDateTime);
      console.log('Fecha parseada:', new Date(sessionDateTime));
      console.log('=====================================');
      
      const response = await appointmentService.createSession(psychologistId, sessionDateTime);
      console.log('Sesión creada exitosamente:', response);
      
      // Mostrar mensaje de éxito y actualizar citas
      alert('¡Sesión agendada exitosamente!');
      
      // Recargar información del usuario para mostrar la nueva cita
      fetchUserInfo();
      
    } catch (error) {
      console.error('Error creando sesión:', error);
      console.error('Detalles del error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      alert('Error al agendar la sesión. Inténtalo de nuevo.');
    }
  };

  /**
   * Maneja la confirmación del pago exitoso
   * Después del pago, muestra el modal de horario del psicólogo
   */
  const handlePaymentConfirm = () => {
    setIsPaymentLoading(true);
    
    // Cerrar modal de pago
    setTimeout(() => {
      setIsPaymentLoading(false);
      setIsPaymentModalOpen(false);
      
      // Mostrar modal de horario del psicólogo después del pago exitoso
      console.log('Pago exitoso - Mostrando horario del psicólogo');
      setIsScheduleModalOpen(true);
    }, 1000);
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
   * Procesa y formatea los datos de las sesiones del backend
   */
  const processSessions = () => {
    if (!patientSessions || patientSessions.length === 0) return [];

    return patientSessions.map(session => {
      const sessionDate = new Date(session.sessionTime);
      const now = new Date();
      
      // Determinar si la sesión es próxima (futura) o del historial (pasada)
      const isUpcoming = sessionDate > now;
      
      // Formatear fecha y hora
      const formattedDate = sessionDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      });
      
      const formattedTime = sessionDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });

      // Obtener tags del paciente desde la nueva estructura
      const patientTags = [];
      if (session.patient?.tags && Array.isArray(session.patient.tags)) {
        session.patient.tags.forEach(tag => {
          if (tag.name) patientTags.push(tag.name);
        });
      }
      
      // También incluir tags directos de la sesión si existen
      if (session.tag1) patientTags.push(session.tag1);
      if (session.tag2) patientTags.push(session.tag2);
      if (session.tag3) patientTags.push(session.tag3);

      // Mapear el estado de la sesión a texto legible
      const getStatusText = (status) => {
        switch (status) {
          case 'SCHEDULED': return 'Programada';
          case 'ATTENDED': return 'Atendida';
          case 'CANCELLED': return 'Cancelada';
          case 'NO_SHOW': return 'No asistió';
          case 'IN_PROGRESS': return 'En Proceso';
          default: return 'Programada';
        }
      };

      return {
        id: session.sessionId,
        patientName: `${session.patient?.name || 'N/A'} ${session.patient?.lastName || ''}`,
        psychologistName: `${session.psychologist?.name || 'N/A'} ${session.psychologist?.lastName || ''}`,
        psychologistEmail: session.psychologist?.email || 'N/A',
        psychologistSpecialty: session.psychologist?.specialty || 'N/A',
        psychologistPhone: session.psychologist?.phoneNumber || 'N/A',
        psychologistOneLiner: session.psychologist?.oneLiner || 'N/A',
        date: formattedDate,
        time: formattedTime,
        duration: '50 min',
        type: 'Sesión Individual',
        status: getStatusText(session.status),
        statusCode: session.status,
        location: 'Virtual',
        notes: session.notes?.length > 0 ? session.notes[0]?.note : 'Sin notas',
        tags: patientTags,
        sessionTime: session.sessionTime,
        eventId: session.eventId,
        eventUrl: session.eventUrl,
        tokensLeft: session.patient?.tokensLeft || 0,
        isUpcoming,
        session: session
      };
    });
  };

  /**
   * Filtra las sesiones según la pestaña activa
   */
  const getFilteredSessions = () => {
    const processedSessions = processSessions();
    
    if (activeTab === 'upcoming') {
      return processedSessions.filter(session => session.isUpcoming);
    } else {
      return processedSessions.filter(session => !session.isUpcoming);
    }
  };



  /**
   * Datos de ejemplo de citas del historial
   * En una implementación real, estos datos vendrían del backend
   */
  const historyAppointments = [];

  // Obtener las sesiones filtradas según la pestaña activa
  const appointments = getFilteredSessions();

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
              
              {/* Indicador del tipo de paciente */}
              {!isLoadingUser && userInfo && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}>
                  <span style={{
                    background: isEmpathicaPatient() ? '#0057FF' : '#22C55E',
                    color: '#fff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {isEmpathicaPatient() ? 'Paciente Empathica' : 'Paciente Empresarial'}
                  </span>
                  <span style={{
                    fontSize: 12,
                    color: '#666'
                  }}>
                    {isEmpathicaPatient() ? 'Pago por sesión' : 'Cobertura empresarial'}
                  </span>
                  
                  {/* Indicador de psicólogo asignado */}
                  {userInfo?.psychologist?.userId && (
                    <>
                      <span style={{
                        background: '#8B5CF6',
                        color: '#fff',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        Psicólogo Asignado
                      </span>
                      <span style={{
                        fontSize: 12,
                        color: '#666'
                      }}>
                        {userInfo.psychologist.name} {userInfo.psychologist.lastName}
                      </span>
                    </>
                  )}
                </div>
              )}
              </div>
            </div>
            
            {/* Botón para agendar nueva cita */}
            <button 
              onClick={handleScheduleAppointment}
              disabled={!userInfo?.psychologist?.userId}
              style={{
                background: userInfo?.psychologist?.userId ? '#22C55E' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '0.875rem 1.5rem',
                fontWeight: 600,
                cursor: userInfo?.psychologist?.userId ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: 14,
                boxShadow: userInfo?.psychologist?.userId ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none',
                transition: 'all 0.2s ease',
                opacity: userInfo?.psychologist?.userId ? 1 : 0.7
              }}
              onMouseEnter={(e) => {
                if (userInfo?.psychologist?.userId) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (userInfo?.psychologist?.userId) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                }
              }}
            >
              <Calendar size={16} />
              {userInfo?.psychologist?.userId ? 'Agendar Nueva Cita' : 'Selecciona un Especialista Primero'}
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
          
          {/* Estado de carga */}
          {loadingSessions && (
            <div style={{
              background: '#fff',
              borderRadius: 20,
              padding: '3rem',
              marginBottom: '2rem',
              border: '1px solid #e9ecef',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                fontSize: 16,
                color: '#666'
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  border: '3px solid #f3f3f3',
                  borderTop: '3px solid #0057FF',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Cargando sesiones...
              </div>
            </div>
          )}

          {/* Estado de error */}
          {sessionsError && !loadingSessions && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 20,
              padding: '2rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                fontSize: 16,
                color: '#dc2626',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: 20 }}>⚠️</span>
                {sessionsError}
              </div>
              <button
                onClick={fetchPatientSessions}
                style={{
                  background: '#0057FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Intentar de nuevo
              </button>
            </div>
          )}

          {/* Contenido principal de citas */}
          {!loadingSessions && !sessionsError && (
            <div style={{
              background: '#f8f9fa',
              borderRadius: 20,
              padding: '2rem',
              marginBottom: '2rem',
              border: '1px solid #e9ecef'
            }}>
            {activeTab === 'upcoming' && appointments.length === 0 ? (
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
            ) : activeTab === 'upcoming' && appointments.length > 0 ? (
              /* ========================================
                   ESTADO: PRÓXIMAS CITAS
                   ======================================== */
              <div>
                {/* Tarjeta principal de próxima sesión */}
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 20,
                  padding: '2rem',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  color: '#fff'
                }}>
                  {/* Patrón de fondo */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    transform: 'translate(50%, -50%)'
                  }} />
                  
                  {/* Contenido principal */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Header con fecha y estado */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1.5rem'
                    }}>
                      <div>
                        <div style={{
                          fontSize: 14,
                          opacity: 0.9,
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {appointments[0]?.date || 'Fecha no disponible'}
                        </div>
                        <h3 style={{
                          fontSize: 24,
                          fontWeight: 700,
                          margin: '0 0 0.5rem 0',
                          color: '#fff'
                        }}>
                          {appointments[0]?.type || 'Próxima Sesión'}
                        </h3>
                        <div style={{
                          fontSize: 16,
                          opacity: 0.9,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <span>👨‍⚕️</span>
                          Dr. {appointments[0]?.psychologistName || 'Psicólogo'}
                        </div>
                      </div>
                      
                      {/* Estado */}
                      <div style={{
                        background: appointments[0]?.statusCode === 'SCHEDULED' ? 'rgba(34, 197, 94, 0.2)' : 
                                   appointments[0]?.statusCode === 'ATTENDED' ? 'rgba(59, 130, 246, 0.2)' :
                                   appointments[0]?.statusCode === 'CANCELLED' ? 'rgba(239, 68, 68, 0.2)' :
                                   appointments[0]?.statusCode === 'NO_SHOW' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                        border: `1px solid ${appointments[0]?.statusCode === 'SCHEDULED' ? '#22c55e' : 
                                             appointments[0]?.statusCode === 'ATTENDED' ? '#3b82f6' :
                                             appointments[0]?.statusCode === 'CANCELLED' ? '#ef4444' :
                                             appointments[0]?.statusCode === 'NO_SHOW' ? '#f59e0b' : '#6b7280'}`,
                        padding: '0.5rem 1rem',
                        borderRadius: '25px',
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'uppercase'
                      }}>
                        {appointments[0]?.status || 'Programada'}
                      </div>
                    </div>

                    {/* Información de la sesión */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '1rem',
                        borderRadius: 12,
                        backdropFilter: 'blur(10px)'
                      }}>
                        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: '0.25rem' }}>HORA</div>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{appointments[0]?.time || '14:00'}</div>
                      </div>
                      
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '1rem',
                        borderRadius: 12,
                        backdropFilter: 'blur(10px)'
                      }}>
                        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: '0.25rem' }}>DURACIÓN</div>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{appointments[0]?.duration || '50 min'}</div>
                      </div>
                      
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '1rem',
                        borderRadius: 12,
                        backdropFilter: 'blur(10px)'
                      }}>
                        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: '0.25rem' }}>MODALIDAD</div>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{appointments[0]?.location || 'Virtual'}</div>
                      </div>
                    </div>

                    {/* Tags solo si existen en el backend */}
                    {appointments[0]?.tags && appointments[0].tags.length > 0 && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: '0.5rem' }}>DIAGNÓSTICOS</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {appointments[0].tags.map((tag, index) => (
                            <span
                              key={index}
                              style={{
                                background: 'rgba(255, 255, 255, 0.2)',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '15px',
                                fontSize: 12,
                                fontWeight: 500,
                                border: '1px solid rgba(255, 255, 255, 0.3)'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Botones de acción */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Botón Ver Detalles */}
                      <button
                        onClick={() => openSessionDetails(appointments[0]?.session)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.2)',
                          color: '#fff',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          borderRadius: 12,
                          padding: '0.75rem 1.5rem',
                          fontSize: 14,
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          backdropFilter: 'blur(10px)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                        }}
                      >
                        <span>👁️</span>
                        Ver Detalles
                      </button>

                      {/* Botón Entrar a Sesión */}
                      {appointments[0]?.eventUrl && (
                        <button
                          onClick={() => {
                            if (appointments[0]?.isUpcoming) {
                              window.open(appointments[0].eventUrl, '_blank');
                            }
                          }}
                          disabled={!appointments[0]?.isUpcoming}
                          style={{
                            background: appointments[0]?.isUpcoming ? 'rgba(34, 197, 94, 0.3)' : 'rgba(107, 114, 128, 0.2)',
                            color: appointments[0]?.isUpcoming ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                            border: `1px solid ${appointments[0]?.isUpcoming ? 'rgba(34, 197, 94, 0.5)' : 'rgba(107, 114, 128, 0.3)'}`,
                            borderRadius: 12,
                            padding: '0.75rem 1.5rem',
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: appointments[0]?.isUpcoming ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backdropFilter: 'blur(10px)',
                            opacity: appointments[0]?.isUpcoming ? 1 : 0.6
                          }}
                          onMouseEnter={(e) => {
                            if (appointments[0]?.isUpcoming) {
                              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.4)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (appointments[0]?.isUpcoming) {
                              e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)';
                            }
                          }}
                        >
                          <span>{appointments[0]?.isUpcoming ? '🚀' : '⏰'}</span>
                          {appointments[0]?.isUpcoming ? 'Entrar a Sesión' : 'Sesión Finalizada'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ) : activeTab === 'history' && appointments.length === 0 ? (
              /* ========================================
                   ESTADO: HISTORIAL VACÍO
                   ======================================== */
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem'
              }}>
                {/* Icono de historial vacío */}
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
                  <Calendar size={40} color="#6c757d" />
                </div>
                
                {/* Texto principal */}
                <h2 style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#495057',
                  margin: '0 0 0.5rem 0'
                }}>
                  No hay historial de citas
                </h2>
                
                {/* Texto secundario */}
                <p style={{
                  fontSize: 16,
                  color: '#6c757d',
                  margin: '0 0 2rem 0'
                }}>
                  Aquí aparecerán tus sesiones completadas
                </p>
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
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: 20,
                  padding: '2rem',
                  marginBottom: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  color: '#fff'
                }}
              >
                {/* Patrón de fondo */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '200px',
                  height: '200px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  transform: 'translate(50%, -50%)'
                }} />
                
                {/* Contenido principal */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Header con fecha y estado */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <div style={{
                        fontSize: 14,
                        opacity: 0.9,
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {appointment.date}
                      </div>
                      <h3 style={{
                        fontSize: 24,
                        fontWeight: 700,
                        margin: '0 0 0.5rem 0',
                        color: '#fff'
                      }}>
                        {appointment.type}
                      </h3>
                      <div style={{
                        fontSize: 16,
                        opacity: 0.9,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <span>👨‍⚕️</span>
                        Dr. {appointment.psychologistName}
                      </div>
                    </div>
                    
                    {/* Estado */}
                    <div style={{
                      background: appointment.statusCode === 'SCHEDULED' ? 'rgba(34, 197, 94, 0.2)' : 
                                 appointment.statusCode === 'ATTENDED' ? 'rgba(59, 130, 246, 0.2)' :
                                 appointment.statusCode === 'CANCELLED' ? 'rgba(239, 68, 68, 0.2)' :
                                 appointment.statusCode === 'NO_SHOW' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                      border: `1px solid ${appointment.statusCode === 'SCHEDULED' ? '#22c55e' : 
                                         appointment.statusCode === 'ATTENDED' ? '#3b82f6' :
                                         appointment.statusCode === 'CANCELLED' ? '#ef4444' :
                                         appointment.statusCode === 'NO_SHOW' ? '#f59e0b' : '#6b7280'}`,
                      padding: '0.5rem 1rem',
                      borderRadius: '25px',
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {appointment.status}
                    </div>
                  </div>

                  {/* Información de la sesión */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '1rem',
                      borderRadius: 12,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: '0.25rem' }}>HORA</div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{appointment.time}</div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '1rem',
                      borderRadius: 12,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: '0.25rem' }}>DURACIÓN</div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{appointment.duration}</div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '1rem',
                      borderRadius: 12,
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: '0.25rem' }}>MODALIDAD</div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{appointment.location}</div>
                    </div>
                  </div>
                  {/* Tags solo si existen en el backend */}
                  {appointment.tags && appointment.tags.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: 12, opacity: 0.8, marginBottom: '0.5rem' }}>DIAGNÓSTICOS</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {appointment.tags.map((tag, index) => (
                          <span
                            key={index}
                            style={{
                              background: 'rgba(255, 255, 255, 0.2)',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '15px',
                              fontSize: 12,
                              fontWeight: 500,
                              border: '1px solid rgba(255, 255, 255, 0.3)'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Botón Ver Detalles */}
                  <button
                    onClick={() => openSessionDetails(appointment.session)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 12,
                      padding: '0.75rem 1.5rem',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <span>👁️</span>
                    Ver Detalles
                  </button>

                  {/* Botón Entrar a Sesión */}
                  {appointment.eventUrl && (
                    <button
                      onClick={() => {
                        if (appointment.isUpcoming) {
                          window.open(appointment.eventUrl, '_blank');
                        }
                      }}
                      disabled={!appointment.isUpcoming}
                      style={{
                        background: appointment.isUpcoming ? 'rgba(34, 197, 94, 0.3)' : 'rgba(107, 114, 128, 0.2)',
                        color: appointment.isUpcoming ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                        border: `1px solid ${appointment.isUpcoming ? 'rgba(34, 197, 94, 0.5)' : 'rgba(107, 114, 128, 0.3)'}`,
                        borderRadius: 12,
                        padding: '0.75rem 1.5rem',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: appointment.isUpcoming ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backdropFilter: 'blur(10px)',
                        opacity: appointment.isUpcoming ? 1 : 0.6
                      }}
                      onMouseEnter={(e) => {
                        if (appointment.isUpcoming) {
                          e.currentTarget.style.background = 'rgba(34, 197, 94, 0.4)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (appointment.isUpcoming) {
                          e.currentTarget.style.background = 'rgba(34, 197, 94, 0.3)';
                        }
                      }}
                    >
                      <span>{appointment.isUpcoming ? '🚀' : '⏰'}</span>
                      {appointment.isUpcoming ? 'Entrar a Sesión' : 'Sesión Finalizada'}
                    </button>
                  )}
                  </div>
                </div>
              </div>
            ))}
              </div>
            )}
            </div>
          )}
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
           MODAL DE PAGO PARA PACIENTES EMPATHICA
           ======================================== */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onContinue={handlePaymentConfirm}
        isLoading={isPaymentLoading}
      />

      {/* ========================================
           MODAL DE HORARIO DEL PSICÓLOGO ASIGNADO
           ======================================== */}
      <PsychologistScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onContinue={handleScheduleConfirm}
        psychologistId={userInfo?.psychologist?.userId}
        psychologistName={userInfo?.psychologist ? `${userInfo.psychologist.name} ${userInfo.psychologist.lastName}` : 'Tu Psicólogo'}
        isEmpathicaPatient={isEmpathicaPatient()}
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