import React, { useState } from 'react';
import { Search, Filter, Eye, Calendar, Clock, Users, Mail, Phone, MapPin, CalendarDays, FileText, Tag } from 'lucide-react';

const PsychologistPatientsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Lista completa de pacientes
  const allPatients = [
    {
      id: 1,
      name: 'María González',
      status: 'Activo',
      lastSession: '21/7/2025',
      totalSessions: '8',
      nextSession: '28/7/2025',
      email: 'maria.gonzalez@email.com',
      phone: '+57 300 123 4567',
      age: 32,
      gender: 'Femenino',
      address: 'Calle 123 #45-67, Bogotá',
      emergencyContact: 'Carlos González - +57 300 987 6543',
      startDate: '15/3/2025',
      diagnosis: ['Estrés laboral', 'Ansiedad moderada'],
      notes: [
        {
          sessionNumber: 8,
          date: '21/7/2025',
          summary: 'Excelente progreso en manejo de estrés laboral. Técnicas de relajación implementadas exitosamente.',
          duration: '50 min',
          status: 'Completada'
        },
        {
          sessionNumber: 7,
          date: '14/7/2025',
          summary: 'Trabajo en establecimiento de límites laborales y técnicas de mindfulness.',
          duration: '45 min',
          status: 'Completada'
        },
        {
          sessionNumber: 6,
          date: '7/7/2025',
          summary: 'Evaluación de progreso. Paciente reporta mejoría significativa en síntomas de ansiedad.',
          duration: '50 min',
          status: 'Completada'
        }
      ]
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      status: 'Activo',
      lastSession: '19/7/2025',
      totalSessions: '5',
      nextSession: '26/7/2025',
      email: 'carlos.rodriguez@email.com',
      phone: '+57 300 234 5678',
      age: 28,
      gender: 'Masculino',
      address: 'Carrera 78 #12-34, Medellín',
      emergencyContact: 'Ana Rodríguez - +57 300 876 5432',
      startDate: '20/5/2025',
      diagnosis: ['Depresión leve', 'Problemas de autoestima'],
      notes: [
        {
          sessionNumber: 5,
          date: '19/7/2025',
          summary: 'Continuación de trabajo en autoestima. Paciente muestra mayor confianza.',
          duration: '45 min',
          status: 'Completada'
        },
        {
          sessionNumber: 4,
          date: '12/7/2025',
          summary: 'Primera sesión de terapia cognitivo-conductual para depresión.',
          duration: '50 min',
          status: 'Completada'
        }
      ]
    },
    {
      id: 3,
      name: 'Ana López',
      status: 'Activo',
      lastSession: '17/7/2025',
      totalSessions: '12',
      nextSession: '24/7/2025',
      email: 'ana.lopez@email.com',
      phone: '+57 300 345 6789',
      age: 35,
      gender: 'Femenino',
      address: 'Avenida 5 #23-45, Cali',
      emergencyContact: 'Miguel López - +57 300 765 4321',
      startDate: '10/1/2025',
      diagnosis: ['TOC', 'Ansiedad generalizada'],
      notes: [
        {
          sessionNumber: 12,
          date: '17/7/2025',
          summary: 'Seguimiento de técnicas de mindfulness. Reducción significativa en síntomas de TOC.',
          duration: '60 min',
          status: 'Completada'
        },
        {
          sessionNumber: 11,
          date: '10/7/2025',
          summary: 'Trabajo en exposición y prevención de respuesta para TOC.',
          duration: '60 min',
          status: 'Completada'
        }
      ]
    },
    {
      id: 4,
      name: 'Jorge Martínez',
      status: 'Inactivo',
      lastSession: '14/7/2025',
      totalSessions: '6',
      nextSession: 'No programada',
      email: 'jorge.martinez@email.com',
      phone: '+57 300 456 7890',
      age: 41,
      gender: 'Masculino',
      address: 'Calle 89 #67-89, Barranquilla',
      emergencyContact: 'Laura Martínez - +57 300 654 3210',
      startDate: '25/4/2025',
      diagnosis: ['Burnout', 'Estrés laboral'],
      notes: [
        {
          sessionNumber: 6,
          date: '14/7/2025',
          summary: 'Última sesión. Paciente decidió pausar tratamiento temporalmente.',
          duration: '50 min',
          status: 'Completada'
        },
        {
          sessionNumber: 5,
          date: '7/7/2025',
          summary: 'Trabajo en estrategias de manejo de estrés laboral.',
          duration: '45 min',
          status: 'Completada'
        }
      ]
    },
    {
      id: 5,
      name: 'Laura Sánchez',
      status: 'Activo',
      lastSession: '11/7/2025',
      totalSessions: '9',
      nextSession: '25/7/2025',
      email: 'laura.sanchez@email.com',
      phone: '+57 300 567 8901',
      age: 29,
      gender: 'Femenino',
      address: 'Carrera 45 #12-78, Bucaramanga',
      emergencyContact: 'Roberto Sánchez - +57 300 543 2109',
      startDate: '5/2/2025',
      diagnosis: ['Fobia social', 'Ansiedad social'],
      notes: [
        {
          sessionNumber: 9,
          date: '11/7/2025',
          summary: 'Evaluación de progreso en fobia social. Mejoras significativas en interacciones sociales.',
          duration: '50 min',
          status: 'Completada'
        },
        {
          sessionNumber: 8,
          date: '4/7/2025',
          summary: 'Técnicas de exposición gradual para fobia social.',
          duration: '45 min',
          status: 'Completada'
        }
      ]
    }
  ];

  // Filtrar pacientes por búsqueda y estado
  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'Todos' || patient.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['Todos', 'Activo', 'Inactivo'];

  // Función para abrir modal del paciente
  const openPatientModal = (patient) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
  };

  // Función para cerrar modal
  const closePatientModal = () => {
    setShowPatientModal(false);
    setSelectedPatient(null);
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
          Mis Pacientes
        </h1>
        <p style={{
          fontSize: 16,
          color: '#666',
          margin: 0
        }}>
          Gestiona y visualiza la información de tus pacientes
        </p>
      </div>

      {/* Filtros y búsqueda */}
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
          <Search size={20} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#666'
          }} />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Filtro por estado */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Filter size={16} color="#666" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 14,
              outline: 'none',
              background: '#fff'
            }}
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Contador */}
        <div style={{
          fontSize: 14,
          color: '#666',
          fontWeight: 600
        }}>
          {filteredPatients.length} de {allPatients.length} pacientes
        </div>
      </div>

      {/* Lista de pacientes */}
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
          <div>Estado</div>
          <div>Última Sesión</div>
          <div>Total Sesiones</div>
          <div>Próxima Sesión</div>
          <div>Acciones</div>
        </div>

        {/* Filas de pacientes */}
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div
              key={patient.id}
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
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#333',
                  marginBottom: '0.25rem'
                }}>
                  {patient.name}
                </div>
                <div style={{
                  fontSize: 14,
                  color: '#666'
                }}>
                  {patient.email}
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#999'
                }}>
                  {patient.phone}
                </div>
              </div>

              {/* Estado */}
              <div>
                <span style={{
                  background: patient.status === 'Activo' ? '#22C55E' : '#6B7280',
                  color: '#fff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  {patient.status}
                </span>
              </div>

              {/* Última sesión */}
              <div style={{
                fontSize: 14,
                color: '#333'
              }}>
                {patient.lastSession}
              </div>

              {/* Total sesiones */}
              <div style={{
                fontSize: 14,
                color: '#333',
                fontWeight: 600
              }}>
                {patient.totalSessions}
              </div>

              {/* Próxima sesión */}
              <div style={{
                fontSize: 14,
                color: patient.nextSession === 'No programada' ? '#6B7280' : '#333'
              }}>
                {patient.nextSession}
              </div>

              {/* Acciones */}
              <div>
                <button 
                  onClick={() => openPatientModal(patient)}
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
              <Users size={32} color="#666" />
            </div>
            <h3 style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333',
              margin: '0 0 0.5rem 0'
            }}>
              No se encontraron pacientes
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

      {/* Modal de Información del Paciente */}
      {showPatientModal && selectedPatient && (
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
            maxWidth: '800px',
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
                Información del Paciente - {selectedPatient.name}
              </h2>
              <button
                onClick={closePatientModal}
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

            {/* Información personal */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#333',
                  margin: '0 0 1rem 0'
                }}>
                  Información Personal
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Users size={16} color="#666" />
                    <span style={{ fontSize: 14, color: '#333' }}>
                      <strong>Nombre:</strong> {selectedPatient.name}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Mail size={16} color="#666" />
                    <span style={{ fontSize: 14, color: '#333' }}>
                      <strong>Email:</strong> {selectedPatient.email}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Phone size={16} color="#666" />
                    <span style={{ fontSize: 14, color: '#333' }}>
                      <strong>Teléfono:</strong> {selectedPatient.phone}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <MapPin size={16} color="#666" />
                    <span style={{ fontSize: 14, color: '#333' }}>
                      <strong>Dirección:</strong> {selectedPatient.address}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{
                background: '#f8f9fa',
                borderRadius: 8,
                padding: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#333',
                  margin: '0 0 1rem 0'
                }}>
                  Información Clínica
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <CalendarDays size={16} color="#666" />
                    <span style={{ fontSize: 14, color: '#333' }}>
                      <strong>Fecha de inicio:</strong> {selectedPatient.startDate}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Clock size={16} color="#666" />
                    <span style={{ fontSize: 14, color: '#333' }}>
                      <strong>Total sesiones:</strong> {selectedPatient.totalSessions}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      background: selectedPatient.status === 'Activo' ? '#22C55E' : '#6B7280',
                      color: '#fff',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      {selectedPatient.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnósticos */}
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
                Diagnósticos
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {selectedPatient.diagnosis.map((diagnosis, index) => (
                  <span
                    key={index}
                    style={{
                      background: '#0057FF',
                      color: '#fff',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      fontSize: 12,
                      fontWeight: 600
                    }}
                  >
                    {diagnosis}
                  </span>
                ))}
              </div>
            </div>

            {/* Notas de sesiones */}
            <div>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 1rem 0'
              }}>
                Notas de Sesiones
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {selectedPatient.notes.map((note, index) => (
                  <div
                    key={index}
                    style={{
                      background: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: 8,
                      padding: '1.5rem'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <span style={{
                          background: '#0057FF',
                          color: '#fff',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: 12,
                          fontWeight: 600
                        }}>
                          Sesión #{note.sessionNumber}
                        </span>
                        <span style={{
                          fontSize: 14,
                          color: '#666'
                        }}>
                          {note.date}
                        </span>
                        <span style={{
                          fontSize: 14,
                          color: '#666'
                        }}>
                          {note.duration}
                        </span>
                      </div>
                      <span style={{
                        background: note.status === 'Completada' ? '#22C55E' : '#F97316',
                        color: '#fff',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {note.status}
                      </span>
                    </div>
                    <p style={{
                      fontSize: 14,
                      color: '#333',
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      {note.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologistPatientsList; 