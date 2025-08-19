import React from 'react';
import { CheckCircle, Mail, ArrowRight, User, Shield } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Componente para mostrar la confirmación de registro exitoso
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userType - Tipo de usuario registrado ('patient' o 'psychologist')
 * @param {string} props.email - Email del usuario registrado
 * @returns {JSX.Element} - Pantalla de confirmación de registro
 */
const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener datos del estado de navegación
  const { userType, email } = location.state || {};
  
  console.log('RegistrationSuccess - location.state:', location.state);
  console.log('RegistrationSuccess - userType:', userType);
  console.log('RegistrationSuccess - email:', email);
  
  // Si no hay datos, redirigir al registro
  React.useEffect(() => {
    console.log('RegistrationSuccess useEffect - userType:', userType, 'email:', email);
    if (!userType || !email) {
      console.log('No hay datos, redirigiendo a /register');
      navigate('/register');
    }
  }, [userType, email, navigate]);

  const getUserTypeInfo = () => {
    switch (userType) {
      case 'patient':
        return {
          title: 'Paciente',
          icon: <User size={48} color="#0057FF" />,
          description: 'Tu cuenta de paciente ha sido creada exitosamente'
        };
      case 'psychologist':
        return {
          title: 'Psicólogo',
          icon: <Shield size={48} color="#0057FF" />,
          description: 'Tu cuenta de psicólogo ha sido creada exitosamente'
        };
      default:
        return {
          title: 'Usuario',
          icon: <User size={48} color="#0057FF" />,
          description: 'Tu cuenta ha sido creada exitosamente'
        };
    }
  };

  const userInfo = getUserTypeInfo();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        padding: '3rem',
        maxWidth: 600,
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Fondo decorativo */}
        <div style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 100,
          height: 100,
          background: 'linear-gradient(45deg, #0057FF15, #0057FF05)',
          borderRadius: '50%',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 80,
          height: 80,
          background: 'linear-gradient(45deg, #22C55E15, #22C55E05)',
          borderRadius: '50%',
          zIndex: 0
        }} />

        {/* Contenido principal */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Icono de éxito */}
          <div style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #22C55E, #16a34a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem auto',
            boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)'
          }}>
            <CheckCircle size={60} color="#fff" />
          </div>

          {/* Título principal */}
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1f2937',
            margin: '0 0 1rem 0',
            lineHeight: 1.2
          }}>
            ¡Registro Exitoso!
          </h1>

          {/* Información del tipo de usuario */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            padding: '1rem',
            background: '#f8fafc',
            borderRadius: 12,
            border: '1px solid #e2e8f0'
          }}>
            {userInfo.icon}
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#374151',
                margin: '0 0 0.25rem 0'
              }}>
                {userInfo.title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0
              }}>
                {userInfo.description}
              </p>
            </div>
          </div>

          {/* Mensaje principal */}
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: 12,
            padding: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <Mail size={24} color="#0057FF" />
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#0057FF',
                margin: 0
              }}>
                Revisa tu correo electrónico
              </h2>
            </div>
            
            <p style={{
              fontSize: '1.125rem',
              color: '#374151',
              lineHeight: 1.6,
              margin: '0 0 1rem 0'
            }}>
              Hemos enviado un correo electrónico a:
            </p>
            
            <div style={{
              background: '#fff',
              border: '2px solid #0057FF',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <strong style={{
                fontSize: '1.125rem',
                color: '#0057FF',
                fontFamily: 'monospace'
              }}>
                {email}
              </strong>
            </div>
            
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              lineHeight: 1.5,
              margin: 0
            }}>
              En el correo encontrarás tus credenciales de acceso para iniciar sesión en Empathica.
            </p>
          </div>

          {/* Pasos siguientes */}
          <div style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: 12,
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#92400e',
              margin: '0 0 1rem 0'
            }}>
              Próximos pasos:
            </h3>
            <ol style={{
              textAlign: 'left',
              color: '#92400e',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              margin: 0,
              paddingLeft: '1.5rem'
            }}>
              <li>Revisa tu bandeja de entrada (y carpeta de spam)</li>
              <li>Busca el correo de "Empathica - Credenciales de Acceso"</li>
              <li>Usa las credenciales proporcionadas para iniciar sesión</li>
              <li>Completa tu perfil y configuración inicial</li>
            </ol>
          </div>

          {/* Botón para ir al login */}
          <button
            onClick={() => navigate('/login')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #0057FF, #0046cc)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '1rem 2rem',
              fontSize: '1.125rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 87, 255, 0.3)',
              width: '100%',
              maxWidth: 300,
              margin: '0 auto'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 87, 255, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 87, 255, 0.3)';
            }}
          >
            Ir al Inicio de Sesión
            <ArrowRight size={20} />
          </button>

          {/* Información adicional */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#f9fafb',
            borderRadius: 8,
            border: '1px solid #e5e7eb'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              margin: '0 0 0.5rem 0'
            }}>
              ¿No recibiste el correo?
            </p>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              margin: 0
            }}>
              Verifica que el correo esté correcto o revisa tu carpeta de spam. 
              Si el problema persiste, contacta a soporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
