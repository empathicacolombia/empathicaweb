import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import SessionTimeoutAlert from './SessionTimeoutAlert';
import {
  Home,
  Users,
  Settings,
  LogOut,
  Shield,
  Activity,
  FileText,
  Calendar
} from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import MobileDashboardNav from './MobileDashboardNav';
import PsychologistManagement from './PsychologistManagement';

/**
 * Elementos de navegación del sidebar del super admin
 * Define las secciones principales del dashboard de administración
 */
const sidebarItems = [
  { icon: <Home size={22} />, label: 'Inicio', section: 'Dashboard' },
  { icon: <Users size={22} />, label: 'Gestión de Psicólogos', section: 'Psicólogos' },
  { icon: <FileText size={22} />, label: 'Reportes', section: 'Reportes' },
  { icon: <Settings size={22} />, label: 'Configuración', section: 'Configuración' },
];

/**
 * Componente de barra de encabezado del dashboard
 */
function HeaderBar({ sidebarOpen, toggleSidebar, user }) {
  return (
    <div className="header-bar" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.2rem 24px',
      background: '#f6f8fa',
      borderBottom: '2px solid #e0e7ef',
      borderRadius: 0,
      position: 'sticky',
      top: 0,
      zIndex: 10,
      width: '100%'
    }}>
      <div className="header-info" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button 
          className="hidden-mobile"
          onClick={toggleSidebar} 
          style={{
            background: 'none',
            border: 'none',
            fontSize: 22,
            color: '#7a8bbd',
            cursor: 'pointer',
            marginRight: 4,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 26 }}>{sidebarOpen ? '☰' : '☰'}</span>
        </button>
        <div>
          <div className="hidden-mobile" style={{ color: '#7a8bbd', fontWeight: 700, fontSize: 15 }}>Panel de Control - Super Admin</div>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginTop: 2 }}>Panel de Super Administrador</div>
        </div>
      </div>
      <div className="user-info" style={{ background: '#fff', borderRadius: 18, padding: '0.5rem 1.2rem', fontWeight: 600, color: '#222', fontSize: 15, boxShadow: '0 2px 8px #e0e7ef' }}>
        {user ? `${user.name} ${user.lastName}` : 'Super Admin'}
      </div>
    </div>
  );
}

/**
 * Componente principal del dashboard de super admin
 */
const SuperAdminDashboard = ({ navigationProps }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Hook para manejo de timeout de sesión
  useSessionTimeout();

  /**
   * Maneja el cierre de sesión del super admin
   */
  const handleLogout = () => {
    logout();
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate('individuals');
    }
  };

  /**
   * Alterna la visibilidad del sidebar
   */
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  /**
   * Maneja la navegación móvil
   */
  const handleMobileNav = (section) => {
    setActiveSection(section);
    setShowMobileNav(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* ========================================
           HEADER / BARRA DE NAVEGACIÓN
           ======================================== */}
      <HeaderBar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        user={user} 
      />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* ========================================
             SIDEBAR DE NAVEGACIÓN
             ======================================== */}
        <div className="sidebar" style={{
          width: sidebarOpen ? 280 : 0,
          background: '#fff',
          borderRight: '2px solid #e0e7ef',
          transition: 'width 0.3s ease',
          overflow: 'hidden',
          position: 'sticky',
          top: 0,
          height: 'calc(100vh - 80px)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Logo y branding */}
          <div style={{ 
            padding: '24px 20px', 
            borderBottom: '1px solid #e0e7ef',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <img 
              src={logoEmpathica} 
              alt="Empathica" 
              style={{ width: 40, height: 40 }}
            />
            <div>
              <div style={{ color: '#0057FF', fontWeight: 700, fontSize: 16 }}>Empathica</div>
              <div style={{ color: '#6b7280', fontSize: 12 }}>Super Admin</div>
            </div>
          </div>

          {/* Navegación */}
          <nav style={{ flex: 1, padding: '20px 0' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {sidebarItems.map((item) => (
                <li key={item.section}>
                  <button
                    onClick={() => setActiveSection(item.section)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '16px 24px',
                      background: activeSection === item.section ? '#0057FF' : 'transparent',
                      color: activeSection === item.section ? '#fff' : '#374151',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 15,
                      fontWeight: activeSection === item.section ? 600 : 500,
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== item.section) {
                        e.currentTarget.style.background = '#f3f4f6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== item.section) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botón de logout */}
          <div style={{ padding: '20px 24px', borderTop: '1px solid #e0e7ef' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#c82333'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#dc3545'; }}
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* ========================================
             CONTENIDO PRINCIPAL
             ======================================== */}
        <div className="main-content" style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto'
        }}>
          {/* Dashboard - Página de inicio temporal */}
          {activeSection === 'Dashboard' && (
            <div className="dashboard-section">
              <div style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: 32, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ marginBottom: 24 }}>
                  <Shield size={64} color="#0057FF" />
                </div>
                <h2 style={{ 
                  color: '#222', 
                  fontWeight: 700, 
                  fontSize: 28, 
                  marginBottom: 16 
                }}>
                  Panel de Super Administrador
                </h2>
                <p style={{ 
                  color: '#6b7280', 
                  fontSize: 16, 
                  lineHeight: 1.6,
                  maxWidth: 600,
                  margin: '0 auto'
                }}>
                  Bienvenido al panel de super administrador. Aquí podrás gestionar las solicitudes de aprobación de psicólogos y administrar la plataforma.
                </p>
                
                <div style={{ 
                  marginTop: 32,
                  padding: 24,
                  background: '#f8f9fa',
                  borderRadius: 8,
                  border: '1px solid #e0e7ef'
                }}>
                  <h3 style={{ 
                    color: '#374151', 
                    fontWeight: 600, 
                    fontSize: 18, 
                    marginBottom: 16 
                  }}>
                    Funcionalidades Próximas
                  </h3>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                    gap: 16 
                  }}>
                    <div style={{ 
                      padding: 16, 
                      background: '#fff', 
                      borderRadius: 8, 
                      border: '1px solid #e0e7ef' 
                    }}>
                      <Users size={24} color="#0057FF" style={{ marginBottom: 8 }} />
                      <h4 style={{ color: '#374151', fontWeight: 600, marginBottom: 8 }}>Gestión de Psicólogos</h4>
                      <p style={{ color: '#6b7280', fontSize: 14 }}>Aprobar solicitudes de psicólogos pendientes</p>
                    </div>
                    <div style={{ 
                      padding: 16, 
                      background: '#fff', 
                      borderRadius: 8, 
                      border: '1px solid #e0e7ef' 
                    }}>
                      <FileText size={24} color="#0057FF" style={{ marginBottom: 8 }} />
                      <h4 style={{ color: '#374151', fontWeight: 600, marginBottom: 8 }}>Reportes</h4>
                      <p style={{ color: '#6b7280', fontSize: 14 }}>Ver estadísticas y reportes de la plataforma</p>
                    </div>
                    <div style={{ 
                      padding: 16, 
                      background: '#fff', 
                      borderRadius: 8, 
                      border: '1px solid #e0e7ef' 
                    }}>
                      <Settings size={24} color="#0057FF" style={{ marginBottom: 8 }} />
                      <h4 style={{ color: '#374151', fontWeight: 600, marginBottom: 8 }}>Configuración</h4>
                      <p style={{ color: '#6b7280', fontSize: 14 }}>Configurar parámetros del sistema</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Psicólogos - Gestión real */}
          {activeSection === 'Psicólogos' && (
            <div className="dashboard-section">
              <PsychologistManagement />
            </div>
          )}

          {/* Reportes - Placeholder */}
          {activeSection === 'Reportes' && (
            <div className="dashboard-section">
              <div style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: 32, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <FileText size={64} color="#6b7280" style={{ marginBottom: 24 }} />
                <h2 style={{ color: '#374151', fontWeight: 600, fontSize: 24, marginBottom: 16 }}>
                  Reportes
                </h2>
                <p style={{ color: '#6b7280', fontSize: 16 }}>
                  Aquí podrás ver estadísticas y reportes de la plataforma.
                </p>
              </div>
            </div>
          )}

          {/* Configuración - Placeholder */}
          {activeSection === 'Configuración' && (
            <div className="dashboard-section">
              <div style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: 32, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <Settings size={64} color="#6b7280" style={{ marginBottom: 24 }} />
                <h2 style={{ color: '#374151', fontWeight: 600, fontSize: 24, marginBottom: 16 }}>
                  Configuración
                </h2>
                <p style={{ color: '#6b7280', fontSize: 16 }}>
                  Aquí podrás configurar parámetros del sistema.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navegación móvil */}
      <MobileDashboardNav
        isOpen={showMobileNav}
        onClose={() => setShowMobileNav(false)}
        items={sidebarItems}
        activeSection={activeSection}
        onSectionChange={handleMobileNav}
        onLogout={handleLogout}
      />

      {/* Alerta de timeout de sesión */}
      <SessionTimeoutAlert />
    </div>
  );
};

export default SuperAdminDashboard;
