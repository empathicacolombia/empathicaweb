import React, { useState, useEffect } from 'react';
import { Home, CalendarDays, Heart, Users, LifeBuoy, User, LogOut, UserCheck, UserX } from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';
import ClientSidebar from './ClientSidebar';
import MobileDashboardNav from './MobileDashboardNav';
import { userService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const MySpecialistPage = ({ navigationProps }) => {
  const { user } = useAuth();
  const [patientData, setPatientData] = useState(null);
  const [recommendedPsychologist, setRecommendedPsychologist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [assigningPsychologist, setAssigningPsychologist] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Función para calcular la edad
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return null;
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Función para obtener los datos del paciente
  const fetchPatientData = async () => {
    if (!user?.id) {
      setError('No se pudo identificar al usuario');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await userService.getPatientById(user.id);
      setPatientData(data);
    } catch (error) {
      console.error('Error obteniendo datos del paciente:', error);
      setError('Error al cargar los datos del paciente');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener psicólogo recomendado
  const fetchRecommendedPsychologist = async () => {
    try {
      setLoadingRecommendation(true);
      const data = await userService.getPsychologistById(14); // ID específico del psicólogo recomendado
      setRecommendedPsychologist(data);
    } catch (error) {
      console.error('Error obteniendo psicólogo recomendado:', error);
    } finally {
      setLoadingRecommendation(false);
    }
  };

  // Función para asignar psicólogo al paciente
  const handleAssignPsychologist = async () => {
    if (!user?.id || !recommendedPsychologist) {
      setError('No se pudo procesar la asignación');
      return;
    }

    try {
      setAssigningPsychologist(true);
      setError(null);
      
      // Enviar la petición para asignar el psicólogo
      await userService.assignPsychologistToPatient({
        userId: 14 // ID del psicólogo recomendado
      });
      
      // Recargar los datos del paciente para mostrar la información actualizada
      await fetchPatientData();
      
      // Mostrar mensaje de éxito
      setSuccessMessage('¡Psicólogo asignado exitosamente!');
      
      // Limpiar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      
    } catch (error) {
      console.error('Error asignando psicólogo:', error);
      setError('Error al asignar el psicólogo. Inténtalo de nuevo.');
    } finally {
      setAssigningPsychologist(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchPatientData();
  }, [user?.id]);

  // Cargar psicólogo recomendado si no hay uno asignado
  useEffect(() => {
    if (patientData && !patientData.psychologist) {
      fetchRecommendedPsychologist();
    }
  }, [patientData]);

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
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#f8f9fa',
      overflow: 'hidden'
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
      {/* Sidebar */}
      <ClientSidebar navigationProps={navigationProps} activePage="my-specialist" sidebarOpen={sidebarOpen} />

      {/* Contenido principal */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header superior */}
        <div style={{
          background: '#fff',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
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
                fontSize: 20,
                color: '#666'
              }}
            >
              ☰
            </button>
            <span style={{
              fontSize: 18,
              fontWeight: 600,
              color: '#333'
            }}>
              Tu espacio de bienestar
            </span>
          </div>
          
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#0057FF'
            }} />
          </div>
        </div>

        {/* Contenido de Mi Especialista */}
        <div style={{
          flex: 1,
          padding: '2rem',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          {/* Navegación móvil */}
          <MobileDashboardNav 
            items={[
              { icon: <Home size={20} />, label: 'Inicio', section: 'Dashboard' },
              { icon: <CalendarDays size={20} />, label: 'Citas', section: 'Appointments' },
              { icon: <Heart size={20} />, label: 'Para Ti', section: 'ForYou' },
              { icon: <User size={20} />, label: 'Mi Especialista', section: 'MySpecialist' },
              { icon: <LifeBuoy size={20} />, label: 'Soporte', section: 'Support' }
            ]}
            activeSection="MySpecialist"
            onSectionChange={(section) => {
              if (section === 'Dashboard') handleNavigation('client-dashboard');
              else if (section === 'Appointments') handleNavigation('appointments');
              else if (section === 'ForYou') handleNavigation('for-you');
              else if (section === 'Support') handleNavigation('support');
            }}
          />
          {/* Header de la página */}
          <div style={{
            marginBottom: '2rem'
          }}>
            <h1 style={{
              fontSize: 32,
              fontWeight: 800,
              margin: '0 0 0.5rem 0',
              color: '#333'
            }}>
              Mi Especialista
            </h1>
            <p style={{
              fontSize: 16,
              color: '#666',
              margin: 0
            }}>
              Tu acompañante en el proceso de bienestar emocional
            </p>
          </div>

          {/* Estado de carga */}
          {loading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                fontSize: 18,
                color: '#666'
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  border: '3px solid #f3f3f3',
                  borderTop: '3px solid #0057FF',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Cargando información del especialista...
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 12,
              padding: '1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <UserX size={24} color="#dc2626" />
              <div>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#dc2626',
                  margin: '0 0 0.5rem 0'
                }}>
                  Error al cargar datos
                </h3>
                <p style={{
                  fontSize: 14,
                  color: '#991b1b',
                  margin: 0
                }}>
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Mensaje de éxito */}
          {successMessage && (
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 12,
              padding: '1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <UserCheck size={24} color="#16a34a" />
              <div>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#16a34a',
                  margin: '0 0 0.5rem 0'
                }}>
                  ¡Éxito!
                </h3>
                <p style={{
                  fontSize: 14,
                  color: '#166534',
                  margin: 0
                }}>
                  {successMessage}
                </p>
              </div>
            </div>
          )}

          {/* Psicólogo asignado o mensaje de no asignado */}
          {!loading && !error && (
            <>
              {patientData?.psychologist ? (
                /* Tarjeta del especialista asignado */
                <div style={{
                  background: '#0057FF',
                  borderRadius: 16,
                  padding: '2rem',
                  marginBottom: '2rem',
                  color: '#fff',
                  position: 'relative'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.5rem'
                  }}>
                    {/* Foto de perfil */}
                    <div style={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: '#fff',
                      border: '4px solid rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{
                        fontSize: 48,
                        color: '#0057FF'
                      }}>👩‍⚕️</span>
                    </div>

                    {/* Información del especialista */}
                    <div style={{ flex: 1 }}>
                      <h2 style={{
                        fontSize: 28,
                        fontWeight: 700,
                        margin: '0 0 0.5rem 0',
                        color: '#fff'
                      }}>
                        {patientData.psychologist.name} {patientData.psychologist.lastName}
                      </h2>
                      
                      <p style={{
                        fontSize: 18,
                        color: 'rgba(255, 255, 255, 0.9)',
                        margin: '0 0 1rem 0',
                        fontWeight: 500
                      }}>
                        Psicólogo {patientData.psychologist.specialty ? `- ${patientData.psychologist.specialty}` : 'Clínico'}
                      </p>

                      {/* Información adicional */}
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        marginBottom: '1rem'
                      }}>
                        {patientData.psychologist.oneliner && (
                          <p style={{
                            fontSize: 16,
                            lineHeight: 1.5,
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontStyle: 'italic',
                            margin: 0
                          }}>
                            "{patientData.psychologist.oneliner}"
                          </p>
                        )}
                        
                        {patientData.psychologist.cedula && (
                          <p style={{
                            fontSize: 14,
                            color: 'rgba(255, 255, 255, 0.8)',
                            margin: 0
                          }}>
                            Cédula: {patientData.psychologist.cedula}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                              ) : (
                /* Mensaje de no asignado */
                <>
                  <div style={{
                    background: '#fef3c7',
                    border: '1px solid #f59e0b',
                    borderRadius: 16,
                    padding: '2rem',
                    marginBottom: '2rem',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <UserX size={48} color="#f59e0b" />
                      <h2 style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: '#92400e',
                        margin: 0
                      }}>
                        Aún no se ha asignado psicólogo
                      </h2>
                    </div>
                    
                    <p style={{
                      fontSize: 16,
                      color: '#92400e',
                      lineHeight: 1.6,
                      margin: '0 0 1.5rem 0'
                    }}>
                      Para encontrar el psicólogo ideal que se adapte a tus necesidades, 
                      te invitamos a completar nuestro test de matching.
                    </p>
                    
                    <div style={{
                      background: '#fff',
                      borderRadius: 8,
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      display: 'inline-block'
                    }}>
                      <p style={{
                        fontSize: 14,
                        color: '#92400e',
                        margin: '0 0 1rem 0',
                        fontWeight: 500
                      }}>
                        💡 El test te ayudará a encontrar un especialista que se adapte a tu personalidad y necesidades
                      </p>
                    </div>
                    
                    <button
                      onClick={() => handleNavigation('test-matching')}
                      style={{
                        background: '#f59e0b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 12,
                        padding: '1rem 2rem',
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#d97706'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#f59e0b'}
                    >
                      Hacer Test de Matching
                    </button>
                  </div>

                  {/* Psicólogo recomendado */}
                  {loadingRecommendation ? (
                  <div style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: '2rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      fontSize: 18,
                      color: '#666'
                    }}>
                      <div style={{
                        width: 24,
                        height: 24,
                        border: '3px solid #f3f3f3',
                        borderTop: '3px solid #0057FF',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Cargando recomendación...
                    </div>
                  </div>
                ) : recommendedPsychologist ? (
                  <div style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: '2rem',
                    marginBottom: '2rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '2px solid #f0f4ff'
                  }}>
                    {/* Encabezado de recomendación */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: '#0057FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>⭐</span>
                      </div>
                      <h3 style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#0057FF',
                        margin: 0
                      }}>
                        Psicólogo Recomendado
                      </h3>
                    </div>

                    {/* Información del psicólogo recomendado */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1.5rem',
                      marginBottom: '1.5rem'
                    }}>
                      {/* Avatar del psicólogo */}
                      <div style={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: '#f0f4ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 36,
                        flexShrink: 0
                      }}>
                        <User color="#0057FF" size={48} />
                      </div>
                      
                      {/* Datos del psicólogo */}
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: 24,
                          fontWeight: 700,
                          color: '#333',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {recommendedPsychologist.name} {recommendedPsychologist.lastName}
                        </h4>
                        <p style={{
                          fontSize: 18,
                          color: '#666',
                          margin: '0 0 0.75rem 0',
                          fontWeight: 500
                        }}>
                          {recommendedPsychologist.specialty || 'Psicólogo Clínico'}
                        </p>
                        
                        {/* Información detallada */}
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}>
                          {recommendedPsychologist.attendAges && recommendedPsychologist.attendAges.length > 0 && (
                            <p style={{
                              fontSize: 14,
                              color: '#666',
                              margin: 0
                            }}>
                              <strong>Edades que atiende:</strong> {recommendedPsychologist.attendAges.join(', ')}
                            </p>
                          )}
                          
                          {recommendedPsychologist.therapeuticStyle && recommendedPsychologist.therapeuticStyle.length > 0 && (
                            <p style={{
                              fontSize: 14,
                              color: '#666',
                              margin: 0
                            }}>
                              <strong>Estilos terapéuticos:</strong> {recommendedPsychologist.therapeuticStyle.join(', ')}
                            </p>
                          )}
                          
                          {recommendedPsychologist.additionalModalities && recommendedPsychologist.additionalModalities.length > 0 && (
                            <p style={{
                              fontSize: 14,
                              color: '#666',
                              margin: 0
                            }}>
                              <strong>Modalidades adicionales:</strong> {recommendedPsychologist.additionalModalities.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Botón de seleccionar */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <button
                        onClick={handleAssignPsychologist}
                        disabled={assigningPsychologist}
                        style={{
                          background: assigningPsychologist ? '#ccc' : '#0057FF',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 12,
                          padding: '1rem 2rem',
                          fontSize: 16,
                          fontWeight: 600,
                          cursor: assigningPsychologist ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => {
                          if (!assigningPsychologist) {
                            e.currentTarget.style.background = '#0043cc';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!assigningPsychologist) {
                            e.currentTarget.style.background = '#0057FF';
                          }
                        }}
                      >
                        {assigningPsychologist ? (
                          <>
                            <div style={{
                              width: 16,
                              height: 16,
                              border: '2px solid #fff',
                              borderTop: '2px solid transparent',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite'
                            }} />
                            Asignando...
                          </>
                        ) : (
                          'Seleccionar este Psicólogo'
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: '2rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}>
                    <p style={{
                      fontSize: 16,
                      color: '#666',
                      margin: '0 0 1.5rem 0'
                    }}>
                      No hay recomendaciones disponibles en este momento
                    </p>
                  </div>
                )}
                </>
              )}
            </>
          )}

          {/* Secciones de información - Solo mostrar si hay psicólogo asignado */}
          {!loading && !error && patientData?.psychologist && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              {/* Formación Académica */}
              <div style={{
                background: '#fff',
                borderRadius: 12,
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '1rem'
                }}>
                  <span role="img" aria-label="graduation" style={{ fontSize: 20 }}>🎓</span>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    margin: 0,
                    color: '#333'
                  }}>
                    Formación Académica
                  </h3>
                </div>
                
                {patientData.psychologist.academicHistory && patientData.psychologist.academicHistory.length > 0 ? (
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {patientData.psychologist.academicHistory.map((academic, index) => (
                      <li key={index} style={{
                        padding: '0.5rem 0',
                        borderBottom: index < patientData.psychologist.academicHistory.length - 1 ? '1px solid #f0f0f0' : 'none',
                        fontSize: 14,
                        color: '#666'
                      }}>
                        {academic.degree} - {academic.institution}
                        {academic.year && ` (${academic.year})`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{
                    fontSize: 14,
                    color: '#999',
                    fontStyle: 'italic',
                    margin: 0
                  }}>
                    Información académica no disponible
                  </p>
                )}
              </div>

              {/* Información Personal */}
              <div style={{
                background: '#fff',
                borderRadius: 12,
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '1rem'
                }}>
                  <span role="img" aria-label="person" style={{ fontSize: 20 }}>👤</span>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    margin: 0,
                    color: '#333'
                  }}>
                    Información Personal
                  </h3>
                </div>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {patientData.psychologist.dateOfBirth && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 14,
                      color: '#666'
                    }}>
                      <span>Edad:</span>
                      <span style={{ fontWeight: 600, color: '#333' }}>
                        {calculateAge(patientData.psychologist.dateOfBirth)} años
                      </span>
                    </div>
                  )}
                  
                  {patientData.psychologist.specialty && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 14,
                      color: '#666'
                    }}>
                      <span>Especialidad:</span>
                      <span style={{
                        background: '#0057FF',
                        color: '#fff',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {patientData.psychologist.specialty}
                      </span>
                    </div>
                  )}
                  
                  {patientData.psychologist.therapeuticStyle && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 14,
                      color: '#666'
                    }}>
                      <span>Estilo Terapéutico:</span>
                      <span style={{ fontWeight: 600, color: '#333' }}>
                        {patientData.psychologist.therapeuticStyle}
                      </span>
                    </div>
                  )}
                  
                  {patientData.psychologist.attendAges && patientData.psychologist.attendAges.length > 0 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 14,
                      color: '#666'
                    }}>
                      <span>Edades que atiende:</span>
                      <span style={{ fontWeight: 600, color: '#333' }}>
                        {patientData.psychologist.attendAges.join(', ')}
                      </span>
                    </div>
                  )}
                  
                  {patientData.psychologist.licenseNumber && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 14,
                      color: '#666'
                    }}>
                      <span>Licencia:</span>
                      <span style={{ fontWeight: 600, color: '#333' }}>
                        {patientData.psychologist.licenseNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default MySpecialistPage; 