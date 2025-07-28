import React, { useState } from 'react';
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

function AppMain() {
  const [currentPage, setCurrentPage] = useState('individuals');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [testAnswers, setTestAnswers] = useState(null);

  const handleNavigation = (page, additionalProps = {}) => {
    setCurrentPage(page);
    
    // Si hay respuestas del test, guardarlas
    if (additionalProps.testAnswers) {
      setTestAnswers(additionalProps.testAnswers);
    }
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
      {currentPage === 'individuals' ? (
        <App navigationProps={navigationProps} />
      ) : currentPage === 'business' ? (
        <AppBusiness navigationProps={navigationProps} />
      ) : currentPage === 'login' ? (
        <LoginPage navigationProps={navigationProps} />
      ) : currentPage === 'register' ? (
        <RegisterPage navigationProps={navigationProps} />
      ) : currentPage === 'quick-register' ? (
        <QuickRegisterPage navigationProps={navigationProps} />
      ) : currentPage === 'client-dashboard' ? (
        <ClientDashboard navigationProps={navigationProps} />
      ) : currentPage === 'psychologist-dashboard' ? (
        <PsychologistDashboard navigationProps={navigationProps} />
      ) : currentPage === 'appointments' ? (
        <AppointmentsPage navigationProps={navigationProps} />
      ) : currentPage === 'for-you' ? (
        <ForYouPage navigationProps={navigationProps} />
      ) : currentPage === 'my-specialist' ? (
        <MySpecialistPage navigationProps={navigationProps} />
      ) : currentPage === 'support' ? (
        <SupportPage navigationProps={navigationProps} />
      ) : currentPage === 'psychologists' ? (
        <PsychologistsPage navigationProps={navigationProps} />
      ) : currentPage === 'about-us' ? (
        <AboutUsPage navigationProps={navigationProps} />
      ) : currentPage === 'pricing' ? (
        <PricingPage navigationProps={navigationProps} />
      ) : currentPage === 'business-demo-dashboard' ? (
        <BusinessDemoDashboard navigationProps={navigationProps} />
      ) : currentPage === 'questionnaire-match' ? (
        <QuestionnaireMatch navigationProps={navigationProps} />
      ) : currentPage === 'test-results' ? (
        <TestResults navigationProps={navigationProps} testAnswers={testAnswers} />
      ) : currentPage === 'psychologist-profile-form' ? (
        <PsychologistProfileForm navigationProps={navigationProps} />
      ) : currentPage === 'free-orientation' ? (
        <FreeOrientationPage navigationProps={navigationProps} />
      ) : currentPage === 'business-demo' ? (
        <BusinessDemoSection navigationProps={navigationProps} />
      ) : (
        <App navigationProps={navigationProps} />
      )}
    </div>
  );
}

export default AppMain; 