import React, { useState } from 'react';
import { Plus, X, User, Mail, Phone, Calendar, MapPin, Building } from 'lucide-react';

const BusinessEmployees = ({ navigationProps }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAssignSessionsModal, setShowAssignSessionsModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Estado para el formulario de nuevo empleado
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    department: '',
    position: '',
    hireDate: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Datos de ejemplo de empleados (ahora con más información)
  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      firstName: 'Ana', 
      lastName: 'García', 
      name: 'Ana García', 
      email: 'ana.garcia@empresa.com', 
      phone: '+1 (555) 123-4567',
      gender: 'Femenino',
      department: 'Ventas', 
      position: 'Gerente de Ventas',
      hireDate: '2023-01-15',
      address: 'Calle Principal 123, Ciudad',
      status: 'Activo', 
      sessions: 8, 
      lastSession: '2024-01-15' 
    },
    { 
      id: 2, 
      firstName: 'Carlos', 
      lastName: 'López', 
      name: 'Carlos López', 
      email: 'carlos.lopez@empresa.com', 
      phone: '+1 (555) 234-5678',
      gender: 'Masculino',
      department: 'Marketing', 
      position: 'Especialista en Marketing',
      hireDate: '2023-03-20',
      address: 'Avenida Central 456, Ciudad',
      status: 'Activo', 
      sessions: 5, 
      lastSession: '2024-01-14' 
    },
    { 
      id: 3, 
      firstName: 'María', 
      lastName: 'Rodríguez', 
      name: 'María Rodríguez', 
      email: 'maria.rodriguez@empresa.com', 
      phone: '+1 (555) 345-6789',
      gender: 'Femenino',
      department: 'Tecnología', 
      position: 'Desarrolladora Senior',
      hireDate: '2022-11-10',
      address: 'Plaza Mayor 789, Ciudad',
      status: 'Activo', 
      sessions: 12, 
      lastSession: '2024-01-16' 
    },
    { 
      id: 4, 
      firstName: 'Juan', 
      lastName: 'Pérez', 
      name: 'Juan Pérez', 
      email: 'juan.perez@empresa.com', 
      phone: '+1 (555) 456-7890',
      gender: 'Masculino',
      department: 'RRHH', 
      position: 'Analista de RRHH',
      hireDate: '2023-06-05',
      address: 'Calle Secundaria 321, Ciudad',
      status: 'Inactivo', 
      sessions: 3, 
      lastSession: '2024-01-10' 
    },
    { 
      id: 5, 
      firstName: 'Laura', 
      lastName: 'Martínez', 
      name: 'Laura Martínez', 
      email: 'laura.martinez@empresa.com', 
      phone: '+1 (555) 567-8901',
      gender: 'Femenino',
      department: 'Finanzas', 
      position: 'Contadora',
      hireDate: '2023-02-28',
      address: 'Boulevard Norte 654, Ciudad',
      status: 'Activo', 
      sessions: 6, 
      lastSession: '2024-01-13' 
    },
  ]);

  // Filtrar empleados
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUploadModal = () => setShowUploadModal(true);
  const openAssignSessionsModal = () => setShowAssignSessionsModal(true);
  const openNotificationModal = () => setShowNotificationModal(true);

  // Funciones para manejar el formulario de nuevo empleado
  const handleInputChange = (field, value) => {
    setNewEmployee(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar mensajes de error al escribir
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmitEmployee = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validaciones básicas
      if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email) {
        throw new Error('Por favor completa todos los campos obligatorios');
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmployee.email)) {
        throw new Error('El email no tiene un formato válido');
      }

      // Crear nuevo empleado
      const employee = {
        id: employees.length + 1,
        firstName: newEmployee.firstName,
        lastName: newEmployee.lastName,
        name: `${newEmployee.firstName} ${newEmployee.lastName}`,
        email: newEmployee.email,
        phone: newEmployee.phone || 'No especificado',
        gender: newEmployee.gender || 'No especificado',
        department: newEmployee.department || 'No especificado',
        position: newEmployee.position || 'No especificado',
        hireDate: newEmployee.hireDate || new Date().toISOString().split('T')[0],
        address: newEmployee.address || 'No especificado',
        status: 'Activo',
        sessions: 0,
        lastSession: 'N/A'
      };

      // Agregar empleado a la lista (simulando llamada al backend)
      console.log('Agregando nuevo empleado:', employee);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay
      
      setEmployees(prev => [...prev, employee]);
      setSuccess('¡Empleado agregado exitosamente!');
      
      // Limpiar formulario
      setNewEmployee({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        department: '',
        position: '',
        hireDate: '',
        address: ''
      });

      // Cerrar modal después de un breve delay
      setTimeout(() => {
        setShowCreateModal(false);
        setSuccess('');
      }, 2000);

    } catch (error) {
      console.error('Error agregando empleado:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewEmployee({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      department: '',
      position: '',
      hireDate: '',
      address: ''
    });
    setError('');
    setSuccess('');
  };

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
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Teléfono</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Departamento</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Cargo</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Estado</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Sesiones</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#222', fontWeight: 700, fontSize: 14 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} style={{ borderBottom: '1px solid #e0e7ef' }}>
                    <td style={{ padding: '1rem', color: '#222', fontWeight: 600 }}>{employee.name}</td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.email}</td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.phone}</td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.department}</td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.position}</td>
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

      {/* Modal para agregar nuevo empleado */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}>
            {/* Header del modal */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <User size={24} color="#0057FF" />
                <h2 style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#333',
                  margin: 0
                }}>
                  Agregar Nuevo Empleado
                </h2>
              </div>
              <button
                onClick={closeCreateModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  color: '#666',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmitEmployee}>
              {/* Información Personal */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: '2px solid #e0e7ef'
                }}>
                  Información Personal
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 16
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 8
                    }}>
                      Nombre *
                    </label>
                    <input
                      type="text"
                      value={newEmployee.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e7ef',
                        borderRadius: 8,
                        fontSize: 14,
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
                      placeholder="Nombre"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 8
                    }}>
                      Apellido *
                    </label>
                    <input
                      type="text"
                      value={newEmployee.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e7ef',
                        borderRadius: 8,
                        fontSize: 14,
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
                      placeholder="Apellido"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 8
                    }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e7ef',
                        borderRadius: 8,
                        fontSize: 14,
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
                      placeholder="empleado@empresa.com"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 8
                    }}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={newEmployee.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e7ef',
                        borderRadius: 8,
                        fontSize: 14,
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 8
                    }}>
                      Género
                    </label>
                    <select
                      value={newEmployee.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e7ef',
                        borderRadius: 8,
                        fontSize: 14,
                        transition: 'border-color 0.2s ease',
                        background: '#fff'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
                    >
                      <option value="">Seleccionar género</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                      <option value="Prefiero no decir">Prefiero no decir</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Información Laboral */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: '2px solid #e0e7ef'
                }}>
                  Información Laboral
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 16
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 8
                    }}>
                      Departamento
                    </label>
                    <select
                      value={newEmployee.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e7ef',
                        borderRadius: 8,
                        fontSize: 14,
                        transition: 'border-color 0.2s ease',
                        background: '#fff'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
                    >
                      <option value="">Seleccionar departamento</option>
                      <option value="Ventas">Ventas</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Tecnología">Tecnología</option>
                      <option value="RRHH">RRHH</option>
                      <option value="Finanzas">Finanzas</option>
                      <option value="Operaciones">Operaciones</option>
                      <option value="Administración">Administración</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 8
                    }}>
                      Cargo
                    </label>
                    <input
                      type="text"
                      value={newEmployee.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e7ef',
                        borderRadius: 8,
                        fontSize: 14,
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
                      placeholder="Ej: Desarrollador Senior"
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 8
                    }}>
                      Fecha de Contratación
                    </label>
                    <input
                      type="date"
                      value={newEmployee.hireDate}
                      onChange={(e) => handleInputChange('hireDate', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '2px solid #e0e7ef',
                        borderRadius: 8,
                        fontSize: 14,
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                      onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
                    />
                  </div>
                </div>
              </div>

              {/* Dirección */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: 16,
                  paddingBottom: 8,
                  borderBottom: '2px solid #e0e7ef'
                }}>
                  Información Adicional
                </h3>
                
                <div>
                  <label style={{
                    display: 'block',
                    color: '#374151',
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 8
                  }}>
                    Dirección
                  </label>
                  <textarea
                    value={newEmployee.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e0e7ef',
                      borderRadius: 8,
                      fontSize: 14,
                      transition: 'border-color 0.2s ease',
                      minHeight: 80,
                      resize: 'vertical'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#0057FF'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e7ef'}
                    placeholder="Dirección completa del empleado"
                  />
                </div>
              </div>

              {/* Mensajes de error y éxito */}
              {error && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '12px 16px',
                  borderRadius: 8,
                  marginBottom: 20,
                  fontSize: 14
                }}>
                  {error}
                </div>
              )}

              {success && (
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#16a34a',
                  padding: '12px 16px',
                  borderRadius: 8,
                  marginBottom: 20,
                  fontSize: 14
                }}>
                  {success}
                </div>
              )}

              {/* Botones */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 16
              }}>
                <button
                  type="button"
                  onClick={closeCreateModal}
                  style={{
                    padding: '12px 24px',
                    background: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                >
                  Cancelar
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding: '12px 24px',
                    background: isLoading ? '#9ca3af' : '#0057FF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) e.currentTarget.style.background = '#0041CC';
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) e.currentTarget.style.background = '#0057FF';
                  }}
                >
                  {isLoading ? (
                    <>
                      <div style={{
                        width: 16,
                        height: 16,
                        border: '2px solid #fff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Agregando...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Agregar Empleado
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessEmployees;

// Estilos CSS para animaciones
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inyectar estilos en el documento
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
