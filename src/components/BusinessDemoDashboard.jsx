import React, { useState } from 'react';
import {
  Home,
  FileText,
  Users,
  Settings,
  Shield,
  Bell,
  HelpCircle,
  TrendingUp,
  Calendar,
  Smile,
  ShoppingCart,
  Megaphone,
  User as UserIcon,
  ArrowDown,
  ArrowUp,
  CheckCircle,
  AlertTriangle,
  LogOut
} from 'lucide-react';
import logoEmpathica from '../assets/Logoempathica.png';

/**
 * Elementos de navegación del sidebar del dashboard empresarial
 * Define las secciones principales disponibles en el panel de control
 */
const sidebarItems = [
  { icon: <Home size={22} />, label: 'Dashboard', section: 'Dashboard' },
  { icon: <FileText size={22} />, label: 'Reportes', section: 'Reportes' },
  { icon: <Users size={22} />, label: 'Colaboradores', section: 'Colaboradores' },
  { icon: <Settings size={22} />, label: 'Configuración', section: 'Configuración' },
  { icon: <Bell size={22} />, label: 'Notificaciones', section: 'Notificaciones' },
  { icon: <HelpCircle size={22} />, label: 'Soporte', section: 'Soporte' },
];

/**
 * Datos de ejemplo de empleados activos para mostrar en tiempo real
 * TODO: Reemplazar con datos dinámicos del backend
 */
const activeEmployees = [
  { name: 'Ana García', sessions: 8, time: '2h' },
  { name: 'Carlos López', sessions: 5, time: '4h' },
  { name: 'María Rodríguez', sessions: 12, time: '1h' },
  { name: 'Juan Pérez', sessions: 3, time: '3d' },
];

/**
 * Métricas en tiempo real para mostrar en el dashboard
 * TODO: Reemplazar con datos dinámicos del backend
 */
const realTimeMetrics = [
  { label: 'Sesiones Hoy', value: 23, change: '+', color: '#2ecc71' },
  { label: 'Ventas Mes', value: '+18%', change: '+', color: '#0057FF' },
];

const MAX_EMPLOYEES_DISPLAY = 2;
const MAX_METRICS_DISPLAY = 1;

const SIDEBAR_WIDTH = 220;

/**
 * Componente de la barra de encabezado del dashboard empresarial
 * Muestra el título de la sección actual y el nombre de la empresa
 * 
 * @param {string} sectionTitle - Título de la sección activa
 * @param {Object} navigationProps - Propiedades de navegación
 * @param {boolean} sidebarOpen - Estado del sidebar (abierto/cerrado)
 * @param {Function} toggleSidebar - Función para alternar el sidebar
 */
function BusinessHeaderBar({ sectionTitle, navigationProps, sidebarOpen, toggleSidebar }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.2rem 24px',
      background: '#f6f8fa',
      borderBottom: '2px solid #e0e7ef',
      borderRadius: 0,
      position: 'sticky',
      top: 0,
      zIndex: 10,
      width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={toggleSidebar} style={{
          background: 'none',
          border: 'none',
          fontSize: 22,
          color: '#7a8bbd',
          cursor: 'pointer',
          marginRight: 4,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: 26 }}>{sidebarOpen ? '☰' : '☰'}</span>
        </button>
        <div>
          <div style={{ color: '#7a8bbd', fontWeight: 700, fontSize: 15 }}>Panel de Control - Empresa</div>
          <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginTop: 2 }}>Panel Empresarial</div>
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 18, padding: '0.5rem 1.2rem', fontWeight: 600, color: '#222', fontSize: 15, boxShadow: '0 2px 8px #e0e7ef' }}>TechCorp Solutions</div>
    </div>
  );
}

/**
 * Componente principal del Dashboard Empresarial
 * Proporciona la interfaz completa para la gestión empresarial de bienestar
 * Incluye todas las secciones: Dashboard, Reportes, Colaboradores, Configuración, etc.
 * 
 * @param {Object} navigationProps - Propiedades para navegación
 * @param {Function} navigationProps.onNavigate - Función para cambiar de página
 */
const BusinessDemoDashboard = ({ navigationProps }) => {
  // Estados para controlar la navegación y visualización
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Estado para la pestaña activa de reportes
  const [reportTab, setReportTab] = useState('Comunicación');
  
  // Estados para el CRUD de empleados
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Ana García', email: 'ana.garcia@techcorp.com', department: 'Marketing', position: 'Marketing Manager', status: 'Activo', sessions: 8, lastSession: '2h' },
    { id: 2, name: 'Carlos López', email: 'carlos.lopez@techcorp.com', department: 'Ventas', position: 'Sales Representative', status: 'Activo', sessions: 5, lastSession: '4h' },
    { id: 3, name: 'María Rodríguez', email: 'maria.rodriguez@techcorp.com', department: 'RRHH', position: 'HR Specialist', status: 'Activo', sessions: 12, lastSession: '1h' },
    { id: 4, name: 'Juan Pérez', email: 'juan.perez@techcorp.com', department: 'Tecnología', position: 'Software Developer', status: 'Inactivo', sessions: 3, lastSession: '3d' },
    { id: 5, name: 'Sofia Chen', email: 'sofia.chen@techcorp.com', department: 'Finanzas', position: 'Financial Analyst', status: 'Activo', sessions: 7, lastSession: '6h' },
    { id: 6, name: 'Roberto Silva', email: 'roberto.silva@techcorp.com', department: 'Operaciones', position: 'Operations Manager', status: 'Inactivo', sessions: 2, lastSession: '1w' },
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Estados para gestión de empleados (CRUD)
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('Todos');
  
  // Estados para el modal de notificación
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationForm, setNotificationForm] = useState({
    recipients: 'Todos',
    message: ''
  });
  
  // Estados para el modal de asignar sesiones
  const [showAssignSessionsModal, setShowAssignSessionsModal] = useState(false);
  const [assignSessionsForm, setAssignSessionsForm] = useState({
    employeeId: '',
    sessions: 0
  });
  
  // Estado para crear nuevo empleado
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    status: 'Activo',
    sessions: 0
  });
  
  // Estado para editar empleado existente
  const [editEmployee, setEditEmployee] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    status: ''
  });

  // Opciones disponibles para departamentos y posiciones
  const [departments, setDepartments] = useState(['Todos', 'Marketing', 'Ventas', 'RRHH', 'Tecnología', 'Finanzas', 'Operaciones']);
  const positions = ['Manager', 'Specialist', 'Representative', 'Developer', 'Analyst', 'Coordinator'];

  // Estados para configuración
  const [companyEmail, setCompanyEmail] = useState('contacto@techcorp.com');
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [newDepartment, setNewDepartment] = useState('');
  const [showDeleteDepartmentModal, setShowDeleteDepartmentModal] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState('');
  const [notificationSettings, setNotificationSettings] = useState({
    sessionAlerts: true,
    weeklyReports: true
  });

  // Estados para notificaciones
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Nueva sesión completada',
      message: 'Juan Ramírez completó su sesión de coaching',
      time: 'Hace 2 min',
      type: 'success',
      color: '#2ecc71'
    },
    {
      id: 2,
      title: 'Reporte mensual disponible',
      message: 'El reporte de febrero ya está listo',
      time: 'Hace 1 hora',
      type: 'info',
      color: '#2050c7'
    }
  ]);

  /**
   * Maneja el cierre de sesión del dashboard empresarial
   * Redirige al usuario a la página principal de empresas
   */
  const handleLogout = () => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate('business');
    }
  };

  // ========================================
  // FUNCIONES CRUD PARA GESTIÓN DE EMPLEADOS
  // ========================================
  
  /**
   * Crea un nuevo empleado en el sistema
   * Genera un ID único y agrega el empleado a la lista
   * TODO: Implementar creación en backend
   */
  const handleCreateEmployee = () => {
    const newId = Math.max(...employees.map(emp => emp.id)) + 1;
    const employee = { ...newEmployee, id: newId, lastSession: 'Nunca' };
    setEmployees([...employees, employee]);
    setNewEmployee({ name: '', email: '', department: '', position: '', status: 'Activo', sessions: 0 });
    setShowCreateModal(false);
  };

  /**
   * Actualiza la información de un empleado existente
   * Mantiene los datos de sesiones y última sesión
   * TODO: Implementar actualización en backend
   */
  const handleEditEmployee = () => {
    setEmployees(employees.map(emp => 
      emp.id === selectedEmployee.id ? { ...editEmployee, id: emp.id, sessions: emp.sessions, lastSession: emp.lastSession } : emp
    ));
    setShowEditModal(false);
    setSelectedEmployee(null);
  };

  /**
   * Elimina un empleado del sistema
   * TODO: Implementar eliminación en backend
   */
  /**
   * Cambia el estado de un empleado de activo a inactivo
   * En lugar de eliminar, marca como inactivo para mantener historial
   */
  const handleDeleteEmployee = () => {
    setEmployees(employees.map(emp => 
      emp.id === selectedEmployee.id 
        ? { ...emp, status: 'Inactivo' }
        : emp
    ));
    setShowDeleteModal(false);
    setSelectedEmployee(null);
  };

  /**
   * Reactiva un empleado cambiando su estado de inactivo a activo
   * 
   * @param {Object} employee - Empleado a reactivar
   */
  const handleReactivateEmployee = (employee) => {
    setEmployees(employees.map(emp => 
      emp.id === employee.id 
        ? { ...emp, status: 'Activo' }
        : emp
    ));
  };

  /**
   * Abre el modal de edición para un empleado específico
   * 
   * @param {Object} employee - Empleado a editar
   */
  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setEditEmployee({ ...employee });
    setShowEditModal(true);
  };

  /**
   * Abre el modal de confirmación de eliminación
   * 
   * @param {Object} employee - Empleado a eliminar
   */
  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  /**
   * Abre el modal de visualización de detalles del empleado
   * 
   * @param {Object} employee - Empleado a visualizar
   */
  const openViewModal = (employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  };

  // ========================================
  // FUNCIONES PARA SISTEMA DE NOTIFICACIONES
  // ========================================
  
  /**
   * Abre el modal para enviar notificaciones a empleados
   */
  const openNotificationModal = () => {
    setShowNotificationModal(true);
  };

  /**
   * Procesa el envío de notificaciones a empleados
   * TODO: Implementar envío real de notificaciones en backend
   */
  const handleNotificationSubmit = () => {
    // Aquí se procesaría el envío de la notificación
    console.log('Enviando notificación:', notificationForm);
    setNotificationForm({ recipients: 'Todos', message: '' });
    setShowNotificationModal(false);
  };

  // ========================================
  // FUNCIONES PARA GESTIÓN DE SESIONES
  // ========================================
  
  /**
   * Abre el modal para asignar sesiones a empleados
   */
  const openAssignSessionsModal = () => {
    setShowAssignSessionsModal(true);
  };

  /**
   * Asigna un número específico de sesiones a un empleado
   * TODO: Implementar asignación en backend
   */
  const handleAssignSessions = () => {
    if (assignSessionsForm.employeeId && assignSessionsForm.sessions >= 0) {
      setEmployees(employees.map(emp => 
        emp.id === parseInt(assignSessionsForm.employeeId) 
          ? { ...emp, sessions: assignSessionsForm.sessions }
          : emp
      ));
      setAssignSessionsForm({ employeeId: '', sessions: 0 });
      setShowAssignSessionsModal(false);
    }
  };



  /**
   * Función para descargar el reporte mensual en PDF
   * Descarga el archivo "Reporte mensual.pdf" desde la carpeta public
   */
  const handleDownloadMonthlyReport = () => {
    try {
      const link = document.createElement('a');
      link.href = '/Reporte mensual.pdf';
      link.download = 'Reporte mensual.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el reporte:', error);
      alert('Error al descargar el reporte. Intente nuevamente.');
    }
  };

  /**
   * Función helper para truncar texto y mostrar tooltip
   * 
   * @param {string} text - Texto a truncar
   * @param {number} maxLength - Longitud máxima antes de truncar
   * @returns {Object} Objeto con texto truncado y título para tooltip
   */
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return { displayText: text, title: '' };
    }
    return { 
      displayText: text.substring(0, maxLength) + '...', 
      title: text 
    };
  };

  // ========================================
  // FUNCIONES PARA GESTIÓN DE DEPARTAMENTOS
  // ========================================

  /**
   * Agrega un nuevo departamento a la lista
   */
  const handleAddDepartment = () => {
    if (newDepartment.trim() && !departments.includes(newDepartment.trim())) {
      setDepartments([...departments, newDepartment.trim()]);
      setNewDepartment('');
      setShowAddDepartmentModal(false);
    }
  };

  /**
   * Elimina un departamento de la lista
   */
  const handleDeleteDepartment = () => {
    if (departmentToDelete && departmentToDelete !== 'Todos') {
      setDepartments(departments.filter(dept => dept !== departmentToDelete));
      setDepartmentToDelete('');
      setShowDeleteDepartmentModal(false);
    }
  };

  /**
   * Abre el modal para eliminar un departamento
   */
  const openDeleteDepartmentModal = (department) => {
    setDepartmentToDelete(department);
    setShowDeleteDepartmentModal(true);
  };

  /**
   * Guarda los cambios de configuración
   */
  const handleSaveConfiguration = () => {
    // Aquí se guardarían los cambios en el backend
    alert('Configuración guardada exitosamente');
  };

  // ========================================
  // FUNCIONES PARA GESTIÓN DE NOTIFICACIONES
  // ========================================

  /**
   * Elimina una notificación específica
   */
  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  // ========================================
  // FUNCIONES PARA NAVEGACIÓN DE SOPORTE
  // ========================================

  /**
   * Navega a la página de orientación gratuita
   */
  const handleNavigateToFreeOrientation = () => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate('free-orientation');
    }
  };

  /**
   * Navega a la página de preguntas frecuentes
   */
  const handleNavigateToFAQ = () => {
    if (navigationProps && navigationProps.onNavigate) {
      navigationProps.onNavigate('faq');
    }
  };

  /**
   * Filtra empleados activos según término de búsqueda y departamento seleccionado
   * 
   * @returns {Array} Lista filtrada de empleados activos
   */
  const filteredActiveEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'Todos' || emp.department === filterDepartment;
    return emp.status === 'Activo' && matchesSearch && matchesDepartment;
  });

  /**
   * Filtra empleados inactivos según término de búsqueda y departamento seleccionado
   * 
   * @returns {Array} Lista filtrada de empleados inactivos
   */
  const filteredInactiveEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'Todos' || emp.department === filterDepartment;
    return emp.status === 'Inactivo' && matchesSearch && matchesDepartment;
  });

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f8f9fb', overflow: 'hidden' }}>
      {/* ========================================
           SIDEBAR DE NAVEGACIÓN
           ======================================== */}
      <aside style={{
        width: sidebarOpen ? 260 : 0,
        minWidth: sidebarOpen ? 260 : 0,
        maxWidth: 260,
        background: '#e9eef6',
        borderRight: '1px solid #dde3ec',
        display: 'flex',
        flexDirection: 'column',
        padding: sidebarOpen ? '2rem 0 1rem 0' : '2rem 0 1rem 0',
        alignItems: sidebarOpen ? 'center' : 'flex-start',
        transition: 'width 0.3s cubic-bezier(.4,2,.6,1), min-width 0.3s cubic-bezier(.4,2,.6,1)',
        overflow: 'hidden',
      }}>
        {/* ========================================
             LOGO Y INFORMACIÓN DE LA EMPRESA
             ======================================== */}
        <div style={{ width: '100%', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 2rem' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#4a7cff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img 
                src={logoEmpathica} 
                alt="Empathica Logo" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '50%'
                }} 
              />
            </div>
            <div>
              <div style={{ color: '#2050c7', fontWeight: 700, fontSize: 18, lineHeight: 1 }}>Empathica</div>
              <div style={{ color: '#7a8bbd', fontSize: 13 }}>Panel Empresarial</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 32, padding: '0 2rem' }}>
            <div>
              <div style={{ color: '#2050c7', fontWeight: 700, fontSize: 16 }}>TechCorp Solutions</div>
              <div style={{ color: '#7a8bbd', fontSize: 13 }}>Empresa</div>
            </div>
          </div>
        </div>
        {/* ========================================
             MENÚ DE NAVEGACIÓN PRINCIPAL
             ======================================== */}
        <div style={{ width: '100%', flex: 1 }}>
          <div style={{ color: '#7a8bbd', fontWeight: 700, fontSize: 13, margin: '1.5rem 0 0.5rem 2rem', letterSpacing: 1 }}>NAVEGACIÓN</div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sidebarItems.map((item, idx) => (
              <button key={item.label} onClick={() => setActiveSection(item.section)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '0.7rem 2rem',
                background: activeSection === item.section ? '#e6f0ff' : 'transparent',
                color: activeSection === item.section ? '#2050c7' : '#7a8bbd',
                border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer',
                transition: 'background 0.2s',
              }}>{item.icon} {item.label}</button>
            ))}
          </nav>
        </div>
        {/* ========================================
             BOTÓN DE CERRAR SESIÓN
             ======================================== */}
        <button onClick={handleLogout} style={{
          marginTop: 'auto',
          color: '#e74c3c',
          background: 'none',
          border: 'none',
          fontWeight: 700,
          fontSize: 18,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '0.7rem 2rem',
          cursor: 'pointer',
          letterSpacing: 0.5,
        }}>
          <LogOut size={22} color="#e74c3c" style={{marginRight: 2}} /> Cerrar sesión
        </button>
      </aside>
      {/* ========================================
           CONTENIDO PRINCIPAL
           ======================================== */}
      <main style={{ flex: 1, padding: '0 3.5rem', transition: 'margin-left 0.3s cubic-bezier(.4,2,.6,1)', height: '100vh', overflowY: 'auto' }}>
        {/* ========================================
             BARRA DE ENCABEZADO
             ======================================== */}
        <BusinessHeaderBar sectionTitle={activeSection} navigationProps={navigationProps} sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen((open) => !open)} />
        
        {/* ========================================
             RENDERIZADO CONDICIONAL DE SECCIONES
             ======================================== */}
        
        {/* ========================================
             SECCIÓN DASHBOARD - VISTA PRINCIPAL
             ======================================== 
             Muestra métricas en tiempo real, estado emocional general,
             sesiones utilizadas, colaboradores activos y mapeo emocional por áreas
        */}
        {activeSection === 'Dashboard' && (
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
                  <span style={{ color: '#2050c7', fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center' }}><TrendingUp size={20} style={{marginRight: 4}}/> Mapeo Emocional por Áreas</span>
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
                  // NUEVAS ÁREAS
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
                    porcentaje: 11,
                    comentario: '5 empleados con problemas diversos',
                  },
                ].map(area => (
                  <div key={area.label} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #e0e7ef', padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                      <span style={{ width: 12, height: 12, borderRadius: '50%', background: area.color, display: 'inline-block', marginRight: 4 }}></span>
                      <span style={{ color: '#222', fontWeight: 700, fontSize: 18 }}>{area.label}</span>
                      <span style={{ background: area.status.bg, color: area.status.color, fontWeight: 700, fontSize: 13, borderRadius: 8, padding: '2px 10px', marginLeft: 8 }}>{area.status.text}</span>
                      <span style={{ marginLeft: 'auto', color: '#222', fontWeight: 800, fontSize: 18 }}>{area.empleados} empleados</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ color: area.color, fontWeight: 700, fontSize: 16 }}>{area.porcentaje}%</span>
                      <div style={{ flex: 1, height: 8, background: '#e0e7ef', borderRadius: 8, overflow: 'hidden', marginLeft: 8, marginRight: 8 }}>
                        <div style={{ width: `${area.porcentaje}%`, height: '100%', background: area.color, borderRadius: 8 }}></div>
                      </div>
                    </div>
                    <div style={{ color: '#7a8bbd', fontSize: 14, marginTop: 2 }}>{area.comentario}</div>
                  </div>
                ))}
              </div>
              {/* Columna lateral: áreas prioritarias, buen bienestar y recomendaciones */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Áreas de Atención Prioritaria */}
                <div style={{ background: '#ffeaea', borderRadius: 16, border: '1.5px solid #ffb3b3', padding: '1.2rem 1.5rem', marginBottom: 0 }}>
                  <div style={{ color: '#ff4444', fontWeight: 700, fontSize: 17, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AlertTriangle size={18} color="#ff4444" /> Áreas de Atención Prioritaria
                  </div>
                  {[
                    { label: 'Ventas', value: '28%' },
                    { label: 'Marketing', value: '45%' },
                    { label: 'Tecnología', value: '44%' },
                    { label: 'Operaciones', value: '28%' },
                  ].map(area => (
                    <div key={area.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #ffd6d6', fontSize: 15, color: '#ff4444', fontWeight: 600 }}>
                      <span>{area.label}</span>
                      <span>{area.value} estrés</span>
                    </div>
                  ))}
                </div>
                {/* Áreas con Buen Bienestar */}
                <div style={{ background: '#eaffea', borderRadius: 16, border: '1.5px solid #b3ffb3', padding: '1.2rem 1.5rem', marginBottom: 0 }}>
                  <div style={{ color: '#2ecc71', fontWeight: 700, fontSize: 17, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle size={18} color="#2ecc71" /> Áreas con Buen Bienestar
                  </div>
                  {[
                    { label: 'Recursos Humanos', value: '19%' },
                    { label: 'Finanzas', value: '23%' },
                    { label: 'Otros', value: '11%' },
                  ].map(area => (
                    <div key={area.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #d6ffd6', fontSize: 15, color: '#2ecc71', fontWeight: 600 }}>
                      <span>{area.label}</span>
                      <span>{area.value} estrés</span>
                    </div>
                  ))}
                </div>
                {/* Recomendaciones */}
                <div style={{ background: '#f6f8ff', borderRadius: 16, border: '1.5px solid #b3c6ff', padding: '1.2rem 1.5rem' }}>
                  <div style={{ color: '#2050c7', fontWeight: 700, fontSize: 17, marginBottom: 10 }}>Recomendaciones</div>
                  <ul style={{ color: '#2050c7', fontSize: 15, paddingLeft: 18, margin: 0, fontWeight: 500 }}>
                    <li>Implementar programa SST en Tecnología</li>
                    <li>Capacitación en manejo de estrés para Ventas</li>
                    <li>Reforzar buenas prácticas en RRHH</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Aquí puedes continuar agregando widgets y secciones según las imágenes */}
            {/* Temas Más Frecuentes, Consumo de Sesiones y ROI */}
            <div style={{ marginTop: 36 }}>
              {/* Temas Más Frecuentes */}
              <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', marginBottom: 28, border: '1.5px solid #f2f2f2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                  <TrendingUp size={22} color="#2050c7" style={{marginRight: 4}} />
                  <span style={{ color: '#222', fontWeight: 800, fontSize: 24 }}>Temas Más Frecuentes</span>
                </div>
                <div style={{ display: 'flex', gap: 18 }}>
                  {[
                    { label: 'Estrés laboral', value: 89 },
                    { label: 'Comunicación', value: 67 },
                    { label: 'Liderazgo', value: 45 },
                    { label: 'Work-life balance', value: 38 },
                    { label: 'Ansiedad', value: 32 },
                  ].map(t => (
                    <div key={t.label} style={{ background: '#f8f8fa', borderRadius: 16, padding: '1.1rem 1.5rem', minWidth: 170, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 1px 4px #e0e7ef' }}>
                      <span style={{ background: '#f5e3d6', color: '#b97a56', fontWeight: 700, fontSize: 15, borderRadius: 8, padding: '2px 12px', marginBottom: 10 }}>{t.label}</span>
                      <span style={{ color: '#0057ff', fontWeight: 800, fontSize: 28 }}>{t.value}</span>
                      <span style={{ color: '#7a8bbd', fontSize: 15 }}>menciones</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Consumo de Sesiones y ROI */}
              <div style={{ display: 'flex', gap: 24 }}>
                {/* Consumo de Sesiones */}
                <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <Calendar size={22} color="#ff9800" style={{marginRight: 4}} />
                    <span style={{ color: '#222', fontWeight: 800, fontSize: 22 }}>Consumo de Sesiones</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ flex: 1, height: 12, background: '#f5e3d6', borderRadius: 8, overflow: 'hidden', marginRight: 8 }}>
                      <div style={{ width: '68%', height: '100%', background: '#0057ff', borderRadius: 8 }}></div>
                    </div>
                    <span style={{ color: '#222', fontWeight: 700, fontSize: 16 }}>342 / 500</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
                    <div style={{ color: '#0057ff', fontWeight: 800, fontSize: 28, lineHeight: 1 }}>158</div>
                    <div style={{ color: '#7a8bbd', fontSize: 15, marginBottom: 4 }}>Sesiones restantes</div>
                    <div style={{ color: '#2ecc71', fontWeight: 700, fontSize: 22, marginLeft: 'auto' }}>+24%</div>
                    <div style={{ color: '#7a8bbd', fontSize: 14, marginBottom: 2 }}>vs mes anterior</div>
                  </div>
                </div>
                {/* ROI y Facturación */}
                <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 22 }}>$</span>
                    <span style={{ color: '#222', fontWeight: 800, fontSize: 22 }}>ROI y Facturación</span>
                  </div>
                  <div style={{ background: '#eaffea', borderRadius: 12, padding: '1rem 1.2rem', marginBottom: 8 }}>
                    <div style={{ color: '#7a8bbd', fontWeight: 600, fontSize: 15 }}>ROI Estimado</div>
                    <div style={{ color: '#2ecc71', fontWeight: 800, fontSize: 32, margin: '2px 0 2px 0' }}>+340%</div>
                    <div style={{ color: '#2ecc71', fontSize: 15 }}>Reducción en rotación y ausentismo</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
                    <div>
                      <div style={{ color: '#222', fontWeight: 800, fontSize: 20 }}>$15,600</div>
                      <div style={{ color: '#7a8bbd', fontSize: 15 }}>Plan mensual</div>
                    </div>
                    <div>
                      <div style={{ color: '#0057ff', fontWeight: 800, fontSize: 20 }}>$52,200</div>
                      <div style={{ color: '#7a8bbd', fontSize: 15 }}>Ahorro estimado</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ========================================
             SECCIÓN REPORTES - ANÁLISIS Y ESTADÍSTICAS
             ======================================== 
             Genera reportes detallados por categorías: Comunicación, Estrés, Liderazgo y General
             Muestra métricas de mejora, beneficios observados e impacto en la organización
        */}
        {activeSection === 'Reportes' && (
          <div style={{ marginTop: 32, marginBottom: 24 }}>
            <span style={{ color: '#222', fontWeight: 800, fontSize: 32, display: 'block', marginBottom: 24 }}>Reportes y Análisis</span>
            {/* Análisis por Categorías */}
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '2rem 2.5rem', marginBottom: 32, border: '1.5px solid #f2f2f2' }}>
              <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginBottom: 18 }}>Análisis por Categorías</div>
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
                  }}>{t}</button>
                ))}
              </div>
              {reportTab === 'Estrés' ? (
                <div style={{ display: 'flex', gap: 24 }}>
                  {/* Barras de progreso por área */}
                  <div style={{ flex: 2 }}>
                    <div style={{ color: '#222', fontWeight: 600, fontSize: 17, marginBottom: 10 }}>Reducción de Estrés por Área</div>
                    {[
                      { area: 'Tecnología', value: -45 },
                      { area: 'Ventas', value: -32 },
                      { area: 'Operaciones', value: -28 },
                      { area: 'Finanzas', value: -35 },
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
                    <div style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Beneficios Observados</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                      <span>Ausentismo</span>
                      <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18 }}>-24%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                      <span>Rotación</span>
                      <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18 }}>-31%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                      <span>Productividad</span>
                      <span style={{ color: '#2ecc71', fontWeight: 800, fontSize: 18 }}>+18%</span>
                    </div>
                  </div>
                </div>
              ) : reportTab === 'Comunicación' ? (
                <div style={{ display: 'flex', gap: 24 }}>
                  {/* Barras de progreso por área */}
                  <div style={{ flex: 2 }}>
                    <div style={{ color: '#222', fontWeight: 600, fontSize: 17, marginBottom: 10 }}>Mejoras en Comunicación Asertiva por Área</div>
                    {[
                      { area: 'Ventas', value: 28 },
                      { area: 'Marketing', value: 45 },
                      { area: 'RRHH', value: 52 },
                      { area: 'Finanzas', value: 38 },
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
                    <div style={{ color: '#2050c7', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Impacto General</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                      <span>Conflictos resueltos</span>
                      <span style={{ color: '#0057ff', fontWeight: 800, fontSize: 18 }}>+67%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                      <span>Satisfacción laboral</span>
                      <span style={{ color: '#0057ff', fontWeight: 800, fontSize: 18 }}>+43%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                      <span>Trabajo en equipo</span>
                      <span style={{ color: '#0057ff', fontWeight: 800, fontSize: 18 }}>+58%</span>
                    </div>
                  </div>
                </div>
              ) : reportTab === 'Liderazgo' ? (
                <div style={{ display: 'flex', gap: 24 }}>
                  {/* Barras de progreso por área */}
                  <div style={{ flex: 2 }}>
                    <div style={{ color: '#222', fontWeight: 600, fontSize: 17, marginBottom: 10 }}>Desarrollo de liderazgo por Área</div>
                    {[
                      { area: 'RRHH', value: 62 },
                      { area: 'Finanzas', value: 48 },
                      { area: 'Operaciones', value: 35 },
                      { area: 'Marketing', value: 41 },
                    ].map(row => (
                      <div key={row.area} style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18, background: '#fff', borderRadius: 18, padding: '0.7rem 1.2rem' }}>
                        <span style={{ color: '#222', fontWeight: 700, fontSize: 17, width: 110 }}>{row.area}</span>
                        <div style={{ flex: 1, height: 12, background: '#e0e7ef', borderRadius: 8, overflow: 'hidden', marginRight: 8 }}>
                          <div style={{ width: `${row.value}%`, height: '100%', background: '#a259e6', borderRadius: 8 }}></div>
                        </div>
                        <span style={{ color: '#a259e6', fontWeight: 700, fontSize: 17 }}>+{row.value}%</span>
                      </div>
                    ))}
                  </div>
                  {/* Habilidades Desarrolladas */}
                  <div style={{ flex: 1, background: '#faf3ff', borderRadius: 16, padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
                    <div style={{ color: '#a259e6', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Habilidades Desarrolladas</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                      <span>Toma de decisiones</span>
                      <span style={{ color: '#a259e6', fontWeight: 800, fontSize: 18 }}>+54%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                      <span>Gestión de equipos</span>
                      <span style={{ color: '#a259e6', fontWeight: 800, fontSize: 18 }}>+47%</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#222', fontWeight: 600, fontSize: 16 }}>
                      <span>Motivación</span>
                      <span style={{ color: '#a259e6', fontWeight: 800, fontSize: 18 }}>+38%</span>
                    </div>
                  </div>
                </div>
              ) : reportTab === 'General' ? (
                <div>
                  <div style={{ color: '#222', fontWeight: 600, fontSize: 17, marginBottom: 18 }}>Resumen General de Mejoras</div>
                  <div style={{ display: 'flex', gap: 24 }}>
                    {/* Comunicación */}
                    <div style={{ flex: 1, background: '#eaf3ff', borderRadius: 28, padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
                      <div style={{ color: '#2050c7', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Comunicación</div>
                      <div style={{ color: '#0057ff', fontWeight: 800, fontSize: 32, marginBottom: 2 }}>+41%</div>
                      <div style={{ color: '#2050c7', fontSize: 17 }}>Promedio general</div>
                    </div>
                    {/* Bienestar */}
                    <div style={{ flex: 1, background: '#eaffef', borderRadius: 28, padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
                      <div style={{ color: '#2ecc71', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Bienestar</div>
                      <div style={{ color: '#2ecc71', fontWeight: 800, fontSize: 32, marginBottom: 2 }}>+35%</div>
                      <div style={{ color: '#2ecc71', fontSize: 17 }}>Reducción de estrés</div>
                    </div>
                    {/* Liderazgo */}
                    <div style={{ flex: 1, background: '#faf3ff', borderRadius: 28, padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 220 }}>
                      <div style={{ color: '#a259e6', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Liderazgo</div>
                      <div style={{ color: '#a259e6', fontWeight: 800, fontSize: 32, marginBottom: 2 }}>+46%</div>
                      <div style={{ color: '#a259e6', fontSize: 17 }}>Habilidades directivas</div>
                    </div>
                  </div>
                </div>
              ) : (
                null
              )}
            </div>
            {/* Tarjetas inferiores */}
            <div style={{ display: 'flex', gap: 24 }}>
              {/* Reporte Mensual */}
              <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <FileText size={22} color="#2050c7" style={{marginRight: 4}} />
                  <span style={{ color: '#222', fontWeight: 800, fontSize: 20 }}>Reporte Mensual</span>
                </div>
                <div style={{ color: '#7a8bbd', fontSize: 16, marginBottom: 10 }}>Resumen completo del bienestar emocional</div>
                <button 
                  onClick={handleDownloadMonthlyReport}
                  style={{ background: '#fff', color: '#2050c7', border: '1.5px solid #e0e7ef', borderRadius: 12, padding: '0.8rem 0', fontWeight: 700, fontSize: 17, cursor: 'pointer', marginTop: 'auto' }}
                >
                  Descargar PDF
                </button>
              </div>
              {/* Análisis de Tendencias */}
              <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '1.5rem 2rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <TrendingUp size={22} color="#e74c3c" style={{marginRight: 4}} />
                  <span style={{ color: '#222', fontWeight: 800, fontSize: 20 }}>Análisis de Tendencias</span>
                </div>
                <div style={{ color: '#e74c3c', fontSize: 14, marginBottom: 10, fontWeight: 600 }}>
                  Error: No se pudo generar el análisis debido a la insuficiencia de datos históricos. 
                  Se requieren al menos 3 meses de información para realizar el procesamiento estadístico.
              </div>
                <button 
                  disabled
                  style={{ 
                    background: '#f8f9fa', 
                    color: '#6c757d', 
                    border: '1.5px solid #dee2e6', 
                    borderRadius: 12, 
                    padding: '0.8rem 0', 
                    fontWeight: 700, 
                    fontSize: 17, 
                    cursor: 'not-allowed', 
                    marginTop: 'auto',
                    opacity: 0.6
                  }}
                >
                  No disponible
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* ========================================
             SECCIÓN COLABORADORES - GESTIÓN DE EMPLEADOS
             ======================================== 
             Permite gestionar empleados: crear, editar, eliminar, ver detalles
             Incluye búsqueda, filtros por departamento y asignación de sesiones
        */}
        {activeSection === 'Colaboradores' && (
          <div style={{ marginTop: 32, marginBottom: 24 }}>
            {/* ========================================
                 SECCIÓN SUPERIOR: ESTADÍSTICAS Y ACCIONES RÁPIDAS
                 ======================================== 
                 Muestra estadísticas generales y acciones rápidas en la parte superior
            */}
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

            {/* ========================================
                 SECCIÓN INFERIOR: GESTOR DE EMPLEADOS
                 ======================================== 
                 Gestión completa de empleados que abarca toda la pantalla
            */}
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
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  style={{
                    padding: '0.8rem 1.2rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none',
                    minWidth: 150
                  }}
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Tabla de Empleados Activos */}
              <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2', marginBottom: 32 }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e0e7ef', background: '#f8fff8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#2ecc71' }}></div>
                    <span style={{ color: '#222', fontWeight: 800, fontSize: 20 }}>Empleados Activos ({filteredActiveEmployees.length})</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr 1fr 1fr 1.5fr', gap: 16, fontWeight: 700, color: '#222', fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>Nombre</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>Email</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Departamento</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>Cargo</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Estado</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sesiones</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Acciones</div>
                  </div>
                </div>
                
                <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                  {filteredActiveEmployees.length > 0 ? (
                    filteredActiveEmployees.map((employee) => (
                    <div key={employee.id} style={{ 
                      padding: '1.2rem 2rem', 
                      borderBottom: '1px solid #f0f0f0',
                      display: 'grid', 
                        gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr 1fr 1fr 1.5fr', 
                      gap: 16, 
                      alignItems: 'center',
                      minHeight: '60px'
                    }}>
                        <div style={{ 
                          fontWeight: 600, 
                          color: '#222', 
                          display: 'flex', 
                          alignItems: 'center',
                          wordBreak: 'break-word',
                          lineHeight: '1.3',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          cursor: 'default'
                        }}
                        title={truncateText(employee.name, 15).title}
                        >
                          {truncateText(employee.name, 15).displayText}
                        </div>
                        <div style={{ 
                          color: '#7a8bbd', 
                          display: 'flex', 
                          alignItems: 'center',
                          wordBreak: 'break-word',
                          lineHeight: '1.3',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          cursor: 'default'
                        }}
                        title={truncateText(employee.email, 20).title}
                        >
                          {truncateText(employee.email, 20).displayText}
                        </div>
                        <div style={{ 
                          color: '#222', 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'center',
                          wordBreak: 'break-word',
                          lineHeight: '1.3',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          cursor: 'default'
                        }}
                        title={truncateText(employee.department, 12).title}
                        >
                          {truncateText(employee.department, 12).displayText}
                        </div>
                        <div style={{ 
                          color: '#7a8bbd', 
                          display: 'flex', 
                          alignItems: 'center',
                          wordBreak: 'break-word',
                          lineHeight: '1.3',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          cursor: 'default'
                        }}
                        title={truncateText(employee.position, 15).title}
                        >
                          {truncateText(employee.position, 15).displayText}
                        </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ 
                            background: '#eaffea', 
                            color: '#2ecc71', 
                          fontWeight: 700, 
                          fontSize: 14, 
                          borderRadius: 8, 
                          padding: '6px 12px',
                          textAlign: 'center',
                          display: 'inline-block',
                          minWidth: '80px'
                        }}>
                            Activo
                        </span>
                      </div>
                        <div style={{ 
                          color: '#7a8bbd', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontWeight: 600, 
                          fontSize: 16,
                          textAlign: 'center'
                        }}>
                        {employee.sessions}
                      </div>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                        <button 
                          onClick={() => openEditModal(employee)}
                          style={{ 
                            background: '#fff3e0', 
                            color: '#ff9800', 
                            border: 'none', 
                            borderRadius: 8, 
                            padding: '8px 16px', 
                            fontSize: 14, 
                            cursor: 'pointer',
                            fontWeight: 600,
                            minWidth: '60px'
                          }}
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => openDeleteModal(employee)}
                          style={{ 
                            background: '#ffeaea', 
                            color: '#ff5e5e', 
                            border: 'none', 
                            borderRadius: 8, 
                            padding: '8px 16px', 
                            fontSize: 14, 
                            cursor: 'pointer',
                            fontWeight: 600,
                            minWidth: '60px'
                          }}
                        >
                            Desactivar
                        </button>
                      </div>
                    </div>
                    ))
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#7a8bbd', fontSize: 16 }}>
                      No hay empleados activos que coincidan con los filtros
                </div>
                  )}
              </div>
            </div>

              {/* Tabla de Empleados Inactivos */}
              <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', border: '1.5px solid #f2f2f2' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e0e7ef', background: '#fff8f8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5e5e' }}></div>
                    <span style={{ color: '#222', fontWeight: 800, fontSize: 20 }}>Empleados Inactivos ({filteredInactiveEmployees.length})</span>
                </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr 1fr 1fr 1.5fr', gap: 16, fontWeight: 700, color: '#222', fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>Nombre</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>Email</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>Departamento</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>Cargo</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Estado</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Sesiones</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Acciones</div>
                </div>
                </div>
                
                <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                  {filteredInactiveEmployees.length > 0 ? (
                    filteredInactiveEmployees.map((employee) => (
                      <div key={employee.id} style={{ 
                        padding: '1.2rem 2rem', 
                        borderBottom: '1px solid #f0f0f0',
                        display: 'grid', 
                        gridTemplateColumns: '2fr 2fr 1.5fr 1.5fr 1fr 1fr 1.5fr', 
                        gap: 16, 
                        alignItems: 'center',
                        minHeight: '60px',
                        background: '#fafafa'
                      }}>
                        <div style={{ 
                          fontWeight: 600, 
                          color: '#666', 
                          display: 'flex', 
                          alignItems: 'center',
                          wordBreak: 'break-word',
                          lineHeight: '1.3',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          cursor: 'default'
                        }}
                        title={truncateText(employee.name, 15).title}
                        >
                          {truncateText(employee.name, 15).displayText}
                </div>
                        <div style={{ 
                          color: '#999', 
                          display: 'flex', 
                          alignItems: 'center',
                          wordBreak: 'break-word',
                          lineHeight: '1.3',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          cursor: 'default'
                        }}
                        title={truncateText(employee.email, 20).title}
                        >
                          {truncateText(employee.email, 20).displayText}
                  </div>
                        <div style={{ 
                          color: '#666', 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'center',
                          wordBreak: 'break-word',
                          lineHeight: '1.3',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          cursor: 'default'
                        }}
                        title={truncateText(employee.department, 12).title}
                        >
                          {truncateText(employee.department, 12).displayText}
                </div>
                        <div style={{ 
                          color: '#999', 
                          display: 'flex', 
                          alignItems: 'center',
                          wordBreak: 'break-word',
                          lineHeight: '1.3',
                          maxWidth: '100%',
                          overflow: 'hidden',
                          cursor: 'default'
                        }}
                        title={truncateText(employee.position, 15).title}
                        >
                          {truncateText(employee.position, 15).displayText}
              </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ 
                            background: '#ffeaea', 
                            color: '#ff5e5e', 
                            fontWeight: 700, 
                            fontSize: 14, 
                            borderRadius: 8, 
                            padding: '6px 12px',
                            textAlign: 'center',
                            display: 'inline-block',
                            minWidth: '80px'
                          }}>
                            Inactivo
                          </span>
                        </div>
                        <div style={{ 
                          color: '#999', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          fontWeight: 600, 
                          fontSize: 16,
                          textAlign: 'center'
                        }}>
                          {employee.sessions}
                        </div>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                <button 
                            onClick={() => handleReactivateEmployee(employee)}
                            style={{ 
                              background: '#eaffea', 
                              color: '#2ecc71', 
                              border: 'none', 
                              borderRadius: 8, 
                              padding: '8px 16px', 
                              fontSize: 14, 
                              cursor: 'pointer',
                              fontWeight: 600,
                              minWidth: '60px'
                            }}
                          >
                            Reactivar
                </button>
              </div>
            </div>
                    ))
                  ) : (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#7a8bbd', fontSize: 16 }}>
                      No hay empleados inactivos
          </div>
        )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* ========================================
             SECCIÓN CONFIGURACIÓN - AJUSTES DE LA EMPRESA
             ======================================== 
             Permite configurar información de la empresa, departamentos,
             políticas de bienestar y configuración general del sistema
        */}
        {activeSection === 'Configuración' && (
          <div style={{ marginTop: 32, marginBottom: 24 }}>
            <span style={{ color: '#222', fontWeight: 800, fontSize: 32, display: 'block', marginBottom: 24 }}>Configuración</span>
            <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
              {/* Información de la Empresa */}
              <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '2rem 2.5rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Información de la Empresa</div>
                <div style={{ color: '#7a8bbd', fontWeight: 600, fontSize: 15 }}>Nombre de la empresa</div>
                <input value="TechCorp Solutions" readOnly style={{ width: '100%', fontSize: 18, padding: '0.7rem 1.2rem', borderRadius: 14, border: '1.5px solid #e0e7ef', background: '#fafbfc', color: '#222', fontWeight: 700, marginBottom: 10 }} />
                <div style={{ color: '#7a8bbd', fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Correo de la empresa</div>
                <input 
                  value={companyEmail} 
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  style={{ width: '100%', fontSize: 18, padding: '0.7rem 1.2rem', borderRadius: 14, border: '1.5px solid #e0e7ef', background: '#fff', color: '#222', fontWeight: 700, marginBottom: 10 }} 
                />
                <div style={{ color: '#7a8bbd', fontWeight: 600, fontSize: 15, marginBottom: 6 }}>Departamentos</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {departments.filter(d => d !== 'Todos').map(dep => (
                    <span key={dep} style={{ 
                      background: '#f2f2f2', 
                      color: '#222', 
                      fontWeight: 700, 
                      fontSize: 15, 
                      borderRadius: 8, 
                      padding: '6px 18px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onClick={() => openDeleteDepartmentModal(dep)}
                    title="Haz clic para eliminar"
                    >
                      {dep}
                      <span style={{ 
                        position: 'absolute', 
                        top: -5, 
                        right: -5, 
                        background: '#ff5e5e', 
                        color: '#fff', 
                        borderRadius: '50%', 
                        width: 16, 
                        height: 16, 
                        fontSize: 10, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontWeight: 'bold'
                      }}>
                        ×
                      </span>
                    </span>
                  ))}
                  <span 
                    style={{ 
                      background: '#fff', 
                      color: '#222', 
                      fontWeight: 700, 
                      fontSize: 15, 
                      borderRadius: 8, 
                      padding: '6px 18px', 
                      border: '1.5px solid #e0e7ef', 
                      cursor: 'pointer' 
                    }}
                    onClick={() => setShowAddDepartmentModal(true)}
                  >
                    + Agregar
                  </span>
                </div>
              </div>
              {/* Configuración de Notificaciones */}
              <div style={{ flex: 1, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e7ef', padding: '2rem 2.5rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Configuración de Notificaciones</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 17, color: '#222', fontWeight: 600 }}>
                  <span>Alertas de sesiones</span>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.sessionAlerts} 
                    onChange={(e) => setNotificationSettings({...notificationSettings, sessionAlerts: e.target.checked})}
                    style={{ width: 20, height: 20, accentColor: '#0057ff', marginLeft: 'auto' }} 
                  />
                  </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 17, color: '#222', fontWeight: 600 }}>
                  <span>Reportes semanales</span>
                  <input 
                    type="checkbox" 
                    checked={notificationSettings.weeklyReports} 
                    onChange={(e) => setNotificationSettings({...notificationSettings, weeklyReports: e.target.checked})}
                    style={{ width: 20, height: 20, accentColor: '#0057ff', marginLeft: 'auto' }} 
                  />
              </div>
            </div>
                </div>
            {/* Botón Guardar Cambios */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
              <button 
                onClick={handleSaveConfiguration}
                style={{ 
                  background: '#0057ff', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: 12, 
                  padding: '1rem 3rem', 
                  fontWeight: 700, 
                  fontSize: 18, 
                  cursor: 'pointer', 
                  boxShadow: '0 2px 8px #0057ff22'
                }}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        )}
        

        
        {/* ========================================
             SECCIÓN NOTIFICACIONES - SISTEMA DE COMUNICACIÓN
             ======================================== 
             Permite enviar notificaciones a empleados, configurar mensajes
             y gestionar la comunicación interna de la empresa
        */}
        {activeSection === 'Notificaciones' && (
          <div style={{ marginTop: 32, marginBottom: 24 }}>
            <div style={{ fontWeight: 800, fontSize: 32, marginBottom: 24, color: '#222' }}>
              Centro de <span style={{ background: '#2050c7', color: '#fff', borderRadius: 6, padding: '0 8px' }}>Notificaciones</span>
            </div>
            <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 2px 8px #e0e7ef', padding: '2rem 2.5rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 18 }}>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} style={{ 
                    background: '#fafbfc', 
                    borderRadius: 22, 
                    padding: '1.2rem 1.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 18, 
                    border: '1.5px solid #e0e7ef',
                    position: 'relative'
                  }}>
                    <span style={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      background: notification.color, 
                      display: 'inline-block', 
                      marginRight: 12 
                    }}></span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#222', fontWeight: 700, fontSize: 19 }}>{notification.title}</div>
                      <div style={{ color: '#7a8bbd', fontSize: 16 }}>{notification.message}</div>
                    </div>
                    <div style={{ color: '#7a8bbd', fontSize: 16, minWidth: 90, textAlign: 'right' }}>{notification.time}</div>
                          <button 
                      onClick={() => handleDeleteNotification(notification.id)}
                            style={{
                        background: 'none',
                        border: 'none',
                        color: '#ff5e5e',
                        fontSize: 18,
                              cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        marginLeft: 8
                      }}
                      title="Eliminar notificación"
                            onMouseOver={(e) => {
                        e.target.style.background = '#ffeaea';
                            }}
                            onMouseOut={(e) => {
                        e.target.style.background = 'none';
                            }}
                          >
                      ×
                          </button>
              </div>
                ))
              ) : (
                <div style={{ 
                  padding: '3rem', 
                  textAlign: 'center', 
                  color: '#7a8bbd', 
                  fontSize: 16,
                  background: '#fafbfc',
                  borderRadius: 22,
                  border: '1.5px solid #e0e7ef'
                }}>
                  No hay notificaciones para mostrar
          </div>
        )}
            </div>
          </div>
        )}
        
        {/* ========================================
             SECCIÓN SOPORTE - AYUDA Y CONTACTO
             ======================================== 
             Proporciona acceso al soporte técnico, documentación,
             FAQ y canales de contacto para asistencia
        */}
        {activeSection === 'Soporte' && (
          <div style={{ marginTop: 32, marginBottom: 24 }}>
            <span style={{ color: '#222', fontWeight: 800, fontSize: 32, display: 'block', marginBottom: 24 }}>Centro de Soporte</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
              {/* Contacto Directo */}
              <div style={{ background: '#fff', borderRadius: 28, boxShadow: '0 2px 8px #e0e7ef', padding: '2.2rem 2.5rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Contacto Directo</div>
                <div style={{ color: '#7a8bbd', fontSize: 17, marginBottom: 18 }}>Habla con nuestro equipo de soporte</div>
                <button 
                  onClick={() => window.open('https://wa.me/1234567890?text=Hola,%20necesito%20ayuda%20con%20el%20sistema%20Empathica', '_blank')}
                  style={{ background: '#0057ff', color: '#fff', border: 'none', borderRadius: 18, padding: '1.1rem 0', fontWeight: 700, fontSize: 19, cursor: 'pointer', width: '100%' }}
                >
                  💬 Iniciar chat
                </button>
              </div>
              {/* Centro de Ayuda */}
              <div style={{ background: '#fff', borderRadius: 28, boxShadow: '0 2px 8px #e0e7ef', padding: '2.2rem 2.5rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Centro de Ayuda</div>
                <div style={{ color: '#7a8bbd', fontSize: 17, marginBottom: 18 }}>Encuentra respuestas a preguntas frecuentes</div>
                <button 
                  onClick={handleNavigateToFAQ}
                  style={{ background: '#fff', color: '#222', border: '1.5px solid #e0e7ef', borderRadius: 18, padding: '1.1rem 0', fontWeight: 700, fontSize: 19, cursor: 'pointer', width: '100%' }}
                >
                  Ver FAQ
                </button>
              </div>
              {/* Programar Reunión */}
              <div style={{ background: '#fff', borderRadius: 28, boxShadow: '0 2px 8px #e0e7ef', padding: '2.2rem 2.5rem', border: '1.5px solid #f2f2f2', display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ color: '#222', fontWeight: 800, fontSize: 22, marginBottom: 8 }}>Programar Reunión</div>
                <div style={{ color: '#7a8bbd', fontSize: 17, marginBottom: 18 }}>Agenda una llamada con nuestro equipo</div>
                <button 
                  onClick={handleNavigateToFreeOrientation}
                  style={{ background: '#fff', color: '#222', border: '1.5px solid #e0e7ef', borderRadius: 18, padding: '1.1rem 0', fontWeight: 700, fontSize: 19, cursor: 'pointer', width: '100%' }}
                >
                  Agendar
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ========================================
             FIN DE SECCIONES CONDICIONALES
             ======================================== */}
      </main>

      {/* ========================================
           MODALES DEL DASHBOARD EMPRESARIAL
           ======================================== */}
      
      {/* ========================================
           MODAL CREAR EMPLEADO
           ======================================== 
           Permite agregar nuevos empleados al sistema
           Incluye formulario completo con validación
      */}
      {/* Modal Crear Empleado */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '2rem',
            width: '90%',
            maxWidth: 500,
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, margin: 0 }}>Agregar Nuevo Empleado</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#7a8bbd' }}
              >
                ×
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Nombre completo</label>
                <input
                  type="text"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Email</label>
                <input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Departamento</label>
                  <select
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      outline: 'none'
                    }}
                  >
                    <option value="">Seleccionar departamento</option>
                    {departments.filter(d => d !== 'Todos').map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Cargo</label>
                  <select
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      outline: 'none'
                    }}
                  >
                    <option value="">Seleccionar cargo</option>
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Estado</label>
                <select
                  value={newEmployee.status}
                  onChange={(e) => setNewEmployee({...newEmployee, status: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none'
                  }}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Número de Sesiones</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Ingresa el número de sesiones"
                  value={newEmployee.sessions === 0 ? '' : newEmployee.sessions}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewEmployee({
                      ...newEmployee, 
                      sessions: value === '' ? 0 : parseInt(value) || 0
                    });
                  }}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button
                onClick={handleCreateEmployee}
                disabled={!newEmployee.name || !newEmployee.email || !newEmployee.department || !newEmployee.position}
                style={{
                  flex: 1,
                  background: '#0057ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  opacity: (!newEmployee.name || !newEmployee.email || !newEmployee.department || !newEmployee.position) ? 0.5 : 1
                }}
              >
                Crear Empleado
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  flex: 1,
                  background: '#fff',
                  color: '#7a8bbd',
                  border: '1.5px solid #e0e7ef',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
           MODAL VER EMPLEADO
           ======================================== 
           Muestra información detallada de un empleado
           Incluye datos personales, departamento y estadísticas de sesiones
      */}
      {/* Modal Ver Empleado */}
      {showViewModal && selectedEmployee && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '2rem',
            width: '90%',
            maxWidth: 500,
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, margin: 0 }}>Detalles del Empleado</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#7a8bbd' }}
              >
                ×
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#7a8bbd', fontSize: 14 }}>Nombre completo</label>
                  <div style={{ color: '#222', fontWeight: 600, fontSize: 16 }}>{selectedEmployee.name}</div>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#7a8bbd', fontSize: 14 }}>Email</label>
                  <div style={{ color: '#222', fontWeight: 600, fontSize: 16 }}>{selectedEmployee.email}</div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#7a8bbd', fontSize: 14 }}>Departamento</label>
                  <div style={{ color: '#222', fontWeight: 600, fontSize: 16 }}>{selectedEmployee.department}</div>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#7a8bbd', fontSize: 14 }}>Cargo</label>
                  <div style={{ color: '#222', fontWeight: 600, fontSize: 16 }}>{selectedEmployee.position}</div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#7a8bbd', fontSize: 14 }}>Estado</label>
                  <span style={{ 
                    background: selectedEmployee.status === 'Activo' ? '#eaffea' : '#ffeaea', 
                    color: selectedEmployee.status === 'Activo' ? '#2ecc71' : '#ff5e5e', 
                    fontWeight: 700, 
                    fontSize: 14, 
                    borderRadius: 8, 
                    padding: '6px 12px',
                    display: 'inline-block'
                  }}>
                    {selectedEmployee.status}
                  </span>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#7a8bbd', fontSize: 14 }}>Sesiones completadas</label>
                  <div style={{ color: '#222', fontWeight: 600, fontSize: 16 }}>{selectedEmployee.sessions}</div>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#7a8bbd', fontSize: 14 }}>Última sesión</label>
                <div style={{ color: '#222', fontWeight: 600, fontSize: 16 }}>{selectedEmployee.lastSession}</div>
              </div>
            </div>
            
            <div style={{ marginTop: 24 }}>
              <button
                onClick={() => setShowViewModal(false)}
                style={{
                  width: '100%',
                  background: '#0057ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
           MODAL EDITAR EMPLEADO
           ======================================== 
           Permite modificar información de empleados existentes
           Mantiene datos de sesiones y última sesión
      */}
      {/* Modal Editar Empleado */}
      {showEditModal && selectedEmployee && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '2rem',
            width: '90%',
            maxWidth: 500,
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, margin: 0 }}>Editar Empleado</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#7a8bbd' }}
              >
                ×
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Nombre completo</label>
                <input
                  type="text"
                  value={editEmployee.name}
                  onChange={(e) => setEditEmployee({...editEmployee, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Email</label>
                <input
                  type="email"
                  value={editEmployee.email}
                  onChange={(e) => setEditEmployee({...editEmployee, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Departamento</label>
                  <select
                    value={editEmployee.department}
                    onChange={(e) => setEditEmployee({...editEmployee, department: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      outline: 'none'
                    }}
                  >
                    {departments.filter(d => d !== 'Todos').map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Cargo</label>
                  <select
                    value={editEmployee.position}
                    onChange={(e) => setEditEmployee({...editEmployee, position: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: 12,
                      border: '1.5px solid #e0e7ef',
                      fontSize: 16,
                      outline: 'none'
                    }}
                  >
                    {positions.map(pos => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              
            </div>
            
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button
                onClick={handleEditEmployee}
                style={{
                  flex: 1,
                  background: '#0057ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  flex: 1,
                  background: '#fff',
                  color: '#7a8bbd',
                  border: '1.5px solid #e0e7ef',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
           MODAL DESACTIVAR EMPLEADO
           ======================================== 
           Confirma la desactivación de un empleado del sistema
           El empleado se marca como inactivo pero se mantiene en el historial
      */}
      {/* Modal Desactivar Empleado */}
      {showDeleteModal && selectedEmployee && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '2rem',
            width: '90%',
            maxWidth: 400,
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, margin: '0 0 12px 0' }}>Confirmar Desactivación</h3>
              <p style={{ color: '#7a8bbd', fontSize: 16, margin: 0 }}>
                ¿Estás seguro de que quieres desactivar a <strong>{selectedEmployee.name}</strong>?
              </p>
              <p style={{ color: '#ff9800', fontSize: 14, margin: '8px 0 0 0', fontWeight: 600 }}>
                El empleado se marcará como inactivo y se moverá a la lista de empleados inactivos.
              </p>
              <p style={{ color: '#2ecc71', fontSize: 14, margin: '8px 0 0 0', fontWeight: 600 }}>
                Puedes reactivarlo en cualquier momento desde la sección de empleados inactivos.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleDeleteEmployee}
                style={{
                  flex: 1,
                  background: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Desactivar
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  flex: 1,
                  background: '#fff',
                  color: '#7a8bbd',
                  border: '1.5px solid #e0e7ef',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
           MODAL ENVIAR NOTIFICACIÓN
           ======================================== 
           Permite enviar notificaciones a empleados específicos
           Incluye selección de destinatarios y vista previa del envío
      */}
      {/* Modal Enviar Notificación */}
      {showNotificationModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '2rem',
            width: '90%',
            maxWidth: 600,
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, margin: 0 }}>Enviar Notificación</h3>
              <button 
                onClick={() => setShowNotificationModal(false)}
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#7a8bbd' }}
              >
                ×
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Destinatarios</label>
                <select
                  value={notificationForm.recipients}
                  onChange={(e) => setNotificationForm({...notificationForm, recipients: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none'
                  }}
                >
                  <option value="Todos">Todos los empleados</option>
                  <option value="Activos">Solo empleados activos</option>
                  <option value="Marketing">Departamento Marketing</option>
                  <option value="Ventas">Departamento Ventas</option>
                  <option value="RRHH">Departamento RRHH</option>
                  <option value="Tecnología">Departamento Tecnología</option>
                  <option value="Finanzas">Departamento Finanzas</option>
                  <option value="Operaciones">Departamento Operaciones</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Mensaje</label>
                <textarea
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
                  placeholder="Escribe tu mensaje aquí..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
              
              <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '1rem', border: '1px solid #e0e7ef' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 16 }}>📧</span>
                  <span style={{ fontWeight: 600, color: '#222' }}>Vista previa del envío:</span>
                </div>
                <div style={{ color: '#7a8bbd', fontSize: 14 }}>
                  <strong>Destinatarios:</strong> {notificationForm.recipients === 'Todos' ? 'Todos los empleados' : 
                    notificationForm.recipients === 'Activos' ? 'Solo empleados activos' : 
                    `Departamento ${notificationForm.recipients}`}
                </div>
                <div style={{ color: '#7a8bbd', fontSize: 14, marginTop: 4 }}>
                  <strong>Total de destinatarios:</strong> {
                    notificationForm.recipients === 'Todos' ? employees.length :
                    notificationForm.recipients === 'Activos' ? employees.filter(emp => emp.status === 'Activo').length :
                    employees.filter(emp => emp.department === notificationForm.recipients).length
                  } empleados
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button
                onClick={handleNotificationSubmit}
                disabled={!notificationForm.message.trim()}
                style={{
                  flex: 1,
                  background: '#0057ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  opacity: !notificationForm.message.trim() ? 0.5 : 1
                }}
              >
                �� Enviar Notificación
              </button>
              <button
                onClick={() => setShowNotificationModal(false)}
                style={{
                  flex: 1,
                  background: '#fff',
                  color: '#7a8bbd',
                  border: '1.5px solid #e0e7ef',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
           MODAL ASIGNAR SESIONES
           ======================================== 
           Permite asignar un número específico de sesiones a empleados
           Incluye selección de empleado y configuración de sesiones
      */}
      {/* Modal Asignar Sesiones */}
      {showAssignSessionsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '2rem',
            width: '90%',
            maxWidth: 500,
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, margin: 0 }}>Editar Sesiones</h3>
              <button 
                onClick={() => setShowAssignSessionsModal(false)}
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#7a8bbd' }}
              >
                ×
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Seleccionar Empleado</label>
                <select
                  value={assignSessionsForm.employeeId}
                  onChange={(e) => setAssignSessionsForm({...assignSessionsForm, employeeId: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none'
                  }}
                >
                  <option value="">Seleccionar un empleado</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} - {emp.department} (Sesiones actuales: {emp.sessions})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Nuevo Número de Sesiones</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Ingresa el número de sesiones"
                  value={assignSessionsForm.sessions === 0 ? '' : assignSessionsForm.sessions}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAssignSessionsForm({
                      ...assignSessionsForm, 
                      sessions: value === '' ? 0 : parseInt(value) || 0
                    });
                  }}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: '1.5px solid #e0e7ef',
                    fontSize: 16,
                    outline: 'none'
                  }}
                />
              </div>
              
              {assignSessionsForm.employeeId && (
                <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '1rem', border: '1px solid #e0e7ef' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 16 }}>👥</span>
                    <span style={{ fontWeight: 600, color: '#222' }}>Información del empleado:</span>
                  </div>
                  {(() => {
                    const selectedEmp = employees.find(emp => emp.id === parseInt(assignSessionsForm.employeeId));
                    return selectedEmp ? (
                      <div style={{ color: '#7a8bbd', fontSize: 14 }}>
                        <div><strong>Nombre:</strong> {selectedEmp.name}</div>
                        <div><strong>Departamento:</strong> {selectedEmp.department}</div>
                        <div><strong>Sesiones actuales:</strong> {selectedEmp.sessions}</div>
                        <div><strong>Sesiones después del cambio:</strong> {assignSessionsForm.sessions}</div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button
                onClick={handleAssignSessions}
                disabled={!assignSessionsForm.employeeId || assignSessionsForm.sessions < 0}
                style={{
                  flex: 1,
                  background: '#0057ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  opacity: (!assignSessionsForm.employeeId || assignSessionsForm.sessions < 0) ? 0.5 : 1
                }}
              >
                👥 Guardar Cambios
              </button>
              <button
                onClick={() => setShowAssignSessionsModal(false)}
                style={{
                  flex: 1,
                  background: '#fff',
                  color: '#7a8bbd',
                  border: '1.5px solid #e0e7ef',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
           MODAL AGREGAR DEPARTAMENTO
           ======================================== 
           Permite agregar nuevos departamentos a la empresa
      */}
      {showAddDepartmentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '2rem',
            width: '90%',
            maxWidth: 400,
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, margin: 0 }}>Agregar Departamento</h3>
              <button 
                onClick={() => setShowAddDepartmentModal(false)}
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#7a8bbd' }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Nombre del departamento</label>
              <input
                type="text"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                placeholder="Ej: Recursos Humanos"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 12,
                  border: '1.5px solid #e0e7ef',
                  fontSize: 16,
                  outline: 'none'
                }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleAddDepartment}
                disabled={!newDepartment.trim()}
                style={{
                  flex: 1,
                  background: '#0057ff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  opacity: !newDepartment.trim() ? 0.5 : 1
                }}
              >
                Agregar
              </button>
              <button
                onClick={() => setShowAddDepartmentModal(false)}
                style={{
                  flex: 1,
                  background: '#fff',
                  color: '#7a8bbd',
                  border: '1.5px solid #e0e7ef',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
           MODAL ELIMINAR DEPARTAMENTO
           ======================================== 
           Confirma la eliminación de un departamento
      */}
      {showDeleteDepartmentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            padding: '2rem',
            width: '90%',
            maxWidth: 400,
            boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
              <h3 style={{ color: '#222', fontWeight: 800, fontSize: 24, margin: '0 0 12px 0' }}>Eliminar Departamento</h3>
              <p style={{ color: '#7a8bbd', fontSize: 16, margin: 0 }}>
                ¿Estás seguro de que quieres eliminar el departamento <strong>{departmentToDelete}</strong>?
              </p>
              <p style={{ color: '#ff5e5e', fontSize: 14, margin: '8px 0 0 0' }}>
                Esta acción no se puede deshacer.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleDeleteDepartment}
                style={{
                  flex: 1,
                  background: '#ff5e5e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowDeleteDepartmentModal(false)}
                style={{
                  flex: 1,
                  background: '#fff',
                  color: '#7a8bbd',
                  border: '1.5px solid #e0e7ef',
                  borderRadius: 12,
                  padding: '1rem',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * ========================================
 * RESUMEN DEL COMPONENTE BUSINESSDEMODASHBOARD
 * ========================================
 * 
 * Este componente es el dashboard principal para empresas que utilizan Empathica.
 * Es un componente monolítico que contiene todas las funcionalidades del panel empresarial.
 * 
 * SECCIONES PRINCIPALES:
 * 1. Dashboard - Métricas en tiempo real y mapeo emocional por áreas
 * 2. Reportes - Análisis detallado por categorías (Comunicación, Estrés, Liderazgo, General)
 * 3. Colaboradores - Gestión completa de empleados (CRUD)
 * 4. Configuración - Ajustes de la empresa y políticas
 * 5. Notificaciones - Sistema de comunicación interna
 * 6. Soporte - Acceso a ayuda y documentación
 * 
 * FUNCIONALIDADES PRINCIPALES:
 * - Gestión completa de empleados (crear, editar, eliminar, ver)
 * - Sistema de notificaciones a empleados
 * - Asignación de sesiones de terapia
 * - Métricas en tiempo real de bienestar
 * - Reportes detallados de mejora organizacional
 * - Configuración de empresa y departamentos
 * 
 * NECESIDADES DE BACKEND:
 * - Autenticación y autorización empresarial
 * - API para gestión de empleados
 * - Sistema de notificaciones
 * - Base de datos para métricas y reportes
 * - Integración con sistema de sesiones
 * - Configuración de empresa y departamentos
 * 
 * TODO: Separar en componentes más pequeños para mejor mantenibilidad
 */

export default BusinessDemoDashboard; 