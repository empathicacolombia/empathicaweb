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
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
    
    // Formatear la fecha y hora sin conversión de zona horaria
    // Usar el formato YYYY-MM-DDTHH:mm:ss para mantener la hora local
    const year = sessionDate.getFullYear();
    const month = String(sessionDate.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(sessionDate.getDate()).padStart(2, '0');
    const hour = String(sessionDate.getHours()).padStart(2, '0');
    const minute = String(sessionDate.getMinutes()).padStart(2, '0');
    const second = String(sessionDate.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${dayOfMonth}T${hour}:${minute}:${second}`;
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

  // Función para manejar la selección de fecha
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Limpiar selección de horario
  };

  // Función para navegar entre meses
  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  // Función para obtener los días disponibles en un mes
  const getAvailableDaysInMonth = () => {
    if (!schedule) return [];

    const availableDays = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      const dayName = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][dayOfWeek];
      
      if (schedule[dayName] && schedule[dayName].length > 0) {
        // Verificar que la fecha no sea en el pasado
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date >= today) {
          availableDays.push({
            day: day,
            date: date,
            dayName: dayName,
            slots: schedule[dayName]
          });
        }
      }
    }

    return availableDays;
  };

  // Función para obtener los horarios de un día específico
  const getSlotsForDate = (date) => {
    if (!date || !schedule) return [];

    const dayOfWeek = date.getDay();
    const dayName = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][dayOfWeek];
    
    return schedule[dayName] || [];
  };

  // Función para generar el calendario
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const calendar = [];
    const availableDays = getAvailableDaysInMonth();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isAvailable = availableDays.some(day => day.day === date.getDate());
      const isPast = date < new Date().setHours(0, 0, 0, 0);
      
      calendar.push({
        date: date,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        isAvailable,
        isPast
      });
    }
    
    return calendar;
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
          ) : (
            /* Calendario de horarios */
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
                  📅 Selecciona un día disponible y luego el horario que prefieras
                </p>
              </div>

              {/* Navegación del calendario */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <button
                  onClick={() => navigateMonth(-1)}
                  style={{
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ←
                </button>
                
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#374151',
                  margin: 0
                }}>
                  {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </h3>
                
                <button
                  onClick={() => navigateMonth(1)}
                  style={{
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  →
                </button>
              </div>

              {/* Calendario */}
              <div style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 12,
                overflow: 'hidden',
                marginBottom: '2rem'
              }}>
                {/* Encabezados de días */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  background: '#f9fafb',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                    <div key={day} style={{
                      padding: '0.75rem',
                      textAlign: 'center',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#6b7280'
                    }}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Días del calendario */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, 1fr)'
                }}>
                  {generateCalendar().map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day.isAvailable && !day.isPast && handleDateSelection(day.date)}
                      disabled={!day.isAvailable || day.isPast}
                      style={{
                        background: day.isSelected ? '#0057ff' : 
                                   day.isToday ? '#fef3c7' : 
                                   day.isAvailable ? '#fff' : '#f9fafb',
                        color: day.isSelected ? '#fff' : 
                               day.isToday ? '#92400e' : 
                               day.isAvailable ? '#374151' : '#9ca3af',
                        border: '1px solid #e5e7eb',
                        padding: '0.75rem',
                        fontSize: 14,
                        fontWeight: day.isToday ? 600 : 400,
                        cursor: day.isAvailable && !day.isPast ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s',
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseEnter={(e) => {
                        if (day.isAvailable && !day.isPast && !day.isSelected) {
                          e.target.style.background = '#f3f4f6';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (day.isAvailable && !day.isPast && !day.isSelected) {
                          e.target.style.background = '#fff';
                        }
                      }}
                    >
                      {day.day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mensaje de instrucción */}
              {!selectedDate && (
                <div style={{
                  background: '#fff3cd',
                  border: '1px solid #ffeaa7',
                  borderRadius: 8,
                  padding: '1rem',
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  <p style={{
                    fontSize: 14,
                    color: '#856404',
                    margin: 0
                  }}>
                    📅 Selecciona un día disponible del calendario para ver los horarios
                  </p>
                </div>
              )}

              {/* Horarios del día seleccionado */}
              {selectedDate && (
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: 12,
                  padding: '1.5rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#374151',
                    margin: '0 0 1rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Clock size={18} color="#6b7280" />
                    Horarios disponibles para {selectedDate.toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long' 
                    })}
                  </h4>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {getSlotsForDate(selectedDate).map((slot) => {
                      const isSelected = selectedSlot && 
                        selectedSlot.slot.psychologistScheduleId === slot.psychologistScheduleId;

                      return (
                        <button
                          key={slot.psychologistScheduleId}
                          onClick={() => {
                            const dayOfWeek = selectedDate.getDay();
                            const dayName = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][dayOfWeek];
                            handleSlotSelection(dayName, slot);
                          }}
                          style={{
                            background: isSelected ? '#0057ff' : '#fff',
                            color: isSelected ? '#fff' : '#374151',
                            border: `1px solid ${isSelected ? '#0057ff' : '#d1d5db'}`,
                            borderRadius: 8,
                            padding: '0.75rem',
                            fontSize: 14,
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.target.style.background = '#f3f4f6';
                              e.target.style.borderColor = '#9ca3af';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.target.style.background = '#fff';
                              e.target.style.borderColor = '#d1d5db';
                            }
                          }}
                        >
                          <Clock size={16} />
                          {formatTime(slot.startTime)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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