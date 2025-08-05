import React, { useState } from 'react';
import { BookOpen, FileText, Filter, Download, Star } from 'lucide-react';

/**
 * Categorías de recursos disponibles en la biblioteca
 * Permite organizar y filtrar recursos por tipo de contenido
 */
const categories = [
  { label: 'TCC', count: 3 },
  { label: 'Mindfulness', count: 2 },
  { label: 'Crisis', count: 3 },
];



/**
 * Datos de recursos de la biblioteca con enlaces reales a PDFs
 * Incluye artículos, manuales y materiales profesionales para psicólogos
 * Organizados por categorías: Artículos, Manuales y Mindfulness
 */
const resources = [
  // ARTÍCULOS
  {
    type: 'Artículo',
    category: 'TCC',
    icon: <FileText size={32} color="#6ea8fe" />,
    title: 'Terapia Cognitivo Conductual (TCC)',
    desc: 'Guía completa sobre TCC: fundamentos, técnicas y aplicación práctica',
    author: 'SEPSM',
    rating: 4.9,
    downloads: 2156,
    badge: { text: 'Artículo', color: '#e6f0ff', textColor: '#0057FF' },
    url: 'https://sepsm.org/wp-content/uploads/2022/06/TERAPIA_COGNITIVO_CONDUCTUAL.pdf'
  },
  {
    type: 'Artículo',
    category: 'TCC',
    icon: <FileText size={32} color="#6ea8fe" />,
    title: 'Técnicas Cognitivo-Conductuales Avanzadas',
    desc: 'Técnicas especializadas para el tratamiento de trastornos complejos',
    author: 'Behavioral Psycho',
    rating: 4.7,
    downloads: 1342,
    badge: { text: 'Artículo', color: '#e6f0ff', textColor: '#0057FF' },
    url: 'https://www.behavioralpsycho.com/wp-content/uploads/2020/04/06.Freeman_15-3oa.pdf'
  },
  {
    type: 'Artículo',
    category: 'TCC',
    icon: <FileText size={32} color="#6ea8fe" />,
    title: 'Técnicas Conductuales en Terapia',
    desc: 'Manual práctico de técnicas conductuales para psicólogos clínicos',
    author: 'Terapia Cognitiva MX',
    rating: 4.6,
    downloads: 987,
    badge: { text: 'Artículo', color: '#e6f0ff', textColor: '#0057FF' },
    url: 'https://www.terapia-cognitiva.mx/pdf_files/introduccion-terapia/clase12/TECNICAS_CONDUCTUALES.pdf'
  },
  
  // MANUALES
  {
    type: 'Manual',
    category: 'Crisis',
    icon: <BookOpen size={32} color="#6ea8fe" />,
    title: 'Intervención en Crisis y Contingencia',
    desc: 'Protocolo completo para manejo de crisis y situaciones de emergencia',
    author: 'Universidad de Guanajuato',
    rating: 4.8,
    downloads: 1456,
    badge: { text: 'Manual', color: '#f3e6ff', textColor: '#a259e6' },
    url: 'https://www.ugto.mx/ugentucasa/images/pdf/intervencion-crisis-intervencion-situacion-contingencia.pdf'
  },
  {
    type: 'Manual',
    category: 'Crisis',
    icon: <BookOpen size={32} color="#6ea8fe" />,
    title: 'Cuadernillo PAP - Prevención y Atención',
    desc: 'Guía para la prevención y atención de problemas psicológicos',
    author: 'Gobierno de México',
    rating: 4.5,
    downloads: 1123,
    badge: { text: 'Manual', color: '#f3e6ff', textColor: '#a259e6' },
    url: 'https://www.gob.mx/cms/uploads/attachment/file/959830/CUADERNILLO_PAP_R.pdf'
  },
  {
    type: 'Manual',
    category: 'Crisis',
    icon: <BookOpen size={32} color="#6ea8fe" />,
    title: 'Guía para Intervención en Crisis',
    desc: 'Protocolo especializado para intervención en situaciones críticas',
    author: 'SALME Jalisco',
    rating: 4.7,
    downloads: 892,
    badge: { text: 'Manual', color: '#f3e6ff', textColor: '#a259e6' },
    url: 'https://salme.jalisco.gob.mx/sites/salme.jalisco.gob.mx/files/guia_para_intervencion_en_crisis.pdf'
  },
  
  // MINDFULNESS
  {
    type: 'Mindfulness',
    category: 'Mindfulness',
    icon: <FileText size={32} color="#6ea8fe" />,
    title: 'Mindfulness en la Práctica Clínica',
    desc: 'Aplicación de técnicas de mindfulness en terapia psicológica',
    author: 'Universidad Autónoma de Tamaulipas',
    rating: 4.6,
    downloads: 756,
    badge: { text: 'Mindfulness', color: '#e6fff0', textColor: '#059669' },
    url: 'https://libros.uat.edu.mx/index.php/librosuat/catalog/download/334/322/1224?inline=1'
  },
  {
    type: 'Mindfulness',
    category: 'Mindfulness',
    icon: <FileText size={32} color="#6ea8fe" />,
    title: 'Mindfulness y Bienestar Psicológico',
    desc: 'Estudio sobre la efectividad del mindfulness en el bienestar mental',
    author: 'Redalyc',
    rating: 4.4,
    downloads: 634,
    badge: { text: 'Mindfulness', color: '#e6fff0', textColor: '#059669' },
    url: 'https://www.redalyc.org/pdf/2351/235131674032.pdf'
  }
];

/**
 * Componente de Biblioteca del Psicólogo
 * Proporciona acceso a recursos profesionales, artículos y manuales
 * Permite buscar, filtrar y descargar materiales para la práctica clínica
 */
const PsychologistLibrary = () => {
  // Estados para controlar filtros y búsqueda
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  /**
   * Función para descargar un PDF desde una URL
   * Abre el PDF en una nueva pestaña para descarga
   * 
   * @param {string} url - URL del PDF a descargar
   * @param {string} title - Título del documento para el nombre del archivo
   */
  const downloadPDF = (url, title) => {
    try {
      // Crear un enlace temporal para descargar el PDF
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = `${title}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      // Si falla la descarga directa, abrir en nueva pestaña
      window.open(url, '_blank');
    }
  };

  /**
   * Filtra los recursos según la búsqueda y categoría seleccionada
   */
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase()) ||
                         resource.desc.toLowerCase().includes(search.toLowerCase()) ||
                         resource.author.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todas' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* ========================================
           ENCABEZADO DE LA BIBLIOTECA
           ======================================== */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ color: '#222', fontWeight: 800, fontSize: 32 }}>Biblioteca</div>
        <div style={{ color: '#7a8bbd', fontSize: 16, marginTop: 2 }}>Recursos y materiales profesionales</div>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        {/* ========================================
             PANEL DE CATEGORÍAS
             ======================================== */}
        <div style={{ minWidth: 220, maxWidth: 260 }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '2rem 1.5rem' }}>
            {/* Título de la sección de categorías */}
            <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 18 }}>Categorías</div>
            {/* Lista de categorías con contadores */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div 
                onClick={() => setSelectedCategory('Todas')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  fontSize: 16, 
                  color: selectedCategory === 'Todas' ? '#0057FF' : '#222', 
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 8,
                  background: selectedCategory === 'Todas' ? '#e6f0ff' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                Todas
                <span style={{ background: '#f3e6e0', color: '#b97a56', fontWeight: 700, fontSize: 15, borderRadius: 12, padding: '0.2rem 0.9rem', marginLeft: 8 }}>
                  {resources.length}
                </span>
              </div>
              {categories.map(cat => (
                <div 
                  key={cat.label} 
                  onClick={() => setSelectedCategory(cat.label)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    fontSize: 16, 
                    color: selectedCategory === cat.label ? '#0057FF' : '#222', 
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: 8,
                    background: selectedCategory === cat.label ? '#e6f0ff' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat.label}
                  <span style={{ background: '#f3e6e0', color: '#b97a56', fontWeight: 700, fontSize: 15, borderRadius: 12, padding: '0.2rem 0.9rem', marginLeft: 8 }}>{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Contenido principal */}
        <div style={{ flex: 1 }}>
          {/* Barra de búsqueda y filtros */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar recursos..."
              style={{ flex: 1, background: '#fff', border: '1.5px solid #e0e7ef', borderRadius: 16, padding: '0.7rem 1.5rem', fontSize: 16, color: '#222', outline: 'none' }}
            />
            <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff', color: '#222', border: '1.5px solid #e0e7ef', borderRadius: 16, padding: '0.7rem 1.2rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
              <Filter size={20} /> Filtros
            </button>
          </div>
          
          {/* Lista de recursos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {filteredResources.length > 0 ? (
              filteredResources.map((r, idx) => (
                <div key={idx} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#e6f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {r.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>{r.title}</div>
                      <div style={{ color: '#7a8bbd', fontSize: 15, marginBottom: 4 }}>{r.desc}</div>
                      <div style={{ color: '#7a8bbd', fontSize: 15, marginBottom: 4 }}>Por {r.author}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#7a8bbd', fontSize: 15 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={16} color="#ffd966" /> {r.rating}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Download size={16} /> {r.downloads}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                    <span style={{ background: r.badge.color, color: r.badge.textColor, fontWeight: 700, fontSize: 14, borderRadius: 8, padding: '0.2rem 1rem' }}>{r.badge.text}</span>
                    <button 
                      onClick={() => downloadPDF(r.url, r.title)}
                      style={{ 
                        background: '#fff', 
                        color: '#0057FF', 
                        border: '1.5px solid #e0e7ef', 
                        borderRadius: 12, 
                        padding: '0.5rem 1.2rem', 
                        fontWeight: 600, 
                        fontSize: 15, 
                        cursor: 'pointer', 
                        boxShadow: '0 2px 8px #e0e7ef', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 6,
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#0057FF';
                        e.target.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#fff';
                        e.target.style.color = '#0057FF';
                      }}
                    >
                      <Download size={16} /> Descargar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                background: '#fff', 
                borderRadius: 18, 
                boxShadow: '0 2px 8px #e0e7ef', 
                padding: '3rem 2rem', 
                textAlign: 'center',
                color: '#7a8bbd',
                fontSize: 16
              }}>
                No se encontraron recursos que coincidan con tu búsqueda.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistLibrary; 