import React, { useState } from 'react';
import logoEmpathica from '../assets/Logoempathica.png';

const QuickRegisterPage = ({ navigationProps }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es requerido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Marcar al usuario como registrado
      if (navigationProps && navigationProps.onUserRegistration) {
        navigationProps.onUserRegistration();
      }
      
      // Ir directamente al dashboard del cliente
      handleNavigation('client-dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff 0%, #fff3e0 100%)',
      position: 'relative'
    }}>
      {/* Header */}
      <nav style={{ 
        background: '#0057FF', 
        color: '#fff', 
        padding: '1rem 0', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
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

          {/* Enlaces de navegación */}
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

          {/* Botones */}
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <button
              onClick={() => handleNavigation('login')}
              style={{
                background: '#fff',
                color: '#0057FF',
                border: '2px solid #fff',
                borderRadius: 20,
                padding: '0.7rem 1.5rem',
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'all 0.2s'
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
                borderRadius: 20,
                padding: '0.7rem 1.5rem',
                fontWeight: 500,
                fontSize: 16,
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
      </nav>

      {/* Contenido principal */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '20px'
      }}>
        {/* Tarjeta de registro */}
        <div style={{
          background: '#fff',
          borderRadius: 20,
          padding: 'clamp(20px, 4vw, 48px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '500px'
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img 
              src={logoEmpathica} 
              alt="Empathica" 
              style={{ 
                height: 'clamp(40px, 8vw, 60px)', 
                marginBottom: '16px' 
              }} 
            />
            <h1 style={{ 
              fontSize: 'clamp(24px, 5vw, 32px)', 
              fontWeight: 'bold', 
              color: '#0057FF', 
              margin: '0 0 8px 0' 
            }}>
              Completar Registro
            </h1>
            <p style={{ 
              color: '#666', 
              fontSize: 'clamp(14px, 3vw, 16px)',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Completa tu información para acceder a tu dashboard
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Nombre y Apellido */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '20px',
              '@media (min-width: 768px)': {
                flexDirection: 'row',
                gap: '16px'
              }
            }}>
              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 600, 
                  color: '#333',
                  fontSize: 'clamp(14px, 2.5vw, 16px)'
                }}>
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'clamp(12px, 2.5vw, 16px)',
                    border: `2px solid ${errors.firstName ? '#ff6b6b' : '#e0e7ef'}`,
                    borderRadius: 12,
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    transition: 'border-color 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = errors.firstName ? '#ff6b6b' : '#e0e7ef'}
                />
                {errors.firstName && (
                  <div style={{ color: '#ff6b6b', fontSize: 'clamp(12px, 2vw, 14px)', marginTop: '4px' }}>
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 600, 
                  color: '#333',
                  fontSize: 'clamp(14px, 2.5vw, 16px)'
                }}>
                  Apellido *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'clamp(12px, 2.5vw, 16px)',
                    border: `2px solid ${errors.lastName ? '#ff6b6b' : '#e0e7ef'}`,
                    borderRadius: 12,
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    transition: 'border-color 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = errors.lastName ? '#ff6b6b' : '#e0e7ef'}
                />
                {errors.lastName && (
                  <div style={{ color: '#ff6b6b', fontSize: 'clamp(12px, 2vw, 14px)', marginTop: '4px' }}>
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: 600, 
                color: '#333',
                fontSize: 'clamp(14px, 2.5vw, 16px)'
              }}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'clamp(12px, 2.5vw, 16px)',
                  border: `2px solid ${errors.email ? '#ff6b6b' : '#e0e7ef'}`,
                  borderRadius: 12,
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  transition: 'border-color 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                onBlur={(e) => e.target.style.borderColor = errors.email ? '#ff6b6b' : '#e0e7ef'}
              />
              {errors.email && (
                <div style={{ color: '#ff6b6b', fontSize: 'clamp(12px, 2vw, 14px)', marginTop: '4px' }}>
                  {errors.email}
                </div>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: 600, 
                color: '#333',
                fontSize: 'clamp(14px, 2.5vw, 16px)'
              }}>
                Teléfono *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'clamp(12px, 2.5vw, 16px)',
                  border: `2px solid ${errors.phone ? '#ff6b6b' : '#e0e7ef'}`,
                  borderRadius: 12,
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  transition: 'border-color 0.2s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                onBlur={(e) => e.target.style.borderColor = errors.phone ? '#ff6b6b' : '#e0e7ef'}
              />
              {errors.phone && (
                <div style={{ color: '#ff6b6b', fontSize: 'clamp(12px, 2vw, 14px)', marginTop: '4px' }}>
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Contraseña y Confirmar Contraseña */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '20px',
              '@media (min-width: 768px)': {
                flexDirection: 'row',
                gap: '16px'
              }
            }}>
              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 600, 
                  color: '#333',
                  fontSize: 'clamp(14px, 2.5vw, 16px)'
                }}>
                  Contraseña *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'clamp(12px, 2.5vw, 16px)',
                    border: `2px solid ${errors.password ? '#ff6b6b' : '#e0e7ef'}`,
                    borderRadius: 12,
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    transition: 'border-color 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = errors.password ? '#ff6b6b' : '#e0e7ef'}
                />
                {errors.password && (
                  <div style={{ color: '#ff6b6b', fontSize: 'clamp(12px, 2vw, 14px)', marginTop: '4px' }}>
                    {errors.password}
                  </div>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: 600, 
                  color: '#333',
                  fontSize: 'clamp(14px, 2.5vw, 16px)'
                }}>
                  Confirmar Contraseña *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'clamp(12px, 2.5vw, 16px)',
                    border: `2px solid ${errors.confirmPassword ? '#ff6b6b' : '#e0e7ef'}`,
                    borderRadius: 12,
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    transition: 'border-color 0.2s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = errors.confirmPassword ? '#ff6b6b' : '#e0e7ef'}
                />
                {errors.confirmPassword && (
                  <div style={{ color: '#ff6b6b', fontSize: 'clamp(12px, 2vw, 14px)', marginTop: '4px' }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              style={{
                background: '#0057FF',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: 'clamp(14px, 3vw, 18px)',
                fontWeight: 700,
                fontSize: 'clamp(16px, 3vw, 18px)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 87, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Completar Registro
            </button>
          </form>

          {/* Enlaces de navegación */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #e0e7ef'
          }}>
            <p style={{ 
              color: '#666', 
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              margin: '0 0 16px 0'
            }}>
              ¿Ya tienes una cuenta?{' '}
              <button
                onClick={() => handleNavigation('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0057FF',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 'inherit',
                  textDecoration: 'underline'
                }}
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickRegisterPage; 