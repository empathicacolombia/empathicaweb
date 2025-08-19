import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Componente para proteger rutas que requieren autenticación
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos a renderizar si está autorizado
 * @param {boolean} props.requireAuth - Si requiere autenticación (default: true)
 * @param {string} props.userType - Tipo de usuario requerido ('client', 'psychologist', 'business')
 * @param {string} props.redirectTo - Ruta a la que redirigir si no está autorizado (default: '/login')
 * @param {Object} props.user - Información del usuario actual
 * @returns {React.ReactNode} - Componente protegido o redirección
 */
const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  userType = null, 
  redirectTo = '/login',
  user = null 
}) => {
  const location = useLocation();

  // Si no requiere autenticación, mostrar directamente
  if (!requireAuth) {
    return children;
  }

  // Verificar si el usuario está autenticado
  const isAuthenticated = user && (user.id || user.userId);

  if (!isAuthenticated) {
    // Redirigir al login guardando la ubicación actual para volver después
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Si se especifica un tipo de usuario, verificar que coincida
  if (userType && user.userType !== userType) {
    // Redirigir a página de acceso denegado o dashboard correspondiente
    const accessDeniedRoute = getAccessDeniedRoute(user.userType);
    return <Navigate to={accessDeniedRoute} replace />;
  }

  // Usuario autenticado y autorizado, mostrar contenido
  return children;
};

/**
 * Obtiene la ruta de acceso denegado basada en el tipo de usuario
 * @param {string} userType - Tipo de usuario actual
 * @returns {string} - Ruta a la que redirigir
 */
const getAccessDeniedRoute = (userType) => {
  switch (userType) {
    case 'client':
      return '/client-dashboard';
    case 'psychologist':
      return '/psychologist-dashboard';
    case 'business':
      return '/business-dashboard';
    default:
      return '/login';
  }
};

export default ProtectedRoute;
