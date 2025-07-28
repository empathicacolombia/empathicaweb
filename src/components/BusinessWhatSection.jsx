import React from 'react';

const BusinessWhatSection = () => {
  return (
    <section className="section-container" style={{ 
      background: '#fff', 
      padding: '5rem 0 4rem 0' 
    }}>
      <div className="container" style={{ 
        maxWidth: 1200, 
        margin: '0 auto', 
        textAlign: 'center',
        padding: '0 2rem'
      }}>
        {/* Header Section */}
        <div style={{ marginBottom: '4rem' }}>
          {/* Main Title */}
        <h2 className="section-title" style={{ 
            fontSize: 42, 
            fontWeight: 800, 
            margin: 0, 
            marginBottom: '1.5rem', 
            letterSpacing: -1,
            background: 'linear-gradient(90deg, #0057FF 0%, #c8b6ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ¿Qué es Empathica Empresas?
          </h2>
          
          {/* Descriptive Paragraph */}
          <p style={{ 
            color: '#333', 
            fontSize: 18, 
            margin: '0 0 2rem 0', 
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Un sistema de match psicológico con IA aplicado a equipos. Cada colaborador hace un test y recibe orientación + acompañamiento personalizado.
          </p>
          
          {/* Quote Box */}
          <div style={{ 
            background: '#fff8f0', 
            borderRadius: 16, 
            padding: '2rem 3rem', 
            margin: '0 auto',
            maxWidth: 900,
            boxShadow: '0 2px 12px #0001',
            border: '1px solid #ffe4d4'
          }}>
            <p style={{ 
              color: '#ff9800', 
              fontSize: 20, 
              margin: 0, 
              fontWeight: 600,
              fontStyle: 'italic',
              lineHeight: 1.5
            }}>
              "Porque cada persona necesita algo distinto, y generalizar la atención emocional ya no funciona."
            </p>
          </div>
        </div>

        {/* Middle Section - Example Flow */}
        <div style={{ marginBottom: '4rem' }}>
          {/* Subtitle */}
          <h3 style={{ 
            fontSize: 24, 
            fontWeight: 700, 
            margin: '0 0 2rem 0', 
            color: '#333',
            textAlign: 'left'
          }}>
            Otro ejemplo:
          </h3>
          
          {/* Flow Cards */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            {/* Left Card - Problem/User */}
            <div style={{ 
              background: '#fff8f0', 
              borderRadius: 20, 
              padding: '2rem', 
              boxShadow: '0 4px 16px #0001',
              border: '1px solid #ffe4d4',
              minWidth: 280,
              maxWidth: 320
            }}>
              <div style={{ 
                width: 56, 
                height: 56, 
                borderRadius: '50%', 
                background: '#ff9800', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 700, 
                fontSize: 20,
                margin: '0 auto 1rem auto'
              }}>
                DM
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontWeight: 700, 
                  fontSize: 18, 
                  marginBottom: 8, 
                  color: '#333' 
                }}>
                  David, gerente
                </div>
                <div style={{ 
                  color: '#666', 
                  fontSize: 16, 
                  lineHeight: 1.4 
                }}>
                  Lleva meses sin vacaciones. No duerme.
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 1rem'
            }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M16 24h16M32 24l-6-6M32 24l-6 6" stroke="#ff9800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Right Card - Solution/Specialist */}
            <div style={{ 
              background: '#f0f8ff', 
              borderRadius: 20, 
              padding: '2rem', 
              boxShadow: '0 4px 16px #0001',
              border: '1px solid #e3f2fd',
              minWidth: 280,
              maxWidth: 320
            }}>
              <div style={{ 
                width: 56, 
                height: 56, 
                borderRadius: '50%', 
                background: '#0057FF', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 700, 
                fontSize: 20,
                margin: '0 auto 1rem auto'
              }}>
                Es
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontWeight: 700, 
                  fontSize: 18, 
                  marginBottom: 8, 
                  color: '#333' 
                }}>
                  Especialista
                </div>
                <div style={{ 
                  color: '#0057FF', 
                  fontSize: 16, 
                  lineHeight: 1.4 
                }}>
                  Descarga emocional estructurada
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Benefits/Features */}
        <div className="cards-grid" style={{ 
          display: 'flex', 
          gap: '2.5rem', 
          justifyContent: 'center',
          alignItems: 'stretch',
          flexWrap: 'wrap'
        }}>
          {/* Left Card - Sin prueba y error */}
          <div className="card" style={{ 
            background: '#f0f8ff', 
            borderRadius: 20, 
            padding: '2.5rem 2rem', 
            boxShadow: '0 4px 16px #0001',
            border: '1px solid #e3f2fd',
            flex: '1 1 400px',
            minWidth: 350,
            maxWidth: 500
          }}>
            <div style={{ 
              width: 64, 
              height: 64, 
              borderRadius: '50%', 
              background: '#fff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 2px 8px #0001'
            }}>
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="12" stroke="#0057FF" strokeWidth="2"/>
                <circle cx="16" cy="16" r="6" stroke="#0057FF" strokeWidth="2"/>
                <circle cx="16" cy="16" r="2" fill="#0057FF"/>
              </svg>
            </div>
            <h3 style={{ 
              fontWeight: 700, 
              fontSize: 22, 
              margin: '0 0 1rem 0', 
              color: '#333',
              textAlign: 'center'
            }}>
              Sin prueba y error
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: 16, 
              lineHeight: 1.6, 
              margin: 0,
              textAlign: 'center'
            }}>
              Nuestro algoritmo identifica exactamente qué tipo de apoyo necesita cada persona desde el primer día.
            </p>
          </div>

          {/* Right Card - Sin desperdicio de recursos */}
          <div className="card" style={{ 
            background: '#fff8f0', 
            borderRadius: 20, 
            padding: '2.5rem 2rem', 
            boxShadow: '0 4px 16px #0001',
            border: '1px solid #ffe4d4',
            flex: '1 1 400px',
            minWidth: 350,
            maxWidth: 500
          }}>
            <div style={{ 
              width: 64, 
              height: 64, 
              borderRadius: '50%', 
              background: '#fff', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.5rem auto',
              boxShadow: '0 2px 8px #0001'
            }}>
              <span role="img" aria-label="brain" style={{ fontSize: 32, color: '#ff9800' }}>🧠</span>
            </div>
            <h3 style={{ 
              fontWeight: 700, 
              fontSize: 22, 
              margin: '0 0 1rem 0', 
              color: '#333',
              textAlign: 'center'
            }}>
              Sin desperdicio de recursos
            </h3>
            <p style={{ 
              color: '#666', 
              fontSize: 16, 
              lineHeight: 1.6, 
              margin: 0,
              textAlign: 'center'
            }}>
              Cada sesión es efectiva porque conectamos a la persona correcta con el especialista ideal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessWhatSection; 