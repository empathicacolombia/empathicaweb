import React, { useState } from 'react';
import { BookOpen, FileText, Filter, Download, Star } from 'lucide-react';

/**
 * Categorías de recursos disponibles en la biblioteca
 * Permite organizar y filtrar recursos por tipo de contenido
 */
const categories = [
  { label: 'TCC', count: 12 },
  { label: 'Mindfulness', count: 8 },
  { label: 'Crisis', count: 5 },
  { label: 'Casos', count: 15 },
  { label: 'Técnicas', count: 20 },
];

/**
 * Pestañas disponibles para filtrar recursos
 * Permite ver todos los recursos o filtrar por tipo específico
 */
const tabs = ['Todos', 'Artículos', 'Manuales'];

/**
 * Datos de ejemplo de recursos de la biblioteca
 * Incluye artículos, manuales y materiales profesionales para psicólogos
 * TODO: Reemplazar con datos dinámicos del backend
 */
const resources = [
  {
    type: 'Artículo',
    icon: <FileText size={32} color="#6ea8fe" />,
    title: 'Técnicas de Terapia Cognitivo-Conductual',
    desc: 'Guía completa sobre técnicas avanzadas de TCC para tratamiento de ansiedad',
    author: 'Dr. María Rodríguez',
    rating: 4.8,
    downloads: 1234,
    badge: { text: 'Artículo', color: '#e6f0ff', textColor: '#0057FF' },
  },
  {
    type: 'Manual',
    icon: <BookOpen size={32} color="#6ea8fe" />,
    title: 'Manual de Intervención en Crisis',
    desc: 'Protocolo completo para manejo de situaciones de crisis',
    author: 'Dr. Pedro Ruiz',
    rating: 4.6,
    downloads: 567,
    badge: { text: 'Manual', color: '#f3e6ff', textColor: '#a259e6' },
  },
  {
    type: 'Artículo',
    icon: <FileText size={32} color="#6ea8fe" />,
    title: 'Mindfulness en la Práctica Clínica',
    desc: 'Aplicación práctica de técnicas de mindfulness en terapia',
    author: 'Dra. Ana García',
    rating: 4.7,
    downloads: 892,
    badge: { text: 'Artículo', color: '#e6f0ff', textColor: '#0057FF' },
  },
  {
    type: 'Manual',
    icon: <BookOpen size={32} color="#6ea8fe" />,
    title: 'Guía de Evaluación Psicológica',
    desc: 'Protocolos y herramientas para evaluación psicológica integral',
    author: 'Dr. Carlos Mendoza',
    rating: 4.9,
    downloads: 445,
    badge: { text: 'Manual', color: '#f3e6ff', textColor: '#a259e6' },
  },
  {
    type: 'Artículo',
    icon: <FileText size={32} color="#6ea8fe" />,
    title: 'Terapia de Aceptación y Compromiso (ACT)',
    desc: 'Fundamentos y aplicación práctica de ACT en consulta',
    author: 'Dr. Luis Fernández',
    rating: 4.5,
    downloads: 678,
    badge: { text: 'Artículo', color: '#e6f0ff', textColor: '#0057FF' },
  },
  {
    type: 'Manual',
    icon: <BookOpen size={32} color="#6ea8fe" />,
    title: 'Protocolo de Intervención en Trauma',
    desc: 'Enfoques terapéuticos para el tratamiento del trauma psicológico',
    author: 'Dra. Patricia Morales',
    rating: 4.8,
    downloads: 334,
    badge: { text: 'Manual', color: '#f3e6ff', textColor: '#a259e6' },
  },
];

/**
 * Componente de Biblioteca del Psicólogo
 * Proporciona acceso a recursos profesionales, artículos y manuales
 * Permite buscar, filtrar y descargar materiales para la práctica clínica
 */
const PsychologistLibrary = () => {
  // Estados para controlar filtros y búsqueda
  const [activeTab, setActiveTab] = useState('Todos');
  const [search, setSearch] = useState('');

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
              {categories.map(cat => (
                <div key={cat.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 16, color: '#222', fontWeight: 600 }}>
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
          {/* Tabs internos */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: activeTab === tab ? '#fff' : 'transparent',
                color: activeTab === tab ? '#0057FF' : '#7a8bbd',
                border: activeTab === tab ? '2px solid #0057FF' : 'none',
                borderRadius: activeTab === tab ? 16 : 0,
                fontWeight: 700,
                fontSize: 18,
                padding: '0.7rem 2.2rem',
                marginRight: 4,
                boxShadow: activeTab === tab ? '0 2px 8px #e0e7ef' : 'none',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s',
              }}>{tab}</button>
            ))}
          </div>
          {/* Lista de recursos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {resources.map((r, idx) => (
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
                  <button style={{ background: '#fff', color: '#0057FF', border: '1.5px solid #e0e7ef', borderRadius: 12, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px #e0e7ef', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Download size={16} /> Descargar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistLibrary; 