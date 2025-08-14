import React, { useState } from 'react';
import { X, Calendar, Check, ArrowLeft } from 'lucide-react';

/**
 * Componente modal para agendar citas en dos etapas
 * Paso 1: Seleccionar fecha y hora
 * Paso 2: Confirmar cita
 * 
 * @param {boolean} isOpen - Estado de apertura del modal
 * @param {Function} onClose - Función para cerrar el modal
 * @param {Function} onAppointmentScheduled - Función para manejar cuando se agenda una cita
 */
const AppointmentCalendarModal = ({ isOpen, onClose, onAppointmentScheduled }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Datos de ejemplo para fechas y horarios disponibles
  const availableDates = [
    { id: 1, date: 'viernes, 15 de agosto de 2025', value: '2025-08-15' },
    { id: 2, date: 'lunes, 18 de agosto de 2025', value: '2025-08-18' },
    { id: 3, date: 'martes, 19 de agosto de 2025', value: '2025-08-19' },
    { id: 4, date: 'miércoles, 20 de agosto de 2025', value: '2025-08-20' },
    { id: 5, date: 'jueves, 21 de agosto de 2025', value: '2025-08-21' },
    { id: 6, date: 'viernes, 22 de agosto de 2025', value: '2025-08-22' }
  ];

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleConfirmAppointment = () => {
    // Crear la nueva cita
    const newAppointment = {
      id: Date.now(), // ID temporal
      type: 'Sesión de seguimiento',
      date: selectedDate.date,
      time: selectedTime,
      specialist: 'Usuario',
      status: 'Confirmada',
      statusColor: '#e8f5e8',
      statusTextColor: '#00C851'
    };

    // Llamar a la función callback para actualizar el estado en el componente padre
    if (onAppointmentScheduled) {
      onAppointmentScheduled(newAppointment);
    }

    // Cerrar el modal
    onClose();
    
    // Resetear el estado
    setCurrentStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
  };

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
        width: '100%',
        maxWidth: 600,
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Header del modal */}
        <div style={{
          padding: '2rem 2rem 1rem 2rem',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.25rem'
              }}>
                <div style={{
                  background: '#22C55E',
                  borderRadius: 8,
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Calendar size={20} color="white" />
                </div>
                <h2 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  margin: 0,
                  color: '#333'
                }}>
                  Agendar Nueva Cita
                </h2>
              </div>
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: 0
              }}>
                Paso {currentStep} de 2
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} color="#333" />
            </button>
          </div>

          {/* Barra de progreso */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '1.5rem'
          }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#22C55E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 600,
              fontSize: 14
            }}>
              1
            </div>
            <div style={{
              flex: 1,
              height: 2,
              background: currentStep >= 2 ? '#22C55E' : '#e0e0e0',
              margin: '0 1rem'
            }} />
            <div style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: currentStep >= 2 ? '#22C55E' : '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: currentStep >= 2 ? 'white' : '#666',
              fontWeight: 600,
              fontSize: 14
            }}>
              2
            </div>
          </div>
        </div>

        {/* Información del especialista */}
        <div style={{
          padding: '1rem 2rem',
          background: '#f0f9ff',
          margin: '0 2rem',
          borderRadius: 12,
          border: '1px solid #e0f2fe'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#22C55E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: 16, color: 'white' }}>👤</span>
            </div>
            <div>
                             <h3 style={{
                 fontSize: 16,
                 fontWeight: 600,
                 color: '#22C55E',
                 margin: '0 0 0.25rem 0'
               }}>
                 Usuario
               </h3>
              <p style={{
                fontSize: 14,
                color: '#166534',
                margin: '0 0 0.5rem 0'
              }}>
                Sesión de seguimiento
              </p>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {['Ansiedad', 'Estrés laboral', 'Mindfulness'].map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: '#dcfce7',
                      color: '#166534',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '12px',
                      fontSize: 12,
                      fontWeight: 500
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del modal */}
        <div style={{ padding: '2rem' }}>
          {currentStep === 1 ? (
            /* ========================================
                 PASO 1: SELECCIONAR FECHA Y HORA
                 ======================================== */
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <Calendar size={20} color="#22C55E" />
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#333',
                  margin: 0
                }}>
                  Seleccionar Fecha y Hora
                </h3>
              </div>

              {/* Fechas disponibles */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#333',
                  margin: '0 0 1rem 0'
                }}>
                  Fecha Disponible
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  maxHeight: 200,
                  overflowY: 'auto'
                }}>
                  {availableDates.map((date) => (
                    <button
                      key={date.id}
                      onClick={() => handleDateSelect(date)}
                      style={{
                        background: selectedDate?.id === date.id ? '#22C55E' : '#fff',
                        color: selectedDate?.id === date.id ? 'white' : '#333',
                        border: `1px solid ${selectedDate?.id === date.id ? '#22C55E' : '#e0e0e0'}`,
                        borderRadius: 12,
                        padding: '1rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {date.date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Horarios disponibles */}
              <div>
                <h4 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#333',
                  margin: '0 0 1rem 0'
                }}>
                  Hora Disponible
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                  gap: '0.75rem'
                }}>
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      style={{
                        background: selectedTime === time ? '#22C55E' : '#fff',
                        color: selectedTime === time ? 'white' : '#333',
                        border: `1px solid ${selectedTime === time ? '#22C55E' : '#e0e0e0'}`,
                        borderRadius: 12,
                        padding: '0.75rem',
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: 500,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ========================================
                 PASO 2: CONFIRMAR CITA
                 ======================================== */
            <div>
              {/* Confirmar tu cita */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <Check size={20} color="#22C55E" />
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#333',
                    margin: 0
                  }}>
                    Confirmar Tu Cita
                  </h3>
                </div>
                
                <div style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '1.5rem',
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}>
                    <div>
                      <p style={{
                        fontSize: 14,
                        color: '#666',
                        margin: '0 0 0.25rem 0'
                      }}>
                        Fecha:
                      </p>
                      <p style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#333',
                        margin: 0
                      }}>
                        {selectedDate?.date}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontSize: 14,
                        color: '#666',
                        margin: '0 0 0.25rem 0'
                      }}>
                        Hora:
                      </p>
                      <p style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#333',
                        margin: 0
                      }}>
                        {selectedTime}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontSize: 14,
                        color: '#666',
                        margin: '0 0 0.25rem 0'
                      }}>
                        Duración:
                      </p>
                      <p style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#333',
                        margin: 0
                      }}>
                        1 hora
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontSize: 14,
                        color: '#666',
                        margin: '0 0 0.25rem 0'
                      }}>
                        Modalidad:
                      </p>
                      <p style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#333',
                        margin: 0
                      }}>
                        Presencial/Virtual
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información de la sesión */}
              <div style={{
                background: '#f0f9ff',
                borderRadius: 12,
                padding: '1.5rem',
                marginBottom: '2rem',
                border: '1px solid #e0f2fe'
              }}>
                <h4 style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#333',
                  margin: '0 0 1rem 0'
                }}>
                  Información de la Sesión
                </h4>
                
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{
                    fontSize: 14,
                    color: '#666',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Áreas a trabajar:
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                    {['Ansiedad', 'Estrés laboral', 'Mindfulness'].map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#dcfce7',
                          color: '#166534',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: 12,
                          fontWeight: 500
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p style={{
                    fontSize: 14,
                    color: '#666',
                    margin: '0 0 0.5rem 0'
                  }}>
                    Tipo de sesión:
                  </p>
                  <p style={{
                    fontSize: 14,
                    color: '#333',
                    margin: 0,
                    lineHeight: 1.5
                  }}>
                    Sesión de seguimiento y continuidad terapéutica basada en tu progreso actual.
                  </p>
                </div>
              </div>

              {/* Todo listo */}
              <div style={{
                background: '#f0f9ff',
                borderRadius: 12,
                padding: '1.5rem',
                border: '1px solid #e0f2fe'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <Check size={16} color="#22C55E" />
                  <h4 style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#333',
                    margin: 0
                  }}>
                    Todo listo:
                  </h4>
                </div>
                <p style={{
                  fontSize: 14,
                  color: '#666',
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  Recibirás un email de confirmación con los detalles de tu cita y el enlace para la sesión virtual si es necesario.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Botones de navegación */}
        <div style={{
          padding: '1rem 2rem 2rem 2rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: currentStep === 1 ? 'flex-end' : 'space-between'
        }}>
          {currentStep === 2 && (
            <button
              onClick={handleBack}
              style={{
                background: '#fff',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <ArrowLeft size={16} />
              Anterior
            </button>
          )}
          
          {currentStep === 1 ? (
            <button
              onClick={handleContinue}
              disabled={!selectedDate || !selectedTime}
              style={{
                background: selectedDate && selectedTime ? '#22C55E' : '#e0e0e0',
                color: selectedDate && selectedTime ? 'white' : '#666',
                border: 'none',
                borderRadius: 8,
                padding: '0.75rem 2rem',
                fontSize: 14,
                fontWeight: 600,
                cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed'
              }}
            >
              Continuar
            </button>
          ) : (
            <button
              onClick={handleConfirmAppointment}
              style={{
                background: '#22C55E',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Calendar size={16} />
              Confirmar Cita
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendarModal; 