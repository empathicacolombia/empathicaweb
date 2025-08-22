import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';

/**
 * Componente de página de Psicólogos
 * Permite a los usuarios buscar y filtrar psicólogos especializados
 * Incluye sistema de filtros y resultados de búsqueda
 * 
 * @param {Object} navigationProps - Propiedades para navegación entre páginas
 * @param {Function} navigationProps.onNavigate - Función para cambiar de página
 */
const PsychologistsPage = ({ navigationProps }) => {
  /**
   * Estado para manejar los filtros de búsqueda
   * Incluye ubicación, especialidad, edad y enfoque terapéutico
   */
  const [filters, setFilters] = useState({
    location: 'Todos',
    specialty: 'Todas las especialidades',
    age: 'Todas las edades',
    approach: 'Todos los enfoques'
  });
  
  /**
   * Estado para controlar el menú móvil
   */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /**
   * Estados para manejar los datos de psicólogos
   */
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Cargar psicólogos activos desde el backend
   */
  useEffect(() => {
    const fetchActivePsychologists = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await userService.getAllPsychologists();
        const allPsychologists = response.content || response || [];
        
        // Filtrar solo psicólogos activos
        const activePsychologists = allPsychologists.filter(psychologist => 
          psychologist.userStatus === 'ACTIVE'
        );
        
        // Transformar los datos para el formato requerido por el componente
        const transformedPsychologists = activePsychologists.map((psychologist, index) => ({
          id: psychologist.userId || index + 1,
          name: `${psychologist.name} ${psychologist.lastName}`,
          specialty: psychologist.specialty || 'Psicólogo Clínico',
          approach: psychologist.therapeuticStyle?.[0] || 'Cognitivo-Conductual',
          avatar: '👩‍⚕️', // Avatar por defecto
          description: psychologist.oneliner || 'Psicólogo especializado en bienestar emocional y desarrollo personal.',
          focusAreas: psychologist.attendAges?.slice(0, 3) || ['Adultos', 'Jóvenes', 'Familias']
        }));
        
        setPsychologists(transformedPsychologists);
      } catch (error) {
        console.error('Error cargando psicólogos:', error);
        setError('Error al cargar los psicólogos. Inténtalo de nuevo.');
        
        // Fallback a datos estáticos si hay error
        setPsychologists([
          {
            id: 1,
            name: 'Dr. María González',
            specialty: 'Ansiedad y Estrés',
            approach: 'Cognitivo-Conductual',
            avatar: '👩‍⚕️',
            description: 'Especialista en trastornos de ansiedad y manejo del estrés. Utilizo técnicas de terapia cognitivo-conductual para ayudar a mis pacientes a desarrollar estrategias efectivas de afrontamiento.',
            focusAreas: ['Ansiedad Generalizada', 'Trastorno de Pánico', 'Estrés Laboral', 'Fobias']
          },
          {
            id: 2,
            name: 'Dr. Carlos Rodríguez',
            specialty: 'Depresión y Autoestima',
            approach: 'Humanista',
            avatar: '👨‍⚕️',
            description: 'Enfoque humanista centrado en el desarrollo personal y la construcción de autoestima. Creo en el potencial de cada persona para superar sus dificultades.',
            focusAreas: ['Depresión', 'Baja Autoestima', 'Crisis Existencial', 'Desarrollo Personal']
          },
          {
            id: 3,
            name: 'Dra. Ana Martínez',
            specialty: 'Relaciones y Familia',
            approach: 'Sistémico',
            avatar: '👩‍⚕️',
            description: 'Especialista en terapia familiar y de pareja. Mi enfoque sistémico me permite trabajar con las dinámicas relacionales y patrones familiares.',
            focusAreas: ['Terapia de Pareja', 'Conflictos Familiares', 'Comunicación', 'Divorcio']
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePsychologists();
  }, []);

  /**
   * Maneja la navegación entre diferentes páginas de la aplicación
   * @param {string} page - Nombre de la página a la que navegar
   */
  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
    setMobileMenuOpen(false); // Cerrar menú móvil al navegar
  };

  /**
   * Alterna la visibilidad del menú móvil
   */
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  /**
   * Actualiza el estado de los filtros cuando el usuario cambia una opción
   * @param {string} filterType - Tipo de filtro (location, specialty, age, approach)
   * @param {string} value - Nuevo valor seleccionado
   */
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  /**
   * Restablece todos los filtros a sus valores por defecto
   */
  const clearFilters = () => {
    setFilters({
      location: 'Todos',
      specialty: 'Todas las especialidades',
      age: 'Todas las edades',
      approach: 'Todos los enfoques'
    });
  };

  /**
   * Filtra los psicólogos según los criterios seleccionados
   * @returns {Array} Lista filtrada de psicólogos
   */
  const filteredPsychologists = psychologists.filter(psychologist => {
    const matchesLocation = filters.location === 'Todos' || psychologist.location === filters.location;
    const matchesSpecialty = filters.specialty === 'Todas las especialidades' || 
                            psychologist.specialty.includes(filters.specialty) ||
                            psychologist.focusAreas.some(area => area.includes(filters.specialty));
    const matchesAge = filters.age === 'Todas las edades' || psychologist.age === filters.age;
    const matchesApproach = filters.approach === 'Todos los enfoques' || psychologist.approach === filters.approach;
    
    return matchesLocation && matchesSpecialty && matchesAge && matchesApproach;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fff'
    }}>
      {/* ========================================
           HEADER / BARRA DE NAVEGACIÓN
           ======================================== */}
      <nav className="navbar-container" style={{ 
        background: '#0057FF', 
        color: '#fff', 
        padding: '1.2rem 0', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="container" style={{ 
          maxWidth: 1300, 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 2rem'
        }}>
          {/* Logo de la empresa */}
          <span
            className="navbar-logo"
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

          {/* Botón de menú hamburguesa para móviles */}
          <button
            className="visible-mobile"
            onClick={toggleMobileMenu}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            ☰
          </button>

          {/* Menú de navegación principal */}
          <ul className="navbar-links" style={{ 
            display: 'flex', 
            gap: '2.5rem', 
            listStyle: 'none', 
            margin: 0, 
            padding: 0, 
            fontSize: 18, 
            fontWeight: 500 
          }}>
            {/* Enlace a página de psicólogos */}
            <li>
              <button
                onClick={() => handleNavigation('psychologists')}
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
                  fontWeight: 'inherit'
                }}
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
                  fontWeight: 'inherit'
                }}
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
                  fontWeight: 'inherit'
                }}
              >
                Precios
              </button>
            </li>
          </ul>

          {/* Botones de autenticación */}
          <div className="navbar-buttons" style={{ display: 'flex', gap: '1.2rem' }}>
            {/* Botón de inicio de sesión */}
            <button
              className="btn-secondary"
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
            
            {/* Botón de registro */}
            <button
              className="btn-primary"
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

        {/* ========================================
             MENÚ MÓVIL DESPLEGABLE
             ======================================== */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-menu visible-mobile" style={{ display: 'none', background: '#0057FF', padding: '1rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {/* Enlaces de navegación móvil */}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => handleNavigation('psychologists')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 0'
                  }}
                >
                  Psicólogos
                </button>
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => handleNavigation('business')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 0'
                  }}
                >
                  Empresas
                </button>
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => handleNavigation('about')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 0'
                  }}
                >
                  Acerca de
                </button>
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <button
                  onClick={() => handleNavigation('pricing')}
                  style={{
                    color: '#fff',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 0'
                  }}
                >
                  Precios
                </button>
              </li>
            </ul>
            
            {/* Botones de autenticación móvil */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <button
                className="btn-secondary"
                onClick={() => handleNavigation('login')}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '2px solid #fff',
                  borderRadius: 20,
                  padding: '0.7rem 1.5rem',
                  fontWeight: 500,
                  fontSize: 16,
                  cursor: 'pointer',
                  width: '100%'
                }}
              >
                Iniciar sesión
              </button>
              <button
                className="btn-primary"
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
                  width: '100%'
                }}
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ========================================
           SECCIÓN HERO / PRESENTACIÓN
           ======================================== */}
      <div className="section-container" style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        maxWidth: 800,
        margin: '0 auto'
      }}>
        {/* Título principal de la página */}
        <h1 className="section-title" style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          margin: '0 0 1.5rem 0',
          lineHeight: 1.2
        }}>
          <span style={{ color: '#000' }}>Encuentra tu </span>
          <span style={{ color: '#0057FF' }}>Psicólogo </span>
          <span style={{ color: '#9e9e9e' }}>Ideal</span>
        </h1>
        
        {/* Descripción del servicio */}
        <p className="section-subtitle" style={{
          fontSize: '1.2rem',
          color: '#333',
          margin: '0 0 2.5rem 0',
          lineHeight: 1.6
        }}>
          Contamos con psicólogos especializados, todos verificados y listos para ayudarte en tu proceso de bienestar emocional.
        </p>
        
        {/* Botón de call-to-action para el test de matching */}
        <button
          className="btn-primary"
          onClick={() => handleNavigation('questionnaire-match')}
          style={{
            background: '#0057FF',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s'
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
          Hagamos el test para encontrar tu match ideal
        </button>
      </div>

      {/* ========================================
           SECCIÓN DE FILTROS DE BÚSQUEDA
           ======================================== */}
      <div className="section-container" style={{
        background: '#fff',
        padding: '2rem',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div className="container filters-container" style={{
          maxWidth: 1300,
          margin: '0 auto',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* Filtro por ubicación/ciudad */}
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 14,
              background: '#fff',
              cursor: 'pointer',
              minWidth: 150
            }}
          >
            <option value="Todos">Todos</option>
            <option value="Bogotá">Bogotá</option>
            <option value="Medellín">Medellín</option>
            <option value="Cali">Cali</option>
            <option value="Barranquilla">Barranquilla</option>
          </select>

          {/* Filtro por especialidad terapéutica */}
          <select
            value={filters.specialty}
            onChange={(e) => handleFilterChange('specialty', e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 14,
              background: '#fff',
              cursor: 'pointer',
              minWidth: 200
            }}
          >
            <option value="Todas las especialidades">Todas las especialidades</option>
            <option value="Ansiedad">Ansiedad</option>
            <option value="Depresión">Depresión</option>
            <option value="Estrés">Estrés</option>
            <option value="Relaciones">Relaciones</option>
            <option value="Autoestima">Autoestima</option>
          </select>

          {/* Filtro por rango de edad */}
          <select
            value={filters.age}
            onChange={(e) => handleFilterChange('age', e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 14,
              background: '#fff',
              cursor: 'pointer',
              minWidth: 150
            }}
          >
            <option value="Todas las edades">Todas las edades</option>
            <option value="18-25">18-25 años</option>
            <option value="26-35">26-35 años</option>
            <option value="36-45">36-45 años</option>
            <option value="46+">46+ años</option>
          </select>

          {/* Filtro por enfoque terapéutico */}
          <select
            value={filters.approach}
            onChange={(e) => handleFilterChange('approach', e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              fontSize: 14,
              background: '#fff',
              cursor: 'pointer',
              minWidth: 150
            }}
          >
            <option value="Todos los enfoques">Todos los enfoques</option>
            <option value="Cognitivo-Conductual">Cognitivo-Conductual</option>
            <option value="Psicoanalítico">Psicoanalítico</option>
            <option value="Humanista">Humanista</option>
            <option value="Sistémico">Sistémico</option>
            <option value="Integrativo">Integrativo</option>
          </select>
        </div>
      </div>

      {/* ========================================
           SECCIÓN DE RESULTADOS DE BÚSQUEDA
           ======================================== */}
      <div className="section-container" style={{
        padding: '3rem 2rem',
        maxWidth: 1300,
        margin: '0 auto'
      }}>
        {/* Header de resultados con contador */}
        <div style={{
          marginBottom: '2rem'
        }}>
          {/* Título con número de resultados */}
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            margin: '0 0 0.5rem 0',
            color: '#333'
          }}>
            Psicólogos disponibles ({filteredPsychologists.length})
          </h2>
          
          {/* Texto de verificación */}
          <p style={{
            fontSize: '1rem',
            color: '#666',
            margin: 0
          }}>
            Todos nuestros profesionales están verificados y certificados
          </p>
        </div>

        {/* ========================================
             LISTA DE PSICÓLOGOS
             ======================================== */}
        {loading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: 400 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: 40, 
                height: 40, 
                border: '4px solid #f3f3f3', 
                borderTop: '4px solid #0057FF', 
                borderRadius: '50%', 
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px'
              }} />
              <p style={{ color: '#6b7280' }}>Cargando psicólogos...</p>
            </div>
          </div>
        ) : error ? (
          <div style={{ 
            background: '#fee', 
            border: '1px solid #fcc', 
            borderRadius: 8, 
            padding: 16, 
            textAlign: 'center',
            color: '#c33'
          }}>
            <p>{error}</p>
          </div>
        ) : filteredPsychologists.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredPsychologists.map((psychologist) => (
              <div key={psychologist.id} style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
              }}
              >
                {/* Header del psicólogo */}
                <div style={{
                  background: 'linear-gradient(135deg, #0057FF 0%, #4A90E2 100%)',
                  padding: '1.5rem',
                  color: '#fff'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '3rem',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%',
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {psychologist.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        margin: '0 0 0.5rem 0'
                      }}>
                        {psychologist.name}
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        margin: 0,
                        opacity: 0.9
                      }}>
                        {psychologist.specialty}
                      </p>
                    </div>
                  </div>
                  

                </div>

                {/* Contenido del psicólogo */}
                <div style={{ padding: '1.5rem' }}>
                  {/* Descripción */}
                  <p style={{
                    color: '#666',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    margin: '0 0 1rem 0'
                  }}>
                    {psychologist.description}
                  </p>

                  {/* Enfoque terapéutico */}
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#999', fontSize: '0.85rem' }}>Enfoque terapéutico</span>
                    <p style={{ margin: '0.25rem 0 0 0', fontWeight: 600 }}>{psychologist.approach}</p>
                  </div>

                  {/* Áreas de enfoque */}
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ color: '#999', fontSize: '0.85rem' }}>Áreas de especialización</span>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginTop: '0.5rem'
                    }}>
                      {psychologist.focusAreas.slice(0, 3).map((area, index) => (
                        <span key={index} style={{
                          background: '#f0f8ff',
                          color: '#0057FF',
                          padding: '0.25rem 0.75rem',
                          borderRadius: 12,
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}>
                          {area}
                        </span>
                      ))}
                      {psychologist.focusAreas.length > 3 && (
                        <span style={{
                          background: '#f0f8ff',
                          color: '#0057FF',
                          padding: '0.25rem 0.75rem',
                          borderRadius: 12,
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}>
                          +{psychologist.focusAreas.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>


                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ========================================
               MENSAJE DE NO RESULTADOS
               ======================================== */
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem'
        }}>
            {/* Mensaje informativo */}
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            margin: '0 0 2rem 0'
          }}>
            No se encontraron psicólogos con los filtros seleccionados.
          </p>
          
            {/* Botón para limpiar filtros */}
          <button
            onClick={clearFilters}
            style={{
              background: '#fff',
              color: '#333',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              padding: '0.75rem 1.5rem',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            Limpiar filtros
          </button>
        </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default PsychologistsPage; 