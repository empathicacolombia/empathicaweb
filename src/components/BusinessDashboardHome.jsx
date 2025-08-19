import React from 'react';
import {
  Smile,
  Calendar,
  Users,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const BusinessDashboardHome = ({ navigationProps }) => {
  return (
    <div style={{ marginTop: 24, marginBottom: 24 }}>
      {/* Tarjetas de métricas principales */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 18 }}>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Smile size={26} color="#2ecc71" />
          <div style={{ color: '#2ecc71', fontWeight: 700, fontSize: 17 }}>78%</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Estado Emocional General</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>Bienestar promedio</div>
          <span style={{ color: '#7a8bbd', fontSize: 10, marginTop: 6 }}>Live</span>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Calendar size={26} color="#6ea8fe" />
          <div style={{ color: '#0057FF', fontWeight: 800, fontSize: 17 }}>1,247</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Sesiones Utilizadas</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>de 1,560 disponibles</div>
          <span style={{ color: '#7a8bbd', fontSize: 10, marginTop: 6 }}>Live</span>
        </div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Users size={26} color="#ffb300" />
          <div style={{ color: '#ff7043', fontWeight: 800, fontSize: 17 }}>490</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Colaboradores Activos</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>de 520 empleados</div>
          <span style={{ color: '#7a8bbd', fontSize: 10, marginTop: 6 }}>Live</span>
        </div>
      </div>

      {/* Segunda fila de métricas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 18, marginBottom: 18 }}>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px #e0e7ef', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <AlertTriangle size={26} color="#ffb3b3" />
          <div style={{ color: '#ff5e5e', fontWeight: 800, fontSize: 17 }}>156</div>
          <div style={{ color: '#222', fontWeight: 700, fontSize: 13 }}>Reportan Estrés</div>
          <div style={{ color: '#7a8bbd', fontSize: 12 }}>30% de empleados activos</div>
          <span style={{ color: '#7a8bbd', fontSize: 10, marginTop: 6 }}>Live</span>
        </div>
      </div>

      {/* Mapeo Emocional por Áreas */}
      <div style={{ display: 'flex', gap: 24, marginTop: 32, alignItems: 'flex-start' }}>
        {/* Columna principal: tarjetas de áreas */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
            <span style={{ color: '#2050c7', fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={20} style={{marginRight: 4}}/> Mapeo Emocional por Áreas
            </span>
          </div>
          
          {/* Tarjetas de áreas */}
          {[
            {
              color: '#ff4444',
              label: 'Ventas',
              status: { text: 'Alto', color: '#0057ff', bg: '#e6f0ff' },
              empleados: 85,
              porcentaje: 28,
              comentario: '24 empleados reportan estrés laboral',
            },
            {
              color: '#ff4444',
              label: 'Marketing',
              status: { text: 'Crítico', color: '#fff', bg: '#ff4444' },
              empleados: 78,
              porcentaje: 45,
              comentario: '35 empleados mencionan falta de comunicación',
            },
            {
              color: '#ff4444',
              label: 'Tecnología',
              status: { text: 'Alto', color: '#0057ff', bg: '#e6f0ff' },
              empleados: 95,
              porcentaje: 44,
              comentario: '42 empleados reportan estrés crítico',
            },
            {
              color: '#2ecc71',
              label: 'Recursos Humanos',
              status: { text: 'Bajo', color: '#666', bg: '#e6f7e6' },
              empleados: 52,
              porcentaje: 19,
              comentario: '10 empleados con falta de comunicación',
            },
            {
              color: '#ff9800',
              label: 'Finanzas',
              status: { text: 'Medio', color: '#fff', bg: '#ff9800' },
              empleados: 65,
              porcentaje: 23,
              comentario: '15 empleados mencionan falta de liderazgo',
            },
            {
              color: '#ff6b6b',
              label: 'Operaciones',
              status: { text: 'Alto', color: '#0057ff', bg: '#e6f0ff' },
              empleados: 88,
              porcentaje: 28,
              comentario: '25 empleados con estrés laboral elevado',
            },
            {
              color: '#2ecc71',
              label: 'Otros',
              status: { text: 'Bajo', color: '#666', bg: '#f2f2f2' },
              empleados: 47,
              porcentaje: 15,
              comentario: '7 empleados con problemas menores',
            },
          ].map((area, index) => (
            <div key={index} style={{
              background: '#fff',
              borderRadius: 16,
              padding: '1.5rem',
              boxShadow: '0 2px 8px #e0e7ef',
              border: '1.5px solid #f2f2f2',
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}>
              {/* Indicador de color */}
              <div style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: area.color,
                flexShrink: 0
              }} />
              
              {/* Información del área */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ color: '#222', fontWeight: 700, fontSize: 18 }}>{area.label}</span>
                  <span style={{
                    background: area.status.bg,
                    color: area.status.color,
                    padding: '0.3rem 0.8rem',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 700
                  }}>
                    {area.status.text}
                  </span>
                </div>
                <div style={{ color: '#7a8bbd', fontSize: 14, marginBottom: 4 }}>
                  {area.empleados} empleados • {area.porcentaje}% reportan problemas
                </div>
                <div style={{ color: '#666', fontSize: 13, fontStyle: 'italic' }}>
                  {area.comentario}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Columna lateral: gráfico de bienestar */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 18, padding: '2rem', boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2' }}>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 20, marginBottom: 24 }}>
            Bienestar por Departamento
          </div>
          
          {[
            { dept: 'RRHH', value: 85, color: '#2ecc71' },
            { dept: 'Finanzas', value: 72, color: '#ff9800' },
            { dept: 'Operaciones', value: 68, color: '#ff6b6b' },
            { dept: 'Ventas', value: 65, color: '#ff4444' },
            { dept: 'Marketing', value: 58, color: '#ff4444' },
            { dept: 'Tecnología', value: 52, color: '#ff4444' },
          ].map((item, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: '#222', fontWeight: 600, fontSize: 14 }}>{item.dept}</span>
                <span style={{ color: item.color, fontWeight: 700, fontSize: 14 }}>{item.value}%</span>
              </div>
              <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  width: `${item.value}%`,
                  height: '100%',
                  background: item.color,
                  borderRadius: 4
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardHome;
