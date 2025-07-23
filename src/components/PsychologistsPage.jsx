import React, { useState } from 'react';

const PsychologistsPage = ({ navigationProps }) => {
  const [filters, setFilters] = useState({
    location: 'Todos',
    specialty: 'Todas las especialidades',
    age: 'Todas las edades',
    approach: 'Todos los enfoques'
  });

  const handleNavigation = (page) => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate(page);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

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

      {/* Hero Section */}
      <div style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        maxWidth: 800,
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          margin: '0 0 1.5rem 0',
          lineHeight: 1.2
        }}>
          <span style={{ color: '#000' }}>Encuentra tu </span>
          <span style={{ color: '#0057FF' }}>Psicólogo </span>
          <span style={{ color: '#9e9e9e' }}>Ideal</span>
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#333',
          margin: '0 0 2.5rem 0',
          lineHeight: 1.6
        }}>
          Contamos con más de 100 psicólogos especializados, todos verificados y listos para ayudarte en tu proceso de bienestar emocional.
        </p>
        
        <button
          onClick={() => handleNavigation('individuals')}
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

      {/* Sección de Filtros */}
      <div style={{
        background: '#fff',
        padding: '2rem',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{
          maxWidth: 1300,
          margin: '0 auto',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {/* Filtro Ubicación */}
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

          {/* Filtro Especialidad */}
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

          {/* Filtro Edad */}
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

          {/* Filtro Enfoque */}
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

      {/* Sección de Resultados */}
      <div style={{
        padding: '3rem 2rem',
        maxWidth: 1300,
        margin: '0 auto'
      }}>
        {/* Header de resultados */}
        <div style={{
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 700,
            margin: '0 0 0.5rem 0',
            color: '#333'
          }}>
            Psicólogos disponibles (0)
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#666',
            margin: 0
          }}>
            Todos nuestros profesionales están verificados y certificados
          </p>
        </div>

        {/* Mensaje de no resultados */}
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem'
        }}>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            margin: '0 0 2rem 0'
          }}>
            No se encontraron psicólogos con los filtros seleccionados.
          </p>
          
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