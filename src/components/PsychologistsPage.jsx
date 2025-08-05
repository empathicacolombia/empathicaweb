import React, { useState } from 'react';

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
          Contamos con más de 100 psicólogos especializados, todos verificados y listos para ayudarte en tu proceso de bienestar emocional.
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
            Psicólogos disponibles (0)
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
             MENSAJE DE NO RESULTADOS
             ======================================== */}
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
      </div>
    </div>
  );
};

export default PsychologistsPage; 