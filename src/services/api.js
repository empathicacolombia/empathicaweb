import axios from 'axios';

/**
 * Servicios de API para conectar con el backend
 * Centraliza todas las llamadas HTTP al servidor
 */

// URL base del servidor backend
const API_BASE_URL = 'https://local.julioperezag.com';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
apiClient.interceptors.request.use((config) => {
  // Rutas que no requieren verificación de token
  const publicRoutes = [
    '/api/auth/login',
    '/api/patients',
    '/api/psychologists' // Solo para POST (registro), no para GET
  ];
  
  // Si es una ruta pública, no verificar token
  // Solo considerar públicas las rutas POST de registro
  if (publicRoutes.some(route => config.url.includes(route)) && config.method === 'post') {
    return config;
  }
  
  // Verificar si el token ha expirado antes de hacer la petición
  if (isTokenExpired()) {
    console.log('Token expirado, limpiando sesión...');
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
  (response) => response,
  (error) => {
    // Rutas que no deben causar redirección automática al login
    const nonCriticalRoutes = [
      '/api/psychologists/',
      '/api/patients/',
      '/api/users/details' // Agregar también el endpoint de detalles de usuario
    ];
    
    const isNonCriticalRoute = nonCriticalRoutes.some(route => 
      error.config?.url?.includes(route)
    );
    
    if (error.response && error.response.status === 401) {
      // Token expirado o inválido
      console.log('Token expirado o inválido, limpiando sesión...');
      localStorage.removeItem('empathica_token');
      localStorage.removeItem('empathica_user');
      
      // Solo redirigir si no es una ruta no crítica
      if (!isNonCriticalRoute && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    } else if (error.response && error.response.status === 403) {
      // Acceso denegado
      console.log('Acceso denegado, limpiando sesión...');
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
      console.log('Token malformado, considerando como expirado');
      return true;
    }
    
    // Decodificar el token JWT (solo la parte del payload)
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Verificar si el token ha expirado (con margen de 5 minutos)
    const isExpired = payload.exp < (currentTime - 300);
    
    if (isExpired) {
      console.log('Token expirado según verificación JWT');
    }
    
    return isExpired;
  } catch (error) {
    console.error('Error verificando expiración del token:', error);
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
      console.log('Iniciando proceso de login...');
      
      // Enviar solo email y password al backend
      const loginData = {
        email: credentials.email,
        password: credentials.password
      };

      console.log('Enviando credenciales al backend...');
      const response = await apiClient.post('/api/auth/login', loginData);
      const data = handleResponse(response);
      
      console.log('Login exitoso, token recibido:', !!data.token);
      
      // Guardar el token en localStorage
      if (data.token) {
        localStorage.setItem('empathica_token', data.token);
        console.log('Token guardado en localStorage');
      } else {
        console.warn('No se recibió token en la respuesta');
      }
      
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
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
  }
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
  apiConfig,
  apiClient
}; 