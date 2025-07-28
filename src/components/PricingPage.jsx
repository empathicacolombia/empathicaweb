import React, { useState } from 'react';
import Navbar from './Navbar';

function PricingPage({ navigationProps }) {
  const [showContactModal, setShowContactModal] = useState(false);

  const openContactModal = () => {
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
  };
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #e0e7ff 0%, #ffffff 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Unified Navbar */}
      <Navbar navigationProps={navigationProps} />

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        {/* Top Button/Label */}
        <div style={{ marginBottom: '24px' }}>
          <button 
            onClick={() => window.location.href = '#planes'}
            style={{
              backgroundColor: '#e0e7ff',
              color: '#1e40af',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Planes flexibles para todos
          </button>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 48px)',
          fontWeight: 'bold',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          <span style={{ color: '#3b82f6' }}>Planes y</span>{' '}
          <span style={{ color: '#8b5cf6' }}>Precios</span>
        </h1>

        {/* Descriptive Paragraph */}
        <p style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.6',
          maxWidth: '700px',
          margin: '0 auto 40px auto'
        }}>
          Elige el plan que mejor se adapte a tus necesidades. Ofrecemos opciones flexibles tanto para individuos como para empresas, con la garantía de cambio gratuito de terapeuta.
        </p>

        {/* Para Personas Section */}
        <div style={{ marginBottom: '60px' }}>
          {/* Section Title */}
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Para Personas
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px auto'
          }}>
            Acceso a psicólogos especializados con opciones de pago flexibles según tus necesidades.
          </p>

          {/* Pricing Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Sesiones Orientativas Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '24px 20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}>
              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                Sesiones Orientativas
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0 0 20px 0'
              }}>
                Sesiones individuales de orientación psicológica
              </p>

              {/* Price */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#3b82f6'
                }}>
                  $40-50
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {' '}por sesión
                </span>
              </div>

              {/* Features */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 20px 0',
                textAlign: 'left'
              }}>
                {[
                  'Sesión de 50 minutos',
                  'Psicólogo especializado',
                  'Evaluación inicial',
                  'Recomendaciones personalizadas',
                  'Acceso a recursos básicos'
                ].map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button 
                onClick={() => navigationProps && navigationProps.onNavigate && navigationProps.onNavigate('register')}
                style={{
                  width: '100%',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
              >
                Agendar sesión
              </button>
            </div>

            {/* Sesiones Clínicas Card - Most Popular */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '24px 20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}>
              {/* Popular Badge */}
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                Más Popular
              </div>

              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                Sesiones Clínicas
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0 0 20px 0'
              }}>
                Sesiones individuales de terapia psicológica
              </p>

              {/* Price */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#3b82f6'
                }}>
                  $60-80
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {' '}por sesión
                </span>
              </div>

              {/* Features */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 20px 0',
                textAlign: 'left'
              }}>
                {[
                  'Sesión de 50 minutos',
                  'Psicólogo clínico certificado',
                  'Evaluación psicológica completa',
                  'Plan de tratamiento personalizado',
                  'Seguimiento continuo',
                  'Acceso a recursos premium',
                  'Soporte entre sesiones',
                  'Cambio gratuito de terapeuta'
                ].map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button 
                onClick={() => navigationProps && navigationProps.onNavigate && navigationProps.onNavigate('register')}
                style={{
                  width: '100%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
              >
                Comenzar terapia
              </button>
            </div>

            {/* Plan Mensual Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '24px 20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}>
              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h16v11zM7 10h5v5H7z"/>
                </svg>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                Plan Mensual
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0 0 20px 0'
              }}>
                Acceso ilimitado con sesiones incluidas
              </p>

              {/* Price */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#8b5cf6'
                }}>
                  $120
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {' '}por mes
                </span>
              </div>

              {/* Features */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 20px 0',
                textAlign: 'left'
              }}>
                {[
                  '4 sesiones incluidas',
                  'Psicólogo asignado',
                  'Acceso 24/7 a la plataforma',
                  'Recursos ilimitados',
                  'Soporte prioritario',
                  'Cambio gratuito de terapeuta',
                  'Seguimiento personalizado',
                  'Descuento del 25%'
                ].map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button 
                onClick={() => navigationProps && navigationProps.onNavigate && navigationProps.onNavigate('register')}
                style={{
                  width: '100%',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
              >
                Suscribirse
              </button>
            </div>

            {/* Plan Anual Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '24px 20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}>
              {/* Save Badge */}
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#10b981',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                Ahorra 40%
              </div>

              {/* Icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                Plan Anual
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '0 0 20px 0'
              }}>
                El mejor valor para tu bienestar
              </p>

              {/* Price */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#10b981'
                }}>
                  $864
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {' '}por año
                </span>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  textDecoration: 'line-through',
                  marginTop: '4px'
                }}>
                  $1,440
                </div>
              </div>

              {/* Features */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 20px 0',
                textAlign: 'left'
              }}>
                {[
                  '52 sesiones incluidas',
                  'Psicólogo asignado',
                  'Acceso 24/7 a la plataforma',
                  'Recursos ilimitados',
                  'Soporte prioritario',
                  'Cambio gratuito de terapeuta',
                  'Seguimiento personalizado',
                  'Descuento del 40%'
                ].map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button 
                onClick={() => navigationProps && navigationProps.onNavigate && navigationProps.onNavigate('register')}
                style={{
                  width: '100%',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }}
              >
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Para Empresas Section */}
        <div style={{ marginBottom: '60px' }}>
          {/* Section Title */}
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Para Empresas
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px auto'
          }}>
            Soluciones empresariales completas para el bienestar de tus empleados con tecnología avanzada.
          </p>

          {/* Business Pricing Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {/* Plan Base Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '32px 24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}>
              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 12px 0',
                textAlign: 'center'
              }}>
                Plan Base
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: '0 0 24px 0',
                textAlign: 'center'
              }}>
                Software completo para empresas
              </p>

              {/* Price */}
              <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#3b82f6'
                }}>
                  Precio personalizado
                </span>
              </div>

              {/* Features */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px 0',
                textAlign: 'left'
              }}>
                {[
                  'Plataforma completa de bienestar',
                  'Inteligencia artificial integrada',
                  'Sistema de matching avanzado',
                  'Seguimiento de empleados',
                  'Toolkits de bienestar',
                  'Dashboard analítico',
                  'Reportes personalizados',
                  'Soporte técnico 24/7'
                ].map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button 
                onClick={openContactModal}
                style={{
                  width: '100%',
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7c3aed';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#8b5cf6';
                }}
              >
                Solicitar demo
              </button>
            </div>

            {/* Plan Premium Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              padding: '32px 24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }}>
              {/* Premium Badge */}
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#f59e0b',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                Recomendado
              </div>

              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 12px 0',
                textAlign: 'center'
              }}>
                Plan Premium
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: '0 0 24px 0',
                textAlign: 'center'
              }}>
                Solución completa con servicios adicionales
              </p>

              {/* Price */}
              <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#f59e0b'
                }}>
                  Precio personalizado
                </span>
              </div>

              {/* Features */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 24px 0',
                textAlign: 'left'
              }}>
                {[
                  'Todo del Plan Base',
                  'Psicólogos dedicados',
                  'Capacitaciones personalizadas',
                  'Consultoría estratégica',
                  'Implementación asistida',
                  'Métricas avanzadas',
                  'Soporte prioritario',
                  'Sesiones grupales incluidas'
                ].map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button 
                onClick={openContactModal}
                style={{
                  width: '100%',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#d97706';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f59e0b';
                }}
              >
                Solicitar demo
              </button>
            </div>
          </div>
        </div>

        {/* Características Empresariales Section */}
        <div style={{ marginBottom: '60px' }}>
          {/* Section Title */}
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Características{' '}
            <span style={{ 
              background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Empresariales
            </span>
          </h2>

          {/* Feature Cards */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Analytics Avanzado Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px 20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            }}>
              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 12px 0',
                textAlign: 'center'
              }}>
                Analytics Avanzado
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#6b7280',
                lineHeight: '1.5',
                textAlign: 'center',
                margin: 0
              }}>
                Reportes detallados del bienestar de tus empleados con métricas clave
              </p>
            </div>

            {/* Facturación Flexible Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px 20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            }}>
              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 12px 0',
                textAlign: 'center'
              }}>
                Facturación Flexible
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#6b7280',
                lineHeight: '1.5',
                textAlign: 'center',
                margin: 0
              }}>
                Opciones de pago adaptadas a tu empresa con facturación personalizada
              </p>
            </div>

            {/* Integración API Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px 20px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            }}>
              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: '#8b5cf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: '0 0 12px 0',
                textAlign: 'center'
              }}>
                Integración API
              </h3>
              <p style={{
                fontSize: '15px',
                color: '#6b7280',
                lineHeight: '1.5',
                textAlign: 'center',
                margin: 0
              }}>
                Conecta nuestra plataforma con tus sistemas existentes de manera sencilla
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div style={{
          textAlign: 'center',
          background: 'linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)',
          borderRadius: '20px',
          padding: '40px 24px',
          marginTop: '40px'
        }}>
          {/* Main Title */}
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            fontWeight: 'bold',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            <span style={{ color: '#374151' }}>¿Listo para transformar el</span>{' '}
            <span style={{ 
              background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>bienestar de tu equipo?</span>
          </h2>

          {/* Descriptive Paragraph */}
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto 32px auto'
          }}>
            Únete a empresas líderes que ya confían en Empathica para el bienestar emocional de sus empleados.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {/* Demo Button */}
            <button 
              onClick={openContactModal}
              style={{
                background: 'linear-gradient(90deg, #3b82f6 0%, #f97316 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              Solicitar demo gratuita
            </button>

            {/* Contact Button */}
            <button 
              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              style={{
                backgroundColor: 'white',
                color: '#3b82f6',
                border: '2px solid #3b82f6',
                borderRadius: '12px',
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              Contactar por WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}
        onClick={closeContactModal}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '32px 24px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: 0
              }}>
                Solicitar Demo
              </h3>
              <button 
                onClick={closeContactModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '4px'
                }}
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              Completa el formulario y nuestro equipo se pondrá en contacto contigo para programar una demo personalizada.
            </p>

            {/* Contact Form */}
            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Nombre completo *
                </label>
                <input 
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Email corporativo *
                </label>
                <input 
                  type="email"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Empresa *
                </label>
                <input 
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Número de empleados
                </label>
                <select style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  boxSizing: 'border-box'
                }}>
                  <option value="">Selecciona una opción</option>
                  <option value="1-50">1-50 empleados</option>
                  <option value="51-200">51-200 empleados</option>
                  <option value="201-500">201-500 empleados</option>
                  <option value="500+">Más de 500 empleados</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Mensaje (opcional)
                </label>
                <textarea 
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Cuéntanos sobre tus necesidades específicas..."
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3b82f6';
                }}
              >
                Enviar solicitud
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PricingPage; 