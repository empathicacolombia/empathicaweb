import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente para mostrar alertas de timeout de sesión
 * @param {number} warningMinutes - Minutos antes de expirar para mostrar la alerta
 * @param {number} timeoutMinutes - Tiempo total de timeout
 * @returns {JSX.Element|null} - Componente de alerta o null
 */
const SessionTimeoutAlert = ({ warningMinutes = 5, timeoutMinutes = 60 }) => {
  const { clearSession } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(warningMinutes * 60);

  useEffect(() => {
    // Mostrar alerta 5 minutos antes de que expire la sesión
    const warningTime = (timeoutMinutes - warningMinutes) * 60 * 1000;
    const warningTimer = setTimeout(() => {
      setShowWarning(true);
    }, warningTime);

    return () => clearTimeout(warningTimer);
  }, [timeoutMinutes, warningMinutes]);

  useEffect(() => {
    if (!showWarning) return;

    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Sesión expirada
          clearSession();
          window.location.href = '/login';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [showWarning, clearSession]);

  const handleExtendSession = () => {
    // Resetear el timeout extendiendo la sesión
    setShowWarning(false);
    setTimeLeft(warningMinutes * 60);
    
    // Disparar un evento personalizado para resetear el timeout
    window.dispatchEvent(new CustomEvent('extendSession'));
  };

  const handleLogout = () => {
    clearSession();
    window.location.href = '/login';
  };

  if (!showWarning) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

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
      zIndex: 9999
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '2rem',
        maxWidth: 400,
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          fontSize: 24,
          fontWeight: 700,
          color: '#e74c3c',
          marginBottom: 16
        }}>
          ⏰ Sesión por expirar
        </div>
        
        <p style={{
          color: '#666',
          marginBottom: 20,
          lineHeight: 1.5
        }}>
          Tu sesión expirará en{' '}
          <strong style={{ color: '#e74c3c' }}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </strong>
        </p>
        
        <div style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center'
        }}>
          <button
            onClick={handleExtendSession}
            style={{
              background: '#0057ff',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.8rem 1.5rem',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Extender Sesión
          </button>
          
          <button
            onClick={handleLogout}
            style={{
              background: '#e74c3c',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.8rem 1.5rem',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeoutAlert;
