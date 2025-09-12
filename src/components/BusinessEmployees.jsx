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
    companyId: user?.company?.companyId || 1 // ID de la empresa del usuario autenticado
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employeesError, setEmployeesError] = useState('');

  // Estado para los empleados (se cargarán desde el API)
  const [employees, setEmployees] = useState([]);

  // Estados para el modal de detalles del empleado
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);
  const [loadingEmployeeDetails, setLoadingEmployeeDetails] = useState(false);
  const [employeeDetailsError, setEmployeeDetailsError] = useState('');

  // Estados para el modal de añadir sesiones
  const [showAddSessionsModal, setShowAddSessionsModal] = useState(false);
  const [selectedEmployeeForSessions, setSelectedEmployeeForSessions] = useState(null);
  const [sessionsToAdd, setSessionsToAdd] = useState('');
  const [loadingAddSessions, setLoadingAddSessions] = useState(false);
  const [addSessionsError, setAddSessionsError] = useState('');
  const [addSessionsSuccess, setAddSessionsSuccess] = useState('');

  // Filtrar empleados
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openUploadModal = () => setShowUploadModal(true);
  const openAssignSessionsModal = () => {
    setShowAddSessionsModal(true);
    setSelectedEmployeeForSessions(null);
    setSessionsToAdd('');
    setAddSessionsError('');
    setAddSessionsSuccess('');
  };
  const openNotificationModal = () => setShowNotificationModal(true);

  // Función para obtener empleados del API usando companyId
  const fetchEmployeesByCompanyId = async (companyId) => {
    setLoadingEmployees(true);
    setEmployeesError('');

    try {
      console.log('=== OBTENIENDO EMPLEADOS POR COMPANY ID ===');
      console.log('URL:', `https://local.julioperezag.com/api/companies/${companyId}/patients`);
      console.log('Company ID:', companyId);
      console.log('===========================================');

      const response = await fetch(`https://local.julioperezag.com/api/companies/${companyId}/patients`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('empathica_token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener empleados');
      }

      const companyPatients = await response.json();
      console.log('Pacientes de la empresa:', companyPatients);

      // Extraer el array de pacientes del objeto paginado
      const patientsArray = companyPatients.content || [];
      console.log('Array de pacientes:', patientsArray);
      console.log('Primer paciente (si existe):', patientsArray[0]);
      if (patientsArray[0]) {
        console.log('tokensLeft del primer paciente:', patientsArray[0].tokensLeft);
        console.log('Tipo de tokensLeft:', typeof patientsArray[0].tokensLeft);
      }

      // Transformar los datos del API al formato esperado por la UI
      const transformedEmployees = patientsArray.map((patient, index) => {
        console.log(`Transformando paciente ${index}:`, {
          name: patient.name,
          tokensLeft: patient.tokensLeft,
          tokensLeftType: typeof patient.tokensLeft
        });
        
        return {
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
        lastSession: 'N/A',
        tokensLeft: patient.tokensLeft !== null && patient.tokensLeft !== undefined ? patient.tokensLeft : 0,
        tags: patient.tags || []
        };
      });

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
    // Obtener el companyId del usuario usando la nueva estructura
    const companyId = user?.company?.companyId;
    
    if (!companyId) {
      setEmployeesError('No se pudo obtener el ID de la empresa');
      return;
    }

    console.log('=== FETCH EMPLOYEES ===');
    console.log('User:', user);
    console.log('User company:', user?.company);
    console.log('Company ID:', companyId);
    console.log('=======================');

    await fetchEmployeesByCompanyId(companyId);
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
    console.log('User company.companyId:', user?.company?.companyId);
    console.log('User company.name:', user?.company?.name);
    console.log('User ID:', user?.id);
    console.log('User roles:', user?.roles);
    console.log('========================');
    
    const companyId = user?.company?.companyId;
    
    if (companyId) {
      console.log('Ejecutando fetchEmployees con companyId:', companyId);
      fetchEmployees();
    } else {
      console.log('No se ejecuta fetchEmployees - no hay companyId disponible');
    }
  }, [user?.company?.companyId]);

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
          companyId: newEmployee.companyId
        };

      console.log('=== AGREGANDO EMPLEADO ===');
      console.log('Datos enviados:', employeeData);
      console.log('==========================');

      // Llamada al API
      const response = await fetch('https://local.julioperezag.com/api/patients', {
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
        companyId: user?.company?.companyId || 1
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
      companyId: user?.company?.companyId || 1
    });
    setError('');
    setSuccess('');
  };

  // Función para obtener detalles del empleado
  const fetchEmployeeDetails = async (employeeId) => {
    setLoadingEmployeeDetails(true);
    setEmployeeDetailsError('');

    try {
      console.log('=== OBTENIENDO DETALLES DEL EMPLEADO ===');
      console.log('Employee ID:', employeeId);
      console.log('URL:', `https://local.julioperezag.com/api/patients/${employeeId}`);
      console.log('========================================');

      const response = await fetch(`https://local.julioperezag.com/api/patients/${employeeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('empathica_token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener detalles del empleado');
      }

      const employeeDetails = await response.json();
      console.log('Detalles del empleado:', employeeDetails);

      setSelectedEmployeeDetails(employeeDetails);

    } catch (error) {
      console.error('Error obteniendo detalles del empleado:', error);
      setEmployeeDetailsError(error.message);
    } finally {
      setLoadingEmployeeDetails(false);
    }
  };

  // Función para abrir el modal de detalles
  const handleViewDetails = (employee) => {
    console.log('=== ABRIENDO MODAL DE DETALLES ===');
    console.log('Empleado seleccionado:', employee);
    console.log('Employee ID:', employee.id);
    console.log('===================================');
    
    setShowDetailsModal(true);
    fetchEmployeeDetails(employee.id);
  };

  // Función para cerrar el modal de detalles
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedEmployeeDetails(null);
    setEmployeeDetailsError('');
  };

  // Función para añadir sesiones a un empleado
  const handleAddSessions = async () => {
    if (!selectedEmployeeForSessions) {
      setAddSessionsError('Por favor selecciona un empleado');
      return;
    }

    if (!sessionsToAdd || isNaN(sessionsToAdd) || parseInt(sessionsToAdd) <= 0) {
      setAddSessionsError('Por favor ingresa un número válido de sesiones');
      return;
    }

    setLoadingAddSessions(true);
    setAddSessionsError('');
    setAddSessionsSuccess('');

    try {
      console.log('=== AÑADIENDO SESIONES ===');
      console.log('Employee ID:', selectedEmployeeForSessions.id);
      console.log('Sessions to add:', sessionsToAdd);
      console.log('Payload:', { tokensToAssign: parseInt(sessionsToAdd) });
      console.log('URL:', `https://local.julioperezag.com/api/patients/${selectedEmployeeForSessions.id}/tokens`);
      console.log('========================');

      const response = await fetch(`https://local.julioperezag.com/api/patients/${selectedEmployeeForSessions.id}/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('empathica_token')}`
        },
        body: JSON.stringify({
          tokensToAssign: parseInt(sessionsToAdd)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al añadir sesiones');
      }

      const result = await response.json();
      console.log('Sesiones añadidas exitosamente:', result);

      setAddSessionsSuccess(`Se añadieron ${sessionsToAdd} sesiones a ${selectedEmployeeForSessions.name}`);
      
      // Recargar la lista de empleados para mostrar los cambios
      setTimeout(() => {
        fetchEmployees();
        closeAddSessionsModal();
      }, 2000);

    } catch (error) {
      console.error('Error añadiendo sesiones:', error);
      setAddSessionsError(error.message);
    } finally {
      setLoadingAddSessions(false);
    }
  };

  // Función para cerrar el modal de añadir sesiones
  const closeAddSessionsModal = () => {
    setShowAddSessionsModal(false);
    setSelectedEmployeeForSessions(null);
    setSessionsToAdd('');
    setAddSessionsError('');
    setAddSessionsSuccess('');
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
                console.log('User company.companyId:', user?.company?.companyId);
                console.log('User company.name:', user?.company?.name);
                console.log('User ID:', user?.id);
                
                const companyId = user?.company?.companyId;
                
                if (companyId) {
                  console.log('Recargando con companyId:', companyId);
                  fetchEmployees();
                } else {
                  console.log('No hay companyId disponible');
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
            <span style={{ fontSize: 20 }}>➕</span> Añadir Sesiones
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
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Sesiones Disponibles</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Departamento</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#222', fontWeight: 700, fontSize: 14 }}>Estado</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#222', fontWeight: 700, fontSize: 14 }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loadingEmployees ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#7a8bbd' }}>
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
                    <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#7a8bbd' }}>
                      {employeesError ? 'Error al cargar empleados' : 'No hay empleados registrados'}
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => (
                  <tr key={employee.id} style={{ borderBottom: '1px solid #e0e7ef' }}>
                    <td style={{ padding: '1rem', color: '#222', fontWeight: 600 }}>{employee.name}</td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.email}</td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.phone}</td>
                    <td style={{ padding: '1rem', color: '#7a8bbd' }}>{employee.tokensLeft || 0}</td>
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
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleViewDetails(employee)}
                        style={{
                          background: '#0057ff',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          padding: '0.5rem 1rem',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
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

      {/* Modal para ver detalles del empleado */}
      {showDetailsModal && (
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
            maxWidth: '800px',
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
                  Detalles del Empleado
                </h2>
              </div>
              <button
                onClick={closeDetailsModal}
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

            {/* Contenido del modal */}
            {loadingEmployeeDetails ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '3rem',
                gap: 12
              }}>
                <div style={{
                  width: 24,
                  height: 24,
                  border: '2px solid #e0e7ef',
                  borderTop: '2px solid #0057ff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <span style={{ color: '#7a8bbd', fontSize: 16 }}>Cargando detalles...</span>
              </div>
            ) : employeeDetailsError ? (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '16px',
                borderRadius: 8,
                textAlign: 'center'
              }}>
                <div style={{ marginBottom: 12 }}>⚠️</div>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Error al cargar detalles</div>
                <div style={{ fontSize: 14 }}>{employeeDetailsError}</div>
                <button
                  onClick={() => selectedEmployeeDetails && fetchEmployeeDetails(selectedEmployeeDetails.userId)}
                  style={{
                    background: '#dc2626',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 16px',
                    fontSize: 14,
                    cursor: 'pointer',
                    marginTop: 12
                  }}
                >
                  Reintentar
                </button>
              </div>
            ) : selectedEmployeeDetails ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Información Personal */}
                <div>
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 16
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <User size={20} color="#7a8bbd" />
                      <div>
                        <div style={{ fontSize: 12, color: '#7a8bbd', fontWeight: 600 }}>Nombre Completo</div>
                        <div style={{ fontSize: 16, color: '#222', fontWeight: 600 }}>
                          {selectedEmployeeDetails.name} {selectedEmployeeDetails.lastName}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Mail size={20} color="#7a8bbd" />
                      <div>
                        <div style={{ fontSize: 12, color: '#7a8bbd', fontWeight: 600 }}>Email</div>
                        <div style={{ fontSize: 16, color: '#222' }}>{selectedEmployeeDetails.email}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Phone size={20} color="#7a8bbd" />
                      <div>
                        <div style={{ fontSize: 12, color: '#7a8bbd', fontWeight: 600 }}>Teléfono</div>
                        <div style={{ fontSize: 16, color: '#222' }}>{selectedEmployeeDetails.phoneNumber}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Calendar size={20} color="#7a8bbd" />
                      <div>
                        <div style={{ fontSize: 12, color: '#7a8bbd', fontWeight: 600 }}>Fecha de Nacimiento</div>
                        <div style={{ fontSize: 16, color: '#222' }}>
                          {selectedEmployeeDetails.dateOfBirth ? new Date(selectedEmployeeDetails.dateOfBirth).toLocaleDateString('es-ES') : 'No especificada'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <User size={20} color="#7a8bbd" />
                      <div>
                        <div style={{ fontSize: 12, color: '#7a8bbd', fontWeight: 600 }}>Género</div>
                        <div style={{ fontSize: 16, color: '#222' }}>{selectedEmployeeDetails.gender || 'No especificado'}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Building size={20} color="#7a8bbd" />
                      <div>
                        <div style={{ fontSize: 12, color: '#7a8bbd', fontWeight: 600 }}>ID de Usuario</div>
                        <div style={{ fontSize: 16, color: '#222' }}>{selectedEmployeeDetails.userId}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información de Estado */}
                <div>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#374151',
                    marginBottom: 16,
                    paddingBottom: 8,
                    borderBottom: '2px solid #e0e7ef'
                  }}>
                    Estado y Configuración
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 16
                  }}>
                    <div>
                      <div style={{ fontSize: 12, color: '#7a8bbd', fontWeight: 600, marginBottom: 4 }}>Estado del Usuario</div>
                      <span style={{
                        background: selectedEmployeeDetails.userStatus === 'ACTIVE' ? '#e6f7e6' : '#ffe6e6',
                        color: selectedEmployeeDetails.userStatus === 'ACTIVE' ? '#2ecc71' : '#ff4444',
                        padding: '0.3rem 0.8rem',
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: 700
                      }}>
                        {selectedEmployeeDetails.userStatus === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>

                    <div>
                      <div style={{ fontSize: 12, color: '#7a8bbd', fontWeight: 600, marginBottom: 4 }}>Zona Horaria</div>
                      <div style={{ fontSize: 16, color: '#222' }}>{selectedEmployeeDetails.timezone || 'No especificada'}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: 12, color: '#7a8bbd', fontWeight: 600, marginBottom: 4 }}>Sesiones Disponibles</div>
                      <div style={{ fontSize: 16, color: '#222', fontWeight: 600 }}>
                        {selectedEmployeeDetails.tokensLeft || 0} sesiones
                      </div>
                    </div>

                    {selectedEmployeeDetails.roles && selectedEmployeeDetails.roles.length > 0 && (
                      <div>
                        <div style={{ fontSize: 12, color: '#7a8bbd', fontWeight: 600, marginBottom: 4 }}>Roles</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                          {selectedEmployeeDetails.roles.map((role, index) => (
                            <span key={index} style={{
                              background: '#e0e7ef',
                              color: '#374151',
                              padding: '0.2rem 0.6rem',
                              borderRadius: 8,
                              fontSize: 11,
                              fontWeight: 600
                            }}>
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sección de Diagnósticos/Tags */}
                {selectedEmployeeDetails.tags && selectedEmployeeDetails.tags.length > 0 && selectedEmployeeDetails.tags.some(tag => tag !== null) && (
                  <div>
                    <h3 style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: '#374151',
                      marginBottom: 16,
                      paddingBottom: 8,
                      borderBottom: '2px solid #e0e7ef'
                    }}>
                      Diagnósticos
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8
                    }}>
                      {selectedEmployeeDetails.tags
                        .filter(tag => tag !== null && tag !== undefined && tag.trim() !== '')
                        .map((tag, index) => (
                          <span key={index} style={{
                            background: '#fef3c7',
                            color: '#92400e',
                            padding: '0.4rem 0.8rem',
                            borderRadius: 12,
                            fontSize: 12,
                            fontWeight: 600,
                            border: '1px solid #fbbf24'
                          }}>
                            {tag}
                          </span>
                        ))}
                    </div>
                    
                    {selectedEmployeeDetails.tags.filter(tag => tag !== null && tag !== undefined && tag.trim() !== '').length === 0 && (
                      <div style={{
                        color: '#7a8bbd',
                        fontSize: 14,
                        fontStyle: 'italic',
                        padding: '1rem',
                        background: '#f8f9fa',
                        borderRadius: 8,
                        textAlign: 'center'
                      }}>
                        No hay diagnósticos registrados
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Modal para añadir sesiones */}
      {showAddSessionsModal && (
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
                <span style={{ fontSize: 24 }}>➕</span>
                <h2 style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#333',
                  margin: 0
                }}>
                  Añadir Sesiones
                </h2>
              </div>
              <button
                onClick={closeAddSessionsModal}
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

            {/* Instrucciones */}
            <div style={{
              background: '#e6f0ff',
              border: '1px solid #bae6fd',
              borderRadius: 12,
              padding: '1rem',
              marginBottom: '2rem'
            }}>
              <h4 style={{ color: '#0057ff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
                📋 Instrucciones de Uso
              </h4>
              <ul style={{ color: '#0057ff', fontSize: 14, margin: 0, paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: 4 }}>Selecciona el empleado al que quieres añadir sesiones</li>
                <li style={{ marginBottom: 4 }}>Ingresa el número de sesiones a añadir (solo números positivos)</li>
                <li style={{ marginBottom: 4 }}>Las sesiones se sumarán a las que ya tiene el empleado</li>
                <li>Esta acción no se puede deshacer, verifica bien antes de confirmar</li>
              </ul>
            </div>

            {/* Contenido del modal */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Selección de empleado */}
              <div>
                <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                  Seleccionar Empleado *
                </label>
                <select
                  value={selectedEmployeeForSessions?.id || ''}
                  onChange={(e) => {
                    const employeeId = e.target.value;
                    const employee = employees.find(emp => emp.id.toString() === employeeId);
                    setSelectedEmployeeForSessions(employee || null);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none',
                    background: '#fff'
                  }}
                >
                  <option value="">Selecciona un empleado...</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name} - {employee.email} (Sesiones actuales: {employee.tokensLeft || 0})
                    </option>
                  ))}
                </select>
              </div>

              {/* Número de sesiones */}
              <div>
                <label style={{ display: 'block', color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                  Número de Sesiones a Añadir *
                </label>
                <input
                  type="number"
                  value={sessionsToAdd}
                  onChange={(e) => setSessionsToAdd(e.target.value)}
                  placeholder="Ej: 5"
                  min="1"
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
                <p style={{ color: '#7a8bbd', fontSize: 14, margin: '8px 0 0 0' }}>
                  Ingresa solo números positivos. Las sesiones se sumarán a las existentes.
                </p>
              </div>

              {/* Información del empleado seleccionado */}
              {selectedEmployeeForSessions && (
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: 12,
                  padding: '1rem',
                  border: '1px solid #e0e7ef'
                }}>
                  <h5 style={{ color: '#222', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                    Información del Empleado
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                    <div>
                      <span style={{ color: '#7a8bbd', fontSize: 14 }}>Nombre:</span>
                      <div style={{ color: '#222', fontWeight: 600 }}>{selectedEmployeeForSessions.name}</div>
                    </div>
                    <div>
                      <span style={{ color: '#7a8bbd', fontSize: 14 }}>Email:</span>
                      <div style={{ color: '#222', fontWeight: 600 }}>{selectedEmployeeForSessions.email}</div>
                    </div>
                    <div>
                      <span style={{ color: '#7a8bbd', fontSize: 14 }}>Sesiones actuales:</span>
                      <div style={{ color: '#0057ff', fontWeight: 700 }}>{selectedEmployeeForSessions.tokensLeft || 0}</div>
                    </div>
                    {sessionsToAdd && !isNaN(sessionsToAdd) && parseInt(sessionsToAdd) > 0 && (
                      <div>
                        <span style={{ color: '#7a8bbd', fontSize: 14 }}>Sesiones después:</span>
                        <div style={{ color: '#2ecc71', fontWeight: 700 }}>
                          {(selectedEmployeeForSessions.tokensLeft || 0) + parseInt(sessionsToAdd)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mensajes de error y éxito */}
              {addSessionsError && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '12px 16px',
                  borderRadius: 8,
                  fontSize: 14
                }}>
                  ⚠️ {addSessionsError}
                </div>
              )}

              {addSessionsSuccess && (
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#16a34a',
                  padding: '12px 16px',
                  borderRadius: 8,
                  fontSize: 14
                }}>
                  ✅ {addSessionsSuccess}
                </div>
              )}

              {/* Botones */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
                <button
                  onClick={closeAddSessionsModal}
                  style={{
                    background: '#fff',
                    color: '#7a8bbd',
                    border: '1.5px solid #e0e7ef',
                    borderRadius: 8,
                    padding: '0.8rem 1.5rem',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddSessions}
                  disabled={loadingAddSessions || !selectedEmployeeForSessions || !sessionsToAdd}
                  style={{
                    background: loadingAddSessions ? '#ccc' : '#0057ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.8rem 1.5rem',
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: loadingAddSessions ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  {loadingAddSessions ? (
                    <>
                      <div style={{
                        width: 16,
                        height: 16,
                        border: '2px solid #fff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Añadiendo...
                    </>
                  ) : (
                    'Añadir Sesiones'
                  )}
                </button>
              </div>
            </div>
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
