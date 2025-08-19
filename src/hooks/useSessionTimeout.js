import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook personalizado para manejar el timeout de sesión por inactividad
 * @param {number} timeoutMinutes - Tiempo en minutos antes de cerrar sesión por inactividad
 * @returns {void}
 */
export const useSessionTimeout = (timeoutMinutes = 60) => {
  const { clearSession } = useAuth();
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Establecer nuevo timeout
    timeoutRef.current = setTimeout(() => {
      console.log(`Sesión cerrada por inactividad (${timeoutMinutes} minutos)`);
      clearSession();
      window.location.href = '/login';
    }, timeoutMinutes * 60 * 1000);
  };

  useEffect(() => {
    // Eventos que resetean el timeout
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    // Agregar event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimeout, true);
    });

    // Iniciar el timeout
    resetTimeout();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout, true);
      });
    };
  }, [timeoutMinutes, clearSession]);
};
