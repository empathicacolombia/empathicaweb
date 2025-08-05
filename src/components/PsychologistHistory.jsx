import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, Filter, Download, CheckCircle, AlertCircle, XCircle, Eye, Edit, Trash, Save, CheckSquare, Square, MapPin, Phone, Mail } from 'lucide-react';

/**
 * Componente de Historial de Sesiones del Psicólogo
 * Muestra el historial completo de citas y sesiones realizadas
 * Permite ver detalles de sesiones pasadas, notas clínicas y estadísticas de asistencia
 */
const PsychologistHistory = () => {
  // Estados para controlar la interfaz y filtros
  const [activeTab, setActiveTab] = useState('Recientes');
  const [search, setSearch] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  /**
   * Datos de ejemplo del historial de citas del psicólogo
   * Incluye información completa de sesiones pasadas, estado de asistencia y notas
   * TODO: Reemplazar con datos dinámicos del backend
   */
  const historyAppointments = [
    {
      id: 8,
      patientName: 'Jorge Martínez',
      patientEmail: 'jorge.martinez@email.com',
      patientPhone: '+57 300 456 7890',
      date: '23/7/2025',
      time: '14:00',
      duration: '50 min',
      type: 'Sesión Individual',
      status: 'Completada',
      location: 'Presencial - Consultorio 1',
      notes: 'Sesión completada exitosamente',
      avatar: 'JM',
      tags: ['Burnout', 'Estrés laboral'],
      tagIntensities: {
        'Burnout': 75,
        'Estrés laboral': 60
      },
      attendance: true
    },
    {
      id: 9,
      patientName: 'Sofía Castillo',
      patientEmail: 'sofia.castillo@email.com',
      patientPhone: '+57 300 678 9012',
      date: '22/7/2025',
      time: '10:00',
      duration: '45 min',
      type: 'Sesión Individual',
      status: 'Cancelada',
      location: 'Virtual - Zoom',
      notes: 'Cancelada por el paciente',
      avatar: 'SC',
      tags: ['Depresión'],
      tagIntensities: {
        'Depresión': 85
      },
      attendance: false
    },
    {
      id: 10,
      patientName: 'Ricardo Mendoza',
      patientEmail: 'ricardo.mendoza@email.com',
      patientPhone: '+57 300 890 1234',
      date: '21/7/2025',
      time: '15:30',
      duration: '60 min',
      type: 'Sesión Individual',
      status: 'Completada',
      location: 'Presencial - Consultorio 2',
      notes: 'Evaluación de progreso satisfactoria',
      avatar: 'RM',
      tags: ['Trauma', 'Duelo'],
      tagIntensities: {
        'Trauma': 90,
        'Duelo': 70
      },
      attendance: true
    },
    {
      id: 11,
      patientName: 'Carmen Silva',
      patientEmail: 'carmen.silva@email.com',
      patientPhone: '+57 300 234 5678',
      date: '20/7/2025',
      time: '11:00',
      duration: '50 min',
      type: 'Sesión Individual',
      status: 'No asistió',
      location: 'Presencial - Consultorio 3',
      notes: 'Paciente no se presentó',
      avatar: 'CS',
      tags: ['Adicciones'],
      tagIntensities: {
        'Adicciones': 95
      },
      attendance: false
    },
    {
      id: 12,
      patientName: 'Ana García',
      patientEmail: 'ana.garcia@email.com',
      patientPhone: '+57 300 345 6789',
      date: '19/7/2025',
      time: '09:00',
      duration: '45 min',
      type: 'Sesión Individual',
      status: 'Completada',
      location: 'Virtual - Teams',
      notes: 'Trabajo en técnicas de relajación',
      avatar: 'AG',
      tags: ['Ansiedad', 'Estrés'],
      tagIntensities: {
        'Ansiedad': 65,
        'Estrés': 55
      },
      attendance: true
    },
    {
      id: 13,
      patientName: 'Carlos Mendoza',
      patientEmail: 'carlos.mendoza@email.com',
      patientPhone: '+57 300 456 7890',
      date: '18/7/2025',
      time: '16:00',
      duration: '60 min',
      type: 'Sesión Individual',
      status: 'Completada',
      location: 'Presencial - Consultorio 1',
      notes: 'Seguimiento de objetivos terapéuticos',
      avatar: 'CM',
      tags: ['Autoestima', 'Comunicación'],
      tagIntensities: {
        'Autoestima': 45,
        'Comunicación': 80
      },
      attendance: true
    }
  ];

  /**
   * Retorna el icono correspondiente al estado de la cita en el historial
   * Proporciona indicadores visuales para diferentes estados de sesiones pasadas
   * 
   * @param {string} status - Estado de la cita
   * @returns {JSX.Element} Icono correspondiente al estado
   */
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

  /**
   * Retorna el color correspondiente al estado de la cita en el historial
   * Proporciona esquema de colores consistente para estados de sesiones pasadas
   * 
   * @param {string} status - Estado de la cita
   * @returns {string} Color hexadecimal correspondiente al estado
   */
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

  /**
   * Filtra citas del historial según el término de búsqueda
   * Busca en nombre del paciente, email y notas clínicas
   * 
   * @returns {Array} Lista filtrada de citas del historial
   */
  const filteredAppointments = historyAppointments.filter(appointment => 
    appointment.patientName.toLowerCase().includes(search.toLowerCase()) ||
    appointment.patientEmail.toLowerCase().includes(search.toLowerCase()) ||
    appointment.notes.toLowerCase().includes(search.toLowerCase())
  );

  /**
   * Abre el modal de visualización para una cita específica
   * Permite ver detalles completos de una sesión pasada
   * 
   * @param {Object} appointment - Cita del historial a visualizar
   */
  const openViewModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowViewModal(true);
  };

  /**
   * Cierra el modal de visualización y limpia los estados
   */
  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 700,
          color: '#333',
          margin: '0 0 0.5rem 0'
        }}>
          Historial de Citas
        </h1>
        <p style={{
          fontSize: 16,
          color: '#666',
          margin: 0
        }}>
          Revisa todas las citas pasadas y su información
        </p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Búsqueda */}
        <div style={{
          position: 'relative',
          flex: 1,
          minWidth: '300px'
        }}>
          <FileText size={20} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#666'
          }} />
          <input
            type="text"
            placeholder="Buscar por paciente, email o notas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 14,
              outline: 'none'
            }}
          />
        </div>

        {/* Filtros */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#fff',
          color: '#666',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          padding: '0.75rem 1rem',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          <Filter size={16} />
          Filtros
        </button>

        {/* Contador */}
        <div style={{
          fontSize: 14,
          color: '#666',
          fontWeight: 600
        }}>
          {filteredAppointments.length} de {historyAppointments.length} citas
        </div>
      </div>

      {/* Lista de citas del historial */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header de la tabla */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
          gap: '1rem',
          padding: '1.5rem',
          background: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0',
          fontWeight: 600,
          fontSize: 14,
          color: '#333'
        }}>
          <div>Paciente</div>
          <div>Fecha</div>
          <div>Hora</div>
          <div>Duración</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>

        {/* Filas de citas */}
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
                gap: '1rem',
                padding: '1.5rem',
                borderBottom: '1px solid #f0f0f0',
                alignItems: 'center',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              {/* Información del paciente */}
              <div>
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
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14
                  }}>
                    {appointment.avatar}
                  </div>
                  <div>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#333',
                      marginBottom: '0.25rem'
                    }}>
                      {appointment.patientName}
                    </div>
                    <div style={{
                      fontSize: 14,
                      color: '#666'
                    }}>
                      {appointment.patientEmail}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fecha */}
              <div style={{
                fontSize: 14,
                color: '#333'
              }}>
                {appointment.date}
              </div>

              {/* Hora */}
              <div style={{
                fontSize: 14,
                color: '#333'
              }}>
                {appointment.time}
              </div>

              {/* Duración */}
              <div style={{
                fontSize: 14,
                color: '#333'
              }}>
                {appointment.duration}
              </div>

              {/* Estado */}
              <div>
                <span style={{
                  background: getStatusColor(appointment.status) + '20',
                  color: getStatusColor(appointment.status),
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: 12,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  width: 'fit-content'
                }}>
                  {getStatusIcon(appointment.status)}
                  {appointment.status}
                </span>
              </div>

              {/* Acciones */}
              <div>
                <button 
                  onClick={() => openViewModal(appointment)}
                  style={{
                    background: '#fff',
                    color: '#0057FF',
                    border: '1px solid #0057FF',
                    borderRadius: 6,
                    padding: '0.5rem 0.75rem',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Eye size={14} />
                  Ver
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Estado vacío */
          <div style={{
            padding: '4rem 2rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <Calendar size={32} color="#666" />
            </div>
            <h3 style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333',
              margin: '0 0 0.5rem 0'
            }}>
              No se encontraron citas
            </h3>
            <p style={{
              fontSize: 14,
              color: '#666',
              margin: 0
            }}>
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>

      {/* Modal de Visualización (Solo Lectura) */}
      {showViewModal && selectedAppointment && (
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
            maxWidth: '700px',
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
                Detalles de Cita - {selectedAppointment.patientName}
              </h2>
              <button
                onClick={closeViewModal}
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

            {/* Información del paciente */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 1rem 0'
              }}>
                Información del Paciente
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <User size={16} color="#666" />
                  <span style={{ fontSize: 14, color: '#333' }}>
                    <strong>Nombre:</strong> {selectedAppointment.patientName}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Mail size={16} color="#666" />
                  <span style={{ fontSize: 14, color: '#333' }}>
                    <strong>Email:</strong> {selectedAppointment.patientEmail}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Phone size={16} color="#666" />
                  <span style={{ fontSize: 14, color: '#333' }}>
                    <strong>Teléfono:</strong> {selectedAppointment.patientPhone}
                  </span>
                </div>
              </div>
            </div>

            {/* Información de la cita */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 1rem 0'
              }}>
                Información de la Cita
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Calendar size={16} color="#666" />
                  <span style={{ fontSize: 14, color: '#333' }}>
                    <strong>Fecha:</strong> {selectedAppointment.date}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Clock size={16} color="#666" />
                  <span style={{ fontSize: 14, color: '#333' }}>
                    <strong>Hora:</strong> {selectedAppointment.time}
                  </span>
                </div>
                <div style={{ fontSize: 14, color: '#333' }}>
                  <strong>Duración:</strong> {selectedAppointment.duration}
                </div>
                <div style={{ fontSize: 14, color: '#333' }}>
                  <strong>Tipo:</strong> {selectedAppointment.type}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <MapPin size={16} color="#666" />
                  <span style={{ fontSize: 14, color: '#333' }}>
                    <strong>Ubicación:</strong> {selectedAppointment.location}
                  </span>
                </div>
                <div>
                  <span style={{
                    background: getStatusColor(selectedAppointment.status) + '20',
                    color: getStatusColor(selectedAppointment.status),
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: 12,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    width: 'fit-content'
                  }}>
                    {getStatusIcon(selectedAppointment.status)}
                    <strong>Estado:</strong> {selectedAppointment.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Asistencia */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 1rem 0'
              }}>
                Asistencia
              </h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={16} color={selectedAppointment.attendance ? "#22C55E" : "#6B7280"} />
                <span style={{ 
                  fontSize: 14, 
                  color: '#333',
                  fontWeight: 600
                }}>
                  {selectedAppointment.attendance ? 'Asistió' : 'No asistió'}
                </span>
              </div>
            </div>

            {/* Tags del paciente con intensidades */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 1rem 0'
              }}>
                Tags del Paciente
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {selectedAppointment.tags.map((tag, index) => {
                  const intensity = selectedAppointment.tagIntensities?.[tag] || 50;
                  return (
                    <div key={index} style={{
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
                          background: '#0057FF',
                          color: '#fff',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: 12,
                          fontWeight: 600
                        }}>
                          {tag}
                        </span>
                        <span style={{
                          fontSize: 12,
                          color: '#666',
                          fontWeight: 600
                        }}>
                          {intensity}%
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
                          width: `${intensity}%`,
                          background: 'linear-gradient(90deg, #ff6b6b 0%, #ffa500 50%, #4ecdc4 100%)',
                          borderRadius: '4px',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notas de la sesión */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 1rem 0'
              }}>
                Notas de la Sesión
              </h3>
              <div style={{
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                padding: '1rem',
                fontSize: 14,
                color: '#333',
                lineHeight: 1.5,
                minHeight: '80px'
              }}>
                {selectedAppointment.notes}
              </div>
            </div>

            {/* Botón de cerrar */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem'
            }}>
              <button
                onClick={closeViewModal}
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

export default PsychologistHistory; 