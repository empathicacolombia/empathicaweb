import React from 'react';
import { X, Calendar } from 'lucide-react';

/**
 * Componente modal para agendar citas usando Google Calendar
 * Muestra un iframe con el calendario de Google para agendar citas
 * 
 * @param {boolean} isOpen - Estado de apertura del modal
 * @param {Function} onClose - Función para cerrar el modal
 */
const AppointmentCalendarModal = ({ isOpen, onClose }) => {
  // URL del calendario de Google para agendar citas
  const googleCalendarUrl = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0qNGkR869lV1f7szWlY8fsyNbIEUUGCUw6XFQqds-vMgnkjIaifZGc5Mz6EyiT4X1Of01x41O_';

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
        width: '95%',
        height: '90vh',
        maxWidth: '1200px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header del modal */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #e0e0e0',
          background: '#fff',
          borderRadius: '16px 16px 0 0'
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
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#f0f0f0';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X size={20} color="#666" />
          </button>
        </div>

        {/* Contenedor del iframe */}
        <div style={{
          flex: 1,
          position: 'relative',
          borderRadius: '0 0 16px 16px',
          overflow: 'hidden'
        }}>
          <iframe
            src={googleCalendarUrl}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '0 0 16px 16px'
            }}
            title="Calendario de Google para agendar citas"
            allow="camera; microphone; fullscreen; speaker; display-capture"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendarModal; 