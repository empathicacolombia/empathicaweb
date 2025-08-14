# 🔗 Guía de Uso del Backend

## 📋 Resumen

Este documento muestra **todos los archivos** donde se hace uso del backend, las **funciones específicas** que se llaman y **cómo funciona** cada integración.

## 🏗️ Arquitectura del Backend

### **URL Base del Servidor**
```javascript
const API_BASE_URL = 'https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443';
```

### **Servicios Disponibles**
- **authService**: Autenticación (login, signup)
- **userService**: Gestión de usuarios (perfil, datos de paciente)
- **appointmentService**: Gestión de citas
- **apiClient**: Cliente HTTP con interceptores automáticos

## 📁 Archivos que Usan el Backend

### **1. 🔐 LoginPage.jsx - Autenticación**

**Ubicación**: `src/components/LoginPage.jsx`

**Función que usa el backend**:
```javascript
const handleLogin = async (e) => {
  try {
    // Llamada al backend
    const response = await authService.login({ email, password });
    
    // Procesar respuesta del backend
    const userData = {
      id: response.id || response.userId,
      email: email,
      name: response.name || response.userName,
      userType: response.role === 'PSICOLOGO' ? 'psychologist' : 
                response.role === 'EMPRESA' ? 'business' : 'client',
      token: response.token
    };

    // Guardar en contexto de autenticación
    login(userData);
    
    // Redirigir según rol
    if (response.role === 'PSICOLOGO') {
      navigate('/psychologist-dashboard');
    } else if (response.role === 'EMPRESA') {
      navigate('/business-dashboard');
    } else {
      navigate('/client-dashboard');
    }
  } catch (error) {
    setError(error.message || 'Error al iniciar sesión');
  }
};
```

**Endpoint del backend**: `POST /api/auth/login`

**Datos enviados**:
```javascript
{
  email: "usuario@ejemplo.com",
  password: "123456"
}
```

**Respuesta esperada**:
```javascript
{
  id: 123,
  name: "Juan Pérez",
  role: "PATIENT", // o "PSICOLOGO" o "EMPRESA"
  token: "jwt_token_here"
}
```

---

### **2. 📝 RegisterPage.jsx - Registro de Usuarios**

**Ubicación**: `src/components/RegisterPage.jsx`

**Función que usa el backend**:
```javascript
const handleSubmit = async (e) => {
  try {
    // Preparar datos para el backend
    const userData = {
      id: 0, // Campo requerido por el backend
      username: formData.email, // Usar email como username
      name: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      role: userType === 'patient' ? 'PATIENT' : 'PSICOLOGO'
    };

    // Llamada al backend
    const result = await authService.signup(userData);
    console.log('Registro exitoso:', result);

    // Redirigir según el tipo de usuario
    if (userType === 'psychologist') {
      handleNavigation('psychologist-profile-form');
    } else {
      handleNavigation('client-dashboard');
    }
  } catch (error) {
    setError(error.message || 'Error al registrar usuario');
  }
};
```

**Endpoint del backend**: `POST /api/auth/signup`

**Datos enviados**:
```javascript
{
  id: 0,
  username: "usuario@ejemplo.com",
  name: "Juan",
  lastName: "Pérez",
  email: "usuario@ejemplo.com",
  password: "123456",
  role: "PATIENT" // o "PSICOLOGO"
}
```

---

### **3. 👤 ClientDashboard.jsx - Dashboard del Cliente**

**Ubicación**: `src/components/ClientDashboard.jsx`

**Función que usa el backend**:
```javascript
const fetchUserInfo = async () => {
  try {
    setIsLoadingUser(true);
    setUserError('');

    // Obtener datos de autenticación
    const { token, userId } = apiConfig.getAuthData();
    
    if (!token || !userId) {
      throw new Error('No se encontraron datos de autenticación');
    }

    // Llamada al backend
    const patientData = await userService.getPatientById(userId, token);
    console.log('Información del paciente obtenida:', patientData);
    setUserInfo(patientData);

  } catch (error) {
    console.error('Error obteniendo información del usuario:', error);
    setUserError(error.message || 'Error al cargar información del usuario');
  } finally {
    setIsLoadingUser(false);
  }
};
```

**Endpoint del backend**: `GET /api/patients/{patientId}`

**Headers automáticos** (por interceptor):
```javascript
{
  'Authorization': 'Bearer jwt_token_here',
  'Content-Type': 'application/json'
}
```

**Respuesta esperada**:
```javascript
{
  id: 123,
  name: "Juan Pérez",
  lastName: "García",
  email: "juan@ejemplo.com",
  phone: "+52 55 1234 5678",
  // ... otros datos del paciente
}
```

---

### **4. 👤 ClientProfilePage.jsx - Perfil del Cliente**

**Ubicación**: `src/components/ClientProfilePage.jsx`

**Función que usa el backend**:
```javascript
const fetchUserInfo = async () => {
  try {
    setIsLoadingUser(true);
    setUserError('');

    // Obtener datos de autenticación
    const { token, userId } = apiConfig.getAuthData();
    
    if (!token || !userId) {
      throw new Error('No se encontraron datos de autenticación');
    }

    // Llamada al backend
    const patientData = await userService.getPatientById(userId, token);
    console.log('Información del paciente obtenida en perfil:', patientData);
    
    // Actualizar el estado con la información del backend
    setUserInfo(patientData);
    setProfileData({
      firstName: patientData.name || '',
      lastName: patientData.lastName || '',
      email: patientData.email || '',
      phone: patientData.phone || '',
      age: 28 // Mantener edad por defecto ya que no viene del backend
    });

  } catch (error) {
    console.error('Error obteniendo información del usuario en perfil:', error);
    setUserError(error.message || 'Error al cargar información del usuario');
    
    // Usar datos por defecto en caso de error
    setProfileData({
      firstName: 'Usuario',
      lastName: '',
      email: 'usuario@email.com',
      phone: '+52 55 1234 5678',
      age: 28
    });
  } finally {
    setIsLoadingUser(false);
  }
};
```

**Endpoint del backend**: `GET /api/patients/{patientId}`

**Uso**: Mismo endpoint que ClientDashboard, pero con manejo de errores más robusto y datos por defecto.

---

## 🔧 Servicios de API (src/services/api.js)

### **authService - Autenticación**

#### **login(credentials)**
```javascript
login: async (credentials) => {
  try {
    const loginData = {
      email: credentials.email,
      password: credentials.password
    };

    const response = await apiClient.post('/api/auth/login', loginData);
    return handleResponse(response);
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
}
```

#### **signup(userData)**
```javascript
signup: async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/signup', userData);
    return handleResponse(response);
  } catch (error) {
    console.error('Error en signup:', error);
    throw error;
  }
}
```

### **userService - Gestión de Usuarios**

#### **getPatientById(patientId)**
```javascript
getPatientById: async (patientId) => {
  try {
    const response = await apiClient.get(`/api/patients/${patientId}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error obteniendo paciente:', error);
    throw error;
  }
}
```

#### **getProfile()**
```javascript
getProfile: async () => {
  try {
    const response = await apiClient.get('/api/users/profile');
    return handleResponse(response);
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    throw error;
  }
}
```

#### **updateProfile(profileData)**
```javascript
updateProfile: async (profileData) => {
  try {
    const response = await apiClient.put('/api/users/profile', profileData);
    return handleResponse(response);
  } catch (error) {
    console.error('Error actualizando perfil:', error);
    throw error;
  }
}
```

### **appointmentService - Gestión de Citas**

#### **getAppointments()**
```javascript
getAppointments: async () => {
  try {
    const response = await apiClient.get('/api/appointments');
    return handleResponse(response);
  } catch (error) {
    console.error('Error obteniendo citas:', error);
    throw error;
  }
}
```

#### **createAppointment(appointmentData)**
```javascript
createAppointment: async (appointmentData) => {
  try {
    const response = await apiClient.post('/api/appointments', appointmentData);
    return handleResponse(response);
  } catch (error) {
    console.error('Error creando cita:', error);
    throw error;
  }
}
```

## 🔐 Interceptores Automáticos

### **Interceptor de Request**
```javascript
apiClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('empathica_user') || '{}');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
```

**Función**: Agrega automáticamente el token de autenticación a todas las peticiones.

### **Interceptor de Response**
```javascript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('empathica_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**Función**: Maneja automáticamente errores de autenticación (401) y redirige al login.

## 📊 Resumen de Endpoints

| Método | Endpoint | Descripción | Usado en |
|--------|----------|-------------|----------|
| `POST` | `/api/auth/login` | Iniciar sesión | LoginPage.jsx |
| `POST` | `/api/auth/signup` | Registrar usuario | RegisterPage.jsx |
| `GET` | `/api/patients/{id}` | Obtener datos del paciente | ClientDashboard.jsx, ClientProfilePage.jsx |
| `GET` | `/api/users/profile` | Obtener perfil del usuario | (Disponible) |
| `PUT` | `/api/users/profile` | Actualizar perfil del usuario | (Disponible) |
| `GET` | `/api/appointments` | Obtener citas del usuario | (Disponible) |
| `POST` | `/api/appointments` | Crear nueva cita | (Disponible) |

## 🔄 Flujo de Datos

### **1. Login**
```
Usuario ingresa credenciales → LoginPage.jsx → authService.login() → Backend → Respuesta con token → AuthContext → Redirección
```

### **2. Registro**
```
Usuario llena formulario → RegisterPage.jsx → authService.signup() → Backend → Respuesta de éxito → Redirección
```

### **3. Carga de Datos del Usuario**
```
Componente se monta → fetchUserInfo() → userService.getPatientById() → Backend → Datos del paciente → Estado del componente
```

## ⚠️ Manejo de Errores

### **Errores de Autenticación (401)**
- Se manejan automáticamente por interceptores
- Se limpia localStorage
- Se redirige al login

### **Errores de Red**
- Se capturan en try/catch
- Se muestran mensajes de error al usuario
- Se usan datos por defecto cuando es apropiado

### **Errores de Validación**
- Se validan en frontend antes de enviar al backend
- Se muestran mensajes específicos al usuario

## 🚀 Próximos Pasos

### **Endpoints Pendientes de Implementar**
1. **Actualización de perfil**: `PUT /api/users/profile`
2. **Gestión de citas**: `GET /api/appointments`, `POST /api/appointments`
3. **Verificación de token**: `GET /api/auth/verify`

### **Mejoras Sugeridas**
1. **Refresh tokens**: Renovación automática de tokens
2. **Cache de datos**: Almacenar datos localmente para mejor rendimiento
3. **Retry logic**: Reintentos automáticos en fallos de red
4. **Offline support**: Funcionalidad básica sin conexión
