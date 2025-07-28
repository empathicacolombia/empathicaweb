import React, { useState } from 'react';
import { X, Calendar, Clock, User, Check } from 'lucide-react';

const AppointmentCalendarModal = ({ isOpen, onClose, navigationProps }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState('individual');

  // Datos del plan del usuario (esto vendría de la base de datos)
  const userPlan = {
    name: 'Plan Cuidador',
    sessionsLimit: 8,
    sessionsUsed: 5,
    sessionsRemaining: 3
  };

  // Horarios disponibles del psicólogo
  const availableHours = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Tipos de sesión
  const sessionTypes = [
    { id: 'individual', name: 'Sesión Individual', duration: '50 min', price: 'Gratis' },
    { id: 'couple', name: 'Sesión de Pareja', duration: '60 min', price: '+$20.000' },
    { id: 'family', name: 'Sesión Familiar', duration: '75 min', price: '+$35.000' }
  ];

  // Generar fechas disponibles (próximas 2 semanas)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Solo días de lunes a viernes
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirmAppointment = () => {
    if (selectedDate && selectedTime && selectedType) {
      // Aquí se procesaría la confirmación de la cita
      console.log('Cita agendada:', {
        date: selectedDate,
        time: selectedTime,
        type: selectedType
      });
      
      // Mostrar mensaje de confirmación
      alert('¡Cita agendada exitosamente!');
      onClose();
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
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
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '2rem',
        maxWidth: 600,
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
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
            <Calendar size={24} color="#0057FF" />
            <h2 style={{
              fontSize: 24,
              fontWeight: 700,
              margin: 0,
              color: '#333'
            }}>
              Agendar Cita
            </h2>
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
            <X size={20} color="#666" />
          </button>
        </div>

        {/* Información del plan */}
        <div style={{
          background: '#f8f9ff',
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '2rem',
          border: '1px solid #e3f2fd'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '0.5rem'
          }}>
            <User size={16} color="#0057FF" />
            <span style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#0057FF'
            }}>
              {userPlan.name}
            </span>
          </div>
          <div style={{
            fontSize: 14,
            color: '#666'
          }}>
            Sesiones disponibles: <strong>{userPlan.sessionsRemaining}</strong> de {userPlan.sessionsLimit}
          </div>
        </div>

        {/* Tipo de sesión */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            margin: '0 0 1rem 0',
            color: '#333'
          }}>
            Tipo de Sesión
          </h3>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {sessionTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                style={{
                  background: selectedType === type.id ? '#0057FF' : '#fff',
                  color: selectedType === type.id ? '#fff' : '#333',
                  border: `2px solid ${selectedType === type.id ? '#0057FF' : '#e0e0e0'}`,
                  borderRadius: 8,
                  padding: '1rem',
                  cursor: 'pointer',
                  flex: 1,
                  minWidth: '150px',
                  textAlign: 'left',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: '0.25rem'
                }}>
                  {type.name}
                </div>
                <div style={{
                  fontSize: 12,
                  opacity: 0.8
                }}>
                  {type.duration} • {type.price}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selección de fecha */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            margin: '0 0 1rem 0',
            color: '#333'
          }}>
            Seleccionar Fecha
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '0.5rem'
          }}>
            {availableDates.map((date) => (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelect(date)}
                style={{
                  background: selectedDate && selectedDate.toDateString() === date.toDateString() ? '#0057FF' : '#fff',
                  color: selectedDate && selectedDate.toDateString() === date.toDateString() ? '#fff' : '#333',
                  border: `2px solid ${selectedDate && selectedDate.toDateString() === date.toDateString() ? '#0057FF' : '#e0e0e0'}`,
                  borderRadius: 8,
                  padding: '0.75rem',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.2s'
                }}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>

        {/* Selección de hora */}
        {selectedDate && (
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
              fontSize: 18,
              fontWeight: 600,
              margin: '0 0 1rem 0',
              color: '#333'
            }}>
              Seleccionar Hora
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '0.5rem'
            }}>
              {availableHours.map((hour) => (
                <button
                  key={hour}
                  onClick={() => handleTimeSelect(hour)}
                  style={{
                    background: selectedTime === hour ? '#0057FF' : '#fff',
                    color: selectedTime === hour ? '#fff' : '#333',
                    border: `2px solid ${selectedTime === hour ? '#0057FF' : '#e0e0e0'}`,
                    borderRadius: 8,
                    padding: '0.75rem',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    transition: 'all 0.2s'
                  }}
                >
                  {hour}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resumen de la cita */}
        {selectedDate && selectedTime && (
          <div style={{
            background: '#f8f9ff',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid #e3f2fd'
          }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              margin: '0 0 1rem 0',
              color: '#333'
            }}>
              Resumen de la Cita
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 14
              }}>
                <span style={{ color: '#666' }}>Fecha:</span>
                <span style={{ fontWeight: 600 }}>{selectedDate.toLocaleDateString('es-ES')}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 14
              }}>
                <span style={{ color: '#666' }}>Hora:</span>
                <span style={{ fontWeight: 600 }}>{selectedTime}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 14
              }}>
                <span style={{ color: '#666' }}>Tipo:</span>
                <span style={{ fontWeight: 600 }}>
                  {sessionTypes.find(t => t.id === selectedType)?.name}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#fff',
              color: '#666',
              border: '2px solid #e0e0e0',
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
            onClick={handleConfirmAppointment}
            disabled={!selectedDate || !selectedTime || !selectedType}
            style={{
              background: selectedDate && selectedTime && selectedType ? '#0057FF' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.75rem 1.5rem',
              fontWeight: 600,
              cursor: selectedDate && selectedTime && selectedType ? 'pointer' : 'not-allowed',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Check size={16} />
            Confirmar Cita
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendarModal; 