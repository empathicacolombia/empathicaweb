import React, { useState, useEffect } from 'react';
import {
  User,
  FileText,
  Heart,
  Target,
  Award,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  Menu
} from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import ClientSidebar from './ClientSidebar';
import MobileDashboardNav from './MobileDashboardNav';
import { userService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ClientProfilePage = ({ navigationProps, testAnswers }) => {
  const { user } = useAuth();
  

  
  /**
   * Estado para información adicional del paciente (si es necesaria)
   */
  const [additionalUserInfo, setAdditionalUserInfo] = useState(null);
  const [isLoadingAdditional, setIsLoadingAdditional] = useState(false);
  const [userError, setUserError] = useState('');

  /**
   * Estado para los datos del perfil (combinación de backend + datos locales)
   */
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: 28,
    gender: ''
  });

  /**
   * Obtiene información adicional del paciente si es necesaria
   */
  const fetchAdditionalUserInfo = async () => {
    try {
      setIsLoadingAdditional(true);
      setUserError('');

      const patientData = await userService.getPatientById(user.id);
      console.log('Información adicional del paciente obtenida:', patientData);
      setAdditionalUserInfo(patientData);

    } catch (error) {
      console.error('Error obteniendo información adicional del paciente:', error);
      setUserError(error.message || 'Error al cargar información adicional');
    } finally {
      setIsLoadingAdditional(false);
    }
  };

  /**
   * Calcula la edad basada en la fecha de nacimiento
   * @param {string} dateOfBirth - Fecha de nacimiento en formato YYYY-MM-DD
   * @returns {number} - Edad calculada
   */
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 28; // Valor por defecto
    
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  /**
   * Inicializa los datos del perfil con la información del usuario autenticado
   */
  useEffect(() => {
    if (user) {
      const newProfileData = {
        firstName: user.name || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phoneNumber || 'No disponible',
        age: calculateAge(user.dateOfBirth),
        gender: user.gender || 'No especificado'
      };
      
      setProfileData(newProfileData);
      
      // Si necesitas información adicional específica del paciente
      fetchAdditionalUserInfo();
    }
  }, [user]);

  const [testResults] = useState({
    completed: testAnswers ? true : false,
    date: testAnswers ? '15 de Julio, 2024' : null,
    profile: testAnswers ? {
      nivelAngustia: 'Moderado',
      disposicionCambio: 'Alta',
      orientacionTemporal: 'Presente',
      estiloTrabajoPaciente: 'Colaborativo',
      tags: ['Ansiedad', 'Estrés laboral', 'Búsqueda de propósito']
    } : null,
    therapeuticApproaches: testAnswers ? [
      'Terapia Cognitivo-Conductual (TCC)',
      'Mindfulness',
      'Terapia de Aceptación y Compromiso (ACT)'
    ] : []
  });

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  const toggleSidebar = () => {
    if (navigationProps && navigationProps.toggleSidebar) {
      navigationProps.toggleSidebar();
    }
  };

  // Usar el estado global del sidebar
  const sidebarOpen = navigationProps?.sidebarOpen ?? true;

  return (
    <div className="dashboard-container" style={{
      display: 'flex',
      height: '100vh',
      background: '#f8f9fa',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <ClientSidebar navigationProps={navigationProps} activePage="client-profile" sidebarOpen={sidebarOpen} />

      {/* Contenido principal */}
      <div className="main-content" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header superior */}
        <div style={{
          background: '#fff',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e0e7ef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px #0057ff0a'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={toggleSidebar}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 22,
                color: '#0057FF',
                padding: 4
              }}
            >
              <Menu size={28} />
            </button>
            <span style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#0057FF',
              letterSpacing: 0.2
            }}>
              Mi Perfil
            </span>
          </div>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: '#f0f4ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px #0057ff11'
          }}>
            <User color="#0057FF" size={24} />
          </div>
        </div>

        {/* Contenido del perfil */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          {/* Navegación móvil */}
          <MobileDashboardNav 
            items={[
              { icon: <User size={20} />, label: 'Inicio', section: 'Dashboard' },
              { icon: <Calendar size={20} />, label: 'Citas', section: 'Appointments' },
              { icon: <Heart size={20} />, label: 'Para Ti', section: 'ForYou' },
              { icon: <Users size={20} />, label: 'Mi Especialista', section: 'MySpecialist' },
              { icon: <FileText size={20} />, label: 'Soporte', section: 'Support' }
            ]}
            activeSection="Profile"
            onSectionChange={(section) => {
              if (section === 'Dashboard') handleNavigation('client-dashboard');
              else if (section === 'Appointments') handleNavigation('appointments');
              else if (section === 'ForYou') handleNavigation('for-you');
              else if (section === 'MySpecialist') handleNavigation('my-specialist');
              else if (section === 'Support') handleNavigation('support');
            }}
          />

          {/* Header del perfil */}
          <div style={{
            marginBottom: '2rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#0057FF',
                margin: '0 0 0.5rem 0'
              }}>
                Mi Perfil
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#666',
                margin: 0
              }}>
                Gestiona tu información personal y revisa tus resultados
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr'
            }
          }}>
            {/* Información Personal */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 2px 8px #0057ff11'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  background: '#f0f4ff',
                  borderRadius: '8px',
                  padding: '8px'
                }}>
                  <User size={20} color="#0057FF" />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#333',
                  margin: 0
                }}>
                  Información Personal
                </h2>
              </div>

              {/* Indicador de error si hay problemas al cargar información */}
              {userError && (
                <div style={{
                  background: '#fee',
                  border: '1px solid #fcc',
                  borderRadius: 8,
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  color: '#c33',
                  fontSize: 14
                }}>
                  ⚠️ {userError}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '4px',
                    display: 'block'
                  }}>
                    Nombre completo
                  </label>
                  <p style={{
                    fontSize: '16px',
                    color: '#333',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {`${profileData.firstName} ${profileData.lastName}`}
                  </p>
                </div>

                <div>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '4px',
                    display: 'block'
                  }}>
                    Correo electrónico
                  </label>
                  <p style={{
                    fontSize: '16px',
                    color: '#333',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {profileData.email}
                  </p>
                </div>

                <div>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '4px',
                    display: 'block'
                  }}>
                    Teléfono
                  </label>
                  <p style={{
                    fontSize: '16px',
                    color: '#333',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {profileData.phone}
                  </p>
                </div>

                <div>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '4px',
                    display: 'block'
                  }}>
                    Edad
                  </label>
                  <p style={{
                    fontSize: '16px',
                    color: '#333',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {profileData.age} años
                  </p>
                </div>

                <div>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#666',
                    marginBottom: '4px',
                    display: 'block'
                  }}>
                    Género
                  </label>
                  <p style={{
                    fontSize: '16px',
                    color: '#333',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {profileData.gender === 'MALE' ? 'Masculino' : 
                     profileData.gender === 'FEMALE' ? 'Femenino' : 
                     profileData.gender}
                  </p>
                </div>


              </div>


            </div>

            {/* Resultados del Test */}
            <div style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 2px 8px #0057ff11'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  background: '#f0f4ff',
                  borderRadius: '8px',
                  padding: '8px'
                }}>
                  <FileText size={20} color="#0057FF" />
                </div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#333',
                  margin: 0
                }}>
                  Resultados del Test
                </h2>
              </div>

              {testResults.completed ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Estado del test */}
                  <div style={{
                    background: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    borderRadius: '8px',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <Award size={20} color="#0057FF" />
                    <div>
                      <p style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#0057FF',
                        margin: '0 0 4px 0'
                      }}>
                        Test completado
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#666',
                        margin: 0
                      }}>
                        Realizado el {testResults.date}
                      </p>
                    </div>
                  </div>

                  {/* Perfil generado */}
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333',
                      margin: '0 0 1rem 0'
                    }}>
                      Tu Perfil Emocional
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #f0f0f0'
                      }}>
                        <span style={{ fontSize: '14px', color: '#666' }}>Nivel de angustia:</span>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                          {testResults.profile.nivelAngustia}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #f0f0f0'
                      }}>
                        <span style={{ fontSize: '14px', color: '#666' }}>Disposición al cambio:</span>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                          {testResults.profile.disposicionCambio}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #f0f0f0'
                      }}>
                        <span style={{ fontSize: '14px', color: '#666' }}>Orientación temporal:</span>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                          {testResults.profile.orientacionTemporal}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0'
                      }}>
                        <span style={{ fontSize: '14px', color: '#666' }}>Estilo de trabajo:</span>
                        <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                          {testResults.profile.estiloTrabajoPaciente}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333',
                      margin: '0 0 1rem 0'
                    }}>
                      Áreas de enfoque
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {testResults.profile.tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#f0f4ff',
                            color: '#0057FF',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enfoques terapéuticos recomendados */}
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#333',
                      margin: '0 0 1rem 0'
                    }}>
                      Enfoques recomendados
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {testResults.therapeuticApproaches.map((approach, index) => (
                        <div
                          key={index}
                          style={{
                            background: '#f8f9fa',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: '#333',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <Heart size={14} color="#0057FF" />
                          {approach}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#666'
                }}>
                  <Target size={48} color="#ddd" style={{ marginBottom: '1rem' }} />
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333',
                    margin: '0 0 0.5rem 0'
                  }}>
                    No has completado el test
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    margin: '0 0 1.5rem 0'
                  }}>
                    Completa el test de match perfecto para obtener tu perfil personalizado
                  </p>
                  <button
                    onClick={() => handleNavigation('questionnaire-match')}
                    style={{
                      background: '#0057FF',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      margin: '0 auto'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#0046cc'}
                    onMouseLeave={e => e.currentTarget.style.background = '#0057FF'}
                  >
                    <TrendingUp size={16} />
                    Realizar Test
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Estadísticas adicionales */}

        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage; 