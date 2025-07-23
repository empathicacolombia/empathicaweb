import React, { useState } from 'react';
import App from './App';
import AppBusiness from './AppBusiness';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PsychologistDashboard from './components/PsychologistDashboard';
import AppointmentsPage from './components/AppointmentsPage';
import ForYouPage from './components/ForYouPage';
import MySpecialistPage from './components/MySpecialistPage';
import SupportPage from './components/SupportPage';
import PsychologistsPage from './components/PsychologistsPage';

function AppMain() {
  const [currentPage, setCurrentPage] = useState('individuals'); // 'individuals', 'business', 'login', 'register', 'psychologist-dashboard', 'appointments', 'for-you', 'my-specialist', 'support', 'psychologists'
  const [sidebarOpen, setSidebarOpen] = useState(true); // Estado global del sidebar

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Pasar la función de navegación y el estado del sidebar a los componentes
  const navigationProps = {
    onNavigate: handleNavigation,
    sidebarOpen: sidebarOpen,
    toggleSidebar: toggleSidebar
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
      ) : (
        <App navigationProps={navigationProps} />
      )}
    </div>
  );
}

export default AppMain; 