import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import {
  Home,
  FileText,
  Users,
  Settings,
  Bell,
  HelpCircle,
  ShoppingCart,
  LogOut
} from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';

// Importar componentes de secciones
import BusinessDashboardHome from './BusinessDashboardHome.jsx';
import BusinessReports from './BusinessReports.jsx';
import BusinessEmployees from './BusinessEmployees.jsx';
import BusinessToolkits from './BusinessToolkits.jsx';
import BusinessSettings from './BusinessSettings.jsx';
import BusinessNotifications from './BusinessNotifications.jsx';
import BusinessSupport from './BusinessSupport.jsx';

const BusinessDashboard = ({ navigationProps }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Hook para manejar timeout de sesión (60 minutos de inactividad)
  useSessionTimeout(60);
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /**
   * Extrae el nombre de la compañía de los roles del usuario
   * @returns {string} - Nombre de la compañía o "Empresa" por defecto
   */
  const getCompanyName = () => {
    if (user && user.roles && user.roles.length > 1) {
      const companyRole = user.roles.find(role => role.startsWith('Company:'));
      if (companyRole) {
        return companyRole.replace('Company:', '');
      }
    }
    return 'Empresa';
  };

  // Elementos del sidebar
  const sidebarItems = [
    { icon: <Home size={22} />, label: 'Dashboard', path: '/business-dashboard' },
    { icon: <FileText size={22} />, label: 'Reportes', path: '/business-dashboard/reports' },
    { icon: <Users size={22} />, label: 'Colaboradores', path: '/business-dashboard/employees' },
    { icon: <ShoppingCart size={22} />, label: 'Toolkits', path: '/business-dashboard/toolkits' },
    { icon: <Settings size={22} />, label: 'Configuración', path: '/business-dashboard/settings' },
    { icon: <Bell size={22} />, label: 'Notificaciones', path: '/business-dashboard/notifications' },
    { icon: <HelpCircle size={22} />, label: 'Soporte', path: '/business-dashboard/support' },
  ];

  // Función para manejar la navegación
  const handleNavigation = (path) => {
    navigate(path);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('empathica_user');
    navigate('/login');
  };

  // Determinar la sección activa basada en la ruta actual
  const getActiveSection = () => {
    const path = location.pathname;
    const item = sidebarItems.find(item => item.path === path);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: '#f8f9fa' 
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 220 : 60,
        background: '#fff',
        borderRight: '2px solid #e0e7ef',
        transition: 'width 0.3s ease',
        position: 'fixed',
        height: '100vh',
        zIndex: 1000,
        overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '2px solid #e0e7ef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'flex-start' : 'center'
        }}>
          {sidebarOpen ? (
            <img src={logoEmpathica} alt="Empathica" style={{ height: 40 }} />
          ) : (
            <img src={logoEmpathica} alt="Empathica" style={{ height: 32 }} />
          )}
        </div>

        {/* Navegación */}
        <nav style={{ padding: '1rem 0' }}>
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: sidebarOpen ? 12 : 0,
                padding: sidebarOpen ? '0.8rem 1.5rem' : '0.8rem',
                background: location.pathname === item.path ? '#e6f0ff' : 'transparent',
                color: location.pathname === item.path ? '#2050c7' : '#7a8bbd',
                border: 'none',
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: location.pathname === item.path ? 700 : 500,
                transition: 'all 0.2s',
                justifyContent: sidebarOpen ? 'flex-start' : 'center'
              }}
              onMouseEnter={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.background = '#f8f9fa';
                }
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== item.path) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {item.icon}
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Botón de cerrar sesión */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: '1rem',
          borderTop: '2px solid #e0e7ef'
        }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: sidebarOpen ? 12 : 0,
              padding: sidebarOpen ? '0.8rem 1.5rem' : '0.8rem',
              background: 'transparent',
              color: '#ff4444',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 500,
              justifyContent: sidebarOpen ? 'flex-start' : 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fff5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <LogOut size={22} />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div style={{
        flex: 1,
        marginLeft: sidebarOpen ? 220 : 60,
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Header */}
        <header style={{
          background: '#fff',
          borderBottom: '2px solid #e0e7ef',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 24,
                color: '#7a8bbd',
                cursor: 'pointer',
                padding: 8
              }}
            >
              ☰
            </button>
            <h1 style={{
              color: '#222',
              fontSize: 24,
              fontWeight: 700,
              margin: 0
            }}>
              {getActiveSection()}
            </h1>
          </div>

          {/* Información de la empresa */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16
          }}>
            <div style={{
              background: '#0057FF',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 600
            }}>
              {getCompanyName()}
            </div>
          </div>
        </header>

        {/* Contenido de la sección */}
        <main style={{ padding: '2rem' }}>
          {location.pathname === '/business-dashboard' && (
            <BusinessDashboardHome navigationProps={navigationProps} />
          )}
          {location.pathname === '/business-dashboard/reports' && (
            <BusinessReports navigationProps={navigationProps} />
          )}
          {location.pathname === '/business-dashboard/employees' && (
            <BusinessEmployees navigationProps={navigationProps} />
          )}
          {location.pathname === '/business-dashboard/toolkits' && (
            <BusinessToolkits navigationProps={navigationProps} />
          )}
          {location.pathname === '/business-dashboard/settings' && (
            <BusinessSettings navigationProps={navigationProps} />
          )}
          {location.pathname === '/business-dashboard/notifications' && (
            <BusinessNotifications navigationProps={navigationProps} />
          )}
          {location.pathname === '/business-dashboard/support' && (
            <BusinessSupport navigationProps={navigationProps} />
          )}
        </main>
      </div>
    </div>
  );
};

export default BusinessDashboard;
