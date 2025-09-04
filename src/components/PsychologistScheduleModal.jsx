import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User } from 'lucide-react';
import { userService } from '../services/api';

/**
 * Modal para mostrar el horario disponible del psicólogo asignado
 * Permite al paciente ver los días y horarios disponibles antes de agendar
 */
const PsychologistScheduleModal = ({ 
  isOpen, 
  onClose, 
  onContinue, 
  psychologistId,
  psychologistName = 'Tu Psicólogo',
  isEmpathicaPatient = false
}) => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Mapeo de días de inglés a español
  const dayMapping = {
    'MONDAY': 'Lunes',
    'TUESDAY': 'Martes',
    'WEDNESDAY': 'Miércoles',
    'THURSDAY': 'Jueves',
    'FRIDAY': 'Viernes',
    'SATURDAY': 'Sábado',
    'SUNDAY': 'Domingo'
  };

  // Función para formatear hora de 24h a 12h
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Función para obtener el horario del psicólogo
  const fetchPsychologistSchedule = async () => {
    if (!psychologistId) {
      setError('No se pudo identificar al psicólogo');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const data = await userService.getPsychologistDetails(psychologistId);
      console.log('Horario del psicólogo obtenido:', data);
      
      if (data?.psychologistSchedule) {
        setSchedule(data.psychologistSchedule);
      } else {
        setError('No se encontró información de horario disponible');
      }
    } catch (error) {
      console.error('Error obteniendo horario del psicólogo:', error);
      setError('Error al cargar el horario del psicólogo');
    } finally {
      setLoading(false);
    }
  };

  // Cargar horario cuando se abre el modal
  useEffect(() => {
    if (isOpen && psychologistId) {
      fetchPsychologistSchedule();
    }
  }, [isOpen, psychologistId]);

  // Procesar y ordenar el horario
  const processSchedule = () => {
    if (!schedule) return [];

    const processedSchedule = [];
    
    // Orden de días de la semana
    const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    
    dayOrder.forEach(day => {
      if (schedule[day] && schedule[day].length > 0) {
        const daySchedule = {
          day: day,
          dayName: dayMapping[day],
          slots: schedule[day].map(slot => ({
            id: slot.psychologistScheduleId,
            startTime: slot.startTime,
            endTime: slot.endTime,
            startTimeFormatted: formatTime(slot.startTime),
            endTimeFormatted: formatTime(slot.endTime)
          }))
        };
        processedSchedule.push(daySchedule);
      }
    });

    return processedSchedule;
  };

  // Función para generar la fecha de la sesión
  const generateSessionDateTime = (day, startTime) => {
    const today = new Date();
    const dayMapping = {
      'MONDAY': 1, 'TUESDAY': 2, 'WEDNESDAY': 3, 'THURSDAY': 4,
      'FRIDAY': 5, 'SATURDAY': 6, 'SUNDAY': 0
    };
    
    const targetDay = dayMapping[day];
    const currentDay = today.getDay();
    
    // Calcular días hasta el próximo día objetivo
    let daysToAdd = targetDay - currentDay;
    if (daysToAdd <= 0) {
      daysToAdd += 7; // Ir a la próxima semana
    }
    
    const sessionDate = new Date(today);
    sessionDate.setDate(today.getDate() + daysToAdd);
    
    // Establecer la hora de la sesión
    const [hours, minutes] = startTime.split(':');
    sessionDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    return sessionDate.toISOString();
  };

  // Función para manejar la selección de horario
  const handleSlotSelection = (day, slot) => {
    const sessionDateTime = generateSessionDateTime(day, slot.startTime);
    setSelectedSlot({
      day: day,
      slot: slot,
      sessionDateTime: sessionDateTime
    });
  };

  const processedSchedule = processSchedule();

  if (!isOpen) return null;

  return (
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
        maxWidth: 700,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header del modal */}
        <div style={{
          padding: '2rem 2rem 1rem 2rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#0057FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={24} color="#fff" />
            </div>
            <div>
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#333',
                margin: '0 0 0.25rem 0'
              }}>
                Horario Disponible
              </h2>
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: 0
              }}>
                {psychologistName}
              </p>
            </div>
          </div>
          
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido del modal */}
        <div style={{
          padding: '2rem'
        }}>
          {loading ? (
            /* Estado de carga */
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                fontSize: 18,
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
                Cargando horario disponible...
              </div>
            </div>
          ) : error ? (
            /* Estado de error */
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem'
            }}>
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 12,
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <p style={{
                  fontSize: 16,
                  color: '#dc2626',
                  margin: '0 0 1rem 0'
                }}>
                  {error}
                </p>
                <button
                  onClick={fetchPsychologistSchedule}
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
            </div>
          ) : processedSchedule.length === 0 ? (
            /* Sin horario disponible */
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem'
            }}>
              <div style={{
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: 12,
                padding: '2rem'
              }}>
                <p style={{
                  fontSize: 16,
                  color: '#0369a1',
                  margin: '0 0 1rem 0'
                }}>
                  No hay horarios disponibles en este momento
                </p>
                <p style={{
                  fontSize: 14,
                  color: '#0c4a6e',
                  margin: 0
                }}>
                  El psicólogo aún no ha configurado su horario de atención
                </p>
              </div>
            </div>
          ) : (
            /* Horario disponible */
            <>
              {/* Información general */}
              <div style={{
                background: '#f8f9fa',
                borderRadius: 12,
                padding: '1rem',
                marginBottom: '2rem'
              }}>
                <p style={{
                  fontSize: 14,
                  color: '#666',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  📅 Selecciona un día y horario que te funcione mejor para tu sesión
                </p>
              </div>

              {/* Lista de días y horarios */}
              {!selectedSlot && (
                <div style={{
                  background: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: 8,
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: 14,
                    color: '#856404',
                    margin: 0
                  }}>
                    ⚠️ Selecciona un horario para continuar
                  </p>
                </div>
              )}
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {processedSchedule.map((daySchedule) => (
                  <div key={daySchedule.day} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 12,
                    overflow: 'hidden'
                  }}>
                    {/* Header del día */}
                    <div style={{
                      background: '#0057FF',
                      color: '#fff',
                      padding: '1rem',
                      fontSize: 16,
                      fontWeight: 600
                    }}>
                      {daySchedule.dayName}
                    </div>
                    
                    {/* Horarios disponibles */}
                    <div style={{
                      padding: '1rem'
                    }}>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                      }}>
                        {daySchedule.slots.map((slot) => {
                          const isSelected = selectedSlot && 
                            selectedSlot.day === daySchedule.day && 
                            selectedSlot.slot.id === slot.id;
                          
                          return (
                            <div key={slot.id} style={{
                              background: isSelected ? '#0057FF' : '#f0f4ff',
                              border: `1px solid ${isSelected ? '#0057FF' : '#0057FF'}`,
                              borderRadius: 8,
                              padding: '0.75rem 1rem',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              color: isSelected ? '#fff' : '#0057FF'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = '#0057FF';
                                e.currentTarget.style.color = '#fff';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.background = '#f0f4ff';
                                e.currentTarget.style.color = '#0057FF';
                              }
                            }}
                            onClick={() => handleSlotSelection(daySchedule.day, slot)}
                            >
                              <Clock size={16} />
                              <span style={{ fontSize: 14, fontWeight: 500 }}>
                                {slot.startTimeFormatted} - {slot.endTimeFormatted}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Información adicional */}
              <div style={{
                background: '#e3f2fd',
                borderRadius: 12,
                padding: '1rem',
                marginTop: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem'
                }}>
                  <User size={20} color="#1976d2" />
                  <div>
                    <p style={{
                      fontSize: 14,
                      color: '#1976d2',
                      fontWeight: 600,
                      margin: '0 0 0.5rem 0'
                    }}>
                      Información importante:
                    </p>
                    <ul style={{
                      fontSize: 13,
                      color: '#1976d2',
                      margin: 0,
                      paddingLeft: '1rem'
                    }}>
                      <li>Las sesiones tienen una duración de 50 minutos</li>
                      <li>Se realizarán de forma virtual</li>
                      <li>Recibirás un enlace de acceso antes de la sesión</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Botones de acción */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                background: 'transparent',
                border: '2px solid #e0e0e0',
                borderRadius: 12,
                padding: '1rem',
                fontSize: 16,
                fontWeight: 600,
                color: '#666',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ccc';
                e.currentTarget.style.color = '#333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
                e.currentTarget.style.color = '#666';
              }}
            >
              Cerrar
            </button>
            
            <button
              onClick={() => {
                if (selectedSlot) {
                  if (isEmpathicaPatient) {
                    // Para pacientes Empathica, pasar al pago
                    onContinue(psychologistId, selectedSlot.sessionDateTime);
                  } else {
                    // Para pacientes institucionales, crear sesión directamente
                    onContinue(psychologistId, selectedSlot.sessionDateTime);
                  }
                }
              }}
              disabled={!selectedSlot}
              style={{
                flex: 1,
                background: !selectedSlot ? '#ccc' : '#0057FF',
                border: 'none',
                borderRadius: 12,
                padding: '1rem',
                fontSize: 16,
                fontWeight: 600,
                color: '#fff',
                cursor: !selectedSlot ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (selectedSlot) {
                  e.currentTarget.style.background = '#0043cc';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedSlot) {
                  e.currentTarget.style.background = '#0057FF';
                }
              }}
            >
              {isEmpathicaPatient ? 'Crear Cita' : 'Confirmar Sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistScheduleModal;
