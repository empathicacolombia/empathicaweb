import React, { useState } from 'react';
import { Home, CalendarDays, Heart, Users, LifeBuoy, User, LogOut } from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import ClientSidebar from './ClientSidebar';
import AppointmentCalendarModal from './AppointmentCalendarModal';
import MobileDashboardNav from './MobileDashboardNav';

/**
 * Componente de página de Citas del Cliente
 * Permite gestionar citas próximas, ver historial y agendar nuevas citas
 * Incluye pestañas para próximas citas e historial, y modal para agendar
 * 
 * @param {Object} navigationProps - Propiedades para navegación y control del sidebar
 * @param {Function} navigationProps.onNavigate - Función para cambiar de página
 * @param {Function} navigationProps.toggleSidebar - Función para mostrar/ocultar sidebar
 * @param {boolean} navigationProps.sidebarOpen - Estado de apertura del sidebar
 */
const AppointmentsPage = ({ navigationProps }) => {
  /**
   * Estado para controlar la pestaña activa (próximas citas o historial)
   */
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' o 'history'
  
  /**
   * Estado para controlar la apertura del modal de agendar cita
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Maneja la navegación entre diferentes páginas de la aplicación
   * @param {string} page - Nombre de la página a la que navegar
   */
  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  /**
   * Alterna la visibilidad del sidebar (colapsar/expandir)
   */
  const toggleSidebar = () => {
    if (navigationProps && navigationProps.toggleSidebar) {
      navigationProps.toggleSidebar();
    }
  };

  // Usar el estado global del sidebar
  const sidebarOpen = navigationProps?.sidebarOpen ?? true;

  /**
   * Datos de ejemplo de citas del usuario
   * En una implementación real, estos datos vendrían del backend
   */
  const appointments = [
    {
      id: 1,
      type: 'Sesión individual',
      date: 'jueves, 18 de julio de 2024',
      time: '10:00 AM',
      specialist: 'Dra. María González',
      status: 'Confirmada',
      statusColor: '#e8f5e8',
      statusTextColor: '#00C851'
    },
    {
      id: 2,
      type: 'Seguimiento',
      date: 'jueves, 25 de julio de 2024',
      time: '2:00 PM',
      specialist: 'Dra. María González',
      status: 'Pendiente',
      statusColor: '#fff3e0',
      statusTextColor: '#ff9800'
    }
  ];

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f8f9fa'
    }}>
      {/* ========================================
           SIDEBAR DE NAVEGACIÓN
           ======================================== */}
      <ClientSidebar navigationProps={navigationProps} activePage="appointments" sidebarOpen={sidebarOpen} />

      {/* ========================================
           CONTENIDO PRINCIPAL
           ======================================== */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* ========================================
             HEADER SUPERIOR
             ======================================== */}
        <div style={{
          background: '#fff',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Lado izquierdo - Botón de menú y título */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {/* Botón para alternar sidebar */}
            <button
              onClick={toggleSidebar}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 20,
                color: '#666'
              }}
            >
              ☰
            </button>
            
            {/* Título del dashboard */}
            <span style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333'
            }}>
              Tu espacio de bienestar
            </span>
          </div>
          
          {/* Lado derecho - Avatar del usuario */}
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#0057FF'
            }} />
          </div>
        </div>

        {/* ========================================
             CONTENIDO DE CITAS
             ======================================== */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto'
        }}>
          {/* ========================================
               NAVEGACIÓN MÓVIL
               ======================================== */}
          <MobileDashboardNav 
            items={[
              { icon: <Home size={20} />, label: 'Inicio', section: 'Dashboard' },
              { icon: <CalendarDays size={20} />, label: 'Citas', section: 'Appointments' },
              { icon: <Heart size={20} />, label: 'Para Ti', section: 'ForYou' },
              { icon: <User size={20} />, label: 'Mi Especialista', section: 'MySpecialist' },
              { icon: <LifeBuoy size={20} />, label: 'Soporte', section: 'Support' }
            ]}
            activeSection="Appointments"
            onSectionChange={(section) => {
              if (section === 'Dashboard') handleNavigation('client-dashboard');
              else if (section === 'ForYou') handleNavigation('for-you');
              else if (section === 'MySpecialist') handleNavigation('my-specialist');
              else if (section === 'Support') handleNavigation('support');
            }}
          />
          
          {/* ========================================
               HEADER DE LA PÁGINA
               ======================================== */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2rem'
          }}>
            {/* Título y descripción */}
            <div>
              <h1 style={{
                fontSize: 32,
                fontWeight: 800,
                margin: '0 0 0.5rem 0',
                color: '#333'
              }}>
                Mis Citas
              </h1>
              <p style={{
                fontSize: 16,
                color: '#666',
                margin: 0
              }}>
                Gestiona tus sesiones y seguimiento
              </p>
            </div>
            
            {/* Botón para agendar nueva cita */}
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{
                background: '#0057FF',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '0.75rem 1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: 14
              }}
            >
              <span style={{ fontSize: 16 }}>+</span>
              Agendar nueva cita
            </button>
          </div>

          {/* ========================================
               PESTAÑAS DE NAVEGACIÓN
               ======================================== */}
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #e0e0e0',
            marginBottom: '2rem'
          }}>
            {/* Pestaña de próximas citas */}
            <button
              onClick={() => setActiveTab('upcoming')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '1rem 2rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'upcoming' ? '2px solid #0057FF' : '2px solid transparent',
                color: activeTab === 'upcoming' ? '#0057FF' : '#666',
                fontWeight: activeTab === 'upcoming' ? 600 : 400,
                fontSize: 16
              }}
            >
              Próximas Citas
            </button>
            
            {/* Pestaña de historial */}
            <button
              onClick={() => setActiveTab('history')}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '1rem 2rem',
                cursor: 'pointer',
                borderBottom: activeTab === 'history' ? '2px solid #0057FF' : '2px solid transparent',
                color: activeTab === 'history' ? '#0057FF' : '#666',
                fontWeight: activeTab === 'history' ? 600 : 400,
                fontSize: 16
              }}
            >
              Historial
            </button>
          </div>

          {/* ========================================
               LISTA DE CITAS
               ======================================== */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="appointment-card"
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {/* ========================================
                     INFORMACIÓN DE LA CITA
                     ======================================== */}
                <div className="appointment-info" style={{ flex: 1 }}>
                  {/* Tipo de cita */}
                  <div style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#333',
                    marginBottom: '0.5rem'
                  }}>
                    {appointment.type}
                  </div>
                  
                  {/* Detalles de la cita */}
                  <div style={{
                    display: 'flex',
                    gap: '2rem',
                    flexWrap: 'wrap'
                  }}>
                    {/* Fecha de la cita */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#666',
                      fontSize: 14
                    }}>
                      <span role="img" aria-label="calendar" style={{ fontSize: 16 }}>📅</span>
                      {appointment.date}
                    </div>
                    
                    {/* Hora de la cita */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#666',
                      fontSize: 14
                    }}>
                      <span role="img" aria-label="clock" style={{ fontSize: 16 }}>🕐</span>
                      {appointment.time}
                    </div>
                    
                    {/* Especialista */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#666',
                      fontSize: 14
                    }}>
                      <span role="img" aria-label="person" style={{ fontSize: 16 }}>👤</span>
                      {appointment.specialist}
                    </div>
                  </div>
                </div>

                {/* ========================================
                     ESTADO Y ACCIONES
                     ======================================== */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  {/* Estado de la cita */}
                  <div style={{
                    background: appointment.statusColor,
                    color: appointment.statusTextColor,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>
                    {appointment.status}
                  </div>

                  {/* ========================================
                       BOTONES DE ACCIÓN
                       ======================================== */}
                  <div className="appointment-actions" style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
                    {/* Botón de reagendar */}
                    <button style={{
                      background: 'transparent',
                      color: '#0057FF',
                      border: '1px solid #0057FF',
                      borderRadius: 6,
                      padding: '0.5rem 1rem',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Reagendar
                    </button>
                    
                    {/* Botón de cancelar */}
                    <button style={{
                      background: 'transparent',
                      color: '#ff4444',
                      border: '1px solid #ff4444',
                      borderRadius: 6,
                      padding: '0.5rem 1rem',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}>
                      Cancelar
                    </button>
                  </div>

                  {/* Menú de opciones adicionales */}
                  <button style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 18,
                    color: '#666',
                    padding: '0.25rem'
                  }}>
                    ⋯
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* ========================================
           MODAL DE CALENDARIO PARA AGENDAR CITA
           ======================================== */}
      <AppointmentCalendarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AppointmentsPage; 