import React from 'react';
import Navbar from './Navbar';

function AboutUsPage({ navigationProps }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Unified Navbar */}
      <Navbar navigationProps={navigationProps} />

      {/* Main Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        {/* Conoce nuestra historia Button */}
        <button 
          onClick={() => window.location.href = '#historia'}
          style={{
            backgroundColor: '#e0e7ff',
            color: '#1e40af',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '0 auto 24px auto'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          Conoce nuestra historia
        </button>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(32px, 6vw, 48px)',
          fontWeight: 'bold',
          marginBottom: '20px',
          lineHeight: '1.2'
        }}>
          <span style={{ color: '#6366f1' }}>Nuestra</span>{' '}
          <span style={{ color: '#4b5563' }}>Historia</span>
        </h1>

        {/* Descriptive Paragraph */}
        <p style={{
          fontSize: '16px',
          color: '#374151',
          lineHeight: '1.6',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px auto'
        }}>
          Empathica nació de la convicción de que todos merecen acceso a apoyo emocional de calidad. 
          Creamos una plataforma que conecta corazones con mentes expertas, usando tecnología para 
          hacer que la terapia sea más accesible, personalizada y efectiva.
        </p>

        {/* Call-to-Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => navigationProps && navigationProps.onNavigate && navigationProps.onNavigate('questionnaire-match')}
            style={{
              background: 'linear-gradient(90deg, #2563eb 0%, #ec4899 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Encuentra tu match
          </button>

          <button 
            onClick={() => navigationProps && navigationProps.onNavigate && navigationProps.onNavigate('free-orientation')}
            style={{
              backgroundColor: 'white',
              color: '#2563eb',
              border: '2px solid #2563eb',
              borderRadius: '12px',
              padding: '14px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Orientación gratuita
          </button>
        </div>
      </div>

      {/* Misión y Visión Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        {/* Nuestra Misión */}
        <div>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            fontWeight: 'bold',
            marginBottom: '20px',
            lineHeight: '1.2',
            textAlign: 'center'
          }}>
            <span style={{ color: '#374151' }}>Nuestra</span>{' '}
            <span style={{ color: '#ec4899' }}>Misión</span>
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Democratizar el acceso a la salud mental mediante tecnología innovadora que conecta a las personas con los profesionales más adecuados para sus necesidades específicas.
          </p>

          {/* Feature Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Accesibilidad Card */}
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    Accesibilidad
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Terapia para todos, sin barreras geográficas o económicas
                  </p>
                </div>
              </div>
            </div>

            {/* Confianza Card */}
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    Confianza
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Profesionales verificados y certificados con experiencia comprobada
                  </p>
                </div>
              </div>
            </div>

            {/* Comunidad Card */}
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.99 2.5V18h-2v-8.5l-1.99-2.5A2.5 2.5 0 0 0 9 8H7.46c-.8 0-1.54.37-2.01 1L2.5 16H5v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2z"/>
                  </svg>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    Comunidad
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Construyendo bienestar colectivo y apoyo mutuo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nuestra Visión */}
        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '20px',
          padding: '32px 24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          {/* Globe Icon */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>

          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 36px)',
            fontWeight: 'bold',
            marginBottom: '20px',
            lineHeight: '1.2',
            textAlign: 'center'
          }}>
            <span style={{ color: '#374151' }}>Nuestra</span>{' '}
            <span style={{ color: '#ec4899' }}>Visión</span>
          </h2>
          
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Ser la plataforma líder en salud mental digital, donde cada persona encuentre el apoyo emocional que necesita, cuando lo necesita, creando un mundo más empático y mentalmente saludable.
          </p>

          {/* Statistics */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center', minWidth: '80px' }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#2563eb',
                marginBottom: '4px'
              }}>
                15K+
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Usuarios
              </div>
            </div>
            
            <div style={{ textAlign: 'center', minWidth: '80px' }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#f59e0b',
                marginBottom: '4px'
              }}>
                500+
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Psicólogos
              </div>
            </div>
            
            <div style={{ textAlign: 'center', minWidth: '80px' }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '4px'
              }}>
                98%
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Satisfacción
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cómo Funciona Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Main Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            <span style={{ color: '#374151' }}>Cómo</span>{' '}
            <span style={{ 
              background: 'linear-gradient(90deg, #ec4899 0%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Funciona</span>
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Nuestro proceso científicamente respaldado te conecta con el profesional ideal y te acompaña en cada paso de tu bienestar emocional.
          </p>
        </div>

        {/* Main Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {/* Apoyo IA 24/7 Card */}
          <div style={{
            background: 'linear-gradient(135deg, #e0e7ff 0%, #dcfce7 100%)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: '0 0 4px 0'
                }}>
                  Apoyo IA 24/7
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Asistente inteligente siempre disponible
                </p>
              </div>
            </div>

            {/* Chat Interface */}
            <div style={{ marginBottom: '20px' }}>
              {/* User Message */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div style={{
                  backgroundColor: '#dbeafe',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  maxWidth: '80%'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#1e40af',
                    margin: 0
                  }}>
                    "Me siento muy estresado últimamente..."
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                justifyContent: 'flex-end'
              }}>
                <div style={{
                  backgroundColor: '#f3f4f6',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  maxWidth: '80%'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#374151',
                    margin: 0
                  }}>
                    "Entiendo cómo te sientes. Te sugiero algunas técnicas de respiración..."
                  </p>
                </div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Respuestas inmediatas 24/7</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Técnicas de relajación personalizadas</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Seguimiento de tu progreso</span>
              </div>
            </div>
          </div>

          {/* Matching Inteligente Card */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: '0 0 4px 0'
                }}>
                  Matching Inteligente
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Algoritmo científico para encontrar tu psicólogo ideal
                </p>
              </div>
            </div>

            {/* Matching Process */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>1</span>
                </div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Completas tu perfil emocional</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>2</span>
                </div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Nuestro algoritmo analiza tus necesidades</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>3</span>
                </div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Te conectamos con tu match perfecto</span>
              </div>
            </div>

            {/* Match Percentage */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '16px',
              textAlign: 'center',
              border: '2px solid #f59e0b'
            }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#f59e0b',
                marginBottom: '4px'
              }}>
                96% Match
              </div>
              <div style={{
                fontSize: '12px',
                color: '#6b7280'
              }}>
                Basado en compatibilidad científica
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <h3 style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#1f2937'
          }}>
            ¿Listo para comenzar tu viaje?
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            marginBottom: '24px'
          }}>
            Únete a miles de personas que ya han encontrado su bienestar emocional
          </p>
          <button 
            onClick={() => navigationProps && navigationProps.onNavigate && navigationProps.onNavigate('questionnaire-match')}
            style={{
              background: 'linear-gradient(90deg, #2563eb 0%, #ec4899 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)'
            }}
          >
            Comenzar ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage; 