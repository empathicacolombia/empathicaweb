import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import SessionTimeoutAlert from './SessionTimeoutAlert';
import { companyService } from '../services/api';
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
  { icon: <Building2 size={22} />, label: 'Gestión de Empresas', section: 'Empresas' },
  { icon: <FileText size={22} />, label: 'Reportes', section: 'Reportes' },
  { icon: <Settings size={22} />, label: 'Configuración', section: 'Configuración' },
];

/**
 * Componente de formulario para crear empresa
 */
function CreateCompanyForm({ onCompanyCreated }) {
  const [formData, setFormData] = useState({
    companyName: '',
    adminName: '',
    adminLastName: '',
    adminEmail: '',
    adminPhone: '',
    adminDateOfBirth: '',
    adminGender: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
      if (!formData.companyName.trim()) {
        throw new Error('Por favor ingresa el nombre de la empresa');
      }
      if (!formData.adminName.trim()) {
        throw new Error('Por favor ingresa el nombre del administrador');
      }
      if (!formData.adminLastName.trim()) {
        throw new Error('Por favor ingresa el apellido del administrador');
      }
      if (!formData.adminEmail.trim()) {
        throw new Error('Por favor ingresa el email del administrador');
      }
      if (!formData.adminPhone.trim()) {
        throw new Error('Por favor ingresa el teléfono del administrador');
      }
      if (formData.adminPhone.trim().length !== 10) {
        throw new Error('El teléfono debe tener exactamente 10 dígitos');
      }
      if (!formData.adminDateOfBirth) {
        throw new Error('Por favor ingresa la fecha de nacimiento del administrador');
      }
      if (!formData.adminGender) {
        throw new Error('Por favor selecciona el género del administrador');
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.adminEmail)) {
        throw new Error('El email del administrador no tiene un formato válido');
      }

      // Crear la empresa con administrador en una sola llamada
      const companyData = {
        name: formData.companyName.trim(),
        admin: {
          name: formData.adminName.trim(),
          lastName: formData.adminLastName.trim(),
          email: formData.adminEmail.trim(),
          phoneNumber: formData.adminPhone.trim(),
          dateOfBirth: formData.adminDateOfBirth,
          gender: formData.adminGender
        }
      };
      
      const response = await companyService.createCompany(companyData);
      console.log('Empresa y administrador creados exitosamente:', response);
      
      setSuccess('¡Empresa y administrador creados exitosamente!');
      
      // Notificar al componente padre con la respuesta del backend
      if (onCompanyCreated) {
        onCompanyCreated(response);
      }
      
      // Limpiar formulario
      setFormData({
        companyName: '',
        adminName: '',
        adminLastName: '',
        adminEmail: '',
        adminPhone: '',
        adminDateOfBirth: '',
        adminGender: ''
      });

    } catch (error) {
      console.error('Error creando empresa con administrador:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Error al crear la empresa. Por favor intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
      {/* Información de la Empresa */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ 
          color: '#374151', 
          fontWeight: 600, 
          fontSize: 20, 
          marginBottom: 20,
          paddingBottom: 8,
          borderBottom: '2px solid #e0e7ef'
        }}>
          Información de la Empresa
        </h3>
        
        <div>
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
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
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
      </div>

      {/* Información del Administrador */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ 
          color: '#374151', 
          fontWeight: 600, 
          fontSize: 20, 
          marginBottom: 20,
          paddingBottom: 8,
          borderBottom: '2px solid #e0e7ef'
        }}>
          Información del Administrador
        </h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 20 
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontWeight: 600, 
              fontSize: 14, 
              marginBottom: 8 
            }}>
              Nombre *
            </label>
            <input
              type="text"
              value={formData.adminName}
              onChange={(e) => handleInputChange('adminName', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e7ef',
                borderRadius: 8,
                fontSize: 14,
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0057FF'}
              onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
              placeholder="Nombre"
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontWeight: 600, 
              fontSize: 14, 
              marginBottom: 8 
            }}>
              Apellido *
            </label>
            <input
              type="text"
              value={formData.adminLastName}
              onChange={(e) => handleInputChange('adminLastName', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e7ef',
                borderRadius: 8,
                fontSize: 14,
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0057FF'}
              onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
              placeholder="Apellido"
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontWeight: 600, 
              fontSize: 14, 
              marginBottom: 8 
            }}>
              Email *
            </label>
            <input
              type="email"
              value={formData.adminEmail}
              onChange={(e) => handleInputChange('adminEmail', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e7ef',
                borderRadius: 8,
                fontSize: 14,
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0057FF'}
              onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
              placeholder="admin@empresa.com"
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontWeight: 600, 
              fontSize: 14, 
              marginBottom: 8 
            }}>
              Teléfono *
            </label>
            <input
              type="tel"
              value={formData.adminPhone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Solo números
                if (value.length <= 10) {
                  handleInputChange('adminPhone', value);
                }
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e7ef',
                borderRadius: 8,
                fontSize: 14,
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0057FF'}
              onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
              placeholder="1234567890"
              maxLength={10}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontWeight: 600, 
              fontSize: 14, 
              marginBottom: 8 
            }}>
              Fecha de Nacimiento *
            </label>
            <input
              type="date"
              value={formData.adminDateOfBirth}
              onChange={(e) => handleInputChange('adminDateOfBirth', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e7ef',
                borderRadius: 8,
                fontSize: 14,
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0057FF'}
              onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              color: '#374151', 
              fontWeight: 600, 
              fontSize: 14, 
              marginBottom: 8 
            }}>
              Género *
            </label>
            <select
              value={formData.adminGender}
              onChange={(e) => handleInputChange('adminGender', e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e0e7ef',
                borderRadius: 8,
                fontSize: 14,
                transition: 'border-color 0.2s ease',
                background: '#fff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0057FF'}
              onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
            >
              <option value="">Seleccionar género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decir">Prefiero no decir</option>
            </select>
          </div>
        </div>
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

      {/* Mensaje informativo */}
      <div style={{
        background: '#f0f9ff',
        border: '1px solid #0ea5e9',
        borderRadius: 8,
        padding: '12px 16px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <div style={{
          width: 20,
          height: 20,
          background: '#0ea5e9',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold'
        }}>
          i
        </div>
        <div style={{ color: '#0c4a6e', fontSize: 14, fontWeight: 500 }}>
          <strong>Importante:</strong> El administrador recibirá un correo electrónico con su contraseña para acceder al dashboard de la empresa.
        </div>
      </div>

      {/* Botón de envío */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: 16 
      }}>
        <button
          type="button"
          onClick={() => {
            setFormData({
              companyName: '',
              adminName: '',
              adminLastName: '',
              adminEmail: '',
              adminPhone: '',
              adminDateOfBirth: '',
              adminGender: ''
            });
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
                      Crear Empresa y Admin
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
  const [companies, setCompanies] = useState([]);
  const [companiesPagination, setCompaniesPagination] = useState({
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    size: 0,
    number: 0,
    numberOfElements: 0,
    empty: true
  });
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [companiesError, setCompaniesError] = useState('');
  
  // Estados para el modal de detalles
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyAdmins, setCompanyAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [adminsError, setAdminsError] = useState('');

  // Hook para manejo de timeout de sesión
  useSessionTimeout();

  // Función para cargar las empresas
  const fetchCompanies = async () => {
    try {
      setLoadingCompanies(true);
      setCompaniesError('');
      const response = await companyService.getCompanies();
      console.log('Respuesta completa del servidor:', response);
      
      // Extraer las empresas del contenido paginado
      const companiesList = response.content || [];
      setCompanies(companiesList);
      
      // Guardar información de paginación
      setCompaniesPagination({
        totalElements: response.totalElements || 0,
        totalPages: response.totalPages || 0,
        first: response.first || true,
        last: response.last || true,
        size: response.size || 0,
        number: response.number || 0,
        numberOfElements: response.numberOfElements || 0,
        empty: response.empty || true
      });
      
      console.log('Empresas extraídas:', companiesList);
      console.log('Total de empresas:', response.totalElements);
    } catch (error) {
      console.error('Error obteniendo empresas:', error);
      setCompaniesError('Error al cargar las empresas');
      setCompanies([]);
    } finally {
      setLoadingCompanies(false);
    }
  };

  // Función para manejar la creación de empresas
  const handleCompanyCreated = (newCompany) => {
    // Agregar la nueva empresa a la lista
    setCompanies(prev => [...prev, newCompany]);
    
    // Actualizar la información de paginación
    setCompaniesPagination(prev => ({
      ...prev,
      totalElements: prev.totalElements + 1,
      numberOfElements: prev.numberOfElements + 1,
      empty: false
    }));
  };

  // Función para cargar administradores de una empresa
  const fetchCompanyAdmins = async (companyId) => {
    setLoadingAdmins(true);
    setAdminsError('');
    
    try {
      const response = await companyService.getCompanyAdmins(companyId);
      console.log('Administradores obtenidos:', response);
      
      // Extraer los administradores del contenido paginado
      const adminsList = response.content || [];
      setCompanyAdmins(adminsList);
      
      console.log('Administradores extraídos:', adminsList);
    } catch (error) {
      console.error('Error cargando administradores:', error);
      setAdminsError('Error al cargar los administradores de la empresa');
      setCompanyAdmins([]);
    } finally {
      setLoadingAdmins(false);
    }
  };

  // Función para abrir el modal de detalles
  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setShowDetailsModal(true);
    fetchCompanyAdmins(company.companyId);
  };

  // Función para cerrar el modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedCompany(null);
    setCompanyAdmins([]);
    setAdminsError('');
  };

  // Cargar empresas al montar el componente
  useEffect(() => {
    if (activeSection === 'Empresas') {
      fetchCompanies();
    }
  }, [activeSection]);

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
                  Bienvenido al panel de super administrador. Aquí podrás gestionar empresas, crear administradores, aprobar solicitudes de psicólogos y administrar la plataforma.
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
                    Funcionalidades Disponibles
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
                      border: '1px solid #e0e7ef',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: '#10b981',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: 4
                      }}>
                        DISPONIBLE
                      </div>
                      <Building2 size={24} color="#10b981" style={{ marginBottom: 8 }} />
                      <h4 style={{ color: '#374151', fontWeight: 600, marginBottom: 8 }}>Gestión de Empresas</h4>
                      <p style={{ color: '#6b7280', fontSize: 14 }}>Crear empresas y gestionar administradores</p>
                    </div>
                    <div style={{ 
                      padding: 16, 
                      background: '#fff', 
                      borderRadius: 8, 
                      border: '1px solid #e0e7ef',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: '#10b981',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: 4
                      }}>
                        DISPONIBLE
                      </div>
                      <Users size={24} color="#10b981" style={{ marginBottom: 8 }} />
                      <h4 style={{ color: '#374151', fontWeight: 600, marginBottom: 8 }}>Gestión de Psicólogos</h4>
                      <p style={{ color: '#6b7280', fontSize: 14 }}>Aprobar solicitudes de psicólogos pendientes</p>
                    </div>
                  </div>
                  
                  <h3 style={{ 
                    color: '#374151', 
                    fontWeight: 600, 
                    fontSize: 18, 
                    marginTop: 32,
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
                      border: '1px solid #e0e7ef',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: '#f59e0b',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: 4
                      }}>
                        PRÓXIMO
                      </div>
                      <FileText size={24} color="#f59e0b" style={{ marginBottom: 8 }} />
                      <h4 style={{ color: '#374151', fontWeight: 600, marginBottom: 8 }}>Reportes Avanzados</h4>
                      <p style={{ color: '#6b7280', fontSize: 14 }}>Estadísticas detalladas y análisis de la plataforma</p>
                    </div>
                    <div style={{ 
                      padding: 16, 
                      background: '#fff', 
                      borderRadius: 8, 
                      border: '1px solid #e0e7ef',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: '#f59e0b',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: 4
                      }}>
                        PRÓXIMO
                      </div>
                      <Settings size={24} color="#f59e0b" style={{ marginBottom: 8 }} />
                      <h4 style={{ color: '#374151', fontWeight: 600, marginBottom: 8 }}>Configuración del Sistema</h4>
                      <p style={{ color: '#6b7280', fontSize: 14 }}>Parámetros avanzados y configuraciones globales</p>
                    </div>
                    <div style={{ 
                      padding: 16, 
                      background: '#fff', 
                      borderRadius: 8, 
                      border: '1px solid #e0e7ef',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: '#f59e0b',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: 4
                      }}>
                        PRÓXIMO
                      </div>
                      <Shield size={24} color="#f59e0b" style={{ marginBottom: 8 }} />
                      <h4 style={{ color: '#374151', fontWeight: 600, marginBottom: 8 }}>Gestión de Usuarios</h4>
                      <p style={{ color: '#6b7280', fontSize: 14 }}>Administrar usuarios y permisos del sistema</p>
                    </div>
                    <div style={{ 
                      padding: 16, 
                      background: '#fff', 
                      borderRadius: 8, 
                      border: '1px solid #e0e7ef',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: '#f59e0b',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: 4
                      }}>
                        PRÓXIMO
                      </div>
                      <Activity size={24} color="#f59e0b" style={{ marginBottom: 8 }} />
                      <h4 style={{ color: '#374151', fontWeight: 600, marginBottom: 8 }}>Monitoreo en Tiempo Real</h4>
                      <p style={{ color: '#6b7280', fontSize: 14 }}>Dashboard de métricas y actividad en vivo</p>
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
                    Empresas Registradas ({companiesPagination.totalElements})
                  </h3>
                </div>

                {loadingCompanies ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#6b7280'
                  }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      border: '3px solid #e0e7ef',
                      borderTop: '3px solid #0057FF',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      margin: '0 auto 16px auto'
                    }} />
                    <p style={{ fontSize: 16, margin: 0 }}>
                      Cargando empresas...
                    </p>
                  </div>
                ) : companiesError ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#dc2626'
                  }}>
                    <Building2 size={48} color="#fecaca" style={{ marginBottom: 16 }} />
                    <p style={{ fontSize: 16, margin: '0 0 16px 0' }}>
                      {companiesError}
                    </p>
                    <button
                      onClick={fetchCompanies}
                      style={{
                        background: '#0057FF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 16px',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Reintentar
                    </button>
                  </div>
                ) : companies.length === 0 ? (
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
                          <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Estado</th>
                          <th style={{ padding: '1rem', textAlign: 'center', color: '#222', fontWeight: 700, fontSize: 14 }}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies.map((company) => (
                          <tr key={company.companyId} style={{ borderBottom: '1px solid #e0e7ef' }}>
                            <td style={{ padding: '1rem', color: '#222', fontWeight: 600 }}>{company.name}</td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{
                                background: '#e6f7e6',
                                color: '#2ecc71',
                                padding: '0.3rem 0.8rem',
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 700
                              }}>
                                Activa
                              </span>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'center' }}>
                              <button 
                                onClick={() => handleViewDetails(company)}
                                style={{
                                  background: '#0057ff',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: 8,
                                  padding: '0.5rem 1rem',
                                  fontSize: 12,
                                  fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                              >
                                Ver Detalles
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    
                    {/* Información de paginación */}
                    {companiesPagination.totalElements > 0 && (
                      <div style={{
                        marginTop: 20,
                        padding: '16px 20px',
                        background: '#f8f9fa',
                        borderRadius: 8,
                        border: '1px solid #e0e7ef',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 14,
                        color: '#6b7280'
                      }}>
                        <div>
                          Mostrando {companiesPagination.numberOfElements} de {companiesPagination.totalElements} empresas
                        </div>
                        <div>
                          Página {companiesPagination.number + 1} de {companiesPagination.totalPages}
                        </div>
                      </div>
                    )}
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

      {/* Modal de Detalles de Empresa */}
      {showDetailsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 20
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }}>
            {/* Header del Modal */}
            <div style={{
              padding: '24px 32px',
              borderBottom: '1px solid #e0e7ef',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{
                  color: '#222',
                  fontWeight: 700,
                  fontSize: 24,
                  margin: 0,
                  marginBottom: 8
                }}>
                  Detalles de {selectedCompany?.name}
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: 14,
                  margin: 0
                }}>
                  Información de administradores
                </p>
              </div>
              <button
                onClick={closeDetailsModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  color: '#6b7280',
                  cursor: 'pointer',
                  padding: 8,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </div>

            {/* Contenido del Modal */}
            <div style={{ padding: '32px' }}>
              {loadingAdmins ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#6b7280'
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    border: '3px solid #e0e7ef',
                    borderTop: '3px solid #0057FF',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 16px'
                  }} />
                  <p style={{ fontSize: 16, margin: 0 }}>Cargando administradores...</p>
                </div>
              ) : adminsError ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#ef4444'
                }}>
                  <p style={{ fontSize: 16, margin: 0, marginBottom: 16 }}>{adminsError}</p>
                  <button
                    onClick={() => fetchCompanyAdmins(selectedCompany.companyId)}
                    style={{
                      background: '#0057FF',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 16px',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Reintentar
                  </button>
                </div>
              ) : companyAdmins.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: '#6b7280'
                }}>
                  <Building2 size={48} color="#d1d5db" style={{ marginBottom: 16 }} />
                  <p style={{ fontSize: 16, margin: 0 }}>No hay administradores registrados</p>
                </div>
              ) : (
                <div>
                  <h3 style={{
                    color: '#374151',
                    fontWeight: 600,
                    fontSize: 18,
                    marginBottom: 20
                  }}>
                    Administradores ({companyAdmins.length})
                  </h3>
                  
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                          <th style={{ padding: '12px', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Nombre</th>
                          <th style={{ padding: '12px', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Email</th>
                          <th style={{ padding: '12px', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Teléfono</th>
                          <th style={{ padding: '12px', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Género</th>
                          <th style={{ padding: '12px', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companyAdmins.map((admin) => (
                          <tr key={admin.userId} style={{ borderBottom: '1px solid #e0e7ef' }}>
                            <td style={{ padding: '12px', color: '#222', fontWeight: 600 }}>
                              {admin.name} {admin.lastName}
                            </td>
                            <td style={{ padding: '12px', color: '#6b7280' }}>{admin.email}</td>
                            <td style={{ padding: '12px', color: '#6b7280' }}>{admin.phoneNumber}</td>
                            <td style={{ padding: '12px', color: '#6b7280' }}>{admin.gender}</td>
                            <td style={{ padding: '12px' }}>
                              <span style={{
                                background: admin.userStatus === 'ACTIVE' ? '#e6f7e6' : '#ffe6e6',
                                color: admin.userStatus === 'ACTIVE' ? '#2ecc71' : '#ff4444',
                                padding: '0.25rem 0.6rem',
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 600
                              }}>
                                {admin.userStatus === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
