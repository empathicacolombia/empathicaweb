import React, { useState, useEffect } from 'react';
import { CalendarDays, Clock, Save, Plus, X, CheckCircle, Edit } from 'lucide-react';
import { userService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente de Gestión de Horarios del Psicólogo
 * Permite configurar disponibilidad semanal, horarios de trabajo y gestión de citas
 * Incluye gestión de franjas horarias, días laborables y configuración de disponibilidad
 */
const PsychologistSchedule = () => {
  const { user } = useAuth();
  
  // Estados para controlar la configuración de horarios
  const [selectedDays, setSelectedDays] = useState(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']);
  const [timeSlots, setTimeSlots] = useState([
    { day: 'Lunes', slots: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'] },
    { day: 'Martes', slots: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'] },
    { day: 'Miércoles', slots: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'] },
    { day: 'Jueves', slots: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'] },
    { day: 'Viernes', slots: ['09:00-10:00', '10:00-11:00', '15:00-16:00', '16:00-17:00'] }
  ]);

  // Estados para controlar la UI
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scheduleSaved, setScheduleSaved] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  
  // Estados para manejar horarios existentes
  const [existingSchedule, setExistingSchedule] = useState(null);
  const [loadingSchedule, setLoadingSchedule] = useState(true);

  /**
   * Días de la semana disponibles para configuración
   */
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  /**
   * Mapeo de días en español a inglés para el backend
   */
  const dayMapping = {
    'Lunes': 'MONDAY',
    'Martes': 'TUESDAY',
    'Miércoles': 'WEDNESDAY',
    'Jueves': 'THURSDAY',
    'Viernes': 'FRIDAY',
    'Sábado': 'SATURDAY',
    'Domingo': 'SUNDAY'
  };
  
  /**
   * Mapeo inverso de días en inglés a español para mostrar
   */
  const reverseDayMapping = {
    'MONDAY': 'Lunes',
    'TUESDAY': 'Martes',
    'WEDNESDAY': 'Miércoles',
    'THURSDAY': 'Jueves',
    'FRIDAY': 'Viernes',
    'SATURDAY': 'Sábado',
    'SUNDAY': 'Domingo'
  };
  
  /**
   * Opciones de horarios disponibles para selección
   * Franjas horarias estándar de 1 hora
   */
  const timeOptions = [
    '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00',
    '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00'
  ];

  /**
   * Carga los horarios existentes del psicólogo
   */
  const loadExistingSchedule = async () => {
    if (!user?.id) {
      setLoadingSchedule(false);
      return;
    }

    try {
      setLoadingSchedule(true);
      const psychologistData = await userService.getPsychologistById(user.id);
      
      if (psychologistData && psychologistData.psychologistSchedule) {
        setExistingSchedule(psychologistData.psychologistSchedule);
        setScheduleSaved(true);
      } else {
        setExistingSchedule(null);
        setScheduleSaved(false);
      }
    } catch (error) {
      console.error('Error cargando horarios existentes:', error);
      setExistingSchedule(null);
      setScheduleSaved(false);
    } finally {
      setLoadingSchedule(false);
    }
  };

  /**
   * Carga los horarios al montar el componente
   */
  useEffect(() => {
    loadExistingSchedule();
  }, [user?.id]);

  /**
   * Agrega un nuevo horario a un día específico
   * Permite expandir la disponibilidad del psicólogo
   * Evita duplicados en el mismo día
   * 
   * @param {string} day - Día de la semana para agregar horario
   */
  const addTimeSlot = (day) => {
    setTimeSlots(prev => {
      // Buscar si ya existe una entrada para este día
      const existingDayIndex = prev.findIndex(slot => slot.day === day);
      
      if (existingDayIndex >= 0) {
        // Si el día ya existe, agregar horario a ese día
        const existingSlot = prev[existingDayIndex];
        const availableTime = timeOptions.find(time => 
          !existingSlot.slots.some(slotData => slotData.time === time)
        );
        
        if (availableTime) {
          const updatedSlots = [...prev];
          updatedSlots[existingDayIndex] = {
            ...existingSlot,
            slots: [...existingSlot.slots, { time: availableTime, scheduleId: null }]
          };
          console.log(`Horario agregado a ${day}: ${availableTime}`);
          return updatedSlots;
        } else {
          console.log(`No hay horarios disponibles para agregar en ${day}`);
          // Si todos los horarios están ocupados, no agregar nada
          return prev;
        }
      } else {
        // Si el día no existe, crear nueva entrada con el primer horario disponible
        const availableTime = timeOptions[0]; // Usar el primer horario disponible
        console.log(`Nuevo día agregado: ${day} con horario: ${availableTime}`);
        return [...prev, {
          day: day,
          slots: [{ time: availableTime, scheduleId: null }]
        }];
      }
    });
  };

  /**
   * Elimina un horario específico de un día
   * Permite reducir la disponibilidad del psicólogo
   * 
   * @param {string} day - Día de la semana
   * @param {number} index - Índice del horario a eliminar
   * @param {number} scheduleId - ID del horario en el backend (opcional)
   */
  const removeTimeSlot = async (day, index, scheduleId = null) => {
    try {
      // Si tenemos el scheduleId, eliminar del backend
      if (scheduleId) {
        await userService.deletePsychologistSchedule(scheduleId);
      }
      
      // Actualizar el estado local
    setTimeSlots(prev => 
      prev.map(slot => 
        slot.day === day 
          ? { ...slot, slots: slot.slots.filter((_, i) => i !== index) }
          : slot
      )
    );
    } catch (error) {
      console.error('Error eliminando horario:', error);
      setError('Error al eliminar el horario. Por favor, inténtalo de nuevo.');
    }
  };

  /**
   * Cambia un horario específico por uno nuevo
   * Permite editar horarios existentes
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
          const isDuplicate = slot.slots.some((slotData, i) => 
            i !== index && slotData.time === newTime
          );
          
          if (isDuplicate) {
            // Si es duplicado, no cambiar el horario
            return slot;
          } else {
            // Si no es duplicado, actualizar el horario
            return {
              ...slot, 
              slots: slot.slots.map((slotData, i) => 
                i === index ? { ...slotData, time: newTime } : slotData
              )
            };
          }
        }
        return slot;
      })
    );
  };

  /**
   * Verifica si un horario está disponible para un día específico
   * 
   * @param {string} day - Día de la semana
   * @param {string} time - Horario a verificar
   * @param {number} excludeIndex - Índice a excluir de la verificación (para edición)
   * @returns {boolean} - True si el horario está disponible
   */
  const isTimeAvailable = (day, time, excludeIndex = -1) => {
    const daySlot = timeSlots.find(slot => slot.day === day);
    if (!daySlot) return true;
    
    return !daySlot.slots.some((slotData, index) => 
      index !== excludeIndex && slotData.time === time
    );
  };

  /**
   * Parsea un horario en formato "HH:MM-HH:MM" y retorna las horas de inicio y fin
   * 
   * @param {string} timeSlot - Horario en formato "HH:MM-HH:MM"
   * @returns {Object} - Objeto con startTime y endTime
   */
  const parseTimeSlot = (timeSlot) => {
    const [startTime, endTime] = timeSlot.split('-');
    return { startTime, endTime };
  };

  /**
   * Guarda la configuración de horarios en el backend
   * Usa POST para crear nuevos horarios o PUT para actualizar existentes
   */
  const saveConfiguration = async () => {
    if (selectedDays.length === 0) {
      setError('Debes seleccionar al menos un día de trabajo');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('=== GUARDANDO CONFIGURACIÓN DE HORARIOS ===');
      console.log('Modo edición:', showEditMode);
      console.log('Días seleccionados:', selectedDays);
      console.log('TimeSlots actuales:', timeSlots);

      // Preparar todos los horarios para enviar al backend
      const scheduleData = [];
      
      timeSlots.forEach(daySlot => {
        if (selectedDays.includes(daySlot.day)) {
          daySlot.slots.forEach(slotData => {
            const { startTime, endTime } = parseTimeSlot(slotData.time);
            scheduleData.push({
              day: dayMapping[daySlot.day],
              startTime: startTime,
              endTime: endTime
            });
          });
        }
      });

      console.log('Datos de horarios a enviar:', scheduleData);

      // Si está en modo edición, primero eliminar horarios existentes
      if (showEditMode && existingSchedule) {
        console.log('Eliminando horarios existentes...');
        
        // Eliminar horarios existentes uno por uno
        for (const day in existingSchedule) {
          const daySlots = existingSchedule[day];
          if (daySlots && Array.isArray(daySlots)) {
            for (const slot of daySlots) {
              if (slot.psychologistScheduleId) {
                try {
                  await userService.deletePsychologistSchedule(slot.psychologistScheduleId);
                  console.log(`Horario eliminado: ${day} ${slot.startTime}-${slot.endTime}`);
                } catch (deleteError) {
                  console.warn(`No se pudo eliminar horario ${slot.psychologistScheduleId}:`, deleteError);
                  // Continuar aunque falle la eliminación
                }
              }
            }
          }
        }
      }

      // Crear los nuevos horarios
      console.log('Creando nuevos horarios...');
      const promises = scheduleData.map(schedule => 
        userService.createPsychologistSchedule(schedule)
      );
      await Promise.all(promises);

      console.log('Horarios guardados exitosamente');

      // Marcar como guardado exitosamente
      setScheduleSaved(true);
      setShowEditMode(false);
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);

      // Recargar los horarios para mostrar el resumen
      await loadExistingSchedule();

    } catch (error) {
      console.error('Error guardando horarios:', error);
      setError(`Error al guardar los horarios: ${error.message || 'Por favor, inténtalo de nuevo.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Habilita el modo de edición para cambiar horarios
   * Carga los horarios existentes en el formulario
   */
  const enableEditMode = () => {
    setShowEditMode(true);
    setScheduleSaved(false);
    
    console.log('=== HABILITANDO MODO EDICIÓN ===');
    console.log('Horarios existentes:', existingSchedule);
    
    // Cargar los horarios existentes en el formulario
    if (existingSchedule) {
      const newTimeSlots = [];
      const newSelectedDays = [];
      
      // Procesar cada día del horario existente
      Object.keys(existingSchedule).forEach(day => {
        const daySlots = existingSchedule[day];
        if (daySlots && daySlots.length > 0) {
          const spanishDay = reverseDayMapping[day];
          newSelectedDays.push(spanishDay);
          
          // Convertir los horarios del formato del backend al formato del formulario
          // Mantener tanto el horario formateado como el ID del backend
          const formattedSlots = daySlots.map(slot => {
            const timeString = `${formatTime(slot.startTime)}-${formatTime(slot.endTime)}`;
            console.log(`Procesando horario: ${spanishDay} ${timeString} (ID: ${slot.psychologistScheduleId})`);
            return {
              time: timeString,
              scheduleId: slot.psychologistScheduleId
            };
          });
          
          newTimeSlots.push({
            day: spanishDay,
            slots: formattedSlots
          });
        }
      });
      
      console.log('Días seleccionados para edición:', newSelectedDays);
      console.log('TimeSlots para edición:', newTimeSlots);
      
      // Actualizar el estado del formulario
      setSelectedDays(newSelectedDays);
      setTimeSlots(newTimeSlots);
    }
  };

  /**
   * Formatea una hora del formato HH:mm:ss a HH:mm
   * @param {string} time - Hora en formato HH:mm:ss
   * @returns {string} - Hora en formato HH:mm
   */
  const formatTime = (time) => {
    if (!time) return '';
    return time.substring(0, 5); // Toma solo HH:mm
  };

  /**
   * Renderiza el resumen de disponibilidad
   */
  const renderAvailabilitySummary = () => {
    if (!existingSchedule) return null;

    const daysWithSlots = Object.keys(existingSchedule).filter(day => 
      existingSchedule[day] && existingSchedule[day].length > 0
    );

    if (daysWithSlots.length === 0) return null;

    return (
      <div style={{
        background: '#f8f9fa',
        borderRadius: 12,
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: 18,
          fontWeight: 700,
          color: '#333',
          margin: '0 0 1rem 0'
        }}>
          📅 Resumen de Disponibilidad
        </h3>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {daysWithSlots.map(day => (
            <div key={day} style={{
              background: '#fff',
              borderRadius: 8,
              padding: '1rem',
              border: '1px solid #e0e7ef'
            }}>
              <div style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#0057FF',
                marginBottom: '0.5rem'
              }}>
                {reverseDayMapping[day]}
              </div>
              
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {existingSchedule[day].map((slot, index) => (
                  <span key={index} style={{
                    background: '#e6f0ff',
                    color: '#0057FF',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 16,
                    fontSize: 14,
                    fontWeight: 500
                  }}>
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Mostrar loading mientras se cargan los horarios
  if (loadingSchedule) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          width: 40,
          height: 40,
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #0057FF',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '1rem', color: '#666' }}>Cargando horarios...</p>
      </div>
    );
  }

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
                {showEditMode ? 'Editando tu disponibilidad semanal' : 
                 scheduleSaved ? 'Tu disponibilidad semanal configurada' : 
                 'Configura tu disponibilidad semanal para recibir citas'}
              </p>
            </div>
          </div>
          
          {/* Botón para cambiar horario si ya está guardado */}
          {scheduleSaved && !showEditMode && (
            <button 
              onClick={enableEditMode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#22C55E',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#16a34a';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#22C55E';
              }}
            >
              <Edit size={16} />
              Cambiar Horario
            </button>
          )}
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

        {/* Mensaje de error */}
        {error && (
          <div style={{
            background: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: 8,
            padding: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <X size={16} color="#721c24" />
            <span style={{ color: '#721c24', fontWeight: 600 }}>
              {error}
            </span>
          </div>
        )}

        {/* Mostrar resumen de disponibilidad si hay horarios guardados */}
        {scheduleSaved && !showEditMode && renderAvailabilitySummary()}
      </div>

      {/* ========================================
           SECCIÓN DE CONFIGURACIÓN DE DISPONIBILIDAD
           ======================================== */}
      {(!scheduleSaved || showEditMode) && (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Botones de acción */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            {/* Botón para cancelar edición (solo en modo edición) */}
            {showEditMode && (
              <button 
                onClick={() => {
                  setShowEditMode(false);
                  setScheduleSaved(true);
                  // Recargar los horarios originales
                  loadExistingSchedule();
                }}
                disabled={isLoading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  if (!isLoading) e.currentTarget.style.background = '#5a6268';
                }}
                onMouseLeave={e => {
                  if (!isLoading) e.currentTarget.style.background = '#6c757d';
                }}
              >
                <X size={16} />
                Cancelar
              </button>
            )}
            
            {/* Botón para guardar configuración */}
          <button 
            onClick={saveConfiguration}
              disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
                background: isLoading ? '#ccc' : '#0057FF',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
                padding: '0.75rem 1.5rem',
              fontWeight: 600,
              fontSize: 14,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                if (!isLoading) e.currentTarget.style.background = '#0046cc';
              }}
              onMouseLeave={e => {
                if (!isLoading) e.currentTarget.style.background = '#0057FF';
              }}
            >
              <Save size={16} />
              {isLoading ? 'Guardando...' : (showEditMode ? 'Actualizar Horarios' : 'Guardar Horarios')}
          </button>
        </div>

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
              // Asegurar que existe una entrada para este día en timeSlots
              let daySlots = timeSlots.find(slot => slot.day === day)?.slots || [];
              
              // Si el día está seleccionado pero no existe en timeSlots, crear entrada vacía
              if (selectedDays.includes(day) && !timeSlots.find(slot => slot.day === day)) {
                setTimeSlots(prev => [...prev, { day: day, slots: [] }]);
                daySlots = [];
              }
            
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
                        background: daySlots.length >= timeOptions.length ? '#ccc' : '#0057FF',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                        padding: '0.5rem 1rem',
                      fontSize: 12,
                      fontWeight: 600,
                        cursor: daySlots.length >= timeOptions.length ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        opacity: daySlots.length >= timeOptions.length ? 0.6 : 1
                      }}
                      onMouseEnter={e => {
                        if (daySlots.length < timeOptions.length) {
                          e.currentTarget.style.background = '#0046cc';
                        }
                      }}
                      onMouseLeave={e => {
                        if (daySlots.length < timeOptions.length) {
                          e.currentTarget.style.background = '#0057FF';
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
                      {daySlots.map((slotData, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                            gap: '8px',
                          background: '#fff',
                          border: '1px solid #e0e0e0',
                          borderRadius: 6,
                          padding: '0.5rem 0.75rem'
                        }}
                      >
                          <Clock size={14} color="#0057FF" />
                        <select
                            value={slotData.time}
                          onChange={(e) => changeTimeSlot(day, index, e.target.value)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#333',
                            outline: 'none',
                              cursor: 'pointer',
                              minWidth: '120px'
                            }}
                          >
                            {timeOptions.map((option) => {
                              // Verificar si esta opción ya está en uso en otro slot del mismo día
                              const isUsed = !isTimeAvailable(day, option, index);
                              
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
                            onClick={() => removeTimeSlot(day, index, slotData.scheduleId)}
                          style={{
                            background: 'none',
                            border: 'none',
                              color: '#dc3545',
                            cursor: 'pointer',
                              padding: 0,
                            display: 'flex',
                              alignItems: 'center'
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                    <p style={{
                      fontSize: 14,
                    color: '#666',
                      fontStyle: 'italic',
                      margin: 0
                  }}>
                    No hay horarios configurados para este día
                    </p>
                )}
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* CSS para animación de loading */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default PsychologistSchedule; 