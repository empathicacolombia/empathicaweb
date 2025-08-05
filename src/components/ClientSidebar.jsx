import React from 'react';
import {
  Home,
  CalendarDays,
  Heart,
  Users,
  LifeBuoy,
  User,
  LogOut
} from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';

/**
 * Configuración de elementos de navegación del sidebar
 * Define todos los enlaces y sus iconos correspondientes
 */
const sidebarItems = [
  { key: 'client-dashboard', label: 'Inicio', icon: <Home size={20} /> },
  { key: 'appointments', label: 'Citas', icon: <CalendarDays size={20} /> },
  { key: 'for-you', label: 'For You', icon: <Heart size={20} /> },
  { key: 'my-specialist', label: 'Mi Especialista', icon: <Users size={20} /> },
  { key: 'support', label: 'Soporte', icon: <LifeBuoy size={20} /> },
  { key: 'client-profile', label: 'Mi Perfil', icon: <User size={20} /> },
];

/**
 * Componente de Sidebar para el Dashboard del Cliente
 * Proporciona navegación principal entre las diferentes secciones del dashboard
 * Incluye logo, menú de navegación y botón de cerrar sesión
 * 
 * @param {Object} navigationProps - Propiedades para navegación
 * @param {Function} navigationProps.onNavigate - Función para cambiar de página
 * @param {string} activePage - Página actualmente activa
 * @param {boolean} sidebarOpen - Estado de apertura del sidebar
 */
const ClientSidebar = ({ navigationProps, activePage, sidebarOpen = true }) => {
  /**
   * Maneja la navegación entre diferentes páginas de la aplicación
   * @param {string} page - Nombre de la página a la que navegar
   */
  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  return (
    <div className="sidebar" style={{
      width: sidebarOpen ? '260px' : '0px',
      background: '#f6f8ff',
      borderRight: '1px solid #e0e7ef',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      boxShadow: sidebarOpen ? '2px 0 12px #0057ff0a' : 'none',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    }}>
      {/* ========================================
           SECCIÓN DEL LOGO Y TÍTULO
           ======================================== */}
      <div style={{
        padding: '2rem 1.5rem',
        borderBottom: '1px solid #e0e7ef',
        background: '#fff',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* Logo circular de Empathica */}
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#0057FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <img src={logoEmpathica} alt="Logo Empathica" style={{ width: 32, height: 32, objectFit: 'contain', display: 'block' }} />
          </div>
          
          {/* Título y subtítulo - Solo visible cuando sidebar está abierto */}
          {sidebarOpen && (
            <div>
              <div style={{
                fontWeight: 700,
                fontSize: 18,
                color: '#0057FF'
              }}>
                Empathica
              </div>
              <div style={{
                fontSize: 12,
                color: '#7a8bbd',
                marginTop: '2px'
              }}>
                Tu bienestar emocional
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================
           SECCIÓN DE NAVEGACIÓN PRINCIPAL
           ======================================== */}
      <div style={{ 
        padding: '1.5rem',
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        {/* Título de la sección de navegación */}
        {sidebarOpen && (
          <div style={{
            fontSize: 12,
            color: '#7a8bbd',
            fontWeight: 600,
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Navegación
          </div>
        )}
        
        {/* Lista de elementos de navegación */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sidebarItems.map(item => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0.75rem',
                background: activePage === item.key ? '#e3f2fd' : 'transparent',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                width: '100%',
                color: activePage === item.key ? '#0057FF' : '#666',
                fontWeight: activePage === item.key ? 600 : 400,
                transition: 'background 0.2s'
              }}
            >
              {/* Icono del elemento de navegación */}
              {item.icon}
              
              {/* Etiqueta del elemento - Solo visible cuando sidebar está abierto */}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================
           SECCIÓN DE CERRAR SESIÓN
           ======================================== */}
      <div style={{ marginTop: 'auto', padding: '1.5rem' }}>
        <button
          onClick={() => handleNavigation('individuals')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '0.75rem',
            background: 'transparent',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            width: '100%',
            color: '#ff4444',
            fontWeight: 600,
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#ffe6e6'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {/* Icono de cerrar sesión */}
          <LogOut size={20} />
          
          {/* Etiqueta de cerrar sesión - Solo visible cuando sidebar está abierto */}
          {sidebarOpen && <span>Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default ClientSidebar; 