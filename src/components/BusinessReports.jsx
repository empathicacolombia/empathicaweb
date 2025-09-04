import React, { useState } from 'react';

const BusinessReports = ({ navigationProps }) => {
  const [reportTab, setReportTab] = useState('Estrés');

  return (
    <div style={{ marginTop: 32, marginBottom: 24 }}>
      <span style={{ color: '#222', fontWeight: 800, fontSize: 32, display: 'block', marginBottom: 24 }}>
        Reportes y Análisis
      </span>
      
      {/* Análisis por Categorías */}
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '2rem 2.5rem', marginBottom: 32, border: '1.5px solid #f2f2f2' }}>
        <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginBottom: 18 }}>
          Análisis por Categorías
        </div>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 18 }}>
          {['Comunicación', 'Estrés', 'Liderazgo', 'General'].map((t, idx) => (
            <button key={t} onClick={() => setReportTab(t)} style={{
              flex: 1,
              background: reportTab === t ? '#fff' : '#f2f2f2',
              color: reportTab === t ? '#2050c7' : '#7a8bbd',
              fontWeight: 700,
              fontSize: 18,
              borderRadius: idx === 0 ? '12px 0 0 12px' : idx === 3 ? '0 12px 12px 0' : 0,
              padding: '0.7rem 0',
              textAlign: 'center',
              cursor: 'pointer',
              border: reportTab === t ? '2.5px solid #2050c7' : '1.5px solid #f2f2f2',
              borderRight: idx < 3 ? 'none' : undefined,
              outline: 'none',
              transition: 'border 0.2s',
            }}>
              {t}
            </button>
          ))}
        </div>

        {/* Contenido de las tabs */}
        {reportTab === 'Estrés' && (
          <div style={{ display: 'flex', gap: 24 }}>
            {/* Barras de progreso por área */}
            <div style={{ flex: 2 }}>
              <div style={{ color: '#222', fontWeight: 600, fontSize: 17, marginBottom: 10 }}>
                Reducción de Estrés por Área
              </div>
              {[
                { area: 'Tecnología', value: 0 },
                { area: 'Ventas', value: 0 },
                { area: 'Operaciones', value: 0 },
                { area: 'Finanzas', value: 0 },
              ].map(row => (
                <div key={row.area} style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18, background: '#fff', borderRadius: 18, padding: '0.7rem 1.2rem' }}>
                  <span style={{ color: '#222', fontWeight: 700, fontSize: 17, width: 110 }}>{row.area}</span>
                  <div style={{ flex: 1, height: 12, background: '#e0e7ef', borderRadius: 8, overflow: 'hidden', marginRight: 8 }}>
                    <div style={{ width: `${Math.abs(row.value)}%`, height: '100%', background: '#2ecc71', borderRadius: 8 }}></div>
                  </div>
                  <span style={{ color: '#2ecc71', fontWeight: 700, fontSize: 17 }}>{row.value}%</span>
                </div>
              ))}
            </div>
            
            {/* Beneficios Observados */}
            <div style={{ flex: 1, background: '#f6fff6', borderRadius: 16, padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
              <div style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
                Beneficios Observados
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Ausentismo</span>
                <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Rotación</span>
                <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Productividad</span>
                <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
            </div>
          </div>
        )}

        {reportTab === 'Comunicación' && (
          <div style={{ display: 'flex', gap: 24 }}>
            {/* Barras de progreso por área */}
            <div style={{ flex: 2 }}>
              <div style={{ color: '#222', fontWeight: 600, fontSize: 17, marginBottom: 10 }}>
                Mejoras en Comunicación Asertiva por Área
              </div>
              {[
                { area: 'Ventas', value: 0 },
                { area: 'Marketing', value: 0 },
                { area: 'RRHH', value: 0 },
                { area: 'Finanzas', value: 0 },
              ].map(row => (
                <div key={row.area} style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18, background: '#fff', borderRadius: 18, padding: '0.7rem 1.2rem' }}>
                  <span style={{ color: '#222', fontWeight: 700, fontSize: 17, width: 110 }}>{row.area}</span>
                  <div style={{ flex: 1, height: 12, background: '#e0e7ef', borderRadius: 8, overflow: 'hidden', marginRight: 8 }}>
                    <div style={{ width: `${row.value}%`, height: '100%', background: '#2050c7', borderRadius: 8 }}></div>
                  </div>
                  <span style={{ color: '#0057ff', fontWeight: 700, fontSize: 17 }}>+{row.value}%</span>
                </div>
              ))}
            </div>
            
            {/* Impacto General */}
            <div style={{ flex: 1, background: '#f6f8ff', borderRadius: 16, padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
              <div style={{ color: '#2050c7', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
                Impacto General
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Conflictos resueltos</span>
                <span style={{ color: '#0057ff', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Satisfacción laboral</span>
                <span style={{ color: '#0057ff', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Trabajo en equipo</span>
                <span style={{ color: '#0057ff', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
            </div>
          </div>
        )}

        {reportTab === 'Liderazgo' && (
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 2 }}>
              <div style={{ color: '#222', fontWeight: 600, fontSize: 17, marginBottom: 10 }}>
                Mejoras en Liderazgo por Área
              </div>
              {[
                { area: 'Tecnología', value: 0 },
                { area: 'Ventas', value: 0 },
                { area: 'Marketing', value: 0 },
                { area: 'RRHH', value: 0 },
              ].map(row => (
                <div key={row.area} style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18, background: '#fff', borderRadius: 18, padding: '0.7rem 1.2rem' }}>
                  <span style={{ color: '#222', fontWeight: 700, fontSize: 17, width: 110 }}>{row.area}</span>
                  <div style={{ flex: 1, height: 12, background: '#e0e7ef', borderRadius: 8, overflow: 'hidden', marginRight: 8 }}>
                    <div style={{ width: `${row.value}%`, height: '100%', background: '#ff9800', borderRadius: 8 }}></div>
                  </div>
                  <span style={{ color: '#ff9800', fontWeight: 700, fontSize: 17 }}>+{row.value}%</span>
                </div>
              ))}
            </div>
            
            <div style={{ flex: 1, background: '#fff8e1', borderRadius: 16, padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
              <div style={{ color: '#ff9800', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
                Métricas de Liderazgo
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Retención de talento</span>
                <span style={{ color: '#ff9800', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Engagement</span>
                <span style={{ color: '#ff9800', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Innovación</span>
                <span style={{ color: '#ff9800', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
            </div>
          </div>
        )}

        {reportTab === 'General' && (
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 2 }}>
              <div style={{ color: '#222', fontWeight: 600, fontSize: 17, marginBottom: 10 }}>
                Resumen General de Bienestar
              </div>
              {[
                { metric: 'Satisfacción general', value: 0, color: '#2ecc71' },
                { metric: 'Clima laboral', value: 0, color: '#2ecc71' },
                { metric: 'Productividad', value: 0, color: '#2ecc71' },
                { metric: 'Colaboración', value: 0, color: '#2ecc71' },
              ].map(row => (
                <div key={row.metric} style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18, background: '#fff', borderRadius: 18, padding: '0.7rem 1.2rem' }}>
                  <span style={{ color: '#222', fontWeight: 700, fontSize: 17, width: 150 }}>{row.metric}</span>
                  <div style={{ flex: 1, height: 12, background: '#e0e7ef', borderRadius: 8, overflow: 'hidden', marginRight: 8 }}>
                    <div style={{ width: `${row.value}%`, height: '100%', background: row.color, borderRadius: 8 }}></div>
                  </div>
                  <span style={{ color: row.color, fontWeight: 700, fontSize: 17 }}>{row.value}%</span>
                </div>
              ))}
            </div>
            
            <div style={{ flex: 1, background: '#f8f9fa', borderRadius: 16, padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
              <div style={{ color: '#222', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
                Indicadores Clave
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>ROI del programa</span>
                <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18 }}>0:1</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Reducción de costos</span>
                <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                <span>Mejora en KPIs</span>
                <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18 }}>0%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessReports;
