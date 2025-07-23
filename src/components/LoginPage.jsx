import React, { useState } from 'react';

const LoginPage = ({ navigationProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Redirigir al dashboard del psicólogo con datos en duro por ahora
    console.log('Login attempt:', { email, password });
    handleNavigation('psychologist-dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fff 0%, #fff3e0 100%)',
      position: 'relative'
    }}>
      {/* Header */}
      <nav style={{ 
        background: '#0057FF', 
        color: '#fff', 
        padding: '1.2rem 0', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ 
          maxWidth: 1300, 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 2rem'
        }}>
          {/* Logo */}
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

          {/* Enlaces de navegación */}
          <ul style={{ 
            display: 'flex', 
            gap: '2.5rem', 
            listStyle: 'none', 
            margin: 0, 
            padding: 0, 
            fontSize: 18, 
            fontWeight: 500 
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
                  fontWeight: 'inherit'
                }}
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
                  fontWeight: 'inherit'
                }}
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
                  fontWeight: 'inherit'
                }}
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
                  fontWeight: 'inherit'
                }}
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
                background: 'transparent',
                color: '#0057FF',
                border: '2px solid #fff',
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
        padding: '2rem'
      }}>
        {/* Tarjeta de login */}
        <div style={{
          background: '#fff',
          borderRadius: 20,
          padding: '3rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: 450,
          position: 'relative'
        }}>
          {/* Icono superior */}
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#0057FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem auto'
          }}>
            <span style={{
              color: '#fff',
              fontSize: 24,
              fontWeight: 700
            }}>
              E
            </span>
          </div>

          {/* Título */}
          <h1 style={{
            fontSize: 32,
            fontWeight: 800,
            margin: '0 0 0.5rem 0',
            textAlign: 'center',
            letterSpacing: -1
          }}>
            <span style={{ color: '#0057FF' }}>
              Bienvenido de{' '}
            </span>
            <span style={{
              background: 'linear-gradient(90deg, #ff6b6b 0%, #ff8e8e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              nuevo
            </span>
          </h1>

          {/* Subtítulo */}
          <p style={{
            color: '#666',
            fontSize: 16,
            margin: '0 0 2.5rem 0',
            textAlign: 'center'
          }}>
            Ingresa a tu cuenta de Empathica
          </p>

          {/* Formulario */}
          <form onSubmit={handleLogin}>
            {/* Campo de email */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@ejemplo.com"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: 12,
                  fontSize: 16,
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            {/* Campo de contraseña */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                color: '#333',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tu contraseña"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    paddingRight: '3rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: 12,
                    fontSize: 16,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666'
                  }}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M1 10s3-7 9-7 9 7 9 7-3 7-9 7-9-7-9-7z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <path d="M1 1l18 18M3.5 3.5C2 5 1 7 1 10s1 5 2.5 6.5M7 7c1-1 2.5-1.5 4-1.5s3 .5 4 1.5M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Link de contraseña olvidada */}
            <div style={{
              textAlign: 'right',
              marginBottom: '2rem'
            }}>
              <a href="#" style={{
                color: '#0057FF',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500
              }}>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón de iniciar sesión */}
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
                marginBottom: '2rem'
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
              Iniciar sesión
            </button>

            {/* Link de registro */}
            <div style={{
              textAlign: 'center',
              fontSize: 14,
              color: '#666'
            }}>
              ¿No tienes una cuenta?{' '}
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('register');
                }}
                style={{
                  color: '#0057FF',
                  textDecoration: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Regístrate aquí
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 