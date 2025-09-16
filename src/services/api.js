import axios from 'axios';

/**
 * Servicios de API para conectar con el backend
 * Centraliza todas las llamadas HTTP al servidor
 */

// URL base del servidor backend
const API_BASE_URL = 'https://api.empathica.com.co';
//https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443
//https://local.julioperezag.com

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
apiClient.interceptors.request.use((config) => {
  // Log básico para debugging de peticiones
  console.log(`🌐 ${config.method?.toUpperCase()} ${config.url}`);
  
  // Rutas que no requieren verificación de token
  const publicRoutes = [
    '/api/auth/login',
    '/api/patients',
    '/api/psychologists' // Solo para POST (registro)
  ];
  
  // Si es una ruta pública, no verificar token
  // Solo considerar públicas las rutas POST de registro específicas
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/api/psychologists') {
      // Para /api/psychologists, considerar público si es POST (registro) o GET (listar todos)
      return config.url.includes(route) && 
             (config.method === 'post' && !config.url.includes('/schedule')) ||
             (config.method === 'get' && config.url === '/api/psychologists');
    }
    if (route === '/api/patients') {
      // Para /api/patients, solo considerar público si es POST exacto (registro) y NO es /psychologist
      return config.url === route && config.method === 'post' && !config.url.includes('/psychologist');
    }
    return config.url.includes(route) && config.method === 'post';
  });
  
  if (isPublicRoute) {
    return config;
  }
  
  // Verificar si el token ha expirado antes de hacer la petición
  if (isTokenExpired()) {
    localStorage.removeItem('empathica_token');
    localStorage.removeItem('empathica_user');
    
    // Solo redirigir si no estamos ya en la página de login
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    
    return Promise.reject(new Error('Token expirado'));
  }
  
  const token = localStorage.getItem('empathica_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
  (response) => {
    // Log básico para respuestas exitosas
    console.log(`✅ ${response.status} ${response.config?.url}`);
    return response;
  },
  (error) => {
    // Log básico para errores
    console.log(`❌ ${error.response?.status || 'ERROR'} ${error.config?.url}`);
    // Rutas que no deben causar redirección automática al login
    const nonCriticalRoutes = [
      '/api/auth/login', // Excluir login para no limpiar sesión en intentos fallidos
      '/api/psychologists/',
      '/api/patients/',
      '/api/users/details', // Agregar también el endpoint de detalles de usuario
      '/api/patients/', // Incluir actualizaciones de pacientes
      '/api/companies/', // Incluir todas las rutas de empresas
      '/api/companies' // Incluir la ruta exacta de creación de empresas
    ];
    
    const isNonCriticalRoute = nonCriticalRoutes.some(route => {
      const url = error.config?.url || '';
      const matches = url.includes(route);
      console.log(`Checking route: ${url} against ${route} -> ${matches}`);
      return matches;
    });
    
    if (error.response && error.response.status === 401) {
      console.log('=== ERROR 401 DETECTADO ===');
      console.log('URL:', error.config?.url);
      console.log('Es ruta no crítica:', isNonCriticalRoute);
      console.log('==========================');
      
      // Verificar si es un intento de login fallido
      const isLoginAttempt = error.config?.url?.includes('/api/auth/login');
      
      if (!isLoginAttempt) {
        // Token expirado o inválido en otras rutas
        localStorage.removeItem('empathica_token');
        localStorage.removeItem('empathica_user');
        
        // Solo redirigir si no es una ruta no crítica
        if (!isNonCriticalRoute && window.location.pathname !== '/login') {
          console.log('Redirigiendo al login porque no es ruta no crítica');
          window.location.href = '/login';
        } else {
          console.log('NO redirigiendo al login porque es ruta no crítica');
        }
      }
    } else if (error.response && error.response.status === 403) {
      // Acceso denegado
      localStorage.removeItem('empathica_token');
      localStorage.removeItem('empathica_user');
      
      // Solo redirigir si no es una ruta no crítica
      if (!isNonCriticalRoute && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Función helper para manejar respuestas HTTP
 * @param {Object} response - Respuesta de axios
 * @returns {Promise} - Datos de la respuesta
 */
const handleResponse = (response) => {
  return response.data;
};

/**
 * Función para verificar si el token ha expirado
 * @returns {boolean} - True si el token ha expirado
 */
const isTokenExpired = () => {
  const token = localStorage.getItem('empathica_token');
  if (!token) return true;
  
  try {
    // Verificar que el token tenga el formato correcto (3 partes separadas por puntos)
    const parts = token.split('.');
    if (parts.length !== 3) {
      return true;
    }
    
    // Decodificar el token JWT (solo la parte del payload)
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Verificar si el token ha expirado (con margen de 5 minutos)
    return payload.exp < (currentTime - 300);
  } catch (error) {
    return true; // Si hay error, considerar como expirado
  }
};

/**
 * Servicios de autenticación
 */
export const authService = {
  /**
   * Registra un nuevo usuario
   * @param {Object} userData - Datos del usuario a registrar
   * @param {number} userData.id - ID del usuario (usar 0 para nuevos registros)
   * @param {string} userData.username - Nombre de usuario
   * @param {string} userData.name - Nombre del usuario
   * @param {string} userData.lastName - Apellido del usuario
   * @param {string} userData.email - Email del usuario
   * @param {string} userData.password - Contraseña del usuario
   * @param {string} userData.role - Rol del usuario (PATIENT o PSICOLOGO)
   * @returns {Promise} - Respuesta del servidor
   */
  signup: async (userData) => {
    try {
      const response = await apiClient.post('/api/auth/signup', userData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error en signup:', error);
      throw error;
    }
  },

           /**
          * Inicia sesión de un usuario
          * @param {Object} credentials - Credenciales de login
          * @param {string} credentials.email - Email del usuario
          * @param {string} credentials.password - Contraseña del usuario
          * @returns {Promise} - Respuesta del servidor con token
          */
         login: async (credentials) => {
           try {
             // Enviar solo email y password al backend
             const loginData = {
               email: credentials.email,
               password: credentials.password
             };

      const response = await apiClient.post('/api/auth/login', loginData);
      const data = handleResponse(response);
      
      // Guardar el token en localStorage
      if (data.token) {
        localStorage.setItem('empathica_token', data.token);
      }
      
      return data;
           } catch (error) {
      // Manejar errores específicos de autenticación
      if (error.response) {
        if (error.response.status === 401) {
          // Mostrar el mensaje específico del backend si está disponible
          const backendMessage = error.response.data?.message || error.response.data?.error;
          if (backendMessage) {
            // Si el mensaje del backend indica que es por estado pendiente, mostrar mensaje específico
            if (backendMessage.toLowerCase().includes('pending') || 
                backendMessage.toLowerCase().includes('aprobación') ||
                backendMessage.toLowerCase().includes('approval')) {
              throw new Error('Tu cuenta está pendiente de aprobación. Un administrador debe activar tu cuenta antes de que puedas acceder.');
            }
            throw new Error(backendMessage);
          } else {
            throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
          }
        } else if (error.response.status === 400) {
          throw new Error('Datos de login incompletos. Verifica que hayas ingresado email y contraseña.');
        } else if (error.response.status >= 500) {
          throw new Error('Error del servidor. Inténtalo de nuevo más tarde.');
        }
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      }
      
      throw new Error('Error inesperado durante el login. Inténtalo de nuevo.');
    }
  },

  /**
   * Cierra la sesión del usuario
   */
  logout: () => {
    localStorage.removeItem('empathica_token');
    localStorage.removeItem('empathica_user');
         }
};

/**
 * Servicios de usuarios
 */
export const userService = {
  /**
   * Obtiene los detalles del usuario autenticado
   * @returns {Promise} - Datos del usuario
   */
  getUserDetails: async () => {
    try {
      const response = await apiClient.get('/api/users/details');
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo detalles del usuario:', error);
      throw error;
    }
  },

  /**
   * Obtiene la información del paciente por ID
   * @param {number} patientId - ID del paciente
   * @returns {Promise} - Datos del paciente
   */
  getPatientById: async (patientId) => {
    try {
      const response = await apiClient.get(`/api/patients/${patientId}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo paciente:', error);
      throw error;
    }
  },

  /**
   * Obtiene el perfil del usuario actual
   * @returns {Promise} - Datos del perfil del usuario
   */
  getProfile: async () => {
    try {
      const response = await apiClient.get('/api/users/profile');
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      throw error;
    }
  },

  /**
   * Actualiza el perfil del usuario
   * @param {Object} profileData - Datos del perfil a actualizar
   * @returns {Promise} - Respuesta del servidor
   */
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/api/users/profile', profileData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  },

  /**
   * Crea o actualiza información del paciente
   * @param {Object} patientData - Datos del paciente
   * @param {string} patientData.name - Nombre del paciente
   * @param {string} patientData.lastName - Apellido del paciente
   * @param {string} patientData.email - Email del paciente
   * @param {string} patientData.phoneNumber - Número de teléfono
   * @param {string} patientData.dateOfBirth - Fecha de nacimiento (YYYY-MM-DD)
   * @param {string} patientData.gender - Género (MALE, FEMALE, OTHER)
   * @returns {Promise} - Respuesta del servidor
   */
  createPatient: async (patientData) => {
    try {
      const response = await apiClient.post('/api/patients', patientData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error creando información de paciente:', error);
      throw error;
    }
  },

  /**
   * Crea o actualiza información del psicólogo
   * @param {Object} psychologistData - Datos del psicólogo
   * @param {string} psychologistData.name - Nombre del psicólogo
   * @param {string} psychologistData.lastName - Apellido del psicólogo
   * @param {string} psychologistData.email - Email del psicólogo
   * @param {string} psychologistData.phoneNumber - Número de teléfono
   * @param {string} psychologistData.dateOfBirth - Fecha de nacimiento (YYYY-MM-DD)
   * @param {string} psychologistData.gender - Género (MALE, FEMALE, OTHER)
   * @returns {Promise} - Respuesta del servidor
   */
  createPsychologist: async (psychologistData) => {
    try {
      const response = await apiClient.post('/api/psychologists', psychologistData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error creando información de psicólogo:', error);
      throw error;
    }
  },

  /**
   * Obtiene información detallada de un psicólogo por ID
   * @param {number} psychologistId - ID del psicólogo
   * @returns {Promise} - Respuesta del servidor con información del psicólogo
   */
  getPsychologistById: async (psychologistId) => {
    try {
      const response = await apiClient.get(`/api/psychologists/${psychologistId}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo información del psicólogo:', error);
      throw error;
    }
  },

  /**
   * Obtiene todos los psicólogos registrados en la plataforma
   * @returns {Promise} - Respuesta del servidor con lista de psicólogos
   */
      getAllPsychologists: async () => {
      try {
        const response = await apiClient.get('/api/psychologists');
        return handleResponse(response);
      } catch (error) {
        console.error('Error obteniendo lista de psicólogos:', error);
        throw error;
      }
    },
    getPsychologistDetails: async (id) => {
      try {
        const response = await apiClient.get(`/api/psychologists/${id}`);
        return handleResponse(response);
      } catch (error) {
        console.error('Error obteniendo detalles del psicólogo:', error);
        throw error;
      }
    },
    updatePsychologistStatus: async (id, userStatus) => {
      try {
        const response = await apiClient.put(`/api/psychologists/${id}`, { userStatus });
        return handleResponse(response);
      } catch (error) {
        console.error('Error actualizando estado del psicólogo:', error);
        throw error;
      }
    },



  /**
   * Actualiza la información complementaria de un psicólogo
   * @param {number} psychologistId - ID del psicólogo
   * @param {Object} complementaryData - Datos complementarios del psicólogo
   * @returns {Promise} - Respuesta del servidor
   */
  updatePsychologistComplementaryInfo: async (psychologistId, complementaryData) => {
    try {
      const response = await apiClient.put(`/api/psychologists/${psychologistId}`, complementaryData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error actualizando información complementaria del psicólogo:', error);
      throw error;
    }
  },

  /**
   * Crea un horario para el psicólogo
   * @param {Object} scheduleData - Datos del horario
   * @param {string} scheduleData.day - Día de la semana (MONDAY, TUESDAY, etc.)
   * @param {string} scheduleData.startTime - Hora de inicio (HH:MM)
   * @param {string} scheduleData.endTime - Hora de fin (HH:MM)
   * @returns {Promise} - Respuesta del backend
   */
  createPsychologistSchedule: async (scheduleData) => {
    try {
      const response = await apiClient.post('/api/psychologists/schedule', scheduleData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error creando horario:', error);
      throw error;
    }
  },

  /**
   * Elimina un horario específico del psicólogo
   * @param {number} scheduleId - ID del horario a eliminar
   * @returns {Promise} - Respuesta del backend
   */
  deletePsychologistSchedule: async (scheduleId) => {
    try {
      const response = await apiClient.delete(`/api/psychologists/schedule/${scheduleId}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error eliminando horario:', error);
      throw error;
    }
  },

  /**
   * Actualiza todos los horarios del psicólogo (reemplaza los existentes)
   * @param {number} psychologistId - ID del psicólogo
   * @param {Array} scheduleData - Array de horarios a actualizar
   * @param {string} scheduleData[].day - Día de la semana (MONDAY, TUESDAY, etc.)
   * @param {string} scheduleData[].startTime - Hora de inicio (HH:MM)
   * @param {string} scheduleData[].endTime - Hora de fin (HH:MM)
   * @returns {Promise} - Respuesta del backend
   */
  updatePsychologistSchedule: async (psychologistId, scheduleData) => {
    try {
      // Opción 1: Intentar PUT con datos completos del psicólogo
      try {
        // Primero obtener los datos actuales del psicólogo
        const currentData = await userService.getPsychologistById(psychologistId);
        
        // Preparar los datos para el PUT (mantener datos existentes y actualizar horarios)
        // Excluir el ID del objeto para no enviarlo
        const { id, ...updateData } = currentData;
        updateData.psychologistSchedule = scheduleData;
        
        const response = await apiClient.put(`/api/psychologists/${psychologistId}`, updateData);
        return handleResponse(response);
      } catch (putError) {
        console.log('PUT falló, intentando con POST individual...');
        
        // Opción 2: Eliminar horarios existentes y crear nuevos
        // Primero eliminar todos los horarios existentes (si existe endpoint DELETE)
        try {
          await apiClient.delete(`/api/psychologists/${psychologistId}/schedule`);
        } catch (deleteError) {
          console.log('Endpoint DELETE no disponible, continuando...');
        }
        
        // Luego crear los nuevos horarios uno por uno
        const promises = scheduleData.map(schedule => 
          userService.createPsychologistSchedule(schedule)
        );
        await Promise.all(promises);
        
        return { success: true, message: 'Horarios actualizados exitosamente' };
      }
    } catch (error) {
      console.error('Error actualizando horarios del psicólogo:', error);
      throw error;
    }
  },

  /**
   * Obtiene los datos completos de un paciente por su ID
   * @param {number} patientId - ID del paciente
   * @returns {Promise} - Datos del paciente incluyendo psicólogo asignado
   */
  getPatientById: async (patientId) => {
    try {
      const response = await apiClient.get(`/api/patients/${patientId}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo datos del paciente:', error);
      throw error;
    }
  },

  /**
   * Actualiza los datos de un paciente (incluyendo tags del test)
   * @param {number} patientId - ID del paciente
   * @param {Object} patientData - Datos del paciente a actualizar
   * @returns {Promise} - Respuesta del backend
   */
  updatePatient: async (patientId, patientData) => {
    try {
      const response = await apiClient.put(`/api/patients/${patientId}`, patientData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error actualizando datos del paciente:', error);
      throw error;
    }
  },

  /**
   * Asigna un psicólogo a un paciente
   * @param {Object} assignmentData - Datos de la asignación
   * @param {number} assignmentData.userId - ID del psicólogo a asignar
   * @returns {Promise} - Respuesta del servidor
   */
  assignPsychologistToPatient: async (assignmentData) => {
    try {
      const response = await apiClient.post('/api/patients/psychologist', assignmentData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error asignando psicólogo al paciente:', error);
      throw error;
    }
  },

  /**
   * Sube los tags del paciente usando POST /api/patients/tags
   * @param {Object} tagsData - Datos de los tags del paciente
   * @param {Object} tagsData.tag1 - Primer tag con { tagId: 0, name: "string", percentage: 0.1, patient: "string" }
   * @param {Object} tagsData.tag2 - Segundo tag con { tagId: 0, name: "string", percentage: 0.1, patient: "string" }
   * @param {Object} tagsData.tag3 - Tercer tag con { tagId: 0, name: "string", percentage: 0.1, patient: "string" }
   * @returns {Promise} - Respuesta del servidor
   */
  uploadPatientTags: async (tagsData) => {
    try {
      const response = await apiClient.post('/api/patients/tags', tagsData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error subiendo tags del paciente:', error);
      throw error;
    }
  },

  /**
   * Obtiene los datos completos de un psicólogo por su ID
   * @param {number} psychologistId - ID del psicólogo
   * @returns {Promise} - Datos del psicólogo incluyendo horarios
   */
  getPsychologistById: async (psychologistId) => {
    try {
      const response = await apiClient.get(`/api/psychologists/${psychologistId}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo datos del psicólogo:', error);
      throw error;
    }
  }
};

/**
 * Servicios de citas
 */
export const appointmentService = {
  /**
   * Obtiene las citas del usuario
   * @returns {Promise} - Lista de citas
   */
  getAppointments: async () => {
    try {
      const response = await apiClient.get('/api/appointments');
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo citas:', error);
      throw error;
    }
  },

  /**
   * Crea una nueva cita
   * @param {Object} appointmentData - Datos de la cita
   * @returns {Promise} - Respuesta del servidor
   */
  createAppointment: async (appointmentData) => {
    try {
      const response = await apiClient.post('/api/appointments', appointmentData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error creando cita:', error);
      throw error;
    }
  },

  /**
   * Crea una nueva sesión con un psicólogo específico
   * @param {number} psychologistId - ID del psicólogo
   * @param {string} sessionTime - Fecha y hora de la sesión en formato ISO
   * @returns {Promise} - Respuesta del servidor
   */
  createSession: async (psychologistId, sessionTime) => {
    try {
      console.log('=== API SERVICE - createSession ===');
      console.log('URL:', `/api/patients/session/${psychologistId}`);
      console.log('Payload completo:', { sessionTime: sessionTime });
      console.log('Headers:', apiClient.defaults.headers);
      console.log('=====================================');
      
      const response = await apiClient.post(`/api/patients/session/${psychologistId}`, {
        sessionTime: sessionTime
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error creando sesión:', error);
      throw error;
    }
  },


  /**
   * Obtiene las sesiones del paciente
   * @returns {Promise} - Respuesta del servidor con las sesiones del paciente
   */
  getPatientSessions: async () => {
    try {
      const response = await apiClient.get('/api/patients/sessions');
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo sesiones del paciente:', error);
      throw error;
    }
  },

  /**
   * Crea una orden de pago en PayPal
   * @param {Object} orderData - Datos de la orden
   * @returns {Promise} - Respuesta del servidor con la orden creada
   */
  createPaymentOrder: async (orderData = {}) => {
    try {
      console.log('=== CREANDO ORDEN DE PAGO ===');
      console.log('URL:', '/api/payments/orders');
      console.log('Payload:', orderData, '(objeto vacío - backend se encarga de crear la orden)');
      console.log('=====================================');
      
      const response = await apiClient.post('/api/payments/orders', orderData);
      return handleResponse(response);
    } catch (error) {
      console.error('Error creando orden de pago:', error);
      throw error;
    }
  },

  /**
   * Captura una orden de pago de PayPal
   * @param {string} orderId - ID de la orden a capturar
   * @returns {Promise} - Respuesta del servidor con la captura
   */
  capturePaymentOrder: async (orderId) => {
    try {
      console.log('=== CAPTURANDO ORDEN DE PAGO ===');
      console.log('URL:', `/api/payments/orders/${orderId}/capture`);
      console.log('Order ID:', orderId);
      console.log('=====================================');
      
      const response = await apiClient.post(`/api/payments/orders/${orderId}/capture`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error capturando orden de pago:', error);
      throw error;
    }
  },

  /**
   * Obtiene las sesiones del psicólogo
   * @returns {Promise} - Respuesta del servidor con las sesiones del psicólogo
   */
  getPsychologistSessions: async () => {
    try {
      console.log('=== OBTENIENDO SESIONES DEL PSICÓLOGO ===');
      console.log('URL:', '/api/psychologists/sessions');
      console.log('=====================================');
      
      const response = await apiClient.get('/api/psychologists/sessions');
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo sesiones del psicólogo:', error);
      throw error;
    }
  },

  /**
   * Obtiene los pacientes asignados al psicólogo
   * @returns {Promise} - Respuesta del servidor con los pacientes asignados
   */
  getPsychologistPatients: async () => {
    try {
      console.log('=== OBTENIENDO PACIENTES DEL PSICÓLOGO ===');
      console.log('URL:', '/api/psychologists/patients');
      console.log('=====================================');
      
      const response = await apiClient.get('/api/psychologists/patients');
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo pacientes del psicólogo:', error);
      throw error;
    }
  },

  /**
   * Obtiene la información detallada de un paciente por ID
   * @param {number} patientId - ID del paciente
   * @returns {Promise} - Respuesta del servidor con la información del paciente
   */
  getPatientDetails: async (patientId) => {
    try {
      console.log('=== OBTENIENDO DETALLES DEL PACIENTE ===');
      console.log('URL:', `/api/patients/${patientId}`);
      console.log('Patient ID:', patientId);
      console.log('=====================================');
      
      const response = await apiClient.get(`/api/patients/${patientId}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo detalles del paciente:', error);
      throw error;
    }
  }
};

/**
 * Servicios de empresas
 */
export const companyService = {
  /**
   * Crea una nueva empresa con administrador
   * @param {Object} companyData - Datos de la empresa y administrador
   * @returns {Promise} - Respuesta del servidor con credenciales
   */
  createCompany: async (companyData) => {
    try {
      console.log('=== CREANDO EMPRESA CON ADMIN ===');
      console.log('URL:', '/api/companies');
      console.log('Datos enviados:', companyData);
      console.log('==================================');
      
      const response = await apiClient.post('/api/companies', companyData);
      const data = handleResponse(response);
      
      console.log('Empresa creada exitosamente:', data);
      return data;
    } catch (error) {
      console.error('Error creando empresa:', error);
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url
      });
      throw error;
    }
  },

  /**
   * Obtiene todas las empresas (respuesta paginada)
   * @returns {Promise} - Respuesta paginada con lista de empresas
   */
  getCompanies: async () => {
    try {
      console.log('=== OBTENIENDO EMPRESAS ===');
      console.log('URL:', '/api/companies');
      console.log('============================');
      
      const response = await apiClient.get('/api/companies');
      const data = handleResponse(response);
      
      console.log('Respuesta del servidor:', data);
      console.log('Total de empresas:', data.totalElements);
      console.log('Empresas en esta página:', data.content?.length || 0);
      
      return data;
    } catch (error) {
      console.error('Error obteniendo empresas:', error);
      throw error;
    }
  },

  /**
   * Obtiene los administradores de una empresa específica
   * @param {number} companyId - ID de la empresa
   * @returns {Promise} - Respuesta paginada con lista de administradores
   */
  getCompanyAdmins: async (companyId) => {
    try {
      console.log('=== OBTENIENDO ADMINISTRADORES DE EMPRESA ===');
      console.log('URL:', `/api/companies/${companyId}/admins`);
      console.log('Company ID:', companyId);
      console.log('=============================================');
      
      const response = await apiClient.get(`/api/companies/${companyId}/admins`);
      const data = handleResponse(response);
      
      console.log('Respuesta del servidor:', data);
      console.log('Total de administradores:', data.totalElements);
      console.log('Administradores en esta página:', data.content?.length || 0);
      
      return data;
    } catch (error) {
      console.error('Error obteniendo administradores de empresa:', error);
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url
      });
      throw error;
    }
  },

};

/**
 * Configuración global de la API
 */
export const apiConfig = {
  baseURL: API_BASE_URL,
  
  /**
   * Obtiene el token de autenticación del contexto de autenticación
   * @returns {string|null} - Token o null si no existe
   */
  getToken: () => {
    const user = JSON.parse(localStorage.getItem('empathica_user') || '{}');
    return user.token || null;
  },

  /**
   * Guarda el token de autenticación (ahora se maneja en AuthContext)
   * @param {string} token - Token a guardar
   */
  setToken: (token) => {
    console.warn('setToken está deprecado. Usa AuthContext.login() en su lugar');
  },

  /**
   * Guarda el ID del usuario (ahora se maneja en AuthContext)
   * @param {number} userId - ID del usuario
   */
  setUserId: (userId) => {
    console.warn('setUserId está deprecado. Usa AuthContext.login() en su lugar');
  },

  /**
   * Obtiene el ID del usuario del contexto de autenticación
   * @returns {number|null} - ID del usuario o null si no existe
   */
  getUserId: () => {
    const user = JSON.parse(localStorage.getItem('empathica_user') || '{}');
    return user.id || null;
  },

  /**
   * Elimina el token de autenticación (ahora se maneja en AuthContext)
   */
  removeToken: () => {
    console.warn('removeToken está deprecado. Usa AuthContext.logout() en su lugar');
  },

  /**
   * Elimina el ID del usuario (ahora se maneja en AuthContext)
   */
  removeUserId: () => {
    console.warn('removeUserId está deprecado. Usa AuthContext.logout() en su lugar');
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} - True si hay token válido
   */
  isAuthenticated: () => {
    const user = JSON.parse(localStorage.getItem('empathica_user') || '{}');
    return user && user.token;
  },

  /**
   * Limpia todos los datos de autenticación (ahora se maneja en AuthContext)
   */
  clearAuth: () => {
    console.warn('clearAuth está deprecado. Usa AuthContext.logout() en su lugar');
  },

  /**
   * Obtiene los datos del usuario autenticado
   * @returns {Object} - Objeto con token e ID del usuario
   */
  getAuthData: () => {
    const user = JSON.parse(localStorage.getItem('empathica_user') || '{}');
    return {
      token: user.token || null,
      userId: user.id || null
    };
  }
};

// Exportar la instancia de axios para uso directo si es necesario
export { apiClient };

export default {
  authService,
  userService,
  appointmentService,
  companyService,
  apiConfig,
  apiClient
}; 