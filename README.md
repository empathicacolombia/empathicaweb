# Empathica - Plataforma de Bienestar Emocional

Plataforma integral de bienestar emocional que conecta pacientes con psicólogos especializados, incluyendo test de matching, gestión de citas y dashboards especializados.

## Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd empathica-landing
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**
```bash
# El proyecto usa la URL del backend configurada en src/services/api.js
# API_BASE_URL: https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443
```

4. **Ejecuta el proyecto en modo desarrollo**
```bash
npm start
```

El proyecto se abrirá automáticamente en `http://localhost:3000`

## Estructura del Proyecto

```
empathica-landing/
├── public/                 # Archivos públicos
├── src/                    # Código fuente
│   ├── components/         # Componentes React
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── PsychologistDashboard.jsx
│   │   ├── ClientDashboard.jsx
│   │   ├── BusinessDashboard.jsx
│   │   ├── AppointmentsPage.jsx
│   │   ├── ForYouPage.jsx
│   │   ├── MySpecialistPage.jsx
│   │   ├── SupportPage.jsx
│   │   ├── PsychologistsPage.jsx
│   │   ├── BusinessEmployees.jsx
│   │   ├── TestResults.jsx
│   │   ├── QuestionnaireMatch.jsx
│   │   ├── PsychologistSchedule.jsx
│   │   └── PsychologistScheduleModal.jsx
│   ├── contexts/          # Contextos de React
│   │   └── AuthContext.jsx
│   ├── services/          # Servicios API
│   │   └── api.js
│   ├── hooks/             # Hooks personalizados
│   │   └── useSessionTimeout.js
│   ├── App.js             # Componente principal
│   ├── AppMain.js         # Router principal
│   └── index.js           # Punto de entrada
├── package.json           # Dependencias y scripts
├── .gitignore            # Archivos ignorados por Git
└── README.md             # Este archivo
```

## Scripts Disponibles

- `npm start` - Ejecuta el proyecto en modo desarrollo
- `npm run build` - Construye el proyecto para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de webpack (irreversible)

## Páginas y Funcionalidades

### Páginas Públicas
- **Landing Principal** (`/`) - Página de inicio con información de la plataforma
- **Psicólogos** (`/psychologists`) - Lista de psicólogos disponibles
- **Empresas** (`/business`) - Información para empresas
- **Login** (`/login`) - Página de inicio de sesión
- **Registro** (`/register`) - Página de registro de usuarios

### Dashboards Especializados
- **Dashboard Psicólogo** (`/psychologist-dashboard`) - Panel para psicólogos
- **Dashboard Cliente** (`/client-dashboard`) - Panel para pacientes
- **Dashboard Empresa** (`/business-dashboard`) - Panel para administradores de empresa

### Funcionalidades Principales
- **Test de Matching** (`/questionnaire-match`) - Cuestionario para encontrar psicólogo compatible
- **Resultados del Test** (`/test-results`) - Muestra psicólogos recomendados
- **Mi Especialista** (`/my-specialist`) - Perfil del psicólogo asignado
- **Citas** (`/appointments`) - Gestión de citas y sesiones
- **For You** (`/for-you`) - Contenido personalizado
- **Soporte** (`/support`) - Página de soporte

## Tecnologías Utilizadas

- **React.js 18** - Biblioteca de JavaScript para interfaces de usuario
- **React Router** - Navegación client-side
- **Axios** - Cliente HTTP para comunicación con API
- **Context API** - Gestión de estado global (autenticación)
- **CSS Inline** - Estilos aplicados directamente en componentes
- **React Hooks** - useState, useEffect, useContext para manejo de estado

## Dependencias Principales

- `react` - Biblioteca principal de React
- `react-dom` - Renderizado en el DOM
- `react-router-dom` - Enrutamiento de la aplicación
- `axios` - Cliente HTTP para peticiones API
- `react-scripts` - Scripts de Create React App

## Configuración de Desarrollo

El proyecto está configurado con Create React App e incluye:
- Hot reloading para desarrollo rápido
- Source maps para debugging
- ESLint para calidad de código
- Babel para transpilación
- Webpack para bundling

## Despliegue

Para construir el proyecto para producción:

```bash
npm run build
```

Esto creará una carpeta `build` con los archivos optimizados listos para desplegar.

## Características Principales

### Sistema de Autenticación
- Login/registro con JWT tokens
- Gestión automática de sesiones
- Timeout por inactividad
- Limpieza automática de tokens

### Test de Matching
- Cuestionario psicológico interactivo
- Algoritmo de matching con psicólogos
- Guardado de resultados en localStorage
- Sincronización con backend

### Gestión de Citas
- Agendamiento de sesiones
- Calendario de disponibilidad
- Notificaciones de citas
- Integración con videollamadas

### Dashboards Especializados
- Dashboard para psicólogos
- Dashboard para pacientes
- Dashboard para empresas
- Gestión de empleados (CSV upload)

## API y Backend

### Configuración
- **URL Base**: `https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443`
- **Autenticación**: JWT Bearer tokens
- **Interceptores**: Manejo automático de tokens y errores

### Endpoints Principales
- `POST /api/auth/login` - Autenticación de usuarios
- `POST /api/auth/signup` - Registro de usuarios
- `POST /api/patients` - Creación de pacientes
- `POST /api/patients/bulk` - Carga masiva de empleados (CSV)
- `GET /api/psychologists` - Lista de psicólogos
- `POST /api/patients/session/{id}` - Creación de sesiones

## Documentación Adicional

- `SESSION_MANAGEMENT_GUIDE.md` - Guía completa de manejo de sesiones
- `REGISTRO_FLUJO_DATOS.md` - Flujo de datos en el registro de usuarios

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es privado para Empathica. 