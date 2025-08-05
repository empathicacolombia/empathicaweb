import React, { useState } from 'react';
import { FileText, Calendar, TrendingUp, Download, Eye, DollarSign, Clock, User } from 'lucide-react';

/**
 * Métricas financieras del psicólogo
 * Muestra estadísticas clave de ingresos, consultas y rendimiento
 */
const metrics = [
  { label: 'Consultas este mes', value: '25', icon: <Calendar size={22} />, change: '+8 vs mes anterior', color: '#0057FF' },
  { label: 'Ingresos totales', value: '$12,500', icon: <DollarSign size={22} />, change: '+15% vs mes anterior', color: '#2ecc71' },
  { label: 'Promedio por consulta', value: '$500', icon: <TrendingUp size={22} />, change: '+5% vs mes anterior', color: '#a259e6' },
  { label: 'Horas de terapia', value: '20.8h', icon: <Clock size={22} />, change: '+12% vs mes anterior', color: '#6ea8fe' },
];

/**
 * Pestañas disponibles para la sección de facturación
 * Permite alternar entre historial y estadísticas
 */
const tabs = ['Historial', 'Estadísticas'];

/**
 * Precios fijos por tipo de consulta
 * Define las tarifas estándar para diferentes servicios
 * TODO: Hacer configurable desde el backend
 */
const consultationPrices = {
  'Virtual': 450,
  'Evaluación': 600,
  'Seguimiento': 400,
  'Crisis': 700
};

/**
 * Datos de ejemplo del historial de consultas facturadas
 * Incluye información completa de sesiones, precios y estado de pago
 * TODO: Reemplazar con datos dinámicos del backend
 */
const consultationHistory = [
  {
    id: 'CONS-001',
    patientName: 'Ana García',
    date: '2024-07-15',
    time: '15:00',
    duration: '50 min',
    type: 'Virtual',
    price: 450,
    status: 'Completada',
    notes: 'Sesión de TCC para manejo de ansiedad'
  },
  {
    id: 'CONS-002',
    patientName: 'Carlos Mendoza',
    date: '2024-07-14',
    time: '10:30',
    duration: '45 min',
    type: 'Virtual',
    price: 450,
    status: 'Completada',
    notes: 'Continuación de terapia de autoestima'
  },
  {
    id: 'CONS-003',
    patientName: 'María López',
    date: '2024-07-13',
    time: '16:00',
    duration: '60 min',
    type: 'Evaluación',
    price: 600,
    status: 'Completada',
    notes: 'Evaluación psicológica inicial'
  },
  {
    id: 'CONS-004',
    patientName: 'Pedro Ruiz',
    date: '2024-07-12',
    time: '14:00',
    duration: '50 min',
    type: 'Virtual',
    price: 450,
    status: 'Completada',
    notes: 'Sesión de mindfulness y relajación'
  },
  {
    id: 'CONS-005',
    patientName: 'Laura Sánchez',
    date: '2024-07-11',
    time: '11:00',
    duration: '45 min',
    type: 'Virtual',
    price: 450,
    status: 'Completada',
    notes: 'Trabajo en técnicas de comunicación'
  },
  {
    id: 'CONS-006',
    patientName: 'Diego Fernández',
    date: '2024-07-10',
    time: '17:30',
    duration: '50 min',
    type: 'Virtual',
    price: 450,
    status: 'Completada',
    notes: 'Sesión de terapia cognitivo-conductual'
  },
  {
    id: 'CONS-007',
    patientName: 'Patricia Morales',
    date: '2024-07-09',
    time: '09:00',
    duration: '60 min',
    type: 'Crisis',
    price: 700,
    status: 'Completada',
    notes: 'Intervención en crisis - manejo de emergencia'
  },
  {
    id: 'CONS-008',
    patientName: 'Roberto Jiménez',
    date: '2024-07-08',
    time: '13:00',
    duration: '45 min',
    type: 'Seguimiento',
    price: 400,
    status: 'Completada',
    notes: 'Seguimiento de progreso en terapia'
  }
];

/**
 * Componente de Facturación del Psicólogo
 * Gestiona el historial de consultas, ingresos y estadísticas financieras
 * Permite descargar reportes y analizar el rendimiento económico
 */
const PsychologistBilling = () => {
  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState('Historial');

  /**
   * Maneja la descarga del historial de consultas
   * TODO: Implementar generación de reportes PDF/CSV
   */
  const handleDownloadHistory = () => {
    // Función para descargar el historial como CSV o PDF
    console.log('Descargando historial de consultas...');
    // Aquí se implementaría la lógica de descarga
  };

  /**
   * Calcula el ingreso total de todas las consultas
   * 
   * @returns {number} Ingreso total en pesos
   */
  const getTotalIncome = () => {
    return consultationHistory.reduce((total, consultation) => total + consultation.price, 0);
  };

  /**
   * Agrupa las consultas por tipo para análisis estadístico
   * 
   * @returns {Object} Objeto con conteo de consultas por tipo
   */
  const getConsultationsByType = () => {
    const types = {};
    consultationHistory.forEach(consultation => {
      types[consultation.type] = (types[consultation.type] || 0) + 1;
    });
    return types;
  };

  return (
    <div>
      {/* Título y subtítulo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 32 }}>Historial de Consultas</div>
          <div style={{ color: '#7a8bbd', fontSize: 16, marginTop: 2 }}>Registro de sesiones y precios</div>
        </div>
        <button 
          onClick={handleDownloadHistory}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8, 
            background: '#0057FF', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 16, 
            padding: '0.7rem 1.5rem', 
            fontWeight: 600, 
            fontSize: 16, 
            cursor: 'pointer', 
            boxShadow: '0 2px 8px #0057ff22' 
          }}
        >
          <Download size={20} /> Descargar Historial
        </button>
      </div>

      {/* Métricas superiores */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        {metrics.map((m, idx) => (
          <div key={idx} style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e7ef', padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: m.color, fontWeight: 700, fontSize: 18 }}>{m.icon} {m.value}</div>
            <div style={{ color: '#7a8bbd', fontWeight: 700, fontSize: 15 }}>{m.label}</div>
            <div style={{ color: '#2ecc71', fontSize: 14, fontWeight: 600 }}>{m.change}</div>
          </div>
        ))}
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

      {/* Historial de consultas */}
      {activeTab === 'Historial' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>Consultas Recientes</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: 14, color: '#666' }}>Total: ${getTotalIncome()}</span>
            </div>
          </div>

          {/* Tabla de precios */}
          <div style={{ 
            background: '#f8f9fa', 
            borderRadius: 12, 
            padding: '1.5rem', 
            marginBottom: '24px',
            border: '1px solid #e0e7ef'
          }}>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 600, 
              color: '#333', 
              margin: '0 0 1rem 0' 
            }}>
              Precios por Tipo de Consulta
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {Object.entries(consultationPrices).map(([type, price]) => (
                <div key={type} style={{
                  background: '#fff',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e7ef',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{type}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#0057FF' }}>${price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de consultas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {consultationHistory.map((consultation, idx) => (
              <div key={idx} style={{ 
                background: '#fff', 
                borderRadius: 18, 
                boxShadow: '0 2px 8px #e0e7ef', 
                padding: '1.5rem 2rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 24, 
                justifyContent: 'space-between' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div style={{ 
                    width: 56, 
                    height: 56, 
                    borderRadius: '50%', 
                    background: '#e6f0ff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <User size={32} color="#6ea8fe" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>{consultation.patientName}</div>
                    <div style={{ color: '#7a8bbd', fontSize: 15, marginBottom: 4 }}>{consultation.notes}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: '#7a8bbd', fontSize: 15 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={16} /> {consultation.date}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={16} /> {consultation.time} ({consultation.duration})
                      </span>
                      <span style={{
                        background: '#f0f4ff',
                        color: '#0057FF',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: 12,
                        fontWeight: 600
                      }}>
                        {consultation.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                  <span style={{ color: '#0057FF', fontWeight: 800, fontSize: 20 }}>
                    ${consultation.price}
                  </span>
                  <span style={{ 
                    background: '#e6ffe6', 
                    color: '#2ecc71', 
                    fontWeight: 700, 
                    fontSize: 14, 
                    borderRadius: 8, 
                    padding: '0.2rem 1rem' 
                  }}>
                    {consultation.status}
                  </span>
                  <span style={{ 
                    fontSize: 12, 
                    color: '#666',
                    fontWeight: 500
                  }}>
                    {consultation.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estadísticas */}
      {activeTab === 'Estadísticas' && (
        <div>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 18 }}>
            Estadísticas de Consultas
          </div>
          
          {/* Resumen por tipo */}
          <div style={{ 
            background: '#fff', 
            borderRadius: 16, 
            boxShadow: '0 2px 8px #e0e7ef', 
            padding: '2rem',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', margin: '0 0 1.5rem 0' }}>
              Consultas por Tipo
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {Object.entries(getConsultationsByType()).map(([type, count]) => (
                <div key={type} style={{
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e7ef',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{type}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#0057FF' }}>{count}</span>
                    <span style={{ fontSize: 12, color: '#666' }}>${count * consultationPrices[type]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen financiero */}
          <div style={{ 
            background: '#fff', 
            borderRadius: 16, 
            boxShadow: '0 2px 8px #e0e7ef', 
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#333', margin: '0 0 1.5rem 0' }}>
              Resumen Financiero
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div style={{
                background: '#f0f9ff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #bae6fd'
              }}>
                <div style={{ fontSize: 14, color: '#0057FF', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Ingresos Totales
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#0057FF' }}>
                  ${getTotalIncome()}
                </div>
              </div>
              <div style={{
                background: '#f0fdf4',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #bbf7d0'
              }}>
                <div style={{ fontSize: 14, color: '#16a34a', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Total Consultas
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#16a34a' }}>
                  {consultationHistory.length}
                </div>
              </div>
              <div style={{
                background: '#fef3c7',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #fde68a'
              }}>
                <div style={{ fontSize: 14, color: '#92400e', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Promedio por Consulta
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#92400e' }}>
                  ${Math.round(getTotalIncome() / consultationHistory.length)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologistBilling; 