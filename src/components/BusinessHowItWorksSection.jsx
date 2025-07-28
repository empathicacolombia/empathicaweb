import React from 'react';

const BusinessHowItWorksSection = () => {
  return (
    <section style={{
      background: '#f8f9fa',
      padding: '5rem 0 4rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Formas circulares abstractas de fondo */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(100, 181, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 152, 0, 0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 2rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 42,
            fontWeight: 800,
            margin: 0,
            marginBottom: '1.5rem',
            letterSpacing: -1
          }}>
            <span style={{
              color: '#0057FF',
              display: 'inline-block'
            }}>
              ¿Cómo
            </span>
            <span style={{
              color: '#9e9e9e',
              display: 'inline-block',
              marginLeft: '8px'
            }}>
              funciona?
            </span>
          </h2>
          <p style={{
            color: '#333',
            fontSize: 18,
            margin: 0,
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Un proceso simple y efectivo que transforma el bienestar de tu organización
          </p>
        </div>

        {/* Proceso de 4 pasos */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {/* Paso 1 - RH invita al equipo */}
          <div style={{
            background: '#fff3e0',
            borderRadius: 20,
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            flex: '1 1 250px',
            minWidth: 250,
            maxWidth: 280
          }}>
            {/* Triángulo naranja en la esquina superior derecha */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 30px 30px 0',
              borderColor: 'transparent #ff5722 transparent transparent'
            }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#ff9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: 32, color: '#fff' }}>📧</span>
              </div>
              
              <h3 style={{
                fontWeight: 700,
                fontSize: 20,
                margin: '0 0 1rem 0',
                color: '#333'
              }}>
                RH invita al equipo
              </h3>
              <p style={{
                color: '#666',
                fontSize: 14,
                margin: 0,
                lineHeight: 1.5
              }}>
                Recursos Humanos envía invitación para tomar el test de personalización
              </p>
            </div>
          </div>

          {/* Flecha 1 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '2rem',
            flexShrink: 0
          }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="#ff9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Paso 2 - Persona toma el test */}
          <div style={{
            background: '#e3f2fd',
            borderRadius: 20,
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            flex: '1 1 250px',
            minWidth: 250,
            maxWidth: 280
          }}>
            {/* Triángulo azul en la esquina superior derecha */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 30px 30px 0',
              borderColor: 'transparent #2196f3 transparent transparent'
            }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#2196f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: 32, color: '#fff' }}>📝</span>
              </div>
              
              <h3 style={{
                fontWeight: 700,
                fontSize: 20,
                margin: '0 0 1rem 0',
                color: '#333'
              }}>
                Persona toma el test
              </h3>
              <p style={{
                color: '#666',
                fontSize: 14,
                margin: 0,
                lineHeight: 1.5
              }}>
                Se categoriza con ayuda de nuestra IA y recibe su match emocional
              </p>
            </div>
          </div>

          {/* Flecha 2 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '2rem',
            flexShrink: 0
          }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="#ff9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Paso 3 - Soporte IA y medición */}
          <div style={{
            background: '#fff3e0',
            borderRadius: 20,
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            flex: '1 1 250px',
            minWidth: 250,
            maxWidth: 280
          }}>
            {/* Triángulo naranja en la esquina superior derecha */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 30px 30px 0',
              borderColor: 'transparent #ff5722 transparent transparent'
            }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#ff9800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: 32, color: '#fff' }}>🤖</span>
              </div>
              
              <h3 style={{
                fontWeight: 700,
                fontSize: 20,
                margin: '0 0 1rem 0',
                color: '#333'
              }}>
                Soporte IA y medición
              </h3>
              <p style={{
                color: '#666',
                fontSize: 14,
                margin: 0,
                lineHeight: 1.5
              }}>
                Cuenta con material interactivo y variables de medición anónimas para RH
              </p>
            </div>
          </div>

          {/* Flecha 3 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '2rem',
            flexShrink: 0
          }}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="#ff9800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Paso 4 - RH con toolkit IA */}
          <div style={{
            background: '#e3f2fd',
            borderRadius: 20,
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            flex: '1 1 250px',
            minWidth: 250,
            maxWidth: 280
          }}>
            {/* Triángulo azul en la esquina superior derecha */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 30px 30px 0',
              borderColor: 'transparent #2196f3 transparent transparent'
            }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#2196f3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: 32, color: '#fff' }}>🛠️</span>
              </div>
              
              <h3 style={{
                fontWeight: 700,
                fontSize: 20,
                margin: '0 0 1rem 0',
                color: '#333'
              }}>
                RH con toolkit IA
              </h3>
              <p style={{
                color: '#666',
                fontSize: 14,
                margin: 0,
                lineHeight: 1.5
              }}>
                IA de RH enfocada en bienestar emocional para tomar decisiones y ejecutar cambios
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessHowItWorksSection; 