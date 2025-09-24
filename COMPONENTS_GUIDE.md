# Guía de Componentes - Empathica

## Estructura de Componentes

### Páginas Principales
- **LandingPage.jsx** - Página de inicio
- **LoginPage.jsx** - Autenticación de usuarios
- **RegisterPage.jsx** - Registro de usuarios
- **PsychologistsPage.jsx** - Lista de psicólogos

### Dashboards Especializados
- **PsychologistDashboard.jsx** - Panel para psicólogos
- **ClientDashboard.jsx** - Panel para pacientes
- **BusinessDashboard.jsx** - Panel para empresas

### Funcionalidades Específicas
- **AppointmentsPage.jsx** - Gestión de citas
- **MySpecialistPage.jsx** - Perfil del psicólogo asignado
- **TestResults.jsx** - Resultados del test de matching
- **QuestionnaireMatch.jsx** - Cuestionario de matching
- **BusinessEmployees.jsx** - Gestión de empleados
- **PsychologistSchedule.jsx** - Horarios de psicólogos
- **PsychologistScheduleModal.jsx** - Modal de agendamiento

---

## Componentes de Autenticación

### LoginPage.jsx
**Propósito**: Manejo de autenticación de usuarios

**Funcionalidades**:
- Formulario de login con email y contraseña
- Validación de campos
- Manejo de errores de autenticación
- Redirección automática según tipo de usuario
- Limpieza de tags de test al hacer login

**Estado**:
```javascript
const [formData, setFormData] = useState({
  email: '',
  password: ''
});
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

**Funciones Principales**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    await login(formData);
    // Redirección automática según userType
  } catch (error) {
    setError('Credenciales inválidas');
  } finally {
    setLoading(false);
  }
};
```

---

### RegisterPage.jsx
**Propósito**: Registro de nuevos usuarios

**Funcionalidades**:
- Formulario de registro con validación
- Selección de tipo de usuario (paciente/psicólogo)
- Registro en dos pasos (signup + información adicional)
- Manejo de errores y validaciones
- Redirección automática después del registro

**Estado**:
```javascript
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
});
const [userType, setUserType] = useState('patient');
const [loading, setLoading] = useState(false);
```

**Flujo de Registro**:
1. POST /api/auth/signup - Registro básico
2. POST /api/patients - Información adicional (solo pacientes)
3. Login automático con credenciales
4. Redirección al dashboard correspondiente

---

## Dashboards Especializados

### ClientDashboard.jsx
**Propósito**: Panel principal para pacientes

**Funcionalidades**:
- Navegación entre secciones
- Información del psicólogo asignado
- Acceso al test de matching
- Gestión de citas
- Perfil del usuario

**Secciones**:
- **Mi Especialista**: Información del psicólogo asignado
- **Citas**: Próximas citas y historial
- **For You**: Contenido personalizado
- **Soporte**: Ayuda y contacto

**Navegación**:
```javascript
const menuItems = [
  { id: 'specialist', label: 'Mi Especialista', path: '/my-specialist' },
  { id: 'appointments', label: 'Citas', path: '/appointments' },
  { id: 'foryou', label: 'For You', path: '/for-you' },
  { id: 'support', label: 'Soporte', path: '/support' }
];
```

---

### PsychologistDashboard.jsx
**Propósito**: Panel principal para psicólogos

**Funcionalidades**:
- Gestión de horarios
- Lista de pacientes
- Información de sesiones
- Perfil del psicólogo

**Secciones**:
- **Horarios**: Configuración de disponibilidad
- **Pacientes**: Lista de pacientes asignados
- **Sesiones**: Próximas sesiones y historial
- **Perfil**: Información personal y profesional

---

### BusinessDashboard.jsx
**Propósito**: Panel para administradores de empresa

**Funcionalidades**:
- Gestión de empleados
- Carga masiva de empleados (CSV)
- Asignación de tokens de sesión
- Reportes y estadísticas

**Secciones**:
- **Empleados**: Lista y gestión de empleados
- **Carga Masiva**: Subida de CSV de empleados
- **Tokens**: Asignación de sesiones disponibles
- **Reportes**: Estadísticas de uso

---

## Componentes de Test de Matching

### QuestionnaireMatch.jsx
**Propósito**: Cuestionario psicológico para matching

**Funcionalidades**:
- Preguntas del test de matching
- Navegación entre preguntas
- Validación de respuestas
- Procesamiento de resultados
- Redirección a resultados

**Estado**:
```javascript
const [currentQuestion, setCurrentQuestion] = useState(0);
const [answers, setAnswers] = useState({});
const [loading, setLoading] = useState(false);
```

**Flujo**:
1. Usuario responde preguntas
2. Validación de respuestas completas
3. Procesamiento de resultados
4. Navegación a TestResults con datos

---

### TestResults.jsx
**Propósito**: Mostrar resultados del test y psicólogos recomendados

**Funcionalidades**:
- Mostrar tags generados del test
- Lista de psicólogos recomendados
- Información detallada de psicólogos
- Guardado de tags en localStorage
- Navegación a selección de psicólogo

**Estado**:
```javascript
const [patientProfile, setPatientProfile] = useState(null);
const [recommendedPsychologist, setRecommendedPsychologist] = useState(null);
const [otherPsychologists, setOtherPsychologists] = useState([]);
const [loading, setLoading] = useState(true);
```

**Funciones Principales**:
```javascript
// Guardar tags en localStorage (NO enviar al backend aún)
useEffect(() => {
  if (patientProfile && patientProfile.tags && recommendedPsychologist) {
    const tagsForStorage = {
      tags: patientProfile.tags.slice(0, 3).map(tag => ({
        name: tag,
        percentage: 100
      })),
      recommendedPsychologistId: recommendedPsychologist.id
    };
    localStorage.setItem('empathica_test_tags', JSON.stringify(tagsForStorage));
  }
}, [patientProfile, recommendedPsychologist]);
```

---

### MySpecialistPage.jsx
**Propósito**: Perfil del psicólogo asignado y selección

**Funcionalidades**:
- Mostrar psicólogo recomendado
- Mostrar psicólogo asignado (si existe)
- Asignación de psicólogo
- Envío de tags al backend después de asignación
- Limpieza de localStorage

**Estado**:
```javascript
const [recommendedPsychologist, setRecommendedPsychologist] = useState(null);
const [assignedPsychologist, setAssignedPsychologist] = useState(null);
const [psychologistAssigned, setPsychologistAssigned] = useState(false);
const [loading, setLoading] = useState(true);
```

**Flujo de Asignación**:
```javascript
const handleAssignPsychologist = async (psychologistId) => {
  try {
    // 1. Asignar psicólogo
    await userService.assignPsychologistToPatient({ userId: psychologistId });
    
    // 2. Actualizar estado
    setPsychologistAssigned(true);
    await fetchPatientData();
    
    // 3. Enviar tags al backend DESPUÉS de asignación
    await updatePatientTagsFromLocalStorage();
    
    // 4. Limpiar localStorage
    if (tagsUpdated) {
      clearLocalStorageTags();
    }
  } catch (error) {
    console.error('Error asignando psicólogo:', error);
  }
};
```

---

## Componentes de Gestión de Citas

### AppointmentsPage.jsx
**Propósito**: Gestión de citas y sesiones

**Funcionalidades**:
- Mostrar próximas citas
- Mostrar historial de citas
- Crear nuevas sesiones
- Manejo de error 402 (tokens de sesión)
- Formateo de fechas sin conversión de zona horaria

**Estado**:
```javascript
const [appointments, setAppointments] = useState([]);
const [activeTab, setActiveTab] = useState('upcoming');
const [loading, setLoading] = useState(true);
```

**Funciones Principales**:
```javascript
// Crear sesión con manejo de error 402
const createSessionDirectly = async (psychologistId, sessionDateTime) => {
  try {
    const response = await appointmentService.createSession(psychologistId, sessionDateTime);
    // ... manejo exitoso
  } catch (error) {
    if (error.response?.status === 402) {
      alert('No tienes sesiones disponibles.\n\nTu administrador debe asignarte más tokens de sesión para poder agendar citas.\n\nContacta a tu administrador para solicitar más sesiones.');
    } else {
      alert('Error al agendar la sesión. Inténtalo de nuevo.');
    }
  }
};

// Formateo de hora sin conversión de zona horaria
const timeString = session.sessionTime; // ej: "2024-01-15T14:30:00"
const timeMatch = timeString.match(/T(\d{2}):(\d{2})/);
const formattedTime = timeMatch ? `${timeMatch[1]}:${timeMatch[2]}` : '14:00';
```

---

### PsychologistScheduleModal.jsx
**Propósito**: Modal para agendar citas con psicólogos

**Funcionalidades**:
- Mostrar horarios disponibles del psicólogo
- Selección de fecha y hora
- Creación de sesión
- Formateo de fecha sin zona horaria

**Estado**:
```javascript
const [selectedDate, setSelectedDate] = useState(null);
const [selectedTime, setSelectedTime] = useState(null);
const [loading, setLoading] = useState(false);
```

**Funciones Principales**:
```javascript
// Generar fecha y hora sin zona horaria
const generateSessionDateTime = (day, startTime) => {
  const sessionDate = new Date();
  // ... lógica de cálculo de fecha
  
  // Formatear sin zona horaria
  const year = sessionDate.getFullYear();
  const month = String(sessionDate.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(sessionDate.getDate()).padStart(2, '0');
  const hour = String(sessionDate.getHours()).padStart(2, '0');
  const minute = String(sessionDate.getMinutes()).padStart(2, '0');
  const second = String(sessionDate.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${dayOfMonth}T${hour}:${minute}:${second}`;
};
```

---

## Componentes de Gestión de Empleados

### BusinessEmployees.jsx
**Propósito**: Gestión de empleados en dashboard de empresa

**Funcionalidades**:
- Lista de empleados con paginación
- Agregar empleados individuales
- Carga masiva de empleados (CSV)
- Validación de archivos CSV
- Preview de datos antes de subir
- Selección de departamento para empleados
- Navegación entre páginas de empleados
- Visualización del nombre del departamento en la tabla
- Estadísticas generales basadas en datos reales del API
- Modal de CSV más ancho con scroll horizontal para mejor visualización

**Estado**:
```javascript
const [employees, setEmployees] = useState([]);
const [showUploadModal, setShowUploadModal] = useState(false);
const [csvFile, setCsvFile] = useState(null);
const [uploading, setUploading] = useState(false);
const [uploadError, setUploadError] = useState('');
const [uploadSuccess, setUploadSuccess] = useState('');
const [newEmployee, setNewEmployee] = useState({
  name: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  gender: '',
  departmentId: '',
  companyId: user?.company?.companyId || 1
});

// Estados para paginación
const [currentPage, setCurrentPage] = useState(0);
const [totalPages, setTotalPages] = useState(0);
const [totalElements, setTotalElements] = useState(0);
const [pageSize] = useState(10);

// Estados para estadísticas generales
const [totalEmployees, setTotalEmployees] = useState(0);
const [activeEmployees, setActiveEmployees] = useState(0);
const [inactiveEmployees, setInactiveEmployees] = useState(0);
const [totalSessions, setTotalSessions] = useState(0);
```

**Departamentos disponibles**:
```javascript
const DEPARTMENTS = [
  { departmentId: 1, name: "Ventas" },
  { departmentId: 2, name: "Marketing" },
  { departmentId: 3, name: "Tecnología" },
  { departmentId: 4, name: "Recursos humanos" },
  { departmentId: 5, name: "Finanzas" },
  { departmentId: 6, name: "Operaciones" },
  { departmentId: 7, name: "Otros" }
];
```

**Funciones Principales**:
```javascript
// Manejo de carga de CSV
const handleUploadCSV = async () => {
  if (!csvFile) {
    setUploadError('Por favor selecciona un archivo CSV.');
    return;
  }
  
  setUploading(true);
  setUploadError('');
  setUploadSuccess('');
  
  try {
    const formData = new FormData();
    formData.append('file', csvFile);
    
    const response = await appointmentService.createBulkPatients(formData);
    setUploadSuccess(`Archivo subido exitosamente. ${response.createdCount || 0} empleados creados.`);
    
    setTimeout(() => {
      fetchEmployees();
      closeUploadModal();
    }, 2000);
  } catch (error) {
    setUploadError(error.response?.data?.message || error.message || 'Error al subir el archivo CSV.');
  } finally {
    setUploading(false);
  }
};

// Funciones de paginación
const handlePageChange = (newPage) => {
  if (newPage >= 0 && newPage < totalPages) {
    setCurrentPage(newPage);
    fetchEmployees(newPage);
  }
};

const handlePreviousPage = () => {
  if (currentPage > 0) {
    handlePageChange(currentPage - 1);
  }
};

const handleNextPage = () => {
  if (currentPage < totalPages - 1) {
    handlePageChange(currentPage + 1);
  }
};

// Obtener empleados con paginación
const fetchEmployees = async (page = 0) => {
  const companyId = user?.company?.companyId;
  if (!companyId) {
    setEmployeesError('No se pudo obtener el ID de la empresa');
    return;
  }
  await fetchEmployeesByCompanyId(companyId, page);
};

// Transformación de datos del API
const transformedEmployees = patientsArray.map((patient, index) => {
  return {
    id: patient.userId || patient.id || index + 1,
    firstName: patient.name || '',
    lastName: patient.lastName || '',
    name: `${patient.name || ''} ${patient.lastName || ''}`.trim(),
    email: patient.email || '',
    phone: patient.phoneNumber || patient.phone || '',
    gender: patient.gender || 'No especificado',
    department: patient.department?.name || 'Sin departamento', // Nombre del departamento
    departmentId: patient.department?.departmentId || null, // ID del departamento
    status: patient.userStatus === 'ACTIVE' ? 'Activo' : 'Inactivo',
    tokensLeft: patient.tokensLeft !== null && patient.tokensLeft !== undefined ? patient.tokensLeft : 0,
    tags: patient.tags || []
  };
});

// Actualización de estadísticas generales
const updateStatistics = (companyPatients, patientsArray) => {
  // Actualizar información de paginación
  setTotalPages(companyPatients.totalPages || 0);
  setTotalElements(companyPatients.totalElements || 0);
  setCurrentPage(companyPatients.number || 0);
  
  // Actualizar estadísticas generales
  setTotalEmployees(companyPatients.totalElements || 0);
  
  // Calcular empleados activos e inactivos de la página actual
  const activeCount = patientsArray.filter(patient => patient.userStatus === 'ACTIVE').length;
  const inactiveCount = patientsArray.filter(patient => patient.userStatus !== 'ACTIVE').length;
  
  // Calcular sesiones de la página actual
  const sessionsCount = patientsArray.reduce((sum, patient) => sum + (patient.tokensLeft || 0), 0);
  
  setActiveEmployees(activeCount);
  setInactiveEmployees(inactiveCount);
  setTotalSessions(sessionsCount);
};

// UI de estadísticas con etiquetas específicas
// - "Total empleados": Número total de empleados en la empresa
// - "Activos en esta página": Empleados activos en la página actual
// - "Inactivos en esta página": Empleados inactivos en la página actual
// - "Sesiones en esta página": Suma de tokens disponibles en la página actual
```

// Crear nuevo empleado
const handleSubmitEmployee = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');
  setSuccess('');

  try {
    // Validaciones básicas
    if (!newEmployee.name || !newEmployee.lastName || !newEmployee.email || 
        !newEmployee.phoneNumber || !newEmployee.dateOfBirth || 
        !newEmployee.gender || !newEmployee.departmentId) {
      throw new Error('Por favor completa todos los campos obligatorios');
    }

    // Preparar datos para el API
    const employeeData = {
      name: newEmployee.name,
      lastName: newEmployee.lastName,
      email: newEmployee.email,
      phoneNumber: newEmployee.phoneNumber.replace(/\D/g, ''),
      dateOfBirth: newEmployee.dateOfBirth,
      gender: newEmployee.gender,
      companyId: newEmployee.companyId,
      departmentId: parseInt(newEmployee.departmentId)
    };

    // Llamada al API
    const response = await apiClient.post('/api/patients', employeeData);
    const result = response.data;
    
    setSuccess('Empleado agregado exitosamente');
    
    // Recargar la lista de empleados
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
```

---

## Componentes de Horarios

### PsychologistSchedule.jsx
**Propósito**: Configuración de horarios para psicólogos

**Funcionalidades**:
- Configuración de horarios semanales
- Agregar/eliminar horarios
- Validación de horarios
- Guardado en backend
- Manejo de duplicados

**Estado**:
```javascript
const [schedule, setSchedule] = useState({});
const [existingSchedule, setExistingSchedule] = useState([]);
const [editMode, setEditMode] = useState(false);
const [loading, setLoading] = useState(false);
```

**Funciones Principales**:
```javascript
// Guardar configuración con limpieza de duplicados
const saveConfiguration = async () => {
  setLoading(true);
  
  try {
    // Eliminar horarios existentes primero
    for (const existingSlot of existingSchedule) {
      try {
        await userService.deletePsychologistSchedule(existingSlot.id);
      } catch (error) {
        console.warn('Error eliminando horario existente:', error);
      }
    }
    
    // Crear nuevos horarios
    for (const day in schedule) {
      if (schedule[day].enabled && schedule[day].timeSlots.length > 0) {
        for (const timeSlot of schedule[day].timeSlots) {
          await userService.createPsychologistSchedule({
            psychologistId: user.id,
            day: day,
            startTime: timeSlot.start,
            endTime: timeSlot.end
          });
        }
      }
    }
    
    setEditMode(false);
    await fetchSchedule();
  } catch (error) {
    console.error('Error guardando horarios:', error);
  } finally {
    setLoading(false);
  }
};
```

---

## Componentes de Navegación

### Navbar.jsx
**Propósito**: Barra de navegación principal

**Funcionalidades**:
- Navegación entre páginas
- Estado de autenticación
- Menú de usuario
- Logout

**Estado**:
```javascript
const { user, logout } = useAuth();
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

---

## Hooks Personalizados

### useSessionTimeout.js
**Propósito**: Manejo de timeout de sesión por inactividad

**Funcionalidades**:
- Timeout configurable (60 minutos por defecto)
- Reset automático con actividad del usuario
- Event listeners para mouse, teclado, scroll, touch
- Limpieza automática de sesión

**Uso**:
```javascript
// En los dashboards
useSessionTimeout(60); // 60 minutos de inactividad
```

---

## Contextos

### AuthContext.jsx
**Propósito**: Gestión global de autenticación

**Funcionalidades**:
- Estado global de usuario
- Funciones de login/logout
- Mapeo de roles del backend
- Limpieza automática de sesiones
- Limpieza de tags de test

**Estado**:
```javascript
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
```

**Funciones Principales**:
```javascript
const login = async (credentials) => {
  clearSession(); // Limpiar sesión anterior
  const response = await authService.login(credentials);
  const userDetails = await userService.getUserDetails();
  const userWithType = mapUserRolesToType(userDetails);
  setUser(userWithType);
};

const logout = () => {
  try {
    authService.logout();
    localStorage.removeItem('empathica_test_tags'); // Limpiar test tags
    setUser(null);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

const clearSession = () => {
  localStorage.removeItem('empathica_token');
  localStorage.removeItem('empathica_user');
  localStorage.removeItem('empathica_test_tags'); // Limpiar tags de test
  setUser(null);
};
```

---

## Servicios

### api.js
**Propósito**: Servicios API con interceptores

**Funcionalidades**:
- Cliente Axios configurado
- Interceptores de request/response
- Manejo automático de tokens
- Manejo de errores
- Rutas públicas y opcionales

**Estructura**:
```javascript
// Cliente Axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

// Interceptores
apiClient.interceptors.request.use((config) => {
  // Lógica de rutas públicas/opcionales
  // Verificación de expiración de token
  // Agregar token a headers
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores 401, 402, 403
  }
);

// Servicios
export const authService = { ... };
export const userService = { ... };
export const appointmentService = { ... };
export const companyService = { ... };
```

---

## Mejores Prácticas

### 1. **Manejo de Estado**
- Usar useState para estado local
- Usar useContext para estado global
- Limpiar estado al desmontar componentes

### 2. **Manejo de Errores**
- Try-catch en funciones async
- Mensajes de error específicos
- Manejo de errores 402 para tokens de sesión

### 3. **Optimización**
- useEffect con dependencias correctas
- Limpieza de event listeners
- Evitar re-renders innecesarios

### 4. **Seguridad**
- Limpiar localStorage en logout
- Verificar tokens antes de peticiones
- Manejar expiración de sesiones

### 5. **UX**
- Loading states en operaciones async
- Mensajes de error claros
- Confirmaciones para acciones importantes

---

*Última actualización: Diciembre 2024*
*Versión del documento: 1.0*
