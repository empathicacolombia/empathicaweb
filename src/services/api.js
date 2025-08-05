/**
 * Servicios de API para conectar con el backend
 * Centraliza todas las llamadas HTTP al servidor
 */

// URL base del servidor backend
const API_BASE_URL = 'https://ec2-3-143-252-0.us-east-2.compute.amazonaws.com:8443';

/**
 * Función helper para manejar respuestas HTTP
 * @param {Response} response - Respuesta de fetch
 * @returns {Promise} - Datos de la respuesta
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch (e) {
      // Si no se puede parsear JSON, intentar leer como texto
      const textError = await response.text();
      errorData = { message: textError || 'Error desconocido' };
    }
    
    console.error('Error response:', {
      status: response.status,
      statusText: response.statusText,
      errorData: errorData,
      url: response.url
    });
    
    // Mensaje de error más específico
    let errorMessage = 'Error de autenticación';
    if (response.status === 401) {
      errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
    } else if (response.status === 404) {
      errorMessage = 'Servicio no encontrado. Verifica la URL del servidor.';
    } else if (response.status === 500) {
      errorMessage = 'Error interno del servidor. Intenta más tarde.';
    } else if (errorData.message) {
      errorMessage = errorData.message;
    } else if (errorData.error) {
      errorMessage = errorData.error;
    }
    
    throw new Error(errorMessage);
  }
  return response.json();
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
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      return await handleResponse(response);
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
             // Preparar datos para el backend según la documentación de Swagger
             const loginData = {
               id: 0,
               username: credentials.email,
               name: '',
               lastName: '',
               email: credentials.email,
               password: credentials.password,
               role: ''
             };

             console.log('Enviando datos de login:', {
               url: `${API_BASE_URL}/api/auth/login`,
               data: { ...loginData, password: '[HIDDEN]' },
               method: 'POST',
               headers: { 'Content-Type': 'application/json' }
             });

             const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify(loginData)
             });

             console.log('Respuesta del servidor:', {
               status: response.status,
               statusText: response.statusText,
               url: response.url,
               headers: Object.fromEntries(response.headers.entries()),
               ok: response.ok
             });

             // Intentar leer el cuerpo de la respuesta para debug
             try {
               const responseText = await response.text();
               console.log('Cuerpo de la respuesta:', responseText);
               
               // Si la respuesta no es exitosa, lanzar error
               if (!response.ok) {
                 throw new Error(`HTTP ${response.status}: ${responseText || response.statusText}`);
               }
               
               // Si es exitosa, parsear como JSON
               return JSON.parse(responseText);
             } catch (parseError) {
               console.error('Error parseando respuesta:', parseError);
               throw parseError;
             }
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
   * Obtiene el perfil del usuario actual
   * @param {string} token - Token de autenticación
   * @returns {Promise} - Datos del perfil del usuario
   */
  getProfile: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo perfil:', error);
      throw error;
    }
  },

  /**
   * Actualiza el perfil del usuario
   * @param {string} token - Token de autenticación
   * @param {Object} profileData - Datos del perfil a actualizar
   * @returns {Promise} - Respuesta del servidor
   */
  updateProfile: async (token, profileData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error actualizando perfil:', error);
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
   * @param {string} token - Token de autenticación
   * @returns {Promise} - Lista de citas
   */
  getAppointments: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      return await handleResponse(response);
    } catch (error) {
      console.error('Error obteniendo citas:', error);
      throw error;
    }
  },

  /**
   * Crea una nueva cita
   * @param {string} token - Token de autenticación
   * @param {Object} appointmentData - Datos de la cita
   * @returns {Promise} - Respuesta del servidor
   */
  createAppointment: async (token, appointmentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      return await handleResponse(response);
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
   * Obtiene el token de autenticación del localStorage
   * @returns {string|null} - Token o null si no existe
   */
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  /**
   * Guarda el token de autenticación en localStorage
   * @param {string} token - Token a guardar
   */
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  /**
   * Elimina el token de autenticación del localStorage
   */
  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} - True si hay token válido
   */
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return token !== null && token !== undefined;
  }
};

export default {
  authService,
  userService,
  appointmentService,
  apiConfig
}; 