import React, { useState, useEffect } from 'react';
import { Plus, X, User, Mail, Phone, Calendar, MapPin, Building } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const BusinessEmployees = ({ navigationProps }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAssignSessionsModal, setShowAssignSessionsModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Estado para el formulario de nuevo empleado
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    company: user?.company || user?.companyName || 'Empresa' // Nombre de la empresa del usuario autenticado
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employeesError, setEmployeesError] = useState('');

  // Estado para los empleados (se cargarán desde el API)
  const [employees, setEmployees] = useState([]);

  // Filtrar empleados
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUploadModal = () => setShowUploadModal(true);
  const openAssignSessionsModal = () => setShowAssignSessionsModal(true);
  const openNotificationModal = () => setShowNotificationModal(true);

  // Función para obtener empleados del API filtrando por nombre de empresa
  const fetchEmployeesByCompany = async (companyName) => {
    setLoadingEmployees(true);
    setEmployeesError('');

    try {
      console.log('=== OBTENIENDO EMPLEADOS POR EMPRESA ===');
      console.log('URL:', '/api/patients');
      console.log('Company Name:', companyName);
      console.log('========================================');

      const response = await fetch('/api/patients', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('empathica_token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener pacientes');
      }

      const allPatients = await response.json();
      console.log('Todos los pacientes del servidor:', allPatients);

      // Filtrar pacientes que pertenezcan a la empresa
      const companyPatients = allPatients.filter(patient => {
        const patientCompany = patient.company || patient.companyName || '';
        const matches = patientCompany.toLowerCase() === companyName.toLowerCase();
        console.log(`Paciente: ${patient.name} ${patient.lastName}, Company: "${patientCompany}", Match: ${matches}`);
        return matches;
      });

      console.log('Pacientes filtrados por empresa:', companyPatients);

      // Transformar los datos del API al formato esperado por la UI
      const transformedEmployees = companyPatients.map((patient, index) => ({
        id: patient.userId || patient.id || index + 1,
        firstName: patient.name || '',
        lastName: patient.lastName || '',
        name: `${patient.name || ''} ${patient.lastName || ''}`.trim(),
        email: patient.email || '',
        phone: patient.phoneNumber || patient.phone || '',
        gender: patient.gender || 'No especificado',
        department: 'N/A', // No viene del API
        position: 'N/A', // No viene del API
        hireDate: new Date().toISOString().split('T')[0], // Fecha actual como placeholder
        address: 'N/A', // No viene del API
        status: patient.userStatus === 'ACTIVE' ? 'Activo' : 'Inactivo',
        sessions: 0, // Se puede calcular si hay datos de sesiones
        lastSession: 'N/A'
      }));

      setEmployees(transformedEmployees);
      console.log('Empleados cargados:', transformedEmployees.length);

    } catch (error) {
      console.error('Error obteniendo empleados:', error);
      setEmployeesError(error.message);
    } finally {
      setLoadingEmployees(false);
    }
  };

  // Función para obtener empleados del API
  const fetchEmployees = async () => {
    // Obtener el nombre de la empresa del usuario
    const companyName = user?.company || user?.companyName || user?.companyId;
    
    if (!companyName) {
      setEmployeesError('No se pudo obtener el nombre de la empresa');
      return;
    }

    console.log('=== FETCH EMPLOYEES ===');
    console.log('User:', user);
    console.log('Company Name:', companyName);
    console.log('=======================');

    await fetchEmployeesByCompany(companyName);
  };

  // Debug: Verificar cuando el componente se monta
  useEffect(() => {
    console.log('=== COMPONENTE MONTADO ===');
    console.log('User disponible:', !!user);
    console.log('User completo:', user);
    console.log('==========================');
  }, []);

  // Debug: Verificar cuando el usuario cambia
  useEffect(() => {
    console.log('=== USUARIO CAMBIÓ ===');
    console.log('User completo:', user);
    console.log('User companyId:', user?.companyId);
    console.log('User ID:', user?.id);
    console.log('User roles:', user?.roles);
    console.log('======================');
  }, [user]);

  // Cargar empleados cuando se monte el componente y el usuario esté disponible
  useEffect(() => {
    console.log('=== DEBUG USEEFFECT ===');
    console.log('User completo:', user);
    console.log('User company:', user?.company);
    console.log('User companyName:', user?.companyName);
    console.log('User companyId:', user?.companyId);
    console.log('User ID:', user?.id);
    console.log('User roles:', user?.roles);
    console.log('========================');
    
    const companyName = user?.company || user?.companyName || user?.companyId;
    
    if (companyName) {
      console.log('Ejecutando fetchEmployees con companyName:', companyName);
      fetchEmployees();
    } else {
      console.log('No se ejecuta fetchEmployees - no hay nombre de empresa disponible');
    }
  }, [user?.company, user?.companyName, user?.companyId]);

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
      if (!newEmployee.name || !newEmployee.lastName || !newEmployee.email || !newEmployee.phoneNumber || !newEmployee.dateOfBirth || !newEmployee.gender) {
        throw new Error('Por favor completa todos los campos obligatorios');
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmployee.email)) {
        throw new Error('El email no tiene un formato válido');
      }

      // Validar teléfono (solo números, exactamente 10 dígitos)
      if (newEmployee.phoneNumber.replace(/\D/g, '').length !== 10) {
        throw new Error('El teléfono debe tener exactamente 10 dígitos');
      }

              // Preparar datos para el API
        const employeeData = {
          name: newEmployee.name,
          lastName: newEmployee.lastName,
          email: newEmployee.email,
          phoneNumber: newEmployee.phoneNumber.replace(/\D/g, ''), // Solo números
          dateOfBirth: newEmployee.dateOfBirth,
          gender: newEmployee.gender,
          company: newEmployee.company
        };

      console.log('=== AGREGANDO EMPLEADO ===');
      console.log('Datos enviados:', employeeData);
      console.log('==========================');

      // Llamada al API
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('empathica_token')}`
        },
        body: JSON.stringify(employeeData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar empleado');
      }

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      // Crear empleado para la lista local (mantener compatibilidad con la UI)
      const employee = {
        id: employees.length + 1,
        firstName: newEmployee.name,
        lastName: newEmployee.lastName,
        name: `${newEmployee.name} ${newEmployee.lastName}`,
        email: newEmployee.email,
        phone: newEmployee.phoneNumber,
        gender: newEmployee.gender,
        department: 'N/A', // No se envía al API
        position: 'N/A', // No se envía al API
        hireDate: new Date().toISOString().split('T')[0],
        address: 'N/A', // No se envía al API
        status: 'Activo',
        sessions: 0,
        lastSession: 'N/A'
      };

      setSuccess('¡Empleado agregado exitosamente!');
      
      // Limpiar formulario
      setNewEmployee({
        name: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        company: user?.company || user?.companyName || 'Empresa'
      });

      // Recargar la lista de empleados desde el API
      await fetchEmployees();

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
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      company: user?.company || user?.companyName || 'Empresa'
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
          <div style={{ color: '#222', fontWeight: 800, fontSize: 20, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              Estadísticas Generales
              {loadingEmployees && (
                <div style={{
                  width: 16,
                  height: 16,
                  border: '2px solid #e0e7ef',
                  borderTop: '2px solid #0057ff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              )}
            </div>
            <button
              onClick={() => {
                console.log('=== BOTÓN RECARGAR PRESIONADO ===');
                console.log('User:', user);
                console.log('User company:', user?.company);
                console.log('User companyName:', user?.companyName);
                console.log('User companyId:', user?.companyId);
                console.log('User ID:', user?.id);
                
                const companyName = user?.company || user?.companyName || user?.companyId;
                
                if (companyName) {
                  console.log('Recargando con companyName:', companyName);
                  fetchEmployees();
                } else {
                  console.log('No hay nombre de empresa disponible');
                }
              }}
              style={{
                background: '#0057ff',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              🔄 Recargar
            </button>
          </div>
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
            <span style={{ color: '#ff4444', fontWeight: 800, fontSize: 20 }}>1</span>
          </div>
          <div style={{ color: '#7a8bbd', fontWeight: 600, fontSize: 15, margin: '10px 0 2px 0' }}>Sesiones totales</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: '#2050c7', fontWeight: 700, fontSize: 16 }}>{employees.reduce((sum, emp) => sum + emp.sessions, 0)}/20</span>
            <div style={{ flex: 1, height: 10, background: '#f5e3d6', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ width: `${(employees.reduce((sum, emp) => sum + emp.sessions, 0) / 20) * 100}%`, height: '100%', background: '#0057ff', borderRadius: 8 }}></div>
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

        {/* Mensaje de error si hay problemas al cargar empleados */}
        {employeesError && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <span>⚠️</span>
            <span>{employeesError}</span>
            <button
              onClick={fetchEmployees}
              style={{
                background: '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '4px 8px',
                fontSize: 12,
                cursor: 'pointer',
                marginLeft: 'auto'
              }}
            >
              Reintentar
            </button>
          </div>
        )}

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
                {loadingEmployees ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '2rem', textAlign: 'center', color: '#7a8bbd' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <div style={{
                          width: 20,
                          height: 20,
                          border: '2px solid #e0e7ef',
                          borderTop: '2px solid #0057ff',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                        Cargando empleados...
                      </div>
                    </td>
                  </tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '2rem', textAlign: 'center', color: '#7a8bbd' }}>
                      {employeesError ? 'Error al cargar empleados' : 'No hay empleados registrados'}
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => (
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
                  ))
                )}
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
                      value={newEmployee.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
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
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={newEmployee.phoneNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 10) {
                          handleInputChange('phoneNumber', value);
                        }
                      }}
                      maxLength={10}
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
                      placeholder="1234567890"
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
                      Género *
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

                  <div>
                    <label style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 8
                    }}>
                      Fecha de Nacimiento *
                    </label>
                    <input
                      type="date"
                      value={newEmployee.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
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

              {/* Mensaje informativo */}
              <div style={{
                background: '#f0f9ff',
                border: '1px solid #0ea5e9',
                borderRadius: 8,
                padding: '12px 16px',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <div style={{
                  width: 20,
                  height: 20,
                  background: '#0ea5e9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}>
                  i
                </div>
                <div style={{ color: '#0c4a6e', fontSize: 14, fontWeight: 500 }}>
                  <strong>Importante:</strong> El nuevo empleado recibirá un correo electrónico con su contraseña para acceder a su dashboard personal.
                </div>
              </div>

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
