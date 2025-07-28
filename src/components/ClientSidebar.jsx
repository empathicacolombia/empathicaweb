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

const sidebarItems = [
  { key: 'client-dashboard', label: 'Inicio', icon: <Home size={20} /> },
  { key: 'appointments', label: 'Citas', icon: <CalendarDays size={20} /> },
  { key: 'for-you', label: 'For You', icon: <Heart size={20} /> },
  { key: 'my-specialist', label: 'Mi Especialista', icon: <Users size={20} /> },
  { key: 'support', label: 'Soporte', icon: <LifeBuoy size={20} /> },
  { key: 'profile', label: 'Mi Perfil', icon: <User size={20} /> },
];

const ClientSidebar = ({ navigationProps, activePage, sidebarOpen = true }) => {
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
      boxShadow: sidebarOpen ? '2px 0 12px #0057ff0a' : 'none'
    }}>
      {/* Logo y título */}
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

      {/* Navegación */}
      <div style={{ padding: '1.5rem' }}>
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
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Cerrar sesión */}
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
          <LogOut size={20} />
          {sidebarOpen && <span>Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );
};

export default ClientSidebar; 