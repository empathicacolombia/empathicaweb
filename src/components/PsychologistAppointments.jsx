import React, { useState, useEffect, useRef } from 'react';
import { Plus, Calendar, Clock, User, MapPin, Phone, Mail, CheckCircle, XCircle, AlertCircle, Edit, Trash, Save, CheckSquare, Square, Play, Check, Pause, Square as StopIcon } from 'lucide-react';
import { appointmentService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

/**
 * Pestañas disponibles para filtrar citas
 * Permite ver citas próximas o del día actual
 */
const tabs = ['Próximas', 'Hoy'];

/**
 * Componente de Gestión de Citas del Psicólogo
 * Permite gestionar citas programadas, ver detalles de pacientes, tomar notas y cancelar sesiones
 * Incluye funcionalidades de confirmación, notas clínicas y gestión de estado de citas
 */
const PsychologistAppointments = () => {
  const { user } = useAuth();
  
  // Estados para controlar la interfaz y datos de citas
  const [activeTab, setActiveTab] = useState('Próximas');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notesForm, setNotesForm] = useState({
    notes: '',
    tags: [],
    tagIntensities: {} // Para almacenar la intensidad de cada tag
  });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelForm, setCancelForm] = useState({
    reason: '',
    reschedule: false,
    newDate: '',
    newTime: ''
  });

  // Estados para el cronómetro
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const intervalRef = useRef(null);

  // Estados para las sesiones del backend
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [sessionsError, setSessionsError] = useState(null);

  // Limpiar intervalo cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  /**
   * Obtiene las sesiones asignadas al psicólogo desde el backend
   */
  const fetchSessions = async () => {
    if (!user?.id) {
      setSessionsError('No se pudo identificar al psicólogo');
      return;
    }

    try {
      setLoadingSessions(true);
      setSessionsError(null);
      
      const data = await appointmentService.getPsychologistSessions();
      console.log('Sesiones obtenidas del backend:', data);
      
      if (data?.content && Array.isArray(data.content)) {
        setSessions(data.content);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error('Error obteniendo sesiones:', error);
      setSessionsError('Error al cargar las sesiones');
      setSessions([]);
    } finally {
      setLoadingSessions(false);
    }
  };

  // Cargar sesiones al montar el componente
  useEffect(() => {
    fetchSessions();
  }, [user?.id]);

  /**
   * Tags disponibles para categorizar pacientes y sesiones
   * Permite etiquetar condiciones específicas y enfoques terapéuticos
   */
  const availableTags = [
    'Ansiedad', 'Depresión', 'Estrés laboral', 'Mindfulness', 'TOC', 
    'Fobia social', 'Trastorno de pánico', 'Insomnio', 'Burnout', 
    'Problemas de pareja', 'Duelo', 'Trauma', 'Adicciones', 'TDAH',
    'Autoestima', 'Comunicación', 'Límites', 'Relajación'
  ];

  /**
   * Procesa y formatea los datos de las sesiones del backend
   */
  const processSessions = () => {
    if (!sessions || sessions.length === 0) return [];

    return sessions.map(session => {
      const sessionDate = new Date(session.sessionTime);
      const now = new Date();
      
      // Determinar si la sesión es de hoy
      const isToday = sessionDate.toDateString() === now.toDateString();
      
      // Determinar si la sesión es próxima (futura)
      const isUpcoming = sessionDate > now;
      
      // Formatear fecha y hora
      const formattedDate = sessionDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      const formattedTime = sessionDate.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      });

      // Obtener tags del paciente
      const patientTags = [];
      if (session.patient?.tag1?.name) patientTags.push(session.patient.tag1.name);
      if (session.patient?.tag2?.name) patientTags.push(session.patient.tag2.name);
      if (session.patient?.tag3?.name) patientTags.push(session.patient.tag3.name);

      return {
        id: session.sessionId,
        patientName: `${session.patient?.name || 'N/A'} ${session.patient?.lastName || ''}`,
        patientEmail: session.patient?.email || 'N/A',
        patientPhone: session.patient?.phoneNumber || session.patient?.phone || 'N/A',
        date: formattedDate,
        time: formattedTime,
        duration: '50 min',
        type: 'Sesión Individual',
        status: session.status || 'Programada',
        location: 'Virtual',
        notes: session.notes?.length > 0 ? session.notes[0]?.note : 'Sin notas',
        avatar: session.patient?.name ? session.patient.name.charAt(0) : 'P',
        tags: patientTags,
        sessionTime: session.sessionTime,
        isToday,
        isUpcoming,
        patient: session.patient,
        session: session
      };
    });
  };

  /**
   * Filtra las sesiones según la pestaña activa
   */
  const getFilteredSessions = () => {
    const processedSessions = processSessions();
    
    if (activeTab === 'Hoy') {
      return processedSessions.filter(session => session.isToday);
    } else {
      return processedSessions.filter(session => session.isUpcoming);
    }
  };

  /**
   * Motivos predefinidos para cancelación de citas
   * Facilita el registro de razones de cancelación
   */
  const cancelReasons = [
    'Paciente solicitó cancelación',
    'Emergencia médica',
    'Problemas técnicos (sesión virtual)',
    'Conflicto de horarios',
    'Paciente no disponible',
    'Otro motivo'
  ];

  /**
   * Citas del psicólogo obtenidas del backend
   * Se actualiza automáticamente con las sesiones asignadas
   */
  const appointments = getFilteredSessions();

  /**
   * Filtra citas según la pestaña activa
   * Próximas: Muestra citas futuras
   * Hoy: Muestra citas de hoy
   * 
   * @returns {Array} Lista filtrada de citas según la pestaña
   */
  const getAppointmentsByTab = () => {
    // Ya no es necesario filtrar aquí porque getFilteredSessions() ya lo hace
    return appointments;
  };

  /**
   * Retorna el icono correspondiente al estado de la cita
   * Proporciona indicadores visuales para diferentes estados
   * 
   * @param {string} status - Estado de la cita
   * @returns {JSX.Element} Icono correspondiente al estado
   */
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmada':
        return <CheckCircle size={16} color="#10B981" />;
      case 'Pendiente':
        return <AlertCircle size={16} color="#F59E0B" />;
      case 'En Proceso':
        return <Play size={16} color="#3B82F6" />;
      case 'Completada':
        return <Check size={16} color="#10B981" />;
      case 'Cancelada':
        return <XCircle size={16} color="#EF4444" />;
      default:
        return <AlertCircle size={16} color="#6B7280" />;
    }
  };

  /**
   * Retorna el color correspondiente al estado de la cita
   * Proporciona esquema de colores consistente para estados
   * 
   * @param {string} status - Estado de la cita
   * @returns {string} Color hexadecimal correspondiente al estado
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmada':
        return '#10B981';
      case 'Pendiente':
        return '#F59E0B';
      case 'En Proceso':
        return '#3B82F6';
      case 'Completada':
        return '#10B981';
      case 'Cancelada':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  /**
   * Formatea el tiempo en formato MM:SS
   * 
   * @param {number} seconds - Segundos totales
   * @returns {string} Tiempo formateado
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Inicia el cronómetro para una sesión
   * 
   * @param {number} appointmentId - ID de la cita
   */
  const startTimer = (appointmentId) => {
    setActiveSessionId(appointmentId);
    setIsTimerRunning(true);
    setTimer(0);
    
    intervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  /**
   * Pausa el cronómetro
   */
  const pauseTimer = () => {
    setIsTimerRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  /**
   * Reanuda el cronómetro
   */
  const resumeTimer = () => {
    setIsTimerRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  /**
   * Detiene el cronómetro
   */
  const stopTimer = () => {
    setIsTimerRunning(false);
    setActiveSessionId(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  /**
   * Inicia una cita cambiando su estado a "En Proceso"
   * Permite al psicólogo marcar el inicio de una sesión
   * 
   * @param {Object} appointment - Cita a iniciar
   */
  const startAppointment = (appointment) => {
    // Actualizar el estado local de sesiones
    setSessions(prev => prev.map(session => 
      session.sessionId === appointment.id 
        ? { ...session, status: 'En Proceso' }
        : session
    ));
    startTimer(appointment.id);
  };

  /**
   * Abre el modal de notas para una cita específica
   * Permite ver y editar notas clínicas y tags de la sesión
   * 
   * @param {Object} appointment - Cita para la cual abrir notas
   */
  const openNotesModal = (appointment) => {
    setSelectedAppointment(appointment);
    setNotesForm({
      notes: appointment.notes || '',
      tags: appointment.tags || [],
      tagIntensities: appointment.tagIntensities || {}
    });
    setShowNotesModal(true);
  };

  /**
   * Cierra el modal de notas y limpia los estados
   */
  const closeNotesModal = () => {
    setShowNotesModal(false);
    setSelectedAppointment(null);
    setNotesForm({ notes: '', tags: [], tagIntensities: {} });
  };

  /**
   * Maneja cambios en el formulario de notas
   * 
   * @param {string} field - Campo a modificar
   * @param {string} value - Nuevo valor
   */
  const handleNotesFormChange = (field, value) => {
    setNotesForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Maneja la selección/deselección de tags en las notas
   * 
   * @param {string} tag - Tag a agregar o remover
   */
  const handleTagToggle = (tag) => {
    setNotesForm(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
      tagIntensities: prev.tags.includes(tag)
        ? { ...prev.tagIntensities, [tag]: undefined }
        : { ...prev.tagIntensities, [tag]: 50 } // Intensidad por defecto
    }));
  };

  /**
   * Maneja el cambio de intensidad de un tag
   * 
   * @param {string} tag - Tag a modificar
   * @param {number} intensity - Nueva intensidad (0-100)
   */
  const handleTagIntensityChange = (tag, intensity) => {
    setNotesForm(prev => ({
      ...prev,
      tagIntensities: {
        ...prev.tagIntensities,
        [tag]: intensity
      }
    }));
  };

  /**
   * Guarda las notas y marca la cita como completada
   * TODO: Implementar guardado en backend
   */
  const saveNotesAndComplete = () => {
    if (selectedAppointment) {
      // Actualizar el estado local de sesiones
      setSessions(prev => prev.map(session => 
        session.sessionId === selectedAppointment.id 
          ? { 
              ...session, 
              status: 'Completada',
              notes: [{
                sessionNoteId: Date.now(), // ID temporal
                note: notesForm.notes,
                session: session.sessionId.toString()
              }]
            }
          : session
      ));
    }
    stopTimer(); // Detener el cronómetro
    closeNotesModal();
  };

  const openCancelModal = (appointment) => {
    setSelectedAppointment(appointment);
    setCancelForm({
      reason: '',
      reschedule: false,
      newDate: '',
      newTime: ''
    });
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setSelectedAppointment(null);
    setCancelForm({
      reason: '',
      reschedule: false,
      newDate: '',
      newTime: ''
    });
  };

  const handleCancelFormChange = (field, value) => {
    setCancelForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const confirmCancelAppointment = () => {
    if (selectedAppointment) {
      // Actualizar el estado local de sesiones
      setSessions(prev => prev.map(session => 
        session.sessionId === selectedAppointment.id 
          ? { ...session, status: 'Cancelada' }
          : session
      ));
    }
    closeCancelModal();
  };

  const getActionButton = (appointment) => {
    switch (appointment.status) {
      case 'Confirmada':
      case 'Pendiente':
        return (
          <button 
            onClick={() => startAppointment(appointment)}
            style={{
              background: '#3B82F6',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '0.5rem 1rem',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#2563EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#3B82F6'}
          >
            <Play size={14} />
            Comenzar
          </button>
        );
      case 'En Proceso':
        const isActiveSession = activeSessionId === appointment.id;
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            {/* Cronómetro */}
            <div style={{
              background: '#f8f9fa',
              border: '1px solid #e0e0e0',
              borderRadius: 6,
              padding: '0.5rem',
              fontSize: 14,
              fontWeight: 600,
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Clock size={14} color="#0057FF" />
              {formatTime(timer)}
            </div>
            
            {/* Controles del cronómetro */}
            <div style={{
              display: 'flex',
              gap: '0.25rem'
            }}>
              {isTimerRunning ? (
                <button 
                  onClick={pauseTimer}
                  style={{
                    background: '#F59E0B',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    padding: '0.25rem 0.5rem',
                    fontSize: 10,
                    cursor: 'pointer'
                  }}
                >
                  <Pause size={12} />
                </button>
              ) : (
                <button 
                  onClick={resumeTimer}
                  style={{
                    background: '#10B981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 4,
                    padding: '0.25rem 0.5rem',
                    fontSize: 10,
                    cursor: 'pointer'
                  }}
                >
                  <Play size={12} />
                </button>
              )}
              
          <button 
            onClick={() => openNotesModal(appointment)}
            style={{
              background: '#10B981',
              color: '#fff',
              border: 'none',
                  borderRadius: 4,
                  padding: '0.25rem 0.5rem',
                  fontSize: 10,
              fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Check size={12} />
            Finalizar
          </button>
            </div>
          </div>
        );
      case 'Completada':
        return (
          <span style={{
            color: '#10B981',
            fontSize: 12,
            fontWeight: 600
          }}>
            Completada
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Título */}
      <div style={{ 
        marginBottom: '2rem' 
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.5rem'
      }}>
        <h1 style={{ 
          color: '#222', 
          fontWeight: 800, 
          fontSize: 32,
            margin: 0
        }}>
          Mis Citas
        </h1>
          
          {/* Contador de sesiones */}
          {!loadingSessions && !sessionsError && (
            <div style={{
              background: '#f0f8ff',
              border: '1px solid #0057FF',
              borderRadius: '20px',
              padding: '0.5rem 1rem',
              fontSize: 14,
              fontWeight: 600,
              color: '#0057FF'
            }}>
              {sessions.length} sesión{sessions.length !== 1 ? 'es' : ''}
            </div>
          )}
        </div>
        <p style={{ 
          color: '#7a8bbd', 
          fontSize: 16, 
          margin: 0 
        }}>
          Gestiona tus citas y sesiones
        </p>
      </div>

      {/* Tabs internos y botón de recarga */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: 0, 
        background: '#f8f9fa',
        borderRadius: 12,
          padding: '0.5rem',
          flex: 1,
          maxWidth: '400px'
      }}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            style={{
              background: activeTab === tab ? '#fff' : 'transparent',
              color: activeTab === tab ? '#0057FF' : '#7a8bbd',
              border: activeTab === tab ? '2px solid #0057FF' : 'none',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              padding: '0.75rem 1.5rem',
              marginRight: 4,
              boxShadow: activeTab === tab ? '0 2px 8px #e0e7ef' : 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s',
              flex: 1
            }}
          >
            {tab}
          </button>
        ))}
        </div>

        {/* Botón de recarga */}
        <button
          onClick={fetchSessions}
          disabled={loadingSessions}
          style={{
            background: '#0057FF',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            fontSize: 14,
            fontWeight: 600,
            cursor: loadingSessions ? 'not-allowed' : 'pointer',
            opacity: loadingSessions ? 0.6 : 1,
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              animation: loadingSessions ? 'spin 1s linear infinite' : 'none'
            }}
          >
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
          {loadingSessions ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>

      {/* Contenido de citas */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {/* Estado de carga */}
        {loadingSessions && (
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f0f0f0'
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
            borderRadius: 12,
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
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
              <AlertCircle size={24} />
              {sessionsError}
            </div>
            <button
              onClick={fetchSessions}
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

        {/* Lista de citas */}
        {!loadingSessions && !sessionsError && appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f0f0f0'
              }}
            >
              {/* Header de la cita */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  {/* Avatar del paciente */}
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#0057FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 16
                  }}>
                    {appointment.avatar}
                  </div>

                  {/* Información del paciente */}
                  <div>
                    <h3 style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: '#333',
                      margin: '0 0 0.25rem 0'
                    }}>
                      {appointment.patientName}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      fontSize: 14,
                      color: '#666'
                    }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Mail size={14} />
                        {appointment.patientEmail}
                      </span>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <Phone size={14} />
                        {appointment.patientPhone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Estado de la cita y datos del backend */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {/* Indicador de datos del backend */}
                  <span style={{
                    background: '#10B981',
                    color: '#fff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    Backend
                  </span>
                  
                  {getStatusIcon(appointment.status)}
                  <span style={{
                    background: getStatusColor(appointment.status),
                    color: '#fff',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {appointment.status}
                  </span>
                </div>
              </div>

              {/* Detalles de la cita */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 14,
                  color: '#666'
                }}>
                  <Calendar size={16} />
                  <span><strong>Fecha:</strong> {appointment.date}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 14,
                  color: '#666'
                }}>
                  <Clock size={16} />
                  <span><strong>Hora:</strong> {appointment.time} ({appointment.duration})</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 14,
                  color: '#666'
                }}>
                  <User size={16} />
                  <span><strong>Tipo:</strong> {appointment.type}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 14,
                  color: '#666'
                }}>
                  <MapPin size={16} />
                  <span><strong>Ubicación:</strong> {appointment.location}</span>
                </div>
              </div>

                {/* Información adicional del backend */}
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: 8,
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '0.75rem',
                    fontSize: 12,
                    color: '#666'
                  }}>
                    <div>
                      <strong>ID Sesión:</strong> {appointment.id}
                    </div>
                    <div>
                      <strong>Fecha ISO:</strong> {appointment.sessionTime ? new Date(appointment.sessionTime).toISOString().split('T')[0] : 'N/A'}
                    </div>
                    <div>
                      <strong>Hora UTC:</strong> {appointment.sessionTime ? new Date(appointment.sessionTime).toLocaleTimeString('en-US', { timeZone: 'UTC' }) : 'N/A'}
                    </div>
                  </div>
                </div>

              {/* Tags del paciente */}
              {appointment.tags && appointment.tags.length > 0 && (
                <div style={{
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {appointment.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#f0f8ff',
                          color: '#0057FF',
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
              )}

              {/* Notas */}
              {appointment.notes && (
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: 8,
                  padding: '1rem',
                  marginBottom: '1rem'
                }}>
                  <p style={{
                    fontSize: 14,
                    color: '#333',
                    margin: 0,
                    fontStyle: 'italic'
                  }}>
                    <strong>Notas:</strong> {appointment.notes}
                  </p>
                </div>
              )}

              {/* Acciones */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                justifyContent: 'flex-end'
              }}>
                {getActionButton(appointment)}
                {appointment.status !== 'Completada' && (
                  <button 
                    onClick={() => openCancelModal(appointment)}
                    style={{
                      background: '#fff',
                      color: '#EF4444',
                      border: '1px solid #EF4444',
                      borderRadius: 6,
                      padding: '0.5rem 1rem',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Trash size={14} />
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          /* Estado vacío */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 300,
            background: '#fff',
            borderRadius: 12,
            padding: '3rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}>
            <Calendar size={64} color="#b0b8c9" style={{ marginBottom: '1rem' }} />
            <h3 style={{
              fontWeight: 700,
              fontSize: 22,
              color: '#222',
              margin: '0 0 0.5rem 0'
            }}>
              {activeTab === 'Próximas' && 'No hay sesiones próximas'}
              {activeTab === 'Hoy' && 'No hay sesiones para hoy'}
            </h3>
            <p style={{
              color: '#7a8bbd',
              fontSize: 16,
              textAlign: 'center',
              maxWidth: 400,
              margin: 0
            }}>
              {activeTab === 'Próximas' && 'No tienes sesiones asignadas para los próximos días. Las sesiones aparecerán aquí cuando los pacientes las agenden.'}
              {activeTab === 'Hoy' && 'No tienes sesiones programadas para hoy. Las sesiones aparecerán aquí cuando los pacientes las agenden.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal de Edición */}
      {showNotesModal && selectedAppointment && (
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
          padding: '2rem'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}>
            {/* Header del modal */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#333',
                margin: 0
              }}>
                Notas de la Sesión - {selectedAppointment.patientName}
              </h2>
              <button
                onClick={closeNotesModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  color: '#666',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            {/* Formulario de notas */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Notas */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '0.5rem'
                }}>
                  Notas de la Sesión
                </label>
                <textarea
                  value={notesForm.notes}
                  onChange={(e) => handleNotesFormChange('notes', e.target.value)}
                  placeholder="Agregar notas sobre la sesión..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Tags del paciente */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '0.5rem'
                }}>
                  Tags del Paciente
                </label>
                <p style={{
                  fontSize: 12,
                  color: '#666',
                  marginBottom: '1rem'
                }}>
                  Selecciona los tags y ajusta la intensidad de cada trastorno:
                </p>
                
                {/* Tags disponibles */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1.5rem'
                }}>
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      style={{
                        background: notesForm.tags.includes(tag) ? '#0057FF' : '#fff',
                        color: notesForm.tags.includes(tag) ? '#fff' : '#0057FF',
                        border: '1px solid #0057FF',
                        borderRadius: '20px',
                        padding: '0.5rem 1rem',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Tags seleccionados con barras de intensidad */}
                {notesForm.tags.length > 0 && (
                  <div style={{
                    background: '#f8f9fa',
                    borderRadius: 8,
                    padding: '1rem',
                    border: '1px solid #e0e0e0'
                  }}>
                    <h4 style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#333',
                      margin: '0 0 1rem 0'
                    }}>
                      Intensidad de Trastornos
                    </h4>
                    
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem'
                    }}>
                      {notesForm.tags.map((tag) => (
                        <div key={tag} style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: '#333'
                            }}>
                              {tag}
                            </span>
                            <span style={{
                              fontSize: 12,
                              color: '#666',
                              fontWeight: 600
                            }}>
                              {notesForm.tagIntensities[tag] || 50}%
                            </span>
                          </div>
                          
                          <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '8px',
                            background: '#e0e0e0',
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              height: '100%',
                              width: `${notesForm.tagIntensities[tag] || 50}%`,
                              background: 'linear-gradient(90deg, #ff6b6b 0%, #ffa500 50%, #4ecdc4 100%)',
                              borderRadius: '4px',
                              transition: 'width 0.3s ease'
                            }} />
                          </div>
                          
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={notesForm.tagIntensities[tag] || 50}
                            onChange={(e) => handleTagIntensityChange(tag, parseInt(e.target.value))}
                            style={{
                              width: '100%',
                              height: '6px',
                              borderRadius: '3px',
                              background: 'transparent',
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Botones de acción */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e0e0e0'
              }}>
                <button
                  onClick={closeNotesModal}
                  style={{
                    background: '#fff',
                    color: '#666',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={saveNotesAndComplete}
                  disabled={!notesForm.notes}
                  style={{
                    background: notesForm.notes ? '#10B981' : '#ccc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    cursor: notesForm.notes ? 'pointer' : 'not-allowed',
                    fontSize: 14
                  }}
                >
                  <Check size={16} style={{ marginRight: '8px' }} />
                  Guardar y Completar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cancelación */}
      {showCancelModal && selectedAppointment && (
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
          padding: '2rem'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}>
            {/* Header del modal */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#333',
                margin: 0
              }}>
                Cancelar Cita - {selectedAppointment.patientName}
              </h2>
              <button
                onClick={closeCancelModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  color: '#666',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            {/* Formulario de cancelación */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Motivo de cancelación */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '0.5rem'
                }}>
                  Motivo de Cancelación *
                </label>
                <select
                  value={cancelForm.reason}
                  onChange={(e) => handleCancelFormChange('reason', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none'
                  }}
                >
                  <option value="">Selecciona un motivo</option>
                  {cancelReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {/* Opción de reagendar */}
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333'
                }}>
                  <input
                    type="checkbox"
                    checked={cancelForm.reschedule}
                    onChange={(e) => handleCancelFormChange('reschedule', e.target.checked)}
                    style={{ margin: 0 }}
                  />
                  Reagendar la cita
                </label>
              </div>

              {/* Campos de reagendamiento */}
              {cancelForm.reschedule && (
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: 8,
                  padding: '1.5rem',
                  border: '1px solid #e0e0e0'
                }}>
                  <h4 style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#333',
                    margin: '0 0 1rem 0'
                  }}>
                    Nueva Fecha y Hora
                  </h4>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#333',
                        marginBottom: '0.5rem'
                      }}>
                        Nueva Fecha
                      </label>
                      <input
                        type="date"
                        value={cancelForm.newDate}
                        onChange={(e) => handleCancelFormChange('newDate', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #e0e0e0',
                          borderRadius: 8,
                          fontSize: 14,
                          outline: 'none'
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
                        Nueva Hora
                      </label>
                      <input
                        type="time"
                        value={cancelForm.newTime}
                        onChange={(e) => handleCancelFormChange('newTime', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #e0e0e0',
                          borderRadius: 8,
                          fontSize: 14,
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e0e0e0'
              }}>
                <button
                  onClick={closeCancelModal}
                  style={{
                    background: '#fff',
                    color: '#666',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmCancelAppointment}
                  disabled={!cancelForm.reason}
                  style={{
                    background: cancelForm.reason ? '#EF4444' : '#ccc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    cursor: cancelForm.reason ? 'pointer' : 'not-allowed',
                    fontSize: 14
                  }}
                >
                  Confirmar Cancelación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologistAppointments; 