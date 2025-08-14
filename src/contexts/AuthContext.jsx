import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Verificar si hay un usuario guardado en localStorage al cargar
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('empathica_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        localStorage.removeItem('empathica_user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Función para iniciar sesión
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.id - ID del usuario
   * @param {string} userData.email - Email del usuario
   * @param {string} userData.name - Nombre del usuario
   * @param {string} userData.userType - Tipo de usuario ('client', 'psychologist', 'business')
   * @param {string} userData.token - Token de autenticación
   */
  const login = (userData) => {
    try {
      // Guardar usuario en localStorage
      localStorage.setItem('empathica_user', JSON.stringify(userData));
      setUser(userData);
      
      // Aquí podrías hacer una llamada al backend para validar el token
      console.log('Usuario logueado:', userData);
    } catch (error) {
      console.error('Error al guardar datos de usuario:', error);
      throw new Error('Error al iniciar sesión');
    }
  };

  /**
   * Función para cerrar sesión
   */
  const logout = () => {
    try {
      // Limpiar datos del usuario
      localStorage.removeItem('empathica_user');
      setUser(null);
      
      // Aquí podrías hacer una llamada al backend para invalidar el token
      console.log('Usuario deslogueado');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
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
    return user !== null && user.id;
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
