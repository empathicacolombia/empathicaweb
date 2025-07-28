import React, { useState } from 'react';
import { Home, CalendarDays, Heart, Users, LifeBuoy, User, LogOut } from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import ClientSidebar from './ClientSidebar';
import AppointmentCalendarModal from './AppointmentCalendarModal';
import MobileDashboardNav from './MobileDashboardNav';

const AppointmentsPage = ({ navigationProps }) => {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' o 'history'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  const toggleSidebar = () => {
    if (navigationProps && navigationProps.toggleSidebar) {
      navigationProps.toggleSidebar();
    }
  };

  // Usar el estado global del sidebar
  const sidebarOpen = navigationProps?.sidebarOpen ?? true;

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
      {/* Sidebar */}
      <ClientSidebar navigationProps={navigationProps} activePage="appointments" sidebarOpen={sidebarOpen} />

      {/* Contenido principal */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header superior */}
        <div style={{
          background: '#fff',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
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
            <span style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333'
            }}>
              Tu espacio de bienestar
            </span>
          </div>
          
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

        {/* Contenido de citas */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflow: 'auto'
        }}>
          {/* Navegación móvil */}
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
          {/* Header de la página */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2rem'
          }}>
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

          {/* Pestañas */}
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #e0e0e0',
            marginBottom: '2rem'
          }}>
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

          {/* Lista de citas */}
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
                {/* Información de la cita */}
                <div className="appointment-info" style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#333',
                    marginBottom: '0.5rem'
                  }}>
                    {appointment.type}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '2rem',
                    flexWrap: 'wrap'
                  }}>
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

                {/* Estado y acciones */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  {/* Estado */}
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

                  {/* Botones de acción */}
                  <div className="appointment-actions" style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}>
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

                  {/* Menú de opciones */}
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
      <AppointmentCalendarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AppointmentsPage; 