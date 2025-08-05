# 🏗️ Guía de Estructura del Backend - Empathica

## 📋 Resumen del Proyecto

Empathica es una plataforma de bienestar mental que conecta pacientes, psicólogos y empresas. El backend debe soportar tres tipos de usuarios principales con diferentes necesidades y funcionalidades.

---

## 🎯 Tipos de Usuario y Roles

### 1. **Pacientes/Clientes** 👤
- Usuarios que buscan servicios de terapia
- Acceso a dashboard personalizado
- Gestión de citas y contenido personalizado

### 2. **Psicólogos** 👨‍⚕️
- Profesionales que ofrecen servicios de terapia
- Dashboard profesional completo
- Gestión de pacientes, citas y recursos

### 3. **Empresas** 🏢
- Organizaciones que contratan servicios para empleados
- Dashboard empresarial con métricas y gestión de colaboradores
- Sistema de reportes y análisis

---

## 🗂️ Estructura del Backend

### **📁 1. Autenticación y Autorización**

```
/auth/
├── login/                    # Login para todos los tipos de usuario
├── register/                 # Registro de pacientes y psicólogos
├── verify-email/            # Verificación de email
├── reset-password/          # Restablecimiento de contraseña
├── refresh-token/           # Renovación de tokens
└── logout/                  # Cierre de sesión
```

**Componentes Frontend Relacionados:**
- `LoginPage.jsx`
- `RegisterPage.jsx`
- `QuickRegisterPage.jsx`

**Funcionalidades Clave:**
- Autenticación JWT
- Roles y permisos (Paciente, Psicólogo, Empresa)
- Verificación de email
- Recuperación de contraseña
- Sesiones seguras

---

### **📁 2. Gestión de Usuarios**

```
/users/
├── patients/                # Gestión de pacientes
│   ├── profile/            # Perfil del paciente
│   ├── preferences/        # Preferencias y configuración
│   └── progress/           # Progreso y métricas
├── psychologists/          # Gestión de psicólogos
│   ├── profile/            # Perfil profesional
│   ├── credentials/        # Credenciales y licencias
│   ├── specializations/    # Especializaciones
│   └── availability/       # Disponibilidad y horarios
└── companies/              # Gestión de empresas
    ├── profile/            # Perfil de la empresa
    ├── employees/          # Gestión de empleados
    └── policies/           # Políticas de bienestar
```

**Componentes Frontend Relacionados:**
- `ClientProfilePage.jsx`
- `PsychologistProfileForm.jsx`
- `PsychologistProfile.jsx`
- `BusinessDemoDashboard.jsx` (sección Colaboradores)

---

### **📁 3. Sistema de Citas y Agendamiento**

```
/appointments/
├── create/                 # Crear nueva cita
├── update/                 # Actualizar cita existente
├── cancel/                 # Cancelar cita
├── reschedule/            # Reprogramar cita
├── availability/          # Verificar disponibilidad
├── calendar/              # Integración con calendarios
└── notifications/         # Notificaciones de citas
```

**Componentes Frontend Relacionados:**
- `FreeOrientationPage.jsx`
- `AppointmentsPage.jsx`
- `PsychologistAppointments.jsx`
- `PsychologistSchedule.jsx`
- `AppointmentCalendarModal.jsx`

**Integraciones Necesarias:**
- Google Calendar API
- Google Meet para sesiones virtuales
- Sistema de notificaciones (email/SMS)

---

### **📁 4. Gestión de Psicólogos**

```
/psychologists/
├── search/                 # Búsqueda y filtrado
├── match/                  # Algoritmo de matching
├── reviews/                # Reseñas y calificaciones
├── availability/           # Gestión de disponibilidad
├── sessions/               # Historial de sesiones
└── resources/              # Biblioteca de recursos
```

**Componentes Frontend Relacionados:**
- `PsychologistsPage.jsx`
- `PsychologistPatients.jsx`
- `PsychologistPatientsList.jsx`
- `PsychologistHistory.jsx`
- `PsychologistLibrary.jsx`

---

### **📁 5. Dashboard de Pacientes**

```
/patients/
├── dashboard/              # Métricas principales
├── appointments/           # Citas del paciente
├── specialist/             # Información del psicólogo asignado
├── progress/               # Progreso y actividades
├── content/                # Contenido personalizado
└── support/                # Sistema de soporte
```

**Componentes Frontend Relacionados:**
- `ClientDashboard.jsx`
- `AppointmentsPage.jsx`
- `ForYouPage.jsx`
- `MySpecialistPage.jsx`
- `SupportPage.jsx`

---

### **📁 6. Dashboard de Psicólogos**

```
/psychologists-dashboard/
├── overview/               # Vista general
├── patients/               # Lista de pacientes
├── appointments/           # Gestión de citas
├── notes/                  # Notas clínicas
├── schedule/               # Configuración de horarios
├── history/                # Historial de sesiones
├── library/                # Recursos profesionales
└── billing/                # Facturación y pagos
```

**Componentes Frontend Relacionados:**
- `PsychologistDashboard.jsx`
- `PsychologistPatients.jsx`
- `PsychologistAppointments.jsx`
- `PsychologistSchedule.jsx`
- `PsychologistHistory.jsx`
- `PsychologistLibrary.jsx`
- `PsychologistBilling.jsx`

---

### **📁 7. Dashboard Empresarial**

```
/companies/
├── dashboard/              # Métricas empresariales
├── employees/              # Gestión de empleados
│   ├── crud/              # CRUD de empleados
│   ├── sessions/          # Asignación de sesiones
│   └── notifications/     # Notificaciones internas
├── reports/                # Reportes y análisis
├── metrics/                # Métricas de bienestar
├── configuration/          # Configuración de la empresa
├── security/               # Configuración de seguridad
└── support/                # Soporte empresarial
```

**Componentes Frontend Relacionados:**
- `BusinessDemoDashboard.jsx` (todas las secciones)

---

### **📁 8. Sistema de Contenido**

```
/content/
├── articles/               # Artículos y recursos
├── podcasts/               # Contenido de audio
├── tests/                  # Tests y evaluaciones
├── recommendations/        # Recomendaciones personalizadas
└── categories/             # Categorización de contenido
```

**Componentes Frontend Relacionados:**
- `ForYouPage.jsx`
- `PsychologistLibrary.jsx`

---

### **📁 9. Sistema de Notificaciones**

```
/notifications/
├── email/                  # Notificaciones por email
├── sms/                    # Notificaciones por SMS
├── push/                   # Notificaciones push
├── in-app/                 # Notificaciones en la app
└── templates/              # Plantillas de notificación
```

**Componentes Frontend Relacionados:**
- Todos los dashboards
- Sistema de citas
- Gestión de empleados

---

### **📁 10. Sistema de Pagos y Facturación**

```
/billing/
├── payments/               # Procesamiento de pagos
├── invoices/               # Generación de facturas
├── subscriptions/          # Gestión de suscripciones
├── pricing/                # Configuración de precios
└── reports/                # Reportes financieros
```

**Componentes Frontend Relacionados:**
- `PsychologistBilling.jsx`
- `PricingPage.jsx`

---

## 🗄️ Estructura de Base de Datos

### **Tablas Principales:**

```sql
-- Usuarios y Autenticación
users
user_roles
user_sessions
password_resets

-- Perfiles
patient_profiles
psychologist_profiles
company_profiles
employee_profiles

-- Citas y Agendamiento
appointments
availability_slots
calendar_integrations

-- Contenido y Recursos
articles
podcasts
tests
content_categories

-- Métricas y Reportes
user_metrics
company_metrics
session_notes
progress_tracking

-- Notificaciones
notifications
notification_templates
notification_logs

-- Pagos y Facturación
payments
invoices
subscriptions
pricing_plans
```

---

## 🔧 Tecnologías Recomendadas

### **Backend:**
- **Framework:** Node.js con Express o NestJS
- **Base de Datos:** PostgreSQL
- **Cache:** Redis
- **Autenticación:** JWT + Passport.js
- **Validación:** Joi o Yup
- **Documentación:** Swagger/OpenAPI

### **Integraciones:**
- **Email:** SendGrid o AWS SES
- **SMS:** Twilio
- **Calendario:** Google Calendar API
- **Videollamadas:** Google Meet API
- **Pagos:** Stripe o PayPal
- **Almacenamiento:** AWS S3

### **DevOps:**
- **Contenedores:** Docker
- **Orquestación:** Kubernetes
- **CI/CD:** GitHub Actions
- **Monitoreo:** Sentry, New Relic

---

## 🚀 Fases de Desarrollo

### **Fase 1: Fundación (2-3 semanas)**
- [ ] Configuración del proyecto
- [ ] Autenticación y autorización
- [ ] Gestión básica de usuarios
- [ ] Base de datos y modelos

### **Fase 2: Core Features (3-4 semanas)**
- [ ] Sistema de citas
- [ ] Dashboard de pacientes
- [ ] Dashboard de psicólogos
- [ ] Sistema de notificaciones

### **Fase 3: Dashboard Empresarial (2-3 semanas)**
- [ ] Gestión de empleados
- [ ] Métricas empresariales
- [ ] Sistema de reportes
- [ ] Configuración empresarial

### **Fase 4: Integraciones (2-3 semanas)**
- [ ] Google Calendar API
- [ ] Sistema de pagos
- [ ] Integración de email/SMS
- [ ] Almacenamiento de archivos

### **Fase 5: Optimización (1-2 semanas)**
- [ ] Performance y caching
- [ ] Testing completo
- [ ] Documentación
- [ ] Deployment

---

## 📊 Métricas y KPIs a Implementar

### **Para Pacientes:**
- Tasa de retención
- Progreso en sesiones
- Satisfacción con el servicio
- Tiempo de respuesta

### **Para Psicólogos:**
- Número de pacientes
- Tasa de ocupación
- Ingresos generados
- Calificaciones recibidas

### **Para Empresas:**
- Bienestar general de empleados
- Reducción de ausentismo
- Mejora en productividad
- ROI del programa

---

## 🔒 Consideraciones de Seguridad

### **Obligatorias:**
- [ ] Encriptación de datos sensibles
- [ ] Autenticación de dos factores
- [ ] Validación de entrada
- [ ] Rate limiting
- [ ] Logs de auditoría
- [ ] Cumplimiento HIPAA (si aplica)

### **Recomendadas:**
- [ ] Penetration testing
- [ ] Monitoreo de seguridad
- [ ] Backup automático
- [ ] Disaster recovery plan

---

## 📝 Próximos Pasos

1. **Definir arquitectura técnica específica**
2. **Crear prototipos de API**
3. **Configurar entorno de desarrollo**
4. **Implementar autenticación básica**
5. **Desarrollar endpoints críticos**
6. **Integrar con frontend existente**

---

## 📞 Contacto y Soporte

Para dudas sobre la implementación o cambios en la estructura, revisar:
- Documentación de componentes frontend
- Especificaciones de API
- Diagramas de flujo de datos

---

*Última actualización: [Fecha actual]*
*Versión: 1.0* 