import React, { useState } from 'react';
import logoEmpathica from '../assets/Logoempathica.png';

const RegisterPage = ({ navigationProps }) => {
  const [userType, setUserType] = useState('patient'); // 'patient' o 'psychologist'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    professionalLicense: '' // Nuevo campo para psicólogos
  });

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register attempt:', { userType, formData });
    
    // Marcar al usuario como registrado
    if (navigationProps && navigationProps.onUserRegistration) {
      navigationProps.onUserRegistration();
    }
    
    // Redirigir según el tipo de usuario
    if (userType === 'psychologist') {
      handleNavigation('psychologist-profile-form');
    } else {
      // Cliente va directo al dashboard
      handleNavigation('client-dashboard');
    }
  };

  return (
    <div className="form-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff 0%, #fff3e0 100%)',
      position: 'relative'
    }}>
      {/* Header */}
      <nav style={{ 
        background: '#0057FF', 
        color: '#fff', 
        padding: '1rem 0', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        <div className="container navbar-container" style={{ 
          maxWidth: 1300, 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 20px'
        }}>
          {/* Logo */}
          <span
            style={{
              fontWeight: 'bold',
              fontSize: 'clamp(20px, 4vw, 28px)',
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

          {/* Desktop Navigation */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            {/* Enlaces de navegación - Desktop */}
            <ul style={{ 
              display: 'none',
              gap: '2rem', 
              listStyle: 'none', 
              margin: 0, 
              padding: 0, 
              fontSize: '16px', 
              fontWeight: 500,
              '@media (min-width: 768px)': {
                display: 'flex'
              }
            }}>
              <li>
                <button
                  onClick={() => handleNavigation('individuals')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Psicólogos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('business')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Empresas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('about')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Acerca de
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('pricing')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit',
                    fontWeight: 'inherit',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Precios
                </button>
              </li>
            </ul>

            {/* Botones - Desktop */}
            <div style={{ 
              display: 'none',
              gap: '1rem',
              '@media (min-width: 768px)': {
                display: 'flex'
              }
            }}>
              <button
                onClick={() => handleNavigation('login')}
                style={{
                  background: '#fff',
                  color: '#0057FF',
                  border: '2px solid #fff',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontWeight: 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'background 0.18s, color 0.18s, transform 0.18s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#0057FF';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#0057FF';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => handleNavigation('register')}
                style={{
                  background: '#fff',
                  color: '#0057FF',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontWeight: 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'transform 0.18s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Registrarse
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              '@media (min-width: 768px)': {
                display: 'none'
              }
            }}
          >
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              margin: '2px 0',
              transition: '0.3s',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }} />
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              margin: '2px 0',
              transition: '0.3s',
              opacity: mobileMenuOpen ? '0' : '1'
            }} />
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              margin: '2px 0',
              transition: '0.3s',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#0057FF',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000
          }}>
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <li>
                <button
                  onClick={() => handleNavigation('individuals')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Psicólogos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('business')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Empresas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('about')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Acerca de
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('pricing')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 500,
                    padding: '12px 16px',
                    borderRadius: '8px',
                    width: '100%',
                    textAlign: 'left',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Precios
                </button>
              </li>
            </ul>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.2)'
            }}>
              <button
                onClick={() => handleNavigation('login')}
                style={{
                  background: '#fff',
                  color: '#0057FF',
                  border: '2px solid #fff',
                  borderRadius: '20px',
                  padding: '12px 20px',
                  fontWeight: 500,
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background 0.18s, color 0.18s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#0057FF';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#0057FF';
                }}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => handleNavigation('register')}
                style={{
                  background: '#fff',
                  color: '#0057FF',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '12px 20px',
                  fontWeight: 500,
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Contenido principal */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem'
      }}>
        {/* Tarjeta principal */}
        <div style={{
          background: '#fff',
          borderRadius: 20,
          padding: '3rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: 600,
          position: 'relative'
        }}>
          {/* Logo superior */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#e3f2fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <img src={logoEmpathica} alt="Empathica Logo" style={{ width: '24px', height: '24px' }} />
          </div>

          {/* Título principal */}
          <h1 style={{
            fontSize: 32,
            fontWeight: 800,
            margin: '0 0 0.5rem 0',
            textAlign: 'center',
            color: '#0057FF',
            letterSpacing: -1
          }}>
            Únete a Empathica
          </h1>

          {/* Subtítulo */}
          <p style={{
            color: '#666',
            fontSize: 16,
            margin: '0 0 2rem 0',
            textAlign: 'center'
          }}>
            Escoge cómo quieres ser parte de nuestra comunidad
          </p>

          {/* Selector de tipo de usuario */}
          <div style={{
            display: 'flex',
            background: '#f5f5f5',
            borderRadius: 12,
            padding: '0.25rem',
            marginBottom: '2rem'
          }}>
            <button
              onClick={() => setUserType('patient')}
              style={{
                flex: 1,
                background: userType === 'patient' ? '#0057FF' : 'transparent',
                color: userType === 'patient' ? '#fff' : '#666',
                border: 'none',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Quiero hacer parte
            </button>
            <button
              onClick={() => setUserType('psychologist')}
              style={{
                flex: 1,
                background: userType === 'psychologist' ? '#0057FF' : 'transparent',
                color: userType === 'psychologist' ? '#fff' : '#666',
                border: 'none',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Quiero ser psicólogo
            </button>
          </div>

          {/* Título del formulario */}
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            margin: '0 0 0.5rem 0',
            color: '#0057FF'
          }}>
            Registro como {userType === 'patient' ? 'Paciente' : 'Psicólogo'}
          </h2>

          {/* Subtítulo del formulario */}
          <p style={{
            color: '#666',
            fontSize: 14,
            margin: '0 0 2rem 0'
          }}>
            {userType === 'patient' 
              ? 'Accede a nuestros servicios de salud mental'
              : 'Únete a nuestra red de profesionales'
            }
          </p>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {/* Primera fila - Nombre y Apellido */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  color: '#333',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Tu nombre"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  color: '#333',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>
                  Apellido *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Tu apellido"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            </div>

            {/* Email - Ancho completo */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                color: '#333',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                Correo electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="tu@ejemplo.com"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {/* Cédula profesional - Solo para psicólogos */}
            {userType === 'psychologist' && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#333',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>
                  Cédula profesional <span style={{ color: '#ff4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.professionalLicense}
                  onChange={(e) => handleInputChange('professionalLicense', e.target.value)}
                  placeholder="Número de cédula profesional"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            )}

            {/* Contraseñas - Dos columnas */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  color: '#333',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>
                  Contraseña
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  color: '#333',
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: '0.5rem'
                }}>
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirma tu contraseña"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #0057FF',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            </div>

            {/* Teléfono - Dos partes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                color: '#333',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                Contacto telefónico
              </label>
              <div style={{
                display: 'flex',
                gap: '0.5rem'
              }}>
                <select
                  style={{
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    background: '#fff',
                    minWidth: '80px'
                  }}
                >
                  <option value="+57">+57</option>
                  <option value="+1">+1</option>
                  <option value="+34">+34</option>
                  <option value="+52">+52</option>
                </select>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Número de teléfono"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            </div>

            {/* Género - Ancho completo */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                color: '#333',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                Género *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 14,
                  outline: 'none',
                  background: '#fff',
                  color: formData.gender ? '#333' : '#999'
                }}
              >
                <option value="">Selecciona tu género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="no-binario">No binario</option>
                <option value="prefiero-no-decir">Prefiero no decir</option>
              </select>
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              style={{
                width: '100%',
                background: '#0057FF',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '1rem',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                marginBottom: '1.5rem'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 87, 255, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Registrarse como {userType === 'patient' ? 'Paciente' : 'Psicólogo'}
            </button>

            {/* Link de login */}
            <div style={{
              textAlign: 'center',
              fontSize: 14,
              color: '#666'
            }}>
              ¿Ya tienes una cuenta?{' '}
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('login');
                }}
                style={{
                  color: '#0057FF',
                  textDecoration: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Inicia sesión aquí
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 