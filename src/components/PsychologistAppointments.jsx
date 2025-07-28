import React, { useState } from 'react';
import { Plus, Calendar, Clock, User, MapPin, Phone, Mail, CheckCircle, XCircle, AlertCircle, Edit, Trash, Save, CheckSquare, Square } from 'lucide-react';

const tabs = ['Próximas', 'Hoy'];

const PsychologistAppointments = () => {
  const [activeTab, setActiveTab] = useState('Próximas');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editForm, setEditForm] = useState({
    status: '',
    attendance: false,
    notes: '',
    tags: []
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelForm, setCancelForm] = useState({
    reason: '',
    reschedule: false,
    newDate: '',
    newTime: ''
  });

  // Tags disponibles para pacientes
  const availableTags = [
    'Ansiedad', 'Depresión', 'Estrés laboral', 'Mindfulness', 'TOC', 
    'Fobia social', 'Trastorno de pánico', 'Insomnio', 'Burnout', 
    'Problemas de pareja', 'Duelo', 'Trauma', 'Adicciones', 'TDAH',
    'Autoestima', 'Comunicación', 'Límites', 'Relajación'
  ];

  // Motivos de cancelación
  const cancelReasons = [
    'Paciente solicitó cancelación',
    'Emergencia médica',
    'Problemas técnicos (sesión virtual)',
    'Conflicto de horarios',
    'Paciente no disponible',
    'Otro motivo'
  ];

  // Datos en duro para trabajar en el diseño
  const upcomingAppointments = [
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
      status: 'Confirmada',
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
      tags: ['Depresión', 'Autoestima']
    }
  ];

  const todayAppointments = [
    {
      id: 5,
      patientName: 'Laura Sánchez',
      patientEmail: 'laura.sanchez@email.com',
      patientPhone: '+57 300 567 8901',
      date: '24/7/2025',
      time: '09:00',
      duration: '45 min',
      type: 'Sesión Individual',
      status: 'En curso',
      location: 'Presencial - Consultorio 2',
      notes: 'Sesión de terapia cognitivo-conductual',
      avatar: 'LS',
      tags: ['TOC', 'Ansiedad']
    },
    {
      id: 6,
      patientName: 'Diego Fernández',
      patientEmail: 'diego.fernandez@email.com',
      patientPhone: '+57 300 012 3456',
      date: '24/7/2025',
      time: '11:00',
      duration: '50 min',
      type: 'Sesión Individual',
      status: 'Confirmada',
      location: 'Virtual - Zoom',
      notes: 'Continuar trabajo en autoestima',
      avatar: 'DF',
      tags: ['Autoestima', 'Comunicación']
    },
    {
      id: 7,
      patientName: 'Patricia Morales',
      patientEmail: 'patricia.morales@email.com',
      patientPhone: '+57 300 789 0123',
      date: '24/7/2025',
      time: '16:30',
      duration: '60 min',
      type: 'Sesión Individual',
      status: 'Confirmada',
      location: 'Presencial - Consultorio 3',
      notes: 'Evaluación de ansiedad social',
      avatar: 'PM',
      tags: ['Fobia social', 'Ansiedad']
    }
  ];

  const getAppointmentsByTab = () => {
    switch (activeTab) {
      case 'Próximas':
        return upcomingAppointments;
      case 'Hoy':
        return todayAppointments;
      default:
        return [];
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmada':
        return <CheckCircle size={16} color="#22C55E" />;
      case 'Pendiente':
        return <AlertCircle size={16} color="#F97316" />;
      case 'En curso':
        return <Clock size={16} color="#0057FF" />;
      case 'Completada':
        return <CheckCircle size={16} color="#22C55E" />;
      case 'Cancelada':
        return <XCircle size={16} color="#EF4444" />;
      case 'No asistió':
        return <XCircle size={16} color="#6B7280" />;
      default:
        return <AlertCircle size={16} color="#F97316" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmada':
        return '#22C55E';
      case 'Pendiente':
        return '#F97316';
      case 'En curso':
        return '#0057FF';
      case 'Completada':
        return '#22C55E';
      case 'Cancelada':
        return '#EF4444';
      case 'No asistió':
        return '#6B7280';
      default:
        return '#F97316';
    }
  };

  // Función para abrir modal de edición
  const openEditModal = (appointment) => {
    setSelectedAppointment(appointment);
    setEditForm({
      status: appointment.status,
      attendance: appointment.attendance || false,
      notes: appointment.notes || '',
      tags: appointment.tags || []
    });
    setShowEditModal(true);
  };

  // Función para cerrar modal de edición
  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedAppointment(null);
    setEditForm({
      status: '',
      attendance: false,
      notes: '',
      tags: []
    });
  };

  // Función para manejar cambios en el formulario
  const handleFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para manejar tags
  const handleTagToggle = (tag) => {
    const currentTags = editForm.tags;
    if (currentTags.includes(tag)) {
      handleFormChange('tags', currentTags.filter(t => t !== tag));
    } else {
      handleFormChange('tags', [...currentTags, tag]);
    }
  };

  // Función para guardar cambios
  const saveChanges = () => {
    // Aquí se guardarían los cambios en la base de datos
    console.log('Guardando cambios para:', selectedAppointment.patientName, editForm);
    closeEditModal();
  };

  // Función para abrir modal de confirmación
  const openConfirmModal = () => {
    setShowConfirmModal(true);
  };

  // Función para cerrar modal de confirmación
  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  // Función para confirmar terminación de cita
  const confirmFinishAppointment = () => {
    console.log('Terminando cita:', selectedAppointment.patientName);
    closeConfirmModal();
    closeEditModal();
  };

  // Función para abrir modal de cancelación
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

  // Función para cerrar modal de cancelación
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

  // Función para manejar cambios en el formulario de cancelación
  const handleCancelFormChange = (field, value) => {
    setCancelForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para confirmar cancelación
  const confirmCancelAppointment = () => {
    console.log('Cancelando cita:', selectedAppointment.patientName, cancelForm);
    closeCancelModal();
  };

  const appointments = getAppointmentsByTab();

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
                gap: '0.5rem',
                justifyContent: 'flex-end'
              }}>
                <button 
                  onClick={() => openEditModal(appointment)}
                  style={{
                    background: '#fff',
                    color: '#666',
                    border: '1px solid #e0e0e0',
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
                  <Edit size={14} />
                  Editar
                </button>
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
      {showEditModal && selectedAppointment && (
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
                Editar Cita - {selectedAppointment.patientName}
              </h2>
              <button
                onClick={closeEditModal}
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

            {/* Formulario de edición */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Estado de la cita */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '0.5rem'
                }}>
                  Estado de la Cita
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) => handleFormChange('status', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none'
                  }}
                >
                  <option value="Confirmada">Confirmada</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En curso">En curso</option>
                  <option value="Completada">Completada</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="No asistió">No asistió</option>
                </select>
              </div>

              {/* Asistencia del paciente */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '0.5rem'
                }}>
                  Asistencia del Paciente
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: 14
                  }}>
                    <input
                      type="radio"
                      name="attendance"
                      checked={editForm.attendance === true}
                      onChange={() => handleFormChange('attendance', true)}
                      style={{ margin: 0 }}
                    />
                    Asistió
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: 14
                  }}>
                    <input
                      type="radio"
                      name="attendance"
                      checked={editForm.attendance === false}
                      onChange={() => handleFormChange('attendance', false)}
                      style={{ margin: 0 }}
                    />
                    No asistió
                  </label>
                </div>
              </div>

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
                  value={editForm.notes}
                  onChange={(e) => handleFormChange('notes', e.target.value)}
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
                        background: editForm.tags.includes(tag) ? '#0057FF' : '#fff',
                        color: editForm.tags.includes(tag) ? '#fff' : '#0057FF',
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
                  onClick={closeEditModal}
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
                  onClick={openConfirmModal}
                  style={{
                    background: '#22C55E',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  Terminar Cita
                </button>
                <button
                  onClick={saveChanges}
                  style={{
                    background: '#0057FF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  <Save size={16} style={{ marginRight: '8px' }} />
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación */}
      {showConfirmModal && (
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
          zIndex: 1001,
          padding: '2rem'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            padding: '2rem',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <AlertCircle size={32} color="#F59E0B" />
            </div>
            
            <h3 style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#333',
              margin: '0 0 1rem 0'
            }}>
              ¿Terminar la cita?
            </h3>
            
            <p style={{
              fontSize: 14,
              color: '#666',
              margin: '0 0 2rem 0',
              lineHeight: 1.5
            }}>
              ¿Estás seguro de que deseas terminar la cita con {selectedAppointment?.patientName}? 
              Esta acción no se puede deshacer.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <button
                onClick={closeConfirmModal}
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
                onClick={confirmFinishAppointment}
                style={{
                  background: '#EF4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                Sí, Terminar
              </button>
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