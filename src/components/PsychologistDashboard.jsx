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

const sidebarItems = [
  { icon: <Home size={22} />, label: 'Inicio', section: 'Dashboard' },
  { icon: <Clock size={22} />, label: 'Horarios', section: 'Horarios' },
  { icon: <Calendar size={22} />, label: 'Mis Citas', section: 'Citas' },
  { icon: <Users size={22} />, label: 'Pacientes', section: 'Pacientes' },
  { icon: <FileText size={22} />, label: 'Historial', section: 'Historial' },
  { icon: <BookOpen size={22} />, label: 'Biblioteca', section: 'Biblioteca' },
  { icon: <CreditCard size={22} />, label: 'Facturación', section: 'Facturación' },
];

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
          <div className="hidden-mobile" style={{ color: '#7a8bbd', fontWeight: 700, fontSize: 15 }}>Panel de Control - Psicólogo</div>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginTop: 2 }}>Panel del Psicólogo</div>
        </div>
      </div>
      <div className="user-info" style={{ background: '#fff', borderRadius: 18, padding: '0.5rem 1.2rem', fontWeight: 600, color: '#222', fontSize: 15, boxShadow: '0 2px 8px #e0e7ef' }}>valentina prueba</div>
    </div>
  );
}

const PsychologistDashboard = ({ navigationProps }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      {/* Sidebar */}
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
        {/* Logo y usuario */}
        <div style={{ width: '100%', marginBottom: 32 }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32, padding: '0 2rem' }}>
            <div>
              <div style={{ color: '#2050c7', fontWeight: 700, fontSize: 16 }}>Dr. valentina</div>
              <div style={{ color: '#7a8bbd', fontSize: 13 }}>soy prueba</div>
            </div>
          </div>
        </div>
        {/* Navegación */}
        <div style={{ width: '100%', flex: 1 }}>
          <div style={{ color: '#7a8bbd', fontWeight: 700, fontSize: 13, margin: '1.5rem 0 0.5rem 2rem', letterSpacing: 1 }}>NAVEGACIÓN</div>
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
        {/* Cerrar sesión */}
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
      {/* Main */}
      <main className="main-content" style={{ flex: 1, padding: '0 3.5rem', transition: 'margin-left 0.3s cubic-bezier(.4,2,.6,1)', height: '100vh', overflowY: 'auto', width: '100%' }}>
        {/* Cabecera compacta */}
        <HeaderBar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen((open) => !open)} />
        
        {/* Navegación móvil */}
        <MobileDashboardNav 
          items={sidebarItems}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        {/* Botón de cerrar sesión móvil */}
        <div className="visible-mobile mobile-logout-container">
          <button 
            className="mobile-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
        
        {/* Renderizado de secciones */}
        {activeSection === 'Dashboard' && (
          <div className="dashboard-section">
            <PsychologistPatients />
          </div>
        )}
        {activeSection === 'Horarios' && (
          <div className="dashboard-section">
            <PsychologistSchedule />
          </div>
        )}
        {activeSection === 'Citas' && (
          <div className="dashboard-section">
            <PsychologistAppointments />
          </div>
        )}
        {activeSection === 'Pacientes' && (
          <div className="dashboard-section">
            <PsychologistPatientsList />
          </div>
        )}
        {activeSection === 'Historial' && (
          <div className="dashboard-section">
            <PsychologistHistory />
          </div>
        )}
        {activeSection === 'Biblioteca' && (
          <div className="dashboard-section">
            <PsychologistLibrary />
          </div>
        )}
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