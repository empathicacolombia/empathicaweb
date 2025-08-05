import React, { useState } from 'react';
import logoEmpathica from '../assets/Logoempathica.png';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '../services/api';

/**
 * Componente de página de Inicio de Sesión (Login)
 * Permite a los usuarios autenticarse en la plataforma Empathica
 * Incluye formulario de login, navegación y funcionalidades de seguridad
 * 
 * @param {Object} navigationProps - Propiedades para navegación entre páginas
 * @param {Function} navigationProps.onNavigate - Función para cambiar de página
 */
const LoginPage = ({ navigationProps }) => {
  /**
   * Estado para controlar la visibilidad de la contraseña
   */
  const [showPassword, setShowPassword] = useState(false);
  
  /**
   * Estado para almacenar el email del usuario
   */
  const [email, setEmail] = useState('');
  
  /**
   * Estado para almacenar la contraseña del usuario
   */
  const [password, setPassword] = useState('');
  
  /**
   * Estado para controlar el menú móvil
   */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * Estado para controlar el loading durante el login
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Estado para manejar errores del login
   */
  const [error, setError] = useState('');

  /**
   * Función para crear un usuario de prueba (solo para desarrollo)
   */
  const createTestUser = async () => {
    try {
      const testUserData = {
        id: 0,
        username: 'test@example.com',
        name: 'Usuario',
        lastName: 'Prueba',
        email: 'test@example.com',
        password: '123456',
        role: 'PATIENT'
      };

      console.log('Creando usuario de prueba...');
      const response = await fetch('https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testUserData)
      });

      console.log('Respuesta del signup:', {
        status: response.status,
        statusText: response.statusText
      });

      const result = await response.json();
      console.log('Usuario de prueba creado:', result);
      
      // Auto-completar el formulario con las credenciales de prueba
      setEmail('test@example.com');
      setPassword('123456');
      
      setError('Usuario de prueba creado. Intenta hacer login ahora.');
      
    } catch (error) {
      console.error('Error creando usuario de prueba:', error);
      setError('Error creando usuario de prueba: ' + error.message);
    }
  };

  /**
   * Función para probar la conectividad con el servidor
   */
  const testServerConnection = async () => {
    try {
      console.log('Probando conectividad con el servidor...');
      const response = await fetch('https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443/api/auth/login', {
        method: 'OPTIONS'
      });
      console.log('Respuesta OPTIONS:', response);
    } catch (error) {
      console.error('Error de conectividad:', error);
    }
  };

  /**
   * Maneja la navegación entre diferentes páginas de la aplicación
   * @param {string} page - Nombre de la página a la que navegar
   */
  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  /**
   * Maneja el envío del formulario de login
   * Integra con el backend para autenticación
   * @param {Event} e - Evento del formulario
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Llamar al servicio de autenticación
      const response = await authService.login({ email, password });
      
      console.log('Login exitoso:', response);
      
      // Guardar token si viene en la respuesta
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }

      // Redirigir según el rol del usuario (si está disponible en la respuesta)
      if (response.role === 'PSICOLOGO') {
        handleNavigation('psychologist-dashboard');
      } else {
        handleNavigation('client-dashboard');
      }

    } catch (error) {
      console.error('Error en login:', error);
      setError(error.message || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #fff 0%, #fff3e0 100%)',
      position: 'relative'
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      {/* ========================================
           HEADER / BARRA DE NAVEGACIÓN
           ======================================== */}
      <nav style={{ 
        background: '#0057FF', 
        color: '#fff', 
        padding: '1rem 0', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: 1300, 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 20px'
        }}>
          {/* Logo de la empresa */}
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

          {/* Navegación de escritorio */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            {/* Enlaces de navegación - Solo visible en desktop */}
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
              {/* Enlace a página de psicólogos */}
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
              
              {/* Enlace a página de empresas */}
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
              
              {/* Enlace a página "Acerca de" */}
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
              
              {/* Enlace a página de precios */}
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

            {/* Botones de autenticación - Solo visible en desktop */}
            <div style={{ 
              display: 'none',
              gap: '1rem',
              '@media (min-width: 768px)': {
                display: 'flex'
              }
            }}>
              {/* Botón de inicio de sesión */}
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
              
              {/* Botón de registro */}
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

          {/* ========================================
               BOTÓN DE MENÚ HAMBURGUESA MÓVIL
               ======================================== */}
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
            {/* Línea superior del menú hamburguesa */}
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              margin: '2px 0',
              transition: '0.3s',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }} />
            {/* Línea central del menú hamburguesa */}
            <div style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#fff',
              margin: '2px 0',
              transition: '0.3s',
              opacity: mobileMenuOpen ? '0' : '1'
            }} />
            {/* Línea inferior del menú hamburguesa */}
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

        {/* ========================================
             MENÚ MÓVIL DESPLEGABLE
             ======================================== */}
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
            {/* Enlaces de navegación móvil */}
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Enlace a página de psicólogos */}
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
              
              {/* Enlace a página de empresas */}
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
              
              {/* Enlace a página "Acerca de" */}
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
              
              {/* Enlace a página de precios */}
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
            
            {/* Botones de autenticación móvil */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.2)'
            }}>
              {/* Botón de inicio de sesión móvil */}
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
              
              {/* Botón de registro móvil */}
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

      {/* ========================================
           CONTENIDO PRINCIPAL - FORMULARIO DE LOGIN
           ======================================== */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem'
      }}>
        {/* ========================================
             TARJETA PRINCIPAL DEL FORMULARIO
             ======================================== */}
        <div style={{
          background: '#fff',
          borderRadius: 20,
          padding: '3rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: 450,
          position: 'relative'
        }}>
          {/* ========================================
               LOGO SUPERIOR
               ======================================== */}
          <div style={{
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem auto',
            boxShadow: '0 2px 8px #e0e7ef',
            overflow: 'hidden'
          }}>
            <img src={logoEmpathica} alt="Logo Empathica" style={{ width: 56, height: 56, objectFit: 'contain', display: 'block' }} />
          </div>

          {/* ========================================
               TÍTULO PRINCIPAL
               ======================================== */}
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

          {/* ========================================
               SUBTÍTULO DESCRIPTIVO
               ======================================== */}
          <p style={{
            color: '#666',
            fontSize: 16,
            margin: '0 0 2.5rem 0',
            textAlign: 'center'
          }}>
            Ingresa a tu cuenta de Empathica
          </p>

          {/* ========================================
               FORMULARIO DE LOGIN
               ======================================== */}
          <form onSubmit={handleLogin}>
            {/* ========================================
                 MENSAJE DE ERROR
                 ======================================== */}
            {error && (
              <div style={{
                background: '#fee',
                color: '#c33',
                padding: '1rem',
                borderRadius: 8,
                marginBottom: '1.5rem',
                fontSize: 14,
                border: '1px solid #fcc'
              }}>
                {error}
              </div>
            )}
            {/* ========================================
                 CAMPO DE CORREO ELECTRÓNICO
                 ======================================== */}
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

            {/* ========================================
                 CAMPO DE CONTRASEÑA
                 ======================================== */}
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
                {/* Botón para mostrar/ocultar contraseña */}
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
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* ========================================
                 ENLACE DE CONTRASEÑA OLVIDADA Y BOTÓN DE PRUEBA
                 ======================================== */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={createTestUser}
                  style={{
                    color: '#666',
                    fontSize: 12,
                    fontWeight: 500,
                    background: 'none',
                    border: '1px solid #ddd',
                    padding: '0.5rem 1rem',
                    borderRadius: 8,
                    cursor: 'pointer'
                  }}
                >
                  Crear usuario de prueba
                </button>
                <button
                  type="button"
                  onClick={testServerConnection}
                  style={{
                    color: '#666',
                    fontSize: 12,
                    fontWeight: 500,
                    background: 'none',
                    border: '1px solid #ddd',
                    padding: '0.5rem 1rem',
                    borderRadius: 8,
                    cursor: 'pointer'
                  }}
                >
                  Probar servidor
                </button>
              </div>
              
              <button
                type="button"
                style={{
                  color: '#0057FF',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
                onClick={() => {/* TODO: Add forgot password handler */}}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* ========================================
                 BOTÓN DE INICIAR SESIÓN
                 ======================================== */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: isLoading ? '#ccc' : '#0057FF',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '1rem',
                fontSize: 16,
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={e => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 87, 255, 0.3)';
                }
              }}
              onMouseLeave={e => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {isLoading && (
                <div style={{
                  width: 20,
                  height: 20,
                  border: '2px solid #fff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              )}
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>

            {/* ========================================
                 ENLACE DE REGISTRO
                 ======================================== */}
            <div style={{
              textAlign: 'center',
              fontSize: 14,
              color: '#666'
            }}>
              ¿No tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => handleNavigation('register')}
                style={{
                  color: '#0057FF',
                  textDecoration: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                  padding: 0
                }}
              >
                Regístrate aquí
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 