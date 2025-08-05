import React, { useState } from 'react';
import { Search, Filter, Eye, Calendar, Clock, Users, Mail, Phone, MapPin, CalendarDays, FileText, Tag } from 'lucide-react';

/**
 * Componente de Lista Completa de Pacientes del Psicólogo
 * Muestra todos los pacientes asignados con información detallada
 * Permite buscar, filtrar y ver perfiles completos de pacientes
 */
const PsychologistPatientsList = () => {
  // Estados para controlar la interfaz y filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  /**
   * Datos de ejemplo de la lista completa de pacientes
   * Incluye información personal, diagnósticos, resultados de tests y progreso
   * TODO: Reemplazar con datos dinámicos del backend
   */
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
      // Información diagnóstica y de test
      testResults: {
        completed: true,
        date: '10/3/2025',
        profile: {
          nivelAngustia: 'Moderado',
          disposicionCambio: 'Alta',
          orientacionTemporal: 'Presente',
          estiloTrabajoPaciente: 'Colaborativo'
        },
        therapeuticApproaches: [
          'Terapia Cognitivo-Conductual (TCC)',
          'Mindfulness',
          'Terapia de Aceptación y Compromiso (ACT)'
        ]
      },
      currentTags: ['Estrés laboral', 'Mindfulness', 'Autoestima', 'Límites', 'Relajación'],
      progressMetrics: {
        anxietyLevel: 'Reducido 40%',
        stressManagement: 'Mejorado',
        sleepQuality: 'Estable',
        overallWellbeing: 'Progreso significativo'
      },
      notes: [
        {
          sessionNumber: 8,
          date: '21/7/2025',
          summary: 'Excelente progreso en manejo de estrés laboral. Técnicas de relajación implementadas exitosamente.',
          duration: '50 min',
          status: 'Completada',
          tags: ['Progreso', 'Relajación', 'Estrés laboral']
        },
        {
          sessionNumber: 7,
          date: '14/7/2025',
          summary: 'Trabajo en establecimiento de límites laborales y técnicas de mindfulness.',
          duration: '45 min',
          status: 'Completada',
          tags: ['Mindfulness', 'Límites', 'Estrés laboral']
        },
        {
          sessionNumber: 6,
          date: '7/7/2025',
          summary: 'Evaluación de progreso. Paciente reporta mejoría significativa en síntomas de ansiedad.',
          duration: '50 min',
          status: 'Completada',
          tags: ['Evaluación', 'Progreso', 'Ansiedad']
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
      // Información diagnóstica y de test
      testResults: {
        completed: true,
        date: '15/5/2025',
        profile: {
          nivelAngustia: 'Bajo',
          disposicionCambio: 'Media',
          orientacionTemporal: 'Pasado',
          estiloTrabajoPaciente: 'Directivo'
        },
        therapeuticApproaches: [
          'Terapia Cognitivo-Conductual (TCC)',
          'Terapia de Activación Conductual',
          'Técnicas de Autoestima'
        ]
      },
      currentTags: ['Depresión', 'Autoestima', 'Comunicación', 'Progreso'],
      progressMetrics: {
        depressionLevel: 'Reducido 25%',
        selfEsteem: 'Mejorando gradualmente',
        socialInteraction: 'Incrementada',
        motivation: 'En desarrollo'
      },
      notes: [
        {
          sessionNumber: 5,
          date: '19/7/2025',
          summary: 'Continuación de trabajo en autoestima. Paciente muestra mayor confianza.',
          duration: '45 min',
          status: 'Completada',
          tags: ['Autoestima', 'Progreso', 'Confianza']
        },
        {
          sessionNumber: 4,
          date: '12/7/2025',
          summary: 'Primera sesión de terapia cognitivo-conductual para depresión.',
          duration: '50 min',
          status: 'Completada',
          tags: ['TCC', 'Depresión', 'Evaluación']
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
      // Información diagnóstica y de test
      testResults: {
        completed: true,
        date: '5/1/2025',
        profile: {
          nivelAngustia: 'Alto',
          disposicionCambio: 'Alta',
          orientacionTemporal: 'Futuro',
          estiloTrabajoPaciente: 'Estructurado'
        },
        therapeuticApproaches: [
          'Terapia de Exposición y Prevención de Respuesta (ERP)',
          'Terapia Cognitivo-Conductual (TCC)',
          'Mindfulness'
        ]
      },
      currentTags: ['TOC', 'Ansiedad', 'Mindfulness', 'Exposición', 'Progreso'],
      progressMetrics: {
        ocdSymptoms: 'Reducidos 60%',
        anxietyLevel: 'Controlada',
        dailyFunctioning: 'Mejorada significativamente',
        qualityOfLife: 'Excelente progreso'
      },
      notes: [
        {
          sessionNumber: 12,
          date: '17/7/2025',
          summary: 'Continuación exitosa de técnicas de exposición. Paciente maneja mejor los síntomas de TOC.',
          duration: '60 min',
          status: 'Completada',
          tags: ['TOC', 'Exposición', 'Progreso']
        },
        {
          sessionNumber: 11,
          date: '10/7/2025',
          summary: 'Implementación de técnicas de mindfulness para manejo de ansiedad.',
          duration: '50 min',
          status: 'Completada',
          tags: ['Mindfulness', 'Ansiedad', 'Técnicas']
        }
      ]
    }
  ];

  /**
   * Filtra pacientes según término de búsqueda y estado seleccionado
   * Permite buscar por nombre o email y filtrar por estado activo/inactivo
   * 
   * @returns {Array} Lista filtrada de pacientes
   */
  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'Todos' || patient.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  /**
   * Opciones de estado disponibles para filtrar pacientes
   */
  const statusOptions = ['Todos', 'Activo', 'Inactivo'];

  /**
   * Abre el modal de detalles del paciente
   * Permite ver información completa del perfil del paciente
   * 
   * @param {Object} patient - Paciente seleccionado para ver detalles
   */
  const openPatientModal = (patient) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
  };

  /**
   * Cierra el modal de detalles del paciente y limpia los estados
   */
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
          <div>Última Reunión</div>
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

              {/* Última reunión */}
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

            {/* Información diagnóstica y de test */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {/* Resultados del Test */}
              <div style={{
                background: '#f0f9ff',
                borderRadius: 8,
                padding: '1.5rem',
                border: '1px solid #bae6fd'
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#0057FF',
                  margin: '0 0 1rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FileText size={20} />
                  Resultados del Test
                </h3>
                {selectedPatient.testResults.completed ? (
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
                      <Calendar size={16} color="#0057FF" />
                      <span style={{ fontSize: 14, color: '#333' }}>
                        <strong>Fecha del test:</strong> {selectedPatient.testResults.date}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Tag size={16} color="#0057FF" />
                      <span style={{ fontSize: 14, color: '#333' }}>
                        <strong>Nivel de angustia:</strong> {selectedPatient.testResults.profile.nivelAngustia}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Users size={16} color="#0057FF" />
                      <span style={{ fontSize: 14, color: '#333' }}>
                        <strong>Disposición al cambio:</strong> {selectedPatient.testResults.profile.disposicionCambio}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Clock size={16} color="#0057FF" />
                      <span style={{ fontSize: 14, color: '#333' }}>
                        <strong>Orientación temporal:</strong> {selectedPatient.testResults.profile.orientacionTemporal}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontSize: 14, color: '#666', fontStyle: 'italic' }}>
                    No se ha completado el test de match perfecto
                  </p>
                )}
              </div>

              {/* Métricas de Progreso */}
              <div style={{
                background: '#f0fdf4',
                borderRadius: 8,
                padding: '1.5rem',
                border: '1px solid #bbf7d0'
              }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#16a34a',
                  margin: '0 0 1rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Tag size={20} />
                  Métricas de Progreso
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {Object.entries(selectedPatient.progressMetrics).map(([key, value]) => (
                    <div key={key} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: '#fff',
                      borderRadius: '6px',
                      border: '1px solid #dcfce7'
                    }}>
                      <span style={{ 
                        fontSize: 14, 
                        color: '#333',
                        textTransform: 'capitalize',
                        fontWeight: '500'
                      }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span style={{ 
                        fontSize: 14, 
                        color: '#16a34a',
                        fontWeight: '600'
                      }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags Actuales */}
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
                margin: '0 0 1rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Tag size={20} />
                Tags Actuales
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {selectedPatient.currentTags.map((tag, index) => (
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
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Enfoques Terapéuticos Recomendados */}
            <div style={{
              background: '#fef3c7',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '2rem',
              border: '1px solid #fde68a'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#92400e',
                margin: '0 0 1rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FileText size={20} />
                Enfoques Terapéuticos Recomendados
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                {selectedPatient.testResults.therapeuticApproaches.map((approach, index) => (
                  <div
                    key={index}
                    style={{
                      background: '#fff',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: 14,
                      color: '#92400e',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      border: '1px solid #fde68a'
                    }}
                  >
                    <Tag size={14} />
                    {approach}
                  </div>
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