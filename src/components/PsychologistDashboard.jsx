import React, { useState } from 'react';
import {
  Home,
  Clock,
  Calendar,
  CalendarDays,
  Users,
  FileText,
  BookOpen,
  CreditCard,
  LogOut,
  CheckCircle,
  Activity
} from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import PsychologistPatients from './PsychologistPatients';
import PsychologistPatientsList from './PsychologistPatientsList';
import PsychologistSchedule from './PsychologistSchedule';
import PsychologistAppointments from './PsychologistAppointments';
import PsychologistHistory from './PsychologistHistory';
import PsychologistLibrary from './PsychologistLibrary';
import PsychologistBilling from './PsychologistBilling';
import MobileDashboardNav from './MobileDashboardNav';

/**
 * Elementos de navegación del sidebar del psicólogo
 * Define las secciones principales del dashboard profesional
 * Cada elemento incluye icono, etiqueta y identificador de sección
 */
const sidebarItems = [
  { icon: <Home size={22} />, label: 'Inicio', section: 'Dashboard' },
  { icon: <Clock size={22} />, label: 'Horarios', section: 'Horarios' },
  { icon: <Calendar size={22} />, label: 'Mis Citas', section: 'Citas' },
  { icon: <Users size={22} />, label: 'Pacientes', section: 'Pacientes' },
  { icon: <FileText size={22} />, label: 'Historial', section: 'Historial' },
  { icon: <BookOpen size={22} />, label: 'Biblioteca', section: 'Biblioteca' },
  { icon: <CreditCard size={22} />, label: 'Facturación', section: 'Facturación' },
];

/**
 * Componente de barra de encabezado del dashboard
 * Muestra información del panel y controles de navegación
 * 
 * @param {boolean} sidebarOpen - Estado de apertura del sidebar
 * @param {Function} toggleSidebar - Función para mostrar/ocultar sidebar
 */
function HeaderBar({ sidebarOpen, toggleSidebar }) {
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
      {/* ========================================
           INFORMACIÓN DEL ENCABEZADO
           ======================================== */}
      <div className="header-info" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Botón para mostrar/ocultar sidebar */}
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
        {/* Títulos del panel */}
        <div>
          <div className="hidden-mobile" style={{ color: '#7a8bbd', fontWeight: 700, fontSize: 15 }}>Panel de Control - Psicólogo</div>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginTop: 2 }}>Panel del Psicólogo</div>
        </div>
      </div>
      {/* Información del usuario psicólogo */}
      <div className="user-info" style={{ background: '#fff', borderRadius: 18, padding: '0.5rem 1.2rem', fontWeight: 600, color: '#222', fontSize: 15, boxShadow: '0 2px 8px #e0e7ef' }}>valentina prueba</div>
    </div>
  );
}

/**
 * Componente principal del Dashboard del Psicólogo
 * Proporciona la interfaz completa para la gestión profesional
 * Incluye sidebar de navegación, contenido principal y renderizado condicional de secciones
 * 
 * @param {Object} navigationProps - Propiedades para navegación
 * @param {Function} navigationProps.onNavigate - Función para cambiar de página
 */
const PsychologistDashboard = ({ navigationProps }) => {
  // Estados para controlar la navegación y visualización
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /**
   * Maneja el cierre de sesión del psicólogo
   * Redirige al usuario a la página principal
   */
  const handleLogout = () => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate('individuals');
    }
  };

  return (
    <div className="dashboard-container psychologist-dashboard" style={{
      display: 'flex',
      height: '100vh',
      background: '#f8f9fb',
      overflow: 'hidden'
    }}>
      {/* ========================================
           SIDEBAR DE NAVEGACIÓN
           ======================================== */}
      <aside className="sidebar" style={{
        width: sidebarOpen ? 260 : 0,
        minWidth: sidebarOpen ? 260 : 0,
        maxWidth: 260,
        background: '#e9eef6',
        borderRight: '1px solid #dde3ec',
        display: 'flex',
        flexDirection: 'column',
        padding: sidebarOpen ? '2rem 0 1rem 0' : '2rem 0 1rem 0',
        alignItems: sidebarOpen ? 'center' : 'flex-start',
        transition: 'width 0.3s cubic-bezier(.4,2,.6,1), min-width 0.3s cubic-bezier(.4,2,.6,1)',
        overflow: 'hidden',
      }}>
        {/* ========================================
             LOGO Y INFORMACIÓN DEL USUARIO
             ======================================== */}
        <div style={{ width: '100%', marginBottom: 32 }}>
          {/* Logo de Empathica */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 2rem' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#4a7cff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img 
                src={logoEmpathica} 
                alt="Empathica Logo" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '50%'
                }} 
              />
            </div>
            <div>
              <div style={{ color: '#2050c7', fontWeight: 700, fontSize: 18, lineHeight: 1 }}>Empathica</div>
              <div style={{ color: '#7a8bbd', fontSize: 13 }}>Panel Profesional</div>
            </div>
          </div>
          {/* Información del psicólogo logueado */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32, padding: '0 2rem' }}>
            <div>
              <div style={{ color: '#2050c7', fontWeight: 700, fontSize: 16 }}>Dr. valentina</div>
              <div style={{ color: '#7a8bbd', fontSize: 13 }}>soy prueba</div>
            </div>
          </div>
        </div>
        {/* ========================================
             MENÚ DE NAVEGACIÓN PRINCIPAL
             ======================================== */}
        <div style={{ width: '100%', flex: 1 }}>
          {/* Título de la sección de navegación */}
          <div style={{ color: '#7a8bbd', fontWeight: 700, fontSize: 13, margin: '1.5rem 0 0.5rem 2rem', letterSpacing: 1 }}>NAVEGACIÓN</div>
          {/* Lista de elementos de navegación */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sidebarItems.map((item, idx) => (
              <button key={item.label} onClick={() => setActiveSection(item.section)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '0.7rem 2rem',
                background: activeSection === item.section ? '#e6f0ff' : 'transparent',
                color: activeSection === item.section ? '#2050c7' : '#7a8bbd',
                border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer',
                transition: 'background 0.2s',
              }}>{item.icon} {item.label}</button>
            ))}
          </nav>
        </div>
        {/* ========================================
             BOTÓN DE CERRAR SESIÓN
             ======================================== */}
        <button onClick={handleLogout} style={{
          marginTop: 'auto',
          color: '#e74c3c',
          background: 'none',
          border: 'none',
          fontWeight: 700,
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '0.7rem 2rem',
          cursor: 'pointer',
          letterSpacing: 0.5,
        }}>
          <LogOut size={22} color="#e74c3c" style={{marginRight: 2}} /> Cerrar sesión
        </button>
      </aside>
      {/* ========================================
           CONTENIDO PRINCIPAL
           ======================================== */}
      <main className="main-content" style={{ flex: 1, padding: '0 3.5rem', transition: 'margin-left 0.3s cubic-bezier(.4,2,.6,1)', height: '100vh', overflowY: 'auto', width: '100%' }}>
        {/* Barra de encabezado */}
        <HeaderBar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen((open) => !open)} />
        
        {/* ========================================
             NAVEGACIÓN MÓVIL
             ======================================== */}
        <MobileDashboardNav 
          items={sidebarItems}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        {/* ========================================
             BOTÓN DE CERRAR SESIÓN MÓVIL
             ======================================== */}
        <div className="visible-mobile mobile-logout-container">
          <button 
            className="mobile-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
        
        {/* ========================================
             RENDERIZADO CONDICIONAL DE SECCIONES
             ======================================== */}
        {/* Sección Dashboard - Vista principal de pacientes */}
        {activeSection === 'Dashboard' && (
          <div className="dashboard-section">
            <PsychologistPatients />
          </div>
        )}
        {/* Sección Horarios - Gestión de disponibilidad */}
        {activeSection === 'Horarios' && (
          <div className="dashboard-section">
            <PsychologistSchedule />
          </div>
        )}
        {/* Sección Citas - Gestión de citas programadas */}
        {activeSection === 'Citas' && (
          <div className="dashboard-section">
            <PsychologistAppointments />
          </div>
        )}
        {/* Sección Pacientes - Lista completa de pacientes */}
        {activeSection === 'Pacientes' && (
          <div className="dashboard-section">
            <PsychologistPatientsList />
          </div>
        )}
        {/* Sección Historial - Registro de sesiones */}
        {activeSection === 'Historial' && (
          <div className="dashboard-section">
            <PsychologistHistory />
          </div>
        )}
        {/* Sección Biblioteca - Recursos y materiales */}
        {activeSection === 'Biblioteca' && (
          <div className="dashboard-section">
            <PsychologistLibrary />
          </div>
        )}
        {/* Sección Facturación - Gestión financiera */}
        {activeSection === 'Facturación' && (
          <div className="dashboard-section">
            <PsychologistBilling />
          </div>
        )}
        {/* Otros tabs pueden ir aquí */}
      </main>
    </div>
  );
};

export default PsychologistDashboard; 