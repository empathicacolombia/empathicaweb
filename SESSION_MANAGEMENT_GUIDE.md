# Guía de Manejo de Sesiones y Tokens - Empathica

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Componentes Principales](#componentes-principales)
4. [Flujo de Autenticación](#flujo-de-autenticación)
5. [Protecciones de Seguridad](#protecciones-de-seguridad)
6. [Manejo de Errores](#manejo-de-errores)
7. [Configuración](#configuración)
8. [Troubleshooting](#troubleshooting)

---

## Descripción General

El sistema de manejo de sesiones y tokens de Empathica está diseñado para proporcionar una experiencia de usuario segura y fluida, evitando problemas comunes como sesiones mezcladas, tokens obsoletos y accesos no autorizados.

### Objetivos del Sistema

- **Prevenir sesiones mezcladas** entre diferentes usuarios
- **Manejar automáticamente la expiración de tokens**
- **Limpiar sesiones en escenarios de cierre/error**
- **Proporcionar timeout por inactividad**
- **Alertar al usuario antes de la expiración**
- **Mantener la seguridad sin comprometer la UX**
- **Gestionar tags de test de matching de forma segura**

---

## Arquitectura del Sistema

### Estructura de Archivos

```
src/
├── contexts/
│   └── AuthContext.jsx          # Contexto principal de autenticación
├── services/
│   └── api.js                   # Servicios API con interceptores
├── hooks/
│   └── useSessionTimeout.js     # Hook para timeout de sesión
├── components/
│   ├── SessionTimeoutAlert.jsx  # Alerta de expiración
│   ├── PsychologistDashboard.jsx
│   ├── ClientDashboard.jsx
│   ├── BusinessDashboard.jsx
│   ├── TestResults.jsx          # Manejo de tags de test
│   ├── MySpecialistPage.jsx     # Asignación de psicólogos
│   └── LoginPage.jsx            # Login con limpieza de tags
```

### Flujo de Datos

```
Usuario → Login → Token JWT → localStorage → Interceptores → API Calls
   ↓
Contexto → Estado Global → Componentes → Timeout/Alertas
   ↓
Test Tags → localStorage → Backend (solo después de asignación)
```

---

## Componentes Principales

### 1. **AuthContext.jsx** - Contexto de Autenticación

**Responsabilidades:**
- Gestión del estado global de autenticación
- Mapeo de roles del backend a tipos de usuario
- Limpieza automática de sesiones
- Event listeners para cierre de ventana
- Limpieza de tags de test de matching

**Funciones Principales:**

```javascript
// Login con limpieza automática de sesión anterior
const login = async (credentials) => {
  // 1. Limpiar sesión anterior
  clearSession();
  
  // 2. Hacer login
  const response = await authService.login(credentials);
  
  // 3. Obtener detalles del usuario
  const userDetails = await userService.getUserDetails();
  
  // 4. Mapear roles y guardar
  const userWithType = mapUserRolesToType(userDetails);
  setUser(userWithType);
};

// Limpieza completa de sesión
const clearSession = () => {
  localStorage.removeItem('empathica_token');
  localStorage.removeItem('empathica_user');
  localStorage.removeItem('empathica_test_tags'); // Limpiar tags de test
  setUser(null);
};

// Logout con limpieza de tags
const logout = () => {
  try {
    authService.logout();
    localStorage.removeItem('empathica_test_tags'); // Limpiar test tags
    setUser(null);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
```

### 2. **api.js** - Servicios API con Interceptores

**Interceptores Implementados:**

#### Request Interceptor
```javascript
apiClient.interceptors.request.use((config) => {
  // Rutas públicas (no requieren token)
  const publicRoutes = [
    '/api/auth/login',
    '/api/psychologists', // Solo para POST (registro)
    '/api/patients' // Solo para POST (registro público)
  ];
  
  // Rutas con token opcional
  const optionalTokenRoutes = [
    '/api/patients' // POST: registro público (sin token) o dashboard empresa (con token)
  ];
  
  // Verificar si es ruta pública
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/api/psychologists') {
      return config.url.includes(route) && 
             (config.method === 'post' && !config.url.includes('/schedule')) ||
             (config.method === 'get' && config.url === '/api/psychologists');
    }
    if (route === '/api/patients') {
      return config.url === route && config.method === 'post';
    }
    return config.url.includes(route) && config.method === 'post';
  });
  
  // Verificar si es ruta con token opcional
  const isOptionalTokenRoute = optionalTokenRoutes.some(route => {
    if (route === '/api/patients') {
      return config.url === route && config.method === 'post' && !config.url.includes('/bulk');
    }
    return false;
  });
  
  if (isPublicRoute) {
    return config;
  }
  
  if (isOptionalTokenRoute) {
    const token = localStorage.getItem('empathica_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
  
  // Verificar expiración del token antes de cada request
  if (isTokenExpired()) {
    clearSession();
    window.location.href = '/login';
    return Promise.reject(new Error('Token expirado'));
  }
  
  // Agregar token a headers
  const token = localStorage.getItem('empathica_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### Response Interceptor
```javascript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      clearSession();
      window.location.href = '/login';
    } else if (error.response?.status === 402) {
      // Usuario sin sesiones disponibles (tokens de sesión)
      console.warn('Error 402: Usuario sin sesiones disponibles');
    } else if (error.response?.status === 403) {
      // Acceso denegado
      clearSession();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 3. **useSessionTimeout.js** - Hook de Timeout

**Funcionalidades:**
- Timeout por inactividad (60 minutos por defecto)
- Reset automático con actividad del usuario
- Event listeners para mouse, teclado, scroll, touch

```javascript
export const useSessionTimeout = (timeoutMinutes = 60) => {
  const { clearSession } = useAuth();
  
  const resetTimeout = () => {
    // Resetear timeout con actividad del usuario
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      clearSession();
      window.location.href = '/login';
    }, timeoutMinutes * 60 * 1000);
  };
  
  // Eventos que resetean el timeout
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
};
```

### 4. **SessionTimeoutAlert.jsx** - Alerta de Expiración

**Características:**
- Alerta 5 minutos antes de la expiración
- Countdown en tiempo real
- Opciones para extender o cerrar sesión
- Modal overlay con z-index alto

### 5. **TestResults.jsx** - Manejo de Tags de Test

**Responsabilidades:**
- Guardar tags de test en localStorage
- Enviar tags al backend solo después de asignación de psicólogo
- Verificar si el usuario ya tiene tags en el backend
- Limpiar localStorage después de envío exitoso

**Funciones Principales:**

```javascript
// Guardar tags en localStorage (no enviar al backend aún)
useEffect(() => {
  if (patientProfile && patientProfile.tags && patientProfile.tags.length > 0 && recommendedPsychologist) {
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

// Enviar tags al backend solo después de asignación
const sendTagsToBackend = async () => {
  try {
    // Verificar si ya tiene tags en el backend
    const existingPatient = await userService.getPatientById(user.id);
    if (existingPatient.tags && existingPatient.tags.length > 0) {
      console.log('Usuario ya tiene tags en el backend, no se envían');
      localStorage.removeItem('empathica_test_tags');
      return;
    }
    
    // Enviar tags al backend
    const tagsPayload = {
      tags: storedTags.tags.map(tag => tag.name)
    };
    await userService.uploadPatientTags(tagsPayload);
    localStorage.removeItem('empathica_test_tags');
  } catch (error) {
    console.error('Error enviando tags:', error);
  }
};
```

### 6. **MySpecialistPage.jsx** - Asignación de Psicólogos

**Responsabilidades:**
- Asignar psicólogo al paciente
- Enviar tags al backend después de asignación exitosa
- Limpiar localStorage después de envío exitoso

**Flujo de Asignación:**

```javascript
const handleAssignPsychologist = async (psychologistId = null) => {
  try {
    // 1. Asignar psicólogo
    const assignResponse = await userService.assignPsychologistToPatient({
      userId: targetPsychologistId
    });
    
    // 2. Actualizar estado
    setPsychologistAssigned(true);
    await fetchPatientData();
    
    // 3. Enviar tags al backend DESPUÉS de la asignación
    await updatePatientTagsFromLocalStorage();
    
    // 4. Limpiar localStorage si los tags se enviaron correctamente
    if (tagsUpdated) {
      clearLocalStorageTags();
    }
  } catch (error) {
    console.error('Error asignando psicólogo:', error);
  }
};
```

---

## Flujo de Autenticación

### 1. **Registro de Usuario**

```mermaid
graph TD
    A[Usuario llena formulario] --> B[POST /api/auth/signup]
    B --> C[Usuario creado exitosamente]
    C --> D[POST /api/patients - Información adicional]
    D --> E[Login automático con credenciales]
    E --> F[Token obtenido y guardado]
    F --> G[Redirección al dashboard correcto]
```

### 2. **Login Manual**

```mermaid
graph TD
    A[Usuario ingresa credenciales] --> B[POST /api/auth/login]
    B --> C[Token recibido del backend]
    C --> D[Token guardado en localStorage]
    D --> E[GET /api/users/details]
    E --> F[Usuario cargado en contexto]
    F --> G[Redirección según userType]
    G --> H[Limpieza de tags de test si existen]
```

### 3. **Verificación de Sesión**

```mermaid
graph TD
    A[App inicia] --> B[¿Token en localStorage?]
    B -->|Sí| C[¿Token válido?]
    B -->|No| D[Redirigir a login]
    C -->|Sí| E[Cargar usuario]
    C -->|No| F[Limpiar sesión y tags]
    F --> D
```

### 4. **Flujo de Test de Matching**

```mermaid
graph TD
    A[Usuario completa test] --> B[Tags guardados en localStorage]
    B --> C[Usuario selecciona psicólogo]
    C --> D[POST /api/patients/psychologist - Asignación]
    D --> E[POST /api/patients/tags - Envío de tags]
    E --> F[localStorage limpiado]
    F --> G[Usuario redirigido a dashboard]
```

---

## Protecciones de Seguridad

### 1. **Limpieza Automática de Tokens y Tags**

#### Escenarios de Limpieza:
- **Cierre de ventana/pestaña** (`beforeunload`)
- **Página oculta por 30+ minutos** (`visibilitychange`)
- **Errores 401/403** (Interceptores de respuesta)
- **Token expirado** (Verificación JWT)
- **Logout manual** (Función logout)
- **Asignación exitosa de psicólogo** (Tags enviados al backend)

#### Implementación:
```javascript
// Event listener para cierre de ventana
window.addEventListener('beforeunload', () => {
  clearSession();
});

// Event listener para visibilidad
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    setTimeout(() => {
      if (document.hidden) {
        clearSession();
      }
    }, 30 * 60 * 1000); // 30 minutos
  }
});

// Limpieza completa incluyendo tags de test
const clearSession = () => {
  localStorage.removeItem('empathica_token');
  localStorage.removeItem('empathica_user');
  localStorage.removeItem('empathica_test_tags'); // Limpiar tags de test
  setUser(null);
};
```

### 2. **Verificación de Expiración JWT**

```javascript
const isTokenExpired = () => {
  const token = localStorage.getItem('empathica_token');
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Margen de seguridad de 5 minutos
    return payload.exp < (currentTime - 300);
  } catch (error) {
    return true; // Si hay error, considerar como expirado
  }
};
```

### 3. **Timeout por Inactividad**

- **Tiempo de inactividad**: 60 minutos
- **Alerta previa**: 5 minutos antes
- **Eventos que resetean**: Mouse, teclado, scroll, touch, click
- **Acción automática**: Limpieza de sesión y redirección

### 4. **Mapeo Seguro de Roles**

```javascript
const mapUserRolesToType = (userDetails) => {
  let userType = 'client'; // Por defecto seguro
  
  if (userDetails.roles && userDetails.roles.length > 0) {
    const role = userDetails.roles[0];
    
    if (role === 'PSYCHOLOGIST') {
      userType = 'psychologist';
    } else if (role === 'ADMIN') {
      userType = 'business';
    } else if (role === 'PATIENT') {
      userType = 'client';
    }
  }
  
  return {
    ...userDetails,
    userType: userType,
    id: userDetails.userId || userDetails.id
  };
};
```

---

## Manejo de Errores

### 1. **Errores de Autenticación**

| Código | Descripción | Acción |
|--------|-------------|--------|
| 401 | Token expirado o inválido | Limpiar sesión, redirigir a login |
| 402 | Usuario sin sesiones disponibles | Mostrar mensaje de error específico |
| 403 | Acceso denegado | Limpiar sesión, redirigir a login |
| 415 | Tipo de contenido no soportado | Verificar headers de petición |
| 500 | Error del servidor | Mostrar mensaje de error |

### 2. **Errores de Red**

```javascript
// Interceptor de respuesta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Token expirado o inválido, limpiando sesión...');
      clearSession();
      window.location.href = '/login';
    } else if (error.response?.status === 402) {
      console.warn('Error 402: Usuario sin sesiones disponibles');
      // No limpiar sesión, solo mostrar mensaje específico
    }
    return Promise.reject(error);
  }
);
```

### 3. **Manejo Específico de Error 402**

```javascript
// En AppointmentsPage.jsx
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
```

### 4. **Errores de Token**

- **Token malformado**: Se considera expirado
- **Token no encontrado**: Redirección a login
- **Error de decodificación**: Limpieza automática
- **Tags de test corruptos**: Limpieza automática de localStorage

---

## Configuración

### 1. **Timeouts Configurables**

```javascript
// En los dashboards
useSessionTimeout(60); // 60 minutos de inactividad

// En SessionTimeoutAlert
<SessionTimeoutAlert 
  warningMinutes={5}    // Alerta 5 minutos antes
  timeoutMinutes={60}   // Timeout total de 60 minutos
/>
```

### 2. **Event Listeners**

```javascript
// Eventos que resetean el timeout
const events = [
  'mousedown',
  'mousemove', 
  'keypress',
  'scroll',
  'touchstart',
  'click'
];
```

### 3. **Margen de Seguridad**

```javascript
// 5 minutos de margen para expiración de token
return payload.exp < (currentTime - 300);
```

### 4. **Configuración de Tags de Test**

```javascript
// Formato de tags en localStorage
const tagsForStorage = {
  tags: [
    { name: "ansiedad", percentage: 100 },
    { name: "depresión", percentage: 100 },
    { name: "estrés", percentage: 100 }
  ],
  recommendedPsychologistId: 123
};

// Endpoint para envío de tags
POST /api/patients/tags
{
  "tags": ["ansiedad", "depresión", "estrés"]
}
```

---

## Troubleshooting

### 1. **Problema: Sesiones Mezcladas**

**Síntomas:**
- Usuario ve datos de otro usuario
- Token incorrecto en localStorage
- Redirecciones incorrectas

**Solución:**
```javascript
// Verificar limpieza en registro
const login = async (credentials) => {
  clearSession(); // Limpiar antes del login
  // ... resto del código
};
```

### 2. **Problema: Token No Se Limpia**

**Síntomas:**
- Token persiste después del logout
- Errores 401 recurrentes
- Usuario no puede hacer logout

**Solución:**
```javascript
// Verificar función clearSession
const clearSession = () => {
  localStorage.removeItem('empathica_token');
  localStorage.removeItem('empathica_user');
  localStorage.removeItem('empathica_test_tags'); // Incluir tags
  setUser(null);
};
```

### 3. **Problema: Tags de Test No Se Envían**

**Síntomas:**
- Tags permanecen en localStorage
- No se envían al backend después de asignación
- Usuario ve psicólogo asignado pero sin tags

**Solución:**
```javascript
// Verificar flujo de asignación en MySpecialistPage.jsx
const handleAssignPsychologist = async (psychologistId) => {
  // 1. Asignar psicólogo primero
  await userService.assignPsychologistToPatient({ userId: psychologistId });
  
  // 2. Enviar tags después de asignación exitosa
  await updatePatientTagsFromLocalStorage();
  
  // 3. Limpiar localStorage
  if (tagsUpdated) {
    clearLocalStorageTags();
  }
};
```

### 4. **Problema: Error 402 No Se Maneja**

**Síntomas:**
- Usuario ve error genérico al agendar cita
- No se explica que necesita más tokens de sesión
- Usuario no sabe contactar al administrador

**Solución:**
```javascript
// Verificar manejo específico de error 402
catch (error) {
  if (error.response?.status === 402) {
    alert('No tienes sesiones disponibles.\n\nTu administrador debe asignarte más tokens de sesión para poder agendar citas.\n\nContacta a tu administrador para solicitar más sesiones.');
  } else {
    alert('Error al agendar la sesión. Inténtalo de nuevo.');
  }
}
```

### 5. **Problema: Timeout No Funciona**

**Síntomas:**
- Sesión no expira por inactividad
- Alertas no aparecen
- Event listeners no se disparan

**Solución:**
```javascript
// Verificar hook useSessionTimeout
useSessionTimeout(60); // Asegurar que esté importado y usado
```

### 6. **Problema: Interceptores No Responden**

**Síntomas:**
- Peticiones fallan sin limpieza
- Errores 401 sin redirección
- Tokens obsoletos persisten

**Solución:**
```javascript
// Verificar interceptores en api.js
apiClient.interceptors.request.use((config) => {
  if (isTokenExpired()) {
    clearSession();
    return Promise.reject(new Error('Token expirado'));
  }
  // ... resto del código
});
```

---

## Métricas y Monitoreo

### 1. **Logs de Seguridad**

```javascript
// Logs implementados
console.log('Token expirado, limpiando sesión...');
console.log('Sesión cerrada por inactividad (60 minutos)');
console.log('Usuario deslogueado');
console.log('Sesión completamente limpiada');
console.log('Tags de test enviados al backend');
console.log('localStorage de test tags limpiado');
```

### 2. **Eventos Rastreables**

- Login exitoso/fallido
- Logout manual/automático
- Timeout por inactividad
- Errores de autenticación
- Limpieza de sesión
- Envío de tags de test
- Asignación de psicólogos
- Errores 402 (tokens de sesión)

---

## Mejores Prácticas

### 1. **Seguridad**
- Siempre limpiar sesión antes de login
- Verificar expiración en cada request
- Usar margen de seguridad para tokens
- Implementar timeout por inactividad
- Limpiar tags de test en logout
- Enviar tags solo después de asignación exitosa

### 2. **UX**
- Alertar antes de la expiración
- Permitir extender sesión
- Redirección automática a login
- Mensajes de error claros
- Manejo específico de error 402
- Información clara sobre tokens de sesión

### 3. **Mantenimiento**
- Logs detallados para debugging
- Configuración centralizada
- Manejo consistente de errores
- Documentación actualizada
- Verificación de tags antes de envío

---

## Notas de Implementación

### Versiones de Dependencias
- React: 18.x
- Axios: Para interceptores HTTP
- localStorage: Para persistencia de tokens y tags

### Compatibilidad
- Navegadores modernos
- Dispositivos móviles
- PWA (Progressive Web App)

### Consideraciones de Rendimiento
- Event listeners con cleanup apropiado
- Timeouts con clearTimeout
- Verificación de token optimizada
- Manejo eficiente de localStorage

### Flujo de Tags de Test
1. Usuario completa test → Tags guardados en localStorage
2. Usuario selecciona psicólogo → Asignación al backend
3. Asignación exitosa → Tags enviados al backend
4. Envío exitoso → localStorage limpiado
5. Logout → Limpieza completa de localStorage

---

*Última actualización: Diciembre 2024*
*Versión del documento: 2.0*
