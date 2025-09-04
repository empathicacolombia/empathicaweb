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
  Calendar,
  Building2,
  Plus
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
  { icon: <Building2 size={22} />, label: 'Crear Empresa', section: 'Empresas' },
  { icon: <FileText size={22} />, label: 'Reportes', section: 'Reportes' },
  { icon: <Settings size={22} />, label: 'Configuración', section: 'Configuración' },
];

/**
 * Componente de formulario para crear empresa
 */
function CreateCompanyForm({ onCompanyCreated }) {
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (value) => {
    setCompanyName(value);
    // Limpiar mensajes de error al escribir
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validaciones básicas
      if (!companyName.trim()) {
        throw new Error('Por favor ingresa el nombre de la empresa');
      }

      // Aquí iría la llamada al API para crear la empresa
      console.log('Creando empresa:', companyName);
      
      // Simular llamada al API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular respuesta del backend con credenciales
      const newCompany = {
        id: Date.now(), // ID temporal
        name: companyName,
        email: `admin@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
        password: `TempPass${Math.floor(Math.random() * 1000)}!`,
        createdAt: new Date().toISOString().split('T')[0],
        status: 'Activa'
      };
      
      setSuccess('¡Empresa creada exitosamente!');
      
      // Notificar al componente padre
      if (onCompanyCreated) {
        onCompanyCreated(newCompany);
      }
      
      // Limpiar formulario
      setCompanyName('');

    } catch (error) {
      console.error('Error creando empresa:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
      <div style={{ marginBottom: 24 }}>
        <label style={{ 
          display: 'block', 
          color: '#374151', 
          fontWeight: 600, 
          fontSize: 16, 
          marginBottom: 12 
        }}>
          Nombre de la Empresa *
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => handleInputChange(e.target.value)}
          style={{
            width: '100%',
            padding: '16px 20px',
            border: '2px solid #e0e7ef',
            borderRadius: 12,
            fontSize: 16,
            transition: 'border-color 0.2s ease',
            background: '#fff'
          }}
          onFocus={(e) => e.target.style.borderColor = '#0057FF'}
          onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
          placeholder="Ej: Empresa ABC S.A."
        />
      </div>

      {/* Mensajes de error y éxito */}
      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px 16px',
          borderRadius: 8,
          marginBottom: 20,
          fontSize: 14
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          color: '#16a34a',
          padding: '12px 16px',
          borderRadius: 8,
          marginBottom: 20,
          fontSize: 14
        }}>
          {success}
        </div>
      )}

      {/* Botón de envío */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: 16 
      }}>
        <button
          type="button"
          onClick={() => {
            setCompanyName('');
            setError('');
            setSuccess('');
          }}
          style={{
            padding: '12px 24px',
            background: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
        >
          Limpiar
        </button>
        
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: '12px 24px',
            background: isLoading ? '#9ca3af' : '#0057FF',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          onMouseEnter={(e) => {
            if (!isLoading) e.currentTarget.style.background = '#0041CC';
          }}
          onMouseLeave={(e) => {
            if (!isLoading) e.currentTarget.style.background = '#0057FF';
          }}
        >
          {isLoading ? (
            <>
              <div style={{
                width: 16,
                height: 16,
                border: '2px solid #fff',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Creando...
            </>
          ) : (
            <>
              <Plus size={16} />
              Crear Empresa
            </>
          )}
        </button>
      </div>
    </form>
  );
}

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
  
  // Estado para las empresas
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'admin@techcorp.com',
      password: 'TempPass123!',
      createdAt: '2024-01-15',
      status: 'Activa'
    },
    {
      id: 2,
      name: 'InnovateLab',
      email: 'admin@innovatelab.com',
      password: 'TempPass456!',
      createdAt: '2024-01-20',
      status: 'Activa'
    }
  ]);

  // Hook para manejo de timeout de sesión
  useSessionTimeout();

  // Función para manejar la creación de empresas
  const handleCompanyCreated = (newCompany) => {
    setCompanies(prev => [...prev, newCompany]);
  };

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

          {/* Empresas - Crear empresa y lista */}
          {activeSection === 'Empresas' && (
            <div className="dashboard-section">
              {/* Formulario de creación */}
              <div style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: 32, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: 24
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 16, 
                  marginBottom: 32 
                }}>
                  <Building2 size={32} color="#0057FF" />
                  <div>
                    <h2 style={{ 
                      color: '#222', 
                      fontWeight: 700, 
                      fontSize: 28, 
                      margin: 0 
                    }}>
                      Crear Nueva Empresa
                    </h2>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: 16, 
                      margin: '8px 0 0 0' 
                    }}>
                      Registra una nueva empresa en la plataforma
                    </p>
                  </div>
                </div>

                <CreateCompanyForm onCompanyCreated={handleCompanyCreated} />
              </div>

              {/* Lista de empresas */}
              <div style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: 32, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 16, 
                  marginBottom: 24 
                }}>
                  <Building2 size={24} color="#0057FF" />
                  <h3 style={{ 
                    color: '#222', 
                    fontWeight: 700, 
                    fontSize: 24, 
                    margin: 0 
                  }}>
                    Empresas Registradas ({companies.length})
                  </h3>
                </div>

                {companies.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#6b7280'
                  }}>
                    <Building2 size={48} color="#d1d5db" style={{ marginBottom: 16 }} />
                    <p style={{ fontSize: 16, margin: 0 }}>
                      No hay empresas registradas aún
                    </p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                          <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Empresa</th>
                          <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Email Admin</th>
                          <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Contraseña</th>
                          <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Fecha Creación</th>
                          <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Estado</th>
                          <th style={{ padding: '1rem', textAlign: 'center', color: '#222', fontWeight: 700, fontSize: 14 }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies.map((company) => (
                          <tr key={company.id} style={{ borderBottom: '1px solid #e0e7ef' }}>
                            <td style={{ padding: '1rem', color: '#222', fontWeight: 600 }}>{company.name}</td>
                            <td style={{ padding: '1rem', color: '#7a8bbd' }}>{company.email}</td>
                            <td style={{ padding: '1rem', color: '#7a8bbd', fontFamily: 'monospace' }}>{company.password}</td>
                            <td style={{ padding: '1rem', color: '#7a8bbd' }}>{company.createdAt}</td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{
                                background: company.status === 'Activa' ? '#e6f7e6' : '#ffe6e6',
                                color: company.status === 'Activa' ? '#2ecc71' : '#ff4444',
                                padding: '0.3rem 0.8rem',
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 700
                              }}>
                                {company.status}
                              </span>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                              <button style={{
                                background: '#0057ff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                padding: '0.5rem 1rem',
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: 'pointer'
                              }}>
                                Ver Detalles
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
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

// Estilos CSS para animaciones
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inyectar estilos en el documento
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
