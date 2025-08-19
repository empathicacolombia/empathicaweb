import React, { useState } from 'react';

const BusinessToolkits = ({ navigationProps }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Datos de toolkits
  const toolkits = [
    {
      id: 1,
      title: 'Manejo del Estrés Laboral',
      description: 'Herramientas y técnicas para gestionar el estrés en el entorno laboral',
      category: 'Bienestar',
      duration: '45 min',
      sessions: 12,
      status: 'Disponible',
      color: '#2ecc71'
    },
    {
      id: 2,
      title: 'Comunicación Asertiva',
      description: 'Mejora tus habilidades de comunicación en el trabajo',
      category: 'Comunicación',
      duration: '30 min',
      sessions: 8,
      status: 'Disponible',
      color: '#0057ff'
    },
    {
      id: 3,
      title: 'Liderazgo Efectivo',
      description: 'Desarrolla habilidades de liderazgo y gestión de equipos',
      category: 'Liderazgo',
      duration: '60 min',
      sessions: 15,
      status: 'Disponible',
      color: '#ff9800'
    },
    {
      id: 4,
      title: 'Gestión del Tiempo',
      description: 'Optimiza tu productividad y organización personal',
      category: 'Productividad',
      duration: '40 min',
      sessions: 10,
      status: 'Disponible',
      color: '#9c27b0'
    },
    {
      id: 5,
      title: 'Resolución de Conflictos',
      description: 'Aprende a manejar y resolver conflictos en el trabajo',
      category: 'Comunicación',
      duration: '50 min',
      sessions: 6,
      status: 'Disponible',
      color: '#0057ff'
    },
    {
      id: 6,
      title: 'Mindfulness en el Trabajo',
      description: 'Técnicas de mindfulness para mejorar el bienestar laboral',
      category: 'Bienestar',
      duration: '35 min',
      sessions: 20,
      status: 'Disponible',
      color: '#2ecc71'
    }
  ];

  // Categorías únicas
  const categories = ['Todos', ...new Set(toolkits.map(t => t.category))];

  // Filtrar toolkits
  const filteredToolkits = toolkits.filter(toolkit =>
    (selectedCategory === 'Todos' || toolkit.category === selectedCategory) &&
    (toolkit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     toolkit.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ marginTop: 32, marginBottom: 24 }}>
      <span style={{ color: '#222', fontWeight: 800, fontSize: 32, display: 'block', marginBottom: 24 }}>
        Toolkits de Desarrollo
      </span>

      {/* Estadísticas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 32 }}>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ color: '#2ecc71', fontWeight: 700, fontSize: 17 }}>{toolkits.length}</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Toolkits Disponibles</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>Recursos activos</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ color: '#0057ff', fontWeight: 800, fontSize: 17 }}>{toolkits.reduce((sum, t) => sum + t.sessions, 0)}</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Sesiones Totales</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>Accesos realizados</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ color: '#ff9800', fontWeight: 800, fontSize: 17 }}>{categories.length - 1}</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Categorías</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>Áreas de desarrollo</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ color: '#9c27b0', fontWeight: 800, fontSize: 17 }}>85%</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Tasa de Uso</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>Participación activa</div>
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Buscar toolkits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: '0.8rem 1.2rem',
            borderRadius: 12,
            border: '1.5px solid #e0e7ef',
            fontSize: 16,
            outline: 'none'
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '0.8rem 1.2rem',
            borderRadius: 12,
            border: '1.5px solid #e0e7ef',
            fontSize: 16,
            outline: 'none',
            background: '#fff',
            minWidth: 150
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Grid de toolkits */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
        {filteredToolkits.map((toolkit) => (
          <div key={toolkit.id} style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 2px 8px #e0e7ef',
            border: '1.5px solid #f2f2f2',
            overflow: 'hidden',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 4px 16px #e0e7ef';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px #e0e7ef';
          }}
          >
            {/* Header del toolkit */}
            <div style={{
              background: toolkit.color,
              color: '#fff',
              padding: '1.5rem',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontWeight: 700, fontSize: 20 }}>{toolkit.title}</h3>
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700
                }}>
                  {toolkit.status}
                </span>
              </div>
              <p style={{ margin: 0, opacity: 0.9, fontSize: 14, lineHeight: 1.4 }}>
                {toolkit.description}
              </p>
            </div>

            {/* Contenido del toolkit */}
            <div style={{ padding: '1.5rem' }}>
              {/* Información del toolkit */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{
                  background: '#f8f9fa',
                  color: '#7a8bbd',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600
                }}>
                  {toolkit.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ color: '#7a8bbd', fontSize: 14 }}>
                    <span style={{ fontWeight: 600 }}>⏱️</span> {toolkit.duration}
                  </span>
                  <span style={{ color: '#7a8bbd', fontSize: 14 }}>
                    <span style={{ fontWeight: 600 }}>👥</span> {toolkit.sessions} sesiones
                  </span>
                </div>
              </div>

              {/* Botón de acción */}
              <button style={{
                width: '100%',
                background: toolkit.color,
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '0.8rem',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
              >
                Aplicar Toolkit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje si no hay resultados */}
      {filteredToolkits.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#7a8bbd',
          fontSize: 18
        }}>
          No se encontraron toolkits que coincidan con tu búsqueda.
        </div>
      )}
    </div>
  );
};

export default BusinessToolkits;
