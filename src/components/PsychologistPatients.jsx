import React, { useState } from 'react';
import { Calendar, BarChart3, Users, Clock, TrendingUp, Eye, Building, Search, Filter } from 'lucide-react';

/**
 * Componente de Vista Principal de Pacientes del Psicólogo
 * Muestra el dashboard principal con métricas, lista de pacientes y funcionalidades de gestión
 * Incluye filtros, búsqueda, notas clínicas y estadísticas de sesiones
 */
const PsychologistPatients = () => {
  // Estados para controlar la interfaz y datos
  const [selectedPeriod, setSelectedPeriod] = useState('Total');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showClinicalNote, setShowClinicalNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Opciones de períodos para filtrar métricas y estadísticas
   * Permite ver datos de diferentes rangos de tiempo
   */
  const periods = [
    { label: 'Última semana', icon: <Calendar size={16} /> },
    { label: 'Último mes', icon: <Calendar size={16} /> },
    { label: 'Total', icon: <BarChart3 size={16} /> }
  ];

  /**
   * Datos de ejemplo de pacientes del psicólogo
   * Incluye información personal, sesiones, notas clínicas y estado de asistencia
   * TODO: Reemplazar con datos dinámicos del backend
   */
  const allPatients = [
    {
      name: 'María González',
      status: 'Activo',
      company: 'TechCorp',
      lastSession: '21/7/2025',
      totalSessions: '8',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total',
      tags: ['Ansiedad', 'Estrés laboral', 'Mindfulness'],
      notes: [
        {
          sessionNumber: 8,
          date: 'lunes, 21 de julio de 2025',
          summary: 'Excelente progreso en manejo de estrés laboral. Técnicas de relajación implementadas exitosamente.',
          duration: '50 min',
          selected: true
        },
        {
          sessionNumber: 7,
          date: 'lunes, 14 de julio de 2025',
          summary: 'Segunda sesión. Trabajo en establecimiento de límites laborales y técnicas de mindfulness.',
          duration: '45 min',
          selected: false
        }
      ]
    },
    {
      name: 'Carlos Rodríguez',
      status: 'Activo',
      company: 'Seguros Unidos',
      lastSession: '19/7/2025',
      totalSessions: '5',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Ana López',
      status: 'Activo',
      company: 'Grupo Industrial',
      lastSession: '17/7/2025',
      totalSessions: '12',
      lastAttendance: 'No asistió',
      attendanceStatus: 'missed',
      period: 'Total'
    },
    {
      name: 'Jorge Martínez',
      status: 'Inactivo',
      company: 'TechCorp',
      lastSession: '14/7/2025',
      totalSessions: '6',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Laura Sánchez',
      status: 'Activo',
      company: 'Hospital Central',
      lastSession: '11/7/2025',
      totalSessions: '9',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Roberto Díaz',
      status: 'Inactivo',
      company: 'Consultora ABC',
      lastSession: '9/7/2025',
      totalSessions: '4',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Patricia Morales',
      status: 'Activo',
      company: 'TechCorp',
      lastSession: '7/7/2025',
      totalSessions: '7',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Miguel Torres',
      status: 'Inactivo',
      company: 'Seguros Unidos',
      lastSession: '4/7/2025',
      totalSessions: '3',
      lastAttendance: 'No asistió',
      attendanceStatus: 'missed',
      period: 'Total'
    },
    {
      name: 'Elena Ruiz',
      status: 'Activo',
      company: 'Banco Nacional',
      lastSession: '23/7/2025',
      totalSessions: '15',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Diego Fernández',
      status: 'Activo',
      company: 'TechCorp',
      lastSession: '22/7/2025',
      totalSessions: '10',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Carmen Silva',
      status: 'Activo',
      company: 'Hospital Central',
      lastSession: '20/7/2025',
      totalSessions: '6',
      lastAttendance: 'No asistió',
      attendanceStatus: 'missed',
      period: 'Total'
    },
    {
      name: 'Andrés Herrera',
      status: 'Inactivo',
      company: 'Grupo Industrial',
      lastSession: '18/7/2025',
      totalSessions: '8',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Sofía Castillo',
      status: 'Activo',
      company: 'Consultora ABC',
      lastSession: '16/7/2025',
      totalSessions: '11',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Ricardo Mendoza',
      status: 'Activo',
      company: 'Seguros Unidos',
      lastSession: '15/7/2025',
      totalSessions: '4',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Valentina Cruz',
      status: 'Inactivo',
      company: 'Banco Nacional',
      lastSession: '13/7/2025',
      totalSessions: '13',
      lastAttendance: 'No asistió',
      attendanceStatus: 'missed',
      period: 'Total'
    },
    {
      name: 'Fernando Vega',
      status: 'Activo',
      company: 'TechCorp',
      lastSession: '12/7/2025',
      totalSessions: '7',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Isabella Ramos',
      status: 'Activo',
      company: 'Clínica San José',
      lastSession: '10/7/2025',
      totalSessions: '9',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Sebastián Ortiz',
      status: 'Inactivo',
      company: 'Grupo Industrial',
      lastSession: '8/7/2025',
      totalSessions: '5',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Camila Jiménez',
      status: 'Activo',
      company: 'Hospital Central',
      lastSession: '6/7/2025',
      totalSessions: '12',
      lastAttendance: 'No asistió',
      attendanceStatus: 'missed',
      period: 'Total'
    },
    {
      name: 'Mateo Vargas',
      status: 'Activo',
      company: 'Consultora ABC',
      lastSession: '5/7/2025',
      totalSessions: '6',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Lucía Peña',
      status: 'Inactivo',
      company: 'Banco Nacional',
      lastSession: '3/7/2025',
      totalSessions: '14',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Gabriel Aguilar',
      status: 'Activo',
      company: 'TechCorp',
      lastSession: '2/7/2025',
      totalSessions: '8',
      lastAttendance: 'Asistió',
      attendanceStatus: 'attended',
      period: 'Total'
    },
    {
      name: 'Natalia Romero',
      status: 'Activo',
      company: 'Clínica San José',
      lastSession: '1/7/2025',
      totalSessions: '10',
      lastAttendance: 'No asistió',
      attendanceStatus: 'missed',
      period: 'Total'
    }
  ];

  /**
   * Filtra pacientes según el período de tiempo seleccionado
   * Permite ver pacientes activos en diferentes rangos: semana, mes o total
   * TODO: Implementar filtrado dinámico con backend
   * 
   * @returns {Array} Lista filtrada de pacientes según el período
   */
  const getFilteredPatients = () => {
    switch (selectedPeriod) {
      case 'Última semana':
        // Mostrar solo pacientes con sesiones en la última semana (últimos 7 días)
        return allPatients.filter(patient => {
          const sessionDate = new Date(patient.lastSession.split('/').reverse().join('-'));
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return sessionDate >= weekAgo;
        });
      case 'Último mes':
        // Mostrar solo pacientes con sesiones en el último mes (últimos 30 días)
        return allPatients.filter(patient => {
          const sessionDate = new Date(patient.lastSession.split('/').reverse().join('-'));
          const monthAgo = new Date();
          monthAgo.setDate(monthAgo.getDate() - 30);
          return sessionDate >= monthAgo;
        });
      case 'Total':
      default:
        // Mostrar todos los pacientes
        return allPatients;
    }
  };

  /**
   * Calcula métricas y estadísticas según el período seleccionado
   * Genera datos de pacientes activos, sesiones, horas de terapia y tasa de asistencia
   * TODO: Implementar cálculo dinámico con backend
   * 
   * @returns {Array} Array de objetos con métricas calculadas
   */
  const getMetricsForPeriod = () => {
    const filteredPatients = getFilteredPatients();
    const activePatients = filteredPatients.filter(p => p.status === 'Activo');
    const totalSessions = filteredPatients.reduce((sum, p) => sum + parseInt(p.totalSessions), 0);
    const therapyHours = Math.round(totalSessions * 0.8); // Estimación: 0.8 horas por sesión
    const attendanceRate = Math.round((filteredPatients.filter(p => p.attendanceStatus === 'attended').length / filteredPatients.length) * 100);

    switch (selectedPeriod) {
      case 'Última semana':
        return [
          {
            title: 'Pacientes Activos',
            value: activePatients.length.toString(),
            detail: `de ${activePatients.length} en período`,
            color: '#0057FF',
            icon: <Users size={24} />,
            accentColor: '#0057FF'
          },
          {
            title: 'Sesiones',
            value: '4',
            detail: 'última semana',
            color: '#0057FF',
            icon: <Calendar size={24} />,
            accentColor: '#0057FF'
          },
          {
            title: 'Horas de Terapia',
            value: '3h',
            detail: 'última semana',
            color: '#22C55E',
            icon: <Clock size={24} />,
            accentColor: '#22C55E'
          },
          {
            title: 'Asistencia',
            value: '100%',
            detail: 'última semana',
            color: '#F97316',
            icon: <TrendingUp size={24} />,
            accentColor: '#F97316'
          }
        ];
      case 'Último mes':
        return [
          {
            title: 'Pacientes Activos',
            value: '17',
            detail: 'de 25 en período',
            color: '#0057FF',
            icon: <Users size={24} />,
            accentColor: '#0057FF'
          },
          {
            title: 'Sesiones',
            value: '20',
            detail: 'último mes',
            color: '#0057FF',
            icon: <Calendar size={24} />,
            accentColor: '#0057FF'
          },
          {
            title: 'Horas de Terapia',
            value: '16h',
            detail: 'último mes',
            color: '#22C55E',
            icon: <Clock size={24} />,
            accentColor: '#22C55E'
          },
          {
            title: 'Asistencia',
            value: '95%',
            detail: 'último mes',
            color: '#F97316',
            icon: <TrendingUp size={24} />,
            accentColor: '#F97316'
          }
        ];
      case 'Total':
      default:
        return [
          {
            title: 'Pacientes Activos',
            value: '19',
            detail: 'de 28 en período',
            color: '#0057FF',
            icon: <Users size={24} />,
            accentColor: '#0057FF'
          },
          {
            title: 'Sesiones',
            value: '50',
            detail: 'total',
            color: '#0057FF',
            icon: <Calendar size={24} />,
            accentColor: '#0057FF'
          },
          {
            title: 'Horas de Terapia',
            value: '40h',
            detail: 'total',
            color: '#22C55E',
            icon: <Clock size={24} />,
            accentColor: '#22C55E'
          },
          {
            title: 'Asistencia',
            value: '92%',
            detail: 'total',
            color: '#F97316',
            icon: <TrendingUp size={24} />,
            accentColor: '#F97316'
          }
        ];
    }
  };

  const metrics = getMetricsForPeriod();

  /**
   * Tags disponibles para diagnóstico y categorización de pacientes
   * Permite etiquetar pacientes con condiciones específicas para mejor organización
   * TODO: Cargar tags dinámicamente desde backend
   */
  const availableTags = [
    'Ansiedad', 'Depresión', 'Estrés laboral', 'Mindfulness', 'TOC', 
    'Fobia social', 'Trastorno de pánico', 'Insomnio', 'Burnout', 
    'Problemas de pareja', 'Duelo', 'Trauma', 'Adicciones', 'TDAH'
  ];

  /**
   * Abre el modal de notas para un paciente específico
   * Permite ver y editar notas clínicas y tags de diagnóstico
   * 
   * @param {Object} patient - Paciente seleccionado para editar
   */
  const openNotesModal = (patient) => {
    setSelectedPatient(patient);
    setSelectedTags(patient.tags || []);
    setShowNotesModal(true);
  };

  /**
   * Cierra el modal de notas y limpia los estados
   */
  const closeNotesModal = () => {
    setShowNotesModal(false);
    setSelectedPatient(null);
    setSelectedTags([]);
  };

  /**
   * Maneja la selección/deselección de tags de diagnóstico
   * Permite agregar o remover etiquetas de un paciente
   * 
   * @param {string} tag - Tag a agregar o remover
   */
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  /**
   * Guarda los cambios realizados en las notas del paciente
   * TODO: Implementar guardado en backend
   */
  const saveChanges = () => {
    // Aquí se guardarían los cambios en la base de datos
    console.log('Guardando cambios para:', selectedPatient.name, 'Tags:', selectedTags);
    closeNotesModal();
  };

  /**
   * Abre una nota clínica específica en modo detalle
   * 
   * @param {Object} note - Nota clínica a mostrar
   */
  const openClinicalNote = (note) => {
    setSelectedNote(note);
    setShowClinicalNote(true);
  };

  // Función para cerrar nota clínica completa
  const closeClinicalNote = () => {
    setShowClinicalNote(false);
    setSelectedNote(null);
  };

  // Filtrar pacientes por búsqueda
  const filteredPatients = getFilteredPatients().filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem' }}>
      {/* Sección superior - Período de Análisis */}
      <div style={{
        background: '#fff',
        border: '2px solid #E0F2FE',
        borderRadius: 12,
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Calendar size={20} color="#0057FF" />
            <h3 style={{
              fontSize: 18,
              fontWeight: 700,
              margin: 0,
              color: '#333'
            }}>
              Período de Análisis
            </h3>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              fontSize: 14,
              color: '#666'
            }}>
              Datos mostrados:
            </span>
            <button style={{
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: 6,
              padding: '0.25rem 0.5rem',
              fontSize: 12,
              color: '#333',
              cursor: 'pointer'
            }}>
              {selectedPeriod}
            </button>
          </div>
        </div>

        {/* Botones de período */}
        <div style={{
          display: 'flex',
          gap: '1rem'
        }}>
          {periods.map((period) => (
            <button
              key={period.label}
              onClick={() => setSelectedPeriod(period.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: selectedPeriod === period.label ? '#0057FF' : '#fff',
                color: selectedPeriod === period.label ? '#fff' : '#333',
                border: selectedPeriod === period.label ? 'none' : '1px solid #e0e0e0',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {period.icon}
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sección inferior - Métricas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {metrics.map((metric, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Línea de color lateral */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              background: metric.accentColor
            }} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '1rem'
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: `${metric.accentColor}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: metric.accentColor
              }}>
                {metric.icon}
              </div>
              
              <div>
                <h3 style={{
                  fontSize: 16,
                  fontWeight: 700,
                  margin: '0 0 0.25rem 0',
                  color: '#333'
                }}>
                  {metric.title}
                </h3>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontSize: 32,
                fontWeight: 700,
                color: metric.color
              }}>
                {metric.value}
              </span>
            </div>
            
            <p style={{
              fontSize: 14,
              color: '#666',
              margin: 0
            }}>
              {metric.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Lista de Pacientes */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Contador de pacientes */}
        <div style={{
          fontSize: 14,
          color: '#666',
          marginBottom: '1rem'
        }}>
          Mostrando {filteredPatients.length} de {allPatients.length} pacientes
        </div>

        {/* Título */}
        <h3 style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#0057FF',
          margin: '0 0 1.5rem 0'
        }}>
          Lista de Pacientes
        </h3>

        {/* Tabla de pacientes */}
        <div style={{
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                borderBottom: '1px solid #e0e0e0'
              }}>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem 0',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  width: '20%'
                }}>
                  Paciente
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem 0',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  width: '15%'
                }}>
                  Estado
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem 0',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  width: '15%'
                }}>
                  Última Reunión
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem 0',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  width: '15%'
                }}>
                  Total Sesiones
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem 0',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  width: '15%'
                }}>
                  Última asistencia
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '1rem 0',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#333',
                  width: '20%'
                }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index} style={{
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <td style={{
                    padding: '1rem 0',
                    fontSize: 14,
                    color: '#0057FF',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}>
                    {patient.name}
                  </td>
                  <td style={{
                    padding: '1rem 0'
                  }}>
                    <span style={{
                      background: patient.status === 'Activo' ? '#0057FF' : '#6B7280',
                      color: '#fff',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      {patient.status}
                    </span>
                  </td>
                  <td style={{
                    padding: '1rem 0',
                    fontSize: 14,
                    color: '#333'
                  }}>
                    {patient.lastSession}
                  </td>
                  <td style={{
                    padding: '1rem 0',
                    fontSize: 14,
                    color: '#333'
                  }}>
                    {patient.totalSessions}
                  </td>
                  <td style={{
                    padding: '1rem 0'
                  }}>
                    <span style={{
                      background: patient.attendanceStatus === 'attended' ? '#0057FF' : '#EF4444',
                      color: '#fff',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      {patient.lastAttendance}
                    </span>
                  </td>
                  <td style={{
                    padding: '1rem 0'
                  }}>
                    <button 
                      onClick={() => openNotesModal(patient)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#fff',
                        color: '#0057FF',
                        border: '1px solid #0057FF',
                        borderRadius: 8,
                        padding: '0.5rem 1rem',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Eye size={14} />
                      Ver Notas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Notas Clínicas */}
      {showNotesModal && selectedPatient && (
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
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#0057FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  📄
                </div>
                <h2 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#333',
                  margin: 0
                }}>
                  Notas Clínicas - {selectedPatient.name}
                </h2>
              </div>
              <button
                onClick={closeNotesModal}
                style={{
                  background: '#0057FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.5rem 1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                Cerrar
              </button>
            </div>

            {/* Instrucciones */}
            <p style={{
              fontSize: 14,
              color: '#666',
              marginBottom: '2rem',
              fontStyle: 'italic'
            }}>
              Haga clic en cualquier nota para ver el detalle completo en formato SOAP
            </p>

            {/* Sección de Tags/Diagnósticos */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 1rem 0'
              }}>
                Diagnósticos y Tags
              </h3>
              <p style={{
                fontSize: 14,
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
                      background: selectedTags.includes(tag) ? '#0057FF' : '#fff',
                      color: selectedTags.includes(tag) ? '#fff' : '#0057FF',
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
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <button
                  onClick={saveChanges}
                  style={{
                    background: '#22C55E',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.5rem 1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setSelectedTags(selectedPatient.tags || [])}
                  style={{
                    background: '#6B7280',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.5rem 1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  Restaurar
                </button>
              </div>
            </div>

            {/* Lista de notas clínicas */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {selectedPatient.notes?.map((note, index) => (
                <div
                  key={index}
                  style={{
                    background: note.selected ? '#f0f8ff' : '#fff',
                    border: note.selected ? '2px solid #0057FF' : '1px solid #e0e0e0',
                    borderRadius: 8,
                    padding: '1.5rem',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                >
                  {note.selected && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: '#0057FF'
                    }} />
                  )}
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
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
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 14,
                      color: '#666'
                    }}>
                      🕐 {note.duration}
                    </div>
                  </div>
                  
                  <p style={{
                    fontSize: 14,
                    color: '#333',
                    margin: '0 0 1rem 0',
                    lineHeight: 1.5
                  }}>
                    {note.summary}
                  </p>
                  
                  <div 
                    onClick={() => openClinicalNote(note)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#0057FF',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    🩺 Ver nota clínica completa →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Nota Clínica Completa */}
      {showClinicalNote && selectedNote && selectedPatient && (
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
            maxWidth: '900px',
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
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <button
                  onClick={closeClinicalNote}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 18,
                    color: '#0057FF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  ← Volver
                </button>
                <span style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#333'
                }}>
                  Nota Clínica Completa
                </span>
              </div>
              <button
                onClick={closeClinicalNote}
                style={{
                  background: '#0057FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.5rem 1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                Cerrar
              </button>
            </div>

            {/* Título del documento */}
            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <h1 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#1e3a8a',
                margin: '0 0 1rem 0'
              }}>
                Nota de Evolución Psicológica
              </h1>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                fontSize: 14,
                color: '#666'
              }}>
                <div><strong>Fecha:</strong> {selectedNote.date}</div>
                <div><strong>Paciente:</strong> {selectedPatient.name}</div>
                <div><strong>Sesión No.:</strong> {selectedNote.sessionNumber}</div>
                <div><strong>Duración:</strong> {selectedNote.duration}</div>
              </div>
            </div>

            {/* Sección S - SUBJETIVO */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#0057FF',
                margin: '0 0 1rem 0'
              }}>
                S - SUBJETIVO
              </h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: '#333',
                margin: 0
              }}>
                La paciente refiere que esta semana ha estado "mucho mejor que las anteriores". 
                Aplicó exitosamente las técnicas de respiración diafragmática y mindfulness en 
                cuatro ocasiones durante situaciones de alta presión laboral. Cita: "Cuando mi 
                jefe me pidió el reporte urgente para el viernes, sentí que subía la ansiedad, 
                pero hice los ejercicios y pude mantenerme tranquila. Incluso logré organizar 
                mejor mis prioridades". Refiere mejora significativa en la calidad del sueño 
                (duerme 7-8 horas continuas vs 4-5 horas fragmentadas en sesiones anteriores). 
                No reporta cefaleas tensionales en los últimos 7 días. Expresa alta motivación 
                para continuar: "Siento que tengo herramientas que realmente funcionan".
              </p>
            </div>

            {/* Sección O - OBJETIVO */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#22C55E',
                margin: '0 0 1rem 0'
              }}>
                O - OBJETIVO
              </h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: '#333',
                margin: 0
              }}>
                Paciente se presenta puntual, con aseo apropiado y postura erguida. Se observa 
                contacto visual directo y sostenido. Lenguaje fluido, coherente y con mayor 
                modulación emocional comparado con sesiones iniciales. Afecto predominantemente 
                eutímico con episodios de afecto positivo al describir logros. Durante el ejercicio 
                de revisión de técnicas, la paciente demuestra dominio correcto de la respiración 
                diafragmática sin necesidad de guía. Es capaz de identificar 3 situaciones específicas 
                donde aplicó exitosamente estrategias de afrontamiento. No se observan alteraciones 
                sensoperceptivas. Paciente orientada en tiempo, espacio y persona. Mostró iniciativa 
                en el establecimiento de metas para la siguiente semana.
              </p>
            </div>

            {/* Sección A - ANÁLISIS/EVALUACIÓN */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '1.5rem',
              borderLeft: '4px solid #F97316'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#F97316',
                margin: '0 0 1rem 0'
              }}>
                A - ANÁLISIS/EVALUACIÓN
              </h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: '#333',
                margin: 0
              }}>
                La paciente muestra una evolución muy favorable en el manejo del Trastorno de 
                Adaptación con Ansiedad (F43.22). La implementación exitosa de técnicas 
                cognitivo-conductuales ha llevado a una significativa reducción de la sintomatología 
                ansiosa y mejora en el funcionamiento laboral y personal. Se ha desarrollado 
                autoeficacia en el manejo de situaciones estresantes, lo cual es un indicador 
                de buen pronóstico. Se observa consolidación de los aprendizajes terapéuticos 
                y generalización de estrategias a diferentes contextos.
              </p>
            </div>

            {/* Sección P - PLAN */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 8,
              padding: '1.5rem',
              marginBottom: '2rem',
              borderLeft: '4px solid #0057FF'
            }}>
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#0057FF',
                margin: '0 0 1rem 0'
              }}>
                P - PLAN
              </h3>
              <p style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: '#333',
                margin: 0
              }}>
                Continuar con Terapia Cognitivo-Conductual con sesiones enfocada en prevención 
                de recaídas y planificación de estrategias a largo plazo. Asignar tarea de 
                registro de situaciones estresantes y estrategias utilizadas para reforzar 
                automonitoreo. Introducir técnicas avanzadas de reestructuración cognitiva 
                para fortalecer recursos de afrontamiento. Evaluar espaciamiento de sesiones 
                a quincenal en próxima cita. Próxima sesión programada en una semana.
              </p>
            </div>

            {/* Footer */}
            <div style={{
              textAlign: 'center',
              paddingTop: '2rem',
              borderTop: '1px solid #e0e0e0'
            }}>
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#333',
                marginBottom: '0.25rem'
              }}>
                Dr. Valentina Rodríguez
              </div>
              <div style={{
                fontSize: 12,
                color: '#666'
              }}>
                Psicóloga Clínica
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologistPatients; 