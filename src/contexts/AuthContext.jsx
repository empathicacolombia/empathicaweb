import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, userService } from '../services/api';

// Crear el contexto de autenticación
const AuthContext = createContext();

/**
 * Hook personalizado para usar el contexto de autenticación
 * @returns {Object} - Contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

/**
 * Proveedor del contexto de autenticación
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {React.ReactNode} - Proveedor de autenticación
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Función helper para mapear roles del backend a userType del frontend
   * @param {Object} userDetails - Datos del usuario del backend
   * @returns {Object} - Usuario con userType agregado
   */
  const mapUserRolesToType = (userDetails) => {
    let userType = 'client'; // Por defecto
    
    if (userDetails.roles && userDetails.roles.length > 0) {
      // Verificar si es super admin (ADMIN + Company:Empathica)
      const hasAdminRole = userDetails.roles.includes('ADMIN');
      const hasEmpathicaCompany = userDetails.roles.includes('Company:Empathica');
      
      if (hasAdminRole && hasEmpathicaCompany) {
        userType = 'superadmin';
      } else if (userDetails.roles.includes('PSYCHOLOGIST')) {
        userType = 'psychologist';
      } else if (userDetails.roles.includes('ADMIN')) {
        userType = 'business';
      } else if (userDetails.roles.includes('PATIENT')) {
        userType = 'client';
      }
    }
    
    // Estandarizar el ID del usuario
    const standardizedUser = {
      ...userDetails,
      userType: userType,
      id: userDetails.userId || userDetails.id // Usar userId si existe, sino id
    };
    
    // Remover userId duplicado si existe
    if (standardizedUser.userId && standardizedUser.id) {
      delete standardizedUser.userId;
    }
    
    return standardizedUser;
  };

  // Verificar si hay un token guardado en localStorage al cargar
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('empathica_token');
        if (token) {
          // Obtener detalles del usuario usando el token
          const userDetails = await userService.getUserDetails();
          
          // Mapear roles del backend a userType del frontend
          const userWithType = mapUserRolesToType(userDetails);
          
          setUser(userWithType);
        }
              } catch (error) {
          console.error('Error al verificar autenticación:', error);
          // Si hay error, limpiar token y datos de usuario
          clearSession();
        } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Event listener para limpiar sesión cuando se cierra la ventana/pestaña
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Limpiar sesión al cerrar la ventana/pestaña
      clearSession();
    };

    const handleVisibilityChange = () => {
      // Si la página se oculta por más de 30 minutos, limpiar sesión
               if (document.hidden) {
           setTimeout(() => {
             if (document.hidden) {
               clearSession();
             }
           }, 30 * 60 * 1000); // 30 minutos
         }
    };

    // Event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  /**
   * Función para iniciar sesión
   * @param {Object} credentials - Credenciales de login
   * @param {string} credentials.email - Email del usuario
   * @param {string} credentials.password - Contraseña del usuario
   */
  const login = async (credentials) => {
    try {
      // Limpiar sesión anterior antes de hacer login
      clearSession();
      
      // Llamar al servicio de autenticación
      const response = await authService.login(credentials);
      
      // Obtener detalles del usuario usando el token
      const userDetails = await userService.getUserDetails();
      
      // Mapear roles del backend a userType del frontend
      const userWithType = mapUserRolesToType(userDetails);
      
      // Guardar usuario en localStorage
      localStorage.setItem('empathica_user', JSON.stringify(userWithType));
      setUser(userWithType);
      
      return userWithType;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Limpiar sesión en caso de error
      clearSession();
      throw error;
    }
  };

  /**
   * Función para cerrar sesión
   */
  const logout = () => {
    try {
      // Usar el servicio de autenticación para logout
      authService.logout();
      
      // Limpiar estado del usuario
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  /**
   * Función para limpiar completamente la sesión
   * Se usa en casos de error o cuando se necesita limpiar todo
   */
  const clearSession = () => {
    try {
      // Limpiar localStorage
      localStorage.removeItem('empathica_token');
      localStorage.removeItem('empathica_user');
      
      // Limpiar estado
      setUser(null);
    } catch (error) {
      console.error('Error limpiando sesión:', error);
    }
  };

  /**
   * Función para actualizar datos del usuario
   * @param {Object} userData - Nuevos datos del usuario
   */
  const updateUser = (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('empathica_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error al actualizar datos de usuario:', error);
    }
  };

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} - True si está autenticado
   */
  const isAuthenticated = () => {
    return user !== null && (user.id || user.userId);
  };

  /**
   * Verificar si el usuario es de un tipo específico
   * @param {string} userType - Tipo de usuario a verificar
   * @returns {boolean} - True si coincide el tipo
   */
  const isUserType = (userType) => {
    return user && user.userType === userType;
  };

  // Valor del contexto
  const value = {
    user,
    loading,
    login,
    logout,
    clearSession,
    updateUser,
    isAuthenticated,
    isUserType
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
