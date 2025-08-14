import axios from 'axios';

/**
 * Servicios de API para conectar con el backend
 * Centraliza todas las llamadas HTTP al servidor
 */

// URL base del servidor backend
const API_BASE_URL = 'https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
apiClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('empathica_user') || '{}');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
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

/**
 * Función helper para manejar respuestas HTTP
 * @param {Object} response - Respuesta de axios
 * @returns {Promise} - Datos de la respuesta
 */
const handleResponse = (response) => {
  return response.data;
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
             return handleResponse(response);
           } catch (error) {
             console.error('Error en login:', error);
             throw error;
           }
         }
};

/**
 * Servicios de usuarios
 */
export const userService = {
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
   * Crea o actualiza información adicional del paciente
   * @param {Object} patientData - Datos del paciente (id, phone, gender)
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