/**
 * Utilidades de navegación para Empathica
 * Proporciona funciones helper para manejar la navegación de manera consistente
 */

/**
 * Función para navegar a una página específica
 * @param {Function} navigate - Función de navegación de React Router
 * @param {string} page - Página a la cual navegar
 * @param {Object} additionalProps - Propiedades adicionales para pasar
 */
export const navigateTo = (navigate, page, additionalProps = {}) => {
  try {
    navigate(`/${page}`, { 
      state: additionalProps,
      replace: false // Permite que el botón de retroceso funcione
    });
  } catch (error) {
    console.error('Error en navegación:', error);
    // Fallback: intentar navegar sin estado
    navigate(`/${page}`);
  }
};

/**
 * Función para navegar hacia atrás
 * @param {Function} navigate - Función de navegación de React Router
 */
export const navigateBack = (navigate) => {
  try {
    navigate(-1);
  } catch (error) {
    console.error('Error al navegar hacia atrás:', error);
    // Fallback: navegar a la página principal
    navigate('/');
  }
};

/**
 * Función para navegar hacia adelante
 * @param {Function} navigate - Función de navegación de React Router
 */
export const navigateForward = (navigate) => {
  try {
    navigate(1);
  } catch (error) {
    console.error('Error al navegar hacia adelante:', error);
  }
};

/**
 * Función para reemplazar la página actual (no permite retroceso)
 * @param {Function} navigate - Función de navegación de React Router
 * @param {string} page - Página a la cual navegar
 * @param {Object} additionalProps - Propiedades adicionales para pasar
 */
export const replacePage = (navigate, page, additionalProps = {}) => {
  try {
    navigate(`/${page}`, { 
      state: additionalProps,
      replace: true // Reemplaza la página actual
    });
  } catch (error) {
    console.error('Error al reemplazar página:', error);
    navigate(`/${page}`);
  }
};

/**
 * Función para verificar si se puede navegar hacia atrás
 * @param {number} historyLength - Longitud del historial
 * @returns {boolean} - True si se puede navegar hacia atrás
 */
export const canGoBack = (historyLength) => {
  return historyLength > 1;
};

/**
 * Función para obtener la página anterior del historial
 * @param {Array} history - Array del historial de navegación
 * @returns {string|null} - Página anterior o null si no hay
 */
export const getPreviousPage = (history) => {
  if (history.length > 1) {
    return history[history.length - 2];
  }
  return null;
};

/**
 * Función para manejar navegación con confirmación
 * @param {Function} navigate - Función de navegación de React Router
 * @param {string} page - Página a la cual navegar
 * @param {string} message - Mensaje de confirmación
 * @param {Object} additionalProps - Propiedades adicionales para pasar
 */
export const navigateWithConfirmation = (navigate, page, message, additionalProps = {}) => {
  if (window.confirm(message)) {
    navigateTo(navigate, page, additionalProps);
  }
};

/**
 * Función para navegar y guardar datos en sessionStorage
 * @param {Function} navigate - Función de navegación de React Router
 * @param {string} page - Página a la cual navegar
 * @param {Object} data - Datos a guardar
 * @param {string} key - Clave para guardar los datos
 */
export const navigateWithData = (navigate, page, data, key) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
    navigateTo(navigate, page);
  } catch (error) {
    console.error('Error al guardar datos en sessionStorage:', error);
    navigateTo(navigate, page);
  }
};

/**
 * Función para recuperar datos guardados en sessionStorage
 * @param {string} key - Clave de los datos
 * @returns {Object|null} - Datos recuperados o null si no existen
 */
export const getStoredData = (key) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error al recuperar datos de sessionStorage:', error);
    return null;
  }
};

/**
 * Función para limpiar datos guardados en sessionStorage
 * @param {string} key - Clave de los datos a limpiar
 */
export const clearStoredData = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error al limpiar datos de sessionStorage:', error);
  }
}; 