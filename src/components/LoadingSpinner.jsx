import React from 'react';

/**
 * Componente de loading spinner
 * Se muestra mientras se cargan datos o se verifica la autenticación
 */
const LoadingSpinner = ({ message = 'Cargando...' }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f6f8ff 0%, #fff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      {/* Spinner */}
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #0057FF',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '20px'
      }}></div>
      
      {/* Mensaje */}
      <p style={{
        color: '#666',
        fontSize: '16px',
        margin: 0
      }}>
        {message}
      </p>

      {/* Estilos CSS para la animación */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
