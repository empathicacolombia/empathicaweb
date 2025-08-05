import React, { useState } from 'react';
import { Home, CalendarDays, Heart, Users, LifeBuoy, User, LogOut } from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import ClientSidebar from './ClientSidebar';
import MobileDashboardNav from './MobileDashboardNav';

const SupportPage = ({ navigationProps }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se manejaría el envío del formulario
    console.log('Formulario enviado:', formData);
  };

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = '573229253891'; // Número de WhatsApp de Empathica
    const message = 'Hola, necesito ayuda con Empathica';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Función para abrir el cliente de correo
  const openEmail = () => {
    const email = 'miguel@nitbit.mx';
    const subject = 'Soporte Empathica';
    const body = 'Hola, necesito ayuda con Empathica.';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#f8f9fa',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <ClientSidebar navigationProps={navigationProps} activePage="support" sidebarOpen={sidebarOpen} />

      {/* Contenido principal */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
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

        {/* Contenido de Soporte */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
          overflowX: 'hidden'
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
            activeSection="Support"
            onSectionChange={(section) => {
              if (section === 'Dashboard') handleNavigation('client-dashboard');
              else if (section === 'Appointments') handleNavigation('appointments');
              else if (section === 'ForYou') handleNavigation('for-you');
              else if (section === 'MySpecialist') handleNavigation('my-specialist');
            }}
          />
          {/* Header de la página */}
          <div style={{
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontSize: 32,
              fontWeight: 800,
              margin: '0 0 0.5rem 0',
              color: '#333'
            }}>
              Centro de Soporte
            </h1>
            <p style={{
              fontSize: 16,
              color: '#666',
              margin: 0
            }}>
              Estamos aquí para ayudarte en cada paso de tu bienestar emocional
            </p>
          </div>

          {/* Tarjetas de contacto */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Chat en vivo */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <span role="img" aria-label="chat" style={{ fontSize: 28, color: '#0057FF' }}>💬</span>
              </div>
              
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                margin: '0 0 0.5rem 0',
                color: '#333'
              }}>
                Chat en vivo
              </h3>
              
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 1.5rem 0',
                lineHeight: 1.4
              }}>
                Respuesta inmediata de nuestro equipo
              </p>
              
              <button 
                onClick={openWhatsApp}
                style={{
                  background: '#0057FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 14,
                  width: '100%'
                }}
              >
                Iniciar chat
              </button>
            </div>

            {/* Email */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <span role="img" aria-label="email" style={{ fontSize: 28, color: '#0057FF' }}>✉️</span>
              </div>
              
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                margin: '0 0 0.5rem 0',
                color: '#333'
              }}>
                Email
              </h3>
              
              <p style={{
                fontSize: 14,
                color: '#0057FF',
                margin: '0 0 0.25rem 0',
                fontWeight: 600
              }}>
                miguel@nitbit.mx
              </p>
              
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 1.5rem 0'
              }}>
                Respuesta en 24 horas
              </p>
              
              <button 
                onClick={openEmail}
                style={{
                  background: '#fff',
                  color: '#0057FF',
                  border: '1px solid #0057FF',
                  borderRadius: 8,
                  padding: '0.75rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 14,
                  width: '100%'
                }}
              >
                Enviar email
              </button>
            </div>

            {/* Teléfono */}
            <div style={{
              background: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: '#e3f2fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <span role="img" aria-label="phone" style={{ fontSize: 28, color: '#0057FF' }}>📞</span>
              </div>
              
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                margin: '0 0 0.5rem 0',
                color: '#333'
              }}>
                Teléfono
              </h3>
              
              <p style={{
                fontSize: 14,
                color: '#0057FF',
                margin: '0 0 0.25rem 0',
                fontWeight: 600
              }}>
                +57 (1) 234-5678
              </p>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: 14,
                color: '#666'
              }}>
                <span role="img" aria-label="clock" style={{ fontSize: 14 }}>🕐</span>
                Lun-Vie 8AM-6PM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 