import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import QuestionnaireMatch from './components/QuestionnaireMatch';
import TestResults from './components/TestResults';
import PsychologistProfileForm from './components/PsychologistProfileForm';
import FreeOrientationPage from './components/FreeOrientationPage';
import BusinessDemoSection from './components/BusinessDemoSection';
import ClientProfilePage from './components/ClientProfilePage';

function AppMain() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [testAnswers, setTestAnswers] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (page, additionalProps = {}) => {
    // Si hay respuestas del test, guardarlas
    if (additionalProps.testAnswers) {
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
        
        {/* Rutas del dashboard de clientes */}
        <Route path="/client-dashboard" element={<ClientDashboard navigationProps={navigationProps} />} />
        <Route path="/appointments" element={<AppointmentsPage navigationProps={navigationProps} />} />
        <Route path="/for-you" element={<ForYouPage navigationProps={navigationProps} />} />
        <Route path="/my-specialist" element={<MySpecialistPage navigationProps={navigationProps} />} />
        <Route path="/support" element={<SupportPage navigationProps={navigationProps} />} />
        <Route path="/client-profile" element={<ClientProfilePage navigationProps={navigationProps} testAnswers={testAnswers} />} />
        
        {/* Rutas del dashboard de psicólogos */}
        <Route path="/psychologist-dashboard" element={<PsychologistDashboard navigationProps={navigationProps} />} />
        <Route path="/psychologist-profile-form" element={<PsychologistProfileForm navigationProps={navigationProps} />} />
        
        {/* Rutas del dashboard empresarial */}
        <Route path="/business-demo-dashboard" element={<BusinessDemoDashboard navigationProps={navigationProps} />} />
        <Route path="/business-demo" element={<BusinessDemoSection navigationProps={navigationProps} />} />
        
        {/* Otras rutas */}
        <Route path="/psychologists" element={<PsychologistsPage navigationProps={navigationProps} />} />
        <Route path="/about-us" element={<AboutUsPage navigationProps={navigationProps} />} />
        <Route path="/pricing" element={<PricingPage navigationProps={navigationProps} />} />
        <Route path="/free-orientation" element={<FreeOrientationPage navigationProps={navigationProps} />} />
        <Route path="/questionnaire-match" element={<QuestionnaireMatch navigationProps={navigationProps} />} />
        <Route path="/test-results" element={<TestResults navigationProps={navigationProps} testAnswers={testAnswers} />} />
        
        {/* Ruta por defecto - redirige a la página principal */}
        <Route path="*" element={<App navigationProps={navigationProps} />} />
      </Routes>
    </div>
  );
}

export default AppMain; 