# Guía de API Endpoints - Empathica

## Configuración Base

### URL Base
```
https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443
```

### Autenticación
- **Tipo**: JWT Bearer Token
- **Header**: `Authorization: Bearer {token}`
- **Almacenamiento**: localStorage como `empathica_token`

### Interceptores
- **Request**: Agregar token automáticamente a peticiones autenticadas
- **Response**: Manejar errores 401, 402, 403 automáticamente
- **Rutas públicas**: No requieren token
- **Rutas opcionales**: Token se envía si existe

---

## Endpoints de Autenticación

### POST /api/auth/login
**Descripción**: Autenticación de usuarios

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta Exitosa** (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 123,
    "email": "usuario@ejemplo.com",
    "role": "PATIENT"
  }
}
```

**Errores**:
- 401: Credenciales inválidas
- 500: Error del servidor

---

### POST /api/auth/signup
**Descripción**: Registro de nuevos usuarios

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "id": 0,
  "username": "usuario@ejemplo.com",
  "name": "Juan",
  "lastName": "Pérez",
  "email": "usuario@ejemplo.com",
  "password": "contraseña123",
  "role": "PATIENT"
}
```

**Respuesta Exitosa** (201):
```json
{
  "id": 124,
  "username": "usuario@ejemplo.com",
  "name": "Juan",
  "lastName": "Pérez",
  "email": "usuario@ejemplo.com",
  "role": "PATIENT"
}
```

**Errores**:
- 400: Datos inválidos
- 409: Usuario ya existe
- 500: Error del servidor

---

## Endpoints de Pacientes

### POST /api/patients
**Descripción**: Crear información adicional del paciente

**Headers**:
```
Content-Type: application/json
Authorization: Bearer {token} (opcional - requerido para dashboard empresa)
```

**Body**:
```json
{
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan@empresa.com",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1990-05-15",
  "gender": "M",
  "companyId": 1,
  "departmentId": 1
}
```

**Respuesta Exitosa** (201):
```json
{
  "id": 124,
  "username": "juan@empresa.com",
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan@empresa.com",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1990-05-15",
  "gender": "M",
  "companyId": 1,
  "departmentId": 1,
  "role": "PATIENT"
}
```

**Errores**:
- 400: Datos inválidos
- 401: No autorizado (si se requiere token)
- 500: Error del servidor

---

### POST /api/patients/bulk
**Descripción**: Carga masiva de empleados desde CSV

**Headers**:
```
Content-Type: multipart/form-data
Authorization: Bearer {token} (requerido)
```

**Body**:
```
FormData con campo 'file' conteniendo archivo CSV
```

**Formato CSV esperado**:
```csv
name,lastName,email,password,phoneNumber,dateOfBirth,gender,departmentId
Juan,Pérez,juan@empresa.com,12345678,1234567890,17/05/1995,M,1
María,García,maria@empresa.com,87654321,0987654321,22/08/1990,F,2
```

**Departamentos disponibles**:
- 1 - Ventas
- 2 - Marketing
- 3 - Tecnología
- 4 - Recursos humanos
- 5 - Finanzas
- 6 - Operaciones
- 7 - Otros

**Respuesta Exitosa** (200):
```json
{
  "message": "Pacientes creados exitosamente",
  "createdCount": 2,
  "errors": []
}
```

**Errores**:
- 400: Archivo inválido
- 401: No autorizado
- 415: Tipo de contenido no soportado
- 500: Error del servidor

---

### GET /api/patients/{id}
**Descripción**: Obtener información del paciente

**Headers**:
```
Authorization: Bearer {token} (requerido)
```

**Respuesta Exitosa** (200):
```json
{
  "id": 124,
  "username": "usuario@ejemplo.com",
  "name": "Juan",
  "lastName": "Pérez",
  "email": "usuario@ejemplo.com",
  "phone": "+52 55 1234 5678",
  "gender": "M",
  "role": "PATIENT",
  "tags": [
    {
      "name": "ansiedad",
      "percentage": 85
    },
    {
      "name": "depresión",
      "percentage": 70
    }
  ],
  "psychologist": {
    "id": 45,
    "name": "Dr. Ana",
    "lastName": "López",
    "email": "ana@psicologo.com"
  }
}
```

**Errores**:
- 401: No autorizado
- 404: Paciente no encontrado
- 500: Error del servidor

---

### POST /api/patients/psychologist
**Descripción**: Asignar psicólogo al paciente

**Headers**:
```
Content-Type: application/json
Authorization: Bearer {token} (requerido)
```

**Body**:
```json
{
  "userId": 45
}
```

**Respuesta Exitosa** (200):
```json
{
  "message": "Psicólogo asignado exitosamente",
  "patientId": 124,
  "psychologistId": 45
}
```

**Errores**:
- 400: Datos inválidos
- 401: No autorizado
- 404: Usuario no encontrado
- 500: Error del servidor

---

### POST /api/patients/tags
**Descripción**: Subir tags de test de matching

**Headers**:
```
Content-Type: application/json
Authorization: Bearer {token} (requerido)
```

**Body**:
```json
{
  "tags": ["ansiedad", "depresión", "estrés"]
}
```

**Respuesta Exitosa** (200):
```json
{
  "message": "Tags actualizados exitosamente",
  "patientId": 124,
  "tags": ["ansiedad", "depresión", "estrés"]
}
```

**Errores**:
- 400: Datos inválidos
- 401: No autorizado
- 404: Paciente no encontrado
- 500: Error del servidor

---

## Endpoints de Psicólogos

### GET /api/psychologists
**Descripción**: Obtener lista de psicólogos

**Headers**:
```
Authorization: Bearer {token} (opcional)
```

**Respuesta Exitosa** (200):
```json
[
  {
    "id": 45,
    "name": "Ana",
    "lastName": "López",
    "email": "ana@psicologo.com",
    "phoneNumber": "+52 55 1111 2222",
    "specialty": "Terapia Cognitivo-Conductual",
    "oneLiner": "Especialista en ansiedad y depresión",
    "age": 35,
    "gender": "F",
    "education": [
      {
        "degree": "Licenciatura en Psicología",
        "institution": "Universidad Nacional",
        "major": "Psicología Clínica",
        "graduationYear": 2010
      }
    ],
    "schedule": [
      {
        "day": "MONDAY",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  }
]
```

**Errores**:
- 500: Error del servidor

---

### POST /api/psychologists
**Descripción**: Registro de nuevos psicólogos

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "id": 0,
  "username": "psicologo@ejemplo.com",
  "name": "Ana",
  "lastName": "López",
  "email": "psicologo@ejemplo.com",
  "password": "contraseña123",
  "role": "PSYCHOLOGIST",
  "phoneNumber": "+52 55 1111 2222",
  "specialty": "Terapia Cognitivo-Conductual",
  "oneLiner": "Especialista en ansiedad y depresión"
}
```

**Respuesta Exitosa** (201):
```json
{
  "id": 46,
  "username": "psicologo@ejemplo.com",
  "name": "Ana",
  "lastName": "López",
  "email": "psicologo@ejemplo.com",
  "role": "PSYCHOLOGIST"
}
```

**Errores**:
- 400: Datos inválidos
- 409: Usuario ya existe
- 500: Error del servidor

---

## Endpoints de Sesiones

### POST /api/patients/session/{psychologistId}
**Descripción**: Crear sesión con psicólogo

**Headers**:
```
Content-Type: application/json
Authorization: Bearer {token} (requerido)
```

**Body**:
```json
{
  "sessionTime": "2024-01-15T14:30:00"
}
```

**Respuesta Exitosa** (201):
```json
{
  "sessionId": 789,
  "patientId": 124,
  "psychologistId": 45,
  "sessionTime": "2024-01-15T14:30:00",
  "status": "SCHEDULED",
  "eventUrl": "https://meet.google.com/abc-def-ghi"
}
```

**Errores**:
- 400: Datos inválidos
- 401: No autorizado
- 402: Usuario sin sesiones disponibles (tokens de sesión)
- 404: Psicólogo no encontrado
- 500: Error del servidor

---

### GET /api/patients/sessions
**Descripción**: Obtener sesiones del paciente

**Headers**:
```
Authorization: Bearer {token} (requerido)
```

**Respuesta Exitosa** (200):
```json
[
  {
    "sessionId": 789,
    "patient": {
      "id": 124,
      "name": "Juan",
      "lastName": "Pérez",
      "tags": [
        {
          "name": "ansiedad",
          "percentage": 85
        }
      ]
    },
    "psychologist": {
      "id": 45,
      "name": "Ana",
      "lastName": "López",
      "email": "ana@psicologo.com"
    },
    "sessionTime": "2024-01-15T14:30:00",
    "status": "SCHEDULED",
    "eventUrl": "https://meet.google.com/abc-def-ghi",
    "notes": []
  }
]
```

**Errores**:
- 401: No autorizado
- 500: Error del servidor

---

## Endpoints de Empresas

### GET /api/companies/{companyId}/patients
**Descripción**: Obtener empleados de una empresa (paginado)

**Headers**:
```
Authorization: Bearer {token} (requerido)
```

**Parámetros de Query**:
- `page` (opcional): Número de página (0-based, por defecto 0)
- `size` (opcional): Tamaño de página (por defecto 10)

**Ejemplo de petición**:
```
GET /api/companies/1/patients?page=0&size=10
```

**Respuesta Exitosa** (200):
```json
{
  "content": [
    {
      "userId": 20,
      "name": "Juan",
      "lastName": "Pérez",
      "email": "juan@empresa.com",
      "phoneNumber": "+52 55 1234 5678",
      "dateOfBirth": "1990-05-15",
      "gender": "M",
      "userStatus": "ACTIVE",
      "company": {
        "companyId": 1,
        "name": "Empresa Ejemplo"
      },
      "department": {
        "departmentId": 1,
        "name": "Ventas"
      },
      "tokensLeft": 5
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": {
      "empty": false,
      "sorted": true,
      "unsorted": false
    },
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalElements": 25,
  "totalPages": 3,
  "last": false,
  "size": 10,
  "number": 0,
  "numberOfElements": 10,
  "sort": {
    "empty": false,
    "sorted": true,
    "unsorted": false
  },
  "first": true,
  "empty": false
}
```

**Errores**:
- 401: No autorizado
- 404: Empresa no encontrada
- 500: Error del servidor

---

## Endpoints de Horarios

### POST /api/psychologists/schedule
**Descripción**: Crear horario de psicólogo

**Headers**:
```
Content-Type: application/json
Authorization: Bearer {token} (requerido)
```

**Body**:
```json
{
  "psychologistId": 45,
  "day": "MONDAY",
  "startTime": "09:00",
  "endTime": "17:00"
}
```

**Respuesta Exitosa** (201):
```json
{
  "id": 101,
  "psychologistId": 45,
  "day": "MONDAY",
  "startTime": "09:00",
  "endTime": "17:00"
}
```

**Errores**:
- 400: Datos inválidos
- 401: No autorizado
- 500: Error del servidor

---

### DELETE /api/psychologists/schedule/{id}
**Descripción**: Eliminar horario de psicólogo

**Headers**:
```
Authorization: Bearer {token} (requerido)
```

**Respuesta Exitosa** (200):
```json
{
  "message": "Horario eliminado exitosamente"
}
```

**Errores**:
- 401: No autorizado
- 404: Horario no encontrado
- 500: Error del servidor

---

## Códigos de Error

### 400 - Bad Request
- Datos de entrada inválidos
- Formato de archivo incorrecto
- Campos requeridos faltantes

### 401 - Unauthorized
- Token expirado o inválido
- Credenciales incorrectas
- Token no proporcionado

### 402 - Payment Required
- Usuario sin sesiones disponibles
- Tokens de sesión agotados
- Requiere asignación de más tokens

### 403 - Forbidden
- Acceso denegado
- Permisos insuficientes
- Usuario no autorizado

### 404 - Not Found
- Recurso no encontrado
- Usuario no existe
- Endpoint no existe

### 415 - Unsupported Media Type
- Tipo de contenido no soportado
- Archivo CSV malformado
- Headers incorrectos

### 500 - Internal Server Error
- Error del servidor
- Error de base de datos
- Error interno

---

## Configuración de Interceptores

### Rutas Públicas (No requieren token)
```javascript
const publicRoutes = [
  '/api/auth/login',
  '/api/psychologists', // Solo para POST (registro)
  '/api/patients' // Solo para POST (registro público)
];
```

### Rutas con Token Opcional
```javascript
const optionalTokenRoutes = [
  '/api/patients' // POST: registro público (sin token) o dashboard empresa (con token)
];
```

### Rutas que Requieren Token
- Todas las demás rutas requieren token obligatorio
- El token se agrega automáticamente en el header `Authorization`
- Se verifica la expiración antes de cada petición

---

## Ejemplos de Uso

### Login y Obtención de Token
```javascript
const response = await apiClient.post('/api/auth/login', {
  email: 'usuario@ejemplo.com',
  password: 'contraseña123'
});

const token = response.data.token;
localStorage.setItem('empathica_token', token);
```

### Creación de Sesión
```javascript
const sessionData = {
  sessionTime: '2024-01-15T14:30:00'
};

const response = await apiClient.post('/api/patients/session/45', sessionData);
```

### Carga de CSV
```javascript
const formData = new FormData();
formData.append('file', csvFile);

const response = await apiClient.post('/api/patients/bulk', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

---

*Última actualización: Diciembre 2024*
*Versión del documento: 1.0*
