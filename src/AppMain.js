import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { usePageTitle } from './hooks/usePageTitle';
import { useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AccessDenied from './components/AccessDenied';
import LoadingSpinner from './components/LoadingSpinner';
import App from './App';
import AppBusiness from './AppBusiness';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import QuickRegisterPage from './components/QuickRegisterPage';
import ClientDashboard from './components/ClientDashboard';
import AppointmentsPage from './components/AppointmentsPage';
import ForYouPage from './components/ForYouPage';
import MySpecialistPage from './components/MySpecialistPage';
import SupportPage from './components/SupportPage';
import PsychologistsPage from './components/PsychologistsPage';
import AboutUsPage from './components/AboutUsPage';
import PricingPage from './components/PricingPage';
import PsychologistDashboard from './components/PsychologistDashboard';
import BusinessDemoDashboard from './components/BusinessDemoDashboard';
import BusinessDashboard from './components/BusinessDashboard';
import QuestionnaireMatch from './components/QuestionnaireMatch';
import TestResults from './components/TestResults';
import PsychologistProfileForm from './components/PsychologistProfileForm';
import FreeOrientationPage from './components/FreeOrientationPage';
import BusinessDemoSection from './components/BusinessDemoSection';
import ClientProfilePage from './components/ClientProfilePage';
import FAQPage from './components/FAQPage';
import RegistrationSuccess from './components/RegistrationSuccess';

function AppMain() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [testAnswers, setTestAnswers] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  // Hook para manejar el título dinámico de la página
  usePageTitle();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return <LoadingSpinner message="Verificando autenticación..." />;
  }

  const handleNavigation = (page, additionalProps = {}) => {
    console.log('=== NAVIGATION DEBUG ===');
    console.log('Navegando a página:', page);
    console.log('Usuario actual:', user);
    console.log('Estado de loading:', loading);
    
    // Si hay respuestas del test, guardarlas
    if (additionalProps && additionalProps.testAnswers) {
      setTestAnswers(additionalProps.testAnswers);
    }
    
    // Usar React Router para navegación
    navigate(`/${page}`, { 
      state: additionalProps,
      replace: false // Esto permite que el botón de retroceso funcione
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserRegistration = () => {
    setIsUserRegistered(true);
  };

  const navigationProps = {
    onNavigate: handleNavigation,
    sidebarOpen: sidebarOpen,
    toggleSidebar: toggleSidebar,
    isUserRegistered: isUserRegistered,
    onUserRegistration: handleUserRegistration
  };

  return (
    <div className="AppMain">
      <Routes>
        {/* Rutas principales */}
        <Route path="/" element={<App navigationProps={navigationProps} />} />
        <Route path="/individuals" element={<App navigationProps={navigationProps} />} />
        <Route path="/business" element={<AppBusiness navigationProps={navigationProps} />} />
        
        {/* Rutas de autenticación */}
        <Route path="/login" element={<LoginPage navigationProps={navigationProps} />} />
        <Route path="/register" element={<RegisterPage navigationProps={navigationProps} />} />
        <Route path="/quick-register" element={<QuickRegisterPage navigationProps={navigationProps} />} />
        <Route path="/registration-success" element={<RegistrationSuccess navigationProps={navigationProps} />} />
        
        {/* Rutas del dashboard de clientes - PROTEGIDAS */}
        <Route path="/client-dashboard" element={
          <ProtectedRoute user={user} userType="client">
            <ClientDashboard navigationProps={navigationProps} />
          </ProtectedRoute>
        } />
        <Route path="/appointments" element={
          <ProtectedRoute user={user} userType="client">
            <AppointmentsPage navigationProps={navigationProps} />
          </ProtectedRoute>
        } />
        <Route path="/for-you" element={
          <ProtectedRoute user={user} userType="client">
            <ForYouPage navigationProps={navigationProps} />
          </ProtectedRoute>
        } />
        <Route path="/my-specialist" element={
          <ProtectedRoute user={user} userType="client">
            <MySpecialistPage navigationProps={navigationProps} />
          </ProtectedRoute>
        } />
        <Route path="/support" element={
          <ProtectedRoute user={user} userType="client">
            <SupportPage navigationProps={navigationProps} />
          </ProtectedRoute>
        } />
        <Route path="/client-profile" element={
          <ProtectedRoute user={user} userType="client">
            <ClientProfilePage navigationProps={navigationProps} testAnswers={testAnswers} />
          </ProtectedRoute>
        } />
        
        {/* Rutas del dashboard de psicólogos - PROTEGIDAS */}
        <Route path="/psychologist-dashboard" element={
          <ProtectedRoute user={user} userType="psychologist">
            <PsychologistDashboard navigationProps={navigationProps} />
          </ProtectedRoute>
        } />
        <Route path="/psychologist-profile-form" element={
          <ProtectedRoute user={user} userType="psychologist">
            <PsychologistProfileForm navigationProps={navigationProps} />
          </ProtectedRoute>
        } />
        
        {/* Rutas del dashboard empresarial - PÚBLICAS */}
        <Route path="/business-demo-dashboard" element={<BusinessDemoDashboard navigationProps={navigationProps} />} />
        
        {/* Rutas del dashboard empresarial real - PROTEGIDAS */}
        <Route path="/business-dashboard" element={
          <ProtectedRoute user={user} userType="business">
            <BusinessDashboard navigationProps={navigationProps} />
          </ProtectedRoute>
        } />
        <Route path="/business-dashboard/*" element={
          <ProtectedRoute user={user} userType="business">
            <BusinessDashboard navigationProps={navigationProps} />
          </ProtectedRoute>
        } />
        
        {/* Otras rutas */}
        <Route path="/psychologists" element={<PsychologistsPage navigationProps={navigationProps} />} />
        <Route path="/about-us" element={<AboutUsPage navigationProps={navigationProps} />} />
        <Route path="/pricing" element={<PricingPage navigationProps={navigationProps} />} />
        <Route path="/free-orientation" element={<FreeOrientationPage navigationProps={navigationProps} />} />
        <Route path="/business-demo" element={<BusinessDemoSection navigationProps={navigationProps} />} />
        
        {/* Ruta de acceso denegado */}
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/questionnaire-match" element={<QuestionnaireMatch navigationProps={navigationProps} />} />
        <Route path="/test-results" element={<TestResults navigationProps={navigationProps} testAnswers={testAnswers} />} />
        <Route path="/faq" element={<FAQPage navigationProps={navigationProps} />} />
        
        {/* Ruta por defecto - redirige a la página principal */}
        <Route path="*" element={<App navigationProps={navigationProps} />} />
      </Routes>
    </div>
  );
}

export default AppMain; 