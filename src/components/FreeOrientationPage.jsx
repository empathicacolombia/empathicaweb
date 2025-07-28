import React from 'react';
import logoEmpathica from '../assets/Logoempathica.png';

const FreeOrientationPage = ({ navigationProps }) => {
  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <nav style={{ background: '#0057FF', color: '#fff', padding: '1.2rem 0', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          {/* Logo y nombre */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <span
              style={{
                fontWeight: 'bold',
                fontSize: 28,
                letterSpacing: 1,
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onClick={() => handleNavigation('individuals')}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Empathica
            </span>
          </div>
          {/* Enlaces de navegación */}
          <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: 18, fontWeight: 500 }}>
            <li>
              <button
                onClick={() => handleNavigation('psychologists')}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0 0.5rem',
                  transition: 'color 0.2s, transform 0.2s',
                  fontWeight: 500,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#AEE2FF'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >
                Psicólogos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('business')}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0 0.5rem',
                  transition: 'color 0.2s, transform 0.2s',
                  fontWeight: 500,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#AEE2FF'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >
                Empresas
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('about-us')}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0 0.5rem',
                  transition: 'color 0.2s, transform 0.2s',
                  fontWeight: 500,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#AEE2FF'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >
                Acerca de
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('pricing')}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '0 0.5rem',
                  transition: 'color 0.2s, transform 0.2s',
                  fontWeight: 500,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#AEE2FF'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}
              >
                Precios
              </button>
            </li>
          </ul>
          {/* Botones */}
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <button
              onClick={() => handleNavigation('login')}
              style={{
                background: '#fff',
                color: '#0057FF',
                border: 'none',
                borderRadius: 20,
                padding: '0.7rem 1.5rem',
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'transform 0.18s, box-shadow 0.18s',
                boxShadow: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.09)';
                e.currentTarget.style.boxShadow = '0 2px 12px #0057ff44';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => handleNavigation('register')}
              style={{
                background: 'transparent',
                color: '#fff',
                border: '2px solid #fff',
                borderRadius: 20,
                padding: '0.7rem 1.5rem',
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'transform 0.18s, box-shadow 0.18s',
                boxShadow: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.09)';
                e.currentTarget.style.boxShadow = '0 2px 12px #fff4';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Registrarse
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Título y descripción */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: 48, 
            fontWeight: 800, 
            margin: 0, 
            marginBottom: '1rem',
            color: '#FF7043',
            letterSpacing: -1
          }}>
            Orientación Gratuita
          </h1>
          <p style={{ 
            color: '#555', 
            fontSize: 20, 
            margin: 0, 
            fontWeight: 400,
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.5
          }}>
            Agenda una sesión gratuita de orientación con nuestros especialistas. Te ayudaremos a encontrar el camino correcto para tu bienestar emocional.
          </p>
        </div>

        {/* Tarjeta de calendario */}
        <div style={{ 
          background: '#fff', 
          borderRadius: 16, 
          boxShadow: '0 4px 24px rgba(0,0,0,0.1)', 
          padding: '2.5rem',
          maxWidth: 800,
          margin: '0 auto',
          border: '1px solid #e0e7ef'
        }}>
          {/* Sección superior de la tarjeta */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            marginBottom: '2rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid #e0e7ef'
          }}>
            {/* Lado izquierdo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: 16 }}>
                <span style={{ fontSize: 20 }}>🕐</span>
                Citas de 45 min
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', fontSize: 16 }}>
                <div style={{ 
                  width: 24, 
                  height: 24, 
                  background: '#00C851', 
                  borderRadius: 4, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 12
                }}>
                  📹
                </div>
                Se agregará información sobre la videoconferencia de Google Meet después de la reserva
              </div>
            </div>

            {/* Lado derecho */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                marginBottom: '0.5rem',
                justifyContent: 'flex-end'
              }}>
                <span style={{ fontSize: 20 }}>💙</span>
                <span style={{ fontWeight: 700, fontSize: 20, color: '#0057FF' }}>Bienvenido a Empathica</span>
              </div>
              <div style={{ color: '#666', fontSize: 16 }}>
                Esta es nuestra cita para conocernos
              </div>
            </div>
          </div>

          {/* Área del calendario */}
          <div style={{ 
            background: '#f8f9fa', 
            borderRadius: 12, 
            padding: '2rem',
            border: '1px solid #e0e7ef',
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ fontSize: 48, color: '#0057FF' }}>📅</div>
            <h3 style={{ 
              fontSize: 24, 
              fontWeight: 700, 
              color: '#0057FF', 
              margin: 0,
              textAlign: 'center'
            }}>
              Calendario de Google
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: 16, 
              textAlign: 'center',
              maxWidth: 400,
              margin: 0
            }}>
              Aquí se integrará el calendario de Google para agendar tu sesión de orientación gratuita
            </p>
            <div style={{ 
              background: '#e3f2fd', 
              border: '1px solid #0057FF', 
              borderRadius: 8, 
              padding: '1rem',
              marginTop: '1rem',
              textAlign: 'center'
            }}>
              <p style={{ margin: 0, color: '#0057FF', fontWeight: 600 }}>
                🔗 Integración con Google Calendar
              </p>
              <p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: 14 }}>
                El calendario se cargará automáticamente aquí
              </p>
            </div>
          </div>

          {/* Footer de la tarjeta */}
          <div style={{ 
            marginTop: '2rem', 
            paddingTop: '1.5rem', 
            borderTop: '1px solid #e0e7ef',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: '#999', 
              fontSize: 14, 
              margin: '0 0 0.5rem 0'
            }}>
              Con tecnología de la agenda de citas del Calendario de Google.
            </p>
            <p style={{ 
              color: '#999', 
              fontSize: 14, 
              margin: '0 0 0.5rem 0'
            }}>
              El uso está sujeto a la Política de Privacidad y a las Condiciones del Servicio de Google.
            </p>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem',
              color: '#0057FF',
              fontSize: 14,
              cursor: 'pointer'
            }}>
              <span>💬</span>
              Enviar comentarios a Google
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeOrientationPage; 