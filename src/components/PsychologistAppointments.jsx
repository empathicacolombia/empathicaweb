import React, { useState } from 'react';
import { Plus, Calendar, Clock, User, MapPin, Phone, Mail, CheckCircle, XCircle, AlertCircle, Edit, Trash, Save, CheckSquare, Square, Play, Check } from 'lucide-react';

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
  // Estados para controlar la interfaz y datos de citas
  const [activeTab, setActiveTab] = useState('Próximas');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notesForm, setNotesForm] = useState({
    notes: '',
    tags: []
  });
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelForm, setCancelForm] = useState({
    reason: '',
    reschedule: false,
    newDate: '',
    newTime: ''
  });

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
   * Datos de ejemplo de citas del psicólogo
   * Incluye información completa de pacientes, horarios y estado de citas
   * TODO: Reemplazar con datos dinámicos del backend
   */
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'María González',
      patientEmail: 'maria.gonzalez@email.com',
      patientPhone: '+57 300 123 4567',
      date: '25/7/2025',
      time: '15:00',
      duration: '50 min',
      type: 'Sesión Individual',
      status: 'Confirmada',
      location: 'Presencial - Consultorio 3',
      notes: 'Continuar trabajo en manejo de estrés laboral',
      avatar: 'MG',
      tags: ['Estrés laboral', 'Mindfulness', 'Autoestima']
    },
    {
      id: 2,
      patientName: 'Carlos Rodríguez',
      patientEmail: 'carlos.rodriguez@email.com',
      patientPhone: '+57 300 234 5678',
      date: '26/7/2025',
      time: '10:30',
      duration: '45 min',
      type: 'Sesión Individual',
      status: 'Pendiente',
      location: 'Virtual - Zoom',
      notes: 'Primera sesión de evaluación',
      avatar: 'CR',
      tags: ['Evaluación inicial']
    },
    {
      id: 3,
      patientName: 'Ana López',
      patientEmail: 'ana.lopez@email.com',
      patientPhone: '+57 300 345 6789',
      date: '28/7/2025',
      time: '16:00',
      duration: '60 min',
      type: 'Sesión Individual',
      status: 'En Proceso',
      location: 'Presencial - Consultorio 1',
      notes: 'Seguimiento de técnicas de mindfulness',
      avatar: 'AL',
      tags: ['Mindfulness', 'Relajación', 'Estrés laboral']
    },
    {
      id: 4,
      patientName: 'Elena Ruiz',
      patientEmail: 'elena.ruiz@email.com',
      patientPhone: '+57 300 901 2345',
      date: '30/7/2025',
      time: '14:00',
      duration: '50 min',
      type: 'Sesión Individual',
      status: 'Pendiente',
      location: 'Virtual - Teams',
      notes: 'Evaluación de progreso en terapia',
      avatar: 'ER',
      tags: ['Evaluación', 'Progreso']
    },
    {
      id: 5,
      patientName: 'Laura Sánchez',
      patientEmail: 'laura.sanchez@email.com',
      patientPhone: '+57 300 567 8901',
      date: '24/7/2025',
      time: '09:00',
      duration: '45 min',
      type: 'Sesión Individual',
      status: 'Completada',
      location: 'Presencial - Consultorio 2',
      notes: 'Sesión de terapia cognitivo-conductual completada exitosamente',
      avatar: 'LS',
      tags: ['TOC', 'Ansiedad', 'Progreso']
    }
  ]);

  /**
   * Filtra citas según la pestaña activa
   * Próximas: Muestra citas confirmadas y pendientes
   * Hoy: Muestra citas en proceso y completadas
   * 
   * @returns {Array} Lista filtrada de citas según la pestaña
   */
  const getAppointmentsByTab = () => {
    if (activeTab === 'Próximas') {
      return appointments.filter(apt => apt.status === 'Confirmada' || apt.status === 'Pendiente');
    } else if (activeTab === 'Hoy') {
      return appointments.filter(apt => apt.status === 'En Proceso' || apt.status === 'Completada');
    }
    return [];
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
   * Inicia una cita cambiando su estado a "En Proceso"
   * Permite al psicólogo marcar el inicio de una sesión
   * 
   * @param {Object} appointment - Cita a iniciar
   */
  const startAppointment = (appointment) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointment.id 
        ? { ...apt, status: 'En Proceso' }
        : apt
    ));
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
      tags: appointment.tags || []
    });
    setShowNotesModal(true);
  };

  /**
   * Cierra el modal de notas y limpia los estados
   */
  const closeNotesModal = () => {
    setShowNotesModal(false);
    setSelectedAppointment(null);
    setNotesForm({ notes: '', tags: [] });
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
        : [...prev.tags, tag]
    }));
  };

  /**
   * Guarda las notas y marca la cita como completada
   * TODO: Implementar guardado en backend
   */
  const saveNotesAndComplete = () => {
    if (selectedAppointment) {
      setAppointments(prev => prev.map(apt => 
        apt.id === selectedAppointment.id 
          ? { 
              ...apt, 
              status: 'Completada',
              notes: notesForm.notes,
              tags: notesForm.tags
            }
          : apt
      ));
    }
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
      setAppointments(prev => prev.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, status: 'Cancelada' }
          : apt
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
        return (
          <button 
            onClick={() => openNotesModal(appointment)}
            style={{
              background: '#10B981',
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
            onMouseEnter={e => e.currentTarget.style.background = '#059669'}
            onMouseLeave={e => e.currentTarget.style.background = '#10B981'}
          >
            <Check size={14} />
            Finalizar
          </button>
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
        <h1 style={{ 
          color: '#222', 
          fontWeight: 800, 
          fontSize: 32,
          margin: '0 0 0.5rem 0'
        }}>
          Mis Citas
        </h1>
        <p style={{ 
          color: '#7a8bbd', 
          fontSize: 16, 
          margin: 0 
        }}>
          Gestiona tus citas y sesiones
        </p>
      </div>

      {/* Tabs internos */}
      <div style={{ 
        display: 'flex', 
        gap: 0, 
        marginBottom: '2rem',
        background: '#f8f9fa',
        borderRadius: 12,
        padding: '0.5rem'
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

      {/* Contenido de citas */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        {appointments.length > 0 ? (
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

                {/* Estado de la cita */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
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
              {activeTab === 'Próximas' && 'No hay citas próximas'}
              {activeTab === 'Hoy' && 'No hay citas para hoy'}
            </h3>
            <p style={{
              color: '#7a8bbd',
              fontSize: 16,
              textAlign: 'center',
              maxWidth: 400,
              margin: 0
            }}>
              {activeTab === 'Próximas' && 'No tienes citas programadas para los próximos días'}
              {activeTab === 'Hoy' && 'No tienes citas programadas para hoy'}
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
                  Selecciona o deselecciona los tags para modificar el diagnóstico del paciente:
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
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