import React, { useState } from 'react';
import { CalendarDays, Clock, Save, Plus, X, CheckCircle } from 'lucide-react';

/**
 * Componente de Gestión de Horarios del Psicólogo
 * Permite configurar disponibilidad semanal, horarios de trabajo y gestión de citas
 * Incluye gestión de franjas horarias, días laborables y configuración de disponibilidad
 */
const PsychologistSchedule = () => {
  // Estados para controlar la configuración de horarios
  const [selectedDays, setSelectedDays] = useState(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']);
  const [timeSlots, setTimeSlots] = useState([
    { day: 'Lunes', slots: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'] },
    { day: 'Martes', slots: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'] },
    { day: 'Miércoles', slots: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'] },
    { day: 'Jueves', slots: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'] },
    { day: 'Viernes', slots: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'] }
  ]);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  /**
   * Días de la semana disponibles para configuración
   */
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  /**
   * Opciones de horarios disponibles para selección
   * Franjas horarias estándar de 1 hora
   */
  const timeOptions = [
    '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
    '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00'
  ];

  /**
   * Agrega un nuevo horario a un día específico
   * Permite expandir la disponibilidad del psicólogo
   * Evita duplicados en el mismo día
   * 
   * @param {string} day - Día de la semana para agregar horario
   */
  const addTimeSlot = (day) => {
    setTimeSlots(prev => 
      prev.map(slot => {
        if (slot.day === day) {
          // Encontrar el primer horario disponible que no esté ya en uso
          const availableTime = timeOptions.find(time => !slot.slots.includes(time));
          
          if (availableTime) {
            return { ...slot, slots: [...slot.slots, availableTime] };
          } else {
            // Si todos los horarios están ocupados, no agregar nada
            return slot;
          }
        }
        return slot;
      })
    );
  };

  /**
   * Elimina un horario específico de un día
   * Permite reducir la disponibilidad del psicólogo
   * 
   * @param {string} day - Día de la semana
   * @param {number} index - Índice del horario a eliminar
   */
  const removeTimeSlot = (day, index) => {
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.day === day 
          ? { ...slot, slots: slot.slots.filter((_, i) => i !== index) }
          : slot
      )
    );
  };

  /**
   * Cambia un horario específico por uno nuevo
   * Permite modificar horarios existentes
   * Evita duplicados en el mismo día
   * 
   * @param {string} day - Día de la semana
   * @param {number} index - Índice del horario a cambiar
   * @param {string} newTime - Nuevo horario en formato "HH:MM-HH:MM"
   */
  const changeTimeSlot = (day, index, newTime) => {
    setTimeSlots(prev => 
      prev.map(slot => {
        if (slot.day === day) {
          // Verificar si el nuevo horario ya existe en otro slot del mismo día
          const isDuplicate = slot.slots.some((time, i) => i !== index && time === newTime);
          
          if (isDuplicate) {
            // Si es duplicado, no cambiar el horario
            return slot;
          } else {
            // Si no es duplicado, actualizar el horario
            return {
              ...slot,
              slots: slot.slots.map((time, i) => i === index ? newTime : time)
            };
          }
        }
        return slot;
      })
    );
  };

  /**
   * Guarda la configuración de disponibilidad
   * Muestra mensaje de éxito y simula guardado en backend
   */
  const saveConfiguration = () => {
    console.log('Guardando configuración de disponibilidad:', { selectedDays, timeSlots });
    
    // Simular guardado exitoso
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
    
    // TODO: Implementar guardado en backend y sincronización con calendarios
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* ========================================
           HEADER DE LA SECCIÓN DE HORARIOS
           ======================================== */}
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
            gap: '12px'
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#0057FF15',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0057FF'
            }}>
              <CalendarDays size={24} />
            </div>
            <div>
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                margin: '0 0 0.25rem 0',
                color: '#333'
              }}>
                Gestor de Horarios
              </h2>
              <p style={{
                fontSize: 16,
                color: '#666',
                margin: 0
              }}>
                Configura tu disponibilidad semanal para recibir citas
              </p>
            </div>
          </div>
          
          {/* Botón para guardar configuración */}
          <button 
            onClick={saveConfiguration}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#0057FF',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.75rem 1.5rem',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#0046cc'}
            onMouseLeave={e => e.currentTarget.style.background = '#0057FF'}
          >
            <Save size={16} />
            Guardar Horarios
          </button>
        </div>

        {/* Mensaje de éxito */}
        {showSaveSuccess && (
          <div style={{
            background: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={16} color="#155724" />
            <span style={{ color: '#155724', fontWeight: 600 }}>
              ¡Horarios guardados exitosamente!
            </span>
          </div>
        )}
      </div>

      {/* ========================================
           SECCIÓN DE CONFIGURACIÓN DE DISPONIBILIDAD
           ======================================== */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Días de la semana */}
        <div style={{
          marginBottom: '2rem'
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            color: '#333',
            margin: '0 0 1rem 0'
          }}>
            Días de Trabajo
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => {
                  if (selectedDays.includes(day)) {
                    setSelectedDays(selectedDays.filter(d => d !== day));
                  } else {
                    setSelectedDays([...selectedDays, day]);
                  }
                }}
                style={{
                  background: selectedDays.includes(day) ? '#0057FF' : '#fff',
                  color: selectedDays.includes(day) ? '#fff' : '#0057FF',
                  border: '1px solid #0057FF',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Horarios por día */}
        <div>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            color: '#333',
            margin: '0 0 1rem 0'
          }}>
            Horarios Disponibles
          </h3>
          <p style={{
            fontSize: 14,
            color: '#666',
            margin: '0 0 1.5rem 0'
          }}>
            Configura los horarios disponibles para cada día de trabajo
          </p>

          {selectedDays.map((day) => {
            const daySlots = timeSlots.find(slot => slot.day === day)?.slots || [];
            
            return (
              <div
                key={day}
                style={{
                  background: '#f8f9fa',
                  borderRadius: 8,
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  border: '1px solid #e0e0e0'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#333',
                    margin: 0
                  }}>
                    {day}
                  </h4>
                  <button
                    onClick={() => addTimeSlot(day)}
                    disabled={daySlots.length >= timeOptions.length}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: daySlots.length >= timeOptions.length ? '#ccc' : '#22C55E',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '0.5rem 0.75rem',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: daySlots.length >= timeOptions.length ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      opacity: daySlots.length >= timeOptions.length ? 0.6 : 1
                    }}
                    onMouseEnter={e => {
                      if (daySlots.length < timeOptions.length) {
                        e.currentTarget.style.background = '#16a34a';
                      }
                    }}
                    onMouseLeave={e => {
                      if (daySlots.length < timeOptions.length) {
                        e.currentTarget.style.background = '#22C55E';
                      }
                    }}
                  >
                    <Plus size={14} />
                    {daySlots.length >= timeOptions.length ? 'Sin horarios disponibles' : 'Agregar Horario'}
                  </button>
                </div>

                {daySlots.length > 0 ? (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {daySlots.map((time, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: '#fff',
                          border: '1px solid #e0e0e0',
                          borderRadius: 6,
                          padding: '0.5rem 0.75rem'
                        }}
                      >
                        <Clock size={14} color="#0057FF" />
                        <select
                          value={time}
                          onChange={(e) => changeTimeSlot(day, index, e.target.value)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#333',
                            outline: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          {timeOptions.map((option) => {
                            // Verificar si esta opción ya está en uso en otro slot del mismo día
                            const isUsed = daySlots.some((slotTime, slotIndex) => 
                              slotIndex !== index && slotTime === option
                            );
                            
                            return (
                              <option 
                                key={option} 
                                value={option}
                                disabled={isUsed}
                                style={{
                                  color: isUsed ? '#ccc' : '#333',
                                  fontStyle: isUsed ? 'italic' : 'normal'
                                }}
                              >
                                {option} {isUsed ? '(en uso)' : ''}
                              </option>
                            );
                          })}
                        </select>
                        <button
                          onClick={() => removeTimeSlot(day, index)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = '#dc2626'}
                          onMouseLeave={e => e.currentTarget.style.color = '#EF4444'}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#666',
                    fontSize: 14,
                    background: '#fff',
                    borderRadius: 6,
                    border: '1px dashed #e0e0e0'
                  }}>
                    No hay horarios configurados para este día
                  </div>
                )}
              </div>
            );
          })}

          {selectedDays.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              background: '#f8f9fa',
              borderRadius: 8,
              border: '1px solid #e0e0e0'
            }}>
              <CalendarDays size={48} color="#b0b8c9" style={{ marginBottom: '1rem' }} />
              <h4 style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 0.5rem 0'
              }}>
                No hay días seleccionados
              </h4>
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: 0
              }}>
                Selecciona los días de trabajo para configurar los horarios
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================
           RESUMEN DE CONFIGURACIÓN
           ======================================== */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#333',
          margin: '0 0 1rem 0'
        }}>
          Resumen de Disponibilidad
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            background: '#f8f9fa',
            borderRadius: 8,
            padding: '1rem'
          }}>
            <h4 style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#333',
              margin: '0 0 0.5rem 0'
            }}>
              Días de Trabajo
            </h4>
            <p style={{
              fontSize: 14,
              color: '#666',
              margin: 0
            }}>
              {selectedDays.length > 0 ? selectedDays.join(', ') : 'Ningún día seleccionado'}
            </p>
          </div>

          <div style={{
            background: '#f8f9fa',
            borderRadius: 8,
            padding: '1rem'
          }}>
            <h4 style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#333',
              margin: '0 0 0.5rem 0'
            }}>
              Total de Horarios
            </h4>
            <p style={{
              fontSize: 14,
              color: '#666',
              margin: 0
            }}>
              {timeSlots.reduce((total, day) => total + day.slots.length, 0)} horarios configurados
            </p>
          </div>

          <div style={{
            background: '#f8f9fa',
            borderRadius: 8,
            padding: '1rem'
          }}>
            <h4 style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#333',
              margin: '0 0 0.5rem 0'
            }}>
              Estado
            </h4>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <CheckCircle size={16} color="#22C55E" />
              <span style={{
                fontSize: 14,
                color: '#22C55E',
                fontWeight: 600
              }}>
                Configuración Activa
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistSchedule; 