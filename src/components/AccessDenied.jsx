import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente de página de acceso denegado
 * Se muestra cuando un usuario intenta acceder a una ruta no autorizada
 */
const AccessDenied = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  /**
   * Obtener la ruta del dashboard correspondiente al tipo de usuario
   * @returns {string} - Ruta del dashboard
   */
  const getDashboardRoute = () => {
    if (!user) return '/login';
    
    switch (user.userType) {
      case 'client':
        return '/client-dashboard';
      case 'psychologist':
        return '/psychologist-dashboard';
      case 'business':
        return '/business-dashboard';
      default:
        return '/login';
    }
  };

  /**
   * Manejar el cierre de sesión
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f6f8ff 0%, #fff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 4px 24px rgba(0, 87, 255, 0.1)',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%'
      }}>
        {/* Icono */}
        <div style={{
          fontSize: '64px',
          marginBottom: '24px'
        }}>
          🚫
        </div>

        {/* Título */}
        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 32px)',
          fontWeight: 'bold',
          color: '#0057FF',
          margin: '0 0 16px 0'
        }}>
          Acceso Denegado
        </h1>

        {/* Mensaje */}
        <p style={{
          fontSize: 'clamp(16px, 3vw, 18px)',
          color: '#666',
          lineHeight: 1.6,
          margin: '0 0 32px 0'
        }}>
          No tienes permisos para acceder a esta página. 
          {user && (
            <span>
              {' '}Tu cuenta es de tipo <strong>{user.userType}</strong>.
            </span>
          )}
        </p>

        {/* Botones */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center'
        }}>
          {/* Botón para ir al dashboard correspondiente */}
          {user && (
            <button
              onClick={() => navigate(getDashboardRoute())}
              style={{
                background: '#0057FF',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 87, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Ir a mi Dashboard
            </button>
          )}

          {/* Botón para ir al inicio */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#fff',
              color: '#0057FF',
              border: '2px solid #0057FF',
              borderRadius: 12,
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f0f4ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
            }}
          >
            Ir al Inicio
          </button>

          {/* Botón para cerrar sesión */}
          {user && (
            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '200px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8f9fa';
                e.currentTarget.style.borderColor = '#999';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = '#ddd';
              }}
            >
              Cerrar Sesión
            </button>
          )}
        </div>

        {/* Información adicional */}
        <div style={{
          marginTop: '32px',
          padding: '16px',
          background: '#f8f9fa',
          borderRadius: 12,
          fontSize: '14px',
          color: '#666'
        }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>¿Necesitas ayuda?</strong>
          </p>
          <p style={{ margin: 0 }}>
            Si crees que esto es un error, contacta con soporte técnico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
