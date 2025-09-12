import React, { useState } from 'react';
import { Mail, Phone, Clock, MessageCircle, FileText, HelpCircle } from 'lucide-react';

const BusinessSupport = ({ navigationProps }) => {
  const [activeTab, setActiveTab] = useState('contact');

  const tabs = [
    { id: 'contact', label: 'Contactar Soporte', icon: <MessageCircle size={20} /> },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          color: '#222', 
          fontSize: 32, 
          fontWeight: 800, 
          marginBottom: '0.5rem' 
        }}>
          Soporte
        </h1>
        <p style={{ 
          color: '#7a8bbd', 
          fontSize: 16, 
          margin: 0 
        }}>
          Centro de ayuda y contacto
        </p>
      </div>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: 0, 
        background: '#f8f9fa',
        borderRadius: 12,
        padding: '0.5rem',
        marginBottom: '2rem',
        maxWidth: '400px'
      }}>
        {tabs.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            style={{
              background: activeTab === tab.id ? '#fff' : 'transparent',
              color: activeTab === tab.id ? '#0057FF' : '#7a8bbd',
              border: activeTab === tab.id ? '2px solid #0057FF' : 'none',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14,
              padding: '0.75rem 1.5rem',
              marginRight: 4,
              boxShadow: activeTab === tab.id ? '0 2px 8px #e0e7ef' : 'none',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de las pestañas */}
      {activeTab === 'contact' && (
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '2rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: 24,
              fontWeight: 700,
              color: '#333',
              margin: '0 0 1rem 0'
            }}>
              Contacto Directo
            </h2>
            <p style={{
              fontSize: 16,
              color: '#666',
              lineHeight: 1.6,
              margin: 0
            }}>
              Estamos aquí para ayudarte. Puedes contactarnos a través de los siguientes medios:
            </p>
          </div>

          {/* Información de contacto */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Email */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: 60,
                height: 60,
                background: '#0057FF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <Mail size={24} color="#fff" />
              </div>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 0.5rem 0'
              }}>
                Email
              </h3>
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 1rem 0'
              }}>
                Envíanos un correo y te responderemos en menos de 24 horas
              </p>
              <a 
                href="mailto:soporte@empathica.com"
                style={{
                  color: '#0057FF',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: 16
                }}
              >
                soporte@empathica.com
              </a>
            </div>

            {/* Teléfono */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: 60,
                height: 60,
                background: '#10B981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <Phone size={24} color="#fff" />
              </div>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 0.5rem 0'
              }}>
                Teléfono
              </h3>
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 1rem 0'
              }}>
                Llámanos para atención inmediata
              </p>
              <a 
                href="tel:+573001234567"
                style={{
                  color: '#10B981',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: 16
                }}
              >
                +57 300 123 4567
              </a>
            </div>

            {/* Horarios */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: 60,
                height: 60,
                background: '#F59E0B',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <Clock size={24} color="#fff" />
              </div>
              <h3 style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 0.5rem 0'
              }}>
                Horarios de Atención
              </h3>
              <p style={{
                fontSize: 14,
                color: '#666',
                margin: '0 0 1rem 0'
              }}>
                Nuestro equipo está disponible para ayudarte
              </p>
              <div style={{
                color: '#F59E0B',
                fontWeight: 600,
                fontSize: 16
              }}>
                Lunes - Viernes<br />
                8:00 AM - 6:00 PM
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div style={{
            background: '#e6f0ff',
            border: '1px solid #b3d9ff',
            borderRadius: 12,
            padding: '1.5rem',
            marginTop: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <HelpCircle size={20} color="#0057FF" />
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#0057FF',
                margin: 0
              }}>
                ¿Necesitas ayuda urgente?
              </h3>
            </div>
            <p style={{
              fontSize: 14,
              color: '#1e40af',
              lineHeight: 1.6,
              margin: 0
            }}>
              Para problemas críticos o emergencias, puedes contactarnos directamente por teléfono. 
              Nuestro equipo de soporte técnico está disponible para resolver cualquier inconveniente 
              que pueda afectar el funcionamiento de tu plataforma.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessSupport;
