import React from 'react';
import { CalendarDays } from 'lucide-react';

/**
 * Componente de Gestión de Horarios del Psicólogo
 * Muestra el calendario público de Google Calendar embebido
 * Permite a los pacientes ver la disponibilidad y agendar citas directamente
 */
const PsychologistSchedule = () => {
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
          gap: '12px',
          marginBottom: '1rem'
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
              Mi Calendario de Disponibilidad
            </h2>
            <p style={{
              fontSize: 16,
              color: '#666',
              margin: 0
            }}>
              Consulta mi disponibilidad y agenda tu cita directamente
            </p>
          </div>
        </div>
      </div>

      {/* ========================================
           CALENDARIO EMBEBIDO DE GOOGLE
           ======================================== */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#0057FF',
            margin: 0
          }}>
            Calendario de Citas
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 14,
            color: '#666'
          }}>
            <div style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#22C55E'
            }} />
            Disponible
          </div>
        </div>

        {/* Iframe del Calendario de Google */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '600px',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          overflow: 'hidden'
        }}>
          <iframe
            src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0qNGkR869lV1f7szWlY8fsyNbIEUUGCUw6XFQqds-vMgnkjIaifZGc5Mz6EyiT4X1Of01x41O_"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: 8
            }}
            title="Calendario de Disponibilidad"
            allowFullScreen
          />
        </div>

        {/* Información adicional */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: '#f8f9fa',
          borderRadius: 8,
          border: '1px solid #e0e7ef'
        }}>
          <h4 style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#333',
            margin: '0 0 0.5rem 0'
          }}>
            📅 Información del Calendario
          </h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            fontSize: 14,
            color: '#666',
            lineHeight: 1.6
          }}>
            <li>Las citas se pueden agendar directamente desde este calendario</li>
            <li>Los horarios mostrados reflejan mi disponibilidad actual</li>
            <li>Recibirás una confirmación por email al agendar</li>
            <li>Puedes cancelar o reprogramar hasta 24 horas antes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PsychologistSchedule; 