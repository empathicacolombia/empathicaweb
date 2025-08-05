import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Componente de botón de retroceso
 * Permite navegar hacia atrás en el historial del navegador
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.fallbackPage - Página a la cual navegar si no hay historial
 * @param {string} props.className - Clases CSS adicionales
 * @param {string} props.text - Texto del botón (opcional)
 * @param {boolean} props.showIcon - Si mostrar el icono de flecha
 * @param {Function} props.onClick - Función personalizada al hacer clic
 */
const BackButton = ({ 
  fallbackPage = '/', 
  className = '', 
  text = 'Volver', 
  showIcon = true,
  onClick = null 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    // Si hay historial, navegar hacia atrás
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Si no hay historial, navegar a la página de fallback
      navigate(fallbackPage);
    }
  };

  return (
    <button
      onClick={handleBackClick}
      className={`back-button ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        color: '#7a8bbd',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        textDecoration: 'none'
      }}
      onMouseEnter={(e) => {
        e.target.style.color = '#2050c7';
        e.target.style.background = '#f0f4ff';
      }}
      onMouseLeave={(e) => {
        e.target.style.color = '#7a8bbd';
        e.target.style.background = 'none';
      }}
    >
      {showIcon && <ArrowLeft size={18} />}
      {text}
    </button>
  );
};

export default BackButton; 