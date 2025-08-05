import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook personalizado para manejar dinámicamente el título de la página
 * Cambia el título según la ruta actual
 */
export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (pathname) => {
      switch (pathname) {
        case '/':
        case '/individuals':
          return 'Empathica - Bienestar Mental';
        
        case '/business':
          return 'Empathica - Soluciones Empresariales';
        
        case '/login':
          return 'Iniciar Sesión - Empathica';
        
        case '/register':
          return 'Registrarse - Empathica';
        
        case '/quick-register':
          return 'Registro Rápido - Empathica';
        
        case '/client-dashboard':
          return 'Dashboard - Empathica';
        
        case '/appointments':
          return 'Mis Citas - Empathica';
        
        case '/for-you':
          return 'Para Ti - Empathica';
        
        case '/my-specialist':
          return 'Mi Especialista - Empathica';
        
        case '/support':
          return 'Soporte - Empathica';
        
        case '/client-profile':
          return 'Mi Perfil - Empathica';
        
        case '/psychologist-dashboard':
          return 'Dashboard Psicólogo - Empathica';
        
        case '/psychologist-profile-form':
          return 'Perfil Profesional - Empathica';
        
        case '/business-demo-dashboard':
          return 'Dashboard Empresarial - Empathica';
        
        case '/business-demo':
          return 'Demo Empresarial - Empathica';
        
        case '/psychologists':
          return 'Encuentra tu Psicólogo - Empathica';
        
        case '/about-us':
          return 'Sobre Nosotros - Empathica';
        
        case '/pricing':
          return 'Precios - Empathica';
        
        case '/free-orientation':
          return 'Orientación Gratuita - Empathica';
        
        case '/questionnaire-match':
          return 'Cuestionario de Matching - Empathica';
        
        case '/test-results':
          return 'Resultados del Test - Empathica';
        
        case '/faq':
          return 'Preguntas Frecuentes - Empathica';
        
        default:
          return 'Empathica - Bienestar Mental';
      }
    };

    const newTitle = getPageTitle(location.pathname);
    document.title = newTitle;
  }, [location.pathname]);
}; 