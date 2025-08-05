import { useNavigate, useLocation } from 'react-router-dom';
import { navigateTo, navigateBack, navigateForward, replacePage } from '../utils/navigation';

/**
 * Hook personalizado para manejar la navegación
 * Proporciona funciones de navegación consistentes y manejo de errores
 * 
 * @returns {Object} Objeto con funciones de navegación
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Navegar a una página específica
   * @param {string} page - Página a la cual navegar
   * @param {Object} additionalProps - Propiedades adicionales
   */
  const goTo = (page, additionalProps = {}) => {
    navigateTo(navigate, page, additionalProps);
  };

  /**
   * Navegar hacia atrás
   */
  const goBack = () => {
    navigateBack(navigate);
  };

  /**
   * Navegar hacia adelante
   */
  const goForward = () => {
    navigateForward(navigate);
  };

  /**
   * Reemplazar la página actual
   * @param {string} page - Página a la cual navegar
   * @param {Object} additionalProps - Propiedades adicionales
   */
  const replace = (page, additionalProps = {}) => {
    replacePage(navigate, page, additionalProps);
  };

  /**
   * Verificar si se puede navegar hacia atrás
   * @returns {boolean} - True si se puede navegar hacia atrás
   */
  const canGoBack = () => {
    return window.history.length > 1;
  };

  /**
   * Obtener la ruta actual
   * @returns {string} - Ruta actual
   */
  const getCurrentPath = () => {
    return location.pathname;
  };

  /**
   * Obtener el estado de la ubicación actual
   * @returns {Object} - Estado de la ubicación
   */
  const getLocationState = () => {
    return location.state;
  };

  /**
   * Navegar a la página principal
   */
  const goHome = () => {
    goTo('individuals');
  };

  /**
   * Navegar al dashboard de clientes
   */
  const goToClientDashboard = () => {
    goTo('client-dashboard');
  };

  /**
   * Navegar al dashboard de psicólogos
   */
  const goToPsychologistDashboard = () => {
    goTo('psychologist-dashboard');
  };

  /**
   * Navegar al dashboard empresarial
   */
  const goToBusinessDashboard = () => {
    goTo('business-demo-dashboard');
  };

  /**
   * Navegar a la página de login
   */
  const goToLogin = () => {
    goTo('login');
  };

  /**
   * Navegar a la página de registro
   */
  const goToRegister = () => {
    goTo('register');
  };

  /**
   * Navegar a la página de psicólogos
   */
  const goToPsychologists = () => {
    goTo('psychologists');
  };

  /**
   * Navegar a la página de orientación gratuita
   */
  const goToFreeOrientation = () => {
    goTo('free-orientation');
  };

  /**
   * Navegar a la página de resultados de test
   * @param {Object} testAnswers - Respuestas del test
   */
  const goToTestResults = (testAnswers) => {
    goTo('test-results', { testAnswers });
  };

  /**
   * Navegar a la página de cuestionario de matching
   */
  const goToQuestionnaireMatch = () => {
    goTo('questionnaire-match');
  };

  return {
    // Funciones básicas de navegación
    goTo,
    goBack,
    goForward,
    replace,
    canGoBack,
    
    // Información de ubicación
    getCurrentPath,
    getLocationState,
    
    // Funciones específicas de navegación
    goHome,
    goToClientDashboard,
    goToPsychologistDashboard,
    goToBusinessDashboard,
    goToLogin,
    goToRegister,
    goToPsychologists,
    goToFreeOrientation,
    goToTestResults,
    goToQuestionnaireMatch,
    
    // Acceso directo a navigate y location para casos especiales
    navigate,
    location
  };
}; 