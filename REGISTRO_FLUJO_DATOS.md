# Flujo de Datos en el Registro de Usuarios (Actualizado)

## Resumen del Proceso

Este documento muestra **exactamente** cómo fluyen los datos desde que el usuario llena el formulario hasta que se guarda en el backend, incluyendo la nueva estructura con endpoints separados y el flujo completo de test de matching.

## Proceso Completo (Nueva Estructura)

### **1. Usuario Llena el Formulario**

**Formulario en RegisterPage.jsx**:
```javascript
// Estado del formulario
const [formData, setFormData] = useState({
  firstName: '',    // ← Usuario escribe: "Juan"
  lastName: '',     // ← Usuario escribe: "Pérez"
  email: '',        // ← Usuario escribe: "juan@ejemplo.com"
  password: ''      // ← Usuario escribe: "123456"
});

// Tipo de usuario seleccionado
const [userType, setUserType] = useState('patient'); // ← "patient" o "psychologist"
```

**Ejemplo de datos ingresados**:
```javascript
formData = {
  firstName: "Juan",
  lastName: "Pérez", 
  email: "juan@ejemplo.com",
  password: "123456"
}
userType = "patient"
```

---

### **2. 🔄 Procesamiento en Frontend**

**En RegisterPage.jsx - handleSubmit()**:
```javascript
// Preparar datos para el backend
const userData = {
  id: 0,                                    // ← Campo requerido por el backend
  username: formData.email,                 // ← "juan@ejemplo.com"
  name: formData.firstName,                 // ← "Juan"
  lastName: formData.lastName,              // ← "Pérez"
  email: formData.email,                    // ← "juan@ejemplo.com"
  password: formData.password,              // ← "123456"
  role: userType === 'patient' ? 'PATIENT' : 'PSICOLOGO' // ← "PATIENT"
};

console.log('Datos enviados al backend:', userData);
```

**Resultado del procesamiento**:
```javascript
userData = {
  id: 0,
  username: "juan@ejemplo.com",
  name: "Juan",
  lastName: "Pérez", 
  email: "juan@ejemplo.com",
  password: "123456",
  role: "PATIENT"
}
```

---

### **3. 🌐 Primer Envío al Backend - Registro Básico**

**En authService.signup() - src/services/api.js**:
```javascript
signup: async (userData) => {
  try {
    // URL del endpoint
    const response = await apiClient.post('/api/auth/signup', userData);
    return handleResponse(response);
  } catch (error) {
    console.error('Error en signup:', error);
    throw error;
  }
}
```

**Petición HTTP enviada**:
```http
POST https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443/api/auth/signup
Content-Type: application/json

{
  "id": 0,
  "username": "juan@ejemplo.com",
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan@ejemplo.com", 
  "password": "123456",
  "role": "PATIENT"
}
```

---

### **4. 📤 Respuesta del Backend - Registro Básico**

**Respuesta del signup**:
```json
{
  "id": 17,
  "username": "juan@ejemplo.com",
  "name": "Juan",                    // ← ✅ Corregido: Nombre real
  "email": "juan@ejemplo.com",
  "lastName": "Pérez",
  "password": "encrypted_password",  // ← ✅ Corregido: Contraseña encriptada
  "role": "PATIENT"
}
```

---

### **5. 🌐 Segundo Envío al Backend - Información Adicional del Paciente**

**Solo si el usuario es paciente**:
```javascript
// Si es paciente, completar información adicional
if (userType === 'patient' && result.id) {
  try {
    // Crear datos adicionales del paciente
    const patientData = {
      id: result.id,
      phone: null,  // Se puede completar después
      gender: null  // Se puede completar después
    };

    // Llamada para completar información del paciente
    const patientResult = await userService.createPatient(patientData);
    console.log('Información de paciente completada:', patientResult);
  } catch (error) {
    console.warn('No se pudo completar información de paciente:', error);
    // No es crítico, el usuario puede completar después
  }
}
```

**En userService.createPatient() - src/services/api.js**:
```javascript
createPatient: async (patientData) => {
  try {
    const response = await apiClient.post('/api/patients', patientData);
    return handleResponse(response);
  } catch (error) {
    console.error('Error creando información de paciente:', error);
    throw error;
  }
}
```

**Petición HTTP enviada**:
```http
POST https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443/api/patients
Content-Type: application/json

{
  "id": 17,
  "phone": null,
  "gender": null
}
```

---

### **6. 📤 Respuesta del Backend - Información del Paciente**

**Respuesta del POST /api/patients**:
```json
{
  "id": 17,
  "username": "juan@ejemplo.com",
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan@ejemplo.com",
  "phone": null,     // ← Campo adicional vacío
  "gender": null,    // ← Campo adicional vacío
  "role": "PATIENT"
}
```

---

### **7. 🔍 Obtención de Información Completa**

**GET /api/patients/{id}**:
```http
GET https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443/api/patients/17
Authorization: Bearer jwt_token_here
```

**Respuesta completa**:
```json
{
  "id": 17,
  "username": "juan@ejemplo.com",
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan@ejemplo.com",
  "phone": null,     // ← Se puede completar después
  "gender": null,    // ← Se puede completar después
  "role": "PATIENT"
}
```

---

## 🎯 Ventajas de la Nueva Estructura

### **1. Separación de Responsabilidades**
- **POST /api/auth/signup**: Registro básico del usuario
- **POST /api/patients**: Información específica del paciente
- **GET /api/patients/{id}**: Obtener información completa

### **2. Flexibilidad**
- Los campos `phone` y `gender` pueden completarse después del registro
- No es necesario enviar toda la información en una sola petición
- Permite registro rápido y completar perfil después

### **3. Escalabilidad**
- Fácil agregar nuevos campos específicos de paciente
- Estructura preparada para otros tipos de usuario (psicólogos, empresas)

---

## 📊 Mapeo de Campos (Actualizado)

| Campo Frontend | Valor Ejemplo | Endpoint | Campo Backend | Valor Esperado |
|----------------|---------------|----------|---------------|----------------|
| `formData.firstName` | "Juan" | `/api/auth/signup` | `name` | "Juan" |
| `formData.lastName` | "Pérez" | `/api/auth/signup` | `lastName` | "Pérez" |
| `formData.email` | "juan@ejemplo.com" | `/api/auth/signup` | `email` | "juan@ejemplo.com" |
| `formData.email` | "juan@ejemplo.com" | `/api/auth/signup` | `username` | "juan@ejemplo.com" |
| `formData.password` | "123456" | `/api/auth/signup` | `password` | "encrypted_password" |
| `userType` | "patient" | `/api/auth/signup` | `role` | "PATIENT" |
| `phone` | "+52 55 1234 5678" | `/api/patients` | `phone` | "+52 55 1234 5678" |
| `gender` | "M" | `/api/patients` | `gender` | "M" |

---

## 🔧 Implementación en Frontend

### **1. Registro Básico (Obligatorio)**
```javascript
// Siempre se ejecuta
const result = await authService.signup(userData);
```

### **2. Información Adicional (Opcional)**
```javascript
// Solo para pacientes
if (userType === 'patient' && result.id) {
  const patientData = { id: result.id, phone: null, gender: null };
  await userService.createPatient(patientData);
}
```

### **3. Manejo de Errores**
```javascript
// Si falla la información adicional, no afecta el registro
try {
  await userService.createPatient(patientData);
} catch (error) {
  console.warn('No crítico: información adicional no completada');
}
```

---

## 🚀 Próximos Pasos

### **1. Completar Perfil del Paciente**
- Crear formulario para completar `phone` y `gender`
- Usar `PUT /api/patients` para actualizar información

### **2. Validaciones**
- Validar formato de teléfono
- Validar valores de género (M, F, O)

### **3. Experiencia de Usuario**
- Mostrar indicador de perfil incompleto
- Sugerir completar información faltante

---

## 🔍 Debug y Verificación

### **Para verificar el flujo completo**:
```javascript
// En RegisterPage.jsx
console.log('1. Datos del formulario:', formData);
console.log('2. Datos enviados a signup:', userData);
console.log('3. Respuesta de signup:', result);
console.log('4. Datos enviados a patients:', patientData);
console.log('5. Respuesta de patients:', patientResult);
```

### **Verificar en DevTools**:
1. **Network tab**: Ver las dos peticiones HTTP
2. **Console**: Verificar logs de cada paso
3. **Response**: Confirmar que los datos se guardan correctamente

---

## Flujo de Test de Matching

### **1. Usuario Completa el Test**

**En QuestionnaireMatch.jsx**:
```javascript
// Usuario responde preguntas del test
const [answers, setAnswers] = useState({});

// Al completar el test
const handleSubmit = () => {
  // Procesar respuestas y generar tags
  const tags = processAnswers(answers);
  
  // Navegar a resultados
  navigate('/test-results', { 
    state: { 
      tags: tags,
      fromDashboard: isFromDashboard 
    } 
  });
};
```

### **2. Procesamiento de Resultados**

**En TestResults.jsx**:
```javascript
// Obtener tags del test
const { tags, fromDashboard } = location.state;

// Generar perfil del paciente
const patientProfile = {
  tags: tags, // ["ansiedad", "depresión", "estrés"]
  // ... otros datos
};

// Obtener psicólogos recomendados
const recommendedPsychologist = await getRecommendedPsychologist();

// Guardar en localStorage (NO enviar al backend aún)
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
```

### **3. Selección de Psicólogo**

**En MySpecialistPage.jsx**:
```javascript
// Usuario selecciona psicólogo
const handleAssignPsychologist = async (psychologistId) => {
  try {
    // 1. Asignar psicólogo al backend
    const assignResponse = await userService.assignPsychologistToPatient({
      userId: psychologistId
    });
    
    // 2. Actualizar estado local
    setPsychologistAssigned(true);
    await fetchPatientData();
    
    // 3. Enviar tags al backend DESPUÉS de asignación exitosa
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

### **4. Envío de Tags al Backend**

**Función updatePatientTagsFromLocalStorage**:
```javascript
const updatePatientTagsFromLocalStorage = async () => {
  try {
    const storedTags = localStorage.getItem('empathica_test_tags');
    if (!storedTags) return;
    
    const parsedTags = JSON.parse(storedTags);
    
    // Verificar si el usuario ya tiene tags en el backend
    const existingPatient = await userService.getPatientById(user.id);
    if (existingPatient.tags && existingPatient.tags.length > 0) {
      console.log('Usuario ya tiene tags en el backend, no se envían');
      localStorage.removeItem('empathica_test_tags');
      return;
    }
    
    // Enviar tags al backend
    const tagsPayload = {
      tags: parsedTags.tags.map(tag => tag.name)
    };
    
    await userService.uploadPatientTags(tagsPayload);
    setTagsUpdated(true);
    console.log('Tags enviados al backend exitosamente');
  } catch (error) {
    console.error('Error enviando tags:', error);
    setTagsUpdated(false);
  }
};
```

### **5. Limpieza de localStorage**

**Función clearLocalStorageTags**:
```javascript
const clearLocalStorageTags = () => {
  localStorage.removeItem('empathica_test_tags');
  console.log('localStorage de test tags limpiado');
};
```

---

## Flujo Completo de Datos

### **Resumen del Flujo**:

1. **Registro**: Usuario se registra → POST /api/auth/signup → POST /api/patients
2. **Test**: Usuario completa test → Tags guardados en localStorage
3. **Selección**: Usuario selecciona psicólogo → POST /api/patients/psychologist
4. **Tags**: Tags enviados al backend → POST /api/patients/tags
5. **Limpieza**: localStorage limpiado → Usuario redirigido a dashboard

### **Puntos Clave**:

- **Tags NO se envían al backend inmediatamente** después del test
- **Tags se envían SOLO después** de asignación exitosa de psicólogo
- **localStorage se limpia** después de envío exitoso o logout
- **Verificación previa** de tags existentes en el backend
- **Manejo de errores** en cada paso del proceso

### **Endpoints Utilizados**:

- `POST /api/auth/signup` - Registro básico
- `POST /api/patients` - Información adicional del paciente
- `GET /api/psychologists` - Lista de psicólogos
- `POST /api/patients/psychologist` - Asignación de psicólogo
- `POST /api/patients/tags` - Envío de tags de test
- `GET /api/patients/{id}` - Verificación de tags existentes
