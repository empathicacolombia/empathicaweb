import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSessionTimeout } from '../hooks/useSessionTimeout';
import SessionTimeoutAlert from './SessionTimeoutAlert';
import {
  Home,
  Clock,
  Calendar,
  CalendarDays,
  FileText,
  BookOpen,
  CreditCard,
  Settings,
  LogOut,
  CheckCircle,
  Activity,
  Users
} from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';

import PsychologistSchedule from './PsychologistSchedule';
import PsychologistAppointments from './PsychologistAppointments';
import PsychologistHistory from './PsychologistHistory';
import PsychologistLibrary from './PsychologistLibrary';
import PsychologistBilling from './PsychologistBilling';
import PsychologistSettings from './PsychologistSettings';
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
  { icon: <FileText size={22} />, label: 'Historial', section: 'Historial' },
  { icon: <BookOpen size={22} />, label: 'Biblioteca', section: 'Biblioteca' },
  { icon: <CreditCard size={22} />, label: 'Facturación', section: 'Facturación' },
  { icon: <Settings size={22} />, label: 'Configuración', section: 'Configuración' },
];

/**
 * Componente de barra de encabezado del dashboard
 * Muestra información del panel y controles de navegación
 * 
 * @param {boolean} sidebarOpen - Estado de apertura del sidebar
 * @param {Function} toggleSidebar - Función para mostrar/ocultar sidebar
 * @param {Object} user - Datos del usuario autenticado
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
      <div className="user-info" style={{ background: '#fff', borderRadius: 18, padding: '0.5rem 1.2rem', fontWeight: 600, color: '#222', fontSize: 15, boxShadow: '0 2px 8px #e0e7ef' }}>
        {user ? `${user.name} ${user.lastName}` : 'Psicólogo'}
      </div>
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
  const { user } = useAuth();
  
  // Hook para manejar timeout de sesión (60 minutos de inactividad)
  useSessionTimeout(60);
  
  // Estados para controlar la navegación y visualización
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showClinicalNotes, setShowClinicalNotes] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Estados para filtrado
  const [statusFilter, setStatusFilter] = useState('');

  // Verificar si el dashboard debe estar bloqueado
  const isDashboardBlocked = () => {
    if (!user) return true;
    
    // Si el usuario no está activo, bloquear
    // PENDING_FORM_FULFILLMENT y PENDING_APPROVAL deben estar bloqueados
    if (user.userStatus !== 'ACTIVE') {
      return true;
    }
    
    return false;
  };

  // Si el dashboard está bloqueado, solo mostrar configuración
  const shouldShowOnlySettings = isDashboardBlocked();

  // Forzar configuración si está bloqueado
  React.useEffect(() => {
    if (shouldShowOnlySettings && activeSection !== 'Configuración') {
      setActiveSection('Configuración');
    }
  }, [shouldShowOnlySettings, activeSection]);

  /**
   * Maneja el cierre de sesión del psicólogo
   * Redirige al usuario a la página principal
   */
  const handleLogout = () => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate('individuals');
    }
  };

  /**
   * Maneja la visualización de notas clínicas
   * @param {Object} patient - Datos del paciente seleccionado
   */
  const handleViewNotes = (patient) => {
    setSelectedPatient(patient);
    setShowClinicalNotes(true);
  };

  /**
   * Cierra la vista de notas clínicas
   */
  const handleCloseNotes = () => {
    setShowClinicalNotes(false);
    setSelectedPatient(null);
  };

  // Datos de pacientes basados en el historial
  const allPatients = [
    {
      name: 'Jorge Martínez',
      status: 'Activo',
      email: 'jorge.martinez@email.com',
      phone: '+57 300 456 7890',
      lastSession: '23/07/2025',
      totalSessions: 8,
      attendance: 'Asistió',
      avatar: 'JM',
      tags: ['Burnout', 'Estrés laboral'],
      tagIntensities: { 'Burnout': 75, 'Estrés laboral': 60 },
      notes: 'Sesión completada exitosamente'
    },
    {
      name: 'Sofía Castillo',
      status: 'Inactivo',
      email: 'sofia.castillo@email.com',
      phone: '+57 300 678 9012',
      lastSession: '22/07/2025',
      totalSessions: 5,
      attendance: 'No asistió',
      avatar: 'SC',
      tags: ['Depresión'],
      tagIntensities: { 'Depresión': 85 },
      notes: 'Cancelada por el paciente'
    },
    {
      name: 'Ricardo Mendoza',
      status: 'Activo',
      email: 'ricardo.mendoza@email.com',
      phone: '+57 300 890 1234',
      lastSession: '21/07/2025',
      totalSessions: 12,
      attendance: 'Asistió',
      avatar: 'RM',
      tags: ['Trauma', 'Duelo'],
      tagIntensities: { 'Trauma': 90, 'Duelo': 70 },
      notes: 'Evaluación de progreso satisfactoria'
    },
    {
      name: 'Carmen Silva',
      status: 'Inactivo',
      email: 'carmen.silva@email.com',
      phone: '+57 300 234 5678',
      lastSession: '20/07/2025',
      totalSessions: 3,
      attendance: 'No asistió',
      avatar: 'CS',
      tags: ['Adicciones'],
      tagIntensities: { 'Adicciones': 95 },
      notes: 'Paciente no se presentó'
    },
    {
      name: 'Ana García',
      status: 'Activo',
      email: 'ana.garcia@email.com',
      phone: '+57 300 345 6789',
      lastSession: '19/07/2025',
      totalSessions: 15,
      attendance: 'Asistió',
      avatar: 'AG',
      tags: ['Ansiedad', 'Estrés'],
      tagIntensities: { 'Ansiedad': 65, 'Estrés': 55 },
      notes: 'Trabajo en técnicas de relajación'
    },
    {
      name: 'Carlos Mendoza',
      status: 'Activo',
      email: 'carlos.mendoza@email.com',
      phone: '+57 300 456 7890',
      lastSession: '18/07/2025',
      totalSessions: 9,
      attendance: 'Asistió',
      avatar: 'CM',
      tags: ['Autoestima', 'Comunicación'],
      tagIntensities: { 'Autoestima': 45, 'Comunicación': 80 },
      notes: 'Seguimiento de objetivos terapéuticos'
    }
  ];

  // Filtrar pacientes
  const filteredPatients = allPatients.filter(patient => {
    const matchesStatus = !statusFilter || patient.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesStatus;
  });

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
              <div style={{ color: '#2050c7', fontWeight: 700, fontSize: 16 }}>
                {user ? `Dr. ${user.name}` : 'Dr. Psicólogo'}
              </div>
              <div style={{ color: '#7a8bbd', fontSize: 13 }}>
                {user ? `${user.lastName}` : 'Especialista'}
              </div>
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
            {(shouldShowOnlySettings ? sidebarItems.filter(item => item.section === 'Configuración') : sidebarItems).map((item, idx) => (
              <button key={item.label} onClick={() => setActiveSection(item.section)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '0.7rem 2rem',
                background: activeSection === item.section ? '#e6f0ff' : 'transparent',
                color: activeSection === item.section ? '#2050c7' : '#7a8bbd',
                border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer',
                transition: 'background 0.2s',
                opacity: shouldShowOnlySettings && item.section !== 'Configuración' ? 0.5 : 1,
                pointerEvents: shouldShowOnlySettings && item.section !== 'Configuración' ? 'none' : 'auto',
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
        <HeaderBar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen((open) => !open)} user={user} />
        
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
        
        {/* Mensaje de bloqueo si el dashboard está restringido */}
        {shouldShowOnlySettings && activeSection !== 'Configuración' && (
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#856404', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>
              🔒 Acceso Restringido
            </h3>
            <p style={{ color: '#856404', fontSize: 16, lineHeight: 1.5, marginBottom: 20 }}>
              {user?.userStatus === 'PENDING_FORM_FULFILLMENT' 
                ? 'Debes completar tu información complementaria antes de acceder a esta funcionalidad.'
                : 'Tu información está siendo validada por nuestro equipo administrativo. Una vez aprobada, podrás acceder a todas las funcionalidades.'
              }
            </p>
            <button
              onClick={() => setActiveSection('Configuración')}
              style={{
                background: '#856404',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Ir a Configuración
            </button>
          </div>
        )}

        {/* Sección Dashboard - Vista principal */}
        {activeSection === 'Dashboard' && !shouldShowOnlySettings && (
          <div className="dashboard-section">
            {/* ========================================
                 ENCABEZADO DEL DASHBOARD
                 ======================================== */}
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{ color: '#2050c7', fontSize: 28, fontWeight: 800, marginBottom: '0.5rem' }}>
                Lista de Pacientes
              </h1>
              <p style={{ color: '#7a8bbd', fontSize: 16 }}>
                Panel de control - Psicología Laboral
              </p>
            </div>

            {/* ========================================
                 MENSAJE DE NO HAY PACIENTES
                 ======================================== */}
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: '3rem',
              marginBottom: '2rem',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <Users size={64} color="#6b7280" />
              </div>
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#374151',
                margin: '0 0 1rem 0'
              }}>
                No tiene pacientes
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6b7280',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Aún no tienes pacientes asignados. Los pacientes aparecerán aquí una vez que se registren y te seleccionen como su psicólogo.
              </p>
            </div>
          </div>
        )}
        {/* Sección Horarios - Gestión de disponibilidad */}
        {activeSection === 'Horarios' && !shouldShowOnlySettings && (
          <div className="dashboard-section">
            <PsychologistSchedule />
          </div>
        )}
        {/* Sección Citas - Gestión de citas programadas */}
        {activeSection === 'Citas' && !shouldShowOnlySettings && (
          <div className="dashboard-section">
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: '3rem',
              marginBottom: '2rem',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <Calendar size={64} color="#6b7280" />
              </div>
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#374151',
                margin: '0 0 1rem 0'
              }}>
                No se han asignado citas
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6b7280',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                Aún no tienes citas programadas. Las citas aparecerán aquí una vez que los pacientes las agenden contigo.
              </p>
            </div>
          </div>
        )}

        {/* Sección Historial - Registro de sesiones */}
        {activeSection === 'Historial' && !shouldShowOnlySettings && (
          <div className="dashboard-section">
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: '3rem',
              marginBottom: '2rem',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <FileText size={64} color="#6b7280" />
              </div>
              <h2 style={{
                fontSize: 24,
                fontWeight: 700,
                color: '#374151',
                margin: '0 0 1rem 0'
              }}>
                No se han asignado citas
              </h2>
              <p style={{
                fontSize: 16,
                color: '#6b7280',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                El historial de sesiones aparecerá aquí una vez que tengas citas completadas con tus pacientes.
              </p>
            </div>
          </div>
        )}
        {/* Sección Biblioteca - Recursos y materiales */}
        {activeSection === 'Biblioteca' && !shouldShowOnlySettings && (
          <div className="dashboard-section">
            <PsychologistLibrary />
          </div>
        )}
        {/* Sección Facturación - Gestión financiera */}
        {activeSection === 'Facturación' && !shouldShowOnlySettings && (
          <div className="dashboard-section">
            <PsychologistBilling />
          </div>
        )}
        {/* Sección Configuración - Información del psicólogo */}
        {activeSection === 'Configuración' && (
          <div className="dashboard-section">
            <PsychologistSettings navigationProps={navigationProps} />
          </div>
        )}
        {/* Otros tabs pueden ir aquí */}
      </main>

      {/* ========================================
           MODAL DE NOTAS CLÍNICAS
           ======================================== */}
      {showClinicalNotes && selectedPatient && (
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
          padding: '2rem'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            width: '100%',
            maxWidth: '800px',
            maxHeight: '80vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header del modal */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem',
              borderBottom: '1px solid #e0e7ef',
              background: '#f8f9fb'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: 20 }}>📄</span>
                <h3 style={{ color: '#2050c7', fontSize: 18, fontWeight: 700, margin: 0 }}>
                  Notas Clínicas - {selectedPatient.name}
                </h3>
              </div>
              <button 
                onClick={handleCloseNotes}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 8,
                  border: '1px solid #2050c7',
                  background: '#fff',
                  color: '#2050c7',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>

            {/* Instrucciones */}
            <div style={{ padding: '1rem 1.5rem', background: '#f8f9fb', borderBottom: '1px solid #e0e7ef' }}>
              <p style={{ color: '#7a8bbd', fontSize: 14, margin: 0 }}>
                Haga clic en cualquier nota para ver el detalle completo en formato SOAP
              </p>
            </div>

            {/* Información del paciente */}
            <div style={{ padding: '1rem 1.5rem', background: '#fff', borderBottom: '1px solid #e0e7ef' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: '#0057FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 18
                }}>
                  {selectedPatient.avatar}
                </div>
                <div>
                  <div style={{ color: '#2050c7', fontWeight: 600, fontSize: 16 }}>
                    {selectedPatient.name}
                  </div>
                  <div style={{ color: '#7a8bbd', fontSize: 14 }}>
                    {selectedPatient.email}
                  </div>
                </div>
              </div>
              
              {/* Tags del paciente */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedPatient.tags.map((tag, index) => {
                  const intensity = selectedPatient.tagIntensities?.[tag] || 50;
                  return (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        background: '#0057FF',
                        color: '#fff',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {tag}
                      </span>
                      <span style={{
                        fontSize: 12,
                        color: '#7a8bbd',
                        fontWeight: 600
                      }}>
                        {intensity}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contenido de las notas */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {[
                {
                  session: selectedPatient.totalSessions,
                  date: `lunes, ${selectedPatient.lastSession}`,
                  duration: '50 min',
                  summary: selectedPatient.notes,
                  isSelected: true
                },
                {
                  session: selectedPatient.totalSessions - 1,
                  date: `lunes, ${selectedPatient.lastSession.split('/')[0]}/${parseInt(selectedPatient.lastSession.split('/')[1]) - 1}/${selectedPatient.lastSession.split('/')[2]}`,
                  duration: '45 min',
                  summary: 'Sesión anterior. Trabajo en técnicas de manejo emocional y seguimiento de objetivos terapéuticos.',
                  isSelected: false
                }
              ].map((note, index) => (
                <div key={index} style={{
                  border: '1px solid #e0e7ef',
                  borderRadius: 8,
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  background: note.isSelected ? '#f8f9fb' : '#fff',
                  borderLeft: note.isSelected ? '4px solid #2050c7' : '1px solid #e0e7ef',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        background: '#e3f2fd',
                        color: '#2050c7',
                        border: '1px solid #2050c7'
                      }}>
                        Sesión #{note.session}
                      </span>
                      <span style={{ color: '#7a8bbd', fontSize: 14 }}>
                        {note.date}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7a8bbd', fontSize: 14 }}>
                      <span>🕐</span>
                      {note.duration}
                    </div>
                  </div>
                  
                  <p style={{ color: '#333', fontSize: 14, lineHeight: 1.6, marginBottom: '1rem' }}>
                    {note.summary}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2050c7', fontSize: 14, fontWeight: 600 }}>
                    <span>🩺</span>
                    Ver nota clínica completa →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Alerta de timeout de sesión */}
      <SessionTimeoutAlert warningMinutes={5} timeoutMinutes={60} />
    </div>
  );
};

export default PsychologistDashboard; 