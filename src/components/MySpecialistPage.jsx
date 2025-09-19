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
  const [otherPsychologists, setOtherPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecommendation, setLoadingRecommendation] = useState(false);
  const [loadingOthers, setLoadingOthers] = useState(false);
  const [loadingTags, setLoadingTags] = useState(false);
  const [tagsUpdated, setTagsUpdated] = useState(false);
  const [psychologistAssigned, setPsychologistAssigned] = useState(false);
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

  // Función helper para obtener el ID del psicólogo recomendado desde localStorage
  const getRecommendedPsychologistId = () => {
    try {
      const storedTags = localStorage.getItem('empathica_test_tags');
      if (storedTags) {
        const tagsData = JSON.parse(storedTags);
        const recommendedPsychologistId = tagsData.recommendedPsychologistId;
        return recommendedPsychologistId;
      }
    } catch (parseError) {
      console.error('Error al parsear tags del localStorage:', parseError);
    }
    return null;
  };

  // Función para obtener psicólogo recomendado
  const fetchRecommendedPsychologist = async () => {
    try {
      setLoadingRecommendation(true);
      
      // Obtener el ID del psicólogo recomendado desde localStorage
      const recommendedPsychologistId = getRecommendedPsychologistId();
      
      if (recommendedPsychologistId) {
        // Usar el ID específico del localStorage
        const data = await userService.getPsychologistById(recommendedPsychologistId);
        setRecommendedPsychologist(data);
        console.log('Psicólogo recomendado cargado con ID específico:', recommendedPsychologistId);
        
        // NO enviar tags aquí - se enviarán después de la asignación exitosa
      } else {
        console.warn('No se encontró ID de psicólogo recomendado en localStorage');
        // No usar fallback hardcodeado, simplemente no mostrar psicólogo recomendado
        setRecommendedPsychologist(null);
      }
    } catch (error) {
      console.error('Error obteniendo psicólogo recomendado:', error);
      // NO establecer error global, solo log local
      setRecommendedPsychologist(null);
      // Limpiar cualquier error previo para permitir mostrar otros psicólogos
      setError(null);
    } finally {
      setLoadingRecommendation(false);
    }
  };

  // Función para actualizar tags del paciente desde localStorage
  const updatePatientTagsFromLocalStorage = async () => {
    try {
      setLoadingTags(true);
      setTagsUpdated(false); // Resetear estado al inicio
      
      const storedTags = localStorage.getItem('empathica_test_tags');
      if (!storedTags) {
        console.log('No hay tags en localStorage para actualizar');
        return;
      }

      const tagsData = JSON.parse(storedTags);
      
      // Preparar payload para el POST de tags (solo los 3 tags del localStorage)
      // El backend espera percentage como decimal (0.0-1.0), pero localStorage tiene intensity (0-100)
      const tagsPayload = {
        tag1: {
          tagId: 0,
          name: tagsData.tag1?.name || "string",
          percentage: (tagsData.tag1?.intensity || 50) / 100, // Convertir de 0-100 a 0.0-1.0
          patient: "string"
        },
        tag2: {
          tagId: 0,
          name: tagsData.tag2?.name || "string",
          percentage: (tagsData.tag2?.intensity || 50) / 100, // Convertir de 0-100 a 0.0-1.0
          patient: "string"
        },
        tag3: {
          tagId: 0,
          name: tagsData.tag3?.name || "string",
          percentage: (tagsData.tag3?.intensity || 50) / 100, // Convertir de 0-100 a 0.0-1.0
          patient: "string"
        }
      };

      console.log('Enviando POST de tags:', tagsPayload);
      console.log('Conversión de porcentajes:', {
        tag1: `${tagsData.tag1?.intensity || 50}% → ${(tagsData.tag1?.intensity || 50) / 100}`,
        tag2: `${tagsData.tag2?.intensity || 50}% → ${(tagsData.tag2?.intensity || 50) / 100}`,
        tag3: `${tagsData.tag3?.intensity || 50}% → ${(tagsData.tag3?.intensity || 50) / 100}`
      });
      
      // Enviar POST de tags
      const response = await userService.uploadPatientTags(tagsPayload);
      
      // Verificar que la respuesta sea exitosa
      if (response && (response.success !== false)) {
        console.log('POST de tags enviado exitosamente');
        setTagsUpdated(true);
      } else {
        console.error('POST de tags falló:', response);
        setTagsUpdated(false);
      }
      
    } catch (error) {
      console.error('Error enviando POST de tags:', error);
      setTagsUpdated(false);
      // No mostrar error al usuario, solo log
    } finally {
      setLoadingTags(false);
    }
  };

  // Función para limpiar tags del localStorage
  const clearLocalStorageTags = () => {
    try {
      // Verificar si existe el localStorage antes de borrarlo
      const storedTags = localStorage.getItem('empathica_test_tags');
      if (storedTags) {
        localStorage.removeItem('empathica_test_tags');
        console.log('localStorage de tags limpiado exitosamente');
      } else {
        console.log('No había tags en localStorage para limpiar');
      }
    } catch (error) {
      console.error('Error limpiando localStorage:', error);
    }
  };

  // Función para obtener otros psicólogos del GET público
  const fetchOtherPsychologists = async () => {
    try {
      setLoadingOthers(true);
      
      // Obtener todos los psicólogos activos del backend
      const response = await userService.getAllPsychologists();
      const psychologists = response.content || response || [];
      
      // Verificar si hay datos válidos
      if (!Array.isArray(psychologists) || psychologists.length === 0) {
        console.warn('No se encontraron psicólogos en la respuesta del backend');
        setOtherPsychologists([]);
        return;
      }
      
      // Filtrar solo psicólogos activos
      const activePsychologists = psychologists.filter(psy => psy.userStatus === 'ACTIVE');
      
      if (activePsychologists.length > 0) {
        // Obtener el ID del psicólogo recomendado para excluirlo
        const recommendedPsychologistId = getRecommendedPsychologistId();
        
        // Filtrar psicólogos excluyendo el recomendado
        const otherActivePsychologists = activePsychologists.filter(psy => 
          psy.userId !== recommendedPsychologistId
        );
        
        // Tomar hasta 2 psicólogos (máximo 3 en total: 1 recomendado + 2 alternativos)
        const maxOthers = Math.min(otherActivePsychologists.length, 2);
        const selectedOthers = otherActivePsychologists.slice(0, maxOthers);
        
        // Transformar los datos para el formato esperado
        const transformedOthers = selectedOthers.map((psy, index) => ({
          id: psy.userId || index + 1,
          nombre: `${psy.name} ${psy.lastName}`,
          especializacion: psy.specialty || 'Psicólogo Clínico',
          descripcion: psy.oneliner || 'Psicólogo especializado en bienestar emocional y desarrollo personal.',
          imagen: '👩‍⚕️',
          experiencia: 'Psicólogo Clínico Certificado',
          enfoque: psy.therapeuticStyle?.[0] || 'Cognitivo-Conductual',
          idiomas: 'Español',
          modalidad: 'Presencial y Online',
          cedula: psy.cedula || 'N/A',
          edades: psy.attendAges?.join(', ') || 'Adultos',
          modalidades: psy.additionalModalities?.join(', ') || 'Terapia individual'
        }));
        
        setOtherPsychologists(transformedOthers);
        console.log('Otros psicólogos cargados:', transformedOthers);
      } else {
        console.warn('No hay psicólogos activos en el sistema');
        setOtherPsychologists([]);
      }
      
    } catch (error) {
      console.error('Error obteniendo otros psicólogos:', error);
      setOtherPsychologists([]);
    } finally {
      setLoadingOthers(false);
    }
  };

  // Función para asignar psicólogo al paciente
  const handleAssignPsychologist = async (psychologistId = null) => {
    if (!user?.id) {
      setError('No se pudo procesar la asignación');
      return;
    }

    try {
      setAssigningPsychologist(true);
      setError(null);
      
      let targetPsychologistId = psychologistId;
      
      // Si no se proporciona un ID específico, usar el psicólogo recomendado
      if (!targetPsychologistId) {
        if (!recommendedPsychologist) {
          setError('No se pudo procesar la asignación');
          return;
        }
        
        // Obtener el ID del psicólogo recomendado desde localStorage
        const recommendedPsychologistId = getRecommendedPsychologistId();
        
        // Usar el ID del psicólogo recomendado o el ID del estado si no hay uno guardado
        targetPsychologistId = recommendedPsychologistId || recommendedPsychologist?.userId || recommendedPsychologist?.id;
      }
      
      if (!targetPsychologistId) {
        throw new Error('No se pudo obtener el ID del psicólogo');
      }
      
      console.log('Asignando psicólogo con ID:', targetPsychologistId);
      
      // Enviar la petición para asignar el psicólogo
      const assignResponse = await userService.assignPsychologistToPatient({
        userId: targetPsychologistId
      });
      
      // Marcar asignación como exitosa
      setPsychologistAssigned(true);
      
      // Recargar los datos del paciente para mostrar la información actualizada
      await fetchPatientData();
      
      // DESPUÉS de la asignación exitosa, enviar tags al backend
      console.log('Asignación exitosa, ahora enviando tags al backend...');
      await updatePatientTagsFromLocalStorage();
      
      // Verificar que los tags se actualizaron exitosamente antes de borrar localStorage
      if (tagsUpdated) {
        // Borrar localStorage solo si ambas operaciones fueron exitosas
        clearLocalStorageTags();
        console.log('localStorage borrado: asignación exitosa + tags actualizados');
      } else {
        console.log('localStorage no borrado: tags no se actualizaron correctamente');
      }
      
      // Mostrar mensaje de éxito
      if (tagsUpdated) {
        setSuccessMessage('¡Psicólogo asignado exitosamente! Datos temporales limpiados.');
      } else {
        setSuccessMessage('¡Psicólogo asignado exitosamente! Nota: Los datos temporales se mantendrán hasta la próxima actualización.');
      }
      
      // Limpiar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      
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
    
    // Resetear estados al cargar la página
    setTagsUpdated(false);
    setPsychologistAssigned(false);
  }, [user?.id]);

  // Cargar psicólogo recomendado y otros psicólogos si no hay uno asignado
  useEffect(() => {
    if (patientData && !patientData.psychologist) {
      // Verificar si hay datos en localStorage
      const storedTags = localStorage.getItem('empathica_test_tags');
      
      if (storedTags) {
        // Hay datos en localStorage, cargar psicólogos
        console.log('Datos encontrados en localStorage, cargando psicólogos...');
        fetchRecommendedPsychologist();
        fetchOtherPsychologists();
      } else {
        // No hay datos en localStorage, paciente nuevo
        console.log('No hay datos en localStorage, paciente nuevo necesita hacer test');
        setError('Para encontrar tu psicólogo ideal, necesitas completar nuestro test de matching primero.');
      }
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
          {!loading && (
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
                      <UserX size={48} color={error ? "#dc2626" : "#f59e0b"} />
                      <h2 style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: error ? '#dc2626' : '#92400e',
                        margin: 0
                      }}>
                        {error ? 'Paciente Nuevo' : 'Aún no se ha asignado psicólogo'}
                      </h2>
                </div>

                {error ? (
                  // Paciente nuevo sin datos en localStorage
                  <>
                <p style={{
                  fontSize: 16,
                      color: '#dc2626',
                      lineHeight: 1.6,
                  margin: '0 0 1.5rem 0'
                }}>
                      {error}
                    </p>
                    
                    <div style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: 8,
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      display: 'inline-block'
                    }}>
                      <p style={{
                        fontSize: 14,
                        color: '#dc2626',
                        margin: '0 0 1rem 0',
                        fontWeight: 500
                      }}>
                        ⚠️ Necesitas completar el test de matching para obtener recomendaciones personalizadas
                      </p>
                    </div>
                  </>
                ) : (
                  // Paciente con datos pero sin psicólogo asignado
                  <>
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
                  </>
                )}
                    
                <button 
                      onClick={() => {
                        setError(null); // Limpiar error al navegar al test
                        handleNavigation('questionnaire-match', { fromDashboard: true });
                      }}
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

                  {/* Psicólogo recomendado - Solo mostrar si no hay error (hay datos en localStorage) */}
                  {!error && (
                    <>
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

                    {/* Indicador de tags */}
                    {loadingTags && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#f0f4ff',
                        borderRadius: 8,
                    fontSize: 14,
                        color: '#0057FF'
                      }}>
                        <div style={{
                          width: 16,
                          height: 16,
                          border: '2px solid #0057FF',
                          borderTop: '2px solid transparent',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                        Enviando datos del test...
                      </div>
                    )}
                    
                    {tagsUpdated && !loadingTags && (
                      <div style={{
                    display: 'flex',
                    alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '1rem',
                        padding: '0.5rem 1rem',
                        background: '#d1fae5',
                        borderRadius: 8,
                        fontSize: 14,
                        color: '#065f46'
                      }}>
                        <span style={{ fontSize: 16 }}>✅</span>
                        Datos del test enviados correctamente
                        <span style={{ fontSize: 12, opacity: 0.8 }}>
                          (Datos temporales se limpiarán al asignar psicólogo)
                        </span>
                      </div>
                    )}

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
                          <>
                            Seleccionar este Psicólogo
                            {tagsUpdated && (
                              <span style={{ fontSize: 12, opacity: 0.8 }}>
                                {' '}(Datos listos)
                              </span>
                            )}
                          </>
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

                {/* Otros Psicólogos */}
                {loadingOthers ? (
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
                      Cargando otras opciones...
                    </div>
                  </div>
                ) : otherPsychologists.length > 0 ? (
                  <div style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: '2rem',
                    marginBottom: '2rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}>
                    {/* Encabezado de otras opciones */}
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
                        background: '#f0f4ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: '#0057FF', fontSize: 16, fontWeight: 'bold' }}>👥</span>
                      </div>
                      <h3 style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#333',
                        margin: 0
                      }}>
                        Otras Opciones
                      </h3>
                    </div>

                    {/* Lista de otros psicólogos */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem'
                    }}>
                      {otherPsychologists.map((psychologist, index) => (
                        <div key={psychologist.id} style={{
                          border: '1px solid #e5e7eb',
                          borderRadius: 12,
                          padding: '1.5rem',
                          background: '#fafafa'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '1rem'
                          }}>
                            {/* Avatar del psicólogo */}
                            <div style={{
                              width: 60,
                              height: 60,
                              borderRadius: '50%',
                              background: '#f0f4ff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 24,
                              flexShrink: 0
                            }}>
                              <User color="#0057FF" size={32} />
                            </div>
                            
                            {/* Datos del psicólogo */}
                            <div style={{ flex: 1 }}>
                              <h4 style={{
                                fontSize: 18,
                                fontWeight: 600,
                                color: '#333',
                                margin: '0 0 0.25rem 0'
                              }}>
                                {psychologist.nombre}
                              </h4>
                              <p style={{
                                fontSize: 14,
                                color: '#666',
                                margin: '0 0 0.5rem 0'
                              }}>
                                {psychologist.especializacion}
                              </p>
                              
                              {/* Información adicional */}
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem'
                              }}>
                                {psychologist.enfoque && (
                                  <p style={{
                                    fontSize: 12,
                                    color: '#666',
                                    margin: 0
                                  }}>
                                    <strong>Enfoque:</strong> {psychologist.enfoque}
                                  </p>
                                )}
                                {psychologist.edades && (
                                  <p style={{
                                    fontSize: 12,
                                    color: '#666',
                                    margin: 0
                                  }}>
                                    <strong>Edades:</strong> {psychologist.edades}
                                  </p>
                                )}
                                {psychologist.modalidades && (
                                  <p style={{
                                    fontSize: 12,
                                    color: '#666',
                                    margin: 0
                                  }}>
                                    <strong>Modalidades:</strong> {psychologist.modalidades}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Botón de seleccionar */}
                            <button
                              onClick={() => handleAssignPsychologist(psychologist.id)}
                              style={{
                                background: '#0057FF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 8,
                                padding: '0.5rem 1rem',
                                fontSize: 12,
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                flexShrink: 0
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = '#0043cc'}
                              onMouseLeave={(e) => e.currentTarget.style.background = '#0057FF'}
                            >
                              Seleccionar
                            </button>
                          </div>
                        </div>
                      ))}
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
                      margin: '0 0 1rem 0'
                    }}>
                      No hay otras opciones disponibles en este momento
                    </p>
                    <p style={{
                      fontSize: 14,
                      color: '#999',
                      margin: 0
                    }}>
                      Te recomendamos seleccionar el psicólogo recomendado arriba
                    </p>
                  </div>
                )}
                      </>
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