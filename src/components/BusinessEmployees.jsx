import React, { useState } from 'react';

const BusinessEmployees = ({ navigationProps }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAssignSessionsModal, setShowAssignSessionsModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Datos de ejemplo de empleados
  const employees = [
    { id: 1, name: 'Ana García', email: 'ana.garcia@empresa.com', department: 'Ventas', status: 'Activo', sessions: 8, lastSession: '2024-01-15' },
    { id: 2, name: 'Carlos López', email: 'carlos.lopez@empresa.com', department: 'Marketing', status: 'Activo', sessions: 5, lastSession: '2024-01-14' },
    { id: 3, name: 'María Rodríguez', email: 'maria.rodriguez@empresa.com', department: 'Tecnología', status: 'Activo', sessions: 12, lastSession: '2024-01-16' },
    { id: 4, name: 'Juan Pérez', email: 'juan.perez@empresa.com', department: 'RRHH', status: 'Inactivo', sessions: 3, lastSession: '2024-01-10' },
    { id: 5, name: 'Laura Martínez', email: 'laura.martinez@empresa.com', department: 'Finanzas', status: 'Activo', sessions: 6, lastSession: '2024-01-13' },
  ];

  // Filtrar empleados
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUploadModal = () => setShowUploadModal(true);
  const openAssignSessionsModal = () => setShowAssignSessionsModal(true);
  const openNotificationModal = () => setShowNotificationModal(true);

  return (
    <div style={{ marginTop: 32, marginBottom: 24 }}>
      {/* Estadísticas y Acciones Rápidas */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        {/* Estadísticas Generales */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Estadísticas Generales</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
            <span>Total empleados</span>
            <span style={{ color: '#0057ff', fontWeight: 800, fontSize: 20 }}>{employees.length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
            <span>Activos</span>
            <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 20 }}>{employees.filter(emp => emp.status === 'Activo').length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
            <span>Inactivos</span>
            <span style={{ color: '#888', fontWeight: 800, fontSize: 20 }}>{employees.filter(emp => emp.status === 'Inactivo').length}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
            <span>Reportan estrés</span>
            <span style={{ color: '#ff4444', fontWeight: 800, fontSize: 20 }}>156</span>
          </div>
          <div style={{ color: '#7a8bbd', fontWeight: 600, fontSize: 15, margin: '10px 0 2px 0' }}>Sesiones totales</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#2050c7', fontWeight: 700, fontSize: 16 }}>{employees.reduce((sum, emp) => sum + emp.sessions, 0)}/106</span>
            <div style={{ flex: 1, height: 10, background: '#f5e3d6', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ width: `${(employees.reduce((sum, emp) => sum + emp.sessions, 0) / 106) * 100}%`, height: '100%', background: '#0057ff', borderRadius: 8 }}></div>
            </div>
          </div>
        </div>
        
        {/* Acciones Rápidas */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Acciones Rápidas</div>
          <button 
            onClick={openUploadModal}
            style={{ background: '#2ecc71', color: '#fff', border: 'none', borderRadius: 12, padding: '0.8rem 0', fontWeight: 700, fontSize: 17, cursor: 'pointer', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 20 }}>📁</span> Subir CSV de Empleados
          </button>
          <button 
            onClick={openAssignSessionsModal}
            style={{ background: '#0057ff', color: '#fff', border: 'none', borderRadius: 12, padding: '0.8rem 0', fontWeight: 700, fontSize: 17, cursor: 'pointer', marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 20 }}>👥</span> Editar Sesiones
          </button>
          <button 
            onClick={openNotificationModal}
            style={{ background: '#fff', color: '#7a8bbd', border: '1.5px solid #e0e7ef', borderRadius: 12, padding: '0.8rem 0', fontWeight: 700, fontSize: 17, cursor: 'pointer' }}
          >
            <span style={{ fontSize: 20, marginRight: 6 }}>📧</span> Enviar Notificación
          </button>
        </div>
      </div>

      {/* Gestión de Empleados */}
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{ color: '#222', fontWeight: 800, fontSize: 32 }}>Gestión de Empleados</span>
          <button 
            onClick={() => setShowCreateModal(true)}
            style={{ 
              background: '#0057ff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 12, 
              padding: '0.8rem 2.2rem', 
              fontWeight: 700, 
              fontSize: 18, 
              cursor: 'pointer', 
              boxShadow: '0 2px 8px #0057ff22',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <span style={{ fontSize: 20 }}>+</span> Agregar Empleado
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Buscar empleados..."
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
        </div>

        {/* Tabla de empleados */}
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem 2rem', borderBottom: '2px solid #e0e7ef' }}>
            <div style={{ color: '#222', fontWeight: 800, fontSize: 20 }}>Lista de Empleados</div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Nombre</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Departamento</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Estado</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Sesiones</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Última Sesión</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#222', fontWeight: 700, fontSize: 14 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} style={{ borderBottom: '1px solid #e0e7ef' }}>
                    <td style={{ padding: '1rem', color: '#222', fontWeight: 600 }}>{employee.name}</td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.email}</td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.department}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        background: employee.status === 'Activo' ? '#e6f7e6' : '#ffe6e6',
                        color: employee.status === 'Activo' ? '#2ecc71' : '#ff4444',
                        padding: '0.3rem 0.8rem',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 700
                      }}>
                        {employee.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.sessions}</td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.lastSession}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button style={{
                        background: '#0057ff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '0.5rem 1rem',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}>
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessEmployees;
