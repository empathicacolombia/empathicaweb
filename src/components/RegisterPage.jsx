import React, { useState } from 'react';
import logoEmpathica from '../assets/Logoempathica.png';
import { authService, userService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

/**
 * Componente de página de Registro
 * Permite a los usuarios registrarse como pacientes o psicólogos en la plataforma Empathica
 * Incluye formulario dinámico que cambia según el tipo de usuario seleccionado
 * 
 * @param {Object} navigationProps - Propiedades para navegación entre páginas
 * @param {Function} navigationProps.onNavigate - Función para cambiar de página
 * @param {Function} navigationProps.onUserRegistration - Función para manejar registro exitoso
 */
const RegisterPage = ({ navigationProps }) => {
  const { login } = useAuth();
  
  /**
   * Estado para controlar el tipo de usuario seleccionado
   * 'patient' = Paciente, 'psychologist' = Psicólogo
   */
  const [userType, setUserType] = useState('patient'); // 'patient' o 'psychologist'
  
  /**
   * Estado para controlar el menú móvil
   */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  /**
   * Estado para almacenar todos los datos del formulario
   * Incluye campos comunes y específicos según el tipo de usuario
   */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    dateOfBirth: ''
  });

  /**
   * Maneja la navegación entre diferentes páginas de la aplicación
   * @param {string} page - Nombre de la página a la que navegar
   * @param {Object} additionalData - Datos adicionales para pasar a la página
   */
  const handleNavigation = (page, additionalData = null) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page, additionalData);
    }
    setMobileMenuOpen(false);
  };

  /**
   * Actualiza el estado del formulario cuando el usuario cambia un campo
   * @param {string} field - Nombre del campo a actualizar
   * @param {string} value - Nuevo valor del campo
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Estado para manejar el loading durante el registro
   */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Maneja el envío del formulario de registro
   * Conecta con el backend para registrar al usuario
   * @param {Event} e - Evento del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validaciones básicas
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        throw new Error('Por favor completa todos los campos obligatorios');
      }



      if (formData.password !== formData.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (formData.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Si es paciente, usar directamente el endpoint de pacientes
      if (userType === 'patient') {
        try {
          // Crear datos del paciente según la estructura del endpoint
          const patientData = {
            name: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phone || '',
            dateOfBirth: formData.dateOfBirth || null,
            gender: formData.gender || ''
          };

          // Debug: Ver qué datos se envían al backend
          console.log('Datos enviados al backend:', patientData);

          // Llamada directa al endpoint de pacientes
          const result = await userService.createPatient(patientData);
          console.log('Registro de paciente exitoso:', result);
          console.log('Estructura completa del resultado:', JSON.stringify(result, null, 2));
          
          // Los tags se mantendrán en localStorage para ser procesados durante el login
          console.log('Registro exitoso. Los tags se procesarán durante el próximo login.');
        } catch (error) {
          console.error('Error en el registro de paciente:', error);
          
          // Manejar errores específicos del backend
          if (error.response && error.response.status === 409) {
            throw new Error('El email ya está registrado. Por favor, usa un email diferente o inicia sesión si ya tienes una cuenta.');
          } else if (error.response && error.response.status === 400) {
            throw new Error('Datos inválidos. Por favor, verifica que todos los campos estén correctos.');
          } else if (error.response && error.response.status === 500) {
            throw new Error('Error del servidor. Por favor, intenta nuevamente más tarde.');
          } else if (error.message) {
            throw new Error(`Error de conexión: ${error.message}`);
          } else {
            throw new Error('Error inesperado. Por favor, intenta nuevamente.');
          }
        }
      }

      // Si es psicólogo, usar directamente el endpoint de psicólogos
      if (userType === 'psychologist') {
        try {
          // Crear datos del psicólogo según la estructura del endpoint
          const psychologistData = {
            name: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phone || '',
            dateOfBirth: formData.dateOfBirth || null,
            gender: formData.gender || ''
          };

          // Debug: Ver qué datos se envían al backend
          console.log('Datos enviados al backend:', psychologistData);

          // Llamada directa al endpoint de psicólogos
          const result = await userService.createPsychologist(psychologistData);
          console.log('Registro de psicólogo exitoso:', result);
        } catch (error) {
          console.error('Error en el registro de psicólogo:', error);
          
          // Manejar errores específicos del backend
          if (error.response && error.response.status === 409) {
            throw new Error('El email ya está registrado. Por favor, usa un email diferente o inicia sesión si ya tienes una cuenta.');
          } else if (error.response && error.response.status === 400) {
            throw new Error('Datos inválidos. Por favor, verifica que todos los campos estén correctos.');
          } else if (error.response && error.response.status === 500) {
            throw new Error('Error del servidor. Por favor, intenta nuevamente más tarde.');
          } else if (error.message) {
            throw new Error(`Error de conexión: ${error.message}`);
          } else {
            throw new Error('Error inesperado. Por favor, intenta nuevamente.');
          }
        }
      }

      // Después del registro exitoso, redirigir a la pantalla de confirmación
      console.log('=== INICIO DE REDIRECCIÓN ===');
      console.log('Registro exitoso, redirigiendo a pantalla de confirmación...');
    
    // Marcar al usuario como registrado
    if (navigationProps && navigationProps.onUserRegistration) {
        console.log('Llamando a onUserRegistration...');
      navigationProps.onUserRegistration();
        console.log('onUserRegistration ejecutado');
      } else {
        console.log('onUserRegistration no disponible');
      }
      
      // Redirigir a la pantalla de confirmación con los datos del usuario
      const successData = {
        userType: userType,
        email: formData.email
      };
      
      console.log('Redirigiendo a registration-success con datos:', successData);
      console.log('navigationProps disponibles:', navigationProps);
      
      // Verificar que la navegación funcione
      console.log('=== NAVEGACIÓN ===');
      if (navigationProps && navigationProps.onNavigate) {
        console.log('Llamando a onNavigate con:', 'registration-success', successData);
        try {
          navigationProps.onNavigate('registration-success', successData);
          console.log('onNavigate ejecutado exitosamente');
          return; // Evitar que el formulario se reinicie
        } catch (navError) {
          console.error('Error en onNavigate:', navError);
          // Fallback: usar window.location
          console.log('Usando fallback con window.location...');
          window.location.href = '/registration-success';
          return; // Evitar que el formulario se reinicie
        }
    } else {
        console.error('navigationProps.onNavigate no está disponible');
        // Fallback: usar window.location
        console.log('Usando fallback con window.location...');
        window.location.href = '/registration-success';
        return; // Evitar que el formulario se reinicie
      }



    } catch (error) {
      console.error('Error en el registro:', error);
      
      // Si el error ya tiene un mensaje personalizado, usarlo
      if (error.message && !error.message.includes('Request failed')) {
        setError(error.message);
      } else {
        // Mensaje genérico para errores no manejados
        setError('Error al registrar usuario. Por favor, intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff 0%, #fff3e0 100%)',
      position: 'relative'
    }}>
      {/* CSS para animación de loading */}
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
        <div className="container navbar-container" style={{ 
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
           CONTENIDO PRINCIPAL - FORMULARIO DE REGISTRO
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
          maxWidth: 600,
          position: 'relative'
        }}>
          {/* ========================================
               LOGO SUPERIOR
               ======================================== */}
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

          {/* ========================================
               TÍTULO PRINCIPAL
               ======================================== */}
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

          {/* ========================================
               SUBTÍTULO DESCRIPTIVO
               ======================================== */}
          <p style={{
            color: '#666',
            fontSize: 16,
            margin: '0 0 2rem 0',
            textAlign: 'center'
          }}>
            Escoge cómo quieres ser parte de nuestra comunidad
          </p>

          {/* ========================================
               SELECTOR DE TIPO DE USUARIO
               ======================================== */}
          <div style={{
            display: 'flex',
            background: '#f5f5f5',
            borderRadius: 12,
            padding: '0.25rem',
            marginBottom: '2rem'
          }}>
            {/* Botón para seleccionar registro como paciente */}
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
            
            {/* Botón para seleccionar registro como psicólogo */}
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

          {/* ========================================
               TÍTULO DINÁMICO DEL FORMULARIO
               ======================================== */}
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            margin: '0 0 0.5rem 0',
            color: '#0057FF'
          }}>
            Registro como {userType === 'patient' ? 'Paciente' : 'Psicólogo'}
          </h2>

          {/* ========================================
               SUBTÍTULO DINÁMICO DEL FORMULARIO
               ======================================== */}
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

          {/* ========================================
               FORMULARIO DE REGISTRO
               ======================================== */}
          <form onSubmit={handleSubmit}>
            {/* ========================================
                 PRIMERA FILA - NOMBRE Y APELLIDO
                 ======================================== */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              {/* Campo de nombre */}
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
              
              {/* Campo de apellido */}
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



            {/* ========================================
                 CAMPOS DE CONTRASEÑA - DOS COLUMNAS
                 ======================================== */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              {/* Campo de contraseña */}
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
              
              {/* Campo de confirmación de contraseña */}
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

            {/* ========================================
                 CAMPO DE TELÉFONO CON CÓDIGO DE PAÍS
                 ======================================== */}
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
                {/* Selector de código de país */}
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
                
                {/* Campo de número de teléfono */}
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

            {/* ========================================
                 CAMPO DE GÉNERO
                 ======================================== */}
            <div style={{ marginBottom: '1.5rem' }}>
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
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Femenino</option>
                <option value="OTHER">Otro</option>
              </select>
            </div>

            {/* ========================================
                 CAMPO DE FECHA DE NACIMIENTO
                 ======================================== */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                color: '#333',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}>
                Fecha de nacimiento
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
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

            {/* ========================================
                 MENSAJE DE ERROR
                 ======================================== */}
            {error && (
              <div style={{
                background: '#fee',
                border: '1px solid #fcc',
                borderRadius: 8,
                padding: '1rem',
                marginBottom: '1.5rem',
                color: '#c33',
                fontSize: 14
              }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  {error}
                </div>
                {error.includes('email ya está registrado') && (
                  <div style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    background: '#fff',
                    borderRadius: 4,
                    border: '1px solid #fcc'
                  }}>
                    <span style={{ fontSize: 12, color: '#666' }}>
                      💡 ¿Ya tienes una cuenta?{' '}
                      <button
                        type="button"
                        onClick={() => handleNavigation('login')}
                        style={{
                          color: '#0057FF',
                          textDecoration: 'underline',
                          fontWeight: 600,
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          fontSize: 12
                        }}
                      >
                        Inicia sesión aquí
                      </button>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ========================================
                 BOTÓN DE REGISTRO
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
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
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
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #fff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Registrando...
                </>
              ) : (
                `Registrarse como ${userType === 'patient' ? 'Paciente' : 'Psicólogo'}`
              )}
            </button>

            {/* ========================================
                 ENLACE DE LOGIN
                 ======================================== */}
            <div style={{
              textAlign: 'center',
              fontSize: 14,
              color: '#666'
            }}>
              ¿Ya tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => handleNavigation('login')}
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
                Inicia sesión aquí
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 