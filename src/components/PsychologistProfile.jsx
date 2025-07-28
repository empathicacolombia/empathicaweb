import React, { useState } from 'react';
import { Mail, Phone, IdCard, Calendar, Edit2, Camera } from 'lucide-react';

const stats = [
  { label: 'Años de experiencia', value: 8 },
  { label: 'Pacientes atendidos', value: '150+' },
  { label: 'Sesiones completadas', value: '2,500+' },
  { label: 'Calificación promedio', value: '4.9/5' },
];

const PsychologistProfile = () => {
  const [activeTab, setActiveTab] = useState('Información');

  return (
    <div>
      {/* Título y botón */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 32 }}>Mi Perfil</div>
          <div style={{ color: '#7a8bbd', fontSize: 16, marginTop: 2 }}>Gestiona tu información profesional</div>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0057FF', color: '#fff', border: 'none', borderRadius: 16, padding: '0.7rem 1.5rem', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #0057ff22' }}>
          <Edit2 size={20} /> Editar perfil
        </button>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Card principal */}
        <div style={{ minWidth: 340, maxWidth: 380 }}>
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '2rem 1.5rem', marginBottom: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ position: 'relative', width: 90, height: 90, marginBottom: 8 }}>
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Foto perfil" style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 2px 8px #e0e7ef' }} />
                <span style={{ position: 'absolute', bottom: 0, right: 0, background: '#0057FF', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', cursor: 'pointer' }}>
                  <Camera size={16} color="#fff" />
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 20, color: '#222' }}>Dr. valentina prueba</div>
              <div style={{ color: '#7a8bbd', fontSize: 15, marginBottom: 4 }}>soy prueba</div>
              <span style={{ background: '#e6ffe6', color: '#2ecc71', fontWeight: 700, fontSize: 14, borderRadius: 8, padding: '0.2rem 1rem', marginBottom: 8 }}>Perfil aprobado</span>
            </div>
            <div style={{ marginTop: 18, marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#7a8bbd', fontSize: 15 }}><Mail size={18} /> prueba3@gmail.com</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#7a8bbd', fontSize: 15 }}><Phone size={18} /> 3004929342</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#7a8bbd', fontSize: 15 }}><IdCard size={18} /> Cédula: 3239923</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#7a8bbd', fontSize: 15 }}><Calendar size={18} /> Miembro desde 2020</div>
            </div>
          </div>
          {/* Estadísticas */}
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 1.5rem', marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 12 }}>Estadísticas</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stats.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#7a8bbd', fontSize: 15 }}>
                  <span>{s.label}</span>
                  <span style={{ color: '#222', fontWeight: 700 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Panel derecho */}
        <div style={{ flex: 1 }}>
          {/* Tabs internos */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
            {['Información', 'Especialidades', 'Configuración'].map(tab => (
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
          {/* Paneles de información */}
          {activeTab === 'Información' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 10 }}>Información Personal</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#222', fontSize: 16 }}>
                  <div>
                    <div><b>Nombre</b><br />valentina</div>
                    <div style={{ marginTop: 12 }}><b>Email</b><br />prueba3@gmail.com</div>
                  </div>
                  <div>
                    <div><b>Apellido</b><br />prueba</div>
                    <div style={{ marginTop: 12 }}><b>Teléfono</b><br />3004929342</div>
                  </div>
                </div>
              </div>
              <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 10 }}>Descripción Profesional</div>
                <div style={{ color: '#222', fontSize: 16 }}>soy prueba</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 10 }}>Metodología</div>
                <div style={{ color: '#222', fontSize: 16 }}>1. ne 2. djs 3. djñds</div>
              </div>
            </div>
          )}
          {/* Puedes agregar paneles para Especialidades y Configuración aquí */}
        </div>
      </div>
    </div>
  );
};

export default PsychologistProfile; 