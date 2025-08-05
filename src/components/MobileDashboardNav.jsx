import React from 'react';

/**
 * Componente de Navegación Móvil para el Dashboard
 * Proporciona navegación por pestañas en dispositivos móviles
 * Permite cambiar entre diferentes secciones del dashboard de forma rápida
 * 
 * @param {Array} items - Array de elementos de navegación
 * @param {string} items[].section - Identificador único de la sección
 * @param {string} items[].label - Etiqueta visible del elemento
 * @param {ReactNode} items[].icon - Icono del elemento de navegación
 * @param {string} activeSection - Sección actualmente activa
 * @param {Function} onSectionChange - Función que se ejecuta al cambiar de sección
 */
const MobileDashboardNav = ({ items, activeSection, onSectionChange }) => {
  return (
    <div className="mobile-nav-tabs visible-mobile" style={{ display: 'none', marginBottom: '1rem' }}>
      {/* Renderizar cada elemento de navegación como un botón de pestaña */}
      {items.map((item) => (
        <button
          key={item.section}
          className={`mobile-nav-tab ${activeSection === item.section ? 'active' : ''}`}
          onClick={() => onSectionChange(item.section)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: activeSection === item.section ? '#0057FF' : '#f8f9fa',
            color: activeSection === item.section ? '#fff' : '#333',
            border: `1px solid ${activeSection === item.section ? '#0057FF' : '#e0e7ef'}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          {/* Icono del elemento de navegación */}
          {item.icon}
          
          {/* Etiqueta del elemento de navegación */}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileDashboardNav; 