import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/api';

/**
 * Componente de configuración del psicólogo
 * Muestra información del psicólogo obtenida del backend
 * @param {Object} navigationProps - Propiedades para navegación
 * @returns {JSX.Element} - Componente de configuración
 */
const PsychologistSettings = ({ navigationProps }) => {
  const { user } = useAuth();
  
  // Estados para la información complementaria
  const [complementaryInfo, setComplementaryInfo] = useState({
    timezone: '',
    cedula: '',
    oneLiner: '',
    licenseNumber: '',
    specialty: '',
    attendAges: [],
    therapeuticStyle: [],
    additionalModalities: []
  });
  
  // Estado para el historial académico
  const [academicHistory, setAcademicHistory] = useState([]);
  
  // Estado de carga
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Calcula la edad del psicólogo basada en la fecha de nacimiento
   * @param {string} dateOfBirth - Fecha de nacimiento en formato YYYY-MM-DD
   * @returns {number} - Edad calculada
   */
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'No disponible';
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
   * Mapea el género del backend a texto legible
   * @param {string} gender - Género del backend (MALE, FEMALE, OTHER)
   * @returns {string} - Género en español
   */
  const mapGender = (gender) => {
    switch (gender) {
      case 'MALE':
        return 'Masculino';
      case 'FEMALE':
        return 'Femenino';
      case 'OTHER':
        return 'No especificado';
      default:
        return 'No disponible';
    }
  };

  /**
   * Obtiene la información complementaria del psicólogo
   */
  const fetchComplementaryInfo = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await userService.getPsychologistById(user.id);
      console.log('Información complementaria obtenida:', response);
      
      // Actualizar estados con la información recibida
      if (response) {
        setComplementaryInfo({
          timezone: response.timezone || '',
          cedula: response.cedula || '',
          oneLiner: response.oneLiner || '',
          licenseNumber: response.licenseNumber || '',
          specialty: response.specialty || '',
          attendAges: response.attendAges || [],
          therapeuticStyle: response.therapeuticStyle || [],
          additionalModalities: response.additionalModalities || []
        });
        
        if (response.academicHistory) {
          setAcademicHistory(response.academicHistory);
        }
      }
    } catch (err) {
      console.error('Error obteniendo información complementaria:', err);
      
      // Manejar diferentes tipos de errores
      if (err.response) {
        if (err.response.status === 404) {
          console.log('Endpoint de información complementaria no encontrado');
          setError('La información complementaria no está configurada aún');
        } else if (err.response.status === 401 || err.response.status === 403) {
          console.log('Endpoint de información complementaria no autorizado');
          setError('La información complementaria no está disponible en este momento');
        } else {
          console.log('Error del servidor:', err.response.status);
          setError('Error del servidor al cargar la información complementaria');
        }
      } else if (err.request) {
        console.log('Error de red al obtener información complementaria');
        setError('Error de conexión al cargar la información complementaria');
      } else {
        console.log('Error inesperado:', err.message);
        setError('Error inesperado al cargar la información complementaria');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cargar información complementaria al montar el componente
  useEffect(() => {
    if (user?.id) {
      fetchComplementaryInfo();
    }
  }, [user?.id]);

  return (
    <div style={{ marginTop: 32, marginBottom: 24 }}>
      <span style={{ color: '#222', fontWeight: 800, fontSize: 32, display: 'block', marginBottom: 24 }}>
        Configuración
      </span>

      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2', padding: '2rem' }}>
        <div>
          <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, marginBottom: 24 }}>Información del Psicólogo</h3>
          
          <div style={{
            background: '#e6f0ff',
            border: '1px solid #bae6fd',
            borderRadius: 12,
            padding: '1rem',
            marginBottom: 24
          }}>
            <p style={{ color: '#0057ff', fontSize: 14, margin: 0 }}>
              ℹ️ La información mostrada proviene de tu perfil de psicólogo y no puede ser modificada desde esta sección.
            </p>
          </div>
          
          {/* Tarjeta principal del psicólogo */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 18,
            padding: '2rem',
            color: '#fff',
            marginBottom: 24,
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                fontWeight: 700,
                border: '3px solid rgba(255, 255, 255, 0.3)'
              }}>
                {user ? `${user.name?.charAt(0)}${user.lastName?.charAt(0)}` : 'PS'}
              </div>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, marginBottom: 4 }}>
                  {user ? `${user.name} ${user.lastName}` : 'Psicólogo'}
                </h2>
                <p style={{ fontSize: 16, opacity: 0.9, margin: 0 }}>
                  Profesional de Psicología
                </p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, padding: '1rem' }}>
                <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>Edad</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>
                  {user?.dateOfBirth ? `${calculateAge(user.dateOfBirth)} años` : 'No disponible'}
                </div>
              </div>
              
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, padding: '1rem' }}>
                <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>Género</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>
                  {mapGender(user?.gender)}
                </div>
              </div>
              
              {user?.roles && user.roles.length > 1 && (
                <div style={{ background: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, padding: '1rem' }}>
                  <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 4 }}>Empresa</div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>
                    {user.roles.find(role => role.startsWith('Company:'))?.replace('Company:', '') || 'No asociado'}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Tarjetas de información de contacto */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {/* Tarjeta de contacto */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 16,
              padding: '1.5rem',
              border: '1px solid #e0e7ef',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#0057ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 18
                }}>
                  📧
                </div>
                <h4 style={{ color: '#222', fontSize: 18, fontWeight: 700, margin: 0 }}>Contacto</h4>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 14, color: '#7a8bbd', marginBottom: 4 }}>Correo Electrónico</div>
                  <div style={{ fontSize: 16, color: '#222', fontWeight: 600 }}>
                    {user?.email || 'No disponible'}
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: 14, color: '#7a8bbd', marginBottom: 4 }}>Teléfono</div>
                  <div style={{ fontSize: 16, color: '#222', fontWeight: 600 }}>
                    {user?.phoneNumber || 'No disponible'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tarjeta de información del sistema */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: 16,
              padding: '1.5rem',
              border: '1px solid #e0e7ef',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#28a745',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 18
                }}>
                  🆔
                </div>
                <h4 style={{ color: '#222', fontSize: 18, fontWeight: 700, margin: 0 }}>Información del Sistema</h4>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 14, color: '#7a8bbd', marginBottom: 4 }}>ID de Usuario</div>
                  <div style={{ fontSize: 16, color: '#222', fontWeight: 600 }}>
                    {user?.id || user?.userId || 'No disponible'}
                  </div>
                </div>
                
                <div>
                  <div style={{ fontSize: 14, color: '#7a8bbd', marginBottom: 4 }}>Estado</div>
                  <div style={{ 
                    fontSize: 16, 
                    fontWeight: 600,
                    color: '#28a745',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    <span style={{ fontSize: 12 }}>●</span>
                    Activo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Información Complementaria */}
        <div style={{ borderTop: '2px solid #e0e7ef', paddingTop: 40, marginTop: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, margin: 0 }}>Información Complementaria</h3>
            <button
              onClick={fetchComplementaryInfo}
              disabled={loading}
              style={{
                background: '#0057ff',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '0.5rem 1rem',
                fontSize: 14,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Cargando...' : 'Cargar Información'}
            </button>
          </div>
          
          {!loading && !error && complementaryInfo.timezone === '' && (
            <div style={{ 
              background: '#e3f2fd', 
              border: '1px solid #bbdefb', 
              borderRadius: 12, 
              padding: '1rem', 
              marginBottom: 24,
              color: '#1976d2'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 16 }}>ℹ️</span>
                <strong>Información Complementaria</strong>
              </div>
              <p style={{ margin: 0, fontSize: 14 }}>
                Haz clic en "Cargar Información" para obtener datos adicionales del psicólogo desde el backend.
              </p>
            </div>
          )}
          
          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#7a8bbd' }}>
              Cargando información complementaria...
            </div>
          )}
          
          {error && (
            <div style={{ 
              background: '#fff3cd', 
              border: '1px solid #ffeaa7', 
              borderRadius: 12, 
              padding: '1rem', 
              marginBottom: 24,
              color: '#856404'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 16 }}>⚠️</span>
                <strong>Información no disponible</strong>
              </div>
              <p style={{ margin: 0, fontSize: 14 }}>
                {error}
              </p>
            </div>
          )}
          
          {!loading && (
            <div>
              {/* Información Profesional */}
              <div style={{ marginBottom: 32 }}>
                <h4 style={{ color: '#222', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Información Profesional</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                  <div>
                    <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                      Zona Horaria
                    </label>
                    <div style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      background: '#f8f9fa',
                      color: '#666'
                    }}>
                      {complementaryInfo.timezone || 'No disponible'}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                      Cédula Profesional
                    </label>
                    <div style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      background: '#f8f9fa',
                      color: '#666'
                    }}>
                      {complementaryInfo.cedula || 'No disponible'}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                      Número de Licencia
                    </label>
                    <div style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      background: '#f8f9fa',
                      color: '#666'
                    }}>
                      {complementaryInfo.licenseNumber || 'No disponible'}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                      Especialidad
                    </label>
                    <div style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      background: '#f8f9fa',
                      color: '#666'
                    }}>
                      {complementaryInfo.specialty || 'No disponible'}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                    Descripción Breve
                  </label>
                  <div style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    background: '#f8f9fa',
                    color: '#666',
                    minHeight: '60px'
                  }}>
                    {complementaryInfo.oneLiner || 'No disponible'}
                  </div>
                </div>
              </div>

              {/* Información de Atención */}
              <div style={{ marginBottom: 32 }}>
                <h4 style={{ color: '#222', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Información de Atención</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                  <div>
                    <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                      Grupos de Edad que Atiende
                    </label>
                    <div style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      background: '#f8f9fa',
                      color: '#666',
                      minHeight: '60px'
                    }}>
                      {complementaryInfo.attendAges && complementaryInfo.attendAges.length > 0 
                        ? complementaryInfo.attendAges.join(', ') 
                        : 'No disponible'}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                      Estilo Terapéutico
                    </label>
                    <div style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      background: '#f8f9fa',
                      color: '#666',
                      minHeight: '60px'
                    }}>
                      {complementaryInfo.therapeuticStyle && complementaryInfo.therapeuticStyle.length > 0 
                        ? complementaryInfo.therapeuticStyle.join(', ') 
                        : 'No disponible'}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                      Modalidades Adicionales
                    </label>
                    <div style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      background: '#f8f9fa',
                      color: '#666',
                      minHeight: '60px'
                    }}>
                      {complementaryInfo.additionalModalities && complementaryInfo.additionalModalities.length > 0 
                        ? complementaryInfo.additionalModalities.join(', ') 
                        : 'No disponible'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Historial Académico */}
              {academicHistory && academicHistory.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <h4 style={{ color: '#222', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Historial Académico</h4>
                  
                  {academicHistory.map((entry, index) => (
                    <div key={index} style={{
                      background: '#f8f9fa',
                      borderRadius: 12,
                      padding: '1.5rem',
                      marginBottom: 16,
                      border: '1px solid #e0e7ef'
                    }}>
                      <h5 style={{ color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 16 }}>
                        Estudio #{index + 1}
                      </h5>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                            Institución
                          </label>
                          <div style={{
                            padding: '0.8rem 1rem',
                            borderRadius: 12,
                            border: '1.5px solid #e0e7ef',
                            fontSize: 16,
                            background: '#fff',
                            color: '#666'
                          }}>
                            {entry.institution || 'No disponible'}
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                            Grado
                          </label>
                          <div style={{
                            padding: '0.8rem 1rem',
                            borderRadius: 12,
                            border: '1.5px solid #e0e7ef',
                            fontSize: 16,
                            background: '#fff',
                            color: '#666'
                          }}>
                            {entry.degree || 'No disponible'}
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                            Carrera
                          </label>
                          <div style={{
                            padding: '0.8rem 1rem',
                            borderRadius: 12,
                            border: '1.5px solid #e0e7ef',
                            fontSize: 16,
                            background: '#fff',
                            color: '#666'
                          }}>
                            {entry.major || 'No disponible'}
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>
                            Año de Graduación
                          </label>
                          <div style={{
                            padding: '0.8rem 1rem',
                            borderRadius: 12,
                            border: '1.5px solid #e0e7ef',
                            fontSize: 16,
                            background: '#fff',
                            color: '#666'
                          }}>
                            {entry.graduationYear || 'No disponible'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PsychologistSettings;
